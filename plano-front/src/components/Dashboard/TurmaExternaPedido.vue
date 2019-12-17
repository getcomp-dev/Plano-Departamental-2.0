<template>
    <div style="width:32px!important">
        <input v-if="pedidoForm.vagasPeriodizadas == 0" type="text" v-model="pedidoForm.vagasPeriodizadas" style="margin-top:1px; color:#DADADA"
               v-on:change="editPedido(pedido)" v-on:focus="focusPedido" v-on:blur="blurPedido">
        <input v-else type="text" v-model="pedidoForm.vagasPeriodizadas" style="margin-top:1px; font-weight: bold;  background-color: #DCDCDC"
               v-on:change="editPedido(pedido)" v-on:focus="focusPedido" v-on:blur="blurPedido">
        <input v-if="pedidoForm.vagasNaoPeriodizadas == 0" type="text" v-model="pedidoForm.vagasNaoPeriodizadas" style="color:#DADADA"
               v-on:change="editPedido(pedido)" v-on:focus="focusPedido" v-on:blur="blurPedido">
        <input v-else type="text" v-model="pedidoForm.vagasNaoPeriodizadas" style="font-weight: bold; background-color: #DCDCDC"
               v-on:change="editPedido(pedido)" v-on:focus="focusPedido" v-on:blur="blurPedido">
    </div>
</template>

<script>
    import pedidoExternoService from '../../common/services/pedidoExterno'
    import _ from 'lodash'

    const emptyPedido =  {
        vagasPeriodizadas: 0,
        vagasNaoPeriodizadas: 0,
        Curso: undefined,
        Turma: undefined,
    }
    export default {
        name: "TurmaExternaPedido",

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
            this.pedidoForm = _.clone(this.$store.state.pedidoExterno.Pedidos[this.turma.id][this.index])
        },

        methods: {

            editPedido() {
                if(this.pedidoForm.vagasPeriodizadas=='')
                    this.pedidoForm.vagasPeriodizadas = 0
                if(this.pedidoForm.vagasNaoPeriodizadas=='')
                    this.pedidoForm.vagasNaoPeriodizadas = 0
                pedidoExternoService.update(this.pedidoForm.Curso, this.pedidoForm.Turma, this.pedidoForm).then((response) => {
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
            },

            focusPedido() {
                if(this.pedidoForm.vagasPeriodizadas == 0)
                    this.pedidoForm.vagasPeriodizadas = ''

                if(this.pedidoForm.vagasNaoPeriodizadas == 0)
                    this.pedidoForm.vagasNaoPeriodizadas = ''
            },

            blurPedido() {
                if(this.pedidoForm.vagasPeriodizadas == '')
                    this.pedidoForm.vagasPeriodizadas = 0

                if(this.pedidoForm.vagasNaoPeriodizadas == '')
                    this.pedidoForm.vagasNaoPeriodizadas = 0
            },

        },

        computed: {
            pedido () {
                return this.$store.state.pedidoExterno.Pedidos[this.turma.id][this.index]
            }
        },

        watch: {
            pedido: function () {
                this.pedidoForm = _.clone(this.$store.state.pedidoExterno.Pedidos[this.turma.id][this.index])
            }
        }

    }
</script>
<style scoped>
    input{
        width: 28px!important;
        height: 20px!important;
        text-align: center!important;
        margin-bottom: 1px;
    }
    /*
    @-moz-document url-prefix() {
        input{
            width: 28px!important;
            height: 20px!important;
            text-align:center;
            box-sizing: border-box;
            
            line-height: 8px;
            border: 0.5px solid rgb(160, 160, 160);
            border-radius: 2px;
            background-color:rgb(245, 245, 245);
        }
    }*/
</style>