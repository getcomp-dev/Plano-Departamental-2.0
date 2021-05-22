(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e13c2"],{"7a24":function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"main-component row"},[r("portal",{attrs:{to:"page-header"}},[r("BaseButton",{attrs:{template:"ajuda"},on:{click:function(t){return e.$refs.modalAjuda.toggle()}}})],1),r("div",{staticClass:"page-content"},[r("div",{staticClass:"div-table"},[r("BaseTable",{attrs:{styles:"height:max-content"},scopedSlots:e._u([{key:"thead",fn:function(){return[r("v-th-ordination",{attrs:{currentOrder:e.ordenacaoPerfisMain,orderToCheck:"nome",width:"350",align:"start",title:"Nome do Perfil"}},[e._v("\n            Nome\n          ")]),r("v-th-ordination",{attrs:{currentOrder:e.ordenacaoPerfisMain,orderToCheck:"abreviacao",width:"90",align:"start",title:"Abreviação do Perfil"}},[e._v("\n            Abreviação\n          ")]),r("v-th",{attrs:{width:"65",title:"Cor do Perfil"}},[e._v("Cor")])]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.PerfisOrdered,(function(t){return r("tr",{key:t.id,class:["clickable",{"bg-selected":e.perfilSelecionadoId===t.id}],on:{click:function(r){return e.handleClickInPerfil(t)}}},[r("v-td",{attrs:{width:"350",align:"start"}},[e._v(e._s(t.nome))]),r("v-td",{attrs:{width:"90",align:"start"}},[e._v(e._s(t.abreviacao))]),r("v-td",{attrs:{width:"65",type:"content"}},[r("div",{style:{backgroundColor:t.cor,width:"50px",height:"12px",border:"1px black solid"}})])],1)})),e.PerfisOrdered.length?e._e():r("tr",[r("v-td",{attrs:{width:"505",colspan:"3"}},[r("b",[e._v("Nenhum perfil encontrado")])])],1)]},proxy:!0}])})],1),r("Card",{attrs:{title:"Perfil",width:"350",toggleFooter:e.isEditing},on:{"btn-salvar":e.handleUpdatePerfil,"btn-delete":function(t){return e.$refs.modalDelete.open()},"btn-add":e.handleCreatePerfil,"btn-clean":e.clearPerfilForm},scopedSlots:e._u([{key:"body",fn:function(){return[r("VInput",{attrs:{label:"Nome",validation:e.$v.perfilForm.nome},model:{value:e.perfilForm.nome,callback:function(t){e.$set(e.perfilForm,"nome",t)},expression:"perfilForm.nome"}}),r("div",{staticClass:"row"},[r("div",{staticClass:"col"},[r("VInput",{attrs:{label:"Abreviação",validation:e.$v.perfilForm.abreviacao},model:{value:e.perfilForm.abreviacao,callback:function(t){e.$set(e.perfilForm,"abreviacao",t)},expression:"perfilForm.abreviacao"}})],1),r("div",{staticClass:"col"},[r("VInput",{attrs:{inputType:"color",label:"Cor",validation:e.$v.perfilForm.cor},model:{value:e.perfilForm.cor,callback:function(t){e.$set(e.perfilForm,"cor",t)},expression:"perfilForm.cor"}})],1)])]},proxy:!0}])})],1),r("ModalDelete",{ref:"modalDelete",attrs:{isDeleting:e.isEditing},on:{"btn-deletar":e.handleDeletePerfil}},[e.isEditing?r("li",{staticClass:"list-group-item"},[r("span",[e._v("\n        Tem certeza que deseja excluír o perfil\n        "),r("b",[e._v(e._s(e.perfilForm.nome))]),e._v("\n        ?\n      ")])]):r("li",{staticClass:"list-group-item"},[e._v("Nenhum perfil selecionado.")])]),r("ModalAjuda",{ref:"modalAjuda"},[r("li",{staticClass:"list-group-item"},[r("b",[e._v("Adicionar perfil:")]),e._v("\n      Preencha o cartão em branco à direita e em seguida, clique em Adicionar\n      "),r("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","plus"]}}),e._v("\n      .\n    ")],1),r("li",{staticClass:"list-group-item"},[r("b",[e._v("Editar perfil:")]),e._v("\n      Clique na linha da tabela do perfil que deseja alterar. Em seguida, no cartão à direita,\n      altere as informações que desejar e clique em Salvar\n      "),r("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","check"]}}),e._v("\n      .\n    ")],1),r("li",{staticClass:"list-group-item"},[r("b",[e._v("Deletar perfil:")]),e._v("\n      Clique na linha da tabela do perfil que deseja remover. Em seguida, no cartão à direita,\n      clique em Remover\n      "),r("font-awesome-icon",{staticClass:"icon-red",attrs:{icon:["fas","trash-alt"]}}),e._v("\n      e confirme a remoção na janela que será aberta.\n    ")],1),r("li",{staticClass:"list-group-item"},[r("b",[e._v("Limpar formulário:")]),e._v("\n      No cartão à direita, clique em Cancelar\n      "),r("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","times"]}}),e._v("\n      , para limpar as informações.\n    ")],1)])],1)},a=[],n=(r("1c01"),r("58b2"),r("8e6e"),r("f3e2"),r("d25f"),r("ac6a"),r("456d"),r("a481"),r("96cf"),r("1da1")),o=r("ade3"),s=r("2f62"),l=r("d4b9"),c=r("b5ae"),u=r("20bb"),d=r("a91e"),f=r("25df"),p=r("d027");function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach((function(t){Object(o["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var v={name:"DashboardPerfis",components:{ModalAjuda:p["a"],Card:f["b"],ModalDelete:p["b"],VInput:f["h"]},data:function(){return{perfilForm:Object(d["f"])(),perfilSelecionadoId:null,ordenacaoPerfisMain:{order:"nome",type:"asc"}}},validations:{perfilForm:{nome:{required:c["required"]},abreviacao:{required:c["required"],maxLength:Object(c["maxLength"])(10)},cor:{required:c["required"]}}},methods:{handleClickInPerfil:function(e){this.clearPerfilForm(),this.perfilSelecionadoId=e.id,this.showPerfil(e)},clearClick:function(){this.perfilSelecionadoId=null},clearPerfilForm:function(){var e=this;this.clearClick(),this.perfilForm=Object(d["f"])(),this.$nextTick((function(){return e.$v.$reset()}))},showPerfil:function(e){this.perfilForm=m({},e)},handleCreatePerfil:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.$v.perfilForm.$touch(),!this.$v.perfilForm.$anyError){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,this.setLoading({type:"partial",value:!0}),e.next=7,u["a"].create(this.perfilForm);case 7:t=e.sent,this.clearPerfilForm(),this.pushNotification({type:"success",text:"O Perfil ".concat(t.Perfil.nome," foi criado!")}),e.next=17;break;case 12:e.prev=12,e.t0=e["catch"](3),r="<b>Erro ao criar Perfil</b>",e.t0.response.data.fullMessage&&(r+="<br/>"+e.t0.response.data.fullMessage.replace("\n","<br/>")),this.pushNotification({type:"error",text:r});case 17:return e.prev=17,this.setLoading({type:"partial",value:!1}),e.finish(17);case 20:case"end":return e.stop()}}),e,this,[[3,12,17,20]])})));function t(){return e.apply(this,arguments)}return t}(),handleUpdatePerfil:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.$v.perfilForm.$touch(),!this.$v.perfilForm.$anyError){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,this.setLoading({type:"partial",value:!0}),e.next=7,u["a"].update(this.perfilForm.id,this.perfilForm);case 7:t=e.sent,this.pushNotification({type:"success",text:"O Perfil ".concat(t.Perfil.nome," foi atualizado!")}),e.next=16;break;case 11:e.prev=11,e.t0=e["catch"](3),r="<b>Erro ao atualizar Perfil</b>",e.t0.response.data.fullMessage&&(r+="<br/>"+e.t0.response.data.fullMessage.replace("\n","<br/>")),this.pushNotification({type:"error",text:r});case 16:return e.prev=16,this.setLoading({type:"partial",value:!1}),e.finish(16);case 19:case"end":return e.stop()}}),e,this,[[3,11,16,19]])})));function t(){return e.apply(this,arguments)}return t}(),handleDeletePerfil:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setLoading({type:"partial",value:!0}),e.next=4,u["a"].delete(this.perfilForm.id,this.perfilForm);case 4:t=e.sent,this.clearPerfilForm(),this.pushNotification({type:"success",text:"O Perfil ".concat(t.Perfil.nome," foi excluído!")}),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](0),this.pushNotification({type:"error",text:"<b>Erro ao excluir Perfil</b>"});case 12:return e.prev=12,this.setLoading({type:"partial",value:!1}),e.finish(12);case 15:case"end":return e.stop()}}),e,this,[[0,9,12,15]])})));function t(){return e.apply(this,arguments)}return t}()},computed:m(m({},Object(s["c"])(["AllPerfis"])),{},{PerfisOrdered:function(){return Object(l["a"])(this.AllPerfis,this.ordenacaoPerfisMain.order,this.ordenacaoPerfisMain.type)},isEditing:function(){return null!=this.perfilForm.id}})},b=v,g=r("2877"),P=Object(g["a"])(b,i,a,!1,null,null,null);t["default"]=P.exports}}]);
//# sourceMappingURL=chunk-2d0e13c2.22a32e26.js.map