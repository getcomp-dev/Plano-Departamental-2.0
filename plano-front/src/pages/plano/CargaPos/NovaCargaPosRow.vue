<template>
  <tr class="novaturma">
    <td style="width:70px" class="less-padding">
      <select type="text" v-model="cargaPosForm.programa">
        <option value="PGCC">PGCC</option>
        <option value="PGEM">PGEM</option>
        <option value="PGMC">PGMC</option>
      </select>
    </td>
    <td style="width:25px">
      <div style="height:30px"></div>
    </td>
    <td style="width:55px">
      <select v-model.number="cargaPosForm.trimestre">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </td>
    <td style="width:145px" class="less-padding">
      <select v-model.number="cargaPosForm.Docente">
        <option v-if="!DocentesOrdered.length" type="text" value
          >Nenhum Docente Encontrado</option
        >
        <option
          v-for="docente in DocentesOrdered"
          :key="docente.id + docente.apelido"
          :value="docente.id"
          >{{ docente.apelido }}</option
        >
      </select>
    </td>
    <td style="width:50px" class="less-padding">
      <input
        type="text"
        id="creditos"
        v-model.number="cargaPosForm.creditos"
        @keypress="maskOnlyNumber"
      />
    </td>
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
    ...mapActions(["addNovaCargaPos"]),

    async handleAddNovaCargaPos() {
      try {
        this.setPartialLoading(true);
        await this.addNovaCargaPos(this.cargaPosForm);
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

    DocentesOrdered() {
      return this.$_.orderBy(this.DocentesAtivos, "apelido");
    },
  },
};
</script>

<style scoped>
.novaturma {
  font-size: 11px !important;
  background-color: #cecece;
}
.novaturma td {
  margin: 0 !important;
  padding: 0 5px;
  vertical-align: middle !important;
  text-align: center;
  word-break: break-word;
}
.novaturma .less-padding {
  padding: 0 2px;
}

.novaturma select,
.novaturma input {
  font-size: 11px !important;
  border: 1px solid #414141 !important;
  color: #414141;
  border-radius: 0px !important;
}
.novaturma select {
  height: 18px !important;
  width: 100% !important;
  padding: 0 0 !important;
  text-align: start;
}
.novaturma input[type="text"] {
  width: 100% !important;
  height: 18px !important;
  text-align: center;
}
.novaturma select + select {
  margin-top: 3px !important;
}
.novaturma input[type="checkbox"] {
  width: 13px !important;
  height: 13px !important;
  text-align: center !important;
  margin: 0;
  margin-top: 5px !important;
  margin-bottom: auto !important;
}
</style>
