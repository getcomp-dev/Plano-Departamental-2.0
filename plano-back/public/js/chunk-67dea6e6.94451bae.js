(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67dea6e6"],{"5c48":function(e,o,i){"use strict";i("d298")},d298:function(e,o,i){},dfa6:function(e,o,i){"use strict";i.r(o);var t=function(){var e=this,o=e.$createElement,i=e._self._c||o;return i("div",{staticClass:"main-component row"},[i("portal",{attrs:{to:"page-header"}},[i("BaseButton",{attrs:{template:"filtros"},on:{click:function(o){return e.toggleAsideModal("filtros")}}}),i("BaseButton",{attrs:{template:"ajuda"},on:{click:function(o){return e.toggleAsideModal("ajuda")}}})],1),i("NavTab",{attrs:{currentTab:e.tabAtivaMain,allTabs:["Turmas","Docentes"]},on:{"change-tab":function(o){e.tabAtivaMain=o}}}),i("div",{staticClass:"div-table"},[i("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Turmas"===e.tabAtivaMain,expression:"tabAtivaMain === 'Turmas'"}],attrs:{classes:"custom-table-height"},scopedSlots:e._u([{key:"thead",fn:function(){return[i("v-th",{attrs:{width:"65",title:"Período letivo, ordenação fixa"}},[e._v("Período")]),i("v-th-ordination",{attrs:{currentOrder:e.ordenacaoTurmasMain,orderToCheck:"disciplina.perfil.abreviacao",width:"80",align:"start",title:"Perfil da Disciplina"}},[e._v("\n          Perfil\n        ")]),i("v-th-ordination",{attrs:{currentOrder:e.ordenacaoTurmasMain,orderToCheck:"disciplina.codigo",width:"80",title:"Código da Disciplina"}},[e._v("\n          Código\n        ")]),i("v-th-ordination",{attrs:{currentOrder:e.ordenacaoTurmasMain,orderToCheck:"disciplina.nome",width:"300",align:"start",title:"Nome da Disciplina"}},[e._v("\n          Disciplina\n        ")]),i("v-th",{attrs:{width:"45"}},[e._v("Turma")]),i("v-th",{attrs:{width:"150",align:"start",title:"Apelido do Docente"}},[e._v("Docentes")]),i("v-th",{attrs:{width:"50"}},[e._v("Editar")])]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.TurmasValidacoesOrdered,(function(o){return[i("tr",{key:o.id+o.letra,staticClass:"bg-custom"},[i("v-td",{attrs:{width:"65"}},[e._v("\n              "+e._s(o.periodo)+"\n            ")]),i("v-td",{attrs:{width:"80",align:"start",title:o.disciplina.perfil.nome}},[e._v("\n              "+e._s(o.disciplina.perfil.abreviacao)+"\n            ")]),i("v-td",{attrs:{width:"80"}},[e._v("\n              "+e._s(o.disciplina.codigo)+"\n            ")]),i("v-td",{attrs:{width:"300",align:"start"}},[e._v("\n              "+e._s(o.disciplina.nome)+"\n            ")]),i("v-td",{attrs:{width:"45"}},[e._v("\n              "+e._s(o.letra)+"\n            ")]),i("v-td",{attrs:{width:"150",align:"start"}},[e._v("\n              "+e._s(e.generateDocentesText(o.Docente1,o.Docente2))+"\n            ")]),i("v-td",{attrs:{width:"50"}},[i("button",{staticClass:"btn-table",attrs:{title:"Editar turma"},on:{click:function(i){return i.stopPropagation(),e.openModalEditTurma(o)}}},[i("font-awesome-icon",{staticClass:"icon-darkgray",attrs:{icon:["fas","edit"]}})],1)])],1),e._l(o.conflitos,(function(t,a){return i("tr",{key:"conflito"+a+o.id+t.type},[i("v-td",{attrs:{width:"35"}},[e.isCritical(t.type)?i("font-awesome-icon",{staticClass:"icon-red",staticStyle:{"font-size":"13px"},attrs:{icon:["fas","exclamation-circle"],title:"Conflito critico!"}}):e._e()],1),i("v-td",{attrs:{width:"670",align:"start",colspan:"6"}},[e._v(e._s(t.msg))])],1)}))]})),e.TurmasValidacoesOrdered.length?e._e():i("tr",[i("v-td",{attrs:{width:"770"}},[i("b",[e._v("Nenhum conflito encontrado em turmas.")]),e._v("\n            Clique no botão de filtros\n            "),i("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","list-ul"]}}),e._v("\n            para selecioná-los.\n          ")],1)],1)]},proxy:!0}])}),i("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Docentes"===e.tabAtivaMain,expression:"tabAtivaMain === 'Docentes'"}],attrs:{classes:"custom-table-height"},scopedSlots:e._u([{key:"thead",fn:function(){return[i("v-th-ordination",{attrs:{currentOrder:e.ordenacaoDocentesMain,orderToCheck:"nome",width:"710",align:"start",colspan:"2",title:"Nome do Docente"}},[e._v("\n          Nome\n        ")])]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.DocentesValidacoesOrdered,(function(o){return[i("tr",{key:o.id+o.nome,staticClass:"bg-custom"},[i("v-td",{attrs:{colspan:"2",width:"710",align:"start"}},[e._v("\n              "+e._s(o.nome)+"\n            ")])],1),e._l(o.conflitos,(function(t){return i("tr",{key:o.id+t},[i("v-td",{attrs:{width:"35"}},[i("font-awesome-icon",{staticClass:"icon-red",staticStyle:{"font-size":"13px"},attrs:{icon:["fas","exclamation-circle"],title:"Conflito critico!"}})],1),i("v-td",{attrs:{width:"675",align:"start"}},[e._v(e._s(t))])],1)}))]})),e.DocentesValidacoesOrdered.length?e._e():i("tr",[i("v-td",{attrs:{width:"710"}},[i("b",[e._v("Nenhum conflito encontrado em docentes.")])])],1)]},proxy:!0}])})],1),i("ModalFiltros",{ref:"modalFiltros",attrs:{callbacks:e.modalFiltrosCallbacks,tabsOptions:e.modalFiltrosTabs}},[i("div",{staticClass:"div-table"},[i("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Conflitos"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Conflitos'"}],attrs:{type:"modal"},scopedSlots:e._u([{key:"thead",fn:function(){return[i("v-th",{attrs:{width:"25"}}),i("v-th",{attrs:{width:"425",align:"start"}},[e._v("Conflito")])]},proxy:!0},{key:"tbody",fn:function(){return e._l(e.ConflitosOptionsOrdered,(function(o){return i("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:o.type+o.msg,on:{click:function(i){return e.toggleItemInArray(o.type,e.filtroConflitos.selecionados)}}},[i("v-td",{attrs:{width:"25",type:"content"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.filtroConflitos.selecionados,expression:"filtroConflitos.selecionados"}],attrs:{type:"checkbox"},domProps:{value:o.type,checked:Array.isArray(e.filtroConflitos.selecionados)?e._i(e.filtroConflitos.selecionados,o.type)>-1:e.filtroConflitos.selecionados},on:{change:function(i){var t=e.filtroConflitos.selecionados,a=i.target,r=!!a.checked;if(Array.isArray(t)){var s=o.type,n=e._i(t,s);a.checked?n<0&&e.$set(e.filtroConflitos,"selecionados",t.concat([s])):n>-1&&e.$set(e.filtroConflitos,"selecionados",t.slice(0,n).concat(t.slice(n+1)))}else e.$set(e.filtroConflitos,"selecionados",r)}}})]),i("v-td",{attrs:{width:"425",align:"start"}},[e._v(e._s(o.msg))])],1)}))},proxy:!0}])}),i("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Períodos"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Períodos'"}],attrs:{type:"modal"},scopedSlots:e._u([{key:"thead",fn:function(){return[i("v-th",{attrs:{width:"25"}}),i("v-th",{attrs:{width:"425",align:"start"}},[e._v("Periodos Letivo")])]},proxy:!0},{key:"tbody",fn:function(){return e._l(e.PeriodosOptions,(function(o){return i("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:o.id+o.nome,on:{click:function(i){return e.selecionaPeriodo(o,e.filtroPeriodos.selecionados)}}},[i("v-td",{attrs:{width:"25",type:"content"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.filtroPeriodos.selecionados,expression:"filtroPeriodos.selecionados"}],attrs:{type:"checkbox"},domProps:{value:o,checked:Array.isArray(e.filtroPeriodos.selecionados)?e._i(e.filtroPeriodos.selecionados,o)>-1:e.filtroPeriodos.selecionados},on:{click:function(i){return i.stopPropagation(),e.selecionaPeriodo(o)},change:function(i){var t=e.filtroPeriodos.selecionados,a=i.target,r=!!a.checked;if(Array.isArray(t)){var s=o,n=e._i(t,s);a.checked?n<0&&e.$set(e.filtroPeriodos,"selecionados",t.concat([s])):n>-1&&e.$set(e.filtroPeriodos,"selecionados",t.slice(0,n).concat(t.slice(n+1)))}else e.$set(e.filtroPeriodos,"selecionados",r)}}})]),i("v-td",{attrs:{width:"425",align:"start"}},[e._v(e._s(o.nome))])],1)}))},proxy:!0}])}),i("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Semestres"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Semestres'"}],attrs:{type:"modal"},scopedSlots:e._u([{key:"thead",fn:function(){return[i("v-th",{attrs:{width:"25"}}),i("v-th",{attrs:{width:"425",align:"start"}},[e._v("Semestre Letivo")])]},proxy:!0},{key:"tbody",fn:function(){return e._l(e.SemestresOptions,(function(o){return i("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:o.id+o.nome,on:{click:function(i){return e.selecionaSemestre(o)}}},[i("v-td",{attrs:{width:"25",type:"content"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.filtroSemestres.selecionados,expression:"filtroSemestres.selecionados"}],attrs:{type:"checkbox"},domProps:{value:o,indeterminate:o.halfChecked,checked:Array.isArray(e.filtroSemestres.selecionados)?e._i(e.filtroSemestres.selecionados,o)>-1:e.filtroSemestres.selecionados},on:{click:function(i){return i.stopPropagation(),e.selecionaSemestre(o)},change:function(i){var t=e.filtroSemestres.selecionados,a=i.target,r=!!a.checked;if(Array.isArray(t)){var s=o,n=e._i(t,s);a.checked?n<0&&e.$set(e.filtroSemestres,"selecionados",t.concat([s])):n>-1&&e.$set(e.filtroSemestres,"selecionados",t.slice(0,n).concat(t.slice(n+1)))}else e.$set(e.filtroSemestres,"selecionados",r)}}})]),i("v-td",{attrs:{width:"425",align:"start"}},[e._v(e._s(o.nome))])],1)}))},proxy:!0}])})],1)]),i("ModalEditTurma",{ref:"modalEditTurma",attrs:{turma:e.turmaClicked,hasEditDisciplina:!1}}),i("ModalAjuda",{ref:"modalAjuda"},[i("li",{staticClass:"list-group-item"},[i("b",[e._v("Visualizar conteúdo:")]),e._v("\n      Clique no ícone de filtros\n      "),i("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","list-ul"]}}),e._v("\n      no cabeçalho da página e, na janela que se abrirá, utilize as abas para navegar entre os\n      tipos de filtro disponíveis. Marque quais informações deseja visualizar, e para finalizar\n      clique no botão OK.\n    ")],1),i("li",{staticClass:"list-group-item"},[i("b",[e._v("Editar turma:")]),e._v("\n      Clique no ícone\n      "),i("font-awesome-icon",{staticClass:"icon-darkgray",attrs:{icon:["fas","edit"]}}),e._v('\n      presente na coluna "Editar". Uma janela de edição irá se abrir. As alterações realizadas nos\n      campos da metade superior da janela somente serão enviadas ao clicar no botão "Salvar". Já\n      para o quantitativo de vagas na parte inferior, as alterações serão salvas automaticamente.\n    ')],1),i("li",{staticClass:"list-group-item"},[i("b",[e._v("Conflitos críticos:")]),e._v("\n      Note que alguns conflitos possuem o ícone\n      "),i("font-awesome-icon",{staticClass:"icon-red",attrs:{icon:["fas","exclamation-circle"]}}),e._v("\n      . Isso significa que ele é crítico, devendo ser priorizado na correção.\n    ")],1)])],1)},a=[],r=(i("1c01"),i("58b2"),i("8e6e"),i("d25f"),i("456d"),i("ac6a"),i("f3e2"),i("ade3")),s=(i("6d67"),i("2909")),n=i("2f62"),c=i("758b"),l=i("6740"),d=i("d4b9"),u=i("5c8a"),p=i("0a94"),f=i("9429"),m=i("eaf8"),h=i("9165"),v=i("d027"),b=i("25df");function g(e,o){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);o&&(t=t.filter((function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable}))),i.push.apply(i,t)}return i}function C(e){for(var o=1;o<arguments.length;o++){var i=null!=arguments[o]?arguments[o]:{};o%2?g(Object(i),!0).forEach((function(o){Object(r["a"])(e,o,i[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):g(Object(i)).forEach((function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(i,o))}))}return e}var D=[{type:1,msg:"Nenhum turno alocado"},{type:2,msg:"Disciplina da EAD deve ter turno EAD associado."},{type:3,msg:"Horários incompletos ou inválidos"},{type:4,msg:"Nenhum docente alocado"},{type:5,msg:"Disciplina prática deve ter laboratorio alocado"},{type:6,msg:"Disciplina desejável laborátorio, porêm não possui laboratorio alocado"},{type:7,msg:"Limite de lotação da sala ultrapassado"},{type:8,msg:"Apenas 4 ou menos vagas foram alocadas"},{type:9,msg:"Turma EAD não deve ter sala alocada"},{type:10,msg:"Conflito de horarios na grade"},{type:11,msg:"Disciplina de curso presencial não pode ter turno EAD"}],y={name:"ValidacoesGraduacaoDCC",mixins:[h["l"],h["k"],h["b"],h["i"],h["d"],h["j"]],components:{ModalAjuda:v["a"],ModalFiltros:v["f"],ModalEditTurma:v["e"],NavTab:b["e"]},data:function(){var e=this;return{tabAtivaMain:"Turmas",asideModalsRefs:["modalFiltros","modalAjuda"],turmaClicked:Object(m["c"])(),allConflitos:Object(c["a"])(D),grades1Semestre:{CCD:[],CCN:[],EC:[],SI:[]},grades2Semestre:{CCD:[],CCN:[],EC:[],SI:[]},ordenacaoTurmasMain:{order:"periodo",type:"asc"},ordenacaoDocentesMain:{order:"nome",type:"asc"},filtroConflitos:{ativados:[],selecionados:[]},filtroPeriodos:{ativados:[],selecionados:[]},filtroSemestres:{selecionados:[]},modalFiltrosTabs:{current:"Conflitos",array:["Conflitos","Períodos","Semestres"]},modalFiltrosCallbacks:{selectAll:{Conflitos:function(){e.filtroConflitos.selecionados=Object(s["a"])(e.allConflitos.map((function(e){return e.type})))},Periodos:function(){e.filtroPeriodos.selecionados=Object(s["a"])(e.PeriodosOptions),e.filtroSemestres.selecionados=Object(s["a"])(e.SemestresOptions)},Semestres:function(){e.filtroSemestres.selecionados=Object(s["a"])(e.SemestresOptions),e.filtroPeriodos.selecionados=Object(s["a"])(e.PeriodosOptions)}},selectNone:{Conflitos:function(){e.filtroConflitos.selecionados=[]},Periodos:function(){e.filtroPeriodos.selecionados=[],e.filtroSemestres.selecionados=[]},Semestres:function(){e.filtroSemestres.selecionados=[],e.filtroPeriodos.selecionados=[]}},btnOk:function(){e.filtroPeriodos.ativados=Object(s["a"])(e.filtroPeriodos.selecionados),e.filtroConflitos.ativados=Object(s["a"])(e.filtroConflitos.selecionados)}}}},beforeMount:function(){var e,o,i;this.modalFiltrosCallbacks.selectAll.Periodos();var t=this.$store.state.plano.Plano[0].ano;e=Object(l["a"])(this.$store.state.grade.Grades,["Curso",4]),e=Object(d["a"])(e,"periodoInicio","desc"),i=0;for(var a=0;a<e.length;a++)if(o=i+1,i=1+2*(parseInt(t,10)-parseInt(e[a].periodoInicio.slice(0,4),10))+(1-parseInt(e[a].periodoInicio.slice(5,6),10))/2,this.grades1Semestre.CCD.push({id:e[a].id,inicio:o,fim:i}),i>9)break;i=0;for(var r=0;r<e.length;r++)if(o=i+1,i=1+2*(parseInt(t,10)-parseInt(e[r].periodoInicio.slice(0,4),10))+(3-parseInt(e[r].periodoInicio.slice(5,6),10))/2,this.grades2Semestre.CCD.push({id:e[r].id,inicio:o,fim:i}),i>9)break;e=Object(l["a"])(this.$store.state.grade.Grades,["Curso",1]),e=Object(d["a"])(e,"periodoInicio","desc"),i=0;for(var s=0;s<e.length;s++)if(o=i+1,i=1+2*(parseInt(t,10)-parseInt(e[s].periodoInicio.slice(0,4),10))+(1-parseInt(e[s].periodoInicio.slice(5,6),10))/2,this.grades1Semestre.CCN.push({id:e[s].id,inicio:o,fim:i}),i>9)break;i=0;for(var n=0;n<e.length;n++)if(o=i+1,i=1+2*(parseInt(t,10)-parseInt(e[n].periodoInicio.slice(0,4),10))+(3-parseInt(e[n].periodoInicio.slice(5,6),10))/2,this.grades2Semestre.CCN.push({id:e[n].id,inicio:o,fim:i}),i>9)break;e=Object(l["a"])(this.$store.state.grade.Grades,["Curso",3]),e=Object(d["a"])(e,"periodoInicio","desc"),i=0;for(var c=0;c<e.length;c++)if(o=i+1,i=1+2*(parseInt(t,10)-parseInt(e[c].periodoInicio.slice(0,4),10))+(1-parseInt(e[c].periodoInicio.slice(5,6),10))/2,this.grades1Semestre.SI.push({id:e[c].id,inicio:o,fim:i}),i>9)break;i=0;for(var u=0;u<e.length;u++)if(o=i+1,i=1+2*(parseInt(t,10)-parseInt(e[u].periodoInicio.slice(0,4),10))+(3-parseInt(e[u].periodoInicio.slice(5,6),10))/2,this.grades2Semestre.SI.push({id:e[u].id,inicio:o,fim:i}),i>9)break;e=Object(l["a"])(this.$store.state.grade.Grades,["Curso",2]),e=Object(d["a"])(e,"periodoInicio","desc"),i=0;for(var p=0;p<e.length;p++)if(o=i+1,i=1+2*(parseInt(t,10)-parseInt(e[p].periodoInicio.slice(0,4),10))+(1-parseInt(e[p].periodoInicio.slice(5,6),10))/2,this.grades1Semestre.EC.push({id:e[p].id,inicio:o,fim:i}),i>9)break;i=0;for(var f=0;f<e.length;f++)if(o=i+1,i=1+2*(parseInt(t,10)-parseInt(e[f].periodoInicio.slice(0,4),10))+(3-parseInt(e[f].periodoInicio.slice(5,6),10))/2,this.grades2Semestre.EC.push({id:e[f].id,inicio:o,fim:i}),i>9)break},methods:{openModalEditTurma:function(e){this.turmaClicked=e,this.$refs.modalEditTurma.open()},createValidacao:function(e){var o=Object(u["a"])(e);return o.docente1Apelido=this.findDocenteApelidoById(e.Docente1),o.docente2Apelido=this.findDocenteApelidoById(e.Docente2),o.pedidosTotais=this.totalPedidos(e.id),o.conflitos=[],o},checkAllValidations:function(e){var o;o=this.checkTurno(e.turno1),o&&e.conflitos.push(o),o=this.checkTurnoEAD(e.disciplina.ead,e.turno1),o&&e.conflitos.push(o),o=this.checkHorarios(e.disciplina.ead,e.disciplina.creditoTotal,e.Horario1,e.Horario2),o&&e.conflitos.push(o),o=this.checkDocentes(e.docente1Apelido,e.docente2Apelido),o&&e.conflitos.push(o),o=this.checkSalasLab(e.disciplina.laboratorio,e.Sala1,e.Sala2),o&&e.conflitos.push(o),o=this.checkVagaSala(e.Sala1,e.pedidosTotais),o&&e.conflitos.push(o),e.Sala1!=e.Sala2&&(o=this.checkVagaSala(e.Sala2,e.pedidosTotais),o&&e.conflitos.push(o)),o=this.checkPedidos(e.pedidosTotais),o&&e.conflitos.push(o),o=this.checkSalasInEAD(e.disciplina.ead,e.Sala1,e.Sala2),o&&e.conflitos.push(o),o=this.checkPeriodoCursos(e),o&&e.conflitos.push(o),o=null},checkTurno:function(e){return null===e||void 0===e||""===e?this.allConflitos[0]:null},checkTurnoEAD:function(e,o){return(1==e&&"EAD"!==o||1!=e&&"EAD"==o)&&this.allConflitos[1]},checkHorarios:function(e,o,i,t){return 1!=e&&(o<=2?null==i&&null==t&&this.allConflitos[2]:(null==i||null==t)&&this.allConflitos[2])},checkDocentes:function(e,o){return null===e&&null==o&&this.allConflitos[3]},checkSalasLab:function(e,o,i){return 0!=e&&(1==e?!this.isLab(o)&&!this.isLab(i)&&this.allConflitos[4]:2==e?!this.isLab(o)&&!this.isLab(i)&&this.allConflitos[5]:void 0)},checkVagaSala:function(e,o){var i;if(null!=e&&(i=Object(p["a"])(this.AllSalas,(function(o){return e==o.id}))),void 0!=i&&i.lotacao_maxima<o)return{type:7,msg:"Limite da sala ".concat(i.nome," execedido. Vagas: ").concat(o," - Lotação: ").concat(i.lotacao_maxima," ")}},checkPedidos:function(e){return e<=4&&this.allConflitos[7]},checkSalasInEAD:function(e,o,i){return 1==e&&((null!=o||null!=i)&&this.allConflitos[8])},checkPeriodoCursos:function(e){var o=this;if(null===e.Horario1&&null===e.Horario2)return!1;var i,t="",a=this.$store.state.pedido.Pedidos[e.id];i=1===e.periodo||2===e.periodo?this.grades1Semestre:this.grades2Semestre;var r=!1;if(Object(p["a"])(a,{Curso:4}).vagasPeriodizadas>0)for(var s=0;s<i.CCD.length;s++){var n=Object(p["a"])(this.$store.state.disciplinaGrade.DisciplinaGrades,{Grade:i.CCD[s].id,Disciplina:e.Disciplina});void 0!==n&&n.periodo>=i.CCD[s].inicio&&n.periodo<=i.CCD[s].fim&&function(){for(var a=Object(l["a"])(o.$store.state.disciplinaGrade.DisciplinaGrades,{Grade:i.CCD[s].id,periodo:n.periodo}),c=function(i){if(a[i].Disciplina===e.Disciplina)return"continue";for(var s=Object(p["a"])(o.$store.state.disciplina.Disciplinas,{id:a[i].Disciplina}),c=13==s.Perfil||15==s.Perfil,d=Object(l["a"])(c?o.$store.state.turmaExterna.Turmas:o.$store.state.turma.Turmas,(function(t){var r=Object(p["a"])(c?o.$store.state.pedidoExterno.Pedidos[t.id]:o.$store.state.pedido.Pedidos[t.id],{Curso:4});return t.periodo==e.periodo&&t.Disciplina===a[i].Disciplina&&r.vagasPeriodizadas>0})),u=0;u<d.length;u++)(null===e.Horario1||e.Horario1!==d[u].Horario1&&e.Horario1!==d[u].Horario2)&&(null===e.Horario2||e.Horario2!==d[u].Horario1&&e.Horario2!==d[u].Horario2)||(r=!0,t+="\nConflito de Horário com a turma ".concat(s.codigo).concat(d[u].letra," no ").concat(n.periodo,"º período da grade de Ciência da Computação - Diurno"))},d=0;d<a.length;d++)c(d)}()}if(Object(p["a"])(a,{Curso:1}).vagasPeriodizadas>0)for(var c=0;c<i.CCN.length;c++){var d=Object(p["a"])(this.$store.state.disciplinaGrade.DisciplinaGrades,{Grade:i.CCN[c].id,Disciplina:e.Disciplina});void 0!==d&&d.periodo>=i.CCN[c].inicio&&d.periodo<=i.CCN[c].fim&&function(){for(var a=Object(l["a"])(o.$store.state.disciplinaGrade.DisciplinaGrades,{Grade:i.CCN[c].id,periodo:d.periodo}),s=function(i){if(a[i].Disciplina===e.Disciplina)return"continue";for(var s=Object(p["a"])(o.$store.state.disciplina.Disciplinas,{id:a[i].Disciplina}),n=13==s.Perfil||15==s.Perfil,c=Object(l["a"])(n?o.$store.state.turmaExterna.Turmas:o.$store.state.turma.Turmas,(function(t){var r=Object(p["a"])(n?o.$store.state.pedidoExterno.Pedidos[t.id]:o.$store.state.pedido.Pedidos[t.id],{Curso:1});return t.periodo==e.periodo&&t.Disciplina===a[i].Disciplina&&r.vagasPeriodizadas>0})),u=0;u<c.length;u++)(null===e.Horario1||e.Horario1!==c[u].Horario1&&e.Horario1!==c[u].Horario2)&&(null===e.Horario2||e.Horario2!==c[u].Horario1&&e.Horario2!==c[u].Horario2)||(r=!0,t+="\nConflito de Horário com a turma ".concat(s.codigo).concat(c[u].letra," no ").concat(d.periodo,"º período da grade de Ciência da Computação - Noturno"))},n=0;n<a.length;n++)s(n)}()}if(Object(p["a"])(a,{Curso:3}).vagasPeriodizadas>0)for(var u=0;u<i.SI.length;u++){var f=Object(p["a"])(this.$store.state.disciplinaGrade.DisciplinaGrades,{Grade:i.SI[u].id,Disciplina:e.Disciplina});void 0!==f&&f.periodo>=i.SI[u].inicio&&f.periodo<=i.SI[u].fim&&function(){for(var a=Object(l["a"])(o.$store.state.disciplinaGrade.DisciplinaGrades,{Grade:i.SI[u].id,periodo:f.periodo}),s=function(i){if(a[i].Disciplina===e.Disciplina)return"continue";for(var s=Object(p["a"])(o.$store.state.disciplina.Disciplinas,{id:a[i].Disciplina}),n=13==s.Perfil||15==s.Perfil,c=Object(l["a"])(n?o.$store.state.turmaExterna.Turmas:o.$store.state.turma.Turmas,(function(t){var r=Object(p["a"])(n?o.$store.state.pedidoExterno.Pedidos[t.id]:o.$store.state.pedido.Pedidos[t.id],{Curso:3});return t.periodo==e.periodo&&t.Disciplina===a[i].Disciplina&&r.vagasPeriodizadas>0})),d=0;d<c.length;d++)(null===e.Horario1||e.Horario1!==c[d].Horario1&&e.Horario1!==c[d].Horario2)&&(null===e.Horario2||e.Horario2!==c[d].Horario1&&e.Horario2!==c[d].Horario2)||(r=!0,t+="\nConflito de Horário com a turma ".concat(s.codigo).concat(c[d].letra," no ").concat(f.periodo,"º período da grade de Sistemas de Informação"))},n=0;n<a.length;n++)s(n)}()}if(Object(p["a"])(a,{Curso:2}).vagasPeriodizadas>0)for(var m=0;m<i.EC.length;m++){var h=Object(p["a"])(this.$store.state.disciplinaGrade.DisciplinaGrades,{Grade:i.EC[m].id,Disciplina:e.Disciplina});void 0!==h&&h.periodo>=i.EC[m].inicio&&h.periodo<=i.EC[m].fim&&function(){for(var a=Object(l["a"])(o.$store.state.disciplinaGrade.DisciplinaGrades,{Grade:i.EC[m].id,periodo:h.periodo}),s=function(i){if(a[i].Disciplina===e.Disciplina)return"continue";for(var s=Object(p["a"])(o.$store.state.disciplina.Disciplinas,{id:a[i].Disciplina}),n=13==s.Perfil||15==s.Perfil,c=Object(l["a"])(n?o.$store.state.turmaExterna.Turmas:o.$store.state.turma.Turmas,(function(t){var r=Object(p["a"])(n?o.$store.state.pedidoExterno.Pedidos[t.id]:o.$store.state.pedido.Pedidos[t.id],{Curso:2});return t.periodo==e.periodo&&t.Disciplina===a[i].Disciplina&&r.vagasPeriodizadas>0})),d=0;d<c.length;d++)(null===e.Horario1||e.Horario1!==c[d].Horario1&&e.Horario1!==c[d].Horario2)&&(null===e.Horario2||e.Horario2!==c[d].Horario1&&e.Horario2!==c[d].Horario2)||(r=!0,t+="\nConflito de Horário com a turma ".concat(s.codigo).concat(c[d].letra," no ").concat(h.periodo,"º período da grade de Engenharia Computacional"))},n=0;n<a.length;n++)s(n)}()}return!!r&&{type:10,msg:t}},creditosGraduacao:function(e){for(var o=Object(l["a"])(this.$store.state.turma.Turmas,(function(o){return o.Docente1===e.id||o.Docente2===e.id})),i=0,t=0;t<o.length;t++){var a=Object(p["a"])(this.$store.state.disciplina.Disciplinas,{id:o[t].Disciplina}),r=a.cargaTeorica+a.cargaPratica;null!=o[t].Docente1&&null!=o[t].Docente2&&o[t].Docente1!==o[t].Docente2&&(r/=2),i+=r}return i},creditosPos:function(e){for(var o=Object(l["a"])(this.$store.state.cargaPos.Cargas,(function(o){return o.Docente===e.id})),i=0,t=0;t<o.length;t++)i+=o[t].creditos;return i},filterByPeriodo:function(e){return Object(f["a"])(this.filtroPeriodos.ativados,["id",e])},filterByConflitos:function(e){var o=this,i=Object(l["a"])(e,(function(e){return Object(f["a"])(o.filtroConflitos.ativados,(function(o){return o===e.type}))}));return i},findDocenteApelidoById:function(e){var o=Object(p["a"])(this.DocentesAtivos,(function(o){return o.id==e}));return void 0!=o?o.apelido:null},totalPedidos:function(e){var o=this.$store.state.pedido.Pedidos[e];if(!o.length)return 0;for(var i=0,t=0;t<o.length;t++)i+=parseInt(o[t].vagasPeriodizadas,10),i+=parseInt(o[t].vagasNaoPeriodizadas,10);return i},isCritical:function(e){return 1==e||2==e||3==e||4==e||5.1==e},isLab:function(e){var o=Object(p["a"])(this.AllSalas,(function(o){return e==o.id&&o.laboratorio}));return void 0!==o},isEmpty:function(e){return null===e||void 0===e||""===e}},computed:C(C({},Object(n["c"])(["AllSalas","DocentesAtivos","AllTurmas"])),{},{TurmasValidacoesOrdered:function(){return Object(d["a"])(this.TurmasValidacoesFiltred,this.ordenacaoTurmasMain.order,this.ordenacaoTurmasMain.type)},TurmasValidacoesFiltred:function(){var e=this,o=[];return this.TurmasValidacoes.forEach((function(i){var t=e.filterByConflitos(i.conflitos),a=e.filterByPeriodo(i.periodo);t.length&&a&&o.push(C(C({},i),{},{conflitos:t}))})),o},TurmasValidacoes:function(){var e=this,o=[];return this.AllTurmas.forEach((function(i){var t=e.createValidacao(i);e.checkAllValidations(t),t.conflitos.length&&o.push(t)})),o},DocentesValidacoesOrdered:function(){return Object(d["a"])(this.DocentesValidacoes,this.ordenacaoDocentesMain.order,this.ordenacaoDocentesMain.type)},DocentesValidacoes:function(){var e=this,o=[];return this.DocentesAtivos.forEach((function(i){var t={nome:i.nome,id:i.id,conflitos:[]},a=e.creditosGraduacao(i),r=e.creditosPos(i);a<8&&t.conflitos.push("Apenas ".concat(a," créditos na graduação")),a+r<16&&t.conflitos.push("Apenas ".concat(a+r," créditos, ").concat(a,"  na graduação e ").concat(r," na pós")),t.conflitos.length&&o.push(t)})),o},ConflitosOptionsOrdered:function(){return Object(d["a"])(D,"msg")}})},O=y,k=(i("5c48"),i("2877")),P=Object(k["a"])(O,t,a,!1,null,"5aa71d40",null);o["default"]=P.exports}}]);
//# sourceMappingURL=chunk-67dea6e6.94451bae.js.map