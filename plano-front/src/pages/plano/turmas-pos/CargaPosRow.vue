<template>
  <div class="turmarow max-content ">
    <td style="width:70px"><div style="height:30px"></div></td>
    <td style="width: 25px">
      <input
        type="checkbox"
        name="ativa"
        value="true"
        v-on:click="checkDelete(carga)"
        v-model="ativo"
      />
    </td>
    <td style="width: 55px">
      <select type="text" id="programa" v-model="carga.trimestre">
        <option type="text" value="1">1</option>
        <option type="text" value="2">2</option>
        <option type="text" value="3">3</option>
      </select>
    </td>

    <td style="width: 145px">
      <select type="text" id="docente1" v-model="carga.Docente">
        <option v-if="Docentes.length === 0" type="text" value
          >Nenhum Docente Encontrado</option
        >
        <option
          v-for="docente in Docentes"
          :key="'id docente' + docente.id"
          :value="docente.id"
          >{{ docente.apelido }}</option
        >
      </select>
    </td>
    <td style="width: 50px">
      <input
        type="text"
        id="creditos"
        v-model="carga.creditos"
        @keypress="onlyNumber"
      />
    </td>
  </div>
</template>
<script>
import _ from "lodash";

export default {
  name: "CargaPosRow",
  props: {
    carga: Object,
  },

  data() {
    return {
      ativo: false,
      search: "",
    };
  },

  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    checkDelete(carga) {
      this.$store.commit("checkDeleteCarga", { CargaPos: carga });
      console.log(this.$store.state.cargaPos.Deletar);
    },
  },
  computed: {
    Docentes() {
      return _.orderBy(
        _.filter(this.$store.state.docente.Docentes, ["ativo", true]),
        "apelido"
      );
    },
  },
};
</script>

<style scoped>
.turmarow {
  font-size: 11px !important;
}
.turmarow select {
  padding: 0 0 !important;
  font-size: 11px !important;
  width: 100% !important;
  height: 18px !important;
}
.turmarow input[type="text"] {
  font-size: 11px !important;
  width: 100% !important;
  height: 18px !important;
  text-align: center !important;
}
.turmarow td {
  margin: 0 !important;
  padding: 0 5px;
  vertical-align: middle !important;
  text-align: center;
  word-break: break-word;
}

.turmarow input[type="checkbox"] {
  width: 13px !important;
  height: 13px !important;
  text-align: center !important;
  margin: 0;
  margin-top: 5px !important;
  margin-bottom: auto !important;
}
</style>
