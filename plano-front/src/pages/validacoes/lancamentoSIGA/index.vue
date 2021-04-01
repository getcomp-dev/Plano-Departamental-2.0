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
              width="80"
              align="start"
              title="Código da Disciplina"
            >
              Código
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoConflitos"
              orderToCheck="disciplina.nome"
              width="300"
              align="start"
              title="Nome da Disciplina"
            >
              Disciplina
            </v-th-ordination>
            <v-th width="45">Turma</v-th>
            <v-th width="55" title="Código do Curso">Curso</v-th>

            <v-th colspan="420" paddingX="0">
              Conflito
              <v-th width="180" align="start" title="Tipo do Conflito">Tipo</v-th>
              <v-th width="120" title="Valor no SIGA">SIGA</v-th>
              <v-th width="120" title="Valor no Sistema (SIPlanWeb)">Sistema</v-th>
            </v-th>
          </template>

          <template #tbody>
            <template v-for="turmaConflito in turmasConflitosOrdered">
              <tr :key="turmaConflito.id" class="bg-custom">
                <v-td width="80" align="start">{{ turmaConflito.disciplina.codigo }}</v-td>
                <v-td width="300" align="start">{{ turmaConflito.disciplina.nome }}</v-td>
                <v-td width="45">{{ turmaConflito.letra }}</v-td>
                <v-td width="55" />
                <v-td width="180" />
                <v-td width="120" />
                <v-td width="120" />
              </tr>

              <tr
                v-for="conflito in turmaConflito.conflitos"
                :key="turmaConflito.id + conflito.label + conflito.curso.id"
              >
                <v-td width="80" />
                <v-td width="300" />
                <v-td width="45" />
                <v-td width="55" :title="conflito.curso.nome">{{ conflito.curso.codigo }}</v-td>
                <v-td width="180" align="start">{{ conflito.label }}</v-td>
                <v-td width="120" :title="conflito.siga">{{ conflito.siga }}</v-td>
                <v-td width="120" :title="conflito.sistema">{{ conflito.sistema }}</v-td>
              </tr>
            </template>

            <tr v-if="!turmasConflitosOrdered.length">
              <v-td width="900">
                <b>Nenhum conflito encontrado.</b>
                Certifiqui-se de selecionar um arquivo correspondente com o plano atual e o periodo
                selecionado.
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card title="Validar pedidos">
        <template #body>
          <VSelect label="Perído" v-model.number="form.periodo" :validation="$v.form.periodo">
            <VOption
              v-for="periodo in PeriodosLetivos"
              :key="periodo.id + periodo.nome"
              :value="periodo.id"
              :text="periodo.nome"
            />
          </VSelect>

          <VInputFile
            label="Arquivo do plano SIGA (.csv)"
            v-model="form.file"
            :validation="$v.form.file"
            accept=".csv"
          />
        </template>

        <template #footer>
          <BaseButton template="Salvar" title="Iniciar" @click="handleCompareTurmas" />
          <BaseButton template="cancelar" @click="clearForm" />
        </template>
      </Card>
    </div>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar conteúdo:</b>
        Preencha o cartão a direita com o período do plano atual que deseja validar, em seguida
        selecione o arquivo (.csv) de plano gerado pelo SIGA para o período correspondente. E para
        finalizar clique no botão iniciar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-blue" />
        .
      </li>
      <li class="list-group-item">
        <b>Limpar formulário:</b>
        No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />
        , para limpar as informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { some, orderBy } from "lodash-es";
import { required, integer } from "vuelidate/lib/validators";
import { parseCSVFileToArray } from "@utils";
import {
  parseTurmaSIGAToTurma,
  parseTurmaSIGAToPedido,
  getKeysTurmaSIGA,
  validateTurmasSIGA,
} from "@/common/utils/turmasSIGA";
import { makeEmptyCurso } from "@utils/factories";
import { generateDocentesText, generateHorariosText } from "@mixins";
import { Card, VSelect, VOption, VInputFile } from "@/components/ui";
import { ModalAjuda } from "@/components/modals";

