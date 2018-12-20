<template>
    <div class="CargaPos" style="height: calc(100vh - 48px)">
        <div class="d-flex center-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" style="overflow: auto; width: 100%">
            <h1 class="h2">Cargas Pós</h1>
            <div class="col-sm-8"></div>
            <b-form-select v-model="periodos">
                <option value = "1">Primeiro</option>
                <option value = "2">Segundo</option>
                <option value = "3">Ambos</option>
            </b-form-select>
            <template v-if="isAdd">
                <button type="button" class="btn btn-success col-sm-1" v-on:click.prevent="addCarga" style=""> Confirmar </button>
                <button type="button" class="btn btn-success col-sm-1" v-on:click.prevent="toggleAdd" style="margin-left: 10px;">Cancelar </button>
            </template>
            <template v-else>
                <button type="button" class="btn btn-success col-sm-1" v-on:click.prevent="toggleAdd" style="">Adicionar </button>
                <button type="button" class="btn btn-success col-sm-1" style="" v-b-modal.modalConfirma>Deletar </button>

                <b-modal id="modalConfirma" title="Confirmar Seleção" @ok="deleteSelected">
                    <p class="my-4">Tem certeza que deseja deletar as cargas selecionadas?</p>
                    <template v-for="carga in Deletar">
                        <template v-for="docente in Docentes">
                            <template v-if="docente.id===carga.Docente">
                                <p :key="carga.id" style="width:80px">Docente:{{docente.apelido}}<br>Programa:{{carga.programa}}</p>
                            </template>
                        </template>
                    </template>

                </b-modal>
            </template>
        </div>

        <div id="loading" v-if="isLoading">
            <div class="cube1"></div>
            <div class="cube2"></div>
        </div>

        <div style="width: 324px;height: 80vh; overflow-y: scroll; overflow-x: hidden;" v-if="!isLoading">
            <table style="width:100%" class="table table-hover table-sm">
                <thead class="thead-light">
                <tr>
                    <th scope="col" style="width:16px"></th>
                    <th scope="col" style="width:16px">T.</th>
                    <th scope="col" style="width:144px;">Docente</th>
                    <th scope="col" style="width:108px;">Programa</th>
                    <th scope="col" style="width:20px;">C.</th>
                    <th scope="col" style="width:20px;"></th>
                </tr>
                </thead>
                <tbody>

                <template v-if="isAdd">
                    <tr>
                        <td style="width: 16px;"></td>
                        <td>
                            <input type="text" style="width: 16px;" id="trimestre" v-model="cargaPosForm.trimestre">
                        </td>
                        <td>
                            <select type="text" style="width:144px" id="docente1" v-model="cargaPosForm.Docente">
                                <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                                <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.apelido}}</option>
                            </select>
                        </td>
                        <td>
                            <input type="text" style="width: 108px" id="programa" v-model="cargaPosForm.programa">
                        </td>
                        <td>
                            <input type="text" style="width: 20px" id="creditos" v-model="cargaPosForm.creditos">
                        </td>
                    </tr>
                </template>
                <template v-if="CargasPos.length>0">
                    <tr v-for="carga in CargasPos">
                        <cargadata v-bind:carga="carga"></cargadata>
                    </tr>
                </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import cargaPosService from '../../common/services/cargaPos'
    import cargadata from './CargaPosRow.vue'

    const emptyCarga = {
        id:undefined,
        trimestre:undefined,
        Docente:undefined,
        creditos:undefined
    }

    export default {

        name: 'DashboardCargaPos',

        data () {
            return {
                cargaPosForm: _.clone(emptyCarga),
                error: undefined,
                isAdd:false,
                atual:undefined,
                trimestre: 1,
                programa: 'PGCC',
                periodos: 3,
            }
        },

        components: {
            cargadata
        },
        /*
        mounted () {
            this.$store.commit('emptyDelete')
            console.log(this.$store.state.turma.Deletar)
            this.$store.commit(COMPONENT_LOADED)
        },
        */

        methods: {
            deleteCarga(carga) {
                cargaPosService.delete(carga.id).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Carga ${response.CargaPos.programa} foi excluída!`,
                        type: 'success'
                    })
                }).
                catch(() => {
                    this.error = '<b>Erro ao excluir Carga</b>'
                })
            },

            deleteSelected: function() {
                var cargas = this.$store.state.cargaPos.Deletar
                for (var i = 0; i< cargas.length;i++) {
                    this.deleteCarga(cargas[i])
                }
                this.$store.commit('emptyDeleteCarga')
            },

            addCarga() {
                cargaPosService.create(this.cargaPosForm).then((response) => {
                    this.cleanCarga()
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Carga ${response.CargaPos.programa} foi criada!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao criar Carga</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },

            cleanCarga() {
                this.cargaPosForm = _.clone(emptyCarga)
                this.cargaPosForm.trimestre = this.trimestre
                this.cargaPosForm.programa = this.programa
                this.error = undefined
            },

            toggleAdd() {
                this.cleanCarga()
                this.isAdd = !this.isAdd;
            },

        },


        computed: {
            Docentes () {
                return _.orderBy(this.$store.state.docente.Docentes,'nome')
            },

            Deletar () {
                return this.$store.state.cargaPos.Deletar
            },

            CargasPos () {
                return this.$store.state.cargaPos.Cargas
            },

            isLoading () {
                return this.$store.state.isLoading
            }


        }
    }
</script>
<style scoped>

    .CargaPos{
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

    th {
        text-align: center;
    }

    thead th {
        position: sticky;
        position: -webkit-sticky;
        top: -1px;
        background: white;
        z-index: 10;
    }

    td {
        text-align: center;
        padding: 0!important;
    }

    input {
        height: 25px;
        width:auto;
        text-align: left;
    }

    /*table.scrolling td:nth-child(-n+10),
    table.scrolling th:nth-child(-n+10) {
        position: -webkit-sticky;
        position: sticky;
        left:0;
    }*/

    .cube1, .cube2 {
        background-color: #333;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        left: 0;

        -webkit-animation: cubemove 1.8s infinite ease-in-out;
        animation: cubemove 1.8s infinite ease-in-out;
    }

    .cube2 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }

    @-webkit-keyframes cubemove {
        25% {
            -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5)
        }
        50% {
            -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg)
        }
        75% {
            -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5)
        }
        100% {
            -webkit-transform: rotate(-360deg)
        }
    }

    @keyframes cubemove {
        25% {
            transform: translateX(42px) rotate(-90deg) scale(0.5);
            -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
        }
        50% {
            transform: translateX(42px) translateY(42px) rotate(-179deg);
            -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
        }
        50.1% {
            transform: translateX(42px) translateY(42px) rotate(-180deg);
            -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
        }
        75% {
            transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
            -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
        }
        100% {
            transform: rotate(-360deg);
            -webkit-transform: rotate(-360deg);
        }
    }
</style>
