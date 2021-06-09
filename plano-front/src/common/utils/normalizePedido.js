import { cloneDeepWith } from "lodash-es";
import { setEmptyValuesToNull } from "./index";

export default function normalizePedido(pedido, keysToCheck) {
  const pedidoNormalized = cloneDeepWith(pedido, setEmptyValuesToNull);

  keysToCheck.forEach((key) => {
    if (pedidoNormalized[key] === null) pedidoNormalized[key] = 0;
    pedidoNormalized[key] = parseInt(pedidoNormalized[key], 10);
  });

  return pedidoNormalized;
}
