<template>
    <div class="cargarow" style="width: 324px;">
        <td style="width: 16px;">
            <input type="checkbox" name="ativa" value="true" v-on:click="checkDelete(carga)" v-model="ativo" style="width:16px;height: 16px;padding:0;">
        </td>
        <td style="width: 16px;">
            <input type="text" style="width: 16px;" id="trimestre" v-model="carga.trimestre" v-on:blur="editCarga(carga)">
        </td>
        <td style="width: 144px;">
            <select type="text" style="width:144px" id="docente" v-model="carga.Docente"
                    v-on:change="editCarga(carga)">
                <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.apelido}}</option>
            </select>
        </td>
        <td style="width: 108px;">
            <input type="text" style="width: 108px" v-model="carga.programa" v-on:blur="editCarga(carga)">
        </td>
        <td style="width: 20px">
            <input type="text" style="width: 20px" id="creditos" v-model="carga.creditos" v-on:blur="editCarga(carga)">
        </td>
        <td style="width: 20px;">

        </td>
    </div>
</template>
<script>
    import cargaPosService from '../../common/services/cargaPos'
    import _ from 'lodash'

    export default {
        name:'CargaPosRow',
        props: {
            carga:Object,
        },

        data () {
            return {
                ativo: false
            }
        },

        methods: {

            editCarga(carga) {
                cargaPosService.update(carga.id, carga).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Carga ${response.Turma.programa} foi atualizada!`,
                        type: 'success'
                    })
                }).catch(error => {
                    this.error = '<b>Erro ao atualizar Carga</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },
            checkDelete(carga) {
                this.$store.commit('checkDeleteCarga', {CargaPos:carga})
                console.log(this.$store.state.cargaPos.Deletar)
            }
        },
        computed: {
            Docentes () {
                return _.orderBy(_.filter(this.$store.state.docente.Docentes, ['ativo', true]),'apelido')
            },
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