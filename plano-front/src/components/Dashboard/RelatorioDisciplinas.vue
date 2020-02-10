<template>
    <div class="DashboardRelatorioDisciplinas row pr-2">
        <!-- Titulo -->
        <div
                class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
                style="height:38px;"
        >
            <div class="form-inline col-12 pl-0 mb-1 pr-1">
                <h1 class="titulo col-7 col-sm-5 col-md-4 col-xl-2">Relatório Disciplinas</h1>

                <div
                        class="form-group col-5 col-sm-7 col-md-8 col-xl-10 mb-0 pr-0"
                        style="justify-content: flex-end;"
                >
                    <button type="button" class="relatbtn" title="Relatório" v-on:click.prevent="pdf">
                        <i class="far fa-file-alt"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="w-100 mb-2 border-bottom"></div>

        <div class="divTable p-0" ref="carga">
            <table class="table table-hover border table-sm">
                <thead class="thead-light sticky">
                <tr>
                    <div
                            style="display: block; overflow: hidden; width: ‭845‬px; height:20px !important"
                            class="sticky"
                    >
                        <th scope="col">
                            <p class="p-header clickable-header" style="width: 80px;"
                               @click="toggleOrderCodigo()"
                               title="Clique para ordenar por código">Cod.
                                <i
                                        v-if="ordenacao=='codigo'"
                                        style="font-size:0.6rem; text-align:right"
                                        class="fas fa-arrow-down fa-sm"
                                ></i>
                            </p>
                        </th>
                        <th scope="col">
                            <p class="p-header clickable-header" style="width: 350px"
                               @click="toggleOrderNome()"
                               title="Clique para ordenar por nome">Nome
                                <i
                                    v-if="ordenacao=='nome'"
                                    style="font-size:0.6rem; text-align:right"
                                    class="fas fa-arrow-down fa-sm"
                                ></i>
                            </p>
                        </th>
                        <th scope="col">
                            <p class="p-header" style="width: 24px">S.</p>
                        </th>
                        <th scope="col">
                            <p class="p-header" style="width: 24px">T.</p>
                        </th>
                        <th scope="col">
                            <p class="p-header" style="width: 200px">Docentes</p>
                        </th>
                        <th scope="col">
                            <p class="p-header" style="width: 180px">Horário</p>
                        </th>
                    </div>
                </tr>
                </thead>
                <tbody>
                <template v-if="Disciplinas.length > 0">
                    <template v-for="disciplina in Disciplinas">
                        <template v-if="turmas(disciplina).length > 0">
                            <div class="linhas" style="width: ‭845‬px;" :key="disciplina.codigo">
                                <td class="disc-td">
                                    <div style="width: 80px">{{disciplina.codigo}}</div>
                                </td>
                                <td class="disc-td">
                                    <div style="width: 350px;">{{disciplina.nome}}</div>
                                </td>
                                <td class="disc-td">
                                    <div style="width: 428px; height: 20px;"></div>
                                </td>

                            </div>
                        </template>

                        <template v-for="turma in turmas(disciplina)">
                            <tr>
                                <template>
                                    <div class="linhas" style="width: ‭858px;">
                                        <td>
                                            <p style="width: 80px"></p>
                                        </td>
                                        <td>
                                            <p style="width: 350px"></p>
                                        </td>
                                        <td>
                                            <p style="width: 24px">{{turma.periodo}}</p>
                                        </td>
                                        <td>
                                            <p style="width: 24px">{{turma.letra}}</p>
                                        </td>
                                        <td>
                                            <p style="width: 200px;">{{docentes(turma)}}</p>
                                        </td>

                                        <td>
                                            <div style="width: 180px">
                                                <template v-for="horario in Horarios">
                                                    <p :key="horario.id" v-if="horario.id===turma.Horario1">
                                                        {{horario.horario}}
                                                        <template v-for="horario in Horarios">
                                <span
                                        :key="horario.id"
                                        v-if="horario.id===turma.Horario2"
                                >/ {{horario.horario}}</span>
                                                        </template>
                                                    </p>
                                                </template>
                                            </div>
                                        </td>
                                    </div>
                                </template>
                            </tr>
                        </template>

                    </template>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="2" class="text-center">
                            <i class="fas fa-exclamation-triangle"></i> Nenhuma Disciplina encontrado!
                        </td>
                    </tr>
                </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import _ from "lodash";
    import pdfs from "../../common/services/pdfs";
    export default {
        name: "DashboardRelatorioDisciplinas",

        data() {
            return {
                ordenacao:"codigo"
            }
        },

        methods: {
            pdf() {
                pdfs.pdfRelatorioDisciplinas()
            },

            toggleOrderNome() {
                this.ordenacao = "nome";
            },
            toggleOrderCodigo() {
                this.ordenacao = "codigo";
            },

            turmas(disciplina) {
                return _.orderBy(
                    _.filter(this.$store.state.turma.Turmas, turma => {
                        return (
                            turma.Disciplina === disciplina.id
                        );
                    }),
                    ['periodo', 'letra']
                );
            },

            docentes(turma) {
                let d1 = _.find(this.$store.state.docente.Docentes, {'id':turma.Docente1})
                let d2 = _.find(this.$store.state.docente.Docentes, {'id':turma.Docente2})
                if(d1 === undefined && d2 === undefined){
                    return ''
                }else if(d2 === undefined){
                    return `${d1.apelido}`
                }else if(d1 === undefined){
                    return `${d2.apelido}`
                }else {
                    return `${d1.apelido} / ${d2.apelido}`
                }
            }
        },

        computed: {
            Disciplinas() {
                return _.orderBy(this.$store.state.disciplina.Disciplinas, this.ordenacao);
            },
            Horarios() {
                return this.$store.state.horario.Horarios;
            },

        }
    };
