(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-948df6ca"],{"17f3":function(e,t,r){},6204:function(e,t,r){"use strict";r("17f3")},befd:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"pedidos-container"},[r("input",{directives:[{name:"model",rawName:"v-model.number",value:e.pedidoForm.vagasPeriodizadas,expression:"pedidoForm.vagasPeriodizadas",modifiers:{number:!0}},{name:"focus-pedido",rawName:"v-focus-pedido"}],class:["input-pedidos",{empty:0==e.pedidoForm.vagasPeriodizadas}],attrs:{type:"text",title:"Vagas grade (periodizados)"},domProps:{value:e.pedidoForm.vagasPeriodizadas},on:{change:e.handleEditPedido,keypress:e.maskOnlyNumber,paste:function(e){e.preventDefault()},input:function(t){t.target.composing||e.$set(e.pedidoForm,"vagasPeriodizadas",e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}}),r("input",{directives:[{name:"model",rawName:"v-model.number",value:e.pedidoForm.vagasNaoPeriodizadas,expression:"pedidoForm.vagasNaoPeriodizadas",modifiers:{number:!0}},{name:"focus-pedido",rawName:"v-focus-pedido"}],class:["input-pedidos",{empty:0==e.pedidoForm.vagasNaoPeriodizadas}],attrs:{type:"text",title:"Vagas extra (não periodizados)"},domProps:{value:e.pedidoForm.vagasNaoPeriodizadas},on:{change:e.handleEditPedido,keypress:e.maskOnlyNumber,paste:function(e){e.preventDefault()},input:function(t){t.target.composing||e.$set(e.pedidoForm,"vagasNaoPeriodizadas",e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})])},i=[],o=(r("1c01"),r("58b2"),r("8e6e"),r("f3e2"),r("d25f"),r("ac6a"),r("456d"),r("a481"),r("96cf"),r("1da1")),n=r("ade3"),d=(r("c5f6"),r("758b")),s=r("9165"),u=r("2f62");function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){Object(n["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m={name:"InputsPedidosExternos",mixins:[s["m"],s["g"]],props:{turma:{type:Object,required:!0},index:{type:Number,required:!0}},data:function(){return{pedidoForm:null}},methods:c(c({},Object(u["b"])(["editPedidoExterno"])),{},{resetPedidoForm:function(){this.pedidoForm=Object(d["a"])(this.PedidosOfCurrentTurma)},handleEditPedido:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.setLoading({type:"partial",value:!0}),e.next=4,this.editPedidoExterno(this.pedidoForm);case 4:e.next=11;break;case 6:e.prev=6,e.t0=e["catch"](0),t="",e.t0.response.data.fullMessage&&(t+="<br/>"+e.t0.response.data.fullMessage.replace("\n","<br/>")),this.pushNotification({type:"error",title:"Erro ao atualizar pedido",text:t});case 11:return e.prev=11,this.setLoading({type:"partial",value:!1}),e.finish(11);case 14:case"end":return e.stop()}}),e,this,[[0,6,11,14]])})));function t(){return e.apply(this,arguments)}return t}()}),computed:c(c({},Object(u["c"])(["PedidosExternos"])),{},{PedidosOfCurrentTurma:function(){return this.PedidosExternos[this.turma.id][this.index]}}),watch:{PedidosOfCurrentTurma:{handler:"resetPedidoForm",immediate:!0}}},f=m,l=(r("6204"),r("2877")),v=Object(l["a"])(f,a,i,!1,null,"37a2cf4c",null);t["default"]=v.exports}}]);
//# sourceMappingURL=chunk-948df6ca.60c884d5.js.map