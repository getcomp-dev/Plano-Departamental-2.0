(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-555fbbde"],{8063:function(r,o,t){"use strict";t("cc9f")},a4c3:function(r,o,t){"use strict";t.r(o);var a=function(){var r=this,o=r.$createElement,t=r._self._c||o;return t("tr",{staticClass:"turmarow max-content",style:{backgroundColor:r.turmaForm.disciplina.perfil.cor}},[t("v-td",{attrs:{width:"25",type:"content"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:r.toggleToDelete,expression:"toggleToDelete"}],attrs:{type:"checkbox"},domProps:{value:r.turma,checked:Array.isArray(r.toggleToDelete)?r._i(r.toggleToDelete,r.turma)>-1:r.toggleToDelete},on:{change:function(o){var t=r.toggleToDelete,a=o.target,e=!!a.checked;if(Array.isArray(t)){var i=r.turma,n=r._i(t,i);a.checked?n<0&&(r.toggleToDelete=t.concat([i])):n>-1&&(r.toggleToDelete=t.slice(0,n).concat(t.slice(n+1)))}else r.toggleToDelete=e}}})]),t("v-td",{attrs:{width:"40",type:"content"}},[t("button",{staticClass:"btn-table",on:{click:function(o){return o.stopPropagation(),r.$emit("click-edit",r.turma)}}},[t("font-awesome-icon",{staticClass:"btn-table-icon icon-darkgray",attrs:{icon:["fas","edit"]}})],1)]),t("v-td",{attrs:{width:"65",type:"content"}},[t("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.periodo,expression:"turmaForm.periodo",modifiers:{number:!0}}],on:{change:[function(o){var t=Array.prototype.filter.call(o.target.options,(function(r){return r.selected})).map((function(o){var t="_value"in o?o._value:o.value;return r._n(t)}));r.$set(r.turmaForm,"periodo",o.target.multiple?t:t[0])},function(o){return r.checkHorariosPeriodo()}]}},[t("option",{attrs:{value:"1"}},[r._v("1")]),t("option",{attrs:{value:"2"}},[r._v("2")]),t("option",{attrs:{value:"3"}},[r._v("3")]),t("option",{attrs:{value:"4"}},[r._v("4")])])]),t("v-td",{attrs:{width:"80",paddingX:"2"}},[r._v("\n    "+r._s(r.turmaForm.disciplina.perfil.abreviacao)+"\n  ")]),t("v-td",{attrs:{width:"80",paddingX:"2"}},[r._v(r._s(r.turmaForm.disciplina.codigo))]),t("v-td",{attrs:{width:"330",align:"start"}},[r._v(r._s(r.turmaForm.disciplina.nome))]),t("v-td",{attrs:{width:"60"}},[r._v(r._s(r.turmaForm.disciplina.creditoTotal))]),t("v-td",{attrs:{width:"45",type:"content"}},[t("input",{staticStyle:{width:"30px"},attrs:{type:"text"},domProps:{value:r.turmaForm.letra},on:{input:function(o){r.turmaForm.letra=o.target.value.toUpperCase()},change:r.handleEditTurma,keypress:r.maskTurmaLetra}})]),t("v-td",{attrs:{width:"160",type:"none",paddingX:"3"}},[t("div",{staticClass:"d-flex align-items-center w-100"},[t("div",{staticClass:"d-flex flex-column",staticStyle:{width:"130px"}},[t("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Docente1,expression:"turmaForm.Docente1",modifiers:{number:!0}}],on:{change:[function(o){var t=Array.prototype.filter.call(o.target.options,(function(r){return r.selected})).map((function(o){var t="_value"in o?o._value:o.value;return r._n(t)}));r.$set(r.turmaForm,"Docente1",o.target.multiple?t:t[0])},r.checkDocente]}},[t("option"),r._l(r.DocentesByPreferencia,(function(o){return t("option",{key:o.id+o.apelido,domProps:{value:o.id}},[r._v("\n            "+r._s(o.apelido)+"\n            "+r._s(r.orderByPreferencia&&r.getPreferenciaDocente(o)?"- "+r.getPreferenciaDocente(o):"")+"\n          ")])}))],2),t("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Docente2,expression:"turmaForm.Docente2",modifiers:{number:!0}}],on:{change:[function(o){var t=Array.prototype.filter.call(o.target.options,(function(r){return r.selected})).map((function(o){var t="_value"in o?o._value:o.value;return r._n(t)}));r.$set(r.turmaForm,"Docente2",o.target.multiple?t:t[0])},r.checkDocente]}},[t("option"),r._l(r.DocentesByPreferencia,(function(o){return t("option",{key:o.apelido+o.id,domProps:{value:o.id}},[r._v("\n            "+r._s(o.apelido)+"\n            "+r._s(r.orderByPreferencia&&r.getPreferenciaDocente(o)?"- "+r.getPreferenciaDocente(o):"")+"\n          ")])}))],2)]),t("font-awesome-icon",{class:["clickable mx-auto",{"low-opacity":!r.orderByPreferencia}],staticStyle:{"font-size":"12px"},attrs:{icon:["fas","graduation-cap"],title:"Alternar ordenação de docentes por preferência"},on:{click:function(o){r.orderByPreferencia=!r.orderByPreferencia}}})],1)]),t("v-td",{attrs:{width:"80",type:"content"}},[t("select",{directives:[{name:"model",rawName:"v-model",value:r.turmaForm.turno1,expression:"turmaForm.turno1"}],attrs:{type:"text"},on:{change:[function(o){var t=Array.prototype.filter.call(o.target.options,(function(r){return r.selected})).map((function(r){var o="_value"in r?r._value:r.value;return o}));r.$set(r.turmaForm,"turno1",o.target.multiple?t:t[0])},r.handleEditTurma]}},[r.isIntegralEAD?t("option",{attrs:{value:"EAD"}},[r._v("EAD")]):[t("option",{attrs:{value:"Diurno"}},[r._v("Diurno")]),t("option",{attrs:{value:"Noturno"}},[r._v("Noturno")])]],2)]),t("v-td",{attrs:{width:"85",type:"content"}},[t("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Horario1,expression:"turmaForm.Horario1",modifiers:{number:!0}}],on:{change:[function(o){var t=Array.prototype.filter.call(o.target.options,(function(r){return r.selected})).map((function(o){var t="_value"in o?o._value:o.value;return r._n(t)}));r.$set(r.turmaForm,"Horario1",o.target.multiple?t:t[0])},function(o){return r.checkHorario(1)}]}},[r.isIntegralEAD?r._e():t("option"),r._l(r.HorariosFiltredByTurno,(function(o){return t("option",{key:o.id+o.horario,domProps:{value:o.id}},[r._v("\n        "+r._s(o.horario)+"\n      ")])}))],2),r.hasMoreThan4Creditos?t("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Horario2,expression:"turmaForm.Horario2",modifiers:{number:!0}}],on:{change:[function(o){var t=Array.prototype.filter.call(o.target.options,(function(r){return r.selected})).map((function(o){var t="_value"in o?o._value:o.value;return r._n(t)}));r.$set(r.turmaForm,"Horario2",o.target.multiple?t:t[0])},function(o){return r.checkHorario(2)}]}},[r.isParcialEAD?r._l(r.HorariosEAD,(function(o){return t("option",{key:o.horario+o.id,domProps:{value:o.id}},[r._v("\n          "+r._s(o.horario)+"\n        ")])})):[r.isIntegralEAD?r._e():t("option"),r._l(r.HorariosFiltredByTurno,(function(o){return t("option",{key:o.horario+o.id,domProps:{value:o.id}},[r._v("\n          "+r._s(o.horario)+"\n        ")])}))]],2):r._e()]),t("v-td",{attrs:{width:"95",type:"content"}},[r.isIntegralEAD?r._e():[t("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Sala1,expression:"turmaForm.Sala1",modifiers:{number:!0}}],on:{change:[function(o){var t=Array.prototype.filter.call(o.target.options,(function(r){return r.selected})).map((function(o){var t="_value"in o?o._value:o.value;return r._n(t)}));r.$set(r.turmaForm,"Sala1",o.target.multiple?t:t[0])},r.checkSala]}},[r.AllSalas.length?t("option"):t("option",{attrs:{type:"text"}},[r._v("Nenhuma Sala Encontrada")]),r._l(r.AllSalas,(function(o){return t("option",{key:o.id+o.nome,domProps:{value:o.id}},[r._v("\n          "+r._s(o.nome)+"\n        ")])}))],2),r.hasMoreThan4Creditos&&0===r.turmaForm.disciplina.ead?t("select",{directives:[{name:"model",rawName:"v-model.number",value:r.turmaForm.Sala2,expression:"turmaForm.Sala2",modifiers:{number:!0}}],on:{change:[function(o){var t=Array.prototype.filter.call(o.target.options,(function(r){return r.selected})).map((function(o){var t="_value"in o?o._value:o.value;return r._n(t)}));r.$set(r.turmaForm,"Sala2",o.target.multiple?t:t[0])},r.checkSala]}},[r.AllSalas.length?t("option"):t("option",{attrs:{type:"text"}},[r._v("Nenhuma Sala Encontrada")]),r._l(r.AllSalas,(function(o){return t("option",{key:o.nome+o.id,domProps:{value:o.id}},[r._v("\n          "+r._s(o.nome)+"\n        ")])}))],2):r._e()]],2),t("v-td",{attrs:{width:"45",type:"content"}},[t("div",{staticClass:"d-flex flex-column justify-content-between py-1"},[t("b",{staticClass:"mb-1"},[r._v("\n        "+r._s(r.totalPedidosNaoPeriodizados+r.totalPedidosPeriodizados)+"\n      ")]),t("span",[r._v(r._s(r.totalPedidosPeriodizados)+"+"+r._s(r.totalPedidosNaoPeriodizados))])])]),r._l(r.cursosAtivados,(function(o){return t("v-td",{key:o.id+o.codigo,attrs:{width:"35",paddingX:"0",type:"none"}},[r._l(r.PedidosDaTurma,(function(a,e){return[a.Curso===o.id?t("InputsPedidosDCC",{key:a.Turma+o.Curso,attrs:{index:e,turma:r.turma,type:"main"}}):r._e()]}))],2)}))],2)},e=[],i=(t("1c01"),t("58b2"),t("8e6e"),t("f3e2"),t("d25f"),t("ac6a"),t("456d"),t("0cd8"),t("96cf"),t("1da1")),n=(t("6762"),t("ade3")),m=t("2f62"),u=t("758b"),c=t("3355"),s=t("0a94"),l=t("6740"),h=t("5c8a"),d=t("d4b9"),H=t("9165"),F=t("25df");function f(r,o){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(r);o&&(a=a.filter((function(o){return Object.getOwnPropertyDescriptor(r,o).enumerable}))),t.push.apply(t,a)}return t}function p(r){for(var o=1;o<arguments.length;o++){var t=null!=arguments[o]?arguments[o]:{};o%2?f(Object(t),!0).forEach((function(o){Object(n["a"])(r,o,t[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):f(Object(t)).forEach((function(o){Object.defineProperty(r,o,Object.getOwnPropertyDescriptor(t,o))}))}return r}var D={name:"TurmaRow",mixins:[H["h"]],components:{InputsPedidosDCC:F["c"]},props:{turma:Object,cursosAtivados:Array},data:function(){return{currentData:null,turmaForm:null,orderByPreferencia:!1}},methods:p(p({},Object(m["b"])(["toggleTurmaToDelete","editTurma"])),{},{resetTurmaForm:function(){this.turmaForm=Object(u["a"])(this.turma),this.currentData=Object(u["a"])(this.turma),this.setDefaultHorarios()},clearHorarios:function(){this.turmaForm.Horario1=null,this.turmaForm.Horario2=null},setDefaultHorarios:function(){1===this.turma.disciplina.ead?(this.turmaForm.turno1="EAD",this.turmaForm.Horario1=31,this.turmaForm.Horario2=31):2===this.turma.disciplina.ead&&(this.turmaForm.Horario2=31)},checkHorariosPeriodo:function(){this.checkHorarioDocente(1)||this.checkHorarioSala(1)?(this.turmaForm.Horario1=this.currentData.Horario1,this.turmaForm.periodo=this.currentData.periodo):this.checkHorarioDocente(2)||this.checkHorarioSala(2)?(this.turmaForm.Horario2=this.currentData.Horario2,this.turmaForm.periodo=this.currentData.periodo):this.handleEditTurma()},checkHorario:function(r){this.checkHorarioDocente(r)||this.checkHorarioSala(r)?1===r?this.turmaForm.Horario1=this.currentData.Horario1:this.turmaForm.Horario2=this.currentData.Horario2:this.handleEditTurma()},checkDocente:function(){var r=!this.checkHorarioDocente(1),o=!this.checkHorarioDocente(2);r&&o?this.handleEditTurma():(r||(this.turmaForm.Docente1=this.currentData.Docente1),o||(this.turmaForm.Docente2=this.currentData.Docente2))},checkSala:function(){var r=!this.checkHorarioSala(1),o=!this.checkHorarioSala(2);r&&o?this.handleEditTurma():(r||(this.turmaForm.Sala1=this.currentData.Sala1),o||(this.turmaForm.Sala2=this.currentData.Sala2))},checkHorarioDocente:function(r){var o=[4,10,16,22,28],t=[32,34,36,38,40],a=[33,35,37,39,41],e=[5,11,17,23,29];if(""===this.turmaForm.Horario1&&(this.turmaForm.Horario1=null),""===this.turmaForm.Horario2&&(this.turmaForm.Horario2=null),""===this.turmaForm.Docente1&&(this.turmaForm.Docente1=null),""===this.turmaForm.Docente2&&(this.turmaForm.Docente2=null),(!Object(c["a"])(this.turmaForm.Horario1)||!Object(c["a"])(this.turmaForm.Horario2))&&(!Object(c["a"])(this.turmaForm.Docente1)||!Object(c["a"])(this.turmaForm.Docente2))){if(1===r?31===this.turmaForm.Horario1:31===this.turmaForm.Horario2)return!1;if(1===r&&o.includes(this.turmaForm.Horario1)){if(this.checkHorarioDocente1618(1,1))return!0;if(this.checkHorarioDocente1618(1,2))return!0}else if(2===r&&o.includes(this.turmaForm.Horario2)){if(this.checkHorarioDocente1618(2,1))return!0;if(this.checkHorarioDocente1618(2,2))return!0}else if(1===r&&t.includes(this.turmaForm.Horario1)){if(this.checkHorarioDocente1719(1,1))return!0;if(this.checkHorarioDocente1719(1,2))return!0}else if(2===r&&t.includes(this.turmaForm.Horario2)){if(this.checkHorarioDocente1719(2,1))return!0;if(this.checkHorarioDocente1719(2,2))return!0}else if(1===r&&a.includes(this.turmaForm.Horario1)){if(this.checkHorarioDocente1820(1,1))return!0;if(this.checkHorarioDocente1820(1,2))return!0}else if(2===r&&a.includes(this.turmaForm.Horario2)){if(this.checkHorarioDocente1820(2,1))return!0;if(this.checkHorarioDocente1820(2,2))return!0}else if(1===r&&e.includes(this.turmaForm.Horario1)){if(this.checkHorarioDocente1921(1,1))return!0;if(this.checkHorarioDocente1921(1,2))return!0}else if(2===r&&e.includes(this.turmaForm.Horario2)){if(this.checkHorarioDocente1921(2,1))return!0;if(this.checkHorarioDocente1921(2,2))return!0}else if(1===r){if(this.checkHorarioDocenteGeral(1,1))return!0;if(this.checkHorarioDocenteGeral(1,2))return!0}else{if(this.checkHorarioDocenteGeral(2,1))return!0;if(this.checkHorarioDocenteGeral(2,2))return!0}}return!1},notifyHorarioDocente:function(r,o){var t=1===r?Object(s["a"])(this.AllHorarios,["id",this.turmaForm.Horario1]):Object(s["a"])(this.AllHorarios,["id",this.turmaForm.Horario2]),a=1===o?Object(s["a"])(this.DocentesAtivos,["id",this.turmaForm.Docente1]):Object(s["a"])(this.DocentesAtivos,["id",this.turmaForm.Docente2]),e="Conflito no horário ".concat(t.horario," com o docente ").concat(a.apelido);this.pushNotification({text:e,type:"error"})},checkHorarioDocente1618:function(r,o){var t=this,a=Object(l["a"])(this.$store.state.turma.Turmas,(function(a){return t.turmaForm.periodo==a.periodo&&(1===r?(e=t.turmaForm.Horario1===a.Horario1||32+(t.turmaForm.Horario1-4)/3===a.Horario1,i=t.turmaForm.Horario1===a.Horario2||32+(t.turmaForm.Horario1-4)/3===a.Horario2):(e=t.turmaForm.Horario2===a.Horario1||32+(t.turmaForm.Horario2-4)/3===a.Horario1,i=t.turmaForm.Horario2===a.Horario2||32+(t.turmaForm.Horario2-4)/3===a.Horario2),1===o?(n=!Object(c["a"])(t.turmaForm.Docente1)&&t.turmaForm.Docente1===a.Docente1,m=!Object(c["a"])(t.turmaForm.Docente1)&&t.turmaForm.Docente1===a.Docente2):(n=!Object(c["a"])(t.turmaForm.Docente2)&&t.turmaForm.Docente2===a.Docente1,m=!Object(c["a"])(t.turmaForm.Docente2)&&t.turmaForm.Docente2===a.Docente2),(e||i)&&n||(e||i)&&m);var e,i,n,m}));return a.length>0&&((1!==a.length||a[0].id!==this.turmaForm.id)&&(this.notifyHorarioDocente(r,o),!0))},checkHorarioDocente1719:function(r,o){var t=this,a=Object(l["a"])(this.$store.state.turma.Turmas,(function(a){return t.turmaForm.periodo==a.periodo&&(1===r?(e=t.turmaForm.Horario1===a.Horario1||4+3*(t.turmaForm.Horario1-32)===a.Horario1||t.turmaForm.Horario1+1===a.Horario1,i=t.turmaForm.Horario1===a.Horario2||4+3*(t.turmaForm.Horario1-32)===a.Horario2||t.turmaForm.Horario1+1===a.Horario2):(e=t.turmaForm.Horario2===a.Horario1||4+3*(t.turmaForm.Horario2-32)===a.Horario1||t.turmaForm.Horario2+1===a.Horario1,i=t.turmaForm.Horario2===a.Horario2||4+3*(t.turmaForm.Horario2-32)===a.Horario2||t.turmaForm.Horario2+1===a.Horario2),1===o?(n=!Object(c["a"])(t.turmaForm.Docente1)&&t.turmaForm.Docente1===a.Docente1,m=!Object(c["a"])(t.turmaForm.Docente1)&&t.turmaForm.Docente1===a.Docente2):(n=!Object(c["a"])(t.turmaForm.Docente2)&&t.turmaForm.Docente2===a.Docente1,m=!Object(c["a"])(t.turmaForm.Docente2)&&t.turmaForm.Docente2===a.Docente2),(e||i)&&n||(e||i)&&m);var e,i,n,m}));return a.length>0&&((1!==a.length||a[0].id!==this.turmaForm.id)&&(this.notifyHorarioDocente(r,o),!0))},checkHorarioDocente1820:function(r,o){var t=this,a=Object(l["a"])(this.$store.state.turma.Turmas,(function(a){return t.turmaForm.periodo==a.periodo&&(1===r?(e=t.turmaForm.Horario1===a.Horario1||5+3*(t.turmaForm.Horario1-33)===a.Horario1||t.turmaForm.Horario1-1===a.Horario1,i=t.turmaForm.Horario1===a.Horario2||5+3*(t.turmaForm.Horario1-33)===a.Horario2||t.turmaForm.Horario1-1===a.Horario2):(e=t.turmaForm.Horario2===a.Horario1||5+3*(t.turmaForm.Horario2-33)===a.Horario1||t.turmaForm.Horario2-1===a.Horario1,i=t.turmaForm.Horario2===a.Horario2||5+3*(t.turmaForm.Horario2-33)===a.Horario2||t.turmaForm.Horario2-1===a.Horario2),1===o?(n=!Object(c["a"])(t.turmaForm.Docente1)&&t.turmaForm.Docente1===a.Docente1,m=!Object(c["a"])(t.turmaForm.Docente1)&&t.turmaForm.Docente1===a.Docente2):(n=!Object(c["a"])(t.turmaForm.Docente2)&&t.turmaForm.Docente2===a.Docente1,m=!Object(c["a"])(t.turmaForm.Docente2)&&t.turmaForm.Docente2===a.Docente2),(e||i)&&n||(e||i)&&m);var e,i,n,m}));return a.length>0&&((1!==a.length||a[0].id!==this.turmaForm.id)&&(this.notifyHorarioDocente(r,o),!0))},checkHorarioDocente1921:function(r,o){var t=this,a=Object(l["a"])(this.$store.state.turma.Turmas,(function(a){return t.turmaForm.periodo==a.periodo&&(1===r?(e=t.turmaForm.Horario1===a.Horario1||33+(t.turmaForm.Horario1-5)/3===a.Horario1,i=t.turmaForm.Horario1===a.Horario2||33+(t.turmaForm.Horario1-5)/3===a.Horario2):(e=t.turmaForm.Horario2===a.Horario1||33+(t.turmaForm.Horario2-5)/3===a.Horario1,i=t.turmaForm.Horario2===a.Horario2||33+(t.turmaForm.Horario2-5)/3===a.Horario2),1===o?(n=!Object(c["a"])(t.turmaForm.Docente1)&&t.turmaForm.Docente1===a.Docente1,m=!Object(c["a"])(t.turmaForm.Docente1)&&t.turmaForm.Docente1===a.Docente2):(n=!Object(c["a"])(t.turmaForm.Docente2)&&t.turmaForm.Docente2===a.Docente1,m=!Object(c["a"])(t.turmaForm.Docente2)&&t.turmaForm.Docente2===a.Docente2),(e||i)&&n||(e||i)&&m);var e,i,n,m}));return a.length>0&&((1!==a.length||a[0].id!==this.turmaForm.id)&&(this.notifyHorarioDocente(r,o),!0))},checkHorarioDocenteGeral:function(r,o){var t=this,a=Object(l["a"])(this.$store.state.turma.Turmas,(function(a){return t.turmaForm.periodo==a.periodo&&(1===r?(e=!Object(c["a"])(t.turmaForm.Horario1)&&t.turmaForm.Horario1===a.Horario1,i=!Object(c["a"])(t.turmaForm.Horario1)&&t.turmaForm.Horario1===a.Horario2):(e=!Object(c["a"])(t.turmaForm.Horario2)&&t.turmaForm.Horario2===a.Horario1,i=!Object(c["a"])(t.turmaForm.Horario2)&&t.turmaForm.Horario2===a.Horario2),1===o?(n=!Object(c["a"])(t.turmaForm.Docente1)&&t.turmaForm.Docente1===a.Docente1,m=!Object(c["a"])(t.turmaForm.Docente1)&&t.turmaForm.Docente1===a.Docente2):(n=!Object(c["a"])(t.turmaForm.Docente2)&&t.turmaForm.Docente2===a.Docente1,m=!Object(c["a"])(t.turmaForm.Docente2)&&t.turmaForm.Docente2===a.Docente2),(e||i)&&n||(e||i)&&m);var e,i,n,m}));return a.length>0&&((1!==a.length||a[0].id!==this.turmaForm.id)&&(this.notifyHorarioDocente(r,o),!0))},checkHorarioSala:function(r){var o=[4,10,16,22,28],t=[32,34,36,38,40],a=[33,35,37,39,41],e=[5,11,17,23,29];if(""===this.turmaForm.Horario1&&(this.turmaForm.Horario1=null),""===this.turmaForm.Horario2&&(this.turmaForm.Horario2=null),""===this.turmaForm.Sala1&&(this.turmaForm.Sala1=null),""===this.turmaForm.Sala2&&(this.turmaForm.Sala2=null),(!Object(c["a"])(this.turmaForm.Horario1)||!Object(c["a"])(this.turmaForm.Horario2))&&(!Object(c["a"])(this.turmaForm.Sala1)||!Object(c["a"])(this.turmaForm.Sala2))){if(1===r?31===this.turmaForm.Horario1:31===this.turmaForm.Horario2)return!1;if(1===r&&o.includes(this.turmaForm.Horario1)){if(this.checkHorarioSala1618(1,1))return!0}else if(2===r&&o.includes(this.turmaForm.Horario2)){if(this.checkHorarioSala1618(2,2))return!0}else if(1===r&&t.includes(this.turmaForm.Horario1)){if(this.checkHorarioSala1719(1,1))return!0}else if(2===r&&t.includes(this.turmaForm.Horario2)){if(this.checkHorarioSala1719(2,2))return!0}else if(1===r&&a.includes(this.turmaForm.Horario1)){if(this.checkHorarioSala1820(1,1))return!0}else if(2===r&&a.includes(this.turmaForm.Horario2)){if(this.checkHorarioSala1820(2,2))return!0}else if(1===r&&e.includes(this.turmaForm.Horario1)){if(this.checkHorarioSala1921(1,1))return!0}else if(2===r&&e.includes(this.turmaForm.Horario2)){if(this.checkHorarioSala1921(2,2))return!0}else if(1==r){if(this.checkHorarioSalaGeral(1,1))return!0}else if(this.checkHorarioSalaGeral(2,2))return!0}return!1},notifyHorarioSala:function(r,o){var t=1===r?Object(s["a"])(this.AllHorarios,["id",this.turmaForm.Horario1]):Object(s["a"])(this.AllHorarios,["id",this.turmaForm.Horario2]),a=1===o?Object(s["a"])(this.AllSalas,["id",this.turmaForm.Sala1]):Object(s["a"])(this.AllSalas,["id",this.turmaForm.Sala2]),e="Conflito no horário ".concat(t.horario," com a sala ").concat(a.nome);this.pushNotification({text:e,type:"error"})},checkHorarioSala1618:function(r,o){var t=this,a=Object(l["a"])(this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),(function(a){return t.turmaForm.periodo==a.periodo&&(1===r?(e=t.turmaForm.Horario1===a.Horario1||32+(t.turmaForm.Horario1-4)/3===a.Horario1,i=t.turmaForm.Horario1===a.Horario2||32+(t.turmaForm.Horario1-4)/3===a.Horario2):(e=t.turmaForm.Horario2===a.Horario1||32+(t.turmaForm.Horario2-4)/3===a.Horario1,i=t.turmaForm.Horario2===a.Horario2||32+(t.turmaForm.Horario2-4)/3===a.Horario2),1===o?(n=!Object(c["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===a.Sala1,m=!Object(c["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===a.Sala2):(n=!Object(c["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===a.Sala1,m=!Object(c["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===a.Sala2),e&&n||i&&m);var e,i,n,m}));return a.length>0&&((1!==a.length||a[0].id!==this.turmaForm.id)&&(this.notifyHorarioSala(r,o),!0))},checkHorarioSala1719:function(r,o){var t=this,a=Object(l["a"])(this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),(function(a){return t.turmaForm.periodo==a.periodo&&(1===r?(e=t.turmaForm.Horario1===a.Horario1||4+3*(t.turmaForm.Horario1-32)===a.Horario1||t.turmaForm.Horario1+1===a.Horario1,i=t.turmaForm.Horario1===a.Horario2||4+3*(t.turmaForm.Horario1-32)===a.Horario2||t.turmaForm.Horario1+1===a.Horario2):(e=t.turmaForm.Horario2===a.Horario1||4+3*(t.turmaForm.Horario2-32)===a.Horario1||t.turmaForm.Horario2+1===a.Horario1,i=t.turmaForm.Horario2===a.Horario2||4+3*(t.turmaForm.Horario2-32)===a.Horario2||t.turmaForm.Horario2+1===a.Horario2),1===o?(n=!Object(c["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===a.Sala1,m=!Object(c["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===a.Sala2):(n=!Object(c["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===a.Sala1,m=!Object(c["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===a.Sala2),e&&n||i&&m);var e,i,n,m}));return a.length>0&&((1!==a.length||a[0].id!==this.turmaForm.id)&&(this.notifyHorarioSala(r,o),!0))},checkHorarioSala1820:function(r,o){var t=this,a=Object(l["a"])(this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),(function(a){return t.turmaForm.periodo==a.periodo&&(1===r?(e=t.turmaForm.Horario1===a.Horario1||5+3*(t.turmaForm.Horario1-33)===a.Horario1||t.turmaForm.Horario1-1===a.Horario1,i=t.turmaForm.Horario1===a.Horario2||5+3*(t.turmaForm.Horario1-33)===a.Horario2||t.turmaForm.Horario1-1===a.Horario2):(e=t.turmaForm.Horario2===a.Horario1||5+3*(t.turmaForm.Horario2-33)===a.Horario1||t.turmaForm.Horario2-1===a.Horario1,i=t.turmaForm.Horario2===a.Horario2||5+3*(t.turmaForm.Horario2-33)===a.Horario2||t.turmaForm.Horario2-1===a.Horario2),1===o?(n=!Object(c["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===a.Sala1,m=!Object(c["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===a.Sala2):(n=!Object(c["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===a.Sala1,m=!Object(c["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===a.Sala2),e&&n||i&&m);var e,i,n,m}));return a.length>0&&((1!==a.length||a[0].id!==this.turmaForm.id)&&(this.notifyHorarioSala(r,o),!0))},checkHorarioSala1921:function(r,o){var t=this,a=Object(l["a"])(this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),(function(a){return t.turmaForm.periodo==a.periodo&&(1===r?(e=t.turmaForm.Horario1===a.Horario1||33+(t.turmaForm.Horario1-5)/3===a.Horario1,i=t.turmaForm.Horario1===a.Horario2||33+(t.turmaForm.Horario1-5)/3===a.Horario2):(e=t.turmaForm.Horario2===a.Horario1||33+(t.turmaForm.Horario2-5)/3===a.Horario1,i=t.turmaForm.Horario2===a.Horario2||33+(t.turmaForm.Horario2-5)/3===a.Horario2),1===o?(n=!Object(c["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===a.Sala1,m=!Object(c["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===a.Sala2):(n=!Object(c["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===a.Sala1,m=!Object(c["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===a.Sala2),e&&n||i&&m);var e,i,n,m}));return a.length>0&&((1!==a.length||a[0].id!==this.turmaForm.id)&&(this.notifyHorarioSala(r,o),!0))},checkHorarioSalaGeral:function(r,o){var t=this,a=Object(l["a"])(this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),(function(a){return t.turmaForm.periodo==a.periodo&&(1===r?(e=!Object(c["a"])(t.turmaForm.Horario1)&&t.turmaForm.Horario1===a.Horario1,i=!Object(c["a"])(t.turmaForm.Horario1)&&t.turmaForm.Horario1===a.Horario2):(e=!Object(c["a"])(t.turmaForm.Horario2)&&t.turmaForm.Horario2===a.Horario1,i=!Object(c["a"])(t.turmaForm.Horario2)&&t.turmaForm.Horario2===a.Horario2),1===o?(n=!Object(c["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===a.Sala1,m=!Object(c["a"])(t.turmaForm.Sala1)&&t.turmaForm.Sala1===a.Sala2):(n=!Object(c["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===a.Sala1,m=!Object(c["a"])(t.turmaForm.Sala2)&&t.turmaForm.Sala2===a.Sala2),e&&n||i&&m);var e,i,n,m}));return a.length>0&&((1!==a.length||a[0].id!==this.turmaForm.id)&&(this.notifyHorarioSala(r,o),!0))},handleEditTurma:function(){var r=Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,this.setLoading({type:"partial",value:!0}),r.next=4,this.editTurma({data:this.turmaForm,notify:!0});case 4:this.currentData=Object(h["a"])(this.turmaForm),r.next=11;break;case 7:r.prev=7,r.t0=r["catch"](0),this.turmaForm=Object(h["a"])(this.turma),this.pushNotification({type:"error",title:"Erro ao atualizar turma!",text:r.t0.response?"A combinação de disciplina, período e turma deve ser única.":r.t0.message});case 11:return r.prev=11,this.setLoading({type:"partial",value:!1}),r.finish(11);case 14:case"end":return r.stop()}}),r,this,[[0,7,11,14]])})));function o(){return r.apply(this,arguments)}return o}(),getPreferenciaDocente:function(r){var o=Object(s["a"])(this.PreferenciasDisciplina,["Docente",r.id]);return!!o&&o.preferencia}}),computed:p(p({},Object(m["c"])(["DocentesAtivos","AllSalas","AllHorarios","HorariosEAD","HorariosNoturno","HorariosDiurno","TurmasToDelete","Pedidos","PreferenciasDocentes"])),{},{toggleToDelete:{set:function(){this.toggleTurmaToDelete(this.turma)},get:function(){return this.TurmasToDelete}},HorariosFiltredByTurno:function(){var r=this.turmaForm.disciplina.ead;if(1===r)return this.HorariosEAD;switch(this.turmaForm.turno1){case"EAD":return this.HorariosEAD;case"Diurno":return this.HorariosDiurno;case"Noturno":return this.HorariosNoturno;default:return this.AllHorarios}},isIntegralEAD:function(){return 1===this.turmaForm.disciplina.ead},isParcialEAD:function(){return 2===this.turma.disciplina.ead},hasMoreThan4Creditos:function(){return this.turmaForm.disciplina.creditoTotal>=4},totalPedidosPeriodizados:function(){return this.PedidosDaTurma.reduce((function(r,o){return r+parseInt(o.vagasPeriodizadas,10)}),0)},totalPedidosNaoPeriodizados:function(){return this.PedidosDaTurma.reduce((function(r,o){return r+parseInt(o.vagasNaoPeriodizadas,10)}),0)},PedidosDaTurma:function(){var r=this.Pedidos[this.turma.id];return r||[]},PreferenciasDisciplina:function(){return Object(l["a"])(this.PreferenciasDocentes,{Disciplina:this.turmaForm.Disciplina})},DocentesByPreferencia:function(){var r=this;return this.orderByPreferencia?Object(d["a"])(this.DocentesAtivos,(function(o){var t=Object(s["a"])(r.PreferenciasDisciplina,["Docente",o.id]);return t?t.preferencia:0}),"desc"):this.DocentesAtivos}}),watch:{turma:{handler:"resetTurmaForm",immediate:!0}}},v=D,b=(t("8063"),t("2877")),S=Object(b["a"])(v,a,e,!1,null,"7da0ba64",null);o["default"]=S.exports},cc9f:function(r,o,t){}}]);
//# sourceMappingURL=chunk-555fbbde.fb728b9c.js.map