(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[992],{82267:function(e,t){"use strict";function i(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function s(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}function o(e){return+e.replace(/px/,"")}function a(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return Math.floor((Math.random()*(t-e)+e)*Math.pow(10,i))/Math.pow(10,i)}function r(e){return e[a(0,e.length)]}var l=["#fcf403","#62fc03","#f4fc03","#03e7fc","#03fca5","#a503fc","#fc03ad","#fc03c2"];function c(e){return Math.log(e)/Math.log(1920)}var u=function(){function e(t){i(this,e);var n=t.initialPosition,s=t.direction,o=t.confettiRadius,l=t.confettiColors,u=t.emojis,h=t.emojiSize,d=t.canvasWidth,f=a(.9,1.7,3)*c(d);this.confettiSpeed={x:f,y:f},this.finalConfettiSpeedX=a(.2,.6,3),this.rotationSpeed=u.length?.01:a(.03,.07,3)*c(d),this.dragForceCoefficient=a(5e-4,9e-4,6),this.radius={x:o,y:o},this.initialRadius=o,this.rotationAngle="left"===s?a(0,.2,3):a(-.2,0,3),this.emojiSize=h,this.emojiRotationAngle=a(0,2*Math.PI),this.radiusYUpdateDirection="down";var m="left"===s?a(82,15)*Math.PI/180:a(-15,-82)*Math.PI/180;this.absCos=Math.abs(Math.cos(m)),this.absSin=Math.abs(Math.sin(m));var p=a(-150,0),v={x:n.x+("left"===s?-p:p)*this.absCos,y:n.y-p*this.absSin};this.currentPosition=Object.assign({},v),this.initialPosition=Object.assign({},v),this.color=u.length?null:r(l),this.emoji=u.length?r(u):null,this.createdAt=new Date().getTime(),this.direction=s}return s(e,[{key:"draw",value:function(e){var t=this.currentPosition,i=this.radius,n=this.color,s=this.emoji,o=this.rotationAngle,a=this.emojiRotationAngle,r=this.emojiSize,l=window.devicePixelRatio;n?(e.fillStyle=n,e.beginPath(),e.ellipse(t.x*l,t.y*l,i.x*l,i.y*l,o,0,2*Math.PI),e.fill()):s&&(e.font="".concat(r,"px serif"),e.save(),e.translate(l*t.x,l*t.y),e.rotate(a),e.textAlign="center",e.fillText(s,0,0),e.restore())}},{key:"updatePosition",value:function(e,t){var i=this.confettiSpeed,n=this.dragForceCoefficient,s=this.finalConfettiSpeedX,o=this.radiusYUpdateDirection,a=this.rotationSpeed,r=this.createdAt,l=this.direction,c=t-r;if(i.x>s&&(this.confettiSpeed.x-=n*e),this.currentPosition.x+=i.x*("left"===l?-this.absCos:this.absCos)*e,this.currentPosition.y=this.initialPosition.y-i.y*this.absSin*c+.00125*Math.pow(c,2)/2,this.rotationSpeed-=this.emoji?1e-4:1e-5*e,this.rotationSpeed<0&&(this.rotationSpeed=0),this.emoji){this.emojiRotationAngle+=this.rotationSpeed*e%(2*Math.PI);return}"down"===o?(this.radius.y-=e*a,this.radius.y<=0&&(this.radius.y=0,this.radiusYUpdateDirection="up")):(this.radius.y+=e*a,this.radius.y>=this.initialRadius&&(this.radius.y=this.initialRadius,this.radiusYUpdateDirection="down"))}},{key:"getIsVisibleOnCanvas",value:function(e){return this.currentPosition.y<e+100}}]),e}(),h=function(){function e(t){var n=this;i(this,e),this.canvasContext=t,this.shapes=[],this.promise=new Promise(function(e){return n.resolvePromise=e})}return s(e,[{key:"getBatchCompletePromise",value:function(){return this.promise}},{key:"addShapes",value:function(){var e;(e=this.shapes).push.apply(e,arguments)}},{key:"complete",value:function(){var e;return!this.shapes.length&&(null===(e=this.resolvePromise)||void 0===e||e.call(this),!0)}},{key:"processShapes",value:function(e,t,i){var n=this,s=e.timeDelta,o=e.currentTime;this.shapes=this.shapes.filter(function(e){return e.updatePosition(s,o),e.draw(n.canvasContext),!i||e.getIsVisibleOnCanvas(t)})}}]),e}(),d=function(){function e(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e),this.activeConfettiBatches=[],this.canvas=n.canvas||((t=document.createElement("canvas")).style.position="fixed",t.style.width="100%",t.style.height="100%",t.style.top="0",t.style.left="0",t.style.zIndex="1000",t.style.pointerEvents="none",document.body.appendChild(t),t),this.canvasContext=this.canvas.getContext("2d"),this.requestAnimationFrameRequested=!1,this.lastUpdated=new Date().getTime(),this.iterationIndex=0,this.loop=this.loop.bind(this),requestAnimationFrame(this.loop)}return s(e,[{key:"loop",value:function(){this.requestAnimationFrameRequested=!1,e=this.canvas,t=window.devicePixelRatio,n=o((i=getComputedStyle(e)).getPropertyValue("width")),s=o(i.getPropertyValue("height")),e.setAttribute("width",(n*t).toString()),e.setAttribute("height",(s*t).toString());var e,t,i,n,s,a=new Date().getTime(),r=a-this.lastUpdated,l=this.canvas.offsetHeight,c=this.iterationIndex%10==0;this.activeConfettiBatches=this.activeConfettiBatches.filter(function(e){return e.processShapes({timeDelta:r,currentTime:a},l,c),!c||!e.complete()}),this.iterationIndex++,this.queueAnimationFrameIfNeeded(a)}},{key:"queueAnimationFrameIfNeeded",value:function(e){this.requestAnimationFrameRequested||this.activeConfettiBatches.length<1||(this.requestAnimationFrameRequested=!0,this.lastUpdated=e||new Date().getTime(),requestAnimationFrame(this.loop))}},{key:"addConfetti",value:function(){for(var e,t,i,n,s,o,a,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},c=(e=r.confettiRadius,i=void 0===(t=r.confettiNumber)?r.confettiesNumber||(r.emojis?40:250):t,n=r.confettiColors,o=void 0===(s=r.emojis)?r.emojies||[]:s,a=r.emojiSize,r.emojies&&console.error("emojies argument is deprecated, please use emojis instead"),r.confettiesNumber&&console.error("confettiesNumber argument is deprecated, please use confettiNumber instead"),{confettiRadius:void 0===e?6:e,confettiNumber:i,confettiColors:void 0===n?l:n,emojis:o,emojiSize:void 0===a?80:a}),d=c.confettiRadius,f=c.confettiNumber,m=c.confettiColors,p=c.emojis,v=c.emojiSize,g=this.canvas.getBoundingClientRect(),y=g.width,x=5*g.height/7,j={x:0,y:x},C={x:y,y:x},w=new h(this.canvasContext),b=0;b<f/2;b++){var S=new u({initialPosition:j,direction:"right",confettiRadius:d,confettiColors:m,confettiNumber:f,emojis:p,emojiSize:v,canvasWidth:y}),P=new u({initialPosition:C,direction:"left",confettiRadius:d,confettiColors:m,confettiNumber:f,emojis:p,emojiSize:v,canvasWidth:y});w.addShapes(S,P)}return this.activeConfettiBatches.push(w),this.queueAnimationFrameIfNeeded(),w.getBatchCompletePromise()}},{key:"clearCanvas",value:function(){this.activeConfettiBatches=[]}}]),e}();t.Z=d},83962:function(e,t,i){"use strict";i.r(t);var n=i(57437),s=i(53760),o=i(95335),a=i(78755),r=i(59517),l=i(65928),c=i(10963),u=i(28411),h=i(23062),d=i(2265),f=i(39232),m=i(96007),p=i(61396),v=i.n(p);let g=async()=>{let e=new Date,t=new f.Z((0,l.A)()),i=await t.getWeekNumber(e,2);return await t.getPrevLaunchWeeks(e.getFullYear(),2,i,1)};t.default=()=>{var e;let[t,i]=(0,d.useState)([]);return(0,d.useEffect)(()=>{g().then(e=>{let t=null==e?void 0:e.map(e=>e);i(t)})},[]),(0,n.jsx)("ul",{className:"mt-3 divide-y divide-slate-800/60",children:null==t?void 0:t.map(t=>(0,n.jsx)("div",{children:t.products.map((t,i)=>{var l;return(0,n.jsx)("li",{className:"py-3",children:(0,n.jsxs)(r.default,{tool:t,href:"/tool/"+t.slug,children:[(0,n.jsxs)(v(),{onClick:e=>e.preventDefault(),href:"/tool/"+t.slug,className:"w-full flex items-center gap-x-4",children:[(0,n.jsx)(m.Z,{src:t.logo_url||"",alt:t.name}),(0,n.jsxs)("div",{className:"w-full space-y-1",children:[(0,n.jsx)(s.default,{href:t.demo_url,children:t.name}),(0,n.jsx)(a.Z,{className:"line-clamp-2",children:t.slogan}),(0,n.jsxs)(u.Z,{children:[(0,n.jsx)(o.Z,{items:[null!==(e=null===(l=t.product_pricing_types)||void 0===l?void 0:l.title)&&void 0!==e?e:"Free",...(t.product_categories||[]).map(e=>e.name)]}),(0,n.jsx)(h.Z,{count:t.views_count})]})]})]}),(0,n.jsx)(c.default,{count:t.votes_count,productId:null==t?void 0:t.id,launchDate:t.launch_date,launchEnd:t.launch_end})]})},i)})}))})}},63388:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var i in t)Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}(t,{suspense:function(){return s},NoSSR:function(){return o}}),i(21024),i(2265);let n=i(54922);function s(){let e=Error(n.NEXT_DYNAMIC_NO_SSR_CODE);throw e.digest=n.NEXT_DYNAMIC_NO_SSR_CODE,e}function o(e){let{children:t}=e;return t}},61396:function(e,t,i){e.exports=i(34724)},24033:function(e,t,i){e.exports=i(20290)},96936:function(e,t,i){"use strict";var n=i(2265);let s=n.forwardRef(function({title:e,titleId:t,...i},s){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",ref:s,"aria-labelledby":t},i),e?n.createElement("title",{id:t},e):null,n.createElement("path",{fillRule:"evenodd",d:"M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z",clipRule:"evenodd"}))});t.Z=s}}]);