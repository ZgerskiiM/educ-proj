import{d as b,u as h,a as y,b as A,o as V,c as k,e as s,w as a,f as R,g as r,h as l,i as B,n as C,j as D,k as n,A as P,_ as j}from"./index-_IANILbF.js";import{A as q,_ as N}from"./AuthMobileImage.vue_vue_type_script_setup_true_lang-DYkWRdk7.js";const I={class:"page-container"},S=b({__name:"ResetPasswordPage",setup(U){const{mdAndDown:i,smAndUp:c}=h(),d=D(),o=y({username:"",surname:"",password:"",email:""}),m=async()=>{try{const e=await P.resetRequest(o.email);d.push("/")}catch(e){e.response?(console.error("Ошибка сервера:",e.response.data),console.error("Код статуса:",e.response.status)):e.request?console.error("Ошибка запроса:",e.request):console.error("Ошибка:",e.message)}},u=A(()=>!o.email);return(e,t)=>{const f=n("v-card-title"),p=n("v-text-field"),_=n("router-link"),v=n("v-card-text"),w=n("v-btn"),g=n("v-container");return V(),k("div",I,[s(q),s(g,{class:"main-container"},{default:a(()=>[R("form",{onSubmit:B(m,["prevent"]),class:C(["align-md-center d-flex flex-column",l(i)?"w-66":"w-50"])},[s(N),s(f,{class:"align-md-center justify-center d-flex pl-0 pb-0 mb-3 font-weight-regular"},{default:a(()=>t[1]||(t[1]=[r(" Воccтановление ")])),_:1}),s(p,{class:"w-100 font-weight-light mb-3",modelValue:o.email,"onUpdate:modelValue":t[0]||(t[0]=x=>o.email=x),label:"Почта",hint:`Отправим ссылку восстановления\r
          на почту`,"persistent-hint":"",variant:"outlined",density:l(c)?"comfortable":"compact"},null,8,["modelValue","density"]),s(v,{class:"w-100 justify-center d-flex mt-0 pt-0 pl-0 font-weight-light"},{default:a(()=>[t[3]||(t[3]=r(" Уже есть аккаунт?   ")),s(_,{to:"login"},{default:a(()=>t[2]||(t[2]=[r(" Войдите")])),_:1})]),_:1}),s(w,{class:"text-none mb-2 w-100 font-weight-thin",type:"submit",text:"Отправить",disabled:u.value,flat:""},null,8,["disabled"])],34)]),_:1})])}}}),M=j(S,[["__scopeId","data-v-f9f2425f"]]);export{M as default};
