function loadSettings(){var t=document.getElementById("voxels-full-page-main");t.innerHTML="";var e=document.createElement("div");e.setAttribute("id","voxels-setting-main");let n=limiter(toggleInventoryStack,1e4),i=[{id:"toggle-stack-value",text:"Toggle stack value",toggleFunction:n,initial:inventoryModeTotal?"ON":"OFF"},{id:"toggle-inventory-prices",text:"Toggle inventory prices",toggleFunction:togglePrices,initial:displayInventoryPrice?"ON":"OFF"}];function l(){i.forEach(function(t){var n=document.createElement("div");n.className="voxels-setting";var i=document.createElement("label");i.textContent=t.text,i.className="voxels-setting-label",n.appendChild(i);var l=document.createElement("button");l.textContent=t.initial,l.className="voxels-setting-toggle","OFF"===t.initial&&l.classList.add("js-is-inactive"),l.onclick=function(){let e;t.toggleFunction()&&(e="ON"===l.textContent?"OFF":"ON",l.textContent=e,l.classList.toggle("js-is-inactive"))},n.appendChild(l),e.appendChild(n)});var n=document.createElement("button");n.textContent="Hide Voxels",n.className="voxels-hide-button",n.onclick=function(){let t=document.body,e=document.querySelector("#voxels-main-nav"),n=document.querySelector("#voxels-toggle-voxels-button");t.classList.remove("js-voxels-main-modal-active"),e.style.display="none",n.style.display="flex"},e.appendChild(n),t.appendChild(e)}premium?chrome.storage.local.get(["notifications"],function(t){i.push({id:"toggle-notifications",text:"Toggle notifications",toggleFunction:toggleNotifications,initial:t.notifications?"ON":"OFF"}),l()}):l()}