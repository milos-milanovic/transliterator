!function(){for(var e,t=function(){},r=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeline","timelineEnd","timeStamp","trace","warn"],a=r.length,l=window.console=window.console||{};a--;)l[e=r[a]]||(l[e]=t)}();const lat="LATINICA",cyr="ЋИРИЛИЦА",fromLatPh="Ovde unesite tekst (latinica)",toLatPh="Izlaz",fromCyrPh="Овде унесите текст (ћирилица)",toCyrPh="Излаз",labelLatToCyr="Latinica u ćirilicu - Konvertor teksta",labelCyrToLat="Ćirilica u latinicu - Konvertor teksta",logo=document.getElementById("logo"),fromPar=document.getElementById("from-p"),toPar=document.getElementById("to-p"),fromText=document.getElementById("from-textarea"),toText=document.getElementById("to-textarea"),btnConvert=document.getElementById("btn-convert"),btnCopy=document.getElementById("btn-copy"),btnPaste=document.getElementById("btn-paste"),btnDelete=document.getElementById("btn-delete"),themeCb=document.getElementById("theme-cb"),getConfig=function(){return localStorage.getItem("from")},setConfig=function(e){localStorage.setItem("from",e)},getIsDarkTheme=function(){return localStorage.getItem("dark_theme")},setDarkTheme=function(){localStorage.setItem("dark_theme","true")},setLightTheme=function(){localStorage.setItem("dark_theme","false")};function scrollDown(e){window.innerWidth<991&&e.scrollIntoView()}function autoExpand(e){e.style.height="inherit";let t=window.getComputedStyle(e),r=parseInt(t.getPropertyValue("border-top-width"),10)+parseInt(t.getPropertyValue("padding-top"),10)+e.scrollHeight+parseInt(t.getPropertyValue("padding-bottom"),10)+parseInt(t.getPropertyValue("border-bottom-width"),10);e.style.height=r+"px",toText.style.height=r+"px"}switch("clipboard"in navigator||(btnCopy.style.visibility="hidden",btnPaste.style.visibility="hidden"),"true"===getIsDarkTheme()?(document.body.classList.toggle("dark"),themeCb.checked=!0):null===getIsDarkTheme&&setLightTheme(),themeCb.addEventListener("change",function(){document.body.classList.toggle("dark"),document.body.classList.contains("dark")?localStorage.setItem("dark_theme","true"):setLightTheme()}),fromText.focus(),document.addEventListener("input",function(e){"textarea"===e.target.tagName.toLowerCase()&&autoExpand(e.target)}),getConfig()||setConfig(lat),getConfig()){case lat:fromPar.innerText=lat,toPar.innerText=cyr,fromText.placeholder=fromLatPh,toText.placeholder=toCyrPh;break;case cyr:fromPar.innerText=cyr,toPar.innerText=lat,fromText.placeholder=fromCyrPh,toText.placeholder=toLatPh;break;default:fromPar.innerText=lat,toPar.innerText=cyr,fromText.placeholder=fromLatPh,toText.placeholder=toCyrPh,setConfig(lat)}function switchScript(){switch(getConfig()){case lat:fromPar.innerText=cyr,toPar.innerText=lat,setConfig(cyr),fromText.placeholder=fromCyrPh,toText.placeholder=toLatPh;break;case cyr:fromPar.innerText=lat,toPar.innerText=cyr,setConfig(lat),fromText.placeholder=fromLatPh,toText.placeholder=toCyrPh;break;default:fromPar.innerText=lat,toPar.innerText=cyr,setConfig(lat)}}function convert(){scrollDown(toText),getConfig()===lat?toText.value=convertLatToCyr(fromText.value):toText.value=convertCyrToLat(fromText.value)}function convertLatToCyr(e){return e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=e.replace(/ {2,}/g," ")).replace(/\n{3,}/g,"\n\n")).replace(/dž/g,"џ")).replace(/dz/g,"џ")).replace(/dZ/g,"џ")).replace(/dŽ/g,"џ")).replace(/Dž/g,"Џ")).replace(/Dz/g,"Џ")).replace(/DŽ/g,"Џ")).replace(/DZ/g,"Џ")).replace(/nj/g,"њ")).replace(/nJ/g,"њ")).replace(/Nj/g,"Њ")).replace(/NJ/g,"Њ")).replace(/dj/g,"ђ")).replace(/dJ/g,"ђ")).replace(/Dj/g,"Ђ")).replace(/DJ/g,"Ђ")).replace(/lj/g,"љ")).replace(/lJ/g,"љ")).replace(/Lj/g,"Љ")).replace(/LJ/g,"Љ")).replace(/a/g,"а")).replace(/b/g,"б")).replace(/v/g,"в")).replace(/g/g,"г")).replace(/d/g,"д")).replace(/đ/g,"ђ")).replace(/e/g,"е")).replace(/ž/g,"ж")).replace(/z/g,"з")).replace(/i/g,"и")).replace(/j/g,"ј")).replace(/k/g,"к")).replace(/l/g,"л")).replace(/m/g,"м")).replace(/n/g,"н")).replace(/o/g,"о")).replace(/p/g,"п")).replace(/r/g,"р")).replace(/s/g,"с")).replace(/t/g,"т")).replace(/ć/g,"ћ")).replace(/u/g,"у")).replace(/f/g,"ф")).replace(/h/g,"х")).replace(/c/g,"ц")).replace(/č/g,"ч")).replace(/š/g,"ш")).replace(/A/g,"А")).replace(/B/g,"Б")).replace(/V/g,"В")).replace(/G/g,"Г")).replace(/D/g,"Д")).replace(/Đ/g,"Ђ")).replace(/E/g,"Е")).replace(/Ž/g,"Ж")).replace(/Z/g,"З")).replace(/I/g,"И")).replace(/J/g,"Ј")).replace(/K/g,"К")).replace(/L/g,"Л")).replace(/M/g,"М")).replace(/N/g,"Н")).replace(/O/g,"О")).replace(/P/g,"П")).replace(/R/g,"Р")).replace(/S/g,"С")).replace(/T/g,"Т")).replace(/Ć/g,"Ћ")).replace(/U/g,"У")).replace(/F/g,"Ф")).replace(/H/g,"Х")).replace(/C/g,"Ц")).replace(/Č/g,"Ч")).replace(/Š/g,"Ш")}function convertCyrToLat(e){return e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=e.replace(/ {2,}/g," ")).replace(/\n{3,}/g,"\n\n")).replace(/а/g,"a")).replace(/б/g,"b")).replace(/в/g,"v")).replace(/г/g,"g")).replace(/д/g,"d")).replace(/ђ/g,"đ")).replace(/е/g,"e")).replace(/ж/g,"ž")).replace(/з/g,"z")).replace(/и/g,"i")).replace(/ј/g,"j")).replace(/к/g,"k")).replace(/л/g,"l")).replace(/љ/g,"lj")).replace(/м/g,"m")).replace(/н/g,"n")).replace(/њ/g,"nj")).replace(/о/g,"o")).replace(/п/g,"p")).replace(/р/g,"r")).replace(/с/g,"s")).replace(/т/g,"t")).replace(/ћ/g,"ć")).replace(/у/g,"u")).replace(/ф/g,"f")).replace(/х/g,"h")).replace(/ц/g,"c")).replace(/ч/g,"č")).replace(/џ/g,"dž")).replace(/ш/g,"š")).replace(/А/g,"A")).replace(/Б/g,"B")).replace(/В/g,"V")).replace(/Г/g,"G")).replace(/Д/g,"D")).replace(/Ђ/g,"Đ")).replace(/Е/g,"E")).replace(/Ж/g,"Ž")).replace(/З/g,"Z")).replace(/И/g,"I")).replace(/Ј/g,"J")).replace(/К/g,"K")).replace(/Л/g,"L")).replace(/Љ/g,"Lj")).replace(/М/g,"M")).replace(/Н/g,"N")).replace(/Њ/g,"Nj")).replace(/О/g,"O")).replace(/П/g,"P")).replace(/Р/g,"R")).replace(/С/g,"S")).replace(/Т/g,"T")).replace(/Ћ/g,"Ć")).replace(/У/g,"U")).replace(/Ф/g,"F")).replace(/Х/g,"H")).replace(/Ц/g,"C")).replace(/Ч/g,"Č")).replace(/Џ/g,"Dž")).replace(/Ш/g,"Š")}window.addEventListener("keyup",function(e){e.shiftKey||"Enter"!==e.code&&"NumpadEnter"!==e.code||convert()}),fromText.addEventListener("keydown",function(e){e.shiftKey||"Enter"!==e.code&&"NumpadEnter"!==e.code||e.preventDefault()}),document.getElementById("change").addEventListener("click",switchScript),btnConvert.addEventListener("click",function(){convert()}),btnCopy.addEventListener("click",function(){navigator.clipboard.writeText(toText.value)}),btnPaste.addEventListener("click",function(){navigator.clipboard.readText().then(function(e){fromText.value=e,autoExpand(fromText)}).catch(function(e){alert("Došlo je do greške. Nalepite ručno.")})}),btnDelete.addEventListener("click",function(){fromText.value="",toText.value="",autoExpand(fromText)});