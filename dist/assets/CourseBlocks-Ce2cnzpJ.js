import{d as I,u as L,m as r,o as a,i as g,w as l,e as s,f as c,n as F,h as b,t as p,b as h,g as i,_ as j,r as u,x as H,p as R,j as x,F as z,y as M,l as O,q as W}from"./index-D0PUuBNy.js";import{H as G,A as J}from"./AppFooter-Yys3OeQo.js";import{c as K}from"./courseUserService-WKtmQdnM.js";const Q={class:"d-flex align-center justify-space-between"},X={class:"text-h7"},Y={class:"font-weight-regular"},Z={class:"font-weight-light"},ee={key:0,class:"chip-container w-100 mt-2"},te={key:1,class:"chip d-flex flex-wrap gap-2 mt-2"},se=I({__name:"CourseCard",props:{courseData:{type:Object,required:!0,default:()=>({id:0,number:"1",title:"Загрузка...",imagePath:"/public/placeholder.jpg",progress:{completed:0,total:0},duration:"0 часов",lessons:0,cards:0})}},emits:["click"],setup(n){const{mdAndDown:m}=L();return(y,f)=>{const d=r("v-img"),o=r("v-chip"),_=r("v-card");return a(),g(_,{onClick:f[0]||(f[0]=v=>y.$emit("click",n.courseData.id)),class:F(b(m)?"course-block-card d-flex flex-column rounded-lg":"rounded-lg	 course-block-card d-flex align-center"),width:"100%",flat:"",elevation:"1"},{default:l(()=>[s(d,{src:n.courseData.imagePath,class:"responsive-image rounded-t","aspect-ratio":16/9,cover:""},null,8,["src"]),c("div",{class:F(b(m)?"card-text px-2 py-3 flex-grow-1":"card-text ml-10 flex-grow-1")},[c("div",Q,[c("div",X,[c("span",Y,"Блок "+p(n.courseData.number)+" / ",1),c("span",Z,p(n.courseData.title),1)])]),b(m)?(a(),h("div",ee,[s(o,{class:"custom-chip1 font-weight-light equal-width-chip",text:n.courseData.duration,label:""},null,8,["text"]),s(o,{style:{"background-color":"#FFE68E"},class:"custom-chip2 font-weight-light equal-width-chip mx-1",label:"",color:"#333132"},{default:l(()=>[i(p(n.courseData.lessons)+" уроков ",1)]),_:1})])):(a(),h("div",te,[s(o,{class:"custom-chip1 font-weight-light my-1",text:n.courseData.duration,label:""},null,8,["text"]),s(o,{style:{"background-color":"#FFE68E"},class:"custom-chip2 font-weight-light my-1 ml-2",label:"",color:"#333132"},{default:l(()=>[i(p(n.courseData.lessons)+" уроков ",1)]),_:1})]))],2)]),_:1},8,["class"])}}}),oe=j(se,[["__scopeId","data-v-fabdc2f5"]]),ae={class:"page-wrapper"},le={class:"mt-5 font-weight-medium"},ne={class:"back-button-container pt-4 pb-2 pl-0 ml-0"},re={key:0,class:"d-flex justify-center my-5"},ce="https://t.me/babichbaker_course",ue=I({__name:"CourseBlocks",setup(n){const{mdAndDown:m}=L(),y=O(),f=W(),d=u(!1),o=u(""),_=u("Пекарская витрина: от Булок до Хлеба"),v=u([]),k=u(null),T=u(""),U=u(""),C=async t=>{if(t){d.value=!0,o.value="";try{const e=await K.fetchCourseWithBlocks(t);_.value=e.courseTitle||"Курс без названия",v.value=e.blocks||[],T.value=e.chat,e.imageUrl&&(U.value=D(e.imageUrl))}catch(e){console.error("Ошибка при загрузке курса:",e),o.value="Не удалось загрузить данные курса. Пожалуйста, попробуйте позже.",v.value=[]}finally{d.value=!1}}},D=t=>{if(!t)return"/public/default-lesson.jpg";let e=t.replace(/https:\/\/https:\/\//g,"https://");return e=e.replace(/https:\/\/https\//g,"https://"),e},V=(t,e)=>({id:t.blockId,number:e.toString(),title:t.blockTitle,imagePath:D(t.imageUrl),progress:{completed:t.completedLessons,total:t.lessonsCount},duration:`${t.lessonsCount*2.5} минут`,lessons:t.lessonsCount}),A=()=>{const e=сourseSupport&&сourseSupport.value&&typeof сourseSupport.value=="string"&&сourseSupport.value.trim()!==""&&!сourseSupport.value.includes("null")?сourseSupport.value:ce;window.open(e,"_blank")},E=(t,e)=>{y.push(`/course/${t}/blocks/${e}`)};return H(()=>f.params.courseId,t=>{t&&t!==k.value&&(k.value=t,C(t))}),R(()=>{const t=f.params.courseId;t&&(k.value=t,C(t))}),(t,e)=>{const q=r("v-icon"),S=r("v-btn"),N=r("v-progress-circular"),$=r("v-alert"),B=r("v-container");return a(),h("div",ae,[s(G),s(B,{class:"lesson-container",width:b(m)?"100vw":"60vw"},{default:l(()=>[c("h2",le,p(_.value),1),e[4]||(e[4]=c("h3",{class:"mb-2 font-weight-regular"},"Авторский курс от Максима Бабича",-1)),s(S,{class:"text-none",variant:"outlined",color:"#313131",onClick:A},{default:l(()=>[s(q,null,{default:l(()=>e[0]||(e[0]=[i("mdi-pencil")])),_:1}),e[1]||(e[1]=i(" Чат курса "))]),_:1}),c("div",ne,[s(S,{variant:"outlined",density:"comfortable",to:"/lk",class:"back-button font-weight-light text-none"},{default:l(()=>e[2]||(e[2]=[i(" В профиль ")])),_:1})]),d.value?(a(),h("div",re,[s(N,{indeterminate:"",color:"#F48A21"})])):x("",!0),o.value?(a(),g($,{key:1,type:"error",class:"my-3"},{default:l(()=>[i(p(o.value),1)]),_:1})):x("",!0),!d.value&&!o.value?(a(),g(B,{key:2,class:"d-flex flex-column ga-7 ml-0 pl-0 align-center"},{default:l(()=>[(a(!0),h(z,null,M(v.value,(w,P)=>(a(),g(oe,{key:w.blockId,"course-data":V(w,P+1),onClick:ie=>E(k.value,w.blockId)},null,8,["course-data","onClick"]))),128)),v.value.length===0?(a(),g($,{key:0,type:"info",class:"my-3"},{default:l(()=>e[3]||(e[3]=[i(" Для этого курса еще не добавлены блоки ")])),_:1})):x("",!0)]),_:1})):x("",!0)]),_:1},8,["width"]),s(J)])}}}),fe=j(ue,[["__scopeId","data-v-36d235c6"]]);export{fe as default};
