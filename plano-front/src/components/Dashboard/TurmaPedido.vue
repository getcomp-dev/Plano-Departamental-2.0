<template>
    <div>
                <input v-if="pedidoForm.vagasPeriodizadas == 0" type="text" v-model="pedidoForm.vagasPeriodizadas" style="width: 32px; color:#DADADA; text-align:center"
                       v-on:change="editPedido(pedido)">
                <input v-else type="text" v-model="pedidoForm.vagasPeriodizadas" style="width: 32px; font-weight: bold;  background-color: #DCDCDC; text-align:center"
                        v-on:change="editPedido(pedido)">
                <input v-if="pedidoForm.vagasNaoPeriodizadas == 0" type="text" v-model="pedidoForm.vagasNaoPeriodizadas" style="width: 32px; color:#DADADA; text-align:center"
                        v-on:change="editPedido(pedido)">
                <input v-else type="text" v-model="pedidoForm.vagasNaoPeriodizadas" style="width: 32px; font-weight: bold; background-color: #DCDCDC; text-align:center"
                        v-on:change="editPedido(pedido)">
    </div>
</template>
<script>
    import pedidoService from '../../common/services/pedido'
    import _ from 'lodash'

    const emptyPedido =  {
        vagasPeriodizadas: 0,
        vagasNaoPeriodizadas: 0,
        Curso: undefined,
        Turma: undefined,
    }

    export default {
        name:'TurmaPedido',

        props: {
            turma: Object,
            index: Number,
        },

        data () {
            return {
                ativo: false,
                valorAtual:undefined,
                pedidoForm: _.clone(emptyPedido)
            }
        },
        mounted:function (){
            this.pedidoForm = _.clone(this.$store.state.pedido.Pedidos[this.turma.id][this.index])

        },

        methods: {

            editPedido() {
                console.log(this.$store.state.pedido.Pedidos[this.turma.id][this.index])
                pedidoService.update(this.pedidoForm.Curso, this.pedidoForm.Turma, this.pedidoForm).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `O pedido foi atualizado!`,
                        type: 'success'
                    })
                    console.log(this.$store.state.pedido.Pedidos[this.turma.id][this.index])
                }).catch(error => {
                    this.error = '<b>Erro ao atualizar Pedido</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            }

        },

        computed: {
            pedido () {
                return this.$store.state.pedido.Pedidos[this.turma.id][this.index]
            }
        },

        watch: {
            pedido: function () {
                this.pedidoForm = _.clone(this.$store.state.pedido.Pedidos[this.turma.id][this.index])
            }
        }

    }
</script>
<style scoped>
    td {
        text-align: center;
        padding: 0!important;
    }
</style>