import{H as z,A as W}from"./AppFooter-Du173oWm.js";import{d as E,u as A,c as C,m as n,o as c,i as N,w as r,e as s,f as d,t as o,b as i,n as P,j as J,h as y,_ as R,r as a,p as B,g as k,F as K,y as Q,q as X,l as Y,E as Z}from"./index-DqudrVho.js";import{c as ee}from"./courseUserService-WOEUTbAa.js";const te={class:"pa-4"},se={class:"card-text d-flex flex-wrap"},oe={class:"font-weight-bold mr-1"},ae={class:"font-weight-light"},re=E({__name:"LessonCard",props:{courseData:{type:Object,required:!0}},emits:["click"],setup(l){const{mdAndDown:_}=A(),v=l,D=C(()=>{switch(v.courseData.progress){case"IN_PROGRESS":return"В процессе";case"COMPLETED":return"Завершено";default:return"Не начато"}}),u=C(()=>{switch(v.courseData.progress){case"IN_PROGRESS":return"progress-in-progress";case"COMPLETED":return"progress-completed";default:return"progress-not-started"}});return(w,f)=>{const g=n("v-img"),x=n("v-card");return c(),N(x,{onClick:f[0]||(f[0]=I=>w.$emit("click",l.courseData.id)),class:"course-lessons rounded-lg",width:y(_)?"50vw":"14vw",elevation:"1"},{default:r(()=>[s(g,{src:l.courseData.imagePath,class:"responsive-image rounded-t","aspect-ratio":16/9,cover:""},null,8,["src"]),d("div",te,[d("div",se,[d("span",oe,o(l.courseData.number)+" /",1),d("span",ae,o(l.courseData.title),1)]),l.courseData.progress?(c(),i("div",{key:0,class:P(["progress-badge mt-2",u.value])},o(D.value),3)):J("",!0)])]),_:1},8,["width"])}}}),ce=R(re,[["__scopeId","data-v-cfe78874"]]),ne={class:"page-wrapper"},le={class:"info"},ue={class:"mt-5 font-weight-medium"},ie={class:"mb-2 font-weight-regular"},de={key:0,class:"breadcrumbs-container"},ve={key:1,class:"back-button-container pt-4 pb-2 pl-0 ml-0"},pe={key:0,class:"text-center w-100"},me={key:1,class:"text-center w-100 red--text"},_e=E({__name:"CourseLessons",setup(l){const{mdAndDown:_}=A(),v=X(),D=Y(),u=C(()=>v.params.courseId),w=C(()=>v.params.blocksId),f=a(),g=a(""),x=a([]),I=a("Авторский курс от Максима Бабича"),F=a("1"),$=a(""),h=a(!0),p=a(""),T=a([]),L=e=>{if(!e)return"/public/default-lesson.jpg";let t=e.replace(/https:\/\/https:\/\//g,"https://");return t=t.replace(/https:\/\/https\//g,"https://"),t},O=async e=>{if(e){h.value=!0,p.value="";try{const t=await ee.fetchCourseWithBlocks(e);g.value=t.courseTitle||"Курс без названия",x.value=t.blocks||[],f.value=t.imageUrl}catch(t){console.error("Ошибка при загрузке курса:",t),p.value="Не удалось загрузить данные курса. Пожалуйста, попробуйте позже.",x.value=[]}finally{h.value=!1}}};B(()=>{const e=v.params.courseId;e&&(u.value=e,O(e))});const U=async()=>{h.value=!0,p.value="";try{const e=await Z(w.value);$.value=e.blockTitle,T.value=e.lessons}catch(e){p.value="Не удалось загрузить данные уроков",console.error(e)}finally{h.value=!1}},V=(e,t)=>{if(t){const m=L(t);console.log(`Сохраняем изображение урока ${e}:`,m),localStorage.setItem(`lesson_image_${e}`,m)}D.push(`/course/${u.value}/blocks/${w.value}/lessons/${e}`)};return B(()=>{U()}),(e,t)=>{const m=n("v-breadcrumbs-item"),j=n("v-breadcrumbs"),M=n("v-btn"),q=n("v-card-title"),G=n("v-progress-circular"),S=n("v-container");return c(),i("div",ne,[s(z),s(S,{width:y(_)?"100vw":"60vw"},{default:r(()=>[d("div",le,[d("h2",ue,o(g.value),1),d("h3",ie,o(I.value),1)]),y(_)?(c(),i("div",ve,[s(M,{variant:"outlined",density:"comfortable",to:`/course/${u.value}`,class:"back-button text-none"},{default:r(()=>t[1]||(t[1]=[k(" К блокам ")])),_:1},8,["to"])])):(c(),i("div",de,[s(j,{class:"mb-1 pl-0 font-weight-light",color:"#F48A21"},{default:r(()=>[s(m,{to:"/lk"},{default:r(()=>t[0]||(t[0]=[k("Профиль")])),_:1}),s(m,{to:`/course/${u.value}`},{default:r(()=>[k(o(g.value),1)]),_:1},8,["to"]),s(m,{disabled:"",to:`/course/${u.value}/blocks`},{default:r(()=>[k(o($.value),1)]),_:1},8,["to"])]),_:1})])),s(q,{class:"course-title font-weight-bold pt-0 pl-0",style:{color:"#333132"}},{default:r(()=>[k(" Блок "+o(F.value)+" / "+o($.value),1)]),_:1}),s(S,{class:P(y(_)?"d-flex flex-row flex-wrap ga-5 ml-0 pl-0 mr-0 pr-0":"d-flex flex-row flex-wrap ga-5 ml-0 pl-0 align-center")},{default:r(()=>[h.value?(c(),i("div",pe,[s(G,{indeterminate:"",color:"#F48A21"})])):p.value?(c(),i("div",me,o(p.value),1)):(c(!0),i(K,{key:2},Q(T.value,(b,H)=>(c(),N(ce,{key:b.lessonId,"course-data":{id:b.lessonId,number:String(H+1).padStart(2,"0"),title:b.lessonTitle,imagePath:L(f.value.value)},onClick:fe=>V(b.lessonId,b.imageUrl)},null,8,["course-data","onClick"]))),128))]),_:1},8,["class"])]),_:1},8,["width"]),s(W)])}}}),ke=R(_e,[["__scopeId","data-v-ebf9b697"]]);export{ke as default};
