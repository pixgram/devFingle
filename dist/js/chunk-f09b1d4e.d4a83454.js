(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f09b1d4e"],{"17c0":function(t,e,n){},"31a3":function(t,e,n){},"3e97":function(t,e,n){},"5b81":function(t,e,n){"use strict";var r=n("23e7"),o=n("da84"),s=n("c65b"),a=n("e330"),i=n("1d80"),c=n("1626"),l=n("44e7"),u=n("577e"),p=n("dc4a"),d=n("ad6d"),m=n("0cb2"),f=n("b622"),g=n("c430"),y=f("replace"),h=RegExp.prototype,w=o.TypeError,C=a(d),v=a("".indexOf),b=a("".replace),k=a("".slice),_=Math.max,S=function(t,e,n){return n>t.length?-1:""===e?n:v(t,e,n)};r({target:"String",proto:!0},{replaceAll:function(t,e){var n,r,o,a,d,f,T,q,x,O=i(this),N=0,I=0,R="";if(null!=t){if(n=l(t),n&&(r=u(i("flags"in h?t.flags:C(t))),!~v(r,"g")))throw w("`.replaceAll` does not allow non-global regexes");if(o=p(t,y),o)return s(o,t,O,e);if(g&&n)return b(u(O),t,e)}a=u(O),d=u(t),f=c(e),f||(e=u(e)),T=d.length,q=_(1,T),N=S(a,d,0);while(-1!==N)x=f?u(e(d,N,a)):m(d,a,N,[],void 0,e),R+=k(a,I,N)+x,I=N+T,N=S(a,d,N+q);return I<a.length&&(R+=k(a,I)),R}})},daea:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("container",[n("fade-title"),n("sticky-item",[n("form-input",{ref:"searchInput",attrs:{type:"search",placeholder:"검색어를 입력해주세요.",maxlength:"20"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search.apply(null,arguments)}},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}},[n("button",{staticClass:"search",attrs:{type:"button"},on:{click:t.search}},[t._v("검색")])])],1),n("sticky-item",{directives:[{name:"show",rawName:"v-show",value:!t.afterKeyword,expression:"!afterKeyword"}]},[n("tab-item",{attrs:{list:t.category.list,name:"category",active:t.category.active},on:{"update:active":function(e){return t.$set(t.category,"active",e)}}})],1),t.afterKeyword||"CTS00101"!==t.category.active?[n("div",{staticClass:"post-wrap"},[t.afterKeyword&&t.totalElements?n("div",{staticClass:"search-total"},[n("span",{staticClass:"mint-50"},[t._v("‘"+t._s(t.afterKeyword)+"’")]),t._v("에 대한 검색결과가 "+t._s(t.totalElements)+"건 있습니다. ")]):t._e(),n("post-tab-list",{attrs:{listData:t.listData},on:{postModal:t.openViewModal}})],1),n("infinite-loading",{attrs:{identifier:t.infiniteId},on:{infinite:function(e){t.infiniteHandler(e,t.fetchData())}}},[n("div",{attrs:{slot:"spinner"},slot:"spinner"}),n("div",{attrs:{slot:"no-results"},slot:"no-results"},[t.afterKeyword&&!t.listData.length?n("no-data",{scopedSlots:t._u([{key:"icon",fn:function(){return[n("i",{staticClass:"icon-none"})]},proxy:!0},{key:"text",fn:function(){return[[t._v(" ‘"+t._s(t.afterKeyword)+"’ 에 대한 검색 결과가 없습니다. ")]]},proxy:!0}],null,!1,2576341894)}):n("no-data",{scopedSlots:t._u([{key:"icon",fn:function(){return[n("i",{staticClass:"icon-ellipsis"})]},proxy:!0}],null,!1,3097121407)})],1),n("div",{attrs:{slot:"no-more"},slot:"no-more"})])]:[n("div",{staticClass:"recommend-wrap"},t._l(t.recommend,(function(e,r){return n("post-recommend",{key:r,attrs:{listData:e,userName:t.custNm},on:{postModal:t.openViewModal}})})),1)],n("modalView",{attrs:{name:"post-view",type:"full"},model:{value:t.chosenItem,callback:function(e){t.chosenItem=e},expression:"chosenItem"}})],2)},o=[],s=n("5530"),a=n("1da1"),i=(n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),n("ac1f"),n("5319"),n("159b"),n("5b81"),n("e166")),c=n.n(i),l=n("9db9"),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"recommend-section"},[n("h4",{staticClass:"title-3"},["COA02301"===t.listData.id?n("strong",[t._v(t._s(t.userName))]):t._e(),t._v(t._s(t.listData.title)+" ")]),t.listData.cont.length?n("swiper",{staticClass:"recommend-list",attrs:{options:t.swiperOptions}},t._l(t.listData.cont,(function(e,r){return n("swiper-slide",{key:e.postCtgrCd+r},[n("button",{staticClass:"post-item",attrs:{type:"button"},on:{click:function(n){return t.$emit("postModal",e.postRcmInqCd,e.postSno)}}},[n("span",{staticClass:"img"},[n("img",{attrs:{src:e.listFile.urlPth,alt:""},on:{error:t.noImage}})]),n("span",{staticClass:"post-info"},[n("span",{staticClass:"flex-flag-group"},[n("span",{class:t.categoryType(e)},[t._v(t._s(e.postCtgr))]),e.quizInclYn?[e.quizCompYn?n("span",{staticClass:"flag-gray-md"},[t._v(" 퀴즈 완료 ")]):n("span",{staticClass:"flag-darkgray-md"},[t._v(" 퀴즈 ")])]:t._e()],2),n("strong",{staticClass:"item-title"},[t._v(t._s(e.ttlNm))]),n("ul",{staticClass:"viewer"},[n("li",{staticClass:"hit"},[t._v(t._s(e.inqTims))]),n("li",{staticClass:"share"},[t._v(t._s(e.cmmnTims))]),n("li",{staticClass:"bookmark"},[t._v(t._s(e.bkmkTims))])])])])])})),1):n("div",{attrs:{slot:"no-results"},slot:"no-results"},[n("no-data",{scopedSlots:t._u([{key:"icon",fn:function(){return[n("i",{staticClass:"icon-ellipsis"})]},proxy:!0}])})],1)],1)},p=[],d=n("7212"),m=(n("a7a3"),{name:"post-recommend",props:{userName:{type:String,required:!0},listData:{type:Object,required:!0}},components:{Swiper:d["Swiper"],SwiperSlide:d["SwiperSlide"]},data:function(){return{swiperOptions:{slidesPerView:"auto"}}},methods:{categoryType:function(t){switch(t.postCtgrCd){case"CTS00103":return"flag-orange-md";case"CTS00104":return"flag-purple-md";case"CTS00105":return"flag-sub-md";default:return"flag-sub-md"}}}}),f=m,g=(n("f5d8"),n("2877")),y=Object(g["a"])(f,u,p,!1,null,"7270d2ca",null),h=y.exports,w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{staticClass:"post-list"},t._l(t.listData,(function(e,r){return n("li",{key:r},[n("button",{staticClass:"post-item",attrs:{type:"button"},on:{click:function(n){return t.$emit("postModal",e.postCtgrCd,e.postSno)}}},[n("span",{staticClass:"img"},[n("img",{attrs:{src:e.listFile.urlPth,alt:""},on:{error:t.noImage}})]),n("span",{staticClass:"post-info"},[n("span",{staticClass:"flex-flag-group"},[e.postCtgrCd?n("span",{class:t.categoryType(e.postCtgrCd)},[t._v(" "+t._s(e.postCtgr)+" ")]):t._e(),e.quizInclYn?[e.quizCompYn?n("span",{staticClass:"flag-gray-md"},[t._v(" 퀴즈 완료 ")]):n("span",{staticClass:"flag-darkgray-md"},[t._v(" 퀴즈 ")])]:t._e()],2),n("strong",{staticClass:"item-title",domProps:{innerHTML:t._s(e.ttlNm)}}),n("ul",{staticClass:"viewer"},[n("li",{staticClass:"hit"},[t._v(t._s(e.inqTims))]),n("li",{staticClass:"share"},[t._v(t._s(e.cmmnTims))]),n("li",{staticClass:"bookmark"},[t._v(t._s(e.bkmkTims))])])])])])})),0)},C=[],v={name:"post-tab-list",props:{listData:{type:Array,required:!0}},methods:{categoryType:function(t){switch(t){case"CTS00103":return"flag-orange-md";case"CTS00104":return"flag-purple-md";case"CTS00105":return"flag-sub-md";default:return"flag-sub-md"}}}},b=v,k=(n("df41"),Object(g["a"])(b,w,C,!1,null,"56b078e7",null)),_=k.exports,S=n("e168"),T={name:"post-list",components:{infiniteLoading:c.a,postRecommend:h,postTabList:_,modalView:function(){return n.e("chunk-eb5f0978").then(n.bind(null,"a55a"))}},metaInfo:function(){return{meta:[{property:"og:title",content:"꼭 필요한 놓치면 안 될 꿀팁",vmid:"og:title"},{property:"og:description",content:"똑똑한 금융 생활을 위해 꼭 필요한 정보, 핑글의 엄선된 포스트를 만나보세요.",vmid:"og:description"},{property:"og:image",content:window.location.protocol+"//"+window.location.host+"/images/img_share_post.png",vmid:"og:image"},{property:"og:shareurl",content:window.location.protocol+"//"+window.location.host+this.$route.fullPath,vmid:"og:shareurl"},{property:"og:btnname",content:"포스트 확인하기",vmid:"og:btnname"}]}},mixins:[l["a"]],data:function(){return{custNm:"",afterKeyword:"",keyword:"",totalElements:"",totalPages:999,chosenItem:{postCtgrCd:"",postSno:0},category:{active:this.$route.query.category,list:[{title:"추천",id:"CTS00101"},{title:"보험",id:"CTS00102"},{title:"건강",id:"CTS00103"},{title:"금융",id:"CTS00104"},{title:"핑글팁",id:"CTS00105"}]},listData:[{quizCompYn:!1,postCtgrCd:"",postCtgr:"",ttlNm:"",inqTims:0,cmmnTims:0,postSno:0,quizInclYn:!1,bkmkTims:0,listFile:{fileGrpSno:0,fileSno:0,orgFileNm:"",fileCpc:0,fileTypNm:"",urlPth:""}}],recommend:[{id:"COA02302",title:"따끈따끈 최신 포스트",cont:[{postRcmInqCd:"",postSno:0,postCtgr:"",ttlNm:"",listImgPth:"",inqTims:0,cmmnTims:0,bkmkTims:0,quizInclYn:!1,quizCompYn:!1,listFile:{fileGrpSno:0,fileSno:0,orgFileNm:"",fileCpc:0,fileTypNm:"",urlPth:""}}]},{id:"COA02303",title:"지금 많이 보는 포스트",cont:[{postRcmInqCd:"",postSno:0,postCtgr:"",ttlNm:"",inqTims:0,cmmnTims:0,bkmkTims:0,quizInclYn:!1,quizCompYn:!1,listFile:{fileGrpSno:0,fileSno:0,orgFileNm:"",fileCpc:0,fileTypNm:"",urlPth:""}}]}]}},watch:{"category.active":function(){this.changeSort()}},beforeRouteUpdate:function(t,e,n){var r=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:window.scrollTo(0,0),r.changeSort(),r.loadAction(t.query),n();case 4:case"end":return e.stop()}}),e)})))()},created:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.keyword=t.$route.query.keyword||"",e.next=3,t.fetchCategory();case 3:return e.next=5,t.loadAction(t.$route.query);case 5:case"end":return e.stop()}}),e)})))()},mounted:function(){},methods:{openViewModal:function(t,e){this.chosenItem.postSno=e,void 0===this.$route.query.category?this.$router.replace({query:Object(s["a"])(Object(s["a"])({},this.$route.query),{},{modal:"post-view",seq:e,category:t})}):this.$router.replace({query:Object(s["a"])(Object(s["a"])({},this.$route.query),{},{modal:"post-view",seq:e})})},search:function(){this.keyword?(window.scrollTo(0,0),this.$router.push({query:{keyword:this.keyword}}).catch((function(){}))):this.$router.push("/post")},loadAction:function(t){var e=t.category,n=t.keyword;console.log("routerQuery",t),n?(this.keyword=n,this.category.active=""):(this.category.active=e||"CTS00101",this.afterKeyword="",this.keyword="","CTS00101"!==e&&""!==e&&(e||n)&&"COA02303"!==e&&"COA02302"!==e&&"COA02303"!==e||(this.category.active="CTS00101",this.fetchRecData()))},fetchCategory:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.changeSort(),e.prev=1,t.category.list=[],e.next=5,Object(S["a"])();case 5:n=e.sent,r=n.data,r.list.forEach((function(e){t.category.list.push({id:e.cd,title:e.cdNm})})),t.category.active=t.$route.query.category||t.category.list[0].id,e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](1),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[1,11]])})))()},fetchRecData:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(S["e"])();case 3:return n=e.sent,r=n.data,t.custNm=r.custNm,r.list.forEach((function(e){t.recommend.forEach((function(t){t.id===e.postRcmInqCd&&(t.cont=e.dataList)}))})),e.abrupt("return",t.recommend);case 10:e.prev=10,e.t0=e["catch"](0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))()},fetchData:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var n,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("in"),e.prev=1,e.next=4,Object(S["c"])({postCtgrCd:t.category.active||"",page:t.page,size:t.size,keyword:t.keyword});case 4:return n=e.sent,r=n.data,t.totalElements=r.totalElements,t.totalPages=r.totalPages,t.afterKeyword=t.keyword,o=r.list,t.keyword.length>0&&o.forEach((function(e){e.ttlNm=e.ttlNm.replaceAll(t.keyword,'<span class="mint-50">'.concat(t.keyword,"</span>"))})),e.abrupt("return",o);case 14:e.prev=14,e.t0=e["catch"](1),console.log(e.t0);case 17:case"end":return e.stop()}}),e,null,[[1,14]])})))()}}},q=T,x=(n("fb02"),Object(g["a"])(q,r,o,!1,null,"7a9f2b04",null));e["default"]=x.exports},df41:function(t,e,n){"use strict";n("17c0")},e168:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"e",(function(){return s})),n.d(e,"c",(function(){return a})),n.d(e,"b",(function(){return i})),n.d(e,"d",(function(){return c})),n.d(e,"f",(function(){return l})),n.d(e,"g",(function(){return u}));var r=n("365c");function o(){return r["a"].get("/ccomgroup/CTS001")}function s(){return r["a"].get("/ccon0101r001")}function a(t){return r["a"].get("/ccon0101r002",{params:t})}function i(t){return r["a"].get("/ccon0201r001",{params:t})}function c(t){return r["a"].get("/ccon0201r002",{params:t})}function l(t){return r["a"].post("/ccon0201c002",t)}function u(t){return r["a"].post("/ccon0201c001",t)}},f5d8:function(t,e,n){"use strict";n("3e97")},fb02:function(t,e,n){"use strict";n("31a3")}}]);
//# sourceMappingURL=chunk-f09b1d4e.d4a83454.js.map