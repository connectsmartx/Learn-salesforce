(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();class hr{constructor(){this._routes=[],this._currentRoute=null,window.addEventListener("hashchange",()=>this._resolve())}on(e,t){const i=[],r=e.replace(/:(\w+)/g,(a,n)=>(i.push(n),"([^/]+)"));return this._routes.push({pattern:e,regex:new RegExp("^"+r+"$"),paramNames:i,handler:t}),this}start(){window.location.hash||(window.location.hash="#/"),this._resolve()}navigate(e){window.location.hash="#"+e}_resolve(){const e=window.location.hash.slice(1)||"/";for(const t of this._routes){const i=e.match(t.regex);if(i){const r={};t.paramNames.forEach((a,n)=>{r[a]=decodeURIComponent(i[n+1])}),this._currentRoute=t.pattern,t.handler(r);return}}window.location.hash="#/"}getCurrentPath(){return window.location.hash.slice(1)||"/"}}const pr=new hr,Cs={user:{xp:0,level:1,streak:0,lastActiveDate:null,achievements:[]},progress:{completedLessons:[],quizScores:{}},settings:{theme:"dark",fontSize:"base",sidebarOpen:!0}},Be=[{name:"Trailblazer",minXP:0,icon:"🌱"},{name:"Ranger",minXP:100,icon:"🏕️"},{name:"Explorer",minXP:300,icon:"🧭"},{name:"Builder",minXP:600,icon:"🔨"},{name:"Architect",minXP:1e3,icon:"🏛️"},{name:"Guru",minXP:1500,icon:"🧠"},{name:"Master",minXP:2500,icon:"👑"}],As=[{id:"first_steps",name:"First Steps",icon:"👣",desc:"Complete your first lesson",check:s=>s.progress.completedLessons.length>=1},{id:"getting_started",name:"Getting Started",icon:"🚀",desc:"Complete 5 lessons",check:s=>s.progress.completedLessons.length>=5},{id:"ten_down",name:"Ten Down",icon:"🔟",desc:"Complete 10 lessons",check:s=>s.progress.completedLessons.length>=10},{id:"halfway",name:"Halfway There",icon:"⚡",desc:"Complete 25 lessons",check:s=>s.progress.completedLessons.length>=25},{id:"completionist",name:"Completionist",icon:"🏆",desc:"Complete all lessons",check:s=>s.progress.completedLessons.length>=55},{id:"quiz_taker",name:"Quiz Taker",icon:"📝",desc:"Take your first quiz",check:s=>Object.keys(s.progress.quizScores).length>=1},{id:"quiz_ace",name:"Quiz Ace",icon:"💯",desc:"Score 100% on any quiz",check:s=>Object.values(s.progress.quizScores).some(e=>e.bestScore===100)},{id:"quiz_master",name:"Quiz Master",icon:"🎓",desc:"Complete all 4 quizzes",check:s=>Object.keys(s.progress.quizScores).length>=4},{id:"streak_3",name:"On Fire",icon:"🔥",desc:"3-day learning streak",check:s=>s.user.streak>=3},{id:"streak_7",name:"Week Warrior",icon:"⚔️",desc:"7-day learning streak",check:s=>s.user.streak>=7},{id:"apex_starter",name:"Apex Starter",icon:"💻",desc:"Complete first Apex lesson",check:s=>s.progress.completedLessons.some(e=>e.startsWith("3."))},{id:"lwc_starter",name:"LWC Starter",icon:"⚡",desc:"Complete first LWC lesson",check:s=>s.progress.completedLessons.some(e=>e.startsWith("4."))},{id:"admin_complete",name:"Admin Pro",icon:"🛡️",desc:"Complete all Admin lessons",check:s=>{for(let e=1;e<=10;e++)if(!s.progress.completedLessons.includes("2."+e))return!1;return!0}},{id:"apex_complete",name:"Apex Expert",icon:"🔮",desc:"Complete all Apex lessons",check:s=>{for(let e=1;e<=20;e++)if(!s.progress.completedLessons.includes("3."+e))return!1;return!0}},{id:"lwc_complete",name:"LWC Champion",icon:"🏅",desc:"Complete all LWC lessons",check:s=>{for(let e=1;e<=15;e++)if(!s.progress.completedLessons.includes("4."+e))return!1;return!0}},{id:"xp_100",name:"Century",icon:"💎",desc:"Earn 100 XP",check:s=>s.user.xp>=100},{id:"xp_500",name:"High Roller",icon:"🎰",desc:"Earn 500 XP",check:s=>s.user.xp>=500},{id:"xp_1000",name:"Thousandaire",icon:"💰",desc:"Earn 1000 XP",check:s=>s.user.xp>=1e3}];class gr{constructor(){this._state=JSON.parse(JSON.stringify(Cs)),this._listeners=[]}get state(){return this._state}subscribe(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(t=>t!==e)}}_notify(){this._listeners.forEach(e=>e(this._state))}addXP(e){return this._state.user.xp+=e,this._state.user.level=this._calculateLevel(),this._notify(),this._checkAchievements()}_calculateLevel(){let e=1;for(let t=Be.length-1;t>=0;t--)if(this._state.user.xp>=Be[t].minXP){e=t+1;break}return e}getLevelInfo(){const e=Math.min(this._state.user.level-1,Be.length-1);return Be[e]}getNextLevelInfo(){const e=Math.min(this._state.user.level,Be.length-1);return Be[e]}completeLesson(e){return this._state.progress.completedLessons.includes(e)?[]:(this._state.progress.completedLessons.push(e),this._notify(),this.addXP(10))}isLessonCompleted(e){return this._state.progress.completedLessons.includes(e)}getCompletedCount(){return this._state.progress.completedLessons.length}getModuleCompletedCount(e){return this._state.progress.completedLessons.filter(t=>t.startsWith(e+".")).length}saveQuizScore(e,t,i,r,a){const n=this._state.progress.quizScores[e],o=Math.round(t/i*100);return this._state.progress.quizScores[e]={lastScore:o,bestScore:n?Math.max(n.bestScore,o):o,lastAnswers:a,lastTime:r,attempts:((n==null?void 0:n.attempts)||0)+1},this._notify(),this.addXP(25)}getQuizScore(e){return this._state.progress.quizScores[e]||null}setSetting(e,t){this._state.settings[e]=t,this._notify()}_checkAchievements(){const e=[];for(const t of As)!this._state.user.achievements.includes(t.id)&&t.check(this._state)&&(this._state.user.achievements.push(t.id),e.push(t));return e}getAllAchievements(){return As}isAchievementUnlocked(e){return this._state.user.achievements.includes(e)}getTotalLessons(){return 55}getOverallProgress(){return Math.round(this.getCompletedCount()/this.getTotalLessons()*100)}reset(){this._state=JSON.parse(JSON.stringify(Cs)),this._notify()}}const D=new gr,le=[{id:"1",title:"Salesforce Fundamentals",icon:"☁️",color:"#00a1e0",gradient:"linear-gradient(135deg, #00a1e0, #0076b5)",description:"Understand the core concepts of Salesforce CRM, cloud architecture, and data modeling.",lessonCount:10,lessons:[{id:"1.1",title:"What is Salesforce?",subtitle:"CRM, Cloud Computing & Multi-tenant Architecture",duration:"15 min",difficulty:"beginner"},{id:"1.2",title:"Salesforce Editions & Licensing",subtitle:"Essentials to Unlimited — Choosing the Right Edition",duration:"12 min",difficulty:"beginner"},{id:"1.3",title:"Salesforce Architecture",subtitle:"MVC Pattern, Metadata-Driven, Multi-tenant",duration:"18 min",difficulty:"beginner"},{id:"1.4",title:"Setting Up Developer Edition",subtitle:"Create Your Free Salesforce Org",duration:"10 min",difficulty:"beginner"},{id:"1.5",title:"Navigating Lightning Experience",subtitle:"App Launcher, Navigation Bar, Home Page",duration:"12 min",difficulty:"beginner"},{id:"1.6",title:"Objects, Fields & Records",subtitle:"The Building Blocks of Salesforce Data",duration:"20 min",difficulty:"beginner"},{id:"1.7",title:"Standard vs Custom Objects",subtitle:"When to Use Each & How to Create Custom Objects",duration:"15 min",difficulty:"beginner"},{id:"1.8",title:"Relationships in Salesforce",subtitle:"Lookup, Master-Detail & Hierarchical Relationships",duration:"20 min",difficulty:"beginner"},{id:"1.9",title:"Schema Builder",subtitle:"Visual Data Modeling Tool",duration:"12 min",difficulty:"beginner"},{id:"1.10",title:"Data Types & Field Properties",subtitle:"All 20+ Field Types Explained",duration:"18 min",difficulty:"beginner"}]},{id:"2",title:"Salesforce Administration",icon:"🛡️",color:"#7c3aed",gradient:"linear-gradient(135deg, #7c3aed, #5b21b6)",description:"Master security, automation, reports, and data management like a pro admin.",lessonCount:10,lessons:[{id:"2.1",title:"Profiles & Permission Sets",subtitle:"Controlling User Access & Permissions",duration:"18 min",difficulty:"beginner"},{id:"2.2",title:"Roles & Role Hierarchy",subtitle:"Building Your Organization's Data Hierarchy",duration:"15 min",difficulty:"beginner"},{id:"2.3",title:"Record-Level Security",subtitle:"OWD, Sharing Rules & Manual Sharing",duration:"20 min",difficulty:"intermediate"},{id:"2.4",title:"Page Layouts & Lightning App Builder",subtitle:"Designing User Interfaces Without Code",duration:"18 min",difficulty:"beginner"},{id:"2.5",title:"Validation Rules",subtitle:"Enforcing Data Quality with Formulas",duration:"15 min",difficulty:"beginner"},{id:"2.6",title:"Workflow Rules & Process Builder",subtitle:"Legacy Automation Tools",duration:"15 min",difficulty:"intermediate"},{id:"2.7",title:"Flows",subtitle:"Screen, Record-Triggered & Auto-Launched Flows",duration:"25 min",difficulty:"intermediate"},{id:"2.8",title:"Approval Processes",subtitle:"Multi-Step Business Approvals",duration:"18 min",difficulty:"intermediate"},{id:"2.9",title:"Reports & Dashboards",subtitle:"Visualizing Data with Salesforce Analytics",duration:"20 min",difficulty:"beginner"},{id:"2.10",title:"Data Management",subtitle:"Import, Export & Data Loader",duration:"18 min",difficulty:"intermediate"}]},{id:"3",title:"Apex Programming",icon:"💻",color:"#f59e0b",gradient:"linear-gradient(135deg, #f59e0b, #d97706)",description:"Learn Salesforce's strongly-typed programming language from variables to advanced async processing.",lessonCount:20,lessons:[{id:"3.1",title:"Introduction to Apex",subtitle:"What, Why & When to Use Apex",duration:"15 min",difficulty:"beginner"},{id:"3.2",title:"Data Types & Variables",subtitle:"Primitive, sObject & Complex Types",duration:"18 min",difficulty:"beginner"},{id:"3.3",title:"Operators & Expressions",subtitle:"Arithmetic, Comparison & Logical Operators",duration:"12 min",difficulty:"beginner"},{id:"3.4",title:"Control Flow",subtitle:"if/else, switch, for, while & do-while",duration:"18 min",difficulty:"beginner"},{id:"3.5",title:"Collections",subtitle:"List, Set & Map — When and How to Use Each",duration:"20 min",difficulty:"beginner"},{id:"3.6",title:"SOQL Basics",subtitle:"SELECT, WHERE, ORDER BY, LIMIT & Relationships",duration:"22 min",difficulty:"beginner"},{id:"3.7",title:"Advanced SOQL",subtitle:"Aggregate Queries, Sub-queries & Dynamic SOQL",duration:"20 min",difficulty:"intermediate"},{id:"3.8",title:"SOSL",subtitle:"Salesforce Object Search Language",duration:"12 min",difficulty:"intermediate"},{id:"3.9",title:"DML Operations",subtitle:"insert, update, upsert, delete & undelete",duration:"18 min",difficulty:"beginner"},{id:"3.10",title:"Classes & Methods",subtitle:"Anatomy of an Apex Class",duration:"20 min",difficulty:"intermediate"},{id:"3.11",title:"Access Modifiers & Properties",subtitle:"public, private, global, virtual & abstract",duration:"15 min",difficulty:"intermediate"},{id:"3.12",title:"Exception Handling",subtitle:"try/catch/finally & Custom Exceptions",duration:"15 min",difficulty:"intermediate"},{id:"3.13",title:"Triggers",subtitle:"Before & After Triggers on sObjects",duration:"22 min",difficulty:"intermediate"},{id:"3.14",title:"Trigger Framework",subtitle:"Handler Pattern & Best Practices",duration:"20 min",difficulty:"advanced"},{id:"3.15",title:"Governor Limits & Bulkification",subtitle:"Writing Efficient, Scalable Code",duration:"22 min",difficulty:"advanced"},{id:"3.16",title:"Batch Apex",subtitle:"Processing Large Data Volumes",duration:"20 min",difficulty:"advanced"},{id:"3.17",title:"Schedulable Apex",subtitle:"Cron Expressions & Scheduled Jobs",duration:"15 min",difficulty:"advanced"},{id:"3.18",title:"Queueable Apex",subtitle:"Chaining Async Jobs",duration:"15 min",difficulty:"advanced"},{id:"3.19",title:"Future Methods",subtitle:"@future Annotation & Callout Patterns",duration:"15 min",difficulty:"advanced"},{id:"3.20",title:"Test Classes",subtitle:"Writing Tests & Achieving Code Coverage",duration:"22 min",difficulty:"intermediate"}]},{id:"4",title:"Lightning Web Components",icon:"⚡",color:"#22c55e",gradient:"linear-gradient(135deg, #22c55e, #16a34a)",description:"Build modern UI components using LWC — Salesforce's standards-based web component framework.",lessonCount:15,lessons:[{id:"4.1",title:"Introduction to LWC",subtitle:"Web Standards, Shadow DOM & Component Model",duration:"18 min",difficulty:"beginner"},{id:"4.2",title:"Dev Environment Setup",subtitle:"VS Code, Salesforce CLI & SFDX Project",duration:"15 min",difficulty:"beginner"},{id:"4.3",title:"LWC Project Structure",subtitle:"Component Bundle: HTML, JS, CSS & Meta XML",duration:"15 min",difficulty:"beginner"},{id:"4.4",title:"Templates & Data Binding",subtitle:"Dynamic Rendering with {expressions}",duration:"18 min",difficulty:"beginner"},{id:"4.5",title:"Decorators",subtitle:"@api, @track & @wire Explained",duration:"22 min",difficulty:"intermediate"},{id:"4.6",title:"CSS Styling in LWC",subtitle:"SLDS, Custom CSS & CSS Variables",duration:"15 min",difficulty:"beginner"},{id:"4.7",title:"Conditional Rendering",subtitle:"lwc:if, lwc:elseif & lwc:else",duration:"15 min",difficulty:"beginner"},{id:"4.8",title:"List Rendering",subtitle:"for:each, iterator & key Directives",duration:"15 min",difficulty:"beginner"},{id:"4.9",title:"Event Handling",subtitle:"Custom Events & Component Communication",duration:"22 min",difficulty:"intermediate"},{id:"4.10",title:"Wire Service",subtitle:"Reactive Data with @wire & Apex",duration:"20 min",difficulty:"intermediate"},{id:"4.11",title:"Imperative Apex",subtitle:"Calling Apex Methods from LWC",duration:"18 min",difficulty:"intermediate"},{id:"4.12",title:"Navigation & LMS",subtitle:"NavigationMixin & Lightning Message Service",duration:"18 min",difficulty:"intermediate"},{id:"4.13",title:"Forms & Validation",subtitle:"Input Components & Custom Validation",duration:"20 min",difficulty:"intermediate"},{id:"4.14",title:"Lightning Data Table",subtitle:"Sortable, Editable Data Display",duration:"18 min",difficulty:"intermediate"},{id:"4.15",title:"Deploying LWC",subtitle:"sf deploy & Org Management",duration:"12 min",difficulty:"beginner"}]}];function Dt(s){return le.find(e=>e.id===s)}function mr(s){for(const e of le){const t=e.lessons.find(i=>i.id===s);if(t)return{...t,module:e}}return null}function ms(){const s=[];for(const e of le)for(const t of e.lessons)s.push({...t,module:e});return s}function Si(s){const e=ms(),t=e.findIndex(i=>i.id===s);if(t>=0&&t<e.length-1){const i=e[t+1];if(i.module.id===e[t].module.id)return i}return null}function wi(s){const e=ms(),t=e.findIndex(i=>i.id===s);if(t>0){const i=e[t-1];if(i.module.id===e[t].module.id)return i}return null}function fr(){document.getElementById("sidebarNav")&&(_r(),D.subscribe(()=>Ai()),window.addEventListener("hashchange",()=>Ci()))}function _r(){const s=document.getElementById("sidebarNav");s&&(s.innerHTML=le.map(e=>{const t=D.getModuleCompletedCount(e.id),i=e.lessons.length,r=Math.round(t/i*100);return`
      <div class="sidebar__module" data-module="${e.id}">
        <button class="sidebar__module-header" data-toggle-module="${e.id}">
          <span class="sidebar__module-icon" style="background:${e.gradient}">${e.icon}</span>
          <div class="sidebar__module-info">
            <span class="sidebar__module-title">${e.title}</span>
            <div class="sidebar__module-bar">
              <div class="sidebar__module-bar-fill" style="width:${r}%;background:${e.color}"></div>
            </div>
            <span class="sidebar__module-progress">${t}/${i} lessons</span>
          </div>
          <svg class="sidebar__module-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <div class="sidebar__lessons" id="moduleLessons${e.id}">
          ${e.lessons.map(a=>{const n=D.isLessonCompleted(a.id);return`
              <a href="#/lesson/${a.id}" class="sidebar__lesson-link${n?" sidebar__lesson-link--completed":""}" data-lesson="${a.id}">
                <span class="sidebar__lesson-id">${a.id}</span>
                <span class="sidebar__lesson-title">${a.title}</span>
                ${n?'<svg class="sidebar__lesson-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>':""}
              </a>`}).join("")}
          <a href="#/quiz/${e.id}" class="sidebar__lesson-link sidebar__quiz-link${D.getQuizScore(e.id)?" sidebar__lesson-link--completed":""}" data-quiz="${e.id}">
            <span class="sidebar__lesson-id">📝</span>
            <span class="sidebar__lesson-title">Module Quiz</span>
            ${D.getQuizScore(e.id)?'<svg class="sidebar__lesson-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>':""}
          </a>
        </div>
      </div>`}).join(""),s.addEventListener("click",e=>{const t=e.target.closest("[data-toggle-module]");if(!t)return;e.preventDefault(),e.stopPropagation();const i=t.closest(".sidebar__module");s.querySelectorAll(".sidebar__module.open").forEach(r=>{r!==i&&r.classList.remove("open")}),i.classList.toggle("open")}),Ci())}function Ci(){const s=window.location.hash.slice(1)||"/",e=s.match(/^\/lesson\/([\d.]+)/),t=s.match(/^\/quiz\/(\d+)/);if(document.querySelectorAll(".sidebar__lesson-link").forEach(i=>{i.classList.remove("sidebar__lesson-link--active")}),e){const i=document.querySelector(`[data-lesson="${e[1]}"]`);if(i){i.classList.add("sidebar__lesson-link--active");const r=i.closest(".sidebar__module");r&&r.classList.add("open")}}else if(t){const i=document.querySelector(`[data-quiz="${t[1]}"]`);if(i){i.classList.add("sidebar__lesson-link--active");const r=i.closest(".sidebar__module");r&&r.classList.add("open")}}}function Ai(){const s=document.getElementById("progressCircle"),e=document.getElementById("progressText"),t=document.getElementById("streakCount"),i=document.getElementById("xpCount");if(s&&e){const r=D.getOverallProgress(),a=2*Math.PI*35;s.style.strokeDasharray=`${a}`,s.style.strokeDashoffset=`${a-r/100*a}`,e.textContent=`${r}%`}t&&(t.textContent=D.state.user.streak),i&&(i.textContent=D.state.user.xp),le.forEach(r=>{r.lessons.forEach(c=>{const d=document.querySelector(`[data-lesson="${c.id}"]`);if(d){const u=D.isLessonCompleted(c.id);d.classList.toggle("sidebar__lesson-link--completed",u);let f=d.querySelector(".sidebar__lesson-check");u&&!f?d.insertAdjacentHTML("beforeend",'<svg class="sidebar__lesson-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>'):!u&&f&&f.remove()}});const a=D.getModuleCompletedCount(r.id),n=r.lessons.length,o=Math.round(a/n*100),l=document.querySelector(`[data-module="${r.id}"]`);if(l){const c=l.querySelector(".sidebar__module-bar-fill");c&&(c.style.width=`${o}%`);const d=l.querySelector(".sidebar__module-progress");d&&(d.textContent=`${a}/${n} lessons`)}})}function Ei(){Ai()}function yr(){const s=document.getElementById("themeToggle");if(!s)return;const e=D.state.settings.theme||"dark";document.documentElement.setAttribute("data-theme",e),s.addEventListener("click",()=>{const i=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",i),D.setSetting("theme",i),s.classList.add("theme-btn--spin"),setTimeout(()=>s.classList.remove("theme-btn--spin"),400)})}function vr(){const s=document.getElementById("hamburgerBtn"),e=document.getElementById("sidebar"),t=document.getElementById("sidebarOverlay"),i=document.getElementById("mobileBottomNav");if(!s||!e||!t)return;const r=()=>{const a=e.classList.toggle("sidebar--open");t.classList.toggle("sidebar-overlay--visible",a),s.classList.toggle("hamburger--active",a),document.body.classList.toggle("no-scroll",a)};if(s.addEventListener("click",r),t.addEventListener("click",r),e.addEventListener("click",a=>{(a.target.closest(".sidebar__lesson-link")||a.target.closest(".sidebar__link"))&&window.innerWidth<1024&&(e.classList.remove("sidebar--open"),t.classList.remove("sidebar-overlay--visible"),s.classList.remove("hamburger--active"),document.body.classList.remove("no-scroll"))}),i){const a=()=>{const n=window.location.hash.slice(1)||"/";i.querySelectorAll(".mobile-bottom-nav__item").forEach(l=>{var u;const c=((u=l.getAttribute("href"))==null?void 0:u.slice(1))||"/",d=n===c||c==="/"&&n==="/"||c==="/modules"&&n.startsWith("/lesson")||c==="/quiz-hub"&&n.startsWith("/quiz");l.classList.toggle("active",d)})};window.addEventListener("hashchange",a),a()}}function br(){const s=document.getElementById("searchTrigger"),e=document.getElementById("searchModal"),t=document.getElementById("searchInput"),i=document.getElementById("searchResults");if(!s||!e||!t||!i)return;s.addEventListener("click",a),e.addEventListener("click",o=>{o.target===e&&n()}),document.addEventListener("keydown",o=>{(o.ctrlKey||o.metaKey)&&o.key==="k"&&(o.preventDefault(),a()),o.key==="Escape"&&e.classList.contains("active")&&n()});let r;t.addEventListener("input",()=>{clearTimeout(r),r=setTimeout(()=>{const o=t.value.trim().toLowerCase();if(o.length<2){i.innerHTML='<p class="search-modal__empty">Type at least 2 characters to search...</p>';return}Sr(o,i)},200)});function a(){e.classList.add("active"),t.value="",t.focus(),i.innerHTML='<p class="search-modal__empty">Type to search across all lessons...</p>',document.body.classList.add("no-scroll")}function n(){e.classList.remove("active"),document.body.classList.remove("no-scroll")}}function Sr(s,e){const t=ms(),i=[];for(const r of t){const a=r.title.toLowerCase().includes(s),n=r.subtitle.toLowerCase().includes(s),o=r.module.title.toLowerCase().includes(s);let l=0;a&&(l+=10),n&&(l+=5),o&&(l+=2),l>0&&i.push({lesson:r,score:l})}if(i.sort((r,a)=>a.score-r.score),i.length===0){e.innerHTML=`<p class="search-modal__empty">No results found for "${s}"</p>`;return}e.innerHTML=i.slice(0,15).map(({lesson:r})=>`
    <a href="#/lesson/${r.id}" class="search-result-item" onclick="document.getElementById('searchModal').classList.remove('active');document.body.classList.remove('no-scroll')">
      <span class="search-result-item__icon" style="background:${r.module.gradient}; padding: 8px; border-radius: 8px;">${r.module.icon}</span>
      <div class="search-result-item__info" style="flex:1">
        <span class="search-result-item__title" style="display:block;font-weight:600;margin-bottom:2px">${Es(r.title,s)}</span>
        <span class="search-result-item__subtitle" style="font-size:var(--font-size-xs);color:var(--text-muted)">${Es(r.subtitle,s)}</span>
      </div>
      <span class="search-result-item__module">${r.module.title}</span>
    </a>
  `).join("")}function Es(s,e){const t=new RegExp(`(${e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi");return s.replace(t,"<mark>$1</mark>")}const wr=Symbol.for("@supabase/supabase-js.traceContextExtractor");function Cr(){return globalThis[wr]}function zt(s,e){var t={};for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&e.indexOf(i)<0&&(t[i]=s[i]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,i=Object.getOwnPropertySymbols(s);r<i.length;r++)e.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(s,i[r])&&(t[i[r]]=s[i[r]]);return t}function Ar(s,e,t,i){function r(a){return a instanceof t?a:new t(function(n){n(a)})}return new(t||(t=Promise))(function(a,n){function o(d){try{c(i.next(d))}catch(u){n(u)}}function l(d){try{c(i.throw(d))}catch(u){n(u)}}function c(d){d.done?a(d.value):r(d.value).then(o,l)}c((i=i.apply(s,e||[])).next())})}const Er=s=>s?(...e)=>s(...e):(...e)=>fetch(...e);class fs extends Error{constructor(e,t="FunctionsError",i){super(e),this.name=t,this.context=i}toJSON(){return{name:this.name,message:this.message,context:this.context}}}class Tr extends fs{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class Ts extends fs{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class ks extends fs{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var rs;(function(s){s.Any="any",s.ApNortheast1="ap-northeast-1",s.ApNortheast2="ap-northeast-2",s.ApSouth1="ap-south-1",s.ApSoutheast1="ap-southeast-1",s.ApSoutheast2="ap-southeast-2",s.CaCentral1="ca-central-1",s.EuCentral1="eu-central-1",s.EuWest1="eu-west-1",s.EuWest2="eu-west-2",s.EuWest3="eu-west-3",s.SaEast1="sa-east-1",s.UsEast1="us-east-1",s.UsWest1="us-west-1",s.UsWest2="us-west-2"})(rs||(rs={}));class kr{constructor(e,{headers:t={},customFetch:i,region:r=rs.Any}={}){this.url=e,this.headers=t,this.region=r,this.fetch=Er(i)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return Ar(this,arguments,void 0,function*(t,i={}){var r,a;let n,o,l;try{const{headers:c,method:d,body:u,signal:f,timeout:p}=i;let v={},{region:b}=i;b||(b=this.region);const _=new URL(`${this.url}/${t}`);b&&b!=="any"&&(v["x-region"]=b,_.searchParams.set("forceFunctionRegion",b));let C;const m=!!c&&Object.keys(c).some(M=>M.toLowerCase()==="content-type");u&&!m?typeof Blob<"u"&&u instanceof Blob||u instanceof ArrayBuffer?(v["Content-Type"]="application/octet-stream",C=u):typeof u=="string"?(v["Content-Type"]="text/plain",C=u):typeof FormData<"u"&&u instanceof FormData?C=u:(v["Content-Type"]="application/json",C=JSON.stringify(u)):u&&typeof u!="string"&&!(typeof Blob<"u"&&u instanceof Blob)&&!(u instanceof ArrayBuffer)&&!(typeof FormData<"u"&&u instanceof FormData)?C=JSON.stringify(u):C=u;let g=f;p&&(o=new AbortController,n=setTimeout(()=>o.abort(),p),f?(g=o.signal,l=()=>o.abort(),f.addEventListener("abort",l)):g=o.signal);const S=yield this.fetch(_.toString(),{method:d||"POST",headers:Object.assign(Object.assign(Object.assign({},v),this.headers),c),body:C,signal:g}).catch(M=>{throw new Tr(M)}),A=S.headers.get("x-relay-error");if(A&&A==="true")throw new Ts(S);if(!S.ok)throw new ks(S);let w=((r=S.headers.get("Content-Type"))!==null&&r!==void 0?r:"text/plain").split(";")[0].trim().toLowerCase(),T;return w==="application/json"?T=yield S.json():w==="application/octet-stream"||w==="application/pdf"?T=yield S.blob():w==="text/event-stream"?T=S:w==="multipart/form-data"?T=yield S.formData():T=yield S.text(),{data:T,error:null,response:S}}catch(c){return{data:null,error:c,response:c instanceof ks||c instanceof Ts?c.context:void 0}}finally{n&&clearTimeout(n),l&&((a=i.signal)===null||a===void 0||a.removeEventListener("abort",l))}})}}var ze=class extends Error{constructor(s){super(s.message),this.name="PostgrestError",this.details=s.details,this.hint=s.hint,this.code=s.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};const Ti=3,Rs=s=>Math.min(1e3*2**s,3e4),Rr=[520,503],ki=["GET","HEAD","OPTIONS"];function ot(s){"@babel/helpers - typeof";return ot=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ot(s)}function Pr(s,e){if(ot(s)!="object"||!s)return s;var t=s[Symbol.toPrimitive];if(t!==void 0){var i=t.call(s,e);if(ot(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(s)}function Lr(s){var e=Pr(s,"string");return ot(e)=="symbol"?e:e+""}function Or(s,e,t){return(e=Lr(e))in s?Object.defineProperty(s,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):s[e]=t,s}function Ps(s,e){var t=Object.keys(s);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(s);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(s,r).enumerable})),t.push.apply(t,i)}return t}function De(s){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Ps(Object(t),!0).forEach(function(i){Or(s,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(t)):Ps(Object(t)).forEach(function(i){Object.defineProperty(s,i,Object.getOwnPropertyDescriptor(t,i))})}return s}function Ls(s,e){return new Promise(t=>{if(e!=null&&e.aborted){t();return}const i=setTimeout(()=>{e==null||e.removeEventListener("abort",r),t()},s);function r(){clearTimeout(i),t()}e==null||e.addEventListener("abort",r)})}function Ir(s,e,t,i){return!(!i||t>=Ti||!ki.includes(s)||!Rr.includes(e))}async function Ri(s,e,t,i){let r=0;for(;;){const o=De({},t.headers);r>0&&(o["X-Retry-Count"]=String(r));let l;try{l=await s(e,{method:t.method,headers:o,body:t.body,signal:t.signal})}catch(c){if((c==null?void 0:c.name)==="AbortError"||(c==null?void 0:c.code)==="ABORT_ERR"||!ki.includes(t.method))throw c;if(i&&r<Ti){const d=Rs(r);r++,await Ls(d,t.signal);continue}throw c}if(Ir(t.method,l.status,r,i)){var a,n;const c=(a=(n=l.headers)===null||n===void 0?void 0:n.get("Retry-After"))!==null&&a!==void 0?a:null,d=c!==null?Math.max(0,parseInt(c,10)||0)*1e3:Rs(r);await l.text(),r++,await Ls(d,t.signal);continue}return l}}var xr=class{constructor(s){var e,t,i,r,a;this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=s.method,this.url=s.url,this.headers=new Headers(s.headers),this.schema=s.schema,this.body=s.body,this.shouldThrowOnError=(e=s.shouldThrowOnError)!==null&&e!==void 0?e:!1,this.signal=s.signal,this.isMaybeSingle=(t=s.isMaybeSingle)!==null&&t!==void 0?t:!1,this.shouldStripNulls=(i=s.shouldStripNulls)!==null&&i!==void 0?i:!1,this.urlLengthLimit=(r=s.urlLengthLimit)!==null&&r!==void 0?r:8e3,this.retryEnabled=(a=s.retry)!==null&&a!==void 0?a:!0,s.fetch?this.fetch=s.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get("Accept")==="text/csv")throw new Error("stripNulls() cannot be used with csv()");return this.shouldStripNulls=!0,this}setHeader(s,e){return this.headers=new Headers(this.headers),this.headers.set(s,e),this}retry(s){return this.retryEnabled=s,this}then(s,e){var t=this;if(this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json"),this.shouldStripNulls){const n=this.headers.get("Accept");n==="application/vnd.pgrst.object+json"?this.headers.set("Accept","application/vnd.pgrst.object+json;nulls=stripped"):(!n||n==="application/json")&&this.headers.set("Accept","application/vnd.pgrst.array+json;nulls=stripped")}const i=this.fetch;let a=(async()=>{const n={};t.headers.forEach((l,c)=>{n[c]=l});const o=await Ri(i,t.url.toString(),{method:t.method,headers:n,body:JSON.stringify(t.body,(l,c)=>typeof c=="bigint"?c.toString():c),signal:t.signal},t.retryEnabled);return await t.processResponse(o)})();return this.shouldThrowOnError||(a=a.catch(n=>{var o;let l="",c="",d="";const u=n==null?void 0:n.cause;if(u){var f,p,v,b;const m=(f=u==null?void 0:u.message)!==null&&f!==void 0?f:"",g=(p=u==null?void 0:u.code)!==null&&p!==void 0?p:"";l=`${(v=n==null?void 0:n.name)!==null&&v!==void 0?v:"FetchError"}: ${n==null?void 0:n.message}`,l+=`

Caused by: ${(b=u==null?void 0:u.name)!==null&&b!==void 0?b:"Error"}: ${m}`,g&&(l+=` (${g})`),u!=null&&u.stack&&(l+=`
${u.stack}`)}else{var _;l=(_=n==null?void 0:n.stack)!==null&&_!==void 0?_:""}const C=this.url.toString().length;return(n==null?void 0:n.name)==="AbortError"||(n==null?void 0:n.code)==="ABORT_ERR"?(d="",c="Request was aborted (timeout or manual cancellation)",C>this.urlLengthLimit&&(c+=`. Note: Your request URL is ${C} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((u==null?void 0:u.name)==="HeadersOverflowError"||(u==null?void 0:u.code)==="UND_ERR_HEADERS_OVERFLOW")&&(d="",c="HTTP headers exceeded server limits (typically 16KB)",C>this.urlLengthLimit&&(c+=`. Your request URL is ${C} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${(o=n==null?void 0:n.name)!==null&&o!==void 0?o:"FetchError"}: ${n==null?void 0:n.message}`,details:l,hint:c,code:d},data:null,count:null,status:0,statusText:""}})),a.then(s,e)}async processResponse(s){var e=this;let t=null,i=null,r=null,a=s.status,n=s.statusText;if(s.ok){var o,l;if(e.method!=="HEAD"){var c;const p=await s.text();if(p!=="")if(e.headers.get("Accept")==="text/csv")i=p;else if(e.headers.get("Accept")&&(!((c=e.headers.get("Accept"))===null||c===void 0)&&c.includes("application/vnd.pgrst.plan+text")))i=p;else try{i=JSON.parse(p)}catch{if(t={message:p},i=null,e.shouldThrowOnError)throw new ze({message:p,details:"",hint:"",code:""})}}const u=(o=e.headers.get("Prefer"))===null||o===void 0?void 0:o.match(/count=(exact|planned|estimated)/),f=(l=s.headers.get("content-range"))===null||l===void 0?void 0:l.split("/");if(u&&f&&f.length>1&&(r=parseInt(f[1])),e.isMaybeSingle&&Array.isArray(i))if(i.length>1){if(t={code:"PGRST116",details:`Results contain ${i.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},i=null,r=null,a=406,n="Not Acceptable",e.shouldThrowOnError){var d;throw new ze(De(De({},t),{},{hint:(d=t.hint)!==null&&d!==void 0?d:""}))}}else i.length===1?i=i[0]:i=null}else{const u=await s.text();try{t=JSON.parse(u),Array.isArray(t)&&s.status===404&&(i=[],t=null,a=200,n="OK")}catch{s.status===404&&u===""?(a=204,n="No Content"):t={message:u}}if(t&&e.shouldThrowOnError)throw new ze(t)}return{success:t===null,error:t,data:i,count:r,status:a,statusText:n}}returns(){return this}overrideTypes(){return this}},Dr=class extends xr{throwOnError(){return super.throwOnError()}select(s){let e=!1;const t=(s??"*").split("").map(i=>/\s/.test(i)&&!e?"":(i==='"'&&(e=!e),i)).join("");return this.url.searchParams.set("select",t),this.headers.append("Prefer","return=representation"),this}order(s,{ascending:e=!0,nullsFirst:t,foreignTable:i,referencedTable:r=i}={}){const a=r?`${r}.order`:"order",n=this.url.searchParams.get(a);return this.url.searchParams.set(a,`${n?`${n},`:""}${s}.${e?"asc":"desc"}${t===void 0?"":t?".nullsfirst":".nullslast"}`),this}limit(s,{foreignTable:e,referencedTable:t=e}={}){const i=typeof t>"u"?"limit":`${t}.limit`;return this.url.searchParams.set(i,`${s}`),this}range(s,e,{foreignTable:t,referencedTable:i=t}={}){const r=typeof i>"u"?"offset":`${i}.offset`,a=typeof i>"u"?"limit":`${i}.limit`;return this.url.searchParams.set(r,`${s}`),this.url.searchParams.set(a,`${e-s+1}`),this}abortSignal(s){return this.signal=s,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:s=!1,verbose:e=!1,settings:t=!1,buffers:i=!1,wal:r=!1,format:a="text"}={}){var n;const o=[s?"analyze":null,e?"verbose":null,t?"settings":null,i?"buffers":null,r?"wal":null].filter(Boolean).join("|"),l=(n=this.headers.get("Accept"))!==null&&n!==void 0?n:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${a}; for="${l}"; options=${o};`),a==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(s){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${s}`),this}};const Os=new RegExp("[,()]");var He=class extends Dr{throwOnError(){return super.throwOnError()}eq(s,e){return this.url.searchParams.append(s,`eq.${e}`),this}neq(s,e){return this.url.searchParams.append(s,`neq.${e}`),this}gt(s,e){return this.url.searchParams.append(s,`gt.${e}`),this}gte(s,e){return this.url.searchParams.append(s,`gte.${e}`),this}lt(s,e){return this.url.searchParams.append(s,`lt.${e}`),this}lte(s,e){return this.url.searchParams.append(s,`lte.${e}`),this}like(s,e){return this.url.searchParams.append(s,`like.${e}`),this}likeAllOf(s,e){return this.url.searchParams.append(s,`like(all).{${e.join(",")}}`),this}likeAnyOf(s,e){return this.url.searchParams.append(s,`like(any).{${e.join(",")}}`),this}ilike(s,e){return this.url.searchParams.append(s,`ilike.${e}`),this}ilikeAllOf(s,e){return this.url.searchParams.append(s,`ilike(all).{${e.join(",")}}`),this}ilikeAnyOf(s,e){return this.url.searchParams.append(s,`ilike(any).{${e.join(",")}}`),this}regexMatch(s,e){return this.url.searchParams.append(s,`match.${e}`),this}regexIMatch(s,e){return this.url.searchParams.append(s,`imatch.${e}`),this}is(s,e){return this.url.searchParams.append(s,`is.${e}`),this}isDistinct(s,e){return this.url.searchParams.append(s,`isdistinct.${e}`),this}in(s,e){const t=Array.from(new Set(e)).map(i=>typeof i=="string"&&Os.test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(s,`in.(${t})`),this}notIn(s,e){const t=Array.from(new Set(e)).map(i=>typeof i=="string"&&Os.test(i)?`"${i}"`:`${i}`).join(",");return this.url.searchParams.append(s,`not.in.(${t})`),this}contains(s,e){return typeof e=="string"?this.url.searchParams.append(s,`cs.${e}`):Array.isArray(e)?this.url.searchParams.append(s,`cs.{${e.join(",")}}`):this.url.searchParams.append(s,`cs.${JSON.stringify(e)}`),this}containedBy(s,e){return typeof e=="string"?this.url.searchParams.append(s,`cd.${e}`):Array.isArray(e)?this.url.searchParams.append(s,`cd.{${e.join(",")}}`):this.url.searchParams.append(s,`cd.${JSON.stringify(e)}`),this}rangeGt(s,e){return this.url.searchParams.append(s,`sr.${e}`),this}rangeGte(s,e){return this.url.searchParams.append(s,`nxl.${e}`),this}rangeLt(s,e){return this.url.searchParams.append(s,`sl.${e}`),this}rangeLte(s,e){return this.url.searchParams.append(s,`nxr.${e}`),this}rangeAdjacent(s,e){return this.url.searchParams.append(s,`adj.${e}`),this}overlaps(s,e){return typeof e=="string"?this.url.searchParams.append(s,`ov.${e}`):this.url.searchParams.append(s,`ov.{${e.join(",")}}`),this}textSearch(s,e,{config:t,type:i}={}){let r="";i==="plain"?r="pl":i==="phrase"?r="ph":i==="websearch"&&(r="w");const a=t===void 0?"":`(${t})`;return this.url.searchParams.append(s,`${r}fts${a}.${e}`),this}match(s){return Object.entries(s).filter(([e,t])=>t!==void 0).forEach(([e,t])=>{this.url.searchParams.append(e,`eq.${t}`)}),this}not(s,e,t){return this.url.searchParams.append(s,`not.${e}.${t}`),this}or(s,{foreignTable:e,referencedTable:t=e}={}){const i=t?`${t}.or`:"or";return this.url.searchParams.append(i,`(${s})`),this}filter(s,e,t){return this.url.searchParams.append(s,`${e}.${t}`),this}},Nr=class{constructor(s,{headers:e={},schema:t,fetch:i,urlLengthLimit:r=8e3,retry:a}){this.url=s,this.headers=new Headers(e),this.schema=t,this.fetch=i,this.urlLengthLimit=r,this.retry=a}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(s,e){const{head:t=!1,count:i}=e??{},r=t?"HEAD":"GET";let a=!1;const n=(s??"*").split("").map(c=>/\s/.test(c)&&!a?"":(c==='"'&&(a=!a),c)).join(""),{url:o,headers:l}=this.cloneRequestState();return o.searchParams.set("select",n),i&&l.append("Prefer",`count=${i}`),new He({method:r,url:o,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(s,{count:e,defaultToNull:t=!0}={}){var i;const r="POST",{url:a,headers:n}=this.cloneRequestState();if(e&&n.append("Prefer",`count=${e}`),t||n.append("Prefer","missing=default"),Array.isArray(s)){const o=s.reduce((l,c)=>l.concat(Object.keys(c)),[]);if(o.length>0){const l=[...new Set(o)].map(c=>`"${c}"`);a.searchParams.set("columns",l.join(","))}}return new He({method:r,url:a,headers:n,schema:this.schema,body:s,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(s,{onConflict:e,ignoreDuplicates:t=!1,count:i,defaultToNull:r=!0}={}){var a;const n="POST",{url:o,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${t?"ignore":"merge"}-duplicates`),e!==void 0&&o.searchParams.set("on_conflict",e),i&&l.append("Prefer",`count=${i}`),r||l.append("Prefer","missing=default"),Array.isArray(s)){const c=s.reduce((d,u)=>d.concat(Object.keys(u)),[]);if(c.length>0){const d=[...new Set(c)].map(u=>`"${u}"`);o.searchParams.set("columns",d.join(","))}}return new He({method:n,url:o,headers:l,schema:this.schema,body:s,fetch:(a=this.fetch)!==null&&a!==void 0?a:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(s,{count:e}={}){var t;const i="PATCH",{url:r,headers:a}=this.cloneRequestState();return e&&a.append("Prefer",`count=${e}`),new He({method:i,url:r,headers:a,schema:this.schema,body:s,fetch:(t=this.fetch)!==null&&t!==void 0?t:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:s}={}){var e;const t="DELETE",{url:i,headers:r}=this.cloneRequestState();return s&&r.append("Prefer",`count=${s}`),new He({method:t,url:i,headers:r,schema:this.schema,fetch:(e=this.fetch)!==null&&e!==void 0?e:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};function Mr(s,e){try{const n=JSON.parse(s);if(n&&typeof n=="object"&&!Array.isArray(n)){var t,i,r,a;return new ze({message:String((t=n.message)!==null&&t!==void 0?t:s),details:(i=n.details)!==null&&i!==void 0?i:"",hint:(r=n.hint)!==null&&r!==void 0?r:"",code:(a=n.code)!==null&&a!==void 0?a:""})}}catch{}return new ze({message:s||e,details:"",hint:"",code:""})}function Is(s,e,t){var i;const r=s;return{success:!1,error:new ze({message:`${(i=r==null?void 0:r.name)!==null&&i!==void 0?i:"FetchError"}: ${r==null?void 0:r.message}`,details:"",hint:"",code:""}),data:null,count:null,status:e,statusText:t}}var Br=class Pi{constructor(e,{headers:t={},schema:i,fetch:r,timeout:a,urlLengthLimit:n=8e3,retry:o}={}){this.url=e,this.headers=new Headers(t),this.schemaName=i,this.urlLengthLimit=n;const l=r??globalThis.fetch;a!==void 0&&a>0?this.fetch=(c,d)=>{const u=new AbortController,f=setTimeout(()=>u.abort(),a),p=d==null?void 0:d.signal;if(p){if(p.aborted)return clearTimeout(f),l(c,d);const v=()=>{clearTimeout(f),u.abort()};return p.addEventListener("abort",v,{once:!0}),l(c,De(De({},d),{},{signal:u.signal})).finally(()=>{clearTimeout(f),p.removeEventListener("abort",v)})}return l(c,De(De({},d),{},{signal:u.signal})).finally(()=>clearTimeout(f))}:this.fetch=l,this.retry=o}from(e){if(!e||typeof e!="string"||e.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new Nr(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(e){return new Pi(this.url,{headers:this.headers,schema:e,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}async getOpenApiSpec(){var e=this,t;const i=new Headers(e.headers);i.set("Accept","application/openapi+json"),e.schemaName&&i.set("Accept-Profile",e.schemaName);const r={};i.forEach((c,d)=>{r[d]=c});const a=(t=e.fetch)!==null&&t!==void 0?t:globalThis.fetch;let n;try{var o;n=await Ri(a,`${e.url}/`,{method:"GET",headers:r},(o=e.retry)!==null&&o!==void 0?o:!0)}catch(c){return Is(c,0,"")}let l;try{l=await n.text()}catch(c){return Is(c,n.status,n.statusText)}if(n.ok)try{return{success:!0,error:null,data:JSON.parse(l),count:null,status:n.status,statusText:n.statusText}}catch{}return{success:!1,error:Mr(l,n.statusText),data:null,count:null,status:n.status,statusText:n.statusText}}rpc(e,t={},{head:i=!1,get:r=!1,count:a}={}){var n;let o;const l=new URL(`${this.url}/rpc/${e}`);let c;const d=p=>p!==null&&typeof p=="object"&&(!Array.isArray(p)||p.some(d)),u=i&&Object.values(t).some(d);u?(o="POST",c=t):i||r?(o=i?"HEAD":"GET",Object.entries(t).filter(([p,v])=>v!==void 0).map(([p,v])=>[p,Array.isArray(v)?`{${v.join(",")}}`:`${v}`]).forEach(([p,v])=>{l.searchParams.append(p,v)})):(o="POST",c=t);const f=new Headers(this.headers);return u?f.set("Prefer",a?`count=${a},return=minimal`:"return=minimal"):a&&f.set("Prefer",`count=${a}`),new He({method:o,url:l,headers:f,schema:this.schemaName,body:c,fetch:(n=this.fetch)!==null&&n!==void 0?n:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};class Fr{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",wsConstructor:WebSocket};const t=globalThis;if(typeof globalThis<"u"&&typeof t.WebSocket<"u")return{type:"native",wsConstructor:t.WebSocket};const i=typeof global<"u"?global:void 0;if(i&&typeof i.WebSocket<"u")return{type:"native",wsConstructor:i.WebSocket};if(typeof globalThis<"u"&&typeof t.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&t.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const r=globalThis.process;if(r){const a=r.versions;if(a&&a.node)return{type:"unsupported",error:"Node.js detected but native WebSocket not found.",workaround:"Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option."}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.wsConstructor)return e.wsConstructor;let t=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(t+=`

Suggested solution: ${e.workaround}`),new Error(t)}static isWebSocketSupported(){try{return this.detectEnvironment().type==="native"}catch{return!1}}}const Ur="2.117.2",jr=`realtime-js/${Ur}`,$r="1.0.0",Li="2.0.0",Hr=Li,qr=1e4,Wr=15e3,zr=1e4,Gr=100,ke={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},Oi={close:"phx_close",error:"phx_error",join:"phx_join",leave:"phx_leave",access_token:"access_token"},as={connecting:"connecting",closing:"closing",closed:"closed"};class Vr{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,t){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return t(this._binaryEncodeUserBroadcastPush(e));let i=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(i))}_binaryEncodeUserBroadcastPush(e){var t;return this._isArrayBuffer((t=e.payload)===null||t===void 0?void 0:t.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var t,i;const r=(i=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&i!==void 0?i:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,r)}_encodeJsonUserBroadcastPush(e){var t,i;const r=(i=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&i!==void 0?i:{},n=new TextEncoder().encode(JSON.stringify(r)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,n)}_encodeUserBroadcastPush(e,t,i){var r,a;const n=new TextEncoder,o=n.encode(e.topic),l=n.encode((r=e.ref)!==null&&r!==void 0?r:""),c=n.encode((a=e.join_ref)!==null&&a!==void 0?a:""),d=n.encode(e.payload.event),u=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},f=n.encode(Object.keys(u).length===0?"":JSON.stringify(u));if(c.length>255)throw new Error(`joinRef length ${c.length} exceeds maximum of 255`);if(l.length>255)throw new Error(`ref length ${l.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`topic length ${o.length} exceeds maximum of 255`);if(d.length>255)throw new Error(`userEvent length ${d.length} exceeds maximum of 255`);if(f.length>255)throw new Error(`metadata length ${f.length} exceeds maximum of 255`);const p=this.USER_BROADCAST_PUSH_META_LENGTH+c.length+l.length+o.length+d.length+f.length,v=new ArrayBuffer(this.HEADER_LENGTH+p),b=new DataView(v),_=new Uint8Array(v);let C=0;b.setUint8(C++,this.KINDS.userBroadcastPush),b.setUint8(C++,c.length),b.setUint8(C++,l.length),b.setUint8(C++,o.length),b.setUint8(C++,d.length),b.setUint8(C++,f.length),b.setUint8(C++,t),_.set(c,C),C+=c.length,_.set(l,C),C+=l.length,_.set(o,C),C+=o.length,_.set(d,C),C+=d.length,_.set(f,C),C+=f.length;var m=new Uint8Array(v.byteLength+i.byteLength);return m.set(new Uint8Array(v),0),m.set(new Uint8Array(i),v.byteLength),m.buffer}decode(e,t){if(this._isArrayBuffer(e)){let i=this._binaryDecode(e);return t(i)}if(typeof e=="string"){const i=JSON.parse(e),[r,a,n,o,l]=i;return t({join_ref:r,ref:a,topic:n,event:o,payload:l})}return t({})}_binaryDecode(e){const t=new DataView(e),i=t.getUint8(0),r=new TextDecoder;switch(i){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,t,r)}}_decodeUserBroadcast(e,t,i){const r=t.getUint8(1),a=t.getUint8(2),n=t.getUint8(3),o=t.getUint8(4);let l=this.HEADER_LENGTH+4;const c=i.decode(e.slice(l,l+r));l=l+r;const d=i.decode(e.slice(l,l+a));l=l+a;const u=i.decode(e.slice(l,l+n));l=l+n;const f=e.slice(l,e.byteLength),p=o===this.JSON_ENCODING?JSON.parse(i.decode(f)):f,v={type:this.BROADCAST_EVENT,event:d,payload:p};return n>0&&(v.meta=JSON.parse(u)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:v}}_isArrayBuffer(e){var t;return e instanceof ArrayBuffer||((t=e==null?void 0:e.constructor)===null||t===void 0?void 0:t.name)==="ArrayBuffer"}_pick(e,t){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([i])=>t.includes(i)))}}var q;(function(s){s.abstime="abstime",s.bool="bool",s.date="date",s.daterange="daterange",s.float4="float4",s.float8="float8",s.int2="int2",s.int4="int4",s.int4range="int4range",s.int8="int8",s.int8range="int8range",s.json="json",s.jsonb="jsonb",s.money="money",s.numeric="numeric",s.oid="oid",s.reltime="reltime",s.text="text",s.time="time",s.timestamp="timestamp",s.timestamptz="timestamptz",s.timetz="timetz",s.tsrange="tsrange",s.tstzrange="tstzrange"})(q||(q={}));const xs=(s,e,t={})=>{var i;const r=(i=t.skipTypes)!==null&&i!==void 0?i:[];return e?Object.keys(e).reduce((a,n)=>(a[n]=Kr(n,s,e,r),a),{}):{}},Kr=(s,e,t,i)=>{const r=e.find(o=>o.name===s),a=r==null?void 0:r.type,n=t[s];return a&&!i.includes(a)?Ii(a,n):ns(n)},Ii=(s,e)=>{if(s.charAt(0)==="_"){const t=s.slice(1,s.length);return Xr(e,t)}switch(s){case q.bool:return Qr(e);case q.float4:case q.float8:case q.int2:case q.int4:case q.int8:case q.numeric:case q.oid:return Jr(e);case q.json:case q.jsonb:return Yr(e);case q.timestamp:return Zr(e);case q.abstime:case q.date:case q.daterange:case q.int4range:case q.int8range:case q.money:case q.reltime:case q.text:case q.time:case q.timestamptz:case q.timetz:case q.tsrange:case q.tstzrange:return ns(e);default:return ns(e)}},ns=s=>s,Qr=s=>{switch(s){case"t":return!0;case"f":return!1;default:return s}},Jr=s=>{if(typeof s=="string"){const e=parseFloat(s);if(!Number.isNaN(e))return e}return s},Yr=s=>{if(typeof s=="string")try{return JSON.parse(s)}catch{return s}return s},Xr=(s,e)=>{if(typeof s!="string")return s;const t=s.length-1,i=s[t];if(s[0]==="{"&&i==="}"){let a;const n=s.slice(1,t);try{a=JSON.parse("["+n+"]")}catch{a=n?n.split(","):[]}return a.map(o=>Ii(e,o))}return s},Zr=s=>typeof s=="string"?s.replace(" ","T"):s,xi=s=>{const e=new URL(s);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};var Ge=s=>typeof s=="function"?s:function(){return s},ea=typeof self<"u"?self:null,qe=typeof window<"u"?window:null,fe=ea||qe||globalThis,ta="2.0.0",sa=1e4,ia=1e3,ra=100,_e={connecting:0,open:1,closing:2,closed:3},te={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},Se={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},os={longpoll:"longpoll",websocket:"websocket"},aa={complete:4},ls="base64url.bearer.phx.",yt=class{constructor(s,e,t,i){this.channel=s,this.event=e,this.payload=t||function(){return{}},this.receivedResp=null,this.timeout=i,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(s){this.timeout=s,this.reset(),this.send()}send(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(s,e){return this.hasReceived(s)&&e(this.receivedResp.response),this.recHooks.push({status:s,callback:e}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:s,response:e,_ref:t}){this.recHooks.filter(i=>i.status===s).forEach(i=>i.callback(e))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,s=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=s,this.matchReceive(s)}),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}hasReceived(s){return this.receivedResp&&this.receivedResp.status===s}trigger(s,e){this.channel.trigger(this.refEvent,{status:s,response:e})}},Di=class{constructor(s,e){this.callback=s,this.timerCalc=e,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}},na=class{constructor(s,e,t){this.state=te.closed,this.topic=s,this.params=Ge(e||{}),this.socket=t,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new yt(this,Se.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new Di(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive("ok",()=>{this.state=te.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(i=>i.send()),this.pushBuffer=[]}),this.joinPush.receive("error",i=>{this.state=te.errored,this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,i),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log("channel",`close ${this.topic}`),this.state=te.closed,this.socket.remove(this)}),this.onError(i=>{this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,i),this.isJoining()&&this.joinPush.reset(),this.state=te.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive("timeout",()=>{this.socket.hasLogger()&&this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),new yt(this,Se.leave,Ge({}),this.timeout).send(),this.state=te.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(Se.reply,(i,r)=>{this.trigger(this.replyEventName(r),i)})}join(s=this.timeout){if(this.joinedOnce)throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");return this.timeout=s,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(s=>s.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=te.closed,this.bindings=[]}onClose(s){this.on(Se.close,s)}onError(s){return this.on(Se.error,e=>s(e))}on(s,e){let t=this.bindingRef++;return this.bindings.push({event:s,ref:t,callback:e}),t}off(s,e){this.bindings=this.bindings.filter(t=>!(t.event===s&&(typeof e>"u"||e===t.ref)))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(s,e,t=this.timeout){if(e=e||{},!this.joinedOnce)throw new Error(`tried to push '${s}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let i=new yt(this,s,function(){return e},t);return this.canPush()?i.send():(i.startTimeout(),this.pushBuffer.push(i)),i}leave(s=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=te.leaving;let e=()=>{this.socket.hasLogger()&&this.socket.log("channel",`leave ${this.topic}`),this.trigger(Se.close,"leave")},t=new yt(this,Se.leave,Ge({}),s);return t.receive("ok",()=>e()).receive("timeout",()=>e()),t.send(),this.canPush()||t.trigger("ok",{}),t}onMessage(s,e,t){return e}filterBindings(s,e,t){return!0}isMember(s,e,t,i){return this.topic!==s?!1:i&&i!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log("channel","dropping outdated message",{topic:s,event:e,payload:t,joinRef:i}),!1):!0}joinRef(){return this.joinPush.ref}rejoin(s=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=te.joining,this.joinPush.resend(s))}trigger(s,e,t,i){let r=this.onMessage(s,e,t,i);if(e&&!r)throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");let a=this.bindings.filter(n=>n.event===s&&this.filterBindings(n,e,t));for(let n=0;n<a.length;n++)a[n].callback(r,t,i||this.joinRef())}replyEventName(s){return`chan_reply_${s}`}isClosed(){return this.state===te.closed}isErrored(){return this.state===te.errored}isJoined(){return this.state===te.joined}isJoining(){return this.state===te.joining}isLeaving(){return this.state===te.leaving}},Nt=class{static request(s,e,t,i,r,a,n){if(fe.XDomainRequest){let o=new fe.XDomainRequest;return this.xdomainRequest(o,s,e,i,r,a,n)}else if(fe.XMLHttpRequest){let o=new fe.XMLHttpRequest;return this.xhrRequest(o,s,e,t,i,r,a,n)}else{if(fe.fetch&&fe.AbortController)return this.fetchRequest(s,e,t,i,r,a,n);throw new Error("No suitable XMLHttpRequest implementation found")}}static fetchRequest(s,e,t,i,r,a,n){let o={method:s,headers:t,body:i},l=null;return r&&(l=new AbortController,setTimeout(()=>l.abort(),r),o.signal=l.signal),fe.fetch(e,o).then(c=>c.text()).then(c=>this.parseJSON(c)).then(c=>n&&n(c)).catch(c=>{c.name==="AbortError"&&a?a():n&&n(null)}),l}static xdomainRequest(s,e,t,i,r,a,n){return s.timeout=r,s.open(e,t),s.onload=()=>{let o=this.parseJSON(s.responseText);n&&n(o)},a&&(s.ontimeout=a),s.onprogress=()=>{},s.send(i),s}static xhrRequest(s,e,t,i,r,a,n,o){s.open(e,t,!0),s.timeout=a;for(let[l,c]of Object.entries(i))s.setRequestHeader(l,c);return s.onerror=()=>o&&o(null),s.onreadystatechange=()=>{if(s.readyState===aa.complete&&o){let l=this.parseJSON(s.responseText);o(l)}},n&&(s.ontimeout=n),s.send(r),s}static parseJSON(s){if(!s||s==="")return null;try{return JSON.parse(s)}catch{return console&&console.log("failed to parse JSON response",s),null}}static serialize(s,e){let t=[];for(var i in s){if(!Object.prototype.hasOwnProperty.call(s,i))continue;let r=e?`${e}[${i}]`:i,a=s[i];typeof a=="object"?t.push(this.serialize(a,r)):t.push(encodeURIComponent(r)+"="+encodeURIComponent(a))}return t.join("&")}static appendParams(s,e){if(Object.keys(e).length===0)return s;let t=s.match(/\?/)?"&":"?";return`${s}${t}${this.serialize(e)}`}},oa=s=>{let e="",t=new Uint8Array(s),i=t.byteLength;for(let r=0;r<i;r++)e+=String.fromCharCode(t[r]);return btoa(e)},Fe=class{constructor(s,e){e&&e.length===2&&e[1].startsWith(ls)&&(this.authToken=atob(e[1].slice(ls.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(s),this.readyState=_e.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(s){return s.replace("ws://","http://").replace("wss://","https://").replace(new RegExp("(.*)/"+os.websocket),"$1/"+os.longpoll)}endpointURL(){return Nt.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(s,e,t){this.close(s,e,t),this.readyState=_e.connecting}ontimeout(){this.onerror("timeout"),this.closeAndRetry(1005,"timeout",!1)}isActive(){return this.readyState===_e.open||this.readyState===_e.connecting}poll(){const s={Accept:"application/json"};this.authToken&&(s["X-Phoenix-AuthToken"]=this.authToken),this.ajax("GET",s,null,()=>this.ontimeout(),e=>{if(e){var{status:t,token:i,messages:r}=e;if(t===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,"session_gone",!1);return}this.token=i}else t=0;switch(t){case 200:r.forEach(a=>{setTimeout(()=>this.onmessage({data:a}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=_e.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,"forbidden",!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,"internal server error",500);break;default:throw new Error(`unhandled poll status ${t}`)}})}send(s){typeof s!="string"&&(s=oa(s)),this.currentBatch?this.currentBatch.push(s):this.awaitingBatchAck?this.batchBuffer.push(s):(this.currentBatch=[s],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(s,e=0){this.awaitingBatchAck=!0;const t=e+ra,i=s.slice(e,t);this.ajax("POST",{"Content-Type":"application/x-ndjson"},i.join(`
`),()=>this.onerror("timeout"),r=>{!r||r.status!==200?(this.awaitingBatchAck=!1,this.onerror(r&&r.status),this.closeAndRetry(1011,"internal server error",!1)):t<s.length?this.batchSend(s,t):this.batchBuffer.length>0?(this.batchSend(this.batchBuffer),this.batchBuffer=[]):this.awaitingBatchAck=!1})}close(s,e,t){for(let r of this.reqs)r.abort();this.readyState=_e.closed;let i=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:s,reason:e,wasClean:t});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<"u"?this.onclose(new CloseEvent("close",i)):this.onclose(i)}ajax(s,e,t,i,r){let a,n=()=>{this.reqs.delete(a),i()};a=Nt.request(s,this.endpointURL(),e,t,this.timeout,n,o=>{this.reqs.delete(a),this.isActive()&&r(o)}),this.reqs.add(a)}},la=class it{constructor(e,t={}){let i=t.events||{state:"presence_state",diff:"presence_diff"};this.state=Object.create(null),this.pendingDiffs=[],this.channel=e,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(i.state,r=>{let{onJoin:a,onLeave:n,onSync:o}=this.caller;this.joinRef=this.channel.joinRef(),this.state=it.syncState(this.state,r,a,n),this.pendingDiffs.forEach(l=>{this.state=it.syncDiff(this.state,l,a,n)}),this.pendingDiffs=[],o()}),this.channel.on(i.diff,r=>{let{onJoin:a,onLeave:n,onSync:o}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(r):(this.state=it.syncDiff(this.state,r,a,n),o())})}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}list(e){return it.list(this.state,e)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(e,t,i,r){let a=this.toNullProtoObj(this.clone(e));t=this.toNullProtoObj(t);let n=Object.create(null),o=Object.create(null);return this.map(a,(l,c)=>{t[l]||(o[l]=c)}),this.map(t,(l,c)=>{let d=a[l];if(d){let u=c.metas.map(b=>b.phx_ref),f=d.metas.map(b=>b.phx_ref),p=c.metas.filter(b=>f.indexOf(b.phx_ref)<0),v=d.metas.filter(b=>u.indexOf(b.phx_ref)<0);p.length>0&&(n[l]=c,n[l].metas=p),v.length>0&&(o[l]=this.clone(d),o[l].metas=v)}else n[l]=c}),this.syncDiff(a,{joins:n,leaves:o},i,r)}static syncDiff(e,t,i,r){e=this.toNullProtoObj(e);let{joins:a,leaves:n}=this.clone(t);return i||(i=function(){}),r||(r=function(){}),this.map(a,(o,l)=>{let c=e[o];if(e[o]=this.clone(l),c){let d=e[o].metas.map(f=>f.phx_ref),u=c.metas.filter(f=>d.indexOf(f.phx_ref)<0);e[o].metas.unshift(...u)}i(o,c,l)}),this.map(n,(o,l)=>{let c=e[o];if(!c)return;let d=l.metas.map(u=>u.phx_ref);c.metas=c.metas.filter(u=>d.indexOf(u.phx_ref)<0),r(o,c,l),c.metas.length===0&&delete e[o]}),e}static list(e,t){return t||(t=function(i,r){return r}),this.map(e,(i,r)=>t(i,r))}static map(e,t){return Object.getOwnPropertyNames(e).map(i=>t(i,e[i]))}static toNullProtoObj(e){if(Object.getPrototypeOf(e)===null)return e;let t=Object.create(null);return Object.getOwnPropertyNames(e).forEach(i=>{t[i]=e[i]}),t}static clone(e){return JSON.parse(JSON.stringify(e))}},vt={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(s,e){if(s.payload.constructor===ArrayBuffer)return e(this.binaryEncode(s));{let t=[s.join_ref,s.ref,s.topic,s.event,s.payload];return e(JSON.stringify(t))}},decode(s,e){if(s.constructor===ArrayBuffer)return e(this.binaryDecode(s));{let[t,i,r,a,n]=JSON.parse(s);return e({join_ref:t,ref:i,topic:r,event:a,payload:n})}},binaryEncode(s){let{join_ref:e,ref:t,event:i,topic:r,payload:a}=s,n=new TextEncoder,o=n.encode(e),l=n.encode(t),c=n.encode(r),d=n.encode(i);this.assertFieldSize(o.byteLength,"join_ref"),this.assertFieldSize(l.byteLength,"ref"),this.assertFieldSize(c.byteLength,"topic"),this.assertFieldSize(d.byteLength,"event");let u=this.META_LENGTH+o.byteLength+l.byteLength+c.byteLength+d.byteLength,f=new ArrayBuffer(this.HEADER_LENGTH+u),p=new Uint8Array(f),v=new DataView(f),b=0;v.setUint8(b++,this.KINDS.push),v.setUint8(b++,o.byteLength),v.setUint8(b++,l.byteLength),v.setUint8(b++,c.byteLength),v.setUint8(b++,d.byteLength),p.set(o,b),b+=o.byteLength,p.set(l,b),b+=l.byteLength,p.set(c,b),b+=c.byteLength,p.set(d,b),b+=d.byteLength;var _=new Uint8Array(f.byteLength+a.byteLength);return _.set(p,0),_.set(new Uint8Array(a),f.byteLength),_.buffer},assertFieldSize(s,e){if(s>255)throw new Error(`unable to convert ${e} to binary: must be less than or equal to 255 bytes, but is ${s} bytes`)},binaryDecode(s){let e=new DataView(s),t=e.getUint8(0),i=new TextDecoder;switch(t){case this.KINDS.push:return this.decodePush(s,e,i);case this.KINDS.reply:return this.decodeReply(s,e,i);case this.KINDS.broadcast:return this.decodeBroadcast(s,e,i)}},decodePush(s,e,t){let i=e.getUint8(1),r=e.getUint8(2),a=e.getUint8(3),n=this.HEADER_LENGTH+this.META_LENGTH-1,o=t.decode(s.slice(n,n+i));n=n+i;let l=t.decode(s.slice(n,n+r));n=n+r;let c=t.decode(s.slice(n,n+a));n=n+a;let d=s.slice(n,s.byteLength);return{join_ref:o,ref:null,topic:l,event:c,payload:d}},decodeReply(s,e,t){let i=e.getUint8(1),r=e.getUint8(2),a=e.getUint8(3),n=e.getUint8(4),o=this.HEADER_LENGTH+this.META_LENGTH,l=t.decode(s.slice(o,o+i));o=o+i;let c=t.decode(s.slice(o,o+r));o=o+r;let d=t.decode(s.slice(o,o+a));o=o+a;let u=t.decode(s.slice(o,o+n));o=o+n;let f=s.slice(o,s.byteLength),p={status:u,response:f};return{join_ref:l,ref:c,topic:d,event:Se.reply,payload:p}},decodeBroadcast(s,e,t){let i=e.getUint8(1),r=e.getUint8(2),a=this.HEADER_LENGTH+2,n=t.decode(s.slice(a,a+i));a=a+i;let o=t.decode(s.slice(a,a+r));a=a+r;let l=s.slice(a,s.byteLength);return{join_ref:null,ref:null,topic:n,event:o,payload:l}}},ca=class{constructor(s,e={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=e.timeout||sa,this.transport=e.transport||fe.WebSocket||Fe,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=e.longPollFallbackMs,this.fallbackTimer=null;let t=null;try{t=fe&&fe.sessionStorage}catch{}this.sessionStore=e.sessionStorage||t,this.establishedConnections=0,this.defaultEncoder=vt.encode.bind(vt),this.defaultDecoder=vt.decode.bind(vt),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=e.binaryType||"arraybuffer",this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport!==Fe?(this.encode=e.encode||this.defaultEncoder,this.decode=e.decode||this.defaultDecoder):(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder);let i=null;qe&&qe.addEventListener&&(qe.addEventListener("pagehide",r=>{this.conn&&(this.disconnect(),i=this.connectClock)}),qe.addEventListener("pageshow",r=>{i===this.connectClock&&(i=null,this.connect())}),qe.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=e.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=e.autoSendHeartbeat??!0,this.heartbeatCallback=e.heartbeatCallback??(()=>{}),this.rejoinAfterMs=r=>e.rejoinAfterMs?e.rejoinAfterMs(r):[1e3,2e3,5e3][r-1]||1e4,this.reconnectAfterMs=r=>e.reconnectAfterMs?e.reconnectAfterMs(r):[10,50,100,150,200,250,500,1e3,2e3][r-1]||5e3,this.logger=e.logger||null,!this.logger&&e.debug&&(this.logger=(r,a,n)=>{console.log(`${r}: ${a}`,n)}),this.longpollerTimeout=e.longpollerTimeout||2e4,this.params=Ge(e.params||{}),this.endPoint=`${s}/${os.websocket}`,this.vsn=e.vsn||ta,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new Di(()=>{if(this.pageHidden){this.log("Not reconnecting as page is hidden!"),this.teardown();return}this.teardown(async()=>{e.beforeReconnect&&await e.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=e.authToken&&Ge(e.authToken)}getLongPollTransport(){return Fe}replaceTransport(s){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&(this.conn.close(),this.conn=null),this.transport=s}protocol(){return location.protocol.match(/^https/)?"wss":"ws"}endPointURL(){let s=Nt.appendParams(Nt.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return s.charAt(0)!=="/"?s:s.charAt(1)==="/"?`${this.protocol()}:${s}`:`${this.protocol()}://${location.host}${s}`}disconnect(s,e,t){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,s&&s()},e,t)}connect(s){s&&(console&&console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"),this.params=Ge(s)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==Fe?this.connectWithFallback(Fe,this.longPollFallbackMs):this.transportConnect())}log(s,e,t){this.logger&&this.logger(s,e,t)}hasLogger(){return this.logger!==null}onOpen(s){let e=this.makeRef();return this.stateChangeCallbacks.open.push([e,s]),e}onClose(s){let e=this.makeRef();return this.stateChangeCallbacks.close.push([e,s]),e}onError(s){let e=this.makeRef();return this.stateChangeCallbacks.error.push([e,s]),e}onMessage(s){let e=this.makeRef();return this.stateChangeCallbacks.message.push([e,s]),e}onHeartbeat(s){this.heartbeatCallback=s}ping(s){if(!this.isConnected())return!1;let e=this.makeRef(),t=Date.now();this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:e});let i=this.onMessage(r=>{r.ref===e&&(this.off([i]),s(Date.now()-t))});return!0}transportName(s){switch(s){case Fe:return"LongPoll";default:return s.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let s;this.authToken&&(s=["phoenix",`${ls}${btoa(this.authToken()).replace(/=/g,"")}`]),this.conn=new this.transport(this.endPointURL(),s),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=e=>this.onConnError(e),this.conn.onmessage=e=>this.onConnMessage(e),this.conn.onclose=e=>this.onConnClose(e)}getSession(s){return this.sessionStore&&this.sessionStore.getItem(s)}storeSession(s,e){this.sessionStore&&this.sessionStore.setItem(s,e)}connectWithFallback(s,e=2500){clearTimeout(this.fallbackTimer);let t=!1,i=!0,r,a,n=this.transportName(s),o=l=>{this.log("transport",`falling back to ${n}...`,l),this.off([r,a]),i=!1,this.replaceTransport(s),this.transportConnect()};if(this.getSession(`phx:fallback:${n}`))return o("memorized");this.fallbackTimer=setTimeout(o,e),a=this.onError(l=>{this.log("transport","error",l),i&&!t&&(clearTimeout(this.fallbackTimer),o(l))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(t=!0,!i){let l=this.transportName(s);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${l}`,"true"),this.log("transport",`established ${l} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(o,e),this.ping(l=>{this.log("transport","connected to primary after",l),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log("transport",`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks("open")}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(s){this.log("error","error in heartbeat callback",s)}this.triggerChanError(new Error("heartbeat timeout")),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),ia,"heartbeat timeout")}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(s,e,t){if(!this.conn)return s&&s();const i=this.conn;this.waitForBufferDone(i,()=>{e?i.close(e,t||""):i.close(),this.waitForSocketClosed(i,()=>{this.conn===i&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),s&&s()})})}waitForBufferDone(s,e,t=1){if(t===5||!s.bufferedAmount){e();return}setTimeout(()=>{this.waitForBufferDone(s,e,t+1)},150*t)}waitForSocketClosed(s,e,t=1){if(t===5||s.readyState===_e.closed){e();return}setTimeout(()=>{this.waitForSocketClosed(s,e,t+1)},150*t)}onConnClose(s){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log("transport","close",s),this.triggerChanError(s),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks("close",s)}onConnError(s){this.hasLogger()&&this.log("transport","error",s);let e=this.transport,t=this.establishedConnections;this.triggerStateCallbacks("error",s,e,t),(e===this.transport||t>0)&&this.triggerChanError(s)}triggerChanError(s){this.channels.forEach(e=>{e.isErrored()||e.isLeaving()||e.isClosed()||e.trigger(Se.error,s)})}connectionState(){switch(this.conn&&this.conn.readyState){case _e.connecting:return"connecting";case _e.open:return"open";case _e.closing:return"closing";default:return"closed"}}isConnected(){return this.connectionState()==="open"}remove(s){this.off(s.stateChangeRefs),this.channels=this.channels.filter(e=>e!==s)}off(s){for(let e in this.stateChangeCallbacks)this.stateChangeCallbacks[e]=this.stateChangeCallbacks[e].filter(([t])=>s.indexOf(t)===-1)}channel(s,e={}){let t=new na(s,e,this);return this.channels.push(t),t}push(s){if(this.hasLogger()){let{topic:e,event:t,payload:i,ref:r,join_ref:a}=s;this.log("push",`${e} ${t} (${a}, ${r})`,i)}this.isConnected()?this.encode(s,e=>this.conn.send(e)):this.sendBuffer.push(()=>this.encode(s,e=>this.conn.send(e)))}makeRef(){let s=this.ref+1;return s===this.ref?this.ref=0:this.ref=s,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(s){this.log("error","error in heartbeat callback",s)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(s){this.log("error","error in heartbeat callback",s)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(s=>s()),this.sendBuffer=[])}onConnMessage(s){this.decode(s.data,e=>{let{topic:t,event:i,payload:r,ref:a,join_ref:n}=e;if(a&&a===this.pendingHeartbeatRef){const o=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(r.status==="ok"?"ok":"error",o)}catch(l){this.log("error","error in heartbeat callback",l)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log("receive",`${r.status||""} ${t} ${i} ${a&&"("+a+")"||""}`.trim(),r);for(let o=0;o<this.channels.length;o++){const l=this.channels[o];l.isMember(t,i,r,n)&&l.trigger(i,r,a,n)}this.triggerStateCallbacks("message",e)})}triggerStateCallbacks(s,...e){try{this.stateChangeCallbacks[s].forEach(([t,i])=>{try{i(...e)}catch(r){this.log("error",`error in ${s} callback`,r)}})}catch(t){this.log("error",`error triggering ${s} callbacks`,t)}}leaveOpenTopic(s){let e=this.channels.find(t=>t.topic===s&&(t.isJoined()||t.isJoining()));e&&(this.hasLogger()&&this.log("transport",`leaving duplicate topic "${s}"`),e.leave())}};class nt{constructor(e,t){const i=ua(t);this.presence=new la(e.getChannel(),i),this.presence.onJoin((r,a,n)=>{const o=nt.onJoinPayload(r,a,n);e.getChannel().trigger("presence",o)}),this.presence.onLeave((r,a,n)=>{const o=nt.onLeavePayload(r,a,n);e.getChannel().trigger("presence",o)}),this.presence.onSync(()=>{e.getChannel().trigger("presence",{event:"sync"})})}get state(){return nt.transformState(this.presence.state)}static transformState(e){return e=da(e),Object.getOwnPropertyNames(e).reduce((t,i)=>{const r=e[i];return t[i]=Rt(r),t},{})}static onJoinPayload(e,t,i){const r=Ds(t),a=Rt(i);return{event:"join",key:e,currentPresences:r,newPresences:a}}static onLeavePayload(e,t,i){const r=Ds(t),a=Rt(i);return{event:"leave",key:e,currentPresences:r,leftPresences:a}}}function Rt(s){return s.metas.map(e=>{const t=Object.getOwnPropertyDescriptors(e),i=Object.defineProperties({},t);return i.presence_ref=i.phx_ref,delete i.phx_ref,delete i.phx_ref_prev,i})}function da(s){return JSON.parse(JSON.stringify(s))}function ua(s){return(s==null?void 0:s.events)&&{events:s.events}}function Ds(s){return s!=null&&s.metas?Rt(s):[]}var Ns;(function(s){s.SYNC="sync",s.JOIN="join",s.LEAVE="leave"})(Ns||(Ns={}));class ha{get state(){return this.presenceAdapter.state}constructor(e,t){this.channel=e,this.presenceAdapter=new nt(this.channel.channelAdapter,t)}}function pa(s){if(s instanceof Error)return s;if(typeof s=="string")return new Error(s);if(s&&typeof s=="object"){const e=s;if(typeof e.code=="number"){const t=typeof e.reason=="string"&&e.reason?` (${e.reason})`:"";return new Error(`socket closed: ${e.code}${t}`,{cause:s})}return new Error("channel error: transport failure",{cause:s})}return new Error("channel error: connection lost")}class ga{constructor(e,t,i){const r=ma(i);this.channel=e.getSocket().channel(t,r),this.socket=e}get state(){return this.channel.state}set state(e){this.channel.state=e}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(e,t){return this.channel.on(e,t)}off(e,t){this.channel.off(e,t)}subscribe(e){return this.channel.join(e)}unsubscribe(e){return this.channel.leave(e)}teardown(){this.channel.teardown()}onClose(e){this.channel.onClose(e)}onError(e){return this.channel.onError(e)}push(e,t,i){let r;try{r=this.channel.push(e,t,i)}catch{throw new Error(`tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)}if(this.channel.pushBuffer.length>Gr){const a=this.channel.pushBuffer.shift();a.cancelTimeout(),this.socket.log("channel",`discarded push due to buffer overflow: ${a.event}`,a.payload())}return r}updateJoinPayload(e){const t=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},t),e)}canPush(){return this.socket.isConnected()&&this.state===ke.joined}isJoined(){return this.state===ke.joined}isJoining(){return this.state===ke.joining}isClosed(){return this.state===ke.closed}isLeaving(){return this.state===ke.leaving}updateFilterBindings(e){this.channel.filterBindings=e}updatePayloadTransform(e){this.channel.onMessage=e}getChannel(){return this.channel}}function ma(s){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},s.config)}}const fa=/[,()"\\]/,_a=s=>fa.test(s)||s!==s.trim(),ya=s=>`"${s.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`,Ms=s=>{const e=s===null?"null":String(s);return _a(e)?ya(e):e},va=s=>s===null?"null":String(s),ba=(s,e)=>{if(s==="in"){const t=Array.isArray(e)?e:[e];if(t.length===0)throw new Error("Realtime `in` filter requires at least one value.");return`in.(${Array.from(new Set(t)).map(r=>Ms(r)).join(",")})`}return s==="is"?`is.${va(e)}`:`${s}.${Ms(e)}`};class Sa{constructor(){this.filters=[]}add(e,t,i,r=!1){const a=r?"not.":"";return this.filters.push(`${e}=${a}${ba(t,i)}`),this}eq(e,t){return this.add(e,"eq",t)}neq(e,t){return this.add(e,"neq",t)}gt(e,t){return this.add(e,"gt",t)}gte(e,t){return this.add(e,"gte",t)}lt(e,t){return this.add(e,"lt",t)}lte(e,t){return this.add(e,"lte",t)}in(e,t){return this.add(e,"in",t)}like(e,t){return this.add(e,"like",t)}ilike(e,t){return this.add(e,"ilike",t)}match(e,t){return this.add(e,"match",t)}imatch(e,t){return this.add(e,"imatch",t)}is(e,t){return this.add(e,"is",t)}isDistinct(e,t){return this.add(e,"isdistinct",t)}not(e,t,i){return this.add(e,t,i,!0)}build(){return this.filters.join(",")}toString(){return this.build()}}var Bs;(function(s){s.ALL="*",s.INSERT="INSERT",s.UPDATE="UPDATE",s.DELETE="DELETE"})(Bs||(Bs={}));var xe;(function(s){s.BROADCAST="broadcast",s.PRESENCE="presence",s.POSTGRES_CHANGES="postgres_changes",s.SYSTEM="system"})(xe||(xe={}));var we;(function(s){s.SUBSCRIBED="SUBSCRIBED",s.TIMED_OUT="TIMED_OUT",s.CLOSED="CLOSED",s.CHANNEL_ERROR="CHANNEL_ERROR"})(we||(we={}));class Ce{get state(){return this.channelAdapter.state}set state(e){this.channelAdapter.state=e}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(e,t={config:{}},i){var r,a;if(this.topic=e,this.params=t,this.socket=i,this.bindings={},this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config),this.channelAdapter=new ga(this.socket.socketAdapter,e,this.params),this.presence=new ha(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=xi(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&(!((a=(r=this.params.config)===null||r===void 0?void 0:r.broadcast)===null||a===void 0)&&a.replay))throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)}subscribe(e,t=this.timeout){var i,r,a,n;if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){const{config:{broadcast:o,presence:l,private:c,postgres_changes_options:d}}=this.params,u=(r=(i=this.bindings.postgres_changes)===null||i===void 0?void 0:i.map(_=>_.filter))!==null&&r!==void 0?r:[],f=!!this.bindings[xe.PRESENCE]&&this.bindings[xe.PRESENCE].length>0||((a=this.params.config.presence)===null||a===void 0?void 0:a.enabled)===!0,p={},v=Object.assign({broadcast:o,presence:Object.assign(Object.assign({},l),{enabled:f}),postgres_changes:u,private:c},d?{postgres_changes_options:d}:{});this.socket.accessTokenValue&&(p.access_token=this.socket.accessTokenValue),this._onError(_=>{e==null||e(we.CHANNEL_ERROR,pa(_))}),this._onClose(()=>e==null?void 0:e(we.CLOSED)),this.updateJoinPayload(Object.assign({config:v},p)),this._updateFilterMessage();const b=d!=null&&d.wait&&u.length>0?Math.max(t,((n=d.timeout)!==null&&n!==void 0?n:Wr)+zr):t;this.channelAdapter.subscribe(b).receive("ok",async({postgres_changes:_})=>{if(this.socket._isManualToken()||this.socket.setAuth(),_===void 0){e==null||e(we.SUBSCRIBED);return}this._updatePostgresBindings(_,e)}).receive("error",_=>{this.state=ke.errored;const C=Object.values(_).join(", ")||"error";e==null||e(we.CHANNEL_ERROR,new Error(C,{cause:_}))}).receive("timeout",()=>{e==null||e(we.TIMED_OUT)})}return this}_updatePostgresBindings(e,t){var i;const r=this.bindings.postgres_changes,a=(i=r==null?void 0:r.length)!==null&&i!==void 0?i:0,n=[];for(let o=0;o<a;o++){const l=r[o],{filter:{event:c,schema:d,table:u,filter:f}}=l,p=e&&e[o];if(p&&p.event===c&&Ce.isFilterValueEqual(p.schema,d)&&Ce.isFilterValueEqual(p.table,u)&&Ce.isFilterValueEqual(p.filter,f))n.push(Object.assign(Object.assign({},l),{id:p.id}));else{this.unsubscribe(),this.state=ke.errored,t==null||t(we.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=n,this.state!=ke.errored&&t&&t(we.SUBSCRIBED)}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,i){const r=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),a=e===xe.PRESENCE||e===xe.POSTGRES_CHANGES;if(r&&a)throw this.socket.log("channel",`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`),new Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(e,t,i)}async httpSend(e,t,i={}){var r;if(t==null)return Promise.reject(new Error("Payload is required for httpSend()"));const a=t instanceof ArrayBuffer||ArrayBuffer.isView(t),n={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":a?"application/octet-stream":"application/json"};this.socket.accessTokenValue&&(n.Authorization=`Bearer ${this.socket.accessTokenValue}`);const o=new URL(this.broadcastEndpointURL);o.pathname+=`/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e)}`,this.private&&o.searchParams.set("private","true");const l={method:"POST",headers:n,body:a?t:JSON.stringify(t)},c=await this._fetchWithTimeout(o.toString(),l,(r=i.timeout)!==null&&r!==void 0?r:this.timeout);if(c.status===202)return{success:!0};if(c.status===404)return Promise.reject(new Error("httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md"));let d=c.statusText;try{const u=await c.json();d=u.error||u.message||d}catch{}return Promise.reject(new Error(d))}async send(e,t={}){var i,r;if(!this.channelAdapter.canPush()&&e.type==="broadcast"){const a="Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.";this.socket.hasLogger()?this.socket.log("channel",a):console.warn(a);const{event:n,payload:o}=e,l={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(l.Authorization=`Bearer ${this.socket.accessTokenValue}`);const c={method:"POST",headers:l,body:JSON.stringify({messages:[{topic:this.subTopic,event:n,payload:o,private:this.private}]})};try{const d=await this._fetchWithTimeout(this.broadcastEndpointURL,c,(i=t.timeout)!==null&&i!==void 0?i:this.timeout);return await((r=d.body)===null||r===void 0?void 0:r.cancel()),d.ok?"ok":"error"}catch(d){return d instanceof Error&&d.name==="AbortError"?"timed out":"error"}}else return new Promise(a=>{var n,o,l;const c=this.channelAdapter.push(e.type,e,t.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(o=(n=this.params)===null||n===void 0?void 0:n.config)===null||o===void 0?void 0:o.broadcast)===null||l===void 0)&&l.ack)&&a("ok"),c.receive("ok",()=>a("ok")),c.receive("error",()=>a("error")),c.receive("timeout",()=>a("timed out"))})}updateJoinPayload(e){this.channelAdapter.updateJoinPayload(e)}async unsubscribe(e=this.timeout){return new Promise(t=>{this.channelAdapter.unsubscribe(e).receive("ok",()=>t("ok")).receive("timeout",()=>t("timed out")).receive("error",()=>t("error"))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(e,t,i){const r=new AbortController,a=setTimeout(()=>r.abort(),i),n=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:r.signal}));return clearTimeout(a),n}_on(e,t,i){var r;const a=e.toLocaleLowerCase(),n=t==null?void 0:t.filter;if((n instanceof Sa||typeof n=="object"&&n!==null&&typeof n.build=="function")&&(t=Object.assign(Object.assign({},t),{filter:n.build()})),a===xe.POSTGRES_CHANGES&&((r=this.bindings[a])===null||r===void 0?void 0:r.find(d=>Ce.isSamePostgresFilter(d.filter,t))))return this.socket.log("error",`duplicate \`postgres_changes\` binding for ${this.topic} ignored`,t),this;const o=this.channelAdapter.on(e,i),l={type:a,filter:t,callback:i,ref:o};return this.bindings[a]?this.bindings[a].push(l):this.bindings[a]=[l],this._updateFilterMessage(),this}_onClose(e){this.channelAdapter.onClose(e)}_onError(e){this.channelAdapter.onError(e)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((e,t,i)=>{var r,a,n,o,l,c,d;const u=e.event.toLocaleLowerCase();if(this._notThisChannelEvent(u,i))return!1;const f=(r=this.bindings[u])===null||r===void 0?void 0:r.find(p=>p.ref===e.ref);if(!f)return!0;if(["broadcast","presence","postgres_changes"].includes(u))if("id"in f){const p=f.id,v=(a=f.filter)===null||a===void 0?void 0:a.event;return p&&((n=t.ids)===null||n===void 0?void 0:n.includes(p))&&(v==="*"||(v==null?void 0:v.toLocaleLowerCase())===((o=t.data)===null||o===void 0?void 0:o.type.toLocaleLowerCase()))}else{const p=(c=(l=f==null?void 0:f.filter)===null||l===void 0?void 0:l.event)===null||c===void 0?void 0:c.toLocaleLowerCase();return p==="*"||p===((d=t==null?void 0:t.event)===null||d===void 0?void 0:d.toLocaleLowerCase())}else return f.type.toLocaleLowerCase()===u})}_notThisChannelEvent(e,t){const{close:i,error:r,leave:a,join:n}=Oi;return t&&[i,r,a,n].includes(e)&&t!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((e,t,i)=>{if(typeof t=="object"&&"ids"in t){const r=t.data,{schema:a,table:n,commit_timestamp:o,type:l,errors:c}=r;return Object.assign(Object.assign({},{schema:a,table:n,commit_timestamp:o,eventType:l,new:{},old:{},errors:c}),this._getPayloadRecords(r))}return t})}copyBindings(e){if(this.joinedOnce)throw new Error("cannot copy bindings into joined channel");for(const t in e.bindings)for(const i of e.bindings[t])this._on(i.type,i.filter,i.callback)}static isFilterValueEqual(e,t){return(e??void 0)===(t??void 0)}static isSamePostgresFilter(e,t){var i,r,a,n;const o=(r=(i=e==null?void 0:e.select)===null||i===void 0?void 0:i.join())!==null&&r!==void 0?r:void 0,l=(n=(a=t==null?void 0:t.select)===null||a===void 0?void 0:a.join())!==null&&n!==void 0?n:void 0;return(e==null?void 0:e.event)===(t==null?void 0:t.event)&&Ce.isFilterValueEqual(e==null?void 0:e.schema,t==null?void 0:t.schema)&&Ce.isFilterValueEqual(e==null?void 0:e.table,t==null?void 0:t.table)&&Ce.isFilterValueEqual(e==null?void 0:e.filter,t==null?void 0:t.filter)&&o===l}_getPayloadRecords(e){const t={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(t.new=xs(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(t.old=xs(e.columns,e.old_record)),t}}class wa{constructor(e,t){this.socket=new ca(e,t)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(e){this.socket.heartbeatCallback=e}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(e,t,i,r=1e4){return new Promise(a=>{setTimeout(()=>a("timeout"),r),this.socket.disconnect(()=>{e(),a("ok")},t,i)})}push(e){this.socket.push(e)}log(e,t,i){this.socket.log(e,t,i)}hasLogger(){return this.socket.hasLogger()}makeRef(){return this.socket.makeRef()}onOpen(e){this.socket.onOpen(e)}onClose(e){this.socket.onClose(e)}onError(e){this.socket.onError(e)}onMessage(e){this.socket.onMessage(e)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==as.connecting}isDisconnecting(){return this.socket.connectionState()==as.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}}const Fs={HEARTBEAT_INTERVAL:25e3},Ca=[1e3,2e3,5e3,1e4],Aa=1e4;function Ea(){const s=new Map;return{get length(){return s.size},clear(){s.clear()},getItem(e){return s.has(e)?s.get(e):null},key(e){var t;return(t=Array.from(s.keys())[e])!==null&&t!==void 0?t:null},removeItem(e){s.delete(e)},setItem(e,t){s.set(e,String(t))}}}function Ta(){try{if(typeof globalThis<"u"&&globalThis.sessionStorage)return globalThis.sessionStorage}catch{}return Ea()}const ka=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class Ra{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(e,t){var i;if(this.channels=new Array,this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint="",this.headers={},this.params={},this.ref=0,this.serializer=new Vr,this._manuallySetToken=!1,this._authPromise=null,this._authGeneration=0,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._pendingDisconnectTimer=null,this._disconnectOnEmptyChannelsAfterMs=0,this._resolveFetch=a=>a?(...n)=>a(...n):(...n)=>fetch(...n),!(!((i=t==null?void 0:t.params)===null||i===void 0)&&i.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=t.params.apikey;const r=this._initializeOptions(t);this.socketAdapter=new wa(e,r),this.httpEndpoint=xi(e),this.fetch=this._resolveFetch(t==null?void 0:t.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(e){const t=e.message;throw new Error(`WebSocket not available: ${t}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(e,t){return this._cancelPendingDisconnect(),this.isDisconnecting()?"ok":await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},e,t)}getChannels(){return this.channels}async removeChannel(e){const t=await e.unsubscribe();return t==="ok"&&e.teardown(),t}async removeAllChannels(){const e=this.channels.map(async i=>{const r=await i.unsubscribe();return i.teardown(),r}),t=await Promise.all(e);return await this.disconnect(),t}log(e,t,i){this.socketAdapter.log(e,t,i)}hasLogger(){return this.socketAdapter.hasLogger()}connectionState(){return this.socketAdapter.connectionState()||as.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(e,t={config:{}}){const i=`realtime:${e}`,r=this.getChannels().find(a=>a.topic===i);if(r)return r;{const a=new Ce(`realtime:${e}`,t,this);return this._cancelPendingDisconnect(),this.channels.push(a),a}}push(e){this.socketAdapter.push(e)}async setAuth(e=null){const t=++this._authGeneration,i=this._performAuth(e,t);t===this._authGeneration&&(this._authPromise=i);try{await i}finally{this._authPromise===i&&(this._authPromise=null)}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(e){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(e)}_makeRef(){return this.socketAdapter.makeRef()}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic),this.channels.length===0&&(this.log("transport","no channels remaining, scheduling disconnect"),this._schedulePendingDisconnect())}_schedulePendingDisconnect(){if(this._cancelPendingDisconnect(),this._disconnectOnEmptyChannelsAfterMs===0){this.log("transport","disconnecting immediately - no channels"),this.disconnect();return}this._pendingDisconnectTimer=setTimeout(()=>{this._pendingDisconnectTimer=null,this.channels.length===0&&(this.log("transport","deferred disconnect fired - no channels, disconnecting"),this.disconnect())},this._disconnectOnEmptyChannelsAfterMs),this.log("transport",`deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`)}_cancelPendingDisconnect(){this._pendingDisconnectTimer!==null&&(this.log("transport","pending disconnect cancelled - channel activity detected"),clearTimeout(this._pendingDisconnectTimer),this._pendingDisconnectTimer=null)}async _performAuth(e,t){let i,r=!1;if(e)i=e,r=!0;else if(this.accessToken)try{i=await this.accessToken()}catch(a){this.log("error","Error fetching access token from callback",a),i=this.accessTokenValue}else i=this.accessTokenValue;t===this._authGeneration&&(this.accessToken?this._manuallySetToken=!1:r&&(this._manuallySetToken=!0),this.accessTokenValue!=i&&(this.accessTokenValue=i,this.channels.forEach(a=>{const n={access_token:i,version:jr};a.updateJoinPayload(n),a.joinedOnce&&a.channelAdapter.isJoined()&&a.channelAdapter.push(Oi.access_token,{access_token:i})})))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this._isManualToken()||this.setAuth().catch(t=>{this.log("error",`Error setting auth in ${e}`,t)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(t=>{this.log("error","error waiting for auth on connect",t)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(e=>{e.ref&&e.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(e){return(t,i)=>{t!=="disconnected"&&(t=="sent"&&this._setAuthSafely(),e&&e(t,i))}}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=t=>{this.log("worker","worker error",t.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=t=>{t.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_workerObjectUrl(e){let t;if(e)t=e;else{const i=new Blob([ka],{type:"application/javascript"});t=URL.createObjectURL(i)}return t}_initializeOptions(e){var t,i,r,a,n,o,l,c,d,u,f,p;this.worker=(t=e==null?void 0:e.worker)!==null&&t!==void 0?t:!1,this.accessToken=(i=e==null?void 0:e.accessToken)!==null&&i!==void 0?i:null;const v={};v.timeout=(r=e==null?void 0:e.timeout)!==null&&r!==void 0?r:qr,v.heartbeatIntervalMs=(a=e==null?void 0:e.heartbeatIntervalMs)!==null&&a!==void 0?a:Fs.HEARTBEAT_INTERVAL,this._disconnectOnEmptyChannelsAfterMs=(n=e==null?void 0:e.disconnectOnEmptyChannelsAfterMs)!==null&&n!==void 0?n:2*((o=e==null?void 0:e.heartbeatIntervalMs)!==null&&o!==void 0?o:Fs.HEARTBEAT_INTERVAL),v.transport=(l=e==null?void 0:e.transport)!==null&&l!==void 0?l:Fr.getWebSocketConstructor(),v.params=e==null?void 0:e.params,v.logger=e==null?void 0:e.logger,v.heartbeatCallback=this._wrapHeartbeatCallback(e==null?void 0:e.heartbeatCallback),v.sessionStorage=(c=e==null?void 0:e.sessionStorage)!==null&&c!==void 0?c:Ta(),v.reconnectAfterMs=(d=e==null?void 0:e.reconnectAfterMs)!==null&&d!==void 0?d:m=>Ca[m-1]||Aa;let b,_;const C=(u=e==null?void 0:e.vsn)!==null&&u!==void 0?u:Hr;switch(C){case $r:b=(m,g)=>g(JSON.stringify(m)),_=(m,g)=>g(JSON.parse(m));break;case Li:b=this.serializer.encode.bind(this.serializer),_=this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${v.vsn}`)}if(v.vsn=C,v.encode=(f=e==null?void 0:e.encode)!==null&&f!==void 0?f:b,v.decode=(p=e==null?void 0:e.decode)!==null&&p!==void 0?p:_,v.beforeReconnect=this._reconnectAuth.bind(this),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,v.params=Object.assign(Object.assign({},v.params),{log_level:this.logLevel})),this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl,v.autoSendHeartbeat=!this.worker}return v}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}}var lt=class extends Error{constructor(s,e){var t;super(s),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&((t=e.icebergType)==null?void 0:t.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function Pa(s,e,t){const i=new URL(e,s);if(t)for(const[r,a]of Object.entries(t))a!==void 0&&i.searchParams.set(r,a);return i.toString()}async function La(s){return!s||s.type==="none"?{}:s.type==="bearer"?{Authorization:`Bearer ${s.token}`}:s.type==="header"?{[s.name]:s.value}:s.type==="custom"?await s.getHeaders():{}}function Oa(s){const e=s.fetchImpl??globalThis.fetch;return{async request({method:t,path:i,query:r,body:a,headers:n}){const o=Pa(s.baseUrl,i,r),l=await La(s.auth),c=await e(o,{method:t,headers:{...a?{"Content-Type":"application/json"}:{},...l,...n},body:a?JSON.stringify(a):void 0}),d=await c.text(),u=(c.headers.get("content-type")||"").includes("application/json"),f=u&&d?JSON.parse(d):d;if(!c.ok){const p=u?f:void 0,v=p==null?void 0:p.error;throw new lt((v==null?void 0:v.message)??`Request failed with status ${c.status}`,{status:c.status,icebergType:v==null?void 0:v.type,icebergCode:v==null?void 0:v.code,details:p})}return{status:c.status,headers:c.headers,data:f}}}}function bt(s){return s.join("")}var Ia=class{constructor(s,e=""){this.client=s,this.prefix=e}async listNamespaces(s){const e=s?{parent:bt(s.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(i=>({namespace:i}))}async createNamespace(s,e){const t={namespace:s.namespace,properties:e==null?void 0:e.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:t})).data}async dropNamespace(s){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${bt(s.namespace)}`})}async loadNamespaceMetadata(s){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${bt(s.namespace)}`})).data.properties}}async namespaceExists(s){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${bt(s.namespace)}`}),!0}catch(e){if(e instanceof lt&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(s,e){try{return await this.createNamespace(s,e)}catch(t){if(t instanceof lt&&t.status===409)return;throw t}}};function Ue(s){return s.join("")}var xa=class{constructor(s,e="",t){this.client=s,this.prefix=e,this.accessDelegation=t}async listTables(s){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Ue(s.namespace)}/tables`})).data.identifiers}async createTable(s,e){const t={};return this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Ue(s.namespace)}/tables`,body:e,headers:t})).data.metadata}async updateTable(s,e){const t=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Ue(s.namespace)}/tables/${s.name}`,body:e});return{"metadata-location":t.data["metadata-location"],metadata:t.data.metadata}}async dropTable(s,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Ue(s.namespace)}/tables/${s.name}`,query:{purgeRequested:String((e==null?void 0:e.purge)??!1)}})}async loadTable(s){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Ue(s.namespace)}/tables/${s.name}`,headers:e})).data.metadata}async tableExists(s){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Ue(s.namespace)}/tables/${s.name}`,headers:e}),!0}catch(t){if(t instanceof lt&&t.status===404)return!1;throw t}}async createTableIfNotExists(s,e){try{return await this.createTable(s,e)}catch(t){if(t instanceof lt&&t.status===409)return await this.loadTable({namespace:s.namespace,name:e.name});throw t}}},Da=class{constructor(s){var i;let e="v1";s.catalogName&&(e+=`/${s.catalogName}`);const t=s.baseUrl.endsWith("/")?s.baseUrl:`${s.baseUrl}/`;this.client=Oa({baseUrl:t,auth:s.auth,fetchImpl:s.fetch}),this.accessDelegation=(i=s.accessDelegation)==null?void 0:i.join(","),this.namespaceOps=new Ia(this.client,e),this.tableOps=new xa(this.client,e,this.accessDelegation)}async listNamespaces(s){return this.namespaceOps.listNamespaces(s)}async createNamespace(s,e){return this.namespaceOps.createNamespace(s,e)}async dropNamespace(s){await this.namespaceOps.dropNamespace(s)}async loadNamespaceMetadata(s){return this.namespaceOps.loadNamespaceMetadata(s)}async listTables(s){return this.tableOps.listTables(s)}async createTable(s,e){return this.tableOps.createTable(s,e)}async updateTable(s,e){return this.tableOps.updateTable(s,e)}async dropTable(s,e){await this.tableOps.dropTable(s,e)}async loadTable(s){return this.tableOps.loadTable(s)}async namespaceExists(s){return this.namespaceOps.namespaceExists(s)}async tableExists(s){return this.tableOps.tableExists(s)}async createNamespaceIfNotExists(s,e){return this.namespaceOps.createNamespaceIfNotExists(s,e)}async createTableIfNotExists(s,e){return this.tableOps.createTableIfNotExists(s,e)}};function ct(s){"@babel/helpers - typeof";return ct=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ct(s)}function Na(s,e){if(ct(s)!="object"||!s)return s;var t=s[Symbol.toPrimitive];if(t!==void 0){var i=t.call(s,e);if(ct(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(s)}function Ma(s){var e=Na(s,"string");return ct(e)=="symbol"?e:e+""}function Ba(s,e,t){return(e=Ma(e))in s?Object.defineProperty(s,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):s[e]=t,s}function Us(s,e){var t=Object.keys(s);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(s);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(s,r).enumerable})),t.push.apply(t,i)}return t}function L(s){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Us(Object(t),!0).forEach(function(i){Ba(s,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(t)):Us(Object(t)).forEach(function(i){Object.defineProperty(s,i,Object.getOwnPropertyDescriptor(t,i))})}return s}var Gt=class extends Error{constructor(s,e="storage",t,i){super(s),this.__isStorageError=!0,this.namespace=e,this.name=e==="vectors"?"StorageVectorsError":"StorageError",this.status=t,this.statusCode=i}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}};function Vt(s){return typeof s=="object"&&s!==null&&"__isStorageError"in s}var cs=class extends Gt{constructor(s,e,t,i="storage",r){super(s,i,e,t),this.name=i==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=e,this.statusCode=t,this.code=r}toJSON(){return L(L({},super.toJSON()),{},{code:this.code})}},Ni=class extends Gt{constructor(s,e,t="storage"){super(s,t),this.name=t==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=e}};function Mt(s,e,t){const i=L({},s),r=e.toLowerCase();for(const a of Object.keys(i))a.toLowerCase()===r&&delete i[a];return i[r]=t,i}function Fa(s){const e={};for(const[t,i]of Object.entries(s))e[t.toLowerCase()]=i;return e}const Ua=s=>s?(...e)=>s(...e):(...e)=>fetch(...e),ja=s=>{if(typeof s!="object"||s===null)return!1;const e=Object.getPrototypeOf(s);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in s)&&!(Symbol.iterator in s)},ds=s=>{if(Array.isArray(s))return s.map(t=>ds(t));if(typeof s=="function"||s!==Object(s))return s;const e={};return Object.entries(s).forEach(([t,i])=>{const r=t.replace(/([-_][a-z])/gi,a=>a.toUpperCase().replace(/[-_]/g,""));e[r]=ds(i)}),e},$a=s=>!s||typeof s!="string"||s.length===0||s.length>100||s.trim()!==s||s.includes("/")||s.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(s),us=s=>s.split("/").map(encodeURIComponent).join("/"),js=s=>{if(typeof s=="object"&&s!==null){const e=s;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error;if(typeof e.error=="object"&&e.error!==null){const t=e.error;if(typeof t.message=="string")return t.message}}return JSON.stringify(s)},Ha=async(s,e,t,i)=>{if(s!==null&&typeof s=="object"&&"json"in s&&typeof s.json=="function"){const r=s;let a=parseInt(String(r.status),10);Number.isFinite(a)||(a=500),r.json().then(n=>{const o=(n==null?void 0:n.statusCode)||(n==null?void 0:n.code)||a+"";e(new cs(js(n),a,o,i,n==null?void 0:n.code))}).catch(()=>{const n=a+"";e(new cs(r.statusText||`HTTP ${a} error`,a,n,i))})}else e(new Ni(js(s),s,i))},qa=(s,e,t,i)=>{const r={method:s,headers:(e==null?void 0:e.headers)||{}};if(s==="GET"||s==="HEAD"||!i)return L(L({},r),t);if(ja(i)){var a;const n=(e==null?void 0:e.headers)||{};let o;for(const[l,c]of Object.entries(n))l.toLowerCase()==="content-type"&&(o=c);r.headers=Mt(n,"Content-Type",(a=o)!==null&&a!==void 0?a:"application/json"),r.body=JSON.stringify(i)}else r.body=i;return e!=null&&e.duplex&&(r.duplex=e.duplex),L(L({},r),t)};async function tt(s,e,t,i,r,a,n){return new Promise((o,l)=>{s(t,qa(e,i,r,a)).then(c=>{if(!c.ok)throw c;if(i!=null&&i.noResolveJson)return c;if(n==="vectors"){const d=c.headers.get("content-type");if(c.headers.get("content-length")==="0"||c.status===204)return{};if(!d||!d.includes("application/json"))return{}}return c.json()}).then(c=>o(c)).catch(c=>Ha(c,l,i,n))})}function Mi(s="storage"){return{get:async(e,t,i,r)=>tt(e,"GET",t,i,r,void 0,s),post:async(e,t,i,r,a)=>tt(e,"POST",t,r,a,i,s),put:async(e,t,i,r,a)=>tt(e,"PUT",t,r,a,i,s),head:async(e,t,i,r)=>tt(e,"HEAD",t,L(L({},i),{},{noResolveJson:!0}),r,void 0,s),remove:async(e,t,i,r,a)=>tt(e,"DELETE",t,r,a,i,s)}}const Wa=Mi("storage"),{get:Ve,post:he,put:Bt,head:za,remove:Ke}=Wa,re=Mi("vectors");var Ye=class{constructor(s,e={},t,i="storage"){this.shouldThrowOnError=!1,this.url=s,this.headers=Fa(e),this.fetch=Ua(t),this.namespace=i}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(s,e){return this.headers=Mt(this.headers,s,e),this}async handleOperation(s){var e=this;try{return{data:await s(),error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(Vt(t))return{data:null,error:t};throw t}}};let Bi;Bi=Symbol.toStringTag;var Ga=class{constructor(s,e){this.downloadFn=s,this.shouldThrowOnError=e,this[Bi]="StreamDownloadBuilder",this.promise=null}then(s,e){return this.getPromise().then(s,e)}catch(s){return this.getPromise().catch(s)}finally(s){return this.getPromise().finally(s)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var s=this;try{return{data:(await s.downloadFn()).body,error:null}}catch(e){if(s.shouldThrowOnError)throw e;if(Vt(e))return{data:null,error:e};throw e}}};let Fi;Fi=Symbol.toStringTag;var Va=class{constructor(s,e){this.downloadFn=s,this.shouldThrowOnError=e,this[Fi]="BlobDownloadBuilder",this.promise=null}asStream(){return new Ga(this.downloadFn,this.shouldThrowOnError)}then(s,e){return this.getPromise().then(s,e)}catch(s){return this.getPromise().catch(s)}finally(s){return this.getPromise().finally(s)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var s=this;try{return{data:await(await s.downloadFn()).blob(),error:null}}catch(e){if(s.shouldThrowOnError)throw e;if(Vt(e))return{data:null,error:e};throw e}}};const Jt={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},$s={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var Ka=class extends Ye{constructor(s,e={},t,i){super(s,e,i,"storage"),this.bucketId=t}async uploadOrUpdate(s,e,t,i){var r=this;return r.handleOperation(async()=>{let a;const n=L(L({},$s),i);let o=L(L({},r.headers),s==="POST"&&{"x-upsert":String(n.upsert)});const l=n.metadata;if(typeof Blob<"u"&&t instanceof Blob?(a=new FormData,a.append("cacheControl",n.cacheControl),l&&a.append("metadata",r.encodeMetadata(l)),a.append("",t)):typeof FormData<"u"&&t instanceof FormData?(a=t,a.has("cacheControl")||a.append("cacheControl",n.cacheControl),l&&!a.has("metadata")&&a.append("metadata",r.encodeMetadata(l))):(a=t,o["cache-control"]=`max-age=${n.cacheControl}`,o["content-type"]=n.contentType,l&&(o["x-metadata"]=r.toBase64(r.encodeMetadata(l))),(typeof ReadableStream<"u"&&a instanceof ReadableStream||a&&typeof a=="object"&&"pipe"in a&&typeof a.pipe=="function")&&!n.duplex&&(n.duplex="half")),i!=null&&i.headers)for(const[f,p]of Object.entries(i.headers))o=Mt(o,f,p);const c=r._removeEmptyFolders(e),d=r._getFinalPath(c),u=await(s=="PUT"?Bt:he)(r.fetch,`${r.url}/object/${d}`,a,L({headers:o},n!=null&&n.duplex?{duplex:n.duplex}:{}));return{path:c,id:u.Id,fullPath:u.Key}})}async upload(s,e,t){return this.uploadOrUpdate("POST",s,e,t)}async uploadToSignedUrl(s,e,t,i){var r=this;const a=r._removeEmptyFolders(s),n=r._getFinalPath(a),o=new URL(r.url+`/object/upload/sign/${n}`);return o.searchParams.set("token",e),r.handleOperation(async()=>{let l;const c=L(L({},$s),i);let d=L(L({},r.headers),{"x-upsert":String(c.upsert)});const u=c.metadata;if(typeof Blob<"u"&&t instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),u&&l.append("metadata",r.encodeMetadata(u)),l.append("",t)):typeof FormData<"u"&&t instanceof FormData?(l=t,l.has("cacheControl")||l.append("cacheControl",c.cacheControl),u&&!l.has("metadata")&&l.append("metadata",r.encodeMetadata(u))):(l=t,d["cache-control"]=`max-age=${c.cacheControl}`,d["content-type"]=c.contentType,u&&(d["x-metadata"]=r.toBase64(r.encodeMetadata(u))),(typeof ReadableStream<"u"&&l instanceof ReadableStream||l&&typeof l=="object"&&"pipe"in l&&typeof l.pipe=="function")&&!c.duplex&&(c.duplex="half")),i!=null&&i.headers)for(const[f,p]of Object.entries(i.headers))d=Mt(d,f,p);return{path:a,fullPath:(await Bt(r.fetch,o.toString(),l,L({headers:d},c!=null&&c.duplex?{duplex:c.duplex}:{}))).Key}})}async createSignedUploadUrl(s,e){var t=this;return t.handleOperation(async()=>{let i=t._getFinalPath(s);const r=L({},t.headers);e!=null&&e.upsert&&(r["x-upsert"]="true");const a=await he(t.fetch,`${t.url}/object/upload/sign/${i}`,{},{headers:r}),n=new URL(t.url+a.url),o=n.searchParams.get("token");if(!o)throw new Gt("No token returned by API");return{signedUrl:n.toString(),path:s,token:o}})}async update(s,e,t){return this.uploadOrUpdate("PUT",s,e,t)}async move(s,e,t){var i=this;return i.handleOperation(async()=>await he(i.fetch,`${i.url}/object/move`,{bucketId:i.bucketId,sourceKey:s,destinationKey:e,destinationBucket:t==null?void 0:t.destinationBucket,sourceVersionId:t==null?void 0:t.sourceVersionId},{headers:i.headers}))}async copy(s,e,t){var i=this;return i.handleOperation(async()=>({path:(await he(i.fetch,`${i.url}/object/copy`,{bucketId:i.bucketId,sourceKey:s,destinationKey:e,destinationBucket:t==null?void 0:t.destinationBucket,sourceVersionId:t==null?void 0:t.sourceVersionId},{headers:i.headers})).Key}))}async createSignedUrl(s,e,t){var i=this;return i.handleOperation(async()=>{let r=i._getFinalPath(s);const a=typeof(t==null?void 0:t.transform)=="object"&&t.transform!==null&&Object.keys(t.transform).length>0;let n=await he(i.fetch,`${i.url}/object/sign/${r}`,L(L({expiresIn:e},a?{transform:t.transform}:{}),(t==null?void 0:t.versionId)!=null?{versionId:t.versionId}:{}),{headers:i.headers});const o=new URLSearchParams;t!=null&&t.download&&o.set("download",t.download===!0?"":t.download),(t==null?void 0:t.cacheNonce)!=null&&o.set("cacheNonce",String(t.cacheNonce));const l=o.toString();return{signedUrl:encodeURI(`${i.url}${n.signedURL}${l?`&${l}`:""}`)}})}async createSignedUrls(s,e,t){var i=this;return i.handleOperation(async()=>{const r=await he(i.fetch,`${i.url}/object/sign/${i.bucketId}`,{expiresIn:e,paths:s},{headers:i.headers}),a=new URLSearchParams;t!=null&&t.download&&a.set("download",t.download===!0?"":t.download),(t==null?void 0:t.cacheNonce)!=null&&a.set("cacheNonce",String(t.cacheNonce));const n=a.toString();return r.map(o=>L(L({},o),{},{signedUrl:o.signedURL?encodeURI(`${i.url}${o.signedURL}${n?`&${n}`:""}`):null}))})}download(s,e,t){const i=typeof(e==null?void 0:e.transform)=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image/authenticated":"object",r=new URLSearchParams;e!=null&&e.transform&&this.applyTransformOptsToQuery(r,e.transform),(e==null?void 0:e.cacheNonce)!=null&&r.set("cacheNonce",String(e.cacheNonce)),(e==null?void 0:e.versionId)!=null&&r.set("versionId",String(e.versionId));const a=r.toString(),n=this._getFinalPath(s),o=()=>Ve(this.fetch,`${this.url}/${i}/${n}${a?`?${a}`:""}`,{headers:this.headers,noResolveJson:!0},t);return new Va(o,this.shouldThrowOnError)}async info(s,e){var t=this;const i=t._getFinalPath(s),r=new URLSearchParams;(e==null?void 0:e.versionId)!=null&&r.set("versionId",String(e.versionId));const a=r.toString();return t.handleOperation(async()=>ds(await Ve(t.fetch,`${t.url}/object/info/${i}${a?`?${a}`:""}`,{headers:t.headers})))}async exists(s){var e=this;const t=e._getFinalPath(s);try{return await za(e.fetch,`${e.url}/object/${t}`,{headers:e.headers}),{data:!0,error:null}}catch(r){if(e.shouldThrowOnError)throw r;if(Vt(r)){var i;const a=r instanceof cs?r.status:r instanceof Ni?(i=r.originalError)===null||i===void 0?void 0:i.status:void 0;if(a!==void 0&&[400,404].includes(a))return{data:!1,error:r}}throw r}}getPublicUrl(s,e){const t=this._getFinalPath(s),i=new URLSearchParams;e!=null&&e.download&&i.set("download",e.download===!0?"":e.download),e!=null&&e.transform&&this.applyTransformOptsToQuery(i,e.transform),(e==null?void 0:e.cacheNonce)!=null&&i.set("cacheNonce",String(e.cacheNonce)),(e==null?void 0:e.versionId)!=null&&i.set("versionId",String(e.versionId));const r=i.toString(),a=typeof(e==null?void 0:e.transform)=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image":"object";return{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${t}`)+(r?`?${r}`:"")}}}async remove(s){var e=this;return e.handleOperation(async()=>await Ke(e.fetch,`${e.url}/object/${e.bucketId}`,{prefixes:s},{headers:e.headers}))}async purgeCache(s,e,t){var i=this;return i.handleOperation(async()=>{const r=us(i._getFinalPath(s)),a=new URLSearchParams;e!=null&&e.transformations&&a.set("transformations","true");const n=a.toString();return await Ke(i.fetch,`${i.url}/cdn/${r}${n?`?${n}`:""}`,{},{headers:i.headers},t)})}async list(s,e,t){var i=this;return i.handleOperation(async()=>{const r=e!=null&&e.sortBy?L(L({},Jt.sortBy),e.sortBy):Jt.sortBy,a=L(L(L({},Jt),e),{},{sortBy:r,prefix:s||""});return await he(i.fetch,`${i.url}/object/list/${i.bucketId}`,a,{headers:i.headers},t)})}async listV2(s,e){var t=this;return t.handleOperation(async()=>{const i=L({},s);return await he(t.fetch,`${t.url}/object/list-v2/${t.bucketId}`,i,{headers:t.headers},e)})}encodeMetadata(s){return JSON.stringify(s)}toBase64(s){return typeof Buffer<"u"?Buffer.from(s).toString("base64"):btoa(s)}_getFinalPath(s){return`${this.bucketId}/${s.replace(/^\/+/,"")}`}_removeEmptyFolders(s){return s.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}applyTransformOptsToQuery(s,e){return e.width&&s.set("width",e.width.toString()),e.height&&s.set("height",e.height.toString()),e.resize&&s.set("resize",e.resize),e.format&&s.set("format",e.format),e.quality&&s.set("quality",e.quality.toString()),s}};const Qa="2.117.2",gt={"X-Client-Info":`storage-js/${Qa}`};var Ja=class extends Ye{constructor(s,e={},t,i){const r=new URL(s);i!=null&&i.useNewHostname&&/supabase\.(co|in|red)$/.test(r.hostname)&&!r.hostname.includes("storage.supabase.")&&(r.hostname=r.hostname.replace("supabase.","storage.supabase."));const a=r.href.replace(/\/$/,""),n=L(L({},gt),e);super(a,n,t,"storage")}async listBuckets(s){var e=this;return e.handleOperation(async()=>{const t=e.listBucketOptionsToQueryString(s);return await Ve(e.fetch,`${e.url}/bucket${t}`,{headers:e.headers})})}async getBucket(s){var e=this;return e.handleOperation(async()=>await Ve(e.fetch,`${e.url}/bucket/${s}`,{headers:e.headers}))}async createBucket(s,e={public:!1}){var t=this;return t.handleOperation(async()=>await he(t.fetch,`${t.url}/bucket`,{id:s,name:s,type:e.type,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes,versioning_status:e.versioningStatus},{headers:t.headers}))}async updateBucket(s,e){var t=this;return t.handleOperation(async()=>await Bt(t.fetch,`${t.url}/bucket/${s}`,{id:s,name:s,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes,versioning_status:e.versioningStatus},{headers:t.headers}))}async emptyBucket(s){var e=this;return e.handleOperation(async()=>await he(e.fetch,`${e.url}/bucket/${s}/empty`,{},{headers:e.headers}))}async deleteBucket(s){var e=this;return e.handleOperation(async()=>await Ke(e.fetch,`${e.url}/bucket/${s}`,{},{headers:e.headers}))}async getBucketLifecycle(s){var e=this;return e.handleOperation(async()=>await Ve(e.fetch,e.bucketLifecycleUrl(s),{headers:e.headers}))}async updateBucketLifecycle(s,e){var t=this;return t.handleOperation(async()=>await Bt(t.fetch,t.bucketLifecycleUrl(s),e,{headers:t.headers}))}async deleteBucketLifecycle(s){var e=this;return e.handleOperation(async()=>await Ke(e.fetch,e.bucketLifecycleUrl(s),{},{headers:e.headers}))}async purgeBucketCache(s,e,t){var i=this;return i.handleOperation(async()=>{const r=new URLSearchParams;e!=null&&e.transformations&&r.set("transformations","true");const a=r.toString();return await Ke(i.fetch,`${i.url}/cdn/${us(s)}${a?`?${a}`:""}`,{},{headers:i.headers},t)})}bucketLifecycleUrl(s){return`${this.url}/bucket/${us(s)}/lifecycle`}listBucketOptionsToQueryString(s){const e={};return s&&("limit"in s&&(e.limit=String(s.limit)),"offset"in s&&(e.offset=String(s.offset)),s.search&&(e.search=s.search),s.sortColumn&&(e.sortColumn=s.sortColumn),s.sortOrder&&(e.sortOrder=s.sortOrder)),Object.keys(e).length>0?"?"+new URLSearchParams(e).toString():""}},Ya=class extends Ye{constructor(s,e={},t){const i=s.replace(/\/$/,""),r=L(L({},gt),e);super(i,r,t,"storage")}async createBucket(s){var e=this;return e.handleOperation(async()=>await he(e.fetch,`${e.url}/bucket`,{name:s},{headers:e.headers}))}async listBuckets(s){var e=this;return e.handleOperation(async()=>{const t=new URLSearchParams;(s==null?void 0:s.limit)!==void 0&&t.set("limit",s.limit.toString()),(s==null?void 0:s.offset)!==void 0&&t.set("offset",s.offset.toString()),s!=null&&s.sortColumn&&t.set("sortColumn",s.sortColumn),s!=null&&s.sortOrder&&t.set("sortOrder",s.sortOrder),s!=null&&s.search&&t.set("search",s.search);const i=t.toString(),r=i?`${e.url}/bucket?${i}`:`${e.url}/bucket`;return await Ve(e.fetch,r,{headers:e.headers})})}async deleteBucket(s){var e=this;return e.handleOperation(async()=>await Ke(e.fetch,`${e.url}/bucket/${s}`,{},{headers:e.headers}))}from(s){var e=this;if(!$a(s))throw new Gt("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const t=new Da({baseUrl:this.url,catalogName:s,auth:{type:"custom",getHeaders:async()=>e.headers},fetch:this.fetch}),i=this.shouldThrowOnError;return new Proxy(t,{get(r,a){const n=r[a];return typeof n!="function"?n:async(...o)=>{try{return{data:await n.apply(r,o),error:null}}catch(l){if(i)throw l;return{data:null,error:l}}}}})}},Xa=class extends Ye{constructor(s,e={},t){const i=s.replace(/\/$/,""),r=L(L({},gt),{},{"Content-Type":"application/json"},e);super(i,r,t,"vectors")}async createIndex(s){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/CreateIndex`,s,{headers:e.headers})||{})}async getIndex(s,e){var t=this;return t.handleOperation(async()=>await re.post(t.fetch,`${t.url}/GetIndex`,{vectorBucketName:s,indexName:e},{headers:t.headers}))}async listIndexes(s){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/ListIndexes`,s,{headers:e.headers}))}async deleteIndex(s,e){var t=this;return t.handleOperation(async()=>await re.post(t.fetch,`${t.url}/DeleteIndex`,{vectorBucketName:s,indexName:e},{headers:t.headers})||{})}},Za=class extends Ye{constructor(s,e={},t){const i=s.replace(/\/$/,""),r=L(L({},gt),{},{"Content-Type":"application/json"},e);super(i,r,t,"vectors")}async putVectors(s){var e=this;if(s.vectors.length<1||s.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/PutVectors`,s,{headers:e.headers})||{})}async getVectors(s){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/GetVectors`,s,{headers:e.headers}))}async listVectors(s){var e=this;if(s.segmentCount!==void 0){if(s.segmentCount<1||s.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(s.segmentIndex!==void 0&&(s.segmentIndex<0||s.segmentIndex>=s.segmentCount))throw new Error(`segmentIndex must be between 0 and ${s.segmentCount-1}`)}return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/ListVectors`,s,{headers:e.headers}))}async queryVectors(s){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/QueryVectors`,s,{headers:e.headers}))}async deleteVectors(s){var e=this;if(s.keys.length<1||s.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/DeleteVectors`,s,{headers:e.headers})||{})}},en=class extends Ye{constructor(s,e={},t){const i=s.replace(/\/$/,""),r=L(L({},gt),{},{"Content-Type":"application/json"},e);super(i,r,t,"vectors")}async createBucket(s){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/CreateVectorBucket`,{vectorBucketName:s},{headers:e.headers})||{})}async getBucket(s){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/GetVectorBucket`,{vectorBucketName:s},{headers:e.headers}))}async listBuckets(s={}){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/ListVectorBuckets`,s,{headers:e.headers}))}async deleteBucket(s){var e=this;return e.handleOperation(async()=>await re.post(e.fetch,`${e.url}/DeleteVectorBucket`,{vectorBucketName:s},{headers:e.headers})||{})}},tn=class extends en{constructor(s,e={}){super(s,e.headers||{},e.fetch)}from(s){return new sn(this.url,this.headers,s,this.fetch)}async createBucket(s){var e=()=>super.createBucket,t=this;return e().call(t,s)}async getBucket(s){var e=()=>super.getBucket,t=this;return e().call(t,s)}async listBuckets(s={}){var e=()=>super.listBuckets,t=this;return e().call(t,s)}async deleteBucket(s){var e=()=>super.deleteBucket,t=this;return e().call(t,s)}},sn=class extends Xa{constructor(s,e,t,i){super(s,e,i),this.vectorBucketName=t}async createIndex(s){var e=()=>super.createIndex,t=this;return e().call(t,L(L({},s),{},{vectorBucketName:t.vectorBucketName}))}async listIndexes(s={}){var e=()=>super.listIndexes,t=this;return e().call(t,L(L({},s),{},{vectorBucketName:t.vectorBucketName}))}async getIndex(s){var e=()=>super.getIndex,t=this;return e().call(t,t.vectorBucketName,s)}async deleteIndex(s){var e=()=>super.deleteIndex,t=this;return e().call(t,t.vectorBucketName,s)}index(s){return new rn(this.url,this.headers,this.vectorBucketName,s,this.fetch)}},rn=class extends Za{constructor(s,e,t,i,r){super(s,e,r),this.vectorBucketName=t,this.indexName=i}async putVectors(s){var e=()=>super.putVectors,t=this;return e().call(t,L(L({},s),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async getVectors(s){var e=()=>super.getVectors,t=this;return e().call(t,L(L({},s),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async listVectors(s={}){var e=()=>super.listVectors,t=this;return e().call(t,L(L({},s),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async queryVectors(s){var e=()=>super.queryVectors,t=this;return e().call(t,L(L({},s),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async deleteVectors(s){var e=()=>super.deleteVectors,t=this;return e().call(t,L(L({},s),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}},an=class extends Ja{constructor(s,e={},t,i){super(s,e,t,i)}from(s){return new Ka(this.url,this.headers,s,this.fetch)}get vectors(){return new tn(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new Ya(this.url+"/iceberg",this.headers,this.fetch)}};const Ui="2.117.2",Ae=30*1e3,rt=3,Yt=rt*Ae,nn=2*Ae,on="http://localhost:9999",ln="supabase.auth.token",cn={"X-Client-Info":`gotrue-js/${Ui}`},hs="X-Supabase-Api-Version",ji={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},dn=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,Ne="sb_flow_id",un=5,hn=10*60*1e3;class dt extends Error{constructor(e,t,i){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=i}toJSON(){return{name:this.name,message:this.message,status:this.status,code:this.code}}}function E(s){return typeof s=="object"&&s!==null&&"__isAuthError"in s}class pn extends dt{constructor(e,t,i){super(e,t,i),this.name="AuthApiError",this.status=t,this.code=i}}function Hs(s){return E(s)&&s.name==="AuthApiError"}class pe extends dt{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}}class ye extends dt{constructor(e,t,i,r){super(e,i,r),this.name=t,this.status=i}}class Y extends ye{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function St(s){return E(s)&&s.name==="AuthSessionMissingError"}class je extends ye{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class wt extends ye{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class Ct extends ye{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}function gn(s){return E(s)&&s.name==="AuthImplicitGrantRedirectError"}class qs extends ye{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}class mn extends ye{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class Pt extends ye{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}}function At(s){return E(s)&&s.name==="AuthRetryableFetchError"}class Ws extends ye{constructor(e="Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)"){super(e,"AuthRefreshDiscardedError",409,void 0)}}function zs(s){return E(s)&&s.name==="AuthRefreshDiscardedError"}class Gs extends ye{constructor(e,t,i){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=i}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{reasons:this.reasons})}}class Ft extends ye{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const Ut="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),Vs=` 	
\r=`.split(""),fn=(()=>{const s=new Array(128);for(let e=0;e<s.length;e+=1)s[e]=-1;for(let e=0;e<Vs.length;e+=1)s[Vs[e].charCodeAt(0)]=-2;for(let e=0;e<Ut.length;e+=1)s[Ut[e].charCodeAt(0)]=e;return s})();function Ks(s,e,t){if(s!==null)for(e.queue=e.queue<<8|s,e.queuedBits+=8;e.queuedBits>=6;){const i=e.queue>>e.queuedBits-6&63;t(Ut[i]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const i=e.queue>>e.queuedBits-6&63;t(Ut[i]),e.queuedBits-=6}}function $i(s,e,t){const i=fn[s];if(i>-1)for(e.queue=e.queue<<6|i,e.queuedBits+=6;e.queuedBits>=8;)t(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(i===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(s)}"`)}}function Qs(s){const e=[],t=n=>{e.push(String.fromCodePoint(n))},i={utf8seq:0,codepoint:0},r={queue:0,queuedBits:0},a=n=>{vn(n,i,t)};for(let n=0;n<s.length;n+=1)$i(s.charCodeAt(n),r,a);return e.join("")}function _n(s,e){if(s<=127){e(s);return}else if(s<=2047){e(192|s>>6),e(128|s&63);return}else if(s<=65535){e(224|s>>12),e(128|s>>6&63),e(128|s&63);return}else if(s<=1114111){e(240|s>>18),e(128|s>>12&63),e(128|s>>6&63),e(128|s&63);return}throw new Error(`Unrecognized Unicode codepoint: ${s.toString(16)}`)}function yn(s,e){for(let t=0;t<s.length;t+=1){let i=s.charCodeAt(t);if(i>55295&&i<=56319){const r=(i-55296)*1024&65535;i=(s.charCodeAt(t+1)-56320&65535|r)+65536,t+=1}_n(i,e)}}function vn(s,e,t){if(e.utf8seq===0){if(s<=127){t(s);return}for(let i=1;i<6;i+=1)if(!(s>>7-i&1)){e.utf8seq=i;break}if(e.utf8seq===2)e.codepoint=s&31;else if(e.utf8seq===3)e.codepoint=s&15;else if(e.utf8seq===4)e.codepoint=s&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(s<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|s&63,e.utf8seq-=1,e.utf8seq===0&&t(e.codepoint)}}function Qe(s){const e=[],t={queue:0,queuedBits:0},i=r=>{e.push(r)};for(let r=0;r<s.length;r+=1)$i(s.charCodeAt(r),t,i);return new Uint8Array(e)}function bn(s){const e=[];return yn(s,t=>e.push(t)),new Uint8Array(e)}function Me(s){const e=[],t={queue:0,queuedBits:0},i=r=>{e.push(r)};return s.forEach(r=>Ks(r,t,i)),Ks(null,t,i),e.join("")}function Hi(s){return Math.round(Date.now()/1e3)+s}function Sn(){return Symbol("auth-callback")}const X=()=>typeof window<"u"&&typeof document<"u",Oe={tested:!1,writable:!1},qi=()=>{if(!X())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(Oe.tested)return Oe.writable;const s=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(s,s),globalThis.localStorage.removeItem(s),Oe.tested=!0,Oe.writable=!0}catch{Oe.tested=!0,Oe.writable=!1}return Oe.writable};function Js(s){const e={},t=new URL(s);if(t.hash&&t.hash[0]==="#")try{new URLSearchParams(t.hash.substring(1)).forEach((r,a)=>{e[a]=r})}catch{}return t.searchParams.forEach((i,r)=>{e[r]=i}),e}const Wi=s=>s?(...e)=>s(...e):(...e)=>fetch(...e),wn=s=>typeof s=="object"&&s!==null&&"status"in s&&"ok"in s&&"json"in s&&typeof s.json=="function",Ee=async(s,e,t)=>{await s.setItem(e,JSON.stringify(t))},Z=async(s,e)=>{const t=await s.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return null}},ie=async(s,e)=>{await s.removeItem(e)};class Kt{constructor(){this.promise=new Kt.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}}Kt.promiseConstructor=Promise;function Et(s){const e=s.split(".");if(e.length!==3)throw new Ft("Invalid JWT structure");for(let i=0;i<e.length;i++)if(!dn.test(e[i]))throw new Ft("JWT not in base64url format");return{header:JSON.parse(Qs(e[0])),payload:JSON.parse(Qs(e[1])),signature:Qe(e[2]),raw:{header:e[0],payload:e[1]}}}async function Cn(s){return await new Promise(e=>{setTimeout(()=>e(null),s)})}function An(s,e){return new Promise((i,r)=>{(async()=>{for(let a=0;a<1/0;a++)try{const n=await s(a);if(!e(a,null,n)){i(n);return}}catch(n){if(!e(a,n)){r(n);return}}})()})}function zi(s){return("0"+s.toString(16)).substr(-2)}function En(){const e=new Uint32Array(56);if(typeof crypto>"u"){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",i=t.length;let r="";for(let a=0;a<56;a++)r+=t.charAt(Math.floor(Math.random()*i));return r}return crypto.getRandomValues(e),Array.from(e,zi).join("")}async function Tn(s){const t=new TextEncoder().encode(s),i=await crypto.subtle.digest("SHA-256",t),r=new Uint8Array(i);return Array.from(r).map(a=>String.fromCharCode(a)).join("")}async function kn(s){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),s;const t=await Tn(s);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}const Rn=/^[a-zA-Z0-9_-]{8,64}$/;function Lt(s){return typeof s=="string"&&Rn.test(s)?s:null}function Pn(){if(typeof crypto<"u"&&typeof crypto.getRandomValues=="function"){const e=new Uint8Array(16);return crypto.getRandomValues(e),Array.from(e,zi).join("")}let s="";for(let e=0;e<32;e++)s+=Math.floor(Math.random()*16).toString(16);return s}const Je=(s,e)=>`${s}-flow-${e}-code-verifier`,ut=s=>`${s}-flows-code-verifier`;async function _s(s,e){const t=await Z(s,ut(e));return Array.isArray(t)?t.filter(i=>Lt(i)!==null):[]}async function Ln(s,e,t,i,r){await Ee(s,Je(e,t),i);const a=(await _s(s,e)).filter(n=>n!==t);for(a.push(t);a.length>un;){const n=a.shift();await ie(s,Je(e,n)),r==null||r(n)}await Ee(s,ut(e),a),await Ee(s,`${e}-code-verifier`,i)}async function On(s,e,t){if(t){const r=await Z(s,Je(e,t));return{verifier:typeof r=="string"?r:null,flowId:t}}const i=await Z(s,`${e}-code-verifier`);return{verifier:typeof i=="string"?i:null,flowId:null}}async function ue(s,e,t){const i=`${e}-code-verifier`;if(!t){await ie(s,i);return}const r=Je(e,t),a=await Z(s,r);await ie(s,r);const n=await _s(s,e),o=n.filter(l=>l!==t);o.length!==n.length&&(o.length>0?await Ee(s,ut(e),o):await ie(s,ut(e))),a!=null&&a===await Z(s,i)&&await ie(s,i)}async function In(s,e){const t=await _s(s,e);for(const i of t)await ie(s,Je(e,i));await ie(s,ut(e)),await ie(s,`${e}-code-verifier`)}function xn(s,e){const t=s.indexOf("#");let i=t===-1?s:s.slice(0,t);const r=t===-1?"":s.slice(t),a=i.indexOf("?");if(a!==-1){const o=i.slice(0,a),l=i.slice(a+1).split("&").filter(c=>c!==""&&c!==Ne&&!c.startsWith(`${Ne}=`));i=l.length>0?`${o}?${l.join("&")}`:o}const n=i.includes("?")?"&":"?";return`${i}${n}${Ne}=${encodeURIComponent(e)}${r}`}async function Dn(s,e,t=!1,i){const r=En();let a=r;t&&(a+="/recovery");const n=Pn();await Ln(s,e,n,a,i);const o=await kn(r);return[o,r===o?"plain":"s256",n]}const Nn=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function Mn(s){const e=s.headers.get(hs);if(!e||!e.match(Nn))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function Bn(s){if(!s)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(s<=e)throw new Error("JWT has expired")}function Fn(s){switch(s){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const Un=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function be(s){if(!Un.test(s))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function st(s){if(!s.recoveryCodes)throw new Error("@supabase/auth-js: the MFA recovery codes API is experimental and disabled by default. Enable it by passing `auth: { experimental: { recoveryCodes: true } }` to createClient (or to the GoTrueClient constructor).")}function Xt(){const s={};return new Proxy(s,{get:(e,t)=>{if(t==="__isUserNotAvailableProxy")return!0;if(typeof t=="symbol"){const i=t.toString();if(i==="Symbol(Symbol.toPrimitive)"||i==="Symbol(Symbol.toStringTag)"||i==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function jn(s,e){return new Proxy(s,{get:(t,i,r)=>{if(i==="__isInsecureUserWarningProxy")return!0;if(typeof i=="symbol"){const a=i.toString();if(a==="Symbol(Symbol.toPrimitive)"||a==="Symbol(Symbol.toStringTag)"||a==="Symbol(util.inspect.custom)"||a==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(t,i,r)}return!e.value&&typeof i=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(t,i,r)}})}function Ys(s){return JSON.parse(JSON.stringify(s))}const Ie=s=>{if(typeof s=="object"&&s!==null){const e=s;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error}return JSON.stringify(s)},Xs=[500,501,502,503,504,520,521,522,523,524,525,526,527,528,529,530];async function Zs(s){var e;if(!wn(s))throw new Pt(Ie(s),0);let t;try{t=await s.json()}catch(a){throw Xs.includes(s.status)?new Pt(s.statusText||`HTTP ${s.status}`,s.status):new pe(Ie(a),a)}if(Xs.includes(s.status))throw new Pt(Ie(t),s.status);let i;const r=Mn(s);if(r&&r.getTime()>=ji["2024-01-01"].timestamp&&typeof t=="object"&&t&&typeof t.code=="string"?i=t.code:typeof t=="object"&&t&&typeof t.error_code=="string"&&(i=t.error_code),i){if(i==="weak_password")throw new Gs(Ie(t),s.status,((e=t.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(i==="session_not_found")throw new Y}else if(typeof t=="object"&&t&&typeof t.weak_password=="object"&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((a,n)=>a&&typeof n=="string",!0))throw new Gs(Ie(t),s.status,t.weak_password.reasons);throw new pn(Ie(t),s.status||500,i)}const $n=(s,e,t,i)=>{const r={method:s,headers:(e==null?void 0:e.headers)||{}};return s==="GET"?r:(r.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),r.body=JSON.stringify(i),Object.assign(Object.assign({},r),t))};async function k(s,e,t,i){var r;const a=Object.assign({},i==null?void 0:i.headers);a[hs]||(a[hs]=ji["2024-01-01"].name),i!=null&&i.jwt&&(a.Authorization=`Bearer ${i.jwt}`);const n=(r=i==null?void 0:i.query)!==null&&r!==void 0?r:{};i!=null&&i.redirectTo&&(n.redirect_to=i.redirectTo);const o=Object.keys(n).length?"?"+new URLSearchParams(n).toString():"",l=await Hn(s,e,t+o,{headers:a,noResolveJson:i==null?void 0:i.noResolveJson},{},i==null?void 0:i.body);return i!=null&&i.xform?i==null?void 0:i.xform(l):{data:Object.assign({},l),error:null}}async function Hn(s,e,t,i,r,a){const n=$n(e,i,r,a);let o;try{o=await s(t,Object.assign({},n))}catch(l){throw new Pt(Ie(l),0)}if(o.ok||await Zs(o),i!=null&&i.noResolveJson)return o;try{return await o.json()}catch(l){await Zs(l)}}function ne(s){var e;let t=null;zn(s)&&(t=Object.assign({},s),s.expires_at||(t.expires_at=Hi(s.expires_in)));const i=(e=s.user)!==null&&e!==void 0?e:typeof(s==null?void 0:s.id)=="string"?s:null;return{data:{session:t,user:i},error:null}}function ei(s){const e=ne(s);return!e.error&&s.weak_password&&typeof s.weak_password=="object"&&Array.isArray(s.weak_password.reasons)&&s.weak_password.reasons.length&&s.weak_password.message&&typeof s.weak_password.message=="string"&&s.weak_password.reasons.reduce((t,i)=>t&&typeof i=="string",!0)&&(e.data.weak_password=s.weak_password),e}function Re(s){var e;return{data:{user:(e=s.user)!==null&&e!==void 0?e:s},error:null}}function qn(s){return{data:s,error:null}}function Wn(s){const{action_link:e,email_otp:t,hashed_token:i,redirect_to:r,verification_type:a}=s,n=zt(s,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),o={action_link:e,email_otp:t,hashed_token:i,redirect_to:r,verification_type:a},l=Object.assign({},n);return{data:{properties:o,user:l},error:null}}function ti(s){return s}function zn(s){return!!s.access_token&&!!s.refresh_token&&!!s.expires_in}const Zt=["global","local","others"];class Gn{constructor({url:e="",headers:t={},fetch:i,experimental:r}){this.url=e,this.headers=t,this.fetch=Wi(i),this.experimental=r??{},this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)},this.passkey={listPasskeys:this._adminListPasskeys.bind(this),deletePasskey:this._adminDeletePasskey.bind(this)}}async signOut(e,t=Zt[0]){if(Zt.indexOf(t)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${Zt.join(", ")}`);try{return await k(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(i){if(E(i))return{data:null,error:i};throw i}}async inviteUserByEmail(e,t={}){try{return await k(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:Re})}catch(i){if(E(i))return{data:{user:null},error:i};throw i}}async generateLink(e){try{const{options:t}=e,i=zt(e,["options"]),r=Object.assign(Object.assign({},i),t);return"newEmail"in i&&(r.new_email=i==null?void 0:i.newEmail,delete r.newEmail),await k(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:r,headers:this.headers,xform:Wn,redirectTo:t==null?void 0:t.redirectTo})}catch(t){if(E(t))return{data:{properties:null,user:null},error:t};throw t}}async createUser(e){try{return await k(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:Re})}catch(t){if(E(t))return{data:{user:null},error:t};throw t}}async listUsers(e){var t,i,r,a,n,o,l;try{const c={nextPage:null,lastPage:0,total:0},d=await k(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(i=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&i!==void 0?i:"",per_page:(a=(r=e==null?void 0:e.perPage)===null||r===void 0?void 0:r.toString())!==null&&a!==void 0?a:""},xform:ti});if(d.error)throw d.error;const u=await d.json(),f=(n=d.headers.get("x-total-count"))!==null&&n!==void 0?n:0,p=(l=(o=d.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return p.length>0&&(p.forEach(v=>{const b=parseInt(v.split(";")[0].split("=")[1].substring(0,1)),_=JSON.parse(v.split(";")[1].split("=")[1]);c[`${_}Page`]=b}),c.total=parseInt(f)),{data:Object.assign(Object.assign({},u),c),error:null}}catch(c){if(E(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){be(e);try{return await k(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:Re})}catch(t){if(E(t))return{data:{user:null},error:t};throw t}}async updateUserById(e,t){be(e);try{return await k(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:Re})}catch(i){if(E(i))return{data:{user:null},error:i};throw i}}async deleteUser(e,t=!1){be(e);try{return await k(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:Re})}catch(i){if(E(i))return{data:{user:null},error:i};throw i}}async _listFactors(e){be(e.userId);try{const{data:t,error:i}=await k(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:r=>({data:{factors:r},error:null})});return{data:t,error:i}}catch(t){if(E(t))return{data:null,error:t};throw t}}async _deleteFactor(e){be(e.userId),be(e.id);try{return{data:await k(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(t){if(E(t))return{data:null,error:t};throw t}}async _listOAuthClients(e){var t,i,r,a,n,o,l;try{const c={nextPage:null,lastPage:0,total:0},d=await k(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(i=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&i!==void 0?i:"",per_page:(a=(r=e==null?void 0:e.perPage)===null||r===void 0?void 0:r.toString())!==null&&a!==void 0?a:""},xform:ti});if(d.error)throw d.error;const u=await d.json(),f=(n=d.headers.get("x-total-count"))!==null&&n!==void 0?n:0,p=(l=(o=d.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return p.length>0&&(p.forEach(v=>{const b=parseInt(v.split(";")[0].split("=")[1].substring(0,1)),_=JSON.parse(v.split(";")[1].split("=")[1]);c[`${_}Page`]=b}),c.total=parseInt(f)),{data:Object.assign(Object.assign({},u),c),error:null}}catch(c){if(E(c))return{data:{clients:[]},error:c};throw c}}async _createOAuthClient(e){try{return await k(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(E(t))return{data:null,error:t};throw t}}async _getOAuthClient(e){try{return await k(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(E(t))return{data:null,error:t};throw t}}async _updateOAuthClient(e,t){try{return await k(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:t,headers:this.headers,xform:i=>({data:i,error:null})})}catch(i){if(E(i))return{data:null,error:i};throw i}}async _deleteOAuthClient(e){try{return await k(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(t){if(E(t))return{data:null,error:t};throw t}}async _regenerateOAuthClientSecret(e){try{return await k(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(E(t))return{data:null,error:t};throw t}}async _listCustomProviders(e){try{const t={};return e!=null&&e.type&&(t.type=e.type),await k(this.fetch,"GET",`${this.url}/admin/custom-providers`,{headers:this.headers,query:t,xform:i=>{var r;return{data:{providers:(r=i==null?void 0:i.providers)!==null&&r!==void 0?r:[]},error:null}}})}catch(t){if(E(t))return{data:{providers:[]},error:t};throw t}}async _createCustomProvider(e){try{return await k(this.fetch,"POST",`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(E(t))return{data:null,error:t};throw t}}async _getCustomProvider(e){try{return await k(this.fetch,"GET",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(E(t))return{data:null,error:t};throw t}}async _updateCustomProvider(e,t){try{return await k(this.fetch,"PUT",`${this.url}/admin/custom-providers/${e}`,{body:t,headers:this.headers,xform:i=>({data:i,error:null})})}catch(i){if(E(i))return{data:null,error:i};throw i}}async _deleteCustomProvider(e){try{return await k(this.fetch,"DELETE",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(t){if(E(t))return{data:null,error:t};throw t}}async _adminListPasskeys(e){be(e.userId);try{return await k(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/passkeys`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(E(t))return{data:null,error:t};throw t}}async _adminDeletePasskey(e){be(e.userId),be(e.passkeyId);try{return await k(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/passkeys/${e.passkeyId}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(t){if(E(t))return{data:null,error:t};throw t}}}function si(s={}){return{getItem:e=>s[e]||null,setItem:(e,t)=>{s[e]=t},removeItem:e=>{delete s[e]}}}globalThis&&qi()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug");class Vn extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}function Kn(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Gi(s){if(!/^0x[a-fA-F0-9]{40}$/.test(s))throw new Error(`@supabase/auth-js: Address "${s}" is invalid.`);return s.toLowerCase()}function Qn(s){return parseInt(s,16)}function Jn(s){const e=new TextEncoder().encode(s);return"0x"+Array.from(e,i=>i.toString(16).padStart(2,"0")).join("")}function Yn(s){var e;const{chainId:t,domain:i,expirationTime:r,issuedAt:a=new Date,nonce:n,notBefore:o,requestId:l,resources:c,scheme:d,uri:u,version:f}=s;{if(!Number.isInteger(t))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);if(!i)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(n&&n.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${n}`);if(!u)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(f!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${f}`);if(!((e=s.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${s.statement}`)}const p=Gi(s.address),v=d?`${d}://${i}`:i,b=s.statement?`${s.statement}
`:"",_=`${v} wants you to sign in with your Ethereum account:
${p}

${b}`;let C=`URI: ${u}
Version: ${f}
Chain ID: ${t}${n?`
Nonce: ${n}`:""}
Issued At: ${a.toISOString()}`;if(r&&(C+=`
Expiration Time: ${r.toISOString()}`),o&&(C+=`
Not Before: ${o.toISOString()}`),l&&(C+=`
Request ID: ${l}`),c){let m=`
Resources:`;for(const g of c){if(!g||typeof g!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${g}`);m+=`
- ${g}`}C+=m}return`${_}
${C}`}class K extends Error{constructor({message:e,code:t,cause:i,name:r}){var a;super(e,{cause:i}),this.__isWebAuthnError=!0,this.name=(a=r??(i instanceof Error?i.name:void 0))!==null&&a!==void 0?a:"Unknown Error",this.code=t}toJSON(){return{name:this.name,message:this.message,code:this.code}}}class jt extends K{constructor(e,t){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t,message:e}),this.name="WebAuthnUnknownError",this.originalError=t}}function Xn({error:s,options:e}){var t,i,r;const{publicKey:a}=e;if(!a)throw Error("options was missing required publicKey property");if(s.name==="AbortError"){if(e.signal instanceof AbortSignal)return new K({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:s})}else if(s.name==="ConstraintError"){if(((t=a.authenticatorSelection)===null||t===void 0?void 0:t.requireResidentKey)===!0)return new K({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:s});if(e.mediation==="conditional"&&((i=a.authenticatorSelection)===null||i===void 0?void 0:i.userVerification)==="required")return new K({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:s});if(((r=a.authenticatorSelection)===null||r===void 0?void 0:r.userVerification)==="required")return new K({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:s})}else{if(s.name==="InvalidStateError")return new K({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:s});if(s.name==="NotAllowedError")return new K({message:s.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:s});if(s.name==="NotSupportedError")return a.pubKeyCredParams.filter(o=>o.type==="public-key").length===0?new K({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:s}):new K({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:s});if(s.name==="SecurityError"){const n=window.location.hostname;if(Vi(n)){if(a.rp.id!==n)return new K({message:`The RP ID "${a.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:s})}else return new K({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:s})}else if(s.name==="TypeError"){if(a.user.id.byteLength<1||a.user.id.byteLength>64)return new K({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:s})}else if(s.name==="UnknownError")return new K({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:s})}return new K({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:s})}function Zn({error:s,options:e}){const{publicKey:t}=e;if(!t)throw Error("options was missing required publicKey property");if(s.name==="AbortError"){if(e.signal instanceof AbortSignal)return new K({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:s})}else{if(s.name==="NotAllowedError")return new K({message:s.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:s});if(s.name==="SecurityError"){const i=window.location.hostname;if(Vi(i)){if(t.rpId!==i)return new K({message:`The RP ID "${t.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:s})}else return new K({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:s})}else if(s.name==="UnknownError")return new K({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:s})}return new K({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:s})}class eo{createNewAbortSignal(){if(this.controller){const t=new Error("Cancelling existing WebAuthn API call for new one");t.name="AbortError",this.controller.abort(t)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const ps=new eo;function ii(s){if(!s)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(s);const{challenge:e,user:t,excludeCredentials:i}=s,r=zt(s,["challenge","user","excludeCredentials"]),a=Qe(e).buffer,n=Object.assign(Object.assign({},t),{id:Qe(t.id).buffer}),o=Object.assign(Object.assign({},r),{challenge:a,user:n});if(i&&i.length>0){o.excludeCredentials=new Array(i.length);for(let l=0;l<i.length;l++){const c=i[l];o.excludeCredentials[l]=Object.assign(Object.assign({},c),{id:Qe(c.id).buffer,type:c.type||"public-key",transports:c.transports})}}return o}function ri(s){if(!s)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(s);const{challenge:e,allowCredentials:t}=s,i=zt(s,["challenge","allowCredentials"]),r=Qe(e).buffer,a=Object.assign(Object.assign({},i),{challenge:r});if(t&&t.length>0){a.allowCredentials=new Array(t.length);for(let n=0;n<t.length;n++){const o=t[n];a.allowCredentials[n]=Object.assign(Object.assign({},o),{id:Qe(o.id).buffer,type:o.type||"public-key",transports:o.transports})}}return a}function ai(s){var e;if("toJSON"in s&&typeof s.toJSON=="function")return s.toJSON();const t=s;return{id:s.id,rawId:s.id,response:{attestationObject:Me(new Uint8Array(s.response.attestationObject)),clientDataJSON:Me(new Uint8Array(s.response.clientDataJSON))},type:"public-key",clientExtensionResults:s.getClientExtensionResults(),authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function ni(s){var e;if("toJSON"in s&&typeof s.toJSON=="function")return s.toJSON();const t=s,i=s.getClientExtensionResults(),r=s.response;return{id:s.id,rawId:s.id,response:{authenticatorData:Me(new Uint8Array(r.authenticatorData)),clientDataJSON:Me(new Uint8Array(r.clientDataJSON)),signature:Me(new Uint8Array(r.signature)),userHandle:r.userHandle?Me(new Uint8Array(r.userHandle)):void 0},type:"public-key",clientExtensionResults:i,authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Vi(s){return s==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(s)}function $t(){var s,e;return!!(X()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((s=navigator==null?void 0:navigator.credentials)===null||s===void 0?void 0:s.create)=="function"&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.get)=="function")}async function Ki(s){try{const e=await navigator.credentials.create(s);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new jt("Browser returned unexpected credential type",e)}:{data:null,error:new jt("Empty credential response",e)}}catch(e){return{data:null,error:Xn({error:e,options:s})}}}async function Qi(s){try{const e=await navigator.credentials.get(s);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new jt("Browser returned unexpected credential type",e)}:{data:null,error:new jt("Empty credential response",e)}}catch(e){return{data:null,error:Zn({error:e,options:s})}}}const to={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},so={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function Ht(...s){const e=r=>r!==null&&typeof r=="object"&&!Array.isArray(r),t=r=>r instanceof ArrayBuffer||ArrayBuffer.isView(r),i={};for(const r of s)if(r)for(const a in r){const n=r[a];if(n!==void 0)if(Array.isArray(n))i[a]=n;else if(t(n))i[a]=n;else if(e(n)){const o=i[a];e(o)?i[a]=Ht(o,n):i[a]=Ht(n)}else i[a]=n}return i}function io(s,e){return Ht(to,s,e||{})}function ro(s,e){return Ht(so,s,e||{})}class ao{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:t,friendlyName:i,signal:r},a){var n;try{const{data:o,error:l}=await this.client.mfa.challenge({factorId:e,webauthn:t});if(!o)return{data:null,error:l};const c=r??ps.createNewAbortSignal();if(o.webauthn.type==="create"){const{user:d}=o.webauthn.credential_options.publicKey;if(!d.name){const u=i;if(u)d.name=`${d.id}:${u}`;else{const p=(await this.client.getUser()).data.user,v=((n=p==null?void 0:p.user_metadata)===null||n===void 0?void 0:n.name)||(p==null?void 0:p.email)||(p==null?void 0:p.id)||"User";d.name=`${d.id}:${v}`}}d.displayName||(d.displayName=d.name)}switch(o.webauthn.type){case"create":{const d=io(o.webauthn.credential_options.publicKey,a==null?void 0:a.create),{data:u,error:f}=await Ki({publicKey:d,signal:c});return u?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:f}}case"request":{const d=ro(o.webauthn.credential_options.publicKey,a==null?void 0:a.request),{data:u,error:f}=await Qi(Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:d,signal:c}));return u?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:f}}}}catch(o){return E(o)?{data:null,error:o}:{data:null,error:new pe("Unexpected error in challenge",o)}}}async _verify({challengeId:e,factorId:t,webauthn:i}){return this.client.mfa.verify({factorId:t,challengeId:e,webauthn:i})}async _authenticate({factorId:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:i=typeof window<"u"?[window.location.origin]:void 0,signal:r}={}},a){if(!t)return{data:null,error:new dt("rpId is required for WebAuthn authentication")};try{if(!$t())return{data:null,error:new pe("Browser does not support WebAuthn",null)};const{data:n,error:o}=await this.challenge({factorId:e,webauthn:{rpId:t,rpOrigins:i},signal:r},{request:a});if(!n)return{data:null,error:o};const{webauthn:l}=n;return this._verify({factorId:e,challengeId:n.challengeId,webauthn:{type:l.type,rpId:t,rpOrigins:i,credential_response:l.credential_response}})}catch(n){return E(n)?{data:null,error:n}:{data:null,error:new pe("Unexpected error in authenticate",n)}}}async _register({friendlyName:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:i=typeof window<"u"?[window.location.origin]:void 0,signal:r}={}},a){if(!t)return{data:null,error:new dt("rpId is required for WebAuthn registration")};try{if(!$t())return{data:null,error:new pe("Browser does not support WebAuthn",null)};const{data:n,error:o}=await this._enroll({friendlyName:e});if(!n)return await this.client.mfa.listFactors().then(d=>{var u;return(u=d.data)===null||u===void 0?void 0:u.all.find(f=>f.factor_type==="webauthn"&&f.friendly_name===e&&f.status==="unverified")}).then(d=>d?this.client.mfa.unenroll({factorId:d==null?void 0:d.id}):void 0),{data:null,error:o};const{data:l,error:c}=await this._challenge({factorId:n.id,friendlyName:n.friendly_name,webauthn:{rpId:t,rpOrigins:i},signal:r},{create:a});return l?this._verify({factorId:n.id,challengeId:l.challengeId,webauthn:{rpId:t,rpOrigins:i,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:c}}catch(n){return E(n)?{data:null,error:n}:{data:null,error:new pe("Unexpected error in register",n)}}}}Kn();const no={url:on,storageKey:ln,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:cn,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1,experimental:{}},$e={};let oi=!1;class ht{get jwks(){var e,t;return(t=(e=$e[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&t!==void 0?t:{keys:[]}}set jwks(e){$e[this.storageKey]=Object.assign(Object.assign({},$e[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,t;return(t=(e=$e[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&t!==void 0?t:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){$e[this.storageKey]=Object.assign(Object.assign({},$e[this.storageKey]),{cachedAt:e})}constructor(e){var t,i,r;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.lastRefreshFailure=null,this._sessionRemovalEpoch=0,this.initializePromise=null,this._pendingInitNotifications=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lock=null,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const a=Object.assign(Object.assign({},no),e);if(this.storageKey=a.storageKey,this.instanceID=(t=ht.nextInstanceID[this.storageKey])!==null&&t!==void 0?t:0,ht.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!a.debug,typeof a.debug=="function"&&(this.logger=a.debug),this.instanceID>0&&X()){const n=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(n),this.logDebugMessages&&console.trace(n)}if(this.persistSession=a.persistSession,this.autoRefreshToken=a.autoRefreshToken,this.experimental=(i=a.experimental)!==null&&i!==void 0?i:{},this.admin=new Gn({url:a.url,headers:a.headers,fetch:a.fetch,experimental:this.experimental}),this.url=a.url,this.headers=a.headers,this.fetch=Wi(a.fetch),this.detectSessionInUrl=a.detectSessionInUrl,this.flowType=a.flowType,this.hasCustomAuthorizationHeader=a.hasCustomAuthorizationHeader,this.throwOnError=a.throwOnError,this.lockAcquireTimeout=a.lockAcquireTimeout,a.lock!=null&&(this.lock=a.lock,oi||(oi=!0,console.warn(`${this._logPrefix()} The "lock" option is deprecated and will be removed in v3. The client now coordinates session refreshes without a lock, so most apps can drop the option. See https://github.com/supabase/supabase-js/blob/master/packages/core/auth-js/migrations/lockless-coordination.md`))),this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new ao(this),recoveryCodes:{getStatus:this._getRecoveryCodesStatus.bind(this),generate:this._generateRecoveryCodes.bind(this),verify:this._verifyRecoveryCode.bind(this),regenerate:this._regenerateRecoveryCodes.bind(this),unenroll:this._unenrollRecoveryCodes.bind(this)}},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.passkey={startRegistration:this._startPasskeyRegistration.bind(this),verifyRegistration:this._verifyPasskeyRegistration.bind(this),startAuthentication:this._startPasskeyAuthentication.bind(this),verifyAuthentication:this._verifyPasskeyAuthentication.bind(this),list:this._listPasskeys.bind(this),update:this._updatePasskey.bind(this),delete:this._deletePasskey.bind(this)},this.persistSession?(a.storage?this.storage=a.storage:qi()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=si(this.memoryStorage)),a.userStorage&&(this.userStorage=a.userStorage)):(this.memoryStorage={},this.storage=si(this.memoryStorage)),X()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(n){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",n)}(r=this.broadcastChannel)===null||r===void 0||r.addEventListener("message",async n=>{this._debug("received broadcast notification from other tab or client",n),(n.data.event==="TOKEN_REFRESHED"||n.data.event==="SIGNED_IN")&&(this.lastRefreshFailure=null);try{await this._notifyAllSubscribers(n.data.event,n.data.session,!1)}catch(o){this._debug("#broadcastChannel","error",o)}})}a.skipAutoInitialize||this.initialize().catch(n=>{this._debug("#initialize()","error",n)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${Ui}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){var e;if(this.initializePromise)return await this.initializePromise;this._pendingInitNotifications=[],this.initializePromise=(async()=>this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()):await this._initialize())();const t=await this.initializePromise,i=(e=this._pendingInitNotifications)!==null&&e!==void 0?e:[];this._pendingInitNotifications=null;for(const r of i)await this._notifyAllSubscribers(r.event,r.session,r.broadcast);return t}async _initialize(){var e;try{let t={},i="none";if(X()&&(t=Js(window.location.href),this._isImplicitGrantCallback(t)?i="implicit":await this._isPKCECallback(t)&&(i="pkce")),X()&&this.detectSessionInUrl&&i!=="none"){const{data:r,error:a}=await this._getSessionFromURL(t,i);if(a){if(this._debug("#_initialize()","error detecting session from URL",a),gn(a)){const l=(e=a.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:a}}return{error:a}}const{session:n,redirectType:o}=r;return this._debug("#_initialize()","detected session in URL",n,"redirect type",o),await this._saveSession(n),setTimeout(async()=>{o==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",n):await this._notifyAllSubscribers("SIGNED_IN",n)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(t){return E(t)?this._returnResult({error:t}):this._returnResult({error:new pe("Unexpected error during initialization",t)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,i,r;try{const a=await k(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(i=(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.data)!==null&&i!==void 0?i:{},gotrue_meta_security:{captcha_token:(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.captchaToken}},xform:ne}),{data:n,error:o}=a;if(o||!n)return this._returnResult({data:{user:null,session:null},error:o});const l=n.session,c=n.user;return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(a){if(E(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signUp(e){var t,i,r;let a=null;try{let n;if("email"in e){const{email:u,password:f,options:p}=e;let v=null,b=null;this.flowType==="pkce"&&([v,b,a]=await this._getCodeChallengeAndMethod()),n=await k(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(p==null?void 0:p.emailRedirectTo,a),body:{email:u,password:f,data:(t=p==null?void 0:p.data)!==null&&t!==void 0?t:{},gotrue_meta_security:{captcha_token:p==null?void 0:p.captchaToken},code_challenge:v,code_challenge_method:b},xform:ne})}else if("phone"in e){const{phone:u,password:f,options:p}=e;n=await k(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:u,password:f,data:(i=p==null?void 0:p.data)!==null&&i!==void 0?i:{},channel:(r=p==null?void 0:p.channel)!==null&&r!==void 0?r:"sms",gotrue_meta_security:{captcha_token:p==null?void 0:p.captchaToken}},xform:ne})}else throw new wt("You must provide either an email or phone number and a password");const{data:o,error:l}=n;if(l||!o)return await ue(this.storage,this.storageKey,a),this._returnResult({data:{user:null,session:null},error:l});const c=o.session,d=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",c)),this._returnResult({data:{user:d,session:c},error:null})}catch(n){if(await ue(this.storage,this.storageKey,a),E(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signInWithPassword(e){try{let t;if("email"in e){const{email:a,password:n,options:o}=e;t=await k(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:a,password:n,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:ei})}else if("phone"in e){const{phone:a,password:n,options:o}=e;t=await k(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:a,password:n,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:ei})}else throw new wt("You must provide either an email or phone number and a password");const{data:i,error:r}=t;if(r)return this._returnResult({data:{user:null,session:null},error:r});if(!i||!i.session||!i.user){const a=new je;return this._returnResult({data:{user:null,session:null},error:a})}return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",i.session)),this._returnResult({data:Object.assign({user:i.user,session:i.session},i.weak_password?{weakPassword:i.weak_password}:null),error:r})}catch(t){if(E(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOAuth(e){var t,i,r,a;return await this._handleProviderSignIn(e.provider,{redirectTo:(t=e.options)===null||t===void 0?void 0:t.redirectTo,scopes:(i=e.options)===null||i===void 0?void 0:i.scopes,queryParams:(r=e.options)===null||r===void 0?void 0:r.queryParams,skipBrowserRedirect:(a=e.options)===null||a===void 0?void 0:a.skipBrowserRedirect})}async exchangeCodeForSession(e,t){return await this.initializePromise,this.lock!=null?this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e,t)):this._exchangeCodeForSession(e,t)}async signInWithWeb3(e){const{chain:t}=e;switch(t){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`)}}async signInWithEthereum(e){var t,i,r,a,n,o,l,c,d,u,f;let p,v;if("message"in e)p=e.message,v=e.signature;else{const{chain:b,wallet:_,statement:C,options:m}=e;let g;if(X())if(typeof _=="object")g=_;else{const P=window;if("ethereum"in P&&typeof P.ethereum=="object"&&"request"in P.ethereum&&typeof P.ethereum.request=="function")g=P.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof _!="object"||!(m!=null&&m.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");g=_}const S=new URL((t=m==null?void 0:m.url)!==null&&t!==void 0?t:window.location.href),A=await g.request({method:"eth_requestAccounts"}).then(P=>P).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!A||A.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const w=Gi(A[0]);let T=(i=m==null?void 0:m.signInWithEthereum)===null||i===void 0?void 0:i.chainId;if(!T){const P=await g.request({method:"eth_chainId"});T=Qn(P)}const M={domain:S.host,address:w,statement:C,uri:S.href,version:"1",chainId:T,nonce:(r=m==null?void 0:m.signInWithEthereum)===null||r===void 0?void 0:r.nonce,issuedAt:(n=(a=m==null?void 0:m.signInWithEthereum)===null||a===void 0?void 0:a.issuedAt)!==null&&n!==void 0?n:new Date,expirationTime:(o=m==null?void 0:m.signInWithEthereum)===null||o===void 0?void 0:o.expirationTime,notBefore:(l=m==null?void 0:m.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(c=m==null?void 0:m.signInWithEthereum)===null||c===void 0?void 0:c.requestId,resources:(d=m==null?void 0:m.signInWithEthereum)===null||d===void 0?void 0:d.resources};p=Yn(M),v=await g.request({method:"personal_sign",params:[Jn(p),w]})}try{const{data:b,error:_}=await k(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:p,signature:v},!((u=e.options)===null||u===void 0)&&u.captchaToken?{gotrue_meta_security:{captcha_token:(f=e.options)===null||f===void 0?void 0:f.captchaToken}}:null),xform:ne});if(_)throw _;if(!b||!b.session||!b.user){const C=new je;return this._returnResult({data:{user:null,session:null},error:C})}return b.session&&(await this._saveSession(b.session),await this._notifyAllSubscribers("SIGNED_IN",b.session)),this._returnResult({data:Object.assign({},b),error:_})}catch(b){if(E(b))return this._returnResult({data:{user:null,session:null},error:b});throw b}}async signInWithSolana(e){var t,i,r,a,n,o,l,c,d,u,f,p;let v,b;if("message"in e)v=e.message,b=e.signature;else{const{chain:_,wallet:C,statement:m,options:g}=e;let S;if(X())if(typeof C=="object")S=C;else{const w=window;if("solana"in w&&typeof w.solana=="object"&&("signIn"in w.solana&&typeof w.solana.signIn=="function"||"signMessage"in w.solana&&typeof w.solana.signMessage=="function"))S=w.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof C!="object"||!(g!=null&&g.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");S=C}const A=new URL((t=g==null?void 0:g.url)!==null&&t!==void 0?t:window.location.href);if("signIn"in S&&S.signIn){const w=await S.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},g==null?void 0:g.signInWithSolana),{version:"1",domain:A.host,uri:A.href}),m?{statement:m}:null));let T;if(Array.isArray(w)&&w[0]&&typeof w[0]=="object")T=w[0];else if(w&&typeof w=="object"&&"signedMessage"in w&&"signature"in w)T=w;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in T&&"signature"in T&&(typeof T.signedMessage=="string"||T.signedMessage instanceof Uint8Array)&&T.signature instanceof Uint8Array)v=typeof T.signedMessage=="string"?T.signedMessage:new TextDecoder().decode(T.signedMessage),b=T.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in S)||typeof S.signMessage!="function"||!("publicKey"in S)||typeof S!="object"||!S.publicKey||!("toBase58"in S.publicKey)||typeof S.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");v=[`${A.host} wants you to sign in with your Solana account:`,S.publicKey.toBase58(),...m?["",m,""]:[""],"Version: 1",`URI: ${A.href}`,`Issued At: ${(r=(i=g==null?void 0:g.signInWithSolana)===null||i===void 0?void 0:i.issuedAt)!==null&&r!==void 0?r:new Date().toISOString()}`,...!((a=g==null?void 0:g.signInWithSolana)===null||a===void 0)&&a.notBefore?[`Not Before: ${g.signInWithSolana.notBefore}`]:[],...!((n=g==null?void 0:g.signInWithSolana)===null||n===void 0)&&n.expirationTime?[`Expiration Time: ${g.signInWithSolana.expirationTime}`]:[],...!((o=g==null?void 0:g.signInWithSolana)===null||o===void 0)&&o.chainId?[`Chain ID: ${g.signInWithSolana.chainId}`]:[],...!((l=g==null?void 0:g.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${g.signInWithSolana.nonce}`]:[],...!((c=g==null?void 0:g.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${g.signInWithSolana.requestId}`]:[],...!((u=(d=g==null?void 0:g.signInWithSolana)===null||d===void 0?void 0:d.resources)===null||u===void 0)&&u.length?["Resources",...g.signInWithSolana.resources.map(T=>`- ${T}`)]:[]].join(`
`);const w=await S.signMessage(new TextEncoder().encode(v),"utf8");if(!w||!(w instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");b=w}}try{const{data:_,error:C}=await k(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:v,signature:Me(b)},!((f=e.options)===null||f===void 0)&&f.captchaToken?{gotrue_meta_security:{captcha_token:(p=e.options)===null||p===void 0?void 0:p.captchaToken}}:null),xform:ne});if(C)throw C;if(!_||!_.session||!_.user){const m=new je;return this._returnResult({data:{user:null,session:null},error:m})}return _.session&&(await this._saveSession(_.session),await this._notifyAllSubscribers("SIGNED_IN",_.session)),this._returnResult({data:Object.assign({},_),error:C})}catch(_){if(E(_))return this._returnResult({data:{user:null,session:null},error:_});throw _}}async _exchangeCodeForSession(e,t){const i=(t==null?void 0:t.flowId)!=null,r=i?Lt(t==null?void 0:t.flowId):X()?Lt(Js(window.location.href)[Ne]):null;i&&!r&&this._debug("#_exchangeCodeForSession()","provided flowId is not a valid flow id",t==null?void 0:t.flowId);const{verifier:a,flowId:n}=i&&!r?{verifier:null,flowId:null}:await On(this.storage,this.storageKey,r),[o,l]=(a??"").split("/");try{if(!o&&this.flowType==="pkce")throw new mn;const{data:c,error:d}=await k(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:o},xform:ne});if(await ue(this.storage,this.storageKey,n),d)throw d;if(!c||!c.session||!c.user){const u=new je;return this._returnResult({data:{user:null,session:null,redirectType:null},error:u})}return c.session&&(await this._saveSession(c.session),await this._notifyAllSubscribers(l==="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",c.session)),this._returnResult({data:Object.assign(Object.assign({},c),{redirectType:l??null}),error:d})}catch(c){if(await ue(this.storage,this.storageKey,n),E(c))return this._returnResult({data:{user:null,session:null,redirectType:null},error:c});throw c}}async signInWithIdToken(e){try{const{options:t,provider:i,token:r,access_token:a,nonce:n}=e,o=await k(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:i,id_token:r,access_token:a,nonce:n,gotrue_meta_security:{captcha_token:t==null?void 0:t.captchaToken}},xform:ne}),{data:l,error:c}=o;if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l||!l.session||!l.user){const d=new je;return this._returnResult({data:{user:null,session:null},error:d})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:c})}catch(t){if(E(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOtp(e){var t,i,r,a,n;let o=null;try{if("email"in e){const{email:l,options:c}=e;let d=null,u=null;this.flowType==="pkce"&&([d,u,o]=await this._getCodeChallengeAndMethod());const{error:f}=await k(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:l,data:(t=c==null?void 0:c.data)!==null&&t!==void 0?t:{},create_user:(i=c==null?void 0:c.shouldCreateUser)!==null&&i!==void 0?i:!0,gotrue_meta_security:{captcha_token:c==null?void 0:c.captchaToken},code_challenge:d,code_challenge_method:u},redirectTo:this._maybeAppendFlowIdToRedirect(c==null?void 0:c.emailRedirectTo,o)});return this._returnResult({data:{user:null,session:null},error:f})}if("phone"in e){const{phone:l,options:c}=e,{data:d,error:u}=await k(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:l,data:(r=c==null?void 0:c.data)!==null&&r!==void 0?r:{},create_user:(a=c==null?void 0:c.shouldCreateUser)!==null&&a!==void 0?a:!0,gotrue_meta_security:{captcha_token:c==null?void 0:c.captchaToken},channel:(n=c==null?void 0:c.channel)!==null&&n!==void 0?n:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:d==null?void 0:d.message_id},error:u})}throw new wt("You must provide either an email or phone number.")}catch(l){if(await ue(this.storage,this.storageKey,o),E(l))return this._returnResult({data:{user:null,session:null},error:l});throw l}}async verifyOtp(e){var t,i;try{let r,a;"options"in e&&(r=(t=e.options)===null||t===void 0?void 0:t.redirectTo,a=(i=e.options)===null||i===void 0?void 0:i.captchaToken);const{data:n,error:o}=await k(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:a}}),redirectTo:r,xform:ne});if(o)throw o;if(!n)throw new Error("An error occurred on token verification.");const l=n.session,c=n.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(r){if(E(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithSSO(e){var t,i,r,a;let n=null;try{let o=null,l=null;this.flowType==="pkce"&&([o,l,n]=await this._getCodeChallengeAndMethod());const c=await k(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:this._maybeAppendFlowIdToRedirect((t=e.options)===null||t===void 0?void 0:t.redirectTo,n)}),!((i=e==null?void 0:e.options)===null||i===void 0)&&i.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:o,code_challenge_method:l}),headers:this.headers,xform:qn});return!((r=c.data)===null||r===void 0)&&r.url&&X()&&!(!((a=e.options)===null||a===void 0)&&a.skipBrowserRedirect)&&window.location.assign(c.data.url),this._returnResult(c)}catch(o){if(await ue(this.storage,this.storageKey,n),E(o))return this._returnResult({data:null,error:o});throw o}}async reauthenticate(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate()):await this._reauthenticate()}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:t},error:i}=e;if(i)throw i;if(!t)throw new Y;const{error:r}=await k(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return this._returnResult({data:{user:null,session:null},error:r})})}catch(e){if(E(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){let t=null;try{const i=`${this.url}/resend`;if("email"in e){const{email:r,type:a,options:n}=e;let o=null,l=null;this.flowType==="pkce"&&([o,l,t]=await this._getCodeChallengeAndMethod());const{error:c}=await k(this.fetch,"POST",i,{headers:this.headers,body:{email:r,type:a,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken},code_challenge:o,code_challenge_method:l},redirectTo:this._maybeAppendFlowIdToRedirect(n==null?void 0:n.emailRedirectTo,t)});return c&&await ue(this.storage,this.storageKey,t),this._returnResult({data:{user:null,session:null},error:c})}else if("phone"in e){const{phone:r,type:a,options:n}=e,{data:o,error:l}=await k(this.fetch,"POST",i,{headers:this.headers,body:{phone:r,type:a,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:o==null?void 0:o.message_id},error:l})}throw new wt("You must provide either an email or phone number and a type")}catch(i){if(await ue(this.storage,this.storageKey,t),E(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}}async getSession(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async e=>e)):await this._useSession(async e=>e)}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const i=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),r=(async()=>(await i,await t()))();return this.pendingInLock.push((async()=>{try{await r}catch{}})()),r}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const i=t();for(this.pendingInLock.push((async()=>{try{await i}catch{}})()),await i;this.pendingInLock.length;){const r=[...this.pendingInLock];await Promise.all(r),this.pendingInLock.splice(0,r.length)}return await i}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lock!=null&&!this.lockAcquired&&this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const t=await Z(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),t!==null&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const i=e.expires_at?e.expires_at*1e3-Date.now()<Yt:!1;if(this._debug("#__loadSession()",`session has${i?"":" not"} expired`,"expires_at",e.expires_at),!i)return{data:{session:await this._hydrateSessionUser(e)},error:null};const{data:r,error:a}=await this._callRefreshToken(e.refresh_token);if(a){const n=await Z(this.storage,this.storageKey);return n&&this._isValidSession(n)&&n.expires_at&&n.expires_at*1e3>Date.now()?this._returnResult({data:{session:await this._hydrateSessionUser(n)},error:null}):this._returnResult({data:{session:null},error:a})}return this._returnResult({data:{session:r},error:null})}finally{this._debug("#__loadSession()","end")}}async _hydrateSessionUser(e){if(this.userStorage){const t=await Z(this.userStorage,this.storageKey+"-user");e.user=t!=null&&t.user?t.user:Xt()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const t={value:this.suppressGetSessionWarning};e.user=jn(e.user,t),t.value&&(this.suppressGetSessionWarning=!0)}return e}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;let t;return this.lock!=null?t=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser()):t=await this._getUser(),t.data.user&&(this.suppressGetSessionWarning=!0),t}async _getUser(e){try{return e?await k(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:Re}):await this._useSession(async t=>{var i,r,a;const{data:n,error:o}=t;if(o)throw o;return!(!((i=n.session)===null||i===void 0)&&i.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new Y}:await k(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(a=(r=n.session)===null||r===void 0?void 0:r.access_token)!==null&&a!==void 0?a:void 0,xform:Re})})}catch(t){if(E(t))return St(t)&&await this._removeSession(),this._returnResult({data:{user:null},error:t});throw t}}async updateUser(e,t={}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,t)):await this._updateUser(e,t)}async _updateUser(e,t={}){let i=null;try{return await this._useSession(async r=>{const{data:a,error:n}=r;if(n)throw n;if(!a.session)throw new Y;const o=a.session;let l=null,c=null;this.flowType==="pkce"&&e.email!=null&&([l,c,i]=await this._getCodeChallengeAndMethod());const{data:d,error:u}=await k(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(t==null?void 0:t.emailRedirectTo,i),body:Object.assign(Object.assign({},e),{code_challenge:l,code_challenge_method:c}),jwt:o.access_token,xform:Re});if(u)throw u;return o.user=d.user,await this._saveSession(o),await this._notifyAllSubscribers("USER_UPDATED",o),this._returnResult({data:{user:o.user},error:null})})}catch(r){if(await ue(this.storage,this.storageKey,i),E(r))return this._returnResult({data:{user:null},error:r});throw r}}async setSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e)):await this._setSession(e)}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new Y;const t=Date.now()/1e3;let i=t,r=!0,a=null;const{payload:n}=Et(e.access_token);if(n.exp&&(i=n.exp,r=i<=t),r){const{data:o,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!o)return{data:{user:null,session:null},error:null};a=o}else{const{data:o,error:l}=await this._getUser(e.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});a={access_token:e.access_token,refresh_token:e.refresh_token,user:o.user,token_type:"bearer",expires_in:i-t,expires_at:i},await this._saveSession(a),await this._notifyAllSubscribers("SIGNED_IN",a)}return this._returnResult({data:{user:a.user,session:a},error:null})}catch(t){if(E(t))return this._returnResult({data:{session:null,user:null},error:t});throw t}}async refreshSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e)):await this._refreshSession(e)}async _refreshSession(e){try{return await this._useSession(async t=>{var i;if(!e){const{data:n,error:o}=t;if(o)throw o;e=(i=n.session)!==null&&i!==void 0?i:void 0}if(!(e!=null&&e.refresh_token))throw new Y;const{data:r,error:a}=await this._callRefreshToken(e.refresh_token);return a?this._returnResult({data:{user:null,session:null},error:a}):r?this._returnResult({data:{user:r.user,session:r},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(t){if(E(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async _getSessionFromURL(e,t){var i;try{if(!X())throw new Ct("No browser detected.");if(e.error||e.error_description||e.error_code)throw new Ct(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(t){case"implicit":if(this.flowType==="pkce")throw new qs("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Ct("Not a valid implicit grant flow url.");break;default:}if(t==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new qs("No code detected.");const{data:g,error:S}=await this._exchangeCodeForSession(e.code,{flowId:e[Ne]});if(S)throw S;const A=new URL(window.location.href);return A.searchParams.delete("code"),A.searchParams.delete(Ne),window.history.replaceState(window.history.state,"",A.toString()),{data:{session:g.session,redirectType:(i=g.redirectType)!==null&&i!==void 0?i:null},error:null}}const{provider_token:r,provider_refresh_token:a,access_token:n,refresh_token:o,expires_in:l,expires_at:c,token_type:d}=e;if(!n||!l||!o||!d)throw new Ct("No session defined in URL");const u=Math.round(Date.now()/1e3),f=parseInt(l);let p=u+f;c&&(p=parseInt(c));const v=p-u;v*1e3<=Ae&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${v}s, should have been closer to ${f}s`);const b=p-f;u-b>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",b,p,u):u-b<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",b,p,u);const{data:_,error:C}=await this._getUser(n);if(C)throw C;const m={provider_token:r,provider_refresh_token:a,access_token:n,expires_in:f,expires_at:p,refresh_token:o,token_type:d,user:_.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:m,redirectType:e.type},error:null})}catch(r){if(E(r))return this._returnResult({data:{session:null,redirectType:null},error:r});throw r}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error||e.error_description||e.error_code)}async _isPKCECallback(e){if(!e.code)return!1;const t=Lt(e[Ne]);return t&&await Z(this.storage,Je(this.storageKey,t))?!0:!!await Z(this.storage,`${this.storageKey}-code-verifier`)}async signOut(e={scope:"global"}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e)):await this._signOut(e)}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async t=>{var i;const r=async()=>{await this._removeSession()},{data:a,error:n}=t;if(n&&!St(n))return this._returnResult({error:n});const o=(i=a.session)===null||i===void 0?void 0:i.access_token;if(o){const{error:l}=await this.admin.signOut(o,e);if(l&&!(Hs(l)&&(l.status===404||l.status===401||l.status===403)||St(l)))return e!=="others"&&await r(),this._returnResult({error:l})}return e!=="others"&&await r(),this._returnResult({error:null})})}onAuthStateChange(e){const t=Sn(),i={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,i),(async()=>(await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(t)}):await this._emitInitialSession(t)))(),{data:{subscription:i}}}async _emitInitialSession(e){return await this._useSession(async t=>{var i,r;try{const{data:{session:a},error:n}=t;if(n)throw n;await((i=this.stateChangeEmitters.get(e))===null||i===void 0?void 0:i.callback("INITIAL_SESSION",a)),this._debug("INITIAL_SESSION","callback id",e,"session",a)}catch(a){if(await((r=this.stateChangeEmitters.get(e))===null||r===void 0?void 0:r.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",a),zs(a))return;St(a)||At(a)||Hs(a)&&(a.code==="refresh_token_not_found"||a.code==="refresh_token_already_used"||a.code==="session_expired")?console.warn(a):console.error(a)}})}async resetPasswordForEmail(e,t={}){let i=null,r=null,a=null;this.flowType==="pkce"&&([i,r,a]=await this._getCodeChallengeAndMethod(!0));try{return await k(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:i,code_challenge_method:r,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(t.redirectTo,a)})}catch(n){if(await ue(this.storage,this.storageKey,a),E(n))return this._returnResult({data:null,error:n});throw n}}async getUserIdentities(){var e;try{const{data:t,error:i}=await this.getUser();if(i)throw i;return this._returnResult({data:{identities:(e=t.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var t;let i=null;try{const{data:r,error:a}=await this._useSession(async n=>{var o,l,c,d,u;const{data:f,error:p}=n;if(p)throw p;const{url:v,flowId:b}=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(o=e.options)===null||o===void 0?void 0:o.redirectTo,scopes:(l=e.options)===null||l===void 0?void 0:l.scopes,queryParams:(c=e.options)===null||c===void 0?void 0:c.queryParams,skipBrowserRedirect:!0});return i=b,await k(this.fetch,"GET",v,{headers:this.headers,jwt:(u=(d=f.session)===null||d===void 0?void 0:d.access_token)!==null&&u!==void 0?u:void 0})});if(a)throw a;return X()&&!(!((t=e.options)===null||t===void 0)&&t.skipBrowserRedirect)&&window.location.assign(r==null?void 0:r.url),this._returnResult({data:{provider:e.provider,url:r==null?void 0:r.url,flowId:i},error:null})}catch(r){if(E(r))return this._returnResult({data:{provider:e.provider,url:null,flowId:i},error:r});throw r}}async linkIdentityIdToken(e){return await this._useSession(async t=>{var i;try{const{error:r,data:{session:a}}=t;if(r)throw r;const{options:n,provider:o,token:l,access_token:c,nonce:d}=e,u=await k(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(i=a==null?void 0:a.access_token)!==null&&i!==void 0?i:void 0,body:{provider:o,id_token:l,access_token:c,nonce:d,link_identity:!0,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken}},xform:ne}),{data:f,error:p}=u;return p?this._returnResult({data:{user:null,session:null},error:p}):!f||!f.session||!f.user?this._returnResult({data:{user:null,session:null},error:new je}):(f.session&&(await this._saveSession(f.session),await this._notifyAllSubscribers("USER_UPDATED",f.session)),this._returnResult({data:f,error:p}))}catch(r){if(await ue(this.storage,this.storageKey,null),E(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}})}async unlinkIdentity(e){try{return await this._useSession(async t=>{var i,r;const{data:a,error:n}=t;if(n)throw n;return await k(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(r=(i=a.session)===null||i===void 0?void 0:i.access_token)!==null&&r!==void 0?r:void 0})})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async _refreshAccessToken(e){const t="#_refreshAccessToken()";this._debug(t,"begin");try{const i=Date.now();return await An(async r=>(r>0&&await Cn(200*Math.pow(2,r-1)),this._debug(t,"refreshing attempt",r),await k(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:ne})),(r,a)=>{const n=200*Math.pow(2,r);return a&&At(a)&&Date.now()+n-i<Ae})}catch(i){if(this._debug(t,"error",i),E(i))return this._returnResult({data:{session:null,user:null},error:i});throw i}finally{this._debug(t,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){const{url:i,flowId:r}=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",i),X()&&!t.skipBrowserRedirect&&window.location.assign(i),{data:{provider:e,url:i,flowId:r},error:null}}async _recoverAndRefresh(){var e,t;const i="#_recoverAndRefresh()";this._debug(i,"begin");try{const r=await Z(this.storage,this.storageKey);if(r&&this.userStorage){let n=await Z(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!n&&(n={user:r.user},await Ee(this.userStorage,this.storageKey+"-user",n)),r.user=(e=n==null?void 0:n.user)!==null&&e!==void 0?e:Xt()}else if(r&&!r.user&&!r.user){const n=await Z(this.storage,this.storageKey+"-user");n&&(n!=null&&n.user)?(r.user=n.user,await ie(this.storage,this.storageKey+"-user"),await Ee(this.storage,this.storageKey,r)):r.user=Xt()}if(this._debug(i,"session from storage",r),!this._isValidSession(r)){this._debug(i,"session is not valid"),r!==null&&await this._removeSession();return}const a=((t=r.expires_at)!==null&&t!==void 0?t:1/0)*1e3-Date.now()<Yt;if(this._debug(i,`session has${a?"":" not"} expired with margin of ${Yt}s`),a){if(this.autoRefreshToken&&r.refresh_token){const{error:n}=await this._callRefreshToken(r.refresh_token);n&&(zs(n)?this._debug(i,"refresh discarded by commit guard",n):this._debug(i,"refresh failed",n))}}else if(r.user&&r.user.__isUserNotAvailableProxy===!0)try{const{data:n,error:o}=await this._getUser(r.access_token);!o&&(n!=null&&n.user)?(r.user=n.user,await this._saveSession(r),await this._notifyAllSubscribers("SIGNED_IN",r)):this._debug(i,"could not get user data, skipping SIGNED_IN notification")}catch(n){console.error("Error getting user data:",n),this._debug(i,"error getting user data, skipping SIGNED_IN notification",n)}else await this._notifyAllSubscribers("SIGNED_IN",r)}catch(r){this._debug(i,"error",r),At(r)?console.warn(r):console.error(r);return}finally{this._debug(i,"end")}}async _callRefreshToken(e){var t,i;if(!e)throw new Y;if(this.refreshingDeferred)return this.refreshingDeferred.promise;if(this.lastRefreshFailure&&this.lastRefreshFailure.refreshToken===e&&Date.now()<this.lastRefreshFailure.expiresAt)return this._debug("#_callRefreshToken()","returning cached failure (cooldown active)"),this.lastRefreshFailure.result;const r="#_callRefreshToken()";this._debug(r,"begin");try{this.refreshingDeferred=new Kt,this.refreshingDeferred.promise.then(void 0,()=>{});const a=await Z(this.storage,this.storageKey),{data:n,error:o}=await this._refreshAccessToken(e);if(o)throw o;if(!n.session)throw new Y;const l=await Z(this.storage,this.storageKey);if(a!==null&&(l===null||l.refresh_token!==a.refresh_token)){this._debug(r,"commit guard: storage changed since refresh started, discarding rotated tokens",{startedWith:"present",nowHolds:l?"replaced":"cleared"});const f={data:null,error:new Ws};return this.refreshingDeferred.resolve(f),f}const d=this._sessionRemovalEpoch;if(await this._saveSession(n.session),this._sessionRemovalEpoch!==d){this._debug(r,"commit guard (post-save): _removeSession ran during _saveSession, undoing write"),await ie(this.storage,this.storageKey),this.userStorage&&await ie(this.userStorage,this.storageKey+"-user");const f={data:null,error:new Ws};return this.refreshingDeferred.resolve(f),f}await this._notifyAllSubscribers("TOKEN_REFRESHED",n.session);const u={data:n.session,error:null};return this.lastRefreshFailure=null,this.refreshingDeferred.resolve(u),u}catch(a){if(this._debug(r,"error",a),E(a)){const n={data:null,error:a};if(!At(a)){const o=await Z(this.storage,this.storageKey);!!(o!=null&&o.expires_at&&o.expires_at*1e3>Date.now())?this._debug(r,"proactive refresh failed, access token still valid — preserving session"):await this._removeSession()}return this.lastRefreshFailure={refreshToken:e,result:n,expiresAt:Date.now()+nn},(t=this.refreshingDeferred)===null||t===void 0||t.resolve(n),n}throw(i=this.refreshingDeferred)===null||i===void 0||i.reject(a),a}finally{this.refreshingDeferred=null,this._debug(r,"end")}}async _notifyAllSubscribers(e,t,i=!0){if(this._pendingInitNotifications!==null&&i){this._pendingInitNotifications.push({event:e,session:t,broadcast:i});return}const r=`#_notifyAllSubscribers(${e})`;this._debug(r,"begin",t,`broadcast = ${i}`);try{this.broadcastChannel&&i&&this.broadcastChannel.postMessage({event:e,session:t});const a=[],n=Array.from(this.stateChangeEmitters.values()).map(async o=>{try{await o.callback(e,t)}catch(l){a.push(l)}});if(await Promise.all(n),a.length>0){for(let o=0;o<a.length;o+=1)console.error(a[o]);throw a[0]}}finally{this._debug(r,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0;const t=Object.assign({},e),i=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!i&&t.user&&await Ee(this.userStorage,this.storageKey+"-user",{user:t.user});const r=Object.assign({},t);delete r.user;const a=Ys(r);await Ee(this.storage,this.storageKey,a)}else{const r=Ys(t);await Ee(this.storage,this.storageKey,r)}}async _removeSession(){this._sessionRemovalEpoch+=1,this._debug("#_removeSession()"),this.lastRefreshFailure=null,this.suppressGetSessionWarning=!1,await ie(this.storage,this.storageKey),await In(this.storage,this.storageKey),await ie(this.storage,this.storageKey+"-user"),this.userStorage&&await ie(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&X()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(t){console.error("removing visibilitychange callback failed",t)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),Ae);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e);const t=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=t,t&&typeof t=="object"&&typeof t.unref=="function"?t.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(t)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);const t=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,t&&clearTimeout(t)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async dispose(){var e;this._removeVisibilityChangedCallback(),await this._stopAutoRefresh(),(e=this.broadcastChannel)===null||e===void 0||e.close(),this.broadcastChannel=null,this.stateChangeEmitters.clear()}async _autoRefreshTokenTick(){if(this._debug("#_autoRefreshTokenTick()","begin"),this.lock!=null){try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async t=>{const{data:{session:i}}=t;if(!i||!i.refresh_token||!i.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const r=Math.floor((i.expires_at*1e3-e)/Ae);this._debug("#_autoRefreshTokenTick()",`access token expires in ${r} ticks, a tick lasts ${Ae}ms, refresh threshold is ${rt} ticks`),r<=rt&&await this._callRefreshToken(i.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e instanceof Vn)this._debug("auto refresh token tick lock not available");else throw e}return}if(this.refreshingDeferred!==null){this._debug("#_autoRefreshTokenTick()","refresh already in flight, skipping");return}try{const e=Date.now();try{await this._useSession(async t=>{const{data:{session:i}}=t;if(!i||!i.refresh_token||!i.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const r=Math.floor((i.expires_at*1e3-e)/Ae);this._debug("#_autoRefreshTokenTick()",`access token expires in ${r} ticks, a tick lasts ${Ae}ms, refresh threshold is ${rt} ticks`),r<=rt&&await this._callRefreshToken(i.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!X()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug("#visibilityChangedCallback","error",e)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const t=`#_onVisibilityChanged(${e})`;if(this._debug(t,"visibilityState",document.visibilityState),document.visibilityState==="visible"){if(this.autoRefreshToken&&this._startAutoRefresh(),!e)if(await this.initializePromise,this.lock!=null)await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()});else{if(document.visibilityState!=="visible"){this._debug(t,"visibilityState is no longer visible, skipping recovery");return}await this._recoverAndRefresh()}}else document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,i){let r=i==null?void 0:i.redirectTo,a=null,n=null,o=null;this.flowType==="pkce"&&([a,n,o]=await this._getCodeChallengeAndMethod(),r=this._maybeAppendFlowIdToRedirect(r,o));const l=[`provider=${encodeURIComponent(t)}`];if(r&&l.push(`redirect_to=${encodeURIComponent(r)}`),i!=null&&i.scopes&&l.push(`scopes=${encodeURIComponent(i.scopes)}`),a!=null&&n!=null){const c=new URLSearchParams({code_challenge:`${encodeURIComponent(a)}`,code_challenge_method:`${encodeURIComponent(n)}`});l.push(c.toString())}if(i!=null&&i.queryParams){const c=new URLSearchParams(i.queryParams);l.push(c.toString())}return i!=null&&i.skipBrowserRedirect&&l.push(`skip_http_redirect=${i.skipBrowserRedirect}`),{url:`${e}?${l.join("&")}`,flowId:o}}_maybeAppendFlowIdToRedirect(e,t){return!e||!t||!this.experimental.appendPkceFlowIdToRedirects?e??void 0:xn(e,t)}async _getCodeChallengeAndMethod(e=!1){return Dn(this.storage,this.storageKey,e,t=>this._debug("#_getCodeChallengeAndMethod()","evicted oldest pending PKCE verifier slot",t))}async _unenroll(e){try{return await this._useSession(async t=>{var i;const{data:r,error:a}=t;return a?this._returnResult({data:null,error:a}):await k(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(i=r==null?void 0:r.session)===null||i===void 0?void 0:i.access_token})})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async _enroll(e){try{return await this._useSession(async t=>{var i,r;const{data:a,error:n}=t;if(n)return this._returnResult({data:null,error:n});const o=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:c}=await k(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:(i=a==null?void 0:a.session)===null||i===void 0?void 0:i.access_token});return c?this._returnResult({data:null,error:c}):(e.factorType==="totp"&&l.type==="totp"&&(!((r=l==null?void 0:l.totp)===null||r===void 0)&&r.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async _verify(e){const t=async()=>{try{return await this._useSession(async i=>{var r;const{data:a,error:n}=i;if(n)return this._returnResult({data:null,error:n});const o=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?ai(e.webauthn.credential_response):ni(e.webauthn.credential_response)})}:{code:e.code}),{data:l,error:c}=await k(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:o,headers:this.headers,jwt:(r=a==null?void 0:a.session)===null||r===void 0?void 0:r.access_token});return c?this._returnResult({data:null,error:c}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+l.expires_in},l)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",l),this._returnResult({data:l,error:c}))})}catch(i){if(E(i))return this._returnResult({data:null,error:i});throw i}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,t):t()}async _challenge(e){const t=async()=>{try{return await this._useSession(async i=>{var r;const{data:a,error:n}=i;if(n)return this._returnResult({data:null,error:n});const o=await k(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(r=a==null?void 0:a.session)===null||r===void 0?void 0:r.access_token});if(o.error)return o;const{data:l}=o;if(l.type!=="webauthn")return{data:l,error:null};switch(l.webauthn.type){case"create":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:ii(l.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:ri(l.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(i){if(E(i))return this._returnResult({data:null,error:i});throw i}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,t):t()}async _challengeAndVerify(e){const{data:t,error:i}=await this._challenge({factorId:e.factorId});return i?this._returnResult({data:null,error:i}):await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){var e;const{data:{user:t},error:i}=await this.getUser();if(i)return{data:null,error:i};const r={all:[],phone:[],totp:[],webauthn:[],recovery_code:[]};for(const a of(e=t==null?void 0:t.factors)!==null&&e!==void 0?e:[])r.all.push(a),a.status==="verified"&&a.factor_type in r&&Array.isArray(r[a.factor_type])&&r[a.factor_type].push(a);return{data:r,error:null}}async _getAuthenticatorAssuranceLevel(e){var t,i,r,a;if(e)try{const{payload:p}=Et(e);let v=null;p.aal&&(v=p.aal);let b=v;const{data:{user:_},error:C}=await this.getUser(e);if(C)return this._returnResult({data:null,error:C});((i=(t=_==null?void 0:_.factors)===null||t===void 0?void 0:t.filter(S=>S.status==="verified"))!==null&&i!==void 0?i:[]).length>0&&(b="aal2");const g=p.amr||[];return{data:{currentLevel:v,nextLevel:b,currentAuthenticationMethods:g},error:null}}catch(p){if(E(p))return this._returnResult({data:null,error:p});throw p}const{data:{session:n},error:o}=await this.getSession();if(o)return this._returnResult({data:null,error:o});if(!n)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=Et(n.access_token);let c=null;l.aal&&(c=l.aal);let d=c;((a=(r=n.user.factors)===null||r===void 0?void 0:r.filter(p=>p.status==="verified"))!==null&&a!==void 0?a:[]).length>0&&(d="aal2");const f=l.amr||[];return{data:{currentLevel:c,nextLevel:d,currentAuthenticationMethods:f},error:null}}async _getRecoveryCodesStatus(){st(this.experimental);try{return await this._useSession(async e=>{var t;const{data:i,error:r}=e;if(r)return this._returnResult({data:null,error:r});const{data:a,error:n}=await k(this.fetch,"GET",`${this.url}/factors/recovery-codes`,{headers:this.headers,jwt:(t=i==null?void 0:i.session)===null||t===void 0?void 0:t.access_token});return n?this._returnResult({data:null,error:n}):this._returnResult({data:a,error:null})})}catch(e){if(E(e))return this._returnResult({data:null,error:e});throw e}}async _generateRecoveryCodes(e){st(this.experimental);try{return await this._useSession(async t=>{var i;const{data:r,error:a}=t;if(a)return this._returnResult({data:null,error:a});const{data:n,error:o}=await k(this.fetch,"POST",`${this.url}/factors/recovery-codes`,{body:e!=null&&e.friendlyName?{friendly_name:e.friendlyName}:void 0,headers:this.headers,jwt:(i=r==null?void 0:r.session)===null||i===void 0?void 0:i.access_token});return o?this._returnResult({data:null,error:o}):this._returnResult({data:n,error:null})})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async _verifyRecoveryCode(e){st(this.experimental);const t=async()=>{try{return await this._useSession(async i=>{var r;const{data:a,error:n}=i;if(n)return this._returnResult({data:null,error:n});const{data:o,error:l}=await k(this.fetch,"POST",`${this.url}/factors/recovery-codes/verify`,{body:{code:e.code},headers:this.headers,jwt:(r=a==null?void 0:a.session)===null||r===void 0?void 0:r.access_token});if(l)return this._returnResult({data:null,error:l});const c=Object.assign({expires_at:Hi(o.expires_in)},o);return await this._saveSession(c),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",c),this._returnResult({data:o,error:null})})}catch(i){if(E(i))return this._returnResult({data:null,error:i});throw i}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,t):t()}async _regenerateRecoveryCodes(){st(this.experimental);try{return await this._useSession(async e=>{var t;const{data:i,error:r}=e;if(r)return this._returnResult({data:null,error:r});const{data:a,error:n}=await k(this.fetch,"POST",`${this.url}/factors/recovery-codes/regenerate`,{headers:this.headers,jwt:(t=i==null?void 0:i.session)===null||t===void 0?void 0:t.access_token});return n?this._returnResult({data:null,error:n}):this._returnResult({data:a,error:null})})}catch(e){if(E(e))return this._returnResult({data:null,error:e});throw e}}async _unenrollRecoveryCodes(){st(this.experimental);try{return await this._useSession(async e=>{var t;const{data:i,error:r}=e;if(r)return this._returnResult({data:null,error:r});const{data:a,error:n}=await k(this.fetch,"DELETE",`${this.url}/factors/recovery-codes`,{headers:this.headers,jwt:(t=i==null?void 0:i.session)===null||t===void 0?void 0:t.access_token});return n?this._returnResult({data:null,error:n}):this._returnResult({data:a,error:null})})}catch(e){if(E(e))return this._returnResult({data:null,error:e});throw e}}async _getAuthorizationDetails(e){try{return await this._useSession(async t=>{const{data:{session:i},error:r}=t;return r?this._returnResult({data:null,error:r}):i?await k(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:i.access_token,xform:a=>({data:a,error:null})}):this._returnResult({data:null,error:new Y})})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async _approveAuthorization(e,t){try{return await this._useSession(async i=>{const{data:{session:r},error:a}=i;if(a)return this._returnResult({data:null,error:a});if(!r)return this._returnResult({data:null,error:new Y});const n=await k(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:"approve"},xform:o=>({data:o,error:null})});return n.data&&n.data.redirect_url&&X()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(n.data.redirect_url),n})}catch(i){if(E(i))return this._returnResult({data:null,error:i});throw i}}async _denyAuthorization(e,t){try{return await this._useSession(async i=>{const{data:{session:r},error:a}=i;if(a)return this._returnResult({data:null,error:a});if(!r)return this._returnResult({data:null,error:new Y});const n=await k(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:r.access_token,body:{action:"deny"},xform:o=>({data:o,error:null})});return n.data&&n.data.redirect_url&&X()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(n.data.redirect_url),n})}catch(i){if(E(i))return this._returnResult({data:null,error:i});throw i}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:t},error:i}=e;return i?this._returnResult({data:null,error:i}):t?await k(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:t.access_token,xform:r=>({data:r,error:null})}):this._returnResult({data:null,error:new Y})})}catch(e){if(E(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async t=>{const{data:{session:i},error:r}=t;return r?this._returnResult({data:null,error:r}):i?(await k(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:i.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new Y})})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async fetchJwk(e,t={keys:[]}){let i=t.keys.find(o=>o.kid===e);if(i)return i;const r=Date.now();if(i=this.jwks.keys.find(o=>o.kid===e),i&&this.jwks_cached_at+hn>r)return i;const{data:a,error:n}=await k(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(n)throw n;return!a.keys||a.keys.length===0||(this.jwks=a,this.jwks_cached_at=r,i=a.keys.find(o=>o.kid===e),!i)?null:i}async getClaims(e,t={}){try{let i=e;if(!i){const{data:p,error:v}=await this.getSession();if(v||!p.session)return this._returnResult({data:null,error:v});i=p.session.access_token}const{header:r,payload:a,signature:n,raw:{header:o,payload:l}}=Et(i);if(!(t!=null&&t.allowExpired))try{Bn(a.exp)}catch(p){throw new Ft(p instanceof Error?p.message:"JWT validation failed")}const c=!r.alg||r.alg.startsWith("HS")||!r.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(r.kid,t!=null&&t.keys?{keys:t.keys}:t==null?void 0:t.jwks);if(!c){const{error:p}=await this.getUser(i);if(p)throw p;return{data:{claims:a,header:r,signature:n},error:null}}const d=Fn(r.alg),u=await crypto.subtle.importKey("jwk",c,d,!0,["verify"]);if(!await crypto.subtle.verify(d,u,n,bn(`${o}.${l}`)))throw new Ft("Invalid JWT signature");return{data:{claims:a,header:r,signature:n},error:null}}catch(i){if(E(i))return this._returnResult({data:null,error:i});throw i}}async signInWithPasskey(e){var t,i,r,a;try{if(!$t())return this._returnResult({data:null,error:new pe("Browser does not support WebAuthn",null)});const{data:n,error:o}=await this._startPasskeyAuthentication({options:{captchaToken:(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.captchaToken}});if(o||!n)return this._returnResult({data:null,error:o});const l=ri(n.options),c=(r=(i=e==null?void 0:e.options)===null||i===void 0?void 0:i.signal)!==null&&r!==void 0?r:ps.createNewAbortSignal(),{data:d,error:u}=await Qi({publicKey:l,signal:c,mediation:(a=e==null?void 0:e.options)===null||a===void 0?void 0:a.mediation});if(u||!d)return this._returnResult({data:null,error:u??new pe("WebAuthn ceremony failed",null)});const f=ni(d);return this._verifyPasskeyAuthentication({challengeId:n.challenge_id,credential:f})}catch(n){if(E(n))return this._returnResult({data:null,error:n});throw n}}async registerPasskey(e){var t,i;try{if(!$t())return this._returnResult({data:null,error:new pe("Browser does not support WebAuthn",null)});const{data:r,error:a}=await this._startPasskeyRegistration();if(a||!r)return this._returnResult({data:null,error:a});const n=ii(r.options),o=(i=(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.signal)!==null&&i!==void 0?i:ps.createNewAbortSignal(),{data:l,error:c}=await Ki({publicKey:n,signal:o});if(c||!l)return this._returnResult({data:null,error:c??new pe("WebAuthn ceremony failed",null)});const d=ai(l);return this._verifyPasskeyRegistration({challengeId:r.challenge_id,credential:d})}catch(r){if(E(r))return this._returnResult({data:null,error:r});throw r}}async _startPasskeyRegistration(){try{return await this._useSession(async e=>{const{data:{session:t},error:i}=e;if(i)return this._returnResult({data:null,error:i});if(!t)return this._returnResult({data:null,error:new Y});const{data:r,error:a}=await k(this.fetch,"POST",`${this.url}/passkeys/registration/options`,{headers:this.headers,jwt:t.access_token,body:{}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:r,error:null})})}catch(e){if(E(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyRegistration(e){try{return await this._useSession(async t=>{const{data:{session:i},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!i)return this._returnResult({data:null,error:new Y});const{data:a,error:n}=await k(this.fetch,"POST",`${this.url}/passkeys/registration/verify`,{headers:this.headers,jwt:i.access_token,body:{challenge_id:e.challengeId,credential:e.credential}});return n?this._returnResult({data:null,error:n}):this._returnResult({data:a,error:null})})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async _startPasskeyAuthentication(e){var t;try{const{data:i,error:r}=await k(this.fetch,"POST",`${this.url}/passkeys/authentication/options`,{headers:this.headers,body:{gotrue_meta_security:{captcha_token:(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.captchaToken}}});return r?this._returnResult({data:null,error:r}):this._returnResult({data:i,error:null})}catch(i){if(E(i))return this._returnResult({data:null,error:i});throw i}}async _verifyPasskeyAuthentication(e){try{const{data:t,error:i}=await k(this.fetch,"POST",`${this.url}/passkeys/authentication/verify`,{headers:this.headers,body:{challenge_id:e.challengeId,credential:e.credential},xform:ne});return i?this._returnResult({data:null,error:i}):(t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers("SIGNED_IN",t.session)),this._returnResult({data:t,error:null}))}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async _listPasskeys(){try{return await this._useSession(async e=>{const{data:{session:t},error:i}=e;if(i)return this._returnResult({data:null,error:i});if(!t)return this._returnResult({data:null,error:new Y});const{data:r,error:a}=await k(this.fetch,"GET",`${this.url}/passkeys`,{headers:this.headers,jwt:t.access_token,xform:n=>({data:n,error:null})});return a?this._returnResult({data:null,error:a}):this._returnResult({data:r,error:null})})}catch(e){if(E(e))return this._returnResult({data:null,error:e});throw e}}async _updatePasskey(e){try{return await this._useSession(async t=>{const{data:{session:i},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!i)return this._returnResult({data:null,error:new Y});const{data:a,error:n}=await k(this.fetch,"PATCH",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:i.access_token,body:{friendly_name:e.friendlyName}});return n?this._returnResult({data:null,error:n}):this._returnResult({data:a,error:null})})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}async _deletePasskey(e){try{return await this._useSession(async t=>{const{data:{session:i},error:r}=t;if(r)return this._returnResult({data:null,error:r});if(!i)return this._returnResult({data:null,error:new Y});const{error:a}=await k(this.fetch,"DELETE",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:i.access_token,noResolveJson:!0});return a?this._returnResult({data:null,error:a}):this._returnResult({data:null,error:null})})}catch(t){if(E(t))return this._returnResult({data:null,error:t});throw t}}}ht.nextInstanceID={};const oo=ht,lo="2.117.2";let at="",qt;if(typeof Deno<"u"){var es;at="deno",qt=(es=Deno.version)===null||es===void 0?void 0:es.deno}else if(typeof document<"u")at="web";else if(typeof navigator<"u"&&navigator.product==="ReactNative")at="react-native";else{var ts;at="node";const s=globalThis.process;qt=s==null||(ts=s.version)===null||ts===void 0?void 0:ts.replace(/^v/,"")}const Ji=[`runtime=${at}`];qt&&Ji.push(`runtime-version=${qt}`);const co={"X-Client-Info":`supabase-js/${lo}; ${Ji.join("; ")}`},uo={headers:co},ho={schema:"public"},po={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},go={},mo={enabled:!1,respectSamplingDecision:!0};function fo(s){if(!s||typeof s!="string")return null;const e=s.split("-");if(e.length!==4)return null;const[t,i,r,a]=e;if(t.length!==2||i.length!==32||r.length!==16||a.length!==2)return null;const n=/^[0-9a-f]+$/i;return!n.test(t)||!n.test(i)||!n.test(r)||!n.test(a)||i==="00000000000000000000000000000000"||r==="0000000000000000"?null:{version:t,traceId:i,parentId:r,traceFlags:a,isSampled:(parseInt(a,16)&1)===1}}function _o(s,e){if(!s||!e||e.length===0)return!1;let t;if(s instanceof URL)t=s;else try{t=new URL(s)}catch{return!1}for(const i of e)try{if(typeof i=="string"){if(yo(t.hostname,i))return!0}else if(i instanceof RegExp){if(i.test(t.hostname))return!0}else if(typeof i=="function"&&i(t))return!0}catch{continue}return!1}function yo(s,e){if(e===s)return!0;if(e.startsWith("*.")){const t=e.slice(2);if(s.endsWith(t)&&(s===t||s.endsWith("."+t)))return!0}return!1}function vo(s){const e=[];try{const t=new URL(s);e.push(t.hostname)}catch{}return e.push("*.supabase.co","*.supabase.in"),e.push("localhost","127.0.0.1","[::1]"),e}function pt(s){"@babel/helpers - typeof";return pt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},pt(s)}function bo(s,e){if(pt(s)!="object"||!s)return s;var t=s[Symbol.toPrimitive];if(t!==void 0){var i=t.call(s,e);if(pt(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(s)}function So(s){var e=bo(s,"string");return pt(e)=="symbol"?e:e+""}function wo(s,e,t){return(e=So(e))in s?Object.defineProperty(s,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):s[e]=t,s}function li(s,e){var t=Object.keys(s);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(s);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(s,r).enumerable})),t.push.apply(t,i)}return t}function G(s){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?li(Object(t),!0).forEach(function(i){wo(s,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(s,Object.getOwnPropertyDescriptors(t)):li(Object(t)).forEach(function(i){Object.defineProperty(s,i,Object.getOwnPropertyDescriptor(t,i))})}return s}const Co=s=>s?(...e)=>s(...e):(...e)=>fetch(...e),Ao=()=>Headers,Yi=s=>s.startsWith("sb_publishable_")||s.startsWith("sb_secret_"),Eo="sb_temp_",ci=new Set,To=s=>{var e,t;if(!s.startsWith("sb_")||Yi(s)||s.startsWith(Eo))return;const i=(e=(t=s.match(/^sb_[a-zA-Z0-9]+_/))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:"unknown";ci.has(i)||(ci.add(i),console.warn("@supabase/supabase-js: Unrecognized Supabase API key format. The client will proceed and send this key as-is; if you see authentication errors you may need to upgrade @supabase/supabase-js to a version that recognizes this key type."))},di=(s,e,t,i,r,a)=>{const n=Co(i),o=Ao(),l=(r==null?void 0:r.enabled)===!0,c=(r==null?void 0:r.respectSamplingDecision)!==!1,d=l?vo(e):null,u=!(a!=null&&a.omitApiKeyAsBearer&&Yi(s));return async(f,p)=>{const v=await t();let b=new o(p==null?void 0:p.headers);if(b.has("apikey")||b.set("apikey",s),!b.has("Authorization")){const _=v??(u?s:null);_&&b.set("Authorization",`Bearer ${_}`)}if(d){const _=ko(f,d,c);_&&(_.traceparent&&!b.has("traceparent")&&b.set("traceparent",_.traceparent),_.tracestate&&!b.has("tracestate")&&b.set("tracestate",_.tracestate),_.baggage&&!b.has("baggage")&&b.set("baggage",_.baggage))}return n(f,G(G({},p),{},{headers:b}))}};let ui=!1,hi=!1;function ko(s,e,t){const i=Cr();if(!i)return ui||(ui=!0,console.warn("@supabase/supabase-js: tracePropagation is enabled but the tracing runtime is not loaded, so trace headers will not be attached. Add `import '@supabase/supabase-js/tracing'` at your application entry point (requires the OpenTelemetry API package to be installed). The CDN/UMD build does not support trace propagation.")),null;if(!_o(typeof s=="string"||s instanceof URL?s:s.url,e))return null;const r=i();if(!r||!r.traceparent){var a;if(!(r==null||(a=r.carrierKeys)===null||a===void 0)&&a.length&&!hi){hi=!0;const n=r.carrierKeys.includes("sentry-trace")?" Sentry detected: set `propagateTraceparent: true` in Sentry.init() to emit it.":" Configure your tracing SDK to emit W3C trace context on outgoing requests.";console.warn(`@supabase/supabase-js: tracePropagation is enabled and a tracing SDK is active, but its propagator wrote [${r.carrierKeys.join(", ")}] and no W3C traceparent header, so trace headers will not be attached.`+n)}return null}if(t){const n=fo(r.traceparent);if(n&&!n.isSampled)return{traceparent:r.traceparent}}return r}function pi(s){return typeof s=="boolean"?{enabled:s}:s}function Ro(s){return s.endsWith("/")?s:s+"/"}let gi=!1;function Po(s){gi||typeof s!="object"||s===null||!("schema"in s)||s.schema===void 0||(gi=!0,console.warn(`@supabase/supabase-js: The "schema" option must be nested under "db", e.g. createClient(url, key, { db: { schema: 'myschema' } }). A top-level "schema" is ignored and queries go to the default schema.`))}function Lo(s,e){var t,i,r,a,n,o;const{db:l,auth:c,realtime:d,global:u}=s,{db:f,auth:p,realtime:v,global:b}=e,_=pi(s.tracePropagation),C=pi(e.tracePropagation),m={db:G(G({},f),l),auth:G(G({},p),c),realtime:G(G({},v),d),storage:{},global:G(G(G({},b),u),{},{headers:G(G({},(t=b==null?void 0:b.headers)!==null&&t!==void 0?t:{}),(i=u==null?void 0:u.headers)!==null&&i!==void 0?i:{})}),tracePropagation:{enabled:(r=(a=_==null?void 0:_.enabled)!==null&&a!==void 0?a:C==null?void 0:C.enabled)!==null&&r!==void 0?r:!1,respectSamplingDecision:(n=(o=_==null?void 0:_.respectSamplingDecision)!==null&&o!==void 0?o:C==null?void 0:C.respectSamplingDecision)!==null&&n!==void 0?n:!0},accessToken:async()=>""};return s.accessToken?m.accessToken=s.accessToken:delete m.accessToken,m}function Oo(s){const e=s==null?void 0:s.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(Ro(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var Io=class extends oo{constructor(s){super(s)}},xo=class{constructor(s,e,t){var i,r;this.supabaseUrl=s,this.supabaseKey=e;const a=Oo(s);if(!e)throw new Error("supabaseKey is required.");To(e),Po(t),this.realtimeUrl=new URL("realtime/v1",a),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",a),this.storageUrl=new URL("storage/v1",a),this.functionsUrl=new URL("functions/v1",a);const n=`sb-${a.hostname.split(".")[0]}-auth-token`,o={db:ho,realtime:go,auth:G(G({},po),{},{storageKey:n}),global:uo,tracePropagation:mo},l=Lo(t??{},o);if(this.settings=l,this.storageKey=(i=l.auth.storageKey)!==null&&i!==void 0?i:"",this.headers=(r=l.global.headers)!==null&&r!==void 0?r:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(d,u)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(u)} is not possible`)}});else{var c;this.auth=this._initSupabaseAuthClient((c=l.auth)!==null&&c!==void 0?c:{},this.headers,l.global.fetch)}this.fetch=di(e,s,this._getSessionToken.bind(this),l.global.fetch,l.tracePropagation),this.functionsFetch=di(e,s,this._getSessionToken.bind(this),l.global.fetch,l.tracePropagation,{omitApiKeyAsBearer:!0}),this.realtime=this._initRealtimeClient(G({headers:this.headers,accessToken:this._getAccessToken.bind(this),fetch:this.fetch},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(d=>this.realtime.setAuth(d)).catch(d=>console.warn("Failed to set initial Realtime auth token:",d)),this.rest=new Br(new URL("rest/v1",a).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit,retry:l.db.retry}),this.storage=new an(this.storageUrl.href,this.headers,this.fetch,t==null?void 0:t.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new kr(this.functionsUrl.href,{headers:this.headers,customFetch:this.functionsFetch})}from(s){return this.rest.from(s)}schema(s){return this.rest.schema(s)}getOpenApiSpec(){return this.rest.getOpenApiSpec()}rpc(s,e={},t={head:!1,get:!1,count:void 0}){return this.rest.rpc(s,e,t)}channel(s,e={config:{}}){return this.realtime.channel(s,e)}getChannels(){return this.realtime.getChannels()}removeChannel(s){return this.realtime.removeChannel(s)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getSessionToken(){var s=this,e,t;if(s.accessToken)return await s.accessToken();const{data:i}=await s.auth.getSession();return(e=(t=i.session)===null||t===void 0?void 0:t.access_token)!==null&&e!==void 0?e:null}async _getAccessToken(){var s=this,e;return(e=await s._getSessionToken())!==null&&e!==void 0?e:s.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:s,persistSession:e,detectSessionInUrl:t,storage:i,userStorage:r,storageKey:a,flowType:n,lock:o,debug:l,throwOnError:c,experimental:d,lockAcquireTimeout:u,skipAutoInitialize:f},p,v){const b={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Io({url:this.authUrl.href,headers:G(G({},b),p),storageKey:a,autoRefreshToken:s,persistSession:e,detectSessionInUrl:t,storage:i,userStorage:r,flowType:n,lock:o,debug:l,throwOnError:c,experimental:d,fetch:v,lockAcquireTimeout:u,skipAutoInitialize:f,hasCustomAuthorizationHeader:Object.keys(this.headers).some(_=>_.toLowerCase()==="authorization")})}_initRealtimeClient(s){return new Ra(this.realtimeUrl.href,G(G({},s),{},{params:G(G({},{apikey:this.supabaseKey}),s==null?void 0:s.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((s,e)=>{this._handleTokenChanged(s,"CLIENT",e==null?void 0:e.access_token)})}_handleTokenChanged(s,e,t){(s==="TOKEN_REFRESHED"||s==="SIGNED_IN"||s==="INITIAL_SESSION")&&this.changedAccessToken!==t?(this.changedAccessToken=t,this.realtime.setAuth(t)):s==="SIGNED_OUT"&&(this.realtime.setAuth(),e=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const Do=(s,e,t)=>new xo(s,e,t);function No(){if(typeof window<"u"||globalThis.Deno!==void 0)return!1;const s=globalThis.process;if(!s)return!1;const e=s.version;if(e==null)return!1;const t=e.match(/^v(\d+)\./);return t?parseInt(t[1],10)<=20:!1}No()&&console.warn("⚠️  Node.js 20 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 22 or later. For more information, visit: https://github.com/orgs/supabase/discussions/45715");const Mo="https://placeholder.supabase.co",Bo="placeholder_key",Xe=Do(Mo,Bo);async function Fo(s,e){const{data:t,error:i}=await Xe.auth.signInWithPassword({email:s,password:e});return{data:t,error:i}}async function Uo(s,e){const{data:t,error:i}=await Xe.auth.signUp({email:s,password:e});return{data:t,error:i}}async function jo(){const{error:s}=await Xe.auth.signOut();return{error:s}}async function $o(){const{data:s,error:e}=await Xe.auth.signInWithOAuth({provider:"google"});return{data:s,error:e}}async function Ot(){const{data:{session:s}}=await Xe.auth.getSession();return(s==null?void 0:s.user)||null}async function mi(s){const e=await Ot();if(!e)return null;const{data:t,error:i}=await Xe.from("user_profiles").upsert({id:e.id,xp:s.user.xp,level:s.user.level,streak:s.user.streak,last_active_date:s.user.lastActiveDate,achievements:s.user.achievements,completed_lessons:s.progress.completedLessons,quiz_scores:s.progress.quizScores,updated_at:new Date().toISOString()});return{data:t,error:i}}function Ho(){const s=document.getElementById("loginBtn"),e=document.getElementById("authModal"),t=document.getElementById("authForm"),i=document.getElementById("authToggleBtn"),r=document.getElementById("authToggleText"),a=document.getElementById("authModalTitle"),n=document.getElementById("authModalSubtitle"),o=document.getElementById("authSubmitBtn"),l=document.getElementById("authGoogleBtn"),c=document.getElementById("authError");if(!s||!e||!t)return;let d=!0;Ot().then(u=>{u&&ss(!0,u.email)}),s.addEventListener("click",async()=>{await Ot()?(await jo(),ss(!1)):e.classList.add("active")}),e.addEventListener("click",u=>{u.target===e&&(e.classList.remove("active"),c.style.display="none")}),i.addEventListener("click",()=>{d=!d,c.style.display="none",d?(a.textContent="Welcome Back",n.textContent="Login to save your streak and progress",o.textContent="Login",r.textContent="Don't have an account?",i.textContent="Sign Up"):(a.textContent="Create Account",n.textContent="Join LearnSalesforce today",o.textContent="Sign Up",r.textContent="Already have an account?",i.textContent="Login")}),t.addEventListener("submit",async u=>{u.preventDefault(),c.style.display="none",o.disabled=!0,o.textContent="Please wait...";const f=document.getElementById("authEmail").value,p=document.getElementById("authPassword").value;let v;d?v=await Fo(f,p):v=await Uo(f,p),o.disabled=!1,o.textContent=d?"Login":"Sign Up",v.error?(c.textContent=v.error.message,c.style.display="block"):(e.classList.remove("active"),ss(!0,f),await mi(D.state))}),l&&l.addEventListener("click",async()=>{c.style.display="none",l.disabled=!0,l.textContent="Please wait...";const u=await $o();l.disabled=!1,l.innerHTML=`
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px;">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      `,u.error&&(c.textContent=u.error.message,c.style.display="block")}),D.subscribe(async()=>{await Ot()&&await mi(D.state)})}function ss(s,e=""){const t=document.getElementById("loginBtn");if(s){const i=e.split("@")[0];t.textContent=`Logout (${i})`}else t.textContent="Login / Signup"}const qo="modulepreload",Wo=function(s){return"/"+s},fi={},We=function(e,t,i){let r=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),o=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));r=Promise.allSettled(t.map(l=>{if(l=Wo(l),l in fi)return;fi[l]=!0;const c=l.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const u=document.createElement("link");if(u.rel=c?"stylesheet":qo,c||(u.as="script"),u.crossOrigin="",u.href=l,o&&u.setAttribute("nonce",o),document.head.appendChild(u),c)return new Promise((f,p)=>{u.addEventListener("load",f),u.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function a(n){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=n,window.dispatchEvent(o),!o.defaultPrevented)throw n}return r.then(n=>{for(const o of n||[])o.status==="rejected"&&a(o.reason);return e().catch(a)})};var _i=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function zo(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var Xi={exports:{}};(function(s){var e=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=function(i){var r=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,a=0,n={},o={manual:i.Prism&&i.Prism.manual,disableWorkerMessageHandler:i.Prism&&i.Prism.disableWorkerMessageHandler,util:{encode:function m(g){return g instanceof l?new l(g.type,m(g.content),g.alias):Array.isArray(g)?g.map(m):g.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(m){return Object.prototype.toString.call(m).slice(8,-1)},objId:function(m){return m.__id||Object.defineProperty(m,"__id",{value:++a}),m.__id},clone:function m(g,S){S=S||{};var A,w;switch(o.util.type(g)){case"Object":if(w=o.util.objId(g),S[w])return S[w];A={},S[w]=A;for(var T in g)g.hasOwnProperty(T)&&(A[T]=m(g[T],S));return A;case"Array":return w=o.util.objId(g),S[w]?S[w]:(A=[],S[w]=A,g.forEach(function(M,P){A[P]=m(M,S)}),A);default:return g}},getLanguage:function(m){for(;m;){var g=r.exec(m.className);if(g)return g[1].toLowerCase();m=m.parentElement}return"none"},setLanguage:function(m,g){m.className=m.className.replace(RegExp(r,"gi"),""),m.classList.add("language-"+g)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(A){var m=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(A.stack)||[])[1];if(m){var g=document.getElementsByTagName("script");for(var S in g)if(g[S].src==m)return g[S]}return null}},isActive:function(m,g,S){for(var A="no-"+g;m;){var w=m.classList;if(w.contains(g))return!0;if(w.contains(A))return!1;m=m.parentElement}return!!S}},languages:{plain:n,plaintext:n,text:n,txt:n,extend:function(m,g){var S=o.util.clone(o.languages[m]);for(var A in g)S[A]=g[A];return S},insertBefore:function(m,g,S,A){A=A||o.languages;var w=A[m],T={};for(var M in w)if(w.hasOwnProperty(M)){if(M==g)for(var P in S)S.hasOwnProperty(P)&&(T[P]=S[P]);S.hasOwnProperty(M)||(T[M]=w[M])}var W=A[m];return A[m]=T,o.languages.DFS(o.languages,function(Q,ge){ge===W&&Q!=m&&(this[Q]=T)}),T},DFS:function m(g,S,A,w){w=w||{};var T=o.util.objId;for(var M in g)if(g.hasOwnProperty(M)){S.call(g,M,g[M],A||M);var P=g[M],W=o.util.type(P);W==="Object"&&!w[T(P)]?(w[T(P)]=!0,m(P,S,null,w)):W==="Array"&&!w[T(P)]&&(w[T(P)]=!0,m(P,S,M,w))}}},plugins:{},highlightAll:function(m,g){o.highlightAllUnder(document,m,g)},highlightAllUnder:function(m,g,S){var A={callback:S,container:m,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};o.hooks.run("before-highlightall",A),A.elements=Array.prototype.slice.apply(A.container.querySelectorAll(A.selector)),o.hooks.run("before-all-elements-highlight",A);for(var w=0,T;T=A.elements[w++];)o.highlightElement(T,g===!0,A.callback)},highlightElement:function(m,g,S){var A=o.util.getLanguage(m),w=o.languages[A];o.util.setLanguage(m,A);var T=m.parentElement;T&&T.nodeName.toLowerCase()==="pre"&&o.util.setLanguage(T,A);var M=m.textContent,P={element:m,language:A,grammar:w,code:M};function W(ge){P.highlightedCode=ge,o.hooks.run("before-insert",P),P.element.innerHTML=P.highlightedCode,o.hooks.run("after-highlight",P),o.hooks.run("complete",P),S&&S.call(P.element)}if(o.hooks.run("before-sanity-check",P),T=P.element.parentElement,T&&T.nodeName.toLowerCase()==="pre"&&!T.hasAttribute("tabindex")&&T.setAttribute("tabindex","0"),!P.code){o.hooks.run("complete",P),S&&S.call(P.element);return}if(o.hooks.run("before-highlight",P),!P.grammar){W(o.util.encode(P.code));return}if(g&&i.Worker){var Q=new Worker(o.filename);Q.onmessage=function(ge){W(ge.data)},Q.postMessage(JSON.stringify({language:P.language,code:P.code,immediateClose:!0}))}else W(o.highlight(P.code,P.grammar,P.language))},highlight:function(m,g,S){var A={code:m,grammar:g,language:S};if(o.hooks.run("before-tokenize",A),!A.grammar)throw new Error('The language "'+A.language+'" has no grammar.');return A.tokens=o.tokenize(A.code,A.grammar),o.hooks.run("after-tokenize",A),l.stringify(o.util.encode(A.tokens),A.language)},tokenize:function(m,g){var S=g.rest;if(S){for(var A in S)g[A]=S[A];delete g.rest}var w=new u;return f(w,w.head,m),d(m,w,g,w.head,0),v(w)},hooks:{all:{},add:function(m,g){var S=o.hooks.all;S[m]=S[m]||[],S[m].push(g)},run:function(m,g){var S=o.hooks.all[m];if(!(!S||!S.length))for(var A=0,w;w=S[A++];)w(g)}},Token:l};i.Prism=o;function l(m,g,S,A){this.type=m,this.content=g,this.alias=S,this.length=(A||"").length|0}l.stringify=function m(g,S){if(typeof g=="string")return g;if(Array.isArray(g)){var A="";return g.forEach(function(W){A+=m(W,S)}),A}var w={type:g.type,content:m(g.content,S),tag:"span",classes:["token",g.type],attributes:{},language:S},T=g.alias;T&&(Array.isArray(T)?Array.prototype.push.apply(w.classes,T):w.classes.push(T)),o.hooks.run("wrap",w);var M="";for(var P in w.attributes)M+=" "+P+'="'+(w.attributes[P]||"").replace(/"/g,"&quot;")+'"';return"<"+w.tag+' class="'+w.classes.join(" ")+'"'+M+">"+w.content+"</"+w.tag+">"};function c(m,g,S,A){m.lastIndex=g;var w=m.exec(S);if(w&&A&&w[1]){var T=w[1].length;w.index+=T,w[0]=w[0].slice(T)}return w}function d(m,g,S,A,w,T){for(var M in S)if(!(!S.hasOwnProperty(M)||!S[M])){var P=S[M];P=Array.isArray(P)?P:[P];for(var W=0;W<P.length;++W){if(T&&T.cause==M+","+W)return;var Q=P[W],ge=Q.inside,mt=!!Q.lookbehind,Ze=!!Q.greedy,et=Q.alias;if(Ze&&!Q.pattern.global){var ft=Q.pattern.toString().match(/[imsuy]*$/)[0];Q.pattern=RegExp(Q.pattern.source,ft+"g")}for(var _t=Q.pattern||Q,J=A.next,ae=w;J!==g.tail&&!(T&&ae>=T.reach);ae+=J.value.length,J=J.next){var y=J.value;if(g.length>m.length)return;if(!(y instanceof l)){var h=1,R;if(Ze){if(R=c(_t,ae,m,mt),!R||R.index>=m.length)break;var B=R.index,x=R.index+R[0].length,I=ae;for(I+=J.value.length;B>=I;)J=J.next,I+=J.value.length;if(I-=J.value.length,ae=I,J.value instanceof l)continue;for(var N=J;N!==g.tail&&(I<x||typeof N.value=="string");N=N.next)h++,I+=N.value.length;h--,y=m.slice(ae,I),R.index-=ae}else if(R=c(_t,0,y,mt),!R)continue;var B=R.index,O=R[0],F=y.slice(0,B),$=y.slice(B+O.length),H=ae+y.length;T&&H>T.reach&&(T.reach=H);var j=J.prev;F&&(j=f(g,j,F),ae+=F.length),p(g,j,h);var z=new l(M,ge?o.tokenize(O,ge):O,et,O);if(J=f(g,j,z),$&&f(g,J,$),h>1){var V={cause:M+","+W,reach:H};d(m,g,S,J.prev,ae,V),T&&V.reach>T.reach&&(T.reach=V.reach)}}}}}}function u(){var m={value:null,prev:null,next:null},g={value:null,prev:m,next:null};m.next=g,this.head=m,this.tail=g,this.length=0}function f(m,g,S){var A=g.next,w={value:S,prev:g,next:A};return g.next=w,A.prev=w,m.length++,w}function p(m,g,S){for(var A=g.next,w=0;w<S&&A!==m.tail;w++)A=A.next;g.next=A,A.prev=g,m.length-=w}function v(m){for(var g=[],S=m.head.next;S!==m.tail;)g.push(S.value),S=S.next;return g}if(!i.document)return i.addEventListener&&(o.disableWorkerMessageHandler||i.addEventListener("message",function(m){var g=JSON.parse(m.data),S=g.language,A=g.code,w=g.immediateClose;i.postMessage(o.highlight(A,o.languages[S],S)),w&&i.close()},!1)),o;var b=o.util.currentScript();b&&(o.filename=b.src,b.hasAttribute("data-manual")&&(o.manual=!0));function _(){o.manual||o.highlightAll()}if(!o.manual){var C=document.readyState;C==="loading"||C==="interactive"&&b&&b.defer?document.addEventListener("DOMContentLoaded",_):window.requestAnimationFrame?window.requestAnimationFrame(_):window.setTimeout(_,16)}return o}(e);s.exports&&(s.exports=t),typeof _i<"u"&&(_i.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(i){i.type==="entity"&&(i.attributes.title=i.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(r,a){var n={};n["language-"+a]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[a]},n.cdata=/^<!\[CDATA\[|\]\]>$/i;var o={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:n}};o["language-"+a]={pattern:/[\s\S]+/,inside:t.languages[a]};var l={};l[r]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return r}),"i"),lookbehind:!0,greedy:!0,inside:o},t.languages.insertBefore("markup","cdata",l)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(i,r){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+i+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[r,"language-"+r],inside:t.languages[r]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,function(i){var r=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;i.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+r.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+r.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+r.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+r.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:r,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},i.languages.css.atrule.inside.rest=i.languages.css;var a=i.languages.markup;a&&(a.tag.addInlined("style","css"),a.tag.addAttribute("style","css"))}(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var i="Loading…",r=function(b,_){return"✖ Error "+b+" while fetching file: "+_},a="✖ Error: File does not exist or is empty",n={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},o="data-src-status",l="loading",c="loaded",d="failed",u="pre[data-src]:not(["+o+'="'+c+'"]):not(['+o+'="'+l+'"])';function f(b,_,C){var m=new XMLHttpRequest;m.open("GET",b,!0),m.onreadystatechange=function(){m.readyState==4&&(m.status<400&&m.responseText?_(m.responseText):m.status>=400?C(r(m.status,m.statusText)):C(a))},m.send(null)}function p(b){var _=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(b||"");if(_){var C=Number(_[1]),m=_[2],g=_[3];return m?g?[C,Number(g)]:[C,void 0]:[C,C]}}t.hooks.add("before-highlightall",function(b){b.selector+=", "+u}),t.hooks.add("before-sanity-check",function(b){var _=b.element;if(_.matches(u)){b.code="",_.setAttribute(o,l);var C=_.appendChild(document.createElement("CODE"));C.textContent=i;var m=_.getAttribute("data-src"),g=b.language;if(g==="none"){var S=(/\.(\w+)$/.exec(m)||[,"none"])[1];g=n[S]||S}t.util.setLanguage(C,g),t.util.setLanguage(_,g);var A=t.plugins.autoloader;A&&A.loadLanguages(g),f(m,function(w){_.setAttribute(o,c);var T=p(_.getAttribute("data-range"));if(T){var M=w.split(/\r\n?|\n/g),P=T[0],W=T[1]==null?M.length:T[1];P<0&&(P+=M.length),P=Math.max(0,Math.min(P-1,M.length)),W<0&&(W+=M.length),W=Math.max(0,Math.min(W,M.length)),w=M.slice(P,W).join(`
`),_.hasAttribute("data-start")||_.setAttribute("data-start",String(P+1))}C.textContent=w,t.highlightElement(C)},function(w){_.setAttribute(o,d),C.textContent=w})}}),t.plugins.fileHighlight={highlight:function(_){for(var C=(_||document).querySelectorAll(u),m=0,g;g=C[m++];)t.highlightElement(g)}};var v=!1;t.fileHighlight=function(){v||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),v=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}}()})(Xi);var Go=Xi.exports;const Te=zo(Go);(function(s){var e=/\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,t="(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*",i={pattern:RegExp("(^|[^\\w.])"+t+"[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b"),lookbehind:!0,inside:{namespace:{pattern:/^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,inside:{punctuation:/\./}},punctuation:/\./}};s.languages.java=s.languages.extend("clike",{string:{pattern:/(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,lookbehind:!0,greedy:!0},"class-name":[i,{pattern:RegExp("(^|[^\\w.])"+t+"[A-Z]\\w*(?=\\s+\\w+\\s*[;,=()]|\\s*(?:\\[[\\s,]*\\]\\s*)?::\\s*new\\b)"),lookbehind:!0,inside:i.inside},{pattern:RegExp("(\\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\\s+)"+t+"[A-Z]\\w*\\b"),lookbehind:!0,inside:i.inside}],keyword:e,function:[s.languages.clike.function,{pattern:/(::\s*)[a-z_]\w*/,lookbehind:!0}],number:/\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,operator:{pattern:/(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,lookbehind:!0},constant:/\b[A-Z][A-Z_\d]+\b/}),s.languages.insertBefore("java","string",{"triple-quoted-string":{pattern:/"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,greedy:!0,alias:"string"},char:{pattern:/'(?:\\.|[^'\\\r\n]){1,6}'/,greedy:!0}}),s.languages.insertBefore("java","class-name",{annotation:{pattern:/(^|[^.])@\w+(?:\s*\.\s*\w+)*/,lookbehind:!0,alias:"punctuation"},generics:{pattern:/<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,inside:{"class-name":i,keyword:e,punctuation:/[<>(),.:]/,operator:/[?&|]/}},import:[{pattern:RegExp("(\\bimport\\s+)"+t+"(?:[A-Z]\\w*|\\*)(?=\\s*;)"),lookbehind:!0,inside:{namespace:i.inside.namespace,punctuation:/\./,operator:/\*/,"class-name":/\w+/}},{pattern:RegExp("(\\bimport\\s+static\\s+)"+t+"(?:\\w+|\\*)(?=\\s*;)"),lookbehind:!0,alias:"static",inside:{namespace:i.inside.namespace,static:/\b\w+$/,punctuation:/\./,operator:/\*/,"class-name":/\w+/}}],namespace:{pattern:RegExp("(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?".replace(/<keyword>/g,function(){return e.source})),lookbehind:!0,inside:{punctuation:/\./}}})})(Prism);Prism.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity,Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup,Prism.hooks.add("wrap",function(s){s.type==="entity"&&(s.attributes.title=s.content.replace(/&amp;/,"&"))}),Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(s,e){var t={};t["language-"+e]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[e]},t.cdata=/^<!\[CDATA\[|\]\]>$/i;var i={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:t}};i["language-"+e]={pattern:/[\s\S]+/,inside:Prism.languages[e]};var r={};r[s]={pattern:RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g,function(){return s}),"i"),lookbehind:!0,greedy:!0,inside:i},Prism.languages.insertBefore("markup","cdata",r)}}),Object.defineProperty(Prism.languages.markup.tag,"addAttribute",{value:function(s,e){Prism.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(`(^|["'\\s])(?:`+s+`)\\s*=\\s*(?:"[^"]*"|'[^']*'|[^\\s'">=]+(?=[\\s>]))`,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:Prism.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup,Prism.languages.xml=Prism.languages.extend("markup",{}),Prism.languages.ssml=Prism.languages.xml,Prism.languages.atom=Prism.languages.xml,Prism.languages.rss=Prism.languages.xml;(function(s){var e=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;s.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp(`@[\\w-](?:[^;{\\s"']|\\s+(?!\\s)|`+e.source+")*?(?:;|(?=\\s*\\{))"),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+e.source+`|(?:[^\\\\\r
()"']|\\\\[^])*)\\)`,"i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+e.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+e.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:e,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},s.languages.css.atrule.inside.rest=s.languages.css;var t=s.languages.markup;t&&(t.tag.addInlined("style","css"),t.tag.addAttribute("style","css"))})(Prism);Prism.languages.json={property:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,lookbehind:!0,greedy:!0},string:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,lookbehind:!0,greedy:!0},comment:{pattern:/\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},number:/-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,punctuation:/[{}[\],]/,operator:/:/,boolean:/\b(?:false|true)\b/,null:{pattern:/\bnull\b/,alias:"keyword"}},Prism.languages.webmanifest=Prism.languages.json;Prism.languages.sql={comment:{pattern:/(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,lookbehind:!0},variable:[{pattern:/@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,greedy:!0},/@[\w.$]+/],string:{pattern:/(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,greedy:!0,lookbehind:!0},identifier:{pattern:/(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,greedy:!0,lookbehind:!0,inside:{punctuation:/^`|`$/}},function:/\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,keyword:/\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,boolean:/\b(?:FALSE|NULL|TRUE)\b/i,number:/\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,operator:/[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,punctuation:/[;[\]()`,.]/};Te.languages.apex=Te.languages.extend("java",{keyword:/\b(?:abstract|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|get|global|if|implements|import|insert|instanceof|interface|long|new|null|override|package|private|protected|public|return|set|short|static|super|switch|testMethod|this|throw|throws|transient|trigger|try|update|upsert|delete|undelete|virtual|void|webService|while|with\s+sharing|without\s+sharing|inherited\s+sharing)\b/,annotation:{pattern:/@\w+/,alias:"builtin"},"soql-keyword":{pattern:/\b(?:SELECT|FROM|WHERE|AND|OR|NOT|IN|LIKE|ORDER\s+BY|GROUP\s+BY|HAVING|LIMIT|OFFSET|ASC|DESC|NULLS\s+FIRST|NULLS\s+LAST|COUNT|SUM|AVG|MIN|MAX|INCLUDES|EXCLUDES|TYPEOF|USING\s+SCOPE|WITH)\b/i,alias:"keyword"}});Te.languages.lwc=Te.languages.extend("markup",{"lwc-directive":{pattern:/\b(?:lwc:if|lwc:elseif|lwc:else|for:each|for:item|for:index|iterator:\w+|key|lwc:dom|lwc:ref|lwc:spread)\b/,alias:"attr-name"}});Te.languages.soql={keyword:/\b(?:SELECT|FROM|WHERE|AND|OR|NOT|IN|LIKE|ORDER\s+BY|GROUP\s+BY|HAVING|LIMIT|OFFSET|ASC|DESC|NULLS\s+FIRST|NULLS\s+LAST|INCLUDES|EXCLUDES|TYPEOF|USING\s+SCOPE|WITH|ROLLUP|CUBE|FOR\s+UPDATE|FOR\s+REFERENCE|FOR\s+VIEW|ALL\s+ROWS|YESTERDAY|TODAY|TOMORROW|LAST_WEEK|THIS_WEEK|NEXT_WEEK|LAST_MONTH|THIS_MONTH|NEXT_MONTH|LAST_90_DAYS|NEXT_90_DAYS|LAST_N_DAYS|NEXT_N_DAYS|THIS_QUARTER|LAST_QUARTER|NEXT_QUARTER|THIS_YEAR|LAST_YEAR|NEXT_YEAR|THIS_FISCAL_QUARTER|LAST_FISCAL_QUARTER|NEXT_FISCAL_QUARTER|THIS_FISCAL_YEAR|LAST_FISCAL_YEAR|NEXT_FISCAL_YEAR)\b/i,function:/\b(?:COUNT|SUM|AVG|MIN|MAX|COUNT_DISTINCT|CALENDAR_MONTH|CALENDAR_YEAR|DAY_IN_MONTH|DAY_IN_WEEK|DAY_IN_YEAR|DAY_ONLY|FISCAL_MONTH|FISCAL_QUARTER|FISCAL_YEAR|HOUR_IN_DAY|WEEK_IN_MONTH|WEEK_IN_YEAR|convertTimezone|toLabel|FORMAT)\b/i,string:/'[^']*'/,number:/\b\d+\.?\d*\b/,operator:/[=<>!]+/,punctuation:/[(),.:]/};function Zi(s,e="apex"){const t=e.toLowerCase(),i=Te.languages[t]||Te.languages.plain||Te.languages.markup;try{return Te.highlight(s.trim(),i,t)}catch{return Vo(s.trim())}}function Vo(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var ys={};(function s(e,t,i,r){var a=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),n=typeof Path2D=="function"&&typeof DOMMatrix=="function",o=function(){if(!e.OffscreenCanvas)return!1;try{var y=new OffscreenCanvas(1,1),h=y.getContext("2d");h.fillRect(0,0,1,1);var R=y.transferToImageBitmap();h.createPattern(R,"no-repeat")}catch{return!1}return!0}();function l(){}function c(y){var h=t.exports.Promise,R=h!==void 0?h:e.Promise;return typeof R=="function"?new R(y):(y(l,l),null)}var d=function(y,h){return{transform:function(R){if(y)return R;if(h.has(R))return h.get(R);var x=new OffscreenCanvas(R.width,R.height),I=x.getContext("2d");return I.drawImage(R,0,0),h.set(R,x),x},clear:function(){h.clear()}}}(o,new Map),u=function(){var y=Math.floor(16.666666666666668),h,R,x={},I=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(h=function(N){var B=Math.random();return x[B]=requestAnimationFrame(function O(F){I===F||I+y-1<F?(I=F,delete x[B],N()):x[B]=requestAnimationFrame(O)}),B},R=function(N){x[N]&&cancelAnimationFrame(x[N])}):(h=function(N){return setTimeout(N,y)},R=function(N){return clearTimeout(N)}),{frame:h,cancel:R}}(),f=function(){var y,h,R={};function x(I){function N(B,O){I.postMessage({options:B||{},callback:O})}I.init=function(O){var F=O.transferControlToOffscreen();I.postMessage({canvas:F},[F])},I.fire=function(O,F,$){if(h)return N(O,null),h;var H=Math.random().toString(36).slice(2);return h=c(function(j){function z(V){V.data.callback===H&&(delete R[H],I.removeEventListener("message",z),h=null,d.clear(),$(),j())}I.addEventListener("message",z),N(O,H),R[H]=z.bind(null,{data:{callback:H}})}),h},I.reset=function(){I.postMessage({reset:!0});for(var O in R)R[O](),delete R[O]}}return function(){if(y)return y;if(!i&&a){var I=["var CONFETTI, SIZE = {}, module = {};","("+s.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{y=new Worker(URL.createObjectURL(new Blob([I])))}catch(N){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",N),null}x(y)}return y}}(),p={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function v(y,h){return h?h(y):y}function b(y){return y!=null}function _(y,h,R){return v(y&&b(y[h])?y[h]:p[h],R)}function C(y){return y<0?0:Math.floor(y)}function m(y,h){return Math.floor(Math.random()*(h-y))+y}function g(y){return parseInt(y,16)}function S(y){return y.map(A)}function A(y){var h=String(y).replace(/[^0-9a-f]/gi,"");return h.length<6&&(h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2]),{r:g(h.substring(0,2)),g:g(h.substring(2,4)),b:g(h.substring(4,6))}}function w(y){var h=_(y,"origin",Object);return h.x=_(h,"x",Number),h.y=_(h,"y",Number),h}function T(y){y.width=document.documentElement.clientWidth,y.height=document.documentElement.clientHeight}function M(y){var h=y.getBoundingClientRect();y.width=h.width,y.height=h.height}function P(y){var h=document.createElement("canvas");return h.style.position="fixed",h.style.top="0px",h.style.left="0px",h.style.pointerEvents="none",h.style.zIndex=y,h}function W(y,h,R,x,I,N,B,O,F){y.save(),y.translate(h,R),y.rotate(N),y.scale(x,I),y.arc(0,0,1,B,O,F),y.restore()}function Q(y){var h=y.angle*(Math.PI/180),R=y.spread*(Math.PI/180);return{x:y.x,y:y.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:y.startVelocity*.5+Math.random()*y.startVelocity,angle2D:-h+(.5*R-Math.random()*R),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:y.color,shape:y.shape,tick:0,totalTicks:y.ticks,decay:y.decay,drift:y.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:y.gravity*3,ovalScalar:.6,scalar:y.scalar,flat:y.flat}}function ge(y,h){h.x+=Math.cos(h.angle2D)*h.velocity+h.drift,h.y+=Math.sin(h.angle2D)*h.velocity+h.gravity,h.velocity*=h.decay,h.flat?(h.wobble=0,h.wobbleX=h.x+10*h.scalar,h.wobbleY=h.y+10*h.scalar,h.tiltSin=0,h.tiltCos=0,h.random=1):(h.wobble+=h.wobbleSpeed,h.wobbleX=h.x+10*h.scalar*Math.cos(h.wobble),h.wobbleY=h.y+10*h.scalar*Math.sin(h.wobble),h.tiltAngle+=.1,h.tiltSin=Math.sin(h.tiltAngle),h.tiltCos=Math.cos(h.tiltAngle),h.random=Math.random()+2);var R=h.tick++/h.totalTicks,x=h.x+h.random*h.tiltCos,I=h.y+h.random*h.tiltSin,N=h.wobbleX+h.random*h.tiltCos,B=h.wobbleY+h.random*h.tiltSin;if(y.fillStyle="rgba("+h.color.r+", "+h.color.g+", "+h.color.b+", "+(1-R)+")",y.beginPath(),n&&h.shape.type==="path"&&typeof h.shape.path=="string"&&Array.isArray(h.shape.matrix))y.fill(_t(h.shape.path,h.shape.matrix,h.x,h.y,Math.abs(N-x)*.1,Math.abs(B-I)*.1,Math.PI/10*h.wobble));else if(h.shape.type==="bitmap"){var O=Math.PI/10*h.wobble,F=Math.abs(N-x)*.1,$=Math.abs(B-I)*.1,H=h.shape.bitmap.width*h.scalar,j=h.shape.bitmap.height*h.scalar,z=new DOMMatrix([Math.cos(O)*F,Math.sin(O)*F,-Math.sin(O)*$,Math.cos(O)*$,h.x,h.y]);z.multiplySelf(new DOMMatrix(h.shape.matrix));var V=y.createPattern(d.transform(h.shape.bitmap),"no-repeat");V.setTransform(z),y.globalAlpha=1-R,y.fillStyle=V,y.fillRect(h.x-H/2,h.y-j/2,H,j),y.globalAlpha=1}else if(h.shape==="circle")y.ellipse?y.ellipse(h.x,h.y,Math.abs(N-x)*h.ovalScalar,Math.abs(B-I)*h.ovalScalar,Math.PI/10*h.wobble,0,2*Math.PI):W(y,h.x,h.y,Math.abs(N-x)*h.ovalScalar,Math.abs(B-I)*h.ovalScalar,Math.PI/10*h.wobble,0,2*Math.PI);else if(h.shape==="star")for(var U=Math.PI/2*3,ee=4*h.scalar,ce=8*h.scalar,de=h.x,ve=h.y,Le=5,me=Math.PI/Le;Le--;)de=h.x+Math.cos(U)*ce,ve=h.y+Math.sin(U)*ce,y.lineTo(de,ve),U+=me,de=h.x+Math.cos(U)*ee,ve=h.y+Math.sin(U)*ee,y.lineTo(de,ve),U+=me;else y.moveTo(Math.floor(h.x),Math.floor(h.y)),y.lineTo(Math.floor(h.wobbleX),Math.floor(I)),y.lineTo(Math.floor(N),Math.floor(B)),y.lineTo(Math.floor(x),Math.floor(h.wobbleY));return y.closePath(),y.fill(),h.tick<h.totalTicks}function mt(y,h,R,x,I){var N=h.slice(),B=y.getContext("2d"),O,F,$=c(function(H){function j(){O=F=null,B.clearRect(0,0,x.width,x.height),d.clear(),I(),H()}function z(){i&&!(x.width===r.width&&x.height===r.height)&&(x.width=y.width=r.width,x.height=y.height=r.height),!x.width&&!x.height&&(R(y),x.width=y.width,x.height=y.height),B.clearRect(0,0,x.width,x.height),N=N.filter(function(V){return ge(B,V)}),N.length?O=u.frame(z):j()}O=u.frame(z),F=j});return{addFettis:function(H){return N=N.concat(H),$},canvas:y,promise:$,reset:function(){O&&u.cancel(O),F&&F()}}}function Ze(y,h){var R=!y,x=!!_(h||{},"resize"),I=!1,N=_(h,"disableForReducedMotion",Boolean),B=a&&!!_(h||{},"useWorker"),O=B?f():null,F=R?T:M,$=y&&O?!!y.__confetti_initialized:!1,H=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,j;function z(U,ee,ce){for(var de=_(U,"particleCount",C),ve=_(U,"angle",Number),Le=_(U,"spread",Number),me=_(U,"startVelocity",Number),rr=_(U,"decay",Number),ar=_(U,"gravity",Number),nr=_(U,"drift",Number),vs=_(U,"colors",S),or=_(U,"ticks",Number),bs=_(U,"shapes"),lr=_(U,"scalar"),cr=!!_(U,"flat"),Ss=w(U),ws=de,Qt=[],dr=y.width*Ss.x,ur=y.height*Ss.y;ws--;)Qt.push(Q({x:dr,y:ur,angle:ve,spread:Le,startVelocity:me,color:vs[ws%vs.length],shape:bs[m(0,bs.length)],ticks:or,decay:rr,gravity:ar,drift:nr,scalar:lr,flat:cr}));return j?j.addFettis(Qt):(j=mt(y,Qt,F,ee,ce),j.promise)}function V(U){var ee=N||_(U,"disableForReducedMotion",Boolean),ce=_(U,"zIndex",Number);if(ee&&H)return c(function(me){me()});R&&j?y=j.canvas:R&&!y&&(y=P(ce),document.body.appendChild(y)),x&&!$&&F(y);var de={width:y.width,height:y.height};O&&!$&&O.init(y),$=!0,O&&(y.__confetti_initialized=!0);function ve(){if(O){var me={getBoundingClientRect:function(){if(!R)return y.getBoundingClientRect()}};F(me),O.postMessage({resize:{width:me.width,height:me.height}});return}de.width=de.height=null}function Le(){j=null,x&&(I=!1,e.removeEventListener("resize",ve)),R&&y&&(document.body.contains(y)&&document.body.removeChild(y),y=null,$=!1)}return x&&!I&&(I=!0,e.addEventListener("resize",ve,!1)),O?O.fire(U,de,Le):z(U,de,Le)}return V.reset=function(){O&&O.reset(),j&&j.reset()},V}var et;function ft(){return et||(et=Ze(null,{useWorker:!0,resize:!0})),et}function _t(y,h,R,x,I,N,B){var O=new Path2D(y),F=new Path2D;F.addPath(O,new DOMMatrix(h));var $=new Path2D;return $.addPath(F,new DOMMatrix([Math.cos(B)*I,Math.sin(B)*I,-Math.sin(B)*N,Math.cos(B)*N,R,x])),$}function J(y){if(!n)throw new Error("path confetti are not supported in this browser");var h,R;typeof y=="string"?h=y:(h=y.path,R=y.matrix);var x=new Path2D(h),I=document.createElement("canvas"),N=I.getContext("2d");if(!R){for(var B=1e3,O=B,F=B,$=0,H=0,j,z,V=0;V<B;V+=2)for(var U=0;U<B;U+=2)N.isPointInPath(x,V,U,"nonzero")&&(O=Math.min(O,V),F=Math.min(F,U),$=Math.max($,V),H=Math.max(H,U));j=$-O,z=H-F;var ee=10,ce=Math.min(ee/j,ee/z);R=[ce,0,0,ce,-Math.round(j/2+O)*ce,-Math.round(z/2+F)*ce]}return{type:"path",path:h,matrix:R}}function ae(y){var h,R=1,x="#000000",I='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof y=="string"?h=y:(h=y.text,R="scalar"in y?y.scalar:R,I="fontFamily"in y?y.fontFamily:I,x="color"in y?y.color:x);var N=10*R,B=""+N+"px "+I,O=new OffscreenCanvas(N,N),F=O.getContext("2d");F.font=B;var $=F.measureText(h),H=Math.ceil($.actualBoundingBoxRight+$.actualBoundingBoxLeft),j=Math.ceil($.actualBoundingBoxAscent+$.actualBoundingBoxDescent),z=2,V=$.actualBoundingBoxLeft+z,U=$.actualBoundingBoxAscent+z;H+=z+z,j+=z+z,O=new OffscreenCanvas(H,j),F=O.getContext("2d"),F.font=B,F.fillStyle=x,F.fillText(h,V,U);var ee=1/R;return{type:"bitmap",bitmap:O.transferToImageBitmap(),matrix:[ee,0,0,ee,-H*ee/2,-j*ee/2]}}t.exports=function(){return ft().apply(this,arguments)},t.exports.reset=function(){ft().reset()},t.exports.create=Ze,t.exports.shapeFromPath=J,t.exports.shapeFromText=ae})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),ys,!1);const gs=ys.exports;ys.exports.create;function er(){const e=Date.now()+2e3,t=()=>{gs({particleCount:3,angle:60,spread:55,origin:{x:0,y:.7},colors:["#00a1e0","#7c3aed","#22c55e","#f59e0b"]}),gs({particleCount:3,angle:120,spread:55,origin:{x:1,y:.7},colors:["#00a1e0","#7c3aed","#22c55e","#f59e0b"]}),Date.now()<e&&requestAnimationFrame(t)};t()}function Ko(){gs({particleCount:100,spread:70,origin:{y:.6},colors:["#ffd700","#ffec8b","#f59e0b","#7c3aed"]})}function tr(s){const e=document.getElementById("achievementToast"),t=document.getElementById("achievementIcon"),i=document.getElementById("achievementTitle"),r=document.getElementById("achievementDesc");!e||!t||!i||!r||(t.textContent=s.icon,i.textContent="Achievement Unlocked!",r.textContent=`${s.name} — ${s.desc}`,e.classList.add("achievement-toast--visible"),Ko(),setTimeout(()=>{e.classList.remove("achievement-toast--visible")},4e3))}function Qo(){const s=document.getElementById("mainContent");if(!s)return;const e=D.state,t=D.getLevelInfo(),i=D.getNextLevelInfo(),r=D.getAllAchievements(),a=D.getTotalLessons(),n=D.getCompletedCount();D.getOverallProgress();const o=i.minXP-e.user.xp,l=i.minXP>t.minXP?Math.round((e.user.xp-t.minXP)/(i.minXP-t.minXP)*100):100;s.innerHTML=`
    <div class="profile-page">
      <h1 class="profile-page__title">Your Learning Profile</h1>
      
      <!-- Stats Grid -->
      <div class="profile-stats">
        <div class="stat-card stat-card--primary">
          <div class="stat-card__icon">${t.icon}</div>
          <div class="stat-card__value">${t.name}</div>
          <div class="stat-card__label">Level ${e.user.level}</div>
          <div class="stat-card__bar">
            <div class="stat-card__bar-fill" style="width:${l}%;background:var(--gradient-primary)"></div>
          </div>
          <div class="stat-card__sublabel">${o>0?`${o} XP to ${i.name}`:"Max Level!"}</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon">⭐</div>
          <div class="stat-card__value">${e.user.xp}</div>
          <div class="stat-card__label">Total XP</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon">🔥</div>
          <div class="stat-card__value">${e.user.streak}</div>
          <div class="stat-card__label">Day Streak</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon">📚</div>
          <div class="stat-card__value">${n}/${a}</div>
          <div class="stat-card__label">Lessons Complete</div>
        </div>
      </div>

      <!-- Module Progress -->
      <section class="profile-section">
        <h2 class="profile-section__title">Module Progress</h2>
        <div class="module-progress-grid">
          ${le.map(d=>{const u=D.getModuleCompletedCount(d.id),f=d.lessons.length,p=Math.round(u/f*100),v=D.getQuizScore(d.id);return`
              <div class="module-progress-card">
                <div class="module-progress-card__header" style="background:${d.gradient}">
                  <span class="module-progress-card__icon">${d.icon}</span>
                  <span class="module-progress-card__title">${d.title}</span>
                </div>
                <div class="module-progress-card__body">
                  <div class="module-progress-card__stat">
                    <span>Lessons</span>
                    <strong>${u}/${f}</strong>
                  </div>
                  <div class="module-progress-card__bar">
                    <div class="module-progress-card__bar-fill" style="width:${p}%;background:${d.color}"></div>
                  </div>
                  <div class="module-progress-card__stat">
                    <span>Quiz</span>
                    <strong>${v?`${v.bestScore}%`:"Not taken"}</strong>
                  </div>
                </div>
              </div>`}).join("")}
        </div>
      </section>

      <!-- Achievements -->
      <section class="profile-section">
        <h2 class="profile-section__title">Achievements (${e.user.achievements.length}/${r.length})</h2>
        <div class="achievements-grid">
          ${r.map(d=>{const u=D.isAchievementUnlocked(d.id);return`
              <div class="achievement-card${u?" achievement-card--unlocked":""}">
                <span class="achievement-card__icon">${u?d.icon:"🔒"}</span>
                <span class="achievement-card__name">${d.name}</span>
                <span class="achievement-card__desc">${d.desc}</span>
              </div>`}).join("")}
        </div>
      </section>

      <!-- Danger Zone -->
      <section class="profile-section">
        <h2 class="profile-section__title">Settings</h2>
        <button class="btn btn--danger" id="resetProgressBtn">🗑️ Reset All Progress</button>
      </section>
    </div>`;const c=document.getElementById("resetProgressBtn");c&&c.addEventListener("click",()=>{confirm("Are you sure you want to reset ALL progress? This cannot be undone.")&&(D.reset(),window.location.hash="#/",window.location.reload())}),s.scrollTo({top:0,behavior:"smooth"})}const Jo={1:()=>We(()=>import("./module1-content-D6jkH5q7.js"),[]).then(s=>s.module1Content),2:()=>We(()=>import("./module2-content-CaeKxe4H.js"),[]).then(s=>s.module2Content),3:()=>We(()=>import("./module3-content-Bi29XIJ6.js"),[]).then(s=>s.module3Content),4:()=>We(()=>import("./module4-content-BMS3NFCJ.js"),[]).then(s=>s.module4Content)},is={};async function Yo(s){const e=s.split(".")[0];if(!is[e])try{is[e]=await Jo[e]()}catch(t){return console.warn(`Content for module ${e} not yet available`,t),null}return is[e][s]||null}async function Xo(s){const e=document.getElementById("mainContent");if(!e)return;const t=mr(s);if(!t){e.innerHTML=`<div class="lesson-error"><h2>Lesson Not Found</h2><p>This lesson doesn't exist. <a href="#/">Go Home</a></p></div>`;return}e.innerHTML=`
    <div class="lesson-loading">
      <div class="lesson-loading__spinner"></div>
      <p>Loading lesson...</p>
    </div>`;const i=await Yo(s),r=D.isLessonCompleted(s),a=Si(s),n=wi(s);e.innerHTML=`
    <article class="lesson" id="lessonContent">
      <!-- Lesson Header -->
      <header class="lesson__header">
        <div class="lesson__breadcrumb">
          <a href="#/">Home</a>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          <a href="#/modules">Module ${t.module.id}</a>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          <span>${t.title}</span>
        </div>
        <div class="lesson__title-row">
          <div>
            <h1 class="lesson__title">${t.title}</h1>
            <p class="lesson__subtitle">${t.subtitle}</p>
          </div>
        </div>
        <div class="lesson__meta">
          <span class="lesson__meta-item" style="background:${t.module.gradient};color:#fff">
            ${t.module.icon} ${t.module.title}
          </span>
          <span class="lesson__meta-item">⏱️ ${t.duration}</span>
          <span class="lesson__meta-item lesson__meta-item--${t.difficulty}">
            ${t.difficulty==="beginner"?"🟢":t.difficulty==="intermediate"?"🟡":"🔴"} ${t.difficulty}
          </span>
          ${r?'<span class="lesson__meta-item lesson__meta-item--completed">✅ Completed</span>':""}
        </div>
      </header>

      ${i?Zo(i):el(t)}

      <!-- Mark Complete / Navigation -->
      <footer class="lesson__footer">
        ${r?`
          <div class="lesson__completed-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
            Lesson Completed! +10 XP earned
          </div>
        `:`
          <button class="btn btn--primary btn--lg" id="markCompleteBtn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
            Mark as Complete (+10 XP)
          </button>
        `}
        <div class="lesson__nav-buttons">
          ${n?`<a href="#/lesson/${n.id}" class="btn btn--ghost">← ${n.title}</a>`:"<span></span>"}
          ${a?`<a href="#/lesson/${a.id}" class="btn btn--accent">Next: ${a.title} →</a>`:`<a href="#/quiz/${t.module.id}" class="btn btn--accent">Take Module Quiz →</a>`}
        </div>
      </footer>
    </article>`,setTimeout(()=>{window.Prism&&window.Prism.highlightAllUnder(e),e.querySelectorAll("pre").forEach(l=>{l.style.position="relative";const c=document.createElement("button");c.className="btn btn--ghost copy-code-btn",c.textContent="Copy",c.style.position="absolute",c.style.top="8px",c.style.right="8px",c.style.padding="4px 8px",c.style.fontSize="12px",c.addEventListener("click",()=>{const d=l.querySelector("code");d&&navigator.clipboard.writeText(d.innerText).then(()=>{c.textContent="Copied!",c.style.color="var(--color-success)",setTimeout(()=>{c.textContent="Copy",c.style.color=""},2e3)})}),l.appendChild(c)})},0);const o=document.getElementById("markCompleteBtn");o&&o.addEventListener("click",()=>{const l=D.completeLesson(s);er(),o.outerHTML=`
        <div class="lesson__completed-badge animate-fadeIn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
          Lesson Completed! +10 XP earned
        </div>`,l.length>0&&l.forEach((c,d)=>setTimeout(()=>tr(c),d*1500))}),tl(s),e.scrollTo({top:0,behavior:"smooth"})}function Zo(s,e){let t="";return s.theory&&(t+=`
      <section class="lesson__section">
        <h2 class="lesson__section-title">
          <span class="lesson__section-icon">📚</span> Theory
        </h2>
        <div class="lesson__theory">${s.theory}</div>
      </section>`),s.examples&&s.examples.length>0&&(t+=`
      <section class="lesson__section">
        <h2 class="lesson__section-title">
          <span class="lesson__section-icon">💡</span> Examples
        </h2>
        ${s.examples.map((i,r)=>`
          <div class="example-card">
            <h3 class="example-card__title">${i.title}</h3>
            <p class="example-card__desc">${i.description}</p>
            <div class="code-block">
              <div class="code-block__header">
                <span class="code-block__lang">${i.language||"apex"}</span>
                <button class="code-block__copy" onclick="navigator.clipboard.writeText(this.closest('.code-block').querySelector('code').textContent).then(()=>{this.textContent='Copied!';setTimeout(()=>this.textContent='Copy',1500)})">Copy</button>
              </div>
              <pre><code class="language-${i.language||"apex"}">${Zi(i.code,i.language||"apex")}</code></pre>
            </div>
            ${i.explanation?`<div class="example-card__explanation"><strong>📖 Explanation:</strong> ${i.explanation}</div>`:""}
          </div>
        `).join("")}
      </section>`),s.practice&&(t+=`
      <section class="lesson__section">
        <h2 class="lesson__section-title">
          <span class="lesson__section-icon">🛠️</span> Practice
        </h2>
        <div class="practice-card">
          <p class="practice-card__intro">${s.practice.intro}</p>
          <ol class="practice-card__steps">
            ${s.practice.steps.map(i=>`<li>${i}</li>`).join("")}
          </ol>
          <div class="practice-card__outcome">
            <strong>✅ Expected Outcome:</strong> ${s.practice.expectedOutcome}
          </div>
        </div>
      </section>`),s.interviewQuestions&&s.interviewQuestions.length>0&&(t+=`
      <section class="lesson__section">
        <h2 class="lesson__section-title">
          <span class="lesson__section-icon">🎯</span> Interview Prep
        </h2>
        <div class="interview-questions">
          ${s.interviewQuestions.map((i,r)=>`
            <details class="interview-card">
              <summary class="interview-card__header">
                <span class="interview-card__number">Q${r+1}</span>
                <p class="interview-card__scenario">📋 <strong>Scenario:</strong> ${i.scenario}</p>
              </summary>
              <div class="interview-card__answer">
                <div class="interview-card__content">${i.answer}</div>
              </div>
            </details>
          `).join("")}
        </div>
      </section>`),t}function el(s){return`
    <section class="lesson__section">
      <div class="lesson__placeholder">
        <div class="lesson__placeholder-icon">🚧</div>
        <h3>Content Coming Soon</h3>
        <p>The detailed content for <strong>${s.title}</strong> is being prepared. Check back soon!</p>
        <p>In the meantime, you can explore other available lessons or try the module quiz.</p>
      </div>
    </section>`}function tl(s){const e=document.getElementById("prevLesson"),t=document.getElementById("nextLesson"),i=document.getElementById("lessonProgressFill"),r=wi(s),a=Si(s);if(e&&(e.disabled=!r,e.onclick=r?()=>{window.location.hash=`#/lesson/${r.id}`}:null),t&&(t.disabled=!a,t.onclick=a?()=>{window.location.hash=`#/lesson/${a.id}`}:null),i){const n=D.getOverallProgress();i.style.width=`${n}%`}}let Tt=null;async function sl(){if(!Tt)try{Tt=(await We(()=>import("./quizzes-Dr6vRoJR.js"),[])).quizzes}catch{Tt={}}return Tt}let oe=null,se=0,Pe=[],Wt=null;async function il(s,e){const t=document.getElementById("mainContent");if(!t)return;const i=Dt(s);if(!i||!e){t.innerHTML='<div class="lesson-error"><h2>Quiz Not Found</h2><a href="#/quiz-hub">Go Back</a></div>';return}const r=await sl(),a=r[s]?r[s][e]:null,n=s+"_"+e,o=D.getQuizScore(n),l=e.charAt(0).toUpperCase()+e.slice(1);if(!a||a.length===0){t.innerHTML=`
      <div class="quiz-start">
        <div class="quiz-start__icon" style="background:${i.gradient}">${i.icon}</div>
        <h1 class="quiz-start__title">${i.title} (${l})</h1>
        <div class="lesson__placeholder">
          <div class="lesson__placeholder-icon">🚧</div>
          <h3>Quiz Coming Soon</h3>
          <p>The quiz questions for this module are being prepared. Check back soon!</p>
        </div>
        <a href="#/quiz-hub" class="btn btn--ghost">← Back to Home</a>
      </div>`;return}t.innerHTML=`
    <div class="quiz-start">
      <div class="quiz-start__icon" style="background:${i.gradient}">${i.icon}</div>
      <h1 class="quiz-start__title">${i.title} (${l})</h1>
      <p class="quiz-start__desc">${i.description}</p>
      
      <div class="quiz-start__stats">
        <div class="quiz-start__stat">
          <span class="quiz-start__stat-value">${a.length}</span>
          <span class="quiz-start__stat-label">Questions</span>
        </div>
        <div class="quiz-start__stat">
          <span class="quiz-start__stat-value">~${Math.ceil(a.length*.75)}</span>
          <span class="quiz-start__stat-label">Minutes</span>
        </div>
        <div class="quiz-start__stat">
          <span class="quiz-start__stat-value">${o?o.bestScore+"%":"—"}</span>
          <span class="quiz-start__stat-label">Best Score</span>
        </div>
      </div>

      <div class="quiz-start__actions">
        <button class="btn btn--primary btn--lg" id="startQuizBtn">🚀 Begin Quiz</button>
        ${o?'<button class="btn btn--accent btn--lg" id="retryWrongBtn">🔄 Retry Wrong Only</button>':""}
      </div>

      <a href="#/" class="btn btn--ghost" style="margin-top:var(--space-4)">← Back to Home</a>
    </div>`,document.getElementById("startQuizBtn").addEventListener("click",()=>{yi(s,e,a)});const c=document.getElementById("retryWrongBtn");c&&o&&c.addEventListener("click",()=>{const d=a.filter((u,f)=>{var v;return((v=o.lastAnswers)==null?void 0:v[f])!==u.correct});d.length>0?yi(s,e,d):alert("You got all questions correct! Try the full quiz instead.")}),t.scrollTo({top:0,behavior:"smooth"})}function yi(s,e,t){oe={moduleId:s,difficulty:e,storeKey:s+"_"+e,questions:nl([...t])},se=0,Pe=new Array(oe.questions.length).fill(null),Wt=Date.now(),It()}function It(){var n,o,l,c;const s=document.getElementById("mainContent");if(!s)return;const e=oe.questions[se],t=oe.questions.length,i=Dt(oe.moduleId),r=(se+1)/t*100;s.innerHTML=`
    <div class="quiz-question">
      <div class="quiz-question__header">
        <div class="quiz-question__progress">
          <div class="quiz-question__progress-bar">
            <div class="quiz-question__progress-fill" style="width:${r}%;background:${i.color}"></div>
          </div>
          <span class="quiz-question__progress-text">${se+1} / ${t}</span>
        </div>
        <span class="quiz-question__timer" id="quizTimer">⏱️ 0:00</span>
      </div>

      <div class="quiz-question__body">
        <span class="quiz-question__type quiz-question__type--${e.type||"mcq"}">${ol(e.type)}</span>
        <h2 class="quiz-question__text">${e.question}</h2>

        ${e.code?`
          <div class="code-block code-block--quiz">
            <pre><code>${cl(e.code)}</code></pre>
          </div>
        `:""}

        <div class="quiz-options" id="quizOptions">
          ${e.options.map((d,u)=>`
            <button class="quiz-option${Pe[se]===u?" quiz-option--selected":""}" data-idx="${u}">
              <span class="quiz-option__letter">${String.fromCharCode(65+u)}</span>
              <span class="quiz-option__text">${d}</span>
            </button>
          `).join("")}
        </div>
      </div>

      <div class="quiz-question__footer">
        <button class="btn btn--ghost" id="prevQBtn" ${se===0?"disabled":""}>← Previous</button>
        <div class="quiz-question__palette" id="questionPalette">
          ${oe.questions.map((d,u)=>`
            <button class="quiz-palette-dot${u===se?" quiz-palette-dot--current":""}${Pe[u]!==null?" quiz-palette-dot--answered":""}" data-qi="${u}">${u+1}</button>
          `).join("")}
        </div>
        ${se===t-1?'<button class="btn btn--primary" id="submitQuizBtn">Submit Quiz</button>':'<button class="btn btn--accent" id="nextQBtn">Next →</button>'}
      </div>
    </div>`;const a=document.getElementById("quizOptions");a.addEventListener("click",d=>{const u=d.target.closest(".quiz-option");if(!u)return;const f=parseInt(u.dataset.idx);Pe[se]=f,a.querySelectorAll(".quiz-option").forEach(p=>p.classList.remove("quiz-option--selected")),u.classList.add("quiz-option--selected")}),(n=document.getElementById("prevQBtn"))==null||n.addEventListener("click",()=>{se>0&&(se--,It())}),(o=document.getElementById("nextQBtn"))==null||o.addEventListener("click",()=>{se<t-1&&(se++,It())}),(l=document.getElementById("submitQuizBtn"))==null||l.addEventListener("click",()=>{const d=Pe.filter(u=>u===null).length;d>0&&!confirm(`You have ${d} unanswered question(s). Submit anyway?`)||rl()}),(c=document.getElementById("questionPalette"))==null||c.addEventListener("click",d=>{const u=d.target.closest(".quiz-palette-dot");u&&(se=parseInt(u.dataset.qi),It())}),sr(),s.scrollTo({top:0,behavior:"smooth"})}function sr(){const s=document.getElementById("quizTimer");if(!s||!Wt)return;const e=Math.floor((Date.now()-Wt)/1e3),t=Math.floor(e/60),i=e%60;s.textContent=`⏱️ ${t}:${i.toString().padStart(2,"0")}`,oe&&requestAnimationFrame(()=>setTimeout(sr,1e3))}function rl(){const s=Math.floor((Date.now()-Wt)/1e3);let e=0;const t=oe.questions.map((n,o)=>{const l=Pe[o]===n.correct;return l&&e++,{question:n,answer:Pe[o],isCorrect:l}}),i=oe.questions.length,r=Math.round(e/i*100),a=D.saveQuizScore(oe.storeKey,e,i,s,Pe);r>=80&&er(),a.length>0&&a.forEach((n,o)=>setTimeout(()=>tr(n),o*1500)),al(oe.moduleId,t,e,i,s,r),oe=null}function al(s,e,t,i,r,a){var b;const n=document.getElementById("mainContent");if(!n)return;const o=Dt(s),l=Math.floor(r/60),c=r%60,d=((b=D.getQuizScore(s))==null?void 0:b.bestScore)||a,u=i-t,f=e.filter(_=>_.answer===null).length,p=a>=90?"🏆":a>=70?"🌟":a>=50?"👍":"📖",v=a>=90?"Outstanding!":a>=70?"Great Job!":a>=50?"Good Effort!":"Keep Learning!";n.innerHTML=`
    <div class="quiz-dashboard">
      <header class="quiz-dashboard__header">
        <span class="quiz-dashboard__emoji">${p}</span>
        <h1 class="quiz-dashboard__title">${v}</h1>
        <p class="quiz-dashboard__subtitle">${o.icon} ${o.title} Quiz</p>
      </header>

      <div class="quiz-dashboard__score-ring">
        <svg viewBox="0 0 120 120" width="160" height="160">
          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--glass-border)" stroke-width="8"/>
          <circle cx="60" cy="60" r="52" fill="none" stroke="${o.color}" stroke-width="8" 
            stroke-dasharray="${2*Math.PI*52}" 
            stroke-dashoffset="${2*Math.PI*52*(1-a/100)}"
            stroke-linecap="round" transform="rotate(-90 60 60)"/>
        </svg>
        <div class="quiz-dashboard__score-text">
          <span class="quiz-dashboard__score-pct">${a}%</span>
          <span class="quiz-dashboard__score-fraction">${t}/${i}</span>
        </div>
      </div>

      <div class="quiz-dashboard__stats">
        <div class="quiz-dashboard__stat quiz-dashboard__stat--correct">
          <span>✅ Correct</span>
          <strong>${t}</strong>
        </div>
        <div class="quiz-dashboard__stat quiz-dashboard__stat--wrong">
          <span>❌ Wrong</span>
          <strong>${u-f}</strong>
        </div>
        <div class="quiz-dashboard__stat quiz-dashboard__stat--skipped">
          <span>⏭️ Skipped</span>
          <strong>${f}</strong>
        </div>
        <div class="quiz-dashboard__stat">
          <span>⏱️ Time</span>
          <strong>${l}:${c.toString().padStart(2,"0")}</strong>
        </div>
        <div class="quiz-dashboard__stat">
          <span>🏆 Best</span>
          <strong>${d}%</strong>
        </div>
      </div>

      <section class="quiz-dashboard__breakdown">
        <h2 class="quiz-dashboard__breakdown-title">Question Breakdown</h2>
        ${e.map((_,C)=>`
          <details class="quiz-breakdown-item${_.isCorrect?" quiz-breakdown-item--correct":_.answer===null?" quiz-breakdown-item--skipped":" quiz-breakdown-item--wrong"}">
            <summary class="quiz-breakdown-item__header">
              <span class="quiz-breakdown-item__status">${_.isCorrect?"✅":_.answer===null?"⏭️":"❌"}</span>
              <span class="quiz-breakdown-item__text">Q${C+1}: ${ll(_.question.question,60)}</span>
            </summary>
            <div class="quiz-breakdown-item__detail">
              <p><strong>Question:</strong> ${_.question.question}</p>
              ${_.answer!==null?`<p><strong>Your Answer:</strong> ${_.question.options[_.answer]}</p>`:"<p><strong>Your Answer:</strong> <em>Skipped</em></p>"}
              <p><strong>Correct Answer:</strong> ${_.question.options[_.question.correct]}</p>
              ${_.question.explanation?`<p class="quiz-breakdown-item__explanation"><strong>📖 Explanation:</strong> ${_.question.explanation}</p>`:""}
            </div>
          </details>
        `).join("")}
      </section>

      <div class="quiz-dashboard__actions">
        <a href="#/quiz/${s}" class="btn btn--ghost btn--lg">🔄 Retry Quiz</a>
        ${(()=>{const _=parseInt(s),C=Dt((_+1).toString());return C&&C.lessons.length>0?`<a href="#/lesson/${C.lessons[0].id}" class="btn btn--primary btn--lg">Next Module: ${C.title} →</a>`:'<a href="#/" class="btn btn--primary btn--lg">🏠 Back to Home</a>'})()}
      </div>
    </div>`,n.scrollTo({top:0,behavior:"smooth"})}function nl(s){for(let e=s.length-1;e>0;e--){const t=Math.floor(Math.random()*(e+1));[s[e],s[t]]=[s[t],s[e]]}return s}function ol(s){return{mcq:"Multiple Choice","true-false":"True / False","code-output":"Code Output",scenario:"Scenario Based"}[s]||"Multiple Choice"}function ll(s,e){return s.length>e?s.slice(0,e)+"...":s}function cl(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function dl(){const s=document.getElementById("mainContent");s&&(s.innerHTML=`
    <div class="quiz-hub">
      <header class="quiz-hub__header" style="text-align:center; margin-bottom:3rem;">
        <h1 class="quiz-hub__title" style="font-size:2.5rem; margin-bottom:1rem;">📝 Quiz Center</h1>
        <p class="quiz-hub__subtitle" style="color:var(--text-muted); max-width:600px; margin:0 auto;">Test your knowledge with 3 difficulties per topic: Easy (10 Q), Medium (15 Q), and Hard (20 Q). Earn XP and track your best scores.</p>
      </header>

      <div class="quiz-hub__grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(350px, 1fr)); gap:2rem;">
        ${le.map(e=>{const t=D.getQuizScore(e.id+"_easy"),i=D.getQuizScore(e.id+"_medium"),r=D.getQuizScore(e.id+"_hard"),a=D.getModuleCompletedCount(e.id),n=e.lessons.length,o=Math.round(a/n*100);return`
            <div class="quiz-hub-card" style="background:var(--bg-surface); border:1px solid var(--glass-border); border-radius:12px; overflow:hidden; box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">
              <div class="quiz-hub-card__header" style="background:${e.gradient}; padding:1.5rem; color:#fff; display:flex; align-items:center; gap:1rem;">
                <span class="quiz-hub-card__icon" style="font-size:2rem; background:rgba(255,255,255,0.2); padding:0.5rem; border-radius:8px;">${e.icon}</span>
                <h2 class="quiz-hub-card__title" style="font-size:1.25rem; margin:0;">${e.title}</h2>
              </div>
              <div class="quiz-hub-card__body" style="padding:1.5rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:1px solid var(--border-default);">
                  <span style="color:var(--text-muted);">Lessons Done</span>
                  <strong>${a}/${n} (${o}%)</strong>
                </div>
                
                <h3 style="font-size:1rem; margin-bottom:1rem; color:var(--text-secondary);">Select Difficulty</h3>
                
                <div style="display:flex; flex-direction:column; gap:0.75rem;">
                  <!-- Easy -->
                  <a href="#/quiz/${e.id}/easy" style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem 1rem; border-radius:8px; background:var(--bg-base); border:1px solid var(--border-default); text-decoration:none; color:var(--text-primary); transition:border-color 0.2s;">
                    <span style="font-weight:600; color:#10B981;">Easy (10 Q)</span>
                    <span style="font-size:0.9rem; color:var(--text-muted);">${t?t.bestScore+"% Best":"Not started"}</span>
                  </a>
                  
                  <!-- Medium -->
                  <a href="#/quiz/${e.id}/medium" style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem 1rem; border-radius:8px; background:var(--bg-base); border:1px solid var(--border-default); text-decoration:none; color:var(--text-primary); transition:border-color 0.2s;">
                    <span style="font-weight:600; color:#F59E0B;">Medium (15 Q)</span>
                    <span style="font-size:0.9rem; color:var(--text-muted);">${i?i.bestScore+"% Best":"Not started"}</span>
                  </a>

                  <!-- Hard -->
                  <a href="#/quiz/${e.id}/hard" style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem 1rem; border-radius:8px; background:var(--bg-base); border:1px solid var(--border-default); text-decoration:none; color:var(--text-primary); transition:border-color 0.2s;">
                    <span style="font-weight:600; color:#EF4444;">Hard (20 Q)</span>
                    <span style="font-size:0.9rem; color:var(--text-muted);">${r?r.bestScore+"% Best":"Not started"}</span>
                  </a>
                </div>
              </div>
            </div>`}).join("")}
      </div>
    </div>`,s.scrollTo({top:0,behavior:"smooth"}))}const ul=[{id:"soql",title:"SOQL Quick Reference",icon:"🔍",color:"#00a1e0",items:[{label:"Basic Query",code:"SELECT Id, Name FROM Account WHERE Industry = 'Technology' LIMIT 10",lang:"soql"},{label:"Relationship (Parent)",code:"SELECT Name, Account.Name FROM Contact WHERE Account.Industry = 'Finance'",lang:"soql"},{label:"Relationship (Child)",code:"SELECT Name, (SELECT LastName FROM Contacts) FROM Account",lang:"soql"},{label:"Aggregate",code:"SELECT Industry, COUNT(Id) cnt FROM Account GROUP BY Industry HAVING COUNT(Id) > 5",lang:"soql"},{label:"Date Literal",code:"SELECT Id FROM Opportunity WHERE CloseDate = THIS_QUARTER",lang:"soql"},{label:"Dynamic SOQL",code:`String query = 'SELECT Id FROM ' + objectName + ' WHERE ' + field + ' = :value';
List<SObject> results = Database.query(query);`,lang:"apex"}]},{id:"apex-collections",title:"Apex Collections",icon:"📦",color:"#f59e0b",items:[{label:"List",code:`List<String> names = new List<String>{'Alice', 'Bob'};
names.add('Charlie');
String first = names[0];  // Alice
Integer size = names.size();  // 3`,lang:"apex"},{label:"Set",code:`Set<Id> accountIds = new Set<Id>();
for (Contact c : contacts) {
    accountIds.add(c.AccountId);
}
// Automatically de-duped`,lang:"apex"},{label:"Map",code:`Map<Id, Account> accountMap = new Map<Id, Account>(
    [SELECT Id, Name FROM Account]
);
Account a = accountMap.get(someId);`,lang:"apex"}]},{id:"apex-triggers",title:"Apex Trigger Context",icon:"⚡",color:"#ef4444",items:[{label:"Trigger Events",code:`trigger AccountTrigger on Account (before insert, before update,
    after insert, after update, before delete, after delete, after undelete) {
    // Trigger.new, Trigger.old, Trigger.newMap, Trigger.oldMap
}`,lang:"apex"},{label:"Context Variables",code:`Trigger.isInsert  Trigger.isUpdate  Trigger.isDelete
Trigger.isBefore   Trigger.isAfter
Trigger.new        Trigger.old
Trigger.newMap     Trigger.oldMap
Trigger.size       Trigger.isExecuting`,lang:"text"},{label:"Best Practice",code:`// ONE trigger per object → Handler class
trigger AccountTrigger on Account (before insert, after insert) {
    AccountTriggerHandler handler = new AccountTriggerHandler();
    if (Trigger.isBefore && Trigger.isInsert) {
        handler.beforeInsert(Trigger.new);
    }
}`,lang:"apex"}]},{id:"lwc-basics",title:"LWC Quick Reference",icon:"🧩",color:"#22c55e",items:[{label:"Component Structure",code:`myComponent/
├── myComponent.html      // Template
├── myComponent.js        // Controller
├── myComponent.css       // Styles
└── myComponent.js-meta.xml  // Metadata`,lang:"text"},{label:"Decorators",code:`import { LightningElement, api, wire, track } from 'lwc';

export default class MyComponent extends LightningElement {
    @api recordId;           // Public property
    @track complexObj = {};  // Deep-tracked reactive
    reactiveField = '';      // Simple reactive (auto)
}`,lang:"javascript"},{label:"Wire Service",code:`import { wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

@wire(getAccounts, { searchKey: '$searchTerm' })
wiredAccounts;  // { data, error }`,lang:"javascript"},{label:"Conditional Rendering",code:`<template lwc:if={isAdmin}>
    <p>Admin Panel</p>
</template>
<template lwc:elseif={isManager}>
    <p>Manager Dashboard</p>
</template>
<template lwc:else>
    <p>User View</p>
</template>`,lang:"markup"},{label:"Custom Events",code:`// Child: dispatch event
this.dispatchEvent(new CustomEvent('select', {
    detail: { recordId: this.selectedId },
    bubbles: true
}));

// Parent HTML: handle event
// <c-child onselect={handleSelect}></c-child>`,lang:"javascript"}]},{id:"governor-limits",title:"Governor Limits",icon:"🚦",color:"#7c3aed",items:[{label:"Key Limits (Sync)",code:`SOQL Queries:        100 per transaction
SOQL Rows:           50,000 per transaction
DML Statements:      150 per transaction
DML Rows:            10,000 per transaction
Callouts:            100 per transaction
Future Methods:      50 per transaction
Heap Size:           6 MB (sync) / 12 MB (async)
CPU Time:            10,000 ms (sync) / 60,000 ms (async)`,lang:"text"},{label:"Bulkification",code:`// ❌ BAD: SOQL inside loop
for (Contact c : contacts) {
    Account a = [SELECT Name FROM Account WHERE Id = :c.AccountId];
}

// ✅ GOOD: Query once, use Map
Set<Id> accIds = new Set<Id>();
for (Contact c : contacts) accIds.add(c.AccountId);
Map<Id, Account> accMap = new Map<Id, Account>(
    [SELECT Id, Name FROM Account WHERE Id IN :accIds]
);`,lang:"apex"}]},{id:"security",title:"Security Model",icon:"🛡️",color:"#06b6d4",items:[{label:"Security Layers",code:`Organization Level → Login IP, Login Hours
    ↓
Object Level → Profiles, Permission Sets (CRUD)
    ↓
Field Level → Field-Level Security (FLS)
    ↓
Record Level → OWD → Role Hierarchy → Sharing Rules → Manual Sharing`,lang:"text"},{label:"OWD Settings",code:`Private:             Only owner + above in hierarchy
Public Read Only:    Everyone can see, only owner edits
Public Read/Write:   Everyone can see and edit
Controlled by Parent: Follows master object's OWD (detail objects)`,lang:"text"}]}];function hl(){const s=document.getElementById("mainContent");s&&(s.innerHTML=`
    <div class="cheatsheets-page">
      <header class="cheatsheets-page__header">
        <h1 class="cheatsheets-page__title">📋 Cheat Sheets</h1>
        <p class="cheatsheets-page__subtitle">Quick reference cards for Salesforce development. Copy code snippets with one click.</p>
      </header>

      <div class="cheatsheets-grid">
        ${ul.map(e=>`
          <div class="cheatsheet-card" id="sheet-${e.id}">
            <div class="cheatsheet-card__header" style="border-left-color:${e.color}">
              <span class="cheatsheet-card__icon">${e.icon}</span>
              <h2 class="cheatsheet-card__title">${e.title}</h2>
            </div>
            <div class="cheatsheet-card__body">
              ${e.items.map(t=>`
                <div class="cheatsheet-item">
                  <div class="cheatsheet-item__label">${t.label}</div>
                  <div class="code-block code-block--compact">
                    <div class="code-block__header">
                      <span class="code-block__lang">${t.lang}</span>
                      <button class="code-block__copy" onclick="navigator.clipboard.writeText(decodeURIComponent('${encodeURIComponent(t.code)}')).then(()=>{this.textContent='Copied!';setTimeout(()=>this.textContent='Copy',1500)})">Copy</button>
                    </div>
                    <pre><code class="language-${t.lang}">${Zi(t.code,t.lang)}</code></pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </div>`,s.scrollTo({top:0,behavior:"smooth"}))}let kt=null;async function pl(){if(!kt)try{kt=(await We(()=>import("./interview-questions-DK2F2ADs.js"),[])).interviewQuestions}catch{kt={}}return kt}async function gl(){const s=document.getElementById("mainContent");if(!s)return;const e=await pl();s.innerHTML=`
    <div class="interview-page">
      <header class="interview-page__header" style="text-align:center; margin-bottom: 2rem;">
        <h1 class="interview-page__title" style="font-size:2.5rem; margin-bottom:1rem;">🎯 Interview Prep Center</h1>
        <p class="interview-page__subtitle" style="color:var(--text-muted); max-width:600px; margin:0 auto;">Section-wise scenario questions and answers. All references sourced directly from official Salesforce Documentation and Trailhead.</p>
      </header>

      <div class="interview-page__filters" style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; margin-bottom:2rem;">
        <button class="btn btn--primary interview-filter interview-filter--active" data-filter="all">All Modules</button>
        ${le.map(a=>`
          <button class="btn btn--ghost interview-filter" data-filter="${a.id}">
            ${a.icon} ${a.title}
          </button>
        `).join("")}
      </div>

      <div class="interview-page__content" id="interviewContent" style="display:flex; flex-direction:column; gap:2rem;">
        ${le.map(a=>{const n=e[a.id]||[];return n.length===0?"":`
          <section class="interview-module" data-module="${a.id}" style="background:var(--bg-surface); padding:2rem; border-radius:12px; border:1px solid var(--border-default);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
              <h2 class="interview-module__title" style="font-size:1.5rem; margin:0; display:flex; align-items:center; gap:0.5rem; color:var(--text-primary);">
                ${a.icon} ${a.title}
              </h2>
              <a href="#/quiz-hub" class="btn btn--outline" style="border-color:${a.color}; color:${a.color};">📝 Take Module Quizzes</a>
            </div>
            <div class="qa-list" style="display:flex; flex-direction:column; gap:1rem;">
              ${n.map((o,l)=>`
                <div class="qa-item" style="border:1px solid var(--glass-border); border-radius:8px; overflow:hidden;">
                  <button class="qa-question" style="width:100%; text-align:left; padding:1rem; background:var(--bg-base); border:none; color:var(--text-primary); font-size:1.1rem; font-weight:600; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
                    <span><span style="color:var(--primary-color);">Q${l+1}.</span> ${o.question}</span>
                    <span class="qa-icon" style="transition:transform 0.2s;">▼</span>
                  </button>
                  <div class="qa-answer" style="display:none; padding:1rem; background:var(--bg-surface); border-top:1px solid var(--glass-border); line-height:1.6; color:var(--text-secondary);">
                    <p style="white-space:pre-wrap;">${o.answer}</p>
                  </div>
                </div>
              `).join("")}
            </div>
          </section>
        `}).join("")}
      </div>
    </div>`;const t=s.querySelectorAll(".interview-filter"),i=s.querySelectorAll(".interview-module");t.forEach(a=>{a.addEventListener("click",()=>{t.forEach(o=>{o.classList.remove("btn--primary","interview-filter--active"),o.classList.add("btn--ghost")}),a.classList.remove("btn--ghost"),a.classList.add("btn--primary","interview-filter--active");const n=a.dataset.filter;i.forEach(o=>{o.style.display=n==="all"||o.dataset.module===n?"":"none"})})}),s.querySelectorAll(".qa-question").forEach(a=>{a.addEventListener("click",()=>{const n=a.nextElementSibling,o=a.querySelector(".qa-icon"),l=n.style.display==="block";n.style.display=l?"none":"block",o.style.transform=l?"rotate(0deg)":"rotate(180deg)"})}),s.scrollTo({top:0,behavior:"smooth"})}const xt=[{id:1,title:"TechNova Support System — Data Model, Security & Governance",difficulty:"Easy",category:"Admin / Data Modeling",company:"TechNova Solutions",subtitle:"Build the complete foundation: custom objects, fields, profiles, OWD, sharing, validation, queues, approval processes, and reporting.",tags:["Objects","Fields","Profiles","OWD","Sharing Rules","Validation Rules","Queues","Approval Process","Reports"],description:"TechNova Solutions is a B2B SaaS company that sells subscription-based software. They need a Salesforce org configured from scratch to manage customer subscriptions, support cases, security, and reporting.",learnings:["Create custom objects and fields with correct data types","Design Record Types for different business processes","Set up Profiles and Permission Sets for role-based access","Configure Organization-Wide Defaults and Sharing Rules","Build Validation Rules, Queues, and Approval Processes","Create Reports and Dashboards for management visibility"],content:`
      <h2>Background</h2>
      <p>TechNova Solutions is a B2B SaaS company. They sell subscription-based project management software to mid-market companies. Their support team handles billing disputes and technical issues, and they need Salesforce configured from scratch to manage everything.</p>
      <p>We will build in the order a real implementation would: foundation first, because later steps depend on earlier ones (you cannot create a Sharing Rule on a field that doesn't exist yet).</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Custom Object · Step 2 → Fields on Subscription · Step 3 → Fields on Case · Step 4 → Record Types · Step 5 → Profiles · Step 6 → Permission Set · Step 7 → Role Hierarchy · Step 8 → OWD · Step 9 → Public Group & Sharing Rule · Step 10 → Validation Rule · Step 11 → Duplicate Rule · Step 12 → Queues · Step 13 → Approval Process · Step 14 → Reports & Dashboard</p>
      </div>

      <h2>Step 1: Create the Subscription Custom Object</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Custom Object</p>
        <p>An <strong>Object</strong> is like a database table. <strong>Standard Objects</strong> (Account, Contact, Case) come built-in. A <strong>Custom Object</strong> is one you create for a business need Salesforce doesn't have out of the box; its API Name always ends in <code>__c</code>.</p>
      </div>
      <p><strong>Purpose:</strong> Cases and later automation need to know which plan/tier a customer is on, so we need somewhere to store that data first.</p>
      <h3>Build Steps</h3>
      <ol class="step-list">
        <li class="step-list__item">Click the <strong>Setup gear icon</strong> → Setup.</li>
        <li class="step-list__item">In Quick Find, type <strong>"Object Manager"</strong> and click it.</li>
        <li class="step-list__item">Click <strong>Create → Custom Object</strong>.</li>
        <li class="step-list__item">Label: <code>Subscription</code>. Plural Label: <code>Subscriptions</code>.</li>
        <li class="step-list__item">Object Name auto-fills as <code>Subscription</code>; API Name becomes <code>Subscription__c</code>.</li>
        <li class="step-list__item">Check <strong>"Allow Reports"</strong> and <strong>"Track Activities"</strong>.</li>
        <li class="step-list__item">Click <strong>Save</strong>.</li>
      </ol>

      <h2>Step 2: Add Fields to Subscription__c</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Fields</p>
        <p>A <strong>Field</strong> is like a column in a table — one piece of data stored on every record. Custom fields also end in <code>__c</code>. Common types: Text, Number, Currency, Date, Checkbox, Picklist, Lookup, Formula.</p>
      </div>
      <p><strong>Purpose:</strong> We need to know which Account the subscription belongs to, what plan tier it is, when it started/ends, and its revenue value.</p>
      <h3>Build Steps (repeat for each field)</h3>
      <ol class="step-list">
        <li class="step-list__item">From Object Manager, open <code>Subscription__c</code> → Fields & Relationships → New.</li>
        <li class="step-list__item">Choose the field type, click Next.</li>
        <li class="step-list__item">Enter Field Label; API Name auto-fills. Confirm it matches the table below.</li>
        <li class="step-list__item">Set picklist values, required checkbox, or related object as specified.</li>
        <li class="step-list__item">Set Field-Level Security for each profile; click Save.</li>
      </ol>
      <table><thead><tr><th>Field Label</th><th>API Name</th><th>Type</th><th>Details</th></tr></thead><tbody>
        <tr><td>Account</td><td><code>Account__c</code></td><td>Lookup(Account)</td><td>Required = true</td></tr>
        <tr><td>Plan</td><td><code>Plan__c</code></td><td>Picklist</td><td>Values: Starter, Pro, Enterprise</td></tr>
        <tr><td>Start Date</td><td><code>Start_Date__c</code></td><td>Date</td><td></td></tr>
        <tr><td>End Date</td><td><code>End_Date__c</code></td><td>Date</td><td>Used for renewal calculations</td></tr>
        <tr><td>MRR</td><td><code>MRR__c</code></td><td>Currency</td><td>Monthly Recurring Revenue</td></tr>
      </tbody></table>

      <h2>Step 3: Add Custom Fields to Case</h2>
      <p><strong>Purpose:</strong> Case needs to know which Subscription it relates to, SLA due time, escalation status, and require resolution notes before closing.</p>
      <table><thead><tr><th>Field Label</th><th>API Name</th><th>Type</th><th>Details</th></tr></thead><tbody>
        <tr><td>Subscription</td><td><code>Subscription__c</code></td><td>Lookup(Subscription__c)</td><td>Links Case to customer's plan</td></tr>
        <tr><td>SLA Due</td><td><code>SLA_Due__c</code></td><td>Date/Time</td><td>Auto-calculated by Flow</td></tr>
        <tr><td>Escalated</td><td><code>Escalated__c</code></td><td>Checkbox</td><td>Defaults unchecked</td></tr>
        <tr><td>Resolution Notes</td><td><code>Resolution_Notes__c</code></td><td>Long Text Area (500)</td><td>Required before Status = Closed</td></tr>
      </tbody></table>

      <h2>Step 4: Create Record Types on Case</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Record Types</p>
        <p>A <strong>Record Type</strong> lets a single object support more than one business process. Each Record Type can show different picklist values and optionally a different page layout, while remaining the same underlying object.</p>
      </div>
      <p><strong>Purpose:</strong> Billing issues and Technical issues need different Case Reason options. An agent handling a billing dispute shouldn't see "Outage" in their picklist.</p>
      <table><thead><tr><th>Record Type Label</th><th>API Name</th><th>Restricted Picklist Values</th></tr></thead><tbody>
        <tr><td>Billing Case</td><td><code>Billing_Case</code></td><td>Invoice, Refund, Payment Failed</td></tr>
        <tr><td>Technical Case</td><td><code>Technical_Case</code></td><td>Bug, Outage, How-To</td></tr>
      </tbody></table>

      <h2>Step 5: Create Profiles</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Profiles</p>
        <p>A <strong>Profile</strong> is the baseline permission set every user must have exactly one of. It controls CRUD access to objects, field-level security, app/tab visibility, and more.</p>
      </div>
      <table><thead><tr><th>Profile Label</th><th>API Name</th><th>Cloned From</th><th>Key Differences</th></tr></thead><tbody>
        <tr><td>Support Agent</td><td><code>Support_Agent</code></td><td>Standard User</td><td>Case: Read/Create/Edit, no Delete</td></tr>
        <tr><td>Support Manager</td><td><code>Support_Manager</code></td><td>Support Agent</td><td>Adds Case Delete + report folder access</td></tr>
      </tbody></table>

      <h2>Step 6: Create a Permission Set</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Permission Sets</p>
        <p>A <strong>Permission Set</strong> grants additional permissions on top of a Profile without cloning a whole new profile. A user can have many Permission Sets but only one Profile.</p>
      </div>
      <p><strong>Purpose:</strong> Only senior agents should manually edit <code>Escalated__c</code>. A Permission Set grants that to specific individuals regardless of profile.</p>
      <table><thead><tr><th>Component</th><th>API Name</th><th>Grants</th></tr></thead><tbody>
        <tr><td>Permission Set</td><td><code>Case_Escalation_Access</code></td><td>Edit access to Case.Escalated__c</td></tr>
      </tbody></table>

      <h2>Step 7: Set Up Role Hierarchy</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Role Hierarchy</p>
        <p><strong>Role Hierarchy</strong> is an org-chart structure that automatically gives anyone above a user in the hierarchy access to that user's records.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Quick Find → Roles → Set Up Roles.</li>
        <li class="step-list__item">Add role: <strong>Support Manager</strong>, reporting to CEO/Executive.</li>
        <li class="step-list__item">Add role: <strong>Support Agent</strong>, reporting to Support Manager.</li>
        <li class="step-list__item">Assign each User to the matching role on their user detail page.</li>
      </ol>

      <h2>Step 8: Set Organization-Wide Defaults (OWD)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — OWD</p>
        <p><strong>OWD</strong> is the strictest baseline sharing setting for an object — Private, Public Read Only, or Public Read/Write. Sharing Rules and Role Hierarchy only ever <em>open</em> access wider, never restrict it further.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Sharing Settings → Edit.</li>
        <li class="step-list__item">Set <strong>Case = Private</strong>. Set <strong>Account = Public Read Only</strong>. Save.</li>
      </ol>

      <h2>Step 9: Public Group & Sharing Rule</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Sharing Rules</p>
        <p>A <strong>Sharing Rule</strong> opens access wider than OWD/role hierarchy, based on ownership or criteria on the record's fields. A <strong>Public Group</strong> is a named bundle of users/roles you can share with in one step.</p>
      </div>
      <table><thead><tr><th>Component</th><th>API Name</th><th>Detail</th></tr></thead><tbody>
        <tr><td>Public Group</td><td><code>Escalation_Team</code></td><td>Tier 2 agents + managers</td></tr>
        <tr><td>Sharing Rule</td><td><code>Case_Share_High_Priority</code></td><td>Priority = High → Read/Write to Escalation_Team</td></tr>
      </tbody></table>

      <h2>Step 10: Validation Rule</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Validation Rules</p>
        <p>A <strong>Validation Rule</strong> is a formula that must evaluate to FALSE for a record to save; if TRUE, Salesforce blocks the save and shows an error message.</p>
      </div>
      <p><strong>Rule Name:</strong> <code>Require_Resolution_Notes_On_Close</code></p>
      <p><strong>Formula:</strong></p>
      <pre><code>AND(
  ISPICKVAL(Status, "Closed"),
  ISBLANK(Resolution_Notes__c)
)</code></pre>
      <p><strong>Error Message:</strong> "Please enter Resolution Notes before closing this Case."</p>

      <h2>Step 11: Duplicate Rule</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Duplicate Rules</p>
        <p>A <strong>Duplicate Rule</strong> works with a <strong>Matching Rule</strong> to detect and prevent duplicate records from being created, ensuring data hygiene.</p>
      </div>
      <p><strong>Purpose:</strong> Prevent users from creating a Contact if one with the same exact email already exists.</p>
      <ol class="step-list">
        <li class="step-list__item">Setup → Matching Rules → New. Select <strong>Contact</strong>. Criteria: Email exact match. Activate it.</li>
        <li class="step-list__item">Setup → Duplicate Rules → New Rule → Contact.</li>
        <li class="step-list__item">Rule Name: <code>Contact_Duplicate_Email</code>. Action on Create: Block. Action on Edit: Block.</li>
        <li class="step-list__item">Select the Matching Rule you just created. Activate the Duplicate Rule.</li>
      </ol>

      <h2>Step 12: Configure Queues</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Queues</p>
        <p>A <strong>Queue</strong> is a holding pen for records (like Cases or Leads) that do not yet have a specific owner. Users who are members of the Queue can pick records out of it.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Queues → New.</li>
        <li class="step-list__item">Label: <code>Tier1_Support_Queue</code>. Supported Object: Case. Add all Tier 1 Agents to Queue Members.</li>
        <li class="step-list__item">Repeat the process to create <code>Tier2_Support_Queue</code> for escalated issues.</li>
      </ol>

      <h2>Step 13: Build an Approval Process</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Approval Processes</p>
        <p>An <strong>Approval Process</strong> automates how records are approved. It specifies who must approve, and what actions (field updates, emails) happen upon approval or rejection.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Approval Processes. Select <strong>Opportunity</strong>. Use the Jump Start Wizard.</li>
        <li class="step-list__item">Name: <code>Opportunity_Discount_Approval</code>. Entry Criteria: Discount % > 20.</li>
        <li class="step-list__item">Approver: Manager of the record owner.</li>
        <li class="step-list__item">Add Final Approval Action: Field Update setting Stage to "Discount Approved". Add Final Rejection Action setting Stage back to "Negotiation".</li>
        <li class="step-list__item">Activate the Approval Process.</li>
      </ol>

      <h2>Step 14: Reports and Dashboards</h2>
      <p><strong>Purpose:</strong> Management needs visibility into how well the support team is adhering to SLAs.</p>
      <ol class="step-list">
        <li class="step-list__item">App Launcher → Reports. Click <strong>New Report</strong>. Report Type: Cases.</li>
        <li class="step-list__item">Filter: All Cases, All Time. Group By: Owner and Status. Add a formula column to calculate SLA adherence.</li>
        <li class="step-list__item">Save as <code>SLA_Compliance_Report</code> in a Public Folder.</li>
        <li class="step-list__item">App Launcher → Dashboards → New. Name it <code>SLA_Compliance_Dashboard</code>.</li>
        <li class="step-list__item">Add a Gauge component showing total breached cases, and a Bar Chart showing cases by owner. Save and Activate.</li>
      </ol>
    `},{id:2,title:"TechNova Flow Automation — SLA, Routing & Escalation",difficulty:"Medium",category:"Flow Automation",company:"TechNova Solutions",subtitle:"Build 6 Flows: Screen Flow wizard, Before-Save & After-Save triggers, Scheduled Flow, and reusable Subflows.",tags:["Screen Flow","Record-Triggered Flow","Scheduled Flow","Subflow","Before-Save","After-Save"],description:"Continuing from Use Case 1, the data model is complete but nothing moves or reacts on its own yet. We build 6 Flows to automate Case creation, SLA calculation, queue routing, and breach detection.",learnings:["Differentiate between Screen, Record-Triggered, Scheduled, and Autolaunched Flows","Understand Before-Save vs After-Save trigger timing","Build reusable Subflows for DRY automation","Implement bulk-safe Scheduled Flows","Map the complete Order of Execution when a Case is created"],content:`
      <h2>Recap from Use Case 1</h2>
      <p>Use Case 1 built: <code>Subscription__c</code> object, custom fields on Case, Record Types, Profiles, sharing, validation, queues, and reporting. None of that data moves on its own yet — that's what Flow does.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Calculate Renewal Date (Autolaunched) &middot; Step 2 &rarr; Send Case Confirmation Email (Subflow) &middot; Step 3 &rarr; New Case Wizard (Screen Flow) &middot; Step 4 &rarr; Set SLA Due (Before-Save, Record-Triggered) &middot; Step 5 &rarr; Assign Case Queue (After-Save, Record-Triggered) &middot; Step 6 &rarr; SLA Breach Checker (Scheduled Flow) &middot; Step 7 &rarr; Consolidated Flow API Reference</p>
      </div>
<div class="callout callout--definition">
        <p class="callout__title">💡 Concept — What is Flow?</p>
        <p><strong>Flow</strong> is Salesforce's point-and-click automation tool. Instead of writing code, you assemble visual elements — get data, make a decision, change data, show a screen — and Salesforce executes that logic automatically.</p>
      </div>

      <h3>The Four Flow Types</h3>
      <table><thead><tr><th>Flow Type</th><th>Runs When</th><th>TechNova Example</th></tr></thead><tbody>
        <tr><td>Screen Flow</td><td>User clicks through a guided form</td><td>New Case Wizard</td></tr>
        <tr><td>Record-Triggered</td><td>Record is created/updated/deleted</td><td>SLA calculation, Queue assignment</td></tr>
        <tr><td>Scheduled</td><td>On a recurring schedule</td><td>SLA Breach Checker</td></tr>
        <tr><td>Autolaunched</td><td>Called by another Flow or Apex</td><td>Renewal Date Calculator</td></tr>
      </tbody></table>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Before-Save vs After-Save</p>
        <p><strong>Before-Save</strong> changes fields on the same record being saved, before it hits the database — faster, no extra DML. <strong>After-Save</strong> runs once the record exists and is needed when touching other records, sending emails, or anything beyond the triggering record.</p>
      </div>

      <h2>Flow 1: Calculate Renewal Date (Autolaunched)</h2>
      <p><strong>Purpose:</strong> The renewal-date formula will be needed by multiple Flows and later by Agentforce — building it once avoids duplicating logic.</p>
      <ol class="step-list">
        <li class="step-list__item">New Flow → <strong>Autolaunched Flow (No Trigger)</strong>.</li>
        <li class="step-list__item">Add input variable <code>subscriptionId</code> (Text, Available for Input = true).</li>
        <li class="step-list__item">Add <strong>Get Records</strong>: Object = <code>Subscription__c</code>, filter Id = subscriptionId.</li>
        <li class="step-list__item">Add Assignment: add 12 months to <code>End_Date__c</code>, store in output variable <code>renewalDate</code>.</li>
        <li class="step-list__item">Save as <code>Calculate_Renewal_Date</code>. Activate.</li>
      </ol>

      <h2>Flow 2: Send Case Confirmation Email (Subflow)</h2>
      <p><strong>Purpose:</strong> Both the internal wizard and the Community portal need the same confirmation email — build once, reuse everywhere.</p>
      <table><thead><tr><th>Component</th><th>API Name</th><th>Type</th><th>Input</th></tr></thead><tbody>
        <tr><td>Flow</td><td><code>Send_Case_Confirmation_Email</code></td><td>Autolaunched (Subflow)</td><td>caseId (Text)</td></tr>
      </tbody></table>

      <h2>Flow 3: New Case Wizard (Screen Flow)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Screen Flow</p>
        <p>A <strong>Screen Flow</strong> is the only Flow type with a user interface. It shows Screens, pausing for user input, then acts on what they entered.</p>
      </div>
      <p><strong>Purpose:</strong> Instead of a blank New Case form, the wizard guides agents through exactly the fields needed, in order, and auto-sends the confirmation email.</p>
      <ol class="step-list">
        <li class="step-list__item">New Flow → <strong>Screen Flow</strong>.</li>
        <li class="step-list__item"><strong>Screen 1</strong> (Select_Subscription): Lookup component for Subscription.</li>
        <li class="step-list__item"><strong>Screen 2</strong> (Enter_Case_Details): Subject, Description, Priority inputs.</li>
        <li class="step-list__item"><strong>Decision</strong> (Route_By_Plan): Branch on Plan__c to pre-set Priority (Enterprise → High).</li>
        <li class="step-list__item"><strong>Create Records</strong> (Create_Case): Insert the Case. Add a <strong>Fault Path</strong> for error handling.</li>
        <li class="step-list__item"><strong>Subflow</strong>: Call <code>Send_Case_Confirmation_Email</code>, passing the new Case Id.</li>
        <li class="step-list__item"><strong>Screen 3</strong> (Confirmation): Display the new Case Number.</li>
      </ol>

      <h2>Flow 4: Set SLA Due (Before-Save, Record-Triggered)</h2>
      <p><strong>Purpose:</strong> Every new Case needs <code>SLA_Due__c</code> set the instant it's created, regardless of which channel created it.</p>
      <ol class="step-list">
        <li class="step-list__item">New Flow → <strong>Record-Triggered Flow</strong>. Object: Case. Trigger: Created. Optimize: <strong>Fast Field Updates</strong>.</li>
        <li class="step-list__item"><strong>Decision</strong>: Branch on Priority (High / Medium / Low).</li>
        <li class="step-list__item"><strong>Assignment</strong>: Set <code>$Record.SLA_Due__c</code> = Now() + 4 hours (High), +1 day (Medium), +3 days (Low).</li>
      </ol>
      <table><thead><tr><th>API Name</th><th>Object</th><th>Trigger</th></tr></thead><tbody>
        <tr><td><code>Case_Set_SLA_Due_BeforeSave</code></td><td>Case</td><td>Before Save — Create</td></tr>
      </tbody></table>

      <h2>Flow 5: Assign Case Queue (After-Save, Record-Triggered)</h2>
      <p><strong>Purpose:</strong> Assigning the Owner to a Queue and emailing that team both require the Case to already exist.</p>
      <ol class="step-list">
        <li class="step-list__item">New Flow → <strong>Record-Triggered Flow</strong>. Object: Case. Trigger: Created. Optimize: <strong>Actions and Related Records</strong>.</li>
        <li class="step-list__item"><strong>Decision</strong>: Choose <code>Tier1_Support_Queue</code> or <code>Tier2_Support_Queue</code> based on Priority/Record Type.</li>
        <li class="step-list__item"><strong>Update Records</strong>: Set OwnerId to the chosen Queue Id.</li>
        <li class="step-list__item"><strong>Send Email</strong> action to notify the queue's team. Add <strong>Fault Paths</strong> on all DML elements.</li>
      </ol>

      <h2>Flow 6: SLA Breach Checker (Scheduled Flow)</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Why a Scheduled Flow?</p>
        <p>SLA breaches must be caught even if nobody edits the Case. A purely reactive (record-triggered) Flow would never notice a Case sitting untouched past its due time. Only a time-based check can catch that.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">New Flow → <strong>Schedule-Triggered Flow</strong>. Frequency: Hourly.</li>
        <li class="step-list__item"><strong>Get Records</strong>: Case where Status ≠ Closed AND SLA_Due__c < NOW().</li>
        <li class="step-list__item"><strong>Loop</strong> over results → <strong>Assignment</strong>: set Escalated__c = true, collect into a collection variable.</li>
        <li class="step-list__item"><strong>After the loop</strong> (never inside): <strong>Update Records</strong> to save the collection in bulk.</li>
        <li class="step-list__item"><strong>Send Email</strong> to notify Support Manager.</li>
      </ol>

      <h2>Order of Execution (When a Case Is Created)</h2>
      <table><thead><tr><th>Order</th><th>What Runs</th></tr></thead><tbody>
        <tr><td>1</td><td>Validation Rules (from Use Case 1)</td></tr>
        <tr><td>2</td><td><code>Case_Set_SLA_Due_BeforeSave</code> sets SLA_Due__c</td></tr>
        <tr><td>3</td><td>Record commits to database, gets an Id</td></tr>
        <tr><td>4</td><td><code>Case_Assign_Queue_AfterSave</code> sets Owner, sends routing email</td></tr>
        <tr><td>5</td><td><code>Send_Case_Confirmation_Email</code> emails the customer</td></tr>
        <tr><td>6</td><td>Later, on schedule: <code>SLA_Breach_Checker_Scheduled</code> checks breaches</td></tr>
      </tbody></table>

      <h2>Consolidated Flow API Reference</h2>
      <table><thead><tr><th>#</th><th>Flow Name</th><th>API Name</th><th>Type</th></tr></thead><tbody>
        <tr><td>1</td><td>Calculate Renewal Date</td><td><code>Calculate_Renewal_Date</code></td><td>Autolaunched</td></tr>
        <tr><td>2</td><td>Send Case Confirmation</td><td><code>Send_Case_Confirmation_Email</code></td><td>Subflow</td></tr>
        <tr><td>3</td><td>New Case Wizard</td><td><code>New_Case_Wizard</code></td><td>Screen Flow</td></tr>
        <tr><td>4</td><td>Set SLA Due</td><td><code>Case_Set_SLA_Due_BeforeSave</code></td><td>Before-Save</td></tr>
        <tr><td>5</td><td>Assign Case Queue</td><td><code>Case_Assign_Queue_AfterSave</code></td><td>After-Save</td></tr>
        <tr><td>6</td><td>SLA Breach Checker</td><td><code>SLA_Breach_Checker_Scheduled</code></td><td>Scheduled</td></tr>
      </tbody></table>
    `},{id:3,title:"MedFirst Clinic — Patient Management & Appointment System",difficulty:"Easy",category:"Admin / Data Modeling",company:"MedFirst Healthcare",subtitle:"Design a complete healthcare data model with custom objects for Patients, Appointments, and Prescriptions.",tags:["Custom Objects","Relationships","Page Layouts","Formula Fields","Roll-Up Summary"],description:"MedFirst is a multi-location clinic chain that needs to track patients, appointments, doctors, and prescriptions in Salesforce — replacing their spreadsheet-based system.",learnings:["Design multi-object data models with Lookup and Master-Detail relationships","Use Formula fields for calculated values","Configure Roll-Up Summary fields on Master-Detail relationships","Create Page Layouts for different user personas","Build a relationship map across 4+ custom objects"],content:`
      <h2>Background</h2>
      <p>MedFirst Healthcare operates 12 clinic locations. Doctors, nurses, and receptionists all use different systems today (paper, Excel, email). They want a unified Salesforce system for patient records, appointment scheduling, doctor assignments, and prescription tracking.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Objects We Will Create</p>
        <p>Patient__c · Doctor__c · Appointment__c · Prescription__c · Clinic_Location__c</p>
      </div>

      <h2>Step 1: Design the Data Model</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Lookup vs Master-Detail</p>
        <p>A <strong>Lookup Relationship</strong> is a loose link — the child can exist without a parent. A <strong>Master-Detail Relationship</strong> is a tight parent-child bond — deleting the parent deletes all children, and the child inherits the parent's sharing/security. Master-Detail also enables <strong>Roll-Up Summary</strong> fields.</p>
      </div>
      <p><strong>Purpose:</strong> We need Appointment to be tightly bound to Patient (if a patient record is deleted, their appointments should go too), but Doctor is a loose reference (a doctor can exist independently).</p>
      <table><thead><tr><th>Object</th><th>API Name</th><th>Key Relationships</th></tr></thead><tbody>
        <tr><td>Clinic Location</td><td><code>Clinic_Location__c</code></td><td>None (top-level)</td></tr>
        <tr><td>Doctor</td><td><code>Doctor__c</code></td><td>Lookup → Clinic_Location__c</td></tr>
        <tr><td>Patient</td><td><code>Patient__c</code></td><td>Lookup → Clinic_Location__c (primary location)</td></tr>
        <tr><td>Appointment</td><td><code>Appointment__c</code></td><td>Master-Detail → Patient__c, Lookup → Doctor__c</td></tr>
        <tr><td>Prescription</td><td><code>Prescription__c</code></td><td>Master-Detail → Appointment__c</td></tr>
      </tbody></table>

      <h2>Step 2: Fields on Patient__c</h2>
      <table><thead><tr><th>Field Label</th><th>API Name</th><th>Type</th><th>Details</th></tr></thead><tbody>
        <tr><td>First Name</td><td><code>First_Name__c</code></td><td>Text(80)</td><td>Required</td></tr>
        <tr><td>Last Name</td><td><code>Last_Name__c</code></td><td>Text(80)</td><td>Required</td></tr>
        <tr><td>Date of Birth</td><td><code>Date_of_Birth__c</code></td><td>Date</td><td></td></tr>
        <tr><td>Age</td><td><code>Age__c</code></td><td>Formula (Number)</td><td><code>FLOOR((TODAY() - Date_of_Birth__c) / 365.25)</code></td></tr>
        <tr><td>Blood Group</td><td><code>Blood_Group__c</code></td><td>Picklist</td><td>A+, A-, B+, B-, AB+, AB-, O+, O-</td></tr>
        <tr><td>Phone</td><td><code>Phone__c</code></td><td>Phone</td><td></td></tr>
        <tr><td>Email</td><td><code>Email__c</code></td><td>Email</td><td></td></tr>
        <tr><td>Total Appointments</td><td><code>Total_Appointments__c</code></td><td>Roll-Up Summary</td><td>COUNT of Appointment__c records</td></tr>
      </tbody></table>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Formula Fields</p>
        <p>A <strong>Formula Field</strong> is read-only and auto-calculated from other fields. The Age formula above computes the patient's age from their Date of Birth, updating automatically every day.</p>
      </div>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Roll-Up Summary Fields</p>
        <p>A <strong>Roll-Up Summary</strong> field performs calculations (COUNT, SUM, MIN, MAX) across child records in a Master-Detail relationship. Here, it counts how many appointments each patient has had — automatically, with no code.</p>
      </div>

      <h2>Step 3: Fields on Appointment__c</h2>
      <table><thead><tr><th>Field Label</th><th>API Name</th><th>Type</th></tr></thead><tbody>
        <tr><td>Patient</td><td><code>Patient__c</code></td><td>Master-Detail(Patient__c)</td></tr>
        <tr><td>Doctor</td><td><code>Doctor__c</code></td><td>Lookup(Doctor__c)</td></tr>
        <tr><td>Appointment Date</td><td><code>Appointment_Date__c</code></td><td>Date/Time</td></tr>
        <tr><td>Status</td><td><code>Status__c</code></td><td>Picklist: Scheduled, Completed, Cancelled, No-Show</td></tr>
        <tr><td>Notes</td><td><code>Notes__c</code></td><td>Long Text Area</td></tr>
        <tr><td>Duration (min)</td><td><code>Duration__c</code></td><td>Number</td></tr>
      </tbody></table>

      <h2>Step 4: Page Layouts by Persona</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Page Layouts</p>
        <p>A <strong>Page Layout</strong> controls which fields, related lists, and buttons appear on a record's detail/edit screen. Different profiles can see different layouts.</p>
      </div>
      <table><thead><tr><th>Layout Name</th><th>Assigned To</th><th>Visible Sections</th></tr></thead><tbody>
        <tr><td>Patient - Reception Layout</td><td>Receptionist profile</td><td>Demographics, Contact Info, Appointment History</td></tr>
        <tr><td>Patient - Doctor Layout</td><td>Doctor profile</td><td>Medical History, Prescriptions, Lab Results, Notes</td></tr>
      </tbody></table>

      <h2>Step 5: Lightning Record Pages (Flexipages)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Lightning App Builder</p>
        <p>While Page Layouts control the classic "Details" tab, <strong>Lightning Record Pages</strong> control the entire screen structure (tabs, rich text, sidebars, related list components, and dynamic visibility rules).</p>
      </div>
      <p><strong>Purpose:</strong> Receptionists need a streamlined view of upcoming appointments, while Doctors need quick access to prescribe medication on the same screen.</p>
      <ol class="step-list">
        <li class="step-list__item">Go to a Patient record → Click Gear Icon → <strong>Edit Page</strong>.</li>
        <li class="step-list__item">Choose the <strong>Header and Right Sidebar</strong> template.</li>
        <li class="step-list__item">In the main column, drop a <strong>Tabs</strong> component. Name the tabs "Details", "Appointments", and "Prescriptions".</li>
        <li class="step-list__item">Drag the <strong>Record Detail</strong> component into the "Details" tab.</li>
        <li class="step-list__item">Drag a <strong>Related List - Single</strong> (Appointments) into the right sidebar so it's always visible.</li>
        <li class="step-list__item">Click <strong>Save</strong> and <strong>Activate</strong>. Assign it to specific Profiles (Doctor vs Receptionist).</li>
      </ol>

      <h2>Step 6: Data Security & Sharing (OWD)</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ HIPAA Compliance</p>
        <p>In healthcare scenarios, medical data must be strictly controlled. Only the assigned Doctor should see sensitive medical notes.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Sharing Settings.</li>
        <li class="step-list__item">Set <code>Patient__c</code> to <strong>Private</strong>. (Since Appointment is Master-Detail, it inherits Private).</li>
        <li class="step-list__item">Create a <strong>Sharing Rule</strong>: If <code>Patient.Status = Active</code>, share Read-Only with the Receptionist Public Group.</li>
        <li class="step-list__item">Doctors will get access to their specific patients via Apex manual sharing or specific criteria-based sharing rules in later modules.</li>
      </ol>

      <h2>Consolidated API Reference</h2>
      <table><thead><tr><th>Component</th><th>API Name</th><th>Type</th></tr></thead><tbody>
        <tr><td>Clinic Location</td><td><code>Clinic_Location__c</code></td><td>Custom Object</td></tr>
        <tr><td>Doctor</td><td><code>Doctor__c</code></td><td>Custom Object</td></tr>
        <tr><td>Patient</td><td><code>Patient__c</code></td><td>Custom Object</td></tr>
        <tr><td>Appointment</td><td><code>Appointment__c</code></td><td>Custom Object</td></tr>
        <tr><td>Prescription</td><td><code>Prescription__c</code></td><td>Custom Object</td></tr>
      </tbody></table>
    `},{id:4,title:"SkyHigh Realty — Property Listings, Lead Tracking & Sales Pipeline",difficulty:"Easy",category:"Admin / Sales Process",company:"SkyHigh Realty",subtitle:"Configure the complete sales pipeline: Lead capture, qualification, Opportunity stages, Products & Price Books.",tags:["Leads","Lead Conversion","Opportunities","Sales Process","Products","Price Books","Web-to-Lead"],description:"SkyHigh Realty is a commercial real estate firm. Leads come from the website, agents qualify them, and deals move through a custom sales process. They need property listings as Products with different pricing tiers.",learnings:["Set up Web-to-Lead for capturing website inquiries","Create Lead Assignment Rules for territory-based routing","Map Lead conversion to Account, Contact, and Opportunity","Define a custom Sales Process with business-specific Opportunity stages","Configure Products and Price Books for tiered pricing"],content:`
      <h2>Background</h2>
      <p>SkyHigh Realty sells commercial properties across 5 cities. Leads pour in from their website, property listing sites, and referrals. Currently, leads get lost in email, agents don't track follow-ups, and management has no pipeline visibility.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Configure Web-to-Lead &middot; Step 2 &rarr; Lead Assignment Rules &middot; Step 3 &rarr; Lead Conversion Mapping &middot; Step 4 &rarr; Custom Sales Process & Opportunity Stages &middot; Step 5 &rarr; Products & Price Books</p>
      </div>
<h2>Step 1: Configure Web-to-Lead</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Web-to-Lead</p>
        <p><strong>Web-to-Lead</strong> automatically creates Lead records from an HTML form on your website. Salesforce generates the form HTML; you paste it into your site. Each submission creates a Lead in your org — up to 500/day in most editions.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Quick Find → <strong>Web-to-Lead</strong> → Create Web-to-Lead Form.</li>
        <li class="step-list__item">Select fields: First Name, Last Name, Email, Phone, Company, <code>Property_Interest__c</code> (custom picklist), City.</li>
        <li class="step-list__item">Set Return URL (thank-you page). Click Generate.</li>
        <li class="step-list__item">Copy the HTML and embed it on the SkyHigh website.</li>
      </ol>

      <h2>Step 2: Lead Assignment Rules</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Lead Assignment Rules</p>
        <p>An <strong>Assignment Rule</strong> automatically assigns new Leads (or Cases) to users or queues based on criteria you define. Only one Assignment Rule can be active at a time, but it can have many ordered entries.</p>
      </div>
      <table><thead><tr><th>Rule Entry</th><th>Criteria</th><th>Assign To</th></tr></thead><tbody>
        <tr><td>Entry 1</td><td>City = "Mumbai"</td><td>Mumbai_Sales_Queue</td></tr>
        <tr><td>Entry 2</td><td>City = "Delhi"</td><td>Delhi_Sales_Queue</td></tr>
        <tr><td>Entry 3</td><td>City = "Bangalore"</td><td>Bangalore_Sales_Queue</td></tr>
        <tr><td>Default</td><td>No match</td><td>National_Sales_Queue</td></tr>
      </tbody></table>

      <h2>Step 3: Lead Conversion Mapping</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Lead Conversion</p>
        <p>When a Lead is qualified, you <strong>convert</strong> it — Salesforce creates an Account, Contact, and optionally an Opportunity from the Lead's data. Custom field mappings control which Lead fields map to which Account/Contact/Opportunity fields.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Object Manager → Lead → <strong>Map Lead Fields</strong>.</li>
        <li class="step-list__item">Map <code>Property_Interest__c</code> (Lead) → <code>Property_Type__c</code> (Opportunity).</li>
        <li class="step-list__item">Map <code>Budget_Range__c</code> (Lead) → <code>Budget__c</code> (Opportunity).</li>
      </ol>

      <h2>Step 4: Custom Sales Process & Opportunity Stages</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Sales Process</p>
        <p>A <strong>Sales Process</strong> defines which Opportunity Stages are available for a given Record Type. This lets you have different pipelines (e.g., rental vs purchase) on the same Opportunity object.</p>
      </div>
      <table><thead><tr><th>Stage Name</th><th>Probability</th><th>Type</th></tr></thead><tbody>
        <tr><td>Inquiry Received</td><td>10%</td><td>Open</td></tr>
        <tr><td>Site Visit Scheduled</td><td>25%</td><td>Open</td></tr>
        <tr><td>Site Visit Completed</td><td>40%</td><td>Open</td></tr>
        <tr><td>Negotiation</td><td>60%</td><td>Open</td></tr>
        <tr><td>Legal Review</td><td>80%</td><td>Open</td></tr>
        <tr><td>Closed Won</td><td>100%</td><td>Closed/Won</td></tr>
        <tr><td>Closed Lost</td><td>0%</td><td>Closed/Lost</td></tr>
      </tbody></table>

      <h2>Step 5: Products & Price Books</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Products & Price Books</p>
        <p><strong>Products</strong> are the items/services you sell. A <strong>Price Book</strong> is a collection of products with specific prices. The <strong>Standard Price Book</strong> holds default prices; custom Price Books hold region-specific or partner-specific pricing.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Create Products: "Commercial Office 1000sqft", "Retail Space 500sqft", "Warehouse Unit".</li>
        <li class="step-list__item">Add Standard Price Book entries for each product.</li>
        <li class="step-list__item">Create a custom Price Book "Mumbai Pricing" with city-specific rates.</li>
        <li class="step-list__item">On Opportunities, agents add Opportunity Line Items (Products) to specify which property and price apply to each deal.</li>
      </ol>

      <h2>Consolidated API Reference</h2>
      <table><thead><tr><th>Component</th><th>API Name / Detail</th></tr></thead><tbody>
        <tr><td>Custom Field (Lead)</td><td><code>Property_Interest__c</code></td></tr>
        <tr><td>Custom Field (Opp)</td><td><code>Property_Type__c</code>, <code>Budget__c</code></td></tr>
        <tr><td>Sales Process</td><td><code>Property_Sales_Process</code></td></tr>
        <tr><td>Queues</td><td><code>Mumbai_Sales_Queue</code>, <code>Delhi_Sales_Queue</code>, etc.</td></tr>
      </tbody></table>
    `},{id:5,title:"GreenLeaf NGO — Donation Tracking, Campaigns & Volunteer Management",difficulty:"Easy",category:"Admin / Data Modeling",company:"GreenLeaf Foundation",subtitle:"Build a nonprofit CRM: Campaign ROI tracking, donation records, volunteer hours, and tax receipt automation.",tags:["Campaigns","Campaign Members","Custom Objects","Reports","Dashboards","Formula Fields"],description:"GreenLeaf Foundation runs environmental campaigns across India. They need to track donations, manage volunteers, measure campaign ROI, and generate tax receipts.",learnings:["Use standard Campaigns and Campaign Members for event/drive tracking","Build custom objects for Donations and Volunteer Hours","Create Formula fields for automatic calculations","Build comprehensive Reports and Dashboards for nonprofit analytics","Understand Campaign Hierarchy for parent-child campaign tracking"],content:`
      <h2>Background</h2>
      <p>GreenLeaf Foundation runs tree-planting drives, fundraising galas, and awareness campaigns. They track everything in spreadsheets, losing visibility into which campaigns generate the most donations, who their top volunteers are, and whether they're meeting annual fundraising targets.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Custom Objects &middot; Step 2 &rarr; Fields on Donation__c &middot; Step 3 &rarr; Campaign Configuration &middot; Step 4 &rarr; Reports & Dashboard</p>
      </div>
<h2>Step 1: Custom Objects</h2>
      <table><thead><tr><th>Object</th><th>API Name</th><th>Relationships</th></tr></thead><tbody>
        <tr><td>Donation</td><td><code>Donation__c</code></td><td>Lookup → Contact (Donor), Lookup → Campaign</td></tr>
        <tr><td>Volunteer Activity</td><td><code>Volunteer_Activity__c</code></td><td>Lookup → Contact, Lookup → Campaign</td></tr>
      </tbody></table>

      <h2>Step 2: Fields on Donation__c</h2>
      <table><thead><tr><th>Field</th><th>API Name</th><th>Type</th><th>Details</th></tr></thead><tbody>
        <tr><td>Donor</td><td><code>Donor__c</code></td><td>Lookup(Contact)</td><td>Required</td></tr>
        <tr><td>Amount</td><td><code>Amount__c</code></td><td>Currency</td><td>Required</td></tr>
        <tr><td>Donation Date</td><td><code>Donation_Date__c</code></td><td>Date</td><td>Default = TODAY()</td></tr>
        <tr><td>Payment Method</td><td><code>Payment_Method__c</code></td><td>Picklist</td><td>Cash, Bank Transfer, UPI, Cheque, Online</td></tr>
        <tr><td>Tax Receipt #</td><td><code>Tax_Receipt_Number__c</code></td><td>Auto Number</td><td>Format: GF-{00000}</td></tr>
        <tr><td>Campaign</td><td><code>Campaign__c</code></td><td>Lookup(Campaign)</td><td>Links donation to the fundraising campaign</td></tr>
        <tr><td>Financial Year</td><td><code>Financial_Year__c</code></td><td>Formula (Text)</td><td><code>IF(MONTH(Donation_Date__c)&gt;=4, TEXT(YEAR(Donation_Date__c))+"-"+TEXT(YEAR(Donation_Date__c)+1), TEXT(YEAR(Donation_Date__c)-1)+"-"+TEXT(YEAR(Donation_Date__c)))</code></td></tr>
      </tbody></table>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Auto Number Fields</p>
        <p>An <strong>Auto Number</strong> field automatically generates a unique, sequential identifier for each record (e.g., GF-00001, GF-00002). It's read-only and guaranteed unique — perfect for receipt numbers, case numbers, or invoice IDs.</p>
      </div>

      <h2>Step 3: Campaign Configuration</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Campaigns & Campaign Members</p>
        <p>A <strong>Campaign</strong> is a standard object for tracking marketing or fundraising initiatives. <strong>Campaign Members</strong> are the Leads/Contacts associated with that campaign, each with a Status (Sent, Responded, Donated). <strong>Campaign Hierarchy</strong> lets you nest child campaigns under a parent for rollup tracking.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Create a parent Campaign: <strong>"FY 2025 Annual Fundraising"</strong>.</li>
        <li class="step-list__item">Create child Campaigns: "Gala Dinner Nov 2024", "Tree Drive Q1", "Corporate Matching".</li>
        <li class="step-list__item">Customize Campaign Member Statuses: Invited → Registered → Attended → Donated.</li>
        <li class="step-list__item">The parent campaign automatically rolls up stats from all children.</li>
      </ol>

      <h2>Step 4: Reports & Dashboard</h2>
      <table><thead><tr><th>Report</th><th>Type</th><th>Purpose</th></tr></thead><tbody>
        <tr><td>Donations by Campaign</td><td>Summary</td><td>SUM of Amount, grouped by Campaign</td></tr>
        <tr><td>Top Donors This Year</td><td>Summary</td><td>SUM of Amount, grouped by Donor, sorted desc</td></tr>
        <tr><td>Volunteer Hours by Month</td><td>Matrix</td><td>Rows: Volunteer, Columns: Month</td></tr>
        <tr><td>Campaign ROI</td><td>Summary</td><td>Campaign Cost vs Total Donations</td></tr>
      </tbody></table>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Report Types: Tabular, Summary, Matrix, Joined</p>
        <p><strong>Tabular</strong>: flat rows, no grouping. <strong>Summary</strong>: grouped by rows with subtotals. <strong>Matrix</strong>: grouped by both rows AND columns (like a pivot table). <strong>Joined</strong>: combines multiple report blocks side by side.</p>
      </div>
    `},{id:6,title:"SecureBank — Role Hierarchy, OWD, Sharing Rules & Field-Level Security",difficulty:"Easy",category:"Security Model",company:"SecureBank Financial",subtitle:"Design a complete security model: Private OWD, 4-level role hierarchy, criteria-based sharing, FLS, and Permission Sets.",tags:["OWD","Role Hierarchy","Sharing Rules","Profiles","Permission Sets","FLS"],description:"SecureBank needs strict data access controls. Branch managers should see their team's records, regional heads see their region, and compliance officers need cross-cutting access to flagged accounts.",learnings:["Design a multi-level Role Hierarchy mirroring org structure","Set OWD to Private and selectively open access","Create ownership-based and criteria-based Sharing Rules","Configure Field-Level Security to hide sensitive data","Layer Permission Sets on top of minimal Profiles"],content:`
      <h2>Background</h2>
      <p>SecureBank has 500+ employees across 20 branches in 4 regions. Loan officers should only see their own clients. Branch managers see their branch. Regional heads see their entire region. The compliance team (which doesn't sit in any branch hierarchy) needs to see flagged high-risk accounts across all regions.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Design the Role Hierarchy &middot; Step 2 &rarr; Set OWD &middot; Step 3 &rarr; Sharing Rules for Compliance Team &middot; Step 4 &rarr; Field-Level Security (FLS) &middot; Step 5 &rarr; Permission Set for Exception Access</p>
      </div>
<h2>Step 1: Design the Role Hierarchy</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — How Role Hierarchy Grants Access</p>
        <p>Role Hierarchy automatically gives <strong>upward visibility</strong>. If OWD is Private, a Loan Officer can only see their own records. Their Branch Manager (one level up) can see all Loan Officers' records in that branch. The Regional Head sees all branches in their region. The CEO sees everything.</p>
      </div>
      <pre><code>CEO
â”œâ”€â”€ Regional Head (North)
â”‚   â”œâ”€â”€ Branch Manager (Delhi)
â”‚   â”‚   â”œâ”€â”€ Senior Loan Officer
â”‚   â”‚   â””â”€â”€ Loan Officer
â”‚   â””â”€â”€ Branch Manager (Chandigarh)
â”œâ”€â”€ Regional Head (South)
â”‚   â”œâ”€â”€ Branch Manager (Bangalore)
â”‚   â””â”€â”€ Branch Manager (Chennai)
â”œâ”€â”€ Regional Head (West)
â””â”€â”€ Regional Head (East)
    â””â”€â”€ Compliance Officer (separate hierarchy branch)</code></pre>

      <h2>Step 2: Set OWD</h2>
      <table><thead><tr><th>Object</th><th>OWD Setting</th><th>Rationale</th></tr></thead><tbody>
        <tr><td>Account</td><td>Private</td><td>Client data is confidential per branch</td></tr>
        <tr><td>Contact</td><td>Controlled by Parent</td><td>Follows Account's sharing</td></tr>
        <tr><td>Opportunity (Loan)</td><td>Private</td><td>Loan details are sensitive</td></tr>
        <tr><td>Case</td><td>Private</td><td>Customer complaints are confidential</td></tr>
        <tr><td>Report</td><td>Private</td><td>Management reports restricted</td></tr>
      </tbody></table>

      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Key Rule</p>
        <p>OWD sets the <strong>most restrictive baseline</strong>. You can only <em>open up</em> access from here using Role Hierarchy, Sharing Rules, or Manual Sharing. You can <strong>never restrict further</strong> than OWD.</p>
      </div>

      <h2>Step 3: Sharing Rules for Compliance Team</h2>
      <p><strong>Problem:</strong> Compliance Officers don't sit in any branch's hierarchy, so Role Hierarchy doesn't give them access to any client records. But they need to see all accounts flagged as high-risk.</p>
      <ol class="step-list">
        <li class="step-list__item">Create a <strong>Public Group</strong>: <code>Compliance_Team</code> — add all users with the Compliance Officer role.</li>
        <li class="step-list__item">Create a <strong>Criteria-Based Sharing Rule</strong> on Account: Where <code>Risk_Level__c = "High"</code> → Share Read/Write with <code>Compliance_Team</code>.</li>
        <li class="step-list__item">Create a second rule on Opportunity: Where <code>Amount &gt; 5000000</code> → Share Read Only with <code>Compliance_Team</code>.</li>
      </ol>

      <h2>Step 4: Field-Level Security (FLS)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Field-Level Security</p>
        <p>Even if a user can see a record (via OWD/sharing), <strong>FLS</strong> can hide specific fields on that record. It's controlled per Profile. For example, a Loan Officer can see the Account but not the "Credit Score" field.</p>
      </div>
      <table><thead><tr><th>Field</th><th>Loan Officer</th><th>Branch Manager</th><th>Compliance</th></tr></thead><tbody>
        <tr><td>Account.Credit_Score__c</td><td>Hidden</td><td>Read Only</td><td>Read/Edit</td></tr>
        <tr><td>Account.Risk_Level__c</td><td>Read Only</td><td>Read Only</td><td>Read/Edit</td></tr>
        <tr><td>Account.Annual_Revenue__c</td><td>Hidden</td><td>Read Only</td><td>Read Only</td></tr>
        <tr><td>Opportunity.Interest_Rate__c</td><td>Read/Edit</td><td>Read/Edit</td><td>Read Only</td></tr>
      </tbody></table>

      <h2>Step 5: Permission Set for Exception Access</h2>
      <p><strong>Scenario:</strong> One senior Loan Officer has been promoted to handle VIP clients and needs to see Credit Scores — but you don't want to create a whole new Profile just for one person.</p>
      <table><thead><tr><th>Permission Set</th><th>API Name</th><th>Grants</th></tr></thead><tbody>
        <tr><td>VIP Client Access</td><td><code>VIP_Client_Access</code></td><td>Read access to Account.Credit_Score__c, Account.Annual_Revenue__c</td></tr>
      </tbody></table>
    `},{id:7,title:"EduTrack Institute — Validation Rules, Formulas & Data Quality",difficulty:"Easy",category:"Admin / Data Quality",company:"EduTrack Institute",subtitle:"Enforce business rules with 8 Validation Rules, create complex Formula fields, and set up Duplicate Rules.",tags:["Validation Rules","Formula Fields","Cross-Object Formulas","Duplicate Rules","Matching Rules"],description:"EduTrack manages student enrollment for 50+ courses. Data quality issues (missing emails, invalid dates, duplicate students) cause billing errors and lost communications. They need bulletproof data enforcement.",learnings:["Write Validation Rule formulas using AND, OR, REGEX, ISBLANK, ISPICKVAL","Create cross-object Formula fields","Set up Matching Rules and Duplicate Rules","Use the PRIORVALUE function for change-based validation","Understand error message placement (field-level vs page-level)"],content:`
      <h2>Background</h2>
      <p>EduTrack's data problems: students enroll without email addresses (causing billing failures), enrollment dates are set in the past, duplicate student records exist (same email, different names), and courses get marked "Completed" without a final grade. We'll fix all of this with validation rules and data quality tools.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Require Email on Active Students &middot; Step 2 &rarr; Enrollment Date Cannot Be in the Past &middot; Step 3 &rarr; Phone Number Must Be 10 Digits &middot; Step 4 &rarr; Cannot Close Course Without Grade &middot; Step 5 &rarr; Prevent Reopening Closed Enrollments &middot; Step 6 &rarr; End Date Must Be After Start Date &middot; Step 7 &rarr; Discount Cannot Exceed 30% Without Manager &middot; Step 8 &rarr; Duplicate Rules &middot; Step 9 &rarr; Consolidated Validation Rules Reference</p>
      </div>
<h2>Validation Rule 1: Require Email on Active Students</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Validation Rule Formulas</p>
        <p>A Validation Rule formula must evaluate to <strong>TRUE to block the save</strong>. Think of it as: "Block if this bad condition is true." Common functions: <code>ISBLANK()</code>, <code>ISPICKVAL()</code>, <code>REGEX()</code>, <code>AND()</code>, <code>OR()</code>, <code>PRIORVALUE()</code>.</p>
      </div>
      <p><strong>Rule Name:</strong> <code>Require_Email_Active_Student</code></p>
      <pre><code>AND(
  ISPICKVAL(Status__c, "Active"),
  ISBLANK(Email__c)
)</code></pre>
      <p><strong>Error:</strong> "Active students must have an email address." Location: <code>Email__c</code> field.</p>

      <h2>Validation Rule 2: Enrollment Date Cannot Be in the Past</h2>
      <p><strong>Rule Name:</strong> <code>Enrollment_Date_Not_Past</code></p>
      <pre><code>AND(
  ISNEW(),
  Enrollment_Date__c &lt; TODAY()
)</code></pre>
      <p><strong>Error:</strong> "Enrollment date cannot be in the past for new enrollments."</p>

      <div class="callout callout--tip">
        <p class="callout__title">💡 ISNEW() vs ISCHANGED()</p>
        <p><code>ISNEW()</code> returns true only when the record is being created for the first time. <code>ISCHANGED(field)</code> returns true when a specific field's value is different from its previous value. <code>PRIORVALUE(field)</code> returns the field's value before the current edit.</p>
      </div>

      <h2>Validation Rule 3: Phone Number Must Be 10 Digits</h2>
      <p><strong>Rule Name:</strong> <code>Phone_Must_Be_10_Digits</code></p>
      <pre><code>AND(
  NOT(ISBLANK(Phone__c)),
  NOT(REGEX(Phone__c, "[0-9]{10}"))
)</code></pre>

      <h2>Validation Rule 4: Cannot Close Course Without Grade</h2>
      <p><strong>Rule Name:</strong> <code>Require_Grade_On_Completion</code></p>
      <pre><code>AND(
  ISPICKVAL(Status__c, "Completed"),
  ISBLANK(TEXT(Final_Grade__c))
)</code></pre>

      <h2>Validation Rule 5: Prevent Reopening Closed Enrollments</h2>
      <p><strong>Rule Name:</strong> <code>Prevent_Reopen_Closed</code></p>
      <pre><code>AND(
  NOT(ISNEW()),
  ISPICKVAL(PRIORVALUE(Status__c), "Closed"),
  NOT(ISPICKVAL(Status__c, "Closed"))
)</code></pre>

      <h2>Validation Rule 6: End Date Must Be After Start Date</h2>
      <pre><code>End_Date__c &lt; Start_Date__c</code></pre>

      <h2>Validation Rule 7: Discount Cannot Exceed 30% Without Manager</h2>
      <pre><code>AND(
  Discount_Percent__c &gt; 30,
  $Profile.Name &lt;&gt; "Sales Manager"
)</code></pre>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — $Profile in Formulas</p>
        <p>The <code>$Profile</code> global variable gives access to the current user's Profile information. <code>$Profile.Name</code> is the Profile name — useful for making validation rules that only apply to certain profiles.</p>
      </div>

      <h2>Step 8: Duplicate Rules</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Matching Rules & Duplicate Rules</p>
        <p>A <strong>Matching Rule</strong> defines what "looks like a duplicate" (e.g., same email). A <strong>Duplicate Rule</strong> defines what to do when a match is found: <strong>Block</strong> (prevent save), <strong>Alert</strong> (warn but allow), or <strong>Report</strong> (log for review).</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Matching Rules → New on Student__c. Match on <code>Email__c</code> (Exact match).</li>
        <li class="step-list__item">Setup → Duplicate Rules → New on Student__c. Action: <strong>Block</strong> on Create, <strong>Alert</strong> on Edit.</li>
        <li class="step-list__item">Activate both rules.</li>
      </ol>

      <h2>Consolidated Validation Rules Reference</h2>
      <table><thead><tr><th>#</th><th>Rule Name</th><th>Object</th><th>Blocks When</th></tr></thead><tbody>
        <tr><td>1</td><td><code>Require_Email_Active_Student</code></td><td>Student__c</td><td>Active + no email</td></tr>
        <tr><td>2</td><td><code>Enrollment_Date_Not_Past</code></td><td>Enrollment__c</td><td>New record + past date</td></tr>
        <tr><td>3</td><td><code>Phone_Must_Be_10_Digits</code></td><td>Student__c</td><td>Invalid phone format</td></tr>
        <tr><td>4</td><td><code>Require_Grade_On_Completion</code></td><td>Enrollment__c</td><td>Completed + no grade</td></tr>
        <tr><td>5</td><td><code>Prevent_Reopen_Closed</code></td><td>Enrollment__c</td><td>Status changed from Closed</td></tr>
        <tr><td>6</td><td><code>End_After_Start</code></td><td>Course__c</td><td>End before start date</td></tr>
        <tr><td>7</td><td><code>Discount_Limit_Non_Manager</code></td><td>Enrollment__c</td><td>Discount > 30% by non-manager</td></tr>
      </tbody></table>
    `},{id:8,title:"GlobalShip Logistics — Approval Processes, Queues & Escalation Rules",difficulty:"Easy",category:"Admin / Process Automation",company:"GlobalShip Logistics",subtitle:"Build multi-step approval workflows, case queues with assignment rules, and time-dependent escalation.",tags:["Approval Processes","Queues","Assignment Rules","Escalation Rules","Email Alerts"],description:"GlobalShip handles thousands of shipping orders daily. High-value shipments need manager approval, support cases need auto-routing to the right team queue, and unresolved cases must escalate after 24 hours.",learnings:["Create multi-step Approval Processes with conditional routing","Build Case Assignment Rules with ordered entries","Set up time-dependent Escalation Rules","Configure Email Alerts and Field Updates as approval actions","Understand the difference between Queues, Assignment Rules, and Escalation Rules"],content:`
      <h2>Background</h2>
      <p>GlobalShip processes 2,000+ shipping orders daily. Any shipment over â‚¹5,00,000 needs Finance Manager approval. Any shipment of hazardous materials needs Safety Officer approval too. Support cases come in via email and need auto-routing. Cases unresolved for 24+ hours should auto-escalate to the team lead.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Multi-Step Approval Process &middot; Step 2 &rarr; Case Assignment Rules &middot; Step 3 &rarr; Escalation Rules</p>
      </div>
<h2>Part A: Multi-Step Approval Process</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Approval Processes</p>
        <p>An <strong>Approval Process</strong> is a workflow where a record is "submitted for approval," <strong>locked</strong> (preventing edits), and routed to approver(s). On Approve or Reject, you can trigger field updates, email alerts, or outbound messages. Multi-step approvals route through multiple approvers sequentially.</p>
      </div>

      <h3>Build Steps</h3>
      <ol class="step-list">
        <li class="step-list__item">Setup → Approval Processes → Object: <code>Shipment__c</code> → Create New.</li>
        <li class="step-list__item">Name: <code>High_Value_Shipment_Approval</code>.</li>
        <li class="step-list__item">Entry Criteria: <code>Total_Value__c &gt; 500000</code>.</li>
        <li class="step-list__item"><strong>Step 1:</strong> Route to Finance Manager (role hierarchy). Add Email Alert to Finance Manager.</li>
        <li class="step-list__item"><strong>Step 2 (conditional):</strong> If <code>Hazardous__c = TRUE</code>, route to Safety Officer. Otherwise skip.</li>
        <li class="step-list__item"><strong>Final Approval Actions:</strong> Field Update — set <code>Approval_Status__c = "Approved"</code>. Email Alert to warehouse team.</li>
        <li class="step-list__item"><strong>Final Rejection Actions:</strong> Field Update — set <code>Approval_Status__c = "Rejected"</code>. Email Alert to submitter with rejection reason.</li>
        <li class="step-list__item">Record Lock: Lock during approval, unlock on final approve/reject.</li>
      </ol>

      <h2>Part B: Case Assignment Rules</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Assignment Rules vs Queues</p>
        <p>A <strong>Queue</strong> is a shared inbox (team owns records). An <strong>Assignment Rule</strong> determines <em>which</em> queue or user a new record gets assigned to, based on criteria. Assignment Rules run when a record is created (Web-to-Case, Email-to-Case, or when the "Assign using active assignment rule" checkbox is checked).</p>
      </div>
      <table><thead><tr><th>Rule Entry</th><th>Criteria</th><th>Assign To</th></tr></thead><tbody>
        <tr><td>1</td><td>Type = "Damage Claim"</td><td><code>Claims_Queue</code></td></tr>
        <tr><td>2</td><td>Type = "Tracking Issue"</td><td><code>Tracking_Queue</code></td></tr>
        <tr><td>3</td><td>Type = "Billing" AND Priority = "High"</td><td><code>Senior_Billing_Queue</code></td></tr>
        <tr><td>4</td><td>Type = "Billing"</td><td><code>Billing_Queue</code></td></tr>
        <tr><td>Default</td><td>No match</td><td><code>General_Support_Queue</code></td></tr>
      </tbody></table>

      <h2>Part C: Escalation Rules</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Escalation Rules</p>
        <p>An <strong>Escalation Rule</strong> automatically escalates Cases that remain unresolved after a specified time. Escalation actions can reassign the Case, send email notifications, or both. Only one Escalation Rule can be active at a time. Time is measured in <strong>Business Hours</strong>, which you configure separately.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Business Hours → Define: Mon-Sat, 9 AM â€“ 6 PM IST.</li>
        <li class="step-list__item">Setup → Escalation Rules → New: <code>Case_24Hr_Escalation</code>.</li>
        <li class="step-list__item">Rule Entry: Status = "New" OR Status = "Working".</li>
        <li class="step-list__item">Escalation Action at <strong>8 Business Hours</strong>: Email Alert to Case Owner ("Case aging reminder").</li>
        <li class="step-list__item">Escalation Action at <strong>24 Business Hours</strong>: Reassign to <code>Team_Lead_Queue</code> + Email Alert to Team Lead.</li>
      </ol>
    `},{id:9,title:"RetailMax — Screen Flow: Guided Return & Exchange Wizard",difficulty:"Medium",category:"Flow / Screen Flow",company:"RetailMax Stores",subtitle:"Build a multi-screen guided wizard with conditional branching, dynamic choices, record creation, and subflow calls.",tags:["Screen Flow","Dynamic Choices","Decision Elements","Create Records","Subflow","Fault Paths"],description:"RetailMax agents handle 500+ returns daily. The current process requires agents to navigate 4 different screens and manually check return eligibility. A Screen Flow wizard will guide them step by step, automatically checking eligibility and creating the return record.",learnings:["Build multi-screen flows with progressive data collection","Use Get Records + Decision for real-time eligibility checks","Implement Dynamic Choice Sets for data-driven picklists","Add Fault Paths for graceful error handling","Call Subflows for reusable logic (email confirmation)"],content:`
      <h2>Background</h2>
      <p>RetailMax agents currently handle returns by: (1) looking up the order, (2) manually checking if it's within the 30-day window, (3) checking if the item category allows returns, (4) creating a Case, (5) emailing the customer. This multi-step manual process leads to errors and inconsistency.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Flow Design (7 Elements) &middot; Step 2 &rarr; Screen 1 — Order Lookup &middot; Step 3 &rarr; Screen 2 — Dynamic Item Selection &middot; Step 4 &rarr; Eligibility Check (Decision) &middot; Step 5 &rarr; Create Return Case + Subflow</p>
      </div>
<div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Screen Flow Architecture</p>
        <p>A Screen Flow pauses at each <strong>Screen element</strong>, waiting for user input. Between screens, you can run logic (Get Records, Decisions, Assignments) that doesn't need user interaction. The flow should validate data as early as possible to avoid dead-ends later.</p>
      </div>

      <h2>Flow Design (7 Elements)</h2>
      <pre><code>Screen 1 (Order Lookup)
  → Get Records (fetch order)
  → Decision (order exists?)
    → NO → Screen: Error "Order not found"
    → YES â†“
Screen 2 (Select Item)
  → Decision (within 30 days? + category returnable?)
    → NO → Screen: Error "Not eligible"
    → YES â†“
Screen 3 (Return Details)
  → Create Records (Return Case)
  → Subflow (Send Confirmation Email)
Screen 4 (Confirmation)</code></pre>

      <h2>Step 1: Screen 1 — Order Lookup</h2>
      <ol class="step-list">
        <li class="step-list__item">Add a <strong>Screen</strong> element with a Text Input for <code>orderNumber</code>.</li>
        <li class="step-list__item">After the screen, add <strong>Get Records</strong>: Object = <code>Order__c</code>, filter <code>Order_Number__c = {!orderNumber}</code>.</li>
        <li class="step-list__item">Add a <strong>Decision</strong>: "Order Found?" — check if the Get Records result is not null.</li>
        <li class="step-list__item">If NO: show an error Screen with "Order not found. Please verify the order number."</li>
      </ol>

      <h2>Step 2: Screen 2 — Dynamic Item Selection</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Dynamic Choice Sets</p>
        <p>A <strong>Dynamic Choice Set</strong> (Record Choice Set) populates a picklist/radio buttons from actual database records at runtime, instead of hardcoded values. Here, it shows only the items from the customer's specific order.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Create a <strong>Record Choice Set</strong>: Object = <code>Order_Item__c</code>, filter by the Order Id from Step 1. Display field: <code>Product_Name__c</code>. Value field: Id.</li>
        <li class="step-list__item">Add this to a Screen as a <strong>Radio Buttons</strong> component.</li>
      </ol>

      <h2>Step 3: Eligibility Check (Decision)</h2>
      <pre><code>Decision: "Return Eligible?"
Outcome 1 — Eligible:
  {!Get_Order.Order_Date__c} &gt;= ({!$Flow.CurrentDateTime} - 30 days)
  AND {!selectedItem.Category__c} != "Final Sale"
Outcome 2 — Not Eligible:
  Default → show error screen</code></pre>

      <h2>Step 4: Create Return Case + Subflow</h2>
      <ol class="step-list">
        <li class="step-list__item"><strong>Create Records</strong>: Object = Case. Set Subject, Description, Order__c, Status = "New", RecordType = "Return". Add a <strong>Fault Path</strong> → error screen.</li>
        <li class="step-list__item"><strong>Subflow</strong>: Call <code>Send_Return_Confirmation_Email</code> passing the new Case Id and customer email.</li>
        <li class="step-list__item"><strong>Screen 4</strong>: Display "Return Case #{!Create_Case.CaseNumber} created successfully."</li>
      </ol>

      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Always Add Fault Paths</p>
        <p>Every <strong>Create/Update/Delete Records</strong> element should have a Fault Path. Without one, if the DML fails (validation rule, required field missing, duplicate rule), the user sees a cryptic error. With a Fault Path, you can show a friendly error screen with the actual error message: <code>{!$Flow.FaultMessage}</code>.</p>
      </div>

      <h2>API Reference</h2>
      <table><thead><tr><th>Component</th><th>API Name</th><th>Type</th></tr></thead><tbody>
        <tr><td>Screen Flow</td><td><code>Return_Exchange_Wizard</code></td><td>Screen Flow</td></tr>
        <tr><td>Subflow</td><td><code>Send_Return_Confirmation_Email</code></td><td>Autolaunched</td></tr>
        <tr><td>Custom Object</td><td><code>Order__c</code>, <code>Order_Item__c</code></td><td>Data</td></tr>
      </tbody></table>
    `},{id:10,title:"UrbanStay Hotels — Before-Save & After-Save Record-Triggered Flows",difficulty:"Medium",category:"Flow / Record-Triggered",company:"UrbanStay Hotels",subtitle:"Build 4 Record-Triggered Flows: auto-calculate checkout, assign housekeeping, update related records, and send notifications.",tags:["Before-Save Flow","After-Save Flow","Fast Field Update","Related Records","Entry Conditions"],description:"UrbanStay manages 200+ hotel rooms. When a reservation is created, the system must auto-calculate checkout date, set a priority tier, assign housekeeping staff, update room availability, and notify the front desk.",learnings:["Understand when to use Before-Save vs After-Save flows","Configure Entry Conditions to control when flows run","Use Assignment elements for field calculations","Update related records (rooms, staff) from After-Save flows",'Handle "Only when a record is updated to meet condition" filter'],content:`
      <h2>Background</h2>
      <p>UrbanStay creates a <code>Reservation__c</code> record for every booking. When created, several things must happen automatically: the checkout date must be calculated from check-in + nights, a guest tier must be assigned, the room status must change to "Occupied", and housekeeping must be notified.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Calculate Checkout & Set Tier (Before-Save) &middot; Step 2 &rarr; Update Room & Notify Staff (After-Save) &middot; Step 3 &rarr; Room Freed on Checkout (After-Save, on Update)</p>
      </div>
<div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Before-Save vs After-Save Decision Tree</p>
        <p>Ask yourself: "Am I only changing fields on <em>this same record</em>?" If YES → <strong>Before-Save</strong> (fast, no extra DML). If you need to touch <em>other</em> records, send emails, or call subflows → <strong>After-Save</strong>. You can (and often should) have both on the same object.</p>
      </div>

      <h2>Flow A: Calculate Checkout & Set Tier (Before-Save)</h2>
      <p><strong>Purpose:</strong> These are simple field assignments on the same Reservation record. Before-Save is faster because it doesn't consume DML limits for the triggering record.</p>
      <ol class="step-list">
        <li class="step-list__item">New Flow → Record-Triggered → Object: <code>Reservation__c</code> → Trigger: Created → Optimize: <strong>Fast Field Updates</strong>.</li>
        <li class="step-list__item"><strong>Assignment 1:</strong> <code>$Record.Checkout_Date__c = $Record.Checkin_Date__c + $Record.Nights__c</code></li>
        <li class="step-list__item"><strong>Decision:</strong> Branch on <code>$Record.Total_Amount__c</code>:
          <br>â€¢ > â‚¹50,000 → Tier = "Platinum"
          <br>â€¢ > â‚¹20,000 → Tier = "Gold"
          <br>â€¢ Default → Tier = "Standard"</li>
        <li class="step-list__item"><strong>Assignment 2:</strong> Set <code>$Record.Guest_Tier__c</code> to the determined tier.</li>
      </ol>
      <table><thead><tr><th>API Name</th><th>Trigger</th><th>Type</th></tr></thead><tbody>
        <tr><td><code>Reservation_Set_Checkout_Tier_BeforeSave</code></td><td>Before Save — Create</td><td>Fast Field Update</td></tr>
      </tbody></table>

      <h2>Flow B: Update Room & Notify Staff (After-Save)</h2>
      <p><strong>Purpose:</strong> Changing the Room's status and sending email notifications require the Reservation to already exist in the database.</p>
      <ol class="step-list">
        <li class="step-list__item">New Flow → Record-Triggered → Object: <code>Reservation__c</code> → Trigger: Created → Optimize: <strong>Actions and Related Records</strong>.</li>
        <li class="step-list__item"><strong>Get Records:</strong> Fetch the Room__c record where Id = <code>$Record.Room__c</code>.</li>
        <li class="step-list__item"><strong>Update Records:</strong> Set <code>Room__c.Status__c = "Occupied"</code>, <code>Room__c.Current_Guest__c = $Record.Guest_Name__c</code>.</li>
        <li class="step-list__item"><strong>Send Email:</strong> Notify the Housekeeping queue with room number and check-in time.</li>
        <li class="step-list__item">Add <strong>Fault Paths</strong> on both Update and Email elements.</li>
      </ol>

      <h2>Flow C: Room Freed on Checkout (After-Save, on Update)</h2>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Entry Conditions — "Only when updated to meet condition"</p>
        <p>When configuring a Record-Triggered Flow on update, you choose: <strong>"Every time a record is updated and meets condition"</strong> (runs on every save if condition is true) vs <strong>"Only when a record is updated to meet the condition"</strong> (runs only when the condition transitions from false to true — like a status changing from "Active" to "Checked Out").</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Trigger: Updated. Condition: <code>Status__c = "Checked Out"</code>. Run: <strong>Only when updated to meet condition</strong>.</li>
        <li class="step-list__item"><strong>Update Records:</strong> Set Room__c.Status__c = "Available", clear Current_Guest__c.</li>
        <li class="step-list__item"><strong>Send Email:</strong> Notify Housekeeping "Room {roomNumber} needs turnover."</li>
      </ol>
    `},{id:11,title:"CloudSync SaaS — Scheduled Flow: License Expiry & Renewal Reminders",difficulty:"Medium",category:"Flow / Scheduled",company:"CloudSync Technologies",subtitle:"Build a Scheduled Flow that runs daily, checks license expiry dates, sends tiered reminders, and auto-creates renewal Opportunities.",tags:["Scheduled Flow","Get Records","Loop","Decision","Create Records","Bulk Operations"],description:"CloudSync sells annual software licenses. They need automated reminders at 90, 60, and 30 days before expiry, with auto-creation of renewal Opportunities at the 60-day mark.",learnings:["Build Scheduled Flows with daily/hourly frequency","Use Get Records to fetch batches of records meeting criteria","Process records in Loops with collection variables","Perform bulk DML after loops (never inside)","Use Decision elements for tiered logic within loops"],content:`
      <h2>Background</h2>
      <p>CloudSync's 2,000+ customers have annual licenses with different expiry dates. Currently, account managers manually check a spreadsheet for upcoming renewals — and they miss 15% of them. The company needs automated, tiered email reminders and auto-creation of renewal pipeline.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Flow Design &middot; Step 2 &rarr; Build Steps</p>
      </div>
<div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Critical Rule: Never DML Inside a Loop</p>
        <p>Salesforce enforces <strong>Governor Limits</strong> — e.g., max 150 DML statements per transaction. If you put a Create Records element inside a Loop processing 200 records, you'll hit the limit at record 151 and the flow will fail. Instead: <strong>collect records into a collection variable inside the loop</strong>, then do <strong>one bulk Create/Update after the loop ends</strong>.</p>
      </div>

      <h2>Flow Design</h2>
      <pre><code>Start (Daily Schedule, 6 AM)
  → Get Records: Licenses expiring in next 90 days
  → Loop over results
    → Decision: Days until expiry?
      → 90 days: Add to "90-day reminder" collection
      → 60 days: Add to "60-day reminder" + "create renewal" collection
      → 30 days: Add to "30-day urgent" collection
  → After loop: Send Email (90-day batch)
  → After loop: Send Email (60-day batch)
  → After loop: Create Records (renewal Opportunities, bulk)
  → After loop: Send Email (30-day urgent batch)</code></pre>

      <h2>Build Steps</h2>
      <ol class="step-list">
        <li class="step-list__item">New Flow → <strong>Schedule-Triggered Flow</strong>. Start: Daily at 6:00 AM.</li>
        <li class="step-list__item"><strong>Get Records:</strong> Object = <code>License__c</code>. Filter: <code>Expiry_Date__c &lt;= TODAY() + 90</code> AND <code>Status__c = "Active"</code> AND <code>Renewal_Reminder_Sent__c != "30-Day"</code>. Store all fields, get all records.</li>
        <li class="step-list__item">Create 3 collection variables: <code>col_90Day</code>, <code>col_60Day</code>, <code>col_30Day</code> (type: License__c).</li>
        <li class="step-list__item"><strong>Loop</strong> over the Get Records results. Inside:</li>
        <li class="step-list__item"><strong>Formula:</strong> <code>daysUntilExpiry = {!currentItem.Expiry_Date__c} - TODAY()</code></li>
        <li class="step-list__item"><strong>Decision:</strong> Branch on daysUntilExpiry:
          <br>â€¢ â‰¤ 30 → Assignment: add to col_30Day, set Renewal_Reminder_Sent__c = "30-Day"
          <br>â€¢ â‰¤ 60 → Assignment: add to col_60Day, set Renewal_Reminder_Sent__c = "60-Day"
          <br>â€¢ â‰¤ 90 → Assignment: add to col_90Day, set Renewal_Reminder_Sent__c = "90-Day"</li>
        <li class="step-list__item"><strong>After loop:</strong> Update Records (all modified licenses in bulk). Create Records (renewal Opportunities from col_60Day). Send 3 email alerts.</li>
      </ol>

      <table><thead><tr><th>Component</th><th>API Name</th><th>Schedule</th></tr></thead><tbody>
        <tr><td>Scheduled Flow</td><td><code>License_Renewal_Reminder_Scheduled</code></td><td>Daily at 6 AM</td></tr>
      </tbody></table>
    `},{id:12,title:"SwiftDeliver — Apex Trigger: Handler Pattern & Bulkification",difficulty:"Hard",category:"Apex / Triggers",company:"SwiftDeliver Logistics",subtitle:"Write your first Apex Trigger with the Handler Pattern — before/after insert, bulkification, and helper methods.",tags:["Apex Trigger","Trigger Handler","Bulkification","Trigger Context Variables","Helper Classes"],description:`SwiftDeliver needs code-level automation that Flow cannot easily handle: when a Delivery is marked "Completed", automatically update the parent Order's status, calculate delivery performance metrics, and log an audit trail — all in a bulk-safe, testable pattern.`,learnings:["Write an Apex Trigger with before and after context","Implement the Trigger Handler pattern for maintainable code","Bulkify SOQL and DML to respect Governor Limits","Use Trigger.new, Trigger.old, Trigger.newMap, Trigger.oldMap","Separate business logic into a Handler class"],content:`
      <h2>Background</h2>
      <p>SwiftDeliver processes 10,000+ deliveries daily. When a delivery is marked "Completed", three things must happen: (1) the parent Order's delivery count and status must update, (2) a performance metric must be calculated, and (3) an audit log record must be created. Flow could do some of this, but the complex cross-object calculations and the need for transactional integrity make Apex the right choice.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; The Trigger (Thin Trigger Pattern) &middot; Step 2 &rarr; The Handler Class</p>
      </div>
<div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Why Use Apex Instead of Flow?</p>
        <p>Use Apex when you need: <strong>Complex cross-object logic</strong> in a single transaction, <strong>HTTP callouts</strong> to external systems, operations on <strong>very large record sets</strong> where Flow's loops would be slow, or logic that requires <strong>precise error handling</strong> with try/catch. For simple field updates and routing, Flow is preferred.</p>
      </div>

      <h2>Step 1: The Trigger (Thin Trigger Pattern)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Trigger Handler Pattern</p>
        <p>Best practice: keep your Trigger file <strong>thin</strong> — it should only call a Handler class. All business logic lives in the Handler. This makes the code testable (you can test the Handler directly), maintainable (one file per concern), and prevents the "mega-trigger" anti-pattern.</p>
      </div>
      <pre><code>// DeliveryTrigger.trigger
trigger DeliveryTrigger on Delivery__c (before update, after update) {
    DeliveryTriggerHandler handler = new DeliveryTriggerHandler();
    
    if (Trigger.isBefore && Trigger.isUpdate) {
        handler.beforeUpdate(Trigger.new, Trigger.oldMap);
    }
    if (Trigger.isAfter && Trigger.isUpdate) {
        handler.afterUpdate(Trigger.new, Trigger.oldMap);
    }
}</code></pre>

      <h2>Step 2: The Handler Class</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Bulkification</p>
        <p><strong>Bulkification</strong> means writing code that handles 1 record or 10,000 records equally well. Key rules: (1) Never put SOQL or DML inside a for-loop. (2) Collect IDs first, query once, then process. (3) Use Maps for O(1) lookups instead of nested loops.</p>
      </div>
      <pre><code>// DeliveryTriggerHandler.cls
public class DeliveryTriggerHandler {

    // BEFORE UPDATE: Calculate performance metric on the delivery itself
    public void beforeUpdate(List&lt;Delivery__c&gt; newList, 
                             Map&lt;Id, Delivery__c&gt; oldMap) {
        for (Delivery__c del : newList) {
            Delivery__c oldDel = oldMap.get(del.Id);
            // Only run when Status changes to "Completed"
            if (del.Status__c == 'Completed' 
                && oldDel.Status__c != 'Completed') {
                // Calculate hours between creation and completion
                Long milliseconds = del.Completed_Date__c.getTime() 
                                  - del.CreatedDate.getTime();
                del.Delivery_Hours__c = milliseconds / (1000 * 60 * 60);
            }
        }
        // No DML needed — before-trigger changes save automatically
    }

    // AFTER UPDATE: Update parent Orders + create Audit Logs
    public void afterUpdate(List&lt;Delivery__c&gt; newList, 
                            Map&lt;Id, Delivery__c&gt; oldMap) {
        Set&lt;Id&gt; completedOrderIds = new Set&lt;Id&gt;();
        List&lt;Audit_Log__c&gt; auditLogs = new List&lt;Audit_Log__c&gt;();
        
        for (Delivery__c del : newList) {
            Delivery__c oldDel = oldMap.get(del.Id);
            if (del.Status__c == 'Completed' 
                && oldDel.Status__c != 'Completed') {
                completedOrderIds.add(del.Order__c);
                auditLogs.add(new Audit_Log__c(
                    Record_Id__c = del.Id,
                    Action__c = 'Delivery Completed',
                    Timestamp__c = System.now()
                ));
            }
        }
        
        if (!completedOrderIds.isEmpty()) {
            updateParentOrders(completedOrderIds);
        }
        if (!auditLogs.isEmpty()) {
            insert auditLogs; // Bulk insert — one DML for all
        }
    }

    private void updateParentOrders(Set&lt;Id&gt; orderIds) {
        // One SOQL — not inside a loop
        List&lt;Order__c&gt; orders = [
            SELECT Id, Total_Deliveries__c,
                (SELECT Id FROM Deliveries__r 
                 WHERE Status__c = 'Completed')
            FROM Order__c WHERE Id IN :orderIds
        ];
        for (Order__c ord : orders) {
            ord.Completed_Deliveries__c = ord.Deliveries__r.size();
            if (ord.Completed_Deliveries__c == ord.Total_Deliveries__c) {
                ord.Status__c = 'Fulfilled';
            }
        }
        update orders; // One DML — not inside a loop
    }
}</code></pre>

      <div class="callout callout--important">
        <p class="callout__title">ðŸ”´ Governor Limits to Watch</p>
        <p>â€¢ Max <strong>100 SOQL queries</strong> per transaction<br>â€¢ Max <strong>150 DML statements</strong> per transaction<br>â€¢ Max <strong>50,000 records</strong> returned by SOQL<br>â€¢ Max <strong>10,000 records</strong> processed by DML</p>
      </div>
    `},{id:13,title:"PayFlow — Apex Batch Processing: Monthly Invoice Generation",difficulty:"Hard",category:"Apex / Async Processing",company:"PayFlow Billing",subtitle:"Write Batch Apex to process 100,000+ subscription records, generate invoices, and schedule it monthly with Schedulable Apex.",tags:["Batch Apex","Schedulable Apex","Database.Batchable","start/execute/finish","Cron Expressions"],description:"PayFlow has 100,000+ active subscriptions. On the 1st of every month, the system must generate an Invoice record for each active subscription, calculate prorated amounts, and email a summary to the billing team. This exceeds Governor Limits for synchronous Apex.",learnings:["Implement Database.Batchable<sObject> interface (start, execute, finish)","Understand batch size and scope parameter tuning","Chain batch jobs for sequential processing","Write Schedulable Apex with Cron expressions","Handle partial failures with Database.SaveResult"],content:`
      <h2>Background</h2>
      <p>PayFlow tries to generate invoices with a Record-Triggered Flow, but it times out — 100,000+ records exceed synchronous limits. Batch Apex processes records in chunks (default 200), each chunk in its own transaction with fresh Governor Limits.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Review the instructions below to complete the build.</p>
      </div>
<div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Batch Apex</p>
        <p><strong>Batch Apex</strong> implements <code>Database.Batchable&lt;sObject&gt;</code> with 3 methods: <code>start()</code> returns the query of records to process, <code>execute()</code> processes each chunk (scope), and <code>finish()</code> runs once after all chunks complete. Each <code>execute()</code> call gets fresh Governor Limits.</p>
      </div>

      <h2>The Batch Class</h2>
      <pre><code>public class MonthlyInvoiceBatch 
    implements Database.Batchable&lt;sObject&gt;, Database.Stateful {
    
    private Integer successCount = 0;
    private Integer failCount = 0;
    private List&lt;String&gt; errorMessages = new List&lt;String&gt;();
    
    // START: Define what records to process
    public Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator([
            SELECT Id, Account__c, Plan__c, MRR__c, 
                   Start_Date__c, End_Date__c
            FROM Subscription__c
            WHERE Status__c = 'Active'
            AND End_Date__c &gt;= TODAY()
        ]);
    }
    
    // EXECUTE: Process each chunk (default 200 records)
    public void execute(Database.BatchableContext bc, 
                        List&lt;Subscription__c&gt; scope) {
        List&lt;Invoice__c&gt; invoices = new List&lt;Invoice__c&gt;();
        
        for (Subscription__c sub : scope) {
            invoices.add(new Invoice__c(
                Subscription__c = sub.Id,
                Account__c = sub.Account__c,
                Amount__c = sub.MRR__c,
                Invoice_Date__c = Date.today(),
                Due_Date__c = Date.today().addDays(30),
                Status__c = 'Pending'
            ));
        }
        
        // Use Database.insert for partial success handling
        Database.SaveResult[] results = 
            Database.insert(invoices, false); // false = allow partial
        
        for (Database.SaveResult sr : results) {
            if (sr.isSuccess()) {
                successCount++;
            } else {
                failCount++;
                for (Database.Error err : sr.getErrors()) {
                    errorMessages.add(err.getMessage());
                }
            }
        }
    }
    
    // FINISH: Send summary email
    public void finish(Database.BatchableContext bc) {
        Messaging.SingleEmailMessage email = 
            new Messaging.SingleEmailMessage();
        email.setToAddresses(new String[]{'billing@payflow.com'});
        email.setSubject('Monthly Invoice Batch Complete');
        email.setPlainTextBody(
            'Invoices Created: ' + successCount + 'n' +
            'Failures: ' + failCount + 'n' +
            'Errors: ' + String.join(errorMessages, 'n')
        );
        Messaging.sendEmail(new List&lt;Messaging.SingleEmailMessage&gt;{email});
    }
}</code></pre>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Database.Stateful</p>
        <p>Normally, instance variables reset between <code>execute()</code> calls. Implementing <code>Database.Stateful</code> preserves instance variables across chunks — needed here to accumulate <code>successCount</code> and <code>failCount</code> across all batches.</p>
      </div>

      <h2>Schedule It Monthly</h2>
      <pre><code>public class MonthlyInvoiceScheduler implements Schedulable {
    public void execute(SchedulableContext sc) {
        MonthlyInvoiceBatch batch = new MonthlyInvoiceBatch();
        Database.executeBatch(batch, 200); // 200 records per chunk
    }
}

// Schedule via Anonymous Apex:
// Runs at midnight on the 1st of every month
String cronExp = '0 0 0 1 * ?';
System.schedule('Monthly Invoice Generation', 
                cronExp, new MonthlyInvoiceScheduler());</code></pre>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Cron Expressions</p>
        <p>Format: <code>Seconds Minutes Hours Day_of_Month Month Day_of_Week Optional_Year</code>. <code>'0 0 0 1 * ?'</code> = at 00:00:00 on the 1st day of every month. The <code>?</code> means "no specific value" for day-of-week (since day-of-month is specified).</p>
      </div>
    `},{id:14,title:"HealthBridge — Apex Test Classes: Achieving 100% Code Coverage",difficulty:"Hard",category:"Apex / Testing",company:"HealthBridge Systems",subtitle:"Write comprehensive test classes with test data factories, positive/negative scenarios, bulk testing, and System.runAs().",tags:["Test Classes","TestSetup","Test Data Factory","System.runAs","Asserts","Bulk Testing"],description:"HealthBridge has Apex triggers and classes that need deployment to production. Salesforce requires 75% code coverage, but best practice targets 100%. We write test classes covering positive, negative, bulk, and security scenarios.",learnings:["Write @isTest classes with @TestSetup methods","Create Test Data Factory patterns for reusable test data","Test positive cases (happy path) and negative cases (expected failures)","Use System.runAs() to test profile/permission-based logic","Bulk test with 200+ records to verify Governor Limit safety"],content:`
      <h2>Background</h2>
      <p>HealthBridge has a trigger that auto-calculates patient risk scores and assigns them to care teams. Before deploying to production, they need test classes that prove the code works correctly in all scenarios — not just "enough lines to hit 75%."</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Test Data Factory &middot; Step 2 &rarr; The Test Class</p>
      </div>
<div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Why Test Classes Matter</p>
        <p>Salesforce <strong>requires minimum 75% code coverage</strong> to deploy to production. But coverage alone doesn't prove correctness — you need <strong>assertions</strong> (System.assertEquals) that verify the code produced the right output. A test without assertions is a test that can never fail.</p>
      </div>

      <h2>Step 1: Test Data Factory</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — @TestSetup & Test Data Factory</p>
        <p><code>@TestSetup</code> runs once before all test methods in a class, creating shared test data. A <strong>Test Data Factory</strong> is a separate utility class with methods that create records for any test class to use — avoiding duplicate data setup across dozens of test classes.</p>
      </div>
      <pre><code>@isTest
public class TestDataFactory {
    
    public static Account createAccount(String name) {
        Account acc = new Account(Name = name);
        insert acc;
        return acc;
    }
    
    public static List&lt;Patient__c&gt; createPatients(
            Id accountId, Integer count) {
        List&lt;Patient__c&gt; patients = new List&lt;Patient__c&gt;();
        for (Integer i = 0; i &lt; count; i++) {
            patients.add(new Patient__c(
                First_Name__c = 'Test',
                Last_Name__c = 'Patient ' + i,
                Account__c = accountId,
                Age__c = 30 + Math.mod(i, 50),
                Risk_Score__c = null // Should be auto-set by trigger
            ));
        }
        insert patients;
        return patients;
    }
    
    public static User createUser(String profileName) {
        Profile p = [SELECT Id FROM Profile 
                     WHERE Name = :profileName LIMIT 1];
        User u = new User(
            FirstName = 'Test', LastName = 'User',
            Email = 'test' + System.now().getTime() + '@test.com',
            Username = 'test' + System.now().getTime() + '@test.com',
            Alias = 'tuser',
            ProfileId = p.Id,
            TimeZoneSidKey = 'Asia/Kolkata',
            LocaleSidKey = 'en_IN',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US'
        );
        insert u;
        return u;
    }
}</code></pre>

      <h2>Step 2: The Test Class</h2>
      <pre><code>@isTest
public class PatientTriggerTest {
    
    @TestSetup
    static void setupData() {
        Account acc = TestDataFactory.createAccount('HealthBridge Clinic');
        TestDataFactory.createPatients(acc.Id, 5);
    }
    
    // POSITIVE TEST: Risk score is calculated correctly
    @isTest
    static void testRiskScoreCalculation() {
        List&lt;Patient__c&gt; patients = [
            SELECT Id, Risk_Score__c, Age__c 
            FROM Patient__c
        ];
        
        for (Patient__c p : patients) {
            System.assertNotEquals(null, p.Risk_Score__c, 
                'Risk score should be auto-calculated');
            System.assert(p.Risk_Score__c &gt;= 0 && p.Risk_Score__c &lt;= 100,
                'Risk score should be between 0 and 100');
        }
    }
    
    // NEGATIVE TEST: Missing required field
    @isTest
    static void testMissingRequiredField() {
        try {
            Patient__c p = new Patient__c(
                First_Name__c = 'No',
                Last_Name__c = 'Account'
                // Missing Account__c (required)
            );
            insert p;
            System.assert(false, 'Should have thrown an exception');
        } catch (DmlException e) {
            System.assert(e.getMessage().contains('REQUIRED'),
                'Should fail on required field');
        }
    }
    
    // BULK TEST: Process 200+ records
    @isTest
    static void testBulkInsert() {
        Account acc = [SELECT Id FROM Account LIMIT 1];
        Test.startTest();
        List&lt;Patient__c&gt; bulkPatients = 
            TestDataFactory.createPatients(acc.Id, 200);
        Test.stopTest();
        
        Integer count = [SELECT COUNT() FROM Patient__c 
                         WHERE Risk_Score__c != null];
        System.assertEquals(205, count, 
            'All 205 patients should have risk scores');
    }
    
    // SECURITY TEST: Run as restricted profile
    @isTest
    static void testRestrictedProfileAccess() {
        User restrictedUser = TestDataFactory.createUser('Standard User');
        
        System.runAs(restrictedUser) {
            try {
                Patient__c p = new Patient__c(
                    First_Name__c = 'Restricted',
                    Last_Name__c = 'User'
                );
                insert p;
            } catch (DmlException e) {
                System.assert(true, 'Expected access denied');
            }
        }
    }
}</code></pre>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Test.startTest() / Test.stopTest()</p>
        <p>Code between <code>Test.startTest()</code> and <code>Test.stopTest()</code> gets a <strong>fresh set of Governor Limits</strong>, separate from the test setup code. This is also where async code (future, batch, queueable) gets forced to execute synchronously for testing.</p>
      </div>
    `},{id:15,title:"NexaPay — Queueable Apex: Chaining Async Jobs for Payment Processing",difficulty:"Hard",category:"Apex / Async Processing",company:"NexaPay Financial",subtitle:"Implement Queueable Apex with job chaining, callouts to a payment gateway, and retry logic for failed transactions.",tags:["Queueable Apex","Job Chaining","HTTP Callouts","Database.AllowsCallouts","Retry Pattern"],description:"NexaPay processes payments by calling an external payment gateway API. Each payment requires a callout, status update, and notification. With 1,000+ payments per batch, synchronous processing would timeout. Queueable Apex handles this asynchronously with job chaining.",learnings:["Implement the System.Queueable interface","Enable HTTP callouts with Database.AllowsCallouts","Chain queueable jobs for sequential async processing","Build retry logic for transient failures","Compare Queueable vs Future vs Batch Apex use cases"],content:`
      <h2>Background</h2>
      <p>NexaPay's payment flow: (1) Call the PaymentGateway API with card/amount details, (2) Update the Payment__c record with the gateway's response, (3) Send confirmation email. This can't be synchronous (callouts + DML in triggers are limited) and can't be @future (no chaining, no complex objects). Queueable is the right fit.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Review the instructions below to complete the build.</p>
      </div>
<div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Queueable vs Future vs Batch</p>
        <p><strong>@future</strong>: Simplest async — fire and forget, but can't chain, can't pass sObjects, only primitive params.<br><strong>Queueable</strong>: Can pass complex objects, can chain to another Queueable, supports callouts. Best for "do this one async job, then do the next."<br><strong>Batch</strong>: For processing huge datasets in chunks. Overkill for a single record's async work.</p>
      </div>

      <h2>The Queueable Class</h2>
      <pre><code>public class PaymentProcessor 
    implements Queueable, Database.AllowsCallouts {
    
    private List&lt;Id&gt; paymentIds;
    private Integer retryCount;
    
    public PaymentProcessor(List&lt;Id&gt; paymentIds) {
        this.paymentIds = paymentIds;
        this.retryCount = 0;
    }
    
    public PaymentProcessor(List&lt;Id&gt; paymentIds, Integer retryCount) {
        this.paymentIds = paymentIds;
        this.retryCount = retryCount;
    }
    
    public void execute(QueueableContext context) {
        List&lt;Payment__c&gt; payments = [
            SELECT Id, Amount__c, Card_Token__c, Status__c
            FROM Payment__c 
            WHERE Id IN :paymentIds AND Status__c = 'Pending'
        ];
        
        List&lt;Payment__c&gt; toUpdate = new List&lt;Payment__c&gt;();
        List&lt;Id&gt; failedIds = new List&lt;Id&gt;();
        
        for (Payment__c pmt : payments) {
            try {
                // HTTP Callout to payment gateway
                HttpResponse resp = callPaymentGateway(
                    pmt.Card_Token__c, pmt.Amount__c);
                
                if (resp.getStatusCode() == 200) {
                    pmt.Status__c = 'Completed';
                    pmt.Gateway_Response__c = resp.getBody();
                } else {
                    pmt.Status__c = 'Failed';
                    pmt.Error_Message__c = resp.getBody();
                    failedIds.add(pmt.Id);
                }
            } catch (Exception e) {
                pmt.Status__c = 'Error';
                pmt.Error_Message__c = e.getMessage();
                failedIds.add(pmt.Id);
            }
            toUpdate.add(pmt);
        }
        
        update toUpdate;
        
        // Chain: retry failed payments (max 3 attempts)
        if (!failedIds.isEmpty() && retryCount &lt; 3) {
            System.enqueueJob(
                new PaymentProcessor(failedIds, retryCount + 1));
        }
    }
    
    private HttpResponse callPaymentGateway(
            String token, Decimal amount) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:PaymentGateway/charge');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setBody('{"token":"' + token + '","amount":' + amount + '}');
        req.setTimeout(30000);
        return new Http().send(req);
    }
}</code></pre>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Job Chaining</p>
        <p>You can call <code>System.enqueueJob()</code> from within a Queueable's <code>execute()</code> method to chain another job. Limit: <strong>1 child job per execution in synchronous context, up to 2 in test context</strong>. This is perfect for retry patterns — if payments fail, chain a retry with an incremented counter.</p>
      </div>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Named Credentials</p>
        <p>The <code>callout:PaymentGateway</code> prefix uses a <strong>Named Credential</strong> — a secure way to store endpoint URLs and authentication. Setup → Named Credentials → New. The credential handles OAuth/API keys so your code never contains hardcoded secrets.</p>
      </div>
    `},{id:16,title:"GlobeTrotter — Apex REST Callout: Live Exchange Rates Integration",difficulty:"Hard",category:"Apex / Integration",company:"GlobeTrotter Travel",subtitle:"Make synchronous HTTP callouts to an external REST API to fetch live currency exchange rates from Apex.",tags:["HTTP Callout","REST API","JSON Parsing","Named Credentials","JSON2Apex"],description:"GlobeTrotter needs live currency exchange rates on their Opportunities to calculate accurate margins for international tours. We build an Apex class that calls a public REST API, parses the JSON response, and updates the Opportunity records.",learnings:["Set up Remote Site Settings and Named Credentials","Use the HttpRequest, Http, and HttpResponse classes","Parse JSON responses using JSON.deserializeUntyped or strongly-typed wrapper classes","Handle API errors gracefully","Create an invocable method to call the integration from Flow"],content:`
      <h2>Background</h2>
      <p>GlobeTrotter Travel quotes tours in USD, but incurs costs in EUR, JPY, and GBP. They need an automated way to pull today's exchange rate from an external API (like ExchangeRate-API) whenever an Opportunity is updated, to ensure they aren't losing margin on currency fluctuations.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Security Configuration &middot; Step 2 &rarr; The Apex Callout Class &middot; Step 3 &rarr; Wrapper Class Alternative</p>
      </div>
<h2>Step 1: Security Configuration</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Named Credentials</p>
        <p>Salesforce blocks outbound calls to unknown URLs. You must authorize the endpoint. <strong>Named Credentials</strong> are best practice because they handle the base URL and authentication (API keys/OAuth) securely, keeping secrets out of code. If no auth is needed, <strong>Remote Site Settings</strong> can simply whitelist the domain.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → <strong>Named Credentials</strong> → New Legacy.</li>
        <li class="step-list__item">Label: <code>ExchangeRateAPI</code>. URL: <code>https://api.exchangerate-api.com/v4/latest</code>.</li>
        <li class="step-list__item">Identity Type: Named Principal. Authentication: Password (put API key here if required).</li>
      </ol>

      <h2>Step 2: The Apex Callout Class</h2>
      <pre><code>public class ExchangeRateService {

    // @InvocableMethod allows Flow to call this Apex
    @InvocableMethod(label='Update Exchange Rates' 
                     description='Fetches live rates for Opps')
    public static void updateOpportunityRates(List&lt;Id&gt; oppIds) {
        // Since we are called from a trigger/flow, we must use @future(callout=true)
        // or a Queueable to make callouts async.
        makeCalloutAsync(oppIds);
    }

    @future(callout=true)
    private static void makeCalloutAsync(List&lt;Id&gt; oppIds) {
        List&lt;Opportunity&gt; opps = [SELECT Id, CurrencyIsoCode 
                                  FROM Opportunity WHERE Id IN :oppIds];
        
        // 1. Prepare Request
        HttpRequest req = new HttpRequest();
        // Using Named Credential
        req.setEndpoint('callout:ExchangeRateAPI/USD');
        req.setMethod('GET');
        
        // 2. Send Request
        Http http = new Http();
        HttpResponse res;
        
        try {
            res = http.send(req);
            
            if (res.getStatusCode() == 200) {
                // 3. Parse JSON Response
                Map&lt;String, Object&gt; results = 
                    (Map&lt;String, Object&gt;) JSON.deserializeUntyped(res.getBody());
                Map&lt;String, Object&gt; rates = 
                    (Map&lt;String, Object&gt;) results.get('rates');
                
                // 4. Process Data
                for (Opportunity opp : opps) {
                    if (rates.containsKey(opp.CurrencyIsoCode)) {
                        Decimal rate = (Decimal) rates.get(opp.CurrencyIsoCode);
                        opp.Current_Exchange_Rate__c = rate;
                    }
                }
                update opps;
            } else {
                System.debug('API Error: ' + res.getStatus());
            }
        } catch (Exception e) {
            System.debug('Callout Exception: ' + e.getMessage());
        }
    }
}</code></pre>

      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Callout Rule</p>
        <p>You <strong>cannot make a synchronous callout from a Trigger</strong> or a Record-Triggered Flow (it holds up the database transaction). You must move the callout to an asynchronous method like <code>@future(callout=true)</code> or Queueable.</p>
      </div>

      <h2>Step 3: Wrapper Class Alternative</h2>
      <p>Instead of <code>JSON.deserializeUntyped</code> (which returns messy Maps of Objects), you can generate a strongly-typed Apex wrapper class using tools like JSON2Apex.</p>
      <pre><code>public class ExchangeRateResponse {
    public String base;
    public String date;
    public Map&lt;String, Decimal&gt; rates;
}

// In the callout method:
ExchangeRateResponse parsed = (ExchangeRateResponse) 
    JSON.deserialize(res.getBody(), ExchangeRateResponse.class);
Decimal eurRate = parsed.rates.get('EUR');</code></pre>
    `},{id:17,title:"CloudERP — Apex REST Web Service: Exposing a Custom API",difficulty:"Hard",category:"Apex / Integration",company:"CloudERP Systems",subtitle:"Expose a custom REST endpoint in Salesforce for external systems to create and update records.",tags:["Apex REST","@RestResource","HTTP Methods","RestRequest","RestResponse"],description:"CloudERP needs to push inventory updates into Salesforce from their legacy mainframe. We build a custom Apex REST Web Service endpoint that accepts JSON payloads, processes complex business logic, and returns a standard response.",learnings:["Create custom REST endpoints using @RestResource","Implement @HttpGet, @HttpPost, @HttpPut methods","Read JSON payloads from RestContext.request","Send formatted responses via RestContext.response","Understand Salesforce API authentication (OAuth)"],content:`
      <h2>Background</h2>
      <p>CloudERP's legacy warehouse system needs to update Salesforce <code>Inventory__c</code> records in real-time. The standard Salesforce REST API is too generic — they want a custom endpoint that accepts a specific JSON structure, runs validation logic, and inserts/updates the records in one go.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Review the instructions below to complete the build.</p>
      </div>
<div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Custom Apex REST</p>
        <p>By annotating a class with <code>@RestResource(urlMapping='/something/*')</code>, you expose it as a custom API endpoint at <code>https://your-domain.my.salesforce.com/services/apexrest/something/</code>. External systems must authenticate (usually via OAuth 2.0 JWT or Client Credentials) to call it.</p>
      </div>

      <h2>The Apex Web Service Class</h2>
      <pre><code>@RestResource(urlMapping='/InventorySync/*')
global with sharing class InventorySyncService {

    // GET: Fetch inventory levels
    @HttpGet
    global static Inventory__c getInventory() {
        RestRequest req = RestContext.request;
        // Extract ID from URL: /services/apexrest/InventorySync/SKU-123
        String sku = req.requestURI.substring(
            req.requestURI.lastIndexOf('/') + 1);
            
        Inventory__c inv = [SELECT Id, SKU__c, Quantity__c 
                            FROM Inventory__c 
                            WHERE SKU__c = :sku LIMIT 1];
        return inv;
    }

    // POST: Create or Update inventory
    @HttpPost
    global static SyncResponse syncInventory(String sku, Integer quantity, String warehouseId) {
        SyncResponse response = new SyncResponse();
        
        try {
            // Upsert based on SKU external ID
            Inventory__c inv = new Inventory__c(
                SKU__c = sku,
                Quantity__c = quantity,
                Warehouse_ID__c = warehouseId
            );
            
            upsert inv SKU__c;
            
            response.isSuccess = true;
            response.message = 'Inventory synced successfully';
            response.recordId = inv.Id;
            
        } catch (Exception e) {
            RestContext.response.statusCode = 500;
            response.isSuccess = false;
            response.message = e.getMessage();
        }
        
        return response;
    }
    
    // Wrapper class for formatted JSON response
    global class SyncResponse {
        global Boolean isSuccess;
        global String message;
        global String recordId;
    }
}</code></pre>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Auto-JSON Parsing</p>
        <p>Notice the <code>@HttpPost</code> method parameters (sku, quantity, warehouseId). Salesforce automatically parses incoming JSON like <code>{"sku": "ABC", "quantity": 50}</code> and maps them to the method parameters. The return object is automatically serialized back to JSON.</p>
      </div>

      <h2>Testing the Endpoint</h2>
      <p>External systems will call:</p>
      <pre><code>POST /services/apexrest/InventorySync/
Host: your-domain.my.salesforce.com
Authorization: Bearer 00Dxx000000...
Content-Type: application/json

{
    "sku": "PROD-999",
    "quantity": 150,
    "warehouseId": "WH-North"
}</code></pre>
    `},{id:18,title:"HealthCare Plus — LWC Basics: Custom Patient Card",difficulty:"Expert",category:"LWC / Fundamentals",company:"HealthCare Plus",subtitle:"Build your first Lightning Web Component: reactive data binding, track/api decorators, and the Wire service.",tags:["LWC","@api","@track","@wire","HTML Template","Lightning Data Service"],description:"HealthCare Plus wants a custom widget on the Account page that highlights critical patient vitals (Blood Type, Allergies) fetched directly from the database without Apex.",learnings:["Create an LWC bundle (HTML, JS, XML)","Use Lightning Data Service (LDS) with @wire to fetch data without Apex","Use @api to expose properties to the Lightning App Builder","Implement reactive data binding in the HTML template","Configure the component for Record Pages"],content:`
      <h2>Background</h2>
      <p>HealthCare Plus doctors need to see a patient's Blood Type and Allergies immediately upon opening an Account record. Standard page layouts are too cluttered. We will build a highly visible Lightning Web Component (LWC) that fetches this data automatically.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; The Metadata XML &middot; Step 2 &rarr; The JavaScript Controller &middot; Step 3 &rarr; The HTML Template</p>
      </div>
<div class="callout callout--definition">
        <p class="callout__title">💡 Concept — What is LWC?</p>
        <p><strong>Lightning Web Components</strong> is Salesforce's modern UI framework based on native web standards (Custom Elements, Shadow DOM). It replaces the older Aura framework. An LWC is a bundle of 3 core files: <code>.html</code> (template), <code>.js</code> (logic), and <code>.js-meta.xml</code> (metadata).</p>
      </div>

      <h2>Step 1: The Metadata XML</h2>
      <p>This exposes the component to the Lightning App Builder so admins can drag and drop it onto the Account page.</p>
      <pre><code>&lt;!-- patientCard.js-meta.xml --&gt;
&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata"&gt;
    &lt;apiVersion&gt;58.0&lt;/apiVersion&gt;
    &lt;isExposed&gt;true&lt;/isExposed&gt;
    &lt;targets&gt;
        &lt;target&gt;lightning__RecordPage&lt;/target&gt;
    &lt;/targets&gt;
&lt;/LightningComponentBundle&gt;</code></pre>

      <h2>Step 2: The JavaScript Controller</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — @api and @wire</p>
        <p><code>@api recordId</code> automatically receives the ID of the current record the component is placed on. <code>@wire</code> (Lightning Data Service) provisions a stream of data to the component. If the database updates, the component re-renders automatically — no Apex needed!</p>
      </div>
      <pre><code>// patientCard.js
import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import BLOOD_TYPE_FIELD from '@salesforce/schema/Account.Blood_Type__c';
import ALLERGIES_FIELD from '@salesforce/schema/Account.Allergies__c';

export default class PatientCard extends LightningElement {
    // Exposes property to receive current record ID
    @api recordId;

    // Wire service fetches data without Apex
    @wire(getRecord, { recordId: '$recordId', fields: [BLOOD_TYPE_FIELD, ALLERGIES_FIELD] })
    patient;

    get bloodType() {
        return getFieldValue(this.patient.data, BLOOD_TYPE_FIELD);
    }

    get allergies() {
        return getFieldValue(this.patient.data, ALLERGIES_FIELD);
    }
}</code></pre>

      <h2>Step 3: The HTML Template</h2>
      <pre><code>&lt;!-- patientCard.html --&gt;
&lt;template&gt;
    &lt;lightning-card title="Critical Patient Vitals" icon-name="standard:healthcare"&gt;
        
        &lt;template if:true={patient.data}&gt;
            &lt;div class="slds-p-around_medium"&gt;
                &lt;p&gt;&lt;strong&gt;Blood Type:&lt;/strong&gt; {bloodType}&lt;/p&gt;
                &lt;p&gt;&lt;strong&gt;Known Allergies:&lt;/strong&gt; 
                    &lt;span class="slds-text-color_error"&gt;{allergies}&lt;/span&gt;
                &lt;/p&gt;
            &lt;/div&gt;
        &lt;/template&gt;

        &lt;template if:true={patient.error}&gt;
            &lt;div class="slds-p-around_medium slds-text-color_error"&gt;
                Error loading data.
            &lt;/div&gt;
        &lt;/template&gt;

    &lt;/lightning-card&gt;
&lt;/template&gt;</code></pre>
    `},{id:19,title:"FinancePro — LWC Communication: Lightning Message Service (LMS)",difficulty:"Expert",category:"LWC / Architecture",company:"FinancePro",subtitle:"Communicate between unconnected LWCs, Aura components, and Visualforce pages using pub/sub architecture.",tags:["LWC","LMS","Message Channel","Publish","Subscribe"],description:'FinancePro has a complex dashboard with a "Stock Ticker" component on the left and a "Portfolio Chart" on the right. When a user clicks a stock on the left, the chart on the right must update. Because they do not share a parent component, they must communicate via LMS.',learnings:["Understand parent-child vs sibling component communication","Create a Lightning Message Channel XML file","Publish messages from one LWC","Subscribe to messages in another LWC","Handle component lifecycle (connectedCallback / disconnectedCallback)"],content:`
      <h2>Background</h2>
      <p>If two LWCs have a parent-child relationship, they communicate via Custom Events (child-to-parent) and @api properties (parent-to-child). But if they sit in completely different parts of the screen (siblings or unconnected), they need a publish/subscribe mechanism. <strong>Lightning Message Service (LMS)</strong> solves this.</p>

      
      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 &rarr; Create the Message Channel &middot; Step 2 &rarr; The Publisher (Stock List LWC) &middot; Step 3 &rarr; The Subscriber (Chart LWC)</p>
      </div>
<h2>Step 1: Create the Message Channel</h2>
      <p>A Message Channel is a metadata component that defines the namespace for your pub/sub channel.</p>
      <pre><code>&lt;!-- StockSelectChannel.messageChannel-meta.xml --&gt;
&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;LightningMessageChannel xmlns="http://soap.sforce.com/2006/04/metadata"&gt;
    &lt;masterLabel&gt;StockSelectChannel&lt;/masterLabel&gt;
    &lt;isExposed&gt;true&lt;/isExposed&gt;
    &lt;description&gt;Broadcasts when a stock is selected&lt;/description&gt;
    &lt;lightningMessageFields&gt;
        &lt;fieldName&gt;stockSymbol&lt;/fieldName&gt;
        &lt;description&gt;The ticker symbol&lt;/description&gt;
    &lt;/lightningMessageFields&gt;
&lt;/LightningMessageChannel&gt;</code></pre>

      <h2>Step 2: The Publisher (Stock List LWC)</h2>
      <pre><code>// stockList.js
import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import STOCK_CHANNEL from '@salesforce/messageChannel/StockSelectChannel__c';

export default class StockList extends LightningElement {
    @wire(MessageContext)
    messageContext;

    handleStockClick(event) {
        const symbol = event.target.dataset.symbol; // e.g., 'AAPL'
        
        // Prepare the message payload
        const payload = { stockSymbol: symbol };
        
        // Broadcast the message to the entire app
        publish(this.messageContext, STOCK_CHANNEL, payload);
    }
}</code></pre>

      <h2>Step 3: The Subscriber (Chart LWC)</h2>
      <pre><code>// stockChart.js
import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import STOCK_CHANNEL from '@salesforce/messageChannel/StockSelectChannel__c';

export default class StockChart extends LightningElement {
    subscription = null;
    currentStock = 'None Selected';

    @wire(MessageContext)
    messageContext;

    // Standard LWC lifecycle hook — runs when component is inserted in DOM
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    // Standard LWC lifecycle hook — runs when component is removed
    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                STOCK_CHANNEL,
                (message) =&gt; this.handleMessage(message)
            );
        }
    }

    // Handles the incoming message
    handleMessage(message) {
        this.currentStock = message.stockSymbol;
        // Call logic to re-render chart for this.currentStock
    }
}</code></pre>
    `},{id:20,title:"PartnerHub — Experience Cloud: Building a Partner Portal",difficulty:"Medium",category:"Experience Cloud",company:"PartnerHub Logistics",subtitle:"Deploy a portal for external partners to log in, view their Opportunities, and collaborate without seeing internal data.",tags:["Experience Cloud","Partner Community","External Sharing","Portal Security"],description:"PartnerHub uses external distributors. These partners need to log into a portal, register new Leads, and update their Opportunities. We set up an Experience Cloud site with Partner Community licenses and external sharing rules.",learnings:["Enable Digital Experiences and create a site","Configure Partner Community User profiles","Understand Internal vs External OWD (Organization-Wide Defaults)","Use Sharing Sets for high-volume external data sharing","Publish an Experience Builder site"],content:`
      <h2>Background</h2>
      <p>PartnerHub's distributors currently email leads in. The company wants to give them a self-service portal (Experience Cloud site) where they can log in, register leads, and track deals — but strictly isolate their data so Partner A cannot see Partner B's deals.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Enable Digital Experiences · Step 2 → External OWD · Step 3 → Enable Partner Accounts · Step 4 → Configure Partner Profile · Step 5 → Sharing Sets vs Roles · Step 6 → Customize in Experience Builder · Step 7 → Publish</p>
      </div>

      <h2>Step 1: Enable & Create the Site</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Experience Cloud</p>
        <p><strong>Experience Cloud</strong> (formerly Communities) allows you to build portals, forums, and websites on top of your Salesforce data. External users log in with specific licenses (Customer Community, Partner Community). Each site runs on its own URL, has its own branding, and shows only the data you expose.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Digital Experiences → Settings → <strong>Enable Digital Experiences</strong>. Choose a domain name (e.g., <code>partnerhub</code>). This cannot be changed later.</li>
        <li class="step-list__item">Go to All Sites → New. Choose the <strong>Partner Central</strong> template.</li>
        <li class="step-list__item">Name it "PartnerHub Portal" and click Create.</li>
        <li class="step-list__item">Salesforce generates a URL like <code>partnerhub.my.site.com/partners</code>.</li>
      </ol>

      <h2>Step 2: External Security (OWD)</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Internal vs External OWD</p>
        <p>Once you enable Experiences, Sharing Settings splits into <strong>Default Internal Access</strong> and <strong>Default External Access</strong>. You almost always want External Access to be <strong>Private</strong> for Accounts, Contacts, and Opportunities. If you leave External Access as "Public Read Only," every partner can see every other partner's data!</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Sharing Settings.</li>
        <li class="step-list__item">Set <strong>Default External Access</strong> for Account to <strong>Private</strong>.</li>
        <li class="step-list__item">Set <strong>Default External Access</strong> for Contact to <strong>Private</strong>.</li>
        <li class="step-list__item">Set <strong>Default External Access</strong> for Lead and Opportunity to <strong>Private</strong>.</li>
      </ol>
      <table><thead><tr><th>Object</th><th>Internal Access</th><th>External Access</th></tr></thead><tbody>
        <tr><td>Account</td><td>Public Read Only</td><td><strong>Private</strong></td></tr>
        <tr><td>Contact</td><td>Controlled by Parent</td><td><strong>Private</strong></td></tr>
        <tr><td>Lead</td><td>Public Read/Write</td><td><strong>Private</strong></td></tr>
        <tr><td>Opportunity</td><td>Public Read Only</td><td><strong>Private</strong></td></tr>
      </tbody></table>

      <h2>Step 3: Enable Partner Accounts</h2>
      <p>Before a Contact can log in, their parent Account must be enabled as a Partner Account. This is a permanent, irreversible action on the Account.</p>
      <ol class="step-list">
        <li class="step-list__item">Go to a distributor's Account record in Salesforce.</li>
        <li class="step-list__item">Click the drop-down arrow next to <strong>Edit</strong> → <strong>Enable As Partner</strong>.</li>
        <li class="step-list__item">Salesforce creates a Partner Role sub-hierarchy under that Account (Partner User, Partner Manager, Partner Executive).</li>
        <li class="step-list__item">Go to the specific Contact record on that Account.</li>
        <li class="step-list__item">Click <strong>Manage External User → Enable Partner User</strong>. This creates a User record linked to the Contact.</li>
        <li class="step-list__item">Choose the <strong>Partner Community User</strong> profile. Set a Username (email) and click Save.</li>
      </ol>

      <h2>Step 4: Configure the Partner User Profile</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Partner Profile Permissions</p>
        <p>Partner users should have extremely limited access. Clone the standard "Partner Community User" profile and remove access to standard objects they don't need (e.g., Campaigns, Quotes). Grant access only to relevant Custom Objects via Object Permissions and Tab Settings.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Profiles → Clone the "Partner Community User" profile. Name: "PartnerHub Portal User".</li>
        <li class="step-list__item">Set Tab Settings: Leads = Default On, Opportunities = Default On, Cases = Default Off.</li>
        <li class="step-list__item">Under Object Permissions, grant Create on Lead, Read/Edit on Opportunity.</li>
        <li class="step-list__item">Assign this profile in the Experience Cloud Site's Administration → Members section.</li>
      </ol>

      <h2>Step 5: Sharing Sets vs Partner Roles</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — External Data Sharing</p>
        <p><strong>Partner Community</strong> licenses get roles (Partner User, Partner Manager). They share data via the Role Hierarchy just like internal users. <strong>Customer Community</strong> licenses are high-volume (no roles); they share data using <strong>Sharing Sets</strong>, which map the user's Contact/Account to fields on target records.</p>
      </div>
      <p>Since we use Partner licenses here, the portal user automatically sees Opportunities they own, or Opportunities owned by their subordinates in the partner role hierarchy.</p>
      <table><thead><tr><th>License Type</th><th>Has Roles?</th><th>Sharing Mechanism</th><th>Best For</th></tr></thead><tbody>
        <tr><td>Partner Community</td><td>Yes</td><td>Role Hierarchy + Sharing Rules</td><td>Channel partners, resellers (hundreds)</td></tr>
        <tr><td>Customer Community</td><td>No</td><td>Sharing Sets</td><td>End customers, self-service (millions)</td></tr>
        <tr><td>Customer Community Plus</td><td>Yes</td><td>Role Hierarchy + Sharing Rules</td><td>Customers needing deeper access</td></tr>
      </tbody></table>

      <h2>Step 6: Customize the Portal in Experience Builder</h2>
      <ol class="step-list">
        <li class="step-list__item">From All Sites, click <strong>Builder</strong> next to the PartnerHub Portal.</li>
        <li class="step-list__item">Click the <strong>Theme</strong> panel. Upload the PartnerHub logo and set brand colors.</li>
        <li class="step-list__item">On the Home Page, drag standard components: "Recent Items", "Rich Text" (welcome message), and "Report Chart".</li>
        <li class="step-list__item">Add a <strong>Record List</strong> component showing Opportunities filtered by <code>OwnerId = Current User</code>.</li>
        <li class="step-list__item">Navigate to the Lead Object Pages section and add the "Create Lead" form so partners can register new leads directly.</li>
      </ol>

      <h2>Step 7: Publish the Site</h2>
      <ol class="step-list">
        <li class="step-list__item">In Experience Builder, click <strong>Publish</strong> in the top-right corner.</li>
        <li class="step-list__item">Go to Administration → Settings and check <strong>Make site available to the public</strong> (this activates the URL).</li>
        <li class="step-list__item">Send login credentials to distributors. They will log in via the site URL and see only their own data.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Testing Tip</p>
        <p>To test the portal, log in as the Partner User. In Setup, find the User record and click <strong>Login</strong> next to their name. You will see the portal exactly as the partner sees it. Verify that Partner A cannot see Partner B's Opportunities.</p>
      </div>
    `},{id:21,title:"SupportX — Omni-Channel & Service Cloud Routing",difficulty:"Medium",category:"Service Cloud",company:"SupportX Global",subtitle:"Configure Omni-Channel to automatically route Cases and Live Chats to agents based on capacity and skillset.",tags:["Omni-Channel","Routing Configurations","Presence Statuses","Service Cloud"],description:"SupportX has agents handling both email cases and live chats. Agents are cherry-picking easy cases. We implement Omni-Channel to push work to agents automatically based on their availability and workload capacity.",learnings:["Enable Omni-Channel and add the utility bar component","Create Service Channels (Case, Chat)","Configure Routing Configurations (capacity and priority)","Set up Presence Statuses (Available, Busy)","Map Presence Statuses to User Profiles"],content:`
      <h2>Background</h2>
      <p>SupportX uses queues, but agents manually pick cases from list views. This causes slow response times for hard cases and agents getting overwhelmed. <strong>Omni-Channel</strong> fixes this by <em>pushing</em> work to available agents based on capacity rules.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Enable Omni-Channel · Step 2 → Service Channels · Step 3 → Routing Configurations · Step 4 → Presence Statuses · Step 5 → Assign Presence to Profiles · Step 6 → Test the Widget</p>
      </div>

      <h2>Step 1: Enable Omni-Channel</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → Omni-Channel Settings → <strong>Enable Omni-Channel</strong>.</li>
        <li class="step-list__item">Setup → App Manager → Edit your Service Console app.</li>
        <li class="step-list__item">Under Utility Items (Desktop Only), click <strong>Add Utility Item</strong> → select <strong>Omni-Channel</strong>.</li>
        <li class="step-list__item">This gives agents the phone-dialer-like widget at the bottom of their screen where they set their status and receive work.</li>
      </ol>

      <h2>Step 2: Service Channels</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Service Channels</p>
        <p>A <strong>Service Channel</strong> connects Omni-Channel to a specific Salesforce object (e.g., Case, Live Chat Transcript, Lead, Custom Object). It tells Omni-Channel: "This type of work exists and should be routed."</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Service Channels → New.</li>
        <li class="step-list__item">Create a channel for <strong>Case</strong>: Name it "Cases", Related Object = Case.</li>
        <li class="step-list__item">Create a second channel for <strong>Live Chat Transcript</strong> (Messaging): Name it "Chats", Related Object = MessagingSession.</li>
      </ol>

      <h2>Step 3: Routing Configurations</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Routing Configurations</p>
        <p>A <strong>Routing Configuration</strong> determines the size of the work (e.g., a Case consumes 5 units of capacity, a Chat consumes 2 units) and the routing model (Most Available Agent or Least Active Agent). You link a Routing Config to a <strong>Queue</strong>.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Routing Configurations → New.</li>
        <li class="step-list__item">Name: <code>High_Priority_Cases</code>. Routing Model: <strong>Most Available</strong>. Priority: 1 (highest).</li>
        <li class="step-list__item">Set Units of Capacity: <strong>5</strong> (a single high-priority case takes significant agent effort).</li>
        <li class="step-list__item">Create another Routing Config: <code>Low_Priority_Cases</code>. Priority: 3. Units of Capacity: 2.</li>
        <li class="step-list__item">Create another for Chats: <code>Live_Chat_Routing</code>. Priority: 2. Units: 3.</li>
      </ol>
      <table><thead><tr><th>Routing Configuration</th><th>Priority</th><th>Capacity Units</th><th>Routing Model</th></tr></thead><tbody>
        <tr><td><code>High_Priority_Cases</code></td><td>1</td><td>5</td><td>Most Available</td></tr>
        <tr><td><code>Live_Chat_Routing</code></td><td>2</td><td>3</td><td>Most Available</td></tr>
        <tr><td><code>Low_Priority_Cases</code></td><td>3</td><td>2</td><td>Most Available</td></tr>
      </tbody></table>

      <h2>Step 4: Link Queues to Routing Configs</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → Queues. Edit the "Tier 1 Support" queue.</li>
        <li class="step-list__item">In the <strong>Routing Configuration</strong> lookup, select <code>High_Priority_Cases</code>.</li>
        <li class="step-list__item">Repeat for your Chat queue → select <code>Live_Chat_Routing</code>.</li>
        <li class="step-list__item">Now, when a Case enters the Tier 1 queue, Omni-Channel will automatically push it to the most available agent.</li>
      </ol>

      <h2>Step 5: Presence Statuses</h2>
      <p>Agents need a way to tell the system they are ready for work. Without Presence Statuses assigned to their profile, agents cannot log in to the Omni-Channel widget.</p>
      <ol class="step-list">
        <li class="step-list__item">Setup → Presence Statuses → New.</li>
        <li class="step-list__item">Name: <code>Available for Cases</code>. Status Options: Online. Selected Channels: Case.</li>
        <li class="step-list__item">Create another: <code>Available for Cases & Chat</code>. Status: Online. Channels: Case AND Messaging.</li>
        <li class="step-list__item">Name: <code>On Break</code>. Status Options: Busy (doesn't receive work).</li>
      </ol>

      <h2>Step 6: Assign Statuses to Profiles</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Common Mistake</p>
        <p>If you skip this step, agents will see an error when they try to go Online in the Omni-Channel widget. You <strong>must</strong> assign Presence Statuses to each agent's Profile or Permission Set.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Go to the Support Agent Profile → <strong>Enabled Service Presence Status Access</strong>.</li>
        <li class="step-list__item">Add all the statuses you created (Available for Cases, Available for Cases & Chat, On Break).</li>
        <li class="step-list__item">Set the agent's <strong>Overall Capacity</strong>: Setup → Presence Configurations → New. Set Capacity: 10. This means an agent can handle 2 high-priority cases (5+5=10) or 5 low-priority cases (2Ã—5=10) simultaneously.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Capacity Math</p>
        <p>Agent Total Capacity = 10. A high-priority Case consumes 5. A Chat consumes 3. So an agent handling 1 Case (5) has 5 remaining capacity — enough for 1 Chat (3), leaving 2 unused. The system won't push another Case until a slot frees up.</p>
      </div>
    `},{id:22,title:"AeroTech — Salesforce CPQ: Product Rules & Pricing",difficulty:"Hard",category:"CPQ",company:"AeroTech Manufacturing",subtitle:"Configure Configure, Price, Quote (CPQ) with Product Bundles, Option Constraints, and Discount Schedules.",tags:["Salesforce CPQ","Product Bundles","Product Rules","Discount Schedules","Quote Templates"],description:"AeroTech sells complex drone bundles. Sales reps frequently quote incompatible parts. We configure Salesforce CPQ to bundle products, enforce compatibility rules, and automate volume discounts.",learnings:["Build a CPQ Product Bundle with Features and Options","Create Option Constraints to prevent incompatible selections","Implement Product Rules (Validation and Selection)","Configure Discount Schedules for volume pricing","Understand the CPQ data model (Quote, Quote Line)"],content:`
      <h2>Background</h2>
      <p>AeroTech sells commercial drones. A drone requires a chassis, exactly one battery type, and optional cameras. Reps are configuring quotes with two batteries (impossible) or heavy cameras on light drones (incompatible). <strong>Salesforce CPQ</strong> solves this.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Create Parent Product (Bundle) · Step 2 → Features & Product Options · Step 3 → Option Constraints · Step 4 → Product Rules · Step 5 → Discount Schedules · Step 6 → Quote Template</p>
      </div>

      <h2>Step 1: Product Bundles</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — CPQ Bundles</p>
        <p>A Bundle is a parent product (Drone) containing <strong>Features</strong> (categories like Power, Optics). Inside Features are <strong>Product Options</strong> (the actual child products like 4K Camera). You can enforce min/max quantities per Feature.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Products tab → New Product: "Drone X1". Check <strong>Active</strong>.</li>
        <li class="step-list__item">On the Drone X1 record, go to Related → Features → New.</li>
        <li class="step-list__item">Feature 1: "Power". Min Options Selected: 1, Max: 1 (forces exactly one battery choice).</li>
        <li class="step-list__item">Feature 2: "Optics". Min: 0, Max: 3 (optional cameras).</li>
        <li class="step-list__item">Feature 3: "Accessories". Min: 0, Max: 5.</li>
      </ol>

      <h2>Step 2: Product Options</h2>
      <p>Product Options link child products (which must already exist as standalone Products) to the parent Bundle through a Feature.</p>
      <ol class="step-list">
        <li class="step-list__item">Create standalone Products: "Standard Battery" ($200), "Heavy Duty Battery" ($450), "4K Camera" ($800), "Pro Cinema Camera" ($2,200), "Reinforced Landing Gear" ($350).</li>
        <li class="step-list__item">On the Drone X1 record → Related → Product Options → New.</li>
        <li class="step-list__item">Link "Standard Battery" to the "Power" Feature. Quantity: 1.</li>
        <li class="step-list__item">Link "Heavy Duty Battery" to the "Power" Feature. Quantity: 1.</li>
        <li class="step-list__item">Link "4K Camera" and "Pro Cinema Camera" to the "Optics" Feature.</li>
      </ol>
      <table><thead><tr><th>Product Option</th><th>Feature</th><th>Default Qty</th><th>Required</th></tr></thead><tbody>
        <tr><td>Standard Battery</td><td>Power</td><td>1</td><td>No (but min 1 enforced by Feature)</td></tr>
        <tr><td>Heavy Duty Battery</td><td>Power</td><td>1</td><td>No</td></tr>
        <tr><td>4K Camera</td><td>Optics</td><td>1</td><td>No</td></tr>
        <tr><td>Pro Cinema Camera</td><td>Optics</td><td>1</td><td>No</td></tr>
        <tr><td>Reinforced Landing Gear</td><td>Accessories</td><td>1</td><td>No</td></tr>
      </tbody></table>

      <h2>Step 3: Option Constraints</h2>
      <p><strong>Scenario:</strong> The "Heavy Duty Battery" option requires the "Reinforced Landing Gear" option because of the added weight.</p>
      <ol class="step-list">
        <li class="step-list__item">On Drone X1 → Related → Option Constraints → New.</li>
        <li class="step-list__item">Type: <strong>Dependency</strong>. Constrained Option = Heavy Duty Battery, Constraining Option = Reinforced Landing Gear.</li>
        <li class="step-list__item">The Heavy Duty Battery cannot be selected until the Reinforced Landing Gear is also selected.</li>
      </ol>

      <h2>Step 4: Product Rules (Validation)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Product Rules</p>
        <p>A <strong>Product Rule</strong> evaluates the quote configuration and either validates it (fires an error), auto-selects options, or hides options. It consists of <strong>Error Conditions</strong> (when does it fire?), an <strong>Error Message</strong>, and a scope (Quote or Product).</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Installed Packages → CPQ → Product Rules → New.</li>
        <li class="step-list__item">Type: <strong>Validation</strong>. Scope: Product. Product: Drone X1.</li>
        <li class="step-list__item">Add Error Condition 1: Tested Variable = "Light Chassis" Product Option, Operator = "is selected".</li>
        <li class="step-list__item">Add Error Condition 2 (AND): Tested Variable = "Pro Cinema Camera" Product Option, Operator = "is selected".</li>
        <li class="step-list__item">Error Message: "The Pro Cinema Camera is too heavy for the Light Chassis. Please select the Standard Chassis or remove the camera."</li>
        <li class="step-list__item">Condition Logic: 1 AND 2. Active = true.</li>
      </ol>

      <h2>Step 5: Discount Schedules (Volume Pricing)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Discount Schedules</p>
        <p>A <strong>Discount Schedule</strong> applies tiered, volume-based discounts automatically. E.g., buy 1-9 = 0% off, 10-49 = 10% off, 50+ = 20% off. It applies to Quote Lines automatically as quantities change.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">CPQ → Discount Schedules → New. Name: "Drone Volume Discount". Type: Range.</li>
        <li class="step-list__item">Add Tiers:</li>
      </ol>
      <table><thead><tr><th>Lower Bound</th><th>Upper Bound</th><th>Discount (%)</th></tr></thead><tbody>
        <tr><td>1</td><td>9</td><td>0%</td></tr>
        <tr><td>10</td><td>49</td><td>10%</td></tr>
        <tr><td>50</td><td>99</td><td>15%</td></tr>
        <tr><td>100</td><td>—</td><td>20%</td></tr>
      </tbody></table>
      <ol class="step-list" start="3">
        <li class="step-list__item">Go to the Drone X1 Product record. In the <strong>Discount Schedule</strong> lookup, select "Drone Volume Discount".</li>
        <li class="step-list__item">Now, when a rep enters Quantity = 15, CPQ automatically applies a 10% discount on the Quote Line.</li>
      </ol>

      <h2>Step 6: Quote Template</h2>
      <ol class="step-list">
        <li class="step-list__item">CPQ → Quote Templates → New. Design a professional PDF output showing: Company Logo, Quote Lines (with Bundle breakdown), Totals, and Terms & Conditions.</li>
        <li class="step-list__item">Assign the template as the default on the Quote record. Reps click <strong>Generate Document</strong> to produce a branded PDF.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 CPQ Data Model</p>
        <p>Opportunity → Quote (<code>SBQQ__Quote__c</code>) → Quote Line (<code>SBQQ__QuoteLine__c</code>). A Quote Line references a Product. When a Quote is marked "Primary", its lines sync back to the Opportunity's Products (OpportunityLineItem), keeping revenue reporting accurate.</p>
      </div>
    `},{id:23,title:"MergeCorp — Data Migration: Data Loader & External IDs",difficulty:"Medium",category:"Admin / Data Management",company:"MergeCorp",subtitle:"Migrate 50,000+ Accounts and Contacts from a legacy CRM using Data Loader, maintaining parent-child relationships via External IDs.",tags:["Data Loader","Data Migration","External ID","Upsert","VLOOKUP"],description:"MergeCorp acquired a competitor and needs to migrate their legacy CRM data into Salesforce. We use Data Loader and External IDs to import Accounts and related Contacts without relying on Salesforce internal 18-character IDs.",learnings:["Install and configure Salesforce Data Loader","Design an External ID strategy for data migration","Understand the difference between Insert and Upsert","Map parent-child relationships using External IDs in CSV files","Handle errors and rollback strategies"],content:`
      <h2>Background</h2>
      <p>MergeCorp acquired a smaller company called "DataNow" that uses a simple CRM. DataNow has 50,000 Accounts and 120,000 Contacts in CSV exports. We must import them into Salesforce while maintaining the Account-Contact parent-child relationship.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Create External ID fields · Step 2 → Prepare the Account CSV · Step 3 → Load Accounts via Data Loader · Step 4 → Prepare the Contact CSV · Step 5 → Load Contacts (mapping parent via External ID) · Step 6 → Verify & Cleanup</p>
      </div>

      <h2>Step 1: Create External ID Fields</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — External ID</p>
        <p>An <strong>External ID</strong> is a custom field marked as "External ID" in its field settings. It tells Salesforce: "This value uniquely identifies a record from an external system." During data loads, it allows you to <strong>upsert</strong> (insert-or-update) and reference parent records without knowing Salesforce's internal 18-character ID.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Object Manager → Account → Fields → New.</li>
        <li class="step-list__item">Type: Text. Label: <code>Legacy_CRM_ID</code>. Length: 50.</li>
        <li class="step-list__item">Check <strong>External ID</strong> and <strong>Unique</strong>. This prevents duplicate imports.</li>
        <li class="step-list__item">Repeat for Contact: Create <code>Legacy_Contact_ID__c</code> (Text, External ID, Unique).</li>
      </ol>
      <table><thead><tr><th>Object</th><th>Field Label</th><th>API Name</th><th>Type</th><th>External ID?</th><th>Unique?</th></tr></thead><tbody>
        <tr><td>Account</td><td>Legacy CRM ID</td><td><code>Legacy_CRM_ID__c</code></td><td>Text(50)</td><td>âœ…</td><td>âœ…</td></tr>
        <tr><td>Contact</td><td>Legacy Contact ID</td><td><code>Legacy_Contact_ID__c</code></td><td>Text(50)</td><td>âœ…</td><td>âœ…</td></tr>
      </tbody></table>

      <h2>Step 2: Prepare the Account CSV</h2>
      <p>The CSV from DataNow's export must have a column for the legacy ID that maps to our new External ID field.</p>
      <pre><code>Legacy_CRM_ID__c,Name,Industry,BillingCity,BillingState
DN-ACC-001,Acme Corp,Technology,San Francisco,CA
DN-ACC-002,GlobalTech,Manufacturing,Austin,TX
DN-ACC-003,MedPharma,Healthcare,Boston,MA</code></pre>

      <h2>Step 3: Load Accounts via Data Loader</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Insert vs Upsert</p>
        <p><strong>Insert</strong> always creates new records. <strong>Upsert</strong> checks if a record with the same External ID already exists — if it does, it updates; if not, it inserts. Always use Upsert for migrations to make them re-runnable (idempotent).</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Open Data Loader. Click <strong>Upsert</strong>.</li>
        <li class="step-list__item">Select object: <strong>Account</strong>.</li>
        <li class="step-list__item">Browse to your Account CSV file. Click Next.</li>
        <li class="step-list__item">External ID field: select <code>Legacy_CRM_ID__c</code>. This tells Data Loader: "Match on this field."</li>
        <li class="step-list__item">Map CSV columns to Salesforce fields. Click Finish.</li>
        <li class="step-list__item">Review the success and error files. Fix any errors and re-run.</li>
      </ol>

      <h2>Step 4: Prepare the Contact CSV</h2>
      <p>This is the crucial step. Contacts need to be linked to their parent Account. Instead of using Salesforce Account IDs (which you don't have yet), you reference the Account's <strong>External ID</strong>.</p>
      <pre><code>Legacy_Contact_ID__c,FirstName,LastName,Email,Account.Legacy_CRM_ID__c
DN-CON-001,John,Smith,john@acme.com,DN-ACC-001
DN-CON-002,Sarah,Jones,sarah@globaltech.com,DN-ACC-002
DN-CON-003,Mike,Chen,mike@medpharma.com,DN-ACC-003</code></pre>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ The Column Header Format</p>
        <p>Notice the column <code>Account.Legacy_CRM_ID__c</code>. The dot notation tells Data Loader: "Look up the Account whose <code>Legacy_CRM_ID__c</code> matches this value, and set it as the parent." This is how you establish relationships without Salesforce IDs.</p>
      </div>

      <h2>Step 5: Load Contacts</h2>
      <ol class="step-list">
        <li class="step-list__item">Data Loader → Upsert → Contact.</li>
        <li class="step-list__item">External ID: <code>Legacy_Contact_ID__c</code>.</li>
        <li class="step-list__item">Map the <code>Account.Legacy_CRM_ID__c</code> column to the AccountId field.</li>
        <li class="step-list__item">Data Loader will automatically resolve each Contact's parent Account by matching the External ID.</li>
      </ol>

      <h2>Step 6: Verify & Cleanup</h2>
      <ol class="step-list">
        <li class="step-list__item">Create a Report: Accounts without Contacts (LEFT OUTER JOIN) to find orphaned records.</li>
        <li class="step-list__item">Spot-check 10 random records: verify the Account-Contact hierarchy matches the source system.</li>
        <li class="step-list__item">Check Data Loader error files for common issues: required field missing, duplicate External IDs, or invalid picklist values.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Load Order Rule</p>
        <p>Always load <strong>parent objects first, child objects second</strong>. Accounts before Contacts. Accounts before Opportunities. If you load Contacts first, Data Loader cannot resolve <code>Account.Legacy_CRM_ID__c</code> because the Accounts don't exist yet.</p>
      </div>
    `},{id:24,title:"EventFlow — Event-Driven Architecture: Platform Events",difficulty:"Expert",category:"Architecture / Integration",company:"EventFlow IoT",subtitle:"Build a decoupled integration using Platform Events to process millions of IoT device pings asynchronously.",tags:["Platform Events","Event-Driven Architecture","Apex Triggers","Integration","High Volume"],description:"EventFlow manufactures smart printers that send diagnostic pings every hour. Direct API inserts of these pings cause database lock contention. We refactor the architecture to publish Platform Events, which are consumed by an Apex Trigger asynchronously.",learnings:["Define Custom Platform Events (__e)","Publish events via API or Apex (EventBus.publish)","Consume events using an Apex after-insert trigger","Understand decoupled, publish-subscribe architecture","Compare Platform Events to standard object inserts"],content:`
      <h2>Background</h2>
      <p>EventFlow's IoT printers call a Salesforce REST API to insert a <code>Diagnostic_Log__c</code> record. With thousands of printers pinging simultaneously, Salesforce throws "UNABLE_TO_LOCK_ROW" errors. Direct DML is synchronous and heavy. <strong>Platform Events</strong> act as a fast, decoupled queue.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Define Platform Event · Step 2 → External System publishes · Step 3 → Apex Trigger consumes · Step 4 → Error handling · Step 5 → Monitor in Event Bus</p>
      </div>

      <h2>Step 1: Define the Platform Event</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Platform Events</p>
        <p>A <strong>Platform Event</strong> is similar to a custom object, but it ends in <code>__e</code>. It is part of Salesforce's enterprise message bus. Events are published (not inserted), they persist for 72 hours, have no page layouts, and cannot be updated. They are designed for massive scale.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Platform Events → New. Label: <code>Printer Ping</code>. API Name: <code>Printer_Ping__e</code>.</li>
        <li class="step-list__item">Publish Behavior: <strong>Publish After Commit</strong> (default, safer — only publishes if the transaction succeeds) or <strong>Publish Immediately</strong> (publishes even if the transaction rolls back).</li>
        <li class="step-list__item">Add custom fields:</li>
      </ol>
      <table><thead><tr><th>Field Label</th><th>API Name</th><th>Type</th><th>Details</th></tr></thead><tbody>
        <tr><td>Serial Number</td><td><code>Serial_Number__c</code></td><td>Text(50)</td><td>Unique printer identifier</td></tr>
        <tr><td>Error Code</td><td><code>Error_Code__c</code></td><td>Text(10)</td><td>"OK" or error code like "E-02"</td></tr>
        <tr><td>Ink Level</td><td><code>Ink_Level__c</code></td><td>Number(3,0)</td><td>Percentage remaining (0-100)</td></tr>
        <tr><td>Firmware Version</td><td><code>Firmware_Version__c</code></td><td>Text(20)</td><td>Current firmware</td></tr>
      </tbody></table>

      <h2>Step 2: External System Publishes the Event</h2>
      <p>Instead of hitting the standard SObject endpoint, the IoT devices POST to the Platform Event endpoint:</p>
      <pre><code>POST /services/data/v58.0/sobjects/Printer_Ping__e
{
    "Serial_Number__c": "PRN-9941",
    "Error_Code__c": "E-02",
    "Ink_Level__c": 34,
    "Firmware_Version__c": "3.2.1"
}</code></pre>
      <p>This returns a 201 Created instantly, without locking any database rows. The event is placed on the Event Bus.</p>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Publish vs Insert</p>
        <p>When you <code>INSERT</code> a standard record, Salesforce grabs a database lock, writes to disk, fires triggers synchronously, and returns. When you <code>PUBLISH</code> an event, Salesforce writes to the Event Bus (a separate, high-throughput message queue), returns instantly, and consumers process the event asynchronously. No row locks. No contention.</p>
      </div>

      <h2>Step 3: Consume the Event in Apex</h2>
      <p>Salesforce runs a trigger to process these events in the background, in batches. The trigger runs in its own execution context with its own governor limits.</p>
      <pre><code>trigger PrinterPingTrigger on Printer_Ping__e (after insert) {
    // Platform Event triggers ONLY support "after insert"
    List&lt;Diagnostic_Log__c&gt; logsToCreate = new List&lt;Diagnostic_Log__c&gt;();
    
    for (Printer_Ping__e event : Trigger.new) {
        if (event.Error_Code__c != 'OK') {
            logsToCreate.add(new Diagnostic_Log__c(
                Printer_Serial__c = event.Serial_Number__c,
                Error__c = event.Error_Code__c,
                Ink_Level__c = event.Ink_Level__c,
                Timestamp__c = System.now()
            ));
        }
    }
    
    if (!logsToCreate.isEmpty()) {
        insert logsToCreate; // Processes safely in the background
    }
}</code></pre>

      <h2>Step 4: Error Handling with EventBus.RetryableException</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Retries in Platform Event Triggers</p>
        <p>If your trigger fails (e.g., a temporary database lock), Platform Events are lost by default. To prevent this, throw <code>EventBus.RetryableException</code> — Salesforce will retry the batch up to 9 times.</p>
      </div>
      <pre><code>trigger PrinterPingTrigger on Printer_Ping__e (after insert) {
    try {
        // ... processing logic ...
        insert logsToCreate;
    } catch (Exception e) {
        // Tell the platform to retry this batch of events
        throw new EventBus.RetryableException(e.getMessage());
    }
}</code></pre>

      <h2>Step 5: Monitoring</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → Platform Events → <code>Printer_Ping__e</code> → <strong>Subscriptions</strong> to see active consumers.</li>
        <li class="step-list__item">Use the <strong>Event Bus</strong> page in Setup to monitor event delivery, failures, and replay IDs.</li>
        <li class="step-list__item">You can also subscribe to Platform Events from Flow (Platform Event-Triggered Flow) or from an external system using CometD/Pub-Sub API.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Platform Events vs Change Data Capture</p>
        <p><strong>Platform Events</strong>: You define the event schema. You decide when to publish. Used for custom integrations.<br>
        <strong>Change Data Capture (CDC)</strong>: Salesforce auto-publishes events whenever a standard/custom object record changes. Used to sync Salesforce data changes to external systems automatically.</p>
      </div>
    `},{id:25,title:"AgileConfig — Custom Metadata Types: Hardcoding Prevention",difficulty:"Medium",category:"Architecture / Best Practices",company:"AgileConfig Solutions",subtitle:"Replace hardcoded IDs, API keys, and business rules in Apex/Flow using Custom Metadata Types.",tags:["Custom Metadata Types","Deployment","Apex","Hardcoding","SOQL"],description:"AgileConfig has Apex code full of hardcoded Queue IDs and API endpoints. When deployed from Sandbox to Production, the code breaks because IDs change. We refactor the org to use Custom Metadata Types for environment-agnostic configuration.",learnings:["Create Custom Metadata Types (__mdt)","Understand the difference between Custom Settings and Custom Metadata","Query Custom Metadata in Apex without consuming SOQL limits","Reference Custom Metadata in Flow and Validation Rules","Deploy configuration records via Changesets/CI-CD"],content:`
      <h2>Background</h2>
      <p>Never hardcode an ID (e.g., <code>00Gxx00000123abc</code>) in Apex or Flow. Sandbox IDs rarely match Production IDs. Previously, developers used Custom Settings or List variables. Today, <strong>Custom Metadata Types (CMDT)</strong> are the gold standard because the records themselves are deployable metadata, not just data.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Create the Custom Metadata Type · Step 2 → Add Fields · Step 3 → Create Records · Step 4 → Use in Apex · Step 5 → Use in Flow & Validation Rules</p>
      </div>

      <h2>Step 1: Create the Custom Metadata Type</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Custom Metadata Types</p>
        <p>CMDTs look like custom objects but end in <code>__mdt</code>. The fields are defined in Setup, and the records you create are packaged as metadata. Querying them in Apex does <strong>not count against the 100 SOQL query limit</strong>. This is a massive advantage over Custom Settings.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Custom Metadata Types → New Metadata Type.</li>
        <li class="step-list__item">Label: <code>Integration Setting</code>. API Name auto-fills as <code>Integration_Setting__mdt</code>.</li>
        <li class="step-list__item">Visibility: <strong>Public</strong> (so it can be packaged).</li>
      </ol>

      <h2>Step 2: Add Custom Fields</h2>
      <ol class="step-list">
        <li class="step-list__item">Click on Integration_Setting__mdt → Custom Fields → New.</li>
        <li class="step-list__item">Create the following fields:</li>
      </ol>
      <table><thead><tr><th>Field Label</th><th>API Name</th><th>Type</th><th>Purpose</th></tr></thead><tbody>
        <tr><td>Endpoint URL</td><td><code>Endpoint_URL__c</code></td><td>URL</td><td>The API base URL</td></tr>
        <tr><td>API Key</td><td><code>API_Key__c</code></td><td>Text(255)</td><td>Authentication key</td></tr>
        <tr><td>Timeout (ms)</td><td><code>Timeout_ms__c</code></td><td>Number</td><td>Callout timeout value</td></tr>
        <tr><td>Is Active</td><td><code>Is_Active__c</code></td><td>Checkbox</td><td>Enable/disable integrations</td></tr>
      </tbody></table>

      <h2>Step 3: Create Records (Manage Integration Settings)</h2>
      <ol class="step-list">
        <li class="step-list__item">Click <strong>Manage Records</strong> → New.</li>
        <li class="step-list__item">Record 1: Label = "Payment Gateway". DeveloperName = <code>PaymentGateway</code>. Endpoint = <code>https://api.paygateway.com/v2</code>. API Key = <code>pk_live_xxx</code>.</li>
        <li class="step-list__item">Record 2: Label = "Shipping API". DeveloperName = <code>ShippingAPI</code>. Endpoint = <code>https://api.shipper.com/v1</code>.</li>
      </ol>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Deployability</p>
        <p>These records travel with your Change Sets and CI/CD pipelines. When you deploy from Sandbox to Production, the CMDT records deploy with them. Custom Settings records do NOT — you have to manually re-enter data in each environment.</p>
      </div>

      <h2>Step 4: Using CMDT in Apex</h2>
      <p>Instead of hardcoding the endpoint:</p>
      <pre><code>// âŒ DO NOT DO THIS
// HttpRequest req = new HttpRequest();
// req.setEndpoint('https://api.gateway.com/v1');

// âœ… DO THIS
Integration_Setting__mdt settings = 
    Integration_Setting__mdt.getInstance('PaymentGateway');

HttpRequest req = new HttpRequest();
req.setEndpoint(settings.Endpoint_URL__c);
req.setHeader('Authorization', 'Bearer ' + settings.API_Key__c);
req.setTimeout(Integer.valueOf(settings.Timeout_ms__c));</code></pre>
      <div class="callout callout--definition">
        <p class="callout__title">💡 getInstance() vs SOQL</p>
        <p>Using <code>getInstance('DeveloperName')</code> fetches the record directly from the metadata cache without any SOQL syntax and <strong>does not consume SOQL limits</strong>. It is the fastest, safest way to access CMDT records in Apex. You can also use <code>getAll()</code> to fetch all records into a Map.</p>
      </div>

      <h2>Step 5: Using CMDT in Flow & Validation Rules</h2>
      <ol class="step-list">
        <li class="step-list__item"><strong>In Flow:</strong> Use a Get Records element on <code>Integration_Setting__mdt</code>. Filter by <code>DeveloperName = 'PaymentGateway'</code>. Store the result in a variable. Access <code>{!var_Setting.Endpoint_URL__c}</code>.</li>
        <li class="step-list__item"><strong>In Validation Rules:</strong> You can reference CMDT using the <code>$CustomMetadata</code> global variable: <code>$CustomMetadata.Integration_Setting__mdt.PaymentGateway.Is_Active__c = TRUE</code>.</li>
      </ol>

      <h3>Custom Settings vs Custom Metadata — Comparison</h3>
      <table><thead><tr><th>Feature</th><th>Custom Settings</th><th>Custom Metadata Types</th></tr></thead><tbody>
        <tr><td>API Suffix</td><td>No suffix (sObject-like)</td><td><code>__mdt</code></td></tr>
        <tr><td>Records areâ€¦</td><td>Data (not deployable)</td><td><strong>Metadata (deployable)</strong></td></tr>
        <tr><td>SOQL Limits</td><td>Does NOT consume limits</td><td>Does NOT consume limits</td></tr>
        <tr><td>Accessible inâ€¦</td><td>Apex, Formulas</td><td>Apex, Formulas, <strong>Flows, Validation Rules</strong></td></tr>
        <tr><td>Best For</td><td>User/profile-specific settings</td><td><strong>Environment-agnostic config</strong></td></tr>
      </tbody></table>
    `},{id:26,title:"OmniService — Email-to-Case & Web-to-Case Automation",difficulty:"Easy",category:"Service Cloud",company:"OmniService Support",subtitle:"Automate support ticket creation from customer emails and website forms.",tags:["Email-to-Case","Web-to-Case","Auto-Response Rules","Service Cloud"],description:"OmniService agents are manually copying customer emails into Salesforce Cases. We configure Email-to-Case to automatically generate tickets, capture email threads, and fire auto-response emails.",learnings:["Configure On-Demand Email-to-Case","Set up Web-to-Case HTML generation","Implement Auto-Response Rules for immediate customer feedback","Understand Thread IDs for keeping emails on the same Case"],content:`
      <h2>Background</h2>
      <p>When customers email <code>support@omniservice.com</code>, it currently goes to a shared Outlook inbox. Agents manually type the details into Salesforce. We will automate this end-to-end.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Enable Email-to-Case · Step 2 → Configure Routing Address · Step 3 → Auto-Response Rules · Step 4 → Web-to-Case · Step 5 → Thread ID Behavior</p>
      </div>

      <h2>Step 1: Email-to-Case Configuration</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — On-Demand Email-to-Case</p>
        <p>Salesforce generates a long, unique email address (e.g., <code>abc123@xyz.salesforce.com</code>). You go to your company's email server (e.g., Office365, Gmail) and set up a forwarding rule: anything sent to <code>support@omniservice.com</code> forwards to the long Salesforce address. Salesforce reads the email and creates a Case.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Email-to-Case → <strong>Enable Email-to-Case</strong>.</li>
        <li class="step-list__item">Check <strong>On-Demand Service</strong> (recommended over the older Email-to-Case Agent).</li>
        <li class="step-list__item">Check "Enable HTML Email" and "Save Email Headers".</li>
      </ol>

      <h2>Step 2: Routing Addresses</h2>
      <ol class="step-list">
        <li class="step-list__item">Under Email-to-Case, click <strong>New Routing Address</strong>.</li>
        <li class="step-list__item">Routing Name: "General Support". Email Address: <code>support@omniservice.com</code>.</li>
        <li class="step-list__item">Case Settings:</li>
      </ol>
      <table><thead><tr><th>Setting</th><th>Value</th><th>Why</th></tr></thead><tbody>
        <tr><td>Case Owner</td><td>Support Queue</td><td>Cases go to the queue, not a person</td></tr>
        <tr><td>Case Priority</td><td>Medium</td><td>Default; can be changed by assignment rules</td></tr>
        <tr><td>Case Origin</td><td>Email</td><td>Tracks the channel the case came from</td></tr>
        <tr><td>Case Record Type</td><td>Customer Support</td><td>Ensures correct Page Layout</td></tr>
      </tbody></table>
      <ol class="step-list" start="4">
        <li class="step-list__item">Click Save. Salesforce sends a verification email to the address.</li>
        <li class="step-list__item">Copy the generated Salesforce forwarding address (the long email). Go to your IT team and set up email forwarding from <code>support@omniservice.com</code> to this address.</li>
      </ol>

      <h2>Step 3: Auto-Response Rules</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Auto-Response Rules vs Workflows/Flows</p>
        <p><strong>Auto-Response Rules</strong> are specifically designed to send an immediate "We received your request" email to a Lead or Case contact. They are better than Flows for this because they only fire on the initial creation (Web/Email), respect email formatting specifically for replies, and include the Thread ID automatically.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Case Auto-Response Rules → New. Name: "Support Auto Response". Set as Active.</li>
        <li class="step-list__item">Click New Rule Entry. Sort Order: 1.</li>
        <li class="step-list__item">Rule Criteria: <code>Case: Origin equals Email</code>.</li>
        <li class="step-list__item">Select an Email Template (e.g., "Support Ticket Created — Your reference number is {!Case.CaseNumber}"). Send from: <code>support@omniservice.com</code>.</li>
        <li class="step-list__item">Add a second entry for Web: <code>Case: Origin equals Web</code> with a different template.</li>
      </ol>

      <h2>Step 4: Web-to-Case</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → Web-to-Case → <strong>Enable Web-to-Case</strong>.</li>
        <li class="step-list__item">Click <strong>Generate Web-to-Case HTML</strong>.</li>
        <li class="step-list__item">Select fields: Name, Email, Subject, Description, Priority.</li>
        <li class="step-list__item">Set Return URL (the page shown after submission): <code>https://omniservice.com/thank-you</code>.</li>
        <li class="step-list__item">Click Generate. Salesforce outputs an HTML form. Give this to your web developer to embed on the support page.</li>
      </ol>

      <h2>Step 5: Thread ID Behavior</h2>
      <div class="callout callout--tip">
        <p class="callout__title">💡 How Thread IDs Work</p>
        <p>When Salesforce sends an auto-reply, it embeds a hidden <strong>Thread ID</strong> (like <code>ref:_00Dxx._500xx:ref</code>) in the email subject and body. When the customer replies to that email, Salesforce reads the Thread ID and adds the reply as an Email Message on the <strong>same Case</strong>, instead of creating a new Case. If a customer forwards the email or strips the Thread ID, a new Case is created.</p>
      </div>
    `},{id:27,title:"EnterpriseSales — Enterprise Territory Management",difficulty:"Expert",category:"Sales Cloud / Architecture",company:"EnterpriseSales Corp",subtitle:"Design complex account assignment rules using Enterprise Territory Management instead of traditional Role Hierarchy.",tags:["Territory Management","Sales Cloud","Account Assignment","Overlays"],description:"EnterpriseSales Corp has matrixed sales teams. Reps sell into specific zip codes, but overlay specialists sell specific products across multiple territories. Standard Role Hierarchy cannot handle this matrix. We implement Enterprise Territory Management.",learnings:["Enable and configure Enterprise Territory Management","Create Territory Models and Territory Hierarchies","Define Account Assignment Rules based on Geography/Industry","Assign Users to Territories with different roles","Compare Role Hierarchy vs Territory Management"],content:`
      <h2>Background</h2>
      <p>Role Hierarchy assigns one owner to an Account. But EnterpriseSales Corp has a "Northeast" territory rep, a "Financial Services" industry specialist, and a "Cloud Product" overlay specialist — all needing access to the same Account based on different criteria. <strong>Territory Management</strong> handles many-to-many sharing.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Enable Territory Management · Step 2 → Create Territory Type · Step 3 → Build the Hierarchy · Step 4 → Account Assignment Rules · Step 5 → Assign Users · Step 6 → Activate the Model</p>
      </div>

      <h2>Step 1: The Territory Model</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Territory Management</p>
        <p>A Territory is a flexible collection of Accounts and Users. Users in a Territory get access to its Accounts, regardless of who owns them. You can run multiple "Models" (e.g., current year vs next year planning) but only one can be <strong>Active</strong>. Think of it as a parallel access system that works alongside — not instead of — the Role Hierarchy.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Territories → Settings → <strong>Enable Enterprise Territory Management</strong>.</li>
        <li class="step-list__item">Create a Territory Model: "FY25 Go To Market". State: Planning.</li>
      </ol>

      <h2>Step 2: Territory Types</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Territory Types</p>
        <p>A <strong>Territory Type</strong> is a label/category applied to territories (e.g., "Geographic", "Named Account", "Overlay"). It helps organize and filter territories. Every territory must have a Type.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Create Territory Types: "Geographic", "Industry", "Product Overlay".</li>
        <li class="step-list__item">Priority: Geographic = 1, Industry = 2, Overlay = 3 (determines assignment order).</li>
      </ol>

      <h2>Step 3: Build the Hierarchy</h2>
      <ol class="step-list">
        <li class="step-list__item">Under the FY25 model, create top-level territories: "North America", "EMEA", "APAC".</li>
        <li class="step-list__item">Under North America, create child territories: "Northeast", "Southeast", "West".</li>
        <li class="step-list__item">Under Northeast, create: "New York Metro" (Type: Geographic), "Financial Services — NE" (Type: Industry).</li>
      </ol>
      <table><thead><tr><th>Territory</th><th>Parent</th><th>Type</th></tr></thead><tbody>
        <tr><td>North America</td><td>(Top Level)</td><td>Geographic</td></tr>
        <tr><td>Northeast</td><td>North America</td><td>Geographic</td></tr>
        <tr><td>New York Metro</td><td>Northeast</td><td>Geographic</td></tr>
        <tr><td>Financial Services — NE</td><td>Northeast</td><td>Industry</td></tr>
        <tr><td>Cloud Product Overlay</td><td>North America</td><td>Product Overlay</td></tr>
      </tbody></table>

      <h2>Step 4: Account Assignment Rules</h2>
      <p>Instead of manually sharing accounts, rules evaluate Account fields and drop them into the right territory.</p>
      <ol class="step-list">
        <li class="step-list__item">On the "New York Metro" territory, click <strong>Assignment Rules</strong> → New.</li>
        <li class="step-list__item">Criteria: <code>Account.BillingState = 'NY'</code> AND <code>Account.AnnualRevenue &lt; 50000000</code> (Commercial segment).</li>
        <li class="step-list__item">On "Financial Services — NE", add rule: <code>Account.Industry = 'Financial Services'</code> AND <code>Account.BillingState IN ('NY','NJ','CT','MA')</code>.</li>
        <li class="step-list__item">Click <strong>Run Assignment Rules</strong>. All matching accounts instantly become accessible to any User assigned to that territory.</li>
      </ol>

      <h2>Step 5: Assign Users to Territories</h2>
      <ol class="step-list">
        <li class="step-list__item">Click on the "New York Metro" territory → <strong>Assigned Users</strong> → Add.</li>
        <li class="step-list__item">Add the field rep (John Smith). Role in Territory: "Territory Rep".</li>
        <li class="step-list__item">On "Cloud Product Overlay" territory, add the product specialist (Sarah Tech). She now sees all Accounts in any child territory of North America.</li>
      </ol>

      <h2>Step 6: Activate the Model</h2>
      <ol class="step-list">
        <li class="step-list__item">Once you are satisfied with the territory structure, change the Model State from "Planning" to <strong>Active</strong>.</li>
        <li class="step-list__item">Only one model can be Active at a time. When you need to reorganize for the next fiscal year, create a new Model in "Planning" state, build it, and then swap it to Active.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Role Hierarchy vs Territory Management</p>
        <p><strong>Role Hierarchy:</strong> 1 owner per record, data access flows upward. Best for simple org structures.<br>
        <strong>Territory Management:</strong> Many-to-many. An Account can be in multiple territories; a User can be in multiple territories. Best for matrixed sales teams, overlays, and complex go-to-market models.</p>
      </div>
    `},{id:28,title:"Agentforce — Einstein Chatbot Setup for Order Tracking",difficulty:"Hard",category:"Agentforce / AI",company:"NextGen Retail",subtitle:"Deploy an Agentforce (Einstein) Bot to deflect Tier 1 support cases by looking up order statuses via Flow.",tags:["Agentforce","Einstein Bots","Chatbots","Flow Integration","Service Cloud"],description:'NextGen Retail gets overwhelmed with "Where is my order?" chats. We build an Agentforce bot to intercept chats, ask for the Order Number, call a Flow to fetch the status, and return the answer — escalating to a human only if needed.',learnings:["Enable Einstein Bots and configure a Bot Builder canvas","Create Dialogs, Variables, and Entities","Connect an Invocable Flow to a Bot Dialog","Configure seamless escalation to Omni-Channel agents"],content:`
      <h2>Background</h2>
      <p>Human agents shouldn't waste time looking up tracking numbers. An <strong>Agentforce Bot</strong> sits in front of the live chat widget, handling repetitive tasks programmatically. When the bot can't resolve the issue, it seamlessly transfers the customer to a live agent with full context.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Enable Einstein Bots · Step 2 → Create Bot Variables & Entities · Step 3 → Build Dialogs · Step 4 → Connect Flow to Dialog · Step 5 → Configure Escalation · Step 6 → Deploy to Chat Channel</p>
      </div>

      <h2>Step 1: Enable Einstein Bots</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → Einstein Bots → <strong>Enable Einstein Bots</strong>.</li>
        <li class="step-list__item">Prerequisite: Live Chat / Messaging must already be configured with a Deployment and a Queue.</li>
        <li class="step-list__item">Setup → Einstein Bots → New Bot. Name: "OrderBot". Description: "Handles order status inquiries."</li>
      </ol>

      <h2>Step 2: Bot Variables & Entities</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Bot Architecture</p>
        <p>A <strong>Dialog</strong> is a conversational state (e.g., "Welcome", "Check Order Status", "Escalate"). An <strong>Entity</strong> is a data type (Text, Number, DateTime, Object — like a picklist for the bot). A <strong>Variable</strong> stores the customer's input so the bot can use it later.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">In Bot Builder, go to <strong>Variables</strong>. Create:</li>
      </ol>
      <table><thead><tr><th>Variable Name</th><th>Type</th><th>Purpose</th></tr></thead><tbody>
        <tr><td><code>var_OrderNumber</code></td><td>Text</td><td>Stores the customer's order number</td></tr>
        <tr><td><code>var_OrderStatus</code></td><td>Text</td><td>Output from Flow (e.g., "Shipped")</td></tr>
        <tr><td><code>var_TrackingURL</code></td><td>Text</td><td>Output: tracking link</td></tr>
        <tr><td><code>var_CustomerName</code></td><td>Text</td><td>Greeting personalization</td></tr>
      </tbody></table>

      <h2>Step 3: Build the Dialogs</h2>
      <ol class="step-list">
        <li class="step-list__item"><strong>Welcome Dialog:</strong> Add a <strong>Message</strong> element: "Hi! I'm OrderBot. I can check your order status or connect you to an agent. What would you like to do?"</li>
        <li class="step-list__item">Add a <strong>Menu</strong> element with options: "Check Order Status" → routes to the Order Status Dialog. "Talk to an Agent" → routes to the Escalation Dialog.</li>
        <li class="step-list__item"><strong>Order Status Dialog:</strong> Add a <strong>Question</strong> element: "What is your order number?" Store the response in <code>var_OrderNumber</code>.</li>
        <li class="step-list__item">Add an <strong>Action</strong> element (Flow) — configured in Step 4.</li>
        <li class="step-list__item">Add a <strong>Message</strong> element: "Your order {!var_OrderNumber} is currently: <strong>{!var_OrderStatus}</strong>."</li>
        <li class="step-list__item">Add another <strong>Menu</strong>: "Was this helpful?" → "Yes" (ends conversation) / "No" (routes to Escalation Dialog).</li>
      </ol>

      <h2>Step 4: Connect Flow to the Bot</h2>
      <p>The Bot needs to query the database. It does this by calling an <strong>Autolaunched Flow</strong>.</p>
      <h3>4a: Create the Autolaunched Flow</h3>
      <ol class="step-list">
        <li class="step-list__item">Flow Builder → New → Autolaunched Flow.</li>
        <li class="step-list__item">Create an <strong>Input Variable</strong>: <code>OrderNumber</code> (Text, Available for Input).</li>
        <li class="step-list__item">Add a <strong>Get Records</strong> element: Get the first Order where <code>OrderNumber = {!OrderNumber}</code>.</li>
        <li class="step-list__item">Add an <strong>Assignment</strong>: Set <code>var_OutputStatus</code> = the Order's Status field.</li>
        <li class="step-list__item">Create <strong>Output Variables</strong>: <code>OrderStatus</code> (Text) and <code>TrackingURL</code> (Text). Mark them "Available for Output".</li>
        <li class="step-list__item">Save and Activate the Flow.</li>
      </ol>
      <h3>4b: Map Flow to Bot Action</h3>
      <ol class="step-list">
        <li class="step-list__item">Back in the Bot Builder, in the Order Status Dialog, click the <strong>Action</strong> element.</li>
        <li class="step-list__item">Action Type: <strong>Flow</strong>. Select your "Order Status Lookup" Flow.</li>
        <li class="step-list__item">Map inputs: Bot's <code>var_OrderNumber</code> → Flow's <code>OrderNumber</code>.</li>
        <li class="step-list__item">Map outputs: Flow's <code>OrderStatus</code> → Bot's <code>var_OrderStatus</code>. Flow's <code>TrackingURL</code> → Bot's <code>var_TrackingURL</code>.</li>
      </ol>

      <h2>Step 5: Configure Escalation (Transfer to Agent)</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Seamless Handoff</p>
        <p>When a bot escalates to a human, it should transfer the <strong>entire chat transcript</strong> so the agent sees the full conversation. Configure the Transfer Target as an Omni-Channel Queue (from Use Case 21). The agent receives the work item with full context.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">In the <strong>Escalation Dialog</strong>, add a <strong>Transfer</strong> element.</li>
        <li class="step-list__item">Transfer Target: Select the "Live Support" Queue (linked to an Omni-Channel Routing Configuration).</li>
        <li class="step-list__item">Add a pre-transfer message: "Let me connect you with a support agent. They'll have our full conversation."</li>
      </ol>

      <h2>Step 6: Deploy</h2>
      <ol class="step-list">
        <li class="step-list__item">In Bot Builder, click <strong>Activate</strong>.</li>
        <li class="step-list__item">Go to your Embedded Service Deployment (Chat) → Bot Settings → Select "OrderBot" as the initial bot.</li>
        <li class="step-list__item">The bot now intercepts all incoming chats. Only when escalation triggers does the chat reach a human agent.</li>
      </ol>
    `},{id:29,title:"FlexiUI — Dynamic Forms & Dynamic Actions",difficulty:"Easy",category:"Lightning App Builder",company:"FlexiUI Config",subtitle:"Modernize Page Layouts using Dynamic Forms to show/hide fields based on record data, eliminating the need for multiple Record Types.",tags:["Dynamic Forms","Dynamic Actions","Lightning App Builder","UI Customization"],description:"FlexiUI has 5 different Record Types on Opportunity just to show different fields for different deal types. This creates massive administrative overhead. We collapse this into a single layout using Dynamic Forms and component visibility filters.",learnings:["Upgrade standard Page Layouts to Dynamic Forms","Apply UI visibility filters to individual fields and sections","Configure Dynamic Actions to show/hide buttons based on criteria","Reduce Record Type and Page Layout sprawl"],content:`
      <h2>Background</h2>
      <p>Historically, if you wanted the "Shipping Address" field to appear ONLY when "Delivery Type" = "Physical", you had to create a new Record Type and a new Page Layout. <strong>Dynamic Forms</strong> moves field layout into the Lightning App Builder, allowing you to show/hide fields dynamically without Record Types.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Upgrade to Dynamic Forms · Step 2 → Set Field Visibility Filters · Step 3 → Organize into Dynamic Sections · Step 4 → Configure Dynamic Actions · Step 5 → Decommission unused Record Types</p>
      </div>

      <h2>Step 1: Upgrade to Dynamic Forms</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Dynamic Forms</p>
        <p>Dynamic Forms breaks the monolithic "Details" component on record pages into individual fields and sections. Each field becomes a separate, draggable component in the Lightning App Builder. You gain the ability to set <strong>Component Visibility</strong> rules on individual fields — something Page Layouts can never do.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Go to an Opportunity record → Gear Icon → <strong>Edit Page</strong> (opens App Builder).</li>
        <li class="step-list__item">Click the "Record Detail" component. In the right panel, click <strong>Upgrade Now</strong> to Dynamic Forms.</li>
        <li class="step-list__item">Select which Page Layout to migrate. Click Next.</li>
        <li class="step-list__item">The monolithic block breaks into individual fields and sections that you can drag around.</li>
      </ol>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Supported Objects</p>
        <p>Dynamic Forms is supported on most custom objects and standard objects including Account, Contact, Opportunity, Case, and Lead. It is NOT supported on Task, Event, Person Account, or Knowledge at this time.</p>
      </div>

      <h2>Step 2: Add Visibility Filters to Fields</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Component Visibility</p>
        <p>Every field, section, and component in the Lightning App Builder has a "Set Component Visibility" section. You can use <strong>record data</strong>, <strong>user data</strong> (Profile, Role), <strong>device type</strong> (desktop/mobile), or <strong>permissions</strong> as filter criteria. Multiple filters support AND/OR logic.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Click the "Shipping Address" field in the App Builder canvas.</li>
        <li class="step-list__item">In the right panel, expand <strong>Set Component Visibility</strong>.</li>
        <li class="step-list__item">Add Filter: <code>Field → Delivery_Type__c → Equal → Physical</code>.</li>
        <li class="step-list__item">Now the Shipping Address field instantly appears/disappears in the UI as the user changes the Delivery Type picklist — no page reload needed.</li>
      </ol>

      <h2>Step 3: Organize into Dynamic Sections</h2>
      <ol class="step-list">
        <li class="step-list__item">From the Components panel, drag a <strong>Field Section</strong> onto the canvas.</li>
        <li class="step-list__item">Name it "Physical Delivery Details". Set it to 2 columns.</li>
        <li class="step-list__item">Drag related fields into it: Shipping Address, Delivery Date, Carrier.</li>
        <li class="step-list__item">Set visibility on the <strong>entire section</strong>: <code>Delivery_Type__c = Physical</code>. Now the whole section appears/disappears together.</li>
        <li class="step-list__item">Create another section "Digital Delivery Details" with fields like Download Link, License Key, visible only when <code>Delivery_Type__c = Digital</code>.</li>
      </ol>
      <table><thead><tr><th>Section Name</th><th>Fields</th><th>Visible When</th></tr></thead><tbody>
        <tr><td>Physical Delivery Details</td><td>Shipping Address, Delivery Date, Carrier</td><td><code>Delivery_Type__c = Physical</code></td></tr>
        <tr><td>Digital Delivery Details</td><td>Download Link, License Key</td><td><code>Delivery_Type__c = Digital</code></td></tr>
        <tr><td>Enterprise Details</td><td>Contract Term, SLA Level, Account Executive</td><td><code>Amount &gt; 100000</code></td></tr>
      </tbody></table>

      <h2>Step 4: Dynamic Actions</h2>
      <p>Similarly, we only want the "Submit for Approval" button to show if the Opportunity Amount > $50,000.</p>
      <ol class="step-list">
        <li class="step-list__item">Click the <strong>Highlights Panel</strong> component (top of the page with the record Name and buttons).</li>
        <li class="step-list__item">Check <strong>Enable Dynamic Actions</strong>.</li>
        <li class="step-list__item">Remove the default "Edit", "Delete" etc. from the Page Layout Actions and manage them here instead.</li>
        <li class="step-list__item">Add the "Submit for Approval" action. Click the filter icon and add a visibility filter: <code>Amount &gt; 50000</code>.</li>
        <li class="step-list__item">Add a "Send Quote" button, visible only when <code>StageName = Proposal/Price Quote</code>.</li>
      </ol>

      <h2>Step 5: Decommission Unused Record Types</h2>
      <ol class="step-list">
        <li class="step-list__item">Now that Dynamic Forms handles field visibility, you likely no longer need separate Record Types like "Physical Opp" and "Digital Opp".</li>
        <li class="step-list__item">Review your Record Types. If the ONLY reason they exist is to show different fields, you can consolidate to a single Record Type.</li>
        <li class="step-list__item">Keep Record Types only if they drive different <strong>picklist values</strong>, <strong>business processes</strong> (Sales Path stages), or <strong>Approval Processes</strong>.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 When to Use Record Types vs Dynamic Forms</p>
        <p><strong>Dynamic Forms:</strong> Show/hide fields based on data. No Record Type needed.<br>
        <strong>Record Types:</strong> Different picklist value sets, different Sales Path stages, different Page Layouts for fundamentally different business processes (e.g., "New Business" vs "Renewal").</p>
      </div>
    `},{id:30,title:"DevOpsPro — CI/CD Setup with Salesforce DX & GitHub Actions",difficulty:"Expert",category:"Architecture / DevOps",company:"DevOpsPro Engineering",subtitle:"Transition from Change Sets to source-driven development using SFDX, scratch orgs, and automated CI/CD pipelines.",tags:["Salesforce DX","CLI","GitHub Actions","Scratch Orgs","Source-Driven Development","CI/CD"],description:"DevOpsPro is tired of manually building Change Sets, fixing overwritten code, and dealing with deployment failures. We transition the team to Source-Driven Development: source of truth moves from the Sandbox to the Git repository, deployed automatically via GitHub Actions.",learnings:["Install and configure Salesforce CLI (SFDX)","Convert metadata format to source format","Create and use Scratch Orgs for isolated development","Write a GitHub Actions YAML workflow for automated testing and deployment","Understand the lifecycle of Source-Driven Development"],content:`
      <h2>Background</h2>
      <p>In traditional Salesforce development, a Sandbox is the source of truth. Developers step on each other's toes, and Change Sets are slow and error-prone. <strong>Salesforce DX (SFDX)</strong> shifts the paradigm: the Git repository is the source of truth. You spin up temporary "Scratch Orgs", build your feature, commit to Git, and a CI/CD pipeline pushes it to production.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → CLI & Project Setup · Step 2 → Scratch Org Configuration · Step 3 → Development Workflow · Step 4 → CI/CD Pipeline · Step 5 → Branching Strategy</p>
      </div>

      <h2>Step 1: CLI and Project Setup</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Source Format</p>
        <p>Older tools (Ant, Change Sets) use "Metadata API format" (massive XML files). SFDX uses "Source format," which breaks large objects into smaller, manageable files (e.g., one file per custom field, one file per validation rule) to prevent Git merge conflicts.</p>
      </div>
      <pre><code># Install Salesforce CLI
npm install -g @salesforce/cli

# Authenticate to the Dev Hub (Production org that governs scratch orgs)
sf org login web -d -a DevHub

# Create a new SFDX project
sf project generate -n DevOpsProApp

# Project structure:
# DevOpsProApp/
#   â”œâ”€â”€ config/
#   â”‚   â””â”€â”€ project-scratch-def.json   â† Scratch Org shape
#   â”œâ”€â”€ force-app/
#   â”‚   â””â”€â”€ main/default/             â† Your source code lives here
#   â””â”€â”€ sfdx-project.json             â† Project config</code></pre>

      <h2>Step 2: Scratch Org Configuration</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Scratch Orgs</p>
        <p>A <strong>Scratch Org</strong> is a disposable, configurable Salesforce org that spins up in seconds. It's like a Docker container for Salesforce. Developers get their own isolated org, build their feature, test it, and throw it away. Scratch orgs expire after 1-30 days.</p>
      </div>
      <pre><code>// config/project-scratch-def.json
{
  "orgName": "DevOpsPro Scratch",
  "edition": "Developer",
  "features": ["EnableSetPasswordInApi", "Communities"],
  "settings": {
    "lightningExperienceSettings": {
      "enableS1DesktopEnabled": true
    },
    "securitySettings": {
      "passwordPolicies": {
        "enableSetPasswordInApi": true
      }
    }
  }
}</code></pre>
      <pre><code># Create a fresh Scratch Org (expires in 7 days)
sf org create scratch -d -f config/project-scratch-def.json -a DevOrg1 --duration-days 7

# Push your source code to the Scratch Org
sf project deploy start --target-org DevOrg1

# Open the Scratch Org in a browser
sf org open --target-org DevOrg1</code></pre>

      <h2>Step 3: Development & Commit</h2>
      <p>A developer builds a new Flow and a Custom Field inside the Scratch Org using the Setup UI. Then they pull the changes down:</p>
      <pre><code># Pull the changes from the Scratch Org to the local file system
sf project retrieve start --target-org DevOrg1

# See what changed (Git diff)
git status
# modified:  force-app/main/default/flows/SLA_Escalation_Flow.flow-meta.xml
# new file:  force-app/main/default/objects/Case/fields/Priority_Score__c.field-meta.xml

# Git commit and push to the remote repository
git add .
git commit -m "Added SLA Flow and Priority field"
git push origin feature/sla-escalation</code></pre>

      <h2>Step 4: CI/CD Pipeline (GitHub Actions)</h2>
      <p>When the developer creates a Pull Request against the 'main' branch, GitHub Actions automatically spins up a test org, deploys the code, runs all Apex tests, and reports back.</p>
      <pre><code># .github/workflows/pr-validation.yml
name: Validate PR
on:
  pull_request:
    branches: [ main ]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install Salesforce CLI
        run: npm install -g @salesforce/cli
      - name: Authenticate to QA Sandbox
        run: |
          echo "\${{ secrets.SFDX_AUTH_URL }}" &gt; authfile
          sf org login sfdx-url -f authfile -a QA
      - name: Run Validation (Check-Only Deploy + Tests)
        run: sf project deploy start -o QA --dry-run --test-level RunLocalTests
      - name: Report Results
        if: failure()
        run: echo "âŒ Deployment validation failed. Check test results."</code></pre>

      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ The Golden Rule</p>
        <p>In a true CI/CD model, <strong>nobody makes changes directly in Production or UAT</strong>. All changes must be made in a Scratch Org (or Dev Sandbox), committed to Git, reviewed via Pull Request, and deployed exclusively by the automated pipeline.</p>
      </div>

      <h2>Step 5: Branching Strategy</h2>
      <table><thead><tr><th>Branch</th><th>Purpose</th><th>Deploys To</th></tr></thead><tbody>
        <tr><td><code>main</code></td><td>Production-ready code</td><td>Production (on merge)</td></tr>
        <tr><td><code>develop</code></td><td>Integration branch</td><td>QA Sandbox (on push)</td></tr>
        <tr><td><code>feature/*</code></td><td>Individual features</td><td>Scratch Org (manual)</td></tr>
        <tr><td><code>hotfix/*</code></td><td>Emergency fixes</td><td>Production (fast-tracked)</td></tr>
      </tbody></table>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Change Sets vs SFDX</p>
        <p><strong>Change Sets:</strong> Manual, error-prone, no version control, cannot roll back, one-way (cannot deploy down).<br>
        <strong>SFDX + CI/CD:</strong> Automated, auditable, version-controlled, rollback = git revert, bi-directional (deploy anywhere).</p>
      </div>
    `},{id:31,title:"BankCore — Advanced Screen Flow: Datatable & Collection Variables",difficulty:"Hard",category:"Flow",company:"BankCore Financial",subtitle:"Build a complex Screen Flow that allows users to select multiple related records from a Datatable and process them in bulk.",tags:["Screen Flow","Datatable","Collection Variables","Loop","Bulkification"],description:"BankCore loan officers need a way to quickly select multiple pending Loan Applications from an Account and approve them all at once. We build a Screen Flow using the Datatable component to handle collection processing.",learnings:["Use the Datatable component in Screen Flows","Pass data using Record Collection Variables","Iterate over collections using the Loop element","Perform DML efficiently with Assignment and Update Records elements"],content:`
      <h2>Background</h2>
      <p>A BankCore Account might have 10 child Loan Application records. The standard UI forces users to click into each one to approve them. We want a single button on the Account: "Bulk Approve Loans" that presents a table of all pending applications, lets the user check boxes next to the ones they want to approve, and updates them all.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Get the Records · Step 2 → Build the Screen with Datatable · Step 3 → Processing Loop (Bulkified) · Step 4 → Add the button to the Account page</p>
      </div>

      <h2>Step 1: Get the Records</h2>
      <ol class="step-list">
        <li class="step-list__item">Create a Screen Flow. Create a variable <code>recordId</code> (Text, Available for Input) to hold the Account ID passed from the record page.</li>
        <li class="step-list__item">Add a <strong>Get Records</strong> element: Object = <code>Loan_Application__c</code>.</li>
        <li class="step-list__item">Filter: <code>Account__c = {!recordId}</code> AND <code>Status__c = Pending</code>.</li>
        <li class="step-list__item">Store: <strong>All records</strong>. This creates an automatic Record Collection Variable (e.g., <code>Get_Pending_Loans</code>).</li>
        <li class="step-list__item">Select fields to store: Name, Amount__c, Request_Date__c, Status__c.</li>
      </ol>

      <h2>Step 2: The Screen and Datatable</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Datatable Component</p>
        <p>The Datatable component takes a Record Collection and displays it as an interactive table. Users can select rows using checkboxes, which outputs a <em>new</em> Record Collection containing only the selected rows. This is the bridge between "showing data" and "acting on selected data."</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Add a <strong>Screen</strong> element. Drag the <strong>Datatable</strong> component onto it.</li>
        <li class="step-list__item">Configure the Data Source: Select the collection from Step 1 (<code>Get_Pending_Loans</code>).</li>
        <li class="step-list__item">Configure Columns:</li>
      </ol>
      <table><thead><tr><th>Column Label</th><th>Field API Name</th><th>Type</th><th>Sortable</th></tr></thead><tbody>
        <tr><td>Application Name</td><td><code>Name</code></td><td>Text</td><td>Yes</td></tr>
        <tr><td>Loan Amount</td><td><code>Amount__c</code></td><td>Currency</td><td>Yes</td></tr>
        <tr><td>Request Date</td><td><code>Request_Date__c</code></td><td>Date</td><td>Yes</td></tr>
        <tr><td>Status</td><td><code>Status__c</code></td><td>Text</td><td>No</td></tr>
      </tbody></table>
      <ol class="step-list" start="4">
        <li class="step-list__item">Selection Mode: <strong>Multiple</strong>. This enables checkboxes on each row.</li>
        <li class="step-list__item">The Datatable auto-creates an output variable containing only the selected rows.</li>
      </ol>

      <h2>Step 3: The Processing Loop (Bulkification)</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ No Pink Inside the Loop!</p>
        <p>Never put an "Update Records" or "Create Records" (pink DML elements) inside a Loop. Each iteration counts as a separate DML operation, and you'll hit the 150 DML limit. Instead: inside the loop, use Assignment to modify records and add them to a new collection. After the loop, perform a single Update on the entire collection.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Add a <strong>Loop</strong> element. Collection Variable: The "Selected Rows" output from the Datatable.</li>
        <li class="step-list__item">Inside the loop, add an <strong>Assignment</strong>: Set <code>{!Current Item}.Status__c</code> = "Approved".</li>
        <li class="step-list__item">Add a second <strong>Assignment</strong>: Add <code>{!Current Item}</code> to a new Record Collection variable: <code>var_LoansToUpdate</code> (Operator: Add).</li>
        <li class="step-list__item">After the loop closes (the "After Last Item" connector), add a single <strong>Update Records</strong> element.</li>
        <li class="step-list__item">Use record collection: <code>var_LoansToUpdate</code>. This updates ALL selected loans in one efficient DML statement.</li>
      </ol>

      <h2>Step 4: Add the Flow to the Account Page</h2>
      <ol class="step-list">
        <li class="step-list__item">Save and Activate the Flow.</li>
        <li class="step-list__item">On the Account Lightning Record Page (App Builder), add a <strong>Flow</strong> component or create an Action that launches this Flow.</li>
        <li class="step-list__item">Pass <code>{!recordId}</code> from the page context to the Flow's input variable.</li>
        <li class="step-list__item">Users now click "Bulk Approve Loans", see a table of pending applications, check the ones to approve, and click Next.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Bulkification Pattern Summary</p>
        <p>1. Get Records → Collection<br>
        2. Screen → User selects from Datatable → Selected Collection<br>
        3. Loop → Modify each record → Add to new Collection<br>
        4. After Loop → Single DML on the new Collection</p>
      </div>
    `},{id:32,title:"DataCrunch — Batch Apex: Processing Millions of Records",difficulty:"Expert",category:"Apex / Async",company:"DataCrunch Analytics",subtitle:"Process massive datasets without hitting governor limits using Batch Apex and Database.Stateful.",tags:["Batch Apex","Database.Batchable","Database.Stateful","Asynchronous Apex","Governor Limits"],description:'DataCrunch needs to recalculate the "Lifetime Value" for all 2 million Accounts in their org every weekend. A standard trigger or anonymous Apex script will crash. We write a Batch Apex class to chunk the processing.',learnings:["Implement the Database.Batchable interface (start, execute, finish)","Use QueryLocators to bypass the 50k SOQL limit","Maintain state across batches using Database.Stateful","Execute batches and monitor them in Setup"],content:`
      <h2>Background</h2>
      <p>Synchronous Apex can only query 50,000 records and process for 10 seconds. When you need to update 2 million Accounts, you must use <strong>Batch Apex</strong>, which breaks the job into chunks of 200 records (configurable) and processes them asynchronously.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Write the Batch Class · Step 2 → Invoke the Batch · Step 3 → Monitor in Setup · Step 4 → Write the Test Class</p>
      </div>

      <h2>Step 1: The Batch Class Structure</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Database.Batchable</p>
        <p>A batch class must implement three methods: <code>start()</code> gathers the massive list of records (up to 50 million via QueryLocator), <code>execute()</code> processes a tiny chunk of them (default 200), and <code>finish()</code> runs once at the very end to send emails or chain jobs. Each <code>execute()</code> call gets its own set of governor limits.</p>
      </div>
      <pre><code>public class AccountLTVBatch implements Database.Batchable&lt;sObject&gt;, Database.Stateful {
    
    // Stateful variables remember their value across the chunks
    // Without Database.Stateful, these would reset to 0 in each execute()
    private Integer totalAccountsProcessed = 0;
    private Integer totalErrors = 0;

    // 1. START: Query up to 50 million records
    public Database.QueryLocator start(Database.BatchableContext bc) {
        // This query bypasses normal 50k SOQL limits
        return Database.getQueryLocator([
            SELECT Id, Lifetime_Value__c, 
            (SELECT Amount FROM Won_Opportunities__r) 
            FROM Account
        ]);
    }

    // 2. EXECUTE: Runs multiple times, processing 'scope' (max 200 records)
    public void execute(Database.BatchableContext bc, List&lt;Account&gt; scope) {
        List&lt;Account&gt; accountsToUpdate = new List&lt;Account&gt;();
        
        for (Account acc : scope) {
            Decimal ltv = 0;
            for (Opportunity opp : acc.Won_Opportunities__r) {
                ltv += opp.Amount;
            }
            if (acc.Lifetime_Value__c != ltv) {
                acc.Lifetime_Value__c = ltv;
                accountsToUpdate.add(acc);
            }
        }
        
        // Use Database.update with false to allow partial success
        Database.SaveResult[] results = Database.update(accountsToUpdate, false);
        
        // Track stats for the finish method (only works with Database.Stateful)
        for (Database.SaveResult sr : results) {
            if (sr.isSuccess()) { totalAccountsProcessed++; }
            else { totalErrors++; }
        }
    }

    // 3. FINISH: Runs once at the end
    public void finish(Database.BatchableContext bc) {
        System.debug('Batch Complete. Processed: ' + totalAccountsProcessed);
        System.debug('Errors: ' + totalErrors);
        
        // Send a summary email to the admin
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new String[]{'admin@datacrunch.com'});
        mail.setSubject('LTV Batch Complete');
        mail.setPlainTextBody('Processed: ' + totalAccountsProcessed + ', Errors: ' + totalErrors);
        Messaging.sendEmail(new Messaging.SingleEmailMessage[]{mail});
    }
}</code></pre>

      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Database.Stateful</p>
        <p>By default, Batch Apex does NOT maintain instance variable values between <code>execute()</code> calls. If you add <code>Database.Stateful</code>, your class variables (like counters) persist across all chunks. <strong>Warning:</strong> This uses more memory, so use it only when you need to aggregate data across batches.</p>
      </div>

      <h2>Step 2: Invoking the Batch</h2>
      <p>To run this manually from the Developer Console, or from another class:</p>
      <pre><code>// Second parameter is the scope size (chunk size). Default is 200.
// Smaller scope = more execute() calls but less memory per call.
Id batchJobId = Database.executeBatch(new AccountLTVBatch(), 200);
System.debug('Batch Job ID: ' + batchJobId);</code></pre>

      <h2>Step 3: Monitoring</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → Apex Jobs to see the batch progress (Batches Processed, Failures).</li>
        <li class="step-list__item">You can query the <code>AsyncApexJob</code> object for programmatic monitoring:</li>
      </ol>
      <pre><code>AsyncApexJob job = [SELECT Status, NumberOfErrors, JobItemsProcessed, 
                          TotalJobItems FROM AsyncApexJob WHERE Id = :batchJobId];
// Status: Queued → Preparing → Processing → Completed</code></pre>

      <h2>Step 4: Test Class</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Testing Batch Apex</p>
        <p>In test classes, <code>Database.executeBatch()</code> runs synchronously when wrapped in <code>Test.startTest()</code> and <code>Test.stopTest()</code>. The <code>execute()</code> method runs exactly once with your test data.</p>
      </div>
      <pre><code>@isTest
static void testAccountLTVBatch() {
    // Create test data
    Account acc = new Account(Name = 'Test Account');
    insert acc;
    Opportunity opp = new Opportunity(Name = 'Test Opp', AccountId = acc.Id, 
                                       Amount = 5000, StageName = 'Closed Won', 
                                       CloseDate = Date.today());
    insert opp;
    
    Test.startTest();
    Database.executeBatch(new AccountLTVBatch());
    Test.stopTest();
    
    // Verify
    Account updated = [SELECT Lifetime_Value__c FROM Account WHERE Id = :acc.Id];
    System.assertEquals(5000, updated.Lifetime_Value__c);
}</code></pre>
    `},{id:33,title:"DataCrunch — Schedulable Apex: Automating the Batch",difficulty:"Medium",category:"Apex / Async",company:"DataCrunch Analytics",subtitle:"Automate Apex execution by implementing the Schedulable interface and using Cron expressions.",tags:["Schedulable Apex","Cron Expression","Automation","System.schedule"],description:"Following the Account LTV recalculation, DataCrunch wants this batch to run automatically every Saturday night at 2:00 AM. We implement Schedulable Apex and schedule it using Cron.",learnings:["Implement the Schedulable interface","Call Batch Apex from within Schedulable Apex","Understand Cron expression syntax in Salesforce","Monitor Scheduled Jobs in Setup"],content:`
      <h2>Background</h2>
      <p>You have a Batch class (from Use Case 32), but someone has to manually click a button to run it. <strong>Schedulable Apex</strong> allows you to put classes on a recurring schedule — like a cron job in Linux.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Write the Schedulable Class · Step 2 → Schedule via Anonymous Apex · Step 3 → Monitor & Manage Jobs</p>
      </div>

      <h2>Step 1: The Schedulable Class</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Schedulable Interface</p>
        <p>A class must implement <code>Schedulable</code> and define an <code>execute(SchedulableContext)</code> method. Inside this method, you instantiate and call your Batch class. The Schedulable class itself is lightweight — it just kicks off other async work.</p>
      </div>
      <pre><code>public class AccountLTVBatchScheduler implements Schedulable {
    
    public void execute(SchedulableContext sc) {
        // Instantiate the batch class from Use Case 32
        AccountLTVBatch batchJob = new AccountLTVBatch();
        
        // Execute the batch with a scope of 200
        Database.executeBatch(batchJob, 200);
    }
}</code></pre>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Governor Limit</p>
        <p>An org can have a maximum of <strong>100 scheduled Apex jobs</strong> at once. If you are approaching this limit, consider using a single dispatcher scheduler that chains multiple batch jobs.</p>
      </div>

      <h2>Step 2: Scheduling the Job via Anonymous Apex</h2>
      <p>While you can schedule jobs via the Setup UI (Setup → Scheduled Jobs → Schedule Apex), doing it via Anonymous Apex allows you to use precise <strong>Cron expressions</strong> and is scriptable.</p>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Salesforce Cron Syntax</p>
        <p>Salesforce Cron has 6-7 fields: <code>Seconds Minutes Hours Day_of_month Month Day_of_week Year(optional)</code>.</p>
      </div>
      <table><thead><tr><th>Expression</th><th>Meaning</th></tr></thead><tbody>
        <tr><td><code>0 0 2 ? * 7</code></td><td>Every Saturday at 2:00 AM</td></tr>
        <tr><td><code>0 0 0 1 * ?</code></td><td>First day of every month at midnight</td></tr>
        <tr><td><code>0 0 13 * * ?</code></td><td>Every day at 1:00 PM</td></tr>
        <tr><td><code>0 30 8 ? * 2-6</code></td><td>Mon-Fri at 8:30 AM</td></tr>
      </tbody></table>
      <pre><code>// Schedule the job
String cronExp = '0 0 2 ? * 7'; // Every Saturday at 2 AM
String jobName = 'Weekly Account LTV Calculation';

System.schedule(jobName, cronExp, new AccountLTVBatchScheduler());
// Returns a CronTrigger ID</code></pre>

      <h2>Step 3: Monitor & Manage Scheduled Jobs</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → Scheduled Jobs → View all scheduled jobs, their next run time, and status.</li>
        <li class="step-list__item">To cancel a scheduled job programmatically:</li>
      </ol>
      <pre><code>// Find and abort the job
CronTrigger ct = [SELECT Id FROM CronTrigger WHERE CronJobDetail.Name = 'Weekly Account LTV Calculation'];
System.abortJob(ct.Id);</code></pre>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Async Apex Comparison</p>
        <p><strong>Future:</strong> Fire-and-forget, simple, limited to primitives. Best for: single callouts, quick DML.<br>
        <strong>Queueable:</strong> Chainable, supports complex types. Best for: multi-step processing.<br>
        <strong>Batch:</strong> Processes millions of records in chunks. Best for: mass updates, data cleanup.<br>
        <strong>Schedulable:</strong> Time-based triggering. Best for: recurring automation.</p>
      </div>
    `},{id:34,title:"BrandCo — Experience Cloud: Custom Customer Portal",difficulty:"Medium",category:"Experience Cloud",company:"BrandCo Consumer Goods",subtitle:"Design a pixel-perfect Customer Service portal using Experience Builder, Branding Sets, and Custom Domains.",tags:["Experience Cloud","Experience Builder","Customer Community","Branding","CMS"],description:"BrandCo wants a B2C customer portal where users can log cases, read Knowledge articles, and view their warranties. It must perfectly match their public website branding.",learnings:["Use the Customer Service template in Experience Cloud","Configure Branding Sets (Colors, Fonts, Logos)","Use the Page Variations and Audiences features","Understand Custom Domains (CNAME mapping)"],content:`
      <h2>Background</h2>
      <p>Unlike Partners (who need complex data access), Customers just need a clean, simple UI to self-serve. We will use the <strong>Customer Service template</strong> and heavily brand it to match BrandCo's identity.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Create the Site · Step 2 → Brand with Theme Panel · Step 3 → Configure Pages & Navigation · Step 4 → Audiences & Page Variations · Step 5 → Custom Domain · Step 6 → Self-Registration & Login</p>
      </div>

      <h2>Step 1: Create the Customer Site</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → All Sites → New. Choose the <strong>Customer Service</strong> template.</li>
        <li class="step-list__item">Name: "BrandCo Support Portal". URL suffix: <code>/support</code>.</li>
        <li class="step-list__item">Click Create.</li>
      </ol>

      <h2>Step 2: The Experience Builder (Branding)</h2>
      <ol class="step-list">
        <li class="step-list__item">Go to All Sites → Workspace → <strong>Builder</strong>.</li>
        <li class="step-list__item">Click the <strong>Theme</strong> icon (paintbrush). Go to Colors.</li>
        <li class="step-list__item">Set the Action Color to BrandCo's hex code: <code>#FF5722</code>.</li>
        <li class="step-list__item">Set the Navigation Color to <code>#333333</code>.</li>
        <li class="step-list__item">Upload the Company Logo. This updates the header across the entire portal.</li>
        <li class="step-list__item">Under Fonts, select a Google Font that matches the brand (e.g., "Poppins").</li>
      </ol>
      <table><thead><tr><th>Branding Element</th><th>Value</th><th>Applied To</th></tr></thead><tbody>
        <tr><td>Action Color</td><td><code>#FF5722</code></td><td>Buttons, links, active states</td></tr>
        <tr><td>Navigation Color</td><td><code>#333333</code></td><td>Top navigation bar</td></tr>
        <tr><td>Logo</td><td>brandco-logo.png</td><td>Site header</td></tr>
        <tr><td>Font Family</td><td>Poppins</td><td>All text on the site</td></tr>
      </tbody></table>

      <h2>Step 3: Configure Pages & Navigation</h2>
      <ol class="step-list">
        <li class="step-list__item">In the Builder, navigate to the <strong>Home Page</strong>. Add components: "Search", "Topic Catalog" (for Knowledge categories), and a "Tile Menu" linking to "My Cases", "Submit a Case", "FAQ".</li>
        <li class="step-list__item">Go to the <strong>Case Detail</strong> page. Ensure the Case Feed component is visible so customers can add comments.</li>
        <li class="step-list__item">Edit the Navigation Menu (Settings → Navigation): Add "Home", "My Cases", "Knowledge", "Contact Us".</li>
      </ol>

      <h2>Step 4: Audiences & Page Variations</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Personalization with Audiences</p>
        <p>An <strong>Audience</strong> is a segment of users (e.g., "VIP Customers", "Customers in California"). You can create multiple versions of a page (Page Variations) and assign them to specific Audiences. A VIP sees a different homepage than a standard user.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Click the Gear icon at the top of the builder → Page Properties → Page Variations.</li>
        <li class="step-list__item">Duplicate the Home page. Call it "VIP Home".</li>
        <li class="step-list__item">Edit the VIP Home to include a "Priority Support" component and a direct phone number banner.</li>
        <li class="step-list__item">Go to Settings → Audiences. Create an Audience where <code>User.Profile = VIP Customer Community User</code>.</li>
        <li class="step-list__item">Assign this audience to the VIP Home variation.</li>
      </ol>

      <h2>Step 5: Custom Domains</h2>
      <p>You don't want customers going to <code>brandco.my.site.com</code>. You want them at <code>support.brandco.com</code>.</p>
      <ol class="step-list">
        <li class="step-list__item">In Salesforce Setup, go to <strong>Domains</strong>. Add <code>support.brandco.com</code>.</li>
        <li class="step-list__item">Have your IT team create a <strong>CNAME</strong> DNS record: <code>support.brandco.com → brandco.my.site.com</code>.</li>
        <li class="step-list__item">Go to Custom URLs in Setup and map the new domain to your Experience Cloud Site.</li>
        <li class="step-list__item">Configure an SSL certificate (Salesforce provides free certificates for Experience Cloud custom domains).</li>
      </ol>

      <h2>Step 6: Self-Registration & Login</h2>
      <ol class="step-list">
        <li class="step-list__item">In the site's Administration → Login & Registration, enable <strong>Allow External Users to Self-Register</strong>.</li>
        <li class="step-list__item">Choose the default Profile and Account for self-registered users.</li>
        <li class="step-list__item">Optionally enable Social Sign-On (Google, Facebook, Apple) under Authentication Providers.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Customer Community vs Partner Community</p>
        <p><strong>Customer Community:</strong> High volume (millions of users), no roles, simpler sharing (Sharing Sets). Best for B2C self-service.<br>
        <strong>Partner Community:</strong> Lower volume (hundreds/thousands), has roles, complex sharing. Best for B2B channel partner collaboration.</p>
      </div>
    `},{id:35,title:"VisDash — LWC: Integrating Third-Party JS (Chart.js)",difficulty:"Expert",category:"LWC / Advanced",company:"VisDash Analytics",subtitle:"Upload a third-party JavaScript library as a Static Resource and load it into a Lightning Web Component.",tags:["LWC","Static Resources","loadScript","Chart.js","DOM Manipulation"],description:"VisDash needs a beautiful, animated donut chart on their home page showing sales by region. Standard dashboards are too rigid. We build an LWC that imports Chart.js from a Static Resource and renders a custom chart.",learnings:["Upload third-party libraries as Static Resources","Use lightning/platformResourceLoader (loadScript / loadStyle)",'Manage standard HTML elements in LWC with lwc:dom="manual"',"Ensure script loading timing with connectedCallback/renderedCallback"],content:`
      <h2>Background</h2>
      <p>Salesforce's base components don't include complex charting libraries. To use something like Chart.js or D3.js, you must bypass LockerService/Lightning Web Security restrictions by loading the script as a Static Resource.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Upload Static Resource · Step 2 → Create the HTML Template · Step 3 → Write the JS Controller · Step 4 → Connect to Apex for Real Data · Step 5 → Deploy</p>
      </div>

      <h2>Step 1: Upload the Static Resource</h2>
      <ol class="step-list">
        <li class="step-list__item">Download the <code>chart.min.js</code> file from the Chart.js website (or npm).</li>
        <li class="step-list__item">Salesforce Setup → Static Resources → New.</li>
        <li class="step-list__item">Name: <code>ChartJS</code>. Cache Control: <strong>Public</strong>. Upload the file.</li>
      </ol>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Naming Convention</p>
        <p>Static Resource names must be alphanumeric with underscores. No hyphens, no dots. Use <code>ChartJS</code>, not <code>chart.js</code>. In LWC, you reference it via <code>@salesforce/resourceUrl/ChartJS</code>.</p>
      </div>

      <h2>Step 2: The HTML Template</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — lwc:dom="manual"</p>
        <p>LWC tightly controls the DOM (Shadow DOM). If a 3rd-party script needs to inject elements or modify the DOM directly (like Chart.js drawing on a canvas), you MUST add <code>lwc:dom="manual"</code> to the container element. This tells LWC: "Back off, I am letting another script modify this element."</p>
      </div>
      <pre><code>&lt;!-- salesChart.html --&gt;
&lt;template&gt;
    &lt;lightning-card title="Sales by Region" icon-name="utility:chart"&gt;
        &lt;div class="chart-container slds-p-around_medium"&gt;
            &lt;!-- Chart.js will draw on this canvas --&gt;
            &lt;canvas class="donut-chart" lwc:dom="manual"&gt;&lt;/canvas&gt;
        &lt;/div&gt;
    &lt;/lightning-card&gt;
&lt;/template&gt;</code></pre>

      <h2>Step 3: The JavaScript Controller</h2>
      <pre><code>// salesChart.js
import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import CHART_JS from '@salesforce/resourceUrl/ChartJS';

export default class SalesChart extends LightningElement {
    chartInitialized = false;
    error;

    // renderedCallback runs after the component renders on screen
    renderedCallback() {
        if (this.chartInitialized) {
            return; // Prevent loading the script multiple times
        }
        this.chartInitialized = true;

        // Load the static resource script asynchronously
        loadScript(this, CHART_JS)
            .then(() =&gt; {
                this.initializeChart();
            })
            .catch(error =&gt; {
                this.error = error;
                console.error('Error loading Chart.js', error);
            });
    }

    initializeChart() {
        // Query the DOM element manually
        const canvas = this.template.querySelector('canvas.donut-chart');
        const ctx = canvas.getContext('2d');

        // Use global window.Chart object provided by the library
        new window.Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['North', 'South', 'East', 'West'],
                datasets: [{
                    data: [300, 50, 100, 40],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
}</code></pre>

      <h2>Step 4: Connect to Real Apex Data</h2>
      <p>Replace the hardcoded data with a @wire call to an Apex method:</p>
      <pre><code>import getSalesByRegion from '@salesforce/apex/DashboardController.getSalesByRegion';

@wire(getSalesByRegion)
wiredSales({ data, error }) {
    if (data) {
        this.salesData = data; // [{region: 'North', total: 300}, ...]
        if (this.chartInitialized) {
            this.initializeChart(); // Re-render with real data
        }
    }
}</code></pre>

      <div class="callout callout--tip">
        <p class="callout__title">💡 renderedCallback vs connectedCallback</p>
        <p><strong>connectedCallback:</strong> Fires when the component is inserted into the DOM. The template is NOT yet rendered — you cannot query DOM elements.<br>
        <strong>renderedCallback:</strong> Fires after every render cycle. The DOM exists. This is where you should load scripts that need to manipulate DOM elements. Always use a flag (<code>chartInitialized</code>) to prevent re-loading.</p>
      </div>
    `},{id:36,title:"SecureBank — Salesforce Shield: Encryption & Audit",difficulty:"Expert",category:"Security / Compliance",company:"SecureBank",subtitle:"Comply with financial regulations by implementing Platform Encryption and tracking field history for 10 years.",tags:["Salesforce Shield","Platform Encryption","Field Audit Trail","Compliance","Security"],description:"SecureBank is under regulatory pressure. Standard Field History Tracking (18 months) is insufficient, and they must encrypt SSNs and Account Numbers at rest. We implement Salesforce Shield.",learnings:["Understand the 3 components of Shield (Encryption, Audit Trail, Event Monitoring)","Generate tenant secrets and encrypt custom/standard fields","Configure Field Audit Trail retention policies via API","Understand the limitations of encrypted fields (e.g., SOQL sorting)"],content:`
      <h2>Background</h2>
      <p>Salesforce encrypts all data in transit via HTTPS. But "Data at Rest" (in the database servers) requires <strong>Salesforce Shield Platform Encryption</strong>. Furthermore, standard history tracking deletes data after 18 months; regulations require 10 years. We need <strong>Shield Field Audit Trail</strong>.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Understand the 3 Shield Components · Step 2 → Platform Encryption Setup · Step 3 → Encrypt Fields · Step 4 → Field Audit Trail · Step 5 → Event Monitoring</p>
      </div>

      <h2>Step 1: Salesforce Shield Components</h2>
      <table><thead><tr><th>Component</th><th>Purpose</th><th>Key Feature</th></tr></thead><tbody>
        <tr><td>Platform Encryption</td><td>Encrypt data at rest</td><td>Tenant-controlled encryption keys</td></tr>
        <tr><td>Field Audit Trail</td><td>Track field changes for 10 years</td><td>Extends standard 18-month history</td></tr>
        <tr><td>Event Monitoring</td><td>Track user behavior</td><td>Login forensics, API usage, data exports</td></tr>
      </tbody></table>

      <h2>Step 2: Platform Encryption Setup</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Encryption Limitations</p>
        <p>Encrypting a field breaks certain database functions. You cannot use <code>ORDER BY</code> on an encrypted field in SOQL. You cannot use it in formula fields or <code>LIKE</code> filters. Deterministic encryption allows exact-match <code>WHERE</code> filters but is slightly less secure. <strong>Always encrypt ONLY what is absolutely legally required.</strong></p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Platform Encryption → <strong>Key Management</strong>.</li>
        <li class="step-list__item">Click <strong>Generate Tenant Secret</strong>. This combines with the Salesforce Master Secret to create your unique encryption keys.</li>
        <li class="step-list__item">The Tenant Secret never leaves Salesforce. You can <strong>archive</strong> and <strong>destroy</strong> old secrets for key rotation.</li>
      </ol>

      <h2>Step 3: Encrypt Specific Fields</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → Encryption Policy → <strong>Encrypt Fields</strong>.</li>
        <li class="step-list__item">Select the "SSN__c" custom field on Contact.</li>
        <li class="step-list__item">Choose encryption scheme:</li>
      </ol>
      <table><thead><tr><th>Scheme</th><th>Searchable?</th><th>Security Level</th><th>Best For</th></tr></thead><tbody>
        <tr><td>Deterministic</td><td>Exact match (=)</td><td>High</td><td>Fields you need to search by (e.g., SSN lookup)</td></tr>
        <tr><td>Probabilistic</td><td>No</td><td>Highest</td><td>Fields you only display (e.g., bank account numbers)</td></tr>
      </tbody></table>
      <ol class="step-list" start="4">
        <li class="step-list__item">Encrypt the "Account_Number__c" field using <strong>Probabilistic</strong> (never searched, only displayed).</li>
        <li class="step-list__item">Click Save. Salesforce begins background encryption of existing data.</li>
      </ol>

      <h2>Step 4: Field Audit Trail (FAT)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Big Objects</p>
        <p>Field Audit Trail moves history data off standard objects and into <strong>Big Objects</strong> (massive, immutable data stores) after 18 months, keeping it available for up to 10 years. You query this data using standard SOQL on the <code>FieldHistoryArchive</code> object.</p>
      </div>
      <p>To configure FAT, you must deploy a Metadata API package. There is no Setup UI for retention policies.</p>
      <pre><code>&lt;!-- Account.historyRetentionPolicy --&gt;
&lt;HistoryRetentionPolicy&gt;
    &lt;archiveAfterMonths&gt;18&lt;/archiveAfterMonths&gt;
    &lt;archiveRetentionYears&gt;10&lt;/archiveRetentionYears&gt;
    &lt;description&gt;Bank Policy for Account History&lt;/description&gt;
&lt;/HistoryRetentionPolicy&gt;</code></pre>
      <ol class="step-list">
        <li class="step-list__item">Deploy this XML via the Metadata API or SFDX.</li>
        <li class="step-list__item">To query archived history:</li>
      </ol>
      <pre><code>SELECT ParentId, FieldName, OldValue, NewValue, CreatedDate 
FROM FieldHistoryArchive 
WHERE ParentId = '001xx...' AND FieldName = 'SSN__c'</code></pre>

      <h2>Step 5: Event Monitoring</h2>
      <ol class="step-list">
        <li class="step-list__item">Event Monitoring tracks user actions: Login History, API calls, Report Exports, Lightning page views.</li>
        <li class="step-list__item">Data is stored in <strong>EventLogFile</strong> objects (downloadable CSVs).</li>
        <li class="step-list__item">With <strong>Real-Time Event Monitoring</strong> (premium add-on), you can create Transaction Security Policies: e.g., "If any user exports more than 500 records from a report, block the action and alert the admin."</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Shield Pricing</p>
        <p>Salesforce Shield is a paid add-on (typically 30% of your Salesforce license cost). It includes all three components. Many regulated industries (Financial Services, Healthcare) require it for compliance.</p>
      </div>
    `},{id:37,title:"MarketGen — Marketing Cloud Account Engagement (Pardot)",difficulty:"Medium",category:"Sales Cloud / Marketing",company:"MarketGen B2B",subtitle:"Connect Salesforce to MCAE (Pardot) to sync Leads, track website visitors, and score prospects.",tags:["MCAE","Pardot","Lead Scoring","B2B Marketing","Connector"],description:"MarketGen does B2B sales. They need to track which pages a Lead visits on their website and score them. When the score hits 100, the Lead should be assigned to a Sales Rep in Salesforce.",learnings:["Install and configure the Salesforce-Pardot Connector","Understand Prospect syncing logic (Email address as identifier)","Add Pardot tracking code to a website","Map custom fields between Pardot and Salesforce","Use Pardot Engagement Studio for basic routing"],content:`
      <h2>Background</h2>
      <p><strong>Marketing Cloud Account Engagement (formerly Pardot)</strong> is Salesforce's B2B marketing automation tool. It tracks prospects via cookies. When a prospect fills out a form, Pardot syncs them to Salesforce as a Lead or Contact.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Install the Connector · Step 2 → Field Mapping · Step 3 → Tracking Code · Step 4 → Scoring Model · Step 5 → Automation Rules · Step 6 → Engagement Studio</p>
      </div>

      <h2>Step 1: The Connector Setup</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Syncing Direction</p>
        <p>By default, if a record exists in both systems and a field conflicts, you must define the "Sync Behavior". Usually, <strong>Salesforce is the master for CRM data</strong> (Name, Phone), and <strong>Pardot is the master for marketing data</strong> (Score, Grade). For some fields, "Most Recently Updated" wins.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">In Salesforce Setup, install the MCAE package (if not already provisioned).</li>
        <li class="step-list__item">Assign the <strong>B2BMA Integration User</strong> permission set to the dedicated integration user.</li>
        <li class="step-list__item">Assign the <strong>Sales User</strong> and <strong>CRM User</strong> permission sets to all reps who need to see Pardot data.</li>
        <li class="step-list__item">In Pardot Settings → Connectors, verify the Salesforce connector shows "Verified".</li>
      </ol>

      <h2>Step 2: Field Mapping</h2>
      <ol class="step-list">
        <li class="step-list__item">In Pardot, go to Admin → Configure Fields.</li>
        <li class="step-list__item">Map each Pardot default field to the corresponding Salesforce field.</li>
        <li class="step-list__item">For custom fields, click "Add Custom Field" and map it to the Salesforce custom field API name.</li>
      </ol>
      <table><thead><tr><th>Pardot Field</th><th>Salesforce Field</th><th>Sync Behavior</th></tr></thead><tbody>
        <tr><td>First Name</td><td>FirstName</td><td>Salesforce wins</td></tr>
        <tr><td>Email</td><td>Email</td><td>Pardot wins (marketing collects it first)</td></tr>
        <tr><td>Company</td><td>Company</td><td>Salesforce wins</td></tr>
        <tr><td>Score</td><td><code>Pardot_Score__c</code></td><td>Pardot wins (always)</td></tr>
        <tr><td>Grade</td><td><code>Pardot_Grade__c</code></td><td>Pardot wins</td></tr>
      </tbody></table>

      <h2>Step 3: Tracking Code</h2>
      <ol class="step-list">
        <li class="step-list__item">In Pardot, go to Admin → Domain Management → Add your website domain: <code>www.marketgen.com</code>.</li>
        <li class="step-list__item">Go to Marketing → Campaigns → Default Campaign → Tracking Code.</li>
        <li class="step-list__item">Copy the JavaScript snippet. Give it to your web developer to paste before <code>&lt;/body&gt;</code> on every page.</li>
        <li class="step-list__item">Once installed, Pardot tracks anonymous visitors. When they fill out a form, Pardot links their entire browsing history to the new Prospect record.</li>
      </ol>

      <h2>Step 4: Scoring & Grading</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Score vs Grade</p>
        <p><strong>Score</strong> measures <em>engagement</em> — behavioral actions (visited pricing page = +10, clicked email = +5, downloaded whitepaper = +20). Score is a number.<br>
        <strong>Grade</strong> measures <em>fit</em> — demographic attributes (VP of Sales = A+, Intern = D). Grade is a letter.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">In Pardot, go to Admin → Automation Settings → Scoring Rules.</li>
        <li class="step-list__item">Configure: Page View = +1, Form Submission = +15, Email Click = +5, Pricing Page View = +10.</li>
        <li class="step-list__item">For Grading: Admin → Profile → Create criteria: Industry = "Technology" → Grade A. Job Title contains "VP" → Grade adjustment +1/3.</li>
      </ol>

      <h2>Step 5: Automation Rules (Score Threshold)</h2>
      <ol class="step-list">
        <li class="step-list__item">In Pardot, create an <strong>Automation Rule</strong>.</li>
        <li class="step-list__item">Rule Criteria: <code>Prospect Score is greater than 100</code>.</li>
        <li class="step-list__item">Rule Action: <code>Assign to Salesforce Queue: Sales Inbound</code>.</li>
        <li class="step-list__item">When triggered, Pardot pushes the Prospect to Salesforce as a Lead, and the Sales Rep gets a notification.</li>
      </ol>

      <h2>Step 6: Engagement Studio</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Engagement Studio</p>
        <p>Engagement Studio is Pardot's visual automation builder (like Flow Builder but for marketing). You design drip campaigns: send Email 1 → wait 3 days → did they open it? → Yes: send Email 2 → No: send reminder. It is the most powerful marketing automation tool in Pardot.</p>
      </div>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Key Identifier</p>
        <p>Pardot identifies prospects by <strong>email address</strong>, not by Salesforce ID. If two Salesforce Leads have the same email, they map to a single Pardot Prospect. This is a common source of confusion during implementation.</p>
      </div>
    `},{id:38,title:"SolveIt — Service Cloud: Knowledge Base & Article Types",difficulty:"Medium",category:"Service Cloud",company:"SolveIt Tech",subtitle:"Implement Salesforce Knowledge to allow support agents to create, review, and attach articles to cases.",tags:["Salesforce Knowledge","Article Record Types","Data Categories","Service Console"],description:"SolveIt Tech agents are typing the same troubleshooting steps over and over. We implement Salesforce Knowledge, create Article templates (Record Types), and set up Data Categories for organization.",learnings:["Enable Salesforce Knowledge and assign Knowledge User licenses","Create Article Record Types (e.g., FAQ, Tutorial)","Configure Data Category Groups for search navigation","Add the Knowledge Component to the Service Console"],content:`
      <h2>Background</h2>
      <p><strong>Salesforce Knowledge</strong> is a repository of articles. Agents use it to resolve cases quickly, and articles can be published externally to Experience Cloud sites so customers can self-serve.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Enable Knowledge · Step 2 → Article Record Types & Fields · Step 3 → Data Categories · Step 4 → Article Lifecycle (Draft → Published) · Step 5 → Service Console Integration · Step 6 → External Publishing</p>
      </div>

      <h2>Step 1: Enable & Structure Knowledge</h2>
      <ol class="step-list">
        <li class="step-list__item">Ensure your User record has the <strong>Knowledge User</strong> checkbox checked (requires a feature license).</li>
        <li class="step-list__item">Setup → Knowledge Settings → <strong>Enable Lightning Knowledge</strong>.</li>
        <li class="step-list__item">Enable the "Allow users to create and edit articles" permission on the Support Agent profile.</li>
      </ol>

      <h2>Step 2: Article Record Types & Custom Fields</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Article Record Types</p>
        <p>Unlike standard objects, Knowledge Articles use Record Types to define different <strong>templates</strong>. An "FAQ" article has a Question and Answer field. A "Troubleshooting Guide" has Symptoms, Root Cause, and Resolution. Each Record Type has its own Page Layout.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Go to Object Manager → Knowledge → Record Types → New.</li>
        <li class="step-list__item">Create Record Type: "FAQ". Create another: "Troubleshooting Guide".</li>
        <li class="step-list__item">Create custom Rich Text fields and assign them to the appropriate Record Type Page Layouts:</li>
      </ol>
      <table><thead><tr><th>Record Type</th><th>Custom Fields</th><th>Field Type</th></tr></thead><tbody>
        <tr><td>FAQ</td><td>Question, Answer</td><td>Rich Text Area</td></tr>
        <tr><td>Troubleshooting Guide</td><td>Symptoms, Root Cause, Resolution</td><td>Rich Text Area</td></tr>
      </tbody></table>

      <h2>Step 3: Data Categories</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Data Categories</p>
        <p>Unlike normal picklists, <strong>Data Categories</strong> are hierarchical (Hardware > Printers > Inkjet). They drive the search engine, allowing users to filter articles by category. They also control security — you can restrict access to certain categories based on User Profiles or Roles.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Data Category Setup → New Category Group. Name: "Products".</li>
        <li class="step-list__item">Add top-level categories: Software, Hardware, Network.</li>
        <li class="step-list__item">Add child categories: Hardware → Printers, Monitors, Keyboards.</li>
        <li class="step-list__item">Activate the group. When authors create articles, they tag them with these categories.</li>
      </ol>
      <table><thead><tr><th>Category Group</th><th>Top Level</th><th>Children</th></tr></thead><tbody>
        <tr><td>Products</td><td>Software</td><td>CRM, ERP, Analytics</td></tr>
        <tr><td>Products</td><td>Hardware</td><td>Printers, Monitors, Keyboards</td></tr>
        <tr><td>Products</td><td>Network</td><td>VPN, Firewall, WiFi</td></tr>
      </tbody></table>

      <h2>Step 4: Article Lifecycle</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Article Versioning</p>
        <p>Articles go through a lifecycle: <strong>Draft</strong> → <strong>Published</strong> → <strong>Archived</strong>. When you edit a published article, Salesforce creates a new draft version while the old version remains live. You can also set articles to auto-archive after a certain date.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">An agent writes a new article and saves it as a Draft.</li>
        <li class="step-list__item">An article manager reviews and clicks <strong>Publish</strong>.</li>
        <li class="step-list__item">Choose visibility channels: <strong>Internal App</strong> (agents only), <strong>Partner</strong> (partner portal), <strong>Customer</strong> (customer portal), or <strong>Public Knowledge Base</strong>.</li>
        <li class="step-list__item">If an article becomes outdated, archive it. It's hidden from search but still available for audit.</li>
      </ol>

      <h2>Step 5: Service Console Integration</h2>
      <ol class="step-list">
        <li class="step-list__item">Open the Service Console. Edit the Case Page Layout (Lightning App Builder).</li>
        <li class="step-list__item">Drag the <strong>Knowledge</strong> standard component onto the right sidebar.</li>
        <li class="step-list__item">Now, when an agent opens a Case, Salesforce automatically searches Knowledge based on the Case Subject and suggests relevant articles!</li>
        <li class="step-list__item">The agent can click an article to read it, then click <strong>Attach to Case</strong> to link the article to the Case for reporting.</li>
      </ol>

      <h2>Step 6: External Publishing</h2>
      <ol class="step-list">
        <li class="step-list__item">If you have an Experience Cloud site (Use Case 34), articles published with "Customer" channel visibility automatically appear in the site's Knowledge search.</li>
        <li class="step-list__item">Customers can search, filter by Data Category, and read articles — reducing Case volume by up to 30%.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Case Deflection Metric</p>
        <p>Track the "Case Deflection Rate" — the percentage of customers who searched Knowledge and did NOT submit a case. This is a key KPI for measuring the ROI of your Knowledge Base.</p>
      </div>
    `},{id:39,title:"CloudHealth — Health Cloud: Patient Modeling & Care Plans",difficulty:"Expert",category:"Industry Clouds / Architecture",company:"CloudHealth Network",subtitle:"Configure the Health Cloud data model to manage Patients as Person Accounts and build Care Plans with goals and tasks.",tags:["Health Cloud","Person Accounts","Care Plans","Care Team","Industry Clouds"],description:"CloudHealth needs to track patients, their doctors, family members, and specialized care programs. Standard Account/Contact models do not fit. We implement the Health Cloud data model, utilizing Person Accounts and Care Plans.",learnings:["Enable and configure Person Accounts","Understand the Health Cloud Patient Data Model","Set up Care Plans (Case object) and Care Teams","Use the Health Cloud Console to view the Patient Card"],content:`
      <h2>Background</h2>
      <p>Standard Salesforce uses B2B models (Accounts = Companies, Contacts = People). Healthcare is B2C/B2B hybrid. <strong>Health Cloud</strong> uses <strong>Person Accounts</strong> to represent Patients, combining Account and Contact fields into a single record. It also extends standard objects (Cases become Care Plans).</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Enable Person Accounts · Step 2 → Configure Patient Record Types · Step 3 → Build a Care Plan · Step 4 → Add the Care Team · Step 5 → Customize the Patient Card</p>
      </div>

      <h2>Step 1: Enable Person Accounts</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Irreversible Action</p>
        <p>Enabling Person Accounts cannot be undone. It fundamentally changes the org's data model. Always test this heavily in a sandbox.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Log a ticket with Salesforce Support to enable Person Accounts (or enable it directly in Setup if available in newer orgs).</li>
        <li class="step-list__item">Salesforce creates a new Record Type on Account called "Person Account".</li>
        <li class="step-list__item">When creating a Person Account, the user fills out First Name and Last Name (like a Contact) instead of Account Name.</li>
      </ol>

      <h2>Step 2: The Patient Data Model</h2>
      <p>Health Cloud requires mapping standard objects to its specific architecture.</p>
      <ol class="step-list">
        <li class="step-list__item">Setup → Custom Metadata Types → <strong>Individual Record Type Mapper</strong>.</li>
        <li class="step-list__item">Map the Account "Person Account" record type to the "Patient" role. This tells Health Cloud: "Treat these records as Patients."</li>
        <li class="step-list__item">Assign the "Health Cloud Standard" and "Health Cloud Foundation" permission sets to users.</li>
      </ol>

      <h2>Step 3: Build a Care Plan</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Care Plans</p>
        <p>A <strong>Care Plan</strong> in Health Cloud is actually just a <code>Case</code> record with a specific Record Type ("CarePlan"). It acts as the hub. Under the Care Plan, you have <strong>Problems</strong> (custom object), <strong>Goals</strong> (custom object), and <strong>Tasks</strong> (standard activities) designed to resolve the problems.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Go to the Health Cloud Console. Open a Patient record.</li>
        <li class="step-list__item">Click <strong>New Care Plan</strong>. Name it "Diabetes Management".</li>
        <li class="step-list__item">Add a Problem: "High Blood Sugar".</li>
        <li class="step-list__item">Add a Goal under the Problem: "Maintain A1C below 7%".</li>
        <li class="step-list__item">Add Tasks under the Goal: "Schedule follow-up lab work" (assigned to patient), "Review lab results" (assigned to physician).</li>
      </ol>

      <h2>Step 4: The Care Team</h2>
      <p>Patients don't heal alone. The Care Team tracks everyone involved.</p>
      <ol class="step-list">
        <li class="step-list__item">On the Care Plan, go to the <strong>Care Team</strong> tab.</li>
        <li class="step-list__item">Add Internal Users: e.g., Sarah (Primary Care Physician), John (Care Coordinator).</li>
        <li class="step-list__item">Add External Contacts: e.g., Mary (Patient's daughter/emergency contact), Dr. Smith (External Cardiologist).</li>
        <li class="step-list__item">Specify roles for each member. This visualizes the patient's support network.</li>
      </ol>

      <h2>Step 5: Customize the Patient Card</h2>
      <ol class="step-list">
        <li class="step-list__item">The Patient Card is the top highlight panel in Health Cloud. It's driven by Field Sets.</li>
        <li class="step-list__item">Setup → Object Manager → Account → Field Sets.</li>
        <li class="step-list__item">Edit the <strong>HcPatientCard</strong> field set.</li>
        <li class="step-list__item">Add fields: Date of Birth, Gender, Medical Record Number (MRN), Blood Type.</li>
        <li class="step-list__item">Refresh the console. The Patient Card now displays these critical data points prominently at the top of the screen.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Health Cloud EHR Integration</p>
        <p>Health Cloud is not an Electronic Health Record (EHR) system (like Epic or Cerner). It is an engagement layer. Clinical data (allergies, medications) is typically synced from the EHR into Health Cloud via integration platforms (MuleSoft) using FHIR standards.</p>
      </div>
    `},{id:40,title:"NonProfitOrg — NPSP: Households & Recurring Donations",difficulty:"Medium",category:"Industry Clouds / NPSP",company:"Global Charity",subtitle:"Manage donor families and subscription-based giving using the Non-Profit Success Pack (NPSP).",tags:["NPSP","Household Model","Donations","Opportunities","Rollups"],description:"Global Charity tracks donors as individual Contacts but needs to see total household giving to invite wealthy families to galas. They also need to automatically process $50/month recurring donations. We implement NPSP Household models and Recurring Donations.",learnings:["Understand the NPSP Household Account Model","Manage Household members and automatic naming conventions","Configure Recurring Donations to auto-generate Opportunities","Utilize Customizable Rollups for donor giving history"],content:`
      <h2>Background</h2>
      <p>The <strong>Nonprofit Success Pack (NPSP)</strong> transforms standard Salesforce into a fundraising machine. Instead of B2B accounts, NPSP uses the <strong>Household Model</strong>: Contacts (donors) belong to Household Accounts. Opportunities represent Donations.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Understand the Household Model · Step 2 → Manage Household Names · Step 3 → Create a Recurring Donation · Step 4 → Review NPSP Rollups</p>
      </div>

      <h2>Step 1: The Household Account Model</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Auto-Account Creation</p>
        <p>In NPSP, if you create a standalone Contact (e.g., "John Smith") and leave the Account Name blank, NPSP automatically creates a Household Account named "Smith (John) Household" and links the Contact to it. This ensures no Contact is ever orphaned.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Go to Contacts → New. First Name: "Jane", Last Name: "Doe". Leave Account blank. Save.</li>
        <li class="step-list__item">Notice she is now linked to the "Doe (Jane) Household" Account.</li>
        <li class="step-list__item">Go to the Household Account. Click <strong>Manage Household</strong>.</li>
        <li class="step-list__item">Add her husband: "John Doe". Save.</li>
        <li class="step-list__item">NPSP automatically renames the Account to "Doe (Jane and John) Household".</li>
      </ol>

      <h2>Step 2: Household Naming Conventions</h2>
      <ol class="step-list">
        <li class="step-list__item">Go to the <strong>NPSP Settings</strong> tab → People → Households.</li>
        <li class="step-list__item">Change the Household Name Format. E.g., change <code>{!LastName} ({!Account.Primary_Contact__r.FirstName}) Household</code> to <code>The {!LastName} Family</code>.</li>
        <li class="step-list__item">Change the Formal Greeting format to <code>Mr. and Mrs. {!LastName}</code> (used for direct mail).</li>
        <li class="step-list__item">Change the Informal Greeting to <code>{!FirstNames}</code> (used for emails).</li>
      </ol>
      <table><thead><tr><th>Setting</th><th>Result Example</th><th>Use Case</th></tr></thead><tbody>
        <tr><td>Account Name</td><td>The Doe Family</td><td>CRM Display</td></tr>
        <tr><td>Formal Greeting</td><td>Mr. and Mrs. Doe</td><td>Tax Receipts, Gala Invites</td></tr>
        <tr><td>Informal Greeting</td><td>Jane and John</td><td>Email Marketing</td></tr>
      </tbody></table>

      <h2>Step 3: Recurring Donations</h2>
      <p>Jane Doe signs up to give $50 every month. We don't want to manually create 12 Opportunities a year.</p>
      <ol class="step-list">
        <li class="step-list__item">Go to the <strong>Recurring Donations</strong> tab → New.</li>
        <li class="step-list__item">Contact: Jane Doe.</li>
        <li class="step-list__item">Amount: $50.00. Schedule Type: Multiply By (fixed number of payments) or Ongoing (open-ended). Choose <strong>Ongoing</strong>.</li>
        <li class="step-list__item">Installment Period: Monthly. Installment Date: 1st of the month. Save.</li>
      </ol>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ How NPSP Handles Recurring Donations</p>
        <p>When you save, NPSP automatically generates future <code>Opportunity</code> records (usually 12 months out) with the Stage set to "Pledged". As the months pass and payments clear your payment processor, the stages are updated to "Closed Won".</p>
      </div>

      <h2>Step 4: Customizable Rollups</h2>
      <p>NPSP calculates donor metrics nightly using batch jobs.</p>
      <ol class="step-list">
        <li class="step-list__item">Look at Jane Doe's Contact record. You will see fields like: <code>Total Gifts</code>, <code>Total Gifts This Year</code>, <code>Largest Gift</code>, and <code>Last Gift Date</code>.</li>
        <li class="step-list__item">These rollups aggregate from the Contact level UP to the Household level. So the "Doe Family" Account shows the combined giving of Jane AND John.</li>
        <li class="step-list__item">To create custom rollups (e.g., "Total Gifts to the Wildlife Fund"), go to NPSP Settings → Donations → Customizable Rollups.</li>
      </ol>
    `},{id:41,title:"FinancialServ — Financial Services Cloud: Rollups & Groups",difficulty:"Expert",category:"Industry Clouds / FSC",company:"WealthMax Advisors",subtitle:"Configure Financial Services Cloud to roll up financial accounts to the Household level and manage complex client relationships.",tags:["FSC","Financial Services Cloud","Rollup By Lookup (RBL)","Relationship Groups","Households"],description:"WealthMax needs to see a client's total net worth. A client might have an IRA, a Joint Checking account with their spouse, and a Trust account. We configure FSC Rollup By Lookup (RBL) to aggregate these balances at the Household level.",learnings:["Understand the FSC Individual and Household data model","Configure Financial Accounts and assign ownership","Set up Rollup By Lookup (RBL) rules for financial aggregation","Manage Actionable Relationship Center (ARC) relationships"],content:`
      <h2>Background</h2>
      <p><strong>Financial Services Cloud (FSC)</strong> is built for wealth management, banking, and insurance. It provides custom objects like <code>FinancialAccount__c</code> and an advanced aggregation engine called <strong>Rollup By Lookup (RBL)</strong> to calculate "Wallet Share" and Net Worth across complex family structures.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Enable FSC Person Accounts · Step 2 → Create the Household Group · Step 3 → Create Financial Accounts · Step 4 → Configure RBL Rules · Step 5 → Visualize in ARC</p>
      </div>

      <h2>Step 1: The FSC Data Model (Individuals vs Households)</h2>
      <ol class="step-list">
        <li class="step-list__item">Like Health Cloud, FSC relies heavily on <strong>Person Accounts</strong> to represent individual clients.</li>
        <li class="step-list__item">Unlike NPSP (which makes the Household the primary Account), FSC keeps the Individual as a Person Account and links them to a separate Household Account (Record Type = Household) via the <strong>Account-Contact Relationship (ACR)</strong> object.</li>
      </ol>
      <table><thead><tr><th>Entity</th><th>Salesforce Object</th><th>Record Type</th></tr></thead><tbody>
        <tr><td>Client (John Smith)</td><td>Account (Person)</td><td>Person Account / Individual</td></tr>
        <tr><td>Spouse (Jane Smith)</td><td>Account (Person)</td><td>Person Account / Individual</td></tr>
        <tr><td>The Smith Family</td><td>Account (Business)</td><td>Household</td></tr>
      </tbody></table>

      <h2>Step 2: Create the Household Group</h2>
      <ol class="step-list">
        <li class="step-list__item">Create a Person Account: "John Smith".</li>
        <li class="step-list__item">On John's record, navigate to the <strong>Relationships</strong> tab.</li>
        <li class="step-list__item">Click <strong>Add to Group</strong> → Create New Group. Name: "The Smith Household".</li>
        <li class="step-list__item">Add Jane Smith to the same group. Designate John as the Primary Member.</li>
      </ol>

      <h2>Step 3: Create Financial Accounts</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Financial Accounts</p>
        <p>A <code>FinancialAccount__c</code> represents a bank account, investment portfolio, loan, or insurance policy. It connects to a Primary Owner (the Person Account) and optionally to Joint Owners.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Go to John Smith's record → Financial Accounts tab → New.</li>
        <li class="step-list__item">Record Type: Investment Account. Name: "John's 401k". Balance: $500,000. Primary Owner: John Smith.</li>
        <li class="step-list__item">Create another account: Record Type: Bank Account. Name: "Joint Checking". Balance: $50,000. Primary Owner: Jane Smith. Joint Owner: John Smith.</li>
      </ol>

      <h2>Step 4: Rollup By Lookup (RBL)</h2>
      <p>WealthMax wants to look at "The Smith Household" and see a total balance of $550,000. Master-Detail rollups don't work because Financial Accounts are connected via Lookups. FSC uses RBL.</p>
      <ol class="step-list">
        <li class="step-list__item">Setup → Custom Metadata Types → <strong>Rollup By Lookup Configuration</strong>.</li>
        <li class="step-list__item">FSC comes with pre-built RBL rules (e.g., <code>TotalBankDeposits</code>, <code>TotalInvestments</code>).</li>
        <li class="step-list__item">These rules use a batch process (or real-time triggers, depending on config) to query all Financial Accounts linked to members of the Household and sum the Balances.</li>
        <li class="step-list__item">Go to "The Smith Household" record. The <strong>Total Financial Accounts</strong> field now reads $550,000.</li>
      </ol>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Double Counting</p>
        <p>If John is Primary Owner of an account, and Jane is Joint Owner, RBL logic ensures the balance is only counted <strong>once</strong> at the Household level, preventing artificial inflation of Net Worth.</p>
      </div>

      <h2>Step 5: Visualize in ARC</h2>
      <ol class="step-list">
        <li class="step-list__item">The <strong>Actionable Relationship Center (ARC)</strong> is an interactive graph component on the Household page.</li>
        <li class="step-list__item">It displays nodes for the Household, John, Jane, their Financial Accounts, and even external relationships (e.g., John's CPA or Lawyer).</li>
        <li class="step-list__item">Advisors use this to visually map out wealth influence and identify cross-sell opportunities.</li>
      </ol>
    `},{id:42,title:"CodeClean — Apex Enterprise Patterns: Selector Layer",difficulty:"Expert",category:"Apex / Advanced",company:"CodeClean Software",subtitle:"Refactor messy SOQL queries scattered across triggers and controllers into a centralized Selector pattern.",tags:["Apex Patterns","Selector Layer","fflib","Architecture","SOQL"],description:"CodeClean has 50 different Apex classes that query the Account object. When a new field is added that everyone needs, developers have to update 50 queries. We implement the Selector pattern to centralize all SOQL.",learnings:["Understand Martin Fowler’s Enterprise Application Architecture patterns","Implement a basic Selector Layer for an object","Call the Selector from Triggers and Controllers","Improve code reusability, security, and maintainability"],content:`
      <h2>Background</h2>
      <p>In mature orgs, writing <code>[SELECT Id, Name FROM Account WHERE...]</code> directly inside Triggers, Batch classes, and Aura controllers leads to massive code duplication and maintenance nightmares. The <strong>Selector Pattern</strong> dictates that <em>all</em> SOQL for a specific object should live in a single class.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → The Problem (Scattered SOQL) · Step 2 → Create the Selector Class · Step 3 → Define Default Fields · Step 4 → Write Query Methods · Step 5 → Refactor Callers</p>
      </div>

      <h2>Step 1: The Problem</h2>
      <pre><code>// âŒ In Trigger Handler
List&lt;Account&gt; accs = [SELECT Id, Name, Industry, AnnualRevenue FROM Account WHERE Id IN :accIds];

// âŒ In LWC Controller
List&lt;Account&gt; topAccs = [SELECT Id, Name, Industry FROM Account WHERE AnnualRevenue &gt; 1000000];</code></pre>
      <p>If the business says, "We must always query the 'Compliance_Status__c' field on every Account query," you have to find and modify every query in the codebase.</p>

      <h2>Step 2: Create the Selector Class</h2>
      <p>Create a class dedicated purely to querying Accounts: <code>AccountsSelector</code>.</p>
      <pre><code>public inherited sharing class AccountsSelector {
    
    // Singleton pattern (optional but recommended)
    private static AccountsSelector instance;
    public static AccountsSelector newInstance() {
        if (instance == null) {
            instance = new AccountsSelector();
        }
        return instance;
    }
}</code></pre>

      <h2>Step 3: Define Default Fields</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Base Fields</p>
        <p>Define a core set of fields that every Account query should return. This guarantees consistency across the application.</p>
      </div>
      <pre><code>    // Inside AccountsSelector class...
    
    public List&lt;String&gt; getSObjectFieldList() {
        return new List&lt;String&gt;{
            'Id',
            'Name',
            'Industry',
            'AnnualRevenue',
            'Compliance_Status__c',
            'OwnerId'
        };
    }

    private String getFieldString() {
        return String.join(getSObjectFieldList(), ',');
    }</code></pre>

      <h2>Step 4: Write Query Methods</h2>
      <p>Create specific methods for specific business needs. They construct dynamic SOQL using the base fields.</p>
      <pre><code>    public List&lt;Account&gt; selectById(Set&lt;Id&gt; recordIds) {
        if (recordIds == null || recordIds.isEmpty()) return new List&lt;Account&gt;();
        
        String query = 'SELECT ' + getFieldString() + 
                       ' FROM Account WHERE Id IN :recordIds';
        return Database.query(query);
    }

    public List&lt;Account&gt; selectByIndustry(String industry) {
        String query = 'SELECT ' + getFieldString() + 
                       ' FROM Account WHERE Industry = :industry';
        return Database.query(query);
    }
    
    public List&lt;Account&gt; selectHighValueWithContacts(Decimal minRevenue) {
        // You can add subqueries here
        String query = 'SELECT ' + getFieldString() + ', ' +
                       '(SELECT Id, Name, Email FROM Contacts) ' +
                       ' FROM Account WHERE AnnualRevenue &gt;= :minRevenue';
        return Database.query(query);
    }</code></pre>

      <h2>Step 5: Refactor Callers</h2>
      <p>Now, update your Triggers and Controllers to stop writing SOQL, and instead call the Selector.</p>
      <pre><code>// âœ… In Trigger Handler
Set&lt;Id&gt; accIds = Trigger.newMap.keySet();
List&lt;Account&gt; accsWithData = AccountsSelector.newInstance().selectById(accIds);

// âœ… In LWC Controller
@AuraEnabled(cacheable=true)
public static List&lt;Account&gt; getTopTechAccounts() {
    return AccountsSelector.newInstance().selectByIndustry('Technology');
}</code></pre>

      <div class="callout callout--tip">
        <p class="callout__title">💡 fflib Framework</p>
        <p>While you can write Selectors from scratch as shown above, many enterprise orgs use the open-source <strong>fflib_SObjectSelector</strong> framework, which provides robust base classes for Selectors, standardizing field security enforcement (WITH SECURITY_ENFORCED) and query construction.</p>
      </div>
    `},{id:43,title:"CodeClean — Apex Enterprise Patterns: Service Layer",difficulty:"Expert",category:"Apex / Advanced",company:"CodeClean Software",subtitle:"Move business logic out of Triggers and Controllers into a centralized Service layer.",tags:["Apex Patterns","Service Layer","fflib","Architecture","Business Logic"],description:"CodeClean has a massive `AccountTriggerHandler`. When an Opportunity needs to apply a discount, it copies the same code. We create a Service Layer to encapsulate business logic into reusable, callable methods.",learnings:["Understand the role of the Service Layer in MVC architecture","Decouple business logic from standard entry points (Triggers/API)","Design Service methods as Units of Work","Implement boundary-level exception handling"],content:`
      <h2>Background</h2>
      <p>Triggers, Batch classes, Invocable methods, and LWC Controllers are <strong>entry points</strong>. They should not contain complex business logic (e.g., <code>if (acc.Revenue &gt; 1M) { applyDiscount(); }</code>). The <strong>Service Layer</strong> is where the actual work happens. It ensures logic can be called from anywhere (a Trigger OR an API) without duplication.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → The Problem (Logic in Triggers) · Step 2 → Create the Service Class · Step 3 → Design the Service Method · Step 4 → Call from Multiple Entry Points</p>
      </div>

      <h2>Step 1: The Problem</h2>
      <pre><code>// âŒ BAD: Logic trapped in a Trigger Handler
public class OpportunityTriggerHandler {
    public void afterUpdate(List&lt;Opportunity&gt; newList, Map&lt;Id, Opportunity&gt; oldMap) {
        // Business Logic: If Opp is Won, provision software licenses
        List&lt;License__c&gt; licensesToInsert = new List&lt;License__c&gt;();
        for (Opportunity opp : newList) {
            if (opp.IsWon && !oldMap.get(opp.Id).IsWon) {
                // ... complex calculation of license count ...
                licensesToInsert.add(new License__c(OppId = opp.Id));
            }
        }
        insert licensesToInsert;
    }
}</code></pre>
      <p>What if the Sales Ops team wants to provision licenses manually via a button (LWC)? They can't fire the trigger. They'd have to rewrite the license calculation logic in their LWC controller.</p>

      <h2>Step 2: Create the Service Class</h2>
      <p>Create a class named for the <em>business process</em> or entity, usually plural: <code>OpportunitiesService</code>.</p>
      <pre><code>public inherited sharing class OpportunitiesService {
    
    // Service methods are often static, representing stateless operations
    public static void provisionLicensesForWonOpportunities(Set&lt;Id&gt; oppIds) {
        // 1. Validate inputs
        if (oppIds == null || oppIds.isEmpty()) return;
        
        // 2. Query data using Selector Layer (Use Case 42)
        List&lt;Opportunity&gt; opps = OpportunitiesSelector.newInstance().selectByIdWithProducts(oppIds);
        
        // 3. Perform Business Logic
        List&lt;License__c&gt; licensesToCreate = new List&lt;License__c&gt;();
        for (Opportunity opp : opps) {
            Integer requiredLicenses = calculateRequiredLicenses(opp); // private helper
            for (Integer i = 0; i &lt; requiredLicenses; i++) {
                licensesToCreate.add(new License__c(
                    Opportunity__c = opp.Id,
                    Account__c = opp.AccountId,
                    Status__c = 'Active'
                ));
            }
        }
        
        // 4. Commit to database (or use UnitOfWork)
        if (!licensesToCreate.isEmpty()) {
            insert licensesToCreate;
        }
    }
    
    private static Integer calculateRequiredLicenses(Opportunity opp) {
        // Encapsulated complexity
        return opp.Amount &gt; 100000 ? 50 : 10;
    }
}</code></pre>

      <h2>Step 3: Call from Multiple Entry Points</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Thin Entry Points</p>
        <p>Entry points now become "thin." They are responsible only for routing the request to the Service layer and handling the response.</p>
      </div>

      <h3>Entry Point 1: The Trigger</h3>
      <pre><code>public class OpportunityTriggerHandler {
    public void afterUpdate(List&lt;Opportunity&gt; newList, Map&lt;Id, Opportunity&gt; oldMap) {
        Set&lt;Id&gt; wonOppIds = new Set&lt;Id&gt;();
        for (Opportunity opp : newList) {
            if (opp.IsWon && !oldMap.get(opp.Id).IsWon) {
                wonOppIds.add(opp.Id);
            }
        }
        
        // Delegate to Service Layer
        OpportunitiesService.provisionLicensesForWonOpportunities(wonOppIds);
    }
}</code></pre>

      <h3>Entry Point 2: An LWC Controller</h3>
      <pre><code>public class OpportunityActionController {
    
    @AuraEnabled
    public static void manualLicenseProvision(Id oppId) {
        try {
            // Delegate to the EXACT SAME Service Layer method
            OpportunitiesService.provisionLicensesForWonOpportunities(new Set&lt;Id&gt;{oppId});
        } catch (Exception e) {
            throw new AuraHandledException('Failed to provision: ' + e.getMessage());
        }
    }
}</code></pre>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Service Layer Rules</p>
        <p>1. Service methods should take primitive collections (Sets of IDs) rather than full SObjects where possible to ensure they have the exact data they need.<br>
        2. Never call a Service from another Service unless absolutely necessary (can lead to tangled dependencies).<br>
        3. Service methods define a "transaction" boundary (manage try/catch and rollbacks here).</p>
      </div>
    `},{id:44,title:"SecurIT — Connected Apps & OAuth 2.0 Web Server Flow",difficulty:"Expert",category:"Security / Integration",company:"SecurIT Integrations",subtitle:"Configure a Connected App to allow an external web application to securely access Salesforce data using OAuth 2.0.",tags:["Connected Apps","OAuth 2.0","Web Server Flow","API","Security"],description:"SecurIT is building a custom Node.js application that needs to pull reports from Salesforce on behalf of the logged-in user. We set up a Connected App using the OAuth 2.0 Web Server Flow to grant access securely without sharing passwords.",learnings:["Create and configure a Connected App","Understand the OAuth 2.0 Web Server (Authorization Code) flow","Define OAuth Scopes (Data Access Permissions)","Exchange an authorization code for an Access Token and Refresh Token"],content:`
      <h2>Background</h2>
      <p>If an external app needs to access Salesforce data via API, it should <strong>never</strong> ask for the user's Salesforce username and password. Instead, it should use a <strong>Connected App</strong> to implement OAuth 2.0. The app redirects the user to Salesforce, the user logs in, and Salesforce gives the app a temporary <em>Access Token</em>.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Create Connected App · Step 2 → Configure OAuth Settings · Step 3 → The Authorization Request (Browser) · Step 4 → The Token Request (Server) · Step 5 → Using the Token</p>
      </div>

      <h2>Step 1: Create the Connected App</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → App Manager → <strong>New Connected App</strong>.</li>
        <li class="step-list__item">Basic Info: Name = "NodeJS Reporting Portal", Email = "admin@securit.com".</li>
      </ol>

      <h2>Step 2: Configure OAuth Settings</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Callback URL & Scopes</p>
        <p>The <strong>Callback URL</strong> is where Salesforce redirects the user's browser after they successfully log in. <strong>Scopes</strong> define what the app is allowed to do (e.g., read data vs modify data).</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Check <strong>Enable OAuth Settings</strong>.</li>
        <li class="step-list__item">Callback URL: <code>https://portal.securit.com/oauth/callback</code> (must match the external app exactly).</li>
        <li class="step-list__item">Selected OAuth Scopes:
          <ul>
            <li><code>Manage user data via APIs (api)</code> (Standard API access)</li>
            <li><code>Perform requests at any time (refresh_token, offline_access)</code> (Allows the app to get a new token without asking the user to log in again).</li>
          </ul>
        </li>
        <li class="step-list__item">Save. Salesforce generates a <strong>Consumer Key</strong> (Client ID) and a <strong>Consumer Secret</strong> (Client Secret). Give these to the Node.js developer.</li>
      </ol>

      <h2>Step 3: The Authorization Request (Browser)</h2>
      <p>When the user clicks "Log in with Salesforce" on the Node.js app, the app redirects their browser to Salesforce:</p>
      <pre><code>GET https://login.salesforce.com/services/oauth2/authorize
    ?response_type=code
    &client_id=YOUR_CONSUMER_KEY
    &redirect_uri=https://portal.securit.com/oauth/callback</code></pre>
      <ol class="step-list">
        <li class="step-list__item">The user sees the standard Salesforce login screen.</li>
        <li class="step-list__item">After logging in, they see a prompt: <em>"NodeJS Reporting Portal is asking to access your data."</em> They click <strong>Allow</strong>.</li>
        <li class="step-list__item">Salesforce redirects the browser back to the app with a temporary code: <code>https://portal.securit.com/oauth/callback?code=aPrxwG...</code></li>
      </ol>

      <h2>Step 4: The Token Request (Server-to-Server)</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Secure the Secret</p>
        <p>The Consumer Secret should <strong>never</strong> be exposed in client-side code (like JavaScript in a browser). Step 4 must happen on the Node.js backend server.</p>
      </div>
      <p>The Node.js server takes the <code>code</code> and makes a POST request to Salesforce to exchange it for an Access Token.</p>
      <pre><code>POST https://login.salesforce.com/services/oauth2/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&client_id=YOUR_CONSUMER_KEY
&client_secret=YOUR_CONSUMER_SECRET
&redirect_uri=https://portal.securit.com/oauth/callback
&code=aPrxwG...</code></pre>
      <p>Salesforce responds with JSON containing the keys to the kingdom:</p>
      <pre><code>{
    "access_token": "00Dxx00...xyz",
    "refresh_token": "5Aep861...abc",
    "instance_url": "https://securit.my.salesforce.com",
    "id": "https://login.salesforce.com/id/00D.../005..."
}</code></pre>

      <h2>Step 5: Using the Token</h2>
      <ol class="step-list">
        <li class="step-list__item">The Node.js app stores the <code>access_token</code> and uses it to make API calls to Salesforce.</li>
        <li class="step-list__item">It adds an HTTP header to every request: <code>Authorization: Bearer 00Dxx00...xyz</code>.</li>
        <li class="step-list__item">When the access token expires (usually after 2-24 hours depending on Session Settings), the Node.js app uses the <code>refresh_token</code> to request a new access token without involving the user.</li>
      </ol>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Managing Access</p>
        <p>Users can revoke the app's access at any time by going to their Personal Settings → Advanced User Details → OAuth Connected Apps. Admins can view and revoke access globally via Setup → Connected Apps OAuth Usage.</p>
      </div>
    `},{id:45,title:"FlowOps — Record-Triggered Flow: Asynchronous Paths",difficulty:"Medium",category:"Flow / Automation",company:"FlowOps Logistical",subtitle:"Use Asynchronous Paths in Flow to make external HTTP callouts without holding up the database transaction.",tags:["Record-Triggered Flow","Asynchronous Path","HTTP Callout","External Services","DML"],description:"When an Opportunity is Won, FlowOps needs to send the order details to a third-party shipping API. Direct callouts from a standard Flow path fail because they occur during an active database transaction. We implement an Asynchronous Path.",learnings:['Understand the "Uncommitted Work Pending" error',"Configure an Asynchronous Path in a Record-Triggered Flow","Use External Services or Apex Invocable actions for callouts","Handle potential errors in background processing"],content:`
      <h2>Background</h2>
      <p>Salesforce has a strict rule: <strong>You cannot make an HTTP callout if you have pending DML operations (database inserts/updates) in the same transaction.</strong> If an Opportunity is updated to "Closed Won" (DML), and a Flow tries to immediately call an external API, you get the dreaded <code>CalloutException: You have uncommitted work pending.</code></p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → The Setup (External Service) · Step 2 → Create Flow & Set Trigger · Step 3 → Add Asynchronous Path · Step 4 → Add Callout to Async Path · Step 5 → Update Record (Post-Callout)</p>
      </div>

      <h2>Step 1: The Setup (External Service)</h2>
      <ol class="step-list">
        <li class="step-list__item">Assume you have already configured an <strong>External Service</strong> (or an Apex Invocable Method) that handles the API POST to the shipping provider.</li>
        <li class="step-list__item">This makes the callout available as an Action element in Flow Builder.</li>
      </ol>

      <h2>Step 2: Create Flow & Set Trigger</h2>
      <ol class="step-list">
        <li class="step-list__item">Flow Builder → New → Record-Triggered Flow.</li>
        <li class="step-list__item">Object: Opportunity. Trigger: A record is updated.</li>
        <li class="step-list__item">Condition Requirements: <code>StageName = Closed Won</code>.</li>
        <li class="step-list__item">Optimize for: <strong>Actions and Related Records</strong> (After-save).</li>
        <li class="step-list__item">Check: "Only when a record is updated to meet the condition requirements."</li>
      </ol>

      <h2>Step 3: Add the Asynchronous Path</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Asynchronous Path</p>
        <p>An Asynchronous Path separates logic into a completely different transaction that runs in the background <em>after</em> the initial Opportunity save commits to the database. Because the original transaction is closed, you can safely make HTTP callouts.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">On the Start element, click <strong>Add Scheduled Paths (Optional)</strong>.</li>
        <li class="step-list__item">Check the box for <strong>Include a Run Asynchronously path</strong>. (Do not set a time delay; just check the box).</li>
        <li class="step-list__item">The canvas now splits into two paths below the Start node: "Run Immediately" and "Run Asynchronously".</li>
      </ol>

      <h2>Step 4: Add Callout to Async Path</h2>
      <ol class="step-list">
        <li class="step-list__item">On the <strong>Run Asynchronously</strong> path, add an <strong>Action</strong> element.</li>
        <li class="step-list__item">Select your External Service action (e.g., "Create Shipping Order").</li>
        <li class="step-list__item">Pass in variables: <code>{!$Record.Id}</code>, <code>{!$Record.Amount}</code>, etc.</li>
      </ol>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Run Immediately Path</p>
        <p>Leave the "Run Immediately" path blank unless you have other standard Salesforce updates to do (like creating a Task or updating a related Account). DO NOT put the callout here.</p>
      </div>

      <h2>Step 5: Post-Callout Updates</h2>
      <ol class="step-list">
        <li class="step-list__item">After the Callout Action on the Async path, add an <strong>Update Records</strong> element.</li>
        <li class="step-list__item">Update the triggering Opportunity: <code>{!$Record.Shipping_Sync_Status__c} = 'Success'</code> (based on the callout response).</li>
        <li class="step-list__item">Add a Fault Path to the Callout Action. If the API fails, update <code>{!$Record.Shipping_Sync_Status__c} = 'Failed'</code> and create an Error Log record.</li>
      </ol>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Async Path vs Scheduled Path</p>
        <p><strong>Async Path:</strong> Runs as soon as resources are available (usually within seconds). Designed specifically for callouts and heavy processing to avoid limits.<br>
        <strong>Scheduled Path:</strong> Runs at a specific future time (e.g., 3 days after Close Date). Designed for time-based follow-ups.</p>
      </div>
    `},{id:46,title:"DataSync — External Objects (Salesforce Connect)",difficulty:"Expert",category:"Architecture / Integration",company:"DataSync Logistics",subtitle:"Display real-time order data from an external ERP system inside Salesforce without copying the data into standard objects.",tags:["Salesforce Connect","External Objects","OData","Integration","Zero-Copy"],description:"DataSync has millions of order records in an SAP ERP. Copying them into Salesforce custom objects would consume massive data storage and create sync headaches. We implement Salesforce Connect and External Objects to view the data virtually.",learnings:['Understand the "Zero-Copy" integration pattern',"Configure an External Data Source using OData","Sync External Objects (ending in __x)","Create Indirect Lookups to relate External Objects to Standard Objects"],content:`
      <h2>Background</h2>
      <p>Data storage in Salesforce is expensive. If users only need to <em>view</em> historical orders (not trigger automations on them), replicating millions of rows is an anti-pattern. <strong>Salesforce Connect</strong> solves this by querying the external database in real-time when the user loads the page.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Define External Data Source · Step 2 → Sync External Objects · Step 3 → Create Indirect Lookup · Step 4 → Add to Page Layouts</p>
      </div>

      <h2>Step 1: External Data Source</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — OData Protocol</p>
        <p>Salesforce Connect relies on standard protocols like OData (Open Data Protocol). The external system (ERP) must expose an OData REST API. Salesforce translates SOQL queries into OData HTTP requests on the fly.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → External Data Sources → New.</li>
        <li class="step-list__item">Label: "SAP Orders". Name: <code>SAP_Orders</code>.</li>
        <li class="step-list__item">Type: <strong>Salesforce Connect: OData 4.0</strong>.</li>
        <li class="step-list__item">URL: <code>https://api.datasync.com/odata/v4/</code> (The base URL of the external API).</li>
        <li class="step-list__item">Authentication: Set to Named Principal or Per User (usually OAuth 2.0).</li>
        <li class="step-list__item">Click Save.</li>
      </ol>

      <h2>Step 2: Validate and Sync</h2>
      <ol class="step-list">
        <li class="step-list__item">On the SAP Orders Data Source page, click <strong>Validate and Sync</strong>.</li>
        <li class="step-list__item">Salesforce calls the OData metadata endpoint and discovers the tables available in the ERP.</li>
        <li class="step-list__item">Check the box next to the "Orders" table and click <strong>Sync</strong>.</li>
        <li class="step-list__item">Salesforce automatically creates an <strong>External Object</strong> called <code>Orders__x</code> and maps the external columns to custom fields (e.g., <code>Order_Total__c</code>, <code>Order_Date__c</code>).</li>
      </ol>

      <h2>Step 3: Relate External Data (Indirect Lookup)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Indirect vs External Lookups</p>
        <p><strong>External Lookup:</strong> Links an External Object to another External Object.<br>
        <strong>Indirect Lookup:</strong> Links an External Object to a Standard/Custom Salesforce object, matching an External ID field (because the external data doesn't know Salesforce 18-char IDs).</p>
      </div>
      <p>We want the ERP Order to show up as a Related List on the Salesforce Account.</p>
      <ol class="step-list">
        <li class="step-list__item">Ensure the Salesforce Account object has an External ID field (e.g., <code>ERP_Customer_ID__c</code>) that matches the ERP's customer ID.</li>
        <li class="step-list__item">Go to Object Manager → <code>Orders__x</code> → Fields → New.</li>
        <li class="step-list__item">Type: <strong>Indirect Lookup Relationship</strong>.</li>
        <li class="step-list__item">Related To: Account.</li>
        <li class="step-list__item">Target Field: <code>ERP_Customer_ID__c</code>.</li>
        <li class="step-list__item">Map it to the External Object field that contains the customer ID (e.g., <code>CustomerID__c</code>).</li>
      </ol>

      <h2>Step 4: View in the UI</h2>
      <ol class="step-list">
        <li class="step-list__item">Go to the Account Page Layout.</li>
        <li class="step-list__item">Add the "Orders" related list.</li>
        <li class="step-list__item">When a user opens an Account, Salesforce makes a real-time OData call: <code>GET /Orders?$filter=CustomerID eq '12345'</code>.</li>
        <li class="step-list__item">The orders appear in the related list exactly like native records, but consume 0 bytes of Salesforce database storage.</li>
      </ol>

      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Limitations of External Objects</p>
        <p>Because the data isn't in Salesforce, you <strong>cannot</strong>: Use them in Rollup Summary fields, trigger Flows/Apex off them, or use complex SOQL joins. They are best for display and reporting.</p>
      </div>
    `},{id:47,title:"SpeedySales — High-Volume Data: Platform Cache",difficulty:"Hard",category:"Apex / Advanced",company:"SpeedySales E-Commerce",subtitle:"Optimize Lightning Component performance and reduce SOQL queries by implementing Salesforce Platform Cache.",tags:["Platform Cache","Apex","Performance","Limits","SOQL Optimization"],description:"SpeedySales has a custom product catalog LWC that queries 1,000 Product records every time any user loads the home page. This causes slow load times and hits SOQL limits. We implement Org Cache to store the results in memory.",learnings:["Understand the difference between Org Cache and Session Cache","Configure Cache Partitions in Setup","Implement Cache.Org.get() and Cache.Org.put() in Apex","Design a cache-miss fallback pattern"],content:`
      <h2>Background</h2>
      <p>Querying the database is slow and consumes governor limits. If data changes infrequently (like a Product Catalog) but is read constantly, it should be stored in RAM. <strong>Salesforce Platform Cache</strong> provides this in-memory layer (similar to Redis).</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Allocate Cache Partitions · Step 2 → The Cache-Miss Pattern · Step 3 → Implement in Apex</p>
      </div>

      <h2>Step 1: Allocate Cache Partitions</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Org vs Session Cache</p>
        <p><strong>Org Cache:</strong> Shared across all users in the org. Best for global data (product catalogs, exchange rates, zip code mappings).<br>
        <strong>Session Cache:</strong> Specific to a single logged-in user. Best for user-specific state (shopping cart items, wizard progress).</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Platform Cache → Partitions → New.</li>
        <li class="step-list__item">Label: "CatalogPartition". API Name: <code>local.CatalogPartition</code>.</li>
        <li class="step-list__item">Allocate capacity: Set Org Cache Allocation to 5 MB (if you have capacity available). Leave Session Cache at 0.</li>
        <li class="step-list__item">Click Save.</li>
      </ol>

      <h2>Step 2: The Cache-Miss Pattern</h2>
      <p>You can never guarantee data is in the cache (it might have expired or been evicted). Your code must always attempt to fetch from cache, and if it fails (a "cache miss"), query the database, store it in the cache, and then return the data.</p>

      <h2>Step 3: Implement in Apex</h2>
      <pre><code>public class ProductCatalogController {
    
    @AuraEnabled(cacheable=true)
    public static List&lt;Product2&gt; getActiveProducts() {
        
        // 1. Define the cache key (PartitionName.KeyName)
        String cacheKey = 'local.CatalogPartition.ActiveProducts';
        
        // 2. Attempt to retrieve from cache
        List&lt;Product2&gt; cachedProducts = (List&lt;Product2&gt;) Cache.Org.get(cacheKey);
        
        // 3. Cache Hit
        if (cachedProducts != null) {
            System.debug('Fetched from Cache!');
            return cachedProducts;
        }
        
        // 4. Cache Miss - Query the Database
        System.debug('Cache miss. Querying DB...');
        List&lt;Product2&gt; dbProducts = [
            SELECT Id, Name, ProductCode, Description 
            FROM Product2 
            WHERE IsActive = true 
            LIMIT 1000
        ];
        
        // 5. Store in cache for next time (Time to Live = 86400 secs / 24 hours)
        Cache.Org.put(cacheKey, dbProducts, 86400);
        
        return dbProducts;
    }
}</code></pre>

      <div class="callout callout--tip">
        <p class="callout__title">💡 Cache Invalidation</p>
        <p>What if someone adds a new Product? The cache will hold stale data for 24 hours. You must write a Trigger on Product2 that calls <code>Cache.Org.remove('local.CatalogPartition.ActiveProducts')</code> whenever a product is inserted/updated. The next user will experience a cache miss, and the cache will refresh with the new data.</p>
      </div>
    `},{id:48,title:"MobileMax — Salesforce Mobile App & Publisher Actions",difficulty:"Easy",category:"Mobile / UI",company:"MobileMax Field Sales",subtitle:"Optimize the Salesforce Mobile App experience by configuring Mobile Navigation and Global Quick Actions.",tags:["Mobile App","Quick Actions","Page Layouts","Compact Layouts"],description:"MobileMax field reps complain the Salesforce mobile app is too cluttered. They just want to quickly log a call, create a Lead, and see key Account fields without scrolling. We optimize the mobile experience using Publisher Actions and Compact Layouts.",learnings:["Configure the Salesforce Mobile App navigation menu","Create and assign Global Quick Actions (Publisher Actions)","Optimize Compact Layouts for mobile highlights","Differentiate between Global vs Object-Specific Actions"],content:`
      <h2>Background</h2>
      <p>The Salesforce Mobile App uses the exact same metadata (objects, fields, layouts) as the desktop Lightning Experience, but renders it differently. A dense desktop layout is terrible on a phone. We must explicitly optimize the mobile UI.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Mobile Navigation · Step 2 → Compact Layouts · Step 3 → Global Quick Actions · Step 4 → Object-Specific Actions</p>
      </div>

      <h2>Step 1: Mobile Navigation Menu</h2>
      <ol class="step-list">
        <li class="step-list__item">Setup → Salesforce Navigation.</li>
        <li class="step-list__item">The mobile app groups items into standard apps. Ensure the reps are using a specific Lightning App (e.g., "Field Sales").</li>
        <li class="step-list__item">Go to App Manager → Field Sales → Edit. Under Navigation Items, ensure only the most critical tabs (Accounts, Contacts, Leads, Dashboards) are included. The mobile app honors this app navigation.</li>
      </ol>

      <h2>Step 2: Compact Layouts (The Highlight Panel)</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Compact Layouts</p>
        <p>On desktop, the Compact Layout drives the Highlights Panel at the top of the record. On mobile, it drives the record header AND the list view card fields. You can only show up to 10 fields, and the first 4 are the most prominent.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Object Manager → Account → Compact Layouts → New.</li>
        <li class="step-list__item">Name: "Mobile Account Highlight".</li>
        <li class="step-list__item">Select fields: Account Name, Phone, Billing City, Annual Revenue.</li>
        <li class="step-list__item">Click Compact Layout Assignment → Set this layout as the primary.</li>
        <li class="step-list__item">When reps open an Account on their phone, Phone and City are instantly visible without scrolling.</li>
      </ol>

      <h2>Step 3: Global Quick Actions</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Global vs Object-Specific Actions</p>
        <p><strong>Global Actions:</strong> Accessed from the "+" button at the bottom of the mobile app. They create records with no relationship to the current page (e.g., "New Lead").<br>
        <strong>Object-Specific Actions:</strong> Accessed from a specific record page. They automatically link to that record (e.g., "Log a Call" on an Account automatically links the task to that Account).</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Global Actions → New Action.</li>
        <li class="step-list__item">Action Type: <strong>Create a Record</strong>. Target Object: <strong>Lead</strong>. Label: "Quick Lead".</li>
        <li class="step-list__item">Edit the Action Layout: Remove all fields except First Name, Last Name, Company, and Phone. (Mobile actions should be FAST).</li>
        <li class="step-list__item">Setup → Publisher Layouts → Edit the Global Layout.</li>
        <li class="step-list__item">Drag "Quick Lead" into the "Salesforce Mobile and Lightning Experience Actions" section. Move it to the very front so it's the first button reps see.</li>
      </ol>

      <h2>Step 4: Object-Specific Actions</h2>
      <ol class="step-list">
        <li class="step-list__item">Object Manager → Account → Buttons, Links, and Actions → New Action.</li>
        <li class="step-list__item">Action Type: <strong>Log a Call</strong>. Label: "Log Field Visit".</li>
        <li class="step-list__item">Predefined Field Values: Set <code>Subject</code> = "Field Visit", <code>Status</code> = "Completed". This saves the rep clicks.</li>
        <li class="step-list__item">Go to Account Page Layouts. Add "Log Field Visit" to the Mobile Actions section.</li>
      </ol>
      <div class="callout callout--tip">
        <p class="callout__title">💡 Mobile Optimization Rule</p>
        <p>If a user has to scroll down more than two swipes on their phone to complete their core job task, your mobile design has failed. Use Actions to bring data entry to the surface.</p>
      </div>
    `},{id:49,title:"AppExchange — Managed Packages & LMA",difficulty:"Expert",category:"Architecture / ISV",company:"SaaS Innovators",subtitle:"Package a custom application for the AppExchange and understand the License Management App (LMA).",tags:["AppExchange","Managed Packages","ISV","LMA","Namespaces"],description:"SaaS Innovators built a project management tool inside Salesforce. They want to sell it on the AppExchange. We configure a Developer Edition org, define a Namespace, create a Managed Package, and prepare for Security Review.",learnings:["Understand the difference between Unmanaged and Managed Packages","Register a Namespace Prefix","Create and upload a Managed Package","Understand the License Management Application (LMA) for ISVs"],content:`
      <h2>Background</h2>
      <p>Building for a single org is "Enterprise Development." Building an app to sell to thousands of other orgs is "ISV (Independent Software Vendor) Development." ISV apps are distributed via the AppExchange using <strong>Managed Packages</strong>.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Dev Edition & Namespace · Step 2 → Package Manager · Step 3 → Upload & Versioning · Step 4 → The LMA · Step 5 → Security Review</p>
      </div>

      <h2>Step 1: Namespaces</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Namespace Prefix</p>
        <p>A Namespace is a unique 1-15 character string (e.g., <code>saas_proj</code>) prepended to all your components (<code>saas_proj__Project__c</code>). This prevents your custom object from colliding with a custom object named <code>Project__c</code> that the customer might have already built in their org.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Sign up for a Partner Developer Edition org (Pdo).</li>
        <li class="step-list__item">Setup → Package Manager → Developer Settings → Edit.</li>
        <li class="step-list__item">Register a unique namespace. <strong>This cannot be changed or undone once set.</strong></li>
        <li class="step-list__item">All API names in the org are automatically updated to include the prefix.</li>
      </ol>

      <h2>Step 2: Create the Managed Package</h2>
      <div class="callout callout--warning">
        <p class="callout__title">⚠️ï¸ Managed vs Unmanaged</p>
        <p><strong>Unmanaged:</strong> Open source. Code can be edited by the customer. Cannot be upgraded. No IP protection.<br>
        <strong>Managed:</strong> Locked down. Apex code is hidden (IP protection). Can be pushed and upgraded seamlessly. Requires a namespace.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">Setup → Package Manager → New.</li>
        <li class="step-list__item">Name: "ProjManage Pro". Select <strong>Managed</strong>.</li>
        <li class="step-list__item">Click Add Components. Add the main Custom App or tab; Salesforce automatically pulls in dependent objects, fields, and classes.</li>
      </ol>

      <h2>Step 3: Upload & Versioning</h2>
      <ol class="step-list">
        <li class="step-list__item">Click <strong>Upload</strong>.</li>
        <li class="step-list__item">Version Name: "Summer Release". Version Number: <code>1.0</code>.</li>
        <li class="step-list__item">Salesforce compiles the code and generates an installation URL (e.g., <code>login.salesforce.com/packaging/installPackage.apexp?p0=04t...</code>).</li>
        <li class="step-list__item">You give this URL to customers, or link it to your AppExchange listing.</li>
        <li class="step-list__item">When you fix a bug, you create a new version (<code>1.1</code>) and can use "Push Upgrades" to force-update all customer orgs simultaneously.</li>
      </ol>

      <h2>Step 4: The License Management App (LMA)</h2>
      <p>How do you charge money for this? How do you cut off access if they stop paying?</p>
      <ol class="step-list">
        <li class="step-list__item">As an ISV partner, you get a special Salesforce org (Environment Hub/PBO).</li>
        <li class="step-list__item">You install the <strong>License Management App (LMA)</strong> into this org.</li>
        <li class="step-list__item">When a customer installs your package, a <code>License__c</code> record is automatically created in your LMA org.</li>
        <li class="step-list__item">You edit this record to set Status = "Active", Seats = "50", Expiration = "12/31/2025".</li>
        <li class="step-list__item">Salesforce infrastructure enforces these limits in the customer's org automatically.</li>
      </ol>

      <h2>Step 5: Security Review</h2>
      <ol class="step-list">
        <li class="step-list__item">Before listing on the AppExchange, Salesforce engineers run automated and manual penetration tests on your code.</li>
        <li class="step-list__item">They check for SOQL injection, Cross-Site Scripting (XSS), and CRUD/FLS enforcement (ensuring your Apex respects the customer's field-level security settings).</li>
        <li class="step-list__item">Passing this review is mandatory and proves your app is enterprise-ready.</li>
      </ol>
    `},{id:50,title:"FutureProof — LWC: Lightning Message Service (LMS)",difficulty:"Hard",category:"LWC / Advanced",company:"FutureProof Components",subtitle:"Communicate between decoupled Lightning Web Components, Aura Components, and Visualforce pages using LMS.",tags:["LWC","LMS","Lightning Message Service","Pub/Sub","Component Communication"],description:"FutureProof has a complex page with a custom LWC product filter on the left, an Aura list component in the middle, and a Visualforce legacy map on the right. They need to talk to each other without parent-child DOM relationships. We implement Lightning Message Service.",learnings:["Understand the limitations of standard CustomEvents (DOM bubbling)","Create a Lightning Message Channel (XML)","Publish messages from an LWC","Subscribe to messages in LWC and Aura components"],content:`
      <h2>Background</h2>
      <p>If Component A is the parent of Component B, they communicate via <code>@api</code> properties (down) and <code>CustomEvent</code> (up). But what if Component A and Component C sit side-by-side on a Lightning Page with no parent? Standard events cannot cross this boundary. <strong>Lightning Message Service (LMS)</strong> is a publish-subscribe (pub/sub) model that works across the entire page, and even bridges LWC, Aura, and Visualforce.</p>

      <div class="callout callout--info">
        <p class="callout__title">📋 Build Order</p>
        <p>Step 1 → Create the Message Channel · Step 2 → The Publisher LWC · Step 3 → The Subscriber LWC · Step 4 → The Subscriber Aura Component</p>
      </div>

      <h2>Step 1: Create the Message Channel</h2>
      <div class="callout callout--definition">
        <p class="callout__title">💡 Concept — Message Channels</p>
        <p>A Message Channel is a metadata artifact (XML file) deployed to the org. It acts as the central radio frequency that publishers broadcast on and subscribers listen to.</p>
      </div>
      <ol class="step-list">
        <li class="step-list__item">In VS Code, navigate to <code>force-app/main/default/messageChannels</code>.</li>
        <li class="step-list__item">Create file: <code>ProductSelected.messageChannel-meta.xml</code>.</li>
      </ol>
      <pre><code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;LightningMessageChannel xmlns="http://soap.sforce.com/2006/04/metadata"&gt;
    &lt;masterLabel&gt;ProductSelected&lt;/masterLabel&gt;
    &lt;isExposed&gt;true&lt;/isExposed&gt;
    &lt;description&gt;Fires when a user clicks a product in the list.&lt;/description&gt;
    &lt;lightningMessageFields&gt;
        &lt;fieldName&gt;productId&lt;/fieldName&gt;
        &lt;description&gt;The Salesforce ID of the product&lt;/description&gt;
    &lt;/lightningMessageFields&gt;
&lt;/LightningMessageChannel&gt;</code></pre>
      <ol class="step-list" start="3">
        <li class="step-list__item">Deploy this file to the org.</li>
      </ol>

      <h2>Step 2: The Publisher LWC</h2>
      <p>This component has a list of products. When a user clicks one, it broadcasts the ID.</p>
      <pre><code>// productList.js
import { LightningElement, wire } from 'lwc';
// 1. Import LMS features
import { publish, MessageContext } from 'lightning/messageService';
// 2. Import the specific channel
import PRODUCT_SELECTED_CHANNEL from '@salesforce/messageChannel/ProductSelected__c';

export default class ProductList extends LightningElement {
    
    // 3. Get context for LMS
    @wire(MessageContext)
    messageContext;

    handleProductClick(event) {
        const selectedId = event.target.dataset.id;
        
        // 4. Create the payload matching the XML fields
        const payload = { productId: selectedId };
        
        // 5. Publish!
        publish(this.messageContext, PRODUCT_SELECTED_CHANNEL, payload);
    }
}</code></pre>

      <h2>Step 3: The Subscriber LWC</h2>
      <p>This component sits across the page and listens for the broadcast.</p>
      <pre><code>// productDetails.js
import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import PRODUCT_SELECTED_CHANNEL from '@salesforce/messageChannel/ProductSelected__c';

export default class ProductDetails extends LightningElement {
    subscription = null;
    currentProductId;

    @wire(MessageContext)
    messageContext;

    // Subscribe when component is inserted into DOM
    connectedCallback() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                PRODUCT_SELECTED_CHANNEL,
                (message) =&gt; this.handleMessage(message)
            );
        }
    }

    // Always clean up to prevent memory leaks!
    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleMessage(message) {
        this.currentProductId = message.productId;
        // Logic to fetch new product details...
    }
}</code></pre>

      <h2>Step 4: The Subscriber Aura Component</h2>
      <p>Aura can listen to the exact same channel natively using the <code>&lt;lightning:messageChannel&gt;</code> tag.</p>
      <pre><code>&lt;!-- legacyMap.cmp --&gt;
&lt;aura:component&gt;
    &lt;aura:attribute name="targetId" type="String"/&gt;

    &lt;!-- Include the channel and define the handler --&gt;
    &lt;lightning:messageChannel type="ProductSelected__c" 
                              onMessage="{!c.handleLmsMessage}"/&gt;

    &lt;div&gt;Map for Product: {!v.targetId}&lt;/div&gt;
&lt;/aura:component&gt;</code></pre>
      <pre><code>// legacyMapController.js
({
    handleLmsMessage : function(component, message, helper) {
        if (message != null && message.getParam("productId") != null) {
            component.set("v.targetId", message.getParam("productId"));
            // Update map logic...
        }
    }
})</code></pre>

      <div class="callout callout--tip">
        <p class="callout__title">💡 LMS vs pubsub.js</p>
        <p>In the early days of LWC, developers used a custom utility called <code>pubsub.js</code> to achieve this. <strong>LMS</strong> is the official, native replacement. You should migrate all legacy pubsub.js implementations to LMS, as LMS is faster, officially supported, and works across component frameworks.</p>
      </div>
    `}];function ml(){const s=document.getElementById("mainContent");if(!s)return;s.innerHTML=`
    <div class="use-cases-page">
      <header class="use-cases-header" style="margin-bottom: 2rem; text-align: center;">
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">💡 50 Real-World Use Cases</h1>
        <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto;">
          From basic administration to expert-level architecture. Explore how Salesforce is used in the real world by businesses across the globe.
        </p>
      </header>

      <div class="use-cases-filters" style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem; flex-wrap: wrap;">
        <button class="btn btn--primary filter-btn" data-filter="all">All</button>
        <button class="btn btn--ghost filter-btn" data-filter="Easy">Easy (Admin)</button>
        <button class="btn btn--ghost filter-btn" data-filter="Medium">Medium (Flows)</button>
        <button class="btn btn--ghost filter-btn" data-filter="Hard">Hard (Apex/Integration)</button>
        <button class="btn btn--ghost filter-btn" data-filter="Expert">Expert (LWC/Arch)</button>
      </div>

      <div class="use-cases-grid" id="useCasesGrid" style="display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));">
        ${bi(xt)}
      </div>

      <!-- Use Case Modal -->
      <div class="modal-overlay" id="useCaseModal" style="display: none; align-items: center; justify-content: center; z-index: 1000;">
        <div class="modal-content" style="background: var(--bg-elevated); padding: 2rem; border-radius: 16px; border: 1px solid var(--border-default); box-shadow: 0 20px 40px rgba(0,0,0,0.4); max-width: 800px; width: 95%; max-height: 90vh; overflow-y: auto; position: relative; z-index: 1001;">
          <button id="closeUseCaseModal" class="btn btn--ghost btn--sm" style="position: absolute; top: 1rem; right: 1rem; font-size: 1.5rem; padding: 0.25rem 0.75rem; background: var(--bg-base);">&times;</button>
          <div id="useCaseModalBody"></div>
        </div>
      </div>
    </div>
  `,s.scrollTo({top:0,behavior:"smooth"});const e=s.querySelectorAll(".filter-btn"),t=document.getElementById("useCasesGrid");e.forEach(a=>{a.addEventListener("click",n=>{e.forEach(c=>{c.classList.remove("btn--primary"),c.classList.add("btn--ghost")}),n.target.classList.remove("btn--ghost"),n.target.classList.add("btn--primary");const o=n.target.dataset.filter;let l=xt;o!=="all"&&(l=xt.filter(c=>c.difficulty===o)),t.innerHTML=bi(l),vi()})}),vi();const i=document.getElementById("useCaseModal");document.getElementById("closeUseCaseModal").addEventListener("click",()=>{i.style.display="none"}),i.addEventListener("click",a=>{a.target===i&&(i.style.display="none")})}function vi(){const s=document.querySelectorAll(".use-case-card"),e=document.getElementById("useCaseModal"),t=document.getElementById("useCaseModalBody");s.forEach(i=>{i.addEventListener("click",()=>{const r=parseInt(i.dataset.id,10),a=xt.find(n=>n.id===r);a&&(t.innerHTML=`
          <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
              <span class="badge ${ir(a.difficulty)}">${a.difficulty}</span>
              <span class="badge badge--neutral">${a.category}</span>
              <span class="badge badge--neutral">🏢 ${a.company}</span>
            </div>
            <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem;">${a.title}</h2>
            <p style="color: var(--text-muted); font-size: 1.1rem;">${a.subtitle}</p>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem;">Tags & Learning Objectives</h3>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
              ${(a.tags||[]).map(n=>`<span class="badge" style="background: rgba(124, 58, 237, 0.1); color: var(--primary-color); border: 1px solid rgba(124, 58, 237, 0.2);">${n}</span>`).join("")}
            </div>
            <ul style="padding-left: 1.5rem; color: var(--text-primary);">
              ${(a.learnings||[]).map(n=>`<li>${n}</li>`).join("")}
            </ul>
          </div>
          
          <div class="use-case-content" style="line-height: 1.6;">
            ${a.content}
          </div>
        `,e.style.display="flex")})})}function ir(s){return s==="Medium"?"badge--warning":s==="Hard"?"badge--danger":s==="Expert"?'badge--danger" style="background: var(--primary-color); color: #fff;':"badge--success"}function bi(s){return s.map(e=>`
      <div class="use-case-card" data-id="${e.id}" style="background: var(--bg-surface); border: 1px solid var(--glass-border); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <span class="badge ${ir(e.difficulty)}">${e.difficulty}</span>
          <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">${e.category}</span>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 600;">#${e.id} - ${e.title}</h3>
        <div style="flex: 1;">
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem; line-height: 1.5;">
            <strong>Scenario:</strong> ${e.description}
          </p>
        </div>
        <div style="background: var(--bg-base); padding: 1rem; border-radius: 8px; font-size: 0.9rem; border-left: 3px solid var(--primary-color);">
          <strong>Focus:</strong> ${e.subtitle||e.tags&&e.tags.join(", ")}
        </div>
        <button class="btn btn--outline btn--sm" style="width: 100%; margin-top: auto;">View Build Guide</button>
      </div>
    `).join("")}yr();fr();vr();br();Ho();Ei();pr.on("/",()=>fl()).on("/modules",()=>_l()).on("/lesson/:lessonId",({lessonId:s})=>Xo(s)).on("/quiz-hub",()=>dl()).on("/quiz/:moduleId/:difficulty",({moduleId:s,difficulty:e})=>il(s,e)).on("/profile",()=>Qo()).on("/cheatsheets",()=>hl()).on("/interview",()=>gl()).on("/use-cases",()=>ml()).start();D.subscribe(()=>{Ei()});function fl(){const s=document.getElementById("mainContent");if(!s)return;const e=D.state,t=D.getLevelInfo(),i=D.getCompletedCount();D.getTotalLessons();const r=D.getOverallProgress();let a=null;for(const n of le){for(const o of n.lessons)if(!D.isLessonCompleted(o.id)){a={...o,module:n};break}if(a)break}s.innerHTML=`
    <div class="home-page">
      <!-- Hero -->
      <section class="hero">
        <div class="hero__content">
          <h1 class="hero__title">
            <span class="hero__greeting">Welcome back</span>
            Master Salesforce
            <span class="hero__gradient-text">From Scratch to Pro</span>
          </h1>
          <p class="hero__desc">
            55 comprehensive lessons across 4 modules. Learn theory, practice hands-on, 
            and prepare for interviews — all in one place.
          </p>
          <div class="hero__actions">
            ${a?`<a href="#/lesson/${a.id}" class="btn btn--primary btn--lg hero__cta">
                   Continue Learning: ${a.title} →
                 </a>`:`<a href="#/lesson/1.1" class="btn btn--primary btn--lg hero__cta">
                   Start Learning →
                 </a>`}
            <a href="#/cheatsheets" class="btn btn--ghost btn--lg">📋 Cheat Sheets</a>
          </div>
        </div>
        <div class="hero__stats-ring">
          <svg viewBox="0 0 120 120" width="180" height="180">
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--glass-border)" stroke-width="6"/>
            <circle cx="60" cy="60" r="52" fill="none" stroke="url(#heroGrad)" stroke-width="6" 
              stroke-dasharray="${2*Math.PI*52}" 
              stroke-dashoffset="${2*Math.PI*52*(1-r/100)}"
              stroke-linecap="round" transform="rotate(-90 60 60)"/>
            <defs>
              <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#00a1e0"/>
                <stop offset="100%" style="stop-color:#7c3aed"/>
              </linearGradient>
            </defs>
          </svg>
          <div class="hero__stats-ring-text">
            <span class="hero__stats-pct">${r}%</span>
            <span class="hero__stats-label">Complete</span>
          </div>
        </div>
      </section>

      <!-- Quick Stats -->
      <section class="home-stats">
        <div class="home-stat-card">
          <span class="home-stat-card__icon">${t.icon}</span>
          <span class="home-stat-card__value">${t.name}</span>
          <span class="home-stat-card__label">Level ${e.user.level}</span>
        </div>
        <div class="home-stat-card">
          <span class="home-stat-card__icon">⭐</span>
          <span class="home-stat-card__value">${e.user.xp}</span>
          <span class="home-stat-card__label">XP Earned</span>
        </div>
        <div class="home-stat-card">
          <span class="home-stat-card__icon">🔥</span>
          <span class="home-stat-card__value">${e.user.streak}</span>
          <span class="home-stat-card__label">Day Streak</span>
        </div>
        <div class="home-stat-card">
          <span class="home-stat-card__icon">📚</span>
          <span class="home-stat-card__value">${i}</span>
          <span class="home-stat-card__label">Lessons Done</span>
        </div>
      </section>

      <!-- Module Cards -->
      <section class="home-modules">
        <h2 class="home-section-title">Learning Modules</h2>
        <div class="module-cards-grid">
          ${le.map(n=>{const o=D.getModuleCompletedCount(n.id),l=n.lessons.length,c=Math.round(o/l*100);return`
              <a href="#/lesson/${n.lessons[0].id}" class="module-card">
                <div class="module-card__header" style="background:${n.gradient}">
                  <span class="module-card__icon">${n.icon}</span>
                  <span class="module-card__lesson-count">${l} Lessons</span>
                </div>
                <div class="module-card__body">
                  <h3 class="module-card__title">${n.title}</h3>
                  <p class="module-card__desc">${n.description}</p>
                  <div class="module-card__progress">
                    <div class="module-card__progress-bar">
                      <div class="module-card__progress-fill" style="width:${c}%;background:${n.color}"></div>
                    </div>
                    <span class="module-card__progress-text">${o}/${l} complete</span>
                  </div>
                </div>
              </a>`}).join("")}
        </div>
      </section>

      <!-- Quick Links -->
      <section class="home-quick-links">
        <h2 class="home-section-title">Quick Access</h2>
        <div class="quick-links-grid">
          <a href="#/quiz-hub" class="quick-link-card">
            <span class="quick-link-card__icon">📝</span>
            <span class="quick-link-card__title">Quizzes</span>
            <span class="quick-link-card__desc">Test your knowledge</span>
          </a>
          <a href="#/interview" class="quick-link-card">
            <span class="quick-link-card__icon">🎯</span>
            <span class="quick-link-card__title">Interview Prep</span>
            <span class="quick-link-card__desc">275+ scenario questions</span>
          </a>
          <a href="#/cheatsheets" class="quick-link-card">
            <span class="quick-link-card__icon">📋</span>
            <span class="quick-link-card__title">Cheat Sheets</span>
            <span class="quick-link-card__desc">Quick reference cards</span>
          </a>
          <a href="#/use-cases" class="quick-link-card">
            <span class="quick-link-card__icon">💡</span>
            <span class="quick-link-card__title">Use Cases</span>
            <span class="quick-link-card__desc">50 real-world examples</span>
          </a>
        </div>
      </section>
    </div>`,s.scrollTo({top:0})}function _l(){const s=document.getElementById("mainContent");s&&(s.innerHTML=`
    <div class="modules-page">
      <h1 class="modules-page__title">📚 All Modules</h1>
      <p class="modules-page__subtitle">Choose a module to begin learning. Complete lessons in order or jump to any topic.</p>
      <div class="modules-list">
        ${le.map(e=>{const t=D.getModuleCompletedCount(e.id),i=e.lessons.length;return`
            <div class="module-detail-card">
              <div class="module-detail-card__header" style="background:${e.gradient}">
                <span class="module-detail-card__icon">${e.icon}</span>
                <div>
                  <h2 class="module-detail-card__title">${e.title}</h2>
                  <p class="module-detail-card__desc">${e.description}</p>
                </div>
                <span class="module-detail-card__count">${t}/${i}</span>
              </div>
              <div class="module-detail-card__lessons">
                ${e.lessons.map(r=>{const a=D.isLessonCompleted(r.id);return`
                    <a href="#/lesson/${r.id}" class="module-lesson-row${a?" module-lesson-row--completed":""}">
                      <span class="module-lesson-row__status">${a?"✅":"○"}</span>
                      <div class="module-lesson-row__info">
                        <span class="module-lesson-row__title">${r.id}. ${r.title}</span>
                        <span class="module-lesson-row__subtitle">${r.subtitle}</span>
                      </div>
                      <span class="module-lesson-row__meta">
                        <span class="module-lesson-row__duration">${r.duration}</span>
                        <span class="module-lesson-row__diff module-lesson-row__diff--${r.difficulty}">${r.difficulty}</span>
                      </span>
                    </a>`}).join("")}
                <a href="#/quiz/${e.id}" class="module-lesson-row module-lesson-row--quiz">
                  <span class="module-lesson-row__status">📝</span>
                  <div class="module-lesson-row__info">
                    <span class="module-lesson-row__title">Module Quiz</span>
                    <span class="module-lesson-row__subtitle">20 questions • Test your knowledge</span>
                  </div>
                </a>
              </div>
            </div>`}).join("")}
      </div>
    </div>`,s.scrollTo({top:0,behavior:"smooth"}))}
