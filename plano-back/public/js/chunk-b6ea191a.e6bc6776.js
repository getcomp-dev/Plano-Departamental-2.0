(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b6ea191a","chunk-6c053bf7"],{"28ce":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("tr",{staticClass:"novaturma"},[a("v-td",{attrs:{width:"25",type:"content"}}),a("v-td",{attrs:{width:"55",type:"content"}},[a("select",{directives:[{name:"model",rawName:"v-model.number",value:e.turmaForm.periodo,expression:"turmaForm.periodo",modifiers:{number:!0}}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(t){var a="_value"in t?t._value:t.value;return e._n(a)});e.$set(e.turmaForm,"periodo",t.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"1"}},[e._v("1")]),a("option",{attrs:{value:"2"}},[e._v("2")]),a("option",{attrs:{value:"3"}},[e._v("3")]),a("option",{attrs:{value:"4"}},[e._v("4")])])]),a("v-td",{attrs:{width:"80",type:"content"}},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.turmaForm.disciplina,expression:"turmaForm.disciplina"}],on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.$set(e.turmaForm,"disciplina",t.target.multiple?a:a[0])},e.handleChangeDisciplina]}},e._l(e.DisciplinasExternasInPerfis,function(t){return a("option",{key:t.id,domProps:{value:t}},[e._v(e._s(t.codigo)+"\n      ")])}),0)]),a("v-td",{attrs:{width:"330",type:"content"}},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.turmaForm.disciplina,expression:"turmaForm.disciplina"}],on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.$set(e.turmaForm,"disciplina",t.target.multiple?a:a[0])},e.handleChangeDisciplina]}},e._l(e.DisciplinasExternasInPerfisOrderedByNome,function(t){return a("option",{key:t.id+t.codigo,domProps:{value:t}},[e._v(e._s(t.nome)+"\n      ")])}),0)]),a("v-td",{attrs:{width:"25"}},[e._v(e._s(e.totalCarga))]),a("v-td",{attrs:{width:"45",type:"content"}},[a("input",{staticStyle:{width:"30px"},attrs:{type:"text"},domProps:{value:e.turmaForm.letra},on:{input:function(t){e.turmaForm.letra=t.target.value.toUpperCase()},keypress:e.maskTurmaLetra}})]),a("v-td",{attrs:{width:"80",type:"content"}},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.turmaForm.turno1,expression:"turmaForm.turno1"}],on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.$set(e.turmaForm,"turno1",t.target.multiple?a:a[0])},e.handleChangeTurno]}},[e.disciplinaIsIntegralEAD?a("option",{attrs:{value:"EAD"}},[e._v("EAD")]):[a("option",{attrs:{value:"Diurno"}},[e._v("Diurno")]),a("option",{attrs:{value:"Noturno"}},[e._v("Noturno")])]],2)]),a("v-td",{attrs:{width:"85",type:"content"}},[a("select",{directives:[{name:"model",rawName:"v-model.number",value:e.turmaForm.Horario1,expression:"turmaForm.Horario1",modifiers:{number:!0}}],on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(t){var a="_value"in t?t._value:t.value;return e._n(a)});e.$set(e.turmaForm,"Horario1",t.target.multiple?a:a[0])},function(t){return e.handleChangeHorario(1)}]}},e._l(e.HorariosFiltredByTurno,function(t){return a("option",{key:t.id+t.horario,domProps:{value:t.id}},[e._v(e._s(t.horario)+"\n      ")])}),0),a("select",{directives:[{name:"model",rawName:"v-model.number",value:e.turmaForm.Horario2,expression:"turmaForm.Horario2",modifiers:{number:!0}}],on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(t){var a="_value"in t?t._value:t.value;return e._n(a)});e.$set(e.turmaForm,"Horario2",t.target.multiple?a:a[0])},function(t){return e.handleChangeHorario(2)}]}},e._l(e.HorariosFiltredByTurno,function(t){return a("option",{key:t.horario+t.id,domProps:{value:t.id}},[e._v(e._s(t.horario)+"\n      ")])}),0)]),a("v-td",{attrs:{width:"95",type:"content"}},[e.disciplinaIsIntegralEAD?e._e():[a("select",{directives:[{name:"model",rawName:"v-model.number",value:e.turmaForm.Sala1,expression:"turmaForm.Sala1",modifiers:{number:!0}}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(t){var a="_value"in t?t._value:t.value;return e._n(a)});e.$set(e.turmaForm,"Sala1",t.target.multiple?a:a[0])}}},[a("option"),e._l(e.AllSalas,function(t){return a("option",{key:t.id+t.nome,domProps:{value:t.id}},[e._v(e._s(t.nome)+"\n        ")])})],2),e.totalCarga>=4&&!e.disciplinaIsParcialEAD?a("select",{directives:[{name:"model",rawName:"v-model.number",value:e.turmaForm.Sala2,expression:"turmaForm.Sala2",modifiers:{number:!0}}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(t){var a="_value"in t?t._value:t.value;return e._n(a)});e.$set(e.turmaForm,"Sala2",t.target.multiple?a:a[0])}}},[a("option"),e._l(e.AllSalas,function(t){return a("option",{key:t.nome+t.id,domProps:{value:t.id}},[e._v(e._s(t.nome)+"\n        ")])})],2):e._e()]],2),a("v-td",{attrs:{width:"45"}}),e._l(4,function(e){return a("v-td",{key:e,attrs:{width:"35"}})})],2)},i=[],o=a("e814"),s=a.n(o),n=(a("d25f"),a("96cf"),a("3b8d")),l=(a("759f"),a("cebc")),c=a("2f62"),d=a("9165"),u={id:null,periodo:1,letra:"A",turno1:null,turno2:null,Disciplina:null,Docente1:null,Docente2:null,Horario1:null,Horario2:null,Sala1:null,Sala2:null,disciplina:null},m={name:"NovaTurmaExternaRow",mixins:[d["j"]],data:function(){return{turmaForm:this.$_.clone(u)}},methods:Object(l["a"])({},Object(c["b"])(["createTurmaExterna"]),{handleChangeTurno:function(){this.turmaForm.Horario1=null,this.turmaForm.Horario2=null},handleChangeDisciplina:function(){this.turmaForm.Disciplina=this.turmaForm.disciplina.id,this.turmaForm.turno1=null,this.turmaForm.Horario1=null,this.turmaForm.Horario2=null,this.turmaForm.Docente1=null,this.turmaForm.Docente2=null,this.disciplinaIsIntegralEAD?(this.turmaForm.turno1="EAD",this.turmaForm.Horario1=31,this.turmaForm.Horario2=31):this.disciplinaIsParcialEAD&&(this.turmaForm.Horario2=31)},handleChangeHorario:function(e){1===e?this.setTurnoByHorario(this.turmaForm.Horario1):this.disciplinaIsParcialEAD||this.setTurnoByHorario(this.turmaForm.Horario2)},setTurnoByHorario:function(e){31==e&&this.disciplinaIsIntegralEAD?this.turmaForm.turno1="EAD":this.$_.some(this.HorariosNoturno,["id",e])?this.turmaForm.turno1="Noturno":this.$_.some(this.HorariosDiurno,["id",e])&&(this.turmaForm.turno1="Diurno")},handleCreateTurmaExterna:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setPartialLoading(!0),e.next=4,this.createTurmaExterna(this.turmaForm);case 4:e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](0),this.pushNotification({type:"error",title:"Erro ao criar nova turma!",text:e.t0.response?"A combinação de disciplina, período e turma deve ser única.":e.t0.message});case 9:return e.prev=9,this.setPartialLoading(!1),e.finish(9);case 12:case"end":return e.stop()}},e,this,[[0,6,9,12]])}));function t(){return e.apply(this,arguments)}return t}()}),computed:Object(l["a"])({},Object(c["c"])(["DisciplinasExternasInPerfis","AllHorarios","HorariosEAD","HorariosNoturno","HorariosDiurno","AllSalas"]),{DisciplinasExternasInPerfisOrderedByNome:function(){return this.$_.orderBy(this.DisciplinasExternasInPerfis,["nome"])},HorariosFiltredByTurno:function(){if(this.disciplinaIsIntegralEAD)return this.HorariosEAD;switch(this.turmaForm.turno1){case"Noturno":return this.HorariosNoturno;case"Diurno":return this.HorariosDiurno;case"EAD":return this.HorariosEAD;default:return this.$_.filter(this.AllHorarios,function(e){return 31!=e.id})}},totalCarga:function(){return this.turmaForm.disciplina?s()(this.turmaForm.disciplina.cargaTeorica)+s()(this.turmaForm.disciplina.cargaPratica):""},disciplinaIsIntegralEAD:function(){return!!this.turmaForm.disciplina&&1===this.turmaForm.disciplina.ead},disciplinaIsParcialEAD:function(){return!!this.turmaForm.disciplina&&2===this.turmaForm.disciplina.ead}})},p=m,v=(a("a29d"),a("2877")),h=Object(v["a"])(p,r,i,!1,null,"6103a669",null);t["default"]=h.exports},"2bc4":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.isEditable?a("div",{staticClass:"main-component row"},[a("PageHeader",{attrs:{title:"Graduação - Outros"}},[a("BaseButton",{directives:[{name:"show",rawName:"v-show",value:e.isAdding,expression:"isAdding"}],attrs:{template:"salvar"},on:{click:function(t){return e.$refs.novaTurmaExternaRow.handleCreateTurmaExterna()}}}),a("BaseButton",{directives:[{name:"show",rawName:"v-show",value:e.isAdding,expression:"isAdding"}],attrs:{template:"cancelar"},on:{click:e.toggleAddRow}}),a("BaseButton",{directives:[{name:"show",rawName:"v-show",value:!e.isAdding,expression:"!isAdding"}],attrs:{template:"adicionar"},on:{click:e.toggleAddRow}}),a("BaseButton",{directives:[{name:"show",rawName:"v-show",value:!e.isAdding,expression:"!isAdding"}],attrs:{template:"deletar",title:"Deletar selecionados"},on:{click:e.openModalDelete}}),a("BaseButton",{attrs:{template:"filtros"},on:{click:function(t){return e.toggleAsideModal("filtros")}}}),a("BaseButton",{attrs:{template:"ajuda"},on:{click:function(t){return e.toggleAsideModal("ajuda")}}})],1),a("div",{staticClass:"div-table"},[a("BaseTable",{scopedSlots:e._u([{key:"thead",fn:function(){return[a("v-th",{attrs:{width:"25"}}),a("v-th",{attrs:{width:"55",title:"Período letivo"}},[e._v("P.")]),a("v-th-ordination",{attrs:{currentOrder:e.ordenacaoTurmasMain,orderToCheck:"disciplina.codigo",width:"80",text:"Código"}},[e._v("Código\n        ")]),a("v-th-ordination",{attrs:{currentOrder:e.ordenacaoTurmasMain,orderToCheck:"disciplina.nome",width:"330",align:"start"}},[e._v("Disciplina\n        ")]),a("v-th",{attrs:{width:"25",title:"Créditos"}},[e._v("C.")]),a("v-th",{attrs:{width:"45",title:"Turma"}},[e._v("T.")]),a("v-th",{attrs:{width:"80"}},[e._v("Turno")]),a("v-th",{attrs:{width:"85"}},[e._v("Horário")]),a("v-th",{attrs:{width:"95"}},[e._v("Sala")]),a("v-th",{attrs:{width:"45",title:"Total de vagas"}},[e._v("Total")]),e._l(e.PrincipaisCursosDCC,function(t){return a("v-th",{directives:[{name:"b-popover",rawName:"v-b-popover.hover.bottom",value:{title:t.nome,content:e.cursoPopoverContent(t)},expression:"{\n            title: curso.nome,\n            content: cursoPopoverContent(curso),\n          }",modifiers:{hover:!0,bottom:!0}}],key:t.id+t.nome,attrs:{width:"35"}},[e._v("\n          "+e._s(t.codigo)+"\n        ")])})]},proxy:!0},{key:"add-row",fn:function(){return[a("NovaTurmaExternaRow",{directives:[{name:"show",rawName:"v-show",value:e.isAdding,expression:"isAdding"}],ref:"novaTurmaExternaRow"})]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.TurmasExternasOrdered,function(e){return a("TurmaExternaRow",{key:e.id+e.letra+e.Disciplina,attrs:{turma:e}})}),a("tr",{directives:[{name:"show",rawName:"v-show",value:!e.TurmasExternasOrdered.length,expression:"!TurmasExternasOrdered.length"}]},[a("v-td",{attrs:{width:"1005"}},[a("b",[e._v("Nenhuma turma encontrada.")]),e._v(" Clique no botão de filtros\n            "),a("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","list-ul"]}}),e._v("\n            para selecioná-las.\n          ")],1)],1)]},proxy:!0}],null,!1,3587665995)})],1),a("ModalFiltros",{ref:"modalFiltros",attrs:{callbacks:e.modalFiltrosCallbacks,tabsOptions:e.modalFiltrosTabs}},[a("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Disciplinas"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Disciplinas'"}],attrs:{type:"modal",hasSearchBar:!0},scopedSlots:e._u([{key:"thead-search",fn:function(){return[a("InputSearch",{attrs:{placeholder:"Pesquise nome ou codigo de uma disciplina..."},model:{value:e.searchDisciplinasModal,callback:function(t){e.searchDisciplinasModal=t},expression:"searchDisciplinasModal"}})]},proxy:!0},{key:"thead",fn:function(){return[a("v-th",{attrs:{width:"25"}}),a("v-th-ordination",{attrs:{currentOrder:e.ordenacaoDisciplinasModal,orderToCheck:"codigo",width:"70",align:"start"}},[e._v("Código\n        ")]),a("v-th-ordination",{attrs:{currentOrder:e.ordenacaoDisciplinasModal,orderToCheck:"nome",width:"295",align:"start"}},[e._v("Nome\n        ")]),a("v-th-ordination",{attrs:{currentOrder:e.ordenacaoDisciplinasModal,orderToCheck:"perfil.abreviacao",width:"60",align:"start"}},[e._v("Perfis\n        ")])]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.DisciplinasOptionsOrdered,function(t){return a("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:t.id+t.nome,on:{click:function(a){return e.toggleItemInArray(t,e.filtroDisciplinas.selecionadas)}}},[a("v-td",{attrs:{width:"25"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.filtroDisciplinas.selecionadas,expression:"filtroDisciplinas.selecionadas"}],staticClass:"form-check-input position-static m-0",attrs:{type:"checkbox"},domProps:{value:t,checked:Array.isArray(e.filtroDisciplinas.selecionadas)?e._i(e.filtroDisciplinas.selecionadas,t)>-1:e.filtroDisciplinas.selecionadas},on:{change:function(a){var r=e.filtroDisciplinas.selecionadas,i=a.target,o=!!i.checked;if(Array.isArray(r)){var s=t,n=e._i(r,s);i.checked?n<0&&e.$set(e.filtroDisciplinas,"selecionadas",r.concat([s])):n>-1&&e.$set(e.filtroDisciplinas,"selecionadas",r.slice(0,n).concat(r.slice(n+1)))}else e.$set(e.filtroDisciplinas,"selecionadas",o)}}})]),a("v-td",{attrs:{width:"70",align:"start"}},[e._v(e._s(t.codigo)+" ")]),a("v-td",{attrs:{width:"295",align:"start"}},[e._v(e._s(t.nome)+" ")]),a("v-td",{attrs:{width:"60",align:"start"}},[e._v(e._s(t.perfil.abreviacao)+" ")])],1)}),a("tr",{directives:[{name:"show",rawName:"v-show",value:!e.DisciplinasOptionsOrdered.length,expression:"!DisciplinasOptionsOrdered.length"}]},[a("v-td",{attrs:{colspan:"3",width:"450"}},[e._v("\n            NENHUMA DISCIPLINA ENCONTRADA.\n          ")])],1)]},proxy:!0}],null,!1,2775625209)}),a("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Períodos"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Períodos'"}],attrs:{type:"modal"},scopedSlots:e._u([{key:"thead",fn:function(){return[a("v-th",{attrs:{width:"25"}}),a("v-th",{attrs:{width:"425",align:"start"}},[e._v("Periodos Letivo")])]},proxy:!0},{key:"tbody",fn:function(){return e._l(e.PeriodosOptions,function(t){return a("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:t.id+t.nome,on:{click:function(a){return e.selecionaPeriodo(t,e.filtroPeriodos.selecionados)}}},[a("v-td",{attrs:{width:"25"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.filtroPeriodos.selecionados,expression:"filtroPeriodos.selecionados"}],staticClass:"form-check-input position-static m-0",attrs:{type:"checkbox"},domProps:{value:t,checked:Array.isArray(e.filtroPeriodos.selecionados)?e._i(e.filtroPeriodos.selecionados,t)>-1:e.filtroPeriodos.selecionados},on:{click:function(a){return a.stopPropagation(),e.selecionaPeriodo(t)},change:function(a){var r=e.filtroPeriodos.selecionados,i=a.target,o=!!i.checked;if(Array.isArray(r)){var s=t,n=e._i(r,s);i.checked?n<0&&e.$set(e.filtroPeriodos,"selecionados",r.concat([s])):n>-1&&e.$set(e.filtroPeriodos,"selecionados",r.slice(0,n).concat(r.slice(n+1)))}else e.$set(e.filtroPeriodos,"selecionados",o)}}})]),a("v-td",{attrs:{width:"425",align:"start"}},[e._v(e._s(t.nome))])],1)})},proxy:!0}],null,!1,2937044334)}),a("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Semestres"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Semestres'"}],attrs:{type:"modal"},scopedSlots:e._u([{key:"thead",fn:function(){return[a("v-th",{attrs:{width:"25"}}),a("v-th",{attrs:{width:"425",align:"start"}},[e._v("Semestre Letivo")])]},proxy:!0},{key:"tbody",fn:function(){return e._l(e.SemestresOptions,function(t){return a("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:t.id+t.nome,on:{click:function(a){return e.selecionaSemestre(t)}}},[a("v-td",{attrs:{width:"25"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.filtroSemestres.selecionados,expression:"filtroSemestres.selecionados"}],staticClass:"form-check-input position-static m-0",attrs:{type:"checkbox"},domProps:{indeterminate:t.halfChecked,value:t,checked:Array.isArray(e.filtroSemestres.selecionados)?e._i(e.filtroSemestres.selecionados,t)>-1:e.filtroSemestres.selecionados},on:{click:function(a){return a.stopPropagation(),e.selecionaSemestre(t)},change:function(a){var r=e.filtroSemestres.selecionados,i=a.target,o=!!i.checked;if(Array.isArray(r)){var s=t,n=e._i(r,s);i.checked?n<0&&e.$set(e.filtroSemestres,"selecionados",r.concat([s])):n>-1&&e.$set(e.filtroSemestres,"selecionados",r.slice(0,n).concat(r.slice(n+1)))}else e.$set(e.filtroSemestres,"selecionados",o)}}})]),a("v-td",{attrs:{width:"425",align:"start"}},[e._v(e._s(t.nome))])],1)})},proxy:!0}],null,!1,2515136364)})],1),a("ModalDelete",{ref:"modalDelete",attrs:{isDeleting:!!e.TurmasExternasToDelete.length,hasClearDelete:!0},on:{"btn-deletar":e.handleDeleteTurmas,"btn-clear":e.clearTurmasExternasToDelete}},[e.TurmasExternasToDelete.length?e._e():a("li",{staticClass:"list-group-item"},[e._v("\n      Nenhuma turma selecionada.\n    ")]),e._l(e.TurmasExternasToDelete,function(t){return a("li",{key:t.id+t.letra+t.periodo,staticClass:"list-group-item"},[a("span",[a("b",[e._v("Periodo:")]),e._v("\n        "+e._s(t.periodo)+" -\n        "),a("b",[e._v("Turma:")]),e._v("\n        "+e._s(t.letra)+"\n      ")]),a("span",[a("b",[e._v("Disciplina:")]),e._v("\n        "+e._s(t.disciplina.nome)+"\n      ")])])})],2),a("ModalAjuda",{ref:"modalAjuda"},[a("li",{staticClass:"list-group-item"},[a("b",[e._v("Visualizar conteúdo:")]),e._v("\n      Clique no ícone de filtros\n      "),a("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","list-ul"]}}),e._v(" no\n      cabeçalho da página e, na janela que se abrirá, utilize as abas para navegar\n      entre os tipos de filtro disponíveis. Marque quais informações deseja\n      visualizar, e para finalizar clique no botão OK.\n    ")],1),a("li",{staticClass:"list-group-item"},[a("b",[e._v("Adicionar turma:")]),e._v(" Clique no ícone de adicionar\n      "),a("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","plus"]}}),e._v(" no cabeçalho\n      da página. Em seguida, preencha a nova linha que irá aparecer no início da\n      tabela. Note que os campos disciplina e turma são obrigatórios. Após\n      preencher os campos, clique no ícone de salvar\n      "),a("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","check"]}}),e._v(" ou de\n      cancelar "),a("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","times"]}}),e._v(".\n    ")],1),a("li",{staticClass:"list-group-item"},[a("b",[e._v("Deletar turma:")]),e._v(" Marque a(s) turma(s) que deseja deletar através da\n      caixa de seleção na coluna mais à esquerda da tabela. Em seguida, clique no\n      ícone de deletar\n      "),a("font-awesome-icon",{staticClass:"icon-red",attrs:{icon:["fas","trash"]}}),e._v(" no cabeçalho\n      da página. Confirme a exclusão clicando no botão OK na janela que se abrirá.\n    ")],1),a("li",{staticClass:"list-group-item"},[a("b",[e._v("Editar turma:")]),e._v(" Basta fazer as alterações necessárias diretamente nos\n      campos da tabela. O sistema salvará as modificações automaticamente.\n    ")]),a("li",{staticClass:"list-group-item"},[a("b",[e._v("Observações:")]),e._v(' Em cada coluna de um curso, para cada disciplina, existem\n      dois campos de vagas. O campo superior é destinado às vagas de grade, e o\n      inferior é referente às vagas para alunos não periodizados. Para que uma\n      turma externa apareça na grade horária de um determinado curso, na página\n      "Horários", é preciso que pelo menos uma vaga de grade seja destinada a este\n      curso.\n    ')])])],1):e._e()},i=[],o=(a("4917"),a("759f"),a("d25f"),a("96cf"),a("3b8d")),s=a("cebc"),n=a("75fc"),l=a("2f62"),c=a("eaf8"),d=a("9165"),u=a("25df"),m=a("d027"),p=a("5658"),v=a("28ce"),h={name:"DashboardTurmasExternas",mixins:[d["m"],d["l"],d["d"],d["b"],d["k"]],components:{ModalFiltros:m["e"],ModalAjuda:m["a"],ModalDelete:m["b"],InputSearch:u["d"],TurmaExternaRow:p["default"],NovaTurmaExternaRow:v["default"]},data:function(){var e=this;return{isAdding:!1,asideModalsRefs:["modalFiltros","modalAjuda"],ordenacaoTurmasMain:{order:"disciplina.codigo",type:"asc"},ordenacaoDisciplinasModal:{order:"codigo",type:"asc"},searchDisciplinasModal:"",tabAtivaModal:"Disciplinas",modalFiltrosTabs:{current:"Disciplinas",array:["Disciplinas","Períodos","Semestres"]},filtroPeriodos:{ativados:[],selecionados:[]},filtroSemestres:{selecionados:[]},filtroDisciplinas:{ativadas:[],selecionadas:[]},modalFiltrosCallbacks:{selectAll:{Disciplinas:function(){e.filtroDisciplinas.selecionadas=Object(n["a"])(e.DisciplinasExternasInPerfis)},Periodos:function(){e.filtroPeriodos.selecionados=Object(n["a"])(e.PeriodosOptions),e.filtroSemestres.selecionados=Object(n["a"])(e.SemestresOptions)},Semestres:function(){e.filtroSemestres.selecionados=Object(n["a"])(e.SemestresOptions),e.filtroPeriodos.selecionados=Object(n["a"])(e.PeriodosOptions)}},selectNone:{Disciplinas:function(){e.filtroDisciplinas.selecionadas=[]},Periodos:function(){e.filtroPeriodos.selecionados=[],e.filtroDisciplinas.selecionadas=[]},Semestres:function(){e.filtroSemestres.selecionados=[],e.filtroPeriodos.selecionados=[]}},btnOk:function(){e.filtroPeriodos.ativados=Object(n["a"])(e.filtroPeriodos.selecionados),e.filtroDisciplinas.ativadas=Object(n["a"])(e.filtroDisciplinas.selecionadas)}}}},beforeMount:function(){this.modalFiltrosCallbacks.selectAll.Periodos()},beforeDestroy:function(){this.clearTurmasExternasToDelete()},methods:Object(s["a"])({},Object(l["b"])(["deleteTurmasExternas","clearTurmasExternasToDelete"]),{toggleAddRow:function(){this.isAdding=!this.isAdding},openModalDelete:function(){this.$refs.modalDelete.open()},handleDeleteTurmas:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setPartialLoading(!0),e.next=4,this.deleteTurmasExternas();case 4:e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](0),this.pushNotification({type:"error",title:"Erro ao excluir turma(s)!"});case 9:return e.prev=9,this.setPartialLoading(!1),e.finish(9);case 12:case"end":return e.stop()}},e,this,[[0,6,9,12]])}));function t(){return e.apply(this,arguments)}return t}()}),computed:Object(s["a"])({},Object(l["c"])(["TurmasExternasInDisciplinas","DisciplinasExternasInPerfis","TurmasExternasToDelete","PrincipaisCursosDCC","currentPlano"]),{isEditable:function(){return this.currentPlano.isEditable},TurmasExternasOrdered:function(){return this.$_.orderBy(this.TurmasExternarFiltredByDisciplinas,["periodo",this.ordenacaoTurmasMain.order],["asc",this.ordenacaoTurmasMain.type])},TurmasExternarFiltredByDisciplinas:function(){var e=this;return this.$_.filter(this.TurmasExternarFiltredByPeriodos,function(t){return e.$_.some(e.filtroDisciplinas.ativadas,["id",t.Disciplina])})},TurmasExternarFiltredByPeriodos:function(){var e=this;return this.$_.filter(this.TurmasExternasInDisciplinas,function(t){return e.$_.some(e.filtroPeriodos.ativados,["id",t.periodo])})},DisciplinasOptionsOrdered:function(){return this.$_.orderBy(this.DisciplinasOptionsFiltered,this.ordenacaoDisciplinasModal.order,this.ordenacaoDisciplinasModal.type)},DisciplinasOptionsFiltered:function(){if(""===this.searchCursosModal)return this.DisciplinasExternasInPerfis;var e=Object(c["c"])(this.searchDisciplinasModal);return this.$_.filter(this.DisciplinasExternasInPerfis,function(t){var a=Object(c["c"])(t.nome),r=Object(c["c"])(t.codigo);return a.match(e)||r.match(e)})}})},f=h,g=a("2877"),_=Object(g["a"])(f,r,i,!1,null,null,null);t["default"]=_.exports},a29d:function(e,t,a){"use strict";var r=a("cbc6"),i=a.n(r);i.a},cbc6:function(e,t,a){}}]);
//# sourceMappingURL=chunk-b6ea191a.e6bc6776.js.map