(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-64f42a78","chunk-5eac8872"],{6847:function(t,a,r){},a450:function(t,a,r){"use strict";var e=r("e5e4"),o=r.n(e);o.a},ab6d:function(t,a,r){"use strict";r.r(a);var e=function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("div",{staticClass:"main-component row p-0"},[r("PageHeader",{attrs:{title:"Turmas - Cursos"}},[r("BaseButton",{attrs:{template:"relatorio"},on:{click:function(a){return t.toggleAsideModal("relatorio")}}}),r("BaseButton",{attrs:{template:"download"},on:{click:t.downloadTurmasCursos}})],1),r("div",{staticClass:"div-table"},[r("BaseTable",{scopedSlots:t._u([{key:"thead",fn:function(){return[r("v-th",{attrs:{width:"80",title:"Código do Curso"}},[t._v("Cód. Curso")]),r("v-th",{attrs:{width:"300",title:"Nome do Curso"}},[t._v("Nome do Curso")]),r("v-th",{attrs:{width:"40",title:"Período"}},[t._v("P.")]),r("v-th",{attrs:{width:"80",title:"Código da Disciplina"}},[t._v("Disciplina")]),r("v-th",{attrs:{width:"40",title:"Turma"}},[t._v("T.")]),r("v-th",{attrs:{width:"120",title:"Horário"}},[t._v("Horário")]),r("v-th",{attrs:{width:"80",title:"Vagas da Grade"}},[t._v("Grade")]),r("v-th",{attrs:{width:"80",title:"Vagas Não Grade"}},[t._v("Não Grade")])]},proxy:!0},{key:"tbody",fn:function(){return[t._l(t.CursosOrdered,function(a){return[r("tr",{key:"Curso"+a.id,staticStyle:{"background-color":"#f1f1f1"}},[r("v-td",{attrs:{width:"80"}},[t._v(t._s(a.codigo))]),r("v-td",{attrs:{width:"300"}},[t._v(t._s(a.nome))]),r("v-td",{attrs:{width:"40"}}),r("v-td",{attrs:{width:"80"}}),r("v-td",{attrs:{width:"40"}}),r("v-td",{attrs:{width:"120"}}),r("v-td",{attrs:{width:"80"}}),r("v-td",{attrs:{width:"80"}})],1),t._l(t.turmas(a.id),function(e){return r("tr",{key:"Curso"+a.id+"Turma"+e.turma.id},[r("v-td",{attrs:{width:"80"}}),r("v-td",{attrs:{width:"300"}}),r("v-td",{attrs:{width:"40"}},[t._v(t._s(e.turma.periodo))]),r("v-td",{attrs:{width:"80"}},[t._v(t._s(e.turma.disciplina.codigo))]),r("v-td",{attrs:{width:"40"}},[t._v(t._s(e.turma.letra))]),r("v-td",{attrs:{width:"120"}},[t._v(t._s(t.horarioTotal(e.turma)))]),r("v-td",{attrs:{width:"80"}},[t._v(t._s(e.pedido.vagasPeriodizadas))]),r("v-td",{attrs:{width:"80"}},[t._v(t._s(e.pedido.vagasNaoPeriodizadas))])],1)})]})]},proxy:!0}])})],1),r("ModalRelatorio",{ref:"modalRelatorio",on:{"selection-option":function(a){return t.pdf(a)}}}),r("ModalAjuda",{ref:"modalAjuda"},[r("li",{staticClass:"list-group-item"},[r("b",[t._v("Visualizar plano:")]),t._v(" Clique no ícone filtros\n            "),r("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","list-ul"]}}),t._v(". Em\n            seguida, utilize as abas para navegar entre os filtros. Selecione as\n            informações que deseja visualizar e clique em OK.\n        ")],1),r("li",{staticClass:"list-group-item"},[r("b",[t._v("Relatório :")]),t._v("\n            Clique no ícone relatório\n            "),r("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","file-alt"]}}),t._v(". Em\n            seguida, indique se deseja gerar o relatório completo com todas as\n            disciplinas ou o relatório parcial com as disciplinas exibidas na tela.\n        ")],1),r("li",{staticClass:"list-group-item"},[r("b",[t._v("Visualizar vagas por turma:")]),t._v("\n            Clique no número de vagas desta turma, na última coluna da tabela, na linha\n            correspondente.\n        ")])])],1)},o=[],s=r("cebc"),i=(r("96cf"),r("3b8d")),n=(r("7514"),r("ac6a"),r("f3e2"),r("75fc")),d=r("2f62"),l=r("7556"),c=(r("eaf8"),r("9165")),u=r("25df"),f=r("d027"),v=r("bec4"),m=r("2ef0"),h=r.n(m),p=r("027e"),g=r("21a6"),_={name:"TurmasCursos",mixins:[c["n"],c["g"],c["f"],c["m"],c["a"],c["b"],c["l"]],components:{ModalRelatorio:f["f"],ModalFiltros:f["e"],ModalAjuda:f["a"],InputSearch:u["d"],ModalVagas:v["default"]},data:function(){var t=this;return{turmaClicked:null,searchDisciplinas:"",asideModalsRefs:["modalAjuda","modalRelatorio"],ordenacaoMain:{disciplinas:{order:"codigo",type:"asc"}},ordenacaoModal:{perfis:{order:"nome",type:"asc"},disciplinas:{order:"codigo",type:"asc"}},filtroDisciplinas:{ativados:[],selecionados:[]},filtroPerfis:{selecionados:[]},filtroPeriodos:{ativados:[],selecionados:[]},filtroSemestres:{selecionados:[]},modalFiltrosTabs:{current:"Perfis",array:["Perfis","Disciplinas","Períodos","Semestres"]},modalFiltrosCallbacks:{selectAll:{Perfis:function(){t.filtroDisciplinas.selecionados=Object(n["a"])(t.DisciplinasOptions),t.filtroPerfis.selecionados=Object(n["a"])(t.PerfisOptions)},Disciplinas:function(){t.filtroDisciplinas.selecionados=Object(n["a"])(t.DisciplinasOptions),t.filtroPerfis.selecionados=Object(n["a"])(t.PerfisOptions)},Periodos:function(){t.filtroPeriodos.selecionados=Object(n["a"])(t.PeriodosOptions),t.filtroSemestres.selecionados=Object(n["a"])(t.SemestresOptions)},Semestres:function(){t.filtroSemestres.selecionados=Object(n["a"])(t.SemestresOptions),t.filtroPeriodos.selecionados=Object(n["a"])(t.PeriodosOptions)}},selectNone:{Perfis:function(){t.filtroPerfis.selecionados=[],t.filtroDisciplinas.selecionados=[]},Disciplinas:function(){t.filtroDisciplinas.selecionados=[],t.filtroPerfis.selecionados=[]},Periodos:function(){t.filtroPeriodos.selecionados=[],t.filtroSemestres.selecionados=[]},Semestres:function(){t.filtroSemestres.selecionados=[],t.filtroPeriodos.selecionados=[]}},btnOk:function(){t.filtroPeriodos.ativados=Object(n["a"])(t.$_.orderBy(t.filtroPeriodos.selecionados,"id")),t.filtroDisciplinas.ativados=Object(n["a"])(t.filtroDisciplinas.selecionados)}}}},mounted:function(){this.turmas(1)},methods:{turmas:function(t){var a=this,r=[];return this.TurmasInDisciplinasPerfis.forEach(function(e){var o=a.Pedidos[e.id],s=h.a.find(o,["Curso",t]);(s.vagasPeriodizadas>0||s.vagasNaoPeriodizadas>0)&&r.push({turma:e,pedido:s})}),this.$_.orderBy(this.$_.orderBy(this.$_.orderBy(r,function(t){return t.turma.letra}),function(t){return t.turma.disciplina.codigo}),function(t){return t.turma.periodo})},horarioTotal:function(t){var a=h.a.find(this.$store.state.horario.Horarios,{id:t.Horario1}),r=h.a.find(this.$store.state.horario.Horarios,{id:t.Horario2}),e=void 0;return e=void 0===a&&void 0===r?"":void 0===r?a.horario:void 0===a?r.horario:a.horario+"/"+r.horario,e},pdf:function(t){l["a"].pdfTurmasCursos(this.AllCursos)},downloadTurmasCursos:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var a=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p["a"].generatePdfTurmasCurso({Plano:localStorage.getItem("Plano")}).then(function(){return p["a"].createZipTurmasCursos().then(function(){return fetch("http://200.131.219.57:3000/api/download/downloadTurmasCursosZip",{method:"GET",headers:{Authorization:"Bearer ".concat(a.$store.state.auth.token)}}).then(function(t){return t.blob()}).then(function(t){Object(g["saveAs"])(t,"TurmasCursos.zip")})})});case 2:case"end":return t.stop()}},t)}));function a(){return t.apply(this,arguments)}return a}()},computed:Object(s["a"])({},Object(d["c"])(["TurmasInDisciplinasPerfis","DisciplinasDCCInPerfis","PerfisDCC","AllPlanos","Pedidos","AllCursos"]),{CursosOrdered:function(){return this.$_.orderBy(this.AllCursos,"codigo")}})},P=_,w=(r("a450"),r("2877")),C=Object(w["a"])(P,e,o,!1,null,"861d6e1a",null);a["default"]=C.exports},bec4:function(t,a,r){"use strict";r.r(a);var e=function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("BaseModal",{ref:"baseModalVagas",attrs:{type:"editVagas",classes:"modal-vagas"},scopedSlots:t._u([null!==t.turma?{key:"modal-body",fn:function(){return[r("div",{staticClass:"modal-vagas-header"},[r("h2",{staticClass:"title"},[t._v("\n        "+t._s(t.turma.disciplina.codigo+" - "+t.turma.disciplina.nome)+"\n      ")]),r("label",{staticClass:"m-0 mr-2",attrs:{for:"selectTurma"}},[t._v("Turma:")]),r("select",{directives:[{name:"model",rawName:"v-model",value:t.turmaLetraForm,expression:"turmaLetraForm"}],staticClass:"form-control select-letra",attrs:{id:"selectTurma"},on:{change:function(a){var r=Array.prototype.filter.call(a.target.options,function(t){return t.selected}).map(function(t){var a="_value"in t?t._value:t.value;return a});t.turmaLetraForm=a.target.multiple?r:r[0]}}},t._l(t.TurmasOptionsModalVagas,function(a){return r("option",{key:a.id+a.letra,domProps:{value:a.letra}},[t._v("\n          "+t._s(a.letra)+"\n        ")])}),0)]),r("div",{staticClass:"div-table"},[r("BaseTable",{attrs:{styles:"height:auto"},scopedSlots:t._u([{key:"thead",fn:function(){return[r("v-th-ordination",{attrs:{currentOrder:t.ordenacaoVagas,orderToCheck:"curso.codigo",width:"65",align:"start"}},[t._v("\n            Código\n          ")]),r("v-th-ordination",{attrs:{currentOrder:t.ordenacaoVagas,orderToCheck:"curso.nome",width:"300",align:"start"}},[t._v("\n            Nome\n          ")]),r("v-th-ordination",{attrs:{currentOrder:t.ordenacaoVagas,orderToCheck:"vagasPeriodizadas",orderType:"desc",width:"55",title:"Vagas periodizadas"}},[t._v("\n            Grade\n          ")]),r("v-th-ordination",{attrs:{currentOrder:t.ordenacaoVagas,orderToCheck:"vagasNaoPeriodizadas",orderType:"desc",width:"55",title:"Vagas não periodizadas"}},[t._v("\n            Extra\n          ")]),r("v-th-ordination",{attrs:{currentOrder:t.ordenacaoVagas,orderToCheck:"vagasTotais",orderType:"desc",width:"55",title:"Total de vagas"}},[t._v("\n            Total\n          ")])]},proxy:!0},{key:"tbody",fn:function(){return[t._l(t.PedidosOrdered,function(a){return r("tr",{key:a.Turma+a.curso.codigo},[r("v-td",{attrs:{width:"65",align:"start"}},[t._v(t._s(a.curso.codigo))]),r("v-td",{attrs:{width:"300",align:"start"}},[t._v(t._s(a.curso.nome))]),r("v-td",{attrs:{width:"55"}},[t._v(t._s(a.vagasPeriodizadas))]),r("v-td",{attrs:{width:"55"}},[t._v(t._s(a.vagasNaoPeriodizadas))]),r("v-td",{attrs:{width:"55"}},[t._v(t._s(a.vagasTotais))])],1)}),r("tr",{directives:[{name:"show",rawName:"v-show",value:!t.PedidosOrdered.length,expression:"!PedidosOrdered.length"}]},[r("v-td",{attrs:{colspan:"5",width:"530"}},[r("b",[t._v("Turma atual não possui nenhuma vaga cadastrada")])])],1)]},proxy:!0}],null,!1,806228415)})],1)]},proxy:!0}:null],null,!0)})},o=[],s=(r("6d67"),r("d25f"),r("7514"),r("cebc")),i=r("2f62"),n={name:"ModalVagas",props:{turma:{type:null|Object,required:!0}},data:function(){return{turmaLetraForm:null,ordenacaoVagas:{order:"vagasTotais",type:"desc"}}},methods:{open:function(){this.$refs.baseModalVagas.open()},close:function(){this.$refs.baseModalVagas.close()}},computed:Object(s["a"])({},Object(i["c"])(["TurmasInDisciplinasPerfis","AllCursos"]),{PedidosOrdered:function(){return this.$_.orderBy(this.PedidosFiltredByTurma,this.ordenacaoVagas.order,this.ordenacaoVagas.type)},PedidosFiltredByTurma:function(){var t=this;if(null===this.turmaLetraForm)return[];var a=this.$_.find(this.TurmasOptionsModalVagas,["letra",this.turmaLetraForm]),r=this.$_.filter(this.Pedidos[a.id],function(t){return t.vagasPeriodizadas>0||t.vagasNaoPeriodizadas>0});return this.$_.map(r,function(a){var r=t.$_.find(t.AllCursos,["id",a.Curso]);return Object(s["a"])({},a,{vagasTotais:a.vagasPeriodizadas+a.vagasNaoPeriodizadas,curso:r})})},TurmasOptionsModalVagas:function(){var t=this;if(null===this.turma)return[];var a=this.$_.filter(this.TurmasInDisciplinasPerfis,function(a){return a.Disciplina===t.turma.Disciplina&&a.periodo===t.turma.periodo});return this.$_.orderBy(a,["periodo"])},Pedidos:function(){return this.$store.state.pedido.Pedidos}}),watch:{turma:function(t){this.turmaLetraForm=t.letra}}},d=n,l=(r("c182"),r("2877")),c=Object(l["a"])(d,e,o,!1,null,"1f592a77",null);a["default"]=c.exports},c182:function(t,a,r){"use strict";var e=r("6847"),o=r.n(e);o.a},e5e4:function(t,a,r){}}]);
//# sourceMappingURL=chunk-64f42a78.a2169401.js.map