<template>
    <div class="main-component row">
        <PageHeader :title="'Buscar Turmas DCC'">
            <BaseButton template="filtros" @click="toggleAsideModal('filtros')"/>
            <BaseButton template="ajuda"  />
        </PageHeader>
        <div class="div-table">
            <BaseTable>
                <template #thead>
                    <v-th width="100">Plano</v-th>
                    <v-th width="55" title="Período letivo">P.</v-th>
                    <v-th width="80">Perfil</v-th>
                    <v-th width="80">Código</v-th>
                    <v-th width="330">Disciplina</v-th>
                    <v-th width="45" title="Turma">T.</v-th>
                    <v-th width="200">Docente</v-th>
                    <v-th width="80">Turno</v-th>
                    <v-th width="120">Horário</v-th>
                    <v-th width="95">Sala</v-th>
                </template>
                <template #tbody>
                    <tr v-for="turma in TurmasRetornadas" :key="'turma' + turma.id" :style="{backgroundColor: perfil(turma.Disciplina).cor}">
                        <v-td width="100">
                            {{plano(turma.Plano)}}
                        </v-td>
                        <v-td width="55">
                            {{turma.periodo}}
                        </v-td>
                        <v-td width="80">
                            {{perfil(turma.Disciplina).abreviacao}}
                        </v-td>
                        <v-td width="80">
                            {{disciplina(turma.Disciplina).codigo}}
                        </v-td>
                        <v-td width="330">
                            {{disciplina(turma.Disciplina).nome}}
                        </v-td>
                        <v-td width="45">
                            {{turma.letra}}
                        </v-td>
                        <v-td width="200">
                            {{docentes(turma)}}
                        </v-td>
                        <v-td width="80">
                            {{turma.turno1}}
                        </v-td>
                        <v-td width="120">
                            {{horarios(turma)}}
                        </v-td>
                        <v-td width="95">
                            {{salas(turma)}}
                        </v-td>

                    </tr>
                </template>
            </BaseTable>
        </div>

        <ModalFiltros
                ref="modalFiltros"
                :callbacks="modalFiltrosCallbacks"
                :tabsOptions="modalFiltrosTabs"
        >
            <BaseTable
                    type="modal"
                    v-show="modalFiltrosTabs.current === 'Disciplinas'"
            >
                <template #thead>
                    <th style="width:25px"></th>
                    <v-th width="70">Código</v-th>
                    <v-th width="270">Nome</v-th>
                </template>
                <template #tbody>
                    <tr
                            v-for="disciplina in AllDisciplinas"
                            :key="disciplina.id + disciplina.nome"
                    >
                        <td style="width: 25px">
                            <input
                                    type="checkbox"
                                    class="form-check-input position-static m-0"
                                    v-model="searchConditions.Disciplinas"
                                    :value="disciplina.id"
                            />
                        </td>
                        <td style="width: 70px" class="t-start">{{ disciplina.codigo }}</td>
                        <td class="t-start" style="width: 270px" :title="disciplina.nome">
                            {{ disciplina.nome }}
                        </td>
                    </tr>
                    <tr v-if="AllDisciplinas.length === 0">
                        <td colspan="3" style="width:450px">
                            NENHUMA DISCIPLINA ENCONTRADA.
                        </td>
                    </tr>
                </template>
            </BaseTable>

            <BaseTable
                    type="modal"
                    v-show="modalFiltrosTabs.current === 'Docentes'"
            >
                <template #thead>
                    <th style="width:25px"></th>
                    <v-th width="70">Apelido</v-th>
                    <v-th width="270">Nome</v-th>
                </template>
                <template #tbody>
                    <tr
                            v-for="docente in AllDocentes"
                            :key="docente.id + docente.nome"
                    >
                        <td style="width: 25px">
                            <input
                                    type="checkbox"
                                    class="form-check-input position-static m-0"
                                    v-model="searchConditions.Docentes"
                                    :value="docente.id"
                            />
                        </td>
                        <td style="width: 70px" class="t-start">{{ docente.apelido }}</td>
                        <td class="t-start" style="width: 270px" :title="docente.nome">
                            {{ docente.nome }}
                        </td>
                    </tr>
                    <tr v-if="AllDocentes.length === 0">
                        <td colspan="3" style="width:450px">
                            NENHUM DOCENTE ENCONTRADO.
                        </td>
                    </tr>
                </template>
            </BaseTable>

            <BaseTable
                    type="modal"
                    v-show="modalFiltrosTabs.current === 'Horários'"
            >
                <template #thead>
                    <th style="width:25px"></th>
                    <v-th width="70">Horário</v-th>
                </template>
                <template #tbody>
                    <tr
                            v-for="horario in AllHorarios"
                            :key="horario.id + horario.horario"
                    >
                        <td style="width: 25px">
                            <input
                                    type="checkbox"
                                    class="form-check-input position-static m-0"
                                    v-model="searchConditions.Horarios"
                                    :value="horario.id"
                            />
                        </td>
                        <td style="width: 70px" class="t-start">{{ horario.horario }}</td>
                    </tr>
                    <tr v-if="AllHorarios.length === 0">
                        <td colspan="3" style="width:450px">
                            NENHUM HORÁRIO ENCONTRADO.
                        </td>
                    </tr>
                </template>
            </BaseTable>

            <BaseTable
                    type="modal"
                    v-show="modalFiltrosTabs.current === 'Salas'"
            >
                <template #thead>
                    <th style="width:25px"></th>
                    <v-th width="70">Nome</v-th>
                </template>
                <template #tbody>
                    <tr
                            v-for="sala in AllSalas"
                            :key="sala.id + sala.nome"
                    >
                        <td style="width: 25px">
                            <input
                                    type="checkbox"
                                    class="form-check-input position-static m-0"
                                    v-model="searchConditions.Salas"
                                    :value="sala.id"
                            />
                        </td>
                        <td style="width: 70px" class="t-start">{{ sala.nome }}</td>
                    </tr>
                    <tr v-if="AllSalas.length === 0">
                        <td colspan="3" style="width:450px">
                            NENHUMA SALA ENCONTRADA.
                        </td>
                    </tr>
                </template>
            </BaseTable>

            <BaseTable
                    type="modal"
                    v-show="modalFiltrosTabs.current === 'Planos'"
            >
                <template #thead>
                    <th style="width:25px"></th>
                    <v-th width="70">Ano</v-th>
                    <v-th width="270">Nome</v-th>
                </template>
                <template #tbody>
                    <tr
                            v-for="plano in AllPlanos"
                            :key="plano.id + plano.ano + plano.nome"
                    >
                        <td style="width: 25px">
                            <input
                                    type="checkbox"
                                    class="form-check-input position-static m-0"
                                    v-model="searchConditions.Planos"
                                    :value="plano.id"
                            />
                        </td>
                        <td style="width: 70px" class="t-start">{{ plano.ano }}</td>
                        <td class="t-start" style="width: 270px" :title="plano.nome">
                            {{ plano.nome }}
                        </td>
                    </tr>
                    <tr v-if="AllPlanos.length === 0">
                        <td colspan="3" style="width:450px">
                            NENHUM PLANO ENCONTRADO.
                        </td>
                    </tr>
                </template>
            </BaseTable>

        </ModalFiltros>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import { normalizeText, generateEmptyTurma } from "@/common/utils";
    import {
        toggleItemInArray,
        toggleAsideModal,
        cursoPopoverContent,
        conectaFiltrosSemestresEPeriodos,
    } from "@/common/mixins";
    import { InputSearch } from "@/components/ui";
    import {
        ModalDelete,
        ModalFiltros,
        ModalEditTurma,
        ModalAjuda,
    } from "@/components/modals";

    import turmaService from "@/common/services/turma"

    export default {
        name: "RelatoriosBuscaTurmas",
        mixins: [
            toggleItemInArray,
            toggleAsideModal,
            cursoPopoverContent,
            conectaFiltrosSemestresEPeriodos,
        ],
        components: {
            ModalAjuda,
            ModalFiltros,
            ModalDelete,
            ModalEditTurma,
            InputSearch,
        },
        data() {
            return {
                asideModalsRefs: ["modalFiltros"],
                turmaClicked: generateEmptyTurma(),
                searchCursosModal: "",
                searchDisciplinasModal: "",

                searchConditions: {
                    Planos: [],
                    Disciplinas: [],
                    Docentes: [],
                    Horarios: [],
                    Salas: []
                },

                modalFiltrosTabs: {
                    current: "Disciplinas",
                    array: ["Disciplinas", "Docentes", "Horários", "Salas", "Planos"],
                },

                modalFiltrosCallbacks: {
                    selectAll: {
                        Disciplinas: () => {
                            this.searchConditions.Disciplinas = [...this.$_.map(this.AllDisciplinas, function(d){
                                return d.id
                            })];
                        },
                        Docentes: () => {
                            this.searchConditions.Docentes = [...this.$_.map(this.AllDocentes, function(d){
                                return d.id
                            })];
                        },
                        Horarios: () => {
                            this.searchConditions.Horarios = [...this.$_.map(this.AllHorarios, function(d){
                                return d.id
                            })];
                        },
                        Salas: () => {
                            this.searchConditions.Salas = [...this.$_.map(this.AllSalas, function(d){
                                return d.id
                            })];
                        },
                        Planos: () => {
                            this.searchConditions.Planos = [...this.$_.map(this.AllPlanos, function(d){
                                return d.id
                            })];
                        },
                    },
                    selectNone: {
                        Disciplinas: () => {
                            this.searchConditions.Disciplinas = [];
                        },
                        Docentes: () => {
                            this.searchConditions.Docentes = [];
                        },
                        Horarios: () => {
                            this.searchConditions.Horarios = [];
                        },
                        Salas: () => {
                            this.searchConditions.Salas = [];
                        },
                        Planos: () => {
                            this.searchConditions.Planos = [];
                        },
                    },
                    btnOk: () => {
                       this.search()
                    },
                },
                ordenacaoModal: {
                    cursos: { order: "codigo", type: "asc" },
                    disciplinas: { order: "codigo", type: "asc" },
                    perfis: { order: "nome", type: "asc" },
                },
                ordenacaoMain: {
                    turmas: { order: "disciplina.codigo", type: "asc" },
                    perfis: { order: "disciplina.perfil.abreviacao", type: "asc" },
                },

                orderByPreferencia: true,

                TurmasRetornadas: undefined
            };
        },

        methods: {

            selectCursosDCC() {
                this.filtroCursos.selecionados = [...this.CursosDCC];
            },

            search() {
                turmaService.search(this.searchConditions).then((turmas) => {this.TurmasRetornadas = turmas.Turmas; console.log(this.TurmasRetornadas)}).catch((error) => console.log(error))
            },

            test() {
                this.searchConditions.Docentes = [10, 40]
                this.search()
            },

            perfil(disciplina) {
                let d = this.$_.find(this.AllDisciplinas, {id: disciplina})
                let p = this.$_.find(this.PerfisDCC, {id:d.Perfil})
                return p
            },

            plano(p) {
                let plano = this.$_.find(this.$store.state.plano.Plano, {id: p})
                return `${plano.ano} - ${plano.nome}`
            },

            disciplina(d) {
              let disciplina = this.$_.find(this.AllDisciplinas, {id: d})
              return disciplina
            },

            docentes(turma) {
              let doce1 = this.$_.find(this.AllDocentes, {id: turma.Docente1})
              let doce2 = this.$_.find(this.AllDocentes, {id: turma.Docente2})
              if(doce1){
                  if(doce2){
                      return `${doce1.apelido} - ${doce2.apelido}`
                  } else {
                      return `${doce1.apelido}`
                  }
              } else {
                  if(doce2){
                      return `${doce2.apelido}`
                  }else{
                      return ``
                  }
              }

            },

            horarios(turma) {
                let horario1 = this.$_.find(this.AllHorarios, {id: turma.Horario1})
                let horario2 = this.$_.find(this.AllHorarios, {id: turma.Horario2})
                if(horario1){
                    if(horario2){
                        return `${horario1.horario} - ${horario2.horario}`
                    } else {
                        return `${horario1.horario}`
                    }
                } else {
                    if(horario2){
                        return `${horario2.horario}`
                    }else{
                        return ``
                    }
                }
            },

            salas(turma) {
                let sala1 = this.$_.find(this.AllSalas, {id: turma.Sala1})
                let sala2 = this.$_.find(this.AllSalas, {id: turma.Sala2})
                if(sala1){
                    if(sala2){
                        return `${sala1.nome} - ${sala2.nome}`
                    } else {
                        return `${sala1.nome}`
                    }
                } else {
                    if(sala2){
                        return `${sala2.nome}`
                    }else{
                        return ``
                    }
                }
            }
        },

        computed: {
            ...mapGetters([
                "PerfisDCC",
                "AllDisciplinas",
                "AllPlanos",
                "AllDocentes",
                "AllHorarios",
                "AllSalas"
            ]),

            AllPlanos() {
                return this.$store.state.plano.Plano
            },

            TurmasOrdered() {
                const { turmas, perfis } = this.ordenacaoMain;

                //Se não possui ordenação de perfil fixada
                if (this.ordenacaoMain.perfis.order === null) {
                    return this.$_.orderBy(
                        this.TurmasFiltredByDisciplinas,
                        ["periodo", turmas.order],
                        ["asc", turmas.type]
                    );
                } else
                    return this.$_.orderBy(
                        this.TurmasFiltredByDisciplinas,
                        ["periodo", perfis.order, turmas.order],
                        ["asc", perfis.type, turmas.type]
                    );
            },
            TurmasFiltredByDisciplinas() {
                return this.$_.filter(this.TurmasFiltredByPeriodos, (turma) =>
                    this.$_.some(
                        this.filtroDisciplinas.ativadas,
                        (disciplinaId) => disciplinaId === turma.Disciplina
                    )
                );
            },
            TurmasFiltredByPeriodos() {
                return this.$_.filter(this.TurmasRetornadas, (turma) =>
                    this.$_.some(this.filtroPeriodos.ativados, ["id", turma.periodo])
                );
            },
            // tables modal
            PerfisOrderedModal() {
                return this.$_.orderBy(
                    this.PerfisDCC,
                    this.ordenacaoModal.perfis.order,
                    this.ordenacaoModal.perfis.type
                );
            },
            DisciplinasDCCOrderedModal() {
                return this.$_.orderBy(
                    this.DisciplinasDCCFiltredModal,
                    this.ordenacaoModal.disciplinas.order,
                    this.ordenacaoModal.disciplinas.type
                );
            },
            DisciplinasDCCFiltredModal() {
                if (this.searchDisciplinasModal === "") return this.DisciplinasDCCInPerfis;

                const searchNormalized = normalizeText(this.searchDisciplinasModal);

                return this.$_.filter(this.DisciplinasDCCInPerfis, (disciplina) => {
                    const disciplinaNome = normalizeText(disciplina.nome);
                    const disciplinaCodigo = normalizeText(disciplina.codigo);

                    return (
                        disciplinaNome.match(searchNormalized) ||
                        disciplinaCodigo.match(searchNormalized)
                    );
                });
            },
            CursosOrderedModal() {
                return this.$_.orderBy(
                    this.CursosFiltredModal,
                    this.ordenacaoModal.cursos.order,
                    this.ordenacaoModal.cursos.type
                );
            },
            CursosFiltredModal() {
                let cursosResultantes = this.AllCursos;

                if (this.searchCursosModal !== "") {
                    const searchNormalized = normalizeText(this.searchCursosModal);

                    cursosResultantes = this.$_.filter(cursosResultantes, (curso) => {
                        const cursoNome = normalizeText(curso.nome);
                        const cursoCodigo = normalizeText(curso.codigo);

                        return (
                            cursoNome.match(searchNormalized) || cursoCodigo.match(searchNormalized)
                        );
                    });
                }
                return cursosResultantes;
            },
        },

        watch: {
            filtroPerfis: {
                handler(filtroPerfis) {
                    const disciplinasResultantes = [];

                    this.DisciplinasDCCInPerfis.forEach((disciplina) => {
                        const perfilFounded = this.$_.some(
                            filtroPerfis.selecionados,
                            (perfil) => perfil.id === disciplina.Perfil
                        );

                        if (perfilFounded) disciplinasResultantes.push(disciplina.id);
                    });

                    this.filtroDisciplinas.selecionados = [...disciplinasResultantes];
                },
                deep: true,
            },
        },
    };
</script>

<style scoped>
    .curso-codigo-big {
        font-size: 7px !important;
    }
</style>
