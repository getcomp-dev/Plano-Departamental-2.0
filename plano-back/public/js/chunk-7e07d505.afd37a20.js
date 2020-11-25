(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e07d505","chunk-5eac8872"],{6847:function(t,r,e){},"85f4":function(t,r,e){"use strict";var a=e("d95c"),o=e.n(a);o.a},ab6d:function(t,r,e){"use strict";e.r(r);var a=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"main-component row p-0"},[e("PageHeader",{attrs:{title:"Turmas - Cursos"}},[e("BaseButton",{attrs:{template:"relatorio"},on:{click:function(r){return t.toggleAsideModal("relatorio")}}}),e("BaseButton",{attrs:{template:"download"},on:{click:t.downloadTurmasCursos}})],1),e("div",{staticClass:"div-table"},[e("BaseTable",{scopedSlots:t._u([{key:"thead",fn:function(){return[e("v-th",{attrs:{width:"80",title:"Código do Curso"}},[t._v("Cód. Curso")]),e("v-th",{attrs:{width:"300",title:"Nome do Curso"}},[t._v("Nome do Curso")]),e("v-th",{attrs:{width:"40",title:"Período"}},[t._v("P.")]),e("v-th",{attrs:{width:"80",title:"Código da Disciplina"}},[t._v("Disciplina")]),e("v-th",{attrs:{width:"40",title:"Turma"}},[t._v("T.")]),e("v-th",{attrs:{width:"120",title:"Horário"}},[t._v("Horário")]),e("v-th",{attrs:{width:"80",title:"Vagas da Grade"}},[t._v("Grade")]),e("v-th",{attrs:{width:"80",title:"Vagas Não Grade"}},[t._v("Não Grade")])]},proxy:!0},{key:"tbody",fn:function(){return[t._l(t.CursosOrdered,(function(r){return[e("tr",{key:"Curso"+r.id,staticStyle:{"background-color":"#f1f1f1"}},[e("v-td",{attrs:{width:"80"}},[t._v(t._s(r.codigo))]),e("v-td",{attrs:{width:"300"}},[t._v(t._s(r.nome))]),e("v-td",{attrs:{width:"40"}}),e("v-td",{attrs:{width:"80"}}),e("v-td",{attrs:{width:"40"}}),e("v-td",{attrs:{width:"120"}}),e("v-td",{attrs:{width:"80"}}),e("v-td",{attrs:{width:"80"}})],1),t._l(t.turmas(r.id),(function(a){return e("tr",{key:"Curso"+r.id+"Turma"+a.turma.id},[e("v-td",{attrs:{width:"80"}}),e("v-td",{attrs:{width:"300"}}),e("v-td",{attrs:{width:"40"}},[t._v(t._s(a.turma.periodo))]),e("v-td",{attrs:{width:"80"}},[t._v(t._s(a.turma.disciplina.codigo))]),e("v-td",{attrs:{width:"40"}},[t._v(t._s(a.turma.letra))]),e("v-td",{attrs:{width:"120"}},[t._v(t._s(t.horarioTotal(a.turma)))]),e("v-td",{attrs:{width:"80"}},[t._v(t._s(a.pedido.vagasPeriodizadas))]),e("v-td",{attrs:{width:"80"}},[t._v(t._s(a.pedido.vagasNaoPeriodizadas))])],1)}))]}))]},proxy:!0}])})],1),e("ModalRelatorio",{ref:"modalRelatorio",on:{"selection-option":function(r){return t.pdf(r)}}}),e("ModalAjuda",{ref:"modalAjuda"},[e("li",{staticClass:"list-group-item"},[e("b",[t._v("Visualizar plano:")]),t._v("\n      Clique no ícone filtros\n      "),e("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","list-ul"]}}),t._v("\n      . Em seguida, utilize as abas para navegar entre os filtros. Selecione as\n      informações que deseja visualizar e clique em OK.\n    ")],1),e("li",{staticClass:"list-group-item"},[e("b",[t._v("Relatório :")]),t._v("\n      Clique no ícone relatório\n      "),e("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","file-alt"]}}),t._v("\n      . Em seguida, indique se deseja gerar o relatório completo com todas as\n      disciplinas ou o relatório parcial com as disciplinas exibidas na tela.\n    ")],1),e("li",{staticClass:"list-group-item"},[e("b",[t._v("Visualizar vagas por turma:")]),t._v("\n      Clique no número de vagas desta turma, na última coluna da tabela, na linha\n      correspondente.\n    ")])])],1)},o=[],i=(e("1c01"),e("58b2"),e("8e6e"),e("d25f"),e("456d"),e("ade3")),s=(e("96cf"),e("1da1")),n=(e("7514"),e("ac6a"),e("f3e2"),e("2909")),d=e("2f62"),c=e("7556"),l=(e("eaf8"),e("9165")),u=e("25df"),f=e("d027"),p=e("bec4"),v=e("2ef0"),m=e.n(v),h=e("027e"),g=e("21a6");function b(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,a)}return e}function _(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?b(Object(e),!0).forEach((function(r){Object(i["a"])(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):b(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}var O={name:"TurmasCursos",mixins:[l["n"],l["g"],l["f"],l["m"],l["a"],l["b"],l["l"]],components:{ModalRelatorio:f["f"],ModalFiltros:f["e"],ModalAjuda:f["a"],InputSearch:u["d"],ModalVagas:p["default"]},data:function(){var t=this;return{turmaClicked:null,searchDisciplinas:"",asideModalsRefs:["modalAjuda","modalRelatorio"],ordenacaoMain:{disciplinas:{order:"codigo",type:"asc"}},ordenacaoModal:{perfis:{order:"nome",type:"asc"},disciplinas:{order:"codigo",type:"asc"}},filtroDisciplinas:{ativados:[],selecionados:[]},filtroPerfis:{selecionados:[]},filtroPeriodos:{ativados:[],selecionados:[]},filtroSemestres:{selecionados:[]},modalFiltrosTabs:{current:"Perfis",array:["Perfis","Disciplinas","Períodos","Semestres"]},modalFiltrosCallbacks:{selectAll:{Perfis:function(){t.filtroDisciplinas.selecionados=Object(n["a"])(t.DisciplinasOptions),t.filtroPerfis.selecionados=Object(n["a"])(t.PerfisOptions)},Disciplinas:function(){t.filtroDisciplinas.selecionados=Object(n["a"])(t.DisciplinasOptions),t.filtroPerfis.selecionados=Object(n["a"])(t.PerfisOptions)},Periodos:function(){t.filtroPeriodos.selecionados=Object(n["a"])(t.PeriodosOptions),t.filtroSemestres.selecionados=Object(n["a"])(t.SemestresOptions)},Semestres:function(){t.filtroSemestres.selecionados=Object(n["a"])(t.SemestresOptions),t.filtroPeriodos.selecionados=Object(n["a"])(t.PeriodosOptions)}},selectNone:{Perfis:function(){t.filtroPerfis.selecionados=[],t.filtroDisciplinas.selecionados=[]},Disciplinas:function(){t.filtroDisciplinas.selecionados=[],t.filtroPerfis.selecionados=[]},Periodos:function(){t.filtroPeriodos.selecionados=[],t.filtroSemestres.selecionados=[]},Semestres:function(){t.filtroSemestres.selecionados=[],t.filtroPeriodos.selecionados=[]}},btnOk:function(){t.filtroPeriodos.ativados=Object(n["a"])(t.$_.orderBy(t.filtroPeriodos.selecionados,"id")),t.filtroDisciplinas.ativados=Object(n["a"])(t.filtroDisciplinas.selecionados)}}}},mounted:function(){this.turmas(1)},methods:{turmas:function(t){var r=this,e=[];return this.TurmasInDisciplinasPerfis.forEach((function(a){var o=r.Pedidos[a.id],i=m.a.find(o,["Curso",t]);(i.vagasPeriodizadas>0||i.vagasNaoPeriodizadas>0)&&e.push({turma:a,pedido:i})})),this.$_.orderBy(this.$_.orderBy(this.$_.orderBy(e,(function(t){return t.turma.letra})),(function(t){return t.turma.disciplina.codigo})),(function(t){return t.turma.periodo}))},horarioTotal:function(t){var r=m.a.find(this.$store.state.horario.Horarios,{id:t.Horario1}),e=m.a.find(this.$store.state.horario.Horarios,{id:t.Horario2}),a=void 0;return a=void 0===r&&void 0===e?"":void 0===e?r.horario:void 0===r?e.horario:r.horario+"/"+e.horario,a},pdf:function(t){c["a"].pdfTurmasCursos(this.AllCursos)},downloadTurmasCursos:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var r=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,h["a"].generatePdfTurmasCurso({Plano:localStorage.getItem("Plano")}).then((function(){return h["a"].createZipTurmasCursos().then((function(){return fetch("http://200.131.219.57:3000/api/download/downloadTurmasCursosZip",{method:"GET",headers:{Authorization:"Bearer ".concat(r.$store.state.auth.token)}}).then((function(t){return t.blob()})).then((function(t){Object(g["saveAs"])(t,"TurmasCursos.zip")}))}))}));case 2:case"end":return t.stop()}}),t)})));function r(){return t.apply(this,arguments)}return r}()},computed:_(_({},Object(d["c"])(["TurmasInDisciplinasPerfis","DisciplinasDCCInPerfis","PerfisDCC","AllPlanos","Pedidos","AllCursos"])),{},{CursosOrdered:function(){return this.$_.orderBy(this.AllCursos,"codigo")}})},P=O,w=(e("85f4"),e("2877")),y=Object(w["a"])(P,a,o,!1,null,"34cd30bb",null);r["default"]=y.exports},bec4:function(t,r,e){"use strict";e.r(r);var a=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("BaseModal",{ref:"baseModalVagas",attrs:{type:"editVagas",classes:"modal-vagas"},scopedSlots:t._u([null!==t.turma?{key:"modal-body",fn:function(){return[e("div",{staticClass:"modal-vagas-header"},[e("h2",{staticClass:"title"},[t._v("\n        "+t._s(t.turma.disciplina.codigo+" - "+t.turma.disciplina.nome)+"\n      ")]),e("label",{staticClass:"m-0 mr-2",attrs:{for:"selectTurma"}},[t._v("Turma:")]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.turmaLetraForm,expression:"turmaLetraForm"}],staticClass:"form-control select-letra",attrs:{id:"selectTurma"},on:{change:function(r){var e=Array.prototype.filter.call(r.target.options,(function(t){return t.selected})).map((function(t){var r="_value"in t?t._value:t.value;return r}));t.turmaLetraForm=r.target.multiple?e:e[0]}}},t._l(t.TurmasOptionsModalVagas,(function(r){return e("option",{key:r.id+r.letra,domProps:{value:r.letra}},[t._v("\n          "+t._s(r.letra)+"\n        ")])})),0)]),e("div",{staticClass:"div-table"},[e("BaseTable",{attrs:{styles:"height:auto"},scopedSlots:t._u([{key:"thead",fn:function(){return[e("v-th-ordination",{attrs:{currentOrder:t.ordenacaoVagas,orderToCheck:"curso.codigo",width:"65",align:"start"}},[t._v("\n            Código\n          ")]),e("v-th-ordination",{attrs:{currentOrder:t.ordenacaoVagas,orderToCheck:"curso.nome",width:"300",align:"start"}},[t._v("\n            Nome\n          ")]),e("v-th-ordination",{attrs:{currentOrder:t.ordenacaoVagas,orderToCheck:"vagasPeriodizadas",orderType:"desc",width:"55",title:"Vagas periodizadas"}},[t._v("\n            Grade\n          ")]),e("v-th-ordination",{attrs:{currentOrder:t.ordenacaoVagas,orderToCheck:"vagasNaoPeriodizadas",orderType:"desc",width:"55",title:"Vagas não periodizadas"}},[t._v("\n            Extra\n          ")]),e("v-th-ordination",{attrs:{currentOrder:t.ordenacaoVagas,orderToCheck:"vagasTotais",orderType:"desc",width:"55",title:"Total de vagas"}},[t._v("\n            Total\n          ")])]},proxy:!0},{key:"tbody",fn:function(){return[t._l(t.PedidosOrdered,(function(r){return e("tr",{key:r.Turma+r.curso.codigo},[e("v-td",{attrs:{width:"65",align:"start"}},[t._v(t._s(r.curso.codigo))]),e("v-td",{attrs:{width:"300",align:"start"}},[t._v(t._s(r.curso.nome))]),e("v-td",{attrs:{width:"55"}},[t._v(t._s(r.vagasPeriodizadas))]),e("v-td",{attrs:{width:"55"}},[t._v(t._s(r.vagasNaoPeriodizadas))]),e("v-td",{attrs:{width:"55"}},[t._v(t._s(r.vagasTotais))])],1)})),e("tr",{directives:[{name:"show",rawName:"v-show",value:!t.PedidosOrdered.length,expression:"!PedidosOrdered.length"}]},[e("v-td",{attrs:{colspan:"5",width:"530"}},[e("b",[t._v("Turma atual não possui nenhuma vaga cadastrada")])])],1)]},proxy:!0}],null,!1,806228415)})],1)]},proxy:!0}:null],null,!0)})},o=[],i=(e("1c01"),e("58b2"),e("8e6e"),e("f3e2"),e("ac6a"),e("456d"),e("6d67"),e("d25f"),e("7514"),e("ade3")),s=e("2f62");function n(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,a)}return e}function d(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?n(Object(e),!0).forEach((function(r){Object(i["a"])(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):n(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}var c={name:"ModalVagas",props:{turma:{type:null|Object,required:!0}},data:function(){return{turmaLetraForm:null,ordenacaoVagas:{order:"vagasTotais",type:"desc"}}},methods:{open:function(){this.$refs.baseModalVagas.open()},close:function(){this.$refs.baseModalVagas.close()}},computed:d(d({},Object(s["c"])(["TurmasInDisciplinasPerfis","AllCursos"])),{},{PedidosOrdered:function(){return this.$_.orderBy(this.PedidosFiltredByTurma,this.ordenacaoVagas.order,this.ordenacaoVagas.type)},PedidosFiltredByTurma:function(){var t=this;if(null===this.turmaLetraForm)return[];var r=this.$_.find(this.TurmasOptionsModalVagas,["letra",this.turmaLetraForm]),e=this.$_.filter(this.Pedidos[r.id],(function(t){return t.vagasPeriodizadas>0||t.vagasNaoPeriodizadas>0}));return this.$_.map(e,(function(r){var e=t.$_.find(t.AllCursos,["id",r.Curso]);return d(d({},r),{},{vagasTotais:r.vagasPeriodizadas+r.vagasNaoPeriodizadas,curso:e})}))},TurmasOptionsModalVagas:function(){var t=this;if(null===this.turma)return[];var r=this.$_.filter(this.TurmasInDisciplinasPerfis,(function(r){return r.Disciplina===t.turma.Disciplina&&r.periodo===t.turma.periodo}));return this.$_.orderBy(r,["periodo"])},Pedidos:function(){return this.$store.state.pedido.Pedidos}}),watch:{turma:function(t){this.turmaLetraForm=t.letra}}},l=c,u=(e("c182"),e("2877")),f=Object(u["a"])(l,a,o,!1,null,"1f592a77",null);r["default"]=f.exports},c182:function(t,r,e){"use strict";var a=e("6847"),o=e.n(a);o.a},d95c:function(t,r,e){}}]);
//# sourceMappingURL=chunk-7e07d505.afd37a20.js.map