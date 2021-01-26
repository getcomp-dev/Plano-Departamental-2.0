<template>
  <div class="main-component row">
    <portal to="page-header">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </portal>

    <div class="page-content">
      <div class="table-div">
        <BaseTable>
          <template #thead>
            <v-th-ordination
              :currentOrder="ordenacaoConflitos"
              orderToCheck="disciplina.codigo"
              width="110"
              title="Código da Disciplina"
            >
              Cód. Disciplina
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoConflitos"
              orderToCheck="disciplina.nome"
              width="300"
              align="start"
            >
              Disciplina
            </v-th-ordination>
            <v-th width="30" title="Turma">T.</v-th>
            <v-th-ordination
              :currentOrder="ordenacaoConflitos"
              orderToCheck="curso"
              width="90"
              title="Código do Curso"
            >
              Cód. Curso
            </v-th-ordination>
            <v-th width="85" paddingX="0" title="Valor do pedido no SIGA">Valor SIGA</v-th>
            <v-th width="85" paddingX="0" title="Valor do pedido no Sistema">Valor Sistema</v-th>
          </template>

          <template #tbody>
            <tr
              v-for="conflito in conflitosOrdered"
              :key="conflito.disciplina.codigo + conflito.turma + conflito.curso"
            >
              <v-td width="110">{{ conflito.disciplina.codigo }}</v-td>
              <v-td width="300" align="start">{{ conflito.disciplina.nome }}</v-td>
              <v-td width="30">{{ conflito.turma }}</v-td>
              <v-td width="90">{{ conflito.curso }}</v-td>
              <v-td width="85">{{ conflito.siga }}</v-td>
              <v-td width="85">{{ conflito.sistema }}</v-td>
            </tr>

            <tr v-if="!conflitosOrdered.length">
              <v-td width="700">
                <b>Nenhum conflito encontrado.</b>
                Certifiqui-se de selecionar um arquivo correspondente com o plano atual e o periodo
                selecionado.
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card :title="'Validar pedidos'">
        <template #form-group>
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="nome" class="col-form-label">Período</label>
              <select
                id="periodoPlano"
                v-model.number="periodoDasTurmas"
                class="input-lg form-control form-control-sm"
              >
                <option
                  v-for="periodo in PeriodosLetivos"
                  :key="periodo.id + periodo.nome"
                  :value="periodo.id"
                >
                  {{ periodo.nome }}
                </option>
              </select>
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="turmaFile" class="col-form-label">
                Arquivo .csv do plano SIGA
              </label>
              <input
                type="file"
                id="turmaFile"
                ref="inputFilePlano"
                class="form-control-file"
                accept=".csv"
              />
            </div>
          </div>
        </template>

        <template #footer>
          <BaseButton template="Salvar" :title="'Iniciar'" @click="handleCompareTurmas" />
          <BaseButton template="cancelar" @click="clearCardForm" />
        </template>
      </Card>
    </div>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Limpar:</b>
        No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />
        , para limpar as informações.
      </li>
      <li class="list-group-item">
        <b>Ordenar:</b>
        Clique no cabeçalho da tabela, na coluna desejada, para alterar a ordenação das informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import XLSX from "xlsx";
import { mapGetters } from "vuex";
import { find, some, isEqual, orderBy } from "lodash-es";
import { generateEmptyTurma, normalizeText, readFileToBinary } from "@/common/utils";
import { Card } from "@/components/ui";
import { ModalAjuda } from "@/components/modals";

