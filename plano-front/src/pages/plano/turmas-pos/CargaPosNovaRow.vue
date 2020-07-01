<template>
  <tr class="novaturma stickyAdd ">
    <div class="max-content stickyAdd">
      <td style="width:70px" class="less-padding">
        <select type="text" v-model="cargaPosForm.programa">
          <option type="text" value="PGCC">PGCC</option>
          <option type="text" value="PGEM">PGEM</option>
          <option type="text" value="PGMC">PGMC</option>
        </select>
      </td>
      <td style="width:25px"><div style="height:30px"></div></td>
      <td style="width:55px" class="less-padding">
        <select type="text" v-model.number="cargaPosForm.trimestre">
          <option type="text" value="1">1</option>
          <option type="text" value="2">2</option>
          <option type="text" value="3">3</option>
        </select>
      </td>
      <td style="width:145px" class="less-padding">
        <select type="text" v-model="cargaPosForm.Docente">
          <option v-if="DocentesOrdered.length === 0" type="text" value
            >Nenhum Docente Encontrado</option
          >
          <option
            v-for="docente in DocentesOrdered"
            :key="'id docente' + docente.id"
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
          @keypress="onlyNumber"
        />
      </td>
    </div>
  </tr>
</template>

<script>
import _ from "lodash";
import { EventBus } from "@/event-bus.js";
import notificationMixin from "@/mixins/notification.js";
import cargaPosService from "@/common/services/cargaPos";

const emptyCarga = {
  id: null,
  trimestre: null,
  Docente: null,
  programa: null,
  creditos: null,
};

export default {
  name: "CargaPosNovaRow",
  mixins: [notificationMixin],
  data() {
    return {
      cargaPosForm: _.clone(emptyCarga),
    };
  },
  mounted() {
    EventBus.$on("add-carga-pos", this.addCarga);
  },
  beforeDestroy() {
    EventBus.$off("add-carga-pos");
  },
  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    isEmpty(value) {
      return value === "" || value === undefined ? true : false;
    },
    setEmptyKeysToNull(object) {
      Object.keys(object).forEach((key) => {
        if (this.isEmpty(object[key])) object[key] = null;
      });
    },
    validateCargaPos(carga) {
      if (
        carga.trimestre === null ||
        carga.Docente === null ||
        carga.programa === null ||
        carga.creditos === null
      ) {
        this.showNotification({
          type: "error",
          title: "Erro!",
          message: "Cadastro da nova carga inválido ou incompleto.",
        });
        return false;
      }

      return true;
    },
    addCarga() {
      this.cargaPosForm.Plano = localStorage.getItem('Plano')
      const newCarga = _.clone(this.cargaPosForm);

      this.setEmptyKeysToNull(newCarga);
      if (!this.validateCargaPos(newCarga)) return;

      cargaPosService
        .create(newCarga)
        .then((response) => {
          this.cleanCarga();

          this.showNotification({
            type: "success",
            message: `A carga ${response.CargaPos.programa} foi criada!`,
          });
        })
        .catch((error) => {
          this.showNotification({
            type: "error",
            title: "Erro ao criar nova carga!",
            message: error,
          });
        });
    },
    cleanCarga() {
      this.cargaPosForm = _.clone(emptyCarga);
    },
  },
  computed: {
    DocentesOrdered() {
      return _.orderBy(
        _.filter(this.$store.state.docente.Docentes, ["ativo", true]),
        "apelido"
      );
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
.novaturma select {
  padding: 0 0 !important;
  font-size: 11px !important;
  width: 100% !important;
  height: 18px !important;
}
.novaturma input[type="text"] {
  font-size: 11px !important;
  width: 100% !important;
  height: 18px !important;
  text-align: center !important;
}
.stickyAdd {
  background-color: #cecece;
  display: block;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 19px !important;
  overflow: hidden !important;
  z-index: 5 !important;
}
</style>
