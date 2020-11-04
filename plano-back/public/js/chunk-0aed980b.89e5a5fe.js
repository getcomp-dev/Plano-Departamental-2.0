(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0aed980b"],{"16a8":function(i,o,e){},"57da":function(i,o,e){"use strict";var t=e("16a8"),a=e.n(t);a.a},"85fd":function(i,o,e){"use strict";e.r(o);var t=function(){var i=this,o=i.$createElement,e=i._self._c||o;return i.currentPlano.isEditable?e("div",{staticClass:"main-component row"},[e("PageHeader",{attrs:{title:"Validações do Plano"}},[e("BaseButton",{attrs:{template:"filtros"},on:{click:function(o){return i.toggleAsideModal("filtros")}}}),e("BaseButton",{attrs:{template:"ajuda"},on:{click:function(o){return i.toggleAsideModal("ajuda")}}})],1),e("NavTab",{attrs:{currentTab:i.tabAtivaMain,allTabs:["Turmas","Docentes"]},on:{"change-tab":function(o){i.tabAtivaMain=o}}}),e("div",{staticClass:"div-table"},[e("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Turmas"===i.tabAtivaMain,expression:"tabAtivaMain === 'Turmas'"}],attrs:{classes:"custom-table-height"},scopedSlots:i._u([{key:"thead",fn:function(){return[e("v-th-ordination",{attrs:{currentOrder:i.ordenacaoTurmasMain,orderToCheck:"periodo",width:"35",title:"Período letivo"}},[i._v("\n          P.\n        ")]),e("v-th-ordination",{attrs:{currentOrder:i.ordenacaoTurmasMain,orderToCheck:"disciplina.perfil.abreviacao",width:"75",align:"start",title:"Período letivo"}},[i._v("\n          Perfil\n        ")]),e("v-th-ordination",{attrs:{currentOrder:i.ordenacaoTurmasMain,orderToCheck:"disciplina.codigo",width:"80",align:"start"}},[i._v("\n          Código\n        ")]),e("v-th-ordination",{attrs:{currentOrder:i.ordenacaoTurmasMain,orderToCheck:"disciplina.nome",width:"300",align:"start"}},[i._v("\n          Disciplina\n        ")]),e("v-th",{attrs:{width:"35",title:"Turma"}},[i._v("T.")]),e("v-th",{attrs:{width:"130",align:"start"}},[i._v("Docentes")]),e("v-th",{attrs:{width:"50"}},[i._v("Editar")])]},proxy:!0},{key:"tbody",fn:function(){return[i._l(i.TurmasValidacoesOrdered,function(o){return[e("tr",{key:o.id+o.letra,staticClass:"bg-custom"},[e("v-td",{attrs:{width:"35"}},[i._v("\n              "+i._s(o.periodo)+"\n            ")]),e("v-td",{attrs:{width:"75",align:"start"}},[i._v("\n              "+i._s(o.disciplina.perfil.abreviacao)+"\n            ")]),e("v-td",{attrs:{width:"80",align:"start"}},[i._v("\n              "+i._s(o.disciplina.codigo)+"\n            ")]),e("v-td",{attrs:{width:"300",align:"start"}},[i._v("\n              "+i._s(o.disciplina.nome)+"\n            ")]),e("v-td",{attrs:{width:"35"}},[i._v("\n              "+i._s(o.letra)+"\n            ")]),e("v-td",{attrs:{width:"130",align:"start"}},[i._v("\n              "+i._s(o.docente1Apelido)+"\n              "),e("br"),i._v("\n              "+i._s(o.docente2Apelido)+"\n            ")]),e("v-td",{attrs:{width:"50"}},[e("button",{staticClass:"btn-table",attrs:{title:"Editar turma"},on:{click:function(e){return e.stopPropagation(),i.openModalEditTurma(o)}}},[e("font-awesome-icon",{staticClass:"icon-darkgray",attrs:{icon:["fas","edit"]}})],1)])],1),i._l(o.conflitos,function(t,a){return e("tr",{key:"conflito"+a+o.id+t.type},[e("v-td",{attrs:{width:"35"}},[i.isCritical(t.type)?e("font-awesome-icon",{staticClass:"icon-red",staticStyle:{"font-size":"13px"},attrs:{icon:["fas","exclamation-circle"],title:"Conflito critico!"}}):i._e()],1),e("v-td",{attrs:{width:"670",align:"start",colspan:"6"}},[i._v(i._s(t.msg))])],1)})]}),e("tr",{directives:[{name:"show",rawName:"v-show",value:!i.TurmasValidacoesOrdered.length,expression:"!TurmasValidacoesOrdered.length"}]},[e("v-td",{attrs:{width:"705"}},[e("b",[i._v("Nenhum conflito encontrado em turmas.")]),i._v("\n            Clique no botão de filtros\n            "),e("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","list-ul"]}}),i._v("\n            para selecioná-los.\n          ")],1)],1)]},proxy:!0}],null,!1,3208153695)}),e("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Docentes"===i.tabAtivaMain,expression:"tabAtivaMain === 'Docentes'"}],attrs:{classes:"custom-table-height"},scopedSlots:i._u([{key:"thead",fn:function(){return[e("v-th-ordination",{attrs:{currentOrder:i.ordenacaoDocentesMain,orderToCheck:"nome",width:"705",align:"start",colspan:"2"}},[i._v("\n          Nome\n        ")])]},proxy:!0},{key:"tbody",fn:function(){return[i._l(i.DocentesValidacoesOrdered,function(o){return[e("tr",{key:o.id+o.nome,staticClass:"bg-custom"},[e("v-td",{attrs:{colspan:"2",width:"705",align:"start"}},[i._v("\n              "+i._s(o.nome)+"\n            ")])],1),i._l(o.conflitos,function(t){return e("tr",{key:o.id+t},[e("v-td",{attrs:{width:"35"}},[e("font-awesome-icon",{staticClass:"icon-red",staticStyle:{"font-size":"13px"},attrs:{icon:["fas","exclamation-circle"],title:"Conflito critico!"}})],1),e("v-td",{attrs:{width:"670",align:"start"}},[i._v(i._s(t))])],1)})]}),e("tr",{directives:[{name:"show",rawName:"v-show",value:!i.DocentesValidacoesOrdered.length,expression:"!DocentesValidacoesOrdered.length"}]},[e("v-td",{attrs:{width:"705"}},[e("b",[i._v("Nenhum conflito encontrado em docentes.")])])],1)]},proxy:!0}],null,!1,2621139488)})],1),e("ModalFiltros",{ref:"modalFiltros",attrs:{callbacks:i.modalFiltrosCallbacks,tabsOptions:i.modalFiltrosTabs}},[e("div",{staticClass:"div-table"},[e("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Conflitos"===i.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Conflitos'"}],attrs:{type:"modal"},scopedSlots:i._u([{key:"thead",fn:function(){return[e("v-th",{attrs:{width:"25"}}),e("v-th",{attrs:{width:"425",align:"start"}},[i._v("Conflito")])]},proxy:!0},{key:"tbody",fn:function(){return i._l(i.ConflitosOptionsOrdered,function(o){return e("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:o.type+o.msg,on:{click:function(e){return i.toggleItemInArray(o.type,i.filtroConflitos.selecionados)}}},[e("v-td",{attrs:{width:"25",type:"content"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:i.filtroConflitos.selecionados,expression:"filtroConflitos.selecionados"}],attrs:{type:"checkbox"},domProps:{value:o.type,checked:Array.isArray(i.filtroConflitos.selecionados)?i._i(i.filtroConflitos.selecionados,o.type)>-1:i.filtroConflitos.selecionados},on:{change:function(e){var t=i.filtroConflitos.selecionados,a=e.target,r=!!a.checked;if(Array.isArray(t)){var s=o.type,n=i._i(t,s);a.checked?n<0&&i.$set(i.filtroConflitos,"selecionados",t.concat([s])):n>-1&&i.$set(i.filtroConflitos,"selecionados",t.slice(0,n).concat(t.slice(n+1)))}else i.$set(i.filtroConflitos,"selecionados",r)}}})]),e("v-td",{attrs:{width:"425",align:"start"}},[i._v(i._s(o.msg))])],1)})},proxy:!0}],null,!1,4175314968)}),e("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Períodos"===i.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Períodos'"}],attrs:{type:"modal"},scopedSlots:i._u([{key:"thead",fn:function(){return[e("v-th",{attrs:{width:"25"}}),e("v-th",{attrs:{width:"425",align:"start"}},[i._v("Periodos Letivo")])]},proxy:!0},{key:"tbody",fn:function(){return i._l(i.PeriodosOptions,function(o){return e("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:o.id+o.nome,on:{click:function(e){return i.selecionaPeriodo(o,i.filtroPeriodos.selecionados)}}},[e("v-td",{attrs:{width:"25",type:"content"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:i.filtroPeriodos.selecionados,expression:"filtroPeriodos.selecionados"}],attrs:{type:"checkbox"},domProps:{value:o,checked:Array.isArray(i.filtroPeriodos.selecionados)?i._i(i.filtroPeriodos.selecionados,o)>-1:i.filtroPeriodos.selecionados},on:{click:function(e){return e.stopPropagation(),i.selecionaPeriodo(o)},change:function(e){var t=i.filtroPeriodos.selecionados,a=e.target,r=!!a.checked;if(Array.isArray(t)){var s=o,n=i._i(t,s);a.checked?n<0&&i.$set(i.filtroPeriodos,"selecionados",t.concat([s])):n>-1&&i.$set(i.filtroPeriodos,"selecionados",t.slice(0,n).concat(t.slice(n+1)))}else i.$set(i.filtroPeriodos,"selecionados",r)}}})]),e("v-td",{attrs:{width:"425",align:"start"}},[i._v(i._s(o.nome))])],1)})},proxy:!0}],null,!1,2438418835)}),e("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Semestres"===i.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Semestres'"}],attrs:{type:"modal"},scopedSlots:i._u([{key:"thead",fn:function(){return[e("v-th",{attrs:{width:"25"}}),e("v-th",{attrs:{width:"425",align:"start"}},[i._v("Semestre Letivo")])]},proxy:!0},{key:"tbody",fn:function(){return i._l(i.SemestresOptions,function(o){return e("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:o.id+o.nome,on:{click:function(e){return i.selecionaSemestre(o)}}},[e("v-td",{attrs:{width:"25",type:"content"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:i.filtroSemestres.selecionados,expression:"filtroSemestres.selecionados"}],attrs:{type:"checkbox"},domProps:{value:o,indeterminate:o.halfChecked,checked:Array.isArray(i.filtroSemestres.selecionados)?i._i(i.filtroSemestres.selecionados,o)>-1:i.filtroSemestres.selecionados},on:{click:function(e){return e.stopPropagation(),i.selecionaSemestre(o)},change:function(e){var t=i.filtroSemestres.selecionados,a=e.target,r=!!a.checked;if(Array.isArray(t)){var s=o,n=i._i(t,s);a.checked?n<0&&i.$set(i.filtroSemestres,"selecionados",t.concat([s])):n>-1&&i.$set(i.filtroSemestres,"selecionados",t.slice(0,n).concat(t.slice(n+1)))}else i.$set(i.filtroSemestres,"selecionados",r)}}})]),e("v-td",{attrs:{width:"425",align:"start"}},[i._v(i._s(o.nome))])],1)})},proxy:!0}],null,!1,1577988721)})],1)]),e("ModalEditTurma",{ref:"modalEditTurma",attrs:{turma:i.turmaClicked,hasEditDisciplina:!1}}),e("ModalAjuda",{ref:"modalAjuda"},[e("li",{staticClass:"list-group-item"},[e("b",[i._v("Visualizar conflitos:")]),i._v("\n      Clique no ícone de filtros\n      "),e("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","list-ul"]}}),i._v("\n      no cabeçalho da página e, na janela que se abrirá, utilize as abas para navegar\n      entre os tipos de filtro disponíveis. Marque quais informações deseja visualizar,\n      e para finalizar clique no botão OK.\n    ")],1),e("li",{staticClass:"list-group-item"},[e("b",[i._v("Editar turma:")]),i._v("\n      Clique no ícone\n      "),e("font-awesome-icon",{staticClass:"icon-darkgray",attrs:{icon:["fas","edit"]}}),i._v('\n      presente na couna "Editar". Uma janela de edição irá se abrir. As alterações\n      realizadas nos campos da metade superior da janela somente serão enviadas ao\n      clicar no botão "Salvar". Já para o quantitativo de vagas na parte inferior, as\n      alterações serão salvas automaticamente.\n    ')],1),e("li",{staticClass:"list-group-item"},[e("b",[i._v("Conflitos críticos:")]),i._v("\n      Note que alguns conflitos possuem o ícone\n      "),e("font-awesome-icon",{staticClass:"icon-red",attrs:{icon:["fas","exclamation-circle"]}}),i._v("\n      . Isso significa que ele é crítico, devendo ser priorizado na correção.\n    ")],1)])],1):i._e()},a=[],r=(e("ac6a"),e("f3e2"),e("cebc")),s=(e("759f"),e("7514"),e("e814")),n=e.n(s),d=(e("d25f"),e("6d67"),e("75fc")),l=e("2f62"),c=e("eaf8"),u=e("9165"),f=e("d027"),p=e("25df"),h=[{type:1,msg:"Nenhum turno alocado"},{type:2,msg:"Disciplina da EAD deve ter turno EAD associado."},{type:3,msg:"Horários incompletos ou inválidos"},{type:4,msg:"Nenhum docente alocado"},{type:5,msg:"Disciplina prática deve ter laboratorio alocado"},{type:6,msg:"Disciplina desejável laborátorio, porêm não possui laboratorio alocado"},{type:7,msg:"Limite de lotação da sala ultrapassado"},{type:8,msg:"Apenas 4 ou menos vagas foram alocadas"},{type:9,msg:"Turma EAD não deve ter sala alocada"},{type:10,msg:"Conflito de horarios na grade"},{type:11,msg:"Disciplina de curso presencial não pode ter turno EAD"}],m={name:"Validacoes",mixins:[u["m"],u["l"],u["b"],u["k"]],components:{ModalAjuda:f["a"],ModalFiltros:f["e"],ModalEditTurma:f["d"],NavTab:p["f"]},data:function(){var i=this;return{tabAtivaMain:"Turmas",asideModalsRefs:["modalFiltros","modalAjuda"],turmaClicked:Object(c["b"])(),allConflitos:this.$_.clone(h),grades1Semestre:{CCD:[],CCN:[],EC:[],SI:[]},grades2Semestre:{CCD:[],CCN:[],EC:[],SI:[]},ordenacaoTurmasMain:{order:"periodo",type:"asc"},ordenacaoDocentesMain:{order:"nome",type:"asc"},filtroConflitos:{ativados:[],selecionados:[]},filtroPeriodos:{ativados:[],selecionados:[]},filtroSemestres:{selecionados:[]},modalFiltrosTabs:{current:"Conflitos",array:["Conflitos","Períodos","Semestres"]},modalFiltrosCallbacks:{selectAll:{Conflitos:function(){i.filtroConflitos.selecionados=Object(d["a"])(i.allConflitos.map(function(i){return i.type}))},Periodos:function(){i.filtroPeriodos.selecionados=Object(d["a"])(i.PeriodosOptions),i.filtroSemestres.selecionados=Object(d["a"])(i.SemestresOptions)},Semestres:function(){i.filtroSemestres.selecionados=Object(d["a"])(i.SemestresOptions),i.filtroPeriodos.selecionados=Object(d["a"])(i.PeriodosOptions)}},selectNone:{Conflitos:function(){i.filtroConflitos.selecionados=[]},Periodos:function(){i.filtroPeriodos.selecionados=[],i.filtroSemestres.selecionados=[]},Semestres:function(){i.filtroSemestres.selecionados=[],i.filtroPeriodos.selecionados=[]}},btnOk:function(){i.filtroPeriodos.ativados=Object(d["a"])(i.filtroPeriodos.selecionados),i.filtroConflitos.ativados=Object(d["a"])(i.filtroConflitos.selecionados)}}}},beforeMount:function(){var i,o,e;this.modalFiltrosCallbacks.selectAll.Periodos();var t=this.$store.state.plano.Plano[0].ano;i=this.$_.filter(this.$store.state.grade.Grades,["Curso",4]),i=this.$_.orderBy(i,"periodoInicio","desc"),e=0;for(var a=0;a<i.length;a++)if(o=e+1,e=1+2*(n()(t,10)-n()(i[a].periodoInicio.slice(0,4),10))+(1-n()(i[a].periodoInicio.slice(5,6),10))/2,this.grades1Semestre.CCD.push({id:i[a].id,inicio:o,fim:e}),e>9)break;e=0;for(var r=0;r<i.length;r++)if(o=e+1,e=1+2*(n()(t,10)-n()(i[r].periodoInicio.slice(0,4),10))+(3-n()(i[r].periodoInicio.slice(5,6),10))/2,this.grades2Semestre.CCD.push({id:i[r].id,inicio:o,fim:e}),e>9)break;i=this.$_.filter(this.$store.state.grade.Grades,["Curso",1]),i=this.$_.orderBy(i,"periodoInicio","desc"),e=0;for(var s=0;s<i.length;s++)if(o=e+1,e=1+2*(n()(t,10)-n()(i[s].periodoInicio.slice(0,4),10))+(1-n()(i[s].periodoInicio.slice(5,6),10))/2,this.grades1Semestre.CCN.push({id:i[s].id,inicio:o,fim:e}),e>9)break;e=0;for(var d=0;d<i.length;d++)if(o=e+1,e=1+2*(n()(t,10)-n()(i[d].periodoInicio.slice(0,4),10))+(3-n()(i[d].periodoInicio.slice(5,6),10))/2,this.grades2Semestre.CCN.push({id:i[d].id,inicio:o,fim:e}),e>9)break;i=this.$_.filter(this.$store.state.grade.Grades,["Curso",3]),i=this.$_.orderBy(i,"periodoInicio","desc"),e=0;for(var l=0;l<i.length;l++)if(o=e+1,e=1+2*(n()(t,10)-n()(i[l].periodoInicio.slice(0,4),10))+(1-n()(i[l].periodoInicio.slice(5,6),10))/2,this.grades1Semestre.SI.push({id:i[l].id,inicio:o,fim:e}),e>9)break;e=0;for(var c=0;c<i.length;c++)if(o=e+1,e=1+2*(n()(t,10)-n()(i[c].periodoInicio.slice(0,4),10))+(3-n()(i[c].periodoInicio.slice(5,6),10))/2,this.grades2Semestre.SI.push({id:i[c].id,inicio:o,fim:e}),e>9)break;i=this.$_.filter(this.$store.state.grade.Grades,["Curso",2]),i=this.$_.orderBy(i,"periodoInicio","desc"),e=0;for(var u=0;u<i.length;u++)if(o=e+1,e=1+2*(n()(t,10)-n()(i[u].periodoInicio.slice(0,4),10))+(1-n()(i[u].periodoInicio.slice(5,6),10))/2,this.grades1Semestre.EC.push({id:i[u].id,inicio:o,fim:e}),e>9)break;e=0;for(var f=0;f<i.length;f++)if(o=e+1,e=1+2*(n()(t,10)-n()(i[f].periodoInicio.slice(0,4),10))+(3-n()(i[f].periodoInicio.slice(5,6),10))/2,this.grades2Semestre.EC.push({id:i[f].id,inicio:o,fim:e}),e>9)break},methods:{openModalEditTurma:function(i){this.turmaClicked=i,this.$refs.modalEditTurma.open()},createValidacao:function(i){var o=this.$_.cloneDeep(i);return o.docente1Apelido=this.findDocenteApelidoById(i.Docente1),o.docente2Apelido=this.findDocenteApelidoById(i.Docente2),o.pedidosTotais=this.totalPedidos(i.id),o.conflitos=[],o},checkAllValidations:function(i){var o;o=this.checkTurno(i.turno1),o&&i.conflitos.push(o),o=this.checkTurnoEAD(i.disciplina.ead,i.turno1),o&&i.conflitos.push(o),o=this.checkHorarios(i.disciplina.ead,i.disciplina.creditoTotal,i.Horario1,i.Horario2),o&&i.conflitos.push(o),o=this.checkDocentes(i.docente1Apelido,i.docente2Apelido),o&&i.conflitos.push(o),o=this.checkSalasLab(i.disciplina.laboratorio,i.Sala1,i.Sala2),o&&i.conflitos.push(o),o=this.checkVagaSala(i.Sala1,i.pedidosTotais),o&&i.conflitos.push(o),i.Sala1!=i.Sala2&&(o=this.checkVagaSala(i.Sala2,i.pedidosTotais),o&&i.conflitos.push(o)),o=this.checkPedidos(i.pedidosTotais),o&&i.conflitos.push(o),o=this.checkSalasInEAD(i.disciplina.ead,i.Sala1,i.Sala2),o&&i.conflitos.push(o),o=this.checkPeriodoCursos(i),o&&i.conflitos.push(o),o=null},checkTurno:function(i){return null===i||void 0===i||""===i?this.allConflitos[0]:null},checkTurnoEAD:function(i,o){return(1==i&&"EAD"!==o||1!=i&&"EAD"==o)&&this.allConflitos[1]},checkHorarios:function(i,o,e,t){return 1!=i&&(o<=2?null==e&&null==t&&this.allConflitos[2]:(null==e||null==t)&&this.allConflitos[2])},checkDocentes:function(i,o){return null===i&&null==o&&this.allConflitos[3]},checkSalasLab:function(i,o,e){return 0!=i&&(1==i?!this.isLab(o)&&!this.isLab(e)&&this.allConflitos[4]:2==i?!this.isLab(o)&&!this.isLab(e)&&this.allConflitos[5]:void 0)},checkVagaSala:function(i,o){var e;if(null!=i&&(e=this.$_.find(this.AllSalas,function(o){return i==o.id})),void 0!=e&&e.lotacao_maxima<o)return{type:7,msg:"Limite da sala ".concat(e.nome," execedido. Vagas: ").concat(o," - Lotação: ").concat(e.lotacao_maxima," ")}},checkPedidos:function(i){return i<=4&&this.allConflitos[7]},checkSalasInEAD:function(i,o,e){return 1==i&&((null!=o||null!=e)&&this.allConflitos[8])},checkPeriodoCursos:function(i){var o=this;if(null===i.Horario1&&null===i.Horario2)return!1;var e,t="",a=this.$store.state.pedido.Pedidos[i.id];e=1===i.periodo||2===i.periodo?this.grades1Semestre:this.grades2Semestre;var r=!1;if(this.$_.find(a,{Curso:4}).vagasPeriodizadas>0)for(var s=0;s<e.CCD.length;s++){var n=this.$_.find(this.$store.state.disciplinaGrade.DisciplinaGrades,{Grade:e.CCD[s].id,Disciplina:i.Disciplina});void 0!==n&&n.periodo>=e.CCD[s].inicio&&n.periodo<=e.CCD[s].fim&&function(){for(var a=o.$_.filter(o.$store.state.disciplinaGrade.DisciplinaGrades,{Grade:e.CCD[s].id,periodo:n.periodo}),d=function(e){if(a[e].Disciplina===i.Disciplina)return"continue";for(var s=o.$_.find(o.$store.state.disciplina.Disciplinas,{id:a[e].Disciplina}),d=13==s.Perfil||15==s.Perfil,l=o.$_.filter(d?o.$store.state.turmaExterna.Turmas:o.$store.state.turma.Turmas,function(t){var r=o.$_.find(d?o.$store.state.pedidoExterno.Pedidos[t.id]:o.$store.state.pedido.Pedidos[t.id],{Curso:4});return t.periodo==i.periodo&&t.Disciplina===a[e].Disciplina&&r.vagasPeriodizadas>0}),c=0;c<l.length;c++)(null===i.Horario1||i.Horario1!==l[c].Horario1&&i.Horario1!==l[c].Horario2)&&(null===i.Horario2||i.Horario2!==l[c].Horario1&&i.Horario2!==l[c].Horario2)||(r=!0,t+="\nConflito de Horário com a turma ".concat(s.codigo).concat(l[c].letra," no ").concat(n.periodo,"º período da grade de Ciência da Computação - Diurno"))},l=0;l<a.length;l++)d(l)}()}if(this.$_.find(a,{Curso:1}).vagasPeriodizadas>0)for(var d=0;d<e.CCN.length;d++){var l=this.$_.find(this.$store.state.disciplinaGrade.DisciplinaGrades,{Grade:e.CCN[d].id,Disciplina:i.Disciplina});void 0!==l&&l.periodo>=e.CCN[d].inicio&&l.periodo<=e.CCN[d].fim&&function(){for(var a=o.$_.filter(o.$store.state.disciplinaGrade.DisciplinaGrades,{Grade:e.CCN[d].id,periodo:l.periodo}),s=function(e){if(a[e].Disciplina===i.Disciplina)return"continue";for(var s=o.$_.find(o.$store.state.disciplina.Disciplinas,{id:a[e].Disciplina}),n=13==s.Perfil||15==s.Perfil,d=o.$_.filter(n?o.$store.state.turmaExterna.Turmas:o.$store.state.turma.Turmas,function(t){var r=o.$_.find(n?o.$store.state.pedidoExterno.Pedidos[t.id]:o.$store.state.pedido.Pedidos[t.id],{Curso:1});return t.periodo==i.periodo&&t.Disciplina===a[e].Disciplina&&r.vagasPeriodizadas>0}),c=0;c<d.length;c++)(null===i.Horario1||i.Horario1!==d[c].Horario1&&i.Horario1!==d[c].Horario2)&&(null===i.Horario2||i.Horario2!==d[c].Horario1&&i.Horario2!==d[c].Horario2)||(r=!0,t+="\nConflito de Horário com a turma ".concat(s.codigo).concat(d[c].letra," no ").concat(l.periodo,"º período da grade de Ciência da Computação - Noturno"))},n=0;n<a.length;n++)s(n)}()}if(this.$_.find(a,{Curso:3}).vagasPeriodizadas>0)for(var c=0;c<e.SI.length;c++){var u=this.$_.find(this.$store.state.disciplinaGrade.DisciplinaGrades,{Grade:e.SI[c].id,Disciplina:i.Disciplina});void 0!==u&&u.periodo>=e.SI[c].inicio&&u.periodo<=e.SI[c].fim&&function(){for(var a=o.$_.filter(o.$store.state.disciplinaGrade.DisciplinaGrades,{Grade:e.SI[c].id,periodo:u.periodo}),s=function(e){if(a[e].Disciplina===i.Disciplina)return"continue";for(var s=o.$_.find(o.$store.state.disciplina.Disciplinas,{id:a[e].Disciplina}),n=13==s.Perfil||15==s.Perfil,d=o.$_.filter(n?o.$store.state.turmaExterna.Turmas:o.$store.state.turma.Turmas,function(t){var r=o.$_.find(n?o.$store.state.pedidoExterno.Pedidos[t.id]:o.$store.state.pedido.Pedidos[t.id],{Curso:3});return t.periodo==i.periodo&&t.Disciplina===a[e].Disciplina&&r.vagasPeriodizadas>0}),l=0;l<d.length;l++)(null===i.Horario1||i.Horario1!==d[l].Horario1&&i.Horario1!==d[l].Horario2)&&(null===i.Horario2||i.Horario2!==d[l].Horario1&&i.Horario2!==d[l].Horario2)||(r=!0,t+="\nConflito de Horário com a turma ".concat(s.codigo).concat(d[l].letra," no ").concat(u.periodo,"º período da grade de Sistemas de Informação"))},n=0;n<a.length;n++)s(n)}()}if(this.$_.find(a,{Curso:2}).vagasPeriodizadas>0)for(var f=0;f<e.EC.length;f++){var p=this.$_.find(this.$store.state.disciplinaGrade.DisciplinaGrades,{Grade:e.EC[f].id,Disciplina:i.Disciplina});void 0!==p&&p.periodo>=e.EC[f].inicio&&p.periodo<=e.EC[f].fim&&function(){for(var a=o.$_.filter(o.$store.state.disciplinaGrade.DisciplinaGrades,{Grade:e.EC[f].id,periodo:p.periodo}),s=function(e){if(a[e].Disciplina===i.Disciplina)return"continue";for(var s=o.$_.find(o.$store.state.disciplina.Disciplinas,{id:a[e].Disciplina}),n=13==s.Perfil||15==s.Perfil,d=o.$_.filter(n?o.$store.state.turmaExterna.Turmas:o.$store.state.turma.Turmas,function(t){var r=o.$_.find(n?o.$store.state.pedidoExterno.Pedidos[t.id]:o.$store.state.pedido.Pedidos[t.id],{Curso:2});return t.periodo==i.periodo&&t.Disciplina===a[e].Disciplina&&r.vagasPeriodizadas>0}),l=0;l<d.length;l++)(null===i.Horario1||i.Horario1!==d[l].Horario1&&i.Horario1!==d[l].Horario2)&&(null===i.Horario2||i.Horario2!==d[l].Horario1&&i.Horario2!==d[l].Horario2)||(r=!0,t+="\nConflito de Horário com a turma ".concat(s.codigo).concat(d[l].letra," no ").concat(p.periodo,"º período da grade de Engenharia Computacional"))},n=0;n<a.length;n++)s(n)}()}return!!r&&{type:10,msg:t}},creditosGraduacao:function(i){for(var o=this.$_.filter(this.$store.state.turma.Turmas,function(o){return o.Docente1===i.id||o.Docente2===i.id}),e=0,t=0;t<o.length;t++){var a=this.$_.find(this.$store.state.disciplina.Disciplinas,{id:o[t].Disciplina}),r=a.cargaTeorica+a.cargaPratica;null!=o[t].Docente1&&null!=o[t].Docente2&&o[t].Docente1!==o[t].Docente2&&(r/=2),e+=r}return e},creditosPos:function(i){for(var o=this.$_.filter(this.$store.state.cargaPos.Cargas,function(o){return o.Docente===i.id}),e=0,t=0;t<o.length;t++)e+=o[t].creditos;return e},filterByPeriodo:function(i){return this.$_.some(this.filtroPeriodos.ativados,["id",i])},filterByConflitos:function(i){var o=this,e=this.$_.filter(i,function(i){return o.$_.some(o.filtroConflitos.ativados,function(o){return o===i.type})});return e},findDocenteApelidoById:function(i){var o=this.$_.find(this.DocentesAtivos,function(o){return o.id==i});return void 0!=o?o.apelido:null},totalPedidos:function(i){var o=this.$store.state.pedido.Pedidos[i];if(!o.length)return 0;for(var e=0,t=0;t<o.length;t++)e+=n()(o[t].vagasPeriodizadas,10),e+=n()(o[t].vagasNaoPeriodizadas,10);return e},isCritical:function(i){return 1==i||2==i||3==i||4==i||5.1==i},isLab:function(i){var o=this.$_.find(this.AllSalas,function(o){return i==o.id&&o.laboratorio});return void 0!==o},isEmpty:function(i){return null===i||void 0===i||""===i}},computed:Object(r["a"])({},Object(l["c"])(["AllSalas","DocentesAtivos","TurmasInDisciplinasPerfis"]),{TurmasValidacoesOrdered:function(){return this.$_.orderBy(this.TurmasValidacoesFiltred,this.ordenacaoTurmasMain.order,this.ordenacaoTurmasMain.type)},TurmasValidacoesFiltred:function(){var i=this,o=[];return this.$_.forEach(this.TurmasValidacoes,function(e){var t=i.filterByConflitos(e.conflitos),a=i.filterByPeriodo(e.periodo);t.length&&a&&o.push(Object(r["a"])({},e,{conflitos:t}))}),o},TurmasValidacoes:function(){var i=this,o=[];return this.TurmasInDisciplinasPerfis.forEach(function(e){var t=i.createValidacao(e);i.checkAllValidations(t),t.conflitos.length&&o.push(t)}),o},DocentesValidacoesOrdered:function(){return this.$_.orderBy(this.DocentesValidacoes,this.ordenacaoDocentesMain.order,this.ordenacaoDocentesMain.type)},DocentesValidacoes:function(){var i=this,o=[];return this.DocentesAtivos.forEach(function(e){var t={nome:e.nome,id:e.id,conflitos:[]},a=i.creditosGraduacao(e),r=i.creditosPos(e);a<8&&t.conflitos.push("Apenas ".concat(a," créditos na graduação")),a+r<16&&t.conflitos.push("Apenas ".concat(a+r," créditos, ").concat(a,"  na graduação e ").concat(r," na pós")),t.conflitos.length&&o.push(t)}),o},ConflitosOptionsOrdered:function(){return this.$_.orderBy(h,"msg")}})},v=m,g=(e("57da"),e("2877")),C=Object(g["a"])(v,t,a,!1,null,"13c194c6",null);o["default"]=C.exports}}]);
//# sourceMappingURL=chunk-0aed980b.89e5a5fe.js.map