<template>
  <div class="CargaPos row pr-2" v-if="Admin">
    <!-- Titulo -->
    <div
      class="div-titulo col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height:38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="titulo col-xl-2 col-md-3 col-sm-4 col-5 px-0 pr-1">Creditação Pós</h1>

        <div
          class="form-group form-group-top col-xl-10 col-md-9 col-sm-8 col-7 mb-0 p-0"
          style="justify-content: flex-end!important;"
        >
          <div class="input-group mr-3 ml-auto mb-0 mt-0 p-0">
            <select
              class="form-control form-control-top form-control-sm form-control-top"
              v-model="periodos"
              v-on:change="CreditoTotal_PGMC, CreditoTotal_PGCC, CreditoTotal_PGEM"
            >
              <option value="1">Primeiro</option>
              <option value="2">Segundo</option>
              <option value="3">Ambos</option>
            </select>
            <div class="input-group-append">
              <label class="input-group-text">Semestre</label>
            </div>
          </div>

          <div class="d-flex p-0 m-0 mt-1">
            <button
              type="button"
              title="Deletar selecionados"
              class="delbtn"
              v-b-modal.modalConfirma
              style="max-width:80px;"
            >
              <i class="far fa-trash-alt"></i>
            </button>

            <b-button v-b-modal.modalAjuda title="Ajuda" class="relatbtn">
              <i class="fas fa-question"></i>
            </b-button>
          </div>
        </div>
      </div>
    </div>

    <div class="w-100 mb-2 border-bottom"></div>

    <div id="loading" v-if="isLoading">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>

    <div class="row p-0 m-0">
      <!-- Inicio Tabela 1 -->
      <div class="p-0 divTable mr-2 mb-2" v-if="!isLoading">
        <div class="alert alert-dark p-0 m-0 text-center rounded-0" role="alert">
          <div class="row m-0">
            <p
              class="p-0 alert-p m-0 border border-right-0"
              style="font-weight: bold; width: 187px;"
            >PGMC</p>
            <p
              class="m-0 border"
              style="width:32px; cursor: default!important"
              title="Total de creditos"
            >{{CreditoTotal_PGMC}}</p>
            <div v-bind:style="scrollsize" class="border border-left-0"></div>
          </div>
        </div>

        <table class="table table-hover table-bordered table-sm" ref="tablePGMC">
          <thead class="thead-light sticky">
            <tr>
              <div style="display: block; width: 198px;" class="sticky">
                <th scope="col">
                  <p class="p-header" style="width:24px!important;"></p>
                </th>
                <th scope="col">
                  <p
                    class="p-header"
                    style="width:24px!important; cursor: pointer;"
                    @click="toggleOrdenacaoPGMC('periodo')"
                  >
                    T.
                    <i
                      v-if="ordenacaoAtualPGMC==='periodo'"
                      style="font-size:0.6rem"
                      class="fas fa-arrow-down fa-sm"
                    ></i>
                  </p>
                </th>
                <th scope="col">
                  <p
                    class="p-header"
                    @click="toggleOrdenacaoPGMC('nome')"
                    style="width:135px!important;  cursor: pointer;"
                  >
                    Docente
                    <i
                      v-if="ordenacaoAtualPGMC==='nome'"
                      style="font-size:0.6rem"
                      class="fas fa-arrow-down fa-sm"
                    ></i>
                  </p>
                </th>
                <th scope="col">
                  <p class="p-header" style="width:30px!important;">C.</p>
                </th>
              </div>
            </tr>
          </thead>

          <tbody>
            <!-- LINHAS -->
            <template v-if="CargasPGMC.length>0">
              <template v-for="t in vetorPeriodosPGMC">
                <template v-for="docente in Docentes">
                  <template v-for="carga in CargasPGMC">
                    <tr
                      v-if="checkPGMC(carga, docente, t)"
                      :key="'MC-docente'+docente.id+'carga'+carga.id+t"
                      v-on:click="fun_clickado(carga, docente.apelido)"
                      :class="{'bg-custom':linhaClickada == carga.id}"
                    >
                      <template
                        v-if="((carga.trimestre == 1 || carga.trimestre == 2) && (periodos == 1 || periodos == 3))"
                      >
                        <cargadata :key="'1-MC'+docente.id+'carga'+carga.id" v-bind:carga="carga"></cargadata>
                      </template>
                      <template
                        v-if="((carga.trimestre == 3 || carga.trimestre == 4) && (periodos == 2 || periodos == 3))"
                      >
                        <cargadata :key="'2-MC'+docente.id+'carga'+carga.id" v-bind:carga="carga"></cargadata>
                      </template>
                    </tr>
                  </template>
                </template>
              </template>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Inicio Tabela 2 -->
      <div class="p-0 divTable mr-2 mb-2" v-if="!isLoading">
        <div class="alert alert-dark p-0 m-0 text-center rounded-0" role="alert">
          <div class="row m-0">
            <p
              class="col p-0 alert-p m-0 border border-right-0"
              style="font-weight: bold; width: 187px;"
            >PGCC</p>
            <p
              class="m-0 border"
              style="width:32px; cursor: default!important"
              title="Total de creditos"
            >{{CreditoTotal_PGCC}}</p>
            <div v-bind:style="scrollsize" class="border border-left-0"></div>
          </div>
        </div>

        <table class="table table-hover table-bordered table-sm">
          <thead class="thead-light sticky">
            <tr>
              <div style="display: block; width: 198px;" class="sticky">
                <th scope="col">
                  <p class="p-header" style="width:24px!important;"></p>
                </th>
                <th scope="col">
                  <p
                    class="p-header"
                    style="width:24px!important; cursor: pointer"
                    @click="toggleOrdenacaoPGCC('periodo')"
                  >
                    T.
                    <i
                      v-if="ordenacaoAtualPGCC==='periodo'"
                      style="font-size:0.6rem"
                      class="fas fa-arrow-down fa-sm"
                    ></i>
                  </p>
                </th>
                <th scope="col">
                  <p
                    class="p-header"
                    @click="toggleOrdenacaoPGCC('nome')"
                    style="width:135px!important; cursor: pointer"
                  >
                    Docente
                    <i
                      v-if="ordenacaoAtualPGCC==='nome'"
                      style="font-size:0.6rem"
                      class="fas fa-arrow-down fa-sm"
                    ></i>
                  </p>
                </th>
                <th scope="col">
                  <p class="p-header" style="width:30px!important;">C.</p>
                </th>
              </div>
            </tr>
          </thead>

          <tbody>
            <!-- LINHAS -->
            <template v-if="CargasPGCC.length>0">
              <template v-for="t in vetorPeriodosPGCC">
                <template v-for="docente in Docentes">
                  <template v-for="carga in CargasPGCC">
                    <tr
                      v-if="checkPGCC(carga, docente, t)"
                      :key="'CC-docente'+docente.id+'carga'+carga.id+t"
                      v-on:click="fun_clickado(carga, docente.apelido)"
                      :class="{'bg-custom':linhaClickada == carga.id}"
                    >
                      <template
                        v-if="((carga.trimestre == 1 || carga.trimestre == 2) && (periodos == 1 || periodos == 3))"
                      >
                        <cargadata
                          :key="'CC-docente'+docente.id+'carga'+carga.id"
                          v-bind:carga="carga"
                        ></cargadata>
                      </template>
                      <template
                        v-if="((carga.trimestre == 3 || carga.trimestre == 4) && (periodos == 2 || periodos == 3))"
                      >
                        <cargadata
                          :key="'CC-docente'+docente.id+'carga'+carga.id"
                          v-bind:carga="carga"
                        ></cargadata>
                      </template>
                    </tr>
                  </template>
                </template>
              </template>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Inicio Tabela 3 -->
      <div class="p-0 divTable mr-2 mb-2" v-if="!isLoading">
        <div class="alert alert-dark p-0 m-0 text-center rounded-0" role="alert">
          <div class="row m-0">
            <p class="col p-0 alert-p m-0 border border-right-0" style="font-weight: bold;">PGEM</p>
            <p
              class="m-0 border"
              style="width:32px; cursor: default!important"
              title="Total de creditos"
            >{{CreditoTotal_PGEM}}</p>
            <div v-bind:style="scrollsize" class="border border-left-0"></div>
          </div>
        </div>

        <table class="table table-hover table-bordered table-sm">
          <thead class="thead-light sticky">
            <tr>
              <div style="display: block; width: 198px;" class="sticky">
                <th scope="col">
                  <p class="p-header" style="width:24px!important;"></p>
                </th>
                <th scope="col">
                  <p
                    class="p-header"
                    style="width:24px!important; cursor: pointer"
                    @click="toggleOrdenacaoPGEM('periodo')"
                  >
                    T.
                    <i
                      v-if="ordenacaoAtualPGEM==='periodo'"
                      style="font-size:0.6rem"
                      class="fas fa-arrow-down fa-sm"
                    ></i>
                  </p>
                </th>
                <th scope="col">
                  <p
                    class="p-header"
                    style="width:135px!important; cursor: pointer"
                    @click="toggleOrdenacaoPGEM('nome')"
                  >
                    Docente
                    <i
                      v-if="ordenacaoAtualPGEM==='nome'"
                      style="font-size:0.6rem"
                      class="fas fa-arrow-down fa-sm"
                    ></i>
                  </p>
                </th>
                <th scope="col">
                  <p class="p-header" style="width:30px!important;">C.</p>
                </th>
              </div>
            </tr>
          </thead>

          <tbody>
            <!-- LINHAS -->
            <template v-if="CargasPGEM.length>0">
              <template v-for="t in vetorPeriodosPGEM">
                <template v-for="docente in Docentes">
                  <template v-for="carga in CargasPGEM">
                    <tr
                      v-if="checkPGEM(carga, docente, t)"
                      :key="'EM-docente'+docente.id+'carga'+carga.id+t"
                      v-on:click="fun_clickado(carga, docente.apelido)"
                      :class="{'bg-custom':linhaClickada == carga.id}"
                    >
                      <template
                        v-if="((carga.trimestre == 1 || carga.trimestre == 2) && (periodos == 1 || periodos == 3))"
                      >
                        <cargadata
                          :key="'EM-docente'+docente.id+'carga'+carga.id"
                          v-bind:carga="carga"
                        ></cargadata>
                      </template>
                      <template
                        v-if="((carga.trimestre == 3 || carga.trimestre == 4) && (periodos == 2 || periodos == 3))"
                      >
                        <cargadata
                          :key="'EM-docente'+docente.id+'carga'+carga.id"
                          v-bind:carga="carga"
                        ></cargadata>
                      </template>
                    </tr>
                  </template>
                </template>
              </template>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Card de Adição -->
    <div class="div-card p-0 mt-0 mb-2 col-lg-4 col-md-12 col-sm-12 col-12">
      <!-- Inicio card -->
      <div class="card mr-3 ml-auto">
        <div class="card-header">
          <h2 class="card-title">Creditação Pós</h2>
        </div>
        <div class="card-body">
          <form>
            <div class="row mb-2 mx-0">
              <div class="form-group col-4 m-0 px-0">
                <label for="trimestre" class="col-form-label">Trimestre</label>
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
                  <option v-if="Docentes.length===0" type="text" value>Nenhum Docente Encontrado</option>
                  <option
                    v-for="docente in Docentes"
                    :key="'id docente'+docente.id"
                    :value="docente.id"
                  >{{docente.apelido}}</option>
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
                <template v-if="isEdit">
                  <button
                    type="button"
                    title="Salvar"
                    class="addbtn"
                    v-on:click.prevent="editCarga(cargaPosForm)"
                    style="max-width:80px;"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                  <button
                    type="button"
                    title="Deletar"
                    class="delbtn"
                    v-b-modal.modalConfirma2
                    style="max-width:80px;"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                  <button
                    type="button"
                    title="Cancelar"
                    class="cancelbtn"
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
                    class="addbtn"
                    v-on:click.prevent="addCarga"
                    style="max-width:80px;"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                  <button
                    type="button"
                    title="Cancelar"
                    class="cancelbtn"
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
    <!-- modal -->
    <b-modal id="modalConfirma" title="Confirmar Seleção" @ok="deleteSelected">
      <template v-if="Deletar.length === 0">
        <p class="my-4">Nenhuma carga selecionada!</p>
      </template>
      <template v-else>
        <p class="my-4">Tem certeza que deseja deletar as cargas selecionadas?</p>
        <template v-for="carga in Deletar">
          <template v-for="docente in Docentes">
            <template v-if="docente.id===carga.Docente">
              <p :key="'carga id'+carga.id+'docente'+docente.id">
                Docente:{{docente.apelido}}
                <br />
                Programa:{{carga.programa}}
                <br />
                Trimestre:{{carga.trimestre}}
              </p>
            </template>
          </template>
        </template>
      </template>
    </b-modal>

    <b-modal id="modalConfirma2" title="Confirmar Seleção" @ok="deleteCarga(cargaPosForm)">
      <p class="my-4">Tem certeza que deseja deletar esta carga ?</p>
      <p>
        Docente:{{apelidoClikado}}
        <br />
        Programa:{{cargaPosForm.programa}}
        <br />
        Trimestre:{{cargaPosForm.trimestre}}
      </p>
    </b-modal>

    <b-modal id="modalAjuda" ref="ajudaModal" scrollable title="Ajuda">
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para adicionar docentes à Tabela:</strong> Preencha o cartão à direita. Após concluído,
            clique em Adicionar
            <i
              class="fas fa-plus addbtn px-1"
              style="font-size:12px"
            ></i>
            ou em Cancelar
            <i
              class="fas fa-times cancelbtn px-1"
              style="font-size: 12px"
            ></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para editar docentes da Tabela:</strong> Na tabela, clique no docente que deseja alterar.
            No cartão à direita faça as mudanças desejadas e, em seguida, clique em Salvar
            <i
              class="fas fa-check addbtn px-1"
              style="font-size:12px"
            ></i>
            ou em Cancelar
            <i
              class="fas fa-times cancelbtn px-1"
              style="font-size: 12px"
            ></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para deletar docentes da Tabela:</strong> Marque o(s) docente(s) que deseja deletar através
            da caixa de seleção à esquerda e em seguida clique em Deletar Selecionados
            <i
              class="far fa-trash-alt delbtn px-1"
              style="font-size: 12px"
            ></i>
            e confirme no botão OK.
          </li>
          <li class="list-group-item">
            <strong>Para alterar ordenação:</strong> Clique em Docente ou em T. no cabeçalho de cada tabela para alternar a ordenação entre alfabética e por trimestre.
          </li>
        </ul>
      </div>

      <div slot="modal-footer" style="display: none"></div>
    </b-modal>
  </div>
