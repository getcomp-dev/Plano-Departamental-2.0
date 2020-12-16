<template>
  <div class="main-component row">
    <portal to="page-header">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </portal>

    <div class="page-content">
      <div class="div-table">
        <BaseTable>
          <template #thead>
            <v-th-ordination
              :currentOrder="ordenacaoCursos"
              orderToCheck="codigo"
              width="65"
              align="start"
            >
              Código
            </v-th-ordination>

            <v-th-ordination
              :currentOrder="ordenacaoCursos"
              orderToCheck="nome"
              width="300"
              align="start"
            >
              Nome
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoCursos"
              orderToCheck="turno"
              width="65"
            >
              Turno
            </v-th-ordination>

            <v-th-ordination
              :currentOrder="ordenacaoCursos"
              orderToCheck="alunosEntrada"
              orderType="desc"
              width="75"
              paddingX="0"
              title="Entrada de alunos 1º período"
            >
              1º Período
            </v-th-ordination>

            <v-th-ordination
              :currentOrder="ordenacaoCursos"
              orderToCheck="alunosEntrada2"
              orderType="desc"
              width="75"
              paddingX="0"
              title="Entrada de alunos 3º período"
            >
              3º Período
            </v-th-ordination>
          </template>
          <template #tbody>
            <tr
              v-for="curso in CursosOrdered"
              :key="curso.id + curso.codigo"
              @click="handleClickInCurso(curso)"
              class=""
              :class="['clickable', { 'bg-selected': cursoSelecionado === curso.id }]"
            >
              <v-td width="65" align="start">{{ curso.codigo }}</v-td>
              <v-td width="300" align="start" :title="curso.nome">
                {{ curso.nome }}
              </v-td>
              <v-td width="65">{{ curso.turno }}</v-td>
              <v-td width="75">{{ curso.alunosEntrada }}</v-td>
              <v-td width="75">{{ curso.alunosEntrada2 }}</v-td>
            </tr>
            <tr v-if="!CursosOrdered.length">
              <v-td width="580" colspan="5">
                <font-awesome-icon
                  :icon="['fas', 'exclamation-triangle']"
                  class="icon-red"
                />
                <b>Nenhum curso encontrado!</b>
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card
        :title="'Curso'"
        :toggleFooter="isEditing"
        @btn-salvar="handleEditCurso"
        @btn-delete="openModalDelete"
        @btn-add="handleCreateCurso"
        @btn-clean="cleanForm"
      >
        <template #form-group>
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="nome" class="col-form-label">Nome</label>
              <input
                id="nome"
                type="text"
                class="input-maior form-control form-control-sm"
                @change="cursoForm.nome = normalizeInputText($event)"
                :value="cursoForm.nome"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="codigo" class="col-form-label">Código</label>
              <input
                id="codigo"
                type="text"
                class="form-control form-control-sm input-md"
                @change="cursoForm.codigo = normalizeInputText($event)"
                :value="cursoForm.codigo"
              />
            </div>

            <div class="form-group col m-0 px-0">
              <label required for="turno" class="col-form-label">Turno</label>
              <select
                id="turno"
                type="text"
                class="form-control form-control-sm input-md"
                v-model="cursoForm.turno"
              >
                <option value="Diurno">Diurno</option>
                <option value="Noturno">Noturno</option>
                <option value="Integral">Integral</option>
              </select>
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="alunosEntrada1" class="col-form-label">
                Alunos 1º Período
              </label>
              <input
                type="number"
                min="0"
                id="alunosEnrada1"
                class="form-control form-control-sm text-center input-md"
                v-model.number="cursoForm.alunosEntrada"
                @keypress="maskOnlyNumber"
                @blur="maskEmptyToZero($event, cursoForm, 'alunosEntrada')"
              />
            </div>

            <div class="form-group col m-0 px-0">
              <label required for="alunosEntrada2" class="col-form-label">
                Alunos 2º Período
              </label>
              <input
                type="number"
                min="0"
                id="alunosEntrada2"
                class="form-control form-control-sm text-center input-md"
                v-model.number="cursoForm.alunosEntrada2"
                @keypress="maskOnlyNumber"
                @blur="maskEmptyToZero($event, cursoForm, 'alunosEntrada2')"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>

    <ModalDelete
      ref="modalDelete"
      :isDeleting="isEditing"
      @btn-deletar="handleDeleteCurso"
    >
      <li v-if="isEditing" class="list-group-item">
        <span v-html="modalDeleteText"></span>
      </li>
      <li v-else class="list-group-item">Nenhuma curso selecionado.</li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Adicionar:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Editar:</b>
        Clique na linha da tabela do curso que deseja alterar. Em seguida, no cartão à
        direita, altere as informações que desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar:</b>
        Clique na linha da tabela do curso que deseja remover. Em seguida, no cartão à
        direita, clique em Remover
        <font-awesome-icon :icon="['fas', 'trash-alt']" class="icon-red" />
        e confirme a remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Limpar:</b>
        No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />
        , para limpar as informações.
      </li>
      <li class="list-group-item">
        <b>Ordenar:</b>
        Clique no cabeçalho da tabela, na coluna desejada, para alterar a ordenação das
        informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import ls from "local-storage";
