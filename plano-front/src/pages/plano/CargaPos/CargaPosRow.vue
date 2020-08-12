<template>
  <tr class="cargaPos-row max-content">
    <td style="width:70px">
      <div style="height:30px"></div>
    </td>
    <td style="width: 25px">
      <input type="checkbox" @click="checkDelete(carga)" />
    </td>
    <td style="width: 55px">
      <select v-model.number="cargaPosForm.trimestre" @change="editCargaPos">
        <option type="text" value="1">1</option>
        <option type="text" value="2">2</option>
        <option type="text" value="3">3</option>
      </select>
    </td>

    <td style="width: 145px">
      <select v-model.number="cargaPosForm.Docente" @change="editCargaPos">
        <option
          v-for="docente in Docentes"
          :key="'id docente' + docente.id"
          :value="docente.id"
        >{{ docente.apelido }}</option>
      </select>
    </td>

    <td style="width: 50px">
      <input
        type="text"
        v-model.number="cargaPosForm.creditos"
        @keypress="maskOnlyNumber"
        @change="editCargaPos()"
      />
    </td>
  </tr>
</template>

<script>
import cargaPosService from "@/common/services/cargaPos";
import { mapActions, mapGetters } from "vuex";
import { maskOnlyNumber } from "@/common/mixins";
import { setEmptyValuesToNull, validateObjectKeys } from "@/common/utils";

const emptyCarga = {
  id: null,
  trimestre: null,
  Docente: null,
  programa: null,
  creditos: null,
};

export default {
  name: "CargaPosRow",
  mixins: [maskOnlyNumber],
  props: {
    carga: Object,
  },
  data() {
    return {
      cargaPosForm: this.$_.clone(emptyCarga),
    };
  },

  methods: {
    ...mapActions(["setPartialLoading"]),

    resetCargaPos() {
      this.cargaPosForm = this.$_.clone(this.carga);
    },

    async editCargaPos() {
      try {
        this.setPartialLoading(true);

        const newCargaPos = this.$_.cloneDeepWith(
          this.cargaPosForm,
          setEmptyValuesToNull
        );
        validateObjectKeys(newCargaPos, ["creditos"]);

        await cargaPosService.update(newCargaPos.id, newCargaPos);
        this.pushNotification({
          text: `Carga ${newCargaPos.programa} atualizada`,
        });
      } catch (error) {
        this.resetCargaPos();

        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar carga!",
          text: error.message || "Tente novamente",
        });
      } finally {
        this.setPartialLoading(false);
      }
    },

    checkDelete(carga) {
      this.$store.commit("checkDeleteCarga", { CargaPos: carga });
    },
  },
  computed: {
    ...mapGetters(["DocentesAtivos"]),

    Docentes() {
      return this.$_.orderBy(this.DocentesAtivos, "apelido");
    },
  },
  watch: {
    carga: {
      handler: "resetCargaPos",
      immediate: true,
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
  margin-top: 3px !important;
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
