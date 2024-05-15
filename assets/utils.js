async function makeFetchRequest(e,t,o="POST"){try{let{userStatus:a,user_acde:l}=await new Promise(e=>{chrome.storage.local.get(["userStatus","user_acde"],function(t){e(t)})});if(!a||!l)return chrome.storage.local.clear(function(){}),"logout";t.user_acde=l,t.version=version;let n=await fetch(e,{method:o,headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},body:JSON.stringify(t)});if(200!==n.status)throw Error("fail");let r=await n.json();return r}catch(s){throw console.log(s),s}}async function makeFetchRequestByPID(e,t,o="POST"){try{let{pid:a,user_acde:l}=await new Promise(e=>{chrome.storage.local.get(["pid","user_acde"],function(t){e(t)})});if(!a||!l)return chrome.storage.local.clear(function(){}),"logout";t.user_acde=l,t.version=version;let n=await fetch(e,{method:o,headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},body:JSON.stringify(t)});if(200!==n.status)throw Error("fail");let r=await n.json();return r}catch(s){throw console.log(s),s}}function debugLog(e){console.log("Voxels: "),console.log(e)}function handleErrors(e){if(e&&e.data&&e.data.error){switch(e.data.error){case"2001":showAlert("You've already added this location","error");break;case"2003":showAlert("You have to be ingame to add locations.","error");break;case"2006":showAlert("Currently only terravilla and farms can be added. More coming soon!","error");break;case"2007":break;case"2008":showAlert("This farm already exists at this location.","error");break;case"3006":showAlert("You have reached the maximum number of farms.","error");break;case"4006":showAlert("You have reached the maximum number of storages.","error");break;case"7001":showAlert("Too fast.","error");break;case"7002":showAlert("No new transaction found. Please retry in 10s","error");break;case"8001":displayInfo({title:"Update!",rows:[{text:"Voxels has received an update. Please reload this page."}]});break;case"8002":showAlert(e.data.text,"info");break;default:showAlert(e.data.error,"error")}return loadingScreenFull(0),!0}return!1}function showAlert(e,t){var o=document.querySelector(".voxels-popup");o&&o.remove();var a=document.createElement("div");switch(a.className="voxels-popup",t){case"error":a.innerHTML+="<h3>Voxels Error:</h3><p>"+e+"</p>";break;case"info":a.innerHTML+="<h3>Voxels:</h3><p>"+e+"</p>",a.classList.add("voxels-popup-info");break;case"success":a.innerHTML+="<h3>Voxels:</h3><p>"+e+"</p>",a.classList.add("voxels-popup-success");break;default:a.innerHTML+="<h3>Voxels:</h3><p>"+e+"</p>"}var l=document.createElement("div");l.className="voxels-popup-close",l.innerHTML="X",a.appendChild(l),document.body.appendChild(a),l.addEventListener("click",function(){a.remove()}),setTimeout(function(){a.style.opacity="0",setTimeout(function(){a.remove()},1e3)},5e3)}function quickMessage(e,t){let o=3e3;"news"==t&&(o=6e3);var a=document.querySelector(".voxels-quick-message-popup");a&&a.remove();var l=document.createElement("div");l.className="voxels-quick-message-popup voxels-"+t,l.innerHTML='<p>Voxels:</p><p class="voxels-quick-info">'+e+'</p><div class="voxels-progress-bar"></div>',document.body.appendChild(l),l.querySelector(".voxels-progress-bar").style.animation="voxels-progressBarAnimation "+o/1e3+"s linear forwards",setTimeout(function(){l.style.animation="0.5s ease 0s 1 normal forwards running voxels-slideOut",setTimeout(function(){l.remove()},500)},o)}function convertArrayToObject(e){let t={};return e.forEach((e,o)=>{t[o]=e}),t}function reloadVoxels(){var e=document.querySelector(".voxels-main-container");e&&e.parentNode.removeChild(e),startLoad()}function nFormatter(e,t){let o=[{value:1,symbol:""},{value:1e3,symbol:"K"},{value:1e6,symbol:"M"},{value:1e9,symbol:"G"},{value:1e12,symbol:"T"},{value:1e15,symbol:"P"},{value:1e18,symbol:"E"}].findLast(t=>e>=t.value);return o?(e/o.value).toFixed(t).replace(/\.0+$|(?<=\.[0-9]*[1-9])0+$/,"").concat(o.symbol):"0"}function loadingScreen(e){let t=document.querySelector("#voxels-main-modal"),o=document.querySelector(".voxels-main"),a=document.createElement("div");if(a.id="voxels-loading-div",a.classList.add("voxels-loading"),1===e)a.innerHTML='<div class="voxels-loader"></div>',o.appendChild(a),t.style.filter="brightness(0.5)";else{let l=document.getElementById("voxels-loading-div");l&&o.removeChild(l),t.style.filter=""}}function loadingScreenFull(e){let t=document.querySelector("#voxels-full-page"),o=document.createElement("div");if(o.id="voxels-loading-div",o.classList.add("voxels-loading"),1===e)o.innerHTML='<div class="voxels-loader"></div>',t.appendChild(o),t.style.filter="brightness(0.5)";else{let a=document.getElementById("voxels-loading-div");a&&t.removeChild(a),t.style.filter=""}}let dragEl,dragHandleEl,dragging=!1;const lastPosition={};let dragBoundaries;function setupDraggable(){(dragHandleEl=document.querySelector("[data-drag-handle]")).addEventListener("mousedown",dragStart),document.addEventListener("mouseup",dragEnd)}function dragStart(e){0===e.button&&(dragging=!0,(dragEl=getDraggableAncestor(e.target)).style.setProperty("position","absolute"),lastPosition.left=e.target.clientX,lastPosition.top=e.target.clientY,dragHandleEl.classList.add("dragging"),document.addEventListener("mousemove",dragMove))}function dragMove(e){if(1!==e.buttons)return;let t=dragEl.getBoundingClientRect(),o=t.left+e.clientX-lastPosition.left,a=t.top+e.clientY-lastPosition.top,l=window.innerWidth-t.width,n=window.innerHeight-t.height,r=Math.max(0,Math.min(o,l)),s=Math.max(0,Math.min(a,n));dragEl.style.setProperty("left",`${r}px`),dragEl.style.setProperty("top",`${s}px`),lastPosition.left=e.clientX,lastPosition.top=e.clientY,window.getSelection().removeAllRanges(),(0===r||r===l||0===s||s===n)&&0===e.buttons&&dragEnd()}function getDraggableAncestor(e){return e.getAttribute("data-draggable")?e:getDraggableAncestor(e.parentElement)}function dragEnd(){if(dragging){dragHandleEl.classList.remove("dragging"),document.removeEventListener("mousemove",dragMove),dragEl=null,dragging=!1;var e=document.getElementById("voxels-main-modal"),t={};t.top=e.style.top,t.left=e.style.left,chrome.storage.local.set({modalPosition:t})}}function responsiveDraggableReset(){var e=document.getElementById("voxels-main-modal");window.innerWidth>540?(e.style.top="70px",e.style.left="20px"):(e.style.top="50%",e.style.left="50%")}function inputWithCallback(e,t){var o=document.createElement("div");o.className="voxels-popup-input",o.innerHTML="<h3>"+e+'</h3><input type="text" id="inputField"><button id="submitButton">OK</button>',o.classList.add("voxels-popup-info");var a=o.querySelector("#inputField");a.addEventListener("keydown",function(e){document.activeElement===a&&(e.stopPropagation(),"Enter"===e.key&&document.getElementById("submitButton").click())});var l=document.createElement("div");l.className="voxels-popup-close",l.innerHTML="X",o.appendChild(l),document.body.appendChild(o),l.addEventListener("click",function(){o.remove()}),document.getElementById("inputField").focus(),document.getElementById("submitButton").addEventListener("click",function(){var e=document.getElementById("inputField").value.trim();""===e?showAlert("Please enter some input.","error"):(t(e),o.remove())})}function limiter(e,t){let o=0;return function(...a){let l=Date.now();if(l-o>=t)return e(...a),o=l,!0;{let n=Math.round((t-(l-o))/1e3);return quickMessage("Please wait "+n+"s...","error"),!1}}}function voxelsConfirm(e,t){var o=document.createElement("div");o.classList.add("voxels-popup-storage","voxels-popup-info"),o.innerHTML="<h3>"+e+'</h3><button id="confirmButton">Yes</button>';var a=document.createElement("div");function l(){o.remove()}a.className="voxels-popup-close",a.innerHTML="X",o.appendChild(a),document.body.appendChild(o),a.addEventListener("click",l),document.getElementById("confirmButton").addEventListener("click",function(){t(!0),l()})}function openFullpage(){document.body.classList.contains("js-voxels-main-modal-active")&&document.body.classList.toggle("js-voxels-main-modal-active");let e=document.querySelector("#voxels-full-page");e.style.display="flex",fullPageActive=!0}function closeFullpage(){let e=document.querySelector("#voxels-full-page");e.style.display="none",fullPageActive=!1}function showFullOverlay(){let e=document.querySelector("#voxels-full-page-overlay");e.style.display="block"}function hideFullOverlay(){let e=document.querySelector("#voxels-full-page-overlay");e.style.display="none"}function toggleNotifications(){if(premium)return quickMessage("Nofications "+((notifications=!notifications)?"On":"Off"),"info"),chrome.storage.local.set({notifications:notifications}),!0}setupDraggable(),window.addEventListener("resize",function(){responsiveDraggableReset()},!0);