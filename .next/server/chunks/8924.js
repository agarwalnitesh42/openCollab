"use strict";exports.id=8924,exports.ids=[8924],exports.modules={48924:(e,t,r)=>{r.d(t,{Y:()=>u});var n=r(9885);let o=e=>e,s={some:0,all:1};function u(e,{root:t,margin:r,amount:u,once:c=!1}={}){let[i,l]=(0,n.useState)(!1);return(0,n.useEffect)(()=>{if(!e.current||c&&i)return;let n={root:t&&t.current||void 0,margin:r,amount:u};return function(e,t,{root:r,margin:n,amount:u="some"}={}){let c=function(e,t,r){var n;if("string"==typeof e){let s=document;t&&(o(!!t.current,"Scope provided, but no element detected."),s=t.current),r?(null!==(n=r[e])&&void 0!==n||(r[e]=s.querySelectorAll(e)),e=r[e]):e=s.querySelectorAll(e)}else e instanceof Element&&(e=[e]);return Array.from(e||[])}(e),i=new WeakMap,l=new IntersectionObserver(e=>{e.forEach(e=>{let r=i.get(e.target);if(!!r!==e.isIntersecting){if(e.isIntersecting){let r=t(e);"function"==typeof r?i.set(e.target,r):l.unobserve(e.target)}else r&&(r(e),i.delete(e.target))}})},{root:r,rootMargin:n,threshold:"number"==typeof u?u:s[u]});return c.forEach(e=>l.observe(e)),()=>l.disconnect()}(e.current,()=>(l(!0),c?void 0:()=>l(!1)),n)},[t,e,r,c]),i}}};