<template>
    <div class="pedido">
        <input type="text" :value="pedidoPeriodizado(turma.id, curso.id)" style="width: 64px"
            v-on:focus="focusPedido(turma.id, curso.id, $event)"
            v-on:blur="blurPedidoPeriodizado(turma.id, curso.id, $event)">
        <input type="text" :value="pedidoNaoPeriodizado(turma.id, curso.id)" style="width: 64px"
            v-on:focus="focusPedido(turma.id, curso.id, $event)"
            v-on:blur="blurPedidoNaoPeriodizado(turma.id, curso.id, $event)">
    </div>
</template>
<script>
    import turmaService from '../../common/services/turma'
    import pedidoService from '../../common/services/pedido'

    const emptyPedido =  {
        vagasPeriodizadas: undefined,
        vagasNaoPeriodizadas: undefined,
        Curso: undefined,
        Turma: undefined,
    }

    export default {
        name:'Pedido',
        props: {
            turma:Object,
            curso:Object
        },

        data () {
            return {
                ativo: false,
                valorAtual:undefined
            }
        },

        methods: {
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

            focusPedido(turma, curso, e){
                this.valorAtual = e.target.value
            },

            blurPedidoPeriodizado(turma, curso, e){
                for(var i=0; i< this.$store.state.pedido.Pedidos.length; i++){
                    if((this.$store.state.pedido.Pedidos[i].Curso===curso) && (this.$store.state.pedido.Pedidos[i].Turma===turma)){
                        var pedido = _.clone(this.$store.state.pedido.Pedidos[i])
                        if(e.target.value!=0){
                            if(this.valorAtual==e.target.value)
                                return
                            pedido.vagasPeriodizadas = e.target.value
                            console.log("chamada realizada!")
                            pedidoService.update(pedido.id, pedido).then((response) => {
                                console.log("chamada finalizada")
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
                                pedidoService.delete(pedido.id, pedido).then((response) => {
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
                                if(this.valorAtual==0)
                                    return
                                pedido.vagasPeriodizadas = 0
                                pedidoService.update(pedido.id, pedido).then((response) => {
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
                        return
                    }
                }
                if(e.target.value!=0){
                    var pedido = _.clone(emptyPedido)
                    pedido.Turma = turma
                    pedido.Curso = curso
                    pedido.vagasPeriodizadas = e.target.value
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
                }


            },

            blurPedidoNaoPeriodizado(turma, curso, e){
                for(var i=0; i< this.$store.state.pedido.Pedidos.length; i++){
                    if((this.$store.state.pedido.Pedidos[i].Curso===curso) && (this.$store.state.pedido.Pedidos[i].Turma===turma)){
                        var pedido = _.clone(this.$store.state.pedido.Pedidos[i])
                        if(e.target.value!=0){
                            if(this.valorAtual==e.target.value)
                                return
                            pedido.vagasNaoPeriodizadas = e.target.value
                            pedidoService.update(pedido.id, pedido).then((response) => {
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
                                pedidoService.delete(pedido.id, pedido).then((response) => {
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
                                if(this.valorAtual==0)
                                    return
                                pedido.vagasNaoPeriodizadas = 0
                                pedidoService.update(pedido.id, pedido).then((response) => {
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
                        return
                    }
                }
                if(e.target.value!=0) {
                    var pedido = _.clone(emptyPedido)
                    pedido.Turma = turma
                    pedido.Curso = curso
                    pedido.vagasPeriodizadas = 0
                    pedido.vagasNaoPeriodizadas = e.target.value
                    pedidoService.create(pedido).then((response) => {
                        this.$notify({
                            group: 'general',
                            title: `Sucesso!`,
                            text: `O Pedido foi criado!`,
                            type: 'success'
                        })
                    }).catch(error => {
                        this.error = '<b>Erro ao criar Pedido</b>'
                        if (error.response.data.fullMessage) {
                            this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                        }
                    })
                }
            }
        },
        computed: {
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