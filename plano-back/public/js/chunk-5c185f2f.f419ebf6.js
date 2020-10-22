(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5c185f2f","chunk-4836a4ae"],{"00cf":function(e,t,a){},"31eb":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main-component"},[a("PageHeader",{attrs:{title:"Planos"}},[a("BaseButton",{attrs:{template:"ajuda"},on:{click:function(t){return e.toggleAsideModal("ajuda")}}}),a("BaseButton",{attrs:{template:"file-upload"},on:{click:function(t){return e.toggleAsideModal("importPlano")}}})],1),a("div",{staticClass:"page-content"},[a("div",{staticClass:"div-table"},[a("BaseTable",{attrs:{styles:"height:max-content"},scopedSlots:e._u([{key:"thead",fn:function(){return[a("th",{staticClass:"t-start clickable",staticStyle:{width:"70px"},on:{click:function(t){return e.toggleOrder(e.ordenacaoMainPlanos,"ano")}}},[e._v("\n            Ano\n            "),a("i",{class:e.setIconByOrder(e.ordenacaoMainPlanos,"ano")})]),a("th",{staticClass:"t-start clickable",staticStyle:{width:"150px"},on:{click:function(t){return e.toggleOrder(e.ordenacaoMainPlanos,"nome")}}},[e._v("\n            Nome\n            "),a("i",{class:e.setIconByOrder(e.ordenacaoMainPlanos,"nome")})]),a("th",{staticClass:"t-start clickable",staticStyle:{width:"300px"},on:{click:function(t){return e.toggleOrder(e.ordenacaoMainPlanos,"obs")}}},[e._v("\n            Observação\n            "),a("i",{class:e.setIconByOrder(e.ordenacaoMainPlanos,"obs")})]),a("th",{staticStyle:{width:"80px"}},[e._v("\n            Editável\n          ")])]},proxy:!0},{key:"tbody",fn:function(){return e._l(e.PlanosOrdered,function(t){return a("tr",{key:t.id,class:{"bg-selected":t.id===e.planoSelectedId},on:{click:function(a){return e.handleClickInPlano(t)}}},[a("td",{staticClass:"t-start",staticStyle:{width:"70px"}},[e._v(e._s(t.ano))]),a("td",{staticClass:"t-start",staticStyle:{width:"150px"}},[e._v(e._s(t.nome))]),a("td",{staticClass:"t-start",staticStyle:{width:"300px"}},[e._v(e._s(t.obs))]),a("td",{staticClass:"t-start",staticStyle:{width:"80px"}},[e._v(e._s(t.isEditable))])])})},proxy:!0}])})],1),a("Card",{attrs:{title:"Plano",toggleFooter:e.isEdit,isPlano:e.isEdit},on:{"btn-salvar":e.handleEditPlano,"btn-delete":e.openModalDelete,"btn-add":e.openModalNovoPlano,"btn-clean":e.cleanPlano,"btn-copy":function(t){return e.copyPlano(e.planoForm)}},scopedSlots:e._u([{key:"form-group",fn:function(){return[a("div",{staticClass:"row mb-2 mx-0"},[a("div",{staticClass:"form-group col m-0 px-0"},[a("label",{attrs:{required:"",for:"planoNome"}},[e._v("Nome")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.planoForm.nome,expression:"planoForm.nome"}],staticClass:"form-control",attrs:{type:"text",id:"planoNome"},domProps:{value:e.planoForm.nome},on:{keypress:e.limitNomeLength,input:function(t){t.target.composing||e.$set(e.planoForm,"nome",t.target.value)}}})])]),a("div",{staticClass:"row mb-2 mx-0"},[a("div",{staticClass:"form-group col m-0 px-0"},[a("label",{attrs:{required:"",for:"ano"}},[e._v("Ano")]),a("select",{directives:[{name:"model",rawName:"v-model.number",value:e.planoForm.ano,expression:"planoForm.ano",modifiers:{number:!0}}],staticClass:"form-control input-ano",attrs:{id:"planoAno"},on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(t){var a="_value"in t?t._value:t.value;return e._n(a)});e.$set(e.planoForm,"ano",t.target.multiple?a:a[0])}}},e._l(e.AnosDoPlano,function(t){return a("option",{key:"anos"+t,domProps:{value:t}},[e._v(e._s(t))])}),0)])]),a("div",{staticClass:"row mb-2 mx-0"},[a("div",{staticClass:"form-group col m-0 px-0"},[a("label",{attrs:{for:"planoObs"}},[e._v("Observações")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.planoForm.obs,expression:"planoForm.obs"}],staticClass:"form-control",attrs:{id:"planoObs",cols:"30",rows:"3"},domProps:{value:e.planoForm.obs},on:{input:function(t){t.target.composing||e.$set(e.planoForm,"obs",t.target.value)}}})])]),a("div",{staticClass:"row mb-2 mx-0"},[a("div",{staticClass:"form-group col m-0 px-0"},[a("label",{attrs:{required:"",for:"planoEditavel"}},[e._v("Editável")]),a("select",{directives:[{name:"model",rawName:"v-model.number",value:e.planoForm.isEditable,expression:"planoForm.isEditable",modifiers:{number:!0}}],staticClass:"form-control input-ano",attrs:{id:"planoEditavel"},on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(t){var a="_value"in t?t._value:t.value;return e._n(a)});e.$set(e.planoForm,"isEditable",t.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"true"}},[e._v("Sim")]),a("option",{attrs:{value:"false"}},[e._v("Não")])])])])]},proxy:!0}])})],1),a("ModalNovoPlano",{ref:"modalNovoPlano",attrs:{plano:e.planoForm}}),a("ModalDelete",{ref:"modalDelete",attrs:{isDeleting:e.isEdit},on:{"btn-deletar":e.handleDeletePlano}},[a("li",{staticClass:"list-group-item"},[e.isEdit?a("span",[e._v("\n        Tem certeza que deseja excluír o plano\n        "),a("b",[e._v(e._s(e.planoForm.ano+" - "+e.planoForm.nome))]),e._v("\n        ?\n      ")]):a("span",{staticClass:"list-group-item"},[e._v("Nenhum plano selecionado.")])])]),a("ModalAjuda",{ref:"modalAjuda"},[a("li",{staticClass:"list-group-item"},[a("b",[e._v("Adicionar:")]),e._v("\n      Preencha o cartão em branco à direita e em seguida, clique em Adicionar\n      "),a("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","plus"]}}),e._v(".\n    ")],1),a("li",{staticClass:"list-group-item"},[a("b",[e._v("Editar:")]),e._v(" Clique na linha da tabela do plano que deseja alterar. Em\n      seguida, no cartão à direita, altere as informações que desejar e clique em\n      Salvar "),a("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","check"]}}),e._v(".\n    ")],1),a("li",{staticClass:"list-group-item"},[a("b",[e._v("Deletar:")]),e._v(" Clique na linha da tabela do plano que deseja remover. Em\n      seguida, no cartão à direita, clique em Remover\n      "),a("font-awesome-icon",{staticClass:"icon-red",attrs:{icon:["fas","trash-alt"]}}),e._v(" e\n      confirme a remoção na janela que será aberta.\n    ")],1),a("li",{staticClass:"list-group-item"},[a("b",[e._v("Copiar:")]),e._v(" Clique na linha da tabela do plano que deseja copiar. Em\n      seguida, no cartão à direita, clique em Copiar\n      "),a("font-awesome-icon",{staticClass:"icon-lightblue",attrs:{icon:["fas","copy"]}}),e._v(" .\n    ")],1),a("li",{staticClass:"list-group-item"},[a("b",[e._v("Limpar:")]),e._v(" No cartão à direita, clique em Cancelar\n      "),a("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","times"]}}),e._v(", para limpar\n      as informações.\n    ")],1),a("li",{staticClass:"list-group-item"},[a("b",[e._v("Ordenar:")]),e._v(" Clique no cabeçalho da tabela, na coluna desejada, para\n      alterar a ordenação das informações.\n    ")])]),a("ModalImportPlano",{ref:"modalImportPlano"})],1)},o=[],r=(a("a481"),a("96cf"),a("3b8d")),i=a("cebc"),s=a("2f62"),l=a("9165"),c=a("d027"),u=a("25df"),d=a("795b"),p=a.n(d),f=a("2b0e"),m={copyPlano:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return f["default"].axios.post("/copyPlano/".concat(e,"&&").concat(t),a).then(function(e){return p.a.resolve(e.data)}).catch(function(e){return p.a.reject(e)})}},h=a("ebd8"),v=a("6e60"),b=a("f6c9"),g={ano:"",nome:"",obs:"",isEditable:"true"},P={name:"Planos",mixins:[l["l"],l["j"]],components:{ModalAjuda:c["a"],ModalDelete:c["b"],Card:u["b"],ModalNovoPlano:v["default"],ModalImportPlano:b["default"]},data:function(){return{asideModalsRefs:["modalImportPlano","modalAjuda"],planoForm:this.$_.clone(g),planoSelectedId:null,ordenacaoMainPlanos:{order:"ano",type:"asc"}}},methods:Object(i["a"])({},Object(s["b"])(["deletePlano","editPlano"]),{limitNomeLength:function(e){e.target.value.length>=10&&e.preventDefault()},handleClickInPlano:function(e){this.cleanPlano(),this.planoSelectedId=e.id,this.planoForm=this.$_.clone(e)},cleanPlano:function(){this.planoSelectedId=null,this.planoForm=this.$_.clone(g)},openModalDelete:function(){this.$refs.modalDelete.open()},openModalNovoPlano:function(){""===this.planoForm.ano||null===this.planoForm.ano||""===this.planoForm.nome||null===this.planoForm.nome?this.pushNotification({type:"error",text:"Campos obrigatórios inválidos ou incompletos."}):this.$refs.modalNovoPlano.open()},handleEditPlano:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setPartialLoading(!0),e.next=4,this.editPlano(this.planoForm);case 4:e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](0),this.pushNotification({type:"error",title:"Erro ao atualizar plano",text:e.t0.message||""});case 9:return e.prev=9,this.setPartialLoading(!1),e.finish(9);case 12:case"end":return e.stop()}},e,this,[[0,6,9,12]])}));function t(){return e.apply(this,arguments)}return t}(),handleDeletePlano:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setPartialLoading(!0),e.next=4,this.deletePlano(this.planoForm);case 4:this.cleanPlano(),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),this.pushNotification({type:"error",title:"Erro ao deletar plano",text:"Tente novamente"});case 10:return e.prev=10,this.setPartialLoading(!1),e.finish(10);case 13:case"end":return e.stop()}},e,this,[[0,7,10,13]])}));function t(){return e.apply(this,arguments)}return t}(),copyPlano:function(e){var t=this,a={nome:"Cópia de '".concat(e.nome,"'"),ano:e.ano,obs:"Cópia do plano '".concat(e.nome," - ").concat(e.ano,"'")};h["a"].create(a).then(function(a){m.copyPlano(e.id,a.Plano.id).then(function(a){t.$notify({group:"general",title:"Sucesso!",text:"O Plano ".concat(e.nome," foi copiado!"),type:"success"})}).catch(function(e){t.error="<b>Erro ao copiar plano</b>",e.response.data.fullMessage&&(t.error+="<br/>"+e.response.data.fullMessage.replace("\n","<br/>")),t.$notify({group:"general",title:"Erro!",text:t.error,type:"error"})})})}}),computed:Object(i["a"])({},Object(s["c"])(["AllPlanos","AnosDoPlano"]),{PlanosOrdered:function(){var e=this.ordenacaoMainPlanos,t=e.order,a=e.type;return this.$_.orderBy(this.AllPlanos,t,a)},isEdit:function(){return null!=this.planoSelectedId}})},x=P,y=(a("9a9b"),a("2877")),_=Object(y["a"])(x,n,o,!1,null,"6776b75e",null);t["default"]=_.exports},"469f":function(e,t,a){a("6c1c"),a("1654"),e.exports=a("7d7b")},"4f37":function(e,t,a){"use strict";a("aa77")("trim",function(e){return function(){return e(this,3)}})},"5d73":function(e,t,a){e.exports=a("469f")},"7d7b":function(e,t,a){var n=a("e4ae"),o=a("7cd6");e.exports=a("584a").getIterator=function(e){var t=o(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return n(t.call(e))}},"9a9b":function(e,t,a){"use strict";var n=a("00cf"),o=a.n(n);o.a},a21f:function(e,t,a){var n=a("584a"),o=n.JSON||(n.JSON={stringify:JSON.stringify});e.exports=function(e){return o.stringify.apply(o,arguments)}},f499:function(e,t,a){e.exports=a("a21f")},f6c9:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("BaseModal",{ref:"baseModal",attrs:{title:"Importar plano",position:"right",hasFooter:!0},scopedSlots:e._u([{key:"modal-body",fn:function(){return[a("input",{ref:"inputFilePlano",attrs:{type:"file"}})]},proxy:!0},{key:"modal-footer",fn:function(){return[a("BaseButton",{staticClass:"ml-auto",attrs:{color:"lightblue",text:"Importar"},on:{click:e.handleImportPlano}})]},proxy:!0}])})},o=[],r=(a("6762"),a("2fdb"),a("4f37"),a("7514"),a("5d73")),i=a.n(r),s=a("e814"),l=a.n(s),c=(a("7f7f"),a("28a5"),a("a745")),u=a.n(c);function d(e){if(u()(e))return e}function p(e,t){var a=[],n=!0,o=!1,r=void 0;try{for(var s,l=i()(e);!(n=(s=l.next()).done);n=!0)if(a.push(s.value),t&&a.length===t)break}catch(c){o=!0,r=c}finally{try{n||null==l["return"]||l["return"]()}finally{if(o)throw r}}return a}function f(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function m(e,t){return d(e)||p(e,t)||f()}a("a481");var h=a("f499"),v=a.n(h),b=(a("96cf"),a("3b8d")),g=a("cebc"),P=a("1146"),x=a.n(P),y=a("2f62"),_=a("eaf8"),C={name:"ModalImportPlano",mounted:function(){console.log(this.AllTurmas)},methods:Object(g["a"])({},Object(y["b"])(["createTurma","editPedido"]),{open:function(){this.$refs.baseModal.open()},toggle:function(){this.$refs.baseModal.toggle()},close:function(){this.$refs.baseModal.close()},handleImportPlano:function(){var e=Object(b["a"])(regeneratorRuntime.mark(function e(){var t,a,n=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(!this.AllTurmas.length){e.next=4;break}return this.pushNotification({type:"error",text:"Plano atual deve estar vázio para fazer a importação!"}),this.$refs.baseModal.close(),e.abrupt("return");case 4:this.setPartialLoading(!0),t=this.$refs.inputFilePlano.files[0],a=new FileReader,a.onload=function(){var e=Object(b["a"])(regeneratorRuntime.mark(function e(a){var o,r,i,s,c,u,d,p,f;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return o=x.a.read(a.target.result,{type:"binary"}),r=o.Sheets[o.SheetNames[0]],i=v()(x.a.utils.sheet_to_json(r)),s=i.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s/g,""),c=JSON.parse(s),u=t.name.split("."),d=m(u,2),p=d[1],f=l()(p)||null,e.next=9,n.createPlanoImported(c.slice(0,5),f);case 9:return e.next=11,n.$store.dispatch("fetchAll");case 11:n.$refs.baseModal.close(),n.setPartialLoading(!1);case 13:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.readAsBinaryString(t);case 9:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),createPlanoImported:function(){var e=Object(b["a"])(regeneratorRuntime.mark(function e(t){var a,n,o,r,s,l,c,u,d,p,f,h,v,b,P,x,y,C=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:for(r in a=C.length>1&&void 0!==C[1]?C[1]:1,n={disciplinaCod:null,letra:null,cursoCod:null,vagas1:null,vagas2:null,horarios:null},o=0,t[0])1===o?n.disciplinaCod=r:2===o?n.letra=r:3===o?n.cursoCod=r:5===o?n.vagas1=r:6===o?n.vagas2=r:7===o&&(n.horarios=r),o++;s={},l=!0,c=!1,u=void 0,e.prev=8,d=i()(t);case 10:if(l=(p=d.next()).done){e.next=32;break}if(f=p.value,h=Object(_["b"])(),h.periodo=a,h.letra=f[n.letra]||null,h.Disciplina=this.findDisciplinaId(f[n.disciplinaCod]),f[n.horarios]&&(v=f[n.horarios].split(";"),b=m(v,2),P=b[0],x=b[1],h.Horario1=this.findHorarioId(P),h.Horario2=this.findHorarioId(x),h.turno1=this.findTurno(h.Horario1,h.Horario2)),h.Disciplina&&h.letra&&h.turno1){e.next=19;break}return e.abrupt("continue",29);case 19:if(!this.isTheSameTurma(s,h)){e.next=23;break}return e.next=22,this.createPedido(f,n,s.id);case 22:return e.abrupt("continue",29);case 23:return e.next=25,this.createTurma(h);case 25:return y=e.sent,s=Object(g["a"])({},y),e.next=29,this.createPedido(f,n,y.id);case 29:l=!0,e.next=10;break;case 32:e.next=38;break;case 34:e.prev=34,e.t0=e["catch"](8),c=!0,u=e.t0;case 38:e.prev=38,e.prev=39,l||null==d.return||d.return();case 41:if(e.prev=41,!c){e.next=44;break}throw u;case 44:return e.finish(41);case 45:return e.finish(38);case 46:case"end":return e.stop()}},e,this,[[8,34,38,46],[39,,41,45]])}));function t(t){return e.apply(this,arguments)}return t}(),createPedido:function(){var e=Object(b["a"])(regeneratorRuntime.mark(function e(t,a,n){var o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(o={Turma:null,Curso:null,vagasNaoPeriodizadas:0,vagasPeriodizadas:0},o.Turma=n,o.Curso=this.findCursoId(t[a.cursoCod]),o.vagasPeriodizadas=t[a.vagas1],o.vagasNaoPeriodizadas=t[a.vagas2],!o.Curso){e.next=10;break}return e.next=8,this.editPedido(o);case 8:e.next=11;break;case 10:console.log("Curso não econtrado");case 11:case"end":return e.stop()}},e,this)}));function t(t,a,n){return e.apply(this,arguments)}return t}(),findTurno:function(e,t){return e||t?e<=28||t<=28?"Diurno":"Noturno":null},findCursoId:function(e){var t=this.$_.find(this.AllCursos,["codigo",e]);return t?t.id:null},findDisciplinaId:function(e){var t=this.$_.find(this.AllDisciplinas,["codigo",e]);return t?t.id:null},findHorarioId:function(e){var t=e.split(","),a=m(t,2),n=a[0],o=a[1],r=this.parseDiaEHora(n,o);if(r){var i=this.$_.find(this.AllHorarios,["horario",r]);return i?i.id:null}},parseDiaEHora:function(e,t){if(!e||!t)return null;var a=null,n=null;switch(e.trim().substring(0,3).toLowerCase()){case"seg":a="2a";break;case"ter":a="3a";break;case"qua":a="4a";break;case"qui":a="5a";break;case"sex":a="6a";break}var o=this.$_.find(this.ListaDeTodosHorarios,function(e){return e.nome.includes(t.substring(0,1)+"-")})||{};return n=o.nome,a&&n?a+" "+n:null},isTheSameTurma:function(e,t){return e.letra===t.letra&&e.Disciplina===t.Disciplina&&e.turno1===t.turno1&&e.Horario1===t.Horario1&&e.Horario2===t.Horario2}}),computed:Object(g["a"])({},Object(y["c"])(["AllHorarios","AllDisciplinas","AllCursos","ListaDeTodosHorarios","AllTurmas"]))},w=C,k=a("2877"),O=Object(k["a"])(w,n,o,!1,null,null,null);t["default"]=O.exports}}]);
//# sourceMappingURL=chunk-5c185f2f.f419ebf6.js.map