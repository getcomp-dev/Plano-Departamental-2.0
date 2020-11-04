(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-07d1243c"],{"2fe6":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main-component row"},[a("PageHeader",{attrs:{title:"Grades"}},[a("BaseButton",{attrs:{template:"ajuda"},on:{click:function(t){return e.$refs.modalAjuda.toggle()}}})],1),a("div",{staticClass:"page-content"},[a("div",{staticClass:"div-table"},[a("BaseTable",{attrs:{styles:"height:max-content"},scopedSlots:e._u([{key:"thead",fn:function(){return[a("v-th",{attrs:{width:"220"}},[e._v("Cursos")]),a("v-th",{attrs:{width:"100"}},[e._v("Grades")])]},proxy:!0},{key:"tbody",fn:function(){return[a("tr",{staticClass:"bg-custom"},[a("v-td",{attrs:{width:"220"}},[e._v("Ciência da Computação Diurno")]),a("v-td",{attrs:{width:"100"}})],1),e._l(e.GradesCCD,function(t){return a("tr",{key:t.id+t.nome+t.Curso,class:["clickable",{"bg-selected":e.gradeSelected===t.id}],on:{click:function(a){return e.showGrade(t)}}},[a("v-td",{attrs:{width:"220"}}),a("v-td",{attrs:{width:"100"}},[e._v(e._s(t.nome))])],1)}),a("tr",{staticClass:"bg-custom"},[a("v-td",{attrs:{width:"220"}},[e._v("Ciência da Computação Noturno")]),a("v-td",{attrs:{width:"100"}})],1),e._l(e.GradesCCN,function(t){return a("tr",{key:t.id+t.nome+t.Curso,class:["clickable",{"bg-selected":e.gradeSelected===t.id}],on:{click:function(a){return e.showGrade(t)}}},[a("v-td",{attrs:{width:"220"}}),a("v-td",{attrs:{width:"100"}},[e._v(e._s(t.nome))])],1)}),a("tr",{staticClass:"bg-custom"},[a("v-td",{attrs:{width:"220"}},[e._v("Sistemas de informação")]),a("v-td",{attrs:{width:"100"}})],1),e._l(e.GradesSI,function(t){return a("tr",{key:t.id+t.nome+t.Curso,class:["clickable",{"bg-selected":e.gradeSelected===t.id}],on:{click:function(a){return e.showGrade(t)}}},[a("v-td",{attrs:{width:"220"}}),a("v-td",{attrs:{width:"100"}},[e._v(e._s(t.nome))])],1)}),a("tr",{staticClass:"bg-custom"},[a("v-td",{attrs:{width:"220"}},[e._v("Engenharia da Computação")]),a("v-td",{attrs:{width:"100"}})],1),e._l(e.GradesEC,function(t){return a("tr",{key:t.id+t.nome+t.Curso,class:["clickable",{"bg-selected":e.gradeSelected===t.id}],on:{click:function(a){return e.showGrade(t)}}},[a("v-td",{attrs:{width:"220"}}),a("v-td",{attrs:{width:"100"}},[e._v(e._s(t.nome))])],1)}),e.GradesOrdered.length?e._e():a("tr",[a("v-td",{attrs:{width:"320",colspan:"2"}},[e._v("Nenhuma grade encontrada")])],1)]},proxy:!0}])})],1),a("Card",{attrs:{title:"Curso",toggleFooter:e.isEditing},on:{"btn-salvar":e.handleEditGrade,"btn-delete":e.openModalDelete,"btn-add":e.handleCreateGrade,"btn-clean":e.cleanGrade},scopedSlots:e._u([{key:"form-group",fn:function(){return[a("div",{staticClass:"row mb-2 mx-0"},[a("div",{staticClass:"form-group col-5 m-0 px-0"},[a("label",{staticClass:"col-form-label",attrs:{required:"",for:"gradeNome"}},[e._v("Nome")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.gradeForm.nome,expression:"gradeForm.nome"}],staticClass:"card-input-menor form-control form-control-sm",attrs:{type:"text",id:"gradeNome"},domProps:{value:e.gradeForm.nome},on:{input:function(t){t.target.composing||e.$set(e.gradeForm,"nome",t.target.value)}}})]),a("div",{staticClass:"form-group col-7 m-0 px-0"},[a("label",{staticClass:"col-form-label",attrs:{required:"",for:"periodoInicio"}},[e._v("\n              Período de Início\n            ")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.gradeForm.periodoInicio,expression:"gradeForm.periodoInicio"}],staticClass:"card-input-menor form-control form-control-sm col",attrs:{type:"text",id:"periodoInicio"},domProps:{value:e.gradeForm.periodoInicio},on:{input:function(t){t.target.composing||e.$set(e.gradeForm,"periodoInicio",t.target.value)}}})])]),a("div",{staticClass:"row mb-2 mx-0"},[a("div",{staticClass:"form-group col m-0 px-0"},[a("label",{staticClass:"col-form-label",attrs:{required:"",for:"gradeCurso"}},[e._v("gradeCurso")]),a("select",{directives:[{name:"model",rawName:"v-model.number",value:e.gradeForm.Curso,expression:"gradeForm.Curso",modifiers:{number:!0}}],staticClass:"form-control form-control-sm card-input-maior",attrs:{id:"gradeCurso"},on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(t){var a="_value"in t?t._value:t.value;return e._n(a)});e.$set(e.gradeForm,"Curso",t.target.multiple?a:a[0])}}},[a("option",{domProps:{value:4}},[e._v("Ciência da Computação Diurno")]),a("option",{domProps:{value:1}},[e._v("Ciência da Computação Noturno")]),a("option",{domProps:{value:3}},[e._v("Sistemas de Informação")]),a("option",{domProps:{value:2}},[e._v("Engenharia Computacional")])])])])]},proxy:!0}])})],1),a("ModalDelete",{ref:"modalDelete",attrs:{isDeleting:e.isEditing},on:{"btn-deletar":e.handleDeleteGrade}},[e.isEditing?a("li",{staticClass:"list-group-item"},[a("span",[e._v("\n        Tem certeza que deseja excluír a grade\n        "),a("b",[e._v(e._s(e.gradeForm.periodoInicio)+" - "+e._s(e.gradeForm.nome))]),e._v(" ?\n      ")])]):a("li",{staticClass:"list-group-item"},[e._v("Nenhuma grade selecionada.")])]),a("ModalAjuda",{ref:"modalAjuda"},[a("li",{staticClass:"list-group-item"},[a("b",[e._v("Adicionar:")]),e._v("\n      Preencha o cartão em branco à direita e em seguida, clique em Adicionar\n      "),a("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","plus"]}}),e._v(".\n    ")],1),a("li",{staticClass:"list-group-item"},[a("b",[e._v("Editar:")]),e._v(" Clique na linha da tabela da grade que deseja alterar. Em seguida,\n      no cartão à direita, altere as informações que desejar e clique em Salvar\n      "),a("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","check"]}}),e._v(".\n    ")],1),a("li",{staticClass:"list-group-item"},[a("b",[e._v("Deletar:")]),e._v(" Clique na linha da tabela da grade que deseja remover. Em seguida,\n      no cartão à direita, clique em Remover\n      "),a("font-awesome-icon",{staticClass:"icon-red",attrs:{icon:["fas","trash-alt"]}}),e._v(" e confirme a\n      remoção na janela que será aberta.\n    ")],1),a("li",{staticClass:"list-group-item"},[a("b",[e._v("Limpar:")]),e._v(" No cartão à direita, clique em Cancelar\n      "),a("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","times"]}}),e._v(", para limpar as\n      informações.\n    ")],1),a("li",{staticClass:"list-group-item"},[a("b",[e._v("Ordenar:")]),e._v(" Clique no cabeçalho da tabela, na coluna desejada, para alterar a\n      ordenação das informações.\n    ")])])],1)},i=[],o=(a("d25f"),a("96cf"),a("3b8d")),n=a("cebc"),s=(a("cadf"),a("551c"),a("f751"),a("097d"),a("2f62")),d=a("9165"),c=a("d027"),l=a("25df"),u={id:null,periodoInicio:null,Curso:null,nome:null},m={name:"DashboardGrade",mixins:[d["i"]],components:{Card:l["b"],ModalAjuda:c["a"],ModalDelete:c["b"]},data:function(){return{gradeForm:this.$_.clone(u),gradeSelected:null}},methods:Object(n["a"])({},Object(s["b"])(["createGrade","editGrade","deleteGrade"]),{openModalDelete:function(){this.$refs.modalDelete.open()},cleanGrade:function(){this.gradeForm=this.$_.clone(u),this.gradeSelected=null},showGrade:function(e){this.cleanGrade(),this.gradeSelected=e.id,this.gradeForm=this.$_.clone(e)},handleCreateGrade:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setPartialLoading(!0),e.next=4,this.createGrade(this.gradeForm);case 4:this.cleanGrade(),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),this.pushNotification({type:"error",title:"Erro ao criar nova grade!",text:e.t0.message});case 10:return e.prev=10,this.setPartialLoading(!1),e.finish(10);case 13:case"end":return e.stop()}},e,this,[[0,7,10,13]])}));function t(){return e.apply(this,arguments)}return t}(),handleEditGrade:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setPartialLoading(!0),e.next=4,this.editGrade(this.gradeForm);case 4:e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](0),this.pushNotification({type:"error",title:"Erro ao atualizar grade!",text:e.t0.message});case 9:return e.prev=9,this.setPartialLoading(!1),e.finish(9);case 12:case"end":return e.stop()}},e,this,[[0,6,9,12]])}));function t(){return e.apply(this,arguments)}return t}(),handleDeleteGrade:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setPartialLoading(!0),e.next=4,this.deleteGrade(this.gradeForm);case 4:this.cleanGrade(),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),this.pushNotification({type:"error",title:"Erro ao excluir grade!",text:e.t0.response?"Grade não pode possuir disciplinas cadastradas para ser excluída":""});case 10:return e.prev=10,this.setPartialLoading(!1),e.finish(10);case 13:case"end":return e.stop()}},e,this,[[0,7,10,13]])}));function t(){return e.apply(this,arguments)}return t}()}),computed:Object(n["a"])({},Object(s["c"])(["AllGrades"]),{GradesOrdered:function(){return this.$_.orderBy(this.AllGrades,"nome")},GradesCCN:function(){return this.$_.filter(this.GradesOrdered,["Curso",1])},GradesEC:function(){return this.$_.filter(this.GradesOrdered,["Curso",2])},GradesSI:function(){return this.$_.filter(this.GradesOrdered,["Curso",3])},GradesCCD:function(){return this.$_.filter(this.GradesOrdered,["Curso",4])},isEditing:function(){return null!=this.gradeSelected}})},p=m,h=(a("a65f"),a("2877")),v=Object(h["a"])(p,r,i,!1,null,"7d735a00",null);t["default"]=v.exports},a65f:function(e,t,a){"use strict";var r=a("a8c0"),i=a.n(r);i.a},a8c0:function(e,t,a){}}]);
//# sourceMappingURL=chunk-07d1243c.3d2ad45b.js.map