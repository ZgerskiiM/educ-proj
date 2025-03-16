import{H as mt,A as ft}from"./AppFooter-e2aZDmvd.js";import{d as E,u as tt,r as k,c as K,x as J,o as u,b as x,h as $,f as d,e as t,w as e,g as f,j as A,n as T,i as C,t as y,F as q,l as et,G,m as o,A as lt,_ as j,y as Q,H as vt,p as pt,I as _t,J as gt}from"./index-BJbwW3MX.js";const yt={key:0,class:"desktop-buttons mt-2 mb-2 d-flex"},bt={class:"d-flex"},xt={key:0},ht={key:0,class:"mt-4 d-flex justify-end"},wt={class:"d-flex gap-3"},kt=E({__name:"ProfileCard",props:{modelValue:{type:Object,required:!0}},emits:["update:modelValue","logout"],setup(a,{emit:b}){const{mdAndDown:n}=tt(),v=et(),i=a,m=b,s=k(!1),r=k({...i.modelValue}),g=k(!1),U=()=>lt.getToken();async function w(){var c,l;try{if(!U())return m("error","Вы не авторизованы"),!1;if(await G.post("/users/update-user",null,{params:{newFirstName:r.value.firstName,newLastName:r.value.lastName}}),O.value&&F.value){const N=new FormData;N.append("image",F.value);const I=await G.post("/users/upload",N,{headers:{"Content-Type":"multipart/form-data"}});I.data&&I.data.imageUrl&&(r.value.imageUrl=I.data.imageUrl)}return m("update:modelValue",{...r.value}),s.value=!1,m("success","Профиль успешно обновлен"),!0}catch(_){const N=((l=(c=_.response)==null?void 0:c.data)==null?void 0:l.message)||"Не удалось обновить профиль";return console.error("Ошибка при обновлении профиля:",_),m("error",N),!1}}const D=K(()=>{if(!i.modelValue.imageUrl)return"/public/EmptyAvatar.png";try{const c=p(i.modelValue.imageUrl);return S(c)}catch(c){return console.error("Ошибка обработки URL изображения:",c),"/public/EmptyAvatar.png"}}),p=c=>!c||c==="null"||c==="undefined"?"/public/EmptyAvatar.png":c.startsWith("/")?`${G}${c}`:!c.startsWith("http://")&&!c.startsWith("https://")?`https://${c}`:c,S=c=>{if(!c)return"/public/default-lesson.jpg";let l=c.replace(/https:\/\/https:\/\//g,"https://");return l=l.replace(/https:\/\/https\//g,"https://"),l};J(()=>i.modelValue,c=>{s.value||(r.value={...c})},{deep:!0});function h(){r.value={...i.modelValue},s.value=!0}const F=k(null),O=k(!1);function R(c){if(c){F.value=c,O.value=!0;const l=new FileReader;l.onload=_=>{r.value.imageUrl=_.target.result},l.readAsDataURL(c)}}function L(){r.value={...i.modelValue},s.value=!1}function z(){g.value=!1,localStorage.removeItem("token"),localStorage.removeItem("user"),m("logout"),v.push("/login")}return(c,l)=>{const _=o("v-btn"),N=o("v-img"),I=o("v-avatar"),at=o("v-file-input"),X=o("v-col"),P=o("v-icon"),B=o("v-list-item-title"),H=o("v-list-item-subtitle"),W=o("v-list-item"),nt=o("v-list"),M=o("v-text-field"),st=o("v-form"),it=o("v-row"),Y=o("v-card-text"),Z=o("v-card"),rt=o("v-card-title"),ct=o("v-spacer"),ut=o("v-card-actions"),dt=o("v-dialog");return u(),x(q,null,[!$(n)&&!s.value?(u(),x("div",yt,[d("div",bt,[t(_,{class:"profile-card--button font-weight-light text-none",variant:"outlined",color:"#333132","prepend-icon":"mdi-pencil",onClick:h},{default:e(()=>l[7]||(l[7]=[f(" Редактировать ")])),_:1}),t(_,{class:"profile-card--button font-weight-light text-none ml-3",color:"error",variant:"outlined","prepend-icon":"mdi-logout",onClick:l[0]||(l[0]=V=>g.value=!0)},{default:e(()=>l[8]||(l[8]=[f(" Выйти ")])),_:1})]),t(_,{class:"profile-card--button font-weight-light text-none ml-auto",color:"primary",variant:"outlined","prepend-icon":"mdi-face-agent",href:"https://t.me/babichbaker_course",target:"_blank"},{default:e(()=>l[9]||(l[9]=[f(" Связаться с поддержкой ")])),_:1})])):A("",!0),t(Z,{class:"profile--card mb-5 rounded-lg"},{default:e(()=>[t(Y,null,{default:e(()=>[t(it,null,{default:e(()=>[t(X,{cols:"12",md:"4",lg:"3",class:T(["d-flex",{"justify-center align-center flex-column":$(n),"align-self-start flex-row":!$(n)}])},{default:e(()=>[t(I,{size:"160",class:T(["mb-2 mt-4",{"justify-center align-center flex-column ":$(n),"align-self-start ml-4":!$(n)}])},{default:e(()=>[t(N,{src:D.value,alt:"Фото профиля",fallback:"/default-avatar.jpg"},null,8,["src"])]),_:1},8,["class"]),s.value?(u(),C(at,{key:0,label:"Изменить фото",accept:"image/*","prepend-icon":"",variant:"outlined",density:"compact","hide-details":"",class:T(["mb-2",{"w-25 h-25":$(n),"max-width-250":!$(n)}]),style:{"max-height":"50px"},"onUpdate:modelValue":R},null,8,["class"])):A("",!0)]),_:1},8,["class"]),t(X,{cols:"12",md:"7",lg:"8"},{default:e(()=>[s.value?(u(),C(st,{key:1},{default:e(()=>[l[18]||(l[18]=d("div",{class:"d-flex justify-space-between align-center mb-4"},[d("div",{class:"profile-card--text"},"Редактирование профиля")],-1)),t(M,{modelValue:r.value.firstName,"onUpdate:modelValue":l[2]||(l[2]=V=>r.value.firstName=V),label:"Имя",variant:"outlined",class:"mb-1",density:"compact"},null,8,["modelValue"]),t(M,{modelValue:r.value.lastName,"onUpdate:modelValue":l[3]||(l[3]=V=>r.value.lastName=V),label:"Фамилия",variant:"outlined",class:"mb-1",density:"compact"},null,8,["modelValue"]),t(M,{modelValue:r.value.email,"onUpdate:modelValue":l[4]||(l[4]=V=>r.value.email=V),label:"Email",variant:"outlined",class:"mb-1",density:"compact",disabled:""},null,8,["modelValue"]),d("div",wt,[t(_,{class:"profile-card--button font-weight-light text-none",color:"#333132",onClick:w},{default:e(()=>l[16]||(l[16]=[f(" Сохранить ")])),_:1}),t(_,{color:"grey",variant:"outlined",onClick:L,class:"ml-2 profile-card--button font-weight-light text-none"},{default:e(()=>l[17]||(l[17]=[f(" Отмена ")])),_:1})])]),_:1})):(u(),x("div",xt,[l[15]||(l[15]=d("div",{class:"d-flex justify-start align-start mb-4"},[d("div",{class:"profile-card--text font-weight-light"},"Личная информация")],-1)),t(nt,{color:"#FAFAFA",class:T({"pa-0 list-left-aligned":!$(n)})},{default:e(()=>[t(W,null,{prepend:e(()=>[t(P,{icon:"mdi-account"})]),default:e(()=>[t(B,{class:"font-weight-light"},{default:e(()=>l[10]||(l[10]=[f("Имя")])),_:1}),t(H,{class:"font-weight-light"},{default:e(()=>[f(y(a.modelValue.firstName),1)]),_:1})]),_:1}),t(W,null,{prepend:e(()=>[t(P,{icon:"mdi-account-outline"})]),default:e(()=>[t(B,{class:"font-weight-light"},{default:e(()=>l[11]||(l[11]=[f("Фамилия")])),_:1}),t(H,{class:"font-weight-light"},{default:e(()=>[f(y(a.modelValue.lastName),1)]),_:1})]),_:1}),t(W,null,{prepend:e(()=>[t(P,{icon:"mdi-email"})]),default:e(()=>[t(B,{class:"font-weight-light"},{default:e(()=>l[12]||(l[12]=[f("Email")])),_:1}),t(H,{class:"font-weight-light"},{default:e(()=>[f(y(a.modelValue.email),1)]),_:1})]),_:1})]),_:1},8,["class"]),$(n)?(u(),x("div",ht,[t(_,{class:"profile-card--button font-weight-light text-none",color:"#31331","prepend-icon":"mdi-pencil",variant:"outlined",onClick:h},{default:e(()=>l[13]||(l[13]=[f(" Редактировать ")])),_:1}),t(_,{class:"profile-card--button font-weight-light text-none ml-2",color:"error",variant:"outlined","prepend-icon":"mdi-logout",onClick:l[1]||(l[1]=V=>g.value=!0)},{default:e(()=>l[14]||(l[14]=[f(" Выйти ")])),_:1})])):A("",!0)]))]),_:1})]),_:1})]),_:1})]),_:1}),t(dt,{modelValue:g.value,"onUpdate:modelValue":l[6]||(l[6]=V=>g.value=V),"max-width":"400"},{default:e(()=>[t(Z,null,{default:e(()=>[t(rt,null,{default:e(()=>l[19]||(l[19]=[f("Подтверждение")])),_:1}),t(Y,{class:"font-weight-light"},{default:e(()=>l[20]||(l[20]=[f("Вы действительно хотите выйти из аккаунта?")])),_:1}),t(ut,null,{default:e(()=>[t(ct),t(_,{class:"profile-card--button font-weight-light text-none",variant:"outlined",onClick:l[5]||(l[5]=V=>g.value=!1)},{default:e(()=>l[21]||(l[21]=[f("Отмена")])),_:1}),t(_,{variant:"outlined",class:"profile-card--button font-weight-light text-none",color:"error",onClick:z},{default:e(()=>l[22]||(l[22]=[f("Выйти")])),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}}}),Ct=j(kt,[["__scopeId","data-v-9d320195"]]),Vt={class:"position-relative"},$t={class:"text-caption text-truncate-2 course-description"},Ut=E({__name:"CourseCard",props:{course:{type:Object,required:!0}},emits:["navigate"],setup(a,{emit:b}){const n=a,v=et();function i(){localStorage.setItem(`original_course_image_${n.course.id}`,n.course.imageUrl),v.push(`/course/${n.course.id}`)}return(m,s)=>{const r=o("v-img"),g=o("v-card-title"),U=o("v-card-text"),w=o("v-btn"),D=o("v-card-actions"),p=o("v-card");return u(),C(p,{rounded:"lg",elevation:"1",class:"cabinet-card d-flex flex-column overflow-x"},{default:e(()=>[d("div",Vt,[t(r,{src:a.course.imageUrl,height:"250",cover:"",class:"rounded-t-lg",alt:a.course.title},null,8,["src","alt"])]),t(g,{class:"font-weight-regular"},{default:e(()=>[f(y(a.course.title),1)]),_:1}),t(U,{class:"py-1"},{default:e(()=>[s[0]||(s[0]=d("div",{class:"d-flex align-center mb-2"},null,-1)),d("div",$t,y(a.course.description),1)]),_:1}),t(D,{class:"mt-auto"},{default:e(()=>[t(w,{variant:"flat",block:"",class:"card-btn-text text-none font-weight-regular w-50",color:"#333132","prepend-icon":"mdi-play",onClick:i},{default:e(()=>[f(y(a.course.progress>0?"Продолжить":"Приступить"),1)]),_:1})]),_:1})]),_:1})}}}),St=j(Ut,[["__scopeId","data-v-472e6713"]]),Nt={class:"filter-tabs mb-4"},At={class:"flexible-filter-tabs"},jt=E({__name:"CourseFilterTabs",props:{modelValue:{type:String,required:!0},options:{type:Array,required:!0}},emits:["update:modelValue"],setup(a){return(b,n)=>{const v=o("v-btn");return u(),x("div",Nt,[d("div",At,[(u(!0),x(q,null,Q(a.options,i=>(u(),C(v,{key:i.value,class:T(["filter-tab-btn font-weight-light",{"active-tab":a.modelValue===i.value}]),variant:"outlined",onClick:m=>b.$emit("update:modelValue",i.value)},{default:e(()=>[f(y(i.label),1)]),_:2},1032,["class","onClick"]))),128))])])}}}),Dt=j(jt,[["__scopeId","data-v-42191f72"]]),Ft={class:"mb-2"},It={class:"mb-6 text-grey"},Tt={key:0,class:"tooltip-wrapper"},Et=E({__name:"EmptyState",props:{icon:{type:String,required:!0},title:{type:String,required:!0},description:{type:String,required:!0},actionText:{type:String,default:""},actionRoute:{type:String,default:""},actionColor:{type:String,default:"#333132"}},setup(a){return(b,n)=>{const v=o("v-icon"),i=o("v-tooltip"),m=o("v-btn"),s=o("v-card");return u(),C(s,{rounded:"lg",elevation:"1",class:"empty-card d-flex flex-column align-center justify-center"},{default:e(()=>[t(v,{icon:a.icon,size:"64",color:"grey-lighten-1",class:"mb-4"},null,8,["icon"]),d("div",Ft,y(a.title),1),d("div",It,y(a.description),1),a.actionText?(u(),x("div",Tt,[t(i,{location:"bottom",text:"Скоро будет доступно"},{activator:e(({props:r})=>[d("div",vt(r,{class:"w-100 h-100 position-absolute"}),null,16)]),_:1}),t(m,{class:"font-weight-light text-none",color:a.actionColor,to:a.actionRoute,disabled:""},{default:e(()=>[f(y(a.actionText),1)]),_:1},8,["color","to"])])):A("",!0)]),_:1})}}}),ot=j(Et,[["__scopeId","data-v-90409ea4"]]),qt={class:"mb-8"},Ot={class:"d-flex justify-space-between align-center mb-4"},Rt={class:"font-weight-regular"},Lt={key:2,class:"text-center py-8 mt-0 pt-0 font-weight-light"},zt={__name:"index",props:{title:{type:String,default:"Мои курсы"},courses:{type:Array,required:!0},filterValue:{type:String,required:!0},filterOptions:{type:Array,required:!0},emptyState:{type:Object,default:()=>({icon:"mdi-school-outline",title:"У вас пока нет курсов",description:"Вы можете найти интересные курсы в нашем каталоге",actionText:"Перейти в каталог",actionRoute:"/catalog",actionDisabled:{type:Boolean,default:!1}})}},emits:["update:filter-value"],setup(a,{emit:b}){const n=a,v=b,i=k(n.filterValue);J(()=>n.filterValue,s=>{i.value=s}),J(i,s=>{v("update:filter-value",s)});const m=K(()=>{switch(i.value){case"not-started":return n.courses.filter(s=>s.progress===0);case"in-progress":return n.courses.filter(s=>s.progress>0&&s.progress<100);case"completed":return n.courses.filter(s=>s.progress===100);default:return n.courses}});return(s,r)=>{const g=o("v-col"),U=o("v-row");return u(),x("div",qt,[d("div",Ot,[d("h2",Rt,y(a.title),1)]),a.filterOptions&&a.filterOptions.length?(u(),C(Dt,{key:0,modelValue:i.value,"onUpdate:modelValue":r[0]||(r[0]=w=>i.value=w),options:a.filterOptions},null,8,["modelValue","options"])):A("",!0),m.value.length>0?(u(),C(U,{key:1},{default:e(()=>[(u(!0),x(q,null,Q(m.value,w=>(u(),C(g,{key:w.id,cols:"12",sm:"6",lg:"4"},{default:e(()=>[t(St,{course:w},null,8,["course"])]),_:2},1024))),128))]),_:1})):(u(),x("div",Lt,[t(ot,{icon:a.emptyState.icon,title:a.emptyState.title,description:a.emptyState.description,"action-text":a.emptyState.actionText,"action-route":a.emptyState.actionRoute},null,8,["icon","title","description","action-text","action-route"])]))])}}},Pt={class:"position-relative"},Bt={class:"d-flex align-center mb-2"},Ht={class:"font-weight-light"},Wt={class:"text-caption"},Mt=E({__name:"CertificateCard",props:{certificate:{type:Object,required:!0}},emits:["download","open"],setup(a){return(b,n)=>{const v=o("v-img"),i=o("v-card-title"),m=o("v-icon"),s=o("v-card-text"),r=o("v-btn"),g=o("v-card-actions"),U=o("v-card");return u(),C(U,{rounded:"lg",elevation:"1",class:"cabinet-card d-flex flex-column overflow-x"},{default:e(()=>[d("div",Pt,[t(v,{src:a.certificate.image,height:"250",cover:"",class:"rounded-t-lg bg-grey-lighten-4",alt:`Сертификат: ${a.certificate.courseName}`},null,8,["src","alt"]),n[1]||(n[1]=d("div",{class:"certificate-badge"},null,-1))]),t(i,{class:"text-truncate"},{default:e(()=>[f(y(a.certificate.courseName),1)]),_:1}),t(s,{class:"py-1"},{default:e(()=>[d("div",Bt,[t(m,{icon:"mdi-calendar",size:"small",class:"mr-1"}),d("span",Ht,"Выдан: "+y(a.certificate.issueDate),1)]),d("div",Wt,[t(m,{icon:"mdi-certificate",size:"small",class:"mr-1"}),n[2]||(n[2]=d("span",null,"Профессиональный сертификат",-1))])]),_:1}),t(g,{class:"mt-auto d-flex align-center justify-center ml-2 mr-2"},{default:e(()=>[t(r,{color:"#333132",variant:"outlined","prepend-icon":"mdi-download",class:"card-btn-text text-none font-weight-regular w-100",onClick:n[0]||(n[0]=w=>b.$emit("download",a.certificate.id))},{default:e(()=>n[3]||(n[3]=[f(" Скачать ")])),_:1})]),_:1})]),_:1})}}}),Gt=j(Mt,[["__scopeId","data-v-f60dc4a1"]]),Jt={class:"d-flex justify-space-between align-center mb-8"},Kt={class:"font-weight-regular"},Qt={__name:"index",props:{title:{type:String,default:"Мои сертификаты"},certificates:{type:Array,required:!0},emptyState:{type:Object,default:()=>({icon:"mdi-certificate-outline",title:"У вас пока нет сертификатов",description:"Завершите курс, чтобы получить сертификат"})}},setup(a){const b=v=>{console.log("Скачивание сертификата:",v)},n=v=>{console.log("Открытие сертификата:",v)};return(v,i)=>{const m=o("v-col"),s=o("v-row");return u(),x("div",null,[d("div",Jt,[d("h2",Kt,y(a.title),1)]),t(s,null,{default:e(()=>[(u(!0),x(q,null,Q(a.certificates,r=>(u(),C(m,{key:r.id,cols:"12",sm:"6",lg:"3"},{default:e(()=>[t(Gt,{certificate:r,onDownload:b,onOpen:n},null,8,["certificate"])]),_:2},1024))),128)),a.certificates.length===0?(u(),C(m,{key:0,cols:"12",class:"text-center py-8 mt-0 pt-0 font-weight-light"},{default:e(()=>[t(ot,{icon:a.emptyState.icon,title:a.emptyState.title,description:a.emptyState.description},null,8,["icon","title","description"])]),_:1})):A("",!0)]),_:1})])}}},Xt={__name:"Profile",setup(a){const{mdAndDown:b}=tt(),n=k("all"),v=k(!1),i=k({firstName:"",lastName:"",email:"",imageUrl:""}),m=k([]);async function s(){try{if(v.value=!0,!lt.getToken()){m.value=[];return}const S=await _t();m.value=S.map(h=>({id:h.id,title:h.title,imageUrl:h.imageUrl||"/public/main--menu3.png",progress:h.progress||0,lessonsCompleted:h.lessonsCompleted||0,totalLessons:h.totalLessons||0,certificateAvailable:h.certificateAvailable||!1}))}catch(p){console.error("Ошибка при получении курсов пользователя:",p),m.value=[]}finally{v.value=!1}}async function r(){try{v.value=!0;const p=await gt();i.value={firstName:p.firstName||"",lastName:p.lastName||"",email:p.email||"",imageUrl:p.imageUrl||"/EmptyAvatar.png"}}catch(p){console.error("Ошибка при получении данных пользователя:",p)}finally{v.value=!1}}pt(()=>{r(),s()});const g=k("");function U(){i.value={firstName:"",lastName:"",email:"",imageUrl:""},localStorage.removeItem("jwt_token")}const w=[{value:"all",label:"Все курсы"},{value:"not-started",label:"Не начатые"},{value:"in-progress",label:"В процессе"},{value:"completed",label:"Завершенные"}],D=K(()=>{let p="";switch(n.value){case"not-started":p="У вас нет не начатых курсов";break;case"in-progress":p="У вас нет курсов в процессе";break;case"completed":p="У вас нет завершенных курсов";break;default:p="У вас пока нет курсов"}return{icon:"mdi-book-outline",title:p,description:"Выберите другой фильтр или перейдите в каталог",actionText:"Перейти в каталог",actionRoute:"/catalog"}});return(p,S)=>{const h=o("v-col"),F=o("v-row"),O=o("v-progress-circular"),R=o("v-overlay"),L=o("v-container"),z=o("v-main"),c=o("v-app");return u(),x(q,null,[t(mt),t(c,null,{default:e(()=>[t(z,null,{default:e(()=>[t(L,{width:$(b)?"100vw":"60vw"},{default:e(()=>[t(F,{class:"mb-2"},{default:e(()=>[t(h,{cols:"12"},{default:e(()=>S[1]||(S[1]=[d("h1",{class:"font-weight-medium mt-4"},"Личный кабинет",-1)])),_:1})]),_:1}),t(R,{"model-value":v.value,contained:"",class:"align-center justify-center"},{default:e(()=>[t(O,{indeterminate:"",size:"64"})]),_:1},8,["model-value"]),t(Ct,{modelValue:i.value,"onUpdate:modelValue":S[0]||(S[0]=l=>i.value=l),class:"mb-8",onLogout:U},null,8,["modelValue"]),t(zt,{courses:m.value,"filter-value":n.value,"filter-options":w,"empty-state":D.value},null,8,["courses","filter-value","empty-state"]),t(Qt,{certificates:g.value},null,8,["certificates"])]),_:1},8,["width"]),t(ft)]),_:1})]),_:1})],64)}}},te=j(Xt,[["__scopeId","data-v-6ad70e7a"]]);export{te as default};
