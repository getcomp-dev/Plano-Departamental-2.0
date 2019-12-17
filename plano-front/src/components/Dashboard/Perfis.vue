<template>
  <div class="DashboardPerfis row pr-2" v-if="Admin">
    <!-- Titulo -->
    <div
      class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height:38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="col-12 titulo">Perfis</h1>
      </div>
    </div>
    <div class="w-100 mb-2 border-bottom"></div>

    <!-- Grid Esquerdo -->
    <div class="divTable">
      <!-- Inicio da Tabela -->
      <table class="table table-hover border table-sm">
        <thead class="thead-light">
          <tr>
            <div style="display: block; overflow: hidden; width: 482px;" class="sticky">
              <th scope="col">
                <p
                  style="width: 350px; text-align:start"
                  title="Clique para ordenar por nome"
                  @click="toggleOrderNome"
                  class="p-header clickable-header"
                >
                  Nome
                  <i
                    v-if="ordenacao=='nome'"
                    style="font-size:0.6rem"
                    class="fas fa-arrow-down fa-sm"
                  ></i>
                </p>
              </th>
              <th scope="col">
                <p
                  style="width: 90px;"
                  title="Clique para ordenar por abreviação"
                  @click="toggleOrderAbreviacao"
                  class="p-header clickable-header"
                >
                  Abreviação
                  <i
                    v-if="ordenacao=='abreviacao'"
                    style="font-size:0.6rem"
                    class="fas fa-arrow-down fa-sm"
                  ></i>
                </p>
              </th>
              <th scope="col">
                <p style="width: 42px;" class="p-header">Cor</p>
              </th>
            </div>
          </tr>
        </thead>
        <tbody>
          <template v-if="Perfis.length > 0">
            <tr
              v-for="perfil in Perfis"
              :key="perfil.id"
              v-on:click.prevent="showPerfil(perfil), clickada(perfil.nome)"
              :class="{'bg-custom' : perfilClickado === perfil.nome}"
              style="cursor: pointer"
            >
              <div style="width: 482px">
                <td>
                  <p style="width: 350px; text-align: start">{{perfil.nome}}</p>
                </td>
                <td>
                  <p style="width: 90px">{{perfil.abreviacao}}</p>
                </td>
                <td>
                  <div style="padding-left: 2px; width: 42px">
                    <input
                      type="color"
                      style="width: 30px; padding: 0;vertical-align:middle; margin-top:2px"
                      v-model="perfil.cor"
                    />
                  </div>
                </td>
              </div>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="2" class="text-center">
                <i class="fas fa-exclamation-triangle"></i> Nenhum perfil encontrado!
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <!-- Fim da Tabela -->
    </div>
    <!-- Fim do Grid Esquerdo -->

    <!-- Grid Direito -->
    <div class="div-card p-0 mt-0 mb-2 ml-auto col-lg-5 col-md-5 col-sm-12 col-12">
      <div class="card mr-3 ml-auto">
        <div class="card-header">
          <h2 class="card-title">Perfil</h2>
        </div>

        <div class="card-body">
          <form>
            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label for="nome" class="col-form-label">Nome</label>
                <input
                  type="text"
                  class="inputMaior form-control form-control-sm"
                  id="nome"
                  v-model="perfilForm.nome"
                />
              </div>
            </div>

            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 mr-4 px-0">
                <label for="abreviacao" class="col-form-label">Abreviação</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  style="width:100px"
                  id="abreviacao"
                  v-model="perfilForm.abreviacao"
                />
              </div>
              <div class="form-group col m-0 mr-4 px-0">
                <label for="cor" class="col-form-label">Cor</label>
                <input
                  type="color"
                  class="inputMenor form-control form-control-sm"
                  id="cor"
                  v-model="perfilForm.cor"
                />
              </div>
            </div>

            <div class="row mb-0 mt-3 mx-0">
              <div class="d-flex mr-0 ml-auto">
                <template v-if="isEdit">
                  <button
                    type="button"
                    title="Salvar"
                    class="addbtn"
                    v-on:click.prevent="editPerfil"
                    :key="1"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                  <button
                    type="button"
                    title="Deletar"
                    class="delbtn"
                    v-on:click.prevent="deletePerfil"
                    :key="3"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                  <button
                    type="button"
                    title="Cancelar"
                    class="cancelbtn"
                    v-on:click.prevent="cleanPerfil"
                    :key="2"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </template>
                <template v-else>
                  <button
                    type="button"
                    title="Adicionar"
                    class="addbtn"
                    v-on:click.prevent="addPerfil"
                    :key="1"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                  <button
                    type="button"
                    title="Cancelar"
                    class="cancelbtn"
                    v-on:click.prevent="cleanPerfil"
                    :key="2"
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
    <!-- Fim do Grid Direito -->
  </div>