export default {
  name: "ValidaçãoLançamentoSIGA",
  components: { Card, ModalAjuda, VSelect, VOption, VInputFile },
  mixins: [generateDocentesText, generateHorariosText],
  data() {
    return {
      form: {
        periodo: 1,
        filePlano: null,
      },
      turmasConflitos: [],
      ordenacaoConflitos: {
        order: "disciplina.codigo",
        type: "asc",
      },
    };
  },
  validations: {
    form: {
      periodo: { required, integer },
      file: { required },
    },
  },

  methods: {
    clearForm() {
      this.form.periodo = 1;
      this.form.file = null;
      this.$nextTick(() => this.$v.$reset());
    },
    async handleCompareTurmas() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        const turmasFile = await parseCSVFileToArray(this.form.file);
        validateTurmasSIGA(turmasFile);
        const turmasSIGANormalized = this.normalizeTurmasEPedidosSIGA(
          turmasFile,
          this.form.periodo
        );
        this.searchConflitos(turmasSIGANormalized, this.form.periodo);
      } catch (error) {
        console.log(error);
        this.pushNotification({
          type: "error",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    normalizeTurmasEPedidosSIGA(turmasSIGA, periodo) {
      const keysTurmaSIGA = getKeysTurmaSIGA(turmasSIGA[0]);
      const turmasNormalized = [];
      let currentTurma = {};

      for (const turmaSIGA of turmasSIGA) {
        const newTurma = parseTurmaSIGAToTurma(turmaSIGA, keysTurmaSIGA, null, periodo);
        if (!newTurma) continue;
        newTurma.pedidosSIGA = []; //Array com todos pedidos da turmas

        const pedidoSIGA = parseTurmaSIGAToPedido(turmaSIGA, keysTurmaSIGA, null);
        if (pedidoSIGA) {
          const { vagasOferecidas, vagasOcupadas } = pedidoSIGA;
          pedidoSIGA.totalVagas = vagasOferecidas + vagasOcupadas;
        }

        // Se turma igual ao currentTurma apenas adiciona o pedido na turma anterior
        if (this.turmasAreEqual(currentTurma, newTurma)) {
          if (pedidoSIGA) {
            const index = turmasNormalized[turmasNormalized.length - 1].pedidosSIGA.findIndex(
              (pedido) => pedido.Curso === pedidoSIGA.Curso
            );
            if (index === -1) {
              turmasNormalized[turmasNormalized.length - 1].pedidosSIGA.push(pedidoSIGA);
            }
          }
        } else {
          // Se é uma turma nova então adiciona a turma e o pedido
          if (pedidoSIGA) newTurma.pedidosSIGA.push(pedidoSIGA);
          turmasNormalized.push(newTurma);
          currentTurma = { ...newTurma };
        }
      }

      return turmasNormalized;
    },
    searchConflitos(turmasSIGA, periodo) {
      this.turmasConflitos = [];
      const turmasConflitosFound = [];
      //Turmas do periodo selecionado, exclui perfil MAC que existe no arquivo SIGA
      const turmasSistema = this.AllTurmas.filter(
        (turma) => turma.periodo === periodo && turma.disciplina.Perfil != 15
      );

      turmasSistema.forEach((turmaSistema) => {
        const turmaSIGAFound = turmasSIGA.find(
          (turmaFile) =>
            turmaSistema.Disciplina == turmaFile.Disciplina && turmaSistema.letra == turmaFile.letra
        );
        const turmaConflitos = { ...turmaSistema, conflitos: [] };

        if (!turmaSIGAFound) {
          turmaConflitos.conflitos.push({
            label: "Turma existe apenas no sistema",
            siga: "-",
            sistema: "-",
            curso: makeEmptyCurso({ codigo: "-" }),
          });
          turmasConflitosFound.push(turmaConflitos);
          return;
        }
        // Conflitos de turmas
        if (!this.docentesAreEqual(turmaSistema, turmaSIGAFound)) {
          turmaConflitos.conflitos.push({
            label: "Docentes diferentes",
            siga: this.generateDocentesText(turmaSIGAFound.Docente1, turmaSIGAFound.Docente2),
            sistema: this.generateDocentesText(turmaSistema.Docente1, turmaSistema.Docente2),
            curso: makeEmptyCurso({ codigo: "-" }),
          });
        }
        if (!this.horariosAreEqual(turmaSistema, turmaSIGAFound)) {
          turmaConflitos.conflitos.push({
            label: "Horarios diferentes",
            siga: this.generateHorariosText(turmaSIGAFound.Horario1, turmaSIGAFound.Horario2),
            sistema: this.generateHorariosText(turmaSistema.Horario1, turmaSistema.Horario2),
            curso: makeEmptyCurso({ codigo: "-" }),
          });
        }
        // Conflitos de pedidos - exclui as disciplinas que são do 1 periodo de alguma gradeDCC
        if (!some(this.disciplinasGradeDCC1Periodo, ["Disciplina", turmaSistema.Disciplina])) {
          const pedidosDaTurmaSistema = this.Pedidos[turmaSistema.id] || [];

          turmaSIGAFound.pedidosSIGA.forEach((pedidoSIGA) => {
            const pedidoSistemaFound = pedidosDaTurmaSistema.find(
              (pedidoSis) => pedidoSis.Curso == pedidoSIGA.Curso
            );

            if (!pedidoSistemaFound) {
              turmaConflitos.conflitos.push({
                label: "Pedido não existe no sistema",
                siga: pedidoSIGA.totalVagas,
                sistema: "-",
                curso: this.AllCursos.find((curso) => curso.id === pedidoSIGA.Curso),
              });
              return;
            }

            const totalVagasSistema =
              pedidoSistemaFound.vagasPeriodizadas + pedidoSistemaFound.vagasNaoPeriodizadas;

            if (totalVagasSistema != pedidoSIGA.totalVagas) {
              turmaConflitos.conflitos.push({
                label: "Pedido com valores diferentes",
                siga: pedidoSIGA.totalVagas,
                sistema: totalVagasSistema == 0 ? "-" : totalVagasSistema,
                curso: this.AllCursos.find((curso) => curso.id === pedidoSistemaFound.Curso),
              });
              return;
            }
          });

          pedidosDaTurmaSistema
            .filter((pedido) => pedido.vagasPeriodizadas != 0 || pedido.vagasNaoPeriodizadas != 0)
            .forEach((pedidoSistema) => {
              const pedidoSIGA = turmaSIGAFound.pedidosSIGA.find(
                (pedidoArq) => pedidoSistema.Curso == pedidoArq.Curso
              );

              if (!pedidoSIGA) {
                turmaConflitos.conflitos.push({
                  label: "Pedido não existe no SIGA",
                  siga: "-",
                  sistema: pedidoSistema.vagasPeriodizadas + pedidoSistema.vagasNaoPeriodizadas,
                  curso: this.AllCursos.find((curso) => curso.id === pedidoSistema.Curso),
                });
                return;
              }
            });
        }

        if (turmaConflitos.conflitos.length) turmasConflitosFound.push(turmaConflitos);
      });

      this.turmasConflitos = turmasConflitosFound;
    },
    turmasAreEqual(turma1, turma2) {
      return (
        turma1.letra === turma2.letra &&
        turma1.Disciplina === turma2.Disciplina &&
        turma1.Horario1 === turma2.Horario1 &&
        turma1.Horario2 === turma2.Horario2
      );
    },
    docentesAreEqual(turma1, turma2) {
      if (turma1.Docente1 == turma2.Docente1 && turma1.Docente2 == turma2.Docente2) return true;
      if (turma1.Docente1 == turma2.Docente2 && turma1.Docente2 == turma2.Docente1) return true;
      return false;
    },
    horariosAreEqual(turma1, turma2) {
      if (
        (turma1.Horario1 == turma2.Horario1 && turma1.Horario2 == turma2.Horario2) ||
        (turma1.Horario1 == turma2.Horario2 && turma1.Horario2 == turma2.Horario1)
      )
        return true;
      if (
        turma1.Horario1 == null &&
        (turma1.Horario2 == turma2.Horario1 || turma1.Horario2 == turma2.Horario2)
      )
        return true;
      if (
        turma2.Horario1 == null &&
        (turma2.Horario2 == turma1.Horario1 || turma2.Horario2 == turma1.Horario2)
      )
        return true;
      if (
        turma1.Horario2 == null &&
        (turma1.Horario1 == turma2.Horario1 || turma1.Horario1 == turma2.Horario2)
      )
        return true;
      if (
        turma2.Horario2 == null &&
        (turma2.Horario1 == turma1.Horario1 || turma2.Horario1 == turma1.Horario2)
      )
        return true;

      return false;
    },
  },

  computed: {
    ...mapGetters(["AllCursos", "AllTurmas", "PeriodosLetivos", "Pedidos", "DisciplinasGrades"]),

    turmasConflitosOrdered() {
      const { order, type } = this.ordenacaoConflitos;
      return orderBy(this.turmasConflitos, order, type);
    },
    disciplinasGradeDCC1Periodo() {
      const disciplinasGradeFiltered = this.DisciplinasGrades.filter(
        (disciplinaGrade) => disciplinaGrade.periodo === 1
      );

      const disciplinasGradeUnique = [];
      disciplinasGradeFiltered.forEach((disciplinaGrade) => {
        const alredyExist = disciplinasGradeUnique.find(
          (disciplinaGrade2) => disciplinaGrade2.Disciplina === disciplinaGrade.Disciplina
        );

        if (!alredyExist) disciplinasGradeUnique.push({ ...disciplinaGrade });
      });

      return disciplinasGradeUnique;
    },
  },
};
</script>
