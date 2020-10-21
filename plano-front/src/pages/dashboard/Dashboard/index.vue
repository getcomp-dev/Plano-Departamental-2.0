<template>
  <div class="dashboard" v-if="!onLoading.fetching">
    <TheNavbar :modalCallbacks="modalCallbacks" />
    <TheSidebar />

    <main @click="closeSidebar">
      <transition name="router-view-animation" mode="out-in" appear>
        <router-view></router-view>
      </transition>
    </main>

    <div
      v-show="modalOverlayVisibility"
      class="base-modal-overlay"
      @click.stop="emitCloseCenterModal"
    ></div>

    <ModalUser ref="modalUser" />
    <ModalDownload ref="modalDownload" />
  </div>
</template>

<script>
import bddumpService from "@/common/services/bddump";
import { EventBus } from "@/plugins/eventBus.js";
import { mapGetters, mapActions } from "vuex";
import { TheNavbar, TheSidebar } from "@/components/layout";
import { ModalUser, ModalDownload } from "@/components/modals";

export default {
  name: "TheDashboard",
  components: {
    TheSidebar,
    TheNavbar,
    ModalUser,
    ModalDownload,
  },
  data() {
    return {
      modalCallbacks: {
        openDownload: () => this.$refs.modalDownload.open(),
        openUser: () => this.$refs.modalUser.open(),
      },
    };
  },

  created() {
    this.initializeCurrentPlano();
  },
  beforeDestroy() {
    this.$socket.close();
  },

  methods: {
    ...mapActions(["initializeCurrentPlano", "closeSidebar"]),

    emitCloseCenterModal() {
      EventBus.$emit("close-modal");
    },
    returnFiles() {
      bddumpService.returnFiles().then((response) => {
        this.files = response.Files.filter(function(elm) {
          return elm.match(/.*\.(sql)/gi);
        });
        this.$_.pull(this.files, "drop_all.sql");
        this.$_.forEach(this.files, function(value, index, array) {
          array[index] = value.slice(0, -4);
        });
        //console.log(this.files.filter( function( elm ) {return elm.match(/.*\.(sql)/ig)}))
      });
    },
  },

  computed: {
    ...mapGetters(["modalOverlayVisibility", "onLoading"]),
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
</style>
