<template>
    <div class="DashboardPrototipo" style="height: calc(100vh - 48px)">
        <div class="d-flex center-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" style="overflow: auto; width: 100%">
            <h1 class="h2">Plano</h1>
                <template v-if="isAdd">
                    <div class="col-sm-9"></div>
                    <button type="button" class="btn btn-success col-sm-1" v-on:click.prevent="addTurma" style=""> Confirmar </button>
                    <button type="button" class="btn btn-success col-sm-1" v-on:click.prevent="toggleAdd" style="margin-left: 10px;">Cancelar </button>
                </template>
                <template v-else>
                    <div class="col-sm-9"></div>

                    <template v-if="Deleting">
                        <button type="button" class="btn btn-success col-sm-1" v-on:click.prevent="confirmDelete" style="">Confirmar </button>
                        <button type="button" class="btn btn-success col-sm-1" v-on:click.prevent="toggleDelete" style="margin-left: 10px;">Cancelar</button>
                    </template>
                    <template v-else>
                        <button type="button" class="btn btn-success col-sm-1" v-on:click.prevent="toggleAdd" style="">Adicionar </button>
                        <button type="button" class="btn btn-success col-sm-1" v-on:click.prevent="toggleDelete" style="margin-left: 10px;">Excluir </button>
                    </template>

                </template>
        </div>
    <div style="width: 100%;height: 80%; overflow: scroll;">
        <table class="table table-hover table-sm">
            <thead class="thead-light">
            <tr>
                <th scope="col" style="width:16px">S.</th>
                <th scope="col" style="width:80px;">Cod</th>
                <th scope="col" style="width:178px;">Disciplina</th>
                <th scope="col" style="width:20px;">C.</th>
                <th scope="col" style="width:52px;">Turma</th>
                <th scope="col" style="width:90px;">Horário</th>
                <th scope="col" style="width:144px; ">Docente</th>
                <th scope="col" style="width:84px;">Turno</th>
                <th scope="col" style="width:60px;">Sala</th>
                <th scope="col" style="width:52px;">Total</th>
                <th v-for="curso in Cursos" :key="curso.id" style="width: 64px">{{curso.codigo}}</th>
            </tr>
            </thead>
            <tbody>

            <template v-if="isAdd">
                <tr>
                    <td>
                        <input type="text" style="width: 16px;" id="periodo" v-model="turmaForm.periodo">
                    </td>
                    <td>
                        <template v-for="disciplina in Disciplinas">
                            <template v-if="disciplina.id===turmaForm.Disciplina">
                                <p :key="disciplina.id" style="width:80px">{{disciplina.codigo}}</p>
                            </template>
                        </template>
                    </td>
                    <td>
                        <select type="text" style="width:170px;" id="disciplina" v-model="turmaForm.Disciplina">
                            <option v-if="Disciplinas.length===0" type="text" value="">Nenhuma Disciplina Encontrada</option>
                            <option v-for="disciplina in Disciplinas" :key="disciplina.id" :value="disciplina.id">{{disciplina.nome}}</option>
                        </select>
                    </td>
                    <td>
                        <p style="width:20px; min-width: 20px;">
                            <template v-for="disciplina in Disciplinas">
                                <template v-if="disciplina.id===turmaForm.Disciplina">
                                    {{disciplina.cargaPratica + disciplina.cargaTeorica}}
                                </template>
                            </template>
                        </p>
                    </td>
                    <td>
                        <input type="text" style="width: 28px" id="turma" v-model="turmaForm.letra">
                    </td>
                    <td>
                        <select type="text" style="width: 86px" id="horario1" v-model="turmaForm.Horario1">
                            <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                            <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
                        </select>
                    <br/>
                        <select type="text" style="width: 86px" id="horario2" v-model="turmaForm.Horario2">
                            <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                            <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
                        </select>
                    </td>
                    <td>
                            <select type="text" style="width:144px" id="docente1" v-model="turmaForm.Docente1">
                                <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                                <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.nome}}</option>
                            </select>
                    <br/>
                            <select type="text" style="width:144px;" id="docente2" v-model="turmaForm.Docente2">
                                <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                                <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.nome}}</option>
                            </select>
                    </td>
                    <td>
                        <select type="text" style="width: 84px" id="turno1" v-model="turmaForm.turno1">
                            <option value="Diurno">Diurno</option>
                            <option value="Integral">Integral</option>
                            <option value="Noturno">Noturno</option>
                        </select>
                    <br/>
                        <select type="text" style="width: 84px" id="turno2" v-model="turmaForm.turno2">
                            <option value="Diurno">Diurno</option>
                            <option value="Integral">Integral</option>
                            <option value="Noturno">Noturno</option>
                        </select>
                    </td>
                    <td>
                            <select type="text" style="width:60px" id="sala1" v-model="turmaForm.Sala1">
                                <option v-if="Salas.length===0" type="text" value="">Nenhuma Sala Encontrada</option>
                                <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
                            </select>
                        <br/>
                            <select type="text" style="width: 60px" id="sala2" v-model="turmaForm.Sala2">
                                <option v-if="Salas.length===0" type="text" value="">Nenhuma Sala Encontrada</option>
                                <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
                            </select>
                    </td>
                </tr>
            </template>
            <template v-if="Turmas.length>0">
            <template v-for="perfil in Perfis">
                <tr v-for="turma in inPerfil(perfil, Turmas, Disciplinas)" :key="turma.id"  v-bind:class="{'basico':perfil.id==1,'avancado':perfil.id==2, 'arqso':perfil.id==3,
                 'bancosdedados':perfil.id==4, 'computacaografica':perfil.id==5, 'engenhariasoftware':perfil.id==6, 'iaic':perfil.id==7, 'numoc':perfil.id==8, 'redes':perfil.id==9, 'teoria':perfil.id==10,
                 'humempre':perfil.id==11, 'multi': perfil.id==12, 'ice':perfil.id==13}">
                    <td>
                        <input type="text" style="width: 16px;" id="periodo" v-model="turma.periodo" v-on:blur="editTurma(turma)">
                        <input v-if="Deleting" style="width: 16px;" type="checkbox" v-on:click="selectToDelete(turma)">
                    </td>
                    <td>
                        <template v-for="disciplina in Disciplinas">
                            <template v-if="disciplina.id===turma.Disciplina">
                                <p :key="disciplina.id" style="width:80px">{{disciplina.codigo}}</p>
                            </template>
                        </template>
                    </td>
                    <td>
                        <select type="text" style="width:170px;" id="disciplina" v-model="turma.Disciplina" v-on:change="editTurma(turma)">
                            <option v-if="Disciplinas.length===0" type="text" value="">Nenhuma Disciplina Encontrada</option>
                            <option v-for="disciplina in Disciplinas" :key="disciplina.id" :value="disciplina.id">{{disciplina.nome}}</option>
                        </select>
                    </td>
                    <td>
                        <p style="width:20px; min-width: 20px;">
                            <template v-for="disciplina in Disciplinas">
                                <template v-if="disciplina.id===turma.Disciplina">
                                    {{disciplina.cargaPratica + disciplina.cargaTeorica}}
                                </template>
                            </template>
                        </p>
                    </td>
                    <td>
                        <input type="text" style="width: 28px" v-model="turma.letra" v-on:blur="editTurma(turma)">
                    </td>
                    <td>
                        <select type="text" style="width: 86px" id="horario1" v-model="turma.Horario1" v-on:change="editTurma(turma)">
                            <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                            <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
                        </select>
                        <br/>
                        <select type="text" style="width: 86px" id="horario2" v-model="turma.Horario2" v-on:change="editTurma(turma)">
                            <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                            <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
                        </select>
                    </td>
                    <td>
                        <select type="text" style="width:144px" id="docente1" v-model="turma.Docente1" v-on:change="editTurma(turma)">
                            <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                            <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.nome}}</option>
                        </select>
                        <br/>
                        <select type="text" style="width:144px;" id="docente2" v-model="turma.Docente2" v-on:change="editTurma(turma)">
                            <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                            <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.nome}}</option>
                        </select>
                    </td>
                    <td>
                        <select type="text" style="width: 84px" id="turno1" v-model="turma.turno1" v-on:change="editTurma(turma)">
                            <option value="Diurno">Diurno</option>
                            <option value="Integral">Integral</option>
                            <option value="Noturno">Noturno</option>
                        </select>
                        <br/>
                        <select type="text" style="width: 84px" id="turno2" v-model="turma.turno2" v-on:change="editTurma(turma)">
                            <option value="Diurno">Diurno</option>
                            <option value="Integral">Integral</option>
                            <option value="Noturno">Noturno</option>
                        </select>
                    </td>
                    <td>
                        <select type="text" style="width:60px" id="sala1" v-model="turma.Sala1" v-on:change="editTurma(turma)">
                            <option v-if="Salas.length===0" type="text" value="">Nenhuma Sala Encontrada</option>
                            <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
                        </select>
                        <br/>
                        <select type="text" style="width: 60px" id="sala2" v-model="turma.Sala2" v-on:change="editTurma(turma)">
                            <option v-if="Salas.length===0" type="text" value="">Nenhuma Sala Encontrada</option>
                            <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
                        </select>
                    </td>
                    <td style="width:52px">0</td>
                    <template v-for="curso in Cursos">
                        <td>
                            <input type="text" :value="pedidoPeriodizado(turma.id, curso.id)" style="width: 64px" v-on:focus="focusPedido(turma.id, curso.id)" v-on:blur="blurPedidoPeriodizado(turma.id, curso.id, $event)">
                            <input type="text" :value="pedidoNaoPeriodizado(turma.id, curso.id)" style="width: 64px" v-on:focus="focusPedido(turma.id, curso.id)" v-on:blur="blurPedidoNaoPeriodizado(turma.id, curso.id, $event)">
                        </td>
                    </template>
                </tr>
            </template>
            </template>
            </tbody>
        </table>
    </div>    
    </div>
