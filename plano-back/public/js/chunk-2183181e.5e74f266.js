(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2183181e","chunk-2d0ae58b"],{"0a59":function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e._self._c;return r("div",{staticClass:"page-content"},[r("div",{staticClass:"flex flex-column flex-grow-1"},[r("NavTab",{attrs:{currentTab:e.currentTab,allTabs:["DCC","Outros"]},on:{"change-tab":function(r){return e.$emit("change-tab",r)}}}),r("div",{staticClass:"div-table"},[r("BaseTable",{attrs:{styles:"height:max-content"},scopedSlots:e._u([{key:"thead",fn:function(){return[r("v-th-ordination",{attrs:{currentOrder:e.ordenacaoCursos,align:"start",orderToCheck:"nome",width:"220",title:"Nome do Cursos"}},[e._v("\n            Cursos\n          ")]),r("v-th",{attrs:{width:"100",title:"Nome da Grade"}},[e._v("Grades")])]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.CursosComGradesOrdered,(function(t){return[r("tr",{key:t.id,staticClass:"bg-custom"},[r("v-td",{staticClass:"table-data",attrs:{width:"220",align:"start",title:t.nome}},[e._v("\n                "+e._s(t.nome.toLowerCase())+"\n              ")]),r("v-td",{attrs:{width:"100"}})],1),e._l(t.grades,(function(a){return r("tr",{key:a.id+a.nome+t.id,class:["clickable",{"bg-selected":e.gradeSelected===a.id}],on:{click:function(r){return e.showGrade(a)}}},[r("v-td",{attrs:{width:"220"}}),r("v-td",{attrs:{width:"100"}},[e._v(e._s(a.nome))])],1)}))]})),e.CursosComGradesOrdered.length?e._e():r("tr",[r("v-td",{attrs:{width:"320",colspan:"2"}},[e._v("Nenhuma grade encontrada")])],1)]},proxy:!0}])})],1)],1),r("Card",{attrs:{title:"Curso",width:"420",toggleFooter:e.isEditing},on:{"btn-salvar":e.handleEditGrade,"btn-delete":function(r){return e.$refs.modalDelete.open()},"btn-add":e.handleCreateGrade,"btn-clean":e.cleanGrade},scopedSlots:e._u([{key:"body",fn:function(){return[r("div",{staticClass:"row"},[r("div",{staticClass:"col-8"},[r("VInput",{attrs:{label:"Nome",validation:e.$v.gradeForm.nome},model:{value:e.gradeForm.nome,callback:function(r){e.$set(e.gradeForm,"nome",r)},expression:"gradeForm.nome"}})],1),r("div",{staticClass:"col"},[r("VInput",{attrs:{label:"Período de Início",validation:e.$v.gradeForm.periodoInicio,placeholder:"Ex: 2018.3"},model:{value:e.gradeForm.periodoInicio,callback:function(r){e.$set(e.gradeForm,"periodoInicio",r)},expression:"gradeForm.periodoInicio"}})],1)]),r("div",{staticClass:"row"},[r("div",{staticClass:"col-8"},[r("VSelect",{attrs:{label:"Curso",validation:e.$v.gradeForm.Curso,title:e.getCursoNome(e.gradeForm.Curso)},model:{value:e.gradeForm.Curso,callback:function(r){e.$set(e.gradeForm,"Curso",e._n(r))},expression:"gradeForm.Curso"}},e._l(e.CursosOptions,(function(e){return r("VOption",{key:e.id+e.nome,attrs:{value:e.id,text:e.nome}})})),1)],1),r("div",{staticClass:"col"},[r("VSelect",{attrs:{label:"Código",validation:e.$v.gradeForm.Curso},model:{value:e.gradeForm.Curso,callback:function(r){e.$set(e.gradeForm,"Curso",e._n(r))},expression:"gradeForm.Curso"}},e._l(e.CursosOptions,(function(e){return r("VOption",{key:e.id+e.codigo,attrs:{value:e.id,text:e.codigo}})})),1)],1)])]},proxy:!0}])}),r("ModalDelete",{ref:"modalDelete",attrs:{isDeleting:e.isEditing},on:{"btn-deletar":e.handleDeleteGrade}},[e.isEditing?r("li",{staticClass:"list-group-item"},[r("span",[e._v("\n        Tem certeza que deseja excluír a grade\n        "),r("b",[e._v(e._s(e.gradeForm.periodoInicio)+" - "+e._s(e.gradeForm.nome))]),e._v("\n        ?\n      ")])]):r("li",{staticClass:"list-group-item"},[e._v("Nenhuma grade selecionada.")])])],1)},n=[],s=(t("8e6e"),t("456d"),t("ade3")),o=(t("ac6a"),t("96cf"),t("1da1")),i=(t("7514"),t("758b")),c=t("d4b9"),d=t("b5ae"),u=t("a91e"),l=t("d027"),p=t("25df");function m(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function h(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?m(Object(t),!0).forEach((function(r){Object(s["a"])(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):m(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var g={name:"GradesCursosContent",components:{Card:p["b"],ModalDelete:l["b"],NavTab:p["e"],VInput:p["h"],VSelect:p["m"],VOption:p["l"]},props:{currentTab:{type:String,required:!0},arraysData:{type:Object,required:!0,validator:function(e){return"Grades"in e&&"Cursos"in e}},gradeService:{type:Object,required:!0,validator:function(e){return"create"in e&&"update"in e&&"delete"in e}}},data:function(){return{gradeForm:Object(u["e"])(),gradeSelected:null,ordenacaoCursos:{order:"nome",type:"asc"}}},validations:{gradeForm:{nome:{required:d["required"],maxLength:Object(d["maxLength"])(9)},periodoInicio:{required:d["required"],decimal:d["decimal"],maxLength:Object(d["maxLength"])(6),minLength:Object(d["minLength"])(6)},Curso:{required:d["required"]}}},methods:{cleanGrade:function(){var e=this;this.gradeForm=Object(u["e"])(),this.gradeSelected=null,this.$nextTick((function(){return e.$v.$reset()}))},showGrade:function(e){this.cleanGrade(),this.gradeSelected=e.id,this.gradeForm=Object(i["a"])(e)},getCursoNome:function(e){if(!e)return"";var r=this.arraysData.Cursos.find((function(r){return r.id===e}));return r?r.nome:""},handleCreateGrade:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.$v.gradeForm.$touch(),!this.$v.gradeForm.$anyError){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,this.setLoading({type:"partial",value:!0}),e.next=7,this.gradeService.create(this.gradeForm);case 7:this.cleanGrade(),e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](3),this.pushNotification({type:"error",title:"Erro ao criar nova grade!",text:e.t0.message});case 13:return e.prev=13,this.setLoading({type:"partial",value:!1}),e.finish(13);case 16:case"end":return e.stop()}}),e,this,[[3,10,13,16]])})));function r(){return e.apply(this,arguments)}return r}(),handleEditGrade:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.$v.gradeForm.$touch(),!this.$v.gradeForm.$anyError){e.next=3;break}return e.abrupt("return");case 3:return e.prev=3,this.setLoading({type:"partial",value:!0}),e.next=7,this.gradeService.update(this.gradeForm);case 7:e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](3),this.pushNotification({type:"error",title:"Erro ao atualizar grade!",text:e.t0.message});case 12:return e.prev=12,this.setLoading({type:"partial",value:!1}),e.finish(12);case 15:case"end":return e.stop()}}),e,this,[[3,9,12,15]])})));function r(){return e.apply(this,arguments)}return r}(),handleDeleteGrade:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setLoading({type:"partial",value:!0}),e.next=4,this.gradeService.delete(this.gradeForm);case 4:this.cleanGrade(),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),this.pushNotification({type:"error",title:"Erro ao excluir grade!",text:e.t0.response?"Grade não pode possuir disciplinas cadastradas para ser excluída":""});case 10:return e.prev=10,this.setLoading({type:"partial",value:!1}),e.finish(10);case 13:case"end":return e.stop()}}),e,this,[[0,7,10,13]])})));function r(){return e.apply(this,arguments)}return r}()},computed:{CursosComGradesOrdered:function(){var e=this.ordenacaoCursos,r=e.order,t=e.type;return Object(c["a"])(this.CursosComGrades,r,t)},CursosComGrades:function(){var e=this,r=[];return this.arraysData.Cursos.forEach((function(t){var a=e.arraysData.Grades.filter((function(e){return e.Curso===t.id}));a.length&&r.push(h(h({},t),{},{grades:Object(c["a"])(a,["nome","periodoInicio"],["asc","desc"])}))})),r},CursosOptions:function(){return Object(c["a"])(this.arraysData.Cursos,["nome"])},isEditing:function(){return null!=this.gradeSelected}}},f=g,v=t("2877"),b=Object(v["a"])(f,a,n,!1,null,null,null);r["default"]=b.exports},"7f50":function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e._self._c;return r("div",{staticClass:"main-component row"},[r("portal",{attrs:{to:"page-header"}},[r("BaseButton",{attrs:{template:"ajuda"},on:{click:function(r){return e.$refs.modalAjuda.toggle()}}})],1),r("keep-alive",["DCC"===e.currentTab?r("GradesCursosContent",{key:"DCC",attrs:{arraysData:e.contentPropsDCC.arraysData,gradeService:e.contentPropsDCC.services,currentTab:e.currentTab},on:{"change-tab":function(r){e.currentTab=r}}}):r("GradesCursosContent",{key:"Outros",attrs:{arraysData:e.contentPropsOutros.arraysData,gradeService:e.contentPropsOutros.services,currentTab:e.currentTab},on:{"change-tab":function(r){e.currentTab=r}}})],1),r("ModalAjuda",{ref:"modalAjuda"},[r("li",{staticClass:"list-group-item"},[r("b",[e._v("Adicionar grade:")]),e._v("\n      Preencha o cartão em branco à direita e em seguida, clique em Adicionar\n      "),r("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","plus"]}}),e._v("\n      .\n    ")],1),r("li",{staticClass:"list-group-item"},[r("b",[e._v("Editar grade:")]),e._v("\n      Clique na linha da tabela da grade que deseja alterar. Em seguida, no cartão à direita,\n      altere as informações que desejar e clique em Salvar\n      "),r("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","check"]}}),e._v("\n      .\n    ")],1),r("li",{staticClass:"list-group-item"},[r("b",[e._v("Deletar grade:")]),e._v("\n      Clique na linha da tabela da grade que deseja remover. Em seguida, no cartão à direita,\n      clique em Remover\n      "),r("font-awesome-icon",{staticClass:"icon-red",attrs:{icon:["fas","trash-alt"]}}),e._v("\n      e confirme a remoção na janela que será aberta.\n    ")],1),r("li",{staticClass:"list-group-item"},[r("b",[e._v("Limpar formulário:")]),e._v("\n      No cartão à direita, clique em Cancelar\n      "),r("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","times"]}}),e._v("\n      , para limpar as informações.\n    ")],1)])],1)},n=[],s=(t("8e6e"),t("ac6a"),t("456d"),t("ade3")),o=t("2f62"),i=t("d027"),c=t("0a59");function d(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function u(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?d(Object(t),!0).forEach((function(r){Object(s["a"])(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):d(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var l={name:"GerenciarGrades",components:{GradesCursosContent:c["default"],ModalAjuda:i["a"]},data:function(){return{currentTab:"DCC"}},methods:u({},Object(o["b"])(["createGrade","updateGrade","deleteGrade","createGradeCursoExterno","updateGradeCursoExterno","deleteGradeCursoExterno"])),computed:u(u({},Object(o["c"])(["AllGrades","AllGradesCursosExternos","PrincipaisCursosDCC","AllCursos"])),{},{CursosExternos:function(){return this.AllCursos.filter((function(e){return e.id>4&&18!=e.id&&19!=e.id}))},contentPropsDCC:function(){return{arraysData:{Grades:this.AllGrades,Cursos:this.PrincipaisCursosDCC},services:{create:this.createGrade,update:this.updateGrade,delete:this.deleteGrade}}},contentPropsOutros:function(){return{arraysData:{Grades:this.AllGradesCursosExternos,Cursos:this.CursosExternos},services:{create:this.createGradeCursoExterno,update:this.updateGradeCursoExterno,delete:this.deleteGradeCursoExterno}}}})},p=l,m=t("2877"),h=Object(m["a"])(p,a,n,!1,null,null,null);r["default"]=h.exports}}]);
//# sourceMappingURL=chunk-2183181e.5e74f266.js.map