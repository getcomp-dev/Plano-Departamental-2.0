import store from "@/store";
import { find } from "lodash-es";

export default function parseTurmaSIGAToPedido(turmasSIGA, keysTurmaSIGA, turmaId) {
  const pedido = {
    Turma: null,
    Curso: null,
    vagasOferecidas: 0,
    vagasOcupadas: 0,
  };

  const cursosFound = find(store.getters.AllCursos, ["codigo", turmasSIGA[keysTurmaSIGA.cursoCod]]);
  pedido.Curso = cursosFound ? cursosFound.id : null;
  pedido.Turma = turmaId;
  pedido.vagasOferecidas = parseInt(turmasSIGA[keysTurmaSIGA.vagas1], 10);
  pedido.vagasOcupadas = parseInt(turmasSIGA[keysTurmaSIGA.vagas2], 10);

  return pedido.Curso ? pedido : null;
}
