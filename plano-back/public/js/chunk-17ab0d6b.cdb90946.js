(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-17ab0d6b"],{"278e":function(a,t,s){},6057:function(a,t,s){"use strict";var e=s("278e"),r=s.n(e);r.a},bec4:function(a,t,s){"use strict";s.r(t);var e=function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("BaseModal",{ref:"baseModalVagas",attrs:{type:"editVagas",classes:"modal-vagas"},scopedSlots:a._u([null!==a.turma?{key:"modal-body",fn:function(){return[s("div",{staticClass:"modal-vagas-header"},[s("h2",{staticClass:"title"},[a._v("\n        "+a._s(a.turma.disciplina.codigo+" - "+a.turma.disciplina.nome)+"\n      ")]),s("label",{staticClass:"m-0 mr-2",attrs:{for:"selectTurma"}},[a._v("Turma:")]),s("select",{directives:[{name:"model",rawName:"v-model",value:a.turmaLetraForm,expression:"turmaLetraForm"}],staticClass:"form-control select-letra",attrs:{id:"selectTurma"},on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,function(a){return a.selected}).map(function(a){var t="_value"in a?a._value:a.value;return t});a.turmaLetraForm=t.target.multiple?s:s[0]}}},a._l(a.TurmasOptionsModalVagas,function(t){return s("option",{key:"mdVagas"+t.id+t.periodo,domProps:{value:t.letra}},[a._v(a._s(t.letra))])}),0)]),s("div",{staticClass:"div-table"},[s("BaseTable",{attrs:{type:"modal"},scopedSlots:a._u([{key:"thead",fn:function(){return[s("th",{staticClass:"clickable",staticStyle:{width:"55px"},attrs:{title:"Código"},on:{click:function(t){return a.toggleOrder(a.ordenacaoVagas,"curso.codigo")}}},[a._v("\n            Cód.\n            "),s("i",{class:a.setIconByOrder(a.ordenacaoVagas,"curso.codigo")})]),s("th",{staticClass:"clickable t-start",staticStyle:{width:"300px"},on:{click:function(t){return a.toggleOrder(a.ordenacaoVagas,"curso.nome")}}},[a._v("\n            Nome\n            "),s("i",{class:a.setIconByOrder(a.ordenacaoVagas,"curso.nome")})]),s("th",{staticClass:"clickable less-padding",staticStyle:{width:"55px"},attrs:{title:"Vagas periodizadas"},on:{click:function(t){return a.toggleOrder(a.ordenacaoVagas,"vagasPeriodizadas","desc")}}},[a._v("\n            Grade\n            "),s("i",{class:a.setIconByOrder(a.ordenacaoVagas,"vagasPeriodizadas")})]),s("th",{staticClass:"clickable less-padding",staticStyle:{width:"55px"},attrs:{title:"Vagas não periodizadas"},on:{click:function(t){return a.toggleOrder(a.ordenacaoVagas,"vagasNaoPeriodizadas","desc")}}},[a._v("\n            Extra\n            "),s("i",{class:a.setIconByOrder(a.ordenacaoVagas,"vagasNaoPeriodizadas")})]),s("th",{staticClass:"clickable less-padding",staticStyle:{width:"55px"},attrs:{title:"Total de vagas"},on:{click:function(t){return a.toggleOrder(a.ordenacaoVagas,"vagasTotais","desc")}}},[a._v("\n            Total\n            "),s("i",{class:a.setIconByOrder(a.ordenacaoVagas,"vagasTotais")})])]},proxy:!0},{key:"tbody",fn:function(){return[a._l(a.PedidosOrdered,function(t){return s("tr",{key:"trPedido"+t.Curso+t.Turma},[s("td",{staticStyle:{width:"55px"}},[a._v(a._s(t.curso.codigo))]),s("td",{staticClass:"t-start",staticStyle:{width:"300px"}},[a._v("\n              "+a._s(t.curso.nome)+"\n            ")]),s("td",{staticStyle:{width:"55px"}},[a._v(a._s(t.vagasPeriodizadas))]),s("td",{staticStyle:{width:"55px"}},[a._v(a._s(t.vagasNaoPeriodizadas))]),s("td",{staticStyle:{width:"55px"}},[a._v("\n              "+a._s(t.vagasTotais)+"\n            ")])])}),s("tr",{directives:[{name:"show",rawName:"v-show",value:!a.PedidosOrdered.length,expression:"!PedidosOrdered.length"}]},[s("td",{staticStyle:{width:"520px"},attrs:{colspan:"5"}},[s("b",[a._v("Turma atual não possui nenhuma vaga cadastrada.")])])])]},proxy:!0}],null,!1,3993074124)})],1)]},proxy:!0}:null],null,!0)})},r=[],i=(s("6d67"),s("d25f"),s("7514"),s("cebc")),o=s("2f62"),n=s("9165"),d={name:"ModalVagas",mixins:[n["m"],n["n"]],props:{turma:{type:null|Object,required:!0}},data:function(){return{turmaLetraForm:null,ordenacaoVagas:{order:"vagasTotais",type:"desc"}}},methods:{open:function(){this.$refs.baseModalVagas.open()},close:function(){this.$refs.baseModalVagas.close()}},computed:Object(i["a"])({},Object(o["c"])(["TurmasInDisciplinasPerfis","AllCursos"]),{PedidosOrdered:function(){return this.$_.orderBy(this.PedidosFiltredByTurma,this.ordenacaoVagas.order,this.ordenacaoVagas.type)},PedidosFiltredByTurma:function(){var a=this;if(null===this.turmaLetraForm)return[];var t=this.$_.find(this.TurmasOptionsModalVagas,["letra",this.turmaLetraForm]),s=this.$_.filter(this.Pedidos[t.id],function(a){return a.vagasPeriodizadas>0||a.vagasNaoPeriodizadas>0});return this.$_.map(s,function(t){var s=a.$_.find(a.AllCursos,["id",t.Curso]);return Object(i["a"])({},t,{vagasTotais:t.vagasPeriodizadas+t.vagasNaoPeriodizadas,curso:s})})},TurmasOptionsModalVagas:function(){var a=this;if(null===this.turma)return[];var t=this.$_.filter(this.TurmasInDisciplinasPerfis,function(t){return t.Disciplina===a.turma.Disciplina&&t.periodo===a.turma.periodo});return this.$_.orderBy(t,["periodo"])},Pedidos:function(){return this.$store.state.pedido.Pedidos}}),watch:{turma:function(a){this.turmaLetraForm=a.letra}}},c=d,l=(s("6057"),s("2877")),u=Object(l["a"])(c,e,r,!1,null,"5e81087a",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-17ab0d6b.cdb90946.js.map