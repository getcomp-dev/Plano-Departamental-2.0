(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3d6ffb92","chunk-93f3c7d0","chunk-24da430e"],{"53e4":function(e,t,a){"use strict";var r=a("c450"),o=a.n(r);o.a},"6e93":function(e,t,a){},b7d2:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.currentPlano.isEditable?a("div",{staticClass:"main-component row"},[a("PageHeader",{attrs:{title:"Pós Graduação"}},[a("BaseButton",{directives:[{name:"show",rawName:"v-show",value:e.isAdding,expression:"isAdding"}],attrs:{template:"salvar"},on:{click:function(t){return e.$refs.novaCargaPosRow.handleCreateCargaPos()}}}),a("BaseButton",{directives:[{name:"show",rawName:"v-show",value:e.isAdding,expression:"isAdding"}],attrs:{template:"cancelar"},on:{click:e.toggleAddRow}}),a("BaseButton",{directives:[{name:"show",rawName:"v-show",value:!e.isAdding,expression:"!isAdding"}],attrs:{template:"adicionar"},on:{click:e.toggleAddRow}}),a("BaseButton",{directives:[{name:"show",rawName:"v-show",value:!e.isAdding,expression:"!isAdding"}],attrs:{template:"deletar",title:"Deletar selecionados"},on:{click:function(t){return e.$refs.modalDelete.open()}}}),a("BaseButton",{attrs:{template:"filtros"},on:{click:function(t){return e.toggleAsideModal("filtros")}}}),a("BaseButton",{attrs:{template:"ajuda"},on:{click:function(t){return e.toggleAsideModal("ajuda")}}})],1),a("div",{staticClass:"div-table"},[a("BaseTable",{scopedSlots:e._u([{key:"thead",fn:function(){return[a("v-th",{attrs:{width:"75"}},[e._v("Programa")]),a("v-th",{attrs:{width:"25"}}),a("v-th",{attrs:{width:"55",title:"Período, ordenação fixa"}},[a("font-awesome-icon",{attrs:{icon:["fas","thumbtack"]}}),e._v("\n          P.\n        ")],1),a("v-th-ordination",{attrs:{currentOrder:e.ordenacaoCargaPos,orderToCheck:"docenteApelido",width:"145",align:"start",text:"Docente"}}),a("v-th-ordination",{attrs:{currentOrder:e.ordenacaoCargaPos,orderToCheck:"creditos",orderType:"desc",width:"60",title:"Créditos",text:"C."}})]},proxy:!0},{key:"add-row",fn:function(){return[e.isAdding?a("NovaCargaPosRow",{ref:"novaCargaPosRow"}):e._e()]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.ProgramasInCargaPosOrdered,function(t){return[a("tr",{key:t.nome,staticClass:"bg-custom"},[a("v-td",{attrs:{width:"75"}},[e._v(e._s(t.nome))]),a("v-td",{attrs:{width:"25"}}),a("v-td",{attrs:{width:"55"}}),a("v-td",{attrs:{width:"145"}}),a("v-td",{attrs:{width:"60",title:"Total de carga"}},[e._v("\n              "+e._s(e.calculaTotalDeCreditosDaCarga(t.cargas))+"\n            ")])],1),e._l(t.cargas,function(e){return a("CargaPosRow",{key:e.id+t.nome,attrs:{carga:e}})})]}),a("tr",{directives:[{name:"show",rawName:"v-show",value:!e.ProgramasInCargaPosOrdered.length,expression:"!ProgramasInCargaPosOrdered.length"}]},[a("v-td",{attrs:{width:"360",whiteSpace:"normal"}},[a("b",[e._v("Nenhuma carga encontrada.")]),e._v("\n            Clique no botão de filtros\n            "),a("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","list-ul"]}}),e._v("\n            para selecioná-las.\n          ")],1)],1)]},proxy:!0}],null,!1,489522937)})],1),a("ModalFiltros",{ref:"modalFiltros",attrs:{callbacks:e.modalFiltrosCallbacks,tabsOptions:e.modalFiltrosTabs}},[a("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Programas"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Programas'"}],attrs:{type:"modal"},scopedSlots:e._u([{key:"thead",fn:function(){return[a("v-th",{attrs:{width:"25"}}),a("v-th",{attrs:{width:"425",align:"start"}},[e._v("Programa")])]},proxy:!0},{key:"tbody",fn:function(){return e._l(e.AllProgramasPosOrdered,function(t){return a("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:t,on:{click:function(a){return e.toggleItemInArray(t,e.filtroProgramas.selecionados)}}},[a("v-td",{attrs:{width:"25",type:"content"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.filtroProgramas.selecionados,expression:"filtroProgramas.selecionados"}],attrs:{type:"checkbox"},domProps:{value:t,checked:Array.isArray(e.filtroProgramas.selecionados)?e._i(e.filtroProgramas.selecionados,t)>-1:e.filtroProgramas.selecionados},on:{change:function(a){var r=e.filtroProgramas.selecionados,o=a.target,s=!!o.checked;if(Array.isArray(r)){var n=t,i=e._i(r,n);o.checked?i<0&&e.$set(e.filtroProgramas,"selecionados",r.concat([n])):i>-1&&e.$set(e.filtroProgramas,"selecionados",r.slice(0,i).concat(r.slice(i+1)))}else e.$set(e.filtroProgramas,"selecionados",s)}}})]),a("v-td",{attrs:{width:"425",align:"start"}},[e._v(e._s(t))])],1)})},proxy:!0}],null,!1,4030774529)}),a("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Períodos"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Períodos'"}],attrs:{type:"modal"},scopedSlots:e._u([{key:"thead",fn:function(){return[a("v-th",{attrs:{width:"25"}}),a("v-th",{attrs:{width:"425",align:"start"}},[e._v("Periodos Letivo")])]},proxy:!0},{key:"tbody",fn:function(){return e._l(e.PeriodosOptions,function(t){return a("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:t.id+t.nome,on:{click:function(a){return e.selecionaPeriodo(t,e.filtroPeriodos.selecionados)}}},[a("v-td",{attrs:{width:"25",type:"content"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.filtroPeriodos.selecionados,expression:"filtroPeriodos.selecionados"}],attrs:{type:"checkbox"},domProps:{value:t,checked:Array.isArray(e.filtroPeriodos.selecionados)?e._i(e.filtroPeriodos.selecionados,t)>-1:e.filtroPeriodos.selecionados},on:{click:function(a){return a.stopPropagation(),e.selecionaPeriodo(t)},change:function(a){var r=e.filtroPeriodos.selecionados,o=a.target,s=!!o.checked;if(Array.isArray(r)){var n=t,i=e._i(r,n);o.checked?i<0&&e.$set(e.filtroPeriodos,"selecionados",r.concat([n])):i>-1&&e.$set(e.filtroPeriodos,"selecionados",r.slice(0,i).concat(r.slice(i+1)))}else e.$set(e.filtroPeriodos,"selecionados",s)}}})]),a("v-td",{attrs:{width:"425",align:"start"}},[e._v("\n            "+e._s(t.nome.split("(")[0])+"\n          ")])],1)})},proxy:!0}],null,!1,3734009072)}),a("BaseTable",{directives:[{name:"show",rawName:"v-show",value:"Semestres"===e.modalFiltrosTabs.current,expression:"modalFiltrosTabs.current === 'Semestres'"}],attrs:{type:"modal"},scopedSlots:e._u([{key:"thead",fn:function(){return[a("v-th",{attrs:{width:"25"}}),a("v-th",{attrs:{width:"425",align:"start"}},[e._v("Semestre Letivo")])]},proxy:!0},{key:"tbody",fn:function(){return e._l(e.SemestresOptions,function(t){return a("tr",{directives:[{name:"prevent-click-selection",rawName:"v-prevent-click-selection"}],key:t.id+t.nome,on:{click:function(a){return e.selecionaSemestre(t)}}},[a("v-td",{attrs:{width:"25",type:"content"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.filtroSemestres.selecionados,expression:"filtroSemestres.selecionados"}],attrs:{type:"checkbox"},domProps:{value:t,indeterminate:t.halfChecked,checked:Array.isArray(e.filtroSemestres.selecionados)?e._i(e.filtroSemestres.selecionados,t)>-1:e.filtroSemestres.selecionados},on:{click:function(a){return a.stopPropagation(),e.selecionaSemestre(t)},change:function(a){var r=e.filtroSemestres.selecionados,o=a.target,s=!!o.checked;if(Array.isArray(r)){var n=t,i=e._i(r,n);o.checked?i<0&&e.$set(e.filtroSemestres,"selecionados",r.concat([n])):i>-1&&e.$set(e.filtroSemestres,"selecionados",r.slice(0,i).concat(r.slice(i+1)))}else e.$set(e.filtroSemestres,"selecionados",s)}}})]),a("v-td",{attrs:{width:"425",align:"start"}},[e._v("\n            "+e._s(t.nome)+"\n          ")])],1)})},proxy:!0}],null,!1,3969142769)})],1),a("ModalDelete",{ref:"modalDelete",attrs:{isDeleting:!!e.CargasPosToDelete.length,hasClearDelete:!0},on:{"btn-deletar":e.handleDeleteCargasPos,"btn-clear":e.clearCargasPosToDelete}},[e.CargasPosToDelete.length?e._e():a("li",{staticClass:"list-group-item"},[e._v("\n      Nenhuma carga selecionada.\n    ")]),e._l(e.CargasPosToDelete,function(t){return a("li",{key:"deletarTurma"+t.id,staticClass:"list-group-item"},[a("span",[a("b",[e._v("Período:")]),e._v("\n        "+e._s(t.trimestre)+" -\n        "),a("b",[e._v("Programa:")]),e._v("\n        "+e._s(t.programa)+"\n      ")]),a("span",[a("b",[e._v("Docente:")]),e._v("\n        "+e._s(t.docenteApelido)+"\n      ")])])})],2),a("ModalAjuda",{ref:"modalAjuda"},[a("li",{staticClass:"list-group-item"},[a("b",[e._v("Visualizar cargas:")]),e._v("\n      Clique no ícone de filtros\n      "),a("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","list-ul"]}}),e._v("\n      no cabeçalho da página e, na janela que se abrirá, utilize as abas para navegar\n      entre os tipos de filtro disponíveis. Marque quais informações deseja visualizar,\n      e para finalizar clique no botão OK.\n    ")],1),a("li",{staticClass:"list-group-item"},[a("b",[e._v("Adicionar carga:")]),e._v("\n      Clique no ícone de adicionar\n      "),a("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","plus"]}}),e._v("\n      no cabeçalho da página. Em seguida, preencha a nova linha que irá aparecer no\n      início da tabela. Note que todos os campos são obrigatórios. Após preenchê-los,\n      clique no ícone de salvar\n      "),a("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","check"]}}),e._v("\n      ou de cancelar\n      "),a("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","times"]}}),e._v("\n      .\n    ")],1),a("li",{staticClass:"list-group-item"},[a("b",[e._v("Deletar carga(s):")]),e._v("\n      Marque a(s) carga(s) que deseja deletar através da caixa de seleção na coluna mais\n      à esquerda da tabela. Em seguida, clique no ícone de deletar\n      "),a("font-awesome-icon",{staticClass:"icon-red",attrs:{icon:["fas","trash"]}}),e._v("\n      no cabeçalho da página. Confirme a exclusão clicando no botão OK na janela que se\n      abrirá.\n    ")],1),a("li",{staticClass:"list-group-item"},[a("b",[e._v("Editar carga:")]),e._v("\n      Basta fazer as alterações necessárias diretamente nos campos da tabela. O sistema\n      salvará as modificações automaticamente.\n    ")]),a("li",{staticClass:"list-group-item"},[a("b",[e._v("Observações:")]),e._v("\n      Note que os filtros por semestre e períodos são interligados. Ao selecionar um\n      semestre, os períodos correspondentes também serão selecionados, e vice versa. O\n      primeiro semestre corresponde ao primeiro e segundo períodos, e o segundo semestre\n      corresponde ao terceiro e quarto períodos.\n    ")])])],1):e._e()},o=[],s=(a("759f"),a("96cf"),a("3b8d")),n=(a("0cd8"),a("7514"),a("6d67"),a("d25f"),a("cebc")),i=a("75fc"),c=a("2f62"),l=a("9165"),d=a("d027"),u=a("f270"),m=a("e016"),g={name:"DashboardCargaPos",mixins:[l["n"],l["m"],l["b"],l["l"]],components:{ModalDelete:d["b"],ModalFiltros:d["e"],ModalAjuda:d["a"],CargaPosRow:m["default"],NovaCargaPosRow:u["default"]},data:function(){var e=this;return{isAdding:!1,asideModalsRefs:["modalFiltros","modalAjuda"],ordenacaoCargaPos:{order:"docenteApelido",type:"asc"},filtroProgramas:{ativados:[],selecionados:[]},filtroPeriodos:{ativados:[],selecionados:[]},filtroSemestres:{selecionados:[]},modalFiltrosTabs:{current:"Programas",array:["Programas","Períodos","Semestres"]},modalFiltrosCallbacks:{selectAll:{Programas:function(){e.filtroProgramas.selecionados=Object(i["a"])(e.AllProgramasPosOrdered)},Periodos:function(){e.filtroPeriodos.selecionados=Object(i["a"])(e.PeriodosOptions),e.filtroSemestres.selecionados=Object(i["a"])(e.SemestresOptions)},Semestres:function(){e.filtroSemestres.selecionados=Object(i["a"])(e.SemestresOptions),e.filtroPeriodos.selecionados=Object(i["a"])(e.PeriodosOptions)}},selectNone:{Programas:function(){e.filtroProgramas.selecionados=[]},Periodos:function(){e.filtroPeriodos.selecionados=[],e.filtroSemestres.selecionados=[]},Semestres:function(){e.filtroSemestres.selecionados=[],e.filtroPeriodos.selecionados=[]}},btnOk:function(){e.filtroPeriodos.ativados=Object(i["a"])(e.filtroPeriodos.selecionados),e.filtroProgramas.ativados=Object(i["a"])(e.filtroProgramas.selecionados)}}}},beforeMount:function(){this.modalFiltrosCallbacks.selectAll.Periodos()},beforeDestroy:function(){this.clearCargasPosToDelete()},methods:Object(n["a"])({},Object(c["b"])(["deleteCargasPos","clearCargasPosToDelete"]),{toggleAddRow:function(){this.isAdding=!this.isAdding},cargaPosInDocente:function(e){var t=this,a=this.$_.filter(this.AllCargasPos,["programa",e]);return this.$_.map(a,function(e){var a=t.$_.find(t.DocentesAtivos,["id",e.Docente]);return Object(n["a"])({},e,{docenteApelido:a?a.apelido:""})})},calculaTotalDeCreditosDaCarga:function(e){return this.$_.reduce(e,function(e,t){return e+t.creditos},0)},handleDeleteCargasPos:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setPartialLoading(!0),e.next=4,this.deleteCargasPos();case 4:e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](0),this.pushNotification({type:"error",title:"Erro ao excluir carga(s)!"});case 9:return e.prev=9,this.setPartialLoading(!1),e.finish(9);case 12:case"end":return e.stop()}},e,this,[[0,6,9,12]])}));function t(){return e.apply(this,arguments)}return t}()}),computed:Object(n["a"])({},Object(c["c"])(["DocentesAtivos","CargasPosToDelete","AllCargasPos"]),{ProgramasInCargaPosOrdered:function(){var e=this;return this.$_.map(this.ProgramasInCargaPosFiltredByPeriodo,function(t){var a=e.$_.orderBy(t.cargas,["trimestre",e.ordenacaoCargaPos.order],["asc",e.ordenacaoCargaPos.type]);return{nome:t.nome,cargas:a}})},ProgramasInCargaPosFiltredByPeriodo:function(){var e=this;return this.$_.map(this.ProgramasInCargaPosFiltredByPrograma,function(t){var a=e.$_.filter(t.cargas,function(t){return e.$_.some(e.filtroPeriodos.ativados,["id",t.trimestre])});return Object(n["a"])({},t,{cargas:a})})},ProgramasInCargaPosFiltredByPrograma:function(){var e=this;return this.$_.filter(this.ProgramasInCargaPos,function(t){return e.$_.some(e.filtroProgramas.ativados,function(e){return e===t.nome})})},ProgramasInCargaPos:function(){var e=this;return this.$_.map(this.AllProgramasPosOrdered,function(t){return{nome:t,cargas:e.cargaPosInDocente(t)}})},AllProgramasPosOrdered:function(){return this.$_.orderBy(["PGCC","PGMC","PGEM"],String,"asc")}})},v=g,f=a("2877"),p=Object(f["a"])(v,r,o,!1,null,null,null);t["default"]=p.exports},c450:function(e,t,a){},e016:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("tr",{staticClass:"cargapos-row"},[a("v-td",{attrs:{width:"75"}}),a("v-td",{attrs:{width:"25",type:"content"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.toggleToDelete,expression:"toggleToDelete"}],attrs:{type:"checkbox"},domProps:{value:e.carga,checked:Array.isArray(e.toggleToDelete)?e._i(e.toggleToDelete,e.carga)>-1:e.toggleToDelete},on:{change:function(t){var a=e.toggleToDelete,r=t.target,o=!!r.checked;if(Array.isArray(a)){var s=e.carga,n=e._i(a,s);r.checked?n<0&&(e.toggleToDelete=a.concat([s])):n>-1&&(e.toggleToDelete=a.slice(0,n).concat(a.slice(n+1)))}else e.toggleToDelete=o}}})]),a("v-td",{attrs:{width:"55",type:"content"}},[a("select",{directives:[{name:"model",rawName:"v-model.number",value:e.cargaPosForm.trimestre,expression:"cargaPosForm.trimestre",modifiers:{number:!0}}],on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(t){var a="_value"in t?t._value:t.value;return e._n(a)});e.$set(e.cargaPosForm,"trimestre",t.target.multiple?a:a[0])},e.handleEditCargaPos]}},[a("option",{attrs:{value:"1"}},[e._v("1")]),a("option",{attrs:{value:"2"}},[e._v("2")]),a("option",{attrs:{value:"3"}},[e._v("3")]),a("option",{attrs:{value:"4"}},[e._v("4")])])]),a("v-td",{attrs:{width:"145",type:"content"}},[a("select",{directives:[{name:"model",rawName:"v-model.number",value:e.cargaPosForm.Docente,expression:"cargaPosForm.Docente",modifiers:{number:!0}}],on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(t){var a="_value"in t?t._value:t.value;return e._n(a)});e.$set(e.cargaPosForm,"Docente",t.target.multiple?a:a[0])},e.handleEditCargaPos]}},e._l(e.DocentesAtivos,function(t){return a("option",{key:t.id,domProps:{value:t.id}},[e._v(e._s(t.apelido)+"\n      ")])}),0)]),a("v-td",{attrs:{width:"60",type:"content"}},[a("input",{directives:[{name:"model",rawName:"v-model.number",value:e.cargaPosForm.creditos,expression:"cargaPosForm.creditos",modifiers:{number:!0}}],attrs:{type:"text"},domProps:{value:e.cargaPosForm.creditos},on:{keypress:e.maskOnlyNumber,change:e.handleEditCargaPos,paste:function(e){e.preventDefault()},input:function(t){t.target.composing||e.$set(e.cargaPosForm,"creditos",e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})])],1)},o=[],s=(a("96cf"),a("3b8d")),n=a("cebc"),i=a("2f62"),c=a("9165"),l={name:"CargaPosRow",mixins:[c["j"]],props:{carga:{type:Object,required:!0}},data:function(){return{cargaPosForm:null}},methods:Object(n["a"])({},Object(i["b"])(["toggleCargaToDelete","editCargaPos"]),{resetCargaPos:function(){this.cargaPosForm=this.$_.clone(this.carga)},handleEditCargaPos:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setPartialLoading(!0),e.next=4,this.editCargaPos(this.cargaPosForm);case 4:e.next=10;break;case 6:e.prev=6,e.t0=e["catch"](0),this.resetCargaPos(),this.pushNotification({type:"error",title:"Erro ao atualizar carga!",text:e.t0.message||""});case 10:return e.prev=10,this.setPartialLoading(!1),e.finish(10);case 13:case"end":return e.stop()}},e,this,[[0,6,10,13]])}));function t(){return e.apply(this,arguments)}return t}()}),computed:Object(n["a"])({},Object(i["c"])(["DocentesAtivos","CargasPosToDelete"]),{toggleToDelete:{set:function(){this.toggleCargaToDelete(this.carga)},get:function(){return this.CargasPosToDelete}}}),watch:{carga:{handler:"resetCargaPos",immediate:!0}}},d=l,u=(a("53e4"),a("2877")),m=Object(u["a"])(d,r,o,!1,null,"3b5dff76",null);t["default"]=m.exports},e6ad:function(e,t,a){"use strict";var r=a("6e93"),o=a.n(r);o.a},f270:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("tr",{staticClass:"novacarga"},[a("v-td",{attrs:{width:"75",type:"content"}},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.cargaPosForm.programa,expression:"cargaPosForm.programa"}],attrs:{type:"text"},on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.$set(e.cargaPosForm,"programa",t.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"PGCC"}},[e._v("PGCC")]),a("option",{attrs:{value:"PGEM"}},[e._v("PGEM")]),a("option",{attrs:{value:"PGMC"}},[e._v("PGMC")])])]),a("v-td",{attrs:{width:"25"}}),a("v-td",{attrs:{width:"55",type:"content"}},[a("select",{directives:[{name:"model",rawName:"v-model.number",value:e.cargaPosForm.trimestre,expression:"cargaPosForm.trimestre",modifiers:{number:!0}}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(t){var a="_value"in t?t._value:t.value;return e._n(a)});e.$set(e.cargaPosForm,"trimestre",t.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"1"}},[e._v("1")]),a("option",{attrs:{value:"2"}},[e._v("2")]),a("option",{attrs:{value:"3"}},[e._v("3")]),a("option",{attrs:{value:"4"}},[e._v("4")])])]),a("v-td",{attrs:{width:"145",type:"content"}},[a("select",{directives:[{name:"model",rawName:"v-model.number",value:e.cargaPosForm.Docente,expression:"cargaPosForm.Docente",modifiers:{number:!0}}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(t){var a="_value"in t?t._value:t.value;return e._n(a)});e.$set(e.cargaPosForm,"Docente",t.target.multiple?a:a[0])}}},[e.DocentesAtivos.length?e._e():a("option",[e._v("\n        Nenhum Docente Encontrado\n      ")]),e._l(e.DocentesAtivos,function(t){return a("option",{key:t.id,domProps:{value:t.id}},[e._v(e._s(t.apelido)+"\n      ")])})],2)]),a("v-td",{attrs:{width:"60",type:"content"}},[a("input",{directives:[{name:"model",rawName:"v-model.number",value:e.cargaPosForm.creditos,expression:"cargaPosForm.creditos",modifiers:{number:!0}}],attrs:{type:"text"},domProps:{value:e.cargaPosForm.creditos},on:{keypress:e.maskOnlyNumber,paste:function(e){e.preventDefault()},input:function(t){t.target.composing||e.$set(e.cargaPosForm,"creditos",e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})])],1)},o=[],s=(a("96cf"),a("3b8d")),n=a("cebc"),i=a("2f62"),c=a("9165"),l={id:null,trimestre:null,Docente:null,programa:null,creditos:null},d={name:"NovaCargaPosRow",mixins:[c["j"]],data:function(){return{cargaPosForm:this.$_.clone(l)}},methods:Object(n["a"])({},Object(i["b"])(["createCargaPos"]),{handleCreateCargaPos:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setPartialLoading(!0),e.next=4,this.createCargaPos(this.cargaPosForm);case 4:e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](0),this.pushNotification({type:"error",title:"Erro ao criar nova carga!",text:e.t0.message||""});case 9:return e.prev=9,this.setPartialLoading(!1),e.finish(9);case 12:case"end":return e.stop()}},e,this,[[0,6,9,12]])}));function t(){return e.apply(this,arguments)}return t}()}),computed:Object(n["a"])({},Object(i["c"])(["DocentesAtivos"]))},u=d,m=(a("e6ad"),a("2877")),g=Object(m["a"])(u,r,o,!1,null,"00d8b74a",null);t["default"]=g.exports}}]);
//# sourceMappingURL=chunk-3d6ffb92.355df94b.js.map