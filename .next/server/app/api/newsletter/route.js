"use strict";(()=>{var e={};e.id=5497,e.ids=[5497],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},39491:e=>{e.exports=require("assert")},82361:e=>{e.exports=require("events")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},22037:e=>{e.exports=require("os")},71017:e=>{e.exports=require("path")},12781:e=>{e.exports=require("stream")},76224:e=>{e.exports=require("tty")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},3719:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>h,originalPathname:()=>c,requestAsyncStorage:()=>d,routeModule:()=>l,serverHooks:()=>q,staticGenerationAsyncStorage:()=>x,staticGenerationBailout:()=>v});var s={};t.r(s),t.d(s,{POST:()=>u}),t(95655);var o=t(83323),a=t(54647),i=t(41779),p=t(66886);async function u(e){let{personalEMail:r}=await e.json(),t=process.env.NEWSLETTER_FORM_ID,s=process.env.WELCOME_EMAIL_API_KEY,o=`https://cron.ventryweather.com/webhook-devhunt.php?apikey=${s}&tag=newsletter&email=${r}&formid=${t}`,a=await i.Z.get(o);return p.Z.json({data:a.data})}let n=o.AppRouteRouteModule,l=new n({definition:{kind:a.x.APP_ROUTE,page:"/api/newsletter/route",pathname:"/api/newsletter",filename:"route",bundlePath:"app/api/newsletter/route"},resolvedPagePath:"C:\\Users\\USER\\Desktop\\devhunt\\app\\api\\newsletter\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:d,staticGenerationAsyncStorage:x,serverHooks:q,headerHooks:h,staticGenerationBailout:v}=l,c="/api/newsletter/route"}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[7395,9506,9727,6886,1779],()=>t(3719));module.exports=s})();