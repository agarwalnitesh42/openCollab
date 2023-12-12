(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[936],{29323:function(e,t,r){Promise.resolve().then(r.bind(r,60357))},60357:function(e,t,r){"use strict";r.r(t);var a=r(57437),s=r(54796),n=r(61211),c=r(32186),i=r(65928),o=r(39232),u=r(24033),d=r(2265);t.default=e=>{let{children:t}=e,{id:r}=(0,u.useParams)(),{user:l}=(0,n.useSupabase)(),p=(0,i.A)(),_=new o.Z(p).getById(+r),[g,h]=(0,d.useState)(!0),[m,w]=(0,d.useState)(!0);return(0,d.useEffect)(()=>{_.then(e=>{h(!1),e&&e.owner_id==l.id?w(!0):w(!1)})},[]),g?(0,a.jsx)("div",{className:"min-h-screen",children:(0,a.jsx)(s.yM,{className:"w-7 h-7 text-orange-500 mx-auto mt-16"})}):m?t:(0,a.jsx)(c.Z,{})}},61211:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return i},useSupabase:function(){return o}});var a=r(57437),s=r(2265),n=r(65928);let c=(0,s.createContext)();function i(e){let{children:t,session:r,user:i}=e,[o]=(0,s.useState)(()=>(0,n.A)());return(0,a.jsx)(c.Provider,{value:{supabase:o,session:r,user:i},children:(0,a.jsx)(a.Fragment,{children:t})})}let o=()=>(0,s.useContext)(c)},32186:function(e,t,r){"use strict";var a=r(57437),s=r(61396),n=r.n(s);t.Z=()=>(0,a.jsx)("main",{children:(0,a.jsx)("div",{className:"max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8",children:(0,a.jsxs)("div",{className:"max-w-lg mx-auto space-y-3 text-center",children:[(0,a.jsx)("h3",{className:"text-orange-500 font-semibold",children:"404 Error"}),(0,a.jsx)("p",{className:"text-black text-4xl font-semibold sm:text-5xl",children:"Page not found"}),(0,a.jsx)("p",{className:"text-black",children:"Sorry, the page you are looking for could not be found or has been removed."}),(0,a.jsxs)(n(),{href:"/",className:"text-orange-500 duration-150 hover:text-orange-400 font-medium inline-flex items-center gap-x-1",children:["Go back",(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",className:"w-5 h-5",children:(0,a.jsx)("path",{fillRule:"evenodd",d:"M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z",clipRule:"evenodd"})})]})]})})})},73550:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});class a{constructor(e){this.supabase=e}}},11639:function(e,t,r){"use strict";r.d(t,{F:function(){return n}});var a=r(31199),s=r.n(a);let n=new class{async get(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:30,a=this._cache.get(e);if(null!=a)return a;let s=await t();return this._cache.set(e,s,r),s}async del(e){this._cache.del(e)}constructor(){this._cache=new(s())({stdTTL:30})}}},39232:function(e,t,r){"use strict";r.d(t,{Z:function(){return n}});var a=r(73550),s=r(11639);class n extends a.Z{async getWeekNumber(e,t){let r="week-number-".concat(e,"-").concat(t);return s.F.get(r,async()=>{let{data:r,error:a}=await this.supabase.rpc("get_week_number",{date_in:e,start_day:t});if(null!==a)throw Error(a.message);return r})}async getWeeks(e,t){let{data:r,error:a}=await this.supabase.rpc("get_weeks",{year_in:e,start_day:t});if(null!==a)throw Error(a.message);return r.map(e=>({week:e.week_number,startDate:e.start_date,endDate:e.end_date}))}async getPrevLaunchDays(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,{data:r,error:a}=await this.supabase.rpc("get_prev_launch_days",{_launch_date:e.toISOString(),_limit:t});if(null!==a)throw Error(a.message);return r.map(e=>({launchDate:new Date(e.launch_date),products:(e.products||[]).map(e=>({...e.product,product_pricing_types:e.product_pricing_types,product_categories:e.product_categories}))}))}async getNextLaunchDays(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,{data:r,error:a}=await this.supabase.rpc("get_next_launch_days",{_launch_date:e.toISOString(),_limit:t});if(null!==a)throw Error(a.message);return r.map(e=>({launchDate:new Date(e.launch_date),products:(e.products||[]).map(e=>({...e.product,product_pricing_types:e.product_pricing_types,product_categories:e.product_categories}))}))}async getWeeklyWinners(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,{data:t,error:r}=await this.supabase.from("weekly_winners").select();if(null!==r)throw Error(r.message);return t.filter(t=>t.week!==e).map(e=>({...e.product_data.product,product_pricing_types:e.product_data.product_pricing_types,product_categories:e.product_data.product_categories}))}async getPrevLaunchWeeks(e,t,r){let a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,{data:s,error:n}=await this.supabase.rpc("get_prev_launch_weeks",{_year:e,_start_day:t,_launch_week:r,_limit:a});if(null!==n)throw Error(n.message);return s.map(e=>({week:e.week,startDate:new Date(e.start_date),endDate:new Date(e.end_date),products:(e.products||[]).map(e=>({...e.product,product_pricing_types:e.product_pricing_types,product_categories:e.product_categories}))}))}async getNextLaunchWeeks(e,t,r){let a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,{data:s,error:n}=await this.supabase.rpc("get_next_launch_weeks",{_year:e,_start_day:t,_launch_week:r,_limit:a});if(null!==n)throw Error(n.message);return s.map(e=>({week:e.week,startDate:new Date(e.start_date),endDate:new Date(e.end_date),products:(e.products||[]).map(e=>({...e.product,product_pricing_types:e.product_pricing_types,product_categories:e.product_categories}))}))}async getProductsCountByDay(e,t){let{data:r,error:a}=await this.supabase.rpc("get_products_count_by_date",{_start_date:e.toISOString(),_end_date:t.toISOString()});if(null!==a)throw Error(a.message);return r.map(e=>({date:new Date(e.date),count:e.product_count}))}async getProductsCountByWeek(e,t,r){let a=async(e,t,r)=>{let{data:a,error:s}=await this.supabase.rpc("get_products_count_by_week",{start_week:e,end_week:t,year_in:r,start_day:2});if(null!==s)throw Error(s.message);return a.map(e=>({week:e.week_number,startDate:new Date(e.start_date),endDate:new Date(e.end_date),count:e.product_count}))},s=[];if(t<=52)s=await a(e,t,r);else{let n=await a(e,52,r),c=await a(1,t-52,r+1);s=[...n,...c]}return s}getProducts(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"votes_count",t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:20,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,n=arguments.length>4?arguments[4]:void 0,c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:this.EXTENDED_PRODUCT_SELECT,i="products-".concat(e,"-").concat(t,"-").concat(n,"-").concat(a,"-").concat(r,"-").concat(c);return s.F.get(i,async()=>{let s=this.supabase.from("products").select(c).eq("deleted",!1);return n&&(s=s.eq("product_categories.id",n)),s.range(r*(a-1),r*a-1).order(e,{ascending:t})})}async getSimilarProducts(e){let{data:t,error:r}=await this.supabase.rpc("get_similar_products",{_product_id:e});if(null!==r)throw Error(r.message);return t}async getTopProducts(e,t){let{data:r,error:a}=await this.getProducts(e,t);if(a)throw Error(a.message);return r}async getMostDiscussedProducts(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,{data:t,error:r}=await this.supabase.from("products").select(this.EXTENDED_PRODUCT_SELECT).eq("deleted",!1).order("comments_count",{ascending:!1}).limit(e);if(null!==r)throw Error(r.message);return t}async getRelatedProducts(e,t,r,a){let{data:s,error:n}=await this.getProducts(r,a).neq("id",e);if(n)return console.error(n),[];let c=s.filter(e=>{var r;return null===(r=e.product_categories)||void 0===r?void 0:r.some(e=>t.includes(e.name))}).slice(0,8);return c}async getUserProductsById(e){let{data:t}=await this.supabase.from("products").select(this.DEFULT_PRODUCT_SELECT).eq("owner_id",e).eq("deleted",!1);return t}async getUserVoteById(e,t){if(!e||!t)return 0;let{data:r}=await this.supabase.from("product_votes").select().eq("user_id",e).eq("product_id",t).maybeSingle();return r}async getRandomTools(e){let{data:t}=await this.supabase.from("products").select(this.EXTENDED_PRODUCT_SELECT).eq("deleted",!1).limit(e);return t}async getToolsByNameOrDescription(e,t){let r="product-search-by-text-".concat(e,"-").concat(t);return s.F.get(r,async()=>{let r="%".concat(e,"%"),{data:a}=await this.supabase.from("products").select(this.EXTENDED_PRODUCT_SELECT).eq("deleted",!1).or("description.ilike.".concat(r,",slogan.ilike.").concat(r,",name.ilike.").concat(r)).limit(t).order("votes_count",{ascending:!1});return a})}async getById(e){let t="product-details-id-".concat(e);return s.F.get(t,async()=>this._getOne("id",e))}async getBySlug(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r="product-details-slug-".concat(e),a=await s.F.get(r,async()=>{let{data:t}=await this.supabase.from("products").select(this.DEFULT_PRODUCT_SELECT).eq("slug",e).single();return t});return t&&a&&!a.deleted&&this.viewed(a.id),a}async toggleVote(e,t){let{data:r}=await this.supabase.rpc("toggleProductVote",{_product_id:e,_user_id:t});return null!=r?r:0}async viewed(e){let{data:t}=await this.supabase.rpc("updateViews",{_product_id:e});return null!=t?t:0}async insert(e,t){let{data:r,error:a}=await this.supabase.from("products").insert(e).select().single();if(null!==a)throw Error(a.message);return 0!==t.length&&await Promise.all(t.map(async e=>await this._addProductToCategory(r.id,e))),r}async update(e,t){var r;let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],s=(r=["deleted_at","deleted"],Object.fromEntries(Object.entries(t).filter(e=>{let[t,a]=e;return!r.includes(t)}))),{data:n,error:c}=await this.supabase.from("products").update(s).eq("id",e).select().single();if(await this.supabase.from("product_category_product").delete().eq("product_id",e),await Promise.all(a.map(async t=>await this._addProductToCategory(e,t))),null!=c)throw Error(c.message);return n}async delete(e){let{error:t}=await this.supabase.from("products").update({deleted:!0,deleted_at:new Date().toISOString()}).eq("id",e);if(null!==t)throw Error(t.message)}async search(e){let{data:t,error:r}=await this.supabase.from("products").select("*").ilike("name","%".concat(e,"%")).eq("deleted",!1).limit(8);if(null!==r)throw Error(r.message);return t}async _addProductToCategory(e,t){let{error:r}=await this.supabase.from("product_category_product").insert({product_id:e,category_id:t});if(null!=r)throw Error(r.message);return!0}async _getOne(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.DEFULT_PRODUCT_SELECT,{data:a}=await this.supabase.from("products").select(r).eq("deleted",!1).eq(e,t).single();return a}constructor(...e){super(...e),this.DEFULT_PRODUCT_SELECT="*, product_pricing_types(*), product_categories(name, id)",this.EXTENDED_PRODUCT_SELECT="*, product_pricing_types(*), product_categories(*), profiles (full_name)",this.EXTENDED_PRODUCT_SELECT_WITH_CATEGORIES="*, product_pricing_types(*), product_categories!inner(*), profiles (full_name)"}}},61396:function(e,t,r){e.exports=r(34724)},24033:function(e,t,r){e.exports=r(20290)}},function(e){e.O(0,[171,724,199,63,971,864,744],function(){return e(e.s=29323)}),_N_E=e.O()}]);