(function(root,factory){if(typeof define==="function"&&define.amd){define([],factory(root))}else if(typeof exports==="object"){module.exports=factory(root)}else{root.smoothScroll=factory(root)}})(typeof global!=="undefined"?global:this.window||this.global,function(root){"use strict"
var smoothScroll={}
var supports="querySelector"in document&&"addEventListener"in root
var settings,anchor,toggle,fixedHeader,headerHeight,eventTimeout,animationInterval
var defaults={selector:"[data-scroll]",ignore:"[data-scroll-ignore]",selectorHeader:null,speed:500,offset:0,easing:"easeInOutCubic",easingPatterns:{},before:function(){},after:function(){}}
var extend=function(){var extended={}
var deep=false
var i=0
var length=arguments.length
if(Object.prototype.toString.call(arguments[0])==="[object Boolean]"){deep=arguments[0]
i++}var merge=function(obj){for(var prop in obj){if(Object.prototype.hasOwnProperty.call(obj,prop)){if(deep&&Object.prototype.toString.call(obj[prop])==="[object Object]"){extended[prop]=extend(true,extended[prop],obj[prop])}else{extended[prop]=obj[prop]}}}}
for(;i<length;i++){var obj=arguments[i]
merge(obj)}return extended}
var getHeight=function(elem){return Math.max(elem.scrollHeight,elem.offsetHeight,elem.clientHeight)}
var getClosest=function(elem,selector){if(!Element.prototype.matches){Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(s){var matches=(this.document||this.ownerDocument).querySelectorAll(s),i=matches.length
while(--i>=0&&matches.item(i)!==this){}return i>-1}}for(;elem&&elem!==document;elem=elem.parentNode){if(elem.matches(selector))return elem}return null}
var escapeCharacters=function(id){if(id.charAt(0)==="#"){id=id.substr(1)}var string=String(id)
var length=string.length
var index=-1
var codeUnit
var result=""
var firstCodeUnit=string.charCodeAt(0)
while(++index<length){codeUnit=string.charCodeAt(index)
if(codeUnit===0){throw new InvalidCharacterError("Invalid character: the input contains U+0000.")}if(codeUnit>=1&&codeUnit<=31||codeUnit==127||index===0&&codeUnit>=48&&codeUnit<=57||index===1&&codeUnit>=48&&codeUnit<=57&&firstCodeUnit===45){result+="\\"+codeUnit.toString(16)+" "
continue}if(codeUnit>=128||codeUnit===45||codeUnit===95||codeUnit>=48&&codeUnit<=57||codeUnit>=65&&codeUnit<=90||codeUnit>=97&&codeUnit<=122){result+=string.charAt(index)
continue}result+="\\"+string.charAt(index)}return"#"+result}
var easingPattern=function(settings,time){var pattern
if(settings.easing==="easeInQuad")pattern=time*time
if(settings.easing==="easeOutQuad")pattern=time*(2-time)
if(settings.easing==="easeInOutQuad")pattern=time<.5?2*time*time:-1+(4-2*time)*time
if(settings.easing==="easeInCubic")pattern=time*time*time
if(settings.easing==="easeOutCubic")pattern=--time*time*time+1
if(settings.easing==="easeInOutCubic")pattern=time<.5?4*time*time*time:(time-1)*(2*time-2)*(2*time-2)+1
if(settings.easing==="easeInQuart")pattern=time*time*time*time
if(settings.easing==="easeOutQuart")pattern=1- --time*time*time*time
if(settings.easing==="easeInOutQuart")pattern=time<.5?8*time*time*time*time:1-8*--time*time*time*time
if(settings.easing==="easeInQuint")pattern=time*time*time*time*time
if(settings.easing==="easeOutQuint")pattern=1+--time*time*time*time*time
if(settings.easing==="easeInOutQuint")pattern=time<.5?16*time*time*time*time*time:1+16*--time*time*time*time*time
if(settings.easingPatterns[settings.easing]){pattern=settings.easingPatterns[settings.easing](time)}return pattern||time}
var getEndLocation=function(anchor,headerHeight,offset){var location=0
if(anchor.offsetParent){do{location+=anchor.offsetTop
anchor=anchor.offsetParent}while(anchor)}location=Math.max(location-headerHeight-offset,0)
return Math.min(location,getDocumentHeight()-getViewportHeight())}
var getViewportHeight=function(){return Math.max(document.documentElement.clientHeight,root.innerHeight||0)}
var getDocumentHeight=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)}
var getDataOptions=function(options){return!options||!(typeof JSON==="object"&&typeof JSON.parse==="function")?{}:JSON.parse(options)}
var getHeaderHeight=function(header){return!header?0:getHeight(header)+header.offsetTop}
var adjustFocus=function(anchor,endLocation,isNum){if(isNum)return
anchor.focus()
if(document.activeElement.id!==anchor.id){anchor.setAttribute("tabindex","-1")
anchor.focus()
anchor.style.outline="none"}root.scrollTo(0,endLocation)}
smoothScroll.animateScroll=function(anchor,toggle,options){var overrides=getDataOptions(toggle?toggle.getAttribute("data-options"):null)
var animateSettings=extend(settings||defaults,options||{},overrides)
var isNum=Object.prototype.toString.call(anchor)==="[object Number]"?true:false
var anchorElem=isNum||!anchor.tagName?null:anchor
if(!isNum&&!anchorElem)return
var startLocation=root.pageYOffset
if(animateSettings.selectorHeader&&!fixedHeader){fixedHeader=document.querySelector(animateSettings.selectorHeader)}if(!headerHeight){headerHeight=getHeaderHeight(fixedHeader)}var endLocation=isNum?anchor:getEndLocation(anchorElem,headerHeight,parseInt(typeof animateSettings.offset==="function"?animateSettings.offset():animateSettings.offset,10))
var distance=endLocation-startLocation
var documentHeight=getDocumentHeight()
var timeLapsed=0
var percentage,position
var stopAnimateScroll=function(position,endLocation,animationInterval){var currentLocation=root.pageYOffset
if(position==endLocation||currentLocation==endLocation||root.innerHeight+currentLocation>=documentHeight){clearInterval(animationInterval)
adjustFocus(anchor,endLocation,isNum)
animateSettings.after(anchor,toggle)}}
var loopAnimateScroll=function(){timeLapsed+=16
percentage=timeLapsed/parseInt(animateSettings.speed,10)
percentage=percentage>1?1:percentage
position=startLocation+distance*easingPattern(animateSettings,percentage)
root.scrollTo(0,Math.floor(position))
stopAnimateScroll(position,endLocation,animationInterval)}
var startAnimateScroll=function(){clearInterval(animationInterval)
animationInterval=setInterval(loopAnimateScroll,16)}
if(root.pageYOffset===0){root.scrollTo(0,0)}animateSettings.before(anchor,toggle)
startAnimateScroll()}
var hashChangeHandler=function(event){var hash
try{hash=escapeCharacters(decodeURIComponent(root.location.hash))}catch(e){hash=escapeCharacters(root.location.hash)}if(!anchor)return
anchor.id=anchor.getAttribute("data-scroll-id")
smoothScroll.animateScroll(anchor,toggle)
anchor=null
toggle=null}
var clickHandler=function(event){if(event.button!==0||event.metaKey||event.ctrlKey)return
toggle=getClosest(event.target,settings.selector)
if(!toggle||toggle.tagName.toLowerCase()!=="a"||getClosest(event.target,settings.ignore))return
if(toggle.hostname!==root.location.hostname||toggle.pathname!==root.location.pathname||!/#/.test(toggle.href))return
var hash
try{hash=escapeCharacters(decodeURIComponent(toggle.hash))}catch(e){hash=escapeCharacters(toggle.hash)}if(hash==="#"){event.preventDefault()
anchor=document.body
var id=anchor.id?anchor.id:"smooth-scroll-top"
anchor.setAttribute("data-scroll-id",id)
anchor.id=""
if(root.location.hash.substring(1)===id){hashChangeHandler()}else{root.location.hash=id}return}anchor=document.querySelector(hash)
if(!anchor)return
anchor.setAttribute("data-scroll-id",anchor.id)
anchor.id=""
if(toggle.hash===root.location.hash){event.preventDefault()
hashChangeHandler()}}
var resizeThrottler=function(event){if(!eventTimeout){eventTimeout=setTimeout(function(){eventTimeout=null
headerHeight=getHeaderHeight(fixedHeader)},66)}}
smoothScroll.destroy=function(){if(!settings)return
document.removeEventListener("click",clickHandler,false)
root.removeEventListener("resize",resizeThrottler,false)
settings=null
anchor=null
toggle=null
fixedHeader=null
headerHeight=null
eventTimeout=null
animationInterval=null}
smoothScroll.init=function(options){if(!supports)return
smoothScroll.destroy()
settings=extend(defaults,options||{})
fixedHeader=settings.selectorHeader?document.querySelector(settings.selectorHeader):null
headerHeight=getHeaderHeight(fixedHeader)
document.addEventListener("click",clickHandler,false)
root.addEventListener("hashchange",hashChangeHandler,false)
if(fixedHeader){root.addEventListener("resize",resizeThrottler,false)}}
return smoothScroll})

