(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0e7bcb5c","chunk-17e40df0"],{"3b97":function(r,t,a){},"3c7d":function(r,t,a){"use strict";var o=a("3b97"),e=a.n(o);e.a},5658:function(r,t,a){"use strict";a.r(t);var o=function(){var r=this,t=r.$createElement,a=r._self._c||t;return a("tr",{staticClass:"turmarow"},[a("v-td",{attrs:{width:"25",type:"content"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:r.toggleToDelete,expression:"toggleToDelete"}],attrs:{type:"checkbox"},domProps:{value:r.turma,checked:Array.isArray(r.toggleToDelete)?r._i(r.toggleToDelete,r.turma)>-1:r.toggleToDelete},on:{change:function(t){var a=r.toggleToDelete,o=t.target,e=!!o.checked;if(Array.isArray(a)){var i=r.turma,n=r._i(a,i);o.checked?n<0&&(r.toggleToDelete=a.concat([i])):n>-1&&(r.toggleToDelete=a.slice(0,n).concat(a.slice(n+1)))}else r.toggleToDelete=e}}})]),a("v-td",{attrs:{width:"55",type:"content"}},[a("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.periodo,expression:"turmaForm.periodo",modifiers:{number:!0}}],on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,(function(r){return r.selected})).map((function(t){var a="_value"in t?t._value:t.value;return r._n(a)}));r.$set(r.turmaForm,"periodo",t.target.multiple?a:a[0])},r.handleEditTurma]}},[a("option",{attrs:{value:"1"}},[r._v("1")]),a("option",{attrs:{value:"2"}},[r._v("2")]),a("option",{attrs:{value:"3"}},[r._v("3")]),a("option",{attrs:{value:"4"}},[r._v("4")])])]),a("v-td",{attrs:{width:"80"}},[r._v(r._s(r.turmaForm.disciplina.codigo))]),a("v-td",{attrs:{width:"330",type:"content"}},[a("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Disciplina,expression:"turmaForm.Disciplina",modifiers:{number:!0}}],on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,(function(r){return r.selected})).map((function(t){var a="_value"in t?t._value:t.value;return r._n(a)}));r.$set(r.turmaForm,"Disciplina",t.target.multiple?a:a[0])},r.handleEditTurma]}},r._l(r.DisciplinasExternasInPerfis,(function(t){return a("option",{key:t.id,domProps:{value:t.id}},[r._v("\n        "+r._s(t.nome)+"\n      ")])})),0)]),a("v-td",{attrs:{width:"25"}},[r._v(r._s(r.totalCarga))]),a("v-td",{attrs:{width:"45",type:"content"}},[a("input",{staticStyle:{width:"30px"},attrs:{type:"text"},domProps:{value:r.turmaForm.letra},on:{input:function(t){r.turmaForm.letra=t.target.value.toUpperCase()},keypress:r.maskTurmaLetra,change:r.handleEditTurma}})]),a("v-td",{attrs:{width:"80",type:"content"}},[a("select",{directives:[{name:"model",rawName:"v-model",value:r.turmaForm.turno1,expression:"turmaForm.turno1"}],on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,(function(r){return r.selected})).map((function(r){var t="_value"in r?r._value:r.value;return t}));r.$set(r.turmaForm,"turno1",t.target.multiple?a:a[0])},r.handleEditTurma]}},[r.disciplinaIsIntegralEAD?a("option",{attrs:{value:"EAD"}},[r._v("EAD")]):[a("option",{attrs:{value:"Diurno"}},[r._v("Diurno")]),a("option",{attrs:{value:"Noturno"}},[r._v("Noturno")])]],2)]),a("v-td",{attrs:{width:"85",type:"content"}},[a("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Horario1,expression:"turmaForm.Horario1",modifiers:{number:!0}}],on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,(function(r){return r.selected})).map((function(t){var a="_value"in t?t._value:t.value;return r._n(a)}));r.$set(r.turmaForm,"Horario1",t.target.multiple?a:a[0])},function(t){return r.checkHorario(1)}]}},[a("option"),r._l(r.HorariosFiltredByTurno,(function(t){return a("option",{key:t.id+t.horario,domProps:{value:t.id}},[r._v("\n        "+r._s(t.horario)+"\n      ")])}))],2),r.totalCarga>=4?a("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Horario2,expression:"turmaForm.Horario2",modifiers:{number:!0}}],on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,(function(r){return r.selected})).map((function(t){var a="_value"in t?t._value:t.value;return r._n(a)}));r.$set(r.turmaForm,"Horario2",t.target.multiple?a:a[0])},function(t){return r.checkHorario(2)}]}},[a("option"),r._l(r.HorariosFiltredByTurno,(function(t){return a("option",{key:t.id+t.horario,domProps:{value:t.id}},[r._v("\n        "+r._s(t.horario)+"\n      ")])}))],2):r._e()]),a("v-td",{attrs:{width:"95",type:"content"}},[r.disciplinaIsIntegralEAD?r._e():[a("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Sala1,expression:"turmaForm.Sala1",modifiers:{number:!0}}],on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,(function(r){return r.selected})).map((function(t){var a="_value"in t?t._value:t.value;return r._n(a)}));r.$set(r.turmaForm,"Sala1",t.target.multiple?a:a[0])},function(t){return r.checkSala(1)}]}},[a("option"),r._l(r.AllSalas,(function(t){return a("option",{key:t.id+t.nome,domProps:{value:t.id}},[r._v("\n          "+r._s(t.nome)+"\n        ")])}))],2),r.totalCarga>=4?a("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Sala2,expression:"turmaForm.Sala2",modifiers:{number:!0}}],on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,(function(r){return r.selected})).map((function(t){var a="_value"in t?t._value:t.value;return r._n(a)}));r.$set(r.turmaForm,"Sala2",t.target.multiple?a:a[0])},function(t){return r.checkSala(2)}]}},[a("option"),r._l(r.AllSalas,(function(t){return a("option",{key:t.nome+t.id,domProps:{value:t.id}},[r._v("\n          "+r._s(t.nome)+"\n        ")])}))],2):r._e()]],2),a("v-td",{attrs:{width:"45",type:"content"}},[a("div",{staticClass:"d-flex flex-column justify-content-between py-1"},[a("b",{staticClass:"mb-1"},[r._v("\n        "+r._s(r.totalPedidosNaoPeriodizados+r.totalPedidosPeriodizados)+"\n      ")]),a("span",[r._v(r._s(r.totalPedidosPeriodizados)+"+"+r._s(r.totalPedidosNaoPeriodizados))])])]),r._l(r.IndicesInPedidos,(function(t){return a("v-td",{key:"index"+t,attrs:{width:"35",paddingX:"0",type:"none"}},[a("InputsPedidosExternos",{attrs:{index:t,turma:r.turma}})],1)}))],2)},e=[],i=(a("1c01"),a("58b2"),a("8e6e"),a("456d"),a("759f"),a("ac6a"),a("f3e2"),a("0cd8"),a("d25f"),a("7514"),a("6762"),a("2fdb"),a("96cf"),a("1da1")),n=a("ade3"),u=a("2f62"),s=a("9165"),m=a("c5e2");function l(r,t){var a=Object.keys(r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(r);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),a.push.apply(a,o)}return a}function c(r){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){Object(n["a"])(r,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(a,t))}))}return r}var d={name:"TurmaExternaRow",mixins:[s["k"]],components:{InputsPedidosExternos:m["default"]},props:{turma:{type:Object,required:!0}},data:function(){return{turmaForm:null,currentData:null}},methods:c(c({},Object(u["b"])(["editTurmaExterna","toggleTurmaExternaToDelete"])),{},{resetTurmaForm:function(){this.turmaForm=this.$_.clone(this.turma),this.currentData=this.$_.clone(this.turma)},handleEditTurma:function(){var r=Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,this.setPartialLoading(!0),r.next=4,this.editTurmaExterna(this.turmaForm);case 4:r.next=10;break;case 6:r.prev=6,r.t0=r["catch"](0),this.resetTurmaForm(),this.pushNotification({type:"error",title:"Erro ao atualizar turma!",text:r.t0.response?"A combinação de disciplina, período e turma deve ser única.":r.t0.message});case 10:return r.prev=10,this.setPartialLoading(!1),r.finish(10);case 13:case"end":return r.stop()}}),r,this,[[0,6,10,13]])})));function t(){return r.apply(this,arguments)}return t}(),checkHorario:function(r){this.checkHorarioSala(r)?1===r?this.turmaForm.Horario1=this.currentData.Horario1:this.turmaForm.Horario2=this.currentData.Horario2:this.handleEditTurma()},checkSala:function(r){this.checkHorarioSala(r)?1===r?this.turmaForm.Sala1=this.currentData.Sala1:this.turmaForm.Sala2=this.currentData.Sala2:this.handleEditTurma()},checkHorarioSala:function(r){var t=[4,10,16,22,28],a=[32,34,36,38,40],o=[33,35,37,39,41],e=[5,11,17,23,29];if(""===this.turmaForm.Horario1&&(this.turmaForm.Horario1=null),""===this.turmaForm.Horario2&&(this.turmaForm.Horario2=null),""===this.turmaForm.Sala1&&(this.turmaForm.Sala1=null),""===this.turmaForm.Sala2&&(this.turmaForm.Sala2=null),(!this.$_.isNull(this.turmaForm.Horario1)||!this.$_.isNull(this.turmaForm.Horario2))&&(!this.$_.isNull(this.turmaForm.Sala1)||!this.$_.isNull(this.turmaForm.Sala2))){if(1===r?31===this.turmaForm.Horario1:31===this.turmaForm.Horario2)return!1;if(1===r&&this.$_.includes(t,this.turmaForm.Horario1)){if(this.checkHorarioSala1618(1,1))return!0}else if(2===r&&this.$_.includes(t,this.turmaForm.Horario2)){if(this.checkHorarioSala1618(2,2))return!0}else if(1===r&&this.$_.includes(a,this.turmaForm.Horario1)){if(this.checkHorarioSala1719(1,1))return!0}else if(2===r&&this.$_.includes(a,this.turmaForm.Horario2)){if(this.checkHorarioSala1719(2,2))return!0}else if(1===r&&this.$_.includes(o,this.turmaForm.Horario1)){if(this.checkHorarioSala1820(1,1))return!0}else if(2===r&&this.$_.includes(o,this.turmaForm.Horario2)){if(this.checkHorarioSala1820(2,2))return!0}else if(1===r&&this.$_.includes(e,this.turmaForm.Horario1)){if(this.checkHorarioSala1921(1,1))return!0}else if(2===r&&this.$_.includes(e,this.turmaForm.Horario2)){if(this.checkHorarioSala1921(2,2))return!0}else if(1==r){if(this.checkHorarioSalaGeral(1,1))return!0}else if(this.checkHorarioSalaGeral(2,2))return!0}return!1},notifyHorarioSala:function(r,t){var a=1===r?this.$_.find(this.AllHorarios,["id",this.turmaForm.Horario1]):this.$_.find(this.AllHorarios,["id",this.turmaForm.Horario2]),o=1===t?this.$_.find(this.AllSalas,["id",this.turmaForm.Sala1]):this.$_.find(this.AllSalas,["id",this.turmaForm.Sala2]),e="Conflito no horário ".concat(a.horario," com a sala ").concat(o.nome);this.$notify({group:"general",title:"Erro",text:e,type:"error"})},checkHorarioSala1618:function(r,t){var a=this,o=this.$_.filter(this.$_.concat(this.$store.state.turma.Turmas,this.$store.state.turmaExterna.Turmas),(function(o){return a.turmaForm.periodo==o.periodo&&(1===r?(e=a.turmaForm.Horario1===o.Horario1||32+(a.turmaForm.Horario1-4)/3===o.Horario1,i=a.turmaForm.Horario1===o.Horario2||32+(a.turmaForm.Horario1-4)/3===o.Horario2):(e=a.turmaForm.Horario2===o.Horario1||32+(a.turmaForm.Horario2-4)/3===o.Horario1,i=a.turmaForm.Horario2===o.Horario2||32+(a.turmaForm.Horario2-4)/3===o.Horario2),1===t?(n=!a.$_.isNull(a.turmaForm.Sala1)&&a.turmaForm.Sala1===o.Sala1,u=!a.$_.isNull(a.turmaForm.Sala1)&&a.turmaForm.Sala1===o.Sala2):(n=!a.$_.isNull(a.turmaForm.Sala2)&&a.turmaForm.Sala2===o.Sala1,u=!a.$_.isNull(a.turmaForm.Sala2)&&a.turmaForm.Sala2===o.Sala2),e&&n||i&&u);var e,i,n,u}));return o.length>0&&((1!==o.length||o[0].id!==this.turmaForm.id)&&(this.notifyHorarioSala(r,t),!0))},checkHorarioSala1719:function(r,t){var a=this,o=this.$_.filter(this.$_.concat(this.$store.state.turma.Turmas,this.$store.state.turmaExterna.Turmas),(function(o){return a.turmaForm.periodo==o.periodo&&(1===r?(e=a.turmaForm.Horario1===o.Horario1||4+3*(a.turmaForm.Horario1-32)===o.Horario1||a.turmaForm.Horario1+1===o.Horario1,i=a.turmaForm.Horario1===o.Horario2||4+3*(a.turmaForm.Horario1-32)===o.Horario2||a.turmaForm.Horario1+1===o.Horario2):(e=a.turmaForm.Horario2===o.Horario1||4+3*(a.turmaForm.Horario2-32)===o.Horario1||a.turmaForm.Horario2+1===o.Horario1,i=a.turmaForm.Horario2===o.Horario2||4+3*(a.turmaForm.Horario2-32)===o.Horario2||a.turmaForm.Horario2+1===o.Horario2),1===t?(n=!a.$_.isNull(a.turmaForm.Sala1)&&a.turmaForm.Sala1===o.Sala1,u=!a.$_.isNull(a.turmaForm.Sala1)&&a.turmaForm.Sala1===o.Sala2):(n=!a.$_.isNull(a.turmaForm.Sala2)&&a.turmaForm.Sala2===o.Sala1,u=!a.$_.isNull(a.turmaForm.Sala2)&&a.turmaForm.Sala2===o.Sala2),e&&n||i&&u);var e,i,n,u}));return o.length>0&&((1!==o.length||o[0].id!==this.turmaForm.id)&&(this.notifyHorarioSala(r,t),!0))},checkHorarioSala1820:function(r,t){var a=this,o=this.$_.filter(this.$_.concat(this.$store.state.turma.Turmas,this.$store.state.turmaExterna.Turmas),(function(o){return a.turmaForm.periodo==o.periodo&&(1===r?(e=a.turmaForm.Horario1===o.Horario1||5+3*(a.turmaForm.Horario1-33)===o.Horario1||a.turmaForm.Horario1-1===o.Horario1,i=a.turmaForm.Horario1===o.Horario2||5+3*(a.turmaForm.Horario1-33)===o.Horario2||a.turmaForm.Horario1-1===o.Horario2):(e=a.turmaForm.Horario2===o.Horario1||5+3*(a.turmaForm.Horario2-33)===o.Horario1||a.turmaForm.Horario2-1===o.Horario1,i=a.turmaForm.Horario2===o.Horario2||5+3*(a.turmaForm.Horario2-33)===o.Horario2||a.turmaForm.Horario2-1===o.Horario2),1===t?(n=!a.$_.isNull(a.turmaForm.Sala1)&&a.turmaForm.Sala1===o.Sala1,u=!a.$_.isNull(a.turmaForm.Sala1)&&a.turmaForm.Sala1===o.Sala2):(n=!a.$_.isNull(a.turmaForm.Sala2)&&a.turmaForm.Sala2===o.Sala1,u=!a.$_.isNull(a.turmaForm.Sala2)&&a.turmaForm.Sala2===o.Sala2),e&&n||i&&u);var e,i,n,u}));return o.length>0&&((1!==o.length||o[0].id!==this.turmaForm.id)&&(this.notifyHorarioSala(r,t),!0))},checkHorarioSala1921:function(r,t){var a=this,o=this.$_.filter(this.$_.concat(this.$store.state.turma.Turmas,this.$store.state.turmaExterna.Turmas),(function(o){return a.turmaForm.periodo==o.periodo&&(1===r?(e=a.turmaForm.Horario1===o.Horario1||33+(a.turmaForm.Horario1-5)/3===o.Horario1,i=a.turmaForm.Horario1===o.Horario2||33+(a.turmaForm.Horario1-5)/3===o.Horario2):(e=a.turmaForm.Horario2===o.Horario1||33+(a.turmaForm.Horario2-5)/3===o.Horario1,i=a.turmaForm.Horario2===o.Horario2||33+(a.turmaForm.Horario2-5)/3===o.Horario2),1===t?(n=!a.$_.isNull(a.turmaForm.Sala1)&&a.turmaForm.Sala1===o.Sala1,u=!a.$_.isNull(a.turmaForm.Sala1)&&a.turmaForm.Sala1===o.Sala2):(n=!a.$_.isNull(a.turmaForm.Sala2)&&a.turmaForm.Sala2===o.Sala1,u=!a.$_.isNull(a.turmaForm.Sala2)&&a.turmaForm.Sala2===o.Sala2),e&&n||i&&u);var e,i,n,u}));return o.length>0&&((1!==o.length||o[0].id!==this.turmaForm.id)&&(this.notifyHorarioSala(r,t),!0))},checkHorarioSalaGeral:function(r,t){var a=this,o=this.$_.filter(this.$_.concat(this.$store.state.turma.Turmas,this.$store.state.turmaExterna.Turmas),(function(o){return a.turmaForm.periodo==o.periodo&&(1===r?(e=!a.$_.isNull(a.turmaForm.Horario1)&&a.turmaForm.Horario1===o.Horario1,i=!a.$_.isNull(a.turmaForm.Horario1)&&a.turmaForm.Horario1===o.Horario2):(e=!a.$_.isNull(a.turmaForm.Horario2)&&a.turmaForm.Horario2===o.Horario1,i=!a.$_.isNull(a.turmaForm.Horario2)&&a.turmaForm.Horario2===o.Horario2),1===t?(n=!a.$_.isNull(a.turmaForm.Sala1)&&a.turmaForm.Sala1===o.Sala1,u=!a.$_.isNull(a.turmaForm.Sala1)&&a.turmaForm.Sala1===o.Sala2):(n=!a.$_.isNull(a.turmaForm.Sala2)&&a.turmaForm.Sala2===o.Sala1,u=!a.$_.isNull(a.turmaForm.Sala2)&&a.turmaForm.Sala2===o.Sala2),e&&n||i&&u);var e,i,n,u}));return o.length>0&&((1!==o.length||o[0].id!==this.turmaForm.id)&&(this.notifyHorarioSala(r,t),!0))}}),computed:c(c({},Object(u["c"])(["DisciplinasExternasInPerfis","AllHorarios","HorariosEAD","HorariosNoturno","HorariosDiurno","AllSalas","TurmasExternasToDelete","PedidosExternos","PrincipaisCursosDCC"])),{},{toggleToDelete:{set:function(){this.toggleTurmaExternaToDelete(this.turma)},get:function(){return this.TurmasExternasToDelete}},totalPedidosPeriodizados:function(){return this.PedidosOfCurrentTurma?this.$_.reduce(this.PedidosOfCurrentTurma,(function(r,t){return r+parseInt(t.vagasPeriodizadas,10)}),0):0},totalPedidosNaoPeriodizados:function(){return this.PedidosOfCurrentTurma?this.$_.reduce(this.PedidosOfCurrentTurma,(function(r,t){return r+parseInt(t.vagasNaoPeriodizadas,10)}),0):0},totalCarga:function(){return this.turmaForm.disciplina.creditoTotal},disciplinaIsIntegralEAD:function(){return 1===this.turmaForm.disciplina.ead},disciplinaIsParcialEAD:function(){return 2===this.turmaForm.disciplina.ead},HorariosFiltredByTurno:function(){if(this.disciplinaIsIntegralEAD)return this.HorariosEAD;switch(this.turmaForm.turno1){case"Noturno":return this.HorariosNoturno;case"Diurno":return this.HorariosDiurno;case"EAD":return this.HorariosEAD;default:return this.$_.filter(this.AllHorarios,(function(r){return 31!=r.id}))}},IndicesInPedidos:function(){var r=this,t=[];return this.$_.forEach(this.PedidosOfCurrentTurma,(function(a,o){var e=r.$_.some(r.PrincipaisCursosDCC,["id",a.Curso]);e&&t.push(o)})),t},PedidosOfCurrentTurma:function(){return this.PedidosExternos[this.turma.id]}}),watch:{turma:{handler:"resetTurmaForm",immediate:!0}}},h=d,p=(a("3c7d"),a("2877")),f=Object(p["a"])(h,o,e,!1,null,"1e9777dc",null);t["default"]=f.exports},c597:function(r,t,a){"use strict";var o=a("cd1f"),e=a.n(o);e.a},c5e2:function(r,t,a){"use strict";a.r(t);var o=function(){var r=this,t=r.$createElement,a=r._self._c||t;return a("div",{staticClass:"pedidos-container"},[a("input",{directives:[{name:"model",rawName:"v-model.number",value:r.pedidoForm.vagasPeriodizadas,expression:"pedidoForm.vagasPeriodizadas",modifiers:{number:!0}},{name:"focus-pedido",rawName:"v-focus-pedido"}],class:["input-pedidos",{empty:0==r.pedidoForm.vagasPeriodizadas}],attrs:{type:"text"},domProps:{value:r.pedidoForm.vagasPeriodizadas},on:{change:r.handleEditPedido,keypress:r.maskOnlyNumber,paste:function(r){r.preventDefault()},input:function(t){t.target.composing||r.$set(r.pedidoForm,"vagasPeriodizadas",r._n(t.target.value))},blur:function(t){return r.$forceUpdate()}}}),a("input",{directives:[{name:"model",rawName:"v-model.number",value:r.pedidoForm.vagasNaoPeriodizadas,expression:"pedidoForm.vagasNaoPeriodizadas",modifiers:{number:!0}},{name:"focus-pedido",rawName:"v-focus-pedido"}],class:["input-pedidos",{empty:0==r.pedidoForm.vagasNaoPeriodizadas}],attrs:{type:"text"},domProps:{value:r.pedidoForm.vagasNaoPeriodizadas},on:{change:r.handleEditPedido,keypress:r.maskOnlyNumber,paste:function(r){r.preventDefault()},input:function(t){t.target.composing||r.$set(r.pedidoForm,"vagasNaoPeriodizadas",r._n(t.target.value))},blur:function(t){return r.$forceUpdate()}}})])},e=[],i=(a("1c01"),a("58b2"),a("8e6e"),a("f3e2"),a("d25f"),a("ac6a"),a("456d"),a("a481"),a("96cf"),a("1da1")),n=a("ade3"),u=(a("c5f6"),a("9165")),s=a("2f62");function m(r,t){var a=Object.keys(r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(r);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),a.push.apply(a,o)}return a}function l(r){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?m(Object(a),!0).forEach((function(t){Object(n["a"])(r,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(a)):m(Object(a)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(a,t))}))}return r}var c={name:"InputsPedidosExternos",mixins:[u["o"],u["j"]],props:{turma:{type:Object,required:!0},index:{type:Number,required:!0}},data:function(){return{pedidoForm:null}},methods:l(l({},Object(s["b"])(["editPedidoExterno"])),{},{resetPedidoForm:function(){this.pedidoForm=this.$_.clone(this.PedidosOfCurrentTurma)},handleEditPedido:function(){var r=Object(i["a"])(regeneratorRuntime.mark((function r(){var t;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,this.setPartialLoading(!0),r.next=4,this.editPedidoExterno(this.pedidoForm);case 4:r.next=11;break;case 6:r.prev=6,r.t0=r["catch"](0),t="",r.t0.response.data.fullMessage&&(t+="<br/>"+r.t0.response.data.fullMessage.replace("\n","<br/>")),this.pushNotification({type:"error",title:"Erro ao atualizar pedido",text:t});case 11:return r.prev=11,this.setPartialLoading(!1),r.finish(11);case 14:case"end":return r.stop()}}),r,this,[[0,6,11,14]])})));function t(){return r.apply(this,arguments)}return t}()}),computed:l(l({},Object(s["c"])(["PedidosExternos"])),{},{PedidosOfCurrentTurma:function(){return this.PedidosExternos[this.turma.id][this.index]}}),watch:{PedidosOfCurrentTurma:{handler:"resetPedidoForm",immediate:!0}}},d=c,h=(a("c597"),a("2877")),p=Object(h["a"])(d,o,e,!1,null,"6bf4d3cf",null);t["default"]=p.exports},cd1f:function(r,t,a){}}]);
//# sourceMappingURL=chunk-0e7bcb5c.8432568b.js.map