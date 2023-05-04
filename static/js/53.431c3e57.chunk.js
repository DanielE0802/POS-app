(this["webpackJsonp@minimal/minimal-kit-react"]=this["webpackJsonp@minimal/minimal-kit-react"]||[]).push([[53],{1353:function(e,t){t.__esModule=!0,t.default={body:'<path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3S645.3 585.4 645.3 512S585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165c-3.1-64-17.7-120.8-64.5-167.6c-46.9-46.9-103.6-61.4-167.6-64.5c-55.2-3.1-109.9-2.6-165-2.6c-55.2 0-109.9-.5-165 2.6c-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6c46.9 46.9 103.6 61.4 167.6 64.5c55.2 3.1 109.9 2.6 165 2.6c55.2 0 109.9.5 165-2.6c64-3.1 120.8-17.7 167.6-64.5c46.9-46.9 61.4-103.6 64.5-167.6c3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9S717.1 398.5 717.1 512S625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9s47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z" fill="currentColor"/>',width:1024,height:1024}},2315:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return A}));var c=n(7),i=n(24),a=n(245),r=n.n(a),s=n(246),o=n.n(s),d=n(416),h=n.n(d),l=n(1353),j=n.n(l),u=n(8),x=n(202),b=n(1300),m=n(407),O=n(1286),f=n(1302),g=n(408),p=n(1305),v=n(17),y=n(1);var w=n(35),M=n(409),S=n(410),k=n(0),C=[{name:"Facebook",icon:Object(k.jsx)(i.a,{icon:o.a,width:24,height:24,color:"#1877F2"})},{name:"Instagram",icon:Object(k.jsx)(i.a,{icon:j.a,width:24,height:24,color:"#D7336D"})},{name:"Linkedin",icon:Object(k.jsx)(i.a,{icon:h.a,width:24,height:24,color:"#006097"})},{name:"Twitter",icon:Object(k.jsx)(i.a,{icon:r.a,width:24,height:24,color:"#1C9CEA"})}],z=Object(u.a)(M.a)((function(e){var t=e.theme;return{minHeight:"100%",display:"flex",alignItems:"center",paddingTop:t.spacing(15),paddingBottom:t.spacing(10)}})),I=Object(u.a)("div")({display:"flex",justifyContent:"center"}),D=Object(u.a)(x.a)((function(e){var t=e.theme;return Object(c.a)({margin:t.spacing(0,1)},t.breakpoints.up("sm"),{margin:t.spacing(0,2.5)})}));function A(){var e=function(e){var t=Object(y.useState)({days:"00",hours:"00",minutes:"00",seconds:"00"}),n=Object(v.a)(t,2),c=n[0],i=n[1];Object(y.useEffect)((function(){var e=setInterval((function(){return a()}),1e3);return function(){return clearInterval(e)}}),[]);var a=function(){var t=e-new Date,n=Math.floor(t/864e5),c="0".concat(Math.floor(t%864e5/36e5)).slice(-2),a="0".concat(Math.floor(t%36e5/6e4)).slice(-2),r="0".concat(Math.floor(t%6e4/1e3)).slice(-2);i({days:n||"000",hours:c||"000",minutes:a||"000",seconds:r||"000"})};return c}(new Date("07/07/2022 21:30"));return Object(k.jsx)(z,{title:"Coming Soon | Minimal-UI",children:Object(k.jsx)(b.a,{children:Object(k.jsxs)(m.a,{sx:{maxWidth:480,margin:"auto",textAlign:"center"},children:[Object(k.jsx)(x.a,{variant:"h3",paragraph:!0,children:"Coming Soon!"}),Object(k.jsx)(x.a,{sx:{color:"text.secondary"},children:"We are currently working hard on this page!"}),Object(k.jsx)(S.d,{sx:{my:10,height:240}}),Object(k.jsxs)(I,{children:[Object(k.jsxs)("div",{children:[Object(k.jsx)(x.a,{variant:"h2",children:e.days}),Object(k.jsx)(x.a,{sx:{color:"text.secondary"},children:"Days"})]}),Object(k.jsx)(D,{variant:"h2",children:":"}),Object(k.jsxs)("div",{children:[Object(k.jsx)(x.a,{variant:"h2",children:e.hours}),Object(k.jsx)(x.a,{sx:{color:"text.secondary"},children:"Hours"})]}),Object(k.jsx)(D,{variant:"h2",children:":"}),Object(k.jsxs)("div",{children:[Object(k.jsx)(x.a,{variant:"h2",children:e.minutes}),Object(k.jsx)(x.a,{sx:{color:"text.secondary"},children:"Minutes"})]}),Object(k.jsx)(D,{variant:"h2",children:":"}),Object(k.jsxs)("div",{children:[Object(k.jsx)(x.a,{variant:"h2",children:e.seconds}),Object(k.jsx)(x.a,{sx:{color:"text.secondary"},children:"Seconds"})]})]}),Object(k.jsx)(O.a,{fullWidth:!0,placeholder:"Enter your email",endAdornment:Object(k.jsx)(f.a,{position:"end",children:Object(k.jsx)(g.a,{variant:"contained",size:"large",children:"Notify Me"})}),sx:{my:5,pr:.5,transition:function(e){return e.transitions.create("box-shadow",{easing:e.transitions.easing.easeInOut,duration:e.transitions.duration.shorter})},"&.Mui-focused":{boxShadow:function(e){return e.customShadows.z8}},"& fieldset":{borderWidth:"1px !important",borderColor:function(e){return"".concat(e.palette.grey[50032]," !important")}}}}),Object(k.jsx)(m.a,{sx:{textAlign:"center","& > *":{mx:1}},children:C.map((function(e){return Object(k.jsx)(p.a,{title:e.name,children:Object(k.jsx)(w.d,{children:e.icon})},e.name)}))})]})})})}}}]);
//# sourceMappingURL=53.431c3e57.chunk.js.map