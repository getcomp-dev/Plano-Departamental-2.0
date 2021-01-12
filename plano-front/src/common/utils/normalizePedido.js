import { cloneDeepWith } from "lodash-es";
import { setEmptyValuesToNull } from "./index";

export default function normalizePedido(pedido) {
  const pedidoNormalized = cloneDeepWith(pedido, setEmptyValuesToNull);

  if (pedidoNormalized.vagasOferecidas === null) pedidoNormalized.vagasOferecidas = 0;
  if (pedidoNormalized.vagasOcupadas === null) pedidoNormalized.vagasOcupadas = 0;
  pedidoNormalized.vagasOferecidas = parseInt(pedidoNormalized.vagasOferecidas, 10);
  pedidoNormalized.vagasOcupadas = parseInt(pedidoNormalized.vagasOcupadas, 10);

  return pedidoNormalized;
}