</template>

<script>
    import _ from 'lodash'
    import turmaService from '../../common/services/turma'
    import pedidoService from '../../common/services/pedido'

    const emptyTurma = {
        id:undefined,
        periodo:undefined,
        letra:undefined,
        turno1:undefined,
        turno2:undefined,
        Disciplina:undefined,
        Docente1:undefined,
        Docente2:undefined,
        Horario1:undefined,
        Horario2:undefined,
        Sala1:undefined,
        Sala2:undefined
    }

    const emptyPedido =  {
        vagasPeriodizadas: undefined,
        vagasNaoPeriodizadas: undefined,
        Curso: undefined,
        Turma: undefined,
    }

    export default {

        name: 'DashboardPrototipo',

        data () {
            return {
                turmaForm: _.clone(emptyTurma),
                error: undefined,
                isAdd:false,
                isDelete:false,
                deleteTurmas:[]
            }
        },

        methods: {
            inPerfil: function (perfil, turmas, disciplinas) {
                return turmas.filter(function (turma) {
                    var disciplina = _.find(disciplinas, function(disc) { return disc.id===turma.Disciplina})
                    return disciplina.Perfil===perfil.id
                })

            },
            addTurma() {
                turmaService.create(this.turmaForm).then((response) => {
                    this.cleanTurma()
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Turma ${response.Turma.letra} foi criada!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao criar Turma</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },

            editTurma(turma) {
                turmaService.update(turma.id, turma).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Turma ${response.Turma.letra} foi atualizada!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao atualizar Turma</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },

            unselectDelete(turma){
               this.deleteTurmas =  _.pull(this.deleteTurmas, turma)
            },

            selectDelete(turma) {
                this.deleteTurmas = _.concat(this.deleteTurmas, turma);
            },

            toggleDelete(){
                this.isDelete = !this.isDelete;
                this.deleteTurmas = []
            },

            selectToDelete(turma){
                for(var i=0;i<this.deleteTurmas.length;i++) {
                    if (this.deleteTurmas[i].id == turma.id) {
                        this.unselectDelete(turma);
                        return
                    }
                }
                    this.selectDelete(turma)

            },

            deleteTurma(turma) {
                turmaService.delete(turma.id, turma).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Turma ${response.Turma.letra} foi excluída!`,
                        type: 'success'
                    })
                }).
                catch(() => {
                    this.error = '<b>Erro ao excluir Turma</b>'
                })
            },

            deleteAllTurma(turmas){
                for(var i=0;i<turmas.length;i++){
                    this.deleteTurma(turmas[i]);
                }
            },

            confirmDelete() {
                this.deleteAllTurma(this.deleteTurmas)
                this.toggleDelete()
            },

            cleanTurma() {
                this.turmaForm = _.clone(emptyTurma)
                this.error = undefined
            },

            toggleAdd() {
                this.cleanTurma()
                this.isAdd = !this.isAdd;
            },

            pedidoPeriodizado(turma, curso) {
                for(var i=0; i< this.$store.state.pedido.Pedidos.length; i++){
                    if((this.$store.state.pedido.Pedidos[i].Curso===curso) && (this.$store.state.pedido.Pedidos[i].Turma===turma)){
                        return this.$store.state.pedido.Pedidos[i].vagasPeriodizadas
                    }
                }
                return 0
            },

            pedidoNaoPeriodizado(turma, curso) {
                for(var i=0; i< this.$store.state.pedido.Pedidos.length; i++){
                    if((this.$store.state.pedido.Pedidos[i].Curso===curso) && (this.$store.state.pedido.Pedidos[i].Turma===turma)){
                        return this.$store.state.pedido.Pedidos[i].vagasNaoPeriodizadas
                    }
                }
                return 0
            },

            focusPedido(turma, curso){
                for(var i=0; i< this.$store.state.pedido.Pedidos.length; i++){
                    if((this.$store.state.pedido.Pedidos[i].Curso===curso) && (this.$store.state.pedido.Pedidos[i].Turma===turma)){
                        return
                    }
                }
                var pedido = _.clone(emptyPedido)
                pedido.Turma = turma
                pedido.Curso = curso
                pedido.vagasPeriodizadas = 0
                pedido.vagasNaoPeriodizadas = 0
                pedidoService.create(pedido).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `O Pedido foi criado!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao criar Pedido</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },

            blurPedidoPeriodizado(turma, curso, e){
                for(var i=0; i< this.$store.state.pedido.Pedidos.length; i++){
                    if((this.$store.state.pedido.Pedidos[i].Curso===curso) && (this.$store.state.pedido.Pedidos[i].Turma===turma)){
                        if(e.target.value!=0){
                            var pedido = _.clone(this.$store.state.pedido.Pedidos[i])
                            pedido.vagasPeriodizadas = e.target.value
                            pedidoService.update(curso, turma, pedido).then((response) => {
                                this.$notify({
                                    group: 'general',
                                    title: `Sucesso!`,
                                    text: `O Pedido foi editado!`,
                                    type: 'success'
                                })
                            }).
                            catch(error => {
                                this.error = '<b>Erro ao editar Pedido</b>'
                                if (error.response.data.fullMessage) {
                                    this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                                }
                            })
                        }else{
                            if (this.$store.state.pedido.Pedidos[i].vagasNaoPeriodizadas===0){
                                pedidoService.delete(curso, turma).then((response) => {
                                    this.$notify({
                                        group: 'general',
                                        title: `Sucesso!`,
                                        text: `O pedido foi excluído!`,
                                        type: 'success'
                                    })
                                }).
                                catch(() => {
                                    this.error = '<b>Erro ao excluir Pedido</b>'
                                })
                            }
                            else{
                                var pedido = _.clone(this.$store.state.pedido.Pedidos[i])
                                pedido.vagasPeriodizadas = 0
                                pedidoService.update(curso, turma, pedido).then((response) => {
                                    this.$notify({
                                        group: 'general',
                                        title: `Sucesso!`,
                                        text: `O Pedido foi editado!`,
                                        type: 'success'
                                    })
                                }).
                                catch(error => {
                                    this.error = '<b>Erro ao editar Pedido</b>'
                                    if (error.response.data.fullMessage) {
                                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                                    }
                                })
                            }
                        }
                    }
                }

            },

            blurPedidoNaoPeriodizado(turma, curso, e){
                for(var i=0; i< this.$store.state.pedido.Pedidos.length; i++){
                    if((this.$store.state.pedido.Pedidos[i].Curso===curso) && (this.$store.state.pedido.Pedidos[i].Turma===turma)){
                        if(e.target.value!=0){
                            var pedido = _.clone(this.$store.state.pedido.Pedidos[i])
                            pedido.vagasNaoPeriodizadas = e.target.value
                            pedidoService.update(curso, turma, pedido).then((response) => {
                                this.$notify({
                                    group: 'general',
                                    title: `Sucesso!`,
                                    text: `O Pedido foi editado!`,
                                    type: 'success'
                                })
                            }).
                            catch(error => {
                                this.error = '<b>Erro ao editar Pedido</b>'
                                if (error.response.data.fullMessage) {
                                    this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                                }
                            })
                        }else{
                            if (this.$store.state.pedido.Pedidos[i].vagasPeriodizadas===0){
                                pedidoService.delete(curso, turma).then((response) => {
                                    this.$notify({
                                        group: 'general',
                                        title: `Sucesso!`,
                                        text: `O pedido foi excluído!`,
                                        type: 'success'
                                    })
                                }).
                                catch(() => {
                                    this.error = '<b>Erro ao excluir Pedido</b>'
                                })
                            }
                            else {
                                var pedido = _.clone(this.$store.state.pedido.Pedidos[i])
                                pedido.vagasNaoPeriodizadas = 0
                                pedidoService.update(curso, turma, pedido).then((response) => {
                                    this.$notify({
                                        group: 'general',
                                        title: `Sucesso!`,
                                        text: `O Pedido foi editado!`,
                                        type: 'success'
                                    })
                                }).
                                catch(error => {
                                    this.error = '<b>Erro ao editar Pedido</b>'
                                    if (error.response.data.fullMessage) {
                                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                                    }
                                })
                            }
                        }
                    }
                }

            },





        },


        computed: {
            Cursos () {
                return this.$store.state.curso.Cursos
            },

            Disciplinas () {
                return this.$store.state.disciplina.Disciplinas
            },

            Docentes () {
                return this.$store.state.docente.Docentes
            },

            Horarios () {
                return this.$store.state.horario.Horarios
            },

            Salas () {
                return this.$store.state.sala.Salas
            },

            Perfis () {
                return this.$store.state.perfil.Perfis
            },

            Turmas () {

               return _.orderBy(_.orderBy(this.$store.state.turma.Turmas, 'letra'), 'Disciplina')
            },

            Pedidos () {
                return this.$store.state.pedido.Pedidos
            },

            Deleting () {
                return this.isDelete
            }

        }
    }
</script>


<style scoped>

    .DashboardPrototipo{
        max-height: 90vh;
        max-width: 90vw;
        overflow: hidden;
    }
    table {
        table-layout: fixed;
        overflow: auto;
        max-height: 100%;
        max-width: 100%;
    }

    input {
        height: 25px;
    }

    td {
        text-align: center;
    }

    p {
        text-align: center;
    }

    th {
        text-align: center;
    }

    input {
        width:auto;
        text-align: left;
    }

    /*tr:nth-child(odd) {
        background: white;
    }


    tr:nth-child(even) {
        background: whitesmoke;
    }*/

    thead th {
        position: sticky;
        position: -webkit-sticky;
        top: -1px;
        background: white;
        z-index: 10;
    }

    table.scrolling td:nth-child(-n+10),
    table.scrolling th:nth-child(-n+10) {
        position: -webkit-sticky;
        position: sticky;
        left:0;
    }

    .avancado {
        background-color: #7c997f !important;
    }

    .basico {
        background-color: #a76663 !important;
    }

    .arqso {
        background-color: #a4a75a !important;
    }

    .bancosdedados {
        background-color: #60a75a !important;
    }

    .computacaografica {
        background-color: #a75877 !important;
    }

    .engenhariasoftware {
        background-color: #34a9f6 !important;
    }

    .iaic {
        background-color: #a449f6 !important;
    }

    .numoc {
        background-color: #a7000c !important;
    }

    .redes {
        background-color: #0f0da7 !important;
    }

    .teoria {
        background-color: #0aa702 !important;
    }

    .humempre {
        background-color: #0e6ba7 !important;
    }

    .multi {
        background-color: #9100a7 !important;
    }

    .ice {
        background-color: #9d9ea7 !important;
    }

    .sticky {
        /*
        position:absolute;
        top:auto;
        left: auto;*/
    }

</style>