exports.id=7731,exports.ids=[7731],exports.modules={67731:function(t){t.exports=function(){"use strict";function t(t,e){if(!(t instanceof e))throw TypeError("Cannot call a class as a function")}function e(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function i(t,i,s){return i&&e(t.prototype,i),s&&e(t,s),t}function s(t){return+t.replace(/px/,"")}function n(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return Math.floor((Math.random()*(e-t)+t)*Math.pow(10,i))/Math.pow(10,i)}function o(t){return t[n(0,t.length)]}var a=["#fcf403","#62fc03","#f4fc03","#03e7fc","#03fca5","#a503fc","#fc03ad","#fc03c2"];function r(t){return Math.log(t)/Math.log(1920)}var h=function(){function e(i){t(this,e);var s=i.initialPosition,a=i.direction,h=i.confettiRadius,c=i.confettiColors,u=i.emojis,l=i.emojiSize,d=i.canvasWidth,f=n(.9,1.7,3)*r(d);this.confettiSpeed={x:f,y:f},this.finalConfettiSpeedX=n(.2,.6,3),this.rotationSpeed=u.length?.01:n(.03,.07,3)*r(d),this.dragForceCoefficient=n(5e-4,9e-4,6),this.radius={x:h,y:h},this.initialRadius=h,this.rotationAngle="left"===a?n(0,.2,3):n(-.2,0,3),this.emojiSize=l,this.emojiRotationAngle=n(0,2*Math.PI),this.radiusYUpdateDirection="down";var m="left"===a?n(82,15)*Math.PI/180:n(-15,-82)*Math.PI/180;this.absCos=Math.abs(Math.cos(m)),this.absSin=Math.abs(Math.sin(m));var p=n(-150,0),v={x:s.x+("left"===a?-p:p)*this.absCos,y:s.y-p*this.absSin};this.currentPosition=Object.assign({},v),this.initialPosition=Object.assign({},v),this.color=u.length?null:o(c),this.emoji=u.length?o(u):null,this.createdAt=(new Date).getTime(),this.direction=a}return i(e,[{key:"draw",value:function(t){var e=this.currentPosition,i=this.radius,s=this.color,n=this.emoji,o=this.rotationAngle,a=this.emojiRotationAngle,r=this.emojiSize,h=window.devicePixelRatio;s?(t.fillStyle=s,t.beginPath(),t.ellipse(e.x*h,e.y*h,i.x*h,i.y*h,o,0,2*Math.PI),t.fill()):n&&(t.font="".concat(r,"px serif"),t.save(),t.translate(h*e.x,h*e.y),t.rotate(a),t.textAlign="center",t.fillText(n,0,0),t.restore())}},{key:"updatePosition",value:function(t,e){var i=this.confettiSpeed,s=this.dragForceCoefficient,n=this.finalConfettiSpeedX,o=this.radiusYUpdateDirection,a=this.rotationSpeed,r=this.createdAt,h=this.direction,c=e-r;i.x>n&&(this.confettiSpeed.x-=s*t),this.currentPosition.x+=i.x*("left"===h?-this.absCos:this.absCos)*t,this.currentPosition.y=this.initialPosition.y-i.y*this.absSin*c+.00125*Math.pow(c,2)/2,this.rotationSpeed-=this.emoji?1e-4:1e-5*t,this.rotationSpeed<0&&(this.rotationSpeed=0),this.emoji?this.emojiRotationAngle+=this.rotationSpeed*t%(2*Math.PI):"down"===o?(this.radius.y-=t*a,this.radius.y<=0&&(this.radius.y=0,this.radiusYUpdateDirection="up")):(this.radius.y+=t*a,this.radius.y>=this.initialRadius&&(this.radius.y=this.initialRadius,this.radiusYUpdateDirection="down"))}},{key:"getIsVisibleOnCanvas",value:function(t){return this.currentPosition.y<t+100}}]),e}(),c=function(){function e(i){var s=this;t(this,e),this.canvasContext=i,this.shapes=[],this.promise=new Promise(function(t){return s.resolvePromise=t})}return i(e,[{key:"getBatchCompletePromise",value:function(){return this.promise}},{key:"addShapes",value:function(){var t;(t=this.shapes).push.apply(t,arguments)}},{key:"complete",value:function(){var t;return!this.shapes.length&&(null===(t=this.resolvePromise)||void 0===t||t.call(this),!0)}},{key:"processShapes",value:function(t,e,i){var s=this,n=t.timeDelta,o=t.currentTime;this.shapes=this.shapes.filter(function(t){return t.updatePosition(n,o),t.draw(s.canvasContext),!i||t.getIsVisibleOnCanvas(e)})}}]),e}();return function(){function e(){var i,s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t(this,e),this.activeConfettiBatches=[],this.canvas=s.canvas||((i=document.createElement("canvas")).style.position="fixed",i.style.width="100%",i.style.height="100%",i.style.top="0",i.style.left="0",i.style.zIndex="1000",i.style.pointerEvents="none",document.body.appendChild(i),i),this.canvasContext=this.canvas.getContext("2d"),this.requestAnimationFrameRequested=!1,this.lastUpdated=(new Date).getTime(),this.iterationIndex=0,this.loop=this.loop.bind(this),requestAnimationFrame(this.loop)}return i(e,[{key:"loop",value:function(){this.requestAnimationFrameRequested=!1,t=this.canvas,e=window.devicePixelRatio,n=s((i=getComputedStyle(t)).getPropertyValue("width")),o=s(i.getPropertyValue("height")),t.setAttribute("width",(n*e).toString()),t.setAttribute("height",(o*e).toString());var t,e,i,n,o,a=(new Date).getTime(),r=a-this.lastUpdated,h=this.canvas.offsetHeight,c=this.iterationIndex%10==0;this.activeConfettiBatches=this.activeConfettiBatches.filter(function(t){return t.processShapes({timeDelta:r,currentTime:a},h,c),!c||!t.complete()}),this.iterationIndex++,this.queueAnimationFrameIfNeeded(a)}},{key:"queueAnimationFrameIfNeeded",value:function(t){this.requestAnimationFrameRequested||this.activeConfettiBatches.length<1||(this.requestAnimationFrameRequested=!0,this.lastUpdated=t||(new Date).getTime(),requestAnimationFrame(this.loop))}},{key:"addConfetti",value:function(){for(var t,e,i,s,n,o,r,u=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},l=(t=u.confettiRadius,i=void 0===(e=u.confettiNumber)?u.confettiesNumber||(u.emojis?40:250):e,s=u.confettiColors,o=void 0===(n=u.emojis)?u.emojies||[]:n,r=u.emojiSize,u.emojies&&console.error("emojies argument is deprecated, please use emojis instead"),u.confettiesNumber&&console.error("confettiesNumber argument is deprecated, please use confettiNumber instead"),{confettiRadius:void 0===t?6:t,confettiNumber:i,confettiColors:void 0===s?a:s,emojis:o,emojiSize:void 0===r?80:r}),d=l.confettiRadius,f=l.confettiNumber,m=l.confettiColors,p=l.emojis,v=l.emojiSize,g=this.canvas.getBoundingClientRect(),y=g.width,C=g.height,x=5*C/7,b={x:0,y:x},S={x:y,y:x},j=new c(this.canvasContext),P=0;P<f/2;P++){var w=new h({initialPosition:b,direction:"right",confettiRadius:d,confettiColors:m,confettiNumber:f,emojis:p,emojiSize:v,canvasWidth:y}),A=new h({initialPosition:S,direction:"left",confettiRadius:d,confettiColors:m,confettiNumber:f,emojis:p,emojiSize:v,canvasWidth:y});j.addShapes(w,A)}return this.activeConfettiBatches.push(j),this.queueAnimationFrameIfNeeded(),j.getBatchCompletePromise()}},{key:"clearCanvas",value:function(){this.activeConfettiBatches=[]}}]),e}()}()}};