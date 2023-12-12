"use strict";(()=>{var e={};e.id=6717,e.ids=[6717],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},14300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},41808:e=>{e.exports=require("net")},22037:e=>{e.exports=require("os")},71017:e=>{e.exports=require("path")},85477:e=>{e.exports=require("punycode")},12781:e=>{e.exports=require("stream")},71576:e=>{e.exports=require("string_decoder")},76224:e=>{e.exports=require("tty")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},43725:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>h,originalPathname:()=>w,requestAsyncStorage:()=>P,routeModule:()=>d,serverHooks:()=>g,staticGenerationAsyncStorage:()=>A,staticGenerationBailout:()=>q});var o={};t.r(o),t.d(o,{GET:()=>x}),t(95655);var s=t(83323),i=t(54647),a=t(26823),l=t(91148),u=t(87083),n=t(57277);let p="https://opencollab.exchange";async function c(){let e=new a.Z((0,l.A)()),r=await new u.Z((0,l.A)()).getProfiles(),t=await e.getProducts("id",!1,1e4),o=t.data;return`<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${p}</loc>
    </url>
    <url>
      <loc>${p}/the-story</loc>
    </url>
    <url>
      <loc>https://opencollab.exchange/blog</loc>
    </url>
     ${o&&o.map(({slug:e})=>`
           <url>
               <loc>${p}/tool/${e}</loc>
           </url>
         `).join("")}
     ${n.Z.map(e=>`
          <url>
              <loc>${p}/tools/${e.toLowerCase().replaceAll(" ","-")}</loc>
          </url>
        `).join("")}
     ${r&&r.map(({username:e})=>`
          <url>
              <loc>${p}/@${e}</loc>
          </url>
        `).join("")}
   </urlset>
 `}async function x(){let e=await c();return new Response(e,{status:200,headers:{"Cache-control":"public, s-maxage=86400, stale-while-revalidate","content-type":"application/xml"}})}let m=s.AppRouteRouteModule,d=new m({definition:{kind:i.x.APP_ROUTE,page:"/sitemap.xml/route",pathname:"/sitemap.xml",filename:"route",bundlePath:"app/sitemap.xml/route"},resolvedPagePath:"C:\\Users\\USER\\Desktop\\devhunt\\app\\sitemap.xml\\route.tsx",nextConfigOutput:"",userland:o}),{requestAsyncStorage:P,staticGenerationAsyncStorage:A,serverHooks:g,headerHooks:h,staticGenerationBailout:q}=d,w="/sitemap.xml/route"},54647:(e,r)=>{var t;Object.defineProperty(r,"x",{enumerable:!0,get:function(){return t}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(t||(t={}))},57277:(e,r,t)=>{t.d(r,{Z:()=>o});let o=["Open Source","DevOps","AI","CI","Code","NoCode","Analytics","QA","API","DB","Design","Helpers","Hosting","UI Lib","Marketing","Emails","Framework","Language","Crypto","Web3","Charts","IDE","Monitoring","Workflow automation","CMS","Security","Tailwind CSS","Boilerplate"]}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[7207,5573,9727,7083,9570],()=>t(43725));module.exports=o})();