function loadTasks(e){premium?chrome.storage.local.get("task_data",function(e){e.task_data?loadTaskPage(e.task_data):loadTaskPage(!1)}):displayPremium()}function loadTaskPage(e){reloadOverlay(),loadTitleSection();let t=document.querySelector(".voxels-main");if(!1===e){var a=document.createElement("div");a.classList.add("voxels-main-new"),t.appendChild(a);var s=document.createElement("div");s.textContent="Open the tasks in Buck's Galore first.",a.appendChild(s)}else t.appendChild(createTaskContainer(e))}function createTaskContainer(e){var t=document.createElement("div");return t.classList.add("voxels-task-items-container"),e.forEach(e=>{var a=document.createElement("div");a.classList.add("voxels-task-item");var s=document.createElement("div");s.classList.add("voxels-task-item-visual"),a.appendChild(s);var n=document.createElement("img");if(n.src=e.image,s.appendChild(n),"Loading..."!==e.name){var l=document.createElement("div");l.classList.add("voxels-task-quantity"),l.textContent=e.quantity,s.appendChild(l);var r=document.createElement("div");r.classList.add("voxels-task-cost-container");var i=document.createElement("img");i.src=e.costType,r.appendChild(i);var o=document.createElement("div");o.classList.add("voxels-task-cost"),o.textContent=e.cost,r.appendChild(o);var c=document.createElement("div");c.classList.add("voxels-task-name"),c.textContent=e.name,a.appendChild(c),a.appendChild(r)}else{var c=document.createElement("div");c.classList.add("voxels-task-name","js-voxels-task-name-reload-state"),c.textContent="Visit task board to reload..",a.appendChild(c)}t.appendChild(a)}),t}function checkTasks(){compareTasks().then(e=>{if(e){let t=getCurrentTasks();chrome.storage.local.set({task_data:t}),setTaskData(t).then(e=>{"success"===e&&"tasks"===currentActiveTab&&loadTaskPage(t)})}}).catch(e=>{console.log("Error comparing tasks:",e)})}function compareTasks(){return new Promise((e,t)=>{chrome.storage.local.get("task_data",function(t){if(t.task_data){let a=getCurrentTasks(),s=t.task_data;a.length!==s.length&&e(!0);for(let n=0;n<a.length;n++)compareTaskObjects(a[n],s[n])||e(!0);e(!1)}else e(!0)})})}function compareTaskObjects(e,t){return e.name===t.name&&e.quantity===t.quantity&&e.position===t.position}function setTaskData(e){return new Promise(async(t,a)=>{chrome.storage.local.get("user_info",async function(s){let n={name:s.user_info,operation:"addTasks",extra:e};try{let l=await makeFetchRequest(apiURL,n);t(l.data)}catch(r){a(r)}})})}function getCurrentTasks(){let e=document.querySelectorAll(nodeNames.tasksCard);if(e.length>0){let t=[];if(e.forEach((e,a)=>{if(!e.classList.contains(nodeNames.tasksTitle)){let s=e.querySelector(nodeNames.tasksTitle);if(s){let n=s.innerText,l,r="";"NEW TASK IN:"===n?n="Loading...":(l=e.querySelectorAll(nodeNames.tasksCostDisplay)[1].querySelector(nodeNames.tasksCostImage).src,r=e.querySelectorAll(nodeNames.tasksCostDisplay)[1].querySelector(nodeNames.tasksCost).innerText);let i=e.querySelector(nodeNames.tasksImage).src,o=e.querySelector(nodeNames.tasksQuantity),c=o?parseInt(o.innerText,10):1;t.push({name:n,quantity:c,image:i,costType:l,cost:r,position:a})}}}),t.length>0)return t}}