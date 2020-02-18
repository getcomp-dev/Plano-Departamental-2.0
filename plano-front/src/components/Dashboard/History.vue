<template>
    <div class="DashboardHistory row pr-2" v-if="Admin">
        <!-- Titulo -->
        <div
                class="div-titulo col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
                style="height:38px;"
        >
            <div class="form-inline col-12 pl-0 mb-1 pr-1">
                <h1 class="titulo col-9 col-sm-6 col-md-4 col-lg-4 px-0 pr-1">Logs</h1>

                <div
                        class="form-group col-3 col-sm-6 col-md-8 col-lg-8 mb-0 p-0"
                        style="display:flex;"
                >
                    <div class="input-group ml-auto mb-0 mt-0 p-0">


                        <div class="input-group-append mt-auto mb-auto">
                            <label class="input-group-text">Operação</label>
                        </div>
                        <select class="form-control form-control-sm mt-auto mb-auto" v-model="operacoes">
                            <option value="Todos">Todas</option>
                            <option value="Create">Create</option>
                            <option value="Delete">Delete</option>
                            <option value="Edit">Edit</option>
                        </select>

                        <b-button v-b-modal.modalTabelas title="Tabelas" class="cancelbtn ml-2">
                            <i class="fas fa-list-ul"></i>
                        </b-button>

                        <!--<button type="button" class="relatbtn" title="Relatório" v-on:click.prevent="pdf">
                            <i class="far fa-file-alt"></i>
                        </button>-->

                        <b-button v-b-modal.modalAjuda title="Ajuda" class="relatbtn">
                            <i class="fas fa-question"></i>
                        </b-button>
                    </div>
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
                            <p class="p-header" style="width: 100px;">Tabela Modificada</p>
                        </th>
                        <th scope="col">
                            <p class="p-header" style="width: 100px">Campo Modificado</p>
                        </th>
                        <th scope="col">
                            <p class="p-header" style="width: 200px">Linha Modificada</p>
                        </th>
                        <th scope="col">
                            <p class="p-header" style="width: 150px">Valor Anterior</p>
                        </th>
                        <th scope="col">
                            <p class="p-header" style="width: 150px">Novo Valor</p>
                        </th>
                        <th scope="col">
                            <p class="p-header" style="width: 50px">Operação</p>
                        </th>
                        <th scope="col">
                            <p class="p-header" style="width: 50px">Usuário</p>
                        </th>
                        <th scope="col">
                            <p class="p-header" style="width: 160px">Hora</p>
                        </th>
                    </div>
                </tr>
                </thead>
                <tbody>
                <template v-if="History.length > 0">
                    <template v-for="h in History">
                            <div class="linhas" style="width: ‭845‬px;" :key="`History${h.id}`">
                                <td class="disc-td">
                                    <div style="width: 100px">{{h.tabelaModificada}}</div>
                                </td>
                                <td class="disc-td">
                                    <div style="width: 100px;">{{h.campoModificado}}</div>
                                </td>
                                <td class="disc-td">
                                    <div style="width: 200px;">{{linhaModificada(h)}}</div>
                                </td>
                                <td class="disc-td">
                                    <div style="width: 150px;">{{valorAnterior(h)}}</div>
                                </td>
                                <td class="disc-td">
                                    <div style="width: 150px;">{{valorNovo(h)}}</div>
                                </td>
                                <td class="disc-td">
                                    <div style="width: 50px;">{{h.tipoOperacao}}</div>
                                </td>
                                <td class="disc-td">
                                    <div style="width: 50px;">{{h.usuario}}</div>
                                </td>
                                <td class="disc-td">
                                    <div style="width: 160px;">{{h.createdAt}}</div>
                                </td>

                            </div>
                    </template>
                </template>
                <template v-else>
                    <!--<tr>
                        <td colspan="2" class="text-center">
                            <i class="fas fa-exclamation-triangle"></i> Nenhuma tabela selecionada!
                        </td>
                    </tr>-->
                </template>
                </tbody>
            </table>
        </div>

        <!-- Modals do botão para escolher tabelas -->
        <b-modal id="modalTabelas" ref="TabelasModal" scrollable title="Selecione as tabelas" :size="'sm'">
            <div
                    class="form-group col m-0 p-0 border"
                    style="height: 395px; width:max-content; border-color: rgba(0,0,0,0.125);"
            >
                <table class="table table-sm modal-table" style="max-height: 392px !important;">
                    <tr>
                        <div style="width: max-content; font-size: 11px!important">
                            <th class="border-0">
                                <p style="width:25px" class="p-header"></p>
                            </th>
                            <th class="border-0">
                                <p class="p-header" style="width: 200px; text-align:start">Nome</p>
                            </th>
                        </div>
                    </tr>
                    <tbody>
                    <tr v-for="o in options" :key="`tabeka${o.value}`">
                        <div style="width: max-content">
                            <td style="padding:0;broder:0;margin:0!important;">
                                <div style="width:25px;">
                                    <input
                                            type="checkbox"
                                            v-model="TabelasSelecionadas"
                                            :value="o.value"
                                            class="form-check-input position-static m-0"
                                    />
                                </div>
                            </td>
                            <td>
                                <p style="width:200px; text-align:start">{{o.text}}</p>
                            </td>
                        </div>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div slot="modal-footer" style="display: flex; margin-right: 10px !important;">
                <b-button
                        class="btn-azul btn-df mr-2"
                        variant="success"
                        @click="selectAll()"
                >Selecionar Todos</b-button>
                <b-button
                        class="btn-cinza btn-df mr-2"
                        variant="secondary"
                        @click="selectNone()"
                >Desmarcar Todos</b-button>
                <b-button
                        variant="success"
                        @click="btnOK()"
                        class="btn-verde btn-df mr-2"
                        style="padding-right:15px!important; padding-left:15px!important;"
                >OK</b-button>
            </div>
        </b-modal>

    </div>
