<template>
  <div class="dashboard">
    <TheNavbar
      v-if="!isLoading"
      :sidebarVisibility="sidebarVisibility"
      @toggle-sidebar="toggleSidebar"
      @show-modal="showModal[$event]()"
    />

    <div v-if="!isLoading" class="container-fluid" @click="closeSideBar()">
      <TheSidebar :visibility="sidebarVisibility" :year="year" />

      <main role="main" class="col-12 p-0 px-2" v-if="!isLoading">
        <transition
          enter-active-class="animated animate__fadeIn routerview-animation"
          leave-active-class="animated animate__fadeOut routerview-animation"
          mode="out-in"
        >
          <router-view></router-view>
        </transition>
      </main>
    </div>

    <LoadingPage v-if="isLoading || $root.onLoad" />

    <div
      v-if="hasCenterModalOpen"
      class="bg-base-modal"
      @click.stop="closeCenterModal()"
    ></div>

    <!-- Modais -->
    <ModalNovoPlano ref="modalNovoPlano" />
    <ModalUser ref="modalUser" />
    <ModalDownload ref="modalDownload" />
  </div>
</template>

<script>
import _ from "lodash";
import { EventBus } from "@/event-bus.js";
import { COMPONENT_LOADING, COMPONENT_LOADED } from "@/vuex/mutation-types";
import bddumpService from "@/common/services/bddump";
import { BaseModal, BaseTable, LoadingPage } from "@/components/index.js";
import {
  toggleOrdination,
  toggleItemInArray,
  notification,
} from "@/mixins/index.js";
import TheNavbar from "./TheNavbar.vue";
import TheSidebar from "./sidebar/TheSidebar.vue";
import ModalUser from "./modais/ModalUser.vue";
import ModalDownload from "./modais/ModalDownload.vue";
import ModalNovoPlano from "./modais/ModalNovoPlano.vue";

export default {
  name: "TheDashboard",
  components: {
    TheSidebar,
    TheNavbar,
    LoadingPage,
    BaseModal,
    BaseTable,
    ModalUser,
    ModalDownload,
    ModalNovoPlano,
  },
  mixins: [toggleOrdination, toggleItemInArray, notification],
  data() {
    return {
      hasCenterModalOpen: false,
      sidebarVisibility: false,
      plano: undefined,
      showModal: {
        download: () => {
          this.$refs.modalDownload.open();
        },
        user: () => {
          this.$refs.modalUser.open();
        },
        novoPlano: () => {
          this.$refs.modalNovoPlano.open();
        },
      },
    };
  },
  created() {
    this.$store.commit(COMPONENT_LOADING);
    if (!localStorage.getItem("Plano")) {
      localStorage.setItem("Plano", "1");
    }
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
    this.plano = localStorage.getItem("Plano");
  },
  mounted() {
    EventBus.$on("close-sidebar", this.closeSideBar);
    EventBus.$on("toggle-bg-modal", (newVisibility) => {
      this.hasCenterModalOpen = newVisibility;
    });
  },
  beforeDestroy() {
    EventBus.$off("close-sidebar");
    EventBus.$off("toggle-bg-modal");
    this.$socket.close();
  },
  methods: {
    closeCenterModal() {
      EventBus.$emit("close-modal");
    },
    toggleSidebar() {
      this.sidebarVisibility = !this.sidebarVisibility;
    },
    closeSideBar() {
      this.sidebarVisibility = false;
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
  },
  computed: {
    year() {
      let p = _.find(this.$store.state.plano.Plano, {
        id: parseInt(this.plano, 10),
      });
      return p ? parseInt(p.ano, 10) : 0;
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
.dashboard {
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
.dashboard .container-fluid {
  max-width: 100%;
  margin: 0;
  padding: 0;
  margin-top: var(--navbar-height);
  height: 100%;
  transition: all 200ms ease;
}
.dashboard main {
  position: unset !important;
  overflow-y: auto !important;
  height: -webkit-calc(100vh - var(--navbar-height));
  height: -moz-calc(100vh - var(--navbar-height));
  height: calc(100vh - var(--navbar-height));
  transition: all 200ms ease;
}
.dashboard .bg-base-modal {
  position: absolute;
  z-index: 950;
  height: 100vh !important;
  width: 100% !important;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
