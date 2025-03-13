import{d as j,u as P,r as v,a as w,c as U,p as z,o as p,b as F,e as o,w as u,f as x,t as f,h as y,g as m,i as C,j as T,k as L,n as G,l as H,q as J,m as c,_ as K}from"./index-BHpa5Asv.js";import{A as h}from"./Auth-TtMAv3HS.js";import{A as O,_ as Q}from"./AuthMobileImage.vue_vue_type_script_setup_true_lang-DdoCrmkB.js";const W={class:"page-container"},X={class:"email-sent-text mb-4"},Y=j({__name:"VerificationPage",setup(Z){const{mdAndDown:k,smAndUp:B}=P(),V=H(),D=J(),s=v(""),n=v(""),d=v(""),r=v(!1),a=w({email:"",verificationCode:""}),R=D.query.email;a.email=R;const t=w({remainingTime:10,resendButtonText:"Отправить повторно",isResendDisabled:!1,timer:null}),g=()=>{t.isResendDisabled=!0,t.resendButtonText=`Повторно через ${t.remainingTime} сек`,t.timer=setInterval(()=>{t.remainingTime--,t.resendButtonText=`Повторно через ${t.remainingTime} сек`,t.remainingTime<=0&&(t.timer&&clearInterval(t.timer),t.isResendDisabled=!1,t.resendButtonText="Отправить повторно",t.remainingTime=10)},1e3)},$=()=>(d.value="",a.verificationCode.trim()?!0:(d.value="Введите код подтверждения",!1)),q=async()=>{var l;try{s.value="",n.value="",r.value=!0;const e=await h.resend(a.email);g(),n.value="Код успешно отправлен повторно"}catch(e){e.response?((l=e.response.data)!=null&&l.message?s.value=e.response.data.message:s.value=`Ошибка сервера: ${e.response.status}`,console.error("Ошибка сервера:",e.response.data),console.error("Код статуса:",e.response.status)):e.request?(s.value="Не удалось связаться с сервером. Проверьте подключение к интернету.",console.error("Ошибка запроса:",e.request)):(s.value=`Произошла ошибка: ${e.message}`,console.error("Ошибка:",e.message))}finally{r.value=!1}},A=async()=>{var l;if($())try{s.value="",n.value="",r.value=!0;const e=await h.verify(a.email,a.verificationCode);n.value="Почта успешно подтверждена!",setTimeout(()=>{V.push("/login")},1500)}catch(e){e.response?(e.response.status===400?d.value="Неверный код подтверждения":(l=e.response.data)!=null&&l.message?s.value=e.response.data.message:s.value=`Ошибка сервера: ${e.response.status}`,console.error("Ошибка сервера:",e.response.data),console.error("Код статуса:",e.response.status)):e.request?(s.value="Не удалось связаться с сервером. Проверьте подключение к интернету.",console.error("Ошибка запроса:",e.request)):(s.value=`Произошла ошибка: ${e.message}`,console.error("Ошибка:",e.message))}finally{r.value=!1}},I=U(()=>!a.verificationCode||r.value);return z(()=>{g()}),(l,e)=>{const N=c("v-text-field"),S=c("router-link"),E=c("v-card-text"),_=c("v-alert"),b=c("v-btn"),M=c("v-container");return p(),F("div",W,[o(O),o(M,{class:"main-container"},{default:u(()=>[x("form",{onSubmit:L(A,["prevent"]),class:G(["align-md-center d-flex flex-column",y(k)?"w-66":"w-50"])},[o(Q),x("div",X,"Отправили код-подтверждение на "+f(a.email),1),o(N,{class:"w-100 font-weight-light",modelValue:a.verificationCode,"onUpdate:modelValue":e[0]||(e[0]=i=>a.verificationCode=i),label:"Код-подтверждение",variant:"outlined",density:y(B)?"comfortable":"compact","error-messages":d.value,onInput:e[1]||(e[1]=i=>{d.value="",i.target.value=i.target.value.replace(/\s/g,"")})},null,8,["modelValue","density","error-messages"]),o(E,{class:"w-100 justify-center d-flex mt-0 pt-0 pl-0 font-weight-light"},{default:u(()=>[e[5]||(e[5]=m(" Забыли пароль?   ")),o(S,{to:"reset-password"},{default:u(()=>e[4]||(e[4]=[m(" Восстановить")])),_:1})]),_:1}),s.value?(p(),C(_,{key:0,type:"error",variant:"tonal",closable:"",class:"mb-3 w-100 font-weight-light","onClick:close":e[2]||(e[2]=i=>s.value="")},{default:u(()=>[m(f(s.value),1)]),_:1})):T("",!0),n.value?(p(),C(_,{key:1,type:"error",variant:"tonal",closable:"",class:"mb-3 w-100 font-weight-light","onClick:close":e[3]||(e[3]=i=>n.value="")},{default:u(()=>[m(f(n.value),1)]),_:1})):T("",!0),o(b,{class:"text-none mb-2 w-100 font-weight-thin",text:"Подтвердить",type:"submit",loading:r.value,disabled:I.value,flat:""},null,8,["loading","disabled"]),o(b,{class:"text-none mb-2 w-100 font-weight-thin",type:"button",disabled:t.isResendDisabled||r.value,onClick:q,flat:""},{default:u(()=>[m(f(t.resendButtonText),1)]),_:1},8,["disabled"])],34)]),_:1})])}}}),ae=K(Y,[["__scopeId","data-v-a2566351"]]);export{ae as default};
