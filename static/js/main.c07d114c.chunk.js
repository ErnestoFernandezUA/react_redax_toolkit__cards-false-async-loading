(this["webpackJsonpreact-typescript-starter-pack"]=this["webpackJsonpreact-typescript-starter-pack"]||[]).push([[0],{52:function(t,e,n){},54:function(t,e,n){},55:function(t,e,n){},58:function(t,e,n){},59:function(t,e,n){},60:function(t,e,n){},61:function(t,e,n){},62:function(t,e,n){},63:function(t,e,n){},64:function(t,e,n){"use strict";n.r(e);var o=n(2),r=n.n(o),a=n(30),i=n.n(a),c=n(31),s=n(18),l=n(8),u=s.b,d=s.c,b=n(11),h=n(6),j=n(12),f=n(10),p=n(66),O="https://picsum.photos",m=p.a.create({baseURL:O}),g=function(t){return Object(j.a)(Object(h.a)().mark((function e(){var n;return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.get(t);case 2:return n=e.sent,console.log("fetch to",O+t),e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})))()},x=function(t,e){return g("v2/list?page=".concat(t,"&limit=").concat(e))},v=Object(f.b)("server/fetchPhotos",function(){var t=Object(j.a)(Object(h.a)().mark((function t(e){var n,o,r,a;return Object(h.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.page,o=e.limit,r=void 0===o?100:o,t.next=3,x(n,r);case 3:return a=t.sent,t.abrupt("return",a);case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),y=Object(f.c)({name:"server",initialState:{storage:[],statusLoading:"idle",error:null,nextLoadingPhotoIndex:0,randomDelayLoading:!0},reducers:{add:function(t,e){var n;(n=t.storage).push.apply(n,Object(b.a)(e.payload))},sortById:function(t){t.storage.sort((function(t,e){return Number(t.id)-Number(e.id)}))},setStatusLoading:function(t,e){t.statusLoading=e.payload},setError:function(t,e){t.error=e.payload,t.statusLoading="failed"},loadNextPhoto:function(t){t.nextLoadingPhotoIndex+=1},setRandomDelay:function(t,e){t.randomDelayLoading=e.payload}},extraReducers:function(t){t.addCase(v.pending,(function(t){t.statusLoading="loading"})).addCase(v.fulfilled,(function(t,e){var n;e.payload.sort((function(t,e){return Number(t.id)-Number(e.id)})),(n=t.storage).push.apply(n,Object(b.a)(e.payload)),t.statusLoading="idle"})).addCase(v.rejected,(function(t){t.statusLoading="failed"}))}}),_=y.reducer,w=y.actions,N=(w.add,w.sortById,w.setStatusLoading,w.setError),C=w.loadNextPhoto,k=w.setRandomDelay,L=function(t){return t.server.storage},I=function(t){return t.server.statusLoading},F=function(t){return t.server.randomDelayLoading},S=function(t){try{t(v({page:1,limit:100}))}catch(e){t(N(e))}},H=(n(52),n(1)),P=function(){return Object(H.jsx)("div",{className:"Loader",children:Object(H.jsx)("div",{className:"Loader__content"})})},D=n(5),q=n.n(D),R={isVisible:!1,showDeleted:!1,width:350,height:250,"border-radius":5},E=Object(f.c)({name:"options",initialState:R,reducers:{setVisible:function(t,e){t.isVisible=e.payload},setWidth:function(t,e){e.payload>0&&e.payload<=350&&(t.width=e.payload)},setHeight:function(t,e){e.payload>0&&e.payload<=350&&(t.height=e.payload)},setBorderRadius:function(t,e){e.payload>=0&&e.payload<=50&&(t["border-radius"]=e.payload)},resetOptions:function(t){R},someFunction:function(t){t.showDeleted=!t.showDeleted}}}),M=E.reducer,B=E.actions,A=B.setVisible,V=B.setWidth,W=B.setHeight,T=B.setBorderRadius,z=(B.resetOptions,B.someFunction),J=function(t){return t.options.isVisible},K=function(t){return t.options.height},U=function(t){return t.options.width},G=function(t){return t.options["border-radius"]},Q=function(t){return t.options.showDeleted},X=(n(54),function(t){var e=t.content,n=e.author,o=e.download_url,r=e.status,a={width:d(U),minWidth:"200px",height:d(K),borderRadius:d(G),backgroundImage:"url(".concat(o,")"),backgroundSize:"cover",backgroundRepeat:"no-repeat"};return Object(H.jsxs)("div",{className:q()("Card",{CardLoader:"loading"===r}),style:a,children:["loading"===r&&Object(H.jsx)("div",{className:"CardLoader__content"}),"idle"===r&&Object(H.jsx)("div",{className:"Card--visible",children:Object(H.jsx)("div",{className:"Card__title",children:n})})]})}),Y=n(9);function Z(t,e){return t.findIndex((function(t){return t.requestId===e}))>=0}function $(t,e,n){return t.map((function(t){return t.requestId!==e?t:Object(Y.a)(Object(Y.a)(Object(Y.a)({},t),n),{},{status:"idle",requestId:null})}))}var tt=Object(f.b)("photo/fetchPhoto",function(){var t=Object(j.a)(Object(h.a)().mark((function t(e,n){var o,r,a,i,c;return Object(h.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o=n.getState(),r=o.server,a=r.storage[r.nextLoadingPhotoIndex],n.dispatch(C()),i=300,o.server.randomDelayLoading&&(i=1e3+3e3*Math.random()),t.next=8,new Promise((function(t){setTimeout((function(){return t(Object(Y.a)(Object(Y.a)({},a),{},{requestId:n.requestId,status:"loading"}))}),i)}));case 8:return c=t.sent,t.abrupt("return",c);case 10:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()),et=Object(f.c)({name:"photo",initialState:{list:[],deleted:[],onFill:!1,onFillLoadingStatus:"idle"},reducers:{changePhotoByRequestId:function(t,e){t.list.forEach((function(t){return t.requestId!==e.payload.requestId?t:Object(Y.a)(Object(Y.a)(Object(Y.a)({},t),e.payload.photo),{},{status:e.payload.status})}))},deletePhoto:function(t,e){if(e.payload){var n,o=t.list.findIndex((function(t){return t.id===e.payload}));if(o)(n=t.deleted).push.apply(n,Object(b.a)(t.list.splice(o,1)))}else t.list.length&&(t.deleted.push(t.list[t.list.length-1]),t.list.length-=1)},restorePhoto:function(t,e){if(e.payload){var n,o=t.deleted.findIndex((function(t){return t.id===e.payload}));if(o)(n=t.list).push.apply(n,Object(b.a)(t.deleted.splice(o,1)))}},restoreAll:function(t){var e;(e=t.list).push.apply(e,Object(b.a)(t.deleted)),t.deleted.length=0},setOnFill:function(t,e){t.onFill=e.payload},clear:function(t){var e;(e=t.deleted).push.apply(e,Object(b.a)(t.list.splice(1)))}},extraReducers:function(t){t.addCase(tt.pending,(function(t,e){t.onFill&&(t.onFillLoadingStatus="loading");var n={id:null,author:null,width:null,height:null,url:null,download_url:null,requestId:e.meta.requestId,status:"loading"};t.list.push(n)})).addCase(tt.fulfilled,(function(t,e){var n=e.meta.requestId;t.onFill&&(t.onFillLoadingStatus="idle"),Z(t.list,n)?t.list=$(t.list,n,e.payload):Z(t.deleted,n)&&(t.deleted=$(t.deleted,n,e.payload)),t.onFill&&"loading"===t.onFillLoadingStatus&&(t.onFillLoadingStatus="idle")})).addCase(tt.rejected,(function(){}))}}),nt=et.reducer,ot=et.actions,rt=(ot.changePhotoByRequestId,ot.deletePhoto),at=ot.restorePhoto,it=ot.restoreAll,ct=ot.setOnFill,st=ot.clear,lt=function(t){return t.photos.list},ut=function(t){return t.photos.deleted},dt=function(t){return t.photos.onFill},bt=function(t){return t.photos.onFillLoadingStatus},ht=(n(55),function(){var t=u(),e=d(dt),n=d(bt),r=d(lt),a=d(U),i=d(K),c=Object(o.useState)(0),s=Object(l.a)(c,2),b=s[0],h=s[1],j=window.innerWidth<1280?window.innerWidth:1280,f=Math.floor((j-40+20)/(a+20)),p=window.innerHeight-66-40-49.8,O=Math.floor((p+20)/(i+20));Object(o.useEffect)((function(){e&&"idle"===n&&r.length<b&&t(tt())})),Object(o.useEffect)((function(){return h(f*(O+1)),document.addEventListener("scroll",(function(){return m})),function(){return document.removeEventListener("scroll",(function(){return m}))}}),[]);var m=function(t){t.target.documentElement.scrollHeight-window.innerHeight-t.target.documentElement.scrollTop<100&&e&&h(b+f)};return Object(H.jsx)(H.Fragment,{children:Object(H.jsx)("ul",{className:q()("Container"),children:r.map((function(e){return Object(H.jsx)("li",{children:Object(H.jsx)(X,{content:e,onCross:function(){return t(rt(e.id))}})},e.requestId||e.id)}))})})}),jt=n(7),ft=n(13),pt=n(36),Ot=n.n(pt),mt=Object(jt.b)({photos:nt,options:M,server:_}),gt={key:"root",storage:Ot.a,whitelist:["photos","options"]},xt=Object(ft.g)(gt,mt),vt=Object(f.a)({reducer:xt,middleware:function(t){return t({serializableCheck:{ignoredActions:[ft.a,ft.f,ft.b,ft.c,ft.d,ft.e,"server"]}})}}),yt=vt,_t=Object(ft.h)(vt),wt=(n(58),function(){var t=u(),e=d(J),n=d(dt),r=d(J),a=Object(o.useRef)(null);console.log(d(L));var i=function(){return t(tt())},c=Object(o.useState)(!1),s=Object(l.a)(c,2),b=s[0],h=s[1],j=function(t){h(!t),function(t){t?a.current=setInterval(i,3e3):clearInterval(a.current)}(!t)};return Object(H.jsxs)("header",{className:"Header",children:[Object(H.jsx)("button",{type:"button",onClick:function(){return t(tt())},className:q()("Header__button"),children:"Add"}),Object(H.jsx)("button",{type:"button",onClick:function(){return t(rt())},className:q()("Header__button"),children:"Delete"}),Object(H.jsx)("button",{type:"button",onClick:function(){t(ct(!n))},className:q()("Header__button",{"Header__button--active":n}),children:"FillByThunk"}),Object(H.jsx)("button",{type:"button",onClick:function(){return j(b)},className:q()("Header__button",{"Header__button--active":b}),children:"FillBySetTimeInterval"}),Object(H.jsx)("button",{type:"button",onClick:function(){return t(st())},className:q()("Header__button"),children:"Clear"}),Object(H.jsx)("button",{type:"button",onClick:function(){return t(A(!e))},className:q()("Header__button",{"Header__button--active":r}),children:"Options"}),Object(H.jsx)("button",{type:"button",onClick:function(){return t(z())},className:q()("Header__button"),children:"Show Deleted"}),Object(H.jsx)("button",{type:"button",onClick:function(){return _t.purge(),void window.location.reload()},className:q()("Header__button"),children:"Purge"})]})}),Nt=n(23),Ct=(n(59),function(){var t=u(),e=d(J),n=d(U),r=d(K),a=d(G),i=d(F),c=Object(o.useState)({width:n,height:r,"border-radius":a}),s=Object(l.a)(c,2),b=s[0],h=b.width,j=b.height,f=b["border-radius"],p=s[1],O=function(t){var e=t.target,n=e.name,o=e.value;p((function(t){return Object(Y.a)(Object(Y.a)({},t),{},Object(Nt.a)({},n,+o))}))};return e?Object(H.jsx)("form",{onSubmit:function(e){return e.preventDefault(),t(V(h)),t(W(j)),t(T(f)),void t(A(!1))},className:"Options",children:Object(H.jsxs)("div",{children:[Object(H.jsx)("div",{className:"Options__field",children:Object(H.jsxs)("label",{htmlFor:"width",children:["width\xa0",Object(H.jsx)("input",{type:"text",name:"width",id:"width",onChange:O,className:"Options__input",value:h}),"\xa0px"]})}),Object(H.jsx)("div",{className:"Options__field",children:Object(H.jsxs)("label",{htmlFor:"height",children:["height\xa0",Object(H.jsx)("input",{type:"text",name:"height",id:"height",onChange:O,className:"Options__input",value:j}),"\xa0px"]})}),Object(H.jsx)("div",{className:"Options__field",children:Object(H.jsxs)("label",{htmlFor:"height",children:["border-radius\xa0",Object(H.jsx)("input",{type:"text",name:"border-radius",id:"height",onChange:O,className:"Options__input",value:f}),"\xa0px"]})}),Object(H.jsxs)("div",{className:"Options__field",children:["random delay\xa0",Object(H.jsx)("div",{role:"checkbox","aria-checked":"false","aria-labelledby":"delay",tabIndex:0,className:q()("custom-checkbox",{"custom-checkbox--checked":i}),onClick:function(){return t(k(!i))},onKeyDown:function(){}})]}),Object(H.jsx)("div",{className:"Options__field",children:Object(H.jsx)("button",{type:"submit",className:"Options__bottom",children:"Submit"})})]})}):null}),kt=(n(60),function(t){var e=t.closeModal,n=t.content,o=u();return Object(H.jsxs)("div",{className:"Modal",children:[Object(H.jsxs)("div",{className:"Modal__header",children:[Object(H.jsx)("h2",{children:"Deleted"}),Object(H.jsx)("button",{type:"button",onClick:function(){return e(!1)},className:q()("Modal__button"),children:"Close"}),Object(H.jsx)("button",{type:"button",onClick:function(){return o(it())},className:q()("Modal__button"),children:"Restore All"})]}),Object(H.jsx)("ul",{className:"Modal__list",children:n.map((function(t){return Object(H.jsx)("li",{children:Object(H.jsx)(X,{content:t,onCross:function(){return(e=t.id)?o(at(e)):null;var e}})},t.id||t.requestId)}))})]})}),Lt=(n(61),function(){var t=u(),e=d(I),n=d(ut),o=d(Q);return Object(H.jsxs)(H.Fragment,{children:[Object(H.jsx)(wt,{}),Object(H.jsxs)("main",{className:"HomePage__main",children:["loading"===e&&Object(H.jsx)(P,{}),"failed"===e&&Object(H.jsx)(H.Fragment,{children:"Error"}),"idle"===e&&Object(H.jsx)(ht,{})]}),o&&Object(H.jsx)(kt,{closeModal:function(){return t(z())},content:n}),Object(H.jsx)(Ct,{})]})}),It=(n(62),function(){var t=u(),e=d(L),n=Object(o.useState)(!0),r=Object(l.a)(n,2),a=r[0],i=r[1];return Object(o.useEffect)((function(){t(S)}),[]),e.length>0&&a&&i(!1),Object(H.jsx)(Lt,{})});n(63);i.a.createRoot(document.getElementById("root")).render(Object(H.jsx)(r.a.StrictMode,{children:Object(H.jsx)(s.a,{store:yt,children:Object(H.jsx)(c.a,{loading:null,persistor:_t,children:Object(H.jsx)(It,{})})})}))}},[[64,1,2]]]);
//# sourceMappingURL=main.c07d114c.chunk.js.map