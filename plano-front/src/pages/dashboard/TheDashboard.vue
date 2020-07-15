<template>
  <div class="dashboard">
    <TheNavbar v-if="!isLoading" @show-modal="showModal[$event]()" />
    <TheSidebar v-if="!isLoading" />

    <main v-if="!isLoading" @click="$store.commit('CLOSE_SIDEBAR')">
      <transition
        enter-active-class="animated animate__fadeIn routerview-animation"
        leave-active-class="animated animate__fadeOut routerview-animation"
        mode="out-in"
      >
        <router-view></router-view>
      </transition>
    </main>

    <LoadingView :visibility="isLoading || $root.onLoad" />

    <div
      v-show="modalOverlayVisibility"
      class="base-modal-overlay"
      @click.stop="emitCloseCenterModal()"
    ></div>

    <ModalUser ref="modalUser" />
    <ModalDownload ref="modalDownload" />
  </div>
</template>

<script>
import _ from "lodash";
import { EventBus } from "@/event-bus.js";
import { mapGetters } from "vuex";
import bddumpService from "@/common/services/bddump";
import { LoadingView } from "@/components";
import TheNavbar from "./TheNavbar.vue";
import TheSidebar from "./sidebar/TheSidebar.vue";
import ModalUser from "./modais/ModalUser.vue";
import ModalDownload from "./modais/ModalDownload.vue";

export default {
  name: "TheDashboard",
  components: {
    TheSidebar,
    TheNavbar,
    LoadingView,
    ModalUser,
    ModalDownload,
  },
  data() {
    return {
      plano: undefined,
      showModal: {
        download: () => {
          this.$refs.modalDownload.open();
        },
        user: () => {
          this.$refs.modalUser.open();
        },
      },
    };
  },

  created() {
    this.$store.commit("COMPONENT_LOADING");
    if (!localStorage.getItem("Plano")) localStorage.setItem("Plano", "1");

    this.$store
      .dispatch("fetchAll")
      .then(() => {
        this.$socket.open();
        this.$store.commit("COMPONENT_LOADED");
      })
      .catch((response) => {
        console.log(response);
      });

    this.$store.commit("setYear", 2019);
    this.plano = localStorage.getItem("Plano");
  },
  beforeDestroy() {
    this.$socket.close();
  },
  methods: {
    emitCloseCenterModal() {
      EventBus.$emit("close-modal");
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
    ...mapGetters(["modalOverlayVisibility"]),
    isLoading() {
      return this.$store.state.isLoading;
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
  overflow-y: auto !important;
  margin-top: var(--navbar-height);
  transition: all 200ms ease;
  padding: 0 8px;
}
.dashboard > .base-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 950;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
}
.routerview-animation {
  animation-duration: 0.3s;
  animation-fill-mode: both;
}
</style>
