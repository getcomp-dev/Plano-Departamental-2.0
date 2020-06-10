<template>
  <div class="turma-header max-content sticky">
    <th style="width:25px"></th>
    <th style="width:40px" class="p-0">Editar</th>
    <th style="width:55px" title="Semestre">
      S.
    </th>
    <th
      @click.stop="$emit('toggle-order-perfil', setOrderPerfil)"
      style="width: 75px"
      class="clickable t-center"
    >
      <div class="d-flex justify-content-between align-items-center">
        <i
          class="fas fa-thumbtack"
          :class="currentOrderPerfil.order === null ? 'low-opacity' : ''"
        ></i>
        <span>
          Perfil
        </span>

        <i :class="setIconByOrder(currentOrderPerfil, 'perfilNome')"></i>
      </div>
    </th>
    <th
      class="clickable"
      @click="$emit('toggle-order', 'disciplinaCodigo')"
      style="width:70px"
      title="Código"
    >
      Cód.
      <i :class="setIconByOrder(currentOrder, 'disciplinaCodigo')"></i>
    </th>
    <th
      class="clickable t-start"
      style="width:330px"
      @click="$emit('toggle-order', 'disciplinaNome')"
    >
      Disciplina
      <i :class="setIconByOrder(currentOrder, 'disciplinaNome')"></i>
    </th>
    <th style="width:25px" title="Créditos">
      C.
    </th>
    <th style="width:35px" class="p-0" title="Turma">T.</th>
    <th style="width:130px">Docente</th>
    <th style="width:80px">Turno</th>
    <th style="width:85px">Horário</th>
    <th style="width:95px">Sala</th>
    <th style="width:45px" title="Total de vagas">
      Total
    </th>
    <template v-for="curso in cursosAtivados">
      <th
        class="p-0"
        style="width: 35px"
        :key="'1-' + curso.id"
        :id="'curso' + curso.id"
      >
        <span
          v-bind:class="{ cursoGrande: nameIsBig(curso.codigo) }"
          v-on.prevent:mouseover
        >
          {{ curso.codigo }}
        </span>
      </th>

      <b-popover
        :key="'popover' + curso.id"
        :target="'curso' + curso.id"
        placement="bottom"
        triggers="hover focus"
      >
        <span class="w-100 text-center" style="font-size: 11px!important;">
          <b>{{ curso.nome }}</b>
        </span>

        <p
          class="p-0 m-0 text-center"
          style="font-size: 11px!important;"
          v-if="curso.semestreInicial == 1 || curso.semestreInicial == 3"
        >
          1º - {{ curso.alunosEntrada }}
        </p>
        <p
          class="p-0 m-0 text-center"
          style="font-size: 11px!important;"
          v-if="curso.semestreInicial == 2 || curso.semestreInicial == 3"
        >
          2º - {{ curso.alunosEntrada2 }}
        </p>
      </b-popover>
    </template>
  </div>
</template>

<script>
export default {
  name: "TurmaHeader",
  props: {
    cursosAtivados: { type: Array, required: true },
    currentOrder: { type: Object, required: true },
    currentOrderPerfil: { type: Object, required: true },
  },

  methods: {
    nameIsBig(nome) {
      if (nome.length > 4) return true;
      else return false;
    },
    setIconByOrder(currentOrder, orderToCheck) {
      if (currentOrder.order === orderToCheck) {
        return currentOrder.type === "asc"
          ? "fas fa-arrow-down fa-sm"
          : "fas fa-arrow-up fa-sm";
      } else {
        return "fas fa-arrow-down fa-sm low-opacity";
      }
    },
  },
  computed: {
    setOrderPerfil() {
      if (this.currentOrderPerfil.type === "desc") {
        return null;
      } else {
        return "perfilNome";
      }
    },
  },
};
</script>

<style scoped>
.turma-header {
  font-size: 11px !important;
}
.turma-header th {
  margin: 0 !important;
  padding: 0 5px;
  height: 18px !important;
  vertical-align: middle !important;
  text-align: center;
  word-wrap: none;
  word-break: break-word;
  user-select: none;
}
.cursoGrande {
  font-size: 7px !important;
}
.turma-header p {
  margin: 0;
}
</style>
