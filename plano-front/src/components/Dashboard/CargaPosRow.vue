<template>
  <div class="cargarow" style="width: 330px; font-size:11px">
    <td>
      <div style="width: 24px">
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
      <div style="width: 24px">
        <input
          type="text"
          style="width: 20px; height:16px;"
          id="trimestre"
          v-model="carga.trimestre"
          v-on:blur="editCarga(carga)"
        />
      </div>
    </td>

    <td>
      <div style="width: 135px">
        <select
          type="text"
          style="width:130px; padding-left:2px;"
          id="docente"
          v-model="carga.Docente"
          v-on:change="editCarga(carga)"
        >
          <option v-if="Docentes.length===0" type="text" value>Nenhum Docente Encontrado</option>
          <option
            v-for="docente in Docentes"
            :key="docente.id"
            :value="docente.id"
          >{{docente.apelido}}</option>
        </select>
      </div>
    </td>

    <td>
      <div style="width: 100px;">
        <input
          type="text"
          style="width: 80px"
          v-model="carga.programa"
          v-on:blur="editCarga(carga)"
        />
      </div>
    </td>
    <td>
      <div style="width: 40px">
        <input
          type="text"
          style="width: 25px"
          id="creditos"
          v-model="carga.creditos"
          v-on:blur="editCarga(carga)"
        />
      </div>
    </td>
  </div>
</template>
<script>
import cargaPosService from "../../common/services/cargaPos";
import _ from "lodash";

export default {
  name: "CargaPosRow",
  props: {
    carga: Object
  },

  data() {
    return {
      ativo: false,
      search: ""
    };
  },

  methods: {
    editCarga(carga) {
      cargaPosService
        .update(carga.id, carga)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Carga ${response.Turma.programa} foi atualizada!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao atualizar Carga</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },
    checkDelete(carga) {
      this.$store.commit("checkDeleteCarga", { CargaPos: carga });
      console.log(this.$store.state.cargaPos.Deletar);
    }
  },
  computed: {
    Docentes() {
      return _.orderBy(
        _.filter(this.$store.state.docente.Docentes, ["ativo", true]),
        "apelido"
      );
    }
  }
};
</script>

<style scoped>
/* prefixed */

td {
  text-align: center;
  vertical-align: middle;
  padding: 0;
  height: 25px;
}
p {
  margin-bottom: 0;
  text-align: center;
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