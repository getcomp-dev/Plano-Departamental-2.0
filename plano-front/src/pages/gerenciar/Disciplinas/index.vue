<template>
  <div class="main-component row">
    <PageHeader :title="'Disciplinas'">
      <BaseButton
        title="Ajuda"
        :type="'icon'"
        :color="'lightblue'"
        @click="$refs.modalAjuda.toggle()"
      >
        <font-awesome-icon :icon="['fas', 'question']" />
      </BaseButton>
    </PageHeader>

    <div class="page-content">
      <div class="div-table p-0">
        <BaseTable>
          <template #thead>
            <th
              style="width: 82px; text-align:start"
              @click="toggleOrder(ordenacaoMain.disciplinas, 'codigo')"
              class="clickable"
              title="Clique para ordenar por código"
            >
              Código
              <i
                :class="setIconByOrder(ordenacaoMain.disciplinas, 'codigo')"
              ></i>
            </th>
            <th
              @click="toggleOrder(ordenacaoMain.disciplinas, 'nome')"
              style="width: 300px; text-align:start"
              class="clickable"
              title="Clique para ordenar por nome"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoMain.disciplinas, 'nome')"></i>
            </th>
            <th
              style="width: 80px"
              class="clickable t-start"
              @click="toggleOrder(ordenacaoMain.perfis, setFixedOrderPerfil)"
            >
              <div class="d-flex justify-content-between align-items-center">
                <i
                  class="fas fa-thumbtack"
                  :class="
                    ordenacaoMain.perfis.order === null ? 'low-opacity' : ''
                  "
                ></i>
                <span>Perfil</span>

                <i
                  :class="
                    setIconByOrder(ordenacaoMain.perfis, 'perfilAbreviacao')
                  "
                ></i>
              </div>
            </th>
            <th style="width: 40px" title="Carga Teórica">C.T.</th>
            <th style="width: 40px" title="Carga Prática">C.P.</th>

            <th
              style="width: 70px"
              class="clickable"
              @click="toggleOrder(ordenacaoMain.disciplinas, 'ead', 'desc')"
            >
              EAD
              <i :class="setIconByOrder(ordenacaoMain.disciplinas, 'ead')"></i>
            </th>
            <th
              style="width: 70px"
              class="clickable"
              @click="
                toggleOrder(ordenacaoMain.disciplinas, 'laboratorio', 'desc')
              "
            >
              Lab
              <i
                :class="
                  setIconByOrder(ordenacaoMain.disciplinas, 'laboratorio')
                "
              ></i>
            </th>
            <th
              style="width: 100px"
              class="clickable"
              @click="toggleOrder(ordenacaoMain.disciplinas, 'departamento')"
            >
              Departamento
              <i
                :class="
                  setIconByOrder(ordenacaoMain.disciplinas, 'departamento')
                "
              ></i>
            </th>
          </template>
          <template #tbody>
            <template v-for="disciplina in DisciplinasOrdered">
              <tr
                :key="'table disciplina:' + disciplina.id"
                @click.prevent="handleClickInDisciplina(disciplina)"
                :class="[
                  { 'bg-selected': disciplinaClickada === disciplina.id },
                  'clickable',
                ]"
              >
                <td style="width: 82px" class="t-start">
                  {{ disciplina.codigo }}
                </td>
                <td style="width: 300px" class="t-start">
                  {{ disciplina.nome }}
                </td>
                <td style="width: 80px" class="t-start">
                  {{ disciplina.perfilAbreviacao }}
                </td>
                <td style="width: 40px">{{ disciplina.cargaTeorica }}</td>
                <td style="width: 40px">{{ disciplina.cargaPratica }}</td>

                <td style="width: 70px">{{ textoEad(disciplina.ead) }}</td>
                <td style="width: 70px">
                  {{ textoLab(disciplina.laboratorio) }}
                </td>
                <td style="width: 100px">
                  {{ textoDpto(disciplina.departamento) }}
                </td>
              </tr>
            </template>
          </template>
        </BaseTable>
      </div>

      <Card
        :title="'Disciplina'"
        :toggleFooter="isEditing"
        @btn-salvar="editDisciplina"
        @btn-delete="openModalDelete"
        @btn-add="addDisciplina"
        @btn-clean="cleanDisciplina"
      >
        <template #form-group>
          <div class="row mb-2 mx-0">
            <div class="form-group m-0 col px-0">
              <label required for="nome" class="col-form-label">Nome</label>
              <input
                type="text"
                id="nome"
                class="form-control form-control-sm input-maior upper-case"
                v-model="disciplinaForm.nome"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group m-0 col px-0">
              <label required for="codigo" class="col-form-label">Código</label>
              <input
                type="text"
                id="codigo"
                class="form-control form-control-sm input-medio upper-case"
                v-model="disciplinaForm.codigo"
              />
            </div>
            <div class="form-group m-0 col px-0">
              <label required for="perfil" class="col-form-label">Perfil</label>
              <select
                type="text"
                id="perfil"
                style="width:100%"
                class="form-control form-control-sm"
                v-model="disciplinaForm.Perfil"
              >
                <option v-if="Perfis.length === 0" type="text" value
                  >Nenhum Perfil Encontrado</option
                >
                <option value=""></option>
                <option
                  v-for="perfil in Perfis"
                  :key="perfil.id"
                  :value="perfil.id"
                  >{{ perfil.abreviacao }}</option
                >
              </select>
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group m-0 col px-0">
              <label required for="cargaTeorica" class="col-form-label"
                >Carga Teórica</label
              >
              <input
                type="text"
                id="cargaTeorica"
                class="form-control form-control-sm input-medio t-center"
                @keypress="maskOnlyNumber"
                v-model.number="disciplinaForm.cargaTeorica"
              />
            </div>

            <div class="form-group m-0 col px-0">
              <label required for="cargaPratica" class="col-form-label"
                >Carga Prática</label
              >
              <input
                type="text"
                id="cargaPratica"
                class="form-control form-control-sm input-medio t-center"
                @keypress="maskOnlyNumber"
                v-model="disciplinaForm.cargaPratica"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="laboratorio" class="col-form-label"
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
              <label required for="ead" class="col-form-label">EAD</label>
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
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="departamento" class="col-form-label"
                >Departamento</label
              >
              <select
                type="text"
                class="form-control form-control-sm input-maior"
                id="departamento"
                v-model.number="disciplinaForm.departamento"
              >
                <option value="1">{{ textoDpto(1) }}</option>
                <option value="2">{{ textoDpto(2) }}</option>
              </select>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <ModalDelete
      ref="modalDelete"
      :isDeleting="isEditing"
      @btn-deletar="deleteDisciplina"
    >
      <li v-if="isEditing" class="list-group-item">
        <span>
          Tem certeza que deseja excluír a disciplina
          <b>{{ disciplinaForm.codigo + " - " + disciplinaForm.nome }}</b
          >?
        </span>
      </li>
      <li v-else class="list-group-item">Nenhuma disciplina selecionada.</li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Adicionar:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />.
      </li>
      <li class="list-group-item">
        <b>Editar:</b> Clique na linha da tabela da disciplina que deseja
        alterar. Em seguida, no cartão à direita, altere as informações que
        desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />.
      </li>
      <li class="list-group-item">
        <b>Deletar:</b> Clique na linha da tabela da disciplina que deseja
        remover. Em seguida, no cartão à direita, clique em Remover
        <font-awesome-icon :icon="['fas', 'trash-alt']" class="icon-red" /> e
        confirme a remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Limpar:</b> No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />, para
        limpar as informações.
      </li>
      <li class="list-group-item">
        <b>Ordenar:</b> Clique no cabeçalho da tabela, na coluna desejada, para
        alterar a ordenação das informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import disciplinaService from "@/common/services/disciplina";
