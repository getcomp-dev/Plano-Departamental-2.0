(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-73c72ec4"],{"2afa":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"main-component row"},[n("PageHeader",{attrs:{title:"Docentes"}},[n("BaseButton",{attrs:{template:"ajuda"},on:{click:function(t){return e.$refs.modalAjuda.toggle()}}})],1),n("div",{staticClass:"page-content"},[n("div",{staticClass:"div-table"},[n("BaseTable",{scopedSlots:e._u([{key:"thead",fn:function(){return[n("v-th-ordination",{attrs:{currentOrder:e.ordenacaoDocentesMain,orderToCheck:"nome",width:"240",align:"start"}},[e._v("\n            Nome\n          ")]),n("v-th-ordination",{attrs:{currentOrder:e.ordenacaoDocentesMain,orderToCheck:"apelido",width:"120",align:"start"}},[e._v("\n            Apelido\n          ")]),n("v-th-ordination",{attrs:{currentOrder:e.ordenacaoDocentesMain,orderToCheck:"ativo",orderType:"desc",width:"65"}},[e._v("\n            Ativo\n          ")])]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.DocentesOrdered,(function(t){return n("tr",{key:t.id+t.apelido,class:[{"bg-selected":e.docenteClickadoId==t.id},"clickable"],on:{click:function(n){return e.handleClickInDocente(t)}}},[n("v-td",{attrs:{width:"240",align:"start"}},[e._v(e._s(t.nome))]),n("v-td",{attrs:{width:"120",align:"start"}},[e._v(e._s(t.apelido))]),n("v-td",{attrs:{width:"65"}},[e._v(e._s(e.generateBooleanText(t.ativo)))])],1)})),e.DocentesOrdered.length?e._e():n("tr",[n("v-td",{attrs:{width:"665",colspan:"3"}},[n("b",[e._v("Nenhum docente encontrado")])])],1)]},proxy:!0}])})],1),n("Card",{attrs:{title:"Docente",toggleFooter:e.isEdit},on:{"btn-salvar":e.editDocente,"btn-delete":e.openModalDelete,"btn-add":e.addDocente,"btn-clean":e.cleanDocente},scopedSlots:e._u([{key:"form-group",fn:function(){return[n("div",{staticClass:"row mb-2 mx-0"},[n("div",{staticClass:"form-group col m-0 px-0"},[n("label",{staticClass:"col-form-label",attrs:{required:"",for:"nome"}},[e._v("Nome")]),n("input",{staticClass:"form-control form-control-sm input-maior",attrs:{id:"nome",type:"text"},domProps:{value:e.docenteForm.nome},on:{input:function(t){e.docenteForm.nome=t.target.value.toUpperCase()}}})])]),n("div",{staticClass:"row mb-2 mx-0"},[n("div",{staticClass:"form-group col-8 m-0 px-0"},[n("label",{staticClass:"col-form-label",attrs:{required:"",for:"apelido"}},[e._v("Apelido")]),n("input",{staticClass:"form-control form-control-sm input-medio",attrs:{id:"apelido",type:"text"},domProps:{value:e.docenteForm.apelido},on:{input:function(t){e.docenteForm.apelido=t.target.value.toUpperCase()}}})]),n("div",{staticClass:"form-check form-check-inline col-auto m-0 mt-4 px-0"},[n("label",{staticClass:"form-check-label mr-2",attrs:{for:"ativo"}},[e._v("Ativo")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.docenteForm.ativo,expression:"docenteForm.ativo"}],attrs:{id:"ativo",type:"checkbox",value:"1"},domProps:{checked:Array.isArray(e.docenteForm.ativo)?e._i(e.docenteForm.ativo,"1")>-1:e.docenteForm.ativo},on:{change:function(t){var n=e.docenteForm.ativo,r=t.target,o=!!r.checked;if(Array.isArray(n)){var a="1",i=e._i(n,a);r.checked?i<0&&e.$set(e.docenteForm,"ativo",n.concat([a])):i>-1&&e.$set(e.docenteForm,"ativo",n.slice(0,i).concat(n.slice(i+1)))}else e.$set(e.docenteForm,"ativo",o)}}})])]),e.isEdit?[n("div",{staticClass:"border-bottom mt-2 mb-1"}),n("small",[e._v("Perfis Associados ao docente")]),n("div",{staticClass:"row mb-3 mx-0"},[n("div",{staticClass:"div-table"},[n("BaseTable",{attrs:{type:"main",styles:"max-height: 300px"},scopedSlots:e._u([{key:"thead",fn:function(){return[n("v-th",{attrs:{width:"25"}}),n("v-th",{attrs:{width:"225",align:"start"}},[e._v("Perfis")])]},proxy:!0},{key:"tbody",fn:function(){return e._l(e.AllPerfis,(function(t){return n("tr",{key:t.id+t.abreviacao,on:{click:function(n){return e.toggleItemInArray(t.id,e.perfisAssociados)}}},[n("v-td",{attrs:{width:"25",type:"content"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.perfisAssociados,expression:"perfisAssociados"}],staticStyle:{width:"11px"},attrs:{type:"checkbox"},domProps:{value:t.id,checked:Array.isArray(e.perfisAssociados)?e._i(e.perfisAssociados,t.id)>-1:e.perfisAssociados},on:{change:function(n){var r=e.perfisAssociados,o=n.target,a=!!o.checked;if(Array.isArray(r)){var i=t.id,s=e._i(r,i);o.checked?s<0&&(e.perfisAssociados=r.concat([i])):s>-1&&(e.perfisAssociados=r.slice(0,s).concat(r.slice(s+1)))}else e.perfisAssociados=a}}})]),n("v-td",{attrs:{width:"225",align:"start",title:t.nome}},[e._v("\n                      "+e._s(t.nome)+"\n                    ")])],1)}))},proxy:!0}],null,!1,532469061)})],1)])]:e._e()]},proxy:!0}])})],1),n("ModalDelete",{ref:"modalDelete",attrs:{isDeleting:e.isEdit},on:{"btn-deletar":e.deleteDocente}},[e.isEdit?n("li",{staticClass:"list-group-item"},[n("span",[e._v("\n        Tem certeza que deseja excluír o docente\n        "),n("b",[e._v(e._s(e.docenteForm.nome))]),e._v("\n        ?\n      ")])]):n("li",{staticClass:"list-group-item"},[e._v("Nenhum docente selecionado.")])]),n("ModalAjuda",{ref:"modalAjuda"},[n("li",{staticClass:"list-group-item"},[n("b",[e._v("Adicionar:")]),e._v("\n      Preencha o cartão em branco à direita e em seguida, clique em Adicionar\n      "),n("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","plus"]}}),e._v("\n      .\n    ")],1),n("li",{staticClass:"list-group-item"},[n("b",[e._v("Editar:")]),e._v("\n      Clique na linha da tabela do docente que deseja alterar. Em seguida, no cartão à\n      direita, altere as informações que desejar e clique em Salvar\n      "),n("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","check"]}}),e._v("\n      .\n    ")],1),n("li",{staticClass:"list-group-item"},[n("b",[e._v("Deletar:")]),e._v("\n      Clique na linha da tabela do docente que deseja remover. Em seguida, no cartão à\n      direita, clique em Remover\n      "),n("font-awesome-icon",{staticClass:"icon-red",attrs:{icon:["fas","trash-alt"]}}),e._v("\n      e confirme a remoção na janela que será aberta.\n    ")],1),n("li",{staticClass:"list-group-item"},[n("b",[e._v("Limpar:")]),e._v("\n      No cartão à direita, clique em Cancelar\n      "),n("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","times"]}}),e._v("\n      , para limpar as informações.\n    ")],1),n("li",{staticClass:"list-group-item"},[n("b",[e._v("Ordenar:")]),e._v("\n      Clique no cabeçalho da tabela, na coluna desejada, para alterar a ordenação das\n      informações.\n    ")])])],1)},o=[],a=(n("1c01"),n("58b2"),n("8e6e"),n("f3e2"),n("ac6a"),n("456d"),n("ade3")),i=(n("57e7"),n("a481"),n("96cf"),n("1da1")),s=n("2909"),c=(n("d25f"),n("6d67"),n("2f62")),d=n("7ab5"),l=n("55d1"),u=n("9165"),f=n("25df"),p=n("d027");function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){Object(a["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var v={id:null,nome:null,apelido:null,nomesiga:null,creditos:0,ativo:1},b={DocenteId:null,Perfil:null},g={name:"DashboardDocente",mixins:[u["n"],u["e"]],components:{Card:f["b"],ModalAjuda:p["a"],ModalDelete:p["b"]},data:function(){return{docenteForm:this.$_.clone(v),perfisAssociados:[],docenteClickadoId:null,perfilsOfCurrentDocente:[],ordenacaoDocentesMain:{order:"nome",type:"asc"}}},methods:{handleClickInDocente:function(e){this.cleanDocente(),this.docenteClickadoId=e.id,this.showDocente(e)},cleanDocente:function(){this.docenteClickadoId=null,this.docenteForm=this.$_.clone(v)},showDocente:function(e){this.docenteForm=this.$_.clone(e),this.updatePerfisAssociados()},updatePerfisAssociados:function(){this.perfilsOfCurrentDocente=this.$_.map(this.$_.filter(this.DocentePerfis,["DocenteId",this.docenteForm.id]),"Perfil"),this.perfisAssociados=Object(s["a"])(this.perfilsOfCurrentDocente)},openModalDelete:function(){this.$refs.modalDelete.open()},addDocente:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setPartialLoading(!0),this.docenteForm.nomesiga||(this.docenteForm.nomesiga=this.docenteForm.nome),e.next=5,d["a"].create(this.docenteForm);case 5:t=e.sent,this.cleanDocente(),this.pushNotification({type:"success",text:"Docente ".concat(t.Docente.nome," foi criada!")}),e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](0),this.pushNotification({type:"error",title:"Erro ao criar Docente!",text:e.t0.response.data.fullMessage?"<br/>"+e.t0.response.data.fullMessage.replace("\n","<br/>"):""});case 13:return e.prev=13,this.setPartialLoading(!1),e.finish(13);case 16:case"end":return e.stop()}}),e,this,[[0,10,13,16]])})));function t(){return e.apply(this,arguments)}return t}(),editDocente:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setPartialLoading(!0),e.next=4,d["a"].update(this.docenteForm.id,this.docenteForm);case 4:return t=e.sent,e.next=7,this.editDocentePerfil();case 7:this.pushNotification({type:"success",text:"Docente ".concat(t.Docente.nome," foi atualizada!")}),e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](0),this.pushNotification({type:"error",title:"Erro ao atualizar Docente",text:e.t0.response.data.fullMessage?"<br/>"+e.t0.response.data.fullMessage.replace("\n","<br/>"):""});case 13:return e.prev=13,this.setPartialLoading(!1),e.finish(13);case 16:case"end":return e.stop()}}),e,this,[[0,10,13,16]])})));function t(){return e.apply(this,arguments)}return t}(),deleteDocente:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setPartialLoading(!0),e.next=4,d["a"].delete(this.docenteForm.id,this.docenteForm);case 4:t=e.sent,this.cleanDocente(),this.pushNotification({type:"success",text:"Docente ".concat(t.Docente.nome," foi excluída!")}),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](0),this.pushNotification({type:"error",title:"Erro ao excluir Docente!",text:"O docente não pode estar vinculado a nenhum perfil"});case 12:return e.prev=12,this.setPartialLoading(!1),e.finish(12);case 15:case"end":return e.stop()}}),e,this,[[0,9,12,15]])})));function t(){return e.apply(this,arguments)}return t}(),editDocentePerfil:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,n,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t=0;case 1:if(!(t<this.perfilsOfCurrentDocente.length)){e.next=9;break}if(n=this.$_.indexOf(this.perfisAssociados,this.perfilsOfCurrentDocente[t]),-1!==n){e.next=6;break}return e.next=6,this.deletePerfil(this.perfilsOfCurrentDocente[t]);case 6:t++,e.next=1;break;case 9:r=0;case 10:if(!(r<this.perfisAssociados.length)){e.next=18;break}if(o=this.$_.indexOf(this.perfilsOfCurrentDocente,this.perfisAssociados[r]),-1!==o){e.next=15;break}return e.next=15,this.addPerfil(this.perfisAssociados[r]);case 15:r++,e.next=10;break;case 18:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),addPerfil:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=this.$_.clone(b),n.Docente=this.docenteForm.id,n.DocenteId=this.docenteForm.id,n.Perfil=t,e.next=6,l["a"].create(n);case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),deletePerfil:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l["a"].delete(this.docenteForm.id,t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},computed:h(h({},Object(c["c"])(["AllDocentes","AllPerfis"])),{},{DocentesOrdered:function(){return this.$_.orderBy(this.AllDocentes,this.ordenacaoDocentesMain.order,this.ordenacaoDocentesMain.type)},DocentePerfis:function(){return this.$store.state.docentePerfil.DocentePerfis},isEdit:function(){return null!==this.docenteForm.id}})},D=g,y=(n("dd24"),n("2877")),_=Object(y["a"])(D,r,o,!1,null,"81d96eea",null);t["default"]=_.exports},"90f6":function(e,t,n){},dd24:function(e,t,n){"use strict";var r=n("90f6"),o=n.n(r);o.a}}]);
//# sourceMappingURL=chunk-73c72ec4.c82ea2e4.js.map