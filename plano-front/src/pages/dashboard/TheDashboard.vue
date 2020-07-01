<template>
  <div class="dashboard">
    <TheNavbar
      v-show="!isLoading"
      :sidebarVisibility="sidebarVisibility"
      @toggle-sidebar="toggleSidebar"
      @show-modal="showModal[$event]()"
    />

    <div class="container-fluid" @click="closeSideBar()">
      <transition
        name="custom-transition"
        enter-active-class="animated animate__slideInLeft sidebar-animation"
        leave-active-class="animated animate__slideOutLeft sidebar-animation"
        mode="out-in"
      >
        <TheSidebar v-show="sidebarVisibility" :year="year" />
      </transition>
      <main v-if="!isLoading" role="main" class="col-12 p-0 px-2">
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
      v-if="hasModalOpen"
      class="bg-base-modal"
      @click.stop="closeModal()"
    ></div>

    <ModalUser ref="modalUser" />
    <ModalDownload ref="modalDownload" />
  </div>
</template>

<script>
import _ from "lodash";
import { EventBus } from "@/event-bus.js";
import { COMPONENT_LOADING, COMPONENT_LOADED } from "@/vuex/mutation-types";
import TheNavbar from "./TheNavbar.vue";
import TheSidebar from "./sidebar/TheSidebar.vue";
import ModalUser from "./modais/ModalUser.vue";
import ModalDownload from "./modais/ModalDownload.vue";
import { BaseModal, LoadingPage } from "@/components/index.js";
import { notification } from "@/mixins/index.js";

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
  data() {
    return {
      hasModalOpen: false,
      sidebarVisibility: false,
      showModal: {
        download: () => {
          this.$refs.modalDownload.openModal();
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
  },
  computed: {
    year() {
      if (!_.isEmpty(this.$store.state.plano.Plano))
        return this.$store.state.plano.Plano[0].ano;
      else return 2020;
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

.sidebar-animation {
  animation-duration: 0.25s;
  animation-fill-mode: both;
}
.routerview-animation {
  animation-duration: 0.3s;
  animation-fill-mode: both;
}
</style>
