import{d as q,u as M,r as c,a as P,c as $,o as k,b as z,e as r,w as d,f as N,g as m,h as p,i as L,t as T,j as W,k as Z,n as F,l as G,m as n,A as H,_ as J}from"./index-D_oD8h-s.js";import{A as K,_ as O}from"./AuthMobileImage.vue_vue_type_script_setup_true_lang-B_ggQCUm.js";const Q={class:"page-container"},X=q({__name:"RegisterPage",setup(Y){const{mdAndDown:_,smAndUp:f}=M(),v=c(!1),g=c(!1),u=c(""),i=c(""),w=c(!1),s=P({password:"",confirmPassword:"",email:"",firstName:"",lastName:""}),t=P({firstName:"",lastName:"",email:"",password:""}),C=G(),I=()=>{s.confirmPassword&&s.password!==s.confirmPassword?u.value="Пароли не совпадают":u.value=""},x=()=>{if(t.email="",!s.email)return;/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email)||(t.email="Некорректный формат электронной почты")},b=()=>{if(t.password="",!!s.password){if(s.password.length<8){t.password="Пароль должен содержать не менее 8 символов";return}if(!/[a-zA-Z]/.test(s.password)){t.password="Пароль должен содержать латинские буквы";return}if(!/\d/.test(s.password)){t.password="Пароль должен содержать цифры";return}if(!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(s.password)){t.password="Пароль должен содержать специальные символы";return}s.confirmPassword&&s.password!==s.confirmPassword?u.value="Пароли не совпадают":u.value=""}},A=async()=>{var y,e;if(i.value="",x(),b(),I(),!(t.email||t.password||u.value)){w.value=!0;try{const o=await H.signup(s.email,s.password,s.firstName,s.lastName);C.push({path:"/verify",query:{email:s.email}})}catch(o){if(o.response){if((y=o.response.data)!=null&&y.message)i.value=o.response.data.message;else if((e=o.response.data)!=null&&e.errors){const l=o.response.data.errors;l.email&&(t.email=l.email),l.password&&(t.password=l.password),l.firstName&&(t.firstName=l.firstName),l.lastName&&(t.lastName=l.lastName)}else i.value=`Ошибка сервера: ${o.response.status}`;console.error("Ошибка сервера:",o.response.data),console.error("Код статуса:",o.response.status)}else o.request?(i.value="Не удалось связаться с сервером. Проверьте подключение к интернету.",console.error("Ошибка запроса:",o.request)):(i.value=`Произошла ошибка: ${o.message}`,console.error("Ошибка:",o.message))}finally{w.value=!1}}},U=$(()=>!s.email||!s.password||!s.firstName||!s.lastName||s.password!==s.confirmPassword||!!u.value||!!t.email||!!t.password||w.value);return(y,e)=>{const o=n("v-card-title"),l=n("v-text-field"),B=n("router-link"),V=n("v-card-text"),D=n("v-alert"),E=n("v-btn"),R=n("v-icon"),S=n("v-card"),j=n("v-container");return k(),z("div",Q,[r(K),r(j,{class:"main-container"},{default:d(()=>[N("form",{onSubmit:Z(A,["prevent"]),class:F(["align-md-center d-flex flex-column",p(_)?"w-66":"w-50"])},[r(O),r(o,{class:"align-md-center justify-center d-flex pl-0 mb-3 font-weight-regular"},{default:d(()=>e[13]||(e[13]=[m(" Регистрация ")])),_:1}),r(l,{class:"w-100 font-weight-light",modelValue:s.lastName,"onUpdate:modelValue":e[0]||(e[0]=a=>s.lastName=a),label:"Фамилия",variant:"outlined",density:p(f)?"comfortable":"compact","error-messages":t.lastName,onInput:e[1]||(e[1]=a=>a.target.value=a.target.value.replace(/\s/g,""))},null,8,["modelValue","density","error-messages"]),r(l,{class:"w-100 font-weight-light",modelValue:s.firstName,"onUpdate:modelValue":e[2]||(e[2]=a=>s.firstName=a),label:"Имя",variant:"outlined",density:p(f)?"comfortable":"compact","error-messages":t.firstName,onInput:e[3]||(e[3]=a=>a.target.value=a.target.value.replace(/\s/g,""))},null,8,["modelValue","density","error-messages"]),r(l,{class:"w-100 font-weight-light",modelValue:s.email,"onUpdate:modelValue":e[4]||(e[4]=a=>s.email=a),label:"Почта",variant:"outlined",density:p(f)?"comfortable":"compact","error-messages":t.email,onInput:e[5]||(e[5]=a=>{a.target.value=a.target.value.replace(/\s/g,"")})},null,8,["modelValue","density","error-messages"]),r(l,{class:"w-100 mb-0 font-weight-light",label:"Пароль",hint:"Не менее 8 знаков: латинские буквы, цифры, спецсимволы",persistent:"",density:p(f)?"comfortable":"compact",variant:"outlined","append-inner-icon":v.value?"mdi-eye-off":"mdi-eye",modelValue:s.password,"onUpdate:modelValue":e[6]||(e[6]=a=>s.password=a),type:v.value?"text":"password","onClick:appendInner":e[7]||(e[7]=a=>v.value=!v.value),"error-messages":t.password,onInput:e[8]||(e[8]=a=>{a.target.value=a.target.value.replace(/\s/g,"")})},null,8,["density","append-inner-icon","modelValue","type","error-messages"]),r(l,{class:"w-100 mb-0 font-weight-light",label:"Повторите пароль",variant:"outlined",density:p(f)?"comfortable":"compact","append-inner-icon":g.value?"mdi-eye-off":"mdi-eye",modelValue:s.confirmPassword,"onUpdate:modelValue":e[9]||(e[9]=a=>s.confirmPassword=a),type:g.value?"text":"password","onClick:appendInner":e[10]||(e[10]=a=>g.value=!g.value),"error-messages":u.value,onInput:e[11]||(e[11]=a=>{a.target.value=a.target.value.replace(/\s/g,"")})},null,8,["density","append-inner-icon","modelValue","type","error-messages"]),r(V,{class:"w-100 justify-center d-flex mt-0 pt-0 pl-0 font-weight-light"},{default:d(()=>[e[15]||(e[15]=m(" Уже есть аккаунт?   ")),r(B,{to:"/login"},{default:d(()=>e[14]||(e[14]=[m(" Войдите ")])),_:1})]),_:1}),i.value?(k(),L(D,{key:0,type:"error",variant:"tonal",closable:"",class:"mb-3 w-100","onClick:close":e[12]||(e[12]=a=>i.value="")},{default:d(()=>[m(T(i.value),1)]),_:1})):W("",!0),r(E,{class:"text-none mb-2 w-100 font-weight-thin",text:"Создать профиль",type:"submit",density:p(_)?"compact":"comfortable",disabled:U.value,loading:w.value},null,8,["density","disabled","loading"]),r(S,{class:"info-card d-flex align-center mt-3 bg-color-none",rounded:"xm",variant:"outlined"},{default:d(()=>[r(R,{class:"info-icon ml-5",color:"black"},{default:d(()=>e[16]||(e[16]=[m(" mdi-information-outline ")])),_:1}),r(V,{class:"info--card font-weight-light px-3 py-2 mr-2"},{default:d(()=>e[17]||(e[17]=[m(" Создавая профиль, нажимая на кнопку, вы даёте "),N("a",{href:"Согласие на обработку персональных данных"}," согласие на обработку персональных данных ",-1),m(" и рассылку информационных сообщений "),N("a",{href:"https://www.consultant.ru/document/cons_doc_LAW_61801/",class:"link"}," согласно закону",-1),m(" О персональных данных от 27.07.2006 №152-ФЗ ")])),_:1})]),_:1})],34)]),_:1})])}}}),se=J(X,[["__scopeId","data-v-9b2a02d6"]]);export{se as default};
