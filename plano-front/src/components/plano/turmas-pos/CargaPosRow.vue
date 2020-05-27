<template>
  <div class="cargarow" style="width: 218px !important; font-size:11px">
    <td>
      <div style="width: 25px">
        <input
          type="checkbox"
          name="ativa"
          value="true"
          v-on:click="checkDelete(carga)"
          v-model="ativo"
        />
      </div>
    </td>

    <td>
      <p style="width: 30px">{{ carga.trimestre }}</p>
    </td>

    <td>
      <div style="width: 135px">
        <template v-for="docente in Docentes">
          <p :key="docente.id + 'row id'" v-if="carga.Docente == docente.id">
            {{ docente.apelido }}
          </p>
        </template>
      </div>
    </td>
    <td>
      <p style="width: 30px">{{ carga.creditos }}</p>
    </td>
  </div>
</template>
<script>
//import cargaPosService from "@/common/services/cargaPos";
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
/* prefixed */

td {
  text-align: center !important;
  vertical-align: middle !important;
  padding: 0 !important;
  height: 25px !important;
}
p {
  margin-bottom: 0 !important;
  text-align: center !important;
}
input {
  height: 18px;
  text-align: center !important;
}
select {
  height: 18px;
}
input[type="checkbox"] {
  width: 16px !important;
  height: 14px !important;
  margin-top: 4px !important;
}
@-moz-document url-prefix() {
  select {
    height: 18px !important;
    text-align: left;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    line-height: 8px;
    border: 0.5px solid rgb(160, 160, 160);
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
  input {
    height: 18px !important;
    text-align: center;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    line-height: 8px;
    border: 0.5px solid rgb(160, 160, 160);
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
}
</style>