import { mapActions, mapGetters } from "vuex";
import { clone, find, orderBy } from "lodash-es";
import { maskOnlyNumber, maskEmptyToZero, normalizeInputText } from "@/common/mixins";
import { ModalDelete, ModalAjuda } from "@/components/modals";
import { Card } from "@/components/ui";

const emptyCurso = {
  id: null,
  semestreInicial: null,
  posicao: null,
  nome: "",
  codigo: "",
  turno: "",
  alunosEntrada: 0,
  alunosEntrada2: 0,
};

export default {
  name: "DashboardCursos",
  mixins: [maskOnlyNumber, maskEmptyToZero, normalizeInputText],
  components: { Card, ModalDelete, ModalAjuda },
  data() {
    return {
      modalDeleteText: "",
      cursoSelecionado: "",
      cursoForm: clone(emptyCurso),
      ordenacaoCursos: { order: "codigo", type: "asc" },
    };
  },

  created() {
    this.selectAll = true;
  },

  methods: {
    ...mapActions(["createCurso", "editCurso", "deleteCurso"]),

    handleClickInCurso(curso) {
      this.cleanForm();
      this.cursoSelecionado = curso.id;
      this.cursoForm = clone(curso);
    },
    cleanForm() {
      this.cursoSelecionado = "";
      this.cursoForm = clone(emptyCurso);
    },
    checkSeCursoTemAlgumPedido(cursoId) {
      for (let t in this.$store.state.pedido.Pedidos) {
        let pedido = find(this.$store.state.pedido.Pedidos[t], (p) => {
          if (p.Curso === cursoId) {
            if (
              parseInt(p.vagasPeriodizadas, 10) > 0 ||
              parseInt(p.vagasNaoPeriodizadas, 10) > 0
            ) {
              return true;
            }
          }
          return false;
        });
        if (pedido) return true;
      }
      return false;
    },
    openModalDelete() {
      if (this.checkSeCursoTemAlgumPedido(this.cursoForm.id)) {
        this.modalDeleteText = `
        O curso <b>${this.cursoForm.codigo} - ${this.cursoForm.nome}</b>
        possui vagas alocadas. Tem certeza que deseja excluí-lo?`;
      } else {
        this.modalDeleteText = `Tem certeza que deseja excluír o curso
        <b>${this.cursoForm.codigo} - ${this.cursoForm.nome}</b>?`;
      }

      this.$refs.modalDelete.open();
    },
    toggleCurso(id) {
      let state = ls.get(`${id}`);
      this.$store.dispatch("toggleCurso", id);
      ls.set(`${id}`, !state);
    },
    toggleAllCursos() {
      if (this.selectAll === true) {
        this.$store.dispatch("toggleAllCursosFalse");
        this.selectAll = false;
        ls.set("toggle", false);
      } else {
        this.$store.dispatch("toggleAllCursosTrue");
        this.selectAll = true;
        ls.set("toggle", true);
      }
    },

    async handleCreateCurso() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.createCurso(this.cursoForm);
        this.cleanForm();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao criar novo curso!",
          text: error.message || "",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleEditCurso() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.editCurso(this.cursoForm);
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao editar curso!",
          text: error.message || "",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleDeleteCurso() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.deleteCurso(this.cursoForm);
        this.cleanForm();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao deletar curso!",
          text: error.message || "",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
  },

  computed: {
    ...mapGetters(["AllCursos"]),

    CursosOrdered() {
      return orderBy(
        this.AllCursos,
        this.ordenacaoCursos.order,
        this.ordenacaoCursos.type
      );
    },
    isEditing() {
      return this.cursoForm.id !== null;
    },
  },
};
</script>