export default {
  name: "ValidaçãoLançamentoSIGA",
  components: { Card, ModalAjuda },
  data() {
    return {
      periodoDasTurmas: 1,
      conflitos: [],
      ordenacaoConflitos: {
        order: "disciplina.codigo",
        type: "asc",
      },
    };
  },

  methods: {
    clearCardForm() {
      this.periodoDasTurmas = 1;
      this.$refs.inputFilePlano.value = "";
    },
    async handleCompareTurmas() {
      if (!this.periodoDasTurmas) {
        this.pushNotification({
          type: "error",
          text: "É necessario selecionar um período",
        });
        return;
      }
      const [fileTurmas] = this.$refs.inputFilePlano.files;
      if (!fileTurmas) {
        this.pushNotification({
          type: "error",
          text: "É necessario selecionar um arquivo .csv",
        });
        return;
      }

      this.setLoading({ type: "partial", value: true });
      const turmasFile = await this.readFileTurmas(fileTurmas);
      const turmasFileNormalized = this.normalizeTurmasFile(turmasFile, this.periodoDasTurmas);

      this.searchConflictsTurmas(turmasFileNormalized);
      this.setLoading({ type: "partial", value: false });
    },
    async readFileTurmas(fileTurmas) {
      const binaryString = await readFileToBinary(fileTurmas);
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
      const dataString = JSON.stringify(XLSX.utils.sheet_to_json(firstWorksheet));
      const dataStringNormalized = dataString
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s/g, "");

      return JSON.parse(dataStringNormalized);
    },
    normalizeTurmasFile(turmasFile, periodo) {
      const keys = {
        disciplinaCod: null,
        letra: null,
        cursoCod: null,
        pedido1: null,
        pedido2: null,
        horarioESala: null,
        docentes: null,
      };
      let i = 0;
      for (const key in turmasFile[0]) {
        if (i === 1) keys.disciplinaCod = key;
        else if (i === 2) keys.letra = key;
        else if (i === 3) keys.cursoCod = key;
        else if (i === 5) keys.pedido1 = key;
        else if (i === 6) keys.pedido2 = key;
        else if (i === 7) keys.horarioESala = key;
        else if (i === 8) keys.docentes = key;
        i++;
      }
      const turmasNormalized = [];
      let currentTurma = {};

      for (const turmaFile of turmasFile) {
        const newTurma = generateEmptyTurma({ periodo, letra: turmaFile[keys.letra] || null });
        newTurma.pedidos = []; //Array com todos pedidos da turmas presentes no arquivo

        this.setDisciplina(newTurma, turmaFile[keys.disciplinaCod]);
        this.setHorariosESalas(newTurma, turmaFile[keys.horarioESala]);
        this.setDocentes(newTurma, turmaFile[keys.docentes]);
        //Se não achou a Disciplina, letra ou turno1 não adiciona a turma
        if (!newTurma.Disciplina || !newTurma.letra || !newTurma.turno1) {
          continue;
        }
        //Se a nova turma é igual a currentTurma, não adiciona a turma apenas a o pedido
        if (this.turmasIsEqual(currentTurma, newTurma)) {
          this.setPedidos(
            turmasNormalized[turmasNormalized.length - 1],
            turmaFile[keys.pedido1],
            turmaFile[keys.pedido2],
            turmaFile[keys.cursoCod]
          );
          continue;
        }

        this.setPedidos(
          newTurma,
          turmaFile[keys.pedido1],
          turmaFile[keys.pedido2],
          turmaFile[keys.cursoCod]
        );
        turmasNormalized.push(newTurma);
        currentTurma = { ...newTurma };
      }

      return turmasNormalized;
    },
    searchConflictsTurmas(turmasDoArquivo) {
      this.conflitos = [];
      //Turmas do periodo selecionado, exclui perfil MAC que não esta plano DCC do SIGA, e exclui as
      //disciplinas que são do primeiro periodo de algum gradeDCC
      const turmasDoSistemaFiltered = this.AllTurmas.filter(
        (turma) =>
          turma.periodo === this.periodoDasTurmas &&
          turma.disciplina.Perfil != 15 &&
          !some(this.DisciplinasGradeDCCPrimeiroPeriodo, ["Disciplina", turma.Disciplina])
      );

      for (const turmaSistema of turmasDoSistemaFiltered) {
        const turmaFile = find(
          turmasDoArquivo,
          (turmaFile) =>
            turmaSistema.Disciplina == turmaFile.Disciplina && turmaSistema.letra == turmaFile.letra
        );

        if (!turmaFile) {
          console.log("Turmas apenas no sistema", turmaSistema);
          continue;
        }

        const pedidosdaTurmaSis = this.Pedidos[turmaSistema.id];

        turmaFile.pedidos.forEach((pedidoArq) => {
          const pedidoSisFound = pedidosdaTurmaSis.find(
            (pedidoSis) => pedidoSis.Curso == pedidoArq.Curso
          );

          if (!pedidoSisFound) {
            console.log("Turmas apenas no SIGA, com valor: ", pedidoArq.pedidos);
            return;
          }
          const somatorioVagas =
            pedidoSisFound.vagasPeriodizadas + pedidoSisFound.vagasNaoPeriodizadas;

          if (somatorioVagas != pedidoArq.pedidos) {
            this.conflitos.push({
              disciplina: turmaSistema.disciplina,
              turma: turmaSistema.letra,
              curso: find(this.AllCursos, ["id", pedidoSisFound.Curso]).codigo,
              siga: pedidoArq.pedidos,
              sistema: somatorioVagas == 0 ? "-" : somatorioVagas,
            });
          }
        });

        pedidosdaTurmaSis
          .filter((pedido) => pedido.vagasPeriodizadas != 0 || pedido.vagasNaoPeriodizadas != 0)
          .forEach((pedido) => {
            const pedidoArqFound = turmaFile.pedidos.find(
              (pedidoArq) => pedido.Curso == pedidoArq.Curso
            );
            const somatorioVagas = pedido.vagasPeriodizadas + pedido.vagasNaoPeriodizadas;

            if (!pedidoArqFound) {
              this.conflitos.push({
                disciplina: turmaSistema.disciplina,
                turma: turmaSistema.letra,
                curso: find(this.AllCursos, ["id", pedido.Curso]).codigo,
                siga: "-",
                sistema: somatorioVagas,
              });
              return;
            }
          });
      }

      //Remove turmas duplicados que existe no arquivo
      const uniqueTurmasOnly = [];
      this.conflitos.forEach((turma1) => {
        const alredyHas = uniqueTurmasOnly.find((turma2) => isEqual(turma1, turma2));

        if (!alredyHas) uniqueTurmasOnly.push(turma1);
      });
      this.conflitos = [...uniqueTurmasOnly];
    },

    turmasIsEqual(turma1, turma2) {
      return (
        turma1.letra === turma2.letra &&
        turma1.Disciplina === turma2.Disciplina &&
        turma1.Horario1 === turma2.Horario1 &&
        turma1.Horario2 === turma2.Horario2
      );
    },
    setPedidos(turma, strPedido1, strPedido2, cursoCodigo) {
      const cursoId = this.findCursoId(cursoCodigo);
      if (!cursoId) return;

      let pedido1 = 0;
      let pedido2 = 0;
      if (strPedido1) pedido1 = isNaN(strPedido1) ? 0 : Number(strPedido1);
      //Ignora o segundo campo de pedido presente no arquivo
      // if (strPedido2) pedido2 = isNaN(strPedido2) ? 0 : Number(strPedido2);

      turma.pedidos.push({
        Curso: cursoId,
        pedidos: pedido1 + pedido2,
      });
    },
    setDisciplina(turma, strCodigo) {
      if (!strCodigo) return;

      const disciplinaFound = find(this.AllDisciplinas, ["codigo", strCodigo]);

      turma.Disciplina = disciplinaFound ? disciplinaFound.id : null;
      if (disciplinaFound) {
        turma.disciplinaNome = disciplinaFound.nome;
        turma.disciplinaCodigo = disciplinaFound.codigo;
      }
    },
    setHorariosESalas(turma, strHorarioESala) {
      if (!strHorarioESala) return;

      const [str1, str2] = strHorarioESala.split(";");
      turma.Horario1 = this.findHorarioId(str1);
      turma.Horario2 = this.findHorarioId(str2);
      turma.turno1 = this.findTurno(turma.Horario1, turma.Horario2);

      if (turma.turno1 !== "EAD") {
        turma.Sala1 = this.findSalaId(str1);
        turma.Sala2 = this.findSalaId(str2);
      }
    },
    setDocentes(turma, strDocentes) {
      if (!strDocentes) return;

      const [docente1Str, docente2Str] = strDocentes.split(";");
      turma.Docente1 = this.findDocenteId(docente1Str);
      turma.Docente2 = this.findDocenteId(docente2Str);
    },
    findTurno(horario1Id, horario2Id) {
      if (!horario1Id && !horario2Id) {
        return null;
      } else if (horario1Id == 31) {
        return "EAD";
      } else if (
        some(this.HorariosNoturno, ["id", horario1Id]) ||
        some(this.HorariosNoturno, ["id", horario2Id])
      ) {
        return "Noturno";
      } else {
        return "Diurno";
      }
    },
    findCursoId(cursoCodigo) {
      if (!cursoCodigo) return null;

      const cursoFound = find(this.AllCursos, ["codigo", cursoCodigo]);
      return cursoFound ? cursoFound.id : null;
    },
    findDocenteId(nomeSiga) {
      if (!nomeSiga) return null;

      const docenteFound = find(
        this.AllDocentes,
        (docente) => normalizeText(docente.nome) === normalizeText(nomeSiga)
      );
      return docenteFound ? docenteFound.id : null;
    },
    findHorarioId(strHorario) {
      if (!strHorario) return null;

      const [dia, hora, sala] = strHorario.split(",");
      const nomeHorario = this.findHorarioNomeByDiaEHora(dia, hora);

      if (nomeHorario) {
        const horarioFound = find(this.AllHorarios, ["horario", nomeHorario]);
        return horarioFound ? horarioFound.id : null;
      }

      //Caso não tenha achando nenhum horario mas tenha uma sala EAD
      if (normalizeText(sala).includes(normalizeText("HORÁRIO EAD"))) {
        return 31; //Id horario EAD
      }
      return null;
    },
    findHorarioNomeByDiaEHora(dia, hora) {
      if (!dia || !hora) return null;

      let diaNormalized = null;
      let horaNormalized = null;
      switch (dia.trim().substring(0, 3).toLowerCase()) {
      case "seg":
        diaNormalized = "2a";
        break;
      case "ter":
        diaNormalized = "3a";
        break;
      case "qua":
        diaNormalized = "4a";
        break;
      case "qui":
        diaNormalized = "5a";
        break;
      case "sex":
        diaNormalized = "6a";
        break;
      case "sab":
        return "EAD";
      }

      const horarioFound = find(this.ListaDeTodosHorarios, (horarioItem) =>
        horarioItem.nome.includes(hora.substring(0, 2) + "-")
      );
      horaNormalized = horarioFound ? horarioFound.nome : null;

      if (diaNormalized && horaNormalized) {
        return diaNormalized + " " + horaNormalized;
      } else {
        return null;
      }
    },
    findSalaId(strSala) {
      if (!strSala) return null;

      const [, , sala] = strSala.split(",");
      const strSalaNormalized = normalizeText(sala);

      const salaFound = find(this.AllSalas, (sala) => {
        const nomeNormalized = normalizeText(sala.nome);
        return strSalaNormalized.includes(nomeNormalized);
      });
      return salaFound ? salaFound.id : null;
    },
  },

  computed: {
    ...mapGetters([
      "AllTurmas",
      "AllHorarios",
      "HorariosNoturno",
      "AllDisciplinas",
      "AllCursos",
      "ListaDeTodosHorarios",
      "AllTurmas",
      "AllSalas",
      "AllDocentes",
      "PeriodosLetivos",
      "Pedidos",
      "DisciplinasGrades",
    ]),

    conflitosOrdered() {
      const { order, type } = this.ordenacaoConflitos;
      return orderBy(this.conflitos, order, type);
    },
    DisciplinasGradeDCCPrimeiroPeriodo() {
      const disciplinasGradeFiltered = this.DisciplinasGrades.filter(
        (disciplinaGrade) => disciplinaGrade.periodo === 1
      );

      const disciplinasGradeFilteredUnique = [];
      disciplinasGradeFiltered.forEach((disciplinaGrade) => {
        const alredyExist = disciplinasGradeFilteredUnique.find(
          (uniqueDisciplinaGrade) => uniqueDisciplinaGrade.Disciplina === disciplinaGrade.Disciplina
        );

        if (!alredyExist) disciplinasGradeFilteredUnique.push({ ...disciplinaGrade });
      });

      return disciplinasGradeFilteredUnique;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-control-file {
  margin-top: 2px;
}
</style>
