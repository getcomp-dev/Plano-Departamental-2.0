<template>
  <tr class="novacarga">
    <v-td width="75" type="content">
      <select type="text" v-model="cargaPosForm.programa">
        <option value="PGCC">PGCC</option>
        <option value="PGEM">PGEM</option>
        <option value="PGMC">PGMC</option>
      </select>
    </v-td>
    <v-td width="25" />
    <v-td width="55" type="content">
      <select v-model.number="cargaPosForm.trimestre">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </v-td>
    <v-td width="145" type="content">
      <select v-model.number="cargaPosForm.Docente">
        <option v-if="!DocentesAtivos.length">
          Nenhum Docente Encontrado
        </option>
        <option v-for="docente in DocentesAtivos" :key="docente.id" :value="docente.id">
          {{ docente.apelido }}
        </option>
      </select>
    </v-td>
    <v-td width="60" type="content">
      <input
        type="text"
        v-model.number="cargaPosForm.creditos"
        @keypress="maskOnlyNumber"
        @paste.prevent
      />
    </v-td>
  </tr>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { clone } from "lodash-es";
import { maskOnlyNumber } from "@/common/mixins";
const emptyCarga = {
  id: null,
  trimestre: null,
  Docente: null,
  programa: null,
  creditos: null,
};

export default {
  name: "NovaCargaPosRow",
  mixins: [maskOnlyNumber],
  data() {
    return {
      cargaPosForm: clone(emptyCarga),
    };
  },

  methods: {
    ...mapActions(["createCargaPos"]),

    async handleCreateCargaPos() {
      try {
        this.setPartialLoading(true);
        await this.createCargaPos(this.cargaPosForm);
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao criar nova carga!",
          text: error.message || "",
        });
      } finally {
        this.setPartialLoading(false);
      }
    },
  },

  computed: {
    ...mapGetters(["DocentesAtivos"]),
  },
};
</script>

<style scoped>
.novacarga {
  font-size: 11px !important;
  background-color: #e9e9e9;
}
.novacarga:hover {
  background-color: #e9e9e9;
}
.novacarga input,
.novacarga select {
  margin: 5px 0;
}
.novaturma {
  font-size: 11px;
}
</style>