</template>

<script>
import _ from "lodash";
import perfilService from "../../common/services/perfil";

const emptyPerfil = {
  id: undefined,
  nome: undefined,
  abreviacao: undefined,
  cor: "#ff0000"
};

export default {
  name: "DashboardPerfis",

  data() {
    return {
      perfilForm: _.clone(emptyPerfil),
      error: undefined,
      perfilClickado: "",
      ordenacao: ""
    };
  },

  methods: {
    toggleOrderNome() {
      if (this.ordenacao == "nome") this.ordenacao = "";
      else this.ordenacao = "nome";
    },
    toggleOrderAbreviacao() {
      if (this.ordenacao == "abreviacao") this.ordenacao = "";
      else this.ordenacao = "abreviacao";
    },

    clickada(f_perfil) {
      this.perfilClickado = f_perfil;
    },
    clearClick() {
      this.perfilClickado = "";
    },
    addPerfil() {
      perfilService
        .create(this.perfilForm)
        .then(response => {
          this.cleanPerfil();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Perfil ${response.Perfil.nome} foi criado!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao criar Perfil</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error"
          });
        });
    },

    editPerfil() {
      perfilService
        .update(this.perfilForm.id, this.perfilForm)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Perfil ${response.Perfil.nome} foi atualizado!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao atualizar Perfil</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error"
          });
        });
    },

    deletePerfil() {
      perfilService
        .delete(this.perfilForm.id, this.perfilForm)
        .then(response => {
          this.cleanPerfil();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Perfil ${response.Perfil.nome} foi excluído!`,
            type: "warn"
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Perfil</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error"
          });
        });
    },

    cleanPerfil() {
      this.clearClick();
      console.log(this.perfilForm.cor);
      this.perfilForm = _.clone(emptyPerfil);
      this.error = undefined;
    },

    showPerfil(perfil) {
      this.cleanPerfil();
      this.perfilForm = _.clone(perfil);
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
    }
  },

  computed: {
    Perfis() {
      return _.orderBy(this.$store.state.perfil.Perfis, this.ordenacao);
    },

    isEdit() {
      return this.perfilForm.id !== undefined;
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
/* prefixed by https://autoprefixer.github.io (PostCSS: v7.0.23, autoprefixer: v9.7.3) */

.DashboardPerfis {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0 !important;
}

/* Tabela Lucas */
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
}
table {
  display: block !important;
  overflow-y: hidden !important;
  overflow-x: auto !important;
  font-size: 11px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
  height: auto !important;
}
tbody {
  max-height: 100%;
  width: 100%;
}
table td {
  text-align: center;
  vertical-align: middle;
  padding: 0 !important;
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
table input {
  height: 18px !important;
  text-align: center !important;
  margin: 0;
}
table tbody tr div {
  height: 22px !important;
}
input[type="color"] {
  background-color: rgb(243, 243, 243);
}
table input[type="color"] {
  padding: 0px 1px 0px 1px !important;
}
.sticky {
  display: block !important;
  overflow: hidden !important;
  height: 20px !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 0 !important;
}
.bg-custom {
  background-color: #c8c8c8;
}
.bg-custom:hover {
  background-color: #c8c8c8;
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
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
  margin-left: auto;
}
.card-body {
  font-size: 12px;
  padding-top: 15px;
}
.card label {
  line-height: 1.2;
  font-size: 12px;
  text-align: start;
  padding-top: 0 !important;
}
input[type="text"] {
  height: 25px !important;
  padding: 0px 5px 0px 5px !important;
  font-size: 11px !important;
  text-align: start;
}
.card input[type="color"] {
  padding: 0px 2px 0px 2px !important;
  font-size: 11px !important;
  height: 25px !important;
}
.inputMenor {
  width: 60px;
  text-align: center;
}
.inputMenor2 {
  width: 40px;
  margin-right: 10px;
  text-align: center;
}
.inputMaior {
  width: 240px;
  text-align: start;
}
.clickable-header {
  cursor: pointer;
  padding-left: 5px;
}
/* =================== */

/* Botoes */
button {
  padding: 0;
  border: none;
  background: none;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  margin-right: 15px;
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
@media screen and (max-width: 849px) {
  .div-card {
    margin-left: 0 !important;
    top: 10px !important;
    margin-bottom: 10px !important;
  }
  .card {
    margin-left: 0 !important;
  }
}
</style>