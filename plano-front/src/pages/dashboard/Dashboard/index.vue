<template>
  <div class="dashboard">
    <TheNavbar
      v-if="loadingState !== 'entire'"
      @show-modal="showModal[$event]()"
    />
    <TheSidebar v-if="loadingState !== 'entire'" />

    <main v-if="loadingState !== 'entire'" @click="closeSidebar">
      <transition
        enter-active-class="animated animate__fadeIn routerview-animation"
        leave-active-class="animated animate__fadeOut routerview-animation"
        mode="out-in"
      >
        <router-view></router-view>
      </transition>
    </main>

    <TheLoadingView :visibility="loadingState !== 'completed'" />

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
import bddumpService from "@/common/services/bddump";
import { EventBus } from "@/eventBus.js";
import { mapGetters, mapActions } from "vuex";
import { TheNavbar, TheSidebar, TheLoadingView } from "@/components/layout";
import ModalUser from "./ModalUser.vue";
import ModalDownload from "./ModalDownload.vue";

export default {
  name: "TheDashboard",
  components: {
    TheSidebar,
    TheNavbar,
    TheLoadingView,
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
    this.setLoadingState("entire");
    if (!localStorage.getItem("Plano")) localStorage.setItem("Plano", "1");

    this.$store
      .dispatch("fetchAll")
      .then(() => {
        this.$socket.open();
        this.setLoadingState("completed");
      })
      .catch((error) => {
        console.log(error);
      });

    this.$store.commit("setYear", 2019);
    this.plano = localStorage.getItem("Plano");
  },
  beforeDestroy() {
    this.$socket.close();
  },
  methods: {
    ...mapActions(["setLoadingState", "closeSidebar"]),
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
    ...mapGetters(["modalOverlayVisibility", "loadingState"]),
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
