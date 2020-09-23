<template>
    <div>
        <input type="file" ref="xlsxPrefs" id="xlsxPrefs">
        <b-button @click="importPrefs">Atualizar Preferências</b-button>
        <div class="div-table">

        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import docenteDisciplinaService from "@/common/services/docenteDisciplina";
    import { toggleOrdination, toggleItemInArray } from "@/common/mixins";
    import { Card } from "@/components/ui";
    import { ModalAjuda, ModalDelete } from "@/components/modals";
    import XLSX from 'xlsx';
    import _ from 'lodash'

    export default {
        name: "DashboardPreferencias",
        mixins: [toggleOrdination, toggleItemInArray],
        components: { Card, ModalAjuda, ModalDelete },
        data() {
            return {
               file: undefined
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
                console.log('ok')

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
</style>
