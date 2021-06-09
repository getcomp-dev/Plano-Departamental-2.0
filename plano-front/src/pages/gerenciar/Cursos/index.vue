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
              width="75"
              title="Código do Curso"
            >
              Código
            </v-th-ordination>

            <v-th-ordination
              :currentOrder="ordenacaoCursos"
              orderToCheck="nome"
              width="300"
              title="Nome do Curso"
            >
              Nome
            </v-th-ordination>
            <v-th-ordination :currentOrder="ordenacaoCursos" orderToCheck="turno" width="70">
              Turno
            </v-th-ordination>
            <v-th width="170">
              Período
              <v-th-ordination
                :currentOrder="ordenacaoCursos"
                orderToCheck="alunosEntrada"
                orderType="desc"
                width="85"
                paddingX="0"
                title="Entrada de alunos 1º período"
              >
                Primeiro
              </v-th-ordination>
              <v-th-ordination
                :currentOrder="ordenacaoCursos"
                orderToCheck="alunosEntrada2"
                orderType="desc"
                width="85"
                paddingX="0"
                title="Entrada de alunos 3º período"
              >
                Terceiro
              </v-th-ordination>
            </v-th>
          </template>

          <template #tbody>
            <tr
              v-for="curso in CursosOrdered"
              :key="curso.id + curso.codigo"
              @click="handleClickInCurso(curso)"
              class=""
              :class="['clickable', { 'bg-selected': cursoSelecionado === curso.id }]"
            >
              <v-td width="75">{{ curso.codigo }}</v-td>
              <v-td width="300" align="start" :title="curso.nome">
                {{ curso.nome }}
              </v-td>
              <v-td width="70">{{ curso.turno }}</v-td>
              <v-td width="85">{{ curso.alunosEntrada }}</v-td>
              <v-td width="85">{{ curso.alunosEntrada2 }}</v-td>
            </tr>

            <tr v-if="!CursosOrdered.length">
              <v-td width="580" colspan="5">
                <font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="icon-red" />
                <b>Nenhum curso encontrado!</b>
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card
        title="Curso"
        width="320"
        :toggleFooter="isEditing"
        @btn-salvar="handleEditCurso"
        @btn-delete="openModalDelete"
        @btn-add="handleCreateCurso"
        @btn-clean="clearForm"
      >
        <template #body>
          <VInput label="Nome" v-model="cursoForm.nome" :validation="$v.cursoForm.nome" />

          <div class="row">
            <div class="col">
              <VInput label="Código" v-model="cursoForm.codigo" :validation="$v.cursoForm.codigo" />
            </div>
            <div class="col">
              <VSelect label="Turno" v-model="cursoForm.turno" :validation="$v.cursoForm.turno">
                <b-form-select-option value="Diurno">DIURNO</b-form-select-option>
                <b-form-select-option value="Noturno">NOTURNO</b-form-select-option>
                <b-form-select-option value="Integral">INTEGRAL</b-form-select-option>
              </VSelect>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <VInput
                inputType="number"
                label="Alunos 1º Período"
                v-model.number="cursoForm.alunosEntrada"
                :validation="$v.cursoForm.alunosEntrada"
                textAlign="center"
              />
            </div>
            <div class="col">
              <VInput
                inputType="number"
                label="Alunos 2º Período"
                v-model.number="cursoForm.alunosEntrada2"
                :validation="$v.cursoForm.alunosEntrada2"
                textAlign="center"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>

    <ModalDelete ref="modalDelete" :isDeleting="isEditing" @btn-deletar="handleDeleteCurso">
      <li v-if="isEditing" class="list-group-item">
        <span v-html="modalDeleteText"></span>
      </li>
      <li v-else class="list-group-item">Nenhuma curso selecionado.</li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Adicionar curso:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Editar curso:</b>
        Clique na linha da tabela do curso que deseja alterar. Em seguida, no cartão à direita,
        altere as informações que desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar curso:</b>
        Clique na linha da tabela do curso que deseja remover. Em seguida, no cartão à direita,
        clique em Remover
        <font-awesome-icon :icon="['fas', 'trash-alt']" class="icon-red" />
        e confirme a remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Limpar formulário:</b>
        No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />
        , para limpar as informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { orderBy } from "lodash-es";
import { required, integer } from "vuelidate/lib/validators";
import { makeEmptyCurso } from "@utils/factories";
import { ModalDelete, ModalAjuda } from "@/components/modals";
import { Card, VInput, VSelect } from "@/components/ui";

export default {
  name: "DashboardCursos",
  components: { Card, VInput, VSelect, ModalDelete, ModalAjuda },
  data() {
    return {
      modalDeleteText: "",
      cursoSelecionado: "",
      cursoForm: makeEmptyCurso(),
      ordenacaoCursos: { order: "codigo", type: "asc" },
    };
  },
  validations: {
    cursoForm: {
      nome: { required },
      codigo: { required },
      turno: { required },
      alunosEntrada: { required, integer },
      alunosEntrada2: { required, integer },
    },
  },

  methods: {
    ...mapActions(["createCurso", "editCurso", "deleteCurso"]),

    handleClickInCurso(curso) {
      this.cursoSelecionado = curso.id;
      this.cursoForm = { ...curso };
    },
    clearForm() {
      this.cursoSelecionado = "";
      this.cursoForm = makeEmptyCurso();
      this.$nextTick(() => this.$v.$reset());
    },
    checkSeCursoTemAlgumPedido(cursoId) {
      let temPedido = false;
      for (let t in this.Pedidos) {
        const pedidoFound = this.Pedidos[t].find(
          (p) =>
            p.Curso === cursoId &&
            (parseInt(p.vagasPeriodizadas, 10) > 0 || parseInt(p.vagasNaoPeriodizadas, 10) > 0)
        );
        if (pedidoFound) temPedido = true;
      }

      return temPedido;
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

    async handleCreateCurso() {
      this.$v.cursoForm.$touch();
      if (this.$v.cursoForm.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        await this.createCurso({ ...this.cursoForm });
        this.clearForm();
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
      this.$v.cursoForm.$touch();
      if (this.$v.cursoForm.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        await this.editCurso({ ...this.cursoForm });
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
      this.$v.cursoForm.$touch();
      if (this.$v.cursoForm.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        await this.deleteCurso({ ...this.cursoForm });
        this.clearForm();
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
    ...mapGetters(["AllCursos", "Pedidos"]),

    CursosOrdered() {
      return orderBy(this.AllCursos, this.ordenacaoCursos.order, this.ordenacaoCursos.type);
    },
    isEditing() {
      return this.cursoForm.id !== null;
    },
  },
};
</script>
