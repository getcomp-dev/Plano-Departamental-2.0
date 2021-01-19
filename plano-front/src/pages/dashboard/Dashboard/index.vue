<template>
  <div class="dashboard" v-if="!onLoading.fetching">
    <TheNavbar :modalCallbacks="modalCallbacks" />
    <TheSidebar />

    <main role="main" @click.stop="closeSidebar">
      <ThePageHeader :title="currentPageTitle">
        <portal-target name="page-header" class="aside"></portal-target>
      </ThePageHeader>

      <transition name="router-view-animation" mode="out-in" appear>
        <router-view></router-view>
      </transition>
    </main>

    <div
      v-if="modalOverlayVisibility"
      class="base-modal-overlay"
      @click.stop="setModalOverlayVisibility(false)"
    ></div>

    <ModalUser ref="modalUser" />
    <ModalDownload ref="modalDownload" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { find, pull } from "lodash-es";
import bddumpService from "@/services/bddump";
import { TheNavbar, TheSidebar, ThePageHeader } from "@/components/layout";
import { ModalUser, ModalDownload } from "@/components/modals";
import { SOCKET_PLANO_UPDATED } from "../../../vuex/mutation-types";

export default {
  name: "TheDashboard",
  components: { TheSidebar, TheNavbar, ThePageHeader, ModalUser, ModalDownload },
  data() {
    return {
      planoInitilized: false,
      modalCallbacks: {
        openDownload: () => this.$refs.modalDownload.open(),
        openUser: () => this.$refs.modalUser.open(),
      },
    };
  },

  created() {
    this.initializeCurrentPlano().then(() => {
      this.planoInitilized = true;
    });

    this.unwatch = this.$store.subscribe((mutation) => {
      if (
        mutation.type === SOCKET_PLANO_UPDATED &&
        mutation.payload.Plano.id == localStorage.getItem("Plano")
      ) {
        if (!mutation.payload.Plano.visible) {
          const firstVisiblePlano = find(this.Planos, ["visible", true]);
          this.changeCurrentPlano(firstVisiblePlano.id).then(() => {
            this.pushNotification({
              type: "warn",
              duration: 6000,
              text: `O plano em que você estava foi alterado para não visivel.<br/> Então você foi
                redirecionado para o plano ${firstVisiblePlano.ano} - ${firstVisiblePlano.nome}`,
            });
          });
        }
      }
    });
  },
  destroyed() {
    this.unwatch();
    this.$socket.close();
  },

  methods: {
    ...mapActions([
      "initializeCurrentPlano",
      "changeCurrentPlano",
      "closeSidebar",
      "setModalOverlayVisibility",
    ]),

    returnFiles() {
      bddumpService.returnFiles().then((response) => {
        this.files = response.Files.filter(function(elm) {
          return elm.match(/.*\.(sql)/gi);
        });
        pull(this.files, "drop_all.sql");
        this.files.forEach((value, index, array) => {
          array[index] = value.slice(0, -4);
        });
      });
    },
  },

  computed: {
    ...mapGetters(["modalOverlayVisibility", "onLoading", "Planos", "AllRoutes"]),

    currentPageTitle() {
      const currentPage = this.AllRoutes.find((route) => route.path === this.$route.path);
      return currentPage ? currentPage.title : "Pagina nao encontrado!";
    },
  },
  watch: {
    currentPlano: {
      handler(newValue) {
        if (!newValue && this.planoInitilized) {
          const firstVisiblePlano = find(this.Planos, ["visible", true]);
          this.changeCurrentPlano(firstVisiblePlano.id);

          this.pushNotification({
            type: "warn",
            title: "Aviso!",
            text: `O plano atual foi alterando para o ${firstVisiblePlano.ano} - ${firstVisiblePlano.nome}`,
          });
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.dashboard > main {
  width: 100%;
  height: calc(100vh - var(--navbar-height));
  margin-top: var(--navbar-height);
  padding: 0 8px;
  overflow-y: auto !important;
  transition: all 200ms ease;
}
.dashboard > .base-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 950;
  height: 100vh;
  width: 100vw;
  background-color: #00000066;
}
</style>
