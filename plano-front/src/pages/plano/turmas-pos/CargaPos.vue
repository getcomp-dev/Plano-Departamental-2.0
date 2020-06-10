<template>
  <div class="main-component row">
    <PageTitle :title="'Pós Graduação'">
      <template #aside>
        <b-button
          v-b-modal.modalFiltros
          title="Filtros"
          class="btn-custom btn-icon cancelbtn"
        >
          <i class="fas fa-list-ul"></i>
        </b-button>
        <!--  -->
        <b-button
          v-show="isAdding"
          title="Salvar"
          class="btn-custom btn-icon addbtn"
          @click.prevent="toggleAdd"
        >
          <i class="fas fa-check"></i>
        </b-button>
        <button
          v-show="isAdding"
          type="button"
          title="Cancelar"
          class="btn-custom btn-icon cancelbtn"
          @click="toggleAdd"
        >
          <i class="fas fa-times"></i>
        </button>
        <!--  -->
        <button
          v-show="!isAdding"
          type="button"
          title="Adicionar"
          class="btn-custom btn-icon addbtn"
          @click="toggleAdd"
        >
          <i class="fas fa-plus"></i>
        </button>

        <button
          v-show="!isAdding"
          type="button"
          title="Deletar selecionados"
          class="btn-custom btn-icon delbtn"
          v-b-modal.modalConfirma
        >
          <i class="far fa-trash-alt"></i>
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
      <div class="div-table">
        <BaseTable>
          <template #thead>
            <th style="width:70px" class="p-0">Programa</th>
            <th style="width:25px"></th>
            <th style="width:55px" title="Trimestre">T.</th>
            <th style="width:145px" class="t-start">Docente</th>
            <th style="width:50px" title="Carga">C.</th>
          </template>

          <template #tbody>
            <tr v-show="isAdding" class="novaturma stickyAdd ">
              <div class="max-content stickyAdd">
                <td style="width:70px" class="less-padding">
                  <select
                    type="text"
                    id="programa"
                    v-model="cargaPosForm.programa"
                  >
                    <option type="text" value="PGMC">PGMC</option>
                    <option type="text" value="PGCC">PGCC</option>
                    <option type="text" value="PGEM">PGEM</option>
                  </select>
                </td>
                <td style="width:25px"><div style="height:30px"></div></td>
                <td style="width:55px" class="less-padding">
                  <select
                    type="text"
                    id="programa"
                    v-model="cargaPosForm.trimestre"
                  >
                    <option type="text" value="1">1</option>
                    <option type="text" value="2">2</option>
                    <option type="text" value="3">3</option>
                  </select>
                </td>
                <td style="width:145px" class="less-padding">
                  <select
                    type="text"
                    id="docente1"
                    v-model="cargaPosForm.Docente"
                  >
                    <option v-if="Docentes.length === 0" type="text" value
                      >Nenhum Docente Encontrado</option
                    >
                    <option
                      v-for="docente in Docentes"
                      :key="'id docente' + docente.id"
                      :value="docente.id"
                      >{{ docente.apelido }}</option
                    >
                  </select>
                </td>
                <td style="width:50px" class="less-padding">
                  <input
                    type="text"
                    id="creditos"
                    v-model="cargaPosForm.creditos"
                    @keypress="onlyNumber"
                  />
                </td>
              </div>
            </tr>

            <tr class="bg-custom">
              <div class="max-content">
                <td style="width:70px">PGMC</td>
                <td style="width:275px" class="t-start"></td>
              </div>
            </tr>
            <template v-for="t in vetorPeriodosPGMC">
              <template v-for="docente in Docentes">
                <template v-for="carga in CargasPGMC">
                  <tr
                    v-if="checkPGMC(carga, docente, t)"
                    :key="'MC-docente' + docente.id + 'carga' + carga.id + t"
                    v-on:click="handleClickInTurma(carga, docente.apelido)"
                    :class="{ 'bg-custom': linhaClickada == carga.id }"
                  >
                    <template
                      v-if="
                        (carga.trimestre == 1 || carga.trimestre == 2) &&
                          (filtroSemestres.ativo == 1 ||
                            filtroSemestres.ativo == 3)
                      "
                    >
                      <CargaPosRow
                        :key="'1-MC' + docente.id + 'carga' + carga.id"
                        v-bind:carga="carga"
                      ></CargaPosRow>
                    </template>
                    <template
                      v-if="
                        (carga.trimestre == 3 || carga.trimestre == 4) &&
                          (filtroSemestres.ativo == 2 ||
                            filtroSemestres.ativo == 3)
                      "
                    >
                      <CargaPosRow
                        :key="'2-MC' + docente.id + 'carga' + carga.id"
                        v-bind:carga="carga"
                      ></CargaPosRow>
                    </template>
                  </tr>
                </template>
              </template>
            </template>

            <tr class="bg-custom">
              <div class="max-content">
                <td style="width:70px">PGCC</td>
                <td style="width:275px"></td>
              </div>
            </tr>
            <template v-for="t in vetorPeriodosPGCC">
              <template v-for="docente in Docentes">
                <template v-for="carga in CargasPGCC">
                  <tr
                    v-if="checkPGCC(carga, docente, t)"
                    :key="'CC-docente' + docente.id + 'carga' + carga.id + t"
                    v-on:click="handleClickInTurma(carga, docente.apelido)"
                    :class="{ 'bg-custom': linhaClickada == carga.id }"
                  >
                    <template
                      v-if="
                        (carga.trimestre == 1 || carga.trimestre == 2) &&
                          (filtroSemestres.ativo == 1 ||
                            filtroSemestres.ativo == 3)
                      "
                    >
                      <CargaPosRow
                        :key="'CC-docente' + docente.id + 'carga' + carga.id"
                        v-bind:carga="carga"
                      ></CargaPosRow>
                    </template>
                    <template
                      v-if="
                        (carga.trimestre == 3 || carga.trimestre == 4) &&
                          (filtroSemestres.ativo == 2 ||
                            filtroSemestres.ativo == 3)
                      "
                    >
                      <CargaPosRow
                        :key="'CC-docente' + docente.id + 'carga' + carga.id"
                        v-bind:carga="carga"
                      ></CargaPosRow>
                    </template>
                  </tr>
                </template>
              </template>
            </template>

            <tr class="bg-custom">
              <div class="max-content">
                <td style="width:70px">PGEM</td>
                <td style="width:275px"></td>
              </div>
            </tr>
            <template v-for="t in vetorPeriodosPGEM">
              <template v-for="docente in Docentes">
                <template v-for="carga in CargasPGEM">
                  <tr
                    v-if="checkPGEM(carga, docente, t)"
                    :key="'EM-docente' + docente.id + 'carga' + carga.id + t"
                    v-on:click="handleClickInTurma(carga, docente.apelido)"
                    :class="{ 'bg-custom': linhaClickada == carga.id }"
                  >
                    <template
                      v-if="
                        (carga.trimestre == 1 || carga.trimestre == 2) &&
                          (filtroSemestres.ativo == 1 ||
                            filtroSemestres.ativo == 3)
                      "
                    >
                      <CargaPosRow
                        :key="'EM-docente' + docente.id + 'carga' + carga.id"
                        v-bind:carga="carga"
                      ></CargaPosRow>
                    </template>
                    <template
                      v-if="
                        (carga.trimestre == 3 || carga.trimestre == 4) &&
                          (filtroSemestres.ativo == 2 ||
                            filtroSemestres.ativo == 3)
                      "
                    >
                      <CargaPosRow
                        :key="'EM-docente' + docente.id + 'carga' + carga.id"
                        v-bind:carga="carga"
                      ></CargaPosRow>
                    </template>
                  </tr>
                </template>
              </template>
            </template>
          </template>
        </BaseTable>
      </div>

      <!-- Card -->
      <div class="div-card p-0 mt-0 mb-2 col-auto">
        <div class="card mr-3 ml-auto">
          <div class="card-header">
            <h2 class="card-title">Creditação Pós</h2>
          </div>
          <div class="card-body">
            <form>
              <div class="row mb-2 mx-0">
                <div class="form-group col-4 m-0 px-0">
                  <label for="trimestre" class="col-form-label"
                    >Trimestre</label
                  >
                  <input
                    type="text"
                    class="inputMenor form-control form-control-sm"
                    id="trimestre"
                    v-model="cargaPosForm.trimestre"
                    @keypress="onlyNumber"
                  />
                </div>

                <div class="form-group col-8 m-0 px-0">
                  <label for="docente" class="col-form-label">Docente</label>
                  <select
                    type="text"
                    class="form-control form-control-sm selectMenor"
                    id="docente1"
                    v-model="cargaPosForm.Docente"
                  >
                    <option v-if="Docentes.length === 0" type="text" value
                      >Nenhum Docente Encontrado</option
                    >
                    <option
                      v-for="docente in Docentes"
                      :key="'id docente' + docente.id"
                      :value="docente.id"
                      >{{ docente.apelido }}</option
                    >
                  </select>
                </div>
              </div>

              <div class="row mb-2 mx-0">
                <div class="form-group col-4 m-0 px-0">
                  <label for="creditos" class="col-form-label">Créditos</label>
                  <input
                    type="text"
                    class="form-control form-control-sm inputMenor"
                    id="creditos"
                    v-model="cargaPosForm.creditos"
                    @keypress="onlyNumber"
                  />
                </div>

                <div class="form-group col-8 m-0 px-0">
                  <label for="programa" class="col-form-label">Programa</label>
                  <select
                    type="text"
                    class="form-control form-control-sm"
                    id="programa"
                    v-model="cargaPosForm.programa"
                  >
                    <option type="text" value="PGMC">PGMC</option>
                    <option type="text" value="PGCC">PGCC</option>
                    <option type="text" value="PGEM">PGEM</option>
                  </select>
                </div>
              </div>

              <!-- Botões -->
              <div class="row mb-0 mt-3 mx-0">
                <div class="d-flex mr-0 ml-auto">
                  <template v-if="isEditing">
                    <button
                      type="button"
                      title="Salvar"
                      class="btn-custom btn-icon addbtn"
                      v-on:click.prevent="editCarga(cargaPosForm)"
                      style="max-width:80px;"
                    >
                      <i class="fas fa-check"></i>
                    </button>
                    <button
                      type="button"
                      title="Deletar"
                      class="btn-custom btn-icon delbtn"
                      v-b-modal.modalConfirma2
                      style="max-width:80px;"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                    <button
                      type="button"
                      title="Cancelar"
                      class="btn-custom btn-icon cancelbtn"
                      v-on:click.prevent="cleanCarga"
                      style="max-width:80px;"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </template>

                  <template v-else>
                    <button
                      type="button"
                      title="Adicionar"
                      class="btn-custom btn-icon addbtn"
                      v-on:click.prevent="addCarga"
                      style="max-width:80px;"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                    <button
                      type="button"
                      title="Cancelar"
                      class="btn-custom btn-icon cancelbtn"
                      v-on:click.prevent="cleanCarga"
                      style="max-width:80px;"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </template>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL CONFIRMA de varias carga  -->
    <b-modal id="modalConfirma" title="Confirmar Seleção" @ok="deleteSelected">
      <template v-if="Deletar.length === 0">
        <p class="my-4">Nenhuma carga selecionada!</p>
      </template>
      <template v-else>
        <p class="my-4">
          Tem certeza que deseja deletar as cargas selecionadas?
        </p>
        <template v-for="carga in Deletar">
          <template v-for="docente in Docentes">
            <template v-if="docente.id === carga.Docente">
              <p :key="'carga id' + carga.id + 'docente' + docente.id">
                Docente:{{ docente.apelido }}
                <br />
                Programa:{{ carga.programa }}
                <br />
                Trimestre:{{ carga.trimestre }}
              </p>
            </template>
          </template>
        </template>
      </template>
    </b-modal>

    <!-- MODAL CONFIRMA de uma carga  -->
    <b-modal
      id="modalConfirma2"
      title="Confirmar Seleção"
      @ok="deleteCarga(cargaPosForm)"
    >
      <p class="my-4">Tem certeza que deseja deletar esta carga ?</p>
      <p>
        Docente:{{ apelidoDocenteClikado }}
        <br />
        Programa:{{ cargaPosForm.programa }}
        <br />
        Trimestre:{{ cargaPosForm.trimestre }}
      </p>
    </b-modal>

    <!-- MODAL SEMESTRE -->
    <b-modal id="modalFiltros" ref="modalFiltros" scrollable title="Filtros">
      <NavTab
        :currentTab="modalTabAtiva"
        :allTabs="['Semestres']"
        @change-tab="modalTabAtiva = $event"
      />

      <div class="div-table">
        <BaseTable
          v-show="modalTabAtiva === 'Semestres'"
          :tableType="'modal-table'"
        >
          <template #thead>
            <th style="width: 25px"></th>
            <th class="t-start" style="width: 425px">
              Semestre Letivo
            </th>
          </template>
          <template #tbody>
            <tr>
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  v-model="filtroSemestres.primeiro"
                />
              </td>
              <td style="width: 425px" class="t-start">PRIMEIRO</td>
            </tr>
            <tr>
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  v-model="filtroSemestres.segundo"
                />
              </td>
              <td style="width: 425px" class="t-start">SEGUNDO</td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <div slot="modal-footer" class="w-100 m-0 d-flex">
        <div class="w-100">
          <b-button
            class="btn-azul btn-custom btn-modal"
            variant="success"
            @click="modalSelectAll[modalTabAtiva]"
            >Selecionar Todos</b-button
          >
          <b-button
            class="btn-cinza btn-custom btn-modal"
            variant="secondary"
            @click="modalSelectNone[modalTabAtiva]"
            >Desmarcar Todos</b-button
          >
        </div>
        <b-button
          variant="success"
          @click="btnOkFiltros()"
          class="btn-verde btn-custom btn-modal btn-ok-modal"
          >OK</b-button
        >
      </div>
    </b-modal>

    <!-- MODAL AJUDA -->
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
            <strong>Para adicionar docentes à Tabela:</strong> Preencha o cartão
            à direita. Após concluído, clique em Adicionar
            <i class="fas fa-plus addbtn px-1" style="font-size:12px"></i>
            ou em Cancelar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para editar docentes da Tabela:</strong> Na tabela, clique
            no docente que deseja alterar. No cartão à direita faça as mudanças
            desejadas e, em seguida, clique em Salvar
            <i class="fas fa-check addbtn px-1" style="font-size:12px"></i>
            ou em Cancelar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para deletar docentes da Tabela:</strong> Marque o(s)
            docente(s) que deseja deletar através da caixa de seleção à esquerda
            e em seguida clique em Deletar Selecionados
            <i class="far fa-trash-alt delbtn px-1" style="font-size: 12px"></i>
            e confirme no botão OK.
          </li>
          <li class="list-group-item">
            <strong>Para alterar ordenação:</strong> Clique em Docente ou em T.
            no cabeçalho de cada tabela para alternar a ordenação entre
            alfabética e por trimestre.
          </li>
        </ul>
      </div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import cargaPosService from "@/common/services/cargaPos";
