(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d20960c"],{a997:function(t,n,e){"use strict";e.r(n);var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("h2",{staticClass:"h2"},[t._v("Default")]),e("button",{staticClass:"btn-primary-md",attrs:{type:"button"},on:{click:function(n){return t.$_alert("alert\nalert\nalert\nalert\nalert")}}},[t._v(" Alert ")]),e("highlightjs",{attrs:{code:t.code0}}),e("hr"),e("h2",{staticClass:"h2"},[t._v("Callback")]),e("button",{staticClass:"btn-primary-md",attrs:{type:"button"},on:{click:t.alertFn}},[t._v("Alert")]),e("highlightjs",{attrs:{code:t.code1_1}}),e("br"),e("br"),e("button",{staticClass:"btn-primary-md",attrs:{type:"button"},on:{click:t.confirmFn}},[t._v(" Confirm ")]),e("highlightjs",{attrs:{code:t.code2_1}}),e("highlightjs",{attrs:{code:t.code2_2}})],1)},a=[],c=e("1da1"),o=(e("96cf"),e("d57a")),l={name:"alert",mixins:[o["default"]],data:function(){return{code0:'<button\n  type="button"\n  class="btn-primary-md"\n  @click="$_alert(\'alert\\nalert\\nalert\\nalert\\nalert\')"\n>\n  Alert\n</button>',code1_1:'<button type="button" class="btn-primary-md" @click="alertFn">Alert</button>',code1_2:'async alertFn() {\n  await this.$_alert("alert\\nalert\\nalert\\nalert\\nalert");\n  console.log("확인1");\n},',code2_1:'<button type="button" class="btn-primary-md" @click="confirmFn">\n  Confirm\n</button>',code2_2:'async confirmFn() {\n  const cfm = await this.$_confirm(\n    "confirm\\nconfirm\\nconfirm\\nconfirm\\nconfirm"\n  );\n  if (cfm) {\n    console.log("확인2");\n  } else {\n    console.log("취소3");\n  }\n},'}},methods:{alertFn:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$_alert("alert\nalert\nalert\nalert\nalert");case 2:console.log("확인");case 3:case"end":return n.stop()}}),n)})))()},confirmFn:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function n(){var e;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$_confirm("confirm\nconfirm\nconfirm\nconfirm\nconfirm");case 2:e=n.sent,e?console.log("확인"):console.log("취소");case 4:case"end":return n.stop()}}),n)})))()}}},i=l,s=e("2877"),u=Object(s["a"])(i,r,a,!1,null,null,null);n["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d20960c.0c2c1938.js.map