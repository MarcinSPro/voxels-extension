function loadInventoryPrices(){let e=document.querySelectorAll(nodeNames.hudItems);if(e.length>0){let t=[],n=[];e.forEach(e=>{let r=e.querySelector(nodeNames.hudItemImage);if(r){if(r.complete){let l=calculateAverageColor(r);t.push(l),n.push(e)}else r.onload=function(){let l=calculateAverageColor(r);t.push(l),n.push(e)}}}),t.length>0&&sendRequestByHash(t).then(e=>{setPricesInInventory(e,n)}).catch(e=>{console.error(e)})}}function setPricesInInventory(e,t){e.forEach((e,n)=>{let r=t[n];if(null!==e.price.price){let l=r.querySelector(".voxels-inventory-price");if(l){l.innerText=e.price.price;let i=document.createElement("img");i.src=chrome.runtime.getURL("images/Prices/coin.png"),l.appendChild(i),l.classList.add("voxels-blinking"),setTimeout(()=>{l.classList.remove("voxels-blinking")},500)}else{var a=document.createElement("div");a.classList.add("voxels-inventory-price"),a.innerText=e.price.price;let c=document.createElement("img");c.src=chrome.runtime.getURL("images/Prices/coin.png"),a.appendChild(c),r.appendChild(a),a.classList.add("voxels-blinking"),setTimeout(()=>{a.classList.remove("voxels-blinking")},500)}}})}async function sendRequestByHash(e){return new Promise(async(t,n)=>{chrome.storage.local.get("user_info",async function(r){let l={name:r.user_info,operation:"fetchPricesByHash",extra:e};try{let i=await makeFetchRequest(apiURL,l),a=i.data,c=e.map((e,t)=>({averageColor:e,price:a[t]}));t(c)}catch(o){n(o)}})})}function calculateAverageColor(e){let t=document.createElement("canvas"),n=t.getContext("2d");t.width=e.width,t.height=e.height,n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height).data,l=0,i=0,a=0;for(let c=0;c<r.length;c+=4)l+=r[c],i+=r[c+1],a+=r[c+2];let o=r.length/4,s=l/o,h=i/o,g=a/o,u=generateColorHash(s,h,g);return u}function generateColorHash(e,t,n){let r=`${Math.round(e)},${Math.round(t)},${Math.round(n)}`,l=0;for(let i=0;i<r.length;i++){let a=r.charCodeAt(i);l=(l<<5)-l+a}let c=(l>>>0).toString(16);return c}