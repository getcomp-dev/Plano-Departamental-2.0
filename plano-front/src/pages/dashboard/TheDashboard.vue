<template>
  <div class="TheDashboard" v-bind:class="{ loading: isLoadingFile }">
    <TheNavbar
      v-show="!isLoading"
      :sidebarVisibility="sidebarVisibility"
      @toggle-sidebar="toggleSidebar"
      @show-modal="showModal[$event]()"
    />

    <div class="container-fluid">
      <transition
        name="custom-transition"
        enter-active-class="animated slideInLeft sidebar-animation"
        leave-active-class="animated slideOutLeft sidebar-animation"
      >
        <TheSidebar v-show="sidebarVisibility" :year="year" />
      </transition>

      <main
        @click="closeSideBar()"
        role="main"
        class="col-12 p-0 px-2"
        v-if="!isLoading"
      >
        <router-view></router-view>
      </main>
    </div>
    <LoadingPage v-if="isLoading || $root.onLoad" />

    <div
      class="bg-base-modal"
      v-if="hasModalOpen"
      @click.stop="closeModal()"
    ></div>

    <b-modal
      id="modal-download"
      ref="modalDownload"
      title="Selecione um Arquivo"
    >
      <p
        v-for="value in files"
        :key="'1--' + value"
        v-on:click="selectFile(value)"
      >
        {{ value }}
      </p>
      <div slot="modal-footer">
        <input type="text" v-model="filename" style="margin-right: 10px" />
        <b-button variant="success" v-on:click="download(filename)"
          >Carregar Arquivo</b-button
        >
      </div>
    </b-modal>
    <b-modal
      id="modal-novo-plano"
      ref="modalNovoPlano"
      title="Informe o ano do novo plano"
    >
      <b-form-group
        label="Ano"
        label-for="NovoAno"
        label-cols-sm="4"
        label-cols-lg="3"
      >
        <b-form-input
          id="NovoAno"
          type="text"
          v-model="planoForm.ano"
          style="margin-right: 10px; width: 60px;"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Observações"
        label-for="ObsNovoPlano"
        label-cols-sm="4"
        label-cols-lg="3"
      >
        <b-form-textarea
          id="ObsNovoPlano"
          type="text"
          v-model="planoForm.obs"
          style="margin-right: 10px;"
        ></b-form-textarea>
      </b-form-group>
      <div slot="modal-footer">
        <b-button disabled v-on:click="novoPlano()">Criar Plano</b-button>
        <!-- variant "success"-->
      </div>
    </b-modal>
    <!--  -->
    <!-- Carregar -->
    <b-modal id="modal-load" ref="modalLoad" title="Selecione um Arquivo">
      <p
        v-for="value in files"
        :key="'2--' + value"
        v-on:click="selectFile(value)"
      >
        {{ value }}
      </p>
      <div slot="modal-footer">
        <input type="text" v-model="filename" style="margin-right: 10px" />
        <b-button variant="success" v-on:click="restorebd(filename)"
          >Carregar Arquivo</b-button
        >
      </div>
    </b-modal>
    <!--  -->
    <!-- Salvar -->
    <b-modal
      id="modal-save"
      ref="modalSave"
      title="Escolha um nome para o arquivo"
    >
      <p
        v-for="value in files"
        :key="'3--' + value"
        v-on:click="selectFile(value)"
      >
        {{ value }}
      </p>
      <div slot="modal-footer">
        <input type="text" v-model="filename" style="margin-right: 10px" />
        <b-button variant="success" v-on:click="bddump(filename)"
          >Salvar Arquivo</b-button
        >
      </div>
    </b-modal>

    <ModalUser ref="modalUser" />
    <ModalDownload ref="modalDownload" />
  </div>
</template>

<script>
import _ from "lodash";
import { EventBus } from "@/event-bus.js";
import { COMPONENT_LOADING, COMPONENT_LOADED } from "@/vuex/mutation-types";
import bddumpService from "@/common/services/bddump";
import novoPlanoService from "@/common/services/novoPlano";
import planoService from "@/common/services/plano";
import TheNavbar from "./TheNavbar.vue";
import TheSidebar from "./sidebar/TheSidebar.vue";
import ModalUser from "./modais/ModalUser.vue";
import ModalDownload from "./modais/ModalDownload.vue";
import { BaseModal, LoadingPage } from "@/components/index.js";
import { notification } from "@/mixins/index.js";

const emptyPlano = {
  ano: undefined,
  obs: undefined,
};

