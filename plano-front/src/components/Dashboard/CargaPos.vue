<template>
  <div class="CargaPos row pr-2" style="font-size:11px;">
    <!-- Titulo -->
    <div class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0">
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="titulo col-xl-2 col-md-3 col-sm-4 col-4" style="height:34px;">Creditação Pós</h1>

        <div
          class="form-group col-xl-10 col-md-9 col-sm-8 col-8 mb-0 pr-0"
          style="justify-content: flex-end;"
        >
          <div class="input-group mr-0 ml-auto mb-0 mt-0">
             <div class="input-group-append mt-1">
              <div class="input-group-append">
                <label class="input-group-text">Trimestre:</label>
              </div>
            </div>
            <select
              class="form-control form-control-sm mt-1 mr-5"
              v-model="periodos"
              v-on:change="CreditoTotal_PGMC, CreditoTotal_PGCC, CreditoTotal_PGEM"
            >
              <option value="1">Primeiro</option>
              <option value="2">Segundo</option>
              <option value="3">Ambos</option>
            </select>
           

            <template v-if="isAdd">
              <div style="display: flex">
                <button type="button" title="Salvar" class="addbtn" v-on:click.prevent="addCarga">
                  <i class="fas fa-check"></i>
                </button>
                <button
                  type="button"
                  title="Cancelar"
                  class="cancelbtn"
                  v-on:click.prevent="toggleAdd"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </template>

            <template v-else>
              <div style="display: flex">
                <button
                  type="button"
                  title="Adicionar"
                  class="addbtn"
                  v-on:click.prevent="toggleAdd"
                >
                  <i class="fas fa-plus"></i>
                </button>
                <button type="button" title="Deletar" class="delbtn" v-b-modal.modalConfirma>
                  <i class="far fa-trash-alt"></i>
                </button>
              </div>
              <b-modal id="modalConfirma" title="Confirmar Seleção" @ok="deleteSelected">
                <p class="my-4">Tem certeza que deseja deletar as cargas selecionadas?</p>
                <template v-for="carga in Deletar">
                  <template v-for="docente in Docentes">
                    <template v-if="docente.id===carga.Docente">
                      <p :key="'carga'+carga.id+'docente'+docente.id" style="width:80px">
                        Docente:{{docente.apelido}}
                        <br />
                        Programa:{{carga.programa}}
                      </p>
                    </template>
                  </template>
                </template>
              </b-modal>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="w-100 mb-2 border-bottom"></div>

    <div id="loading" v-if="isLoading">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>
    <!-- Inicio Tabela 1 -->

    <div class="row p-0 m-0">
      <div class="p-0 divTable mr-2 mb-2" v-if="!isLoading">
        <div class="alert alert-dark p-0 m-0 text-center rounded-0" role="alert">
          <div class="row m-0">
            <p class="col p-0 alert-p m-0 border" style="font-weight: bold">PGMC</p>
            <p
              class="p-0 m-0 border"
              style="width:58px; cursor: default!important"
              title="Total de creditos"
            >{{CreditoTotal_PGMC}}</p>
          </div>
        </div>

        <table class="table table-hover table-bordered table-sm">
          <thead class="thead-light sticky">
            <tr>
              <div style="display: block; width: 330px;" class="sticky">
                <th scope="col">
                  <p class="p-header" style="width:24px!important;"></p>
                </th>
                <th scope="col">
                  <p class="p-header" style="width:24px!important;"
                    @click="toggleOrdenacaoPGMC">
                    T.
                    <i
                          v-if="ordenacaoAtualPGMC==='periodo'"
                          style="font-size:0.6rem"
                          class="fas fa-arrow-down fa-sm"
                    ></i>
                  </p>
                </th>
                <th scope="col">
                  <p class="p-header" style="width:135px!important;">Docente</p>
                </th>
                <th scope="col">
                  <p class="p-header" style="width:100px!important;">Programa</p>
                </th>
                <th scope="col">
                  <p class="p-header" style="width:40px!important;">C.</p>
                </th>
              </div>
            </tr>
          </thead>

          <tbody>
            <template v-if="isAdd">
              <tr class="isAdd">
                <div style="width: 330px;">
                  <td>
                    <div style="width:24px; height:25px"></div>
                  </td>

                  <td>
                    <div style="width:24px;">
                      <input
                        type="text"
                        style="width: 20px; height:16px;"
                        id="trimestre"
                        v-model="cargaPosForm.trimestre"
                      />
                    </div>
                  </td>

                  <td>
                    <div style="width: 135px">
                      <select
                        type="text"
                        style="width:130px"
                        id="docente1"
                        v-model="cargaPosForm.Docente"
                      >
                        <option
                          v-if="Docentes.length===0"
                          type="text"
                          value
                        >Nenhum Docente Encontrado</option>
                        <option
                          v-for="docente in Docentes"
                          :key="docente.id"
                          :value="docente.id"
                        >{{docente.apelido}}</option>
                      </select>
                    </div>
                  </td>

                  <td>
                    <div style="width: 100px">
                      <input
                        type="text"
                        style="width: 80px"
                        id="programa"
                        v-model="cargaPosForm.programa"
                      />
                    </div>
                  </td>

                  <td>
                    <div style="width: 40px">
                      <input
                        type="text"
                        style="width: 25px"
                        id="creditos"
                        v-model="cargaPosForm.creditos"
                      />
                    </div>
                  </td>
                </div>
              </tr>
            </template>
            <!-- LINHAS -->
            <template v-if="CargasPGMC.length>0">
              <template v-for="t in vetorPeriodosPGMC">
                <template v-for="docente in Docentes">
                  <tr v-for="carga in CargasPGMC" :key="'docente'+docente.id+'carga'+carga.id+t">
                    <template v-if="checkPGMC(carga, docente, t)">
                      <template
                        v-if="((carga.trimestre == 1 || carga.trimestre == 2) && (periodos == 1 || periodos == 3))"
                      >
                        <cargadata
                          :key="'1docente'+docente.id+'carga'+carga.id"
                          v-bind:carga="carga"
                        ></cargadata>
                      </template>
                      <template
                        v-if="((carga.trimestre == 3 || carga.trimestre == 4) && (periodos == 2 || periodos == 3))"
                      >
                        <cargadata
                          :key="'2docente'+docente.id+'carga'+carga.id"
                          v-bind:carga="carga"
                        ></cargadata>
                      </template>
                    </template>
                  </tr>
                </template>
              </template>
            </template>
          </tbody>
        </table>
      </div>

      <div class="p-0 divTable mr-2 mb-2" v-if="!isLoading">
        <div class="alert p-0 alert-dark m-0 text-center rounded-0" role="alert">
          <div class="row m-0">
            <p class="col p-0 alert-p m-0 border" style="font-weight: bold">PGCC</p>
            <p
              class="p-0 m-0 border"
              style="width:58px; cursor: default!important"
              title="Total de creditos"
            >{{CreditoTotal_PGCC}}</p>
          </div>
        </div>

        <table class="table table-hover table-bordered table-sm">
          <thead class="thead-light sticky">
            <tr>
              <div style="display: block; width: 330px;" class="sticky">
                <th scope="col">
                  <p class="p-header" style="width:24px!important;"></p>
                </th>
                <th scope="col">
                  <p class="p-header" style="width:24px!important;"
                     @click="toggleOrdenacaoPGCC">
                    T.
                    <i
                            v-if="ordenacaoAtualPGCC==='periodo'"
                            style="font-size:0.6rem"
                            class="fas fa-arrow-down fa-sm"
                    ></i>
                  </p>
                </th>
                <th scope="col">
                  <p class="p-header" style="width:135px!important;">Docente</p>
                </th>
                <th scope="col">
                  <p class="p-header" style="width:100px!important;">Programa</p>
                </th>
                <th scope="col">
                  <p class="p-header" style="width:40px!important;">C.</p>
                </th>
              </div>
            </tr>
          </thead>

          <tbody>
            <!-- LINHAS -->
            <template v-if="CargasPGCC.length>0">
              <template v-for="t in vetorPeriodosPGCC">
                <template v-for="docente in Docentes">
                  <tr v-for="carga in CargasPGCC" :key="'docente'+docente.id+'carga'+carga.id+t">
                    <template v-if="checkPGCC(carga, docente, t)">
                      <template
                        v-if="((carga.trimestre == 1 || carga.trimestre == 2) && (periodos == 1 || periodos == 3))"
                      >
                        <cargadata
                          :key="'1docente'+docente.id+'carga'+carga.id"
                          v-bind:carga="carga"
                        ></cargadata>
                      </template>
                      <template
                        v-if="((carga.trimestre == 3 || carga.trimestre == 4) && (periodos == 2 || periodos == 3))"
                      >
                        <cargadata
                          :key="'2docente'+docente.id+'carga'+carga.id"
                          v-bind:carga="carga"
                        ></cargadata>
                      </template>
                    </template>
                  </tr>
                </template>
              </template>
            </template>
          </tbody>
        </table>
      </div>

      <div class="p-0 divTable mr-2 mb-2" v-if="!isLoading">
        <div class="alert alert-dark p-0 m-0 text-center rounded-0" role="alert">
          <div class="row m-0">
            <p class="col p-0 alert-p m-0 border" style="font-weight: bold;">PGEM</p>
            <p
              class="p-0 m-0 border"
              style="width:58px; cursor: default!important"
              title="Total de creditos"
            >{{CreditoTotal_PGEM}}</p>
          </div>
        </div>

        <table class="table table-hover table-bordered table-sm">
          <thead class="thead-light sticky">
            <tr>
              <div style="display: block; width: 330px;" class="sticky">
                <th scope="col">
                  <p class="p-header" style="width:24px!important;"></p>
                </th>
                <th scope="col">
                  <p class="p-header" style="width:24px!important;"
                     @click="toggleOrdenacaoPGEM">
                    T.
                    <i
                            v-if="ordenacaoAtualPGEM==='periodo'"
                            style="font-size:0.6rem"
                            class="fas fa-arrow-down fa-sm"
                    ></i>
                  </p>
                </th>
                <th scope="col">
                  <p class="p-header" style="width:135px!important;">Docente</p>
                </th>
                <th scope="col">
                  <p class="p-header" style="width:100px!important;">Programa</p>
                </th>
                <th scope="col">
                  <p class="p-header" style="width:40px!important;">C.</p>
                </th>
              </div>
            </tr>
          </thead>

          <tbody>
            <!-- LINHAS -->
            <template v-if="CargasPGEM.length>0">
              <template v-for="t in vetorPeriodosPGEM">
                <template v-for="docente in Docentes">
                  <tr v-for="carga in CargasPGEM" :key="'docente'+docente.id+'carga'+carga.id+t">
                    <template v-if="checkPGEM(carga, docente, t)">
                      <template
                        v-if="((carga.trimestre == 1 || carga.trimestre == 2) && (periodos == 1 || periodos == 3))"
                      >
                        <cargadata
                          :key="'1docente'+docente.id+'carga'+carga.id"
                          v-bind:carga="carga"
                        ></cargadata>
                      </template>
                      <template
                        v-if="((carga.trimestre == 3 || carga.trimestre == 4) && (periodos == 2 || periodos == 3))"
                      >
                        <cargadata
                          :key="'2docente'+docente.id+'carga'+carga.id"
                          v-bind:carga="carga"
                        ></cargadata>
                      </template>
                    </template>
                  </tr>
                </template>
              </template>
            </template>
          </tbody>
        </table>
      </div>
    </div>
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
      isAdd: false,
      atual: undefined,
      trimestre: 1,
      programa: "PGCC",
      periodos: 3,
      vetorPeriodosPGMC: [1, 2, 3, 4],
      vetorPeriodosPGCC: [1, 2, 3, 4],
      vetorPeriodosPGEM: [1, 2, 3, 4],
      ordenacaoAtualPGMC:'periodo',
      ordenacaoAtualPGCC:'periodo',
      ordenacaoAtualPGEM:'periodo'
    };
  },

  components: {
    cargadata
  },
  /*
        mounted () {
            this.$store.commit('emptyDelete')
            console.log(this.$store.state.turma.Deletar)
            this.$store.commit(COMPONENT_LOADED)
        },
        */

  methods: {
    toggleOrdenacaoPGMC(){
        if(this.ordenacaoAtualPGMC==='periodo'){
            this.ordenacaoAtualPGMC = 'nome'
            this.vetorPeriodosPGMC = [1]
        }else{
            this.ordenacaoAtualPGMC = 'periodo'
            this.vetorPeriodosPGMC = [1, 2, 3, 4]
        }
    },

    toggleOrdenacaoPGCC(){
        if(this.ordenacaoAtualPGCC==='periodo'){
            this.ordenacaoAtualPGCC = 'nome'
            this.vetorPeriodosPGCC = [1]
        }else{
            this.ordenacaoAtualPGCC = 'periodo'
            this.vetorPeriodosPGCC = [1, 2, 3, 4]
        }
    },

    toggleOrdenacaoPGEM(){
        if(this.ordenacaoAtualPGEM==='periodo'){
            this.ordenacaoAtualPGEM = 'nome'
            this.vetorPeriodosPGEM = [1]
        }else{
            this.ordenacaoAtualPGEM = 'periodo'
            this.vetorPeriodosPGEM = [1, 2, 3, 4]
        }
    },

    checkPGMC(carga, docente, t){
        if(this.ordenacaoAtualPGMC === 'periodo')
            return (carga.Docente === docente.id) && (carga.trimestre == (t))
        else
            return (carga.Docente === docente.id)
    },

    checkPGCC(carga, docente, t){
        if(this.ordenacaoAtualPGCC === 'periodo')
            return (carga.Docente === docente.id) && (carga.trimestre == (t))
        else
            return (carga.Docente === docente.id)
    },

    checkPGEM(carga, docente, t){
        if(this.ordenacaoAtualPGEM === 'periodo')
            return (carga.Docente === docente.id) && (carga.trimestre == (t))
        else
            return (carga.Docente === docente.id)
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
          console.log(response.CargaPos);
          console.log(this.$store.state.cargaPos.Cargas);
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
      this.cargaPosForm = _.clone(emptyCarga);
      this.cargaPosForm.trimestre = this.trimestre;
      this.cargaPosForm.programa = this.programa;
      this.error = undefined;
    },

    toggleAdd() {
      this.cleanCarga();
      this.isAdd = !this.isAdd;
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
  font-weight: normal;
  padding-left: 0;
  margin: 0;
}
.p-header {
  padding: 0px 0 0px 0;
  margin: 0;
  font-size: 11px;
  text-align: center;
  height: 18px;
}
.custom-select {
  height: 25px !important;
  padding: 0px 0px 0px 5px !important;
  min-width: 85px;
  max-width: 85px;
  text-align: start;
  font-size: 100% !important;
}
.form-control {
  height: 25px !important;
  font-size: 12px !important;
  padding: 0px 0px 0px 5px !important;
  min-width: 80px;
  max-width: 80px;
  text-align: start;
  border-radius: 3px !important;
}
.input-group-text {
  max-width: 70px;
  min-width: 70px;
  height: 25px !important;
  margin-left: -5px;
  padding-left: 15px;
  font-size: 12px !important;
  background-color: white;
  border: none;
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
button {
  padding: 0;
  border: none;
  background: none;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  margin-right: 15px;
  margin-top: 5px;
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
.alert-p {
  padding: 0;
}
.alert {
  background-color: #e9ecef !important;
  border: none;
}
</style>