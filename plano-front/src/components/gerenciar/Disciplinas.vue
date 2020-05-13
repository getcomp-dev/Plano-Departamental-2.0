<template>
  <div class="DashboardDisciplinas row pr-2" v-if="Admin">
    <PageTitle :title="'Disciplinas'">
      <template #aside>
        <button
          type="button"
          v-b-modal.modalAjuda
          title="Ajuda"
          class="btn-custom btn-icon relatbtn"
        >
          <i class="fas fa-question"></i>
        </button>
      </template>
    </PageTitle>
    <!--  -->
    <div class="w-100 mb-2 border-bottom"></div>
    <!--  -->
    <div class="row w-100 m-0">
      <div class="divTable p-0">
        <TableMain>
          <template #thead>
            <th
              @click="toggleOrdMain('nome')"
              style="width: 300px; text-align:start"
              class="clickable"
              title="Clique para ordenar por nome"
            >
              Nome
              <i
                style=" text-align:right"
                :class="
                  ordenacao.order == 'nome'
                    ? ordenacao.type == 'asc'
                      ? 'fas fa-arrow-down fa-sm'
                      : 'fas fa-arrow-up fa-sm'
                    : 'fas fa-arrow-down fa-sm low-opacity'
                "
              ></i>
            </th>
            <th
              style="width: 82px; text-align:start"
              @click="toggleOrdMain('codigo')"
              class=" clickable"
              title="Clique para ordenar por código"
            >
              Código
              <i
                style=" text-align:right"
                :class="
                  ordenacao.order == 'codigo'
                    ? ordenacao.type == 'asc'
                      ? 'fas fa-arrow-down fa-sm'
                      : 'fas fa-arrow-up fa-sm'
                    : 'fas fa-arrow-down fa-sm low-opacity'
                "
              ></i>
            </th>
            <th style="width: 40px;" class="" title="Carga Teórica">
              C.T.
            </th>
            <th style="width: 40px;" class="" title="Carga Prática">
              C.P.
            </th>
            <th style="width: 230px;text-align: start" class="">
              Perfil
            </th>
            <th style="width: 70px" class="">
              EAD
            </th>
            <th style="width: 70px" class="">
              Lab
            </th>
          </template>
          <template #tbody>
            <template v-for="disciplina in Disciplinas">
              <tr
                :key="'table disciplina:' + disciplina.id"
                @click.prevent="
                  showDisciplina(disciplina),
                    handleClickInDisciplina(disciplina.codigo)
                "
                :class="[
                  { 'bg-custom': disciplinaClickada === disciplina.codigo },
                  'clickable',
                ]"
              >
                <div class="max-content">
                  <td style="width: 300px; text-align: start">
                    {{ disciplina.nome }}
                  </td>
                  <td style="width: 82px; text-align: start">
                    {{ disciplina.codigo }}
                  </td>
                  <td style="width: 40px">
                    {{ disciplina.cargaTeorica }}
                  </td>
                  <td style="width: 40px">
                    {{ disciplina.cargaPratica }}
                  </td>

                  <td style="width: 230px; text-align: start">
                    {{ GetPerfilNomeById(disciplina.Perfil) }}
                  </td>
                  <td style="width: 70px">
                    {{ textoEad(disciplina.ead) }}
                  </td>
                  <td style="width: 70px">
                    {{ textoLab(disciplina.laboratorio) }}
                  </td>
                </div>
              </tr>
            </template>
            <template v-if="Disciplinas.length == 0">
              <tr>
                <td class="text-center">
                  <i class="fas fa-exclamation-triangle"></i> Nenhuma disciplina
                  encontrada!
                </td>
              </tr>
            </template>
          </template>
        </TableMain>
      </div>

      <div class="div-card p-0 mt-0 mb-4 ml-auto col-auto">
        <Card title="Disciplina">
          <template #form-group>
            <div class="row mb-2 mx-0">
              <div class="form-group m-0 col px-0">
                <label for="nome" class="col-form-label">Nome</label>
                <input
                  type="text"
                  id="nome"
                  class="form-control form-control-sm input-maior"
                  v-model="disciplinaForm.nome"
                />
              </div>
            </div>

            <div class="row mb-2 mx-0">
              <div class="form-group m-0 col px-0">
                <label for="codigo" class="col-form-label">Código</label>
                <input
                  type="text"
                  id="codigo"
                  class="form-control form-control-sm input-menor"
                  v-model="disciplinaForm.codigo"
                />
              </div>
            </div>
            <div class="row mb-2 mx-0">
              <div class="form-group m-0 col px-0">
                <label for="cargaTeorica" class="col-form-label"
                  >Carga Teórica</label
                >
                <input
                  type="text"
                  id="cargaTeorica"
                  class="form-control form-control-sm input-menor"
                  @keypress="onlyNumber"
                  v-model="disciplinaForm.cargaTeorica"
                />
              </div>

              <div class="form-group m-0 col px-0">
                <label for="cargaPratica" class="col-form-label"
                  >Carga Prática</label
                >
                <input
                  type="text"
                  id="cargaPratica"
                  class="form-control form-control-sm input-menor"
                  @keypress="onlyNumber"
                  v-model="disciplinaForm.cargaPratica"
                />
              </div>
            </div>
            <div class="row mb-2 mx-0">
              <div class="form-group m-0 col px-0">
                <label for="perfil" class="col-form-label">Perfil</label>
                <select
                  type="text"
                  id="perfil"
                  class="form-control form-control-sm input-maior"
                  v-model="disciplinaForm.Perfil"
                >
                  <option v-if="Perfis.length === 0" type="text" value
                    >Nenhum Perfil Encontrado</option
                  >
                  <option
                    v-for="perfil in Perfis"
                    :key="perfil.id"
                    :value="perfil.id"
                    >{{ perfil.nome }}</option
                  >
                </select>
              </div>
            </div>

            <div class="row mb-2 mt-3 mx-0">
              <div class="form-group col m-0 px-0">
                <label for="laboratorio" class="col-form-label"
                  >Laboratório</label
                >
                <select
                  type="text"
                  class="form-control form-control-sm input-medio"
                  id="laboratorio"
                  v-model="disciplinaForm.laboratorio"
                >
                  <option value="0">Não</option>
                  <option value="1">Sim</option>
                  <option value="2">Desejável</option>
                </select>
              </div>
              <div class="form-group col m-0 px-0">
                <label for="ead" class="col-form-label"
                >EAD</label
                >
                <select
                        type="text"
                        class="form-control form-control-sm input-medio"
                        id="ead"
                        v-model="disciplinaForm.ead"
                >
                  <option value="0">Não</option>
                  <option value="1">Integral</option>
                  <option value="2">Parcial</option>
                </select>
              </div>
            </div>
          </template>
          <template #botoes>
            <template v-if="isEdit">
              <button
                class="btn-custom btn-icon addbtn"
                v-on:click.prevent="editDisciplina"
                title="Salvar"
                type="button"
                :key="1"
              >
                <i class="fas fa-check"></i>
              </button>
              <button
                v-on:click.prevent="deleteDisciplina"
                class="btn-custom btn-icon delbtn"
                title="Deletar"
                type="button"
                :key="2"
              >
                <i class="far fa-trash-alt"></i>
              </button>
              <button
                class="btn-custom btn-icon cancelbtn"
                v-on:click.prevent="cleanDisciplina"
                title="Cancelar"
                type="button"
                :key="3"
              >
                <i class="fas fa-times"></i>
              </button>
            </template>

            <template v-else>
              <button
                class="btn-custom btn-icon addbtn"
                v-on:click.prevent="addDisciplina"
                title="Adicionar"
                type="button"
                :key="1"
              >
                <i class="fas fa-plus"></i>
              </button>
              <button
                class="btn-custom btn-icon cancelbtn"
                v-on:click.prevent="cleanDisciplina"
                title="Cancelar"
                type="button"
                :key="3"
              >
                <i class="fas fa-times"></i>
              </button>
            </template>
          </template>
        </Card>
      </div>
    </div>

    <!-- MODAL DE AJUDA -->
    <b-modal id="modalAjuda" ref="ajudaModal" scrollable title="Ajuda">
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para adicionar disciplinas:</strong> Com o cartão à direita
            em branco, preencha-o. Em seguida, clique em Adicionar
            <i class="fas fa-plus addbtn px-1" style="font-size:12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para editar ou deletar uma disciplina:</strong>Na tabela,
            clique na disciplina que deseja alterar. Logo após, no cartão à
            direita, altere as informações que desejar e clique em Salvar
            <i class="fas fa-check addbtn px-1" style="font-size:12px"></i>
            ou, para excluí-lo, clique em Deletar
            <i class="far fa-trash-alt delbtn px-1" style="font-size: 12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para deixar o cartão em branco:</strong> No cartão, à
            direita, clique em Cancelar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para alterar a ordenação:</strong> Clique em Nome ou Código
            no cabeçalho da tabela para ordenação alfabética do mesmo.
          </li>
        </ul>
      </div>

      <div slot="modal-footer" style="display: none"></div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import disciplinaService from "@/common/services/disciplina";
