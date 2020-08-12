<template>
  <div class="main-component row p-0">
    <PageHeader :title="'Carga Professores'">
      <BaseButton title="Filtros" :type="'icon'" :color="'gray'" @click="openAsideModal('filtros')">
        <font-awesome-icon :icon="['fas','list-ul']" />
      </BaseButton>

      <BaseButton
        title="Relatório"
        :type="'icon'"
        :color="'gray'"
        @click="$refs.modalRelatorio.toggle()"
      >
        <font-awesome-icon :icon="['fas','file-alt']" />
      </BaseButton>

      <BaseButton
        title="Ajuda"
        :type="'icon'"
        :color="'lightblue'"
        @click="openAsideModal('ajuda')"
      >
        <font-awesome-icon :icon="['fas','question']" />
      </BaseButton>
    </PageHeader>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <th
            @click="toggleOrder(orednacaoDocentesMain, 'apelido')"
            style="width: 130px"
            class="clickable t-start"
          >
            Nome
            <i :class="setIconByOrder(orednacaoDocentesMain, 'apelido')"></i>
          </th>
          <th style="width: 25px" title="Semestre">S.</th>
          <th style="width: 80px" class="t-center">Código</th>
          <th style="width: 300px" class="t-start">Disciplina</th>
          <th style="width: 35px" title="Turma">T.</th>
          <th style="width: 180px">Horário</th>
          <th style="width: 35px" title="Somatório dos créditos no 1º semestre">CS1</th>
          <th style="width: 35px" title="Somatório dos créditos no 2º semestre">CS2</th>
          <th style="width: 50px" title="Somatório total dos créditos">CTotal</th>
        </template>
        <template #tbody>
          <template v-for="docente in DocentesOrderedMain">
            <tr class="bg-custom" :key="'docentes' + docente.apelido">
              <td style="width: 130px" class="t-start">{{ docente.apelido }}</td>
              <td style="width: 25px"></td>
              <td style="width: 80px"></td>
              <td style="width: 300px" class="t-start"></td>
              <td style="width: 25px"></td>
              <td style="width: 180px"></td>
              <td style="width: 35px">{{ docente.cred1 }}</td>
              <td style="width: 35px">{{ docente.cred2 }}</td>
              <td style="width: 50px">{{ docente.cred1 + docente.cred2 }}</td>
            </tr>

            <tr
              v-for="turma in docente.turmas1Semestre"
              :key="'1turmas' + turma.id + docente.apelido"
            >
              <td style="width: 130px"></td>
              <td style="width: 25px">{{ turma.periodo }}</td>
              <td style="width: 80px" class="t-center">{{ turma.disciplinaCodigo }}</td>
              <td style="width: 300px" class="t-start">{{ turma.disciplinaNome }}</td>
              <td style="width: 35px">{{ turma.letra }}</td>
              <td style="width: 180px">
                <span v-for="horario in AllHorarios" :key="horario.id">
                  {{ horario.id === turma.Horario1 ? horario.horario : "" }}
                  {{
                  horario.id === turma.Horario2 ? " / " + horario.horario : ""
                  }}
                </span>
              </td>

              <td style="width: 35px">
                <span v-if="turma.periodo === 1">
                  {{
                  turma.Docente1 > 0 && turma.Docente2 > 0
                  ? (turma.disciplinaCargaTeorica +
                  turma.disciplinaCargaPratica) /
                  2
                  : turma.disciplinaCargaTeorica +
                  turma.disciplinaCargaPratica
                  }}
                </span>
              </td>

              <td style="width:35px">
                <span v-if="turma.periodo === 3">
                  {{
                  turma.Docente1 > 0 && turma.Docente2 > 0
                  ? (turma.disciplinaCargaTeorica +
                  turma.disciplinaCargaPratica) /
                  2
                  : turma.disciplinaCargaTeorica +
                  turma.disciplinaCargaPratica
                  }}
                </span>
              </td>

              <td style="width: 50px"></td>
            </tr>

            <tr
              v-for="carga in docente.cargasPos1Semestre"
              :key="'1cargaPos' + carga.id + docente.id"
            >
              <td style="width: 130px"></td>
              <td style="width: 25px">{{ carga.trimestre }}</td>
              <td style="width: 80px"></td>
              <td
                style="width: 300px"
                class="t-start toUpperCase"
              >Disciplina do {{ carga.programa }}</td>
              <td style="width: 35px"></td>
              <td style="width: 180px"></td>

              <td style="width: 35px">
                {{
                carga.trimestre == 1 || carga.trimestre == 2
                ? carga.creditos
                : ""
                }}
              </td>

              <td style="width: 35px">
                {{
                carga.trimestre == 3 || carga.trimestre == 4
                ? carga.creditos
                : ""
                }}
              </td>

              <td style="width: 50px"></td>
            </tr>

            <tr
              v-for="turma in docente.turmas2Semestre"
              :key="'2turmas' + turma.id + docente.apelido"
            >
              <td style="width: 130px"></td>
              <td style="width: 25px">{{ turma.periodo }}</td>
              <td style="width: 80px" class="t-center">{{ turma.disciplinaCodigo }}</td>
              <td style="width: 300px" class="t-start">{{ turma.disciplinaNome }}</td>
              <td style="width: 35px">{{ turma.letra }}</td>
              <td style="width: 180px">
                <span v-for="horario in AllHorarios" :key="horario.id">
                  {{ horario.id === turma.Horario1 ? horario.horario : "" }}
                  {{
                  horario.id === turma.Horario2 ? " / " + horario.horario : ""
                  }}
                </span>
              </td>

              <td style="width: 35px">
                <span v-if="turma.periodo === 1">
                  {{
                  turma.Docente1 > 0 && turma.Docente2 > 0
                  ? (turma.disciplinaCargaTeorica +
                  turma.disciplinaCargaPratica) /
                  2
                  : turma.disciplinaCargaTeorica +
                  turma.disciplinaCargaPratica
                  }}
                </span>
              </td>

              <td style="width:35px">
                <span v-if="turma.periodo === 3">
                  {{
                  turma.Docente1 > 0 && turma.Docente2 > 0
                  ? (turma.disciplinaCargaTeorica +
                  turma.disciplinaCargaPratica) /
                  2
                  : turma.disciplinaCargaTeorica +
                  turma.disciplinaCargaPratica
                  }}
                </span>
              </td>

              <td style="width: 50px"></td>
            </tr>

            <tr
              v-for="carga in docente.cargasPos2Semestre"
              :key="'2cargaPos' + carga.id + docente.id"
            >
              <td style="width: 130px"></td>
              <td style="width: 25px">{{ carga.trimestre }}</td>
              <td style="width: 80px"></td>
              <td
                style="width: 300px"
                class="t-start toUpperCase"
              >Disciplina do {{ carga.programa }}</td>
              <td style="width: 35px"></td>
              <td style="width: 180px"></td>

              <td style="width: 32px">
                {{
                carga.trimestre == 1 || carga.trimestre == 2
                ? carga.creditos
                : ""
                }}
              </td>

              <td style="width: 35px">
                {{
                carga.trimestre == 3 || carga.trimestre == 4
                ? carga.creditos
                : ""
                }}
              </td>

              <td style="width: 50px"></td>
            </tr>
          </template>

          <template
            v-if="
              turmasSemAlocacao().length && filtroDocenteSemAlocacao.ativado
            "
          >
            <tr class="bg-custom">
              <td style="width: 130px" class="t-start">SEM ALOCAÇÃO</td>
              <td style="width: 25px"></td>
              <td style="width: 80px"></td>
              <td style="width: 300px"></td>
              <td style="width: 35px"></td>
              <td style="width: 180px"></td>
              <td style="width: 35px"></td>
              <td style="width: 35px"></td>
              <td style="width: 50px"></td>
            </tr>
            <tr v-for="turma in turmasSemAlocacao()" :key="'semAlocacao' + turma.id">
              <td style="width: 130px"></td>
              <td style="width: 25px">{{ turma.periodo }}</td>
              <td style="width: 80px">{{ turma.disciplinaCodigo }}</td>
              <td style="width: 300px" class="t-start">{{ turma.disciplinaNome }}</td>
              <td style="width: 35px">{{ turma.letra }}</td>
              <td style="width:180px">
                <span v-for="horario in AllHorarios" :key="horario.id">
                  {{ horario.id === turma.Horario1 ? horario.horario : "" }}
                  {{
                  horario.id === turma.Horario2 ? " / " + horario.horario : ""
                  }}
                </span>
              </td>

              <td style="width: 35px">
                <span v-if="turma.periodo === 1">
                  {{
                  turma.Docente1 > 0 && turma.Docente2 > 0
                  ? (turma.disciplinaCargaTeorica +
                  turma.disciplinaCargaPratica) /
                  2
                  : turma.disciplinaCargaTeorica +
                  turma.disciplinaCargaPratica
                  }}
                </span>
              </td>

              <td style="width: 35px">
                <span v-if="turma.periodo === 3">
                  {{
                  turma.Docente1 > 0 && turma.Docente2 > 0
                  ? (turma.disciplinaCargaTeorica +
                  turma.disciplinaCargaPratica) /
                  2
                  : turma.disciplinaCargaTeorica +
                  turma.disciplinaCargaPratica
                  }}
                </span>
              </td>

              <td style="width: 50px"></td>
            </tr>
          </template>

          <tr
            v-show="
              !filtroDocenteSemAlocacao.ativado && !DocentesOrderedMain.length
            "
          >
            <td colspan="9" style="width:870px">
              <b>Nenhum docente encontrado.</b> Clique no botão de filtros
              <i class="fas fa-list-ul mx-1"></i> para selecioná-los.
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <ModalFiltros
      ref="modalFiltros"
      :callbacks="modalFiltrosCallbacks"
      :tabsOptions="modalFiltrosTabs"
    >
      <div class="div-table">
        <BaseTable
          v-show="modalFiltrosTabs.current === 'Docentes'"
          :type="'modal'"
          :hasSearchBar="true"
        >
          <template #thead-search>
            <InputSearch v-model="searchDocentes" placeholder="Pesquise o nome de um docente..." />
          </template>
          <template #thead>
            <th style="width: 25px"></th>
            <th
              class="clickable t-start"
              style="width: 425px"
              @click="toggleOrder(ordenacaoDocentesModal, 'apelido')"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoDocentesModal, 'apelido')"></i>
            </th>
          </template>
          <template #tbody>
            <tr
              v-for="docente in DocentesOrderedModal"
              :key="'docenteModal' + docente.id"
              @click="toggleItemInArray(docente, filtroDocentes.selecionados)"
            >
              <td style="width: 25px;">
                <input
                  type="checkbox"
                  v-model="filtroDocentes.selecionados"
                  :value="docente"
                  class="form-check-input position-static m-0"
                />
              </td>
              <td style="width: 425px;" class="t-start">{{ docente.apelido }}</td>
            </tr>
            <tr
              @click="
                filtroDocenteSemAlocacao.selecionado = !filtroDocenteSemAlocacao.selecionado
              "
            >
              <td style="width: 25px;">
                <input
                  type="checkbox"
                  v-model="filtroDocenteSemAlocacao.selecionado"
                  class="form-check-input position-static m-0"
                />
              </td>
              <td style="width: 425px;" class="t-start">SEM ALOCAÇÃO</td>
            </tr>
          </template>
        </BaseTable>
      </div>
    </ModalFiltros>

    <ModalRelatorio ref="modalRelatorio" @selection-option="pdf($event)" />

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Para exibir conteúdo na tabela:</b> Clique no ícone filtros
        <i class="fas fa-list-ul icon-gray"></i> no cabeçalho da página e na
        janela que será aberta utilize as abas para navegar entre os tipos de
        filtros. Marque em suas respectivas tabelas quais informações deseja
        visualizar, e para finalizar clique no botão OK.
      </li>
      <li class="list-group-item">
        <b>Para gerar relatório dos docentes:</b> Clique no ícone relatório
        <i class="fas fa-file-alt icon-gray"></i>, selecione se deseja gerar o
        relatório completo com todos os docentes, ou apenas o relatório parcial
        com os docentes que estão selecionados no momento.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import pdfs from "@/common/services/pdfs";