export default {
  name: "TheDashboard",
  components: {
    TheSidebar,
    TheNavbar,
    LoadingPage,
    BaseModal,
    ModalUser,
    ModalDownload,
  },
  mixins: [notification],
  data: function() {
    return {
      hasModalOpen: false,
      files: [],
      filename: "",
      isLoadingFile: false,
      planoForm: _.clone(emptyPlano),
      sidebarVisibility: false,
      showModal: {
        load: () => {
          this.filename = "";
          this.returnFiles();
          this.$refs.modalLoad.show();
        },
        novoPlano: () => {
          this.$refs.modalNovoPlano.show();
        },
        download: () => {
          this.$refs.modalDownload.openModal();
        },
        save: () => {
          this.filename = "";
          this.returnFiles();
          this.$refs.modalSave.show();
        },
        user: () => {
          this.$refs.modalUser.openModal();
        },
      },
    };
  },
  created() {
    this.$store.commit(COMPONENT_LOADING);
    this.$store
      .dispatch("fetchAll")
      .then(() => {
        this.$socket.open();
        this.$store.commit(COMPONENT_LOADED);
      })
      .catch((response) => {
        console.log("ERRORRR");
        console.log(response);
      });

    this.$store.commit("setYear", 2019);
  },
  mounted() {
    EventBus.$on("close-sidebar", this.closeSideBar);
    EventBus.$on("toggle-bg-modal", (newVisibility) => {
      this.hasModalOpen = newVisibility;
    });
  },
  beforeDestroy() {
    EventBus.$off("close-sidebar");
    EventBus.$off("toggle-bg-modal");
    this.$socket.close();
  },
  methods: {
    closeModal() {
      EventBus.$emit("close-modal");
    },
    toggleSidebar() {
      this.sidebarVisibility = !this.sidebarVisibility;
    },

    closeSideBar() {
      this.sidebarVisibility = false;
    },

    bddump(filename) {
      bddumpService
        .createDump({ filename: filename })
        .then(() => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O dump foi criado!`,
            type: "success",
          });
          this.returnFiles();
        })
        .catch(() => {
          this.error = "<b>Erro ao criar dump</b>";
        });
      this.hideModalSave();
    },

    novoPlano: async function() {
      await this.download();
      let ano;
      if (!_.isEmpty(this.$store.state.plano.Plano)) {
        ano = this.$store.state.plano.Plano[0].ano;
      } else ano = 2019;

      planoService.update(ano, this.planoForm).then(() => {
        novoPlanoService.criarNovoPlano().then(() => {
          this.$store.dispatch("fetchAll");
          this.$refs.modalNovoPlano.hide();
        });
        console.log("novo ano: " + this.planoForm.ano);
      });
    },

    restorebd(filename) {
      this.isLoadingFile = true;
      bddumpService
        .restoredump(filename)
        .then((response) => {
          if (response.success == true) {
            this.$notify({
              group: "general",
              type: "success",
              text: `O banco foi restaurado com sucesso`,
            });
            this.$store.dispatch("fetchAll");
            this.hideModalLoad();
            this.returnFiles();
            this.isLoadingFile = false;
          } else {
            this.$notify({
              group: "general",
              type: "danger",
              text: "Falha ao restaurar o banco",
            });
          }
        })
        .catch(() => {
          this.error = "<b>Erro ao carregar dump</b>";
        });
    },

    returnFiles() {
      bddumpService.returnFiles().then((response) => {
        this.files = response.Files.filter(function(elm) {
          return elm.match(/.*\.(sql)/gi);
        });
        _.pull(this.files, "drop_all.sql");
        _.forEach(this.files, function(value, index, array) {
          array[index] = value.slice(0, -4);
        });
        //console.log(this.files.filter( function( elm ) {return elm.match(/.*\.(sql)/ig)}))
      });
    },

    hideModalLoad() {
      this.$refs.modalLoad.hide();
    },

    hideModalSave() {
      this.$refs.modalSave.hide();
    },

    selectFile(filename) {
      this.filename = filename;
    },
  },
  computed: {
    year() {
      if (!_.isEmpty(this.$store.state.plano.Plano)) {
        if (typeof this.$store.state.plano.Plano[0].ano === "string")
          this.planoForm.ano =
            parseInt(this.$store.state.plano.Plano[0].ano) + 1;
        else this.planoForm.ano = this.$store.state.plano.Plano[0].ano + 1;
        return this.$store.state.plano.Plano[0].ano;
      } else return 2019;
    },
    httpRequestCount() {
      return this.$store.state.httpRequestCount;
    },

    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>

<style scoped>
.bg-base-modal {
  position: absolute;
  z-index: 950;
  height: 100vh !important;
  width: 100% !important;
  background-color: rgba(0, 0, 0, 0.3);
}
.TheDashboard {
  width: 100% !important;
  height: 100%;
  overflow: hidden !important;
  margin: 0 !important;
  padding: 0 !important;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.container-fluid {
  max-width: 100%;
  margin: 0;
  padding: 0;
  margin-top: var(--navbar-height);
  height: 100%;
  transition: all 200ms ease;
}
[role="main"] {
  overflow-y: auto !important;
  height: -webkit-calc(100vh - var(--navbar-height));
  height: -moz-calc(100vh - var(--navbar-height));
  height: calc(100vh - var(--navbar-height));
  transition: all 200ms ease;
}
.sidebar-animation {
  -webkit-animation-duration: 0.3s;
  -moz-animation-duration: 0.3s;
  -o-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-fill-mode: both;
  -moz-animation-fill-mode: both;
  -o-animation-fill-mode: both;
  animation-fill-mode: both;
}
</style>
