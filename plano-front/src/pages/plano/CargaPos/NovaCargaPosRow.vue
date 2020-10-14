<template>
  <tr class="novacarga">
    <v-td width="75">
      <select type="text" v-model="cargaPosForm.programa">
        <option value="PGCC">PGCC</option>
        <option value="PGEM">PGEM</option>
        <option value="PGMC">PGMC</option>
      </select>
    </v-td>
    <v-td width="25" />
    <v-td width="55">
      <select v-model.number="cargaPosForm.trimestre">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </v-td>
    <v-td width="145">
      <select v-model.number="cargaPosForm.Docente">
        <option v-if="!DocentesAtivos.length">
          Nenhum Docente Encontrado
        </option>
        <option
          v-for="docente in DocentesAtivos"
          :key="docente.id + docente.apelido"
          :value="docente.id"
          >{{ docente.apelido }}
        </option>
      </select>
    </v-td>
    <v-td width="60">
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
      cargaPosForm: this.$_.clone(emptyCarga),
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
  background-color: #cecece;
}
.novacarga:hover {
  background-color: #cecece;
}
.novacarga select,
.novacarga input[type="text"] {
  width: 100%;
  margin: 5px 0;
  height: 19px;
  padding: 0 0;
  font-size: 11px;
  border: 1px solid #414141;
  border-radius: 0px;
  color: #414141;
}
.novacarga select {
  text-align: start;
}
.novacarga input[type="text"] {
  text-align: center;
  padding: 0 0px;
}
.novacarga input[type="checkbox"] {
  width: 13px !important;
  height: 13px !important;
  text-align: center !important;
  margin: 0;
  margin-top: 5px !important;
  margin-bottom: auto !important;
}
</style>