</template>


<script>
import _ from "lodash";
import cargaPosService from "../../common/services/cargaPos";
import cargadata from "./CargaPosRow.vue";

const emptyCarga = {
  id: undefined,
  trimestre: undefined,
  Docente: undefined,
  programa: undefined,
  creditos: undefined
};

export default {
  name: "DashboardCargaPos",

  data() {
    return {
      cargaPosForm: _.clone(emptyCarga),
      error: undefined,
      atual: undefined,
      trimestre: 1,
      programa: "PGCC",
      programas: ["", "PGCC", "PGMC", "PGEM"],
      periodos: 3,
      vetorPeriodosPGMC: [1, 2, 3, 4],
      vetorPeriodosPGCC: [1, 2, 3, 4],
      vetorPeriodosPGEM: [1, 2, 3, 4],
      ordenacaoAtualPGMC: "periodo",
      ordenacaoAtualPGCC: "periodo",
      ordenacaoAtualPGEM: "periodo",
      scrollsize: undefined,
      isEdit: false,
      linhaClickada: null,
      apelidoClikado: null
    };
  },

  components: {
    cargadata
  },

  mounted() {
    this.scrollsize = {
      width:
        this.$refs.tablePGMC.offsetWidth -
        this.$refs.tablePGMC.clientWidth +
        "px"
    };
  },

  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    clearClick() {
      this.isEdit = false;
      this.linhaClickada = null;
    },
    fun_clickado(carga, apelido) {
      this.cleanCarga();

      this.isEdit = true;
      this.linhaClickada = carga.id;
      this.apelidoClikado = apelido;
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
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Carga ${response.CargaPos.programa} foi atualizada!`,
            type: "success"
          });
        })
        .catch(error => {
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
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Carga ${response.CargaPos.programa} foi excluída!`,
            type: "success"
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
        .then(response => {
          this.trimestre = response.CargaPos.trimestre;
          this.programa = response.CargaPos.programa;
          this.cleanCarga();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Carga ${response.CargaPos.programa} foi criada!`,
            type: "success"
          });
        })
        .catch(error => {
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
    }
  },

  computed: {
    CreditoTotal_PGMC: function() {
      let total = 0;

      for (var t = 1; t <= 4; t++) {
        for (let k = 0; k < this.Docentes.length; k++) {
          for (let i = 0; i < this.CargasPGMC.length; i++) {
            if (this.periodos == 1) {
              if (
                this.CargasPGMC[i].Docente === this.Docentes[k].id &&
                this.CargasPGMC[i].trimestre == t &&
                (this.CargasPGMC[i].trimestre == 1 ||
                  this.CargasPGMC[i].trimestre == 2)
              ) {
                total += this.CargasPGMC[i].creditos;
              }
            } else if (this.periodos == 2) {
              if (
                this.CargasPGMC[i].Docente === this.Docentes[k].id &&
                this.CargasPGMC[i].trimestre == t &&
                this.CargasPGMC[i].trimestre == 3
              ) {
                total += this.CargasPGMC[i].creditos;
              }
            } else if (this.periodos == 3) {
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
            if (this.periodos == 1) {
              if (
                this.CargasPGCC[i].Docente === this.Docentes[k].id &&
                this.CargasPGCC[i].trimestre == t &&
                (this.CargasPGCC[i].trimestre == 1 ||
                  this.CargasPGCC[i].trimestre == 2)
              ) {
                total += this.CargasPGCC[i].creditos;
              }
            } else if (this.periodos == 2) {
              if (
                this.CargasPGCC[i].Docente === this.Docentes[k].id &&
                this.CargasPGCC[i].trimestre == t &&
                this.CargasPGCC[i].trimestre == 3
              ) {
                total += this.CargasPGCC[i].creditos;
              }
            } else if (this.periodos == 3) {
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
            if (this.periodos == 1) {
              if (
                this.CargasPGEM[i].Docente === this.Docentes[k].id &&
                this.CargasPGEM[i].trimestre == t &&
                (this.CargasPGEM[i].trimestre == 1 ||
                  this.CargasPGEM[i].trimestre == 2)
              ) {
                total += this.CargasPGEM[i].creditos;
              }
            } else if (this.periodos == 2) {
              if (
                this.CargasPGEM[i].Docente === this.Docentes[k].id &&
                this.CargasPGEM[i].trimestre == t &&
                this.CargasPGEM[i].trimestre == 3
              ) {
                total += this.CargasPGEM[i].creditos;
              }
            } else if (this.periodos == 3) {
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
    }
  }
};
</script>

<style scoped>
/* prefixed */
.CargaPos {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}
.titulo {
  font-size: 25px;
  font-weight: normal !important;
  padding-left: 0 !important;
  margin: 0 !important;
}
.p-header {
  padding: 0px 0 0px 0;
  margin: 0;
  font-size: 11px;
  text-align: center;
  height: 18px;
}
.divTable {
  overflow: hidden;
  border: rgba(0, 0, 0, 0.125) solid 1px;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  font-size: 11px;
}
table {
  display: block !important;
  overflow-y: scroll !important;
  overflow-x: auto !important;
  font-size: 11px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
  height: -webkit-calc(100vh - 110px);
  height: -moz-calc(100vh - 110px);
  height: calc(100vh - 110px);
}
tbody {
  max-height: 100%;
  width: 100%;
}
table td {
  text-align: center;
  vertical-align: middle;
  padding: 0 !important;
  height: 25px;
}
table p {
  margin-bottom: 0;
  text-align: center;
  padding-right: 5px;
  padding-left: 5px;
}
tr thead {
  display: block;
}
thead th {
  padding: 0 !important;
  font-size: 14px;
  text-align: center;
  height: 18px !important;
}
table select {
  height: 18px !important;
  text-align: left;
}
table input {
  height: 18px !important;
  text-align: center !important;
}
.isAdd {
  background-color: rgba(0, 0, 0, 0.125);
}
.isAdd:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

/* ====== CARD ====== */
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
select {
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
input {
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

/* APENAS NO FIREFOX */
@-moz-document url-prefix() {
  table select {
    height: 18px !important;
    text-align: left;
    box-sizing: border-box;
    line-height: 8px;
    border: 0.5px solid rgb(133, 133, 133);
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
  table input {
    height: 18px !important;
    text-align: center;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 8px;
    border: 0.5px solid rgb(92, 92, 92);
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
}
.sticky {
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  z-index: 10;
}
.listas {
  line-height: 30px;
  font-size: 12px;
  text-align: justify;
  line-height: inherit;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
}
strong {
  color: #007bff;
}
button {
  padding: 0;
  border: none;
  background: none;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  margin-right: 15px;
  margin-top: 0px !important;
  transition: all 0.3s ease 0s;
  cursor: pointer;
}
i.fas,
i.far {
  font-size: 25px;
}
.addbtn {
  background-color: white;
  color: #a0e7a0;
}
.addbtn:hover {
  background-color: white;
  color: #77dd77;
}
.addbtn:focus {
  color: #77dd77;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #2fbf53;
}
.cancelbtn {
  color: #cfcfc4;
}
.cancelbtn:hover {
  color: #b8b4a8;
}
.cancelbtn:focus {
  color: #b8b8a8;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #ada89a;
}
.delbtn {
  background-color: white;
  color: #ff817b;
}
.delbtn:hover {
  color: #ff5f48;
}
.delbtn:focus {
  color: #ff5f48;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #ff4e34;
}
.relatbtn {
  background-color: white;
  color: #9ab3ff !important;
}
.relatbtn:hover {
  color: #82a0ff !important;
  background-color: white;
}

.relatbtn:focus {
  color: #82a0ff;
  background-color: white;
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: #698dff;
}
.cube1,
.cube2 {
  background-color: #333;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-animation: cubemove 1.8s infinite ease-in-out;
  -moz-animation: cubemove 1.8s infinite ease-in-out;
  -o-animation: cubemove 1.8s infinite ease-in-out;
  animation: cubemove 1.8s infinite ease-in-out;
}
.cube2 {
  -webkit-animation-delay: -0.9s;
  -moz-animation-delay: -0.9s;
  -o-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
@-webkit-keyframes cubemove {
  25% {
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -webkit-transform: rotate(-360deg);
  }
}
@-moz-keyframes cubemove {
  25% {
    -moz-transform: translateX(42px) rotate(-90deg) scale(0.5);
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -moz-transform: translateX(42px) translateY(42px) rotate(-179deg);
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    -moz-transform: translateX(42px) translateY(42px) rotate(-180deg);
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -moz-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -moz-transform: rotate(-360deg);
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
@-o-keyframes cubemove {
  25% {
    -o-transform: translateX(42px) rotate(-90deg) scale(0.5);
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -o-transform: translateX(42px) translateY(42px) rotate(-179deg);
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    -o-transform: translateX(42px) translateY(42px) rotate(-180deg);
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -o-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
@keyframes cubemove {
  25% {
    -moz-transform: translateX(42px) rotate(-90deg) scale(0.5);
    -o-transform: translateX(42px) rotate(-90deg) scale(0.5);
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -moz-transform: translateX(42px) translateY(42px) rotate(-179deg);
    -o-transform: translateX(42px) translateY(42px) rotate(-179deg);
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    -moz-transform: translateX(42px) translateY(42px) rotate(-180deg);
    -o-transform: translateX(42px) translateY(42px) rotate(-180deg);
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -moz-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -o-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -moz-transform: rotate(-360deg);
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
.alert {
  background-color: #e9ecef !important;
  border: none;
}

@media screen and (max-width: 439px) {
  .div-titulo {
    height: 70px !important;
  }
}
.bg-custom {
  background-color: #c8c8c8;
}
.bg-custom:hover {
  background-color: #c8c8c8;
}

/* Formularios no topo da tela */
.input-group-text {
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -ms-flex-align: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  align-items: center;
  -ms-flex-pack: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  justify-content: center;
  margin-bottom: 0;
  /*===*/
  max-width: 70px;
  min-width: 70px;
  height: 25px !important;
  margin-left: -5px;
  padding-left: 15px;
  font-size: 12px !important;
}

.form-inline .input-group,
.form-inline {
  width: auto;
}

.form-group-top {
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 0;
}

.form-control-top {
  height: 25px !important;
  font-size: 12px !important;
  padding: 0px 0px 0px 5px !important;
  min-width: 80px !important;
  max-width: 80px !important;
  text-align: start !important;
}

/* =========================== */
</style>