(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c9a91"],{"59a8":function(e,r,t){"use strict";t.r(r);var o=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"main-component row"},[t("portal",{attrs:{to:"page-header"}},[t("BaseButton",{attrs:{template:"ajuda"},on:{click:function(r){return e.$refs.modalAjuda.toggle()}}})],1),t("div",{staticClass:"page-content"},[t("div",{staticClass:"div-table"},[t("BaseTable",{scopedSlots:e._u([{key:"thead",fn:function(){return[t("v-th-ordination",{attrs:{currentOrder:e.ordenacaoCursos,orderToCheck:"codigo",width:"75",title:"Código do Curso"}},[e._v("\n            Código\n          ")]),t("v-th-ordination",{attrs:{currentOrder:e.ordenacaoCursos,orderToCheck:"nome",width:"300",title:"Nome do Curso"}},[e._v("\n            Nome\n          ")]),t("v-th-ordination",{attrs:{currentOrder:e.ordenacaoCursos,orderToCheck:"turno",width:"70"}},[e._v("\n            Turno\n          ")]),t("v-th",{attrs:{width:"170"}},[e._v("\n            Período\n            "),t("v-th-ordination",{attrs:{currentOrder:e.ordenacaoCursos,orderToCheck:"alunosEntrada",orderType:"desc",width:"85",paddingX:"0",title:"Entrada de alunos 1º período"}},[e._v("\n              Primeiro\n            ")]),t("v-th-ordination",{attrs:{currentOrder:e.ordenacaoCursos,orderToCheck:"alunosEntrada2",orderType:"desc",width:"85",paddingX:"0",title:"Entrada de alunos 3º período"}},[e._v("\n              Terceiro\n            ")])],1)]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.CursosOrdered,(function(r){return t("tr",{key:r.id+r.codigo,class:["clickable",{"bg-selected":e.cursoSelecionado===r.id}],on:{click:function(t){return e.handleClickInCurso(r)}}},[t("v-td",{attrs:{width:"75"}},[e._v(e._s(r.codigo))]),t("v-td",{attrs:{width:"300",align:"start",title:r.nome}},[e._v("\n              "+e._s(r.nome)+"\n            ")]),t("v-td",{attrs:{width:"70"}},[e._v(e._s(r.turno))]),t("v-td",{attrs:{width:"85"}},[e._v(e._s(r.alunosEntrada))]),t("v-td",{attrs:{width:"85"}},[e._v(e._s(r.alunosEntrada2))])],1)})),e.CursosOrdered.length?e._e():t("tr",[t("v-td",{attrs:{width:"580",colspan:"5"}},[t("font-awesome-icon",{staticClass:"icon-red",attrs:{icon:["fas","exclamation-triangle"]}}),t("b",[e._v("Nenhum curso encontrado!")])],1)],1)]},proxy:!0}])})],1),t("Card",{attrs:{title:"Curso",width:"320",toggleFooter:e.isEditing},on:{"btn-salvar":e.handleEditCurso,"btn-delete":e.openModalDelete,"btn-add":e.handleCreateCurso,"btn-clean":e.clearForm},scopedSlots:e._u([{key:"body",fn:function(){return[t("VInput",{attrs:{label:"Nome",validation:e.$v.cursoForm.nome},model:{value:e.cursoForm.nome,callback:function(r){e.$set(e.cursoForm,"nome",r)},expression:"cursoForm.nome"}}),t("div",{staticClass:"row"},[t("div",{staticClass:"col"},[t("VInput",{attrs:{label:"Código",validation:e.$v.cursoForm.codigo},model:{value:e.cursoForm.codigo,callback:function(r){e.$set(e.cursoForm,"codigo",r)},expression:"cursoForm.codigo"}})],1),t("div",{staticClass:"col"},[t("VSelect",{attrs:{label:"Turno",validation:e.$v.cursoForm.turno},model:{value:e.cursoForm.turno,callback:function(r){e.$set(e.cursoForm,"turno",r)},expression:"cursoForm.turno"}},[t("b-form-select-option",{attrs:{value:"Diurno"}},[e._v("DIURNO")]),t("b-form-select-option",{attrs:{value:"Noturno"}},[e._v("NOTURNO")]),t("b-form-select-option",{attrs:{value:"Integral"}},[e._v("INTEGRAL")])],1)],1)]),t("div",{staticClass:"row"},[t("div",{staticClass:"col"},[t("VInput",{attrs:{inputType:"number",label:"Alunos 1º Período",validation:e.$v.cursoForm.alunosEntrada,textAlign:"center"},model:{value:e.cursoForm.alunosEntrada,callback:function(r){e.$set(e.cursoForm,"alunosEntrada",e._n(r))},expression:"cursoForm.alunosEntrada"}})],1),t("div",{staticClass:"col"},[t("VInput",{attrs:{inputType:"number",label:"Alunos 2º Período",validation:e.$v.cursoForm.alunosEntrada2,textAlign:"center"},model:{value:e.cursoForm.alunosEntrada2,callback:function(r){e.$set(e.cursoForm,"alunosEntrada2",e._n(r))},expression:"cursoForm.alunosEntrada2"}})],1)])]},proxy:!0}])})],1),t("ModalDelete",{ref:"modalDelete",attrs:{isDeleting:e.isEditing},on:{"btn-deletar":e.handleDeleteCurso}},[e.isEditing?t("li",{staticClass:"list-group-item"},[t("span",{domProps:{innerHTML:e._s(e.modalDeleteText)}})]):t("li",{staticClass:"list-group-item"},[e._v("Nenhuma curso selecionado.")])]),t("ModalAjuda",{ref:"modalAjuda"},[t("li",{staticClass:"list-group-item"},[t("b",[e._v("Adicionar curso:")]),e._v("\n      Preencha o cartão em branco à direita e em seguida, clique em Adicionar\n      "),t("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","plus"]}}),e._v("\n      .\n    ")],1),t("li",{staticClass:"list-group-item"},[t("b",[e._v("Editar curso:")]),e._v("\n      Clique na linha da tabela do curso que deseja alterar. Em seguida, no cartão à direita,\n      altere as informações que desejar e clique em Salvar\n      "),t("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","check"]}}),e._v("\n      .\n    ")],1),t("li",{staticClass:"list-group-item"},[t("b",[e._v("Deletar curso:")]),e._v("\n      Clique na linha da tabela do curso que deseja remover. Em seguida, no cartão à direita,\n      clique em Remover\n      "),t("font-awesome-icon",{staticClass:"icon-red",attrs:{icon:["fas","trash-alt"]}}),e._v("\n      e confirme a remoção na janela que será aberta.\n    ")],1),t("li",{staticClass:"list-group-item"},[t("b",[e._v("Limpar formulário:")]),e._v("\n      No cartão à direita, clique em Cancelar\n      "),t("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","times"]}}),e._v("\n      , para limpar as informações.\n    ")],1)])],1)},a=[],n=(t("1c01"),t("58b2"),t("8e6e"),t("f3e2"),t("d25f"),t("ac6a"),t("456d"),t("96cf"),t("1da1")),s=(t("7514"),t("ade3")),i=t("2f62"),c=t("d4b9"),u=t("b5ae"),d=t("a91e"),l=t("d027"),m=t("25df");function h(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function p(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?h(Object(t),!0).forEach((function(r){Object(s["a"])(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):h(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var v={name:"DashboardCursos",components:{Card:m["b"],VInput:m["h"],VSelect:m["m"],ModalDelete:l["b"],ModalAjuda:l["a"]},data:function(){return{modalDeleteText:"",cursoSelecionado:"",cursoForm:Object(d["a"])(),ordenacaoCursos:{order:"codigo",type:"asc"}}},validations:{cursoForm:{nome:{required:u["required"]},codigo:{required:u["required"]},turno:{required:u["required"]},alunosEntrada:{required:u["required"],integer:u["integer"]},alunosEntrada2:{required:u["required"],integer:u["integer"]}}},methods:p(p({},Object(i["b"])(["createCurso","editCurso","deleteCurso"])),{},{handleClickInCurso:function(e){this.cursoSelecionado=e.id,this.cursoForm=p({},e)},clearForm:function(){var e=this;this.cursoSelecionado="",this.cursoForm=Object(d["a"])(),this.$nextTick((function(){return e.$v.$reset()}))},checkSeCursoTemAlgumPedido:function(e){var r=!1;for(var t in this.Pedidos){var o=this.Pedidos[t].find((function(r){return r.Curso===e&&(parseInt(r.vagasPeriodizadas,10)>0||parseInt(r.vagasNaoPeriodizadas,10)>0)}));o&&(r=!0)}return r},openModalDelete:function(){this.checkSeCursoTemAlgumPedido(this.cursoForm.id)?this.modalDeleteText="\n        O curso <b>".concat(this.cursoForm.codigo," - ").concat(this.cursoForm.nome,"</b>\n        possui vagas alocadas. Tem certeza que deseja excluí-lo?"):this.modalDeleteText="Tem certeza que deseja excluír o curso\n        <b>".concat(this.cursoForm.codigo," - ").concat(this.cursoForm.nome,"</b>?"),this.$refs.modalDelete.open()},handleCreateCurso:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.$v.cursoForm.$touch(),!this.$v.cursoForm.$anyError){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,this.setLoading({type:"partial",value:!0}),e.next=7,this.createCurso(p({},this.cursoForm));case 7:this.clearForm(),e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](3),this.pushNotification({type:"error",title:"Erro ao criar novo curso!",text:e.t0.message||""});case 13:return e.prev=13,this.setLoading({type:"partial",value:!1}),e.finish(13);case 16:case"end":return e.stop()}}),e,this,[[3,10,13,16]])})));function r(){return e.apply(this,arguments)}return r}(),handleEditCurso:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.$v.cursoForm.$touch(),!this.$v.cursoForm.$anyError){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,this.setLoading({type:"partial",value:!0}),e.next=7,this.editCurso(p({},this.cursoForm));case 7:e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](3),this.pushNotification({type:"error",title:"Erro ao editar curso!",text:e.t0.message||""});case 12:return e.prev=12,this.setLoading({type:"partial",value:!1}),e.finish(12);case 15:case"end":return e.stop()}}),e,this,[[3,9,12,15]])})));function r(){return e.apply(this,arguments)}return r}(),handleDeleteCurso:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.$v.cursoForm.$touch(),!this.$v.cursoForm.$anyError){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,this.setLoading({type:"partial",value:!0}),e.next=7,this.deleteCurso(p({},this.cursoForm));case 7:this.clearForm(),e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](3),this.pushNotification({type:"error",title:"Erro ao deletar curso!",text:e.t0.message||""});case 13:return e.prev=13,this.setLoading({type:"partial",value:!1}),e.finish(13);case 16:case"end":return e.stop()}}),e,this,[[3,10,13,16]])})));function r(){return e.apply(this,arguments)}return r}()}),computed:p(p({},Object(i["c"])(["AllCursos","Pedidos"])),{},{CursosOrdered:function(){return Object(c["a"])(this.AllCursos,this.ordenacaoCursos.order,this.ordenacaoCursos.type)},isEditing:function(){return null!==this.cursoForm.id}})},f=v,b=t("2877"),g=Object(b["a"])(f,o,a,!1,null,null,null);r["default"]=g.exports}}]);
//# sourceMappingURL=chunk-2d0c9a91.42456bbf.js.map