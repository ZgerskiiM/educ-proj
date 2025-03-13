import{d as U,u as $,r as g,a as b,c as j,o as x,b as R,e as i,w as u,f as q,g as f,h as v,i as P,t as T,j as z,k as F,n as G,l as M,m as d,A as w,_ as H}from"./index-Bl0cb6_W.js";import{A as J,_ as K}from"./AuthMobileImage.vue_vue_type_script_setup_true_lang-CkbY-LrM.js";const O={class:"page-container"},Q=U({__name:"LoginPage",setup(W){const{mdAndDown:k,smAndUp:_}=$(),m=M(),c=g(!1),p=g(!1),r=g(""),l=b({password:"",email:""}),n=b({password:"",email:""}),I=()=>{m.push("/register")},V=()=>{let s=!0;return l.email.trim()||(n.email="Введите email",s=!1),l.password||(n.password="Введите пароль",s=!1),s},h=s=>{try{return localStorage.getItem(s)}catch(e){return console.error("Error accessing localStorage:",e),null}},A=(s,e)=>{try{localStorage.setItem(s,e)}catch(t){console.error("Error writing to localStorage:",t)}},S=s=>{try{localStorage.removeItem(s)}catch(e){console.error("Error removing from localStorage:",e)}},C=async()=>{var s,e;if(V())try{p.value=!0,r.value="",n.email="",n.password="";const t=await w.login(l.email,l.password),o=h("redirectAfterLogin");S("redirectAfterLogin"),o?o.includes("/admin")&&!w.isAdmin()?(m.push("/lk"),A("accessError","Доступ к административной панели запрещен")):m.push(o):w.isAdmin()?m.push("/admin"):m.push("/lk")}catch(t){if(t.response){if(t.response.status===401)r.value="Неверный логин или пароль";else if(t.response.status===403)r.value="Доступ запрещен";else if((s=t.response.data)!=null&&s.message)r.value=t.response.data.message;else if((e=t.response.data)!=null&&e.errors){const o=t.response.data.errors;o.email&&(n.email=o.email),o.password&&(n.password=o.password)}else r.value=`Ошибка сервера: ${t.response.status}`;console.error("Ошибка сервера:",t.response.data)}else t.request?(r.value="Не удалось связаться с сервером. Проверьте подключение к интернету.",console.error("Ошибка запроса:",t.request)):(r.value=`Произошла ошибка: ${t.message}`,console.error("Ошибка:",t.message))}finally{p.value=!1}},E=j(()=>!l.email||!l.password||p.value);return(s,e)=>{const t=d("v-card-title"),o=d("v-text-field"),B=d("router-link"),D=d("v-card-text"),L=d("v-alert"),y=d("v-btn"),N=d("v-container");return x(),R("div",O,[i(J),i(N,{class:"main-container"},{default:u(()=>[q("form",{onSubmit:F(C,["prevent"]),class:G(["align-md-center d-flex flex-column",v(k)?"w-66":"w-50"])},[i(K),i(t,{class:"align-md-center justify-center d-flex pl-0 mb-3 font-weight-regular"},{default:u(()=>e[7]||(e[7]=[f(" Вход ")])),_:1}),i(o,{class:"w-100 font-weight-light",modelValue:l.email,"onUpdate:modelValue":e[0]||(e[0]=a=>l.email=a),label:"Логин",variant:"outlined",density:v(_)?"comfortable":"compact","error-messages":n.email,onInput:e[1]||(e[1]=a=>{n.email="",a.target.value=a.target.value.replace(/\s/g,"")})},null,8,["modelValue","density","error-messages"]),i(o,{class:"w-100 mb-0 font-weight-light",label:"Пароль",density:v(_)?"comfortable":"compact",variant:"outlined","append-inner-icon":c.value?"mdi-eye-off":"mdi-eye",modelValue:l.password,"onUpdate:modelValue":e[2]||(e[2]=a=>l.password=a),type:c.value?"text":"password","onClick:appendInner":e[3]||(e[3]=a=>c.value=!c.value),"error-messages":n.password,onInput:e[4]||(e[4]=a=>{n.password="",a.target.value=a.target.value.replace(/\s/g,"")})},null,8,["density","append-inner-icon","modelValue","type","error-messages"]),i(D,{class:"w-100 justify-center d-flex mt-0 pt-0 pl-0 font-weight-light"},{default:u(()=>[e[9]||(e[9]=f(" Забыли пароль?   ")),i(B,{to:"reset-password"},{default:u(()=>e[8]||(e[8]=[f(" Восстановить ")])),_:1})]),_:1}),r.value?(x(),P(L,{key:0,type:"error",variant:"tonal",closable:"",class:"mb-3 w-100 font-weight-light","onClick:close":e[5]||(e[5]=a=>r.value="")},{default:u(()=>[f(T(r.value),1)]),_:1})):z("",!0),i(y,{class:"text-none mb-2 w-100 font-weight-thin",type:"submit",text:"Войти",loading:p.value,disabled:E.value,flat:""},null,8,["loading","disabled"]),i(y,{class:"text-none mb-2 w-100 font-weight-thin",text:"Создать аккаунт",onClick:e[6]||(e[6]=a=>I()),flat:""})],34)]),_:1})])}}}),Z=H(Q,[["__scopeId","data-v-501db7cd"]]);export{Z as default};
