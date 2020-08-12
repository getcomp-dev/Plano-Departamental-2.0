<template>
  <div class="main-component row">
    <PageHeader :title="'Cursos'">
      <BaseButton
        title="Ajuda"
        :type="'icon'"
        :color="'lightblue'"
        @click="$refs.modalAjuda.toggle()"
      >
        <font-awesome-icon :icon="['fas','question']" />
      </BaseButton>
    </PageHeader>

    <div class="page-content">
      <div class="div-table">
        <BaseTable>
          <template #thead>
            <th
              @click="toggleOrder(ordenacaoCursosMain, 'codigo')"
              title="Clique para ordenar por nome"
              class="clickable t-start"
              style="width: 65px"
            >
              Código
              <i :class="setIconByOrder(ordenacaoCursosMain, 'codigo')"></i>
            </th>
            <th
              @click="toggleOrder(ordenacaoCursosMain, 'nome')"
              title="Clique para ordenar por nome"
              class="clickable t-start"
              style="width:300px"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoCursosMain, 'nome')"></i>
            </th>
            <th
              class="clickable"
              style="width:65px"
              @click="toggleOrder(ordenacaoCursosMain, 'turno')"
            >
              Turno
              <i :class="setIconByOrder(ordenacaoCursosMain, 'turno')"></i>
            </th>
            <th
              class="clickable"
              style="width: 70px"
              title="Entrada de alunos 1º Semestre"
              @click="toggleOrder(ordenacaoCursosMain, 'alunosEntrada', 'desc')"
            >
              1º Sem.
              <i :class="setIconByOrder(ordenacaoCursosMain, 'alunosEntrada')"></i>
            </th>
            <th
              class="clickable"
              style="width: 70px"
              title="Entrada de alunos 2º Semestre"
              @click="
                toggleOrder(ordenacaoCursosMain, 'alunosEntrada2', 'desc')
              "
            >
              2º Sem.
              <i :class="setIconByOrder(ordenacaoCursosMain, 'alunosEntrada2')"></i>
            </th>
          </template>
          <template #tbody>
            <tr
              v-for="curso in Cursos"
              :key="'cursos' + curso.id + curso.codigo"
              @click.prevent="showCurso(curso), handleClickInCurso(curso.id)"
              :class="[
                { 'bg-selected': cursoClickado === curso.id },
                'clickable',
              ]"
            >
              <td style="width: 65px" class="t-start">{{ curso.codigo }}</td>
              <td style="width: 300px" class="t-start">{{ curso.nome }}</td>
              <td style="width: 65px">{{ curso.turno }}</td>
              <td style="width: 70px;">{{ curso.alunosEntrada }}</td>
              <td style="width: 70px;">{{ curso.alunosEntrada2 }}</td>
            </tr>
            <tr v-if="!Cursos.length">
              <td colspan="5" style="width:570px" class="text-center">
                <i class="fas fa-exclamation-triangle"></i> Nenhum curso
                encontrado!
              </td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card
        :title="'Curso'"
        :toggleFooter="isEdit"
        @btn-salvar="editCurso()"
        @btn-delete="checkDeleteCurso()"
        @btn-add="addCurso()"
        @btn-clean="cleanCurso()"
      >
        <template #form-group>
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="nome" class="col-form-label">Nome</label>
              <input
                id="nome"
                type="text"
                class="input-maior form-control form-control-sm"
                @input="cursoForm.nome = $event.target.value.toUpperCase()"
                :value="cursoForm.nome"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="codigo" class="col-form-label">Código</label>
              <input
                type="text"
                class="form-control form-control-sm input-menor"
                id="codigo"
                @input="cursoForm.codigo = $event.target.value.toUpperCase()"
                :value="cursoForm.codigo"
              />
            </div>
            <div class="form-group col m-0 px-0">
              <label required for="turno" class="col-form-label">Turno</label>
              <select
                type="text"
                class="form-control form-control-sm input-medio"
                id="turno"
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
              <label required for="alunosEntrada1" class="col-form-label">Alunos 1º Sem.</label>
              <input
                type="text"
                class="form-control form-control-sm input-menor"
                id="alunosEnrada1"
                @keypress="maskOnlyNumber"
                v-model="cursoForm.alunosEntrada"
              />
            </div>

            <div class="form-group col m-0 px-0">
              <label required for="alunosEntrada2" class="col-form-label">Alunos 2º Sem.</label>
              <input
                type="text"
                class="form-control form-control-sm input-menor"
                id="alunosEntrada2"
                @keypress="maskOnlyNumber"
                v-model="cursoForm.alunosEntrada2"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>

    <ModalDelete ref="modalDelete" :isDeleting="isEdit" @btn-deletar="deleteCurso">
      <li v-if="isEdit" class="list-group-item">
        <span v-html="modalDeleteText"></span>
      </li>
      <li v-else class="list-group-item">Nenhuma curso selecionado.</li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Para adicionar cursos:</b> Com o cartão à direita em branco,
        preencha-o. Em seguida, clique em Adicionar
        <i
          class="fas fa-plus icon-green px-1"
        ></i>
        .
      </li>
      <li class="list-group-item">
        <b>Para editar ou deletar um curso:</b> Na tabela, clique no curso que
        deseja alterar. Logo após, no cartão à direita, altere as informações
        que desejar e clique em Salvar
        <i
          class="fas fa-check icon-green px-1"
        ></i>
        ou, para excluí-lo, clique em Deletar
        <i class="far fa-trash-alt icon-red px-1"></i>
        .
      </li>
      <li class="list-group-item">
        <b>Para deixar o cartão em branco:</b> No cartão, à direita, clique em
        Cancelar
        <i class="fas fa-times icon-gray px-1"></i>
        .
      </li>
      <li class="list-group-item">
        <b>Para alterar a ordenação:</b> Clique em Nome no cabeçalho da tabela
        para ordenar por ordem alfabética ou em Código para ordem numérica do
        código do curso.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import ls from "local-storage";
