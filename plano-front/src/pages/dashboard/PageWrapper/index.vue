<template>
  <div class="page-wrapper" v-if="!onLoading.fetching">
    <Navbar :modalCallbacks="modalCallbacks" />
    <Sidebar />

    <main role="main" @click.stop="closeSidebar">
      <PageHeader :title="currentPageTitle">
        <portal-target name="page-header" class="aside"></portal-target>
      </PageHeader>

      <transition name="fade-transition" mode="out-in" appear>
        <router-view></router-view>
      </transition>
    </main>

    <ModalUser ref="modalUser" />
    <ModalDownload ref="modalDownload" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { find, pull } from "lodash-es";
import bddumpService from "@/services/bddump";
import { Navbar, Sidebar, PageHeader } from "@/components/layout";
import { ModalUser, ModalDownload } from "@/components/modals";
import { SOCKET_PLANO_UPDATED } from "@/store/mutation-types";

export default {
  name: "PageWrapper",
  components: { Sidebar, Navbar, PageHeader, ModalUser, ModalDownload },
  data() {
    return {
      planoWasInitilized: false,
      modalCallbacks: {
        openDownload: () => this.$refs.modalDownload.open(),
        openUser: () => this.$refs.modalUser.open(),
      },
    };
  },

  created() {
    this.initializeCurrentPlano().then(() => {
      this.planoWasInitilized = true;
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
    ...mapActions(["initializeCurrentPlano", "changeCurrentPlano", "closeSidebar"]),

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
    ...mapGetters(["onLoading", "Planos", "AllPages"]),

    currentPageTitle() {
      const currentPage = this.AllPages.find((page) => page.path === this.$route.path);
      return currentPage ? currentPage.title : "Pagina nao encontrado!";
    },
  },

  watch: {
    currentPlano: {
      handler(newValue) {
        if (!newValue && this.planoWasInitilized) {
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

<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
  > main {
    width: 100%;
    height: calc(100vh - var(--navbar-height));
    margin-top: var(--navbar-height);
    padding: 0 8px;
    overflow-y: auto !important;
    transition: all 200ms ease;
  }
}
</style>
