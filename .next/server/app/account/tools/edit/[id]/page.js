(()=>{var e={};e.id=4318,e.ids=[4318],e.modules={55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},25528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},91877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},25319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},39491:e=>{"use strict";e.exports=require("assert")},14300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},41808:e=>{"use strict";e.exports=require("net")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},85477:e=>{"use strict";e.exports=require("punycode")},12781:e=>{"use strict";e.exports=require("stream")},71576:e=>{"use strict";e.exports=require("string_decoder")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},65880:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>a.a,__next_app__:()=>h,originalPathname:()=>p,pages:()=>u,routeModule:()=>m,tree:()=>d});var r=s(73137),i=s(54647),o=s(4183),a=s.n(o),l=s(71775),n={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(n[e]=()=>l[e]);s.d(t,n);let c=r.AppPageRouteModule,d=["",{children:["account",{children:["tools",{children:["edit",{children:["[id]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,9639)),"C:\\Users\\USER\\Desktop\\devhunt\\app\\account\\tools\\edit\\[id]\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,42313)),"C:\\Users\\USER\\Desktop\\devhunt\\app\\account\\tools\\edit\\layout.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,86755)),"C:\\Users\\USER\\Desktop\\devhunt\\app\\account\\layout.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,82678)),"C:\\Users\\USER\\Desktop\\devhunt\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,51918,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],u=["C:\\Users\\USER\\Desktop\\devhunt\\app\\account\\tools\\edit\\[id]\\page.tsx"],p="/account/tools/edit/[id]/page",h={require:s,loadChunk:()=>Promise.resolve()},m=new c({definition:{kind:i.x.APP_PAGE,page:"/account/tools/edit/[id]/page",pathname:"/account/tools/edit/[id]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},43961:(e,t,s)=>{Promise.resolve().then(s.bind(s,98608))},94799:(e,t,s)=>{Promise.resolve().then(s.bind(s,76411))},98608:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>w});var r=s(60080),i=s(43759),o=s(74431),a=s(84256),l=s(96250),n=s(78884),c=s(22857),d=s(7705),u=s(72890),p=s(74011),h=s(79918),m=s(30748),x=s(61458),g=s(26023),f=s(45730),v=s(9885),j=s(66558),y=s(57114),_=s(64731),b=s.n(_);let w=()=>{let{id:e}=(0,y.useParams)(),t=(0,m.A)(),s=new g.Z(t).getAll(),_=new f.Z(t),w=_.getById(+e),{register:P,handleSubmit:Z,control:q,formState:{errors:N},setValue:S,getValues:k}=(0,j.cI)(),[U,E]=(0,v.useState)([]),[C,D]=(0,v.useState)([]),[L,R]=(0,v.useState)([]),[T,A]=(0,v.useState)([]),[M,G]=(0,v.useState)(""),[z,$]=(0,v.useState)(),[W,B]=(0,v.useState)(""),[I,Y]=(0,v.useState)(""),[H,Q]=(0,v.useState)(!1),[F,O]=(0,v.useState)(!1),[X,J]=(0,v.useState)(!1);(0,v.useEffect)(()=>{s.then(e=>{D([...e])}),w.then(e=>{B(e?.logo_url),S("tool_name",e?.name),S("tool_website",e?.demo_url),S("tool_description",e?.description),S("slogan",e?.slogan),S("pricing_type",e?.pricing_type),S("github_repo",e?.github_url),S("demo_video",e?.demo_video_url),S("launch_date",e?.launch_date),E(e?.product_categories),A(e?.asset_urls)})},[]);let K=e=>{A(T.filter((t,s)=>s!==e))},V=()=>{if(G(""),Y(""),0===T.length)G("Please choose some screenshots");else{if(W)return!0;Y("Please choose product logo")}},ee=async t=>{if(V()){J(!0);let{tool_name:s,tool_website:r,tool_description:i,slogan:o,pricing_type:a,github_repo:l,demo_video:n}=t,c=U.map(e=>e.id);await _.update(+e,{asset_urls:T,name:s,demo_url:r,github_url:l,pricing_type:a,slogan:o,description:i,logo_url:W,demo_video_url:n},c).then(e=>{window.alert("Your launch has been updated successfully")}).finally(()=>{J(!1)})}};return(0,r.jsxs)("section",{className:"container-custom-screen",children:[r.jsx("h1",{className:"text-xl text-black font-semibold",children:"Edit Launch"}),r.jsx("div",{className:"mt-14",children:(0,r.jsxs)(a.G,{onSubmit:Z(ee),children:[(0,r.jsxs)(a.c,{number:1,title:"Tell us about your tool",description:"Provide basic information to help users understand your tool.",children:[(0,r.jsxs)("div",{children:[r.jsx(u.Z,{isLoad:H,src:W,onChange:e=>{if(!e.target.files)return;let t=e.target.files[0];t&&t.type.includes("image")&&($(t),Q(!0),(0,x.Z)({files:t,options:"w=128"}).then(e=>{B(e?.file),Q(!1)}))}}),r.jsx(d.Z,{className:"mt-2",children:I})]}),(0,r.jsxs)("div",{children:[r.jsx(c.Z,{children:"Tool name"}),r.jsx(n.Z,{placeholder:"My Awesome Dev Tool",className:"w-full mt-2",validate:{...P("tool_name",{required:!0,minLength:3})}}),r.jsx(d.Z,{className:"mt-2",children:N.tool_name&&"Please enter your tool name"})]}),(0,r.jsxs)("div",{children:[r.jsx(c.Z,{children:"Catchy slogan \uD83D\uDE0E"}),r.jsx(n.Z,{placeholder:"Supercharge Your Development Workflow",className:"w-full mt-2",validate:{...P("slogan",{required:!0,minLength:20})}}),r.jsx(d.Z,{className:"mt-2",children:N.solgan&&"Please enter your tool slogan"})]}),(0,r.jsxs)("div",{children:[r.jsx(c.Z,{children:"Tool website URL"}),r.jsx(n.Z,{placeholder:"https://myawesomedevtool.com/",className:"w-full mt-2",validate:{...P("tool_website",{required:!0,pattern:/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)*$/i})}}),r.jsx(d.Z,{className:"mt-2",children:N.tool_website&&"Please enter your tool website URL"})]}),(0,r.jsxs)("div",{children:[r.jsx(c.Z,{children:"GitHub repo URL (optional)"}),r.jsx(n.Z,{placeholder:"https://github.com/username/myawesomedevtool",className:"w-full mt-2",validate:{...P("github_repo",{required:!1,pattern:/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)*$/i})}}),r.jsx(d.Z,{className:"mt-2",children:N.github_repo&&"Please enter a valid github repo url"})]}),(0,r.jsxs)("div",{children:[r.jsx(c.Z,{children:"Quick Description (max 300 characters)"}),r.jsx(h.Z,{placeholder:"Briefly explain what your tool does. HTML is supported.",className:"w-full h-36 mt-2",validate:{...P("tool_description",{required:!0,maxLength:350})}}),r.jsx(d.Z,{className:"mt-2",children:N.tool_description&&"Please enter your tool description"})]})]}),(0,r.jsxs)(a.c,{number:2,title:"Extra Stuff",description:"We'll use this to group your tool with others and share it in newsletters. Plus, users can filter by price and categories!",children:[(0,r.jsxs)("div",{children:[r.jsx(c.Z,{children:"Tool pricing type"}),C.map((e,t)=>r.jsx(j.Qr,{name:"pricing_type",control:q,rules:{required:!0},render:({field:t})=>(0,r.jsxs)("div",{className:"mt-2 flex items-center gap-x-2",children:[r.jsx(p.Z,{checked:e.id==k("pricing_type"),value:"free",onChange:s=>{t.onChange(e.id)},id:e.title,name:"pricing-type"}),r.jsx(c.Z,{htmlFor:e.title,className:"font-normal",children:e.title})]})},t)),r.jsx(d.Z,{className:"mt-2",children:N.pricing_type&&"Please select your tool pricing type"})]}),(0,r.jsxs)("div",{children:[r.jsx(c.Z,{children:"Tool categories (optional)"}),r.jsx(o.Z,{className:"mt-2",categories:U,setCategory:E})]})]}),(0,r.jsxs)(a.c,{number:3,title:"Media",description:"Show off how awesome your dev tool is with cool images.",children:[(0,r.jsxs)("div",{children:[r.jsx(c.Z,{children:"Demo video (optional)"}),r.jsx(n.Z,{placeholder:"A simple demo video URL from youtube or mpt4 link",className:"w-full mt-2",validate:{...P("demo_video",{required:!1,pattern:/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)*$/i})}}),r.jsx(d.Z,{className:"mt-2",children:N.demo_video&&"Please enter a valid demo video url"})]}),(0,r.jsxs)("div",{children:[r.jsx(c.Z,{children:"Tool screenshots"}),r.jsx("p",{className:"text-sm text-black",children:"Upload at least three screenshots showcasing different aspects of functionality. Note that the first image will be used as social preview, so choose wisely!"}),r.jsx(l.W,{isLoad:F,className:"mt-4",files:T,max:5,onChange:e=>{if(!e.target.files)return;let t=e.target.files[0];t&&t.type.includes("image")&&T.length<5&&(R([...L,t]),O(!0),(0,x.Z)({files:t,options:"w=750"}).then(e=>{e?.file&&(A([...T,e.file]),O(!1))}))},children:T.map((e,t)=>r.jsx(l.m,{src:e,onRemove:()=>{K(t)}},t))}),r.jsx(d.Z,{className:"mt-2",children:M})]})]}),(0,r.jsxs)(a.c,{number:4,title:"Launch Week for Your Dev Tool",description:"Setting the perfect launch week is essential to make a splash in the dev world.",children:[r.jsx("div",{children:r.jsx("ul",{className:"text-sm text-black",children:(0,r.jsxs)("li",{className:"p-2 rounded-lg border border-slate-800 bg-slate-800/50",children:["The launch date is ",r.jsx("b",{children:b()(k("launch_date")).format("LL")})," Please"," ",r.jsx("a",{href:"https://twitter.com/exp_nit",target:"_blank",className:"text-orange-500 hover:text-orange-400",children:"contact us"})," ","if you want to update or cancel the launch."]})})}),r.jsx("div",{className:"mt-3",children:r.jsx(i.Z,{isLoad:X,type:"submit",className:"w-full hover:bg-orange-400 ring-offset-2 ring-orange-500 focus:ring",children:"Update"})})]})]})})]})}},76411:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>u});var r=s(60080),i=s(49143),o=s(43920),a=s(53758),l=s(30748),n=s(45730),c=s(57114),d=s(9885);let u=({children:e})=>{let{id:t}=(0,c.useParams)(),{user:s}=(0,o.useSupabase)(),u=(0,l.A)(),p=new n.Z(u).getById(+t),[h,m]=(0,d.useState)(!0),[x,g]=(0,d.useState)(!0);return(0,d.useEffect)(()=>{p.then(e=>{m(!1),e&&e.owner_id==s.id?g(!0):g(!1)})},[]),h?r.jsx("div",{className:"min-h-screen",children:r.jsx(i.yM,{className:"w-7 h-7 text-orange-500 mx-auto mt-16"})}):x?e:r.jsx(a.Z,{})}},9639:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>a,__esModule:()=>o,default:()=>n});var r=s(17536);let i=(0,r.createProxy)(String.raw`C:\Users\USER\Desktop\devhunt\app\account\tools\edit\[id]\page.tsx`),{__esModule:o,$$typeof:a}=i,l=i.default,n=l},42313:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>a,__esModule:()=>o,default:()=>n});var r=s(17536);let i=(0,r.createProxy)(String.raw`C:\Users\USER\Desktop\devhunt\app\account\tools\edit\layout.tsx`),{__esModule:o,$$typeof:a}=i,l=i.default,n=l}};var t=require("../../../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[7395,9506,7207,5573,9859,7439,6885,4731,6558,7083,2237,2549,341,7730,5137,3758],()=>s(65880));module.exports=r})();