<template>
  <tr class="cargapos-row">
    <v-td width="75" />
    <v-td width="25">
      <input type="checkbox" v-model="toggleToDelete" :value="carga" />
    </v-td>
    <v-td width="55">
      <select v-model.number="cargaPosForm.trimestre" @change="handleEditCargaPos">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </v-td>
    <v-td width="145">
      <select v-model.number="cargaPosForm.Docente" @change="handleEditCargaPos">
        <option
          v-for="docente in DocentesAtivos"
          :key="docente.id + docente.apelido"
          :value="docente.id"
          >{{ docente.apelido }}</option
        >
      </select>
    </v-td>
    <v-td width="60">
      <input
        type="text"
        v-model.number="cargaPosForm.creditos"
        @keypress="maskOnlyNumber"
        @change="handleEditCargaPos"
        @paste.prevent
      />
    </v-td>
  </tr>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { maskOnlyNumber } from "@/common/mixins";

export default {
  name: "CargaPosRow",
  mixins: [maskOnlyNumber],
  props: {
    carga: { type: Object, required: true },
  },
  data() {
    return {
      cargaPosForm: null,
    };
  },

  methods: {
    ...mapActions(["toggleCargaToDelete", "editCargaPos"]),

    resetCargaPos() {
      this.cargaPosForm = this.$_.clone(this.carga);
    },
    async handleEditCargaPos() {
      try {
        this.setPartialLoading(true);
        await this.editCargaPos(this.cargaPosForm);
      } catch (error) {
        this.resetCargaPos();

        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar carga!",
          text: error.message || "",
        });
      } finally {
        this.setPartialLoading(false);
      }
    },
  },

  computed: {
    ...mapGetters(["DocentesAtivos", "CargasPosToDelete"]),

    toggleToDelete: {
      set() {
        this.toggleCargaToDelete(this.carga);
      },
      get() {
        return this.CargasPosToDelete;
      },
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
.cargapos-row {
  font-size: 11px !important;
}
.cargapos-row select,
.cargapos-row input[type="text"] {
  width: 100%;
  margin: 5px 0;
  height: 19px;
  padding: 0 0;
  font-size: 11px;
  border: 1px solid #414141;
  border-radius: 0px;
  color: #414141;
}
.cargapos-row select {
  text-align: start;
}
.cargapos-row input[type="text"] {
  text-align: center;
  padding: 0 0px;
}
.cargapos-row input[type="checkbox"] {
  width: 13px !important;
  height: 13px !important;
  text-align: center !important;
  margin: 0;
  margin-top: 5px !important;
  margin-bottom: auto !important;
}
</style>
