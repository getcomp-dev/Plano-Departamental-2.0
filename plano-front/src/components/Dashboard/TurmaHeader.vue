<template>
    <div  style="display:block; overflow: hidden" class="sticky">
        <th scope="col"><p style="width:16px !important;">S.</p></th>
        <th scope="col"><p style="width:64px !important;">Cod</p></th>
        <th scope="col"><p style="width:120px !important;">Disciplina</p></th>
        <th scope="col"><p style="width:20px !important;">C.</p></th>
        <th scope="col"><p style="width:36px !important;">Turma</p></th>
        <th scope="col"><p style="width:100px !important;">Docente</p></th>
        <th scope="col"><p style="width:62px !important;">Turno</p></th>
        <th scope="col"><p style="width:65px !important;">Horário</p></th>
        <th scope="col"><p style="width:60px !important;">Sala</p></th>
        <th scope="col"><p style="width:28px !important;">Total</p></th>
        <template v-for="curso in Cursos" v-if="CursosAtivos[curso.id]">
            <th :key="curso.id" :id="'curso'+curso.id"><p v-bind:class="{'cursoGrande':big(curso.codigo)}" style="width: 32px !important;" v-on:mouseover="">{{curso.codigo}}</p></th>
            <b-popover :target="'curso'+curso.id" placement="bottom" triggers="hover focus">
                <div v-if="curso.semestreInicial==1 || curso.semestreInicial==3">1º - {{curso.alunosEntrada}}</div>
                <div v-if="curso.semestreInicial==2 || curso.semestreInicial==3">2º - {{curso.alunosEntrada}}</div>
            </b-popover>
        </template>
    </div>
</template>
<script>
    import _ from 'lodash'

    export default {
        name:'TurmaHeader',

        methods: {
            big(nome){
                if(nome.length > 4)
                    return true
                else
                    return false
            },
        },

        computed: {
            Cursos () {
                return _.orderBy(this.$store.state.curso.Cursos, 'posicao')
            },

            CursosAtivos () {
                return this.$store.state.curso.Ativos
            }
        }
    }
</script>
<style scoped>

    .cursoGrande {
        font-size: 7px !important;
    }

    .sticky {
        position: sticky;
        position: -webkit-sticky;
        top: 0;
    }

    p{
        padding: 4px 0 4px 0;
        margin:0;
        font-size: 10px;
        text-align: center;
    }

    th{
        padding: 0!important;
        font-size: 10px;
        text-align: center;
        height: 16px !important;
    }

</style>