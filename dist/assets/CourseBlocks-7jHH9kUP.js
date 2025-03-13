import{d as j,u as I,m as l,o as a,i as b,w as o,e as s,f as m,n as L,h as k,t as v,b as p,g as r,_ as S,r as _,p as R,x as z,j as y,F as M,y as O,l as W,q as G}from"./index-D_rpuQft.js";import{H as J,A as K}from"./AppFooter-CnV8umds.js";import{c as Q}from"./courseUserService-Ds0-JBWc.js";const X={class:"d-flex align-center justify-space-between"},Y={class:"text-h7"},Z={class:"font-weight-regular"},ee={class:"font-weight-light"},te={key:0,class:"chip d-flex flex-wrap gap-2 mt-2"},se={key:1,class:"chip-container w-100 mt-2"},oe=j({__name:"CourseCard",props:{courseData:{type:Object,required:!0,default:()=>({id:0,number:"1",title:"Загрузка...",imagePath:"/public/placeholder.jpg",progress:{completed:0,total:0},duration:"0 часов",lessons:0,cards:0})}},emits:["click"],setup(n){const{smAndDown:w,mdAndDown:g}=I();return(x,u)=>{const i=l("v-img"),c=l("v-chip"),f=l("v-card");return a(),b(f,{onClick:u[0]||(u[0]=h=>x.$emit("click",n.courseData.id)),class:L(k(g)?"course-block-card d-flex flex-column rounded-sm":"rounded-lg	 course-block-card d-flex align-center"),width:"100%",flat:"",elevation:"1"},{default:o(()=>[s(i,{src:n.courseData.imagePath,class:"responsive-image rounded-t","aspect-ratio":16/9,cover:""},null,8,["src"]),m("div",{class:L(k(g)?"card-text px-2 py-3 flex-grow-1":"card-text ml-10 flex-grow-1")},[m("div",X,[m("div",Y,[m("span",Z,"Блок "+v(n.courseData.number)+" / ",1),m("span",ee,v(n.courseData.title),1)])]),k(g)?(a(),p("div",se,[s(c,{class:"custom-chip1 equal-width-chip",text:n.courseData.duration,label:""},null,8,["text"]),s(c,{style:{"background-color":"#FFE68E"},class:"custom-chip2 equal-width-chip mx-1",label:"",color:"#333132"},{default:o(()=>[r(v(n.courseData.lessons)+" уроков ",1)]),_:1})])):(a(),p("div",te,[s(c,{class:"custom-chip1 font-weight-light my-1",text:n.courseData.duration,label:""},null,8,["text"]),s(c,{style:{"background-color":"#FFE68E"},class:"custom-chip2 font-weight-light my-1 ml-2",label:"",color:"#333132"},{default:o(()=>[r(v(n.courseData.lessons)+" уроков ",1)]),_:1})]))],2)]),_:1},8,["class"])}}}),ae=S(oe,[["__scopeId","data-v-7cd3f626"]]),le={class:"page-wrapper"},ne={class:"mt-5 font-weight-medium"},re={key:0,class:"breadcrumbs-container"},ce={key:1,class:"back-button-container pt-4 pb-2 pl-0 ml-0"},ue={key:2,class:"d-flex justify-center my-5"},ie="https://t.me/babichbaker_course",de=j({__name:"CourseBlocks",setup(n){const{mdAndDown:w}=I(),g=W(),x=G(),u=_(!1),i=_(""),c=_("Пекарская витрина: от Булок до Хлеба"),f=_([]),h=_(null),d=_(""),D=async t=>{if(t){u.value=!0,i.value="";try{const e=await Q.fetchCourseWithBlocks(t);c.value=e.courseTitle||"Курс без названия",f.value=e.blocks||[],d.value=e.chat}catch(e){console.error("Ошибка при загрузке курса:",e),i.value="Не удалось загрузить данные курса. Пожалуйста, попробуйте позже.",f.value=[]}finally{u.value=!1}}},T=t=>{if(!t)return"/public/default-lesson.jpg";let e=t.replace(/https:\/\/https:\/\//g,"https://");return e=e.replace(/https:\/\/https\//g,"https://"),e},V=(t,e)=>({id:t.blockId,number:e.toString(),title:t.blockTitle,imagePath:T(t.imageUrl),progress:{completed:t.completedLessons,total:t.lessonsCount},duration:`${t.lessonsCount*2.5} минут`,lessons:t.lessonsCount}),E=()=>{const e=d&&d.value&&typeof d.value=="string"&&d.value.trim()!==""&&!d.value.includes("null")?d.value:ie;window.open(e,"_blank")},q=(t,e)=>{g.push(`/course/${t}/blocks/${e}`)};return R(()=>{const t=x.params.courseId;t&&(h.value=t,D(t))}),z(()=>x.params.courseId,t=>{t&&t!==h.value&&(h.value=t,D(t))}),(t,e)=>{const N=l("v-icon"),$=l("v-btn"),B=l("v-breadcrumbs-item"),U=l("v-breadcrumbs"),P=l("v-progress-circular"),F=l("v-alert"),A=l("v-container");return a(),p("div",le,[s(J),s(A,{width:k(w)?"100vw":"60vw"},{default:o(()=>[m("h2",ne,v(c.value),1),e[5]||(e[5]=m("h3",{class:"mb-2 font-weight-regular"},"Авторский курс от Максима Бабича",-1)),s($,{class:"font-weight-regular text-none",variant:"outlined",color:"#313131",onClick:E},{default:o(()=>[s(N,null,{default:o(()=>e[0]||(e[0]=[r("mdi-pencil")])),_:1}),e[1]||(e[1]=r(" Чат курса "))]),_:1}),k(w)?(a(),p("div",ce,[s($,{variant:"outlined",density:"comfortable",to:"/lk",class:"back-button text-none"},{default:o(()=>e[3]||(e[3]=[r(" В профиль ")])),_:1})])):(a(),p("div",re,[s(U,{class:"mb-1 pl-0 font-weight-regular",color:"#F48A21"},{default:o(()=>[s(B,{to:"/lk"},{default:o(()=>e[2]||(e[2]=[r("Профиль")])),_:1}),s(B,{disabled:"",to:"/course"},{default:o(()=>[r(v(c.value),1)]),_:1})]),_:1})])),u.value?(a(),p("div",ue,[s(P,{indeterminate:"",color:"#F48A21"})])):y("",!0),i.value?(a(),b(F,{key:3,type:"error",class:"my-3"},{default:o(()=>[r(v(i.value),1)]),_:1})):y("",!0),!u.value&&!i.value?(a(),b(A,{key:4,class:"d-flex flex-column ga-7 ml-0 pl-0 align-center"},{default:o(()=>[(a(!0),p(M,null,O(f.value,(C,H)=>(a(),b(ae,{key:C.blockId,"course-data":V(C,H+1),onClick:me=>q(h.value,C.blockId)},null,8,["course-data","onClick"]))),128)),f.value.length===0?(a(),b(F,{key:0,type:"info",class:"my-3"},{default:o(()=>e[4]||(e[4]=[r(" Для этого курса еще не добавлены блоки ")])),_:1})):y("",!0)]),_:1})):y("",!0)]),_:1},8,["width"]),s(K)])}}}),_e=S(de,[["__scopeId","data-v-5cbdb904"]]);export{_e as default};
