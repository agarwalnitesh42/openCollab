(()=>{var e={};e.id=216,e.ids=[216],e.modules={55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},25528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},91877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},25319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},39491:e=>{"use strict";e.exports=require("assert")},14300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},41808:e=>{"use strict";e.exports=require("net")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},85477:e=>{"use strict";e.exports=require("punycode")},12781:e=>{"use strict";e.exports=require("stream")},71576:e=>{"use strict";e.exports=require("string_decoder")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},38639:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>i.a,__next_app__:()=>x,originalPathname:()=>p,pages:()=>d,routeModule:()=>m,tree:()=>c});var r=s(73137),a=s(54647),l=s(4183),i=s.n(l),n=s(71775),u={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(u[e]=()=>n[e]);s.d(t,u);let o=r.AppPageRouteModule,c=["",{children:["account",{children:["details",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,8841)),"C:\\Users\\USER\\Desktop\\devhunt\\app\\account\\details\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,86755)),"C:\\Users\\USER\\Desktop\\devhunt\\app\\account\\layout.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,82678)),"C:\\Users\\USER\\Desktop\\devhunt\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,51918,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["C:\\Users\\USER\\Desktop\\devhunt\\app\\account\\details\\page.tsx"],p="/account/details/page",x={require:s,loadChunk:()=>Promise.resolve()},m=new o({definition:{kind:a.x.APP_PAGE,page:"/account/details/page",pathname:"/account/details",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},76046:(e,t,s)=>{Promise.resolve().then(s.bind(s,95584))},95584:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>h});var r=s(60080),a=s(9885),l=s(43759),i=s(70647);let n=({avatarUrl:e,avatarPreview:t,setSelectedImage:s=()=>"",setAvatarPreview:n=()=>""})=>{let u=(0,a.useRef)(null),o=()=>{u.current?.click()},c=e=>{if(!e.target.files)return;let t=e.target.files[0];t&&t.type.includes("image")&&(s(t),n(URL.createObjectURL(t)))};return(0,r.jsxs)("div",{className:"flex gap-4 items-center",children:[r.jsx("label",{htmlFor:"Avatar-upload",className:"cursor-pointer",children:r.jsx(i.Z,{alt:"user profil",src:t||e})}),(0,r.jsxs)("div",{className:"flex items-center gap-x-2",children:[r.jsx(l.Z,{onClick:()=>o(),className:" bg-slate-800 hover:bg-slate-800/50 text-xs",children:"Upload new Avatar"}),t?r.jsx(l.Z,{onClick:()=>{s(null),n("")},className:"text-xs bg-transparent border border-slate-800",children:"cancel"}):""]}),r.jsx("input",{ref:u,id:"Avatar-upload",name:"file-upload",type:"file",className:"sr-only ",accept:"image/*",onChange:e=>c(e)})]})};var u=s(78884),o=s(47712),c=s(79918),d=s(43920),p=s(30748),x=s(24332),m=s(7705);let h=function(){let{session:e,user:t}=(0,d.useSupabase)(),s=e?.user,i=new x.Z((0,p.A)()),h=i.getById(s?.id),[v,g]=(0,a.useState)(!1),[f,j]=(0,a.useState)(""),[b,y]=(0,a.useState)(""),[q,w]=(0,a.useState)(""),[N,S]=(0,a.useState)(""),[_,P]=(0,a.useState)(!1),[Z,U]=(0,a.useState)(""),[k,C]=(0,a.useState)(""),[E,A]=(0,a.useState)("/user.svg"),[R,D]=(0,a.useState)(null),[G,L]=(0,a.useState)(""),[M,z]=(0,a.useState)(""),[$,T]=(0,a.useState)(""),[F,I]=(0,a.useState)(""),[O,B]=(0,a.useState)(""),[H,W]=(0,a.useState)("");(0,a.useEffect)(()=>{h.then(e=>{A(t?.avatar_url||"/user.svg"),j(e?.full_name||""),y(e?.username||""),U(e?.about||""),w(e?.website_url||""),S(s?.user_metadata.email||""),C(e?.headline||"")})},[]);let X=()=>{if(z(""),I(""),f.length<2&&z("Please enter a correct full name"),b.length<4&&T("the username should at least be 4 chars or more"),!q||/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)*$/i.test(q))return!0;I("Please enter a valid URL")},J=async e=>{e.preventDefault(),X()&&(g(!0),R&&await i.updateAvatar(s?.id,R),i.update(s?.id,{full_name:f,username:b,about:Z,headline:k,website_url:q}).then(()=>{g(!1),G&&A(G),L(""),D(null)}))};return(0,a.useEffect)(()=>{setTimeout(()=>{P(!1)},6e3)},[_]),(0,r.jsxs)("div",{className:"container-custom-screen h-screen mt-20",children:[(0,r.jsxs)("div",{children:[r.jsx("h1",{className:"text-xl text-black font-semibold",children:"Profile"}),r.jsx("p",{className:"mt-1 text-sm text-black",children:"This information will be displayed publicly so be careful what you share."})]}),(0,r.jsxs)("div",{className:"mt-14",children:[r.jsx(n,{avatarUrl:E,avatarPreview:G,setSelectedImage:D,setAvatarPreview:L}),r.jsx("form",{onSubmit:J,className:"mt-4",children:(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("div",{children:[r.jsx(o.Z,{children:"Full name"}),r.jsx(u.Z,{value:f,onChange:e=>{j(e.target.value)},className:"w-full mt-2"}),r.jsx(m.Z,{className:"mt",children:M})]}),(0,r.jsxs)("div",{children:[r.jsx(o.Z,{children:"Username"}),r.jsx(u.Z,{value:b,onChange:e=>{y(e.target.value)},className:"w-full mt-2"}),r.jsx(m.Z,{className:"mt",children:$})]}),(0,r.jsxs)("div",{className:"relative",children:[r.jsx(o.Z,{children:"Email"}),r.jsx(u.Z,{type:"email",value:N,onClick:()=>P(!0),className:"w-full mt-2",disabled:_}),_?(0,r.jsxs)("span",{className:"absolute left-0 -top-1 text-sm bg-green-500 text-green-50 border border-green-600 rounded-full px-2 py-1",children:["Please"," ",r.jsx("a",{href:"https://twitter.com/exp_nit",target:"_blank",className:"font-medium underline",children:"contact us"})," ","on twitter to change your email"]}):""]}),(0,r.jsxs)("div",{children:[r.jsx(o.Z,{children:"Headline"}),r.jsx(u.Z,{value:k,onChange:e=>{C(e.target.value)},className:"w-full mt-2"}),r.jsx(m.Z,{children:H})]}),(0,r.jsxs)("div",{children:[r.jsx(o.Z,{children:"Website URL"}),r.jsx(u.Z,{value:q,onChange:e=>{w(e.target.value)},className:"w-full mt-2"}),r.jsx(m.Z,{children:F})]}),(0,r.jsxs)("div",{children:[r.jsx(o.Z,{children:"About"}),r.jsx(c.Z,{value:Z,onChange:e=>{U(e.target.value)},className:"w-full h-28 mt-2"}),r.jsx(m.Z,{className:"mt",children:O})]}),r.jsx(l.Z,{isLoad:v,className:"flex justify-center w-full ring-offset-2 ring-orange-500 focus:ring-2 hover:bg-orange-400",children:v?"Updating":"save"})]})})]})]})}},79918:(e,t,s)=>{"use strict";s.d(t,{Z:()=>l});var r=s(60080),a=s(16775);let l=({className:e,validate:t,...s})=>r.jsx("textarea",{...s,...t,className:(0,a.Z)(`px-3 py-2 bg-slate-800/70 hover:bg-slate-800/40 focus:bg-slate-800/40 text-sm text-black placeholder-slate-500 outline-none border border-slate-800 focus:border-slate-600 shadow-sm rounded-lg duration-200 ${e}`)})},8841:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>i,__esModule:()=>l,default:()=>u});var r=s(17536);let a=(0,r.createProxy)(String.raw`C:\Users\USER\Desktop\devhunt\app\account\details\page.tsx`),{__esModule:l,$$typeof:i}=a,n=a.default,u=n},57481:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var r=s(96885);let a=e=>{let t=(0,r.fillMetadataSegment)(".",e.params,"favicon.ico");return[{type:"image/x-icon",sizes:"48x48",url:t+""}]}}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[7395,9506,7207,5573,9859,7439,6885,7083,2237,2549,341],()=>s(38639));module.exports=r})();