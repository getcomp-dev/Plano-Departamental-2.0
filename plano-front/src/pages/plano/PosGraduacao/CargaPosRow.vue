<template>
  <tr class="cargapos-row">
    <v-td width="75" />
    <v-td width="25" type="content">
      <input type="checkbox" v-model="toggleToDelete" :value="carga" />
    </v-td>
    <v-td width="65" type="content">
      <select v-model.number="cargaPosForm.trimestre" @change="handleEditCargaPos">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </v-td>
    <v-td width="145" type="content">
      <select v-model.number="cargaPosForm.Docente" @change="handleEditCargaPos">
        <option v-for="docente in DocentesAtivos" :key="docente.id" :value="docente.id">
          {{ docente.apelido }}
        </option>
      </select>
    </v-td>
    <v-td width="80" type="content">
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
import { clone } from "lodash-es";
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
      this.cargaPosForm = clone(this.carga);
    },
    async handleEditCargaPos() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.editCargaPos(this.cargaPosForm);
      } catch (error) {
        this.resetCargaPos();

        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar carga!",
          text: error.message || "",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
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
  font-size: 11px;
}
.cargapos-row input,
.cargapos-row select {
  margin: 5px 0;
}
</style>
