(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-72d26d30","chunk-948df6ca"],{"17f3":function(r,a,t){},3684:function(r,a,t){},6204:function(r,a,t){"use strict";t("17f3")},"9f3d":function(r,a,t){"use strict";t("3684")},a711:function(r,a,t){"use strict";t.r(a);var o=function(){var r=this,a=r.$createElement,t=r._self._c||a;return t("tr",{staticClass:"turmarow"},[t("v-td",{attrs:{width:"25",type:"content"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:r.toggleToDelete,expression:"toggleToDelete"}],attrs:{type:"checkbox"},domProps:{value:r.turma,checked:Array.isArray(r.toggleToDelete)?r._i(r.toggleToDelete,r.turma)>-1:r.toggleToDelete},on:{change:function(a){var t=r.toggleToDelete,o=a.target,e=!!o.checked;if(Array.isArray(t)){var i=r.turma,n=r._i(t,i);o.checked?n<0&&(r.toggleToDelete=t.concat([i])):n>-1&&(r.toggleToDelete=t.slice(0,n).concat(t.slice(n+1)))}else r.toggleToDelete=e}}})]),t("v-td",{attrs:{width:"65",type:"content"}},[t("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.periodo,expression:"turmaForm.periodo",modifiers:{number:!0}}],on:{change:[function(a){var t=Array.prototype.filter.call(a.target.options,(function(r){return r.selected})).map((function(a){var t="_value"in a?a._value:a.value;return r._n(t)}));r.$set(r.turmaForm,"periodo",a.target.multiple?t:t[0])},r.handleEditTurma]}},[t("option",{attrs:{value:"1"}},[r._v("1")]),t("option",{attrs:{value:"2"}},[r._v("2")]),t("option",{attrs:{value:"3"}},[r._v("3")]),t("option",{attrs:{value:"4"}},[r._v("4")])])]),t("v-td",{attrs:{width:"80"}},[r._v(r._s(r.turmaForm.disciplina.codigo))]),t("v-td",{attrs:{width:"330",type:"content"}},[t("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Disciplina,expression:"turmaForm.Disciplina",modifiers:{number:!0}}],on:{change:[function(a){var t=Array.prototype.filter.call(a.target.options,(function(r){return r.selected})).map((function(a){var t="_value"in a?a._value:a.value;return r._n(t)}));r.$set(r.turmaForm,"Disciplina",a.target.multiple?t:t[0])},r.handleEditTurma]}},r._l(r.DisciplinasExternasOrderedByNome,(function(a){return t("option",{key:a.id,domProps:{value:a.id}},[r._v("\n        "+r._s(a.nome)+"\n      ")])})),0)]),t("v-td",{attrs:{width:"55"}},[r._v(r._s(r.totalCarga))]),t("v-td",{attrs:{width:"45",type:"content"}},[t("input",{staticStyle:{width:"30px"},attrs:{type:"text"},domProps:{value:r.turmaForm.letra},on:{input:function(a){r.turmaForm.letra=a.target.value.toUpperCase()},keypress:r.maskTurmaLetra,change:r.handleEditTurma}})]),t("v-td",{attrs:{width:"80",type:"content"}},[t("select",{directives:[{name:"model",rawName:"v-model",value:r.turmaForm.turno1,expression:"turmaForm.turno1"}],on:{change:[function(a){var t=Array.prototype.filter.call(a.target.options,(function(r){return r.selected})).map((function(r){var a="_value"in r?r._value:r.value;return a}));r.$set(r.turmaForm,"turno1",a.target.multiple?t:t[0])},r.handleEditTurma]}},[r.disciplinaIsIntegralEAD?t("option",{attrs:{value:"EAD"}},[r._v("EAD")]):[t("option",{attrs:{value:"Diurno"}},[r._v("Diurno")]),t("option",{attrs:{value:"Noturno"}},[r._v("Noturno")])]],2)]),t("v-td",{attrs:{width:"85",type:"content"}},[t("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Horario1,expression:"turmaForm.Horario1",modifiers:{number:!0}}],on:{change:[function(a){var t=Array.prototype.filter.call(a.target.options,(function(r){return r.selected})).map((function(a){var t="_value"in a?a._value:a.value;return r._n(t)}));r.$set(r.turmaForm,"Horario1",a.target.multiple?t:t[0])},function(a){return r.checkHorario(1)}]}},[t("option"),r._l(r.HorariosFiltredByTurno,(function(a){return t("option",{key:a.id+a.horario,domProps:{value:a.id}},[r._v("\n        "+r._s(a.horario)+"\n      ")])}))],2),r.totalCarga>=4?t("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Horario2,expression:"turmaForm.Horario2",modifiers:{number:!0}}],on:{change:[function(a){var t=Array.prototype.filter.call(a.target.options,(function(r){return r.selected})).map((function(a){var t="_value"in a?a._value:a.value;return r._n(t)}));r.$set(r.turmaForm,"Horario2",a.target.multiple?t:t[0])},function(a){return r.checkHorario(2)}]}},[t("option"),r._l(r.HorariosFiltredByTurno,(function(a){return t("option",{key:a.id+a.horario,domProps:{value:a.id}},[r._v("\n        "+r._s(a.horario)+"\n      ")])}))],2):r._e()]),t("v-td",{attrs:{width:"95",type:"content"}},[r.disciplinaIsIntegralEAD?r._e():[t("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Sala1,expression:"turmaForm.Sala1",modifiers:{number:!0}}],on:{change:[function(a){var t=Array.prototype.filter.call(a.target.options,(function(r){return r.selected})).map((function(a){var t="_value"in a?a._value:a.value;return r._n(t)}));r.$set(r.turmaForm,"Sala1",a.target.multiple?t:t[0])},function(a){return r.checkSala(1)}]}},[t("option"),r._l(r.AllSalas,(function(a){return t("option",{key:a.id+a.nome,domProps:{value:a.id}},[r._v("\n          "+r._s(a.nome)+"\n        ")])}))],2),r.totalCarga>=4?t("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Sala2,expression:"turmaForm.Sala2",modifiers:{number:!0}}],on:{change:[function(a){var t=Array.prototype.filter.call(a.target.options,(function(r){return r.selected})).map((function(a){var t="_value"in a?a._value:a.value;return r._n(t)}));r.$set(r.turmaForm,"Sala2",a.target.multiple?t:t[0])},function(a){return r.checkSala(2)}]}},[t("option"),r._l(r.AllSalas,(function(a){return t("option",{key:a.nome+a.id,domProps:{value:a.id}},[r._v("\n          "+r._s(a.nome)+"\n        ")])}))],2):r._e()]],2),t("v-td",{attrs:{width:"45",type:"content"}},[t("div",{staticClass:"d-flex flex-column justify-content-between py-1"},[t("b",{staticClass:"mb-1"},[r._v("\n        "+r._s(r.totalPedidosNaoPeriodizados+r.totalPedidosPeriodizados)+"\n      ")]),t("span",[r._v(r._s(r.totalPedidosPeriodizados)+"+"+r._s(r.totalPedidosNaoPeriodizados))])])]),r._l(r.IndicesInPedidos,(function(a){return t("v-td",{key:"index"+a,attrs:{width:"35",paddingX:"0",type:"none"}},[t("InputsPedidosExternos",{attrs:{index:a,turma:r.turma}})],1)}))],2)},e=[],i=(t("1c01"),t("58b2"),t("8e6e"),t("d25f"),t("456d"),t("ac6a"),t("f3e2"),t("0cd8"),t("6762"),t("96cf"),t("1da1")),n=t("ade3"),u=t("2f62"),s=t("758b"),m=t("3355"),l=t("0a94"),c=t("6740"),d=t("d4b9"),p=t("9429"),h=t("9165"),f=t("befd");function F(r,a){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(r);a&&(o=o.filter((function(a){return Object.getOwnPropertyDescriptor(r,a).enumerable}))),t.push.apply(t,o)}return t}function v(r){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?F(Object(t),!0).forEach((function(a){Object(n["a"])(r,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):F(Object(t)).forEach((function(a){Object.defineProperty(r,a,Object.getOwnPropertyDescriptor(t,a))}))}return r}var H={name:"TurmaExternaRow",mixins:[h["h"]],components:{InputsPedidosExternos:f["default"]},props:{turma:{type:Object,required:!0}},data:function(){return{turmaForm:null,currentData:null}},methods:v(v({},Object(u["b"])(["editTurmaExterna","toggleTurmaExternaToDelete"])),{},{resetTurmaForm:function(){this.turmaForm=Object(s["a"])(this.turma),this.currentData=Object(s["a"])(this.turma)},handleEditTurma:function(){var r=Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,this.setLoading({type:"partial",value:!0}),r.next=4,this.editTurmaExterna(this.turmaForm);case 4:r.next=10;break;case 6:r.prev=6,r.t0=r["catch"](0),this.resetTurmaForm(),this.pushNotification({type:"error",title:"Erro ao atualizar turma!",text:r.t0.response?"A combinação de disciplina, período e turma deve ser única.":r.t0.message});case 10:return r.prev=10,this.setLoading({type:"partial",value:!1}),r.finish(10);case 13:case"end":return r.stop()}}),r,this,[[0,6,10,13]])})));function a(){return r.apply(this,arguments)}return a}(),checkHorario:function(r){this.checkHorarioSala(r)?1===r?this.turmaForm.Horario1=this.currentData.Horario1:this.turmaForm.Horario2=this.currentData.Horario2:this.handleEditTurma()},checkSala:function(r){this.checkHorarioSala(r)?1===r?this.turmaForm.Sala1=this.currentData.Sala1:this.turmaForm.Sala2=this.currentData.Sala2:this.handleEditTurma()},checkHorarioSala:function(r){var a=[4,10,16,22,28],t=[32,34,36,38,40],o=[33,35,37,39,41],e=[5,11,17,23,29];if(""===this.turmaForm.Horario1&&(this.turmaForm.Horario1=null),""===this.turmaForm.Horario2&&(this.turmaForm.Horario2=null),""===this.turmaForm.Sala1&&(this.turmaForm.Sala1=null),""===this.turmaForm.Sala2&&(this.turmaForm.Sala2=null),(!Object(m["a"])(this.turmaForm.Horario1)||!Object(m["a"])(this.turmaForm.Horario2))&&(!Object(m["a"])(this.turmaForm.Sala1)||!Object(m["a"])(this.turmaForm.Sala2))){if(1===r?31===this.turmaForm.Horario1:31===this.turmaForm.Horario2)return!1;if(1===r&&a.includes(this.turmaForm.Horario1)){if(this.checkHorarioSala1618(1,1))return!0}else if(2===r&&a.includes(this.turmaForm.Horario2)){if(this.checkHorarioSala1618(2,2))return!0}else if(1===r&&t.includes(this.turmaForm.Horario1)){if(this.checkHorarioSala1719(1,1))return!0}else if(2===r&&t.includes(this.turmaForm.Horario2)){if(this.checkHorarioSala1719(2,2))return!0}else if(1===r&&o.includes(this.turmaForm.Horario1)){if(this.checkHorarioSala1820(1,1))return!0}else if(2===r&&o.includes(this.turmaForm.Horario2)){if(this.checkHorarioSala1820(2,2))return!0}else if(1===r&&e.includes(this.turmaForm.Horario1)){if(this.checkHorarioSala1921(1,1))return!0}else if(2===r&&e.includes(this.turmaForm.Horario2)){if(this.checkHorarioSala1921(2,2))return!0}else if(1==r){if(this.checkHorarioSalaGeral(1,1))return!0}else if(this.checkHorarioSalaGeral(2,2))return!0}return!1},notifyHorarioSala:function(r,a){var t=1===r?Object(l["a"])(this.AllHorarios,["id",this.turmaForm.Horario1]):Object(l["a"])(this.AllHorarios,["id",this.turmaForm.Horario2]),o=1===a?Object(l["a"])(this.AllSalas,["id",this.turmaForm.Sala1]):Object(l["a"])(this.AllSalas,["id",this.turmaForm.Sala2]),e="Conflito no horário ".concat(t.horario," com a sala ").concat(o.nome);this.$notify({group:"general",title:"Erro",text:e,type:"error"})},checkHorarioSala1618:function(r,a){var t=this,o=Object(c["a"])(this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),(function(o){return t.turmaForm.periodo==o.periodo&&(1===r?(e=t.turmaForm.Horario1===o.Horario1||32+(t.turmaForm.Horario1-4)/3===o.Horario1,i=t.turmaForm.Horario1===o.Horario2||32+(t.turmaForm.Horario1-4)/3===o.Horario2):(e=t.turmaForm.Horario2===o.Horario1||32+(t.turmaForm.Horario2-4)/3===o.Horario1,i=t.turmaForm.Horario2===o.Horario2||32+(t.turmaForm.Horario2-4)/3===o.Horario2),1===a?(n=!Object(m["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===o.Sala1,u=!Object(m["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===o.Sala2):(n=!Object(m["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===o.Sala1,u=!Object(m["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===o.Sala2),e&&n||i&&u);var e,i,n,u}));return o.length>0&&((1!==o.length||o[0].id!==this.turmaForm.id)&&(this.notifyHorarioSala(r,a),!0))},checkHorarioSala1719:function(r,a){var t=this,o=Object(c["a"])(this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),(function(o){return t.turmaForm.periodo==o.periodo&&(1===r?(e=t.turmaForm.Horario1===o.Horario1||4+3*(t.turmaForm.Horario1-32)===o.Horario1||t.turmaForm.Horario1+1===o.Horario1,i=t.turmaForm.Horario1===o.Horario2||4+3*(t.turmaForm.Horario1-32)===o.Horario2||t.turmaForm.Horario1+1===o.Horario2):(e=t.turmaForm.Horario2===o.Horario1||4+3*(t.turmaForm.Horario2-32)===o.Horario1||t.turmaForm.Horario2+1===o.Horario1,i=t.turmaForm.Horario2===o.Horario2||4+3*(t.turmaForm.Horario2-32)===o.Horario2||t.turmaForm.Horario2+1===o.Horario2),1===a?(n=!Object(m["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===o.Sala1,u=!Object(m["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===o.Sala2):(n=!Object(m["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===o.Sala1,u=!Object(m["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===o.Sala2),e&&n||i&&u);var e,i,n,u}));return o.length>0&&((1!==o.length||o[0].id!==this.turmaForm.id)&&(this.notifyHorarioSala(r,a),!0))},checkHorarioSala1820:function(r,a){var t=this,o=Object(c["a"])(this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),(function(o){return t.turmaForm.periodo==o.periodo&&(1===r?(e=t.turmaForm.Horario1===o.Horario1||5+3*(t.turmaForm.Horario1-33)===o.Horario1||t.turmaForm.Horario1-1===o.Horario1,i=t.turmaForm.Horario1===o.Horario2||5+3*(t.turmaForm.Horario1-33)===o.Horario2||t.turmaForm.Horario1-1===o.Horario2):(e=t.turmaForm.Horario2===o.Horario1||5+3*(t.turmaForm.Horario2-33)===o.Horario1||t.turmaForm.Horario2-1===o.Horario1,i=t.turmaForm.Horario2===o.Horario2||5+3*(t.turmaForm.Horario2-33)===o.Horario2||t.turmaForm.Horario2-1===o.Horario2),1===a?(n=!Object(m["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===o.Sala1,u=!Object(m["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===o.Sala2):(n=!Object(m["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===o.Sala1,u=!Object(m["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===o.Sala2),e&&n||i&&u);var e,i,n,u}));return o.length>0&&((1!==o.length||o[0].id!==this.turmaForm.id)&&(this.notifyHorarioSala(r,a),!0))},checkHorarioSala1921:function(r,a){var t=this,o=Object(c["a"])(this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),(function(o){return t.turmaForm.periodo==o.periodo&&(1===r?(e=t.turmaForm.Horario1===o.Horario1||33+(t.turmaForm.Horario1-5)/3===o.Horario1,i=t.turmaForm.Horario1===o.Horario2||33+(t.turmaForm.Horario1-5)/3===o.Horario2):(e=t.turmaForm.Horario2===o.Horario1||33+(t.turmaForm.Horario2-5)/3===o.Horario1,i=t.turmaForm.Horario2===o.Horario2||33+(t.turmaForm.Horario2-5)/3===o.Horario2),1===a?(n=!Object(m["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===o.Sala1,u=!Object(m["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===o.Sala2):(n=!Object(m["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===o.Sala1,u=!Object(m["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===o.Sala2),e&&n||i&&u);var e,i,n,u}));return o.length>0&&((1!==o.length||o[0].id!==this.turmaForm.id)&&(this.notifyHorarioSala(r,a),!0))},checkHorarioSalaGeral:function(r,a){var t=this,o=Object(c["a"])(this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),(function(o){return t.turmaForm.periodo==o.periodo&&(1===r?(e=!Object(m["a"])(t.turmaForm.Horario1)&&t.turmaForm.Horario1===o.Horario1,i=!Object(m["a"])(t.turmaForm.Horario1)&&t.turmaForm.Horario1===o.Horario2):(e=!Object(m["a"])(t.turmaForm.Horario2)&&t.turmaForm.Horario2===o.Horario1,i=!Object(m["a"])(t.turmaForm.Horario2)&&t.turmaForm.Horario2===o.Horario2),1===a?(n=!Object(m["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===o.Sala1,u=!Object(m["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===o.Sala2):(n=!Object(m["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===o.Sala1,u=!Object(m["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===o.Sala2),e&&n||i&&u);var e,i,n,u}));return o.length>0&&((1!==o.length||o[0].id!==this.turmaForm.id)&&(this.notifyHorarioSala(r,a),!0))}}),computed:v(v({},Object(u["c"])(["DisciplinasExternas","AllHorarios","HorariosEAD","HorariosNoturno","HorariosDiurno","AllSalas","TurmasExternasToDelete","PedidosExternos","PrincipaisCursosDCC"])),{},{toggleToDelete:{set:function(){this.toggleTurmaExternaToDelete(this.turma)},get:function(){return this.TurmasExternasToDelete}},DisciplinasExternasOrderedByNome:function(){return Object(d["a"])(this.DisciplinasExternas,"nome")},totalPedidosPeriodizados:function(){return this.PedidosDaTurma.reduce((function(r,a){return r+parseInt(a.vagasPeriodizadas,10)}),0)},totalPedidosNaoPeriodizados:function(){return this.PedidosDaTurma.reduce((function(r,a){return r+parseInt(a.vagasNaoPeriodizadas,10)}),0)},totalCarga:function(){return this.turmaForm.disciplina.creditoTotal},disciplinaIsIntegralEAD:function(){return 1===this.turmaForm.disciplina.ead},disciplinaIsParcialEAD:function(){return 2===this.turmaForm.disciplina.ead},HorariosFiltredByTurno:function(){if(this.disciplinaIsIntegralEAD)return this.HorariosEAD;switch(this.turmaForm.turno1){case"Noturno":return this.HorariosNoturno;case"Diurno":return this.HorariosDiurno;case"EAD":return this.HorariosEAD;default:return Object(c["a"])(this.AllHorarios,(function(r){return 31!=r.id}))}},IndicesInPedidos:function(){var r=this,a=[];return this.PedidosDaTurma.forEach((function(t,o){var e=Object(p["a"])(r.PrincipaisCursosDCC,["id",t.Curso]);e&&a.push(o)})),a},PedidosDaTurma:function(){return this.PedidosExternos[this.turma.id]||[]}}),watch:{turma:{handler:"resetTurmaForm",immediate:!0}}},b=H,g=(t("9f3d"),t("2877")),S=Object(g["a"])(b,o,e,!1,null,"9d1c2c2e",null);a["default"]=S.exports},befd:function(r,a,t){"use strict";t.r(a);var o=function(){var r=this,a=r.$createElement,t=r._self._c||a;return t("div",{staticClass:"pedidos-container"},[t("input",{directives:[{name:"model",rawName:"v-model.number",value:r.pedidoForm.vagasPeriodizadas,expression:"pedidoForm.vagasPeriodizadas",modifiers:{number:!0}},{name:"focus-pedido",rawName:"v-focus-pedido"}],class:["input-pedidos",{empty:0==r.pedidoForm.vagasPeriodizadas}],attrs:{type:"text",title:"Vagas grade (periodizados)"},domProps:{value:r.pedidoForm.vagasPeriodizadas},on:{change:r.handleEditPedido,keypress:r.maskOnlyNumber,paste:function(r){r.preventDefault()},input:function(a){a.target.composing||r.$set(r.pedidoForm,"vagasPeriodizadas",r._n(a.target.value))},blur:function(a){return r.$forceUpdate()}}}),t("input",{directives:[{name:"model",rawName:"v-model.number",value:r.pedidoForm.vagasNaoPeriodizadas,expression:"pedidoForm.vagasNaoPeriodizadas",modifiers:{number:!0}},{name:"focus-pedido",rawName:"v-focus-pedido"}],class:["input-pedidos",{empty:0==r.pedidoForm.vagasNaoPeriodizadas}],attrs:{type:"text",title:"Vagas extra (não periodizados)"},domProps:{value:r.pedidoForm.vagasNaoPeriodizadas},on:{change:r.handleEditPedido,keypress:r.maskOnlyNumber,paste:function(r){r.preventDefault()},input:function(a){a.target.composing||r.$set(r.pedidoForm,"vagasNaoPeriodizadas",r._n(a.target.value))},blur:function(a){return r.$forceUpdate()}}})])},e=[],i=(t("1c01"),t("58b2"),t("8e6e"),t("f3e2"),t("d25f"),t("ac6a"),t("456d"),t("a481"),t("96cf"),t("1da1")),n=t("ade3"),u=(t("c5f6"),t("758b")),s=t("9165"),m=t("2f62");function l(r,a){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(r);a&&(o=o.filter((function(a){return Object.getOwnPropertyDescriptor(r,a).enumerable}))),t.push.apply(t,o)}return t}function c(r){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?l(Object(t),!0).forEach((function(a){Object(n["a"])(r,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(a){Object.defineProperty(r,a,Object.getOwnPropertyDescriptor(t,a))}))}return r}var d={name:"InputsPedidosExternos",mixins:[s["m"],s["g"]],props:{turma:{type:Object,required:!0},index:{type:Number,required:!0}},data:function(){return{pedidoForm:null}},methods:c(c({},Object(m["b"])(["editPedidoExterno"])),{},{resetPedidoForm:function(){this.pedidoForm=Object(u["a"])(this.PedidosOfCurrentTurma)},handleEditPedido:function(){var r=Object(i["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,this.setLoading({type:"partial",value:!0}),r.next=4,this.editPedidoExterno(this.pedidoForm);case 4:r.next=11;break;case 6:r.prev=6,r.t0=r["catch"](0),a="",r.t0.response.data.fullMessage&&(a+="<br/>"+r.t0.response.data.fullMessage.replace("\n","<br/>")),this.pushNotification({type:"error",title:"Erro ao atualizar pedido",text:a});case 11:return r.prev=11,this.setLoading({type:"partial",value:!1}),r.finish(11);case 14:case"end":return r.stop()}}),r,this,[[0,6,11,14]])})));function a(){return r.apply(this,arguments)}return a}()}),computed:c(c({},Object(m["c"])(["PedidosExternos"])),{},{PedidosOfCurrentTurma:function(){return this.PedidosExternos[this.turma.id][this.index]}}),watch:{PedidosOfCurrentTurma:{handler:"resetPedidoForm",immediate:!0}}},p=d,h=(t("6204"),t("2877")),f=Object(h["a"])(p,o,e,!1,null,"37a2cf4c",null);a["default"]=f.exports}}]);
//# sourceMappingURL=chunk-72d26d30.9cc19fa3.js.map