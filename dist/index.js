"use strict";var getRandomInt=function(e,t){return Math.floor(Math.random()*(Math.floor(t)-Math.ceil(e)))+Math.ceil(e)},storageAvailable=function(e){var t;try{t=window[e];var n="__storage_test__";return t.setItem(n,n),t.removeItem(n),!0}catch(e){return e instanceof DOMException&&(22===e.code||1014===e.code||"QuotaExceededError"===e.name||"NS_ERROR_DOM_QUOTA_REACHED"===e.name)&&t&&0!==t.length}},populateStorage=function(e,t){storageAvailable("localStorage")&&localStorage.setItem(e,t)},retrieveStorage=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return storageAvailable("localStorage")?localStorage.getItem(e):t},removeStorage=function(e){storageAvailable("localStorage")&&localStorage.removeItem(e)},vh=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(vh,"px")),window.addEventListener("contextmenu",function(e){e.preventDefault()});var prescription={},defaultPrescription=JSON.stringify({quantity:15,dose:1});null===retrieveStorage("prescription")&&populateStorage("prescription",defaultPrescription);var updatePrescription=function(e){var t=e.quantity,n=e.dose;prescription.quantity=t,prescription.dose=n,populateStorage("prescription",JSON.stringify(e))};updatePrescription(JSON.parse(retrieveStorage("prescription",defaultPrescription)));var pill={data:function(){var e=document.createElement("div");return e.className="pill",e.style.setProperty("--pill-rotation","".concat(getRandomInt(0,360),"deg")),e},withdraw:function(){this.el.style.transform="translateY(100vh) rotate3d(1, 0, ".concat(getRandomInt(0,.5),", 90deg)")},init:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.el=this.data(),setTimeout(function(){e.el.classList.add("easeOutBounce"),setTimeout(function(){e.el.classList.remove("easeOutBounce")},500),pillCollection.el.appendChild(e.el)},t)}},Pill=function(){return Object.create(pill)},bottle={el:document.getElementById("bottle"),state:{capacity:"full"},setState:function(){bottle.state.capacity=retrieveStorage("pillCount")>0?"full":"empty"},init:function(){bottle.setState()}};bottle.init();var cap={data:function(){var e=document.createElement("div");e.className="cap";for(var t=document.createDocumentFragment(),n=0;n<=12;n++){var a=document.createElement("div");a.className="cap-indent",t.appendChild(a)}return e.appendChild(t),e},properties:{width:0,height:0},state:{open:!1,timer:0,clientX:0,clientY:0,deltaX:0,deltaY:0},setState:function(e){cap.state.open="open"===e,populateStorage("capState",e)},depress:function(){cap.el.className="cap pressed"},move:function(){cap.el.className="cap dragging"},reset:function(){cap.el.classList.remove("pressed","dragging"),cap.el.removeAttribute("style")},remove:function(){var e=cap.el,t=cap.setState;e.className="cap dragged",t("open")},replace:function(){var e=cap.el,t=cap.setState;e.classList.remove("dragged"),t("closed")},close:function(){setTimeout(cap.replace,50*retrieveStorage("pillCount",prescription.quantity)+250)},addEvents:function(){var e=cap.el,t=cap.depress,n=cap.move,a=cap.reset,o=cap.remove,i=(cap.replace,cap.properties),l=i.width,r=i.height,c=cap.state,s=c.timer,d=c.clientX,u=c.clientY,p=c.deltaX,m=c.deltaY;l=e.offsetWidth,r=e.offsetHeight,window.addEventListener("orientationchange",function(){l=e.offsetWidth,r=e.offsetHeight}),e.addEventListener("touchstart",function(e){var n=e.touches;e.preventDefault(),d=n[0].clientX,u=n[0].clientY,s=setTimeout(t,250)},!1),e.addEventListener("touchmove",function(e){var t=e.target,a=e.touches;if(s&&clearTimeout(s),t.classList.contains("pressed")||t.classList.contains("dragging")){n(),p=a[0].clientX-d,m=a[0].clientY-u;var o=Math.max(-m/l,p/l);t.style.setProperty("--cap-rotate","".concat(o>0?Math.max(0,80*o):0,"deg")),t.style.setProperty("--cap-translate","".concat(m<0?Math.max(-40,m/4):0,"%"))}},!1),e.addEventListener("touchend",function(e){var t=e.target;s&&clearTimeout(s),(t.classList.contains("dragging")&&p>=l/2.5||-m>=r/2.5)&&o(),a(),p=0,m=0},!1),e.addEventListener("touchcancel",function(e){s&&clearTimeout(s),a()},!1)},init:function(){switch(cap.el=cap.data(),retrieveStorage("capState")){case"open":cap.remove();break;default:cap.remove(),cap.close()}document.getElementById("top").appendChild(cap.el),cap.addEvents()}};cap.init();var capunder={data:function(){var e=document.createElement("section");return e.className="capunder",e},toggleButton:function(){switch(bottle.setState(),bottle.state.capacity){case"empty":buttonTake.toggle();break;case"full":buttonRefill.toggle()}},init:function(){capunder.el=capunder.data(),document.getElementById("top").appendChild(capunder.el)}};capunder.init();var buttonClose={data:function(){var e=document.createElement("button");e.className="capunder-close",e.type="button",e.name="close";var t=document.createElement("img");return t.src="dist/assets/image/open-collapse-down.svg",t.alt="close",e.appendChild(t),e},addEvents:function(){buttonClose.el.addEventListener("touchend",function(e){cap.replace()},!1)},init:function(){buttonClose.el=buttonClose.data(),capunder.el.appendChild(buttonClose.el),buttonClose.addEvents()}};buttonClose.init();var buttonRefill={data:function(){var e=document.createElement("button");e.className="capunder-refill",e.type="button",e.name="refill";var t=document.createDocumentFragment(),n=document.createElement("img");return n.src="dist/assets/image/material-arrow-drop-down.svg",n.alt="down arrow",t.appendChild(document.createTextNode("refill")),t.appendChild(document.createTextNode(" ")),t.appendChild(n),e.appendChild(t),e},toggle:function(){var e=buttonRefill.el;document.body.contains(e)&&(e.remove(),buttonTake.init())},addEvents:function(){buttonRefill.el.addEventListener("touchend",pillCollection.refill,!1)},removeEvents:function(){buttonRefill.el.removeEventListener("touchend",pillCollection.refill,!1)},init:function(){buttonRefill.el=buttonRefill.data(),capunder.el.appendChild(buttonRefill.el),buttonRefill.addEvents()}},buttonTake={data:function(){var e=document.createElement("button");e.className="capunder-take",e.type="button",e.name="take";var t=document.createDocumentFragment(),n=document.createElement("img");return n.src="dist/assets/image/material-arrow-drop-up.svg",n.alt="up arrow",t.appendChild(document.createTextNode("take")),t.appendChild(document.createTextNode(" ")),t.appendChild(n),e.appendChild(t),e},toggle:function(){var e=buttonTake.el;e.disabled=!0,setTimeout(function(){document.body.contains(e)?(e.remove(),buttonRefill.init()):e.removeAttribute("disabled")},300)},addEvents:function(){var e=buttonTake.el;e.removeAttribute("disabled"),e.addEventListener("touchend",function(e){pillCollection.take(prescription.dose)},!1)},init:function(){buttonTake.el=buttonTake.data(),buttonTake.el.disabled=!0,capunder.el.appendChild(buttonTake.el),setTimeout(buttonTake.addEvents,50*retrieveStorage("pillCount",prescription.quantity)+500)}};buttonTake.init();var pillCollection={el:document.getElementById("pill-collection"),properties:{contents:[]},take:function(e){pillCollection.el;for(var t=pillCollection.properties.contents,n=Math.min(t.length,e),a=1;a<=n;a++)t[t.length-a].withdraw();t.splice(t.length-n,n),populateStorage("pillCount",Math.max(0,retrieveStorage("pillCount")-n)),capunder.toggleButton()},fill:function(e){pillCollection.el;for(var t=pillCollection.properties.contents,n=0;n<e;n++){var a=new Pill;t.push(a),a.init(50*n)}populateStorage("pillCount",t.length),capunder.toggleButton()},refill:function(){buttonRefill.removeEvents();for(var e=pillCollection.el,t=pillCollection.fill;e.firstChild;)e.removeChild(e.firstChild);t(prescription.quantity),cap.close()},init:function(){null===retrieveStorage("pillCount")&&populateStorage("pillCount",prescription.quantity),pillCollection.fill(retrieveStorage("pillCount"))}};pillCollection.init();