</template>

<script>
    import _ from "lodash";
    export default {
        name: "DashboardHistory",

        data () {
          return {
              options: [
                  {text: 'CargaPos', value:'CargaPos'},
                  {text: 'Curso', value:'Curso'},
                  {text: 'Disciplina', value:'Disciplina'},
                  {text: 'DisciplinaGrade', value:'DisciplinaGrade'},
                  {text: 'Docente', value:'Docente'},
                  {text: 'DocentePerfil', value:'DocentePerfil'},
                  {text: 'Grade', value:'Grade'},
                  {text: 'Pedido', value:'Pedido'},
                  {text: 'PedidoExterno', value:'PedidoExterno'},
                  {text: 'Perfil', value:'Perfil'},
                  {text: 'Sala', value:'Sala'},
                  {text: 'Turma', value:'Turma'},
                  {text: 'TurmaExterna', value:'TurmaExterna'},
              ],
              TabelasSelecionadas:[],
              TabelasAtivadas: [],
              operacoes: 'Todos'
          }
        },

        methods: {

            btnOK() {
                //Somente atualiza o vetor de perfis ativados quando o botão OK for clickado
                this.TabelasAtivadas = [...this.TabelasSelecionadas];
                this.$refs.TabelasModal.hide();
            },

            selectAll() {
                if (this.TabelasSelecionadas != []) this.TabelasSelecionadas = [];
                for (var i = 0; i < this.options.length; i++)
                    this.TabelasSelecionadas.push(this.options[i].value);
            },

            selectNone() {
                this.TabelasSelecionadas = [];
            },

            linhaModificada(h) {
                let linha = h.linhaModificada
                let aux = undefined
                switch(h.tabelaModificada){
                    case 'CargaPos':        if(h.tipoOperacao === 'Delete'){
                                                aux = linha.split('/')
                                                let docente =  _.find(this.$store.state.docente.Docentes, {'id': parseInt(aux[2])})
                                                if(docente === undefined){
                                                    linha = `${aux[0]}/${aux[1]}/${aux[2]}`
                                                }else{
                                                    linha = `${aux[0]}/${aux[1]}/${docente.apelido}`
                                                }
                                            }
                                            break;

                    case 'DisciplinaGrade': aux = linha.split('/')
                                            let disciplina = _.find(this.$store.state.disciplina.Disciplinas, {'id': parseInt(aux[1])})
                                            let grade = _.find(this.$store.state.grade.Grades, {'id': parseInt(aux[2])})
                                            let curso = (grade === undefined ? undefined : _.find(this.$store.state.curso.Cursos, {'id': grade.Curso}))
                                            linha = `${(grade === undefined ? aux[2] : (curso === undefined ? 'Curso Excluído' : curso.codigo) + ' - ' + grade.nome)}/${(disciplina === undefined ? aux[1] : disciplina.codigo)}/${aux[0]}`
                                            break;

                    case 'DocentePerfil':   aux = linha.split('/')
                                            let docente = _.find(this.$store.state.docente.Docentes, {'id': parseInt(aux[1])})
                                            let perfil =  _.find(this.$store.state.perfil.Perfis, {'id': parseInt(aux[0])})
                                            linha = `${(docente === undefined ? aux[1] : docente.nome)}/${(perfil===undefined ? aux[0] : perfil.nome)}`
                                            break;

                    case 'Grade':           aux = linha.split('/')
                                            let cursoGrade = _.find(this.$store.state.curso.Cursos, {'id': parseInt(aux[0])})
                                            linha = `${(cursoGrade === undefined ? aux[0] : cursoGrade.codigo)} - ${aux[1]}`
                                            break;

                    case 'Pedido':          aux = linha.split('/')
                                            let turma = _.find(this.$store.state.turma.Turmas, {'id': parseInt(aux[0])})
                                            let disciplinaPedido = (turma === undefined ? undefined : _.find(this.$store.state.disciplina.Disciplinas, {'id': turma.Disciplina}))
                                            let cursoPedido = _.find(this.$store.state.curso.Cursos, {'id': parseInt(aux[1])})
                                            linha = `${(turma === undefined ? aux[0] : (turma.Disciplina === null ? 'Turma Excluída' : disciplinaPedido.codigo + ' ' + turma.letra))}/${(cursoPedido === undefined ? aux[1] : cursoPedido.codigo)}`
                                            break;

                    case 'PedidoExterno':   aux = linha.split('/')
                                            let turmaExterna = _.find(this.$store.state.turmaExterna.Turmas, {'id': parseInt(aux[0])})
                                            let disciplinaPedidoExterno = (turmaExterna === undefined ? undefined : _.find(this.$store.state.disciplina.Disciplinas, {'id': turmaExterna.Disciplina}))
                                            let cursoPedidoExterno = _.find(this.$store.state.curso.Cursos, {'id': parseInt(aux[1])})
                                            linha = `${(turmaExterna === undefined ? aux[0] : disciplinaPedidoExterno.codigo + ' ' + turmaExterna.letra)}/${(cursoPedidoExterno === undefined ? aux[1] : cursoPedidoExterno.codigo)}`
                                            break;

                    case 'Turma':           aux = linha.split('/')
                                            let disciplinaTurma = _.find(this.$store.state.disciplina.Disciplinas, {'id': parseInt(aux[1])})
                                            linha = `${(disciplinaTurma === undefined ? aux[1] : disciplinaTurma.codigo)}/${aux[0]}`
                                            break;

                    case 'TurmaExterna':    aux = linha.split('/')
                                            let disciplinaTurmaExterna = _.find(this.$store.state.disciplina.Disciplinas, {'id': parseInt(aux[1])})
                                            linha = `${(disciplinaTurmaExterna === undefined ? aux[1] : disciplinaTurmaExterna.codigo)}/${aux[0]}`
                                            break;


                }
                return linha
            },

            valorAnterior(h) {
                let v = h.valorAnterior
                switch(h.campoModificado){
                    case 'Curso':       v = _.find(this.$store.state.curso.Cursos, {'id': parseInt(h.valorAnterior)})
                                        if(v === undefined)
                                            v = h.valorAnterior
                                        else
                                            v = v.codigo
                                        break;

                    case 'Disciplina':  v = _.find(this.$store.state.disciplina.Disciplinas, {'id': parseInt(h.valorAnterior)})
                                        if(v === undefined)
                                            v = h.valorAnterior
                                        else
                                            v = v.codigo
                                        break;

                    case 'Docente':
                    case 'Docente1':
                    case 'Docente2':    v = _.find(this.$store.state.docente.Docentes, {'id': parseInt(h.valorAnterior)})
                                        if(v === undefined)
                                           v = h.valorAnterior
                                        else
                                           v = v.apelido
                                        break;

                    case 'Grade':       v = _.find(this.$store.state.grade.Grades, {'id': parseInt(h.valorAnterior)})
                                        if(v === undefined)
                                            v = h.valorAnterior
                                        else {
                                            let c = _.find(this.$store.state.curso.Cursos, {'id': parseInt(v.Curso)})
                                            v = `${(c === undefined ? v.Curso : c.codigo)}/${v.nome}`
                                        }
                                        break;

                    case 'Horario':
                    case 'Horario1':
                    case 'Horario2':    v = _.find(this.$store.state.horario.Horarios, {'id': parseInt(h.valorAnterior)})
                                        if(v === undefined)
                                            v = h.valorAnterior
                                        else
                                            v = v.horario
                                        break;

                    case 'Perfil':      v = _.find(this.$store.state.perfil.Perfis, {'id': parseInt(h.valorAnterior)})
                                        if(v === undefined)
                                            v = h.valorAnterior
                                        else
                                            v = v.nome
                                        break;

                    case 'Sala':
                    case 'Sala1':
                    case 'Sala2':       v = _.find(this.$store.state.sala.Salas, {'id': parseInt(h.valorAnterior)})
                                        if(v === undefined)
                                            v = h.valorAnterior
                                        else
                                            v = v.nome
                                        break;
                }

                return v
            },

            valorNovo(h) {
                let v = h.valorNovo
                switch(h.campoModificado){
                    case 'Curso':       v = _.find(this.$store.state.curso.Cursos, {'id': parseInt(h.valorNovo)})
                        if(v === undefined)
                            v = h.valorNovo
                        else
                            v = v.codigo
                        break;

                    case 'Disciplina':  v = _.find(this.$store.state.disciplina.Disciplinas, {'id': parseInt(h.valorNovo)})
                        if(v === undefined)
                            v = h.valorNovo
                        else
                            v = v.codigo
                        break;

                    case 'Docente':
                    case 'Docente1':
                    case 'Docente2':    v = _.find(this.$store.state.docente.Docentes, {'id': parseInt(h.valorNovo)})
                        if(v === undefined)
                            v = h.valorNovo
                        else
                            v = v.apelido
                        break;

                    case 'Grade':       v = _.find(this.$store.state.grade.Grades, {'id': parseInt(h.valorNovo)})
                        if(v === undefined)
                            v = h.valorNovo
                        else {
                            let c = _.find(this.$store.state.curso.Cursos, {'id': parseInt(v.Curso)})
                            v = `${(c === undefined ? v.Curso : c.codigo)}/${v.nome}`
                        }
                        break;

                    case 'Horario':
                    case 'Horario1':
                    case 'Horario2':    v = _.find(this.$store.state.horario.Horarios, {'id': parseInt(h.valorNovo)})
                        if(v === undefined)
                            v = h.valorNovo
                        else
                            v = v.horario
                        break;

                    case 'Perfil':      v = _.find(this.$store.state.perfil.Perfis, {'id': parseInt(h.valorNovo)})
                        if(v === undefined)
                            v = h.valorNovo
                        else
                            v = v.nome
                        break;

                    case 'Sala':
                    case 'Sala1':
                    case 'Sala2':       v = _.find(this.$store.state.sala.Salas, {'id': parseInt(h.valorNovo)})
                        if(v === undefined)
                            v = h.valorNovo
                        else
                            v = v.nome
                        break;
                }

                return v
            }
        },

        computed: {
            History() {
                let TabelasAtivadas = this.TabelasAtivadas
                return _.orderBy(_.filter(_.filter(this.$store.state.history.History, function(h, i, a,  t=TabelasAtivadas) {
                    let v = false
                    t.forEach((o) => {
                        if(h.tabelaModificada === o){
                            v = true
                        }

                    })
                    if(v){
                        return true
                    }
                }), (this.operacoes === 'Todos' ? {}: {'tipoOperacao' : this.operacoes})), ['id'], ['desc']);
            },

            Admin() {
                if (this.$store.state.auth.Usuario.admin === 1) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    };
</script>

<style scoped>
    /* prefixed */

    .DashboardHistory {
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
    .listas {
        line-height: 30px;
        font-size: 12px;
        text-align: justify;
        line-height: inherit;
        box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
    }
    strong{color:#007bff}
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
        background-color: white;
    }

    .relatbtn:focus {
        color: #82a0ff;
        background-color: white;
        -webkit-text-stroke-width: 0.5px;
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

    .btn-df {
        font-size: 12px;
        height: 25px;
        min-width: -webkit-max-content;
        min-width: -moz-max-content;
        min-width: max-content;
        max-width: -webkit-max-content;
        max-width: -moz-max-content;
        max-width: max-content;
        padding: 0 5px 0 5px;
    }

    .btn-azul {
        background-color: #718de0 !important;
        border-color: #9ab3ff !important;
    }
    .btn-azul:hover {
        background-color: rgb(74, 101, 190) !important;
        border-color: #82a0ff !important;
    }

    .btn-azul:focus {
        -webkit-box-shadow: 0 0 0 0.2rem rgba(122, 128, 124, 0.5) !important;
        -moz-box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
        box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
    }

    .btn-cinza {
        background-color: #999999 !important;
        border-color: #c3c3c3 !important;
    }
    .btn-cinza:hover {
        background-color: #747474 !important;
        border-color: #aaaaaa !important;
    }

    .btn-cinza:focus {
        -webkit-box-shadow: 0 0 0 0.2rem rgba(116, 124, 119, 0.74) !important;
        -moz-box-shadow: 0 0 0 0.2rem rgba(116, 124, 119, 0.74) !important;
        box-shadow: 0 0 0 0.2rem rgba(116, 124, 119, 0.74) !important;
    }
    .btn-verde {
        background-color: #70b670 !important;
        border-color: #a0e7a0 !important;
    }
    .btn-verde:hover {
        background-color: #4c8a4c !important;
        border-color: #77dd77 !important;
    }

    .btn-verde:focus {
        -webkit-box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
        -moz-box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
        box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
    }

    i.fas,
    i.far {
        font-size: 25px;
    }

    .cancelbtn {
        background-color: white;
        color: #cfcfc4;
    }
    .cancelbtn:hover {
        background-color: white;
        color: #b8b4a8;
    }

    .cancelbtn:focus {
        background-color: white;
        color: #b8b8a8;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: #ada89a;
    }

    .form-control {
        height: 25px !important;
        font-size: 12px !important;
        padding: 2px 5px 0px 5px !important;
        min-width: 80px;
        max-width: 80px;
        text-align: start;
    }

    .input-group-text {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;
        margin-bottom: 0;
        /*===*/
        max-width: 70px;
        min-width: 70px;
        height: 25px !important;
        margin-left: -5px;
        padding-left: 15px;
        font-size: 12px !important;
    }
</style>