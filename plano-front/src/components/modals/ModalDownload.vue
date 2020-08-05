<template>
  <BaseModal2
    ref="baseModalDownload"
    title="Download"
    type="fromNavbar"
    :styles="{ width: '370px' }"
    @on-close="resetOnClose()"
  >
    <template #modal-body>
      <div class="title-container pl-1">
        <h2 class="title-list">Arquivos inclusos:</h2>
        <BaseButton
          :type="'text'"
          :color="'darkblue'"
          @click="runDownload"
          :disabled="downloadState !== 0 && downloadState !== 5"
        >
          Iniciar download
        </BaseButton>
      </div>

      <ul class="list-group">
        <li class="list-group-item">Tabela de turmas DCC (.xlsx)</li>
        <li class="list-group-item">Backup do banco de dados (.sql)</li>
        <li class="list-group-item">PDF de carga dos professores</li>
        <li class="list-group-item">PDF de horarios dos cursos</li>
        <li class="list-group-item">PDF de horarios dos laborátorios</li>
      </ul>

      <div class="loading-container w-100">
        <div class="loading-bar w-100">
          <div
            class="loading-bar-content"
            :style="`width: ${downloadState * 20}%`"
          ></div>
        </div>

        <p class="loading-text">
          {{ downloadStateText }}
          <i
            v-show="downloadState !== 0 && downloadState !== 5"
            class="loadingEllipsis"
          ></i>
        </p>
      </div>
    </template>
  </BaseModal2>
</template>

<script>
import { saveAs } from "file-saver";
import xlsxService from "@/common/services/xlsx";
import downloadService from "@/common/services/download";

export default {
  name: "ModalDownload",
  data() {
    return {
      downloadState: 0,
    };
  },
  methods: {
    open() {
      this.$refs.baseModalDownload.open();
    },
    resetDownloadState() {
      this.downloadState = 0;
    },
    resetOnClose() {
      if (this.downloadState === 5) this.resetDownloadState();
    },

    async runDownload() {
      try {
        this.resetDownloadState();
        this.downloadState++;
        const pedidos = this.$store.state.pedido.Pedidos;

        await xlsxService.downloadTable({ pedidos: pedidos });
        this.downloadState++;
        await downloadService.generatePdf();
        this.downloadState++;
        await downloadService.download();
        this.downloadState++;

        const planoData = await fetch(
          "http://200.131.219.57:3000/api/download/all",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.$store.state.auth.token}`,
            },
          }
        );
        const dataBlobed = await planoData.blob();
        await saveAs(dataBlobed, "data.zip");
        this.downloadState++;
      } catch (error) {
        console.log(error, "Erro na criação de arquivos para download");
      }
    },
    async download() {
      return new Promise((resolve) => {
        this.resetDownloadState();
        this.downloadState++;

        const pedidos = this.$store.state.pedido.Pedidos;

        xlsxService
          .downloadTable({ pedidos: pedidos })
          .then(() => {
            this.downloadState++;
            downloadService
              .generatePdf()
              .then(() => {
                this.downloadState++;

                downloadService
                  .download()
                  .then(() => {
                    this.downloadState++;

                    fetch("http://200.131.219.57:3000/api/download/all", {
                      method: "GET",
                      headers: {
                        Authorization: `Bearer ${this.$store.state.auth.token}`,
                      },
                    })
                      .then((r) => r.blob())
                      .then((blob) => {
                        saveAs(blob, "data.zip");
                        this.downloadState++;

                        resolve();
                      })
                      .catch((e) => console.log(e));
                  })
                  .catch((e) => console.log(e));
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      });
    },

    async startDownload() {
      await this.download();
    },
  },
  computed: {
    downloadStateText() {
      switch (this.downloadState) {
        case 1:
          return "Preparando arquivos";
        case 2:
          return "Criando tabelas";
        case 3:
          return "Criando relatórios";
        case 4:
          return "Gerando arquivo .zip";
        case 5:
          return "Concluído";
      }
    },
  },
};
</script>

<style scoped>
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 5px;
}
.title-list {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  text-align: start;
}
.list-group {
  margin-bottom: 5px;
  width: 100%;
}
.list-group-item {
  padding: 8px 10px;
}
.loading-bar {
  border-radius: 5px;
  margin-bottom: 5px;
  overflow: hidden;
}
.loading-bar-content {
  transition: all 300ms ease;
  height: 8px;
  background-color: var(--light-blue);
}
.loading-text {
  font-size: 12px;
  margin: 0;
  width: 100%;
  position: relative;
  text-align: center;
  color: #999999;
}

/*Download Files Loading animation*/
.loadingEllipsis:after {
  position: absolute;
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;
  -webkit-animation: ellipsis steps(4, end) 900ms infinite;
  -moz-animation: ellipsis steps(4, end) 900ms infinite;
  -o-animation: ellipsis steps(4, end) 900ms infinite;
  animation: ellipsis steps(4, end) 900ms infinite;
  content: "\2026"; /* ascii code for the ellipsis character */
  width: 0px;
}
@-moz-keyframes ellipsis {
  to {
    width: 1.25em;
  }
}
@-o-keyframes ellipsis {
  to {
    width: 1.25em;
  }
}
@keyframes ellipsis {
  to {
    width: 1.25em;
  }
}
@-webkit-keyframes ellipsis {
  to {
    width: 1.25em;
  }
}
</style>
