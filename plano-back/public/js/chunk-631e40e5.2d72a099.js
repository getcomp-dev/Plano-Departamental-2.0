(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-631e40e5"],{"386d":function(e,t,i){"use strict";var o=i("cb7c"),s=i("83a1"),r=i("5f1b");i("214f")("search",1,(function(e,t,i,a){return[function(i){var o=e(this),s=void 0==i?void 0:i[t];return void 0!==s?s.call(i,o):new RegExp(i)[t](String(o))},function(e){var t=a(i,e,this);if(t.done)return t.value;var n=o(e),c=String(this),l=n.lastIndex;s(l,0)||(n.lastIndex=0);var d=r(n,c);return s(n.lastIndex,l)||(n.lastIndex=l),null===d?-1:d.index}]}))},4374:function(e,t,i){"use strict";i.r(t);var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"main-component row"},[i("portal",{attrs:{to:"page-header"}},[i("BaseButton",{attrs:{template:"filtros"},on:{click:function(t){return e.toggleAsideModal("filtros")}}}),i("BaseButton",{attrs:{template:"ajuda"},on:{click:function(t){return e.toggleAsideModal("ajuda")}}})],1),i("div",{staticClass:"div-table"},[i("BaseTable",{scopedSlots:e._u([{key:"thead",fn:function(){return[i("v-th-ordination",{attrs:{orderFixed:!0,currentOrder:e.ordenacaoMain.planos,orderToCheck:"plano.ano",width:"120",align:"start",title:"Ano/nome do Plano"}},[e._v("\n          Plano\n        ")]),i("v-th",{attrs:{width:"65",title:"Período letivo, ordenação fixa"}},[e._v("Período")]),i("v-th-ordination",{attrs:{orderFixed:!0,currentOrder:e.ordenacaoMain.perfis,orderToCheck:"disciplina.perfil.abreviacao",width:"80",title:"Perfil da Disciplina"}},[e._v("\n          Perfil\n        ")]),i("v-th-ordination",{attrs:{currentOrder:e.ordenacaoMain.turmas,orderToCheck:"disciplina.codigo",width:"80",title:"Código da Disciplina"}},[e._v("\n          Código\n        ")]),i("v-th-ordination",{attrs:{currentOrder:e.ordenacaoMain.turmas,orderToCheck:"disciplina.nome",width:"330",align:"start",title:"Nome da Disciplina"}},[e._v("\n          Disciplina\n        ")]),i("v-th",{attrs:{width:"45"}},[e._v("Turma")]),i("v-th",{attrs:{width:"200",align:"start",title:"Nome do Docente"}},[e._v("Docente")]),i("v-th",{attrs:{width:"80",align:"start"}},[e._v("Turno")]),i("v-th",{attrs:{width:"120",align:"start"}},[e._v("Horário")]),i("v-th",{attrs:{width:"100",align:"start"}},[e._v("Sala")])]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.TurmasRetornadasOrdered,(function(t){return i("tr",{key:t.id+t.letra},[i("v-td",{attrs:{width:"120",align:"start",title:t.plano.ano+"-"+t.plano.nome}},[t.plano.ano?[e._v("\n              "+e._s(t.plano.ano)+" "+e._s(t.plano.nome)+"\n            ")]:[e._v("-")]],2),i("v-td",{attrs:{width:"65"}},[e._v(e._s(t.periodo))]),i("v-td",{style:{backgroundColor:t.disciplina.perfil.cor},attrs:{width:"80",paddinX:"0"}},[e._v("\n            "+e._s(t.disciplina.perfil.abreviacao)+"\n          ")]),i("v-td",{attrs:{width:"80"}},[e._v(e._s(t.disciplina.codigo))]),i("v-td",{attrs:{width:"330",align:"start"}},[e._v(e._s(t.disciplina.nome))]),i("v-td",{attrs:{width:"45",paddinX:"0"}},[e._v(e._s(t.letra))]),i("v-td",{attrs:{width:"200",align:"start"}},[e._v("\n            "+e._s(e.generateDocentesText(t.Docente1,t.Docente2))+"\n          ")]),i("v-td",{attrs:{width:"80",align:"start"}},[e._v(e._s(t.turno1))]),i("v-td",{attrs:{width:"120",align:"start"}},[e._v("\n            "+e._s(e.generateHorariosText(t.Horario1,t.Horario2))+"\n          ")]),i("v-td",{attrs:{width:"100",align:"start",title:e.generateSalasText(t.Sala1,t.Sala2)}},[e._v("\n            "+e._s(e.generateSalasText(t.Sala1,t.Sala2))+"\n          ")])],1)})),e.TurmasRetornadasOrdered.length?e._e():i("tr",[i("v-td",{attrs:{width:1220}},[i("b",[e._v("Nenhuma turma encontrada.")]),e._v("\n            Clique no botão de filtros\n            "),i("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","list-ul"]}}),e._v("\n            para selecioná-las.\n          ")],1)],1)]},proxy:!0}])})],1),i("ModalFiltros",{ref:"modalFiltros",attrs:{callbacks:e.modalFiltrosCallbacks,tabsOptions:e.modalFiltrosTabs}},[i("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Perfis"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Perfis'"}],attrs:{type:"modal"},scopedSlots:e._u([{key:"thead",fn:function(){return[i("v-th",{attrs:{width:"25"}}),i("v-th-ordination",{attrs:{currentOrder:e.ordenacaoModal.perfis,orderToCheck:"nome",width:"425",align:"start"}},[e._v("\n          Nome\n        ")])]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.PerfisOptionsOrdered,(function(t){return i("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:t.id+t.nome,on:{click:function(i){return e.selectPerfis(t)}}},[i("v-td",{attrs:{width:"25",type:"content"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.filtroPerfis.selecionados,expression:"filtroPerfis.selecionados"}],attrs:{type:"checkbox"},domProps:{value:t,indeterminate:t.halfChecked,checked:Array.isArray(e.filtroPerfis.selecionados)?e._i(e.filtroPerfis.selecionados,t)>-1:e.filtroPerfis.selecionados},on:{click:function(i){return i.stopPropagation(),e.selectPerfis(t)},change:function(i){var o=e.filtroPerfis.selecionados,s=i.target,r=!!s.checked;if(Array.isArray(o)){var a=t,n=e._i(o,a);s.checked?n<0&&e.$set(e.filtroPerfis,"selecionados",o.concat([a])):n>-1&&e.$set(e.filtroPerfis,"selecionados",o.slice(0,n).concat(o.slice(n+1)))}else e.$set(e.filtroPerfis,"selecionados",r)}}})]),i("v-td",{attrs:{width:"425",align:"start"}},[e._v(e._s(t.nome))])],1)})),e.PerfisOptionsOrdered.length?e._e():i("tr",[i("v-td",{attrs:{colspan:"3",width:"450"}},[e._v("Nenhum perfil encontrado")])],1)]},proxy:!0}])}),i("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Disciplinas"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Disciplinas'"}],attrs:{type:"modal",hasSearchBar:!0},scopedSlots:e._u([{key:"thead-search",fn:function(){return[i("VInputSearch",{attrs:{placeholder:"Pesquise nome ou codigo de uma disciplina..."},model:{value:e.searchDisciplinasModal,callback:function(t){e.searchDisciplinasModal=t},expression:"searchDisciplinasModal"}})]},proxy:!0},{key:"thead",fn:function(){return[i("v-th",{attrs:{width:"25"}}),i("v-th-ordination",{attrs:{currentOrder:e.ordenacaoModal.disciplinas,orderToCheck:"codigo",width:"70"}},[e._v("\n          Código\n        ")]),i("v-th-ordination",{attrs:{currentOrder:e.ordenacaoModal.disciplinas,orderToCheck:"nome",width:"270"}},[e._v("\n          Nome\n        ")]),i("v-th-ordination",{attrs:{currentOrder:e.ordenacaoModal.disciplinas,orderToCheck:"perfil.abreviacao",width:"85"}},[e._v("\n          Perfil\n        ")])]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.DisciplinasOptionsOrdered,(function(t){return i("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:t.id+t.nome,on:{click:function(i){return e.selectDisciplina(t)}}},[i("v-td",{attrs:{width:"25",type:"content"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.filtroDisciplinas.selecionados,expression:"filtroDisciplinas.selecionados"}],attrs:{type:"checkbox"},domProps:{value:t,checked:Array.isArray(e.filtroDisciplinas.selecionados)?e._i(e.filtroDisciplinas.selecionados,t)>-1:e.filtroDisciplinas.selecionados},on:{click:function(i){return i.stopPropagation(),e.selectDisciplina(t)},change:function(i){var o=e.filtroDisciplinas.selecionados,s=i.target,r=!!s.checked;if(Array.isArray(o)){var a=t,n=e._i(o,a);s.checked?n<0&&e.$set(e.filtroDisciplinas,"selecionados",o.concat([a])):n>-1&&e.$set(e.filtroDisciplinas,"selecionados",o.slice(0,n).concat(o.slice(n+1)))}else e.$set(e.filtroDisciplinas,"selecionados",r)}}})]),i("v-td",{attrs:{width:"70",align:"start"}},[e._v(e._s(t.codigo))]),i("v-td",{attrs:{align:"start",width:"270",title:t.nome}},[e._v("\n            "+e._s(t.nome)+"\n          ")]),i("v-td",{attrs:{width:"85",align:"start"}},[e._v(e._s(t.perfil.abreviacao))])],1)})),e.DisciplinasOptionsOrdered.length?e._e():i("tr",[i("v-td",{attrs:{colspan:"3",width:"450"}},[e._v("NENHUMA DISCIPLINA ENCONTRADA.")])],1)]},proxy:!0}])}),i("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Docentes"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Docentes'"}],attrs:{type:"modal",hasSearchBar:!0},scopedSlots:e._u([{key:"thead-search",fn:function(){return[i("VInputSearch",{attrs:{placeholder:"Pesquise nome ou apelido de um docente..."},model:{value:e.searchDocentesModal,callback:function(t){e.searchDocentesModal=t},expression:"searchDocentesModal"}})]},proxy:!0},{key:"thead",fn:function(){return[i("v-th",{attrs:{width:"25"}}),i("v-th-ordination",{attrs:{currentOrder:e.ordenacaoModal.docentes,orderToCheck:"apelido",width:"120",align:"start"}},[e._v("\n          Apelido\n        ")]),i("v-th-ordination",{attrs:{currentOrder:e.ordenacaoModal.docentes,orderToCheck:"nome",width:"305",align:"start"}},[e._v("\n          Nome\n        ")])]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.DocentesOptionsOrdered,(function(t){return i("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:t.id+t.nome,on:{click:function(i){return e.toggleSearchCodition("Docentes",t.id)}}},[i("v-td",{attrs:{width:"25",type:"content"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.searchConditions.Docentes,expression:"searchConditions.Docentes"}],attrs:{type:"checkbox"},domProps:{value:t.id,checked:Array.isArray(e.searchConditions.Docentes)?e._i(e.searchConditions.Docentes,t.id)>-1:e.searchConditions.Docentes},on:{change:function(i){var o=e.searchConditions.Docentes,s=i.target,r=!!s.checked;if(Array.isArray(o)){var a=t.id,n=e._i(o,a);s.checked?n<0&&e.$set(e.searchConditions,"Docentes",o.concat([a])):n>-1&&e.$set(e.searchConditions,"Docentes",o.slice(0,n).concat(o.slice(n+1)))}else e.$set(e.searchConditions,"Docentes",r)}}})]),i("v-td",{attrs:{width:"120",align:"start"}},[e._v(e._s(t.apelido))]),i("v-td",{attrs:{width:"305",align:"start"}},[e._v(e._s(t.nome))])],1)})),e.DocentesOptionsOrdered.length?e._e():i("tr",[i("v-td",{attrs:{colspan:"3",width:"450"}},[e._v("NENHUM DOCENTE ENCONTRADO.")])],1)]},proxy:!0}])}),i("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Períodos"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Períodos'"}],attrs:{type:"modal"},scopedSlots:e._u([{key:"thead",fn:function(){return[i("v-th",{attrs:{width:"25"}}),i("v-th",{attrs:{width:"425",align:"start"}},[e._v("Periodos Letivo")])]},proxy:!0},{key:"tbody",fn:function(){return e._l(e.PeriodosOptions,(function(t){return i("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:t.id+t.nome,on:{click:function(i){return e.selecionaPeriodo(t,e.filtroPeriodos.selecionados)}}},[i("v-td",{attrs:{width:"25",type:"content"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.filtroPeriodos.selecionados,expression:"filtroPeriodos.selecionados"}],attrs:{type:"checkbox"},domProps:{value:t,checked:Array.isArray(e.filtroPeriodos.selecionados)?e._i(e.filtroPeriodos.selecionados,t)>-1:e.filtroPeriodos.selecionados},on:{click:function(i){return i.stopPropagation(),e.selecionaPeriodo(t)},change:function(i){var o=e.filtroPeriodos.selecionados,s=i.target,r=!!s.checked;if(Array.isArray(o)){var a=t,n=e._i(o,a);s.checked?n<0&&e.$set(e.filtroPeriodos,"selecionados",o.concat([a])):n>-1&&e.$set(e.filtroPeriodos,"selecionados",o.slice(0,n).concat(o.slice(n+1)))}else e.$set(e.filtroPeriodos,"selecionados",r)}}})]),i("v-td",{attrs:{width:"425",align:"start"}},[e._v(e._s(t.nome))])],1)}))},proxy:!0}])}),i("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Semestres"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Semestres'"}],attrs:{type:"modal"},scopedSlots:e._u([{key:"thead",fn:function(){return[i("v-th",{attrs:{width:"25"}}),i("v-th",{attrs:{width:"425",align:"start"}},[e._v("Semestre Letivo")])]},proxy:!0},{key:"tbody",fn:function(){return e._l(e.SemestresOptions,(function(t){return i("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:t.id+t.nome,on:{click:function(i){return e.selecionaSemestre(t)}}},[i("v-td",{attrs:{width:"25",type:"content"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.filtroSemestres.selecionados,expression:"filtroSemestres.selecionados"}],attrs:{type:"checkbox"},domProps:{value:t,indeterminate:t.halfChecked,checked:Array.isArray(e.filtroSemestres.selecionados)?e._i(e.filtroSemestres.selecionados,t)>-1:e.filtroSemestres.selecionados},on:{click:function(i){return i.stopPropagation(),e.selecionaSemestre(t)},change:function(i){var o=e.filtroSemestres.selecionados,s=i.target,r=!!s.checked;if(Array.isArray(o)){var a=t,n=e._i(o,a);s.checked?n<0&&e.$set(e.filtroSemestres,"selecionados",o.concat([a])):n>-1&&e.$set(e.filtroSemestres,"selecionados",o.slice(0,n).concat(o.slice(n+1)))}else e.$set(e.filtroSemestres,"selecionados",r)}}})]),i("v-td",{attrs:{width:"425",align:"start"}},[e._v(e._s(t.nome))])],1)}))},proxy:!0}])}),i("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Horários"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Horários'"}],attrs:{type:"modal",hasSearchBar:!0},scopedSlots:e._u([{key:"thead-search",fn:function(){return[i("VInputSearch",{attrs:{placeholder:"Pesquise um horário..."},model:{value:e.searchHorariosModal,callback:function(t){e.searchHorariosModal=t},expression:"searchHorariosModal"}})]},proxy:!0},{key:"thead",fn:function(){return[i("v-th",{attrs:{width:"25"}}),i("v-th",{attrs:{width:"425",align:"start"}},[e._v("Horário")])]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.HorariosOptionsFiltered,(function(t){return i("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:t.id+t.horario,on:{click:function(i){return e.toggleSearchCodition("Horarios",t.id)}}},[i("v-td",{attrs:{width:"25",type:"content"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.searchConditions.Horarios,expression:"searchConditions.Horarios"}],attrs:{type:"checkbox"},domProps:{value:t.id,checked:Array.isArray(e.searchConditions.Horarios)?e._i(e.searchConditions.Horarios,t.id)>-1:e.searchConditions.Horarios},on:{change:function(i){var o=e.searchConditions.Horarios,s=i.target,r=!!s.checked;if(Array.isArray(o)){var a=t.id,n=e._i(o,a);s.checked?n<0&&e.$set(e.searchConditions,"Horarios",o.concat([a])):n>-1&&e.$set(e.searchConditions,"Horarios",o.slice(0,n).concat(o.slice(n+1)))}else e.$set(e.searchConditions,"Horarios",r)}}})]),i("v-td",{attrs:{width:"425",align:"start"}},[e._v(e._s(t.horario))])],1)})),e.HorariosOptionsFiltered.length?e._e():i("tr",[i("v-td",{attrs:{colspan:"2",width:"450"}},[e._v("NENHUM HORÁRIO ENCONTRADO.")])],1)]},proxy:!0}])}),i("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Salas"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Salas'"}],attrs:{type:"modal",hasSearchBar:!0},scopedSlots:e._u([{key:"thead-search",fn:function(){return[i("VInputSearch",{attrs:{placeholder:"Pesquise uma sala..."},model:{value:e.searchSalasModal,callback:function(t){e.searchSalasModal=t},expression:"searchSalasModal"}})]},proxy:!0},{key:"thead",fn:function(){return[i("v-th",{attrs:{width:"25"}}),i("v-th",{attrs:{width:"425",align:"start"}},[e._v("Nome")])]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.SalasOptionsFiltered,(function(t){return i("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:t.id+t.nome,on:{click:function(i){return e.toggleSearchCodition("Salas",t.id)}}},[i("v-td",{attrs:{width:"25",type:"content"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.searchConditions.Salas,expression:"searchConditions.Salas"}],attrs:{type:"checkbox"},domProps:{value:t.id,checked:Array.isArray(e.searchConditions.Salas)?e._i(e.searchConditions.Salas,t.id)>-1:e.searchConditions.Salas},on:{change:function(i){var o=e.searchConditions.Salas,s=i.target,r=!!s.checked;if(Array.isArray(o)){var a=t.id,n=e._i(o,a);s.checked?n<0&&e.$set(e.searchConditions,"Salas",o.concat([a])):n>-1&&e.$set(e.searchConditions,"Salas",o.slice(0,n).concat(o.slice(n+1)))}else e.$set(e.searchConditions,"Salas",r)}}})]),i("v-td",{attrs:{width:"425",align:"start"}},[e._v(e._s(t.nome))])],1)})),e.SalasOptionsFiltered.length?e._e():i("tr",[i("v-td",{attrs:{colspan:"2",width:"450"}},[e._v("NENHUMA SALA ENCONTRADA.")])],1)]},proxy:!0}])}),i("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Planos"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Planos'"}],attrs:{type:"modal"},scopedSlots:e._u([{key:"thead",fn:function(){return[i("v-th",{attrs:{width:"25"}}),i("v-th",{attrs:{width:"70",align:"start"}},[e._v("Ano")]),i("v-th",{attrs:{width:"355",align:"start"}},[e._v("Nome")])]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.Planos,(function(t){return i("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:t.id+t.ano+t.nome,on:{click:function(i){return e.toggleSearchCodition("Planos",t.id)}}},[i("v-td",{attrs:{width:"25",type:"content"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.searchConditions.Planos,expression:"searchConditions.Planos"}],attrs:{type:"checkbox"},domProps:{value:t.id,checked:Array.isArray(e.searchConditions.Planos)?e._i(e.searchConditions.Planos,t.id)>-1:e.searchConditions.Planos},on:{change:function(i){var o=e.searchConditions.Planos,s=i.target,r=!!s.checked;if(Array.isArray(o)){var a=t.id,n=e._i(o,a);s.checked?n<0&&e.$set(e.searchConditions,"Planos",o.concat([a])):n>-1&&e.$set(e.searchConditions,"Planos",o.slice(0,n).concat(o.slice(n+1)))}else e.$set(e.searchConditions,"Planos",r)}}})]),i("v-td",{attrs:{width:"70",align:"start"}},[e._v(e._s(t.ano))]),i("v-td",{attrs:{width:"355",align:"start"}},[e._v(e._s(t.nome))])],1)})),e.Planos.length?e._e():i("tr",[i("v-td",{attrs:{colspan:"3",width:"450"}},[e._v("NENHUM PLANO ENCONTRADO.")])],1)]},proxy:!0}])})],1),i("ModalAjuda",{ref:"modalAjuda"},[i("li",{staticClass:"list-group-item"},[i("b",[e._v("Visualizar conteúdo:")]),e._v("\n      Clique no ícone de filtros\n      "),i("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","list-ul"]}}),e._v("\n      no cabeçalho da página e, na janela que se abrirá, utilize as abas para navegar entre os\n      tipos de filtro disponíveis. Marque quais informações deseja visualizar, e para finalizar\n      clique no botão OK.\n    ")],1),i("li",{staticClass:"list-group-item"},[i("b",[e._v("Observações:")]),e._v("\n      Caso um dos filtros não possua nenhum campo selecionado, a busca acontecerá como se todas\n      opções daquele filtro estivessem selecionadas, ou seja, marque apenas os filtros\n      necessários. Não é necessário marcar todos os restantes.\n    ")])])],1)},s=[],r=(i("1c01"),i("58b2"),i("8e6e"),i("f3e2"),i("d25f"),i("ac6a"),i("456d"),i("4917"),i("ade3")),a=(i("20d6"),i("386d"),i("96cf"),i("1da1")),n=(i("6d67"),i("2909")),c=i("2f62"),l=i("7191"),d=i("5b2e"),u=i("d4b9"),h=i("0a94"),p=i("6740"),f=i("bfea"),v=i("eaf8"),m=i("9165"),y=i("25df"),b=i("d027");function O(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,o)}return i}function w(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?O(Object(i),!0).forEach((function(t){Object(r["a"])(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):O(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}var k={name:"BuscarTurmas",mixins:[m["k"],m["i"],m["d"],m["e"],m["f"],m["a"],m["b"]],components:{ModalAjuda:b["a"],ModalFiltros:b["f"],VInputSearch:y["k"]},data:function(){var e=this;return{asideModalsRefs:["modalFiltros","modalAjuda"],turmaClicked:Object(v["c"])(),searchDocentesModal:"",searchDisciplinasModal:"",searchHorariosModal:"",searchSalasModal:"",searchConditions:{Planos:[],Disciplinas:[],Docentes:[],Horarios:[],Salas:[],Periodos:[]},filtroPerfis:{selecionados:[]},filtroDisciplinas:{selecionados:[]},filtroPeriodos:{selecionados:[]},filtroSemestres:{selecionados:[]},modalFiltrosTabs:{current:"Perfis",array:["Perfis","Disciplinas","Docentes","Períodos","Semestres","Horários","Salas","Planos"],withScroll:!0},modalFiltrosCallbacks:{selectAll:{Perfis:function(){e.filtroDisciplinas.selecionados=Object(n["a"])(e.DisciplinasOptions),e.filtroPerfis.selecionados=Object(n["a"])(e.PerfisOptions)},Disciplinas:function(){e.filtroDisciplinas.selecionados=Object(l["a"])(e.DisciplinasOptionsFiltered,e.filtroDisciplinas.selecionados),e.conectaDisciplinasEmPerfis()},Docentes:function(){e.searchConditions.Docentes=Object(l["a"])(e.searchConditions.Docentes,e.DocentesFiltredModal.map((function(e){return e.id})))},Horarios:function(){e.searchConditions.Horarios=Object(l["a"])(e.searchConditions.Horarios,e.HorariosOptionsFiltered.map((function(e){return e.id})))},Salas:function(){e.searchConditions.Salas=Object(l["a"])(e.searchConditions.Salas,e.SalasOptionsFiltered.map((function(e){return e.id})))},Planos:function(){e.searchConditions.Planos=e.Planos.map((function(e){return e.id}))},Periodos:function(){e.filtroPeriodos.selecionados=Object(n["a"])(e.PeriodosOptions),e.filtroSemestres.selecionados=Object(n["a"])(e.SemestresOptions)},Semestres:function(){e.filtroSemestres.selecionados=Object(n["a"])(e.SemestresOptions),e.filtroPeriodos.selecionados=Object(n["a"])(e.PeriodosOptions)}},selectNone:{Perfis:function(){e.filtroPerfis.selecionados=[],e.filtroDisciplinas.selecionados=[]},Disciplinas:function(){e.filtroDisciplinas.selecionados=Object(d["a"])(e.filtroDisciplinas.selecionados,e.DisciplinasOptionsFiltered),e.conectaDisciplinasEmPerfis()},Docentes:function(){e.searchConditions.Docentes=Object(d["a"])(e.searchConditions.Docentes,e.DocentesFiltredModal.map((function(e){return e.id})))},Horarios:function(){e.searchConditions.Horarios=Object(d["a"])(e.searchConditions.Horarios,e.HorariosOptionsFiltered.map((function(e){return e.id})))},Salas:function(){e.searchConditions.Salas=Object(d["a"])(e.searchConditions.Salas,e.SalasOptionsFiltered.map((function(e){return e.id})))},Planos:function(){e.searchConditions.Planos=[]},Periodos:function(){e.filtroPeriodos.selecionados=[],e.filtroSemestres.selecionados=[]},Semestres:function(){e.filtroSemestres.selecionados=[],e.filtroPeriodos.selecionados=[]}},btnOk:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.searchConditions.Disciplinas=e.filtroDisciplinas.selecionados.map((function(e){return e.id})),e.searchConditions.Periodos=e.filtroPeriodos.selecionados.map((function(e){return e.id})),t.next=4,e.searchTurmas();case 4:case"end":return t.stop()}}),t)})));function i(){return t.apply(this,arguments)}return i}()},ordenacaoModal:{cursos:{order:"codigo",type:"asc"},disciplinas:{order:"codigo",type:"asc"},perfis:{order:"nome",type:"asc"},docentes:{order:"apelido",type:"asc"}},ordenacaoMain:{turmas:{order:"disciplina.codigo",type:"asc"},planos:{order:"plano.ano",type:"asc"},perfis:{order:"disciplina.perfil.abreviacao",type:"asc"}},TurmasRetornadas:[]}},methods:{searchTurmas:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f["a"].search(this.searchConditions);case 3:t=e.sent,this.TurmasRetornadas=t.Turmas,e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),this.pushNotification({type:"error",text:"Não foi possivel encontrar turmas."});case 10:case"end":return e.stop()}}),e,this,[[0,7]])})));function t(){return e.apply(this,arguments)}return t}(),toggleSearchCodition:function(e,t){var i=this.searchConditions[e].findIndex((function(e){return e==t}));-1===i?this.searchConditions[e].push(t):this.searchConditions[e].splice(i,1)}},computed:w(w({},Object(c["c"])(["PerfisDCC","Planos","AllDocentes","AllHorarios","AllSalas","DisciplinasDCC"])),{},{TurmasRetornadasOrdered:function(){var e=this.ordenacaoMain,t=e.turmas,i=e.perfis,o=e.planos;return Object(u["a"])(this.TurmasRetornadasMapped,["periodo",o.order,i.order,t.order],["asc",o.type,i.type,t.type])},TurmasRetornadasMapped:function(){var e=this;return this.TurmasRetornadas.map((function(t){return w(w({},t),{},{disciplina:Object(h["a"])(e.DisciplinasDCC,["id",t.Disciplina]),plano:Object(h["a"])(e.Planos,["id",t.Plano])||{}})}))},PerfisOptionsOrdered:function(){return Object(u["a"])(this.PerfisOptions,this.ordenacaoModal.perfis.order,this.ordenacaoModal.perfis.type)},PerfisOptions:function(){var e=this;return this.PerfisDCC.map((function(t){var i=Object(p["a"])(e.DisciplinasOptions,["Perfil",t.id]),o=Object(p["a"])(e.filtroDisciplinas.selecionados,["Perfil",t.id]),s=!1;return i.length===o.length?s=!1:o.length>0&&(s=!0),w(w({},t),{},{halfChecked:s})}))},DisciplinasOptionsOrdered:function(){return Object(u["a"])(this.DisciplinasOptionsFiltered,this.ordenacaoModal.disciplinas.order,this.ordenacaoModal.disciplinas.type)},DisciplinasOptionsFiltered:function(){if(""===this.searchDisciplinasModal)return this.DisciplinasOptions;var e=Object(v["f"])(this.searchDisciplinasModal);return Object(p["a"])(this.DisciplinasOptions,(function(t){var i=Object(v["f"])(t.nome),o=Object(v["f"])(t.codigo);return i.match(e)||o.match(e)}))},DisciplinasOptions:function(){return this.DisciplinasDCC},DocentesOptionsOrdered:function(){return Object(u["a"])(this.DocentesFiltredModal,this.ordenacaoModal.docentes.order,this.ordenacaoModal.docentes.type)},DocentesFiltredModal:function(){if(""===this.searchDocentesModal)return this.AllDocentes;var e=Object(v["f"])(this.searchDocentesModal);return Object(p["a"])(this.AllDocentes,(function(t){var i=Object(v["f"])(t.nome),o=Object(v["f"])(t.apelido);return i.match(e)||o.match(e)}))},HorariosOptionsFiltered:function(){if(""===this.searchHorariosModal)return this.AllHorarios;var e=Object(v["f"])(this.searchHorariosModal);return Object(p["a"])(this.AllHorarios,(function(t){var i=Object(v["f"])(t.horario);return i.match(e)}))},SalasOptionsFiltered:function(){if(""===this.searchSalasModal)return this.AllSalas;var e=Object(v["f"])(this.searchSalasModal);return Object(p["a"])(this.AllSalas,(function(t){var i=Object(v["f"])(t.nome);return i.match(e)}))}})},_=k,g=i("2877"),P=Object(g["a"])(_,o,s,!1,null,null,null);t["default"]=P.exports},"5b2e":function(e,t,i){"use strict";var o=i("9ac7"),s=i("72fb"),r=i("fb63"),a=i("b703"),n=i("a2fb"),c=i("6568"),l=200;function d(e,t,i,d){var u=-1,h=s["a"],p=!0,f=e.length,v=[],m=t.length;if(!f)return v;i&&(t=Object(a["a"])(t,Object(n["a"])(i))),d?(h=r["a"],p=!1):t.length>=l&&(h=c["a"],p=!1,t=new o["a"](t));e:while(++u<f){var y=e[u],b=null==i?y:i(y);if(y=d||0!==y?y:0,p&&b===b){var O=m;while(O--)if(t[O]===b)continue e;v.push(y)}else h(t,b,d)||v.push(y)}return v}var u=d,h=i("b93d"),p=i("2d5d"),f=i("010c"),v=Object(p["a"])((function(e,t){return Object(f["a"])(e)?u(e,Object(h["a"])(t,1,f["a"],!0)):[]}));t["a"]=v},"83a1":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}}}]);
//# sourceMappingURL=chunk-631e40e5.2d72a099.js.map