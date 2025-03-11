import{d as se,b as $,r as c,p as R,z as ne,o as a,c as f,f as n,B as re,s as X,C as Y,i as q,l as E,w as o,g as r,t as S,n as ue,e as i,m as ie,k as T,_ as te,u as ce,x as N,D as ve,L as B,h as F,F as K,q as de,j as me,E as fe,G as Z}from"./index-_IANILbF.js";import{H as pe}from"./Header-D6UShxcF.js";import{c as ee}from"./courseService-C1ECZ5cD.js";import{c as ge}from"./courseUserService-CDlgJdbB.js";const _e=["poster"],ye=["src","type"],ke={class:"video-progress"},he={class:"controls-main"},be={class:"volume-control"},we={class:"time-display"},Ie=se({__name:"VideoPlayer",props:{videoUrl:{type:String,default:""},posterImage:{type:String,default:""}},setup(z){const x=z,p=$(()=>{if(!x.videoUrl)return"video/avi";switch(x.videoUrl.split(".").pop().toLowerCase()){case"mp4":return"video/mp4";case"webm":return"video/webm";case"ogg":return"video/ogg";case"avi":return"video/avi";case"mov":return"video/quicktime";default:return"video/mp4"}}),M=u=>{if(!u)return"/public/default-lesson.jpg";let e=u.replace(/https:\/\/https:\/\//g,"https://");return e=e.replace(/https:\/\/https\//g,"https://"),e},t=c(null),b=c(null),g=c(!1),A=c(0),k=c(0),h=c(0),l=c(1),_=c(!1),w=c(!1),y=c(!0);let v=null;const d=()=>{y.value=!0,v&&clearTimeout(v),v=setTimeout(()=>{g.value&&(y.value=!1)},3e3)},I=()=>{t.value&&(g.value?t.value.pause():t.value.play(),g.value=!g.value,d())},C=()=>{t.value&&(A.value=t.value.currentTime,h.value=A.value/k.value*100)},j=()=>{t.value&&(k.value=t.value.duration)},G=()=>{if(!t.value)return;const u=h.value/100*k.value;t.value.currentTime=u},W=()=>{t.value&&(t.value.volume=l.value,_.value=l.value===0)},D=()=>{t.value&&(_.value?(_.value=!1,l.value=l.value===0?1:l.value,t.value.volume=l.value):(_.value=!0,t.value.volume=0))},H=()=>{b.value&&(document.fullscreenElement?(document.exitFullscreen(),w.value=!1):(b.value.requestFullscreen(),w.value=!0))},L=()=>{w.value=!!document.fullscreenElement},P=u=>{const e=Math.floor(u/60),s=Math.floor(u%60);return`${e}:${s<10?"0":""}${s}`},V=u=>{(document.activeElement===t.value||document.activeElement===b.value||w.value)&&(u.code==="Space"?(I(),u.preventDefault()):u.code==="ArrowRight"?(t.value&&(t.value.currentTime+=10),d()):u.code==="ArrowLeft"?(t.value&&(t.value.currentTime-=10),d()):u.code==="KeyM"?(D(),d()):u.code==="KeyF"&&(H(),d()))};return R(()=>{window.addEventListener("keydown",V),document.addEventListener("fullscreenchange",L),b.value&&b.value.addEventListener("mousemove",d),t.value&&(t.value.volume=l.value)}),ne(()=>{window.removeEventListener("keydown",V),document.removeEventListener("fullscreenchange",L),b.value&&b.value.removeEventListener("mousemove",d),v&&clearTimeout(v)}),(u,e)=>{const s=T("v-icon");return a(),f("div",{class:"video-container mb-5",ref_key:"videoContainer",ref:b},[n("video",{ref_key:"videoPlayer",ref:t,onTimeupdate:C,onLoadedmetadata:j,onEnded:e[0]||(e[0]=m=>g.value=!1),onClick:I,poster:z.posterImage},[n("source",{src:M(z.videoUrl),type:p.value},null,8,ye)],40,_e),n("div",{class:ue(["video-controls",{"controls-visible":y.value}])},[n("div",ke,[n("div",{class:"progress-bar",style:re({width:`${h.value}%`})},null,4),X(n("input",{type:"range",class:"progress-seek",min:"0",max:"100",step:"0.1","onUpdate:modelValue":e[1]||(e[1]=m=>h.value=m),onInput:G},null,544),[[Y,h.value]])]),n("div",he,[n("button",{class:"control-btn",onClick:q(I,["stop"])},[g.value?(a(),E(s,{key:1},{default:o(()=>e[4]||(e[4]=[r("mdi-pause")])),_:1})):(a(),E(s,{key:0},{default:o(()=>e[3]||(e[3]=[r("mdi-play")])),_:1}))]),n("div",be,[n("button",{class:"control-btn",onClick:q(D,["stop"])},[_.value?(a(),E(s,{key:0},{default:o(()=>e[5]||(e[5]=[r("mdi-volume-off")])),_:1})):l.value<.5?(a(),E(s,{key:1},{default:o(()=>e[6]||(e[6]=[r("mdi-volume-low")])),_:1})):(a(),E(s,{key:2},{default:o(()=>e[7]||(e[7]=[r("mdi-volume-high")])),_:1}))]),X(n("input",{type:"range",class:"volume-slider",min:"0",max:"1",step:"0.1","onUpdate:modelValue":e[2]||(e[2]=m=>l.value=m),onInput:W},null,544),[[Y,l.value]])]),n("div",we,S(P(A.value))+" / "+S(P(k.value)),1),n("button",{class:"control-btn fullscreen-btn",onClick:q(H,["stop"])},[w.value?(a(),E(s,{key:0},{default:o(()=>e[8]||(e[8]=[r("mdi-fullscreen-exit")])),_:1})):(a(),E(s,{key:1},{default:o(()=>e[9]||(e[9]=[r("mdi-fullscreen")])),_:1}))])])],2),g.value?ie("",!0):(a(),f("div",{key:0,class:"big-play-button",onClick:q(I,["stop"])},[i(s,{size:"64"},{default:o(()=>e[10]||(e[10]=[r("mdi-play")])),_:1})]))],512)}}}),Le=te(Ie,[["__scopeId","data-v-2135aa7c"]]),xe={class:"page-wrapper"},Ue={key:0,class:"d-flex justify-center my-5"},Te={key:1,class:"error-message"},$e={key:2},Se={key:0,class:"breadcrumbs-container"},Ce={key:1,class:"back-button-container pt-4 pb-2 pl-0 ml-0"},Pe={class:"content-wrapper flex-column"},Ee={class:"video-block mb-0 pt-0"},Be={class:"font-weight-medium mb-3"},De={class:"nav--buttons pt-0 mt-0 mb-1 d-flex justify-end"},Ve={class:"lesson-sidebar"},Fe=["innerHTML"],Me={key:0,class:"font-weight-light"},Ae=["href"],je={key:1,class:"panel-text font-weight-light"},Ne=se({__name:"LessonPage",setup(z){const{mdAndDown:x}=ce(),p=de(),M=me(),t=c(""),b=c(""),g=e=>{if(!e)return"/public/default-lesson.jpg";let s=e.replace(/https:\/\/https:\/\//g,"https://");return s=s.replace(/https:\/\/https\//g,"https://"),s};R(async()=>{const e=p.params.lessonId,s=localStorage.getItem(`lesson_image_${e}`);s&&(console.log("Получено изображение урока из localStorage:",s),t.value=s,localStorage.removeItem(`lesson_image_${e}`)),await Promise.all([P(),V()]),!t.value&&l.value.imageUrl&&(t.value=g(l.value.imageUrl))});const A=async e=>{if(e){k.value=!0,h.value="";try{const s=await ge.fetchCourseWithBlocks(e);b.value=s.courseTitle||"Курс без названия",courseBlocks.value=s.blocks||[]}catch(s){console.error("Ошибка при загрузке курса:",s),h.value="Не удалось загрузить данные курса. Пожалуйста, попробуйте позже.",courseBlocks.value=[]}finally{k.value=!1}}};R(()=>{const e=p.params.courseId;e&&(_.value=e,A(e))});const k=c(!0),h=c(""),l=c({lessonTitle:"",videoUrl:"",description:"",sheetUrl:"",imageUrl:""}),_=$(()=>p.params.courseId),w=$(()=>p.params.blocksId),y=$(()=>p.params.lessonId),v=c([]),d=$(()=>{const e=y.value?String(y.value):null;return v.value.findIndex(s=>{const m=s.id?String(s.id):null,U=s.lessonId?String(s.lessonId):null;return m===e||U===e})}),I=$(()=>{if(d.value>0){const e=v.value[d.value-1];return e.id||e.lessonId}return null}),C=$(()=>{if(d.value<v.value.length-1&&d.value!==-1){const e=v.value[d.value+1];return e.id||e.lessonId}return null}),j=c(!1),G=async e=>{if(B.isLessonStarted(e)){j.value=!0;return}try{await fe(e),j.value=!0}catch(s){console.error("Ошибка при отметке начала урока:",s)}},W=async()=>{if(L.value){console.log("Переход уже выполняется, пропускаем");return}if(!C.value){console.log("Нет следующего урока");return}L.value=!0;try{const e=v.value.find(s=>(s.id||s.lessonId)===C.value);if(e&&(e.imageUrl||e.lessonImage)){const s=g(e.imageUrl||e.lessonImage);console.log("Сохраняем изображение следующего урока:",s),localStorage.setItem(`lesson_image_${C.value}`,s)}if(await Z(y.value),console.log("Урок отмечен как завершенный"),await new Promise(s=>setTimeout(s,300)),C.value){const s=`/course/${_.value}/blocks/${w.value}/lessons/${C.value}`;console.log("Переход к следующему уроку:",s),typeof B<"u"&&B.resetLessonState(y.value),M.push(s)}}catch(e){console.error("Ошибка при переходе к следующему уроку:",e)}finally{setTimeout(()=>{L.value=!1},500)}},D=$(()=>d.value!==-1&&d.value===v.value.length-1),H=async()=>{if(!L.value){L.value=!0;try{await Z(y.value),await new Promise(e=>setTimeout(e,300)),B.resetLessonState(y.value),M.push(`/course/${_.value}`)}catch(e){console.error("Ошибка при завершении последнего урока:",e),alert("Произошла ошибка при завершении урока. Пожалуйста, попробуйте еще раз.")}finally{setTimeout(()=>{L.value=!1},500)}}};N(()=>p.params.lessonId,(e,s)=>{j.value=!1,e&&e!==s&&(l.value={lessonTitle:"",videoUrl:"",description:"",sheetUrl:""},k.value=!0,setTimeout(()=>{P()},100))},{immediate:!0}),N(v,()=>{},{immediate:!0}),N([()=>p.params.courseId,()=>p.params.blocksId],([e,s])=>{e&&s&&V()});const L=c(!1),P=async()=>{k.value=!0,h.value="";try{const e=p.params.lessonId;console.log("Загрузка данных для урока:",e);const s=await ee.getLessonDetails(e);console.log("Получены данные урока:",s),l.value=s,!t.value&&s.imageUrl&&(t.value=g(s.imageUrl)),await G(e)}catch(e){console.error("Ошибка при загрузке урока:",e),h.value="Не удалось загрузить данные урока"}finally{k.value=!1}};N(()=>p.params.lessonId,(e,s)=>{e&&e!==s&&(l.value={lessonTitle:"",videoUrl:"",description:"",sheetUrl:""},k.value=!0,P())},{immediate:!0}),N(()=>p.params.lessonId,e=>{if(e){const s=localStorage.getItem(`lesson_image_${e}`);if(s)console.log("Получено изображение урока из localStorage при переходе:",s),t.value=s,localStorage.removeItem(`lesson_image_${e}`);else{const m=v.value.find(U=>(U.id||U.lessonId)===e);m&&(m.imageUrl||m.lessonImage)?t.value=g(m.imageUrl||m.lessonImage):t.value=""}}},{immediate:!0});const V=async()=>{try{const e=await ee.getLessonsByBlockId(w.value);v.value=e}catch(e){console.error("Ошибка при загрузке списка уроков:",e)}},u=()=>{if(!I.value){console.log("Нет предыдущего урока");return}const e=v.value.find(s=>(s.id||s.lessonId)===I.value);if(e&&(e.imageUrl||e.lessonImage)){const s=g(e.imageUrl||e.lessonImage);console.log("Сохраняем изображение предыдущего урока:",s),localStorage.setItem(`lesson_image_${I.value}`,s)}typeof B<"u"&&B.resetLessonState(y.value),M.push(`/course/${_.value}/blocks/${w.value}/lessons/${I.value}`)};return ve(()=>{y.value&&B.resetLessonState(y.value)}),R(async()=>{await Promise.all([P(),V()])}),(e,s)=>{const m=T("v-progress-circular"),U=T("v-breadcrumbs-item"),le=T("v-breadcrumbs"),J=T("v-btn"),O=T("v-icon"),Q=T("v-expansion-panel"),oe=T("v-expansion-panels"),ae=T("v-container");return a(),f("div",xe,[i(pe),i(ae,{fluid:"",class:"content-container px-6 pt-2",width:F(x)?"100vw":"80vw"},{default:o(()=>[k.value?(a(),f("div",Ue,[i(m,{indeterminate:"",color:"#F48A21"})])):h.value?(a(),f("div",Te,S(h.value),1)):(a(),f("div",$e,[F(x)?(a(),f("div",Ce,[i(J,{variant:"outlined",density:"comfortable",to:`/course/${_.value}/blocks/${w.value}`,class:"back-button text-none"},{default:o(()=>s[3]||(s[3]=[r(" К урокам ")])),_:1},8,["to"])])):(a(),f("div",Se,[i(le,{class:"mb-1 pl-0 font-weight-light",color:"#F48A21"},{default:o(()=>[i(U,{to:"/lk"},{default:o(()=>s[1]||(s[1]=[r("Профиль")])),_:1}),i(U,{to:`/course/${_.value}`},{default:o(()=>[r(S(b.value),1)]),_:1},8,["to"]),i(U,{to:`/course/${_.value}/blocks/${w.value}`},{default:o(()=>s[2]||(s[2]=[r("Уроки")])),_:1},8,["to"]),i(U,{disabled:""},{default:o(()=>[r(S(l.value.lessonTitle),1)]),_:1})]),_:1})])),n("div",Pe,[n("div",Ee,[n("h2",Be,S(l.value.lessonTitle),1),i(Le,{"video-url":l.value.videoUrl,"poster-image":t.value},null,8,["video-url","poster-image"]),n("div",De,[i(J,{class:"text-none rounded-lg",width:F(x)?"40vw":"regular",variant:"outlined",onClick:u,disabled:!I.value},{default:o(()=>[F(x)?(a(),f(K,{key:0},[i(O,null,{default:o(()=>s[4]||(s[4]=[r("mdi-arrow-left")])),_:1}),s[5]||(s[5]=r(" Предыдущий "))],64)):(a(),f(K,{key:1},[r(" Предыдущий урок ")],64))]),_:1},8,["width","disabled"]),i(J,{class:"text-none rounded-lg ml-4",width:F(x)?"40vw":"regular",variant:"outlined",color:"#333132",onClick:s[0]||(s[0]=ze=>D.value?H():W()),loading:L.value},{default:o(()=>[F(x)?(a(),f(K,{key:0},[r(S(D.value?"Завершить":"Следующий")+" ",1),i(O,null,{default:o(()=>s[6]||(s[6]=[r("mdi-arrow-right")])),_:1})],64)):(a(),f(K,{key:1},[r(S(D.value?"Завершить блок":"Следующий урок"),1)],64))]),_:1},8,["width","loading"])])]),n("div",Ve,[i(oe,{class:"w-100"},{default:o(()=>[i(Q,{class:"w-100",key:"1",title:"01 / Описание урока"},{text:o(()=>[n("div",{class:"font-weight-light",innerHTML:l.value.description||"Описание отсутствует"},null,8,Fe)]),_:1}),i(Q,{class:"w-100",key:"2",title:"02 / Дополнительные материалы"},{text:o(()=>[l.value.sheetUrl?(a(),f("p",Me,[n("a",{href:l.value.sheetUrl,target:"_blank",class:"material-link"}," Скачать материалы к уроку ",8,Ae)])):(a(),f("p",je," У данного урока нет материалов "))]),_:1})]),_:1})])])]))]),_:1},8,["width"])])}}}),Ge=te(Ne,[["__scopeId","data-v-954a82a4"]]);export{Ge as default};
