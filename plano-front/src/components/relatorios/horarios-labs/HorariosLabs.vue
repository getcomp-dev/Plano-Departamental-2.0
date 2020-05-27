<template>
  <div class="main-component row p-0">
    <PageTitle :title="'Horários - Laborátorios'">
      <template #aside>
        <b-button
          v-b-modal.modalFiltros
          title="Filtros"
          class="btn-custom btn-icon cancelbtn"
        >
          <i class="fas fa-list-ul"></i>
        </b-button>

        <button
          type="button"
          class="btn-custom btn-icon relatbtn"
          title="Relatório"
          v-on:click.prevent="pdf"
        >
          <i class="far fa-file-pdf"></i>
        </button>

        <b-button
          v-b-modal.modalAjuda
          title="Ajuda"
          class="btn-custom btn-icon relatbtn"
        >
          <i class="fas fa-question"></i>
        </b-button>
      </template>
    </PageTitle>

    <div class="row w-100 m-0">
      <template
        v-if="
          LaboratoriosAtivados.length != 0 &&
            (semestreAtual == 1 || semestreAtual == 3)
        "
      >
        <h2 class="semestre-title w-100 px-2 bg-custom">
          1º SEMESTRE
        </h2>
        <div class="container-horarios pl-1">
          <template v-for="lab in LaboratoriosAtivados">
            <div class="div-table p-0" :key="'1-lab-id' + lab.id">
              <h3 class="lab-title">{{ lab.nome }}</h3>
              <TableHorariosLab
                :laboratorio="lab"
                :Turmas="Turmas1"
              ></TableHorariosLab>
            </div>
          </template>
        </div>
      </template>

      <template
        v-if="
          LaboratoriosAtivados.length != 0 &&
            (semestreAtual == 2 || semestreAtual == 3)
        "
      >
        <h2 class="semestre-title w-100 px-2 bg-custom">
          2º SEMESTRE
        </h2>
        <div class="container-horarios pl-1">
          <template v-for="lab in LaboratoriosAtivados">
            <div class="div-table p-0" :key="'2-lab-id' + lab.id">
              <h3 class="lab-title">{{ lab.nome }}</h3>

              <TableHorariosLab
                :laboratorio="lab"
                :Turmas="Turmas2"
              ></TableHorariosLab>
            </div>
          </template>
        </div>
      </template>
    </div>

    <b-modal id="modalFiltros" ref="modalFiltros" scrollable title="Filtros">
      <div class="p-0 m-0" style="height: 30px; width: 465px;">
        <ul
          class="nav nav-tabs card-header-tabs m-0"
          style="font-size: 11px !important; height: 30px;"
        >
          <li class="nav-item" @click="nav_ativo = 'labs'">
            <a
              class="nav-link border border-right-0"
              :class="[
                {
                  active: nav_ativo == 'labs',
                },
                'clickable',
              ]"
              >Laborátorios</a
            >
          </li>
          <li class="nav-item" @click="nav_ativo = 'semestre'">
            <a
              class="nav-link border"
              :class="[
                {
                  active: nav_ativo == 'semestre',
                },
                'clickable',
              ]"
              >Semestre</a
            >
          </li>
        </ul>
      </div>
      <div
        class="col m-0 p-0"
        style="width: max-content; height: 450px !important;"
      >
        <table
          v-if="nav_ativo == 'semestre'"
          class="table table-bordered table-sm modal-table"
          style="max-height: 392px !important;"
        >
          <thead class="thead-light sticky">
            <tr>
              <div style="font-size: 11px !important" class="max-content">
                <th>
                  <p style="width: 25px;" class="p-header"></p>
                </th>
                <th>
                  <p
                    class="p-header clickable-header"
                    style="width: 435px; text-align: start;"
                  >
                    Semestre Letivo
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <tr>
              <div style="width: max-content;">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      class="form-check-input position-static m-0"
                      v-model="semestre_1Ativo"
                    />
                  </div>
                </td>
                <td>
                  <p style="width: 435px; text-align: start;">PRIMEIRO</p>
                </td>
              </div>
            </tr>
            <tr>
              <div style="width: max-content;">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      class="form-check-input position-static m-0"
                      v-model="semestre_2Ativo"
                    />
                  </div>
                </td>
                <td>
                  <p style="width: 435px; text-align: start;">SEGUNDO</p>
                </td>
              </div>
            </tr>
          </tbody>
        </table>
        <!-- TABLE LABS -->
        <table
          v-else
          class="table table-sm modal-table table-bordered"
          style="max-height: 392px !important;"
        >
          <thead class="thead-light sticky">
            <tr>
              <div style="font-size: 11px !important" class="max-content">
                <th>
                  <p style="width: 25px !important;" class="p-header"></p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    @click="toggleOrdLab()"
                    style="width: 435px; text-align: start;"
                  >
                    Nome
                    <i
                      style="font-size: 0.6rem; text-align: right;"
                      :class="
                        ordemLab.type == 'asc'
                          ? 'fas fa-arrow-down fa-sm'
                          : 'fas fa-arrow-up fa-sm'
                      "
                    ></i>
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="laboratorio in Laboratorios"
              :key="`laboratorio${laboratorio.id}`"
            >
              <div style="width: max-content;">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      v-model="LaboratoriosSelecionados"
                      :value="laboratorio"
                      class="form-check-input position-static m-0"
                    />
                  </div>
                </td>
                <td>
                  <p
                    class="center-row"
                    style="width: 435px; text-align: start;"
                  >
                    {{ laboratorio.nome }}
                  </p>
                </td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>

      <div slot="modal-footer" class="w-100 m-0" style="display: flex;">
        <div class="w-100">
          <template v-if="nav_ativo == 'semestre'">
            <b-button
              class="btn-azul btn-custom btn-modal"
              variant="success"
              @click="selectAllSemestre()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-custom btn-modal"
              variant="secondary"
              @click="selectNoneSemestre()"
              >Desmarcar Todos</b-button
            >
          </template>

          <template v-else>
            <b-button
              class="btn-azul btn-custom btn-modal"
              variant="success"
              @click="selectAll()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-custom btn-modal"
              variant="secondary"
              @click="selectNone()"
              >Desmarcar Todos</b-button
            >
          </template>
        </div>
        <b-button
          variant="success"
          @click="btnOK()"
          class="btn-verde btn-custom btn-modal"
          style="padding-right: 15px !important; padding-left: 15px !important;"
          >OK</b-button
        >
      </div>
    </b-modal>
    <!-- Modals do botão para escolher laboratorio -->
    <b-modal
      id="modalLaboratorios"
      ref="LaboratoriosModal"
      size="md"
      title="Selecione os laboratórios"
      scrollable
    >
      <div slot="modal-footer" class="w-100 m-0" style="display: flex;">
        <div class="w-100 m-0 d-flex">
          <b-button
            class="btn-azul btn-custom btn-modal"
            variant="success"
            @click="selectAll()"
            >Selecionar Todos</b-button
          >
          <b-button
            class="btn-cinza btn-custom btn-modal"
            variant="secondary"
            @click="selectNone()"
            >Desmarcar Todos</b-button
          >
        </div>
        <b-button
          variant="success"
          @click="btnOK()"
          class="btn-verde btn-df mr-0"
          style="padding-right: 15px !important; padding-left: 15px !important;"
          >OK</b-button
        >
      </div>
    </b-modal>

    <!-- MODAL DE AJUDA -->
    <b-modal
      id="modalAjuda"
      ref="ajudaModal"
      scrollable
      title="Ajuda"
      hide-footer
    >
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para exibir conteúdo na tela:</strong> Clique em
            Laboratórios
            <i
              class="fas fa-list-ul cancelbtn px-1"
              style="font-size: 12px;"
            ></i>
            e selecione o(s) laboratório(s) que deseja ver, em seguida confirme
            em OK. Caso queira ver todos basta clicar em Selecionar Todos.
          </li>
          <li class="list-group-item">
            <strong>Para gerar relatório:</strong> Clique no botão Relatório
            <i
              class="far fa-file-pdf relatbtn px-1"
              style="font-size: 12px;"
            ></i>
            e aguarde para fazer
            <font style="font-style: italic;">download</font> do mesmo.
          </li>
        </ul>
      </div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import pdfs from "@/common/services/pdfs";
