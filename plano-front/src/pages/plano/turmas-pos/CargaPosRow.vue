<template>
  <div class="cargaPos-row max-content ">
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
      <select
        type="text"
        v-model="cargaPosForm.trimestre"
        v-on:change="editCargaPos()"
      >
        <option type="text" value="1">1</option>
        <option type="text" value="2">2</option>
        <option type="text" value="3">3</option>
      </select>
    </td>

    <td style="width: 145px">
      <select
        type="text"
        v-model="cargaPosForm.Docente"
        v-on:change="editCargaPos()"
      >
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
        v-model.number="cargaPosForm.creditos"
        @keypress="onlyNumber"
        v-on:change="editCargaPos()"
      />
    </td>
  </div>
</template>

<script>
import _ from "lodash";
import cargaPosService from "@/common/services/cargaPos";
import notificationMixin from "@/mixins/notification.js";

const emptyCarga = {
  id: null,
  trimestre: null,
  Docente: null,
  programa: null,
  creditos: null,
};

export default {
  name: "CargaPosRow",
  mixins: [notificationMixin],
  props: {
    carga: Object,
  },
  data() {
    return {
      ativo: false,
      cargaPosForm: _.clone(emptyCarga),
    };
  },
  mounted() {
    this.cargaPosForm = _.clone(this.carga);
  },
  methods: {
    isEmpty(value) {
      return value === "" || value === undefined ? true : false;
    },
    setEmptyKeysToNull(object) {
      Object.keys(object).forEach((key) => {
        if (this.isEmpty(object[key])) object[key] = null;
      });
    },
    validateCargaPos(cargaPos) {
      if (
        cargaPos.trimestre === null ||
        cargaPos.Docente === null ||
        cargaPos.programa === null ||
        cargaPos.creditos === null
      ) {
        this.showNotification({
          type: "error",
          title: "Erro!",
          message: "Cadastro da carga inválido ou incompleto.",
        });
        return false;
      }

      return true;
    },
    editCargaPos() {
      const newCargaPos = _.clone(this.cargaPosForm);

      this.setEmptyKeysToNull(newCargaPos);
      if (!this.validateCargaPos(newCargaPos)) {
        this.cargaPosForm = _.clone(this.carga);
        return;
      }

      cargaPosService
        .update(newCargaPos.id, newCargaPos)
        .then((response) => {
          this.showNotification({
            type: "success",
            message: `A carga ${response.CargaPos.programa} foi atualizada!`,
          });
        })
        .catch((error) => {
          this.showNotification({
            type: "error",
            title: "Erro ao atualizar Carga!",
            message: error,
          });
        });
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    checkDelete(carga) {
      this.$store.commit("checkDeleteCarga", { CargaPos: carga });
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
.cargaPos-row {
  font-size: 11px !important;
}
.cargaPos-row td {
  margin: 0 !important;
  padding: 0 5px;
  vertical-align: middle !important;
  text-align: center;
  word-break: break-word;
}

.cargaPos-row select,
.cargaPos-row input {
  font-size: 11px !important;
  border: 1px solid #414141 !important;
  color: #414141;
  border-radius: 0px !important;
}
.cargaPos-row select {
  padding: 0 0 !important;
  height: 18px !important;
  width: 100% !important;
  text-align: start;
}
.cargaPos-row input[type="text"] {
  width: 100% !important;
  height: 18px !important;
  text-align: center;
}
.cargaPos-row select + select {
  margin-top: 2px !important;
}
.cargaPos-row input[type="checkbox"] {
  width: 13px !important;
  height: 13px !important;
  text-align: center !important;
  margin: 0;
  margin-top: 5px !important;
  margin-bottom: auto !important;
}
</style>
