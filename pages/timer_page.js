let colorTimerStarted=!1;function loadTimers(e){e?getUserData().then(e=>{handleErrors(e)||loadFarmPage(e)}).catch(e=>{console.log(e)}):chrome.storage.local.get("timer_data",function(e){loadFarmPage(e.timer_data)})}function loadFarmPage(e){let t=document.querySelector(".voxels-main");t.appendChild(addContent(e)).classList.add("active");let a=Object.keys(e).length;a<51&&(a>2?premium&&addNewButton():addNewButton()),premium||displayPremium(),colorTimerStarted||(colorTimerStarted=!0,setInterval(()=>{setTimersBG()},2e3)),t.appendChild(loadHelp())}function addContent(e){var t=document.createElement("div");return t.classList.add("voxels-main-page"),loadFarms(t,e),t}function loadFarms(e,t){for(let[a,r]of Object.entries(t)){let o=a.charAt(0).toUpperCase()+a.slice(1);var n=document.createElement("div");n.classList.add("voxels-main-grid"),n.classList.add("voxels-farm-"+a);var i=document.createElement("div");i.classList.add("voxels-main-title-text"),i.textContent=o,n.appendChild(i);let l=["coop","apiary","hutch","mine"];var s=document.createElement("div");for(let c of(s.classList.add("voxels-main-farm-icon-container"),l)){var d=document.createElement("div");d.classList.add("voxels-main-farm-icon");var m=document.createElement("img");m.classList.add("voxels-main-farm-image"),m.src=chrome.runtime.getURL("images")+"/Farms/voxels_"+c+".png",m.alt=c+" Image";var u=document.createElement("div");u.classList.add("plus-icon"),u.textContent="+",d.addEventListener("click",function(){addFarm(a,c)}),d.appendChild(m),d.appendChild(u),s.appendChild(d)}n.appendChild(s);var v=document.createElement("div");v.classList.add("voxels-main-remove");var f=document.createElement("div");f.classList.add("voxels-remove-icon"),f.textContent="X",v.addEventListener("click",function(){removeLocation(a)}),v.appendChild(f),n.appendChild(v),loadFarmTypes(a,n,r),e.appendChild(n)}}function loadFarmTypes(e,t,a){let r=0,o=!1;for(let[n,i]of Object.entries(a)){var l=document.createElement("div");l.classList.add("voxels-main-farm-cell"),l.classList.add("voxels-type-"+n);var s=document.createElement("div");s.classList.add("voxels-remove-farm-icon"),s.textContent="−",s.addEventListener("click",function(){removeFarm(e,n)}),l.appendChild(s);var c=document.createElement("img");c.classList.add("voxels-main-farm-image"),c.src=chrome.runtime.getURL("images")+"/Farms/voxels_"+n+".png",c.alt="Image",l.appendChild(c);var d=createTimer(i);d.addEventListener("click",function(){startTimer(e,n)}),"Start"!==d.textContent&&(o=!0),l.appendChild(d),t.appendChild(l),r++}!0==o&&t.classList.add("voxels-main-grid-active")}function handleResult(e){handleErrors(e)||("logout"==e?initiate():(reloadOverlay(),loadTitleSection("timers"),chrome.storage.local.set({timer_data:e.data}),loadTimers(0)))}function updateFarm(e,t,a){if("logout"==e)initiate();else{let r;switch(a){case"apiary":r=Math.floor(Date.now()/1e3)+2700;break;case"hutch":case"coop":r=Math.floor(Date.now()/1e3)+3600;break;case"mine":r=Math.floor(Date.now()/1e3)+5400;break;default:console.error("Invalid farmType");return}let o=createTimer(r);o.addEventListener("click",function(){startTimer(t,a)});let n=`.voxels-farm-${t} .voxels-main-farm-cell.voxels-type-${a}`,i=document.querySelector(n),l=`.voxels-farm-${t}`,s=document.querySelector(l);if(s.classList.add("voxels-main-grid-active"),i){let c=i.querySelector(".voxels-main-timer");c&&i.removeChild(c),i.appendChild(o)}else{let d=Math.floor(new Date().getTime()/1e3);loadFarmTypes(t,s,{[a]:d}),n=`.voxels-farm-${t} .voxels-main-farm-cell.voxels-type-${a}`,i=document.querySelector(n);let m=i.querySelector(".voxels-main-timer");m&&i.removeChild(m),i.appendChild(o)}}}function removeLocation(e){chrome.storage.local.get("user_info",async function(t){let a=t.user_info;try{let r=await makeFetchRequest(apiURL,{name:a,operation:"removeLocation",extra:e});handleResult(r)}catch(o){console.error(o)}})}function addFarm(e,t){chrome.storage.local.get("user_info",async function(a){let r=a.user_info;try{let o=await makeFetchRequest(apiURL,{name:r,operation:"addFarm",extra:{[e]:t}});if(!handleErrors(o)){if("logout"==o)initiate();else{let n=`.voxels-farm-${e}`,i=document.querySelector(n),l=Math.floor(new Date().getTime()/1e3);chrome.storage.local.set({timer_data:o.data}),loadFarmTypes(e,i,{[t]:l})}}}catch(s){console.error(s)}})}function removeFarm(e,t){chrome.storage.local.get("user_info",async function(a){let r=a.user_info;try{let o=await makeFetchRequest(apiURL,{name:r,operation:"removeFarm",extra:{[e]:t}});if(!handleErrors(o)){if("logout"==o)initiate();else{let n=`.voxels-farm-${e} .voxels-main-farm-cell.voxels-type-${t}`,i=document.querySelector(n);chrome.storage.local.set({timer_data:o.data}),i.remove()}}}catch(l){console.error(l)}})}function startTimer(e,t){chrome.storage.local.get("user_info",async function(a){let r=a.user_info;try{let o=await makeFetchRequest(apiURL,{name:r,operation:"startTimer",extra:{[e]:t}});handleErrors(o)||("logout"==o?initiate():(updateFarm(o,e,t),chrome.storage.local.set({timer_data:o.data})))}catch(n){console.error(n)}})}function startTimerType(e){chrome.storage.local.get("user_info",async function(t){let a=t.user_info,r="",o={name:a,operation:"updateTimer",extra:{[r]:e}};try{let n=await makeFetchRequest(apiURL,o);handleErrors(n)||("logout"==n?initiate():(chrome.storage.local.set({timer_data:n.data.timer_data}),r=n.data.location,"timers"===currentActiveTab&&updateFarm(n,r,e)))}catch(i){console.error(i)}})}function addNewButton(){let e=document.querySelector(".voxels-main");var t=document.createElement("div");t.classList.add("voxels-main-new","pixel-border"),e.appendChild(t),t.innerHTML="Add current location",t.addEventListener("click",addButtonClick)}async function addButtonClick(){try{let e=await requestNewLocation();handleResult(e)}catch(t){console.error("Error:",t)}}async function requestNewLocation(){return new Promise((e,t)=>{chrome.storage.local.get("user_info",async function(a){let r=a.user_info;try{let o=await makeFetchRequest(apiURL,{name:r,operation:"add"});if("error"in o.data)e(o);else{let n=o.data;e(n.online?n:{error:"Error 1061"})}}catch(i){t(i)}})})}function createTimer(e){var t=document.createElement("div");function a(){let a=calculateTimeRemaining(e),o=formatTimeRemaining(a);t.textContent=o,a<=0?(clearInterval(r),t.textContent="Start",t.style.backgroundColor="green",t.classList.remove("timer-running")):(t.style.backgroundColor="#2c2c2c",t.classList.contains("timer-running")||t.classList.add("timer-running"))}t.classList.add("voxels-main-timer"),a();var r=setInterval(a,1e3);return t}function calculateTimeRemaining(e){let t=Math.floor(Date.now()/1e3);return Math.max(0,e-t)}function formatTimeRemaining(e){return`${padZero(Math.floor(e/3600))}:${padZero(Math.floor(e%3600/60))}:${padZero(e%60)}`}function padZero(e){return e<10?`0${e}`:`${e}`}function setTimersBG(){let e=document.querySelectorAll(".voxels-main-grid");e.forEach(e=>{let t=e.querySelector(".timer-running");t&&!e.classList.contains("voxels-main-grid-active")?e.classList.add("voxels-main-grid-active"):!t&&e.classList.contains("voxels-main-grid-active")&&e.classList.remove("voxels-main-grid-active")})}