</script>

<style scoped>
    /* prefixed */

    .DashboardRelatorioDisciplinas {
        max-width: 100%;
        overflow: hidden;
        margin: 0;
    }
    .p-header {
        padding: 0px 0 0px 0;
        margin: 0;
        font-size: 11px;
        text-align: center;
        height: 18px;
    }
    .divTable {
        overflow: hidden;
        height: -webkit-max-content;
        height: -moz-max-content;
        height: max-content;
        width: -webkit-max-content;
        width: -moz-max-content;
        width: max-content;
    }
    table {
        display: block;
        overflow-y: scroll;
        height: -webkit-calc(100vh - 100px);
        height: -moz-calc(100vh - 100px);
        height: calc(100vh - 100px);
        font-size: 11px;
        background-color: white;
        margin: 0;
    }
    tbody {
        max-height: 100%;
        width: 100%;
    }
    table td {
        text-align: center;
        vertical-align: middle;
        padding: 0 !important;
        border: none;
    }
    .linhas {
        border-top: 1px solid #dee2e6;
    }
    table p {
        margin-bottom: 0;
        text-align: center;
        padding-left: 2px;
        padding-right: 2px;
    }
    /* texto maiusculo */
    .toUpperCase {
        text-transform: uppercase;
    }
    tr thead {
        display: block;
    }
    thead th {
        padding: 0 !important;
        font-size: 14px;
        text-align: center;
        height: 18px !important;
    }
    table select {
        height: 15px !important;
        text-align: left;
    }
    table input {
        height: 18px !important;
        text-align: center !important;
    }
    .sticky {
        position: sticky;
        position: -webkit-sticky;
        top: 0;
    }
    .titulo {
        font-size: 25px;
        font-weight: normal;
        padding-left: 0;
        margin: 0 !important;
    }
    /* Botoes */
    button {
        padding: 0;
        border: none;
        background: none;
        height: -webkit-max-content;
        height: -moz-max-content;
        height: max-content;
        margin-right: 15px;
        margin-top: 5px;
        margin-bottom: 0px;
        transition: all 0.3s ease 0s;
        cursor: pointer;
    }
    i.fas,
    i.far {
        font-size: 25px;
    }
    .relatbtn {
        background-color: white;
        color: #9ab3ff !important;
    }

    .relatbtn:hover {
        color: #82a0ff !important;
    }

    .relatbtn:focus {
        color: #82a0ff;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: #698dff;
    }

    /* APENAS NO FIREFOX */
    @-moz-document url-prefix() {
        select {
            height: 15px !important;
            text-align: left;
            -moz-box-sizing: border-box;
            box-sizing: border-box;

            line-height: 8px;
            border: 0.5px solid rgb(133, 133, 133);
            -moz-border-radius: 2px;
            border-radius: 2px;
            background-color: rgb(245, 245, 245);
        }
        input {
            height: 18px !important;
            text-align: center;
            -moz-box-sizing: border-box;
            box-sizing: border-box;

            line-height: 8px;
            border: 0.5px solid rgb(92, 92, 92);
            -moz-border-radius: 2px;
            border-radius: 2px;
            background-color: rgb(245, 245, 245);
        }
    }
    .disc-td {
        background-color: rgba(0, 0, 0, 0.089);
        color: black;
    }
    .clickable-header:hover {
        cursor: pointer;
     }
</style>