(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c053bf7"],{"28ce":function(r,t,e){"use strict";e.r(t);var a=function(){var r=this,t=r.$createElement,e=r._self._c||t;return e("tr",{staticClass:"novaturma"},[e("v-td",{attrs:{width:"25",type:"content"}}),e("v-td",{attrs:{width:"55",type:"content"}},[e("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.periodo,expression:"turmaForm.periodo",modifiers:{number:!0}}],on:{change:function(t){var e=Array.prototype.filter.call(t.target.options,function(r){return r.selected}).map(function(t){var e="_value"in t?t._value:t.value;return r._n(e)});r.$set(r.turmaForm,"periodo",t.target.multiple?e:e[0])}}},[e("option",{attrs:{value:"1"}},[r._v("1")]),e("option",{attrs:{value:"2"}},[r._v("2")]),e("option",{attrs:{value:"3"}},[r._v("3")]),e("option",{attrs:{value:"4"}},[r._v("4")])])]),e("v-td",{attrs:{width:"80",type:"content"}},[e("select",{directives:[{name:"model",rawName:"v-model",value:r.turmaForm.disciplina,expression:"turmaForm.disciplina"}],on:{change:[function(t){var e=Array.prototype.filter.call(t.target.options,function(r){return r.selected}).map(function(r){var t="_value"in r?r._value:r.value;return t});r.$set(r.turmaForm,"disciplina",t.target.multiple?e:e[0])},r.handleChangeDisciplina]}},r._l(r.DisciplinasExternasInPerfis,function(t){return e("option",{key:t.id,domProps:{value:t}},[r._v(r._s(t.codigo)+"\n      ")])}),0)]),e("v-td",{attrs:{width:"330",type:"content"}},[e("select",{directives:[{name:"model",rawName:"v-model",value:r.turmaForm.disciplina,expression:"turmaForm.disciplina"}],on:{change:[function(t){var e=Array.prototype.filter.call(t.target.options,function(r){return r.selected}).map(function(r){var t="_value"in r?r._value:r.value;return t});r.$set(r.turmaForm,"disciplina",t.target.multiple?e:e[0])},r.handleChangeDisciplina]}},r._l(r.DisciplinasExternasInPerfisOrderedByNome,function(t){return e("option",{key:t.id+t.codigo,domProps:{value:t}},[r._v(r._s(t.nome)+"\n      ")])}),0)]),e("v-td",{attrs:{width:"25"}},[r._v(r._s(r.totalCarga))]),e("v-td",{attrs:{width:"45",type:"content"}},[e("input",{staticStyle:{width:"30px"},attrs:{type:"text"},domProps:{value:r.turmaForm.letra},on:{input:function(t){r.turmaForm.letra=t.target.value.toUpperCase()},keypress:r.maskTurmaLetra}})]),e("v-td",{attrs:{width:"80",type:"content"}},[e("select",{directives:[{name:"model",rawName:"v-model",value:r.turmaForm.turno1,expression:"turmaForm.turno1"}],on:{change:[function(t){var e=Array.prototype.filter.call(t.target.options,function(r){return r.selected}).map(function(r){var t="_value"in r?r._value:r.value;return t});r.$set(r.turmaForm,"turno1",t.target.multiple?e:e[0])},r.handleChangeTurno]}},[r.disciplinaIsIntegralEAD?e("option",{attrs:{value:"EAD"}},[r._v("EAD")]):[e("option",{attrs:{value:"Diurno"}},[r._v("Diurno")]),e("option",{attrs:{value:"Noturno"}},[r._v("Noturno")])]],2)]),e("v-td",{attrs:{width:"85",type:"content"}},[e("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Horario1,expression:"turmaForm.Horario1",modifiers:{number:!0}}],on:{change:[function(t){var e=Array.prototype.filter.call(t.target.options,function(r){return r.selected}).map(function(t){var e="_value"in t?t._value:t.value;return r._n(e)});r.$set(r.turmaForm,"Horario1",t.target.multiple?e:e[0])},function(t){return r.handleChangeHorario(1)}]}},r._l(r.HorariosFiltredByTurno,function(t){return e("option",{key:t.id+t.horario,domProps:{value:t.id}},[r._v(r._s(t.horario)+"\n      ")])}),0),e("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Horario2,expression:"turmaForm.Horario2",modifiers:{number:!0}}],on:{change:[function(t){var e=Array.prototype.filter.call(t.target.options,function(r){return r.selected}).map(function(t){var e="_value"in t?t._value:t.value;return r._n(e)});r.$set(r.turmaForm,"Horario2",t.target.multiple?e:e[0])},function(t){return r.handleChangeHorario(2)}]}},r._l(r.HorariosFiltredByTurno,function(t){return e("option",{key:t.horario+t.id,domProps:{value:t.id}},[r._v(r._s(t.horario)+"\n      ")])}),0)]),e("v-td",{attrs:{width:"95",type:"content"}},[r.disciplinaIsIntegralEAD?r._e():[e("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Sala1,expression:"turmaForm.Sala1",modifiers:{number:!0}}],on:{change:function(t){var e=Array.prototype.filter.call(t.target.options,function(r){return r.selected}).map(function(t){var e="_value"in t?t._value:t.value;return r._n(e)});r.$set(r.turmaForm,"Sala1",t.target.multiple?e:e[0])}}},[e("option"),r._l(r.AllSalas,function(t){return e("option",{key:t.id+t.nome,domProps:{value:t.id}},[r._v(r._s(t.nome)+"\n        ")])})],2),r.totalCarga>=4&&!r.disciplinaIsParcialEAD?e("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Sala2,expression:"turmaForm.Sala2",modifiers:{number:!0}}],on:{change:function(t){var e=Array.prototype.filter.call(t.target.options,function(r){return r.selected}).map(function(t){var e="_value"in t?t._value:t.value;return r._n(e)});r.$set(r.turmaForm,"Sala2",t.target.multiple?e:e[0])}}},[e("option"),r._l(r.AllSalas,function(t){return e("option",{key:t.nome+t.id,domProps:{value:t.id}},[r._v(r._s(t.nome)+"\n        ")])})],2):r._e()]],2),e("v-td",{attrs:{width:"45"}}),r._l(4,function(r){return e("v-td",{key:r,attrs:{width:"35"}})})],2)},i=[],n=e("e814"),o=e.n(n),u=(e("d25f"),e("96cf"),e("3b8d")),s=(e("759f"),e("cebc")),l=e("2f62"),m=e("9165"),c={id:null,periodo:1,letra:"A",turno1:null,turno2:null,Disciplina:null,Docente1:null,Docente2:null,Horario1:null,Horario2:null,Sala1:null,Sala2:null,disciplina:null},d={name:"NovaTurmaExternaRow",mixins:[m["j"]],data:function(){return{turmaForm:this.$_.clone(c)}},methods:Object(s["a"])({},Object(l["b"])(["createTurmaExterna"]),{handleChangeTurno:function(){this.turmaForm.Horario1=null,this.turmaForm.Horario2=null},handleChangeDisciplina:function(){this.turmaForm.Disciplina=this.turmaForm.disciplina.id,this.turmaForm.turno1=null,this.turmaForm.Horario1=null,this.turmaForm.Horario2=null,this.turmaForm.Docente1=null,this.turmaForm.Docente2=null,this.disciplinaIsIntegralEAD?(this.turmaForm.turno1="EAD",this.turmaForm.Horario1=31,this.turmaForm.Horario2=31):this.disciplinaIsParcialEAD&&(this.turmaForm.Horario2=31)},handleChangeHorario:function(r){1===r?this.setTurnoByHorario(this.turmaForm.Horario1):this.disciplinaIsParcialEAD||this.setTurnoByHorario(this.turmaForm.Horario2)},setTurnoByHorario:function(r){31==r&&this.disciplinaIsIntegralEAD?this.turmaForm.turno1="EAD":this.$_.some(this.HorariosNoturno,["id",r])?this.turmaForm.turno1="Noturno":this.$_.some(this.HorariosDiurno,["id",r])&&(this.turmaForm.turno1="Diurno")},handleCreateTurmaExterna:function(){var r=Object(u["a"])(regeneratorRuntime.mark(function r(){return regeneratorRuntime.wrap(function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,this.setPartialLoading(!0),r.next=4,this.createTurmaExterna(this.turmaForm);case 4:r.next=9;break;case 6:r.prev=6,r.t0=r["catch"](0),this.pushNotification({type:"error",title:"Erro ao criar nova turma!",text:r.t0.response?"A combinação de disciplina, período e turma deve ser única.":r.t0.message});case 9:return r.prev=9,this.setPartialLoading(!1),r.finish(9);case 12:case"end":return r.stop()}},r,this,[[0,6,9,12]])}));function t(){return r.apply(this,arguments)}return t}()}),computed:Object(s["a"])({},Object(l["c"])(["DisciplinasExternasInPerfis","AllHorarios","HorariosEAD","HorariosNoturno","HorariosDiurno","AllSalas"]),{DisciplinasExternasInPerfisOrderedByNome:function(){return this.$_.orderBy(this.DisciplinasExternasInPerfis,["nome"])},HorariosFiltredByTurno:function(){if(this.disciplinaIsIntegralEAD)return this.HorariosEAD;switch(this.turmaForm.turno1){case"Noturno":return this.HorariosNoturno;case"Diurno":return this.HorariosDiurno;case"EAD":return this.HorariosEAD;default:return this.$_.filter(this.AllHorarios,function(r){return 31!=r.id})}},totalCarga:function(){return this.turmaForm.disciplina?o()(this.turmaForm.disciplina.cargaTeorica)+o()(this.turmaForm.disciplina.cargaPratica):""},disciplinaIsIntegralEAD:function(){return!!this.turmaForm.disciplina&&1===this.turmaForm.disciplina.ead},disciplinaIsParcialEAD:function(){return!!this.turmaForm.disciplina&&2===this.turmaForm.disciplina.ead}})},p=d,v=(e("a29d"),e("2877")),h=Object(v["a"])(p,a,i,!1,null,"6103a669",null);t["default"]=h.exports},a29d:function(r,t,e){"use strict";var a=e("cbc6"),i=e.n(a);i.a},cbc6:function(r,t,e){}}]);
//# sourceMappingURL=chunk-6c053bf7.97633743.js.map