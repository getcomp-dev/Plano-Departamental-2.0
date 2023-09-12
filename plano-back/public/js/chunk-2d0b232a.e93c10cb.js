(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b232a"],{"22a5":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"main-component"},[t("portal",{attrs:{to:"page-header"}},[t("BaseButton",{attrs:{template:"ajuda"},on:{click:function(t){return e.$refs.modalAjuda.toggle()}}})],1),t("div",{staticClass:"page-content"},[t("div",{staticClass:"div-table"},[t("BaseTable",{scopedSlots:e._u([{key:"thead",fn:function(){return[t("v-th-ordination",{attrs:{currentOrder:e.ordenacaoUsuarios,orderToCheck:"nome",width:"150",align:"start",title:"Nome do Usuário"}},[e._v("\n            Nome\n          ")]),t("v-th-ordination",{attrs:{currentOrder:e.ordenacaoUsuarios,orderToCheck:"login",width:"120",align:"start"}},[e._v("\n            Login\n          ")]),t("v-th-ordination",{attrs:{currentOrder:e.ordenacaoUsuarios,orderToCheck:"admin",orderType:"desc",width:"90",align:"start"}},[e._v("\n            Tipo\n          ")])]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.UsuariosOrdered,(function(a){return t("tr",{key:a.id,class:{"bg-selected":a.id===e.usuarioSelectedId},on:{click:function(t){return e.handleClickInUsuario(a)}}},[t("v-td",{staticClass:"table-data",attrs:{width:"150",align:"start"}},[e._v("\n              "+e._s(a.nome.toLowerCase())+"\n            ")]),t("v-td",{staticClass:"table-data",attrs:{width:"120",align:"start"}},[e._v("\n              "+e._s(a.login.toLowerCase())+"\n            ")]),t("v-td",{staticClass:"table-data",attrs:{width:"90",align:"start"}},[e._v("\n              "+e._s(e.adminText(a.admin))+"\n            ")])],1)})),e.UsuariosOrdered.length?e._e():t("tr",[t("v-td",{staticClass:"table-data",attrs:{width:"360",colspan:"3"}},[t("b",[e._v("Nenhum usuário encontrado")])])],1)]},proxy:!0}])})],1),t("Card",{attrs:{title:"Usuário",width:"300",toggleFooter:e.isEditing},on:{"btn-salvar":e.handleUpdateUsuario,"btn-delete":e.openModalDelete,"btn-add":e.handleCreateUsuario,"btn-clean":e.clearUsuarioForm},scopedSlots:e._u([{key:"body",fn:function(){return[t("VInput",{attrs:{label:"Nome",validation:e.$v.usuarioForm.nome,upperCase:!1},model:{value:e.usuarioForm.nome,callback:function(t){e.$set(e.usuarioForm,"nome",t)},expression:"usuarioForm.nome"}}),t("VInput",{attrs:{label:"Login",validation:e.$v.usuarioForm.login,upperCase:!1},model:{value:e.usuarioForm.login,callback:function(t){e.$set(e.usuarioForm,"login",t)},expression:"usuarioForm.login"}}),e.isEditing?[t("SectionSlider",{attrs:{text:"Alterar senha",isOpen:e.isEditingSenha},on:{"handel-click":e.toggleEditSenha}}),t("transition-group",{attrs:{name:"slideY",mode:"out-in"}},[e.isEditingSenha?[t("VInputPassword",{key:"editSenha",attrs:{label:"Nova senha",validation:e.$v.usuarioForm.senha},model:{value:e.usuarioForm.senha,callback:function(t){e.$set(e.usuarioForm,"senha",t)},expression:"usuarioForm.senha"}}),t("VInputPassword",{key:"editConfirmaSenha",attrs:{label:"Confirmar senha",validation:e.$v.confirmaSenha},model:{value:e.confirmaSenha,callback:function(t){e.confirmaSenha=t},expression:"confirmaSenha"}})]:e._e()],2)]:[t("VInputPassword",{attrs:{label:"Senha",validation:e.$v.usuarioForm.senha},model:{value:e.usuarioForm.senha,callback:function(t){e.$set(e.usuarioForm,"senha",t)},expression:"usuarioForm.senha"}}),t("VInputPassword",{attrs:{label:"Confirmar senha",validation:e.$v.confirmaSenha},model:{value:e.confirmaSenha,callback:function(t){e.confirmaSenha=t},expression:"confirmaSenha"}})],t("VSelect",{attrs:{label:"Tipo"},model:{value:e.usuarioForm.admin,callback:function(t){e.$set(e.usuarioForm,"admin",e._n(t))},expression:"usuarioForm.admin"}},[t("VOption",{attrs:{value:0,text:"Consulta"}}),t("VOption",{attrs:{value:1,text:"Comissão"}}),t("VOption",{attrs:{value:2,text:"Administrador"}})],1)]},proxy:!0}])})],1),t("ModalDelete",{ref:"modalDelete",attrs:{isDeleting:e.isEditing},on:{"btn-deletar":e.handleDeleteUsuario}},[t("li",{staticClass:"list-group-item"},[t("span",[e.isEditing?[e._v("\n          Tem certeza que deseja excluír o usuário\n          "),t("b",[e._v(e._s(e.usuarioForm.nome))]),e._v("\n          ?\n        ")]:[e._v("Nenhum usuário selecionado!")]],2)])]),t("ModalAjuda",{ref:"modalAjuda"},[t("li",{staticClass:"list-group-item"},[t("b",[e._v("Adicionar usuário:")]),e._v("\n      Preencha o cartão em branco à direita e em seguida, clique em Adicionar\n      "),t("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","plus"]}}),e._v("\n      .\n    ")],1),t("li",{staticClass:"list-group-item"},[t("b",[e._v("Editar usuário:")]),e._v("\n      Clique na linha da tabela do usuário que deseja alterar. Em seguida, no cartão à direita,\n      altere as informações que desejar e clique em Salvar\n      "),t("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","check"]}}),e._v("\n      .\n    ")],1),t("li",{staticClass:"list-group-item"},[t("b",[e._v("Deletar usuário:")]),e._v("\n      Clique na linha da tabela do usuário que deseja remover. Em seguida, no cartão à direita,\n      clique em Remover\n      "),t("font-awesome-icon",{staticClass:"icon-red",attrs:{icon:["fas","trash"]}}),e._v("\n      e confirme a remoção na janela que será aberta.\n    ")],1),t("li",{staticClass:"list-group-item"},[t("b",[e._v("Limpar formulário:")]),e._v("\n      No cartão à direita, clique em Cancelar\n      "),t("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","times"]}}),e._v("\n      , para limpar as informações.\n    ")],1)])],1)},i=[],n=(a("8e6e"),a("ac6a"),a("456d"),a("96cf"),a("1da1")),o=a("ade3"),s=a("d4b9"),u=a("2f62"),c=a("b5ae"),l=a("a91e"),d=a("25df"),h=a("d027");function m(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?m(Object(a),!0).forEach((function(t){Object(o["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):m(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var f={name:"GerenciarUsuarios",components:{Card:d["b"],SectionSlider:d["f"],ModalDelete:h["b"],ModalAjuda:h["a"],VInput:d["h"],VSelect:d["m"],VOption:d["l"],VInputPassword:d["j"]},data:function(){return{usuarioForm:Object(l["i"])(),confirmaSenha:"",usuarioSelectedId:null,isEditingSenha:!1,ordenacaoUsuarios:{order:"nome",type:"asc"}}},validations:{usuarioForm:{nome:{required:c["required"]},login:{required:c["required"]},senha:{requiredIf:Object(c["requiredIf"])((function(){return this.isEditingSenha||!this.isEditing}))},admin:{required:c["required"],integer:c["integer"]}},confirmaSenha:{requiredIf:Object(c["requiredIf"])((function(){return this.isEditingSenha})),sameAsPassword:function(e){return this.usuarioForm.senha===e}}},methods:p(p({},Object(u["b"])(["updateUsuario","createUsuario","deleteUsuario"])),{},{adminText:function(e){return 0===e?"Consulta":1===e?"Comissão":2===e?"Administrador":void 0},openModalDelete:function(){this.$refs.modalDelete.open()},toggleEditSenha:function(){this.isEditingSenha=!this.isEditingSenha,this.clearSenhaForm()},handleClickInUsuario:function(e){this.clearUsuarioForm(),this.usuarioSelectedId=e.id,this.usuarioForm=p({},e)},clearUsuarioForm:function(){var e=this;this.usuarioSelectedId=null,this.confirmaSenha="",this.isEditingSenha=!1,this.usuarioForm=Object(l["i"])(),this.$nextTick((function(){return e.$v.$reset()}))},clearSenhaForm:function(){var e=this;this.usuarioForm.senha="",this.confirmaSenha="",this.$nextTick((function(){return e.$v.$reset()}))},handleCreateUsuario:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.$v.usuarioForm.$touch(),this.$v.confirmaSenha.$touch(),!this.$v.usuarioForm.$anyError&&!this.$v.confirmaSenha.$anyError){e.next=4;break}return e.abrupt("return");case 4:return e.prev=4,this.setLoading({type:"partial",value:!0}),e.next=8,this.createUsuario({data:this.usuarioForm,notify:!0});case 8:this.clearUsuarioForm(),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](4),this.pushNotification({type:"error",text:e.t0.message});case 14:return e.prev=14,this.setLoading({type:"partial",value:!1}),e.finish(14);case 17:case"end":return e.stop()}}),e,this,[[4,11,14,17]])})));function t(){return e.apply(this,arguments)}return t}(),handleUpdateUsuario:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.$v.usuarioForm.$touch(),this.$v.confirmaSenha.$touch(),!this.$v.usuarioForm.$anyError&&!this.$v.confirmaSenha.$anyError){e.next=4;break}return e.abrupt("return");case 4:return e.prev=4,this.setLoading({type:"partial",value:!0}),e.next=8,this.updateUsuario({data:this.usuarioForm,notify:!0});case 8:this.clearSenhaForm(),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](4),this.pushNotification({type:"error",text:e.t0.message});case 14:return e.prev=14,this.setLoading({type:"partial",value:!1}),e.finish(14);case 17:case"end":return e.stop()}}),e,this,[[4,11,14,17]])})));function t(){return e.apply(this,arguments)}return t}(),handleDeleteUsuario:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setLoading({type:"partial",value:!0}),e.next=4,this.deleteUsuario({data:this.usuarioForm,notify:!0});case 4:this.clearUsuarioForm(),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),this.pushNotification({type:"error",text:e.t0.message});case 10:return e.prev=10,this.setLoading({type:"partial",value:!1}),e.finish(10);case 13:case"end":return e.stop()}}),e,this,[[0,7,10,13]])})));function t(){return e.apply(this,arguments)}return t}()}),computed:p(p({},Object(u["c"])(["AllUsuarios"])),{},{UsuariosOrdered:function(){var e=this.ordenacaoUsuarios,t=e.order,a=e.type;return Object(s["a"])(this.AllUsuarios,(function(e){switch(t){case"nome":case"login":return e[t].toLowerCase();default:return e[t]}}),a)},isEditing:function(){return null!=this.usuarioSelectedId}})},v=f,b=a("2877"),g=Object(b["a"])(v,r,i,!1,null,null,null);t["default"]=g.exports}}]);
//# sourceMappingURL=chunk-2d0b232a.e93c10cb.js.map