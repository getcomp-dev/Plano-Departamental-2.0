<template>
    <div class="row">
        <div>    
            <template v-if="horarioVazio(Curso[0])">
                <div class="col-12 item">
                    <h5>1º Período</h5>
                    <horario-noturno :Turmas="Curso[0]"></horario-noturno>
                </div>
            </template>
        </div>
        <div>    
        <template v-if="horarioVazio(Curso[1])">
            <div class="col-12 item">
                    <h5>2º Período</h5>
                    <horario-noturno :Turmas="Curso[1]"></horario-noturno>
            </div>
        </template>
        </div>
        <div>    
            <template v-if="horarioVazio(Curso[2])">
                <div class="col-12 item">
                    <h5>3º Período</h5>
                    <horario-noturno :Turmas="Curso[2]"></horario-noturno>
                </div>
            </template>
        </div>
        <div>    
            <template v-if="horarioVazio(Curso[3])">
                <div class="col-12 item">
                    <h5>4º Período</h5>
                    <horario-noturno :Turmas="Curso[3]"></horario-noturno>
                </div>
            </template>
        </div>
        <div>    
            <template v-if="horarioVazio(Curso[4])">
                <div class="col-12 item">
                    <h5>5º Período</h5>
                    <horario-noturno :Turmas="Curso[4]"></horario-noturno>
                </div>
            </template>
        </div>
        <div>    
        <template v-if="horarioVazio(Curso[5])">
                <div class="col-12 item">
                    <h5>6º Período</h5>
                    <horario-noturno :Turmas="Curso[5]"></horario-noturno>
                </div>
            </template>
        </div>
        <div>    
            <template v-if="horarioVazio(Curso[6])">
                <div class="col-12 item">
                    <h5>7º Período</h5>
                    <horario-noturno :Turmas="Curso[6]"></horario-noturno>
                </div>
            </template>
        </div>
        <div>    
            <template v-if="horarioVazio(Curso[7])">
                <div class="col-12 item">
                    <h5>8º Período</h5>
                    <horario-noturno :Turmas="Curso[7]"></horario-noturno>
                </div>
            </template>
        </div>
        <div>
            <template v-if="horarioVazio(Curso[8])">
                <div class="col-12 item">
                    <h5>9º Período</h5>
                    <horario-noturno :Turmas="Curso[8]"></horario-noturno>
                </div>
            </template>
        </div>
        <div>
            <template v-if="horarioVazio(Curso[9])">
                <div class="col-12 item">
                    <h5>10º Período</h5>
                    <horario-noturno :Turmas="Curso[9]"></horario-noturno>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    import _ from 'lodash'
    import horarioNoturno from './HorarioTabelaNoturno.vue'
    export default{
        name:'HorarioCursoNoturno',
        props: {
            Curso: Array
        },

        components: {
            horarioNoturno
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
<style scoped>
h5{
    font-weight: normal !important; 
    text-align: start; 
    font-size: 14px;
}
.item{
    margin-left:auto;
    margin-right:40px;
}
</style>