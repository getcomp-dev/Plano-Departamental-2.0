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
              :currentOrder="ordenacaoHorarios"
              orderToCheck="horario"
              width="90"
              title="Dia e Horário"
            >
              Horário
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoHorarios"
              orderToCheck="ativo"
              width="70"
              title="Horário Ativo"
            >
              Ativo
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
        <b>Adicionar horário:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Editar horário:</b>
        Clique na linha da tabela do horário que deseja alterar. Em seguida, no cartão à direita,
        altere as informações que desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar horário:</b>
        Clique na linha da tabela do horário que deseja remover. Em seguida, no cartão à direita,
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
import { ModalAjuda } from "@/components/modals";
import VThOrdination from "../../../components/global/VThOrdination.vue";
export default {
  components: { ModalAjuda, VThOrdination },
};
</script>
