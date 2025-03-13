import{d as Y,c as P,r as c,p as K,z as se,o as i,b,f as a,B as le,s as O,C as Q,k as N,i as S,w as v,g as p,t as M,n as oe,e as h,j as J,m as V,_ as Z,u as ae,x as z,D as ne,h as B,F as H,q as re,l as ue}from"./index-DnWPXEAX.js";import{H as ie,A as ce}from"./AppFooter-Dc1Yc8yi.js";import{c as X}from"./courseService-k8ouBn9l.js";import{c as ve}from"./courseUserService-CT5bbBLw.js";const y={started:new Set,completed:new Set,inProgress:new Set},G={isLessonStarted(n){return y.started.has(n)},markLessonAsStarted(n){y.started.add(n)},isLessonCompleted(n){return y.completed.has(n)},markLessonAsCompleted(n){y.completed.add(n)},isRequestInProgress(n){return y.inProgress.has(n)},startRequest(n){y.inProgress.add(n)},finishRequest(n){y.inProgress.delete(n)},resetLessonState(n){y.started.delete(n),y.completed.delete(n)},resetAllStates(){y.started.clear(),y.completed.clear(),y.inProgress.clear()}},de=["poster"],me=["src","type"],pe={class:"video-progress"},fe={class:"controls-main"},ge={class:"volume-control"},_e={class:"time-display"},ye=Y({__name:"VideoPlayer",props:{videoUrl:{type:String,default:""},posterImage:{type:String,default:""}},setup(n){const $=n,w=P(()=>{if(!$.videoUrl)return"video/avi";switch($.videoUrl.split(".").pop().toLowerCase()){case"mp4":return"video/mp4";case"webm":return"video/webm";case"ogg":return"video/ogg";case"avi":return"video/avi";case"mov":return"video/quicktime";default:return"video/mp4"}}),R=l=>{if(!l)return"/public/default-lesson.jpg";let s=l.replace(/https:\/\/https:\/\//g,"https://");return s=s.replace(/https:\/\/https\//g,"https://"),s},o=c(null),r=c(null),x=c(!1),U=c(0),T=c(0),C=c(0),u=c(1),_=c(!1),d=c(!1),k=c(!0);let I=null;const m=()=>{k.value=!0,I&&clearTimeout(I),I=setTimeout(()=>{x.value&&(k.value=!1)},3e3)},f=()=>{o.value&&(x.value?o.value.pause():o.value.play(),x.value=!x.value,m())},L=()=>{o.value&&(U.value=o.value.currentTime,C.value=U.value/T.value*100)},E=()=>{o.value&&(T.value=o.value.duration)},j=()=>{if(!o.value)return;const l=C.value/100*T.value;o.value.currentTime=l},W=()=>{o.value&&(o.value.volume=u.value,_.value=u.value===0)},A=()=>{o.value&&(_.value?(_.value=!1,u.value=u.value===0?1:u.value,o.value.volume=u.value):(_.value=!0,o.value.volume=0))},F=()=>{r.value&&(document.fullscreenElement?(document.exitFullscreen(),d.value=!1):(r.value.requestFullscreen(),d.value=!0))},q=()=>{d.value=!!document.fullscreenElement},e=l=>{const s=Math.floor(l/60),g=Math.floor(l%60);return`${s}:${g<10?"0":""}${g}`},t=l=>{(document.activeElement===o.value||document.activeElement===r.value||d.value)&&(l.code==="Space"?(f(),l.preventDefault()):l.code==="ArrowRight"?(o.value&&(o.value.currentTime+=10),m()):l.code==="ArrowLeft"?(o.value&&(o.value.currentTime-=10),m()):l.code==="KeyM"?(A(),m()):l.code==="KeyF"&&(F(),m()))};return K(()=>{window.addEventListener("keydown",t),document.addEventListener("fullscreenchange",q),r.value&&r.value.addEventListener("mousemove",m),o.value&&(o.value.volume=u.value)}),se(()=>{window.removeEventListener("keydown",t),document.removeEventListener("fullscreenchange",q),r.value&&r.value.removeEventListener("mousemove",m),I&&clearTimeout(I)}),(l,s)=>{const g=V("v-icon");return i(),b("div",{class:"video-container mb-5",ref_key:"videoContainer",ref:r},[a("video",{ref_key:"videoPlayer",ref:o,onTimeupdate:L,onLoadedmetadata:E,onEnded:s[0]||(s[0]=D=>x.value=!1),onClick:f,poster:n.posterImage},[a("source",{src:R(n.videoUrl),type:w.value},null,8,me)],40,de),a("div",{class:oe(["video-controls",{"controls-visible":k.value}])},[a("div",pe,[a("div",{class:"progress-bar",style:le({width:`${C.value}%`})},null,4),O(a("input",{type:"range",class:"progress-seek",min:"0",max:"100",step:"0.1","onUpdate:modelValue":s[1]||(s[1]=D=>C.value=D),onInput:j},null,544),[[Q,C.value]])]),a("div",fe,[a("button",{class:"control-btn",onClick:N(f,["stop"])},[x.value?(i(),S(g,{key:1},{default:v(()=>s[4]||(s[4]=[p("mdi-pause")])),_:1})):(i(),S(g,{key:0},{default:v(()=>s[3]||(s[3]=[p("mdi-play")])),_:1}))]),a("div",ge,[a("button",{class:"control-btn",onClick:N(A,["stop"])},[_.value?(i(),S(g,{key:0},{default:v(()=>s[5]||(s[5]=[p("mdi-volume-off")])),_:1})):u.value<.5?(i(),S(g,{key:1},{default:v(()=>s[6]||(s[6]=[p("mdi-volume-low")])),_:1})):(i(),S(g,{key:2},{default:v(()=>s[7]||(s[7]=[p("mdi-volume-high")])),_:1}))]),O(a("input",{type:"range",class:"volume-slider",min:"0",max:"1",step:"0.1","onUpdate:modelValue":s[2]||(s[2]=D=>u.value=D),onInput:W},null,544),[[Q,u.value]])]),a("div",_e,M(e(U.value))+" / "+M(e(T.value)),1),a("button",{class:"control-btn fullscreen-btn",onClick:N(F,["stop"])},[d.value?(i(),S(g,{key:0},{default:v(()=>s[8]||(s[8]=[p("mdi-fullscreen-exit")])),_:1})):(i(),S(g,{key:1},{default:v(()=>s[9]||(s[9]=[p("mdi-fullscreen")])),_:1}))])])],2),x.value?J("",!0):(i(),b("div",{key:0,class:"big-play-button",onClick:N(f,["stop"])},[h(g,{size:"64"},{default:v(()=>s[10]||(s[10]=[p("mdi-play")])),_:1})]))],512)}}}),he=Z(ye,[["__scopeId","data-v-2135aa7c"]]),we={class:"page-wrapper"},ke={key:0,class:"d-flex justify-center my-5"},Ie={key:1,class:"error-message"},be={key:2},xe={class:"back-button-container pt-4 pb-2 pl-0 ml-0"},Ue={class:"content-wrapper flex-column"},Le={class:"video-block mb-0 pt-0"},Se={class:"font-weight-medium mb-3"},$e={class:"nav--buttons pt-0 mt-0 mb-1 d-flex justify-end"},Te={class:"lesson-sidebar"},Ce=["innerHTML"],Pe={class:"font-weight-light"},Ee=["href"],De=Y({__name:"LessonPage",setup(n){const{mdAndDown:$}=ae(),w=re(),R=ue(),o=c(),r=c(""),x=c(""),U=e=>{if(!e)return"/public/default-lesson.jpg";let t=e.replace(/https:\/\/https:\/\//g,"https://");return t=t.replace(/https:\/\/https\//g,"https://"),t};K(async()=>{const e=w.params.lessonId,t=localStorage.getItem(`lesson_image_${e}`);t&&(r.value=t,localStorage.removeItem(`lesson_image_${e}`)),await Promise.all([T(),F()]),!r.value&&d.value.imageUrl&&(r.value=U(d.value.imageUrl))});const T=async()=>{let t=0;for(;t<3;)try{u.value=!0;const l=await X.getLessonDetails(m.value);return d.value=l,l}catch(l){if(t++,console.error(`Ошибка при загрузке урока (попытка ${t}/3):`,l),t>=3)throw _.value="Не удалось загрузить урок. Пожалуйста, проверьте подключение к интернету и попробуйте снова.",l;await new Promise(s=>setTimeout(s,1e3*t))}finally{u.value=!1}},C=async e=>{if(e){u.value=!0,_.value="";try{const t=await ve.fetchCourseWithBlocks(e);x.value=t.courseTitle||"Курс без названия",o.value=t.imageUrl}catch(t){console.error("Ошибка при загрузке курса:",t),_.value="Не удалось загрузить данные курса. Пожалуйста, попробуйте позже."}finally{u.value=!1}}};K(()=>{const e=w.params.courseId;e&&(k.value=e,C(e))});const u=c(!0),_=c(""),d=c({lessonTitle:"",videoUrl:"",description:"",sheetUrl:"",imageUrl:""}),k=P(()=>w.params.courseId),I=P(()=>w.params.blocksId),m=P(()=>w.params.lessonId),f=c([]),L=P(()=>{const e=m.value?String(m.value):null;return f.value.findIndex(t=>{const l=t.id?String(t.id):null,s=t.lessonId?String(t.lessonId):null;return l===e||s===e})}),E=P(()=>{if(L.value>0){const e=f.value[L.value-1];return e.id||e.lessonId}return null}),j=P(()=>{if(L.value<f.value.length-1&&L.value!==-1){const e=f.value[L.value+1];return e.id||e.lessonId}return null});c(!1);const W=async()=>{if(A.value){R.push(`/course/${k.value}`);return}if(j.value){const e=`/course/${k.value}/blocks/${I.value}/lessons/${j.value}`;R.push(e)}},A=P(()=>L.value!==-1&&L.value===f.value.length-1);z(f,()=>{},{immediate:!0}),z([()=>w.params.courseId,()=>w.params.blocksId],([e,t])=>{e&&t&&F()});const F=async()=>{try{const e=await X.getLessonsByBlockId(I.value);f.value=e||[]}catch(e){console.error("Ошибка при загрузке списка уроков:",e),_.value="Не удалось загрузить список уроков. Пожалуйста, попробуйте позже."}};z(()=>w.params.lessonId,(e,t)=>{e&&e!==t&&(d.value={lessonTitle:"",videoUrl:"",description:"",sheetUrl:""},u.value=!0,T())},{immediate:!0}),z(()=>w.params.lessonId,e=>{if(e){const t=localStorage.getItem(`lesson_image_${e}`);if(t)r.value=t,localStorage.removeItem(`lesson_image_${e}`);else{const l=f.value.find(s=>(s.id||s.lessonId)===e);l&&(l.imageUrl||l.lessonImage)?r.value=U(l.imageUrl||l.lessonImage):r.value=""}}},{immediate:!0});const q=()=>{if(!E.value)return;const e=f.value.find(t=>(t.id||t.lessonId)===E.value);if(e&&(e.imageUrl||e.lessonImage)){const t=U(e.imageUrl||e.lessonImage);localStorage.setItem(`lesson_image_${E.value}`,t)}typeof G<"u"&&G.resetLessonState(m.value),R.push(`/course/${k.value}/blocks/${I.value}/lessons/${E.value}`)};return ne(()=>{m.value&&G.resetLessonState(m.value)}),K(async()=>{try{u.value=!0,await C(k.value);const e=await T();if(await F(),e&&e.imageUrl)r.value=U(e.imageUrl);else{const t=localStorage.getItem(`lesson_image_${m.value}`);t?r.value=t:r.value="/public/default-lesson.jpg"}}catch(e){_.value="Ошибка при загрузке урока. Попробуйте обновить страницу.",console.error("Ошибка загрузки:",e)}finally{u.value=!1}}),(e,t)=>{const l=V("v-progress-circular"),s=V("v-btn"),g=V("v-icon"),D=V("v-expansion-panel"),ee=V("v-expansion-panels"),te=V("v-container");return i(),b("div",we,[h(ie),h(te,{fluid:"",class:"content-container px-6 pt-2",width:B($)?"100vw":"60vw"},{default:v(()=>[u.value?(i(),b("div",ke,[h(l,{indeterminate:"",color:"#F48A21"})])):_.value?(i(),b("div",Ie,M(_.value),1)):(i(),b("div",be,[a("div",xe,[h(s,{variant:"outlined",density:"comfortable",to:`/course/${k.value}/blocks/${I.value}`,class:"back-button text-none"},{default:v(()=>t[1]||(t[1]=[p(" К урокам ")])),_:1},8,["to"])]),a("div",Ue,[a("div",Le,[a("h2",Se,M(d.value.lessonTitle),1),h(he,{"video-url":d.value.videoUrl,"poster-image":U(r.value)},null,8,["video-url","poster-image"]),a("div",$e,[h(s,{class:"text-none rounded-lg",width:B($)?"40vw":"regular",variant:"outlined",onClick:q,disabled:!E.value},{default:v(()=>[B($)?(i(),b(H,{key:0},[h(g,null,{default:v(()=>t[2]||(t[2]=[p("mdi-arrow-left")])),_:1}),t[3]||(t[3]=p(" Предыдущий "))],64)):(i(),b(H,{key:1},[p(" Предыдущий урок ")],64))]),_:1},8,["width","disabled"]),h(s,{class:"text-none rounded-lg ml-4",width:B($)?"40vw":"regular",variant:"outlined",color:"#333132",onClick:t[0]||(t[0]=Ve=>W())},{default:v(()=>[B($)?(i(),b(H,{key:0},[p(M(A.value?"Завершить":"Следующий")+" ",1),h(g,null,{default:v(()=>t[4]||(t[4]=[p("mdi-arrow-right")])),_:1})],64)):(i(),b(H,{key:1},[p(M(A.value?"Завершить блок":"Следующий урок"),1)],64))]),_:1},8,["width"])])]),a("div",Te,[h(ee,{class:"w-100"},{default:v(()=>[d.value.description?(i(),S(D,{class:"w-100",key:"1",title:"01 / Описание урока"},{text:v(()=>[a("div",{class:"font-weight-light",innerHTML:d.value.description||"Описание отсутствует"},null,8,Ce)]),_:1})):J("",!0),d.value.sheetUrl?(i(),S(D,{class:"w-100",key:"2",title:"02 / Дополнительные материалы"},{text:v(()=>[a("p",Pe,[a("a",{href:d.value.sheetUrl,target:"_blank",class:"material-link"}," Скачать материалы к уроку ",8,Ee)])]),_:1})):J("",!0)]),_:1})])])]))]),_:1},8,["width"]),h(ce)])}}}),Be=Z(De,[["__scopeId","data-v-0939f466"]]);export{Be as default};
