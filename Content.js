var startButton,pageContentElement,authInterval,username,voxels_location="",finalFetchComplete=!1;window.contentScriptReady=!0;const apiURL="https://pixels-api.xyz/API/load_data.php";var nodeNames=[],premium=!1,loadTasksF=!1,notifications=!0;let timersArray=[],xpArray=[];var currentActiveTab="timers";let voxelsDisplayed=!0,fullPageActive=!1,activeFullPage="settings",taskTimerSec=30;const version="48",body=document.body;function startLoad(){initiateLoad()}function checkForHUD(){let e=document.querySelector(nodeNames.hudTopLeft);e?authUser():setTimeout(checkForHUD,100)}function initiate(){function e(){try{chrome.storage.local.get(["userStatus","auth","premium"],function(e){if(chrome.runtime.lastError){displayInfo({title:"Update!",rows:[{text:"Voxels has received an updated. Please reload this page."}]});return}e.userStatus?(clearInterval(authInterval),getNodeNames(),e.auth?(loadTitleSection("timers"),loadTimers(1),setTimeout(()=>{window.postMessage({type:"VOXELS_SET_INSTANCE_ACTIVE",value:!1})},100)):startAuthProcess()):displayInfo({title:"How to login:",rows:[{image:"login.png",text:"Click on the extension in the top right corner to sign in."}]})})}catch(e){extensionUpdated()}}authInterval=setInterval(e,1e3),e()}function initiateLoad(){let e=document.createElement("script");function t(e){e.source===window&&e.data.type&&"VOXELS_INITIATED"===e.data.type&&(e.data.label,loadBasicOverlay(),initiate(),setupDraggable(),window.removeEventListener("message",t))}e.src=chrome.runtime.getURL("images/Setup/login_page.js"),document.head.appendChild(e),window.addEventListener("message",t)}function extensionUpdated(){displayInfo({title:"Update!",rows:[{text:"Voxels has received an updated. Please reload this page."}]})}function startAuthProcess(){displayInfo({title:"Next step:",rows:[{text:"Start Pixels to authenticate."}]}),checkForHUD()}function getNodeNames(){chrome.storage.local.get("node_info",function(e){void 0!==e.node_info&&(nodeNames=chrome.runtime.lastError?["error"]:e.node_info)})}function displayInfo(e){reloadOverlay();let t=document.querySelector(".voxels-main");var a=document.createElement("div");a.classList.add("voxels-main-top-section"),t.appendChild(a);var i=document.createElement("a");i.classList.add("voxels-main-title"),i.href="https://voxels-extension.com",i.target="_blank",i.textContent="Voxels-Extension.com",a.appendChild(i);var s=document.createElement("div");if(s.classList.add("voxels-main-setup","pixel-border"),s.style.display="block",t.appendChild(s),e.rows[0].image){var l=document.createElement("img");l.src=chrome.runtime.getURL("images")+"/Setup/"+e.rows[0].image,l.classList.add("voxels-setup-image"),s.appendChild(l)}var n=document.createElement("p");n.textContent=e.rows[0].text,n.classList.add("voxels-setup-text"),s.appendChild(n)}function authUser(){window.postMessage({type:"VOXELS_INITIATE_SETUP"}),chrome.storage.local.get(["user_info"],function(e){var t=e.user_info;function a(e){if(e.source===window&&e.data.type&&"VOXELS_PLAYER_LABEL"===e.data.type){let i=e.data.label;i==t&&(chrome.storage.local.set({auth:!0}),reloadOverlay(),loadTitleSection("timers"),loadTimers(1),window.removeEventListener("message",a),window.postMessage({type:"VOXELS_SET_INSTANCE_ACTIVE",value:!1}))}}window.addEventListener("message",a)})}function getUserData(){return new Promise((e,t)=>{chrome.storage.local.get(["user_info","user_acde","notifications"],function(a){let i=a.user_info,s=a.user_acde;i?(loadingScreen(1),(function e(t,s,l=3,n=5e3){return new Promise((e,o)=>{let r=()=>{fetch(t,{method:"POST",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},body:JSON.stringify(s)}).then(e=>{if(200!==e.status)throw Error("fail");return e.json()}).then(t=>{let s=t.status;if("ok"===s){username=i,chrome.storage.local.set({pid:t.data.premium.pid,timer_data:t.data.timer,storage_data:t.data.storage,task_data:t.data.tasks,node_info:t.data.nodeData,user_acde:t.data.acde}),timersArray=t.data.timer,taskTimerSec=t.data.taskTime;var l=t.data.xpArray;xpArray=l.map((e,t)=>l.slice(0,t+1).reduce((e,t)=>e+t,0)),notifications=a.notifications,getNodeNames(),loadTasksF=t.data.loadTasksF,finalFetchComplete=!0,loadingScreen(0),t.data.news&&quickMessage(t.data.news,"news");let n=t.data.premium.premium,r=t.data.iData;if(n){let d=t.data.premium.premium_end,c=Math.floor(Date.now()/1e3);d>c&&(d-c<172800&&showAlert("Your premium runs out within the next 2 days! Renew now!","info"),premium=n)}var p=document.createElement("div");p.setAttribute("id","voxels-main-nav"),document.body.appendChild(p);var m=document.createElement("div");m.setAttribute("id","voxels-toggle-voxels-button"),m.classList.add("clickable"),document.body.appendChild(m);var u=document.createElement("div");u.classList.add("voxels-toggle-voxels-button-icon"),m.appendChild(u);var v=document.createElement("img");u.appendChild(v),v.src=chrome.runtime.getURL("images/icons/icon__show.svg");var g=document.createElement("div");g.setAttribute("id","voxels-main-nav-inner"),g.classList.add("clickable"),p.appendChild(g),document.getElementById("voxels-main-nav-inner").onclick=function(){document.body.classList.toggle("js-voxels-active")},p.appendChild(createSubNavButtons());let h=limiter(toggleInventoryStack,1e4);document.addEventListener("keydown",function(e){if(null===document.querySelector(".voxels-popup-info")){if(Date.now(),"v"===e.key||"V"===e.key)body.classList.toggle("js-voxels-main-modal-active"),body.classList.contains("js-voxels-main-modal-active")?(p.style.display="flex",m.style.display="none"):(p.style.display="none",m.style.display="flex");else if(e.key===nodeNames.presst||e.key===nodeNames.pressT)h();else if("r"===e.key||"R"===e.key)togglePrices();else if("n"===e.key||"N"===e.key)toggleNotifications();else if(e.shiftKey&&e.code.startsWith("Digit")){let t=e.code.replace("Digit","");switch(t){case"1":changeTab("timers");break;case"2":changeTab("storages");break;case"3":changeTabWithLimit(changeTab,"tasks",5e3);break;case"4":changeTabWithLimit(changeTab,"stats",1e4);break;case"5":changeTabWithLimit(changeTab,"premium",1e4)}}else e.shiftKey&&"KeyG"===e.code?(e.stopPropagation(),changeTabWithLimit(switchFullPage,"guilds",5e3)):e.shiftKey&&"KeyA"===e.code?(e.stopPropagation(),changeTabWithLimit(switchFullPage,"player",5e3)):e.shiftKey&&"KeyP"===e.code?(e.stopPropagation(),changeTabWithLimit(switchFullPage,"pass",5e3)):e.shiftKey&&"KeyS"===e.code?(e.stopPropagation(),switchFullPage("settings")):e.shiftKey&&"KeyF"===e.code&&(e.stopPropagation(),fullPageActive?closeFullpage():openFullpage())}}),m.addEventListener("click",function(){body.classList.toggle("js-voxels-main-modal-active"),body.classList.contains("js-voxels-main-modal-active")?(p.style.display="flex",m.style.display="none"):(p.style.display="none",m.style.display="flex")}),mainInterval(n,r),e(t.data.timer)}else console.log("Error in fetching user data:",t.error),o(Error(t.error))}).catch(e=>{console.log(e),l>0?(console.log(`Retrying in ${n/1e3} seconds. Remaining retries: ${l}`),setTimeout(r,n)):o(Error("Failed to fetch user data after retries"))})};r()})})("https://pixels-api.xyz/API/load_data.php",{name:i,user_acde:s,operation:"requestWithPremium",version:"47"}).then(e).catch(t)):quickMessage("Please logout and login to Voxels.","error")})})}startLoad();const lastTabChangeTimes={};function changeTabWithLimit(e,t,a){let i=Date.now(),s=lastTabChangeTimes[t];s&&i-s<a?quickMessage("Please wait "+Math.round((a-(i-s))/1e3)+"s...","error"):(e(t),lastTabChangeTimes[t]=i)}function loadBasicOverlay(){document.body.classList.toggle("js-voxels-main-modal-active");var e=document.createElement("div");e.setAttribute("id","voxels-main-modal"),e.setAttribute("data-draggable","true"),e.classList.add("pixel-border"),document.body.appendChild(e),window.innerWidth>540&&chrome.storage.local.get("modalPosition",function(t){if(t.modalPosition){e.style.top=t.modalPosition.top,e.style.left=t.modalPosition.left;let a=e.getBoundingClientRect();(a.top+a.height>window.innerHeight||a.left+a.width>window.innerWidth)&&(e.style.top="70px",e.style.left="20px")}});var t=document.createElement("div");t.setAttribute("id","voxels-main-modal-header"),t.setAttribute("data-drag-handle","true"),e.appendChild(t);var a=document.createElement("div");a.classList.add("voxels-exit-icon","clickable"),a.textContent="X",e.appendChild(a),a.addEventListener("click",function(){document.body.classList.toggle("js-voxels-main-modal-active")});var i=document.createElement("div");i.classList.add("voxels-main"),e.appendChild(i),loadFullPage()}function loadFullPage(){var e=document.createElement("div");e.setAttribute("id","voxels-full-page"),e.style.display="none";var t=document.createElement("div");t.className="voxels-full-nav",["guilds","pass","player","settings"].forEach(function(e){var a=document.createElement("div");a.className="voxels-full-nav-item clickable";var i=document.createElement("img");i.src=chrome.runtime.getURL(`images/icons/icon__${e}.svg`),i.className="voxels-nav-icon",a.appendChild(i);var s=document.createElement("span");s.textContent=e.charAt(0).toUpperCase()+e.slice(1),s.className="voxels-nav-text",a.appendChild(s),"settings"==e&&a.classList.add("active"),t.appendChild(a),a.addEventListener("click",function(){changeTabWithLimit(switchFullPage,e,2e3)})});var a=document.createElement("div");a.classList.add("voxels-exit-icon","clickable"),a.textContent="X",e.appendChild(t),e.appendChild(a),a.addEventListener("click",function(){closeFullpage()}),document.body.appendChild(e);var i=document.createElement("div");i.setAttribute("id","voxels-full-page-main"),e.appendChild(i),loadFullOverlaypage(e),setTimeout(function(){loadSettings()},1e3)}function loadFullOverlaypage(e){var t=document.createElement("div");t.setAttribute("id","voxels-full-page-overlay"),e.appendChild(t);var a=document.createElement("div");a.setAttribute("id","voxels-full-overlay-top");var i=document.createElement("button");i.textContent="Back",i.onclick=function(){hideFullOverlay()},a.appendChild(i),t.appendChild(a);var s=document.createElement("div");s.setAttribute("id","voxels-full-overlay-main"),t.appendChild(s)}function switchFullPage(e){fullPageActive||openFullpage(),reloadFullPage();let t=document.querySelectorAll(".voxels-full-nav-item");t.forEach(e=>{e.classList.remove("active")});let a=Array.from(t).find(t=>t.textContent.toLowerCase()===e);a&&a.classList.add("active"),activeFullPage=e,"guilds"===e?(document.getElementById("voxels-full-page-main").classList.add("voxels-full-guilds"),loadGuildsPage()):"pass"===e?(document.getElementById("voxels-full-page-main").classList.remove("voxels-full-guilds"),loadPassPage()):"player"===e?(document.getElementById("voxels-full-page-main").classList.remove("voxels-full-guilds"),loadLeaderboardPage("overall")):"settings"===e&&(document.getElementById("voxels-full-page-main").classList.remove("voxels-full-guilds"),loadSettings())}function reloadFullPage(){let e=document.querySelector("#voxels-full-page-main");e.innerHTML=""}function createSubNavButtons(){var e=document.createElement("div");e.id="voxels-sub-nav";var t=createSubNavButton("timers","images/icons/icon__timer.svg"),a=createSubNavButton("storages","images/icons/icon__storage.svg"),i=createSubNavButton("tasks","images/icons/icon__task.svg"),s=createSubNavButton("stats","images/icons/icon__stats.svg"),l=createSubNavButton("premium","images/icons/icon__premium.svg"),n=createSubNavButton("tools","images/icons/icon__library.svg");return e.appendChild(t),e.appendChild(a),e.appendChild(i),e.appendChild(s),e.appendChild(l),e.appendChild(n),e}function createSubNavButton(e,t){let a=document.createElement("div");a.classList.add("voxels-sub-nav-button");var i=document.createElement("div");i.classList.add("voxels-sub-nav-button-icon","clickable"),a.appendChild(i);var s=document.createElement("img");i.appendChild(s),s.src=chrome.runtime.getURL(t);let l=limiter(function(){"tools"===e?openFullpage():changeTab(e)},2e3);return a.addEventListener("click",function(){l()}),a}function changeTab(e){closeFullpage(),reloadOverlay(),document.body.classList.contains("js-voxels-main-modal-active")||document.body.classList.add("js-voxels-main-modal-active");let t=document.querySelectorAll(".voxels-hover-box");t.forEach(function(e){e.parentNode&&e.parentNode.removeChild(e)}),loadTitleSection(e),currentActiveTab=e,tabNumber=0,"timers"===e?loadTimers(0):"storages"===e?(tabNumber=1,loadStorages(0)):"tasks"===e?(tabNumber=2,loadTasks(0)):"stats"===e?(tabNumber=3,loadStats(0)):"premium"===e&&(tabNumber=4,loadPremium())}function reloadOverlay(){let e=document.querySelector(".voxels-main");e.innerHTML=""}function displayPremium(){let e=document.querySelector(".voxels-main");var t=document.createElement("div");t.classList.add("voxels-main-premium","pixel-border","voxels-premium-promo");var a=document.createElement("div");a.classList.add("voxels-premium-title"),a.innerText="VOXELS PREMIUM",t.appendChild(a);var i=document.createElement("div");i.classList.add("voxels-premium-content");var s=document.createElement("div");s.classList.add("voxels-premium-list");var l=["Stats and graphs","Leaderboard & Seasons","50 Plots","Auto-Detect collecting","40 Storages","Tasks overview","More coming soon!"],n=document.createElement("ul");for(let o=0;o<l.length;o++){var r=document.createElement("li"),d=document.createElement("img");d.src=chrome.runtime.getURL("images/Other/Premium_small.png"),r.appendChild(d),r.appendChild(document.createTextNode(l[o])),n.appendChild(r)}s.appendChild(n),i.appendChild(s);var c=document.createElement("div");c.classList.add("voxels-main-premium-button"),c.innerText="Get premium!",i.appendChild(c),t.appendChild(i),t.addEventListener("click",function(){changeTab("premium")}),e.appendChild(t)}function loadTitleSection(e){let t=document.querySelector(".voxels-main");var a=document.createElement("div");a.classList.add("voxels-main-top-section"),t.appendChild(a);var i=document.createElement("a");if(i.classList.add("voxels-main-title","voxels-main-url"),i.href="https://voxels-extension.com",i.target="_blank",i.textContent="Voxels-Extension.com",a.appendChild(i),"premium"!==e){var s=document.createElement("hr");a.appendChild(s);var l=e.charAt(0).toUpperCase()+e.slice(1),n=document.createElement("div");n.textContent=l,n.classList.add("voxels-main-title"),a.appendChild(n)}}