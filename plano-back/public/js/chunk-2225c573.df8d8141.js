(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2225c573","chunk-4a5d1f7c"],{"4c36":function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("tr",{staticClass:"novaturma"},[r("v-td",{attrs:{width:"25"}}),r("v-td",{attrs:{width:"40"}}),r("v-td",{attrs:{width:"55",type:"content"}},[r("select",{directives:[{name:"model",rawName:"v-model.number",value:e.turmaForm.periodo,expression:"turmaForm.periodo",modifiers:{number:!0}}],on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(t){var r="_value"in t?t._value:t.value;return e._n(r)}));e.$set(e.turmaForm,"periodo",t.target.multiple?r:r[0])}}},[r("option",{attrs:{value:"1"}},[e._v("1")]),r("option",{attrs:{value:"2"}},[e._v("2")]),r("option",{attrs:{value:"3"}},[e._v("3")]),r("option",{attrs:{value:"4"}},[e._v("4")])])]),r("v-td",{style:{backgroundColor:e.turmaForm.disciplina?e.turmaForm.disciplina.perfil.cor:""},attrs:{width:"80",paddinX:"2"}},[e._v("\n    "+e._s(e.turmaForm.disciplina?e.turmaForm.disciplina.perfil.abreviacao:"")+"\n  ")]),r("v-td",{attrs:{width:"80",type:"content"}},[r("select",{directives:[{name:"model",rawName:"v-model",value:e.turmaForm.disciplina,expression:"turmaForm.disciplina"}],on:{change:[function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(e.turmaForm,"disciplina",t.target.multiple?r:r[0])},e.handleChangeDisciplina]}},e._l(e.DisciplinasDCCInPerfis,(function(t){return r("option",{key:t.codigo+t.id,domProps:{value:t}},[e._v("\n        "+e._s(t.codigo)+"\n      ")])})),0)]),r("v-td",{attrs:{width:"330",type:"content"}},[r("select",{directives:[{name:"model",rawName:"v-model",value:e.turmaForm.disciplina,expression:"turmaForm.disciplina"}],on:{change:[function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(e.turmaForm,"disciplina",t.target.multiple?r:r[0])},e.handleChangeDisciplina]}},e._l(e.DisciplinasDCCInPerfisOrderedByNome,(function(t){return r("option",{key:t.nome+t.id,domProps:{value:t}},[e._v("\n        "+e._s(t.nome)+"\n      ")])})),0)]),r("v-td",{attrs:{width:"25"}},[e._v(e._s(e.totalCarga))]),r("v-td",{attrs:{width:"45",type:"content"}},[r("input",{staticStyle:{width:"30px"},attrs:{type:"text"},domProps:{value:e.turmaForm.letra},on:{input:function(t){e.turmaForm.letra=t.target.value.toUpperCase()},keypress:e.maskTurmaLetra}})]),r("v-td",{attrs:{width:"160",type:"none",paddingX:"3"}},[r("div",{staticClass:"d-flex align-items-center w-100"},[r("div",{staticClass:"d-flex flex-column",staticStyle:{width:"130px"}},[r("select",{directives:[{name:"model",rawName:"v-model.number",value:e.turmaForm.Docente1,expression:"turmaForm.Docente1",modifiers:{number:!0}}],on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(t){var r="_value"in t?t._value:t.value;return e._n(r)}));e.$set(e.turmaForm,"Docente1",t.target.multiple?r:r[0])}}},[r("option"),e._l(e.DocentesByPreferencia,(function(t){return r("option",{key:t.id+t.apelido,domProps:{value:t.id}},[e._v("\n            "+e._s(t.apelido)+"\n            "+e._s(e.orderByPreferencia&&e.preferenciaDocente(t)?"- "+e.preferenciaDocente(t):"")+"\n          ")])}))],2),r("select",{directives:[{name:"model",rawName:"v-model.number",value:e.turmaForm.Docente2,expression:"turmaForm.Docente2",modifiers:{number:!0}}],on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(t){var r="_value"in t?t._value:t.value;return e._n(r)}));e.$set(e.turmaForm,"Docente2",t.target.multiple?r:r[0])}}},[r("option"),e._l(e.DocentesByPreferencia,(function(t){return r("option",{key:t.apelido+t.id,domProps:{value:t.id}},[e._v("\n            "+e._s(t.apelido)+"\n            "+e._s(e.orderByPreferencia&&e.preferenciaDocente(t)?"- "+e.preferenciaDocente(t):"")+"\n          ")])}))],2)]),r("font-awesome-icon",{class:["clickable mx-auto",{"low-opacity":!e.orderByPreferencia}],staticStyle:{"font-size":"12px"},attrs:{icon:["fas","graduation-cap"],title:"Alternar ordenação de docentes por preferência"},on:{click:function(t){e.orderByPreferencia=!e.orderByPreferencia}}})],1)]),r("v-td",{attrs:{width:"80",type:"content"}},[e.turmaForm.disciplina?r("select",{directives:[{name:"model",rawName:"v-model",value:e.turmaForm.turno1,expression:"turmaForm.turno1"}],on:{input:e.handleChangeTurno,change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(e.turmaForm,"turno1",t.target.multiple?r:r[0])}}},[e.disciplinaIsIntegralEAD?r("option",{attrs:{value:"EAD"}},[e._v("EAD")]):[r("option",{attrs:{value:"Diurno"}},[e._v("Diurno")]),r("option",{attrs:{value:"Noturno"}},[e._v("Noturno")])]],2):e._e()]),r("v-td",{attrs:{width:"85",type:"content"}},[e.turmaForm.disciplina?[r("select",{directives:[{name:"model",rawName:"v-model.number",value:e.turmaForm.Horario1,expression:"turmaForm.Horario1",modifiers:{number:!0}}],on:{change:[function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(t){var r="_value"in t?t._value:t.value;return e._n(r)}));e.$set(e.turmaForm,"Horario1",t.target.multiple?r:r[0])},function(t){return e.handleChangeHorario(1)}]}},[e.disciplinaIsParcialEAD||e.disciplinaIsIntegralEAD?e._e():r("option"),e._l(e.HorariosFiltredByTurno,(function(t){return r("option",{key:t.id+t.horario,domProps:{value:t.id}},[e._v("\n          "+e._s(t.horario)+"\n        ")])}))],2),e.totalCarga>=4?r("select",{directives:[{name:"model",rawName:"v-model.number",value:e.turmaForm.Horario2,expression:"turmaForm.Horario2",modifiers:{number:!0}}],on:{change:[function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(t){var r="_value"in t?t._value:t.value;return e._n(r)}));e.$set(e.turmaForm,"Horario2",t.target.multiple?r:r[0])},function(t){return e.handleChangeHorario(2)}]}},[e.disciplinaIsParcialEAD||e.disciplinaIsIntegralEAD?e._e():r("option"),e.disciplinaIsParcialEAD?e._l(e.HorariosEAD,(function(t){return r("option",{key:t.horario+t.id,domProps:{value:t.id}},[e._v("\n            "+e._s(t.horario)+"\n          ")])})):e._l(e.HorariosFiltredByTurno,(function(t){return r("option",{key:t.horario+t.id,domProps:{value:t.id}},[e._v("\n            "+e._s(t.horario)+"\n          ")])}))],2):e._e()]:e._e()],2),r("v-td",{attrs:{width:"95",type:"content"}},[!e.disciplinaIsIntegralEAD&&e.turmaForm.disciplina?[r("select",{directives:[{name:"model",rawName:"v-model.number",value:e.turmaForm.Sala1,expression:"turmaForm.Sala1",modifiers:{number:!0}}],on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(t){var r="_value"in t?t._value:t.value;return e._n(r)}));e.$set(e.turmaForm,"Sala1",t.target.multiple?r:r[0])}}},[r("option"),e._l(e.AllSalas,(function(t){return r("option",{key:t.id+t.nome,domProps:{value:t.id}},[e._v("\n          "+e._s(t.nome)+"\n        ")])}))],2),e.totalCarga>=4&&2!=e.turmaForm.disciplina.ead?r("select",{directives:[{name:"model",rawName:"v-model.number",value:e.turmaForm.Sala2,expression:"turmaForm.Sala2",modifiers:{number:!0}}],on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(t){var r="_value"in t?t._value:t.value;return e._n(r)}));e.$set(e.turmaForm,"Sala2",t.target.multiple?r:r[0])}}},[r("option"),e._l(e.AllSalas,(function(t){return r("option",{key:t.nome+t.id,domProps:{value:t.id}},[e._v("\n          "+e._s(t.nome)+"\n        ")])}))],2):e._e()]:e._e()],2),r("v-td",{attrs:{width:45+35*e.cursosAtivadosLength}})],1)},o=[],a=(r("1c01"),r("58b2"),r("8e6e"),r("f3e2"),r("ac6a"),r("456d"),r("d25f"),r("7514"),r("96cf"),r("1da1")),s=(r("759f"),r("ade3")),n=(r("c5f6"),r("2f62")),l=r("eaf8"),c=r("9165");function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){Object(s["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m={name:"NovaTurmaRow",mixins:[c["k"]],props:{cursosAtivadosLength:Number,default:0},data:function(){return{turmaForm:Object(l["b"])({periodo:1,letra:"A"}),orderByPreferencia:!1}},methods:u(u({},Object(n["b"])(["createTurma"])),{},{handleChangeTurno:function(){this.turmaForm.Horario1=null,this.disciplinaIsParcialEAD||(this.turmaForm.Horario2=null)},handleChangeDisciplina:function(){this.turmaForm.Disciplina=this.turmaForm.disciplina.id,this.turmaForm.Horario1=null,this.turmaForm.Horario2=null,this.turmaForm.turno1=null,null!==this.turmaForm.disciplina&&(this.hasMoreThan4Creditos||(this.turmaForm.Docente2=null,this.turmaForm.Horario2=null,this.turmaForm.Sala2=null),this.disciplinaIsIntegralEAD?(this.turmaForm.turno1="EAD",this.turmaForm.Horario1=31,this.turmaForm.Horario2=31,this.turmaForm.Sala1=null,this.turmaForm.Sala2=null):this.disciplinaIsParcialEAD&&(this.turmaForm.Horario2=31,this.turmaForm.Docente2=null,this.turmaForm.Sala1=null,this.turmaForm.Sala2=null))},handleChangeHorario:function(e){1===e?this.setTurnoByHorario(this.turmaForm.Horario1):this.disciplinaIsParcialEAD||this.setTurnoByHorario(this.turmaForm.Horario2)},setTurnoByHorario:function(e){31==e&&this.disciplinaIsIntegralEAD?this.turmaForm.turno1="EAD":this.$_.some(this.HorariosNoturno,["id",e])?this.turmaForm.turno1="Noturno":this.$_.some(this.HorariosDiurno,["id",e])&&(this.turmaForm.turno1="Diurno")},handleCreateTurma:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setPartialLoading(!0),this.turmaForm.Plano=this.currentPlano.id,e.next=5,this.createTurma(this.turmaForm);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),this.pushNotification({type:"error",title:"Erro ao criar nova turma!",text:e.t0.response?"A combinação de disciplina, período e turma deve ser única.":e.t0.message});case 10:return e.prev=10,this.setPartialLoading(!1),e.finish(10);case 13:case"end":return e.stop()}}),e,this,[[0,7,10,13]])})));function t(){return e.apply(this,arguments)}return t}(),preferenciaDocente:function(e){var t=this.$_.find(this.PreferenciasDisciplina,{Docente:e.id});return!!t&&t.preferencia}}),computed:u(u({},Object(n["c"])(["DisciplinasDCCInPerfis","DocentesAtivos","AllHorarios","HorariosEAD","HorariosNoturno","HorariosDiurno","AllSalas","PreferenciaDosDocentes"])),{},{PreferenciasDisciplina:function(){return this.$_.filter(this.PreferenciaDosDocentes,["Disciplina",this.turmaForm.Disciplina])},DocentesByPreferencia:function(){var e=this;return this.orderByPreferencia?this.$_.orderBy(this.DocentesAtivos,(function(t){var r=e.$_.find(e.PreferenciasDisciplina,["Docente",t.id]);return r?r.preferencia:0}),"desc"):this.DocentesAtivos},DisciplinasDCCInPerfisOrderedByNome:function(){return this.$_.orderBy(this.DisciplinasDCCInPerfis,["nome"])},HorariosFiltredByTurno:function(){if(this.disciplinaIsIntegralEAD)return this.HorariosEAD;switch(this.turmaForm.turno1){case"Noturno":return this.HorariosNoturno;case"Diurno":return this.HorariosDiurno;case"EAD":return this.HorariosEAD;default:return this.$_.filter(this.AllHorarios,(function(e){return 31!=e.id}))}},totalCarga:function(){return this.turmaForm.disciplina?parseInt(this.turmaForm.disciplina.cargaTeorica)+parseInt(this.turmaForm.disciplina.cargaPratica):""},disciplinaIsIntegralEAD:function(){return!!this.turmaForm.disciplina&&1===this.turmaForm.disciplina.ead},disciplinaIsParcialEAD:function(){return!!this.turmaForm.disciplina&&2===this.turmaForm.disciplina.ead}})},p=m,f=(r("90a3"),r("2877")),v=Object(f["a"])(p,i,o,!1,null,"76142ad7",null);t["default"]=v.exports},"8a41":function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.currentPlano.isEditable?r("div",{staticClass:"main-component row"},[r("PageHeader",{attrs:{title:"Graduação - DCC"}},[r("BaseButton",{directives:[{name:"show",rawName:"v-show",value:e.isAdding,expression:"isAdding"}],attrs:{template:"salvar"},on:{click:function(t){return e.$refs.novaTurma.handleCreateTurma()}}}),r("BaseButton",{directives:[{name:"show",rawName:"v-show",value:e.isAdding,expression:"isAdding"}],attrs:{template:"cancelar"},on:{click:e.toggleIsAdding}}),r("BaseButton",{directives:[{name:"show",rawName:"v-show",value:!e.isAdding,expression:"!isAdding"}],attrs:{template:"adicionar"},on:{click:e.toggleIsAdding}}),r("BaseButton",{directives:[{name:"show",rawName:"v-show",value:!e.isAdding,expression:"!isAdding"}],attrs:{template:"deletar",title:"Deletar selecionados"},on:{click:function(t){return e.$refs.modalDelete.open()}}}),r("BaseButton",{attrs:{template:"filtros"},on:{click:function(t){return e.toggleAsideModal("filtros")}}}),r("BaseButton",{attrs:{template:"relatorio"},on:{click:e.generateXlsx}}),r("BaseButton",{attrs:{template:"ajuda"},on:{click:function(t){return e.toggleAsideModal("ajuda")}}})],1),r("div",{staticClass:"div-table"},[r("BaseTable",{scopedSlots:e._u([{key:"thead",fn:function(){return[r("v-th",{attrs:{width:"25"}}),r("v-th",{attrs:{width:"40",paddingX:"0"}},[e._v("Editar")]),r("v-th",{attrs:{width:"55",paddingX:"0",title:"Período letivo, ordenação fixa"}},[r("font-awesome-icon",{attrs:{icon:["fas","thumbtack"]}}),e._v("\n          P.\n        ")],1),r("v-th-ordination",{attrs:{orderFixed:!0,currentOrder:e.ordenacaoMain.perfis,orderToCheck:"disciplina.perfil.abreviacao",width:"80"}},[e._v("\n          Perfil\n        ")]),r("v-th-ordination",{attrs:{currentOrder:e.ordenacaoMain.turmas,orderToCheck:"disciplina.codigo",width:"80"}},[e._v("\n          Código\n        ")]),r("v-th-ordination",{attrs:{currentOrder:e.ordenacaoMain.turmas,orderToCheck:"disciplina.nome",width:"330",align:"start"}},[e._v("\n          Disciplina\n        ")]),r("v-th",{attrs:{width:"25",paddingX:"0",title:"Créditos"}},[e._v("C.")]),r("v-th",{attrs:{width:"45",paddingX:"0",title:"Turma"}},[e._v("T.")]),r("v-th",{attrs:{width:"160",align:"start"}},[e._v("Docente")]),r("v-th",{attrs:{width:"80"}},[e._v("Turno")]),r("v-th",{attrs:{width:"85"}},[e._v("Horário")]),r("v-th",{attrs:{width:"95"}},[e._v("Sala")]),r("v-th",{attrs:{width:"45",title:"Total de vagas"}},[e._v("Total")]),e._l(e.filtroCursos.ativados,(function(t){return r("v-th",{directives:[{name:"b-popover",rawName:"v-b-popover.hover.bottom",value:{title:t.nome,content:e.cursoPopoverContent(t)},expression:"{\n            title: curso.nome,\n            content: cursoPopoverContent(curso),\n          }",modifiers:{hover:!0,bottom:!0}}],key:t.id+t.codigo,attrs:{width:"35",paddingX:"0"}},[r("span",{class:["w-100",{"curso-codigo-big":e.nameIsBig(t.codigo)}]},[e._v("\n            "+e._s(t.codigo)+"\n          ")])])}))]},proxy:!0},{key:"add-row",fn:function(){return[e.isAdding?r("NovaTurmaRow",{ref:"novaTurma",attrs:{cursosAtivadosLength:e.filtroCursos.ativados.length}}):e._e()]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.TurmasOrdered,(function(t){return r("TurmaRow",{key:t.id+t.letra,attrs:{turma:t,cursosAtivados:e.filtroCursos.ativados},on:{"click-edit":function(t){return e.openModalEditTurma(t)}}})})),r("tr",{directives:[{name:"show",rawName:"v-show",value:!e.TurmasOrdered.length,expression:"!TurmasOrdered.length"}]},[r("v-td",{attrs:{width:1145+35*e.filtroCursos.ativados.length}},[r("b",[e._v("Nenhuma turma encontrada.")]),e._v("\n            Clique no botão de filtros\n            "),r("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","list-ul"]}}),e._v("\n            para selecioná-las.\n          ")],1)],1)]},proxy:!0}],null,!1,1642118310)})],1),r("ModalFiltros",{ref:"modalFiltros",attrs:{callbacks:e.modalFiltrosCallbacks,tabsOptions:e.modalFiltrosTabs},scopedSlots:e._u([{key:"modal-footer-btn",fn:function(){return["Cursos"===e.modalFiltrosTabs.current?r("BaseButton",{attrs:{text:"Cursos DCC",color:"lightblue"},on:{click:e.selectCursosDCC}}):e._e()]},proxy:!0}],null,!1,1155607314)},[r("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Perfis"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Perfis'"}],attrs:{type:"modal"},scopedSlots:e._u([{key:"thead",fn:function(){return[r("v-th",{attrs:{width:"25"}}),r("v-th-ordination",{attrs:{currentOrder:e.ordenacaoModal.perfis,orderToCheck:"nome",width:"425",align:"start"}},[e._v("\n          Nome\n        ")])]},proxy:!0},{key:"tbody",fn:function(){return e._l(e.PerfisOptionsOrdered,(function(t){return r("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:t.id+t.nome,on:{click:function(r){return e.selectPerfis(t)}}},[r("v-td",{attrs:{width:"25",type:"content"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.filtroPerfis.selecionados,expression:"filtroPerfis.selecionados"}],attrs:{type:"checkbox"},domProps:{value:t,indeterminate:t.halfChecked,checked:Array.isArray(e.filtroPerfis.selecionados)?e._i(e.filtroPerfis.selecionados,t)>-1:e.filtroPerfis.selecionados},on:{click:function(r){return r.stopPropagation(),e.selectPerfis(t)},change:function(r){var i=e.filtroPerfis.selecionados,o=r.target,a=!!o.checked;if(Array.isArray(i)){var s=t,n=e._i(i,s);o.checked?n<0&&e.$set(e.filtroPerfis,"selecionados",i.concat([s])):n>-1&&e.$set(e.filtroPerfis,"selecionados",i.slice(0,n).concat(i.slice(n+1)))}else e.$set(e.filtroPerfis,"selecionados",a)}}})]),r("v-td",{attrs:{width:"425",align:"start"}},[e._v(e._s(t.nome))])],1)}))},proxy:!0}],null,!1,1598810887)}),r("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Disciplinas"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Disciplinas'"}],attrs:{type:"modal",hasSearchBar:!0},scopedSlots:e._u([{key:"thead-search",fn:function(){return[r("InputSearch",{attrs:{placeholder:"Pesquise nome ou codigo de uma disciplina..."},model:{value:e.searchDisciplinasModal,callback:function(t){e.searchDisciplinasModal=t},expression:"searchDisciplinasModal"}})]},proxy:!0},{key:"thead",fn:function(){return[r("v-th",{attrs:{width:"25"}}),r("v-th-ordination",{attrs:{currentOrder:e.ordenacaoModal.disciplinas,orderToCheck:"codigo",width:"70",align:"start"}},[e._v("\n          Código\n        ")]),r("v-th-ordination",{attrs:{currentOrder:e.ordenacaoModal.disciplinas,orderToCheck:"nome",width:"270",align:"start"}},[e._v("\n          Nome\n        ")]),r("v-th-ordination",{attrs:{currentOrder:e.ordenacaoModal.disciplinas,orderToCheck:"perfil.abreviacao",width:"85",align:"start"}},[e._v("\n          Perfil\n        ")])]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.DisciplinasOptionsOrdered,(function(t){return r("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:t.id+t.nome,on:{click:function(r){return e.selectDisciplina(t)}}},[r("v-td",{attrs:{width:"25",type:"content"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.filtroDisciplinas.selecionados,expression:"filtroDisciplinas.selecionados"}],attrs:{type:"checkbox"},domProps:{value:t,checked:Array.isArray(e.filtroDisciplinas.selecionados)?e._i(e.filtroDisciplinas.selecionados,t)>-1:e.filtroDisciplinas.selecionados},on:{click:function(r){return r.stopPropagation(),e.selectDisciplina(t)},change:function(r){var i=e.filtroDisciplinas.selecionados,o=r.target,a=!!o.checked;if(Array.isArray(i)){var s=t,n=e._i(i,s);o.checked?n<0&&e.$set(e.filtroDisciplinas,"selecionados",i.concat([s])):n>-1&&e.$set(e.filtroDisciplinas,"selecionados",i.slice(0,n).concat(i.slice(n+1)))}else e.$set(e.filtroDisciplinas,"selecionados",a)}}})]),r("v-td",{attrs:{width:"70",align:"start"}},[e._v(e._s(t.codigo))]),r("v-td",{attrs:{align:"start",width:"270",title:t.nome}},[e._v("\n            "+e._s(t.nome)+"\n          ")]),r("v-td",{attrs:{width:"85",align:"start"}},[e._v(e._s(t.perfil.abreviacao))])],1)})),e.DisciplinasOptionsOrdered.length?e._e():r("tr",[r("v-td",{attrs:{colspan:"3",width:"450"}},[e._v("\n            NENHUMA DISCIPLINA ENCONTRADA.\n          ")])],1)]},proxy:!0}],null,!1,2639653937)}),r("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Cursos"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Cursos'"}],attrs:{type:"modal",hasSearchBar:!0},scopedSlots:e._u([{key:"thead-search",fn:function(){return[r("InputSearch",{attrs:{placeholder:"Pesquise nome ou codigo de um curso..."},model:{value:e.searchCursosModal,callback:function(t){e.searchCursosModal=t},expression:"searchCursosModal"}})]},proxy:!0},{key:"thead",fn:function(){return[r("v-th",{attrs:{width:"25"}}),r("v-th-ordination",{attrs:{currentOrder:e.ordenacaoModal.cursos,orderToCheck:"codigo",width:"70",align:"start"}},[e._v("\n          Código\n        ")]),r("v-th-ordination",{attrs:{currentOrder:e.ordenacaoModal.cursos,orderToCheck:"nome",width:"355",align:"start"}},[e._v("\n          Nome\n        ")])]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.CursosOptionsOrdered,(function(t){return r("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:t.id+t.nome,on:{click:function(r){return e.toggleItemInArray(t,e.filtroCursos.selecionados)}}},[r("v-td",{attrs:{width:"25",type:"content"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.filtroCursos.selecionados,expression:"filtroCursos.selecionados"}],attrs:{type:"checkbox"},domProps:{value:t,checked:Array.isArray(e.filtroCursos.selecionados)?e._i(e.filtroCursos.selecionados,t)>-1:e.filtroCursos.selecionados},on:{change:function(r){var i=e.filtroCursos.selecionados,o=r.target,a=!!o.checked;if(Array.isArray(i)){var s=t,n=e._i(i,s);o.checked?n<0&&e.$set(e.filtroCursos,"selecionados",i.concat([s])):n>-1&&e.$set(e.filtroCursos,"selecionados",i.slice(0,n).concat(i.slice(n+1)))}else e.$set(e.filtroCursos,"selecionados",a)}}})]),r("v-td",{attrs:{width:"70",align:"start"}},[e._v(e._s(t.codigo))]),r("v-td",{attrs:{width:"355",align:"start"}},[e._v(e._s(t.nome))])],1)})),r("tr",{directives:[{name:"show",rawName:"v-show",value:!e.CursosOptionsOrdered.length,expression:"!CursosOptionsOrdered.length"}]},[r("v-td",{attrs:{colspan:"3",width:"450"}},[e._v("NENHUM CURSO ENCONTRADO.")])],1)]},proxy:!0}],null,!1,3680059181)}),r("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Períodos"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Períodos'"}],attrs:{type:"modal"},scopedSlots:e._u([{key:"thead",fn:function(){return[r("v-th",{attrs:{width:"25"}}),r("v-th",{attrs:{width:"425",align:"start"}},[e._v("Periodos Letivo")])]},proxy:!0},{key:"tbody",fn:function(){return e._l(e.PeriodosOptions,(function(t){return r("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:t.id+t.nome,on:{click:function(r){return e.selecionaPeriodo(t,e.filtroPeriodos.selecionados)}}},[r("v-td",{attrs:{width:"25",type:"content"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.filtroPeriodos.selecionados,expression:"filtroPeriodos.selecionados"}],attrs:{type:"checkbox"},domProps:{value:t,checked:Array.isArray(e.filtroPeriodos.selecionados)?e._i(e.filtroPeriodos.selecionados,t)>-1:e.filtroPeriodos.selecionados},on:{click:function(r){return r.stopPropagation(),e.selecionaPeriodo(t)},change:function(r){var i=e.filtroPeriodos.selecionados,o=r.target,a=!!o.checked;if(Array.isArray(i)){var s=t,n=e._i(i,s);o.checked?n<0&&e.$set(e.filtroPeriodos,"selecionados",i.concat([s])):n>-1&&e.$set(e.filtroPeriodos,"selecionados",i.slice(0,n).concat(i.slice(n+1)))}else e.$set(e.filtroPeriodos,"selecionados",a)}}})]),r("v-td",{attrs:{width:"425",align:"start"}},[e._v(e._s(t.nome))])],1)}))},proxy:!0}],null,!1,2438418835)}),r("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Semestres"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Semestres'"}],attrs:{type:"modal"},scopedSlots:e._u([{key:"thead",fn:function(){return[r("v-th",{attrs:{width:"25"}}),r("v-th",{attrs:{width:"425",align:"start"}},[e._v("Semestre Letivo")])]},proxy:!0},{key:"tbody",fn:function(){return e._l(e.SemestresOptions,(function(t){return r("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:t.id+t.nome,on:{click:function(r){return e.selecionaSemestre(t)}}},[r("v-td",{attrs:{width:"25",type:"content"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.filtroSemestres.selecionados,expression:"filtroSemestres.selecionados"}],attrs:{type:"checkbox"},domProps:{value:t,indeterminate:t.halfChecked,checked:Array.isArray(e.filtroSemestres.selecionados)?e._i(e.filtroSemestres.selecionados,t)>-1:e.filtroSemestres.selecionados},on:{click:function(r){return r.stopPropagation(),e.selecionaSemestre(t)},change:function(r){var i=e.filtroSemestres.selecionados,o=r.target,a=!!o.checked;if(Array.isArray(i)){var s=t,n=e._i(i,s);o.checked?n<0&&e.$set(e.filtroSemestres,"selecionados",i.concat([s])):n>-1&&e.$set(e.filtroSemestres,"selecionados",i.slice(0,n).concat(i.slice(n+1)))}else e.$set(e.filtroSemestres,"selecionados",a)}}})]),r("v-td",{attrs:{width:"425",align:"start"}},[e._v(e._s(t.nome))])],1)}))},proxy:!0}],null,!1,1577988721)})],1),r("ModalEditTurma",{ref:"modalEditTurma",attrs:{turma:e.turmaClicked,hasEditDisciplina:!0}}),r("ModalDelete",{ref:"modalDelete",attrs:{isDeleting:!!e.TurmasToDelete.length,hasClearDelete:!0},on:{"btn-deletar":e.handleDeleteTurmas,"btn-clear":e.clearTurmasToDelete}},[e.TurmasToDelete.length?e._e():r("li",{staticClass:"list-group-item"},[e._v("\n      Nenhuma turma selecionada.\n    ")]),e._l(e.TurmasToDelete,(function(t){return r("li",{key:t.id+t.letra+t.periodo,staticClass:"list-group-item"},[r("span",[r("b",[e._v("Período:")]),e._v("\n        "+e._s(t.periodo)+" -\n        "),r("b",[e._v("Turma:")]),e._v("\n        "+e._s(t.letra)+"\n      ")]),r("span",[r("b",[e._v("Disciplina:")]),e._v("\n        "+e._s(t.disciplina.nome)+"\n      ")])])}))],2),r("ModalAjuda",{ref:"modalAjuda"},[r("li",{staticClass:"list-group-item"},[r("b",[e._v("Visualizar conteúdo:")]),e._v("\n      Clique no ícone de filtros\n      "),r("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","list-ul"]}}),e._v("\n      no cabeçalho da página e, na janela que se abrirá, utilize as abas para navegar\n      entre os tipos de filtro disponíveis. Marque quais informações deseja visualizar,\n      e para finalizar clique no botão OK.\n    ")],1),r("li",{staticClass:"list-group-item"},[r("b",[e._v("Adicionar turma:")]),e._v("\n      Clique no ícone de adicionar\n      "),r("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","plus"]}}),e._v("\n      no cabeçalho da página. Em seguida, preencha a nova linha que irá aparecer no\n      início da tabela. Note que os campos disciplina, turno e turma são obrigatórios.\n      Após preencher os campos, clique no ícone de salvar\n      "),r("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","check"]}}),e._v("\n      ou de cancelar\n      "),r("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","times"]}}),e._v("\n      .\n    ")],1),r("li",{staticClass:"list-group-item"},[r("b",[e._v("Deletar turma(s):")]),e._v("\n      Marque a(s) turma(s) que deseja deletar através da caixa de seleção na coluna mais\n      à esquerda da tabela. Em seguida, clique no ícone de deletar\n      "),r("font-awesome-icon",{staticClass:"icon-red",attrs:{icon:["fas","trash"]}}),e._v("\n      no cabeçalho da página. Confirme a exclusão clicando no botão OK na janela que se\n      abrirá.\n    ")],1),r("li",{staticClass:"list-group-item"},[r("b",[e._v("Editar turma:")]),e._v("\n      Existem duas formas de se fazer alterações em uma turma. A primeira forma envolve\n      modificar diretamente os campos na tabela. Neste caso, o sistema salvará\n      automaticamente cada alteração. Na segunda forma, deve-se clicar no ícone\n      "),r("font-awesome-icon",{staticClass:"icon-darkgray",attrs:{icon:["fas","edit"]}}),e._v('\n      presente na couna "Editar". Uma janela de edição irá se abrir. Neste caso, as\n      alterações realizadas nos campos da metade superior da janela somente serão\n      enviadas ao clicar no botão "Salvar". Já para o quantitativo de vagas na parte\n      inferior, as alterações serão salvas automaticamente.\n    ')],1),r("li",{staticClass:"list-group-item"},[r("b",[e._v("Relatório:")]),e._v("\n      Clique no ícone relatório\n      "),r("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","file-alt"]}}),e._v("\n      e aguarde o download do arquivo (.xlsx) iniciar.\n    ")],1),r("li",{staticClass:"list-group-item"},[r("b",[e._v("Observações:")]),e._v('\n      Em cada coluna de um curso, para cada disciplina, existem dois campos de vagas. O\n      campo superior é destinado às vagas de grade, e o inferior é referente às vagas\n      para alunos não periodizados. Para que uma turma apareça na grade horária de um\n      determinado curso, na página "Horários", é preciso que pelo menos uma vaga de\n      grade seja destinada a este curso.\n    ')])])],1):e._e()},o=[],a=(r("1c01"),r("58b2"),r("8e6e"),r("f3e2"),r("ac6a"),r("456d"),r("4917"),r("6d67"),r("759f"),r("d25f"),r("96cf"),r("1da1")),s=r("ade3"),n=r("2909"),l=r("2f62"),c=r("21a6"),d=r("4dd0"),u=r.n(d),m=r("9cec"),p=r("eaf8"),f=r("9165"),v=r("25df"),h=r("d027"),g=r("4c36"),_=r("27b5");function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){Object(s["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var D={name:"TurmasDCC",mixins:[f["n"],f["m"],f["d"],f["b"],f["a"],f["l"]],components:{ModalAjuda:h["a"],ModalFiltros:h["e"],ModalDelete:h["b"],TurmaRow:_["default"],NovaTurmaRow:g["default"],ModalEditTurma:h["d"],InputSearch:v["d"]},data:function(){var e=this;return{isAdding:!1,asideModalsRefs:["modalFiltros","modalAjuda"],turmaClicked:Object(p["b"])(),searchCursosModal:"",searchDisciplinasModal:"",modalFiltrosTabs:{current:"Perfis",array:["Perfis","Disciplinas","Cursos","Períodos","Semestres"]},filtroPerfis:{selecionados:[]},filtroDisciplinas:{selecionados:[],ativadas:[]},filtroCursos:{ativados:[],selecionados:[]},filtroPeriodos:{ativados:[],selecionados:[]},filtroSemestres:{selecionados:[]},modalFiltrosCallbacks:{selectAll:{Perfis:function(){e.filtroDisciplinas.selecionados=Object(n["a"])(e.DisciplinasOptions),e.filtroPerfis.selecionados=Object(n["a"])(e.PerfisOptions)},Disciplinas:function(){e.filtroDisciplinas.selecionados=e.$_.union(e.DisciplinasOptionsFiltered,e.filtroDisciplinas.selecionados),e.conectaDisciplinasEmPerfis()},Cursos:function(){e.filtroCursos.selecionados=e.$_.union(e.CursosOptionsFiltered,e.filtroCursos.selecionados)},Periodos:function(){e.filtroPeriodos.selecionados=Object(n["a"])(e.PeriodosOptions),e.filtroSemestres.selecionados=Object(n["a"])(e.SemestresOptions)},Semestres:function(){e.filtroSemestres.selecionados=Object(n["a"])(e.SemestresOptions),e.filtroPeriodos.selecionados=Object(n["a"])(e.PeriodosOptions)}},selectNone:{Perfis:function(){e.filtroPerfis.selecionados=[],e.filtroDisciplinas.selecionados=[]},Disciplinas:function(){e.filtroDisciplinas.selecionados=e.$_.difference(e.filtroDisciplinas.selecionados,e.DisciplinasOptionsFiltered),e.conectaDisciplinasEmPerfis()},Cursos:function(){e.filtroCursos.selecionados=e.$_.difference(e.filtroCursos.selecionados,e.CursosOptionsFiltered)},Periodos:function(){e.filtroPeriodos.selecionados=[],e.filtroSemestres.selecionados=[]},Semestres:function(){e.filtroSemestres.selecionados=[],e.filtroPeriodos.selecionados=[]}},btnOk:function(){e.filtroPeriodos.ativados=Object(n["a"])(e.filtroPeriodos.selecionados),e.filtroDisciplinas.ativadas=Object(n["a"])(e.filtroDisciplinas.selecionados),e.filtroCursos.ativados=e.$_.orderBy(e.filtroCursos.selecionados,["posicao"])}},ordenacaoModal:{cursos:{order:"codigo",type:"asc"},disciplinas:{order:"codigo",type:"asc"},perfis:{order:"nome",type:"asc"}},ordenacaoMain:{turmas:{order:"disciplina.codigo",type:"asc"},perfis:{order:"disciplina.perfil.abreviacao",type:"asc"}}}},beforeMount:function(){var e=this;this.modalFiltrosCallbacks.selectAll.Periodos(),u.a.set("toggle",-1),u.a.on("toggle",(function(){var t=u.a.get("toggle");!0===t?e.$store.dispatch("toggleAllCursosTrue"):e.$store.dispatch("toggleAllCursosFalse"),u.a.set("toggle",-1)}));for(var t=function(t){var r=e.AllCursos[t].id;u.a.on("".concat(r),(function(){e.$store.dispatch("toggleCurso",r)}))},r=0;r<this.AllCursos.length;r++)t(r)},beforeDestroy:function(){this.clearTurmasToDelete(),u.a.off("toggle");for(var e=0;e<this.AllCursos.length;e++){var t=this.AllCursos[e].id;u.a.off("".concat(t))}},methods:b(b({},Object(l["b"])(["deleteTurmas","clearTurmasToDelete"])),{},{openModalEditTurma:function(e){this.turmaClicked=e,this.$refs.modalEditTurma.open()},selectCursosDCC:function(){this.filtroCursos.selecionados=Object(n["a"])(this.CursosDCC)},toggleIsAdding:function(){this.isAdding=!this.isAdding},nameIsBig:function(e){return e.length>4},generateXlsx:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setPartialLoading(!0),e.next=4,m["a"].downloadTable({pedidos:this.$store.state.pedido.Pedidos,Plano:localStorage.getItem("Plano")});case 4:return e.next=6,fetch("http://200.131.219.57:3000/api/xlsx/download",{method:"GET",headers:{Authorization:"Bearer ".concat(this.$store.state.auth.token)}});case 6:return t=e.sent,e.next=9,t.blob();case 9:return r=e.sent,e.next=12,Object(c["saveAs"])(r,"tabela.xlsx");case 12:e.next=17;break;case 14:e.prev=14,e.t0=e["catch"](0),this.pushNotification({type:"error",title:"Erro ao gerar a tabela!",text:"Tente novamente"});case 17:return e.prev=17,this.setPartialLoading(!1),e.finish(17);case 20:case"end":return e.stop()}}),e,this,[[0,14,17,20]])})));function t(){return e.apply(this,arguments)}return t}(),handleDeleteTurmas:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setPartialLoading(!0),e.next=4,this.deleteTurmas();case 4:e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](0),this.pushNotification({type:"error",title:"Erro ao excluir turma(s)!"});case 9:return e.prev=9,this.setPartialLoading(!1),e.finish(9);case 12:case"end":return e.stop()}}),e,this,[[0,6,9,12]])})));function t(){return e.apply(this,arguments)}return t}()}),computed:b(b({},Object(l["c"])(["AllCursos","CursosDCC","PerfisDCC","DisciplinasDCCInPerfis","TurmasInDisciplinasPerfis","TurmasToDelete"])),{},{TurmasOrdered:function(){var e=this.ordenacaoMain,t=e.turmas,r=e.perfis;return null===this.ordenacaoMain.perfis.order?this.$_.orderBy(this.TurmasFiltredByDisciplinas,["periodo",t.order],["asc",t.type]):this.$_.orderBy(this.TurmasFiltredByDisciplinas,["periodo",r.order,t.order],["asc",r.type,t.type])},TurmasFiltredByDisciplinas:function(){var e=this;return this.$_.filter(this.TurmasFiltredByPeriodos,(function(t){return e.$_.some(e.filtroDisciplinas.ativadas,(function(e){return e.id===t.Disciplina}))}))},TurmasFiltredByPeriodos:function(){var e=this;return this.$_.filter(this.TurmasInDisciplinasPerfis,(function(t){return e.$_.some(e.filtroPeriodos.ativados,["id",t.periodo])}))},PerfisOptionsOrdered:function(){return this.$_.orderBy(this.PerfisOptions,this.ordenacaoModal.perfis.order,this.ordenacaoModal.perfis.type)},PerfisOptions:function(){var e=this;return this.$_.map(this.PerfisDCC,(function(t){var r=e.$_.filter(e.DisciplinasOptions,["Perfil",t.id]),i=e.$_.filter(e.filtroDisciplinas.selecionados,["Perfil",t.id]),o=!1;return r.length===i.length?o=!1:i.length>0&&(o=!0),b(b({},t),{},{halfChecked:o})}))},DisciplinasOptionsOrdered:function(){return this.$_.orderBy(this.DisciplinasOptionsFiltered,this.ordenacaoModal.disciplinas.order,this.ordenacaoModal.disciplinas.type)},DisciplinasOptionsFiltered:function(){if(""===this.searchDisciplinasModal)return this.DisciplinasOptions;var e=Object(p["c"])(this.searchDisciplinasModal);return this.$_.filter(this.DisciplinasOptions,(function(t){var r=Object(p["c"])(t.nome),i=Object(p["c"])(t.codigo);return r.match(e)||i.match(e)}))},DisciplinasOptions:function(){return this.DisciplinasDCCInPerfis},CursosOptionsOrdered:function(){return this.$_.orderBy(this.CursosOptionsFiltered,this.ordenacaoModal.cursos.order,this.ordenacaoModal.cursos.type)},CursosOptionsFiltered:function(){if(""===this.searchCursosModal)return this.AllCursos;var e=Object(p["c"])(this.searchCursosModal);return this.$_.filter(this.AllCursos,(function(t){var r=Object(p["c"])(t.nome),i=Object(p["c"])(t.codigo);return r.match(e)||i.match(e)}))}})},w=D,C=(r("9fbb"),r("2877")),P=Object(C["a"])(w,i,o,!1,null,"206c684a",null);t["default"]=P.exports},"90a3":function(e,t,r){"use strict";var i=r("d712"),o=r.n(i);o.a},"9fbb":function(e,t,r){"use strict";var i=r("c5e9"),o=r.n(i);o.a},c5e9:function(e,t,r){},d712:function(e,t,r){}}]);
//# sourceMappingURL=chunk-2225c573.df8d8141.js.map