import { normalizeText } from "@/common/utils";
import { toggleOrdination, toggleItemInArray } from "@/common/mixins";
import { InputSearch } from "@/components/ui";
import { ModalAjuda, ModalRelatorio, ModalFiltros } from "@/components/modals";
import { mapGetters } from "vuex";

export default {
  name: "DashboardCargaProfessores",
  mixins: [toggleOrdination, toggleItemInArray],
  components: {
    ModalRelatorio,
    ModalAjuda,
    ModalFiltros,
    InputSearch,
  },
  data() {
    return {
      searchDocentes: "",
      orednacaoDocentesMain: { order: "apelido", type: "asc" },
      ordenacaoDocentesModal: { order: "apelido", type: "asc" },
      filtroDocentes: {
        ativados: [],
        selecionados: [],
      },
      modalFiltrosTabs: {
        current: "Docentes",
        array: ["Docentes"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Docentes: () => {
            this.filtroDocentes.selecionados = [...this.DocentesAtivos];
            this.filtroDocenteSemAlocacao.selecionado = true;
          },
        },
        selectNone: {
          Docentes: () => {
            this.filtroDocentes.selecionados.length = 0;
            this.filtroDocenteSemAlocacao.selecionado = false;
          },
        },
        btnOk: () => {
          this.filtroDocentes.ativados = [...this.filtroDocentes.selecionados];
          this.filtroDocenteSemAlocacao.ativado = this.filtroDocenteSemAlocacao.selecionado;
        },
      },
      filtroDocenteSemAlocacao: {
        ativado: true,
        selecionado: true,
      },
    };
  },

  beforeMount() {
    this.activeAllFiltros();
  },

  methods: {
    openAsideModal(modalName) {
      if (modalName === "filtros") {
        this.$refs.modalFiltros.toggle();
        this.$refs.modalAjuda.close();
      } else if (modalName === "ajuda") {
        this.$refs.modalAjuda.toggle();
        this.$refs.modalFiltros.close();
      }
    },
    activeAllFiltros() {
      this.modalFiltrosCallbacks.selectAll.Docentes();
      this.filtroDocentes.ativados = [...this.filtroDocentes.selecionados];
      this.filtroDocenteSemAlocacao.ativado = this.filtroDocenteSemAlocacao.selecionado;
    },

    pdf(completo) {
      if (completo)
        pdfs.pdfCargaProfessores({
          Docentes: this.filtroDocentes.ativados,
          SemAlocacao: this.filtroDocenteSemAlocacao.ativado,
        });
      else
        pdfs.pdfCargaProfessores({
          Docentes: this.DocentesInCreditos,
          SemAlocacao: true,
        });
    },
    turmaInDocentes(docente) {
      const turmasResultantes = [];

      this.$_.forEach(this.AllTurmas, (turma) => {
        if (turma.Docente1 === docente.id || turma.Docente2 === docente.id) {
          const DisciplinaFounded = this.$_.find(
            this.DisciplinasDCC,
            (disciplina) => disciplina.id === turma.Disciplina
          );

          if (DisciplinaFounded) {
            turmasResultantes.push({
              ...turma,
              disciplinaNome: DisciplinaFounded.nome,
              disciplinaCodigo: DisciplinaFounded.codigo,
              disciplinaCargaTeorica: DisciplinaFounded.cargaTeorica,
              disciplinaCargaPratica: DisciplinaFounded.cargaPratica,
            });
          }
        }
      });

      return this.$_.orderBy(turmasResultantes, ["Disciplina", "letra"]);
    },
    turmasInDocentes1Semestre(docente) {
      return this.$_.filter(
        this.turmaInDocentes(docente),
        (turma) => turma.periodo == 1 || turma.periodo == 2
      );
    },
    turmasInDocentes2Semestre(docente) {
      return this.$_.filter(
        this.turmaInDocentes(docente),
        (turma) => turma.periodo == 3 || turma.periodo == 4
      );
    },
    turmasSemAlocacao() {
      const turmasResultantes = [];

      this.$_.forEach(this.AllTurmas, (turma) => {
        if (
          turma.Docente1 == null &&
          turma.Docente2 == null &&
          turma.Disciplina != null
        ) {
          const disciplinaFounded = this.$_.find(
            this.DisciplinasDCC,
            (disciplina) => turma.Disciplina === disciplina.id
          );

          if (disciplinaFounded)
            turmasResultantes.push({
              ...turma,
              disciplinaNome: disciplinaFounded.nome,
              disciplinaCodigo: disciplinaFounded.codigo,
              disciplinaCargaTeorica: disciplinaFounded.cargaTeorica,
              disciplinaCargaPratica: disciplinaFounded.cargaPratica,
            });
        }
      });

      return this.$_.orderBy(turmasResultantes, [
        "periodo",
        "Disciplina",
        "letra",
      ]);
    },
    calculaCreditos(docente) {
      var creditosTotais = { periodo1: 0, periodo2: 0 };

      for (let t = 0; t < this.AllTurmas.length; t++) {
        if (
          this.AllTurmas[t].Docente1 === docente.id ||
          this.AllTurmas[t].Docente2 === docente.id
        ) {
          for (var d = 0; d < this.DisciplinasDCC.length; d++) {
            if (this.DisciplinasDCC[d].id === this.AllTurmas[t].Disciplina) {
              if (
                this.AllTurmas[t].Docente1 > 0 &&
                this.AllTurmas[t].Docente2 > 0
              ) {
                //PRIMEIRO PERIODO
                if (this.AllTurmas[t].periodo === 1) {
                  creditosTotais.periodo1 +=
                    parseFloat(this.DisciplinasDCC[d].cargaPratica) / 2;
                  creditosTotais.periodo1 +=
                    parseFloat(this.DisciplinasDCC[d].cargaTeorica) / 2;
                } else {
                  //SEGUNDO PERIODO
                  creditosTotais.periodo2 +=
                    parseFloat(this.DisciplinasDCC[d].cargaPratica) / 2;
                  creditosTotais.periodo2 +=
                    parseFloat(this.DisciplinasDCC[d].cargaTeorica) / 2;
                }
              } else {
                //PRIMEIRO PERIODO
                if (this.AllTurmas[t].periodo === 1) {
                  creditosTotais.periodo1 += parseFloat(
                    this.DisciplinasDCC[d].cargaPratica
                  );
                  creditosTotais.periodo1 += parseFloat(
                    this.DisciplinasDCC[d].cargaTeorica
                  );
                }
                //SEGUNDO PERIODO
                else {
                  creditosTotais.periodo2 += parseFloat(
                    this.DisciplinasDCC[d].cargaPratica
                  );
                  creditosTotais.periodo2 += parseFloat(
                    this.DisciplinasDCC[d].cargaTeorica
                  );
                }
              }
            }
          }
        }
      }
      for (let t = 0; t < this.CargasPos.length; t++) {
        if (this.CargasPos[t].Docente === docente.id) {
          if (this.CargasPos[t].trimestre == 3) {
            creditosTotais.periodo2 += parseFloat(this.CargasPos[t].creditos);
          } else {
            creditosTotais.periodo1 += parseFloat(this.CargasPos[t].creditos);
          }
        }
      }
      return creditosTotais;
    },
    CargasPosFiltred(docenteId) {
      return this.$_.filter(this.CargasPos(docenteId), function (carga) {
        return carga.trimestre == 1 || carga.trimestre == 2;
      });
    },
    getCargasPosDocente(docenteId, trimestres) {
      return this.$_.filter(
        this.CargasPos,
        (carga) =>
          trimestres.indexOf(carga.trimestre) != -1 &&
          carga.Docente === docenteId
      );
    },
  },
  computed: {
    ...mapGetters([
      "DocentesAtivos",
      "AllTurmas",
      "DisciplinasDCC",
      "AllHorarios",
    ]),
    // table main
    DocentesOrderedMain() {
      return this.$_.orderBy(
        this.DocentesFiltredMain,
        this.orednacaoDocentesMain.order,
        this.orednacaoDocentesMain.type
      );
    },
    DocentesFiltredMain() {
      return this.$_.filter(this.DocentesInCreditos, (docente) => {
        const docenteFoundedIndex = this.$_.findIndex(
          this.filtroDocentes.ativados,
          (docenteAtivado) => docenteAtivado.id === docente.id
        );

        return docenteFoundedIndex !== -1;
      });
    },
    // tables modal
    DocentesOrderedModal() {
      return this.$_.orderBy(
        this.DocentesFiltredModal,
        this.ordenacaoDocentesModal.order,
        this.ordenacaoDocentesModal.type
      );
    },
    DocentesFiltredModal() {
      if (this.searchDocentes === "") return this.DocentesAtivos;

      const searchNormalized = normalizeText(this.searchDocentes);

      return this.DocentesAtivos.filter((docente) => {
        const docenteApelido = normalizeText(docente.apelido);

        return docenteApelido.match(searchNormalized);
      });
    },
    DocentesInCreditos() {
      return this.DocentesAtivos.map((docente) => {
        const creditos = this.calculaCreditos(docente);
        return {
          ...docente,
          cred1: creditos.periodo1,
          cred2: creditos.periodo2,
          turmas1Semestre: this.turmasInDocentes1Semestre(docente),
          turmas2Semestre: this.turmasInDocentes2Semestre(docente),
          cargasPos1Semestre: this.getCargasPosDocente(docente.id, [1, 2]),
          cargasPos2Semestre: this.getCargasPosDocente(docente.id, [3, 4]),
        };
      });
    },

    CargasPos() {
      return this.$_.orderBy(this.$store.state.cargaPos.Cargas, "trimestre");
    },
  },
};
</script>

<style scoped>
.toUpperCase {
  text-transform: uppercase;
}
.docente-tr {
  background-color: rgba(0, 0, 0, 0.089);
  color: black;
}
.list-relatorio .list-group-item:hover {
  text-decoration: underline;
  background-color: #ebebeb;
}
</style>
