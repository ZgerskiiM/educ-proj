import{I as s,A as r}from"./index-Cuu_6W6T.js";const t="https://babichschool.ru:8080",o=()=>r.getToken(),n={async fetchCourseWithBlocks(e){return(await s.get(`${t}/users/courses/${e}`,{headers:{Authorization:`Bearer ${o()}`}})).data}};export{n as c};
