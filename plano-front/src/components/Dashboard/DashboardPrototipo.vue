<template>
    <div class="DashboardPrototipo" style="overflow-x:scroll; overflow-y:scroll;">
        <div class="d-flex center-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Plano</h1>
        </div>
        <table class="table table-hover table-sm" style="width: 100%">
            <thead class="thead-light">
            <tr>
                <th scope="col" style="width:16px">S.</th>
                <th scope="col" style="width:64px">Cod</th>
                <th scope="col" style="width:170px">Disciplina</th>
                <th scope="col" style="width:16px">C.</th>
                <th scope="col" style="width:52px">Turma</th>
                <th scope="col" style="width:72px">Horário</th>
                <th scope="col" style="width:144px">Docente</th>
                <th scope="col" style="width:54px">Turno</th>
                <th scope="col" style="width:36px">Sala</th>
                <th scope="col" style="width:52px">Total</th>
                <th v-for="curso in Cursos" :key="curso.id" style="width: 64px">{{curso.codigo}}</th>
            </tr>
            </thead>
            <tbody>
            <template v-if="Turmas.length>0">
                <tr v-for="turma in Turmas" :key="turma.id">
                    <td>{{turma.periodo}}</td>
                    <template v-for="disciplina in Disciplinas">
                        <template v-if="disciplina.id===turma.Disciplina">
                            <td :key="disciplina.id">{{disciplina.codigo}}</td>
                            <td :key="disciplina.id">{{disciplina.nome}}</td>
                            <td :key="disciplina.id">{{disciplina.cargaPratica + disciplina.cargaTeorica}}</td>
                        </template>
                    </template>
                    <td>{{turma.letra}}</td>
                    <td>
                        <template v-for="horario in Horarios">
                            <input v-if="horario.id===turma.Horario1" :key="horario.id" v-model="horario.horario">
                        </template>
                        <template v-for="horario in Horarios">
                            <input v-if="horario.id===turma.Horario2" :key="horario.id" v-model="horario.horario">
                        </template>
                    </td>
                    <td>
                        <template v-for="docente in Docentes">
                            <input v-if="docente.id===turma.Docente1" :key="docente.id" v-model="docente.nome">
                        </template>
                        <template v-for="docente in Docentes">
                            <input v-if="docente.id===turma.Docente2" :key="docente.id" v-model="docente.nome">
                        </template>
                    </td>
                    <td>{{turma.turno1}}{{turma.turno2}}</td>
                    <td>
                        <template v-for="sala in Salas">
                            <input v-if="sala.id===turma.Sala1" :key="sala.id" v-model="sala.nome">
                        </template>
                        <template v-for="sala in Salas">
                            <input v-if="sala.id===turma.Sala2" :key="sala.id" v-model="sala.nome">
                        </template>
                    </td>
                    <td>0</td>
                    <template v-for="curso in Cursos">
                        <td scope="col" :key="curso.id"><input type="text"><br><input type="text"></td>
                    </template>
                </tr>
            </template>
            </tbody>
        </table>
    </div>
</template>

<script>
    //import _ from 'lodash'

    export default {
        name: 'DashboardPrototipo',

        computed: {
            Cursos () {
                return this.$store.state.curso.Cursos
            },

            Disciplinas () {
                return this.$store.state.disciplina.Disciplinas
            },

            Docentes () {
                return this.$store.state.docente.Docentes
            },

            Horarios () {
                return this.$store.state.horario.Horarios
            },

            Salas () {
                return this.$store.state.sala.Salas
            },

            Turmas () {
                return this.$store.state.turma.Turmas
            }
        }
    }
</script>


<style scoped>

    .DashboardPrototipo{
        hieght: 100%;
        width: 100%;
        overflow: hidden;
    }
    table {
        table-layout: fixed;
        text-align: center;
    }

    tbody {
        overflow-x: scroll;
        overflow-y: scroll;
    }

    input {
        width:100%;
        text-align: center;
    }

    tr:nth-child(odd) {
        background: white;
    }


    tr:nth-child(even) {
        background: whitesmoke;
    }
</style>