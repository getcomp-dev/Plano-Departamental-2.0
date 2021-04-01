<template>
  <BaseModal ref="baseModalDownload" title="Download" type="fromNavbar">
    <template #modal-body>
      <div class="modal-download-content">
        <div class="title-container pl-1">
          <h2 class="title">Arquivos inclusos:</h2>
          <BaseButton
            text="Iniciar download"
            color="darkblue"
            @click="startDownload"
            :disabled="downloadState !== 0 && downloadState !== 5"
          />
        </div>

        <ul class="list-group">
          <li class="list-group-item">Tabela de turmas DCC (.xlsx)</li>
          <li class="list-group-item">Backup do banco de dados (.sql)</li>
          <li class="list-group-item">PDF de carga dos docentes</li>
          <li class="list-group-item">PDF de horarios dos cursos</li>
          <li class="list-group-item">PDF de horarios dos laborátorios</li>
        </ul>

        <div class="loading-container">
          <div class="loading-bar">
            <div class="loading-bar-content" :style="`width: ${downloadState * 20}%`"></div>
          </div>

          <p class="loading-text">
            {{ downloadStateText }}
            <i v-show="downloadState !== 0 && downloadState !== 5" class="loading-ellipsis"></i>
          </p>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapGetters } from "vuex";
import { saveAs } from "file-saver";
import xlsxService from "@/services/xlsx";
import downloadService from "@/services/download";

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
    close() {
      this.$refs.baseModalDownload.close();
    },
    resetDownloadState() {
      this.downloadState = 0;
    },
    async startDownload() {
      try {
        this.resetDownloadState();
        this.downloadState++;

        await xlsxService.downloadTable({ pedidos: this.Pedidos, Plano: this.currentPlano.id });
        this.downloadState++;
        await downloadService.generatePdf({ Plano: this.currentPlano.id });
        this.downloadState++;
        await downloadService.download();
        this.downloadState++;

        const planoData = await fetch("http://localhost:3000/api/download/all", {
          method: "GET",
          headers: { Authorization: `Bearer ${this.$store.state.auth.token}` },
        });

        const dataBlobed = await planoData.blob();
        await saveAs(dataBlobed, "data.zip");
        this.downloadState++;

        setTimeout(() => {
          this.close();
          this.resetDownloadState();
        }, 1000);
      } catch (error) {
        console.log(error);
        this.pushNotification({
          type: "error",
          title: "Erro ao fazer download",
          text: "Tente novamente mais tarde",
        });
        this.close();
        this.resetDownloadState();
      }
    },
  },

  computed: {
    ...mapGetters(["Pedidos"]),

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
      default:
        return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme.scss";

.modal-download-content {
  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 5px;

    .title {
      font-size: 16px;
      font-weight: bold;
      margin: 0;
      text-align: start;
    }
  }

  .list-group {
    margin-bottom: 5px;
    width: 100%;

    .list-group-item {
      padding: 8px 10px;
    }
  }

  .loading-container {
    width: 100%;

    .loading-bar {
      width: 100%;
      border-radius: 5px;
      margin-bottom: 5px;
      overflow: hidden;

      .loading-bar-content {
        height: 8px;
        background-color: $clr-lightblue;
        transition: all 300ms ease;
      }
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
    .loading-ellipsis:after {
      position: absolute;
      overflow: hidden;
      display: inline-block;
      vertical-align: bottom;
      animation: ellipsis steps(4, end) 900ms infinite;
      content: "\2026"; /* ascii code for the ellipsis character */
      width: 0px;
    }
  }
}

@keyframes ellipsis {
  to {
    width: 1.25em;
  }
}
</style>
