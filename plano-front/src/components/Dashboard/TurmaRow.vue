<template>
    <div class="turmarow" style="width: 776px;" v-bind:class="{'basico':perfil.id==1,'avancado':perfil.id==2, 'arqso':perfil.id==3,
                 'bancosdedados':perfil.id==4, 'computacaografica':perfil.id==5, 'engenhariasoftware':perfil.id==6, 'iaic':perfil.id==7, 'numoc':perfil.id==8, 'redes':perfil.id==9, 'teoria':perfil.id==10,
                 'humempre':perfil.id==11, 'multi': perfil.id==12, 'ice':perfil.id==13}">
        <td style="width: 16px;">
            <input type="text" style="width: 16px;" id="periodo" v-model="turma.periodo" v-on:blur="editTurma(turma)">
            <input type="checkbox" name="ativa" value="true" v-on:click="checkDelete(turma)" v-model="ativo" style="width:16px;height: 16px;padding:0;">
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
                <pedido v-bind:turma = "turma" v-bind:curso = "curso"></pedido>
            </td>
        </template>
    </div>
</template>
<script>
    import turmaService from '../../common/services/turma'
    import pedido from './Pedido.vue'

    export default {
        name:'TurmaRow',
        props: {
            turma:Object,
            perfil:Object
        },

        data () {
            return {
                ativo: false,
                valorAtual:undefined
            }
        },

        components: {
            pedido
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
            checkDelete(turma) {
                this.$store.commit('checkDelete', {Turma:turma})
                console.log(this.$store.state.turma.Deletar)
            },
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