import PageTitle from "@/components/PageTitle";
import TableHorariosLab from "./TableHorariosLab";
export default {
  name: "DashboardLaboratoriosAlocacao",
  components: {
    PageTitle,
    TableHorariosLab,
  },
  data() {
    return {
      value: 0,
      LaboratoriosSelecionados: [],
      LaboratoriosAtivados: [],
      semestre_1Ativo: true,
      semestre_2Ativo: true,
      semestreAtual: 3,
      nav_ativo: "labs",
      ordemLab: { order: "nome", type: "asc" },
    };
  },
  methods: {
    btnOKSemestre() {
      if (this.semestre_1Ativo && !this.semestre_2Ativo) {
        this.semestreAtual = 1;
      } else if (this.semestre_2Ativo && !this.semestre_1Ativo) {
        this.semestreAtual = 2;
      } else if (this.semestre_1Ativo && this.semestre_1Ativo) {
        this.semestreAtual = 3;
      } else {
        this.semestreAtual = undefined;
      }
    },
    toggleOrdLab() {
      this.ordemLab.type = this.ordemLab.type == "asc" ? "desc" : "asc";
    },
    selectAllSemestre() {
      this.semestre_1Ativo = true;
      this.semestre_2Ativo = true;
    },
    selectNoneSemestre() {
      this.semestre_1Ativo = false;
      this.semestre_2Ativo = false;
    },
    btnOK() {
      this.btnOKSemestre();
      //Somente atualiza o vetor de perfis ativados quando o botão OK for clickado
      this.LaboratoriosAtivados = [
        ..._.orderBy(this.LaboratoriosSelecionados, "id"),
      ];
      this.nav_ativo = "labs";
      this.$refs.modalFiltros.hide();
    },

    selectAll() {
      let labs = _.filter(this.$store.state.sala.Salas, ["laboratorio", true]);
      if (this.LaboratoriosSelecionados != [])
        this.LaboratoriosSelecionados = [];
      for (var i = 0; i < labs.length; i++)
        this.LaboratoriosSelecionados.push(labs[i]);
    },

    selectNone() {
      this.LaboratoriosSelecionados = [];
    },

    pdf() {
      pdfs.pdfAlocacaoLabs();
    },
  },
  computed: {
    Laboratorios() {
      return _.orderBy(
        _.filter(this.$store.state.sala.Salas, ["laboratorio", true]),
        this.ordemLab.order,
        this.ordemLab.type
      );
    },

    Turmas1() {
      return _.concat(
        _.filter(this.$store.state.turma.Turmas, ["periodo", 1]),
        _.filter(this.$store.state.turmaExterna.Turmas, ["periodo", 1])
      );
    },

    Turmas2() {
      return _.concat(
        _.filter(this.$store.state.turma.Turmas, ["periodo", 3]),
        _.filter(this.$store.state.turmaExterna.Turmas, ["periodo", 3])
      );
    },
  },
};
</script>

<style scoped>
.semestre-title {
  clear: both;
  display: block;
  padding-top: 0px;
  text-align: start !important;
  font-weight: bold;
  font-size: 18px;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}
.lab-title {
  width: 100%;
  text-align: start !important;
  font-size: 12px !important;
  font-weight: bold !important;
}

.container-horarios {
  width: 100% !important;
  max-width: 1550px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  flex-direction: row !important;
  flex-wrap: wrap !important;
}
.container-horarios .div-table {
  min-width: max-content;
}

@media screen and (min-width: 1570px) and (max-width: 1741px) {
  .container-horarios {
    margin-right: 10% !important;
  }
}
@media screen and (min-width: 1741px) and (max-width: 1905px) {
  .container-horarios {
    margin-right: 18% !important;
  }
}
@media screen and (min-width: 1906px) and (max-width: 1965px) {
  .container-horarios {
    margin-right: 22% !important;
  }
}

@media screen and (max-width: 575px) {
  .div-titulo {
    height: 70px !important;
  }
}
</style>
