<template>
    <div>
        <PageHeader title="Preferências dos docentes">
            <BaseButton template="file-upload" @click="openModalUpload()" />
        </PageHeader>
        <BaseTable>
            <template #thead>
                <v-th width="250">Docente</v-th>
                <v-th :key="`disciplina${disciplina.id}`" v-for="disciplina in AllDisciplinas" width="80">{{disciplina.codigo}}</v-th>
            </template>
            <template #tbody>
                <tr v-for="docente in AllDocentes" :key="`docente${docente.id}`">
                    <v-td width = 250>{{docente.nome}}</v-td>
                    <td class="td-pref" :key="`docente${docente.id}-disciplina${disciplina.id}`" v-for="disciplina in AllDisciplinas" :style="{width: '80px'}"
                          v-b-popover.hover.right="{
                            content: `${docente.nome}\n${disciplina.codigo} - ${disciplina.nome}`
                          }"
                        v-on:click="openModalEdit(docente, disciplina)"
                    >{{preferencia(docente, disciplina)}}</td>
                </tr>
            </template>
        </BaseTable>

        <BaseModal ref="modalEdit" :title="'Editar Preferência'" :hasFooter="true">
            <template #modal-body>
                <div class="row" :style="{margin: '0'}">
                    <p>Docente: {{(edit.docente ? edit.docente.nome : '')}}</p>
                </div>
                <div class="row" :style="{margin: '0'}">
                    <p>Disciplina: {{(edit.disciplina ? edit.disciplina.nome : '')}}</p>
                </div>
                <div class="row" :style="{display: 'table-cell', verticalAlign: 'middle'}">
                    <label for="inputPreferenciaDocentes">Preferência: </label>
                    <input type="text" v-model="preferenciaForm.preferencia" id="inputPreferenciaDocentes" :style="{width: '25px', height: '20px', marginLeft: '10px', textAlign:'center'}">
                </div>
            </template>
            <template #modal-footer>
                <BaseButton
                        type="text"
                        color="lightblue"
                        @click="handleEditPrefs()"
                        class="ml-auto"
                >Confirmar</BaseButton
                >
            </template>
        </BaseModal>

        <BaseModal ref="modalUpload" :title="'Selecione um arquivo para importar'" :hasFooter="true">
            <template #modal-body>
                <input type="file" ref="xlsxPrefs" id="xlsxPrefs">
            </template>
            <template #modal-footer>
                <BaseButton
                        type="text"
                        color="lightblue"
                        @click="importPrefs"
                        class="ml-auto"
                >Importar</BaseButton
                >
            </template>
        </BaseModal>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import docenteDisciplinaService from "@/common/services/docenteDisciplina";
    import { toggleOrdination, toggleItemInArray } from "@/common/mixins";
    import { Card } from "@/components/ui";
    import { ModalAjuda, ModalDelete } from "@/components/modals";
    import XLSX from 'xlsx';
    import _ from 'lodash';
    import {SET_PARTIAL_LOADING} from "../../../vuex/mutation-types";

    export default {
        name: "DashboardPreferencias",
        mixins: [toggleOrdination, toggleItemInArray],
        components: { Card, ModalAjuda, ModalDelete },
        data() {
            return {
               file: undefined,
               preferenciaForm: {
                   Docente: undefined,
                   Disciplina: undefined,
                   preferencia: undefined
               },
               edit: {
                   docente: undefined,
                   disciplina: undefined,
                   isZero: undefined
               },
               error: undefined
            };
        },

        methods: {
            ...mapActions(["setPartialLoading"]),

            importPrefs() {
                console.log(this.PreferenciaDosDocentes)
                this.file = this.$refs.xlsxPrefs.files[0]
                let reader = new FileReader();
                let name = this.file.name;
                let docentes = this.AllDocentes
                let disciplinas = this.AllDisciplinas
                let preferencias = this.PreferenciaDosDocentes
                reader.onload = function(e) {
                    let data = e.target.result;
                    let workbook = XLSX.read(data, {type: 'binary'})
                    let first_worksheet = workbook.Sheets[workbook.SheetNames[0]]
                    let prefs = XLSX.utils.sheet_to_json(first_worksheet)
                    let disciplinasFields = _.filter(_.split(XLSX.utils.sheet_to_csv(first_worksheet), ','), function(p) {return p.substring(0, 11) === 'Disciplinas'})
                    let disciplinasCods = []
                    for(let i = 0; i < disciplinasFields.length; i++){
                        let start = disciplinasFields[i].indexOf('[')
                        let end = disciplinasFields[i].indexOf('\t')
                        let disc = _.find(disciplinas, {codigo:disciplinasFields[i].substring(start + 1, end)})
                        disciplinasCods.push(disc)
                        if(!disc){console.log(disciplinasFields[i] + " não existe no sistema")}
                    }
                    for(let i = 0; i < prefs.length; i++) {
                        let docente = _.find(docentes, {nome: prefs[i].Nome.toUpperCase()})
                        if (docente) {
                            for (let j = 0; j < disciplinasFields.length; j++) {
                                if(disciplinasCods[j]) {
                                    let prefdisc = _.find(preferencias, {
                                        Docente: docente.id,
                                        Disciplina: disciplinasCods[j].id
                                    })
                                    if (prefs[i][disciplinasFields[j]] && prefs[i][disciplinasFields[j]] != 0) {
                                    let prefDiscForm = {
                                        Docente: docente.id,
                                        Disciplina: disciplinasCods[j].id,
                                        preferencia: prefs[i][disciplinasFields[j]]
                                    }
                                    if (prefdisc) {
                                        if(prefdisc.preferencia != prefDiscForm.preferencia){
                                            docenteDisciplinaService.update(prefdisc.Disciplina, prefdisc.Docente, prefDiscForm)
                                        }
                                    } else {
                                        docenteDisciplinaService.create(prefDiscForm)
                                    }
                                }else{
                                    if(prefdisc){
                                        docenteDisciplinaService.delete(prefdisc.Disciplina, prefdisc.Docente)
                                    }
                                }
                                }
                            }
                        }
                    }
                }
                reader.readAsBinaryString(this.file);
                this.$refs.modalUpload.close();

            },

            preferencia(docente, disciplina) {
                let p = this.$_.find(this.PreferenciaDosDocentes, {Docente: docente.id, Disciplina:disciplina.id})
                if (p) return p.preferencia
                else return 0
            },

            openModalEdit(docente, disciplina) {
                this.edit.docente = docente
                this.edit.disciplina = disciplina
                let p = this.preferencia(docente, disciplina)
                if(p === 0) this.edit.isZero = true
                else this.edit.isZero = false
                this.preferenciaForm = {
                    Docente: docente.id,
                    Disciplina: disciplina.id,
                    preferencia: p
                }
                this.$refs.modalEdit.open();
            },

            handleEditPrefs() {
                if(this.edit.isZero){
                    if(this.preferenciaForm.preferencia != 0){
                        docenteDisciplinaService.create(this.preferenciaForm)
                            .then(() => {
                                this.$notify({
                                    group: "general",
                                    title: `Sucesso!`,
                                    text: `Preferência atualizada com sucesso!`,
                                    type: "success",
                                });
                                this.$refs.modalEdit.close()
                            })
                            .catch((error) => {
                                this.error = "<b>Erro ao atualizar Preferência</b>";
                                if (error.response.data.fullMessage) {
                                    this.error +=
                                        "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
                                }
                                this.$notify({
                                    group: "general",
                                    title: `Erro!`,
                                    text: this.error,
                                    type: "error",
                                });
                            });
                        this.edit.isZero = false
                    }
                }else{
                    if(this.preferenciaForm.preferencia != this.preferencia(this.edit.docente, this.edit.disciplina)){
                        if(this.preferenciaForm.preferencia == 0){
                            docenteDisciplinaService.delete(this.preferenciaForm.Disciplina, this.preferenciaForm.Docente)
                                .then(() => {
                                    this.$notify({
                                        group: "general",
                                        title: `Sucesso!`,
                                        text: `Preferência atualizada com sucesso!`,
                                        type: "success",
                                    });
                                    this.$refs.modalEdit.close()
                                })
                                .catch((error) => {
                                    this.error = "<b>Erro ao atualizar Preferência</b>";
                                    if (error.response.data.fullMessage) {
                                        this.error +=
                                            "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
                                    }
                                    this.$notify({
                                        group: "general",
                                        title: `Erro!`,
                                        text: this.error,
                                        type: "error",
                                    });
                                });
                            this.edit.isZero = true
                        }else{
                            docenteDisciplinaService.update(this.preferenciaForm.Disciplina, this.preferenciaForm.Docente, this.preferenciaForm)
                                .then(() => {
                                    this.$notify({
                                        group: "general",
                                        title: `Sucesso!`,
                                        text: `Preferência atualizada com sucesso!`,
                                        type: "success",
                                    });
                                    this.$refs.modalEdit.close()
                                })
                                .catch((error) => {
                                    this.error = "<b>Erro ao atualizar Preferência</b>";
                                    if (error.response.data.fullMessage) {
                                        this.error +=
                                            "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
                                    }
                                    this.$notify({
                                        group: "general",
                                        title: `Erro!`,
                                        text: this.error,
                                        type: "error",
                                    });
                                });
                        }
                    }
                }
            },

            openModalUpload() {
                this.$refs.modalUpload.open();
            }

        },

        computed: {
            ...mapGetters(["AllDocentes", "AllDisciplinas", "PreferenciaDosDocentes"]),
        },
    };
</script>

<style scoped>
    .card .input-maior {
        width: 270px;
    }
    .card .input-medio {
        width: 150px;
    }

    .td-pref:hover {
        color: #1a79b2;
        text-decoration: underline;
        cursor: pointer;
    }
</style>
