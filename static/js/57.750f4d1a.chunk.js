(this["webpackJsonp@minimal/minimal-kit-react"]=this["webpackJsonp@minimal/minimal-kit-react"]||[]).push([[57],{2303:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return U}));var r=a(7),i=a(1267),n=a(32),s=a(8),c=a(1312),l=a(1289),o=a(202),d=a(1300),j=a(407),m=a(1305),u=a(56),b=a(22),x=a(561),h=a(409),p=a(35),O=a(3),f=a(16),g=a.n(f),v=a(26),w=a(17),y=a(240),N=a(1),S=a(24),k=a(168),C=a(238),I=a(417),q=a.n(I),W=a(204),B=a.n(W),P=a(432),T=a.n(P),A=a(1196),D=a(1274),R=a(1306),z=a(1302),J=a(1291),V=a(1314),Y=a(172),_=a(0);function E(){var e=Object(u.a)().register,t=Object(Y.a)(),a=Object(k.useSnackbar)(),r=a.enqueueSnackbar,i=a.closeSnackbar,n=Object(N.useState)(!1),s=Object(w.a)(n,2),c=s[0],l=s[1],o=y.e().shape({firstName:y.g().min(3,"Ingrese un nombre valido").max(50,"Ingrese un nombre valido").required("Ingrese el nombre"),lastName:y.g().min(3,"Ingrese un apellido valido").max(50,"Ingrese un apellido m\xe1s corto").required("Ingrese el apellido"),email:y.g().email("Ingrese un correo valido").required("Correo es requerido"),password:y.g().required("La contrase\xf1a es requerida")}),d=Object(C.d)({initialValues:{firstName:"",lastName:"",email:"",password:""},validationSchema:o,onSubmit:function(){var a=Object(v.a)(g.a.mark((function a(n,s){var c,l;return g.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c=s.setErrors,l=s.setSubmitting,a.prev=1,a.next=4,e(n.email,n.password,n.firstName,n.lastName);case 4:r("Register success",{variant:"success",action:function(e){return Object(_.jsx)(p.d,{size:"small",onClick:function(){return i(e)},children:Object(_.jsx)(S.a,{icon:B.a})})}}),t.current&&l(!1),a.next=12;break;case 8:a.prev=8,a.t0=a.catch(1),console.error(a.t0),t.current&&(c({afterSubmit:a.t0.message}),l(!1));case 12:case"end":return a.stop()}}),a,null,[[1,8]])})));return function(e,t){return a.apply(this,arguments)}}()}),j=d.errors,m=d.touched,b=d.handleSubmit,x=d.isSubmitting,h=d.getFieldProps;return Object(_.jsx)(C.b,{value:d,children:Object(_.jsx)(C.a,{autoComplete:"off",noValidate:!0,onSubmit:b,children:Object(_.jsxs)(A.a,{spacing:3,children:[j.afterSubmit&&Object(_.jsx)(D.a,{severity:"error",children:j.afterSubmit}),Object(_.jsxs)(A.a,{direction:{xs:"column",sm:"row"},spacing:2,children:[Object(_.jsx)(R.a,Object(O.a)(Object(O.a)({fullWidth:!0,label:"Nombre"},h("firstName")),{},{error:Boolean(m.firstName&&j.firstName),helperText:m.firstName&&j.firstName})),Object(_.jsx)(R.a,Object(O.a)(Object(O.a)({fullWidth:!0,label:"Apellido"},h("lastName")),{},{error:Boolean(m.lastName&&j.lastName),helperText:m.lastName&&j.lastName}))]}),Object(_.jsx)(R.a,Object(O.a)(Object(O.a)({fullWidth:!0,autoComplete:"username",type:"email",label:"Correo electr\xf3nico"},h("email")),{},{error:Boolean(m.email&&j.email),helperText:m.email&&j.email})),Object(_.jsx)(R.a,Object(O.a)(Object(O.a)({fullWidth:!0,autoComplete:"current-password",type:c?"text":"password",label:"Contrase\xf1a"},h("password")),{},{InputProps:{endAdornment:Object(_.jsx)(z.a,{position:"end",children:Object(_.jsx)(J.a,{edge:"end",onClick:function(){return l((function(e){return!e}))},children:Object(_.jsx)(S.a,{icon:c?q.a:T.a})})})},error:Boolean(m.password&&j.password),helperText:m.password&&j.password})),Object(_.jsx)(V.a,{fullWidth:!0,size:"large",type:"submit",variant:"contained",loading:x,children:"Registrarse"})]})})})}var F=a(645),G=Object(s.a)(h.a)((function(e){var t=e.theme;return Object(r.a)({},t.breakpoints.up("md"),{display:"flex"})})),H=Object(s.a)(c.a)((function(e){return{width:"100%",maxWidth:464,display:"flex",flexDirection:"column",justifyContent:"center",margin:e.theme.spacing(2,0,2,2)}})),L=Object(s.a)("div")((function(e){return{maxWidth:480,margin:"auto",display:"flex",minHeight:"100vh",flexDirection:"column",justifyContent:"center",padding:e.theme.spacing(12,0)}}));function U(){var e=Object(u.a)().method;return Object(_.jsxs)(G,{title:"Register",children:[Object(_.jsxs)(x.a,{children:["\xbfYa tienes cuenta? \xa0",Object(_.jsx)(l.a,{underline:"none",variant:"subtitle2",component:n.b,to:"/",children:"Iniciar sesi\xf3n"})]}),Object(_.jsx)(p.c,{width:"mdDown",children:Object(_.jsxs)(H,{children:[Object(_.jsx)(o.a,{variant:"h3",sx:{px:5,mt:10,mb:5},children:"Sistema de Contabilidad y POS para impulsar tu negocio"}),Object(_.jsx)("img",{alt:"register",src:"/static/illustrations/illustration_register.png"})]})}),Object(_.jsx)(d.a,{children:Object(_.jsxs)(L,{children:[Object(_.jsxs)(j.a,{sx:{mb:5,display:"flex",alignItems:"center"},children:[Object(_.jsxs)(j.a,{sx:{flexGrow:1},children:[Object(_.jsx)(o.a,{variant:"h4",gutterBottom:!0,children:"Comience completamente gratis"}),Object(_.jsx)(o.a,{sx:{color:"text.secondary"},children:"No necesita tarjeta de credito"})]}),Object(_.jsx)(m.a,{title:Object(i.a)(e),children:Object(_.jsx)(j.a,{component:"img",src:"/static/auth/ic_".concat(e,".png"),sx:{width:32,height:32}})})]}),"firebase"===e&&Object(_.jsx)(F.a,{}),Object(_.jsx)(E,{}),Object(_.jsxs)(o.a,{variant:"body2",align:"center",sx:{color:"text.secondary",mt:3},children:["Al registrarse aceptas terminos y condiciones. Por favor lea nuestros\xa0",Object(_.jsx)(l.a,{underline:"always",color:"text.primary",href:"#",children:"Terminos y condiciones"}),"\xa0y\xa0",Object(_.jsx)(l.a,{underline:"always",color:"text.primary",href:"#",children:"Politica de privacidad"}),"."]}),Object(_.jsx)(p.c,{width:"smUp",children:Object(_.jsxs)(o.a,{variant:"subtitle2",sx:{mt:3,textAlign:"center"},children:["\xbfYa tienes cuenta?\xa0",Object(_.jsx)(l.a,{to:b.a.login,component:n.b,children:"Iniciar sesi\xf3n"})]})})]})})]})}}}]);
//# sourceMappingURL=57.750f4d1a.chunk.js.map