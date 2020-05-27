<template>
  <div class="max-content sticky">
    <th scope="col">
      <p style="width:25px" class="p-header"></p>
    </th>
    <th scope="col">
      <p style="width:40px" class="p-header">Editar</p>
    </th>
    <th class="clickable" @click="$emit('toggle-order', 'periodo')">
      <p style="width:40px" class="p-header" title="Semestre">
        S.
        <i :class="setIconByOrder('periodo')"></i>
      </p>
    </th>
    <th class="clickable" @click="$emit('toggle-order', 'disciplinaCodigo')">
      <p style="width:70px" class="p-header" title="Código">
        Cód.
        <i :class="setIconByOrder('disciplinaCodigo')"></i>
      </p>
    </th>
    <th class="clickable" @click="$emit('toggle-order', 'disciplinaNome')">
      <p class="p-header t-start" style="width:330px">
        Disciplina
        <i :class="setIconByOrder('disciplinaNome')"></i>
      </p>
    </th>
    <th scope="col">
      <p class="p-header" style="width:18px" title="Créditos">C.</p>
    </th>
    <th scope="col">
      <p class="p-header" style="width:40px">Turma</p>
    </th>
    <th scope="col">
      <p class="p-header" style="width:130px">Docente</p>
    </th>
    <th scope="col">
      <p class="p-header" style="width:80px">Turno</p>
    </th>
    <th scope="col">
      <p class="p-header" style="width:80px">Horário</p>
    </th>

    <th scope="col">
      <p class="p-header" style="width:100px">Sala</p>
    </th>
    <th scope="col">
      <p class="p-header" style="width:40px" title="Total de vagas">Total</p>
    </th>
    <template v-for="curso in cursosSelecteds">
      <th :key="'1-' + curso.id" :id="'curso' + curso.id">
        <p
          v-bind:class="{ cursoGrande: nameIsBig(curso.codigo) }"
          style="width: 32px"
          v-on.prevent:mouseover
        >
          {{ curso.codigo }}
        </p>
      </th>

      <b-popover
        :key="
          'alunos-entrada' +
            curso.alunosEntrada +
            curso.id +
            curso.semestreInicial
        "
        :target="'curso' + curso.id"
        placement="bottom"
        triggers="hover focus"
      >
        <p
          class="p-0 m-0"
          style="text-align:center; font-size: 11px!important;"
          v-if="curso.semestreInicial == 1 || curso.semestreInicial == 3"
        >
          1º - {{ curso.alunosEntrada }}
        </p>
        <p
          class="p-0 m-0"
          style="text-align:center; font-size: 11px!important;"
          v-if="curso.semestreInicial == 2 || curso.semestreInicial == 3"
        >
          2º - {{ curso.alunosEntrada2 }}
        </p>
        <p
          class="p-0 m-0"
          style="text-align:center; font-size: 11px!important;"
        >
          <b>{{ curso.nome }}</b>
        </p>
      </b-popover>
    </template>
  </div>
</template>
<script>
export default {
  name: "TurmaHeader",

  props: {
    cursosSelecteds: Array,
    currentOrder: Object,
  },

  methods: {
    nameIsBig(nome) {
      if (nome.length > 4) return true;
      else return false;
    },
    setIconByOrder(orderToCheck) {
      console.log(this.currentOrder);
      if (this.currentOrder.order === orderToCheck) {
        return this.currentOrder.type === "asc"
          ? "fas fa-arrow-down fa-sm"
          : "fas fa-arrow-up fa-sm";
      } else {
        return "fas fa-arrow-down fa-sm low-opacity";
      }
    },
  },
};
</script>

<style scoped>
.cursoGrande {
  font-size: 7px !important;
}
.sticky {
  display: block !important;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 0 !important;
  display: block !important;
  overflow: hidden !important;
  z-index: 5;
}
p {
  margin: 0;
  font-size: 11px;
  text-align: center;
  height: 18px;
  padding: 0 5px !important;
}
th {
  padding: 0 !important;
  font-size: 10px;
  text-align: center;
  height: 16px !important;
}
.max-content {
  width: -webkit-max-content !important;
  width: -moz-max-content !important;
  width: max-content !important;
}
</style>
