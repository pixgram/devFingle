(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-53f1cf78","chunk-53f1cf78"],{"0163":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("modal",{attrs:{name:"imageGallery",type:"full",width:"auto",classes:["image-gallery"]},on:{open:e.open},scopedSlots:e._u([{key:"content",fn:function(){return[e.imageList.length?i("swiper",{ref:"mySwiper",staticClass:"swiper",attrs:{options:e.swiperOption,cleanupStylesOnDestroy:!1}},e._l(e.imageList,(function(t,n){return i("swiper-slide",{key:n},[i("pinch-zoom",{ref:"pinch",refInFor:!0,attrs:{disableZoomControl:"disable",limitPan:!0,limitZoom:5}},[i("img",{attrs:{src:t.urlPth,alt:t.fileNm},on:{error:e.noImage}})])],1)})),1):i("div",[e._v("no data")])]},proxy:!0}])})},r=[],o=i("8a46"),a=i.n(o),s=i("7212"),l=(i("a7a3"),{name:"imageGallery",props:["imageList","idx"],components:{Swiper:s["Swiper"],SwiperSlide:s["SwiperSlide"],PinchZoom:a.a},data:function(){var e=this;return{swiperOption:{on:{touchStart:function(){var t=e.$refs.mySwiper.$swiper;t.allowTouchMove=!e.$refs.pinch[t.realIndex].isZoomedIn,t.update()}},touchStartPreventDefault:!1}}},methods:{open:function(){var e=this;this.$nextTick((function(){e.$refs.mySwiper.$swiper.slideTo(e.idx,0)}))}}}),c=l,p=(i("2868"),i("2877")),u=Object(p["a"])(c,n,r,!1,null,"630088c1",null);t["default"]=u.exports},2586:function(e,t,i){},2868:function(e,t,i){"use strict";i("2586")}}]);
//# sourceMappingURL=chunk-53f1cf78.8f332983.js.map