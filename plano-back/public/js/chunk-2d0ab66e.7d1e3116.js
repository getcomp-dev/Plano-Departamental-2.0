(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ab66e"],{"14b7":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t._self._c;return a("tr",[t.docente?a("v-td",{staticClass:"table-data",attrs:{width:"130"}},[t._v(t._s(t.docente.apelido.toLowerCase()))]):a("v-td",{staticClass:"table-data",attrs:{width:"130"}}),a("v-td",{staticClass:"table-data",attrs:{width:"65"}},[t._v(t._s(t.turma.periodo))]),a("v-td",{staticClass:"table-data",attrs:{width:"80"}},[t._v(t._s(t.turma.disciplina.codigo))]),a("v-td",{staticClass:"table-data",attrs:{width:"300",align:"start"}},[t._v("\n    "+t._s(t.turma.disciplina.nome.toLowerCase())+"\n  ")]),a("v-td",{staticClass:"table-data",attrs:{width:"45"}},[t._v(t._s(t.turma.letra))]),a("v-td",{staticClass:"table-data",attrs:{width:"130"}},[t._v("\n    "+t._s(t.generateHorariosText(t.turma.Horario1,t.turma.Horario2))+"\n  ")]),a("v-td",{staticClass:"table-data",attrs:{width:"75"}},[t._v("\n    "+t._s(t.turmaIs1Semestre?t.turma.creditosDaTurma:"")+"\n  ")]),a("v-td",{staticClass:"table-data",attrs:{width:"75"}},[t._v("\n    "+t._s(t.turmaIs2Semestre?t.turma.creditosDaTurma:"")+"\n  ")]),a("v-td",{staticClass:"table-data",attrs:{width:"50"}})],1)},r=[],i=s("9165"),d={name:"DocenteTurmaRow",mixins:[i["e"]],props:{turma:{type:Object,required:!0},profsAmarrados:{type:Boolean,required:!0},docente:{type:Object,required:!1}},computed:{turmaIs1Semestre:function(){return 1===this.turma.periodo||2===this.turma.periodo},turmaIs2Semestre:function(){return 3===this.turma.periodo||4===this.turma.periodo}}},o=d,n=s("2877"),u=Object(n["a"])(o,e,r,!1,null,null,null);a["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0ab66e.7d1e3116.js.map