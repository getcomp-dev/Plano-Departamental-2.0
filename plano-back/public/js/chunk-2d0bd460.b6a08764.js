(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0bd460"],{"2afa":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"main-component row"},[t("portal",{attrs:{to:"page-header"}},[t("BaseButton",{attrs:{template:"ajuda"},on:{click:function(t){return e.$refs.modalAjuda.toggle()}}})],1),t("div",{staticClass:"page-content"},[t("div",{staticClass:"div-table"},[t("BaseTable",{scopedSlots:e._u([{key:"thead",fn:function(){return[t("v-th-ordination",{attrs:{currentOrder:e.ordenacaoDocentesMain,orderToCheck:"nome",width:"240",align:"start",title:"Nome do Docente"}},[e._v("\n            Nome\n          ")]),t("v-th-ordination",{attrs:{currentOrder:e.ordenacaoDocentesMain,orderToCheck:"apelido",width:"120",align:"start",title:"Apelido do Docente"}},[e._v("\n            Apelido\n          ")]),t("v-th-ordination",{attrs:{currentOrder:e.ordenacaoDocentesMain,orderToCheck:"ativo",orderType:"desc",width:"65"}},[e._v("\n            Ativo\n          ")])]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.DocentesOrdered,(function(n){return t("tr",{key:n.id,class:[{"bg-selected":e.docenteSelecionadoId==n.id},"clickable"],on:{click:function(t){return e.handleClickInDocente(n)}}},[t("v-td",{attrs:{width:"240",align:"start"}},[e._v(e._s(n.nome))]),t("v-td",{attrs:{width:"120",align:"start"}},[e._v(e._s(n.apelido))]),t("v-td",{attrs:{width:"65"}},[e._v(e._s(e.booleanToText(n.ativo)))])],1)})),e.DocentesOrdered.length?e._e():t("tr",[t("v-td",{attrs:{width:"425",colspan:"3"}},[t("font-awesome-icon",{staticClass:"icon-red",attrs:{icon:["fas","exclamation-triangle"]}}),t("b",[e._v("Nenhum docente encontrado")])],1)],1)]},proxy:!0}])})],1),t("Card",{attrs:{title:"Docente",width:"320",toggleFooter:e.isEditing},on:{"btn-salvar":e.handleUpdateDocente,"btn-delete":function(t){return e.$refs.modalDelete.open()},"btn-add":e.handleCreateDocente,"btn-clean":e.clearForm},scopedSlots:e._u([{key:"body",fn:function(){return[t("VInput",{attrs:{label:"Nome",validation:e.$v.docenteForm.nome},model:{value:e.docenteForm.nome,callback:function(t){e.$set(e.docenteForm,"nome",t)},expression:"docenteForm.nome"}}),t("div",{staticClass:"row"},[t("div",{staticClass:"col-8"},[t("VInput",{attrs:{label:"Apelido",validation:e.$v.docenteForm.apelido},model:{value:e.docenteForm.apelido,callback:function(t){e.$set(e.docenteForm,"apelido",t)},expression:"docenteForm.apelido"}})],1),t("div",{staticClass:"col"},[t("VCheckbox",{attrs:{label:"Ativo",inlineRow:""},model:{value:e.docenteForm.ativo,callback:function(t){e.$set(e.docenteForm,"ativo",t)},expression:"docenteForm.ativo"}})],1)]),e.isEditing?[t("div",{staticClass:"border-bottom mt-2 mb-1"}),t("small",[e._v("Perfis Associados ao docente")]),t("div",{staticClass:"row mx-0"},[t("div",{staticClass:"div-table"},[t("BaseTable",{attrs:{type:"main",styles:"max-height: 300px"},scopedSlots:e._u([{key:"thead",fn:function(){return[t("v-th",{attrs:{width:"25"}}),t("v-th",{attrs:{width:"235",align:"start"}},[e._v("Perfis")])]},proxy:!0},{key:"tbody",fn:function(){return e._l(e.AllPerfis,(function(n){return t("tr",{key:n.id+n.abreviacao,on:{click:function(t){return e.toggleItemInArray(n.id,e.perfisDocenteForm)}}},[t("v-td",{attrs:{width:"25",type:"content"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.perfisDocenteForm,expression:"perfisDocenteForm"}],staticStyle:{width:"11px"},attrs:{type:"checkbox"},domProps:{value:n.id,checked:Array.isArray(e.perfisDocenteForm)?e._i(e.perfisDocenteForm,n.id)>-1:e.perfisDocenteForm},on:{change:function(t){var r=e.perfisDocenteForm,o=t.target,a=!!o.checked;if(Array.isArray(r)){var i=n.id,c=e._i(r,i);o.checked?c<0&&(e.perfisDocenteForm=r.concat([i])):c>-1&&(e.perfisDocenteForm=r.slice(0,c).concat(r.slice(c+1)))}else e.perfisDocenteForm=a}}})]),t("v-td",{attrs:{width:"235",align:"start",title:n.nome}},[e._v("\n                      "+e._s(n.nome)+"\n                    ")])],1)}))},proxy:!0}],null,!1,2540978693)})],1)])]:e._e()]},proxy:!0}])})],1),t("ModalDelete",{ref:"modalDelete",attrs:{isDeleting:e.isEditing},on:{"btn-deletar":e.handleDeleteDocente}},[e.isEditing?t("li",{staticClass:"list-group-item"},[t("span",[e._v("\n        Tem certeza que deseja excluír o docente\n        "),t("b",[e._v(e._s(e.docenteForm.nome))]),e._v("\n        ?\n      ")])]):t("li",{staticClass:"list-group-item"},[e._v("Nenhum docente selecionado.")])]),t("ModalAjuda",{ref:"modalAjuda"},[t("li",{staticClass:"list-group-item"},[t("b",[e._v("Adicionar docente:")]),e._v("\n      Preencha o cartão em branco à direita e em seguida, clique em Adicionar\n      "),t("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","plus"]}}),e._v("\n      .\n    ")],1),t("li",{staticClass:"list-group-item"},[t("b",[e._v("Editar docente:")]),e._v("\n      Clique na linha da tabela do docente que deseja alterar. Em seguida, no cartão à direita,\n      altere as informações que desejar e clique em Salvar\n      "),t("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","check"]}}),e._v("\n      .\n    ")],1),t("li",{staticClass:"list-group-item"},[t("b",[e._v("Deletar docente:")]),e._v("\n      Clique na linha da tabela do docente que deseja remover. Em seguida, no cartão à direita,\n      clique em Remover\n      "),t("font-awesome-icon",{staticClass:"icon-red",attrs:{icon:["fas","trash-alt"]}}),e._v("\n      e confirme a remoção na janela que será aberta.\n    ")],1),t("li",{staticClass:"list-group-item"},[t("b",[e._v("Limpar formulário:")]),e._v("\n      No cartão à direita, clique em Cancelar\n      "),t("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","times"]}}),e._v("\n      , para limpar as informações.\n    ")],1)])],1)},o=[],a=(n("8e6e"),n("ac6a"),n("456d"),n("a481"),n("96cf"),n("1da1")),i=n("ade3"),c=n("2f62"),s=n("d4b9"),d=n("b5ae"),l=n("9165"),u=n("eaf8"),p=n("a91e"),m=n("25df"),h=n("d027");function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){Object(i["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var b={name:"DashboardDocente",mixins:[l["l"]],components:{Card:m["b"],VInput:m["h"],VCheckbox:m["g"],ModalAjuda:h["a"],ModalDelete:h["b"]},data:function(){return{docenteForm:Object(p["d"])(),perfisDocenteForm:[],docenteSelecionadoId:null,ordenacaoDocentesMain:{order:"nome",type:"asc"}}},validations:{docenteForm:{nome:{required:d["required"]},apelido:{required:d["required"],maxLength:Object(d["maxLength"])(15)}}},methods:v(v({},Object(c["b"])(["createDocente","updateDocente","deleteDocente"])),{},{booleanToText:u["a"],handleClickInDocente:function(e){var t=this;this.docenteSelecionadoId=e.id,this.docenteForm=v({},e);var n=this.DocentesPerfis.filter((function(e){return e.DocenteId===t.docenteForm.id}));this.perfisDocenteForm=n.map((function(e){return e.Perfil}))},clearForm:function(){var e=this;this.docenteSelecionadoId=null,this.docenteForm=Object(p["d"])(),this.$nextTick((function(){return e.$v.$reset()}))},handleCreateDocente:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.$v.docenteForm.$touch(),!this.$v.docenteForm.$anyError){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,this.setLoading({type:"partial",value:!0}),e.next=7,this.createDocente({data:this.docenteForm,notify:!0});case 7:this.clearForm(),e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](3),this.pushNotification({type:"error",title:"Erro ao criar Docente!",text:e.t0.response.data.fullMessage?"<br/>"+e.t0.response.data.fullMessage.replace("\n","<br/>"):""});case 13:return e.prev=13,this.setLoading({type:"partial",value:!1}),e.finish(13);case 16:case"end":return e.stop()}}),e,this,[[3,10,13,16]])})));function t(){return e.apply(this,arguments)}return t}(),handleUpdateDocente:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.$v.docenteForm.$touch(),!this.$v.docenteForm.$anyError){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,this.setLoading({type:"partial",value:!0}),e.next=7,this.updateDocente({data:{docente:this.docenteForm,docentePerfisIds:this.perfisDocenteForm},notify:!0});case 7:e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](3),this.pushNotification({type:"error",title:"Erro ao atualizar Docente",text:e.t0.message?e.t0.message:e.t0.response.data.fullMessage?"<br/>"+e.t0.response.data.fullMessage.replace("\n","<br/>"):""});case 12:return e.prev=12,this.setLoading({type:"partial",value:!1}),e.finish(12);case 15:case"end":return e.stop()}}),e,this,[[3,9,12,15]])})));function t(){return e.apply(this,arguments)}return t}(),handleDeleteDocente:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setLoading({type:"partial",value:!0}),e.next=4,this.deleteDocente({data:this.docenteForm,notify:!0});case 4:this.clearForm(),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),this.pushNotification({type:"error",title:"Erro ao excluir Docente!",text:"O docente não pode estar vinculado a nenhum perfil"});case 10:return e.prev=10,this.setLoading({type:"partial",value:!1}),e.finish(10);case 13:case"end":return e.stop()}}),e,this,[[0,7,10,13]])})));function t(){return e.apply(this,arguments)}return t}()}),computed:v(v({},Object(c["c"])(["AllDocentes","DocentesPerfis","AllPerfis"])),{},{DocentesOrdered:function(){return Object(s["a"])(this.AllDocentes,this.ordenacaoDocentesMain.order,this.ordenacaoDocentesMain.type)},isEditing:function(){return null!==this.docenteForm.id}})},g=b,D=n("2877"),y=Object(D["a"])(g,r,o,!1,null,null,null);t["default"]=y.exports}}]);
//# sourceMappingURL=chunk-2d0bd460.b6a08764.js.map