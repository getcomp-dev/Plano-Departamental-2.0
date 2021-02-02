import XLSX from "xlsx";
import { readFileToBinary } from "@/common/utils";

export default async function parseCSVFileToArray(file) {
  try {
    if (!file) return [];

    const fileBase64 = await readFileToBinary(file);
    const workbook = XLSX.read(fileBase64, { type: "binary" });
    const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
    const dataString = JSON.stringify(XLSX.utils.sheet_to_json(firstWorksheet));
    const dataStringNormalized = dataString
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s/g, "")
      .toUpperCase();
    return JSON.parse(dataStringNormalized);
  } catch (error) {
    return [];
  }
}
