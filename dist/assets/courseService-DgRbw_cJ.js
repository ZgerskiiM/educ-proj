import{I as o,A as c}from"./index-Cuu_6W6T.js";const a="https://babichschool.ru:8080/admin",s=()=>c.getToken(),l={async fetchAllCourses(){return(await o.get(`${a}/courses`,{headers:{Authorization:`Bearer ${s()}`}})).data},async uploadCourseImage(r,e){try{const t=new FormData;return t.append("imageFile",e),(await o.post(`${a}/courses/${r}/image`,t,{headers:{Authorization:`Bearer ${s()}`}})).data}catch(t){throw console.error("Ошибка при загрузке изображения:",t),t}},async fetchCourse(r){return(await o.get(`${a}/courses/11`,{headers:{Authorization:`Bearer ${s()}`}})).data},async createCourse(r){const e=new URLSearchParams;return e.append("title",r.title),e.append("price",r.price),e.append("difficulty",r.difficulty),e.append("status",r.status||"PENDING"),e.append("chat",r.chat),r.imageUrl&&e.append("imageUrl",r.imageUrl),(await o.post(`${a}/courses`,e,{headers:{Authorization:`Bearer ${s()}`,"Content-Type":"application/x-www-form-urlencoded"}})).data},async updateCourse(r,e){try{const t=typeof r=="object"?e.id||e.courseId:r,n=new FormData;n.append("courseId",e.courseId),n.append("newTitle",e.title),n.append("price",e.price),n.append("difficulty",e.difficulty),n.append("status",e.status),n.append("chat",e.chat);const i=n;return(await o.put(`${a}/courses/${t}`,i,{headers:{Authorization:`Bearer ${s()}`,"Content-Type":"multipart/form-data"}})).data}catch(t){throw console.error(`Ошибка при обновлении курса с ID ${r}:`,t),t}},async deleteCourse(r){if(!r)throw new Error("ID курса не указан");try{return(await o.delete(`${a}/courses/${r}`,{headers:{Authorization:`Bearer ${s()}`}})).data}catch(e){throw console.error(`Ошибка при удалении курса с ID ${r}:`,e),e}},async createCourseWithImage(r,e){const t=new FormData;return t.append("title",r.title),t.append("price",r.price),t.append("difficulty",r.difficulty),t.append("status",r.status||"PENDING"),t.append("chat",r.chat),console.log(r),e?t.append("imageFile",e):r.imageUrl&&t.append("imageUrl",r.imageUrl),(await o.post(`${a}/courses`,t,{headers:{Authorization:`Bearer ${s()}`,"Content-Type":"multipart/form-data"}})).data},async getBlocksByCourseId(r){var e;try{const t=await o.get(`${a}/courses/${r}/details`,{headers:{Authorization:`Bearer ${s()}`}});return!t.data||!t.data.blocks?(console.warn("API не вернул блоки курса"),[]):t.data.blocks}catch(t){return console.error(`Ошибка при получении блоков курса ${r}:`,t),console.error("Детали ошибки:",(e=t.response)==null?void 0:e.data),[]}},async updateBlock(r,e){try{const t=new FormData;return e.title&&t.append("newTitle",e.title),e.courseId!==void 0&&t.append("courseId",e.courseId),(await o.put(`${a}/blocks/${r}`,t,{headers:{Authorization:`Bearer ${s()}`}})).data}catch(t){throw console.error(`Ошибка при обновлении блока с ID ${r}:`,t),t}},async updateBlockWithImage(r,e){const t=new FormData;return t.append("title",r.title),r.courseId!==void 0&&t.append("courseId",r.courseId),e&&t.append("imageFile",e),(await o.put(`${a}/blocks/${r.id}`,t,{headers:{Authorization:`Bearer ${s()}`,"Content-Type":"multipart/form-data"}})).data},async getLessonsByBlockId(r){try{const e=await o.get(`${a}/blocks/${r}/details`,{headers:{Authorization:`Bearer ${s()}`}});return!e.data||!e.data.lessons?(console.warn("API не вернул уроки блока"),[]):e.data.lessons||[]}catch(e){return console.error(`Ошибка при получении уроков блока ${r}:`,e),[]}},async getLessonDetails(r){try{return(await o.get(`${a}/lessons/${r}/details`,{headers:{Authorization:`Bearer ${s()}`}})).data}catch(e){throw console.error(`Ошибка при получении деталей урока ${r}:`,e),e}},async createLesson(r){try{let e=`${a}/lessons?blockId=${r.blockId}&title=${encodeURIComponent(r.title)}`;return r.description&&(e+=`&description=${encodeURIComponent(r.description)}`),(await o.post(e,null,{headers:{Authorization:`Bearer ${s()}`}})).data}catch(e){throw console.error("Ошибка при создании урока:",e),e}},async deleteLesson(r){try{return(await o.delete(`${a}/lessons/${r}`,{headers:{Authorization:`Bearer ${s()}`}})).data}catch(e){throw console.error(`Ошибка при удалении урока ${r}:`,e),e}},async updateLesson(r,e){try{const t=new FormData;e.newTitle&&t.append("newTitle",e.newTitle),e.newDescription&&t.append("newDescription",e.newDescription),e.newSheetUrl&&t.append("newSheetUrl",e.newSheetUrl);const n=`${a}/lessons/${r}`;return(await o.put(n,t,{headers:{Authorization:`Bearer ${s()}`}})).data}catch(t){throw console.error(`Ошибка при обновлении урока ${r}:`,t),t}},async uploadLessonImage(r,e){try{const t=new FormData;return t.append("imageFile",e),(await o.post(`${a}/lessons/${r}/image`,t,{headers:{Authorization:`Bearer ${s()}`}})).data}catch(t){throw console.error(`Ошибка при загрузке изображения для урока ${r}:`,t),t}},async uploadLessonVideo(r,e){try{const t=new FormData;return t.append("videoFile",e),(await o.post(`${a}/lessons/${r}/video`,t,{headers:{Authorization:`Bearer ${s()}`},onUploadProgress:i=>{const p=Math.round(i.loaded*100/i.total);console.log("Прогресс загрузки видео:",p,"%")}})).data}catch(t){throw console.error(`Ошибка при загрузке видео для урока ${r}:`,t),t}},async uploadBlockImage(r,e){try{const t=new FormData;return t.append("imageFile",e),(await o.post(`${a}/blocks/${r}/image`,t,{headers:{Authorization:`Bearer ${s()}`}})).data}catch(t){throw console.error(`Ошибка при загрузке изображения для блока ${r}:`,t),t}},async getBlockDetails(r){try{return(await o.get(`${a}/admin/blocks/${r}/details`)).data}catch(e){throw e}},async getLessonDetails(r){try{return(await o.get(`${a}/lessons/${r}/details`,{headers:{Authorization:`Bearer ${s()}`}})).data}catch(e){throw console.error(`Ошибка при получении деталей урока ${r}:`,e),e}},async createBlock(r){const e=new URLSearchParams;return r.title&&e.append("title",r.title),r.courseId!==void 0&&e.append("courseId",r.courseId),r.imageUrl&&e.append("imageUrl",r.imageUrl),(await o.post(`${a}/blocks`,e,{headers:{Authorization:`Bearer ${s()}`,"Content-Type":"application/x-www-form-urlencoded"}})).data},async createBlockWithImage(r,e){const t=new FormData;return t.append("title",r.title),t.append("courseId",r.courseId),e?t.append("imageFile",e):r.imageUrl&&t.append("imageUrl",r.imageUrl),(await o.post(`${a}/blocks`,t,{headers:{Authorization:`Bearer ${s()}`,"Content-Type":"multipart/form-data"}})).data},async reorderBlocks(r,e){var t;try{const n=e.map(p=>({id:parseInt(p.id,10),order:parseInt(p.order,10)}));return(await o({method:"post",url:`${a}/courses/${r}/reorder-blocks`,headers:{Authorization:`Bearer ${s()}`,"Content-Type":"application/json"},data:n})).data}catch(n){throw console.error("Ошибка при изменении порядка блоков:",n),console.error("Детали ошибки:",(t=n.response)==null?void 0:t.data),n}},async reorderLessons(r,e){try{return(await o.post(`${a}/blocks/${r}/reorder-lessons`,e,{headers:{Authorization:`Bearer ${s()}`}})).data}catch(t){throw console.error("Ошибка при изменении порядка уроков:",t),t}},async deleteBlock(r){return(await o.delete(`${a}/blocks/${r}`,{headers:{Authorization:`Bearer ${s()}`}})).data}};export{l as c};
