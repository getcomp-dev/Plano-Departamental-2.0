import { find } from "lodash-es";

export default {
  methods: {
    generateHorariosText(horario1Id, horario2Id) {
      const AllHorarios = this.$store.getters.AllHorarios;
      const horario1 = find(AllHorarios, ["id", horario1Id]);
      const horario2 = find(AllHorarios, ["id", horario2Id]);

      if (horario1 && !horario2) {
        return horario1.horario;
      } else if (!horario1 && horario2) {
        return horario2.horario;
      } else if (horario1 && horario2) {
        return `${horario1.horario} / ${horario2.horario}`;
      } else {
        return "";
      }
    },
  },
};