import cursoService from "@/common/services/curso";
import { toggleOrdination, maskOnlyNumber } from "@/common/mixins";
import { Card } from "@/components/ui";
import { ModalDelete, ModalAjuda } from "@/components/modals";

const emptyCurso = {
  id: undefined,
  nome: undefined,
  codigo: undefined,
  turno: undefined,
  semestreInicial: undefined,
  alunosEntrada: undefined,
  alunosEntrada2: undefined,
  posicao: undefined,
};

export default {
  name: "DashboardCursos",
  mixins: [toggleOrdination, maskOnlyNumber],
  components: { Card, ModalDelete, ModalAjuda },

  data() {
    return {
      modalDeleteText: "",
      cursoClickado: "",
      cursoForm: this.$_.clone(emptyCurso),
      ordenacaoCursosMain: { order: "codigo", type: "asc" },
    };
  },
  created() {
    this.ultimo =
      this.$store.state.curso.Cursos[this.$store.state.curso.Cursos.length - 1]
        .id + 1;
    this.selectAll = true;
  },

  methods: {
    handleClickInCurso(cursoId) {
      this.cursoClickado = cursoId;
    },
    clearClick() {
      this.cursoClickado = "";
    },
    toggleCurso(id) {
      var state = ls.get(`${id}`);
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
    validateCurso(curso) {
      for (const key of Object.keys(curso)) {
        if (key !== "id")
          if (
            curso[key] === "" ||
            curso[key] === null ||
            curso[key] === undefined
          )
            return false;
      }
      return true;
    },
    addCurso() {
      this.cursoForm.posicao = this.ultimo;
      this.ultimo = this.ultimo + 1;
      if (
        this.cursoForm.alunosEntrada == 0 ||
        this.cursoForm.alunosEntrada === undefined
      )
        if (
          this.cursoForm.alunosEntrada2 == 0 ||
          this.cursoForm.alunosEntrada2 === undefined
        )
          this.cursoForm.semestreInicial = 3;
        else this.cursoForm.semestreInicial = 2;
      else if (
        this.cursoForm.alunosEntrada2 == 0 ||
        this.cursoForm.alunosEntrada2 === undefined
      )
        this.cursoForm.semestreInicial = 1;
      else this.cursoForm.semestreInicial = 3;

      if (!this.validateCurso(this.cursoForm)) {
        this.pushNotification({
          type: "error",
          title: "Erro ao criar Curso!",
          text: "Campos obrigátorios incompletos ou inválidos",
        });
        return;
      }

      cursoService
        .create(this.cursoForm)
        .then((response) => {
          this.$store.dispatch("fetchAllPedidos");
          this.cleanCurso();

          this.$notify({
            title: `Sucesso!`,
            text: `Curso ${response.Curso.nome} foi criado`,
            type: "success",
          });
        })
        .catch((error) => {
          this.pushNotification({
            type: "error",
            title: "Erro ao criar Curso!",
            text: error.message || "",
          });
        });
    },
    editCurso() {
      if (
        this.cursoForm.alunosEntrada == 0 ||
        this.cursoForm.alunosEntrada === undefined
      )
        if (
          this.cursoForm.alunosEntrada2 == 0 ||
          this.cursoForm.alunosEntrada2 === undefined
        )
          this.cursoForm.semestreInicial = 3;
        else this.cursoForm.semestreInicial = 2;
      else if (
        this.cursoForm.alunosEntrada2 == 0 ||
        this.cursoForm.alunosEntrada2 === undefined
      )
        this.cursoForm.semestreInicial = 1;
      else this.cursoForm.semestreInicial = 3;
      cursoService
        .update(this.cursoForm.id, this.cursoForm)
        .then((response) => {
          this.$notify({
            title: `Sucesso!`,
            text: `Curso ${response.Curso.nome} foi atualizado`,
            type: "success",
          });
        })
        .catch((error) => {
          this.pushNotification({
            type: "error",
            title: "Erro ao atualizar Curso",
            text: error.message || "",
          });
        });
    },

    openModalDelete() {
      this.$refs.modalDelete.open();
    },

    closeModalDelete() {
      this.$refs.modalDelete.close();
    },

    checkCursoPedidos() {
      for (let t in this.$store.state.pedido.Pedidos) {
        let pedido = this.$_.find(this.$store.state.pedido.Pedidos[t], (p) => {
          if (p.Curso === this.cursoForm.id) {
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

    checkDeleteCurso() {
      if (this.checkCursoPedidos()) {
        this.modalDeleteText = `
        O curso <b>${this.cursoForm.codigo} - ${this.cursoForm.nome}</b>
        possui vagas alocadas. Tem certeza que deseja excluí-lo?`;
      } else {
        this.modalDeleteText = `Tem certeza que deseja excluír o curso
        <b>${this.cursoForm.codigo} - ${this.cursoForm.nome}</b>?`;
      }
      this.openModalDelete();
    },
    deleteCurso() {
      cursoService
        .delete(this.cursoForm.id, this.cursoForm)
        .then((response) => {
          this.closeModalDelete();
          this.cleanCurso();
          this.$notify({
            title: `Sucesso!`,
            text: `O Curso ${response.Curso.nome} foi excluído`,
            type: "success",
          });
        })
        .catch((error) => {
          this.pushNotification({
            type: "error",
            title: "Erro ao excluir Curso!",
            text: error.message || "",
          });
        });
    },
    cleanCurso() {
      this.clearClick();
      this.cursoForm = this.$_.clone(emptyCurso);
    },
    showCurso(curso) {
      this.cleanCurso();
      this.cursoForm = this.$_.clone(curso);
    },
  },

  computed: {
    Cursos() {
      return this.$_.orderBy(
        this.$store.state.curso.Cursos,
        this.ordenacaoCursosMain.order,
        this.ordenacaoCursosMain.type
      );
    },
    isEdit() {
      return this.cursoForm.id !== undefined;
    },
  },
};
</script>

<style scoped>
.card .input-maior {
  width: 250px;
}
.card .input-menor {
  width: 100px;
  text-align: center !important;
}
.card .input-medio {
  width: 100%;
}
</style>
