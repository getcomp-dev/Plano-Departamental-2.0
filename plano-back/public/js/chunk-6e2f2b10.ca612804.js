(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e2f2b10","chunk-c39d30b2"],{"28a5":function(e,t,n){"use strict";var i=n("aae3"),a=n("cb7c"),o=n("ebd6"),r=n("0390"),l=n("9def"),c=n("5f1b"),u=n("520a"),f=n("79e5"),s=Math.min,d=[].push,g="split",h="length",b="lastIndex",p=4294967295,m=!f((function(){RegExp(p,"y")}));n("214f")("split",2,(function(e,t,n,f){var v;return v="c"=="abbc"[g](/(b)*/)[1]||4!="test"[g](/(?:)/,-1)[h]||2!="ab"[g](/(?:ab)*/)[h]||4!="."[g](/(.?)(.?)/)[h]||"."[g](/()()/)[h]>1||""[g](/.?/)[h]?function(e,t){var a=String(this);if(void 0===e&&0===t)return[];if(!i(e))return n.call(a,e,t);var o,r,l,c=[],f=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),s=0,g=void 0===t?p:t>>>0,m=new RegExp(e.source,f+"g");while(o=u.call(m,a)){if(r=m[b],r>s&&(c.push(a.slice(s,o.index)),o[h]>1&&o.index<a[h]&&d.apply(c,o.slice(1)),l=o[0][h],s=r,c[h]>=g))break;m[b]===o.index&&m[b]++}return s===a[h]?!l&&m.test("")||c.push(""):c.push(a.slice(s)),c[h]>g?c.slice(0,g):c}:"0"[g](void 0,0)[h]?function(e,t){return void 0===e&&0===t?[]:n.call(this,e,t)}:n,[function(n,i){var a=e(this),o=void 0==n?void 0:n[t];return void 0!==o?o.call(n,a,i):v.call(String(a),n,i)},function(e,t){var i=f(v,e,this,t,v!==n);if(i.done)return i.value;var u=a(e),d=String(this),g=o(u,RegExp),h=u.unicode,b=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(m?"y":"g"),x=new g(m?u:"^(?:"+u.source+")",b),S=void 0===t?p:t>>>0;if(0===S)return[];if(0===d.length)return null===c(x,d)?[d]:[];var z=0,w=0,y=[];while(w<d.length){x.lastIndex=m?w:0;var j,O=c(x,m?d:d.slice(w));if(null===O||(j=s(l(x.lastIndex+(m?0:w)),d.length))===z)w=r(d,w,h);else{if(y.push(d.slice(z,w)),y.length===S)return y;for(var E=1;E<=O.length-1;E++)if(y.push(O[E]),y.length===S)return y;w=z=j}}return y.push(d.slice(z)),y}]}))},"2fdb":function(e,t,n){"use strict";var i=n("5ca1"),a=n("d2c8"),o="includes";i(i.P+i.F*n("5147")(o),"String",{includes:function(e){return!!~a(this,e,o).indexOf(e,arguments.length>1?arguments[1]:void 0)}})},5147:function(e,t,n){var i=n("2b4c")("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[i]=!1,!"/./"[e](t)}catch(a){}}return!0}},aae3:function(e,t,n){var i=n("d3f4"),a=n("2d95"),o=n("2b4c")("match");e.exports=function(e){var t;return i(e)&&(void 0!==(t=e[o])?!!t:"RegExp"==a(e))}},aecd:function(e,t,n){"use strict";n.r(t),n.d(t,"pdfPlanoDepartamental",(function(){return s}));n("6b54"),n("87b3"),n("78ce"),n("28a5"),n("6762"),n("2fdb"),n("ac6a"),n("f3e2"),n("96cf");var i=n("1da1"),a=n("1f72"),o=n("d4b9"),r=n("6740"),l=n("e499"),c=n.n(l),u=n("4ebb"),f=n.n(u);function s(e){return d.apply(this,arguments)}function d(){return d=Object(i["a"])(regeneratorRuntime.mark((function e(t){var n,i,l,u,f,s,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.disciplinasInTurmas,i=t.periodosAtivos,l=t.plano,u=[],e.next=4,Object(a["h"])();case 4:f=e.sent,s=Object(o["a"])(n,"codigo"),n.length&&i.length?i.forEach((function(e,t){var n="";2!==e.id&&4!==e.id||(n=e.nome.includes("(")?e.nome.split(" ")[1]+" ":""),u.push(Object(a["q"])({images:f,plano:l,title:"Relação de turmas oferecidas",subtitle:"".concat(e.id,"º Período Letivo ").concat(n)}));var o=!1;s.forEach((function(t){var n=Object(r["a"])(t.turmas,["periodo",e.id]);n.length&&(o=!0,u.push({style:"tableExample",table:{widths:[60,"*",72,40],headerRows:1,color:"#426",body:[[{text:t.codigo,alignment:"left",bold:!0,fontSize:9},{text:t.nome,alignment:"left",bold:!0,fontSize:9},{text:t.perfil.abreviacao,alignment:"center",bold:!0,fontSize:9},{text:Object(a["m"])(t)+" horas",alignment:"center",bold:!0,fontSize:9}]]},layout:{vLineWidth:function(){return 0}}}),n.forEach((function(e,t){u.push({style:"tableExample",table:{widths:[36,35,"*",18,36,28,32,42],headerRows:1,color:"#426",body:[[{text:"Turma: "+e.letra,alignment:"left",fontSize:8,bold:!0},{text:"Docentes: ",alignment:"left",fontSize:8,bold:!0},{text:Object(a["d"])(e),alignment:"left",fontSize:8,bold:!0},{text:"Sala: ",alignment:"left",fontSize:8,bold:!0},{text:Object(a["f"])(e),alignment:"left",fontSize:8,bold:!0},{text:"Horário: ",alignment:"left",fontSize:8,bold:!0},{text:Object(a["e"])(e),alignment:"left",fontSize:8,bold:!0},{text:"Vagas: "+Object(a["j"])(e),alignment:"left",fontSize:8,bold:!0}]]},layout:{hLineWidth:function(e){return 0===e?0===t?0:.5:0},vLineWidth:function(){return 0}}});var i=Object(a["i"])(e);if(i.length){var o=[[{text:""},{text:"Cód.",alignment:"left",bold:"true",fontSize:8},{text:"Curso",alignment:"left",bold:"true",fontSize:8},{text:"Grade",alignment:"center",bold:"true",fontSize:8},{text:"Extra",alignment:"center",bold:"true",fontSize:8},{text:"Total",alignment:"center",bold:"true",fontSize:8}]];i.forEach((function(e){var t=e.vagasPeriodizadas+e.vagasNaoPeriodizadas,n=Object(a["g"])(e.Curso);o.push([{text:""},{text:n.codigo,alignment:"left",fontSize:6},{text:n.nome,alignment:"left",fontSize:6},{text:e.vagasPeriodizadas,alignment:"center",fontSize:6},{text:e.vagasNaoPeriodizadas,alignment:"center",fontSize:6},{text:t,alignment:"center",fontSize:6}])})),u.push({style:"tableExample",table:{widths:[20,24,"*",24,24,24],color:"#426",body:o},layout:{hLineWidth:function(){return 0},vLineWidth:function(){return 0}},margin:[0,0,0,t+1===n.length?10:5]})}})))})),o||u.push(Object(a["p"])()),t+1!==i.length&&u.push({text:"",pageBreak:"before"})})):(u.push(Object(a["q"])({images:f,plano:l,title:"Relação de turmas oferecidas"})),u.push(Object(a["p"])())),d={info:{title:"Plano Departamental"},content:u,footer:function(e,t){return{columns:[{text:new Date(Date.now()).toLocaleString(),margin:[30,10,0,0],fontSize:8,alignment:"left"},{text:e.toString()+" de "+t,alignment:"right",margin:[0,10,30,0],fontSize:8}]}}},c.a.createPdf(d).open();case 9:case"end":return e.stop()}}),e)}))),d.apply(this,arguments)}c.a.vfs=f.a.pdfMake.vfs},d2c8:function(e,t,n){var i=n("aae3"),a=n("be13");e.exports=function(e,t,n){if(i(t))throw TypeError("String#"+n+" doesn't accept regex!");return String(a(e))}}}]);
//# sourceMappingURL=chunk-6e2f2b10.ca612804.js.map