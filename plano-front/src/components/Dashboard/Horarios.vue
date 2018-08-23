<template>
    <div class="DashboardHorarios row">
        <div class="col">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Lista Horarios</h1>
            </div>

            <template v-if="activeCCD">
                <h4>Ciência da Computação Diurno</h4>
            </template>
            <template v-if="!horarioVazio(CCD[0])">
                <h5>1 Período</h5>
                <b-table responsive :items="CCD[0]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCD[1])">
                <h5>2 Período</h5>
                <b-table responsive :items="CCD[1]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCD[2])">
                <h5>3 Período</h5>
                <b-table responsive :items="CCD[2]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCD[3])">
                <h5>4 Período</h5>
                <b-table responsive :items="CCD[3]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCD[4])">
                <h5>5 Período</h5>
                <b-table responsive :items="CCD[4]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCD[5])">
                <h5>6 Período</h5>
                <b-table responsive :items="CCD[5]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCD[6])">
                <h5>7 Período</h5>
                <b-table responsive :items="CCD[6]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCD[7])">
                <h5>8 Período</h5>
                <b-table responsive :items="CCD[7]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCD[8])">
                <h5>9 Período</h5>
                <b-table responsive :items="CCD[8]"></b-table>
            </template>


            <template v-if="activeCCN">
                <h4>Ciência da Computação Noturno</h4>
            </template>
            <template v-if="!horarioVazio(CCN[0])">
                <h5>1 Período</h5>
                <b-table responsive :items="CCN[0]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCN[1])">
                <h5>2 Período</h5>
                <b-table responsive :items="CCN[1]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCN[2])">
                <h5>3 Período</h5>
                <b-table responsive :items="CCN[2]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCN[3])">
                <h5>4 Período</h5>
                <b-table responsive :items="CCN[3]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCN[4])">
                <h5>5 Período</h5>
                <b-table responsive :items="CCN[4]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCN[5])">
                <h5>6 Período</h5>
                <b-table responsive :items="CCN[5]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCN[6])">
                <h5>7 Período</h5>
                <b-table responsive :items="CCN[6]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCN[7])">
                <h5>8 Período</h5>
                <b-table responsive :items="CCN[7]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCN[8])">
                <h5>9 Período</h5>
                <b-table responsive :items="CCN[8]"></b-table>
            </template>

            <template v-if="activeSI">
                <h4>Sistemas de Informação</h4>
            </template>
            <template v-if="!horarioVazio(SI[0])">
                <h5>1 Período</h5>
                <b-table responsive :items="SI[0]"></b-table>
            </template>
            <template v-if="!horarioVazio(SI[1])">
                <h5>2 Período</h5>
                <b-table responsive :items="SI[1]"></b-table>
            </template>
            <template v-if="!horarioVazio(SI[2])">
                <h5>3 Período</h5>
                <b-table responsive :items="SI[2]"></b-table>
            </template>
            <template v-if="!horarioVazio(SI[3])">
                <h5>4 Período</h5>
                <b-table responsive :items="SI[3]"></b-table>
            </template>
            <template v-if="!horarioVazio(SI[4])">
                <h5>5 Período</h5>
                <b-table responsive :items="SI[4]"></b-table>
            </template>
            <template v-if="!horarioVazio(SI[5])">
                <h5>6 Período</h5>
                <b-table responsive :items="SI[5]"></b-table>
            </template>
            <template v-if="!horarioVazio(SI[6])">
                <h5>7 Período</h5>
                <b-table responsive :items="SI[6]"></b-table>
            </template>
            <template v-if="!horarioVazio(SI[7])">
                <h5>8 Período</h5>
                <b-table responsive :items="SI[7]"></b-table>
            </template>
            <template v-if="!horarioVazio(SI[8])">
                <h5>9 Período</h5>
                <b-table responsive :items="SI[8]"></b-table>
            </template>

            <template v-if="activeEC">
                <h4>Engenharia Computacional</h4>
            </template>
            <template v-if="!horarioVazio(EC[0])">
                <h5>1 Período</h5>
                <b-table responsive :items="EC[0]"></b-table>
            </template>
            <template v-if="!horarioVazio(EC[1])">
                <h5>2 Período</h5>
                <b-table responsive :items="EC[1]"></b-table>
            </template>
            <template v-if="!horarioVazio(EC[2])">
                <h5>3 Período</h5>
                <b-table responsive :items="EC[2]"></b-table>
            </template>
            <template v-if="!horarioVazio(EC[3])">
                <h5>4 Período</h5>
                <b-table responsive :items="EC[3]"></b-table>
            </template>
            <template v-if="!horarioVazio(EC[4])">
                <h5>5 Período</h5>
                <b-table responsive :items="EC[4]"></b-table>
            </template>
            <template v-if="!horarioVazio(EC[5])">
                <h5>6 Período</h5>
                <b-table responsive :items="EC[5]"></b-table>
            </template>
            <template v-if="!horarioVazio(EC[6])">
                <h5>7 Período</h5>
                <b-table responsive :items="EC[6]"></b-table>
            </template>
            <template v-if="!horarioVazio(EC[7])">
                <h5>8 Período</h5>
                <b-table responsive :items="EC[7]"></b-table>
            </template>
            <template v-if="!horarioVazio(EC[8])">
                <h5>9 Período</h5>
                <b-table responsive :items="EC[8]"></b-table>
            </template>

        </div>
        <div class="col">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1>Definir Grades</h1>
            </div>
            <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error">
            </b-alert>
            <form>
                <div class="form-group row">
                    <b-form-checkbox-group v-model="cursos" buttons button-variant="primary" size="lg" name="cursosCheck" :options="options">
                    </b-form-checkbox-group>
                </div>
                <b-button v-if="cursos!=undefined" variant="success" v-on:click="createHorarios" class="generate">Gerar Horários</b-button>
                <div class="form-group row">
                  <div v-if="activeCCD">
                      <label for="formCCD">Ciência da Computação Diurno</label>
                      <b-button variant="success" v-on:click="addGradeCCD" class="quant"><i class="fas fa-plus"></i></b-button>
                      <b-button variant="success" v-on:click="removeGradeCCD" class="quant"><i class="fas fa-minus"></i></b-button>
                      <form name="formCCD" id="formCCD" ref="formCCD">
                          <div v-for="n in rangeCCD" :key="n" class="grade">
                              <label for="selectGrade">Grade</label>
                              <b-form-select id="selectGrade" class="sm-12">
                                  <option v-for="grade in GradesCCD" :value="grade.id">{{grade.periodoInicio}}</option>
                              </b-form-select>
                              <label for="inicio">Período Início</label>
                              <b-form-input id="inicio" class="inicio"></b-form-input>
                              <label for="fim">Período Fim</label>
                              <b-form-input id="fim" class="fim"></b-form-input>
                              <br/>
                          </div>
                      </form>
                      <b-form-radio-group id="radioCCD" v-model="evenCCD">
                          <b-form-radio value="false">Períodos Ímpares</b-form-radio>
                          <b-form-radio value="true">Períodos Pares</b-form-radio>
                      </b-form-radio-group>
                  </div>
                </div>
                <div class="form-group row">
                    <div v-if="activeCCN">
                        <label for="formCCN">Ciência da Computação Noturno</label>
                        <b-button variant="success" v-on:click="addGradeCCN" class="quant"><i class="fas fa-plus"></i></b-button>
                        <b-button variant="success" v-on:click="removeGradeCCN" class="quant"><i class="fas fa-minus"></i></b-button>
                        <form name="formCCN" id="formCCN" ref="formCCN">
                            <div v-for="n in rangeCCN" :key="n" class="grade">
                                <label for="selectGrade">Grade</label>
                                <b-form-select id="selectGrade" class="sm-12">
                                    <option v-for="grade in GradesCCN" :value="grade.id">{{grade.periodoInicio}}</option>
                                </b-form-select>
                                <label for="inicio">Período Início</label>
                                <b-form-input id="inicio" class="inicio"></b-form-input>
                                <label for="fim">Período Fim</label>
                                <b-form-input id="fim" class="fim"></b-form-input>
                                <br/>
                            </div>
                        </form>
                        <b-form-radio-group id="radioCCN" v-model="evenCCN">
                            <b-form-radio value="false">Períodos Ímpares</b-form-radio>
                            <b-form-radio value="true">Períodos Pares</b-form-radio>
                        </b-form-radio-group>
                    </div>
                </div>
                <div class="form-group row">
                    <div v-if="activeSI">
                        <label for="formSI">Sistemas de Informação</label>
                        <b-button variant="success" v-on:click="addGradeSI" class="quant"><i class="fas fa-plus"></i></b-button>
                        <b-button variant="success" v-on:click="removeGradeSI" class="quant"><i class="fas fa-minus"></i></b-button>
                        <form name="formSI" id="formSI" ref="formSI">
                            <div v-for="n in rangeSI" :key="n" class="grade">
                                <label for="selectGrade">Grade</label>
                                <b-form-select id="selectGrade" class="sm-12">
                                    <option v-for="grade in GradesSI" :value="grade.id">{{grade.periodoInicio}}</option>
                                </b-form-select>
                                <label for="inicio">Período Início</label>
                                <b-form-input id="inicio" class="inicio"></b-form-input>
                                <label for="fim">Período Fim</label>
                                <b-form-input id="fim" class="fim"></b-form-input>
                                <br/>
                            </div>
                        </form>
                        <b-form-radio-group id="radioSI" v-model="evenSI">
                            <b-form-radio value="false">Períodos Ímpares</b-form-radio>
                            <b-form-radio value="true">Períodos Pares</b-form-radio>
                        </b-form-radio-group>
                    </div>
                </div>
                <div class="form-group row">
                    <div v-if="activeEC">
                        <label for="formEC">Engenharia Computacional</label>
                        <b-button variant="success" v-on:click="addGradeEC" class="quant"><i class="fas fa-plus"></i></b-button>
                        <b-button variant="success" v-on:click="removeGradeEC" class="quant"><i class="fas fa-minus"></i></b-button>
                            <form name="formEC" id="formEC" ref="formEC">
                                <div v-for="n in rangeEC" :key="n" class="grade">
                                    <label for="selectGrade">Grade</label>
                                    <b-form-select id="selectGrade" class="sm-12">
                                        <option v-for="grade in GradesEC" :value="grade.id">{{grade.periodoInicio}}</option>
                                    </b-form-select>
                                    <label for="inicio">Período Início</label>
                                    <b-form-input id="inicio" class="inicio"></b-form-input>
                                    <label for="fim">Período Fim</label>
                                    <b-form-input id="fim" class="fim"></b-form-input>
                                    <br/>
                                </div>
                            </form>
                            <b-form-radio-group id="radioEC" v-model="evenEC">
                                <b-form-radio value="false">Períodos Ímpares</b-form-radio>
                                <b-form-radio value="true">Períodos Pares</b-form-radio>
                            </b-form-radio-group>

                    </div>
                </div>


            </form>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'

    const emptyHorarioNoturno = [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ]
    const emptyHorarioDiurno =  [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
        {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
        {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
    ]

    const emptyHorariosNoturnos = [[{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
        {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
    ],
        [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ]]

    const emptyHorariosDiurnos = [[{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
        {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
        {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
    ],
        [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ]]

    export default {
        name: 'DashboardHorarios',

        data () {
            return {
                cursos: undefined,
                error: undefined,
                options: [
                    {text: "CC Diurno", value:1},
                    {text: "CC Noturno", value:2},
                    {text: "SI", value:3},
                    {text: "Eng. Comp.", value:4},
                ],
                rangeCCN: 1,
                rangeCCD: 1,
                rangeSI: 1,
                rangeEC: 1,
                evenCCN:"false",
                evenCCD:"false",
                evenEC:"false",
                evenSI:"false",
                CCN:[[{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ]],

                CCD: [[{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                    {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                    {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ]],

                EC: [[{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                    {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                    {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                ],
                    [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"10-12",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"12-14",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"14-16",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ]],

                SI:[[{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                    {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                        {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                    ]]

            }
        },

        methods: {
            addGradeCCN () {
                this.rangeCCN++
            },

            removeGradeCCN () {
                this.rangeCCN--
            },

            addGradeCCD () {
                this.rangeCCD++
            },

            removeGradeCCD () {
                this.rangeCCD--
            },

            addGradeSI () {
                this.rangeSI++
            },

            removeGradeSI () {
                this.rangeSI--
            },

            addGradeEC () {
                this.rangeEC++
            },

            removeGradeEC () {
                this.rangeEC--
            },

            isEven (number) {
                if(number%2===0)
                    return 'true'
                else
                    return 'false'
            },

            createHorarios () {
                var grade
                var inicio
                var fim
                var pedidos
                var disciplinas = this.$store.state.disciplina.Disciplinas
                var disciplinaGrades = this.$store.state.disciplinaGrade.DisciplinaGrades
                var turmas = this.$store.state.turma.Turmas

                //CC Diurno está selecionado
                if(_.indexOf(this.cursos, 1)>-1) {
                    pedidos = _.filter(this.$store.state.pedido.Pedidos, ['Curso', 4])
                    for (var i = 0; i < this.rangeCCD; i++) {
                        //grade
                        grade = this.$refs.formCCD[3*i].value
                        //inicio
                        inicio = this.$refs.formCCD[3*i+1].value
                        //fim
                        fim = this.$refs.formCCD[3*i+2].value
                        for (var k = 0; k < disciplinaGrades.length; k++){
                            if((disciplinaGrades[k].Grade==grade) && (this.isEven(disciplinaGrades[k].periodo)==this.evenCCD) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo<=parseInt(fim, 10))){
                                for(var j = 0; j < turmas.length; j++){
                                    if(turmas[j].Disciplina==disciplinaGrades[k].Disciplina){
                                        for(var p = 0; p < pedidos.length; p++){
                                            if((pedidos[p].vagasPeriodizadas>0)&&(pedidos[p].Turma==turmas[j].id)){
                                                switch(turmas[j].Horario1){
                                                    case 2:this.CCD[disciplinaGrades[k].periodo-1][0].seg = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][0].seg)
                                                        break;
                                                    case 3:this.CCD[disciplinaGrades[k].periodo-1][1].seg = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][1].seg)
                                                        break;
                                                    case 4:this.CCD[disciplinaGrades[k].periodo-1][2].seg = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][2].seg)
                                                        break;
                                                    case 8:this.CCD[disciplinaGrades[k].periodo-1][0].ter = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][0].ter)
                                                        break;
                                                    case 9:this.CCD[disciplinaGrades[k].periodo-1][1].ter = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][1].ter)
                                                        break;
                                                    case 10:this.CCD[disciplinaGrades[k].periodo-1][2].ter = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][2].ter)
                                                        break;
                                                    case 14:this.CCD[disciplinaGrades[k].periodo-1][0].qua = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][0].qua)
                                                        break;
                                                    case 15:this.CCD[disciplinaGrades[k].periodo-1][1].qua = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][1].qua)
                                                        break;
                                                    case 16:this.CCD[disciplinaGrades[k].periodo-1][2].qua = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][2].qua)
                                                        break;
                                                    case 20:this.CCD[disciplinaGrades[k].periodo-1][0].qui = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][0].qui)
                                                        break;
                                                    case 21:this.CCD[disciplinaGrades[k].periodo-1][1].qui = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][1].qui)
                                                        break;
                                                    case 22:this.CCD[disciplinaGrades[k].periodo-1][2].qui = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][2].qui)
                                                        break;
                                                    case 26:this.CCD[disciplinaGrades[k].periodo-1][0].sex = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][0].sex)
                                                        break;
                                                    case 27:this.CCD[disciplinaGrades[k].periodo-1][1].sex = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][1].sex)
                                                        break;
                                                    case 28:this.CCD[disciplinaGrades[k].periodo-1][2].sex = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][2].sex)
                                                        break;
                                                    default: break;
                                                }
                                                switch(turmas[j].Horario2){
                                                    case 2:this.CCD[disciplinaGrades[k].periodo-1][0].seg = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][0].seg)
                                                        break;
                                                    case 3:this.CCD[disciplinaGrades[k].periodo-1][1].seg = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][1].seg)
                                                        break;
                                                    case 4:this.CCD[disciplinaGrades[k].periodo-1][2].seg = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][2].seg)
                                                        break;
                                                    case 8:this.CCD[disciplinaGrades[k].periodo-1][0].ter = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][0].ter)
                                                        break;
                                                    case 9:this.CCD[disciplinaGrades[k].periodo-1][1].ter = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][1].ter)
                                                        break;
                                                    case 10:this.CCD[disciplinaGrades[k].periodo-1][2].ter = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][2].ter)
                                                        break;
                                                    case 14:this.CCD[disciplinaGrades[k].periodo-1][0].qua = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][0].qua)
                                                        break;
                                                    case 15:this.CCD[disciplinaGrades[k].periodo-1][1].qua = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][1].qua)
                                                        break;
                                                    case 16:this.CCD[disciplinaGrades[k].periodo-1][2].qua = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][2].qua)
                                                        break;
                                                    case 20:this.CCD[disciplinaGrades[k].periodo-1][0].qui = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][0].qui)
                                                        break;
                                                    case 21:this.CCD[disciplinaGrades[k].periodo-1][1].qui = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][1].qui)
                                                        break;
                                                    case 22:this.CCD[disciplinaGrades[k].periodo-1][2].qui = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][2].qui)
                                                        break;
                                                    case 26:this.CCD[disciplinaGrades[k].periodo-1][0].sex = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][0].sex)
                                                        break;
                                                    case 27:this.CCD[disciplinaGrades[k].periodo-1][1].sex = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][1].sex)
                                                        break;
                                                    case 28:this.CCD[disciplinaGrades[k].periodo-1][2].sex = turmas[j].Disciplina
                                                        console.log(this.CCD[disciplinaGrades[k].periodo-1][2].sex)
                                                        break;
                                                    default: break;
                                                }

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    for(var i=0; i<9;i++){
                        for(var j=0; j<disciplinas.length;j++){
                            if(this.CCD[i][0].seg == disciplinas[j].id){
                                this.CCD[i][0].seg = disciplinas[j].codigo
                            }
                            if(this.CCD[i][1].seg == disciplinas[j].id){
                                this.CCD[i][1].seg = disciplinas[j].codigo
                            }
                            if(this.CCD[i][2].seg == disciplinas[j].id){
                                this.CCD[i][2].seg = disciplinas[j].codigo
                            }
                            if(this.CCD[i][0].ter == disciplinas[j].id){
                                this.CCD[i][0].ter = disciplinas[j].codigo
                            }
                            if(this.CCD[i][1].ter == disciplinas[j].id){
                                this.CCD[i][1].ter = disciplinas[j].codigo
                            }
                            if(this.CCD[i][2].ter == disciplinas[j].id){
                                this.CCD[i][2].ter = disciplinas[j].codigo
                            }
                            if(this.CCD[i][0].qua == disciplinas[j].id){
                                this.CCD[i][0].qua = disciplinas[j].codigo
                            }
                            if(this.CCD[i][1].qua == disciplinas[j].id){
                                this.CCD[i][1].qua = disciplinas[j].codigo
                            }
                            if(this.CCD[i][2].qua == disciplinas[j].id){
                                this.CCD[i][2].qua = disciplinas[j].codigo
                            }
                            if(this.CCD[i][0].qui == disciplinas[j].id){
                                this.CCD[i][0].qui = disciplinas[j].codigo
                            }
                            if(this.CCD[i][1].qui == disciplinas[j].id){
                                this.CCD[i][1].qui = disciplinas[j].codigo
                            }
                            if(this.CCD[i][2].qui == disciplinas[j].id){
                                this.CCD[i][2].qui = disciplinas[j].codigo
                            }
                            if(this.CCD[i][0].sex == disciplinas[j].id){
                                this.CCD[i][0].sex = disciplinas[j].codigo
                            }
                            if(this.CCD[i][1].sex == disciplinas[j].id){
                                this.CCD[i][1].sex = disciplinas[j].codigo
                            }
                            if(this.CCD[i][2].sex == disciplinas[j].id){
                                this.CCD[i][2].sex = disciplinas[j].codigo
                            }
                        }
                    }
                }

                //CC Noturno está selecionado
                if(_.indexOf(this.cursos, 2)>-1) {
                    pedidos = _.filter(this.$store.state.pedido.Pedidos, ['Curso', 1])
                    for (var i = 0; i < this.rangeCCN; i++) {
                        //grade
                        grade = this.$refs.formCCN[3*i].value
                        //inicio
                        inicio = this.$refs.formCCN[3*i+1].value
                        //fim
                        fim = this.$refs.formCCN[3*i+2].value
                        for (var k = 0; k < disciplinaGrades.length; k++){
                            if((disciplinaGrades[k].Grade==grade) && (this.isEven(disciplinaGrades[k].periodo)==this.evenCCN) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo<=parseInt(fim, 10))){
                                for(var j = 0; j < turmas.length; j++){
                                    if(turmas[j].Disciplina==disciplinaGrades[k].Disciplina){
                                        for(var p = 0; p < pedidos.length; p++){
                                            if((pedidos[p].vagasPeriodizadas>0)&&(pedidos[p].Turma==turmas[j].id)){
                                                switch(turmas[j].Horario1){
                                                    case 5:this.CCN[disciplinaGrades[k].periodo-1][0].seg = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][0].seg)
                                                           break;
                                                    case 6:this.CCN[disciplinaGrades[k].periodo-1][1].seg = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][1].seg)
                                                           break;
                                                    case 11:this.CCN[disciplinaGrades[k].periodo-1][0].ter = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][0].ter)
                                                            break;
                                                    case 12:this.CCN[disciplinaGrades[k].periodo-1][1].ter = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][1].ter)
                                                            break;
                                                    case 17:this.CCN[disciplinaGrades[k].periodo-1][0].qua = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][0].qua)
                                                            break;
                                                    case 18:this.CCN[disciplinaGrades[k].periodo-1][1].qua = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][1].qua)
                                                            break;
                                                    case 23:this.CCN[disciplinaGrades[k].periodo-1][0].qui = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][0].qui)
                                                            break;
                                                    case 24:this.CCN[disciplinaGrades[k].periodo-1][1].qui = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][1].qui)
                                                            break;
                                                    case 29:this.CCN[disciplinaGrades[k].periodo-1][0].sex = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][0].sex)
                                                            break;
                                                    case 30:this.CCN[disciplinaGrades[k].periodo-1][1].sex = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][1].sex)
                                                            break;
                                                    default: break;
                                                }
                                                switch(turmas[j].Horario2){
                                                    case 5:this.CCN[disciplinaGrades[k].periodo-1][0].seg = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][0].seg)
                                                        break;
                                                    case 6:this.CCN[disciplinaGrades[k].periodo-1][1].seg = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][1].seg)
                                                        break;
                                                    case 11:this.CCN[disciplinaGrades[k].periodo-1][0].ter = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][0].ter)
                                                        break;
                                                    case 12:this.CCN[disciplinaGrades[k].periodo-1][1].ter = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][1].ter)
                                                        break;
                                                    case 17:this.CCN[disciplinaGrades[k].periodo-1][0].qua = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][0].qua)
                                                        break;
                                                    case 18:this.CCN[disciplinaGrades[k].periodo-1][1].qua = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][1].qua)
                                                        break;
                                                    case 23:this.CCN[disciplinaGrades[k].periodo-1][0].qui = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][0].qui)
                                                        break;
                                                    case 24:this.CCN[disciplinaGrades[k].periodo-1][1].qui = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][1].qui)
                                                        break;
                                                    case 29:this.CCN[disciplinaGrades[k].periodo-1][0].sex = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][0].sex)
                                                        break;
                                                    case 30:this.CCN[disciplinaGrades[k].periodo-1][1].sex = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][1].sex)
                                                        break;
                                                    default: break;
                                                }

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    for(var i=0; i<9;i++){
                        for(var j=0; j<disciplinas.length;j++){
                            if(this.CCN[i][0].seg == disciplinas[j].id){
                                this.CCN[i][0].seg = disciplinas[j].codigo
                            }
                            if(this.CCN[i][1].seg == disciplinas[j].id){
                                this.CCN[i][1].seg = disciplinas[j].codigo
                            }
                            if(this.CCN[i][0].ter == disciplinas[j].id){
                                this.CCN[i][0].ter = disciplinas[j].codigo
                            }
                            if(this.CCN[i][1].ter == disciplinas[j].id){
                                this.CCN[i][1].ter = disciplinas[j].codigo
                            }
                            if(this.CCN[i][0].qua == disciplinas[j].id){
                                this.CCN[i][0].qua = disciplinas[j].codigo
                            }
                            if(this.CCN[i][1].qua == disciplinas[j].id){
                                this.CCN[i][1].qua = disciplinas[j].codigo
                            }
                            if(this.CCN[i][0].qui == disciplinas[j].id){
                                this.CCN[i][0].qui = disciplinas[j].codigo
                            }
                            if(this.CCN[i][1].qui == disciplinas[j].id){
                                this.CCN[i][1].qui = disciplinas[j].codigo
                            }
                            if(this.CCN[i][0].sex == disciplinas[j].id){
                                this.CCN[i][0].sex = disciplinas[j].codigo
                            }
                            if(this.CCN[i][1].sex == disciplinas[j].id){
                                this.CCN[i][1].sex = disciplinas[j].codigo
                            }
                        }
                    }
                }

                //SI está selecionado
                if(_.indexOf(this.cursos, 3)>-1) {
                    pedidos = _.filter(this.$store.state.pedido.Pedidos, ['Curso', 3])
                    for (var i = 0; i < this.rangeSI; i++) {
                        //grade
                        grade = this.$refs.formSI[3*i].value
                        //inicio
                        inicio = this.$refs.formSI[3*i+1].value
                        //fim
                        fim = this.$refs.formSI[3*i+2].value
                        for (var k = 0; k < disciplinaGrades.length; k++){
                            if((disciplinaGrades[k].Grade==grade) && (this.isEven(disciplinaGrades[k].periodo)==this.evenSI) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo<=parseInt(fim, 10))){
                                for(var j = 0; j < turmas.length; j++){
                                    if(turmas[j].Disciplina==disciplinaGrades[k].Disciplina){
                                        for(var p = 0; p < pedidos.length; p++){
                                            if((pedidos[p].vagasPeriodizadas>0)&&(pedidos[p].Turma==turmas[j].id)){
                                                switch(turmas[j].Horario1){
                                                    case 5:this.SI[disciplinaGrades[k].periodo-1][0].seg = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][0].seg)
                                                        break;
                                                    case 6:this.SI[disciplinaGrades[k].periodo-1][1].seg = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][1].seg)
                                                        break;
                                                    case 11:this.SI[disciplinaGrades[k].periodo-1][0].ter = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][0].ter)
                                                        break;
                                                    case 12:this.SI[disciplinaGrades[k].periodo-1][1].ter = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][1].ter)
                                                        break;
                                                    case 17:this.SI[disciplinaGrades[k].periodo-1][0].qua = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][0].qua)
                                                        break;
                                                    case 18:this.SI[disciplinaGrades[k].periodo-1][1].qua = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][1].qua)
                                                        break;
                                                    case 23:this.SI[disciplinaGrades[k].periodo-1][0].qui = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][0].qui)
                                                        break;
                                                    case 24:this.SI[disciplinaGrades[k].periodo-1][1].qui = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][1].qui)
                                                        break;
                                                    case 29:this.SI[disciplinaGrades[k].periodo-1][0].sex = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][0].sex)
                                                        break;
                                                    case 30:this.SI[disciplinaGrades[k].periodo-1][1].sex = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][1].sex)
                                                        break;
                                                    default: break;
                                                }
                                                switch(turmas[j].Horario2){
                                                    case 5:this.SI[disciplinaGrades[k].periodo-1][0].seg = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][0].seg)
                                                        break;
                                                    case 6:this.SI[disciplinaGrades[k].periodo-1][1].seg = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][1].seg)
                                                        break;
                                                    case 11:this.SI[disciplinaGrades[k].periodo-1][0].ter = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][0].ter)
                                                        break;
                                                    case 12:this.SI[disciplinaGrades[k].periodo-1][1].ter = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][1].ter)
                                                        break;
                                                    case 17:this.SI[disciplinaGrades[k].periodo-1][0].qua = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][0].qua)
                                                        break;
                                                    case 18:this.SI[disciplinaGrades[k].periodo-1][1].qua = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][1].qua)
                                                        break;
                                                    case 23:this.SI[disciplinaGrades[k].periodo-1][0].qui = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][0].qui)
                                                        break;
                                                    case 24:this.SI[disciplinaGrades[k].periodo-1][1].qui = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][1].qui)
                                                        break;
                                                    case 29:this.SI[disciplinaGrades[k].periodo-1][0].sex = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][0].sex)
                                                        break;
                                                    case 30:this.SI[disciplinaGrades[k].periodo-1][1].sex = turmas[j].Disciplina
                                                        console.log(this.SI[disciplinaGrades[k].periodo-1][1].sex)
                                                        break;
                                                    default: break;
                                                }

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    for(var i=0; i<9;i++){
                        for(var j=0; j<disciplinas.length;j++){
                            if(this.SI[i][0].seg == disciplinas[j].id){
                                this.SI[i][0].seg = disciplinas[j].codigo
                            }
                            if(this.SI[i][1].seg == disciplinas[j].id){
                                this.SI[i][1].seg = disciplinas[j].codigo
                            }
                            if(this.SI[i][0].ter == disciplinas[j].id){
                                this.SI[i][0].ter = disciplinas[j].codigo
                            }
                            if(this.SI[i][1].ter == disciplinas[j].id){
                                this.SI[i][1].ter = disciplinas[j].codigo
                            }
                            if(this.SI[i][0].qua == disciplinas[j].id){
                                this.SI[i][0].qua = disciplinas[j].codigo
                            }
                            if(this.SI[i][1].qua == disciplinas[j].id){
                                this.SI[i][1].qua = disciplinas[j].codigo
                            }
                            if(this.SI[i][0].qui == disciplinas[j].id){
                                this.SI[i][0].qui = disciplinas[j].codigo
                            }
                            if(this.SI[i][1].qui == disciplinas[j].id){
                                this.SI[i][1].qui = disciplinas[j].codigo
                            }
                            if(this.SI[i][0].sex == disciplinas[j].id){
                                this.SI[i][0].sex = disciplinas[j].codigo
                            }
                            if(this.SI[i][1].sex == disciplinas[j].id){
                                this.SI[i][1].sex = disciplinas[j].codigo
                            }
                        }
                    }
                }

                //Engenharia Computacional está selecionado
                if(_.indexOf(this.cursos, 4)>-1) {
                    pedidos = _.filter(this.$store.state.pedido.Pedidos, ['Curso', 2])
                    for (var i = 0; i < this.rangeEC; i++) {
                        //grade
                        grade = this.$refs.formEC[3*i].value
                        //inicio
                        inicio = this.$refs.formEC[3*i+1].value
                        //fim
                        fim = this.$refs.formEC[3*i+2].value
                        for (var k = 0; k < disciplinaGrades.length; k++){
                            if((disciplinaGrades[k].Grade==grade) && (this.isEven(disciplinaGrades[k].periodo)==this.evenEC) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo<=parseInt(fim, 10))){
                                for(var j = 0; j < turmas.length; j++){
                                    if(turmas[j].Disciplina==disciplinaGrades[k].Disciplina){
                                        for(var p = 0; p < pedidos.length; p++){
                                            if((pedidos[p].vagasPeriodizadas>0)&&(pedidos[p].Turma==turmas[j].id)){
                                                switch(turmas[j].Horario1){
                                                    case 2:this.EC[disciplinaGrades[k].periodo-1][0].seg = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][0].seg)
                                                        break;
                                                    case 3:this.EC[disciplinaGrades[k].periodo-1][1].seg = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][1].seg)
                                                        break;
                                                    case 4:this.EC[disciplinaGrades[k].periodo-1][2].seg = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][2].seg)
                                                        break;
                                                    case 8:this.EC[disciplinaGrades[k].periodo-1][0].ter = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][0].ter)
                                                        break;
                                                    case 9:this.EC[disciplinaGrades[k].periodo-1][1].ter = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][1].ter)
                                                        break;
                                                    case 10:this.EC[disciplinaGrades[k].periodo-1][2].ter = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][2].ter)
                                                        break;
                                                    case 14:this.EC[disciplinaGrades[k].periodo-1][0].qua = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][0].qua)
                                                        break;
                                                    case 15:this.EC[disciplinaGrades[k].periodo-1][1].qua = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][1].qua)
                                                        break;
                                                    case 16:this.EC[disciplinaGrades[k].periodo-1][2].qua = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][2].qua)
                                                        break;
                                                    case 20:this.EC[disciplinaGrades[k].periodo-1][0].qui = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][0].qui)
                                                        break;
                                                    case 21:this.EC[disciplinaGrades[k].periodo-1][1].qui = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][1].qui)
                                                        break;
                                                    case 22:this.EC[disciplinaGrades[k].periodo-1][2].qui = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][2].qui)
                                                        break;
                                                    case 26:this.EC[disciplinaGrades[k].periodo-1][0].sex = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][0].sex)
                                                        break;
                                                    case 27:this.EC[disciplinaGrades[k].periodo-1][1].sex = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][1].sex)
                                                        break;
                                                    case 28:this.EC[disciplinaGrades[k].periodo-1][2].sex = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][2].sex)
                                                        break;
                                                    default: break;
                                                }
                                                switch(turmas[j].Horario2){
                                                    case 2:this.EC[disciplinaGrades[k].periodo-1][0].seg = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][0].seg)
                                                        break;
                                                    case 3:this.EC[disciplinaGrades[k].periodo-1][1].seg = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][1].seg)
                                                        break;
                                                    case 4:this.EC[disciplinaGrades[k].periodo-1][2].seg = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][2].seg)
                                                        break;
                                                    case 8:this.EC[disciplinaGrades[k].periodo-1][0].ter = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][0].ter)
                                                        break;
                                                    case 9:this.EC[disciplinaGrades[k].periodo-1][1].ter = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][1].ter)
                                                        break;
                                                    case 10:this.EC[disciplinaGrades[k].periodo-1][2].ter = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][2].ter)
                                                        break;
                                                    case 14:this.EC[disciplinaGrades[k].periodo-1][0].qua = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][0].qua)
                                                        break;
                                                    case 15:this.EC[disciplinaGrades[k].periodo-1][1].qua = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][1].qua)
                                                        break;
                                                    case 16:this.EC[disciplinaGrades[k].periodo-1][2].qua = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][2].qua)
                                                        break;
                                                    case 20:this.EC[disciplinaGrades[k].periodo-1][0].qui = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][0].qui)
                                                        break;
                                                    case 21:this.EC[disciplinaGrades[k].periodo-1][1].qui = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][1].qui)
                                                        break;
                                                    case 22:this.EC[disciplinaGrades[k].periodo-1][2].qui = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][2].qui)
                                                        break;
                                                    case 26:this.EC[disciplinaGrades[k].periodo-1][0].sex = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][0].sex)
                                                        break;
                                                    case 27:this.EC[disciplinaGrades[k].periodo-1][1].sex = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][1].sex)
                                                        break;
                                                    case 28:this.EC[disciplinaGrades[k].periodo-1][2].sex = turmas[j].Disciplina
                                                        console.log(this.EC[disciplinaGrades[k].periodo-1][2].sex)
                                                        break;
                                                    default: break;
                                                }

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    for(var i=0; i<9;i++){
                        for(var j=0; j<disciplinas.length;j++){
                            if(this.EC[i][0].seg == disciplinas[j].id){
                                this.EC[i][0].seg = disciplinas[j].codigo
                            }
                            if(this.EC[i][1].seg == disciplinas[j].id){
                                this.EC[i][1].seg = disciplinas[j].codigo
                            }
                            if(this.EC[i][2].seg == disciplinas[j].id){
                                this.EC[i][2].seg = disciplinas[j].codigo
                            }
                            if(this.EC[i][0].ter == disciplinas[j].id){
                                this.EC[i][0].ter = disciplinas[j].codigo
                            }
                            if(this.EC[i][1].ter == disciplinas[j].id){
                                this.EC[i][1].ter = disciplinas[j].codigo
                            }
                            if(this.EC[i][2].ter == disciplinas[j].id){
                                this.EC[i][2].ter = disciplinas[j].codigo
                            }
                            if(this.EC[i][0].qua == disciplinas[j].id){
                                this.EC[i][0].qua = disciplinas[j].codigo
                            }
                            if(this.EC[i][1].qua == disciplinas[j].id){
                                this.EC[i][1].qua = disciplinas[j].codigo
                            }
                            if(this.EC[i][2].qua == disciplinas[j].id){
                                this.EC[i][2].qua = disciplinas[j].codigo
                            }
                            if(this.EC[i][0].qui == disciplinas[j].id){
                                this.EC[i][0].qui = disciplinas[j].codigo
                            }
                            if(this.EC[i][1].qui == disciplinas[j].id){
                                this.EC[i][1].qui = disciplinas[j].codigo
                            }
                            if(this.EC[i][2].qui == disciplinas[j].id){
                                this.EC[i][2].qui = disciplinas[j].codigo
                            }
                            if(this.EC[i][0].sex == disciplinas[j].id){
                                this.EC[i][0].sex = disciplinas[j].codigo
                            }
                            if(this.EC[i][1].sex == disciplinas[j].id){
                                this.EC[i][1].sex = disciplinas[j].codigo
                            }
                            if(this.EC[i][2].sex == disciplinas[j].id){
                                this.EC[i][2].sex = disciplinas[j].codigo
                            }
                        }
                    }
                }
            },

            horarioVazio(horario){
                return (_.isEqual(horario, emptyHorarioNoturno)||_.isEqual(horario, emptyHorarioDiurno))
            }
        },

        computed: {
            Grades () {
                return this.$store.state.grade.Grades
            },

            DisciplinaGrades () {
                return this.$store.state.disciplinaGrade.DisciplinaGrades
            },

            GradesCCD () {
                return _.filter(this.$store.state.grade.Grades, ['Curso', 1])
            },

            GradesCCN () {
                return _.filter(this.$store.state.grade.Grades, ['Curso', 2])
            },
            GradesSI () {
                return _.filter(this.$store.state.grade.Grades, ['Curso', 3])
            },

            GradesEC () {
                return _.filter(this.$store.state.grade.Grades, ['Curso', 4])
            },

            activeCCD () {
                return _.indexOf(this.cursos, 1)>-1
            },

            activeCCN () {
                return _.indexOf(this.cursos, 2)>-1
            },

            activeSI () {
                return _.indexOf(this.cursos, 3)>-1
            },

            activeEC () {
                return _.indexOf(this.cursos, 4)>-1
            },


        }
    }
</script>

<style scoped>

    .quant {
        margin: 10px;
        padding-left: 4.5px;
        padding-right: 4.5px;
        padding-top: 0px;
        padding-bottom: 10.5px;
        height: 25px;
        width:25px;
        border-radius: 15px;
    }

    .generate {

    }
</style>