import CargaPosRow from "./CargaPosRow.vue";
import PageTitle from "@/components/PageTitle.vue";
import BaseTable from "@/components/BaseTable.vue";
import NavTab from "@/components/NavTab.vue";

const emptyCarga = {
  id: undefined,
  trimestre: undefined,
  Docente: undefined,
  programa: undefined,
  creditos: undefined,
};

export default {
  name: "DashboardCargaPos",
  components: {
    CargaPosRow,
    PageTitle,
    BaseTable,
    NavTab,
  },
  data() {
    return {
      isAdding: false,
      cargaPosForm: _.clone(emptyCarga),
      error: undefined,
      atual: undefined,
      trimestre: 1,
      programa: "PGCC",
      vetorPeriodosPGMC: [1, 2, 3, 4],
      vetorPeriodosPGCC: [1, 2, 3, 4],
      vetorPeriodosPGEM: [1, 2, 3, 4],
      ordenacaoAtualPGMC: "periodo",
      ordenacaoAtualPGCC: "periodo",
      ordenacaoAtualPGEM: "periodo",
      scrollSize: undefined,
      isEditing: false,
      linhaClickada: null,
      apelidoDocenteClikado: null,
      filtroSemestres: {
        primeiro: true,
        segundo: true,
        ativo: 3,
      },
      modalTabAtiva: "Semestres",
      modalSelectAll: {
        Semestres: () => {
          this.filtroSemestres.primeiro = true;
          this.filtroSemestres.segundo = true;
        },
      },
      modalSelectNone: {
        Semestres: () => {
          this.filtroSemestres.primeiro = false;
          this.filtroSemestres.segundo = false;
        },
      },
    };
  },
  created() {
    if (!this.Admin) {
      this.$notify({
        group: "general",
        title: "Erro",
        text:
          "Acesso negado! Usuário não possui permissão para acessar esta página!",
        type: "error",
      });
      this.$router.push({ name: "dashboard" });
    }
  },

  methods: {
    toggleAdd() {
      this.isAdding = !this.isAdding;
    },
    btnOkFiltros() {
      this.setSemestreAtivo();
      this.$refs.modalFiltros.hide();
    },
    setSemestreAtivo() {
      if (this.filtroSemestres.primeiro && !this.filtroSemestres.segundo)
        this.filtroSemestres.ativo = 1;
      else if (this.filtroSemestres.segundo && !this.filtroSemestres.primeiro)
        this.filtroSemestres.ativo = 2;
      else if (this.filtroSemestres.primeiro && this.filtroSemestres.primeiro)
        this.filtroSemestres.ativo = 3;
      else this.filtroSemestres.ativo = undefined;
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    clearClick() {
      this.isEditing = false;
      this.linhaClickada = null;
    },
    handleClickInTurma(carga, apelido) {
      this.cleanCarga();

      this.isEditing = true;
      this.linhaClickada = carga.id;
      this.apelidoDocenteClikado = apelido;
      this.cargaPosForm = _.clone(carga);
    },

    toggleOrdenacaoPGMC(ordenacao) {
      if (ordenacao === "nome") {
        this.ordenacaoAtualPGMC = "nome";
        this.vetorPeriodosPGMC = [1];
      } else {
        this.ordenacaoAtualPGMC = "periodo";
        this.vetorPeriodosPGMC = [1, 2, 3, 4];
      }
    },
    toggleOrdenacaoPGCC(ordenacao) {
      if (ordenacao === "nome") {
        this.ordenacaoAtualPGCC = "nome";
        this.vetorPeriodosPGCC = [1];
      } else {
        this.ordenacaoAtualPGCC = "periodo";
        this.vetorPeriodosPGCC = [1, 2, 3, 4];
      }
    },
    toggleOrdenacaoPGEM(ordenacao) {
      if (ordenacao === "nome") {
        this.ordenacaoAtualPGEM = "nome";
        this.vetorPeriodosPGEM = [1];
      } else {
        this.ordenacaoAtualPGEM = "periodo";
        this.vetorPeriodosPGEM = [1, 2, 3, 4];
      }
    },

    checkPGMC(carga, docente, t) {
      if (this.ordenacaoAtualPGMC === "periodo")
        return carga.Docente === docente.id && carga.trimestre == t;
      else return carga.Docente === docente.id;
    },

    checkPGCC(carga, docente, t) {
      if (this.ordenacaoAtualPGCC === "periodo")
        return carga.Docente === docente.id && carga.trimestre == t;
      else return carga.Docente === docente.id;
    },

    checkPGEM(carga, docente, t) {
      if (this.ordenacaoAtualPGEM === "periodo")
        return carga.Docente === docente.id && carga.trimestre == t;
      else return carga.Docente === docente.id;
    },

    editCarga(carga) {
      cargaPosService
        .update(carga.id, this.cargaPosForm)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Carga ${response.CargaPos.programa} foi atualizada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao atualizar Carga</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    deleteCarga(carga) {
      cargaPosService
        .delete(carga.id)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Carga ${response.CargaPos.programa} foi excluída!`,
            type: "success",
          });
          this.cleanCarga();
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Carga</b>";
        });
    },

    deleteSelected: function() {
      var cargas = this.$store.state.cargaPos.Deletar;
      for (var i = 0; i < cargas.length; i++) {
        this.deleteCarga(cargas[i]);
      }
      this.$store.commit("emptyDeleteCarga");
    },

    addCarga() {
      cargaPosService
        .create(this.cargaPosForm)
        .then((response) => {
          this.trimestre = response.CargaPos.trimestre;
          this.programa = response.CargaPos.programa;
          this.cleanCarga();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Carga ${response.CargaPos.programa} foi criada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao criar Carga</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },
    cleanCarga() {
      this.clearClick();
      this.cargaPosForm = _.clone(emptyCarga);
      this.cargaPosForm.trimestre = "";
      this.cargaPosForm.id = "";
      this.cargaPosForm.programa = "";
      this.error = undefined;
    },
  },

  computed: {
    CreditoTotal_PGMC: function() {
      let total = 0;

      for (var t = 1; t <= 4; t++) {
        for (let k = 0; k < this.Docentes.length; k++) {
          for (let i = 0; i < this.CargasPGMC.length; i++) {
            if (this.filtroSemestres.ativo == 1) {
              if (
                this.CargasPGMC[i].Docente === this.Docentes[k].id &&
                this.CargasPGMC[i].trimestre == t &&
                (this.CargasPGMC[i].trimestre == 1 ||
                  this.CargasPGMC[i].trimestre == 2)
              ) {
                total += this.CargasPGMC[i].creditos;
              }
            } else if (this.filtroSemestres.ativo == 2) {
              if (
                this.CargasPGMC[i].Docente === this.Docentes[k].id &&
                this.CargasPGMC[i].trimestre == t &&
                this.CargasPGMC[i].trimestre == 3
              ) {
                total += this.CargasPGMC[i].creditos;
              }
            } else if (this.filtroSemestres.ativo == 3) {
              if (
                this.CargasPGMC[i].Docente === this.Docentes[k].id &&
                this.CargasPGMC[i].trimestre == t &&
                (this.CargasPGCC[i].trimestre == 1 ||
                  this.CargasPGCC[i].trimestre == 2 ||
                  this.CargasPGCC[i].trimestre == 3)
              ) {
                total += this.CargasPGMC[i].creditos;
              }
            }
          }
        }
      }
      return total;
    },
    CreditoTotal_PGCC: function() {
      let total = 0;

      for (var t = 1; t <= 4; t++) {
        for (let k = 0; k < this.Docentes.length; k++) {
          for (let i = 0; i < this.CargasPGCC.length; i++) {
            if (this.filtroSemestres.ativo == 1) {
              if (
                this.CargasPGCC[i].Docente === this.Docentes[k].id &&
                this.CargasPGCC[i].trimestre == t &&
                (this.CargasPGCC[i].trimestre == 1 ||
                  this.CargasPGCC[i].trimestre == 2)
              ) {
                total += this.CargasPGCC[i].creditos;
              }
            } else if (this.filtroSemestres.ativo == 2) {
              if (
                this.CargasPGCC[i].Docente === this.Docentes[k].id &&
                this.CargasPGCC[i].trimestre == t &&
                this.CargasPGCC[i].trimestre == 3
              ) {
                total += this.CargasPGCC[i].creditos;
              }
            } else if (this.filtroSemestres.ativo == 3) {
              if (
                this.CargasPGCC[i].Docente === this.Docentes[k].id &&
                this.CargasPGCC[i].trimestre == t &&
                (this.CargasPGCC[i].trimestre == 1 ||
                  this.CargasPGCC[i].trimestre == 2 ||
                  this.CargasPGCC[i].trimestre == 3)
              ) {
                total += this.CargasPGCC[i].creditos;
              }
            }
          }
        }
      }
      return total;
    },
    CreditoTotal_PGEM: function() {
      let total = 0;

      for (var t = 1; t <= 4; t++) {
        for (let k = 0; k < this.Docentes.length; k++) {
          for (let i = 0; i < this.CargasPGEM.length; i++) {
            if (this.filtroSemestres.ativo == 1) {
              if (
                this.CargasPGEM[i].Docente === this.Docentes[k].id &&
                this.CargasPGEM[i].trimestre == t &&
                (this.CargasPGEM[i].trimestre == 1 ||
                  this.CargasPGEM[i].trimestre == 2)
              ) {
                total += this.CargasPGEM[i].creditos;
              }
            } else if (this.filtroSemestres.ativo == 2) {
              if (
                this.CargasPGEM[i].Docente === this.Docentes[k].id &&
                this.CargasPGEM[i].trimestre == t &&
                this.CargasPGEM[i].trimestre == 3
              ) {
                total += this.CargasPGEM[i].creditos;
              }
            } else if (this.filtroSemestres.ativo == 3) {
              if (
                this.CargasPGEM[i].Docente === this.Docentes[k].id &&
                this.CargasPGEM[i].trimestre == t &&
                (this.CargasPGCC[i].trimestre == 1 ||
                  this.CargasPGCC[i].trimestre == 2 ||
                  this.CargasPGCC[i].trimestre == 3)
              ) {
                total += this.CargasPGEM[i].creditos;
              }
            }
          }
        }
      }
      return total;
    },

    Docentes() {
      return _.orderBy(
        _.filter(this.$store.state.docente.Docentes, ["ativo", true]),
        "apelido"
      );
    },

    Deletar() {
      return this.$store.state.cargaPos.Deletar;
    },

    CargasPGCC() {
      return _.orderBy(
        _.filter(this.$store.state.cargaPos.Cargas, ["programa", "PGCC"]),
        "trimestre"
      );
    },

    CargasPGMC() {
      return _.orderBy(
        _.filter(this.$store.state.cargaPos.Cargas, ["programa", "PGMC"]),
        "trimestre"
      );
    },

    CargasPGEM() {
      return _.orderBy(
        _.filter(this.$store.state.cargaPos.Cargas, ["programa", "PGEM"]),
        "trimestre"
      );
    },

    isLoading() {
      return this.$store.state.isLoading;
    },

    Admin() {
      if (this.$store.state.auth.Usuario.admin === 1) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.novaturma {
  font-size: 11px !important;
  background-color: #cecece;
}
.novaturma td {
  margin: 0 !important;
  padding: 0 5px;
  vertical-align: middle !important;
  text-align: center;
  word-break: break-word;
}
.novaturma .less-padding {
  padding: 0 2px;
}
.novaturma select {
  padding: 0 0 !important;
  font-size: 11px !important;
  width: 100% !important;
  height: 18px !important;
}
.novaturma input[type="text"] {
  font-size: 11px !important;
  width: 100% !important;
  height: 18px !important;
  text-align: center !important;
}
.stickyAdd {
  background-color: #cecece;
  display: block;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 19px !important;
  overflow: hidden !important;
  z-index: 5 !important;
}

.div-card {
  margin-left: auto;
}
.card-title {
  font-size: 16px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
  text-align: center;
}
.card {
  width: 260px;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
  margin-left: auto;
}
.card-body {
  font-size: 12px !important;
  padding-top: 15px;
}
.card label {
  line-height: 1.2;
  font-size: 12px;
  text-align: start;
  padding-top: 0 !important;
}
.card select {
  height: 25px !important;
  font-size: 11px !important;
  padding: 0px 5px 0px 5px !important;
  min-width: 100px;
  max-width: 100px;
  text-align: center;
}
.selectMenor {
  min-width: 140px;
  max-width: 140px;
  text-align: start !important;
}
.card input,
.main-table input {
  height: 25px !important;
  padding: 0px 5px 0px 5px !important;
  font-size: 11px !important;
  text-align: start;
}
.inputMenor {
  max-width: 50px;
  min-width: 50px;
  text-align: center;
}
.alert {
  background-color: #e9ecef !important;
  border: none;
}

@media screen and (max-width: 995px) {
  /* .div-card {
    margin-left: 0px !important;
    margin-right: 50px !important;
    top: 0 !important;
  }

  .card {
    margin-left: 0px !important;
  } */
}
</style>
