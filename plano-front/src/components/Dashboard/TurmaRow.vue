<template>
    <div class="turmarow" style="width: 776px;" v-bind:class="{'basico':perfil.id==1,'avancado':perfil.id==2, 'arqso':perfil.id==3,
                 'bancosdedados':perfil.id==4, 'computacaografica':perfil.id==5, 'engenhariasoftware':perfil.id==6, 'iaic':perfil.id==7, 'numoc':perfil.id==8, 'redes':perfil.id==9, 'teoria':perfil.id==10,
                 'humempre':perfil.id==11, 'multi': perfil.id==12, 'ice':perfil.id==13}">
        <td style="width: 16px;">
            <input type="text" style="width: 16px;" id="periodo" v-model="turma.periodo" v-on:blur="editTurma(turma)">
            <b-button v-on:click="deleteTurma(turma)" variant="danger"
                      style="width:16px;height: 16px;padding:0;"></b-button>
        </td>
        <td style="width: 80px;">
            <template v-for="disciplina in Disciplinas">
                <template v-if="disciplina.id===turma.Disciplina">
                    <p :key="disciplina.id" style="width:80px">{{disciplina.codigo}}</p>
                </template>
            </template>
        </td>
        <td style="width: 178px;">
            <select type="text" style="width:178px;" id="disciplina" v-model="turma.Disciplina"
                    v-on:change="editTurma(turma)">
                <option v-if="Disciplinas.length===0" type="text" value="">Nenhuma Disciplina Encontrada</option>
                <option v-for="disciplina in Disciplinas" :key="disciplina.id" :value="disciplina.id">
                    {{disciplina.nome}}
                </option>
            </select>
        </td>
        <td style="width: 20px;">
            <p style="width:20px; min-width: 20px;">
                <template v-for="disciplina in Disciplinas">
                    <template v-if="disciplina.id===turma.Disciplina">
                        {{disciplina.cargaPratica + disciplina.cargaTeorica}}
                    </template>
                </template>
            </p>
        </td>
        <td style="width: 52px;">
            <input type="text" style="width: 28px; margin-left: 12px; margin-right: 12px" v-model="turma.letra" v-on:blur="editTurma(turma)">
        </td>
        <td style="width: 90px;">
            <select type="text" style="width: 90px" id="horario1" v-model="turma.Horario1"
                    v-on:change="editTurma(turma)">
                <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
            </select>
            <br/>
            <select type="text" style="width: 90px" id="horario2" v-model="turma.Horario2"
                    v-on:change="editTurma(turma)">
                <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
            </select>
        </td>
        <td style="width: 144px;">
            <select type="text" style="width:144px" id="docente1" v-model="turma.Docente1"
                    v-on:change="editTurma(turma)">
                <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.nome}}</option>
            </select>
            <br/>
            <select type="text" style="width:144px;" id="docente2" v-model="turma.Docente2"
                    v-on:change="editTurma(turma)">
                <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.nome}}</option>
            </select>
        </td>
        <td style="width: 84px;">
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
        <td style="width: 60px">
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
        <td style="width:52px"><p style="width: 52px">0</p></td>
        <template v-for="curso in Cursos">
            <td style="width: 64px">
                <input type="text" :value="pedidoPeriodizado(turma.id, curso.id)" style="width: 64px"
                       v-on:focus="focusPedido(turma.id, curso.id)"
                       v-on:blur="blurPedidoPeriodizado(turma.id, curso.id, $event)">
                <input type="text" :value="pedidoNaoPeriodizado(turma.id, curso.id)" style="width: 64px"
                       v-on:focus="focusPedido(turma.id, curso.id)"
                       v-on:blur="blurPedidoNaoPeriodizado(turma.id, curso.id, $event)">
            </td>
        </template>
    </div>
</template>
<script>
    import turmaService from '../../common/services/turma'
    import pedidoService from '../../common/services/pedido'
    export default {
        name:'TurmaRow',
        props: {
            turma:Object,
            perfil:Object
        },
        methods: {
            editTurma(turma) {
                turmaService.update(turma.id, turma).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Turma ${response.Turma.letra} foi atualizada!`,
                        type: 'success'
                    })
                }).catch(error => {
                    this.error = '<b>Erro ao atualizar Turma</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },
            deleteTurma(turma) {
                turmaService.delete(turma.id, turma).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Turma ${response.Turma.letra} foi excluída!`,
                        type: 'success'
                    })
                }).catch(() => {
                    this.error = '<b>Erro ao excluir Turma</b>'
                })
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

            }
        },
        computed: {
            Cursos () {
                return this.$store.state.curso.Cursos
            },

            Disciplinas () {
                return _.orderBy(this.$store.state.disciplina.Disciplinas,'nome')
            },

            Docentes () {
                return _.orderBy(this.$store.state.docente.Docentes,'nome')
            },

            Horarios () {
                return _.orderBy(this.$store.state.horario.Horarios,'horario')
            },

            Salas () {
                return _.orderBy(this.$store.state.sala.Salas,'nome')
            },

            Perfis () {
                return _.orderBy(this.$store.state.perfil.Perfis,'nome')
            },

            Pedidos () {
                return this.$store.state.pedido.Pedidos
            }


        }
    }
</script>
<style scoped>
    td {
        text-align: center;
        padding: 0!important;
    }

    p {
        text-align: center;
    }

    input {
        height: 25px;
        width:auto;
        text-align: left;
    }
</style>