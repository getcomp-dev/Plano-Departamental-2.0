<template>
    <div class="CargaPos" style="height: calc(100vh - 48px);">
        <b-container fluid class="d-flex center-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" style="overflow: auto; width: 100%; padding:0;">
            <b-row style="width:100%">
            <b-col cols="4" md="auto">
            <h1 class="h2 col sm-4" style="padding:0">Cargas Pós</h1>
            </b-col>
            <b-col cols="6" style="margin-right:30px"></b-col>
            <b-col cols="2" style="padding:0;">
            <b-form-select v-model="periodos" class="col sm-2" style="float:right">
                <option value = "1">Primeiro</option>
                <option value = "2">Segundo</option>
                <option value = "3">Ambos</option>
            </b-form-select>
            </b-col>
            <b-col cols="2">
            <template v-if="isAdd">
                <button type="button" class="btn btn-success" v-on:click.prevent="toggleAdd" style="margin-left: 10px;float:right;">Cancelar </button>
                <button type="button" class="btn btn-success" v-on:click.prevent="addCarga" style="float:right;"> Confirmar </button>
            </template>
            <template v-else>
                <button type="button" class="btn btn-success" style="margin-left: 10px;float:right;" v-b-modal.modalConfirma>Deletar </button>
                <button type="button" class="btn btn-success" v-on:click.prevent="toggleAdd" style="float:right;">Adicionar </button>

                <b-modal id="modalConfirma" title="Confirmar Seleção" @ok="deleteSelected">
                    <p class="my-4">Tem certeza que deseja deletar as cargas selecionadas?</p>
                    <template v-for="carga in Deletar">
                        <template v-for="docente in Docentes">
                            <template v-if="docente.id===carga.Docente">
                                <p :key="'carga'+carga.id+'docente'+docente.id" style="width:80px">Docente:{{docente.apelido}}<br>Programa:{{carga.programa}}</p>
                            </template>
                        </template>
                    </template>

                </b-modal>
            </template>
            </b-col>
            </b-row>
        </b-container>

        <div id="loading" v-if="isLoading">
            <div class="cube1"></div>
            <div class="cube2"></div>
        </div>

        <div style="width: 324px;height: 75vh; overflow-y: scroll; overflow-x: hidden;" v-if="!isLoading">
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
                    <template v-for="t in [1,  2, 3, 4]">
                    <template v-for="docente in Docentes">
                    <tr v-for="carga in CargasPos" :key="'docente'+docente.id+'carga'+carga.id" v-if="(carga.Docente === docente.id) && (carga.trimestre == (t))">
                        <template v-if="((carga.trimestre == 1 || carga.trimestre == 2) && (periodos == 1 || periodos == 3))">
                            <cargadata :key="'1docente'+docente.id+'carga'+carga.id" v-bind:carga="carga"></cargadata>
                        </template>
                        <template v-if="((carga.trimestre == 3 || carga.trimestre == 4) && (periodos == 2 || periodos == 3))">
                            <cargadata :key="'2docente'+docente.id+'carga'+carga.id" v-bind:carga="carga"></cargadata>
                        </template>
                    </tr>
                    </template>
                    </template>
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
        programa:undefined,
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
                    console.log(response.CargaPos)
                    console.log(this.$store.state.cargaPos.Cargas)
                    this.trimestre = response.CargaPos.trimestre
                    this.programa = response.CargaPos.programa
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
                return _.orderBy(_.filter(this.$store.state.docente.Docentes, ['ativo', true]),'apelido')
            },

            Deletar () {
                return this.$store.state.cargaPos.Deletar
            },

            CargasPos () {
                return _.orderBy(this.$store.state.cargaPos.Cargas, 'trimestre')
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
