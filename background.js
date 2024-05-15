let user_signed_in=!1,auth_status=!1,return_session=!1,extension_active=!0;const apiURL="https://pixels-api.xyz/API/load_data.php";let portGlobal,pixelsPageLoaded=!1;function check_signed_in(){return new Promise(e=>{chrome.storage.local.get(["userStatus","user_info","auth"],function(t){chrome.runtime.lastError&&e({userStatus:!1,user_info:{}}),e(void 0===t.userStatus?{userStatus:!1,user_info:{}}:{userStatus:t.userStatus,authStatus:t.auth,user_info:t.user_info})})})}function flip_user_status(e,t){return new Promise((s,a)=>{if(e){let r=`${t.username}`;fetch("https://pixels-api.xyz/API/load_data.php",{method:"POST",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},body:JSON.stringify({name:r,operation:"fetch"})}).then(e=>{if(200!==e.status)throw Error("fail");return e.json()}).then(t=>{let n=t.status;if("ok"===n){let u=t.data;u.error?s(u.error):u.authenticated?chrome.storage.local.set({userStatus:e,user_info:u.username,auth:!0,extStatus:!0,premium:u.premium,node_info:u.nodeData,user_acde:u.acde},function(t){chrome.runtime.lastError&&a("fail"),user_signed_in=e,s("success")}):chrome.storage.local.set({userStatus:e,user_info:r,auth:!1,extStatus:!0,premium:u.premium,node_info:u.nodeData,user_acde:u.acde},function(t){chrome.runtime.lastError&&a("fail"),user_signed_in=e,s("auth")})}else a("error")}).catch(e=>{console.log(e),a("fail")})}else e||(chrome.storage.local.clear(function(){var e=chrome.runtime.lastError;e&&console.error(e)}),pixelsPageLoaded=!1,user_signed_in=e,s("success"))})}function formatFarmName(e){return e.replace(/_/g," ").split(" ").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")}function setStatus(e){return new Promise(t=>{chrome.storage.local.set({extStatus:e},function(s){chrome.runtime.lastError&&t("fail"),extension_active=e,t("success")})})}function debugLog(e){console.log("Voxels: "),console.log(e)}check_signed_in().then(e=>{e.userStatus&&(return_session=!0),user_signed_in=e.userStatus,auth_status=e.authStatus}).catch(e=>console.log(e)),chrome.runtime.onMessage.addListener((e,t,s)=>{if("login"===e.message)return flip_user_status(!0,e.payload).then(e=>s(e)).catch(e=>console.log(e)),!0;if("logout"===e.message)return flip_user_status(!1,null).then(e=>s(e)).catch(e=>console.log(e)),!0;if("userStatus"===e.message)return check_signed_in().then(e=>{s({message:"success",userStatus:e.userStatus,user_info:e.user_info,authStatus:e.authStatus})}).catch(e=>console.log(e)),!0;if("extension_activate"===e.message)return setStatus(!0).then(e=>{s({message:"success",currStatus:extension_active})}).catch(e=>console.log(e)),!0;if("extension_deactivate"===e.message)return setStatus(!1).then(e=>{s({message:"success",currStatus:extension_active})}).catch(e=>console.log(e)),!0;else if("show_notification"===e.message){let{farmName:a,location:r,username:n}=e,u=new Date,i=u.getHours().toString().padStart(2,"0"),o=u.getMinutes().toString().padStart(2,"0"),c=`${i}:${o}`,l=`${c} Voxels: ${n}`,g=formatFarmName(a),f=formatFarmName(r),m=`${g} timer at location ${f} will end in 30s.`,h="";h="farm"===a.toLowerCase()?chrome.runtime.getURL("images/logo.png"):chrome.runtime.getURL(`images/Farms/voxels_${a.toLowerCase()}.png`),chrome.notifications.create({type:"basic",iconUrl:h,title:l,message:m})}});