import PageTitle from "@/components/PageTitle";
import TableMain from "@/components/TableMain";
import Card from "@/components/Card";

const emptyDisciplina = {
  id: undefined,
  nome: undefined,
  codigo: undefined,
  cargaTeorica: undefined,
  cargaPratica: undefined,
  Perfil: undefined,
  ead: undefined,
  laboratorio: undefined,
};

export default {
  name: "DashboardDisciplina",
  components: { PageTitle, TableMain, Card },

  data() {
    return {
      disciplinaForm: _.clone(emptyDisciplina),
      error: undefined,
      disciplinaClickada: "",
      ordenacao: { order: "nome", type: "asc" },
    };
  },
  methods: {
    GetPerfilNomeById(id) {
      let perfil = _.find(this.Perfis, (perfil) => id === perfil.id);
      return perfil ? perfil.nome : "Nenhum perfil encontrado com id: " + id;
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    toggleOrdMain(ord, type = "asc") {
      if (this.ordenacao.order != ord) {
        this.ordenacao.order = ord;
        this.ordenacao.type = type;
      } else {
        this.ordenacao.type = this.ordenacao.type == "asc" ? "desc" : "asc";
      }
    },
    handleClickInDisciplina(disciplina) {
      this.disciplinaClickada = disciplina;
    },
    clearClick() {
      this.disciplinaClickada = "";
    },
    addDisciplina() {
      disciplinaService
        .create(this.disciplinaForm)
        .then((response) => {
          this.cleanDisciplina();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina ${response.Disciplina.nome} foi criada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao criar Disciplina</b>";
          console.log(error.response);
          if (error.response.data.fullMessage) {
            for (var e = 0; e < error.response.data.errors.length; e++) {
              if (error.response.data.errors[e].message.search("null") !== -1)
                this.error +=
                  "<br/>" +
                  error.response.data.errors[e].field +
                  " não pode ser vazio";
              else if (
                error.response.data.errors[e].message.search("unique") !== -1 &&
                error.response.data.errors[e].field.search("codigo") !== -1
              )
                this.error += "<br/>Disciplina já existe";
            }
          }
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },

    editDisciplina() {
      disciplinaService
        .update(this.disciplinaForm.id, this.disciplinaForm)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina ${response.Disciplina.nome} foi atualizada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao atualizar Disciplina</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },

    deleteDisciplina() {
      disciplinaService
        .delete(this.disciplinaForm.id, this.disciplinaForm)
        .then((response) => {
          this.cleanDisciplina();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina ${response.Disciplina.nome} foi excluída!`,
            type: "success",
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Disciplina</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },

    cleanDisciplina() {
      this.clearClick();
      this.disciplinaForm = _.clone(emptyDisciplina);
      this.error = undefined;
    },

    showDisciplina(disciplina) {
      this.cleanDisciplina();
      this.disciplinaForm = _.clone(disciplina);
    },

    textoLab(lab) {
      if (lab == 0) return "-";
      if (lab == 1) return "Sim";
      if (lab == 2) return "Desejável";
    },

    textoEad(ead) {
      if (ead == 0) return "-";
      if (ead == 1) return "Integral";
      if (ead == 2) return "Parcial";
    },
  },

  computed: {
    Disciplinas() {
      return _.orderBy(
        this.$store.state.disciplina.Disciplinas,
        this.ordenacao.order,
        this.ordenacao.type
      );
    },

    Perfis() {
      return this.$store.state.perfil.Perfis;
    },

    isEdit() {
      return this.disciplinaForm.id !== undefined;
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
.DashboardDisciplinas {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}

.card .input-maior {
  width: 280px;
}
.card .input-medio {
  width: 100px;
}
.card .input-menor {
  width: 80px;
  text-align: center !important;
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
@media screen and (max-width: 1223px) {
  .div-card {
    margin-left: 0px !important;
  }
}
</style>
