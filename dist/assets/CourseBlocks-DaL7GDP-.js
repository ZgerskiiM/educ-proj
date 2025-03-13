import{d as L,u as j,m as u,o as a,i as b,w as o,e as s,f as d,n as A,h as k,t as i,b as v,g as l,_ as I,r as g,p as M,x as R,j as x,F as z,y as O,l as W,q as G}from"./index-DqudrVho.js";import{H as J,A as K}from"./AppFooter-Du173oWm.js";import{c as Q}from"./courseUserService-WOEUTbAa.js";const X={class:"d-flex align-center justify-space-between"},Y={class:"text-h7"},Z={class:"font-weight-regular"},ee={class:"font-weight-light"},te={key:0,class:"chip d-flex flex-wrap gap-2 mt-2"},se={key:1,class:"chip-container w-100 mt-2"},oe=L({__name:"CourseCard",props:{courseData:{type:Object,required:!0,default:()=>({id:0,number:"1",title:"Загрузка...",imagePath:"/public/placeholder.jpg",progress:{completed:0,total:0},duration:"0 часов",lessons:0,cards:0})}},emits:["click"],setup(n){const{smAndDown:w,mdAndDown:_}=j();return(y,r)=>{const m=u("v-img"),c=u("v-chip"),f=u("v-card");return a(),b(f,{onClick:r[0]||(r[0]=h=>y.$emit("click",n.courseData.id)),class:A(k(_)?"course-block-card d-flex flex-column rounded-sm":"rounded-lg	 course-block-card d-flex align-center"),width:"100%",flat:"",elevation:"1"},{default:o(()=>[s(m,{src:n.courseData.imagePath,class:"responsive-image rounded-t","aspect-ratio":16/9,cover:""},null,8,["src"]),d("div",{class:A(k(_)?"card-text px-2 py-3 flex-grow-1":"card-text ml-10 flex-grow-1")},[d("div",X,[d("div",Y,[d("span",Z,"Блок "+i(n.courseData.number)+" / ",1),d("span",ee,i(n.courseData.title),1)])]),k(_)?(a(),v("div",se,[s(c,{class:"custom-chip1 equal-width-chip",text:n.courseData.duration,label:""},null,8,["text"]),s(c,{style:{"background-color":"#FFE68E"},class:"custom-chip2 equal-width-chip mx-1",label:"",color:"#333132"},{default:o(()=>[l(i(n.courseData.lessons)+" уроков ",1)]),_:1}),s(c,{style:{"background-color":"#FEE99E",color:"#333132"},class:"custom-chip3 equal-width-chip",label:""},{default:o(()=>[l(i(n.courseData.cards)+" технологических ",1),r[1]||(r[1]=d("br",null,null,-1)),r[2]||(r[2]=l(" карт "))]),_:1})])):(a(),v("div",te,[s(c,{class:"custom-chip1 font-weight-light my-1",text:n.courseData.duration,label:""},null,8,["text"]),s(c,{style:{"background-color":"#FFE68E"},class:"custom-chip2 font-weight-light my-1 ml-2",label:"",color:"#333132"},{default:o(()=>[l(i(n.courseData.lessons)+" уроков ",1)]),_:1}),s(c,{style:{"background-color":"#FEE99E",color:"#333132"},class:"custom-chip3 font-weight-light my-1 ml-2",label:""},{default:o(()=>[l(i(n.courseData.cards)+" технологических карт ",1)]),_:1})]))],2)]),_:1},8,["class"])}}}),ae=I(oe,[["__scopeId","data-v-14d0dd3e"]]),le={class:"page-wrapper"},ne={class:"mt-5 font-weight-medium"},re={key:0,class:"breadcrumbs-container"},ce={key:1,class:"back-button-container pt-4 pb-2 pl-0 ml-0"},ue={key:2,class:"d-flex justify-center my-5"},ie="https://t.me/babichbaker_course",de=L({__name:"CourseBlocks",setup(n){const{mdAndDown:w}=j(),_=W(),y=G(),r=g(!1),m=g(""),c=g("Пекарская витрина: от Булок до Хлеба"),f=g([]),h=g(null),p=g(""),D=async t=>{if(t){r.value=!0,m.value="";try{const e=await Q.fetchCourseWithBlocks(t);c.value=e.courseTitle||"Курс без названия",f.value=e.blocks||[],p.value=e.chat}catch(e){console.error("Ошибка при загрузке курса:",e),m.value="Не удалось загрузить данные курса. Пожалуйста, попробуйте позже.",f.value=[]}finally{r.value=!1}}},S=t=>{if(!t)return"/public/default-lesson.jpg";let e=t.replace(/https:\/\/https:\/\//g,"https://");return e=e.replace(/https:\/\/https\//g,"https://"),e},T=(t,e)=>({id:t.blockId,number:e.toString(),title:t.blockTitle,imagePath:S(t.imageUrl),progress:{completed:t.completedLessons,total:t.lessonsCount},duration:`${t.lessonsCount*2.5} минут`,lessons:t.lessonsCount,cards:Math.round(t.lessonsCount)}),V=()=>{const e=p&&p.value&&typeof p.value=="string"&&p.value.trim()!==""&&!p.value.includes("null")?p.value:ie;window.open(e,"_blank")},q=(t,e)=>{_.push(`/course/${t}/blocks/${e}`)};return M(()=>{const t=y.params.courseId;t&&(h.value=t,D(t))}),R(()=>y.params.courseId,t=>{t&&t!==h.value&&(h.value=t,D(t))}),(t,e)=>{const N=u("v-icon"),$=u("v-btn"),E=u("v-breadcrumbs-item"),U=u("v-breadcrumbs"),P=u("v-progress-circular"),F=u("v-alert"),B=u("v-container");return a(),v("div",le,[s(J),s(B,{width:k(w)?"100vw":"60vw"},{default:o(()=>[d("h2",ne,i(c.value),1),e[5]||(e[5]=d("h3",{class:"mb-2 font-weight-regular"},"Авторский курс от Максима Бабича",-1)),s($,{class:"font-weight-regular text-none",variant:"outlined",color:"#313131",onClick:V},{default:o(()=>[s(N,null,{default:o(()=>e[0]||(e[0]=[l("mdi-pencil")])),_:1}),e[1]||(e[1]=l(" Чат курса "))]),_:1}),k(w)?(a(),v("div",ce,[s($,{variant:"outlined",density:"comfortable",to:"/lk",class:"back-button text-none"},{default:o(()=>e[3]||(e[3]=[l(" В профиль ")])),_:1})])):(a(),v("div",re,[s(U,{class:"mb-1 pl-0 font-weight-regular",color:"#F48A21"},{default:o(()=>[s(E,{to:"/lk"},{default:o(()=>e[2]||(e[2]=[l("Профиль")])),_:1}),s(E,{disabled:"",to:"/course"},{default:o(()=>[l(i(c.value),1)]),_:1})]),_:1})])),r.value?(a(),v("div",ue,[s(P,{indeterminate:"",color:"#F48A21"})])):x("",!0),m.value?(a(),b(F,{key:3,type:"error",class:"my-3"},{default:o(()=>[l(i(m.value),1)]),_:1})):x("",!0),!r.value&&!m.value?(a(),b(B,{key:4,class:"d-flex flex-column ga-7 ml-0 pl-0 align-center"},{default:o(()=>[(a(!0),v(z,null,O(f.value,(C,H)=>(a(),b(ae,{key:C.blockId,"course-data":T(C,H+1),onClick:me=>q(h.value,C.blockId)},null,8,["course-data","onClick"]))),128)),f.value.length===0?(a(),b(F,{key:0,type:"info",class:"my-3"},{default:o(()=>e[4]||(e[4]=[l(" Для этого курса еще не добавлены блоки ")])),_:1})):x("",!0)]),_:1})):x("",!0)]),_:1},8,["width"]),s(K)])}}}),ge=I(de,[["__scopeId","data-v-14cc1d94"]]);export{ge as default};
