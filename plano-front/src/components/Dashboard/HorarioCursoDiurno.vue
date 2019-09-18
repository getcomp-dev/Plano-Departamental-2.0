<template>
    <div>
        <template v-if="horarioVazio(Curso[0])">
            <h5>1 Período</h5>
            <horario-diurno :Turmas="Curso[0]"></horario-diurno>
        </template>

        <template v-if="horarioVazio(Curso[1])">
            <h5>2 Período</h5>
            <horario-diurno :Turmas="Curso[1]"></horario-diurno>
        </template>

        <template v-if="horarioVazio(Curso[2])">
            <h5>3 Período</h5>
            <horario-diurno :Turmas="Curso[2]"></horario-diurno>
        </template>

        <template v-if="horarioVazio(Curso[3])">
            <h5>4 Período</h5>
            <horario-diurno :Turmas="Curso[3]"></horario-diurno>
        </template>

        <template v-if="horarioVazio(Curso[4])">
            <h5>5 Período</h5>
            <horario-diurno :Turmas="Curso[4]"></horario-diurno>
        </template>

        <template v-if="horarioVazio(Curso[5])">
            <h5>6 Período</h5>
            <horario-diurno :Turmas="Curso[5]"></horario-diurno>
        </template>

        <template v-if="horarioVazio(Curso[6])">
            <h5>7 Período</h5>
            <horario-diurno :Turmas="Curso[6]"></horario-diurno>
        </template>

        <template v-if="horarioVazio(Curso[7])">
            <h5>8 Período</h5>
            <horario-diurno :Turmas="Curso[7]"></horario-diurno>
        </template>

        <template v-if="horarioVazio(Curso[8])">
            <h5>9 Período</h5>
            <horario-diurno :Turmas="Curso[8]"></horario-diurno>
        </template>

        <template v-if="horarioVazio(Curso[9])">
            <h5>10 Período</h5>
            <horario-diurno :Turmas="Curso[9]"></horario-diurno>
        </template>
    </div>
</template>
<script>
    import _ from 'lodash'
    import horarioDiurno from './HorarioTabelaDiurno.vue'
    export default{
        name:'HorarioCursoDiurno',
        props: {
            Curso: Array
        },

        components: {
            horarioDiurno
        },

        methods: {
            horarioVazio(c){
                if(c.length!=0)
                    return true
                else
                    return false
            },
        }
    }
</script>
<style scoped></style>