import{d as j,u as A,m as n,o,i as h,w as a,e as s,f as c,n as L,h as b,t as f,b as k,g as p,_ as I,r as v,p as P,x as H,j as y,F as R,y as z,l as M,q as O}from"./index-QKPnfKcf.js";import{H as W,A as G}from"./AppFooter-OZn1cCuk.js";import{c as J}from"./courseUserService-CTDqK2IW.js";const K={class:"d-flex align-center justify-space-between"},Q={class:"text-h7"},X={class:"font-weight-regular"},Y={class:"font-weight-light"},Z={key:0,class:"chip d-flex flex-wrap gap-2 mt-2"},ee={key:1,class:"chip-container w-100 mt-2"},te=j({__name:"CourseCard",props:{courseData:{type:Object,required:!0,default:()=>({id:0,number:"1",title:"Загрузка...",imagePath:"/public/placeholder.jpg",progress:{completed:0,total:0},duration:"0 часов",lessons:0,cards:0})}},emits:["click"],setup(l){const{smAndDown:C,mdAndDown:_}=A();return(x,r)=>{const u=n("v-img"),i=n("v-chip"),m=n("v-card");return o(),h(m,{onClick:r[0]||(r[0]=g=>x.$emit("click",l.courseData.id)),class:L(b(_)?"course-block-card d-flex flex-column rounded-sm":"rounded-lg	 course-block-card d-flex align-center"),width:"100%",flat:"",elevation:"1"},{default:a(()=>[s(u,{src:l.courseData.imagePath,class:"responsive-image rounded-t","aspect-ratio":16/9,cover:""},null,8,["src"]),c("div",{class:L(b(_)?"card-text px-2 py-3 flex-grow-1":"card-text ml-10 flex-grow-1")},[c("div",K,[c("div",Q,[c("span",X,"Блок "+f(l.courseData.number)+" / ",1),c("span",Y,f(l.courseData.title),1)])]),b(_)?(o(),k("div",ee,[s(i,{class:"custom-chip1 equal-width-chip",text:l.courseData.duration,label:""},null,8,["text"]),s(i,{style:{"background-color":"#FFE68E"},class:"custom-chip2 equal-width-chip mx-1",label:"",color:"#333132"},{default:a(()=>[p(f(l.courseData.lessons)+" уроков ",1)]),_:1})])):(o(),k("div",Z,[s(i,{class:"custom-chip1 font-weight-light my-1",text:l.courseData.duration,label:""},null,8,["text"]),s(i,{style:{"background-color":"#FFE68E"},class:"custom-chip2 font-weight-light my-1 ml-2",label:"",color:"#333132"},{default:a(()=>[p(f(l.courseData.lessons)+" уроков ",1)]),_:1})]))],2)]),_:1},8,["class"])}}}),se=I(te,[["__scopeId","data-v-7cd3f626"]]),oe={class:"page-wrapper"},ae={class:"mt-5 font-weight-medium"},le={class:"back-button-container pt-4 pb-2 pl-0 ml-0"},ne={key:0,class:"d-flex justify-center my-5"},ce="https://t.me/babichbaker_course",re=j({__name:"CourseBlocks",setup(l){const{mdAndDown:C}=A(),_=M(),x=O(),r=v(!1),u=v(""),i=v("Пекарская витрина: от Булок до Хлеба"),m=v([]),g=v(null),d=v(""),D=async e=>{if(e){r.value=!0,u.value="";try{const t=await J.fetchCourseWithBlocks(e);i.value=t.courseTitle||"Курс без названия",m.value=t.blocks||[],d.value=t.chat}catch(t){console.error("Ошибка при загрузке курса:",t),u.value="Не удалось загрузить данные курса. Пожалуйста, попробуйте позже.",m.value=[]}finally{r.value=!1}}},S=e=>{if(!e)return"/public/default-lesson.jpg";let t=e.replace(/https:\/\/https:\/\//g,"https://");return t=t.replace(/https:\/\/https\//g,"https://"),t},T=(e,t)=>({id:e.blockId,number:t.toString(),title:e.blockTitle,imagePath:S(e.imageUrl),progress:{completed:e.completedLessons,total:e.lessonsCount},duration:`${e.lessonsCount*2.5} минут`,lessons:e.lessonsCount}),V=()=>{const t=d&&d.value&&typeof d.value=="string"&&d.value.trim()!==""&&!d.value.includes("null")?d.value:ce;window.open(t,"_blank")},E=(e,t)=>{_.push(`/course/${e}/blocks/${t}`)};return P(()=>{const e=x.params.courseId;e&&(g.value=e,D(e))}),H(()=>x.params.courseId,e=>{e&&e!==g.value&&(g.value=e,D(e))}),(e,t)=>{const q=n("v-icon"),$=n("v-btn"),N=n("v-progress-circular"),B=n("v-alert"),F=n("v-container");return o(),k("div",oe,[s(W),s(F,{width:b(C)?"100vw":"60vw"},{default:a(()=>[c("h2",ae,f(i.value),1),t[4]||(t[4]=c("h3",{class:"mb-2 font-weight-regular"},"Авторский курс от Максима Бабича",-1)),s($,{class:"font-weight-regular text-none",variant:"outlined",color:"#313131",onClick:V},{default:a(()=>[s(q,null,{default:a(()=>t[0]||(t[0]=[p("mdi-pencil")])),_:1}),t[1]||(t[1]=p(" Чат курса "))]),_:1}),c("div",le,[s($,{variant:"outlined",density:"comfortable",to:"/lk",class:"back-button text-none"},{default:a(()=>t[2]||(t[2]=[p(" В профиль ")])),_:1})]),r.value?(o(),k("div",ne,[s(N,{indeterminate:"",color:"#F48A21"})])):y("",!0),u.value?(o(),h(B,{key:1,type:"error",class:"my-3"},{default:a(()=>[p(f(u.value),1)]),_:1})):y("",!0),!r.value&&!u.value?(o(),h(F,{key:2,class:"d-flex flex-column ga-7 ml-0 pl-0 align-center"},{default:a(()=>[(o(!0),k(R,null,z(m.value,(w,U)=>(o(),h(se,{key:w.blockId,"course-data":T(w,U+1),onClick:ue=>E(g.value,w.blockId)},null,8,["course-data","onClick"]))),128)),m.value.length===0?(o(),h(B,{key:0,type:"info",class:"my-3"},{default:a(()=>t[3]||(t[3]=[p(" Для этого курса еще не добавлены блоки ")])),_:1})):y("",!0)]),_:1})):y("",!0)]),_:1},8,["width"]),s(G)])}}}),me=I(re,[["__scopeId","data-v-fa7fc9a6"]]);export{me as default};
