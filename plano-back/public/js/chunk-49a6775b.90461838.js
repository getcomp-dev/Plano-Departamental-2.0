(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-49a6775b"],{"6e38":function(i,e,a){},7529:function(i,e,a){"use strict";a.r(e);var t=function(){var i=this,e=i.$createElement,a=i._self._c||e;return a("div",{staticClass:"main-component row"},[a("PageHeader",{attrs:{title:"Disciplina na Grade"}},[a("BaseButton",{attrs:{template:"ajuda"},on:{click:function(e){return i.$refs.modalAjuda.toggle()}}})],1),a("div",{staticClass:"page-content"},[a("div",{staticClass:"div-table"},[a("BaseTable",{scopedSlots:i._u([{key:"thead",fn:function(){return[a("v-th-ordination",{attrs:{currentOrder:i.ordenacaoDisciplinasMain,orderToCheck:"periodo",width:"35",title:"Período"}},[i._v("\n            P.\n          ")]),a("v-th-ordination",{attrs:{currentOrder:i.ordenacaoDisciplinasMain,orderToCheck:"disciplina_codigo",width:"80",align:"start"}},[i._v("\n            Código\n          ")]),a("v-th-ordination",{attrs:{currentOrder:i.ordenacaoDisciplinasMain,orderToCheck:"disciplina_nome",width:"400",align:"start"}},[i._v("\n            Disciplina\n          ")])]},proxy:!0},{key:"tbody",fn:function(){return[i._l(i.DisciplinaGradesOrdered,(function(e){return[a("tr",{key:e.Disciplina,class:["clickable",{"bg-custom":i.isEven(e.periodo)},{"bg-selected":i.disciplinaSelectedId===e.Disciplina}],on:{click:function(a){return a.preventDefault(),i.handleClickInDisciplina(e)}}},[a("v-td",{attrs:{width:"35"}},[i._v(i._s(e.periodo))]),a("v-td",{attrs:{width:"80",align:"start"}},[i._v("\n                "+i._s(e.disciplina_codigo)+"\n              ")]),a("v-td",{attrs:{width:"400",align:"start"}},[i._v("\n                "+i._s(e.disciplina_nome)+"\n              ")])],1)]})),a("tr",{directives:[{name:"show",rawName:"v-show",value:!i.hasGradeSelected,expression:"!hasGradeSelected"}]},[a("v-td",{attrs:{width:"515",colspan:"3"}},[a("b",[i._v("Nenhuma disciplina encontrada")]),i._v("\n              , selecione uma grade.\n            ")])],1)]},proxy:!0}])})],1),a("Card",{attrs:{title:"Disciplinas"},scopedSlots:i._u([{key:"form-group",fn:function(){return[a("div",{staticClass:"row mb-2 mx-0"},[a("div",{staticClass:"form-group col m-0 px-0 mr-3"},[a("label",{staticClass:"col-form-label",attrs:{for:"cursoAtual"}},[i._v("Curso")]),a("select",{directives:[{name:"model",rawName:"v-model",value:i.currentCursoId,expression:"currentCursoId"}],staticClass:"form-control form-control-sm input-maior",attrs:{id:"cursoAtual"},on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,(function(i){return i.selected})).map((function(i){var e="_value"in i?i._value:i.value;return e}));i.currentCursoId=e.target.multiple?a:a[0]},function(e){return i.changeCurso()}]}},[a("option",{attrs:{value:"4"}},[i._v("Ciência da Computação Diurno")]),a("option",{attrs:{value:"1"}},[i._v("Ciência da Computação Noturno")]),a("option",{attrs:{value:"3"}},[i._v("Sistemas de Informação")]),a("option",{attrs:{value:"2"}},[i._v("Engenharia Computacional")])])]),a("div",{staticClass:"form-group m-0 px-0"},[a("label",{staticClass:"col-form-label",attrs:{for:"gradeSelect"}},[i._v("Grade")]),a("select",{directives:[{name:"model",rawName:"v-model",value:i.currentGradeId,expression:"currentGradeId"}],staticClass:"form-control form-control-sm input-menor",attrs:{disabled:!i.hasCursoSelected,id:"gradeSelect"},on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,(function(i){return i.selected})).map((function(i){var e="_value"in i?i._value:i.value;return e}));i.currentGradeId=e.target.multiple?a:a[0]},function(e){return i.changeGrade()}]}},i._l(i.GradesFiltredByCurrentCurso,(function(e){return a("option",{key:e.id+e.nome,domProps:{value:e.id}},[i._v("\n                "+i._s(e.nome)+"\n              ")])})),0)])]),a("div",{staticClass:"w-100 border mt-3 mb-2"}),a("div",{staticClass:"row mb-2 mx-0"},[a("div",{staticClass:"form-group m-0 col px-0"},[a("label",{staticClass:"col-form-label",attrs:{required:"",for:"disciplina"}},[i._v("Disciplina")]),a("select",{directives:[{name:"model",rawName:"v-model",value:i.disciplinaGradeForm.Disciplina,expression:"disciplinaGradeForm.Disciplina"}],staticClass:"form-control form-control-sm input-maior2",attrs:{disabled:!i.hasGradeSelected,type:"text",id:"disciplina"},on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,(function(i){return i.selected})).map((function(i){var e="_value"in i?i._value:i.value;return e}));i.$set(i.disciplinaGradeForm,"Disciplina",e.target.multiple?a:a[0])},function(e){return i.clearClick()}]}},[0===i.Disciplinas.length?a("option",{attrs:{type:"text",value:""}},[i._v("\n                Nenhuma Disciplina Encontrada\n              ")]):i._l(i.Disciplinas,(function(e){return a("option",{key:e.id+e.nome,domProps:{value:e.id}},[i._v("\n                "+i._s(e.nome)+"\n              ")])}))],2)])]),a("div",{staticClass:"row mb-2 mx-0"},[a("div",{staticClass:"form-group m-0 col px-0"},[a("label",{staticClass:"col-form-label pb-1",attrs:{required:"",for:"periodoDisciplina"}},[i._v("\n              Período\n            ")]),a("div",{staticClass:"d-flex align-items-center"},[a("input",{directives:[{name:"model",rawName:"v-model",value:i.disciplinaGradeForm.periodo,expression:"disciplinaGradeForm.periodo"}],staticClass:"form-control form-control-sm input-menor2",attrs:{disabled:!i.hasGradeSelected,type:"text",id:"periodoDisciplina"},domProps:{value:i.disciplinaGradeForm.periodo},on:{keypress:i.maskOnlyNumber,input:function(e){e.target.composing||i.$set(i.disciplinaGradeForm,"periodo",e.target.value)}}}),a("BaseButton",{attrs:{disabled:!i.hasGradeSelected,template:"salvar",title:"Salvar período"},on:{click:function(e){return i.editDisciplinaGrade()}}})],1)])])]},proxy:!0},{key:"footer",fn:function(){return[a("BaseButton",{directives:[{name:"show",rawName:"v-show",value:!i.isEditDisciplina,expression:"!isEditDisciplina"}],attrs:{template:"adicionar",title:"Adicionar à Grade",disabled:!i.hasGradeSelected},on:{click:i.addDisciplinaGrade}}),a("BaseButton",{attrs:{template:"deletar",title:"Deletar Disciplina",disabled:!i.hasGradeSelected},on:{click:i.openModalDelete}}),a("BaseButton",{attrs:{template:"cancelar",disabled:!i.hasGradeSelected},on:{click:i.cleanDisciplina}})]},proxy:!0}])})],1),a("ModalDelete",{ref:"modalDelete",attrs:{isDeleting:i.isEditDisciplina},on:{"btn-deletar":i.deleteDisciplinaGrade}},[i.isEditDisciplina?a("li",{staticClass:"list-group-item"},[a("span",[i._v("\n        Tem certeza que deseja excluír a disciplina\n        "),a("b",[i._v(i._s(i.nomeDisciplinaAtual))]),i._v("\n        ?\n      ")])]):a("li",{staticClass:"list-group-item"},[i._v("Nenhuma disciplina selecionada.")])]),a("ModalAjuda",{ref:"modalAjuda"},[a("li",{staticClass:"list-group-item"},[a("b",[i._v("Visualizar conteúdo:")]),i._v("\n      Na parte superior do cartão à direita, selecione o curso e a grade que deseja\n      visualizar.\n    ")]),a("li",{staticClass:"list-group-item"},[a("b",[i._v("Adicionar:")]),i._v("\n      Para adicionar uma disciplinas à grade selecionada, com a parte de baixo do cartão\n      à direita em branco, preencha-a e em seguida clique em Adicionar\n      "),a("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","plus"]}}),i._v("\n      .\n    ")],1),a("li",{staticClass:"list-group-item"},[a("b",[i._v("Editar:")]),i._v("\n      Para editar uma disciplinas da grade selecionada clique na linha da tabela da\n      disciplina que deseja alterar. Em seguida, no cartão à direita, altere as\n      informações que desejar e clique em Salvar\n      "),a("font-awesome-icon",{staticClass:"icon-green",attrs:{icon:["fas","check"]}}),i._v("\n      .\n    ")],1),a("li",{staticClass:"list-group-item"},[a("b",[i._v("Deletar:")]),i._v("\n      Clique na linha da tabela da disciplina que deseja remover. Em seguida, no cartão\n      à direita, clique em Remover\n      "),a("font-awesome-icon",{staticClass:"icon-red",attrs:{icon:["fas","trash-alt"]}}),i._v("\n      e confirme a remoção na janela que será aberta.\n    ")],1),a("li",{staticClass:"list-group-item"},[a("b",[i._v("Limpar:")]),i._v("\n      No cartão à direita, clique em Cancelar\n      "),a("font-awesome-icon",{staticClass:"icon-gray",attrs:{icon:["fas","times"]}}),i._v("\n      , para limpar as informações da disciplina porém a grade continuará selecionada.\n    ")],1),a("li",{staticClass:"list-group-item"},[a("b",[i._v("Ordenar:")]),i._v("\n      Clique no cabeçalho da tabela, na coluna desejada, para alterar a ordenação das\n      informações.\n    ")])])],1)},r=[],n=(a("d25f"),a("a481"),a("7514"),a("32c7")),s=a("4448"),o=a("9165"),l=a("25df"),c=a("d027"),d={id:void 0,periodoInicio:void 0,Curso:void 0,nome:void 0},u={periodo:void 0,Disciplina:void 0,Grade:void 0},p={name:"DashboardGradeEdit",mixins:[o["j"]],components:{Card:l["b"],ModalAjuda:c["a"],ModalDelete:c["b"]},data:function(){return{gradeForm:this.$_.clone(d),disciplinaGradeForm:this.$_.clone(u),error:null,currentGradeId:null,currentCursoId:null,disciplinaSelectedId:null,nomeDisciplinaAtual:null,ordenacaoDisciplinasMain:{order:"periodo",type:"asc"}}},methods:{openModalDelete:function(){this.$refs.modalDelete.open()},handleClickInDisciplina:function(i){this.disciplinaSelectedId=i.Disciplina,this.nomeDisciplinaAtual=i.disciplina_nome,this.showDisciplina(i),this.showGrade(this.currentGradeId)},clearClick:function(){this.disciplinaSelectedId=null,this.nomeDisciplinaAtual=null},deleteGrade:function(){var i=this,e=this.gradeForm.nome;n["a"].delete(this.gradeForm.id,this.gradeForm).then((function(){i.cleanGradeForm(),i.$notify({group:"general",title:"Sucesso!",text:"A Grade ".concat(e," foi excluída!"),type:"success"})})).catch((function(){i.error="<b>Erro ao excluir Grade</b>",i.$notify({group:"general",title:"Erro!",text:i.error,type:"error"})}))},cleanGradeForm:function(){this.gradeForm=this.$_.clone(d),this.error=void 0},cleanDisciplina:function(){this.clearClick(),this.disciplinaGradeForm.periodo=void 0,this.disciplinaGradeForm.Disciplina=void 0},showGrade:function(i){this.cleanGradeForm();var e=this.$_.find(this.$store.state.grade.Grades,["id",i]);this.gradeForm=this.$_.clone(e),this.disciplinaGradeForm.Grade=this.gradeForm.id},changeCurso:function(){this.cleanDisciplina(),this.cleanGradeForm(),this.currentGradeId=null},changeGrade:function(){this.cleanDisciplina(),null!=this.currentGradeId&&this.showGrade(this.currentGradeId)},showDisciplina:function(i){this.cleanDisciplina,this.disciplinaGradeForm=this.$_.clone(i)},isEven:function(i){return i%2===0},addGrade:function(){var i=this;n["a"].create(this.gradeForm).then((function(e){i.cleanGradeForm(),i.$notify({group:"general",title:"Sucesso!",text:"A Grade ".concat(e.Grade.nome," foi criada!"),type:"success"})})).catch((function(e){i.error="<b>Erro ao criar Grade</b>",e.response.data.fullMessage&&(i.error+="<br/>"+e.response.data.fullMessage.replace("\n","<br/>")),i.$notify({group:"general",title:"Erro!",text:i.error,type:"error"})}))},editGrade:function(){var i=this;n["a"].update(this.gradeForm.id,this.gradeForm).then((function(e){i.$notify({group:"general",title:"Sucesso!",text:"A Grade ".concat(e.Grade.nome," foi atualizada!"),type:"success"})})).catch((function(){i.error="<b>Erro ao atualizar Grade</b>",i.$notify({group:"general",title:"Erro!",text:i.error,type:"error"})}))},addDisciplinaGrade:function(){var i=this,e=null;for(var a in this.Disciplinas)if(this.Disciplinas[a].id==this.disciplinaGradeForm.Disciplina){e=this.Disciplinas[a].nome;break}s["a"].create(this.disciplinaGradeForm).then((function(){i.$notify({group:"general",title:"Sucesso!",text:"A Disciplina <b>".concat(e,"</b> foi adicionada à Grade <b>").concat(i.gradeForm.nome,"</b>!"),type:"success"})})).catch((function(){i.error="<b>Erro ao incluir Disciplina</b>",i.$notify({group:"general",title:"Erro!",text:i.error,type:"error"})}))},editDisciplinaGrade:function(){var i=this;s["a"].update(this.disciplinaGradeForm.Disciplina,this.disciplinaGradeForm.Grade,this.disciplinaGradeForm).then((function(){i.$notify({group:"general",title:"Sucesso!",text:"A Disciplina <b>".concat(i.nomeDisciplinaAtual,"</b> foi atualizada!"),type:"success"})})).catch((function(){i.error="<b>Erro ao atualizar Disciplina</b>",i.$notify({group:"general",title:"Erro!",text:i.error,type:"error"})}))},deleteDisciplinaGrade:function(){var i=this;s["a"].delete(this.disciplinaGradeForm.Disciplina,this.disciplinaGradeForm.Grade,this.disciplinaGradeForm).then((function(){i.$notify({group:"general",title:"Sucesso!",text:"A Disciplina <b>".concat(i.nomeDisciplinaAtual,"</b> foi excluída!"),type:"success"}),i.clearClick()})).catch((function(){i.error="<b>Erro ao excluir Disciplina</b>",i.$notify({group:"general",title:"Erro!",text:i.error,type:"error"})}))}},computed:{hasCursoSelected:function(){return null!=this.currentCursoId},hasGradeSelected:function(){return null!=this.currentGradeId},isEditDisciplina:function(){return null!==this.disciplinaSelectedId},DisciplinaGradesOrdered:function(){return this.$_.orderBy(this.DisciplinaGradesFiltred,this.ordenacaoDisciplinasMain.order,this.ordenacaoDisciplinasMain.type)},DisciplinaGradesFiltred:function(){var i=this;return this.$_.filter(this.$store.state.disciplinaGrade.DisciplinaGrades,(function(e){return i.$_.find(i.Disciplinas,(function(a){return i.currentGradeId===e.Grade&&a.id===e.Disciplina&&(e.disciplina_nome=a.nome,e.disciplina_codigo=a.codigo,!0)}))}))},GradesFiltredByCurrentCurso:function(){var i=this;return this.$_.filter(this.Grades,(function(e){return e.Curso==i.currentCursoId}))},Grades:function(){return this.$store.state.grade.Grades},Cursos:function(){return this.$store.state.curso.Cursos},Disciplinas:function(){return this.$_.orderBy(this.$store.state.disciplina.Disciplinas,"nome")}}},m=p,f=(a("ab40"),a("2877")),h=Object(f["a"])(m,t,r,!1,null,"e27e14dc",null);e["default"]=h.exports},ab40:function(i,e,a){"use strict";var t=a("6e38"),r=a.n(t);r.a}}]);
//# sourceMappingURL=chunk-49a6775b.90461838.js.map