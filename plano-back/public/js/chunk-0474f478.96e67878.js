(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0474f478"],{"2fdb":function(t,r,e){"use strict";var o=e("5ca1"),i=e("d2c8"),a="includes";o(o.P+o.F*e("5147")(a),"String",{includes:function(t){return!!~i(this,t,a).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},"348f":function(t,r,e){"use strict";e.d(r,"b",(function(){return g})),e.d(r,"c",(function(){return l})),e.d(r,"d",(function(){return b})),e.d(r,"a",(function(){return O}));e("4f37"),e("6762"),e("2fdb"),e("28a5");var o=e("3835"),i=e("4360"),a=e("0a94"),n=e("9429"),s=e("eaf8");function l(t,r,e,o){var i=Object(s["c"])({periodo:o||null,Plano:e||null,letra:t[r.letra]||null});return i.letra?(c(i,t[r.disciplinaCod]),i.Disciplina?(u(i,t[r.horarioESala]),i.turno1?(d(i,t[r.docentes]),i):null):null):null}function c(t,r){if(r){var e=Object(a["a"])(i["a"].getters.AllDisciplinas,["codigo",r]);e?(t.Disciplina=e.id,t.creditoTotal=e.creditoTotal):t.Disciplina=null}}function u(t,r){if(r){var e=r.split(";"),i=Object(o["a"])(e,2),a=i[0],n=i[1];t.Horario1=v(a),t.creditoTotal>=4&&(t.Horario2=v(n)),t.turno1=f(t.Horario1,t.Horario2),"EAD"!==t.turno1&&(t.Sala1=m(a),t.Sala2=m(n))}}function d(t,r){if(r){var e=r.split(";"),i=Object(o["a"])(e,2),a=i[0],n=i[1];t.Docente1=p(a),t.Docente2=p(n)}}function f(t,r){return t||r?31===t?"EAD":Object(n["a"])(i["a"].getters.HorariosNoturno,["id",t])||Object(n["a"])(i["a"].getters.HorariosNoturno,["id",r])?"Noturno":"Diurno":null}function p(t){if(!t)return null;var r=Object(a["a"])(i["a"].getters.AllDocentes,(function(r){return Object(s["f"])(r.nome)===Object(s["f"])(t)}));return r?r.id:null}function v(t){if(!t)return null;var r=t.split(","),e=Object(o["a"])(r,3),n=e[0],s=e[1],l=e[2],c=h(n,s);if(c){var u=Object(a["a"])(i["a"].getters.AllHorarios,["horario",c]);return u?u.id:null}return l.includes("EAD")?31:null}function h(t,r){if(!t||!r)return null;var e=null;switch(t.trim().substring(0,3)){case"SEG":e="2a";break;case"TER":e="3a";break;case"QUA":e="4a";break;case"QUI":e="5a";break;case"SEX":e="6a";break;case"SAB":return"EAD";default:return null}var i=r.split("AS"),a=Object(o["a"])(i,2),n=a[0],s=a[1];if(!n||!s)return null;var l=n.trim().substring(0,2),c=s.trim().substring(0,2);return"".concat(e," ").concat(l,"-").concat(c)}function m(t){if(!t)return null;var r=t.split(","),e=Object(o["a"])(r,3),n=e[2],l=Object(s["f"])(n),c=Object(a["a"])(i["a"].getters.AllSalas,(function(t){var r=Object(s["f"])(t.nome);return l.includes(r)}));return c?c.id:null}function g(t,r,e){var o={Turma:null,Curso:null,vagasOferecidas:0,vagasOcupadas:0},n=Object(a["a"])(i["a"].getters.AllCursos,["codigo",t[r.cursoCod]]);return o.Curso=n?n.id:null,o.Turma=e,o.vagasOferecidas=parseInt(t[r.vagas1],10),o.vagasOcupadas=parseInt(t[r.vagas2],10),o.Curso?o:null}e("ac6a"),e("456d");function b(t){if(t.length){var r=["DISCIPLINA","DISCIPLINA_COD.","TURMA","CURSO_COD.","CURSO","VAGASOFERECIDAS","VAGASOCUPADAS","HORARIOS","DOCENTES"];if(Object.keys(t[0]).length<r.length)throw new Error("Verifique a integridade e o formato do(s) arquivo(s)")}}function O(t){var r={disciplinaCod:null,letra:null,cursoCod:null,vagas1:null,vagas2:null,horarioESala:null,docentes:null},e=0;for(var o in t){if(1===e)r.disciplinaCod=o;else if(2===e)r.letra=o;else if(3===e)r.cursoCod=o;else if(5===e)r.vagas1=o;else if(6===e)r.vagas2=o;else if(7===e)r.horarioESala=o;else if(8===e){r.docentes=o;break}e++}return r}},"4f37":function(t,r,e){"use strict";e("aa77")("trim",(function(t){return function(){return t(this,3)}}))},5147:function(t,r,e){var o=e("2b4c")("match");t.exports=function(t){var r=/./;try{"/./"[t](r)}catch(e){try{return r[o]=!1,!"/./"[t](r)}catch(i){}}return!0}},7366:function(t,r,e){"use strict";e.r(r);var o=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"main-component row"},[e("portal",{attrs:{to:"page-header"}},[e("BaseButton",{attrs:{template:"ajuda"},on:{click:function(r){return t.$refs.modalAjuda.toggle()}}})],1),e("div",{staticClass:"page-content"},[e("div",{staticClass:"table-div"},[e("BaseTable",{scopedSlots:t._u([{key:"thead",fn:function(){return[e("v-th-ordination",{attrs:{currentOrder:t.ordenacaoConflitos,orderToCheck:"disciplina.codigo",width:"80",align:"start",title:"Código da Disciplina"}},[t._v("\n            Código\n          ")]),e("v-th-ordination",{attrs:{currentOrder:t.ordenacaoConflitos,orderToCheck:"disciplina.nome",width:"300",align:"start",title:"Nome da Disciplina"}},[t._v("\n            Disciplina\n          ")]),e("v-th",{attrs:{width:"45"}},[t._v("Turma")]),e("v-th",{attrs:{width:"55",title:"Código do Curso"}},[t._v("Curso")]),e("v-th",{attrs:{colspan:"420",paddingX:"0"}},[t._v("\n            Conflito\n            "),e("v-th",{attrs:{width:"180",align:"start",title:"Tipo do Conflito"}},[t._v("Tipo")]),e("v-th",{attrs:{width:"120",title:"Valor no SIGA"}},[t._v("SIGA")]),e("v-th",{attrs:{width:"120",title:"Valor no Sistema (SIPlanWeb)"}},[t._v("Sistema")])],1)]},proxy:!0},{key:"tbody",fn:function(){return[t._l(t.turmasConflitosOrdered,(function(r){return[e("tr",{key:r.id,staticClass:"bg-custom"},[e("v-td",{attrs:{width:"80",align:"start"}},[t._v(t._s(r.disciplina.codigo))]),e("v-td",{attrs:{width:"300",align:"start"}},[t._v(t._s(r.disciplina.nome))]),e("v-td",{attrs:{width:"45"}},[t._v(t._s(r.letra))]),e("v-td",{attrs:{width:"55"}}),e("v-td",{attrs:{width:"180"}}),e("v-td",{attrs:{width:"120"}}),e("v-td",{attrs:{width:"120"}})],1),t._l(r.conflitos,(function(o){return e("tr",{key:r.id+o.label+o.curso.id},[e("v-td",{attrs:{width:"80"}}),e("v-td",{attrs:{width:"300"}}),e("v-td",{attrs:{width:"45"}}),e("v-td",{attrs:{width:"55",title:o.curso.nome}},[t._v(t._s(o.curso.codigo))]),e("v-td",{attrs:{width:"180",align:"start"}},[t._v(t._s(o.label))]),e("v-td",{attrs:{width:"120",title:o.siga}},[t._v(t._s(o.siga))]),e("v-td",{attrs:{width:"120",title:o.sistema}},[t._v(t._s(o.sistema))])],1)}))]})),t.turmasConflitosOrdered.length?t._e():e("tr",[e("v-td",{attrs:{width:"900"}},[e("b",[t._v("Nenhum conflito encontrado.")]),t._v("\n              Certifiqui-se de selecionar um arquivo correspondente com o plano atual e o periodo\n              selecionado.\n            ")])],1)]},proxy:!0}])})],1),e("Card",{attrs:{title:"Validar pedidos"},scopedSlots:t._u([{key:"body",fn:function(){return[e("VSelect",{attrs:{label:"Perído",validation:t.$v.form.periodo},model:{value:t.form.periodo,callback:function(r){t.$set(t.form,"periodo",t._n(r))},expression:"form.periodo"}},t._l(t.PeriodosLetivos,(function(t){return e("VOption",{key:t.id+t.nome,attrs:{value:t.id,text:t.nome}})})),1),e("VInputFile",{attrs:{label:"Arquivo do plano SIGA (.csv)",validation:t.$v.form.file,accept:".csv"},model:{value:t.form.file,callback:function(r){t.$set(t.form,"file",r)},expression:"form.file"}})]},proxy:!0},{key:"footer",fn:function(){return[e("BaseButton",{attrs:{template:"Salvar",title:"Iniciar"},on:{click:t.handleCompareTurmas}}),e("BaseButton",{attrs:{template:"cancelar"},on:{click:t.clearForm}})]},proxy:!0}])})],1),e("ModalAjuda",{ref:"modalAjuda"},[e("li",{staticClass:"list-group-item"},[e("b",[t._v("Visualizar conteúdo:")]),t._v("\n      Preencha o cartão à direita com o período do plano atual que deseja validar, em seguida\n      selecione o arquivo (.csv) de plano gerado pelo SIGA para o período correspondente. E para\n      finalizar clique no botão iniciar\n      "),e("font-awesome-icon",{staticClass:"icon-blue",attrs:{icon:["fas","check"]}}),t._v("\n      .\n    ")],1),e("li",{staticClass:"list-group-item"},[e("b",[t._v("Limpar formulário:")]),t._v("\n      No cartão à direita, clique em Cancelar\n      "),e("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","times"]}}),t._v("\n      , para limpar as informações.\n    ")],1)])],1)},i=[],a=(e("1c01"),e("58b2"),e("8e6e"),e("456d"),e("2caf"),e("ac4d"),e("8a81"),e("5df3"),e("1c4c"),e("7f7f"),e("6b54"),e("87b3"),e("7514"),e("ac6a"),e("f3e2"),e("d25f"),e("ade3")),n=(e("20d6"),e("96cf"),e("1da1")),s=e("2f62"),l=e("9429"),c=e("d4b9"),u=e("b5ae"),d=e("eaf8"),f=e("348f"),p=e("a91e"),v=e("9165"),h=e("25df"),m=e("d027");function g(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,o)}return e}function b(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?g(Object(e),!0).forEach((function(r){Object(a["a"])(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):g(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}function O(t,r){var e;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(e=C(t))||r&&t&&"number"===typeof t.length){e&&(t=e);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,n=!0,s=!1;return{s:function(){e=t[Symbol.iterator]()},n:function(){var t=e.next();return n=t.done,t},e:function(t){s=!0,a=t},f:function(){try{n||null==e.return||e.return()}finally{if(s)throw a}}}}function C(t,r){if(t){if("string"===typeof t)return A(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?A(t,r):void 0}}function A(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,o=new Array(r);e<r;e++)o[e]=t[e];return o}var y={name:"ValidaçãoLançamentoSIGA",components:{Card:h["b"],ModalAjuda:m["a"],VSelect:h["m"],VOption:h["l"],VInputFile:h["i"]},mixins:[v["d"],v["e"]],data:function(){return{form:{periodo:1,filePlano:null},turmasConflitos:[],ordenacaoConflitos:{order:"disciplina.codigo",type:"asc"}}},validations:{form:{periodo:{required:u["required"],integer:u["integer"]},file:{required:u["required"]}}},methods:{clearForm:function(){var t=this;this.form.periodo=1,this.form.file=null,this.$nextTick((function(){return t.$v.$reset()}))},handleCompareTurmas:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(){var r,e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(this.$v.form.$touch(),!this.$v.form.$anyError){t.next=3;break}return t.abrupt("return");case 3:return t.prev=3,this.setLoading({type:"partial",value:!0}),t.next=7,Object(d["g"])(this.form.file);case 7:r=t.sent,Object(f["d"])(r),e=this.normalizeTurmasEPedidosSIGA(r,this.form.periodo),this.searchConflitos(e,this.form.periodo),t.next=17;break;case 13:t.prev=13,t.t0=t["catch"](3),console.log(t.t0),this.pushNotification({type:"error"});case 17:return t.prev=17,this.setLoading({type:"partial",value:!1}),t.finish(17);case 20:case"end":return t.stop()}}),t,this,[[3,13,17,20]])})));function r(){return t.apply(this,arguments)}return r}(),normalizeTurmasEPedidosSIGA:function(t,r){var e,o=this,i=Object(f["a"])(t[0]),a=[],n={},s=O(t);try{var l=function(){var t=e.value,s=Object(f["c"])(t,i,null,r);if(!s)return"continue";s.pedidosSIGA=[];var l=Object(f["b"])(t,i,null);if(l){var c=l.vagasOferecidas,u=l.vagasOcupadas;l.totalVagas=c+u}if(o.turmasAreEqual(n,s)){if(l){var d=a[a.length-1].pedidosSIGA.findIndex((function(t){return t.Curso===l.Curso}));-1===d&&a[a.length-1].pedidosSIGA.push(l)}}else l&&s.pedidosSIGA.push(l),a.push(s),n=b({},s)};for(s.s();!(e=s.n()).done;)l()}catch(c){s.e(c)}finally{s.f()}return a},searchConflitos:function(t,r){var e=this;this.turmasConflitos=[];var o=[],i=this.AllTurmas.filter((function(t){return t.periodo===r&&15!=t.disciplina.Perfil}));i.forEach((function(r){var i=t.find((function(t){return r.Disciplina==t.Disciplina&&r.letra==t.letra})),a=b(b({},r),{},{conflitos:[]});if(!i)return a.conflitos.push({label:"Turma existe apenas no sistema",siga:"-",sistema:"-",curso:Object(p["a"])({codigo:"-"})}),void o.push(a);if(e.docentesAreEqual(r,i)||a.conflitos.push({label:"Docentes diferentes",siga:e.generateDocentesText(i.Docente1,i.Docente2),sistema:e.generateDocentesText(r.Docente1,r.Docente2),curso:Object(p["a"])({codigo:"-"})}),e.horariosAreEqual(r,i)||a.conflitos.push({label:"Horarios diferentes",siga:e.generateHorariosText(i.Horario1,i.Horario2),sistema:e.generateHorariosText(r.Horario1,r.Horario2),curso:Object(p["a"])({codigo:"-"})}),!Object(l["a"])(e.disciplinasGradeDCC1Periodo,["Disciplina",r.Disciplina])){var n=e.Pedidos[r.id]||[];i.pedidosSIGA.forEach((function(t){var r=n.find((function(r){return r.Curso==t.Curso}));if(r){var o=r.vagasPeriodizadas+r.vagasNaoPeriodizadas;o==t.totalVagas||a.conflitos.push({label:"Pedido com valores diferentes",siga:t.totalVagas,sistema:0==o?"-":o,curso:e.AllCursos.find((function(t){return t.id===r.Curso}))})}else a.conflitos.push({label:"Pedido não existe no sistema",siga:t.totalVagas,sistema:"-",curso:e.AllCursos.find((function(r){return r.id===t.Curso}))})})),n.filter((function(t){return 0!=t.vagasPeriodizadas||0!=t.vagasNaoPeriodizadas})).forEach((function(t){var r=i.pedidosSIGA.find((function(r){return t.Curso==r.Curso}));r||a.conflitos.push({label:"Pedido não existe no SIGA",siga:"-",sistema:t.vagasPeriodizadas+t.vagasNaoPeriodizadas,curso:e.AllCursos.find((function(r){return r.id===t.Curso}))})}))}a.conflitos.length&&o.push(a)})),this.turmasConflitos=o},turmasAreEqual:function(t,r){return t.letra===r.letra&&t.Disciplina===r.Disciplina&&t.Horario1===r.Horario1&&t.Horario2===r.Horario2},docentesAreEqual:function(t,r){return t.Docente1==r.Docente1&&t.Docente2==r.Docente2||t.Docente1==r.Docente2&&t.Docente2==r.Docente1},horariosAreEqual:function(t,r){return t.Horario1==r.Horario1&&t.Horario2==r.Horario2||t.Horario1==r.Horario2&&t.Horario2==r.Horario1||(null==t.Horario1&&(t.Horario2==r.Horario1||t.Horario2==r.Horario2)||(null==r.Horario1&&(r.Horario2==t.Horario1||r.Horario2==t.Horario2)||(null==t.Horario2&&(t.Horario1==r.Horario1||t.Horario1==r.Horario2)||null==r.Horario2&&(r.Horario1==t.Horario1||r.Horario1==t.Horario2))))}},computed:b(b({},Object(s["c"])(["AllCursos","AllTurmas","PeriodosLetivos","Pedidos","DisciplinasGrades"])),{},{turmasConflitosOrdered:function(){var t=this.ordenacaoConflitos,r=t.order,e=t.type;return Object(c["a"])(this.turmasConflitos,r,e)},disciplinasGradeDCC1Periodo:function(){var t=this.DisciplinasGrades.filter((function(t){return 1===t.periodo})),r=[];return t.forEach((function(t){var e=r.find((function(r){return r.Disciplina===t.Disciplina}));e||r.push(b({},t))})),r}})},D=y,S=e("2877"),j=Object(S["a"])(D,o,i,!1,null,null,null);r["default"]=j.exports},d2c8:function(t,r,e){var o=e("aae3"),i=e("be13");t.exports=function(t,r,e){if(o(r))throw TypeError("String#"+e+" doesn't accept regex!");return String(i(t))}}}]);
//# sourceMappingURL=chunk-0474f478.96e67878.js.map