import { toggleOrdination, maskOnlyNumber } from "@/common/mixins";
import { Card } from "@/components/ui";
import { ModalDelete, ModalAjuda } from "@/components/modals";

const emptyDisciplina = {
  id: undefined,
  nome: undefined,
  codigo: undefined,
  cargaTeorica: undefined,
  cargaPratica: undefined,
  Perfil: undefined,
  ead: undefined,
  laboratorio: undefined,
  departamento: undefined,
};

export default {
  name: "DashboardDisciplina",
  mixins: [toggleOrdination, maskOnlyNumber],
  components: { Card, ModalDelete, ModalAjuda },
  data() {
    return {
      disciplinaForm: this.$_.clone(emptyDisciplina),
      error: undefined,
      disciplinaClickada: "",
      ordenacaoMain: {
        disciplinas: { order: "codigo", type: "asc" },
        perfis: { order: null, type: "asc" },
      },
    };
  },
  methods: {
    handleClickInDisciplina(disciplina) {
      this.disciplinaClickada = disciplina.id;
      this.showDisciplina(disciplina);
    },
    allowPerfilNull(disciplina) {
      if (disciplina.Perfil === "") disciplina.Perfil = null;
      return !(disciplina.departamento == 1 && !disciplina.Perfil);
    },
    openModalDelete() {
      this.$refs.modalDelete.open();
    },
    cleanDisciplina() {
      this.disciplinaClickada = "";
      this.disciplinaForm = this.$_.clone(emptyDisciplina);
      this.error = undefined;
    },
    showDisciplina(disciplina) {
      this.cleanDisciplina();
      this.disciplinaForm = this.$_.clone(disciplina);
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
    textoDpto(dpto) {
      if (dpto == 1) return "DCC";
      if (dpto == 2) return "Outro";
    },

    addDisciplina() {
      if (this.allowPerfilNull(this.disciplinaForm)) {
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
                  error.response.data.errors[e].message.search("unique") !==
                    -1 &&
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
      } else {
        this.$notify({
          group: "general",
          title: `Erro!`,
          text: "Disciplinas do DCC devem fazer parte de um Perfil",
          type: "error",
        });
      }
    },
    editDisciplina() {
      if (this.allowPerfilNull(this.disciplinaForm)) {
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
                "<br/>" +
                error.response.data.fullMessage.replace("\n", "<br/>");
            }
            this.$notify({
              group: "general",
              title: `Erro!`,
              text: this.error,
              type: "error",
            });
          });
      } else {
        this.$notify({
          group: "general",
          title: `Erro!`,
          text: "Disciplinas do DCC devem fazer parte de um Perfil",
          type: "error",
        });
      }
    },
    deleteDisciplina() {
      disciplinaService
        .delete(this.disciplinaForm.id, this.disciplinaForm)
        .then((response) => {
          this.cleanDisciplina();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `Disciplina ${response.Disciplina.nome} foi excluída`,
            type: "success",
          });
        })
        .catch((error) => {
          this.$notify({
            group: "general",
            title: "Erro ao excluir Disciplina!",
            text: error.response
              ? "Disciplina não pode possuir nenhum vinculo para ser excluída"
              : "",
            type: "error",
          });
        });
    },
  },
  computed: {
    DisciplinasComPerfil() {
      let disciplinasResultantes = this.$store.state.disciplina.Disciplinas;

      disciplinasResultantes.forEach((disciplina) => {
        this.$_.find(this.Perfis, (perfil) => {
          if (perfil.id === disciplina.Perfil) {
            disciplina.perfilAbreviacao = perfil.abreviacao;
            return true;
          }
        });
      });
      return disciplinasResultantes;
    },
    DisciplinasOrdered() {
      const disciplinasResultantes = this.$_.orderBy(
        this.DisciplinasComPerfil,
        this.ordenacaoMain.disciplinas.order,
        this.ordenacaoMain.disciplinas.type
      );

      if (this.ordenacaoMain.perfis.order !== null) {
        return this.$_.orderBy(
          disciplinasResultantes,
          this.ordenacaoMain.perfis.order,
          this.ordenacaoMain.perfis.type
        );
      }
      return disciplinasResultantes;
    },
    setFixedOrderPerfil() {
      if (this.ordenacaoMain.perfis.type === "desc") return null;
      else return "perfilAbreviacao";
    },
    Perfis() {
      return this.$store.state.perfil.Perfis;
    },
    isEditing() {
      return this.disciplinaForm.id !== undefined;
    },
  },
};
</script>

<style scoped>
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
</style>
