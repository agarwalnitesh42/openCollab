"use strict";exports.id=1608,exports.ids=[1608],exports.modules={60071:(e,l,s)=>{s.r(l),s.d(l,{default:()=>g});var t=s(60080),a=s(60954),c=s(94915),r=s(81127),d=s(53518),n=s(30748),i=s(805),u=s(63166),o=s(54334),m=s(9885),x=s(45730),h=s(13370),p=s(11440),j=s.n(p);let f=async()=>{let e=new Date,l=new x.Z((0,n.A)()),s=await l.getWeekNumber(e,2);return await l.getPrevLaunchWeeks(e.getFullYear(),2,s,1)},g=()=>{let[e,l]=(0,m.useState)([]);return(0,m.useEffect)(()=>{f().then(e=>{let s=e?.map(e=>e);l(s)})},[]),t.jsx("ul",{className:"mt-3 divide-y divide-slate-800/60",children:e?.map(e=>t.jsx("div",{children:e.products.map((e,l)=>t.jsx("li",{className:"py-3",children:t.jsxs(d.default,{tool:e,href:"/tool/"+e.slug,children:[t.jsxs(j(),{onClick:e=>e.preventDefault(),href:"/tool/"+e.slug,className:"w-full flex items-center gap-x-4",children:[t.jsx(h.Z,{src:e.logo_url||"",alt:e.name}),t.jsxs("div",{className:"w-full space-y-1",children:[t.jsx(a.default,{href:e.demo_url,children:e.name}),t.jsx(r.Z,{className:"line-clamp-2",children:e.slogan}),t.jsxs(u.Z,{children:[t.jsx(c.Z,{items:[e.product_pricing_types?.title??"Free",...(e.product_categories||[]).map(e=>e.name)]}),t.jsx(o.Z,{count:e.views_count})]})]})]}),t.jsx(i.default,{count:e.votes_count,productId:e?.id,launchDate:e.launch_date,launchEnd:e.launch_end})]})},l))}))})}},89003:(e,l,s)=>{s.d(l,{Z:()=>r});var t=s(48144),a=s(23320);let c=/w=\d+/g,r=({src:e,className:l,imgClassName:s,alt:r})=>t.jsx("div",{className:(0,a.Z)(`flex-none  ${l}`),children:t.jsx("img",{src:e?.replace(c,"w=128"),alt:r,className:(0,a.Z)(`rounded-full w-16 h-16 object-cover  ${s}`),loading:"lazy"})})},214:(e,l,s)=>{s.d(l,{Z:()=>c});var t=s(48144),a=s(23320);let c=({className:e,children:l})=>t.jsx("p",{className:(0,a.Z)(`text-black text-sm sm:text-base ${e}`),children:l})}};