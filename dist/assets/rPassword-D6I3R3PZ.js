import{d as g,r as l,p as b,o as y,b as k,e as o,w as u,f as V,g as c,k as h,q as P,l as q,m as n,_ as C}from"./index-BHpa5Asv.js";import{A as B}from"./Auth-TtMAv3HS.js";const M={class:"page-container"},N=g({__name:"rPassword",setup(j){const d=P(),i=q(),s=l(""),t=l(""),r=l(!1),m=async()=>{if(s.value){r.value=!0,t.value="";try{const e=d.query.token;if(!e){t.value="Токен не предоставлен";return}await B.resetPassword(e,s.value),alert("Пароль успешно изменён!"),i.push("/login")}catch(e){e.response?t.value=e.response.data||"Ошибка смены пароля":t.value="Ошибка сервера. Попробуйте позже."}finally{r.value=!1}}};return b(()=>{d.query.token||(t.value="Токен не предоставлен")}),(e,a)=>{const f=n("v-card-title"),v=n("v-card-subtitle"),_=n("v-text-field"),p=n("v-btn"),w=n("v-card");return y(),k("div",M,[o(w,{class:"auth-card d-flex flex-column justify-center align-md-center w-25 rounded-xl"},{default:u(()=>[V("form",{onSubmit:h(m,["prevent"]),class:"auth-form d-flex flex-column justify-center align-center w-66"},[o(f,{class:"align-xl-start w-100 ml-0 mr-0 pa-0"},{default:u(()=>a[1]||(a[1]=[c(" Сброс пароля ")])),_:1}),o(v,{class:"align-xl-start w-100 ml-0 mr-0 mt-1 pa-0"},{default:u(()=>a[2]||(a[2]=[c(" Введите новый пароль ")])),_:1}),o(_,{modelValue:s.value,"onUpdate:modelValue":a[0]||(a[0]=x=>s.value=x),type:"password",label:"Новый пароль",variant:"outlined",class:"mt-7 mb-0 w-100","error-messages":t.value,required:""},null,8,["modelValue","error-messages"]),o(p,{class:"mb-2 w-100",type:"submit",text:"Сменить пароль",disabled:!s.value,loading:r.value},null,8,["disabled","loading"])],32)]),_:1})])}}}),S=C(N,[["__scopeId","data-v-5ca005fa"]]);export{S as default};
