/*! fx-omniai-unified.js · v16.18 · 360 design language · Flexito OmniAI "Floating Studio" (desktop) — production palette unchanged
 *
 * ONE file that replaces fx-flow.js + fx-channels.js. Styling and light DOM tagging only:
 * it never clicks product actions (except the existing All Bots list-view choice), never changes data,
 * never touches portal.css, never sets or removes html.in-iframe.
 *
 * v16.18 (25 Oct 2026)
 *   - Second-level menu panel (Integrations etc.) is dark, like the dock: navy panel, light labels, rail-coloured hover, purple active item.
 *     (it was white, which clashed with the product's own dark groups and hid their labels)
 *
 * v16.17 (25 Oct 2026)
 *   - Second-level menu panel (Integrations etc.): groups that kept a dark background hid their labels (dark text on dark).
 *     Any dark background between a menu item and the white panel is now cleared (panelBgJob; restored by off()).
 *
 * v16.16 (22 Oct 2026)
 *   - Login / password-reset pages are left alone: the script no longer restyles them, so the product's own dark login stays as it is.
 *
 * v16.15 (21 Oct 2026)
 *   - The "Ticket API" dialog title reads "Mini-CRM" (renameJob; restored by off()).
 *
 * v16.14 (19 Oct 2026)
 *   - Section headers with a count badge and a chevron (e.g. Orders in the contact panel) stay one row; only a plain
 *     title + status chip is centred as a block.
 *
 * v16.13 (19 Oct 2026)
 *   - Empty states: the product's own "No Data" text no longer shows through; "No contacts" copy only for a table
 *     that is the contacts list itself; compact layout when the empty block is narrow (e.g. the contact side panel).
 *
 * v16.12 (19 Oct 2026)
 *   - Guards that measure the page instead of trusting one layout: text buttons that do not fit their words are
 *     resized to the text (no clipping, no wrapping); a card's title + status chip are centred as one block away
 *     from its button; report wrappers narrower than the page are released and charts re-measure on any resize.
 *   - Buttons next to each other are spaced on the reading side (RTL); Element icon/label spacing, dropdown arrows,
 *     dialog and message-box buttons follow the direction.
 *   - Not-connected channel / integration pages: icon above the name; name, text and button on one centre line.
 *   - No tile behind icons anywhere (channel heroes, report KPIs, Sub Flows, flow-builder nodes and step picker).
 *   - Horizontal menus: tabs and dropdown tabs (e.g. Providers) share one height and one centre line.
 *   - Action-cell text buttons size to their words and match the icon buttons' height; channel tables lose the
 *     broken frame around separated rows.
 *   - Empty tables outside Contacts say "No results" instead of "No contacts found".
 *   - Reports take the full page width; cards wrap instead of squeezing.
 *
 * v16.9 – v16.11 (19 Oct 2026)
 *   - Inbox: rail and list keep full width while there is room; when the chat column runs short (contact panel,
 *     small screen) they shrink first, and below 300px the filter rail steps aside. Resizes re-run the checks.
 *
 * v16.8 (19 Oct 2026)
 *   - Every "generate … by AI" button (e.g. Sub Flows' green "Try Generate Sub Flow by AI") takes the navy "Build with AI" look.
 *
 * v16.7 (19 Oct 2026)
 *   - Inbox: the welcome illustration is visible again; the empty-state copy no longer turns Hebrew on an English UI
 *     (locale is read from the UI chrome only, never from chat content).
 *   - RTL: every custom radius / margin / padding is logical (start/end), so LTR and RTL share one rule set;
 *     Element UI prefix/suffix icons, checkbox labels, table header alignment and dialog close buttons follow the
 *     direction; dates and numbers inside RTL tables keep their LTR order.
 *   - Search fields: any "input + search button" pair is detected on every page and joined into one control
 *     (same height, no gap, rounded only on the outer ends), whatever the markup.
 *   - Action cells: a table cell that holds only buttons / icons lays them out in one centred row, no wrapping;
 *     icon-only buttons share one size (channels, message templates, blocks, any list).
 *   - Split buttons (Open ▾, Move to Done ▾, Send ▾) never break apart.
 *   - Sub Flows: rows wrap by group instead of breaking words; smaller create-folder button that stays on its own
 *     row; the search icon no longer covers the placeholder.
 *   - Inbox conversation: the header stays on one line (name truncates), the contact side panel takes its own
 *     column instead of squeezing the chat, and the left panes give up width before the chat does.
 *   - Fixes: the Connect-a-channel rule hid every heading on the channels page and un-hid product-hidden headings;
 *     cells with buttons were read as contact-name cells; stale "View" label; off() restores the All Bots toggle;
 *     lighter PRO/BETA scan; status chips in tables are not cut.
 *
 * PRODUCTION (later, after approval): in the OmniAI HTML Script add-on, replace the two old tags
 *   <script src="https://cdn.jsdelivr.net/gh/HamedSamii/flexito-flow-ui@…/fx-flow.js"></script>
 *   <script src="https://cdn.jsdelivr.net/gh/HamedSamii/flexito-flow-ui@…/fx-channels.js"></script>
 * with this single tag (pin the commit that contains this file):
 *   <script src="https://cdn.jsdelivr.net/gh/HamedSamii/flexito-flow-ui@COMMIT/fx-omniai-unified.js"></script>
 *
 * CONSOLE PREVIEW (now): paste this whole file into DevTools › Console on omniai.flexito.ai.
 *   It switches the already-loaded old fx scripts off (reversibly) and applies the new design.
 *   A full page reload removes the preview; paste again after a reload.
 *   Pasting it twice in the same page never starts a second copy (it only switches the design back on).
 *
 * COMMANDS
 *   fxOmni.off()     undo / kill switch: removes the design and restores whatever was there before
 *   fxOmni.on()      apply again
 *   fxOmni.info()    current route template, version, embedded or not
 *   fxOmni.check()   self-test for the current page (hidden icons, clipping, overlaps, scope)
 *   ?fx=off or #…fx=off in the URL disables the file entirely (escape hatch)
 */
(function(){
'use strict';
var W=window,D=document,H=D.documentElement;
var VERSION='16.18';
if(W.fxOmni&&W.fxOmni.version){
  if(W.fxOmni.version===VERSION){W.fxOmni.on();return}
  /* a different build is running: switch it off cleanly, then this copy takes over */
  try{W.fxOmni.off()}catch(e){}
  var oldStyle=D.getElementById('fx-omniai-unified');if(oldStyle)oldStyle.parentNode.removeChild(oldStyle);
  try{delete W.fxOmni}catch(e){W.fxOmni=undefined}
}
var urlOff=function(){return /[?&#]fx=off\b/.test(location.href)};
var log=function(){if(W.__fxOmniDebug)console.log.apply(console,['[fxOmni]'].concat([].slice.call(arguments)))};
var rc=function(e){return e.getBoundingClientRect()};
var shown=function(e){if(!e)return false;var r=rc(e);return r.width>2&&r.height>2};

/* Locale/direction are presentation inputs, never routing keys. Functional detection stays DOM-first.
   v16.7: the page language comes from the UI chrome (menus, rails, table headings), never from chat messages
   or a language picker, and a few stray characters can no longer flip it. */
var LOC={t:0,v:'en'};
var localeOf=function(){
  var l=((H.getAttribute('lang')||D.body&&D.body.getAttribute('lang')||'')+'').toLowerCase();
  if(/^(he|iw)\b/.test(l))return 'he';
  if(/^ar\b/.test(l))return 'ar';
  if(Date.now()-LOC.t<2000)return LOC.v;
  LOC.t=Date.now();
  var sample='';
  try{[].forEach.call(D.querySelectorAll('nav.navbar-spark,#team-aside,#flowbuilder-aside,aside.el-aside .el-menu,.df-sidebar,.filter-border-b,#spark-app thead'),function(e){if(sample.length<6000)sample+=' '+(e.innerText||e.textContent||'')})}catch(e){}
  var he=(sample.match(/[\u0590-\u05FF]/g)||[]).length,ar=(sample.match(/[\u0600-\u06FF]/g)||[]).length;
  LOC.v=(he>20&&he>ar)?'he':(ar>20&&ar>he)?'ar':'en';
  return LOC.v;
};
var rtlOf=function(){
  try{return ((D.body&&getComputedStyle(D.body).direction)||getComputedStyle(H).direction)==='rtl'}catch(e){return H.dir==='rtl'}
};
var UI_RX={
  send:/^(send|إرسال|ارسال|שלח)$/i,
  note:/^(note|ملاحظة|הערה)$/i,
  noteField:/leave a note|note for your teammates|reminder for yourself|اترك ملاحظة|ملاحظة لزملائك|تذكير لنفسك|השאר הערה|הערה לחברי הצוות|תזכורת לעצמך/i,
  heads:/^(status|assigned agent|agent groups?|channels?|labels?|tags?|bots?|teams?|pipelines?|الحالة|الوكيل المعين|الوكلاء المعينون|مجموعات الوكلاء|القنوات|التصنيفات|التسميات|الوسوم|البوتات|الفرق|خطوط المبيعات|סטטוס|מצב|סוכן מוקצה|סוכנים מוקצים|קבוצות סוכנים|ערוצים|תוויות|תגיות|בוטים|צוותים|פייפליינים)$/i,
  starred:/^(starred|المميزة|المفضلة|מסומן בכוכב|מועדפים)$/i,
  empty:/^(no chats|no data|no conversations?|no contacts?|لا توجد محادثات|لا توجد بيانات|لا توجد جهات اتصال|אין צ'אטים|אין שיחות|אין נתונים|אין אנשי קשר)$/i,
  welcome:/^(welcome to |مرحب[اأ] بك في |ברוכים הבאים ל)/i,
  avatar:/^(avatar|الصورة|الصورة الرمزية|אווטאר|תמונה)$/i,
  connect:/^(connect a channel|ربط قناة|اربط قناة|חיבור ערוץ|חבר ערוץ)$/i
};
var statusKey=function(v){
  var t=(v||'').replace(/[\d,.\s]+$/,'').trim().toLowerCase();
  if(/^(open|مفتوح|פתוח)\b/.test(t))return 'open';
  if(/^(pending|معلق|قيد الانتظار|ממתין|בהמתנה)\b/.test(t))return 'pending';
  if(/^(done|closed|resolved|تم|مكتمل|مغلق|تم الحل|הושלם|סגור|נפתר)\b/.test(t))return 'done';
  if(/^(spam|invalid|مزعج|غير صالح|ספאם|לא תקין)\b/.test(t))return 'spam';
  if(/^(snoozed|مؤجل|נודנם|מושהה)\b/.test(t))return 'snoozed';
  if(/^(unsubscribed|غير مشترك|בוטל מנוי|לא רשום)\b/.test(t))return 'unsub';
  if(/^(all|الكل|הכל)\b/.test(t))return 'all';
  return 'other';
};

/* ===================================================================================== */
/* 1. SCOPES                                                                              */
/* ===================================================================================== */
/* doubled ID: outranks the tenant theme (portal.css + dashboard-theme-custom) without touching it */
var P='html.fxo body #spark-app#spark-app';
var PG=function(pages){return pages.split(',').map(function(p){return 'html.fxo[data-fxo-page='+p+'] body #spark-app#spark-app'})};
var sel=function(pages,rest){return PG(pages).map(function(p){return p+' '+rest}).join(',')};

/* tiny CSS rewriter used to re-scope and re-colour the earlier modules' rules */
var rewrite=function(css,mapSel,mapDecl){
  css=css.replace(/\/\*[\s\S]*?\*\//g,'');
  var out='',i=0,n=css.length;
  while(i<n){
    var o=css.indexOf('{',i);if(o<0)break;
    var head=css.slice(i,o).trim();
    if(head.charAt(0)==='@'){var d=1,j=o+1;while(j<n&&d){if(css[j]==='{')d++;else if(css[j]==='}')d--;j++}out+=head+css.slice(o,j)+'\n';i=j;continue}
    var c=css.indexOf('}',o);if(c<0)break;
    var body=css.slice(o+1,c);i=c+1;
    if(!head)continue;
    var parts=[],depth=0,cur='';
    for(var k=0;k<head.length;k++){var ch=head[k];if(ch==='(')depth++;if(ch===')')depth--;if(ch===','&&!depth){parts.push(cur);cur=''}else cur+=ch}
    parts.push(cur);
    var mapped=[];
    parts.forEach(function(s){s=s.trim();if(!s)return;var r=mapSel(s);if(r)mapped.push(r)});
    if(!mapped.length)continue;
    out+=mapped.join(',')+'{'+(mapDecl?mapDecl(body,mapped.join(',')):body)+'}\n';
  }
  return out;
};
/* mint → Midnight Studio violet (actions), neutral surfaces for soft fills */
var recolor=function(b){return b};   /* product colours are kept as they are (no palette swap) */

/* ===================================================================================== */
/* 2. DESIGN TOKENS + COMPONENTS (every page)                                             */
/* ===================================================================================== */
var TOKENS=`
html.fxo{
  /* Concept C · Floating Studio. Every value below is a colour production OmniAI already uses (read live 5 Oct 2026). */
  --fxo-bg:#EDF0F2;--fxo-page:#F7FAFF;--fxo-surface:#FFFFFF;--fxo-surface-2:#F7FAFF;--fxo-hover:#F9FAFC;
  --fxo-border:#E6EAF2;--fxo-divider:#EEF1F6;
  --fxo-ink:#0A0E1A;--fxo-ink-2:#28303D;--fxo-ink-3:#7F848D;--fxo-ink-4:#49545A;
  --fxo-nav:#1B2137;--fxo-rail:#2C334C;--fxo-nav-ink:#FFFFFF;--fxo-nav-ink-2:#A0A8B5;
  --fxo-brand:#A684FF;--fxo-live:#24E4BB;
  --fxo-primary:#A684FF;--fxo-primary-hover:#8F66F2;--fxo-primary-soft:#F6F2FF;--fxo-primary-ink:#6D4AE0;
  --fxo-success:#057A5E;--fxo-success-ui:#24E4BB;--fxo-success-soft:#E9FCF8;
  --fxo-warning:#C2570C;--fxo-warning-soft:#FEF3ED;
  --fxo-danger:#D63A3D;--fxo-danger-ui:#FE4E51;--fxo-danger-soft:#FFECEC;--fxo-danger-line:#FFECEC;
  --fxo-info:#2F6FD1;--fxo-info-soft:#EDF5FF;
  --fxo-focus:0 0 0 3px rgba(36,228,187,.2);
  --fxo-e0:0 1px 2px #E6ECF0;--fxo-e1:0 18px 34px -22px #1B2137;--fxo-e2:0 30px 60px -30px #1B2137;
  --fxo-r-sm:8px;--fxo-r-md:12px;--fxo-r-lg:22px;--fxo-r-xl:24px;
  --fxo-gr:12px;
  --fxo-font:Heebo,'Segoe UI',system-ui,sans-serif;
  --fxo-clock:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='9'/%3E%3Cpath d='M12 7v5l3 2'/%3E%3C/svg%3E");
  /* the earlier flow-builder rules read these names */
  --fx-mint:#24E4BB;--fx-mint-hover:#1DD3AB;--fx-mint-ink:#04241D;--fx-mint-soft:#E7FBF6;--fx-ink:#0A0E1A;--fx-label:#7F848D;--fx-line:#E6EAF2;--fx-divider:#EEF1F6;--fx-chip:#EEF2F9;--fx-off:#D7DEEA;--fx-green:#057A5E;--fx-font:Heebo,'Segoe UI',system-ui,sans-serif
}
html.fxo body{background:#EDF0F2!important}
@keyframes fxoIn{from{opacity:0;transform:translateY(6px) scale(.99)}to{opacity:1;transform:none}}
@keyframes fxoPulse{50%{box-shadow:0 0 0 7px #E9FCF8}}
@media (prefers-reduced-motion:reduce){html.fxo *{animation:none!important;transition:none!important}}`;

var I18N_CSS=`
html.fxo{
  --fxo-copy-connected:"Connected";
  --fxo-copy-folders:"Folders";
  --fxo-copy-build-ai:"Build with AI";
  --fxo-copy-no-data:"No data for this period";
  --fxo-copy-view:"View";
  --fxo-copy-empty-list:"No conversations here";
  --fxo-copy-empty-list-help:"Conversations that match these filters appear here. Try another status, or clear the search.";
  --fxo-copy-empty-table:"No contacts found";
  --fxo-copy-empty-table-help:"Search by name, phone or email, or change the filters.";
  --fxo-copy-empty-none:"No results";
  --fxo-copy-empty-none-help:"Nothing matches here yet. Try another search or change the filters.";
  --fxo-copy-no-conversation:"No conversation selected. Choose one from the list to read and reply."
}
html.fxo[data-fxo-locale=ar]{
  --fxo-copy-connected:"متصل";
  --fxo-copy-folders:"المجلدات";
  --fxo-copy-build-ai:"إنشاء بالذكاء الاصطناعي";
  --fxo-copy-no-data:"لا توجد بيانات لهذه الفترة";
  --fxo-copy-view:"عرض";
  --fxo-copy-empty-list:"لا توجد محادثات هنا";
  --fxo-copy-empty-list-help:"ستظهر هنا المحادثات المطابقة للفلاتر. غيّر الحالة أو امسح البحث.";
  --fxo-copy-empty-table:"لا توجد جهات اتصال";
  --fxo-copy-empty-table-help:"ابحث بالاسم أو الهاتف أو البريد الإلكتروني، أو غيّر الفلاتر.";
  --fxo-copy-empty-none:"لا توجد نتائج";
  --fxo-copy-empty-none-help:"لا يوجد ما يطابق هنا بعد. جرّب بحثًا آخر أو غيّر الفلاتر.";
  --fxo-copy-no-conversation:"لم يتم تحديد محادثة. اختر محادثة من القائمة للقراءة والرد."
}
html.fxo[data-fxo-locale=he]{
  --fxo-copy-connected:"מחובר";
  --fxo-copy-folders:"תיקיות";
  --fxo-copy-build-ai:"יצירה עם AI";
  --fxo-copy-no-data:"אין נתונים לתקופה זו";
  --fxo-copy-view:"תצוגה";
  --fxo-copy-empty-list:"אין שיחות כאן";
  --fxo-copy-empty-list-help:"שיחות התואמות למסננים יופיעו כאן. נסה סטטוס אחר או נקה את החיפוש.";
  --fxo-copy-empty-table:"לא נמצאו אנשי קשר";
  --fxo-copy-empty-table-help:"חפש לפי שם, טלפון או אימייל, או שנה את המסננים.";
  --fxo-copy-empty-none:"לא נמצאו תוצאות";
  --fxo-copy-empty-none-help:"אין כאן עדיין התאמות. נסה חיפוש אחר או שנה את המסננים.";
  --fxo-copy-no-conversation:"לא נבחרה שיחה. בחר שיחה מהרשימה כדי לקרוא ולהשיב."
}
/* v16.7: per-direction radius overrides removed; DESIGN uses logical (start/end) properties for both directions. */

/* v16.6: final direction guard. These rules intentionally live in I18N_CSS, which is appended last. */
html.fxo.fxo-rtl body #spark-app#spark-app :is(.el-table__body,table.table tbody) tr>td:not(:first-child):not(:last-child){border-radius:0!important;box-shadow:none!important}
html.fxo.fxo-rtl body #spark-app#spark-app .el-table:not(:has(.el-table__fixed,.el-table__fixed-right)) .el-table__body{border-spacing:0 8px!important}
html.fxo.fxo-rtl body #spark-app#spark-app :is(.el-table,table.table) tr>td{background-clip:padding-box!important}
html.fxo.fxo-rtl body #spark-app#spark-app :is(.el-table,table.table) :is(th,td)>.cell{direction:inherit}
`;

/* S = page scope. Written once, expanded by scopeS(). */
var DESIGN=`
S{font-family:var(--fxo-font);color:var(--fxo-ink-2)}
S main.team-main,S .modalContainer,S #team-main,S main.el-main,S main#flowbuilder-main,S .el-container{background:var(--fxo-bg)!important}
S *{scrollbar-width:thin;scrollbar-color:#C9D3E3 transparent}

/* ---- top bar: same navy, links become pills ---- */
S nav.navbar-spark{background:var(--fxo-nav)!important;border:0!important;box-shadow:none!important}
S nav.navbar-spark .nav-link{border-radius:999px;padding:6px 14px!important;transition:background .15s,color .15s}
S nav.navbar-spark .nav-link:hover{background:var(--fxo-rail)}

/* ---- the rail becomes a floating dock ---- */
S .el-aside-wrapper{padding-block:10px;padding-inline:10px 0;box-sizing:content-box;background:transparent!important}
S #team-aside,S #flowbuilder-aside{background:var(--fxo-nav)!important;border:0!important;border-radius:22px!important;height:100%!important;box-shadow:var(--fxo-e1);overflow:hidden}
S #flowbuilder-aside>.el-scrollbar,S #flowbuilder-aside>.el-menu{padding-top:8px!important;box-sizing:border-box}
S #team-aside .el-scrollbar,S #flowbuilder-aside .el-scrollbar,S #team-aside .el-menu,S #flowbuilder-aside .el-menu{background:transparent!important;border-inline-end:0!important}
S #team-aside .el-menu-item,S #flowbuilder-aside .el-menu-item,S #team-aside .el-submenu__title,S #flowbuilder-aside .el-submenu__title{background:transparent!important;border-radius:14px!important;transition:background .15s}
S #team-aside .el-menu-item>i,S #flowbuilder-aside .el-menu-item>i,S #team-aside .el-submenu__title>i,S #flowbuilder-aside .el-submenu__title>i{transition:transform .15s}
S #team-aside .el-menu-item:hover,S #flowbuilder-aside .el-menu-item:hover,S #team-aside .el-submenu__title:hover,S #flowbuilder-aside .el-submenu__title:hover{background:var(--fxo-rail)!important}
S #team-aside .el-menu-item:hover>i,S #flowbuilder-aside .el-menu-item:hover>i{transform:scale(1.08)}
S #team-aside .el-menu-item.is-active,S #flowbuilder-aside .el-menu-item.is-active{background:var(--fxo-primary)!important;box-shadow:none}
S #team-aside .el-menu-item.is-active,S #team-aside .el-menu-item.is-active *,S #flowbuilder-aside .el-menu-item.is-active,S #flowbuilder-aside .el-menu-item.is-active *{color:#FFFFFF!important}
/* collapsed dock: section titles were clipped fragments; they become thin separators (full titles return when the rail is expanded) */
S aside.aside-collapsed .sidebar-section-title{font-size:0!important;height:1px!important;padding:0!important;margin:8px 14px!important;background:var(--fxo-rail)!important;overflow:hidden}
S aside.aside-collapsed .pro-badge{visibility:hidden!important}
S aside:not(.aside-collapsed) .pro-badge{display:inline-flex!important;gap:4px;align-items:center}
S aside:not(.aside-collapsed) .pro-badge .badge,S #team-aside:not(.aside-collapsed) .badge.badge-primary,S #flowbuilder-aside:not(.aside-collapsed) .badge.badge-primary{position:static!important;background:#A684FF!important;color:#FFFFFF!important;font-size:11px!important;padding:2px 6px!important;border-radius:6px!important}
S button.sidebar-collapse{background:transparent!important;border:0!important;color:var(--fxo-nav-ink-2)!important}

/* ---- second-level menu: a floating dark panel (same navy as the dock) ---- */
S aside.el-aside.bg-transparent.border-light{background:var(--fxo-nav)!important;border:0!important;border-radius:22px!important;margin-block:10px!important;margin-inline:10px 0!important;height:calc(100% - 20px)!important;box-shadow:var(--fxo-e1)!important}
S aside.el-aside.bg-transparent.border-light .el-menu{background:transparent!important;border-inline-end:0!important;padding:14px 10px!important}
S aside.el-aside.bg-transparent.border-light .el-menu-item,S aside.el-aside.bg-transparent.border-light .el-submenu__title{height:40px!important;line-height:40px!important;padding:0 12px!important;margin:2px 0!important;border-radius:12px!important;font-size:14px!important;font-weight:500!important;color:var(--fxo-nav-ink)!important;background:transparent!important;display:flex!important;align-items:center;gap:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:background .15s,color .15s}
S aside.el-aside.bg-transparent.border-light .el-submenu .el-menu-item{padding-inline-start:18px!important;min-width:0!important}
S aside.el-aside.bg-transparent.border-light .el-submenu__title{font-size:12px!important;font-weight:700!important;color:var(--fxo-nav-ink-2)!important;height:32px!important;line-height:32px!important}
S aside.el-aside.bg-transparent.border-light .el-submenu__icon-arrow{position:static!important;margin:0!important;margin-inline-start:auto!important;color:var(--fxo-nav-ink-2)!important}
S aside.el-aside.bg-transparent.border-light .el-menu-item:hover{background:var(--fxo-rail)!important;color:var(--fxo-nav-ink)!important}
S aside.el-aside.bg-transparent.border-light .el-menu-item.is-active{background:var(--fxo-primary)!important;color:#FFFFFF!important;font-weight:700!important;box-shadow:none!important}
S aside.el-aside.bg-transparent.border-light .el-menu-item>span,S aside.el-aside.bg-transparent.border-light .el-menu-item>div{color:inherit!important;overflow:hidden;text-overflow:ellipsis}
S aside.el-aside.bg-transparent.border-light .el-menu-item>i,S aside.el-aside.bg-transparent.border-light .el-menu-item>img,S aside.el-aside.bg-transparent.border-light .el-menu-item>.svg-icon,S aside.el-aside.bg-transparent.border-light .el-menu-item>span>i:first-child{flex:none;width:18px!important;height:18px!important;min-width:18px;margin:0!important;font-size:16px!important;line-height:18px!important;text-align:center;color:inherit!important;background-size:contain!important;background-position:center!important;background-repeat:no-repeat!important}

/* ---- content: a canvas with display titles ---- */
S #team-main .p-3:not(.el-card *):not(.card *):not(.df-sidebar *):not(.rooms-container *):not(.col-messages *),S main.el-main.p-3{padding:24px 28px!important}
S .text-muted{color:var(--fxo-ink-3)!important}

/* ---- cards: borderless white panels, 22px corners, soft entrance ---- */
S .el-card,S .card,S .content-card{background:var(--fxo-surface)!important;border:0!important;border-image:none!important;border-radius:22px!important;box-shadow:var(--fxo-e0)!important;outline:0!important;color:var(--fxo-ink-2);animation:fxoIn .35s ease both}
S .el-card::before,S .el-card::after{display:none!important}
S .el-card__header,S .card-header{padding:18px 22px!important;border-bottom:1px solid var(--fxo-divider)!important;font-size:16px!important;font-weight:800!important;color:var(--fxo-ink)!important;background:transparent!important}
S .el-card__body{padding:22px!important}
/* ---- settings forms: each labelled setting row floats as its own card ---- */
S main.el-main .el-row:has(>.el-col>.font-weight-bold.font-big):not(.el-card *):not(.el-dialog *):not(.card *){background:var(--fxo-surface);border-radius:22px;padding:22px 14px;margin:0 0 14px!important;box-shadow:var(--fxo-e0);animation:fxoIn .35s ease both}
S main.el-main .border-top.my-5:not(.el-card *):not(.el-dialog *):not(.card *){border-top:0!important;margin:0!important}
S .el-card .el-card{box-shadow:none!important;border:1px solid var(--fxo-divider)!important;border-radius:16px!important;animation:none}

/* ---- buttons: 12px corners, contained labels (colours stay the product's) ---- */
S .el-button{display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;box-sizing:border-box;font-family:var(--fxo-font)!important;font-size:14px!important;font-weight:700!important;border-radius:12px!important;height:auto;min-height:38px;padding:8px 16px!important;line-height:20px!important;max-width:100%;transition:background .15s,border-color .15s,color .15s,box-shadow .15s,transform .15s}
S .el-button:not(.is-disabled):active{transform:translateY(1px)}
S .el-button.p-2{padding:8px!important;min-height:0}
S .el-button.p-1{padding:4px!important;min-height:0}
S .el-button.p-0{padding:0!important;min-height:0}
S .el-button--primary:not(.is-disabled):hover,S .el-button--danger:not(.is-disabled):hover,S .el-button--success:not(.is-disabled):hover{box-shadow:var(--fxo-e1)}
S .el-button>span{display:inline-flex;align-items:center;gap:6px}
S .el-button--small{min-height:32px;padding:5px 12px!important;font-size:13px!important;border-radius:10px!important}
S .el-button--mini{min-height:28px;padding:3px 10px!important;font-size:12px!important;border-radius:8px!important}
S .el-button--large{min-height:44px;padding:10px 20px!important}
S .el-button.is-circle{width:36px;min-height:36px;height:36px;padding:0!important;border-radius:12px!important}
S .el-input-group__append .el-button,S .el-input-group__prepend .el-button{min-height:38px;border:0!important;background:transparent!important;margin:0!important}
S .el-button.is-round{border-radius:999px!important}
S .el-button.is-disabled,S .el-button.is-disabled:hover{opacity:.45!important;cursor:not-allowed!important}
S .el-button:focus-visible{box-shadow:var(--fxo-focus)!important;outline:0}
S .el-button-group{display:inline-flex!important}
S .el-button-group>.el-button{float:none!important;border-radius:0!important}
S .el-button-group>.el-button:first-child{border-start-start-radius:12px!important;border-end-start-radius:12px!important}
S .el-button-group>.el-button:last-child{border-start-end-radius:12px!important;border-end-end-radius:12px!important}
S .btn{border-radius:12px!important;font-weight:700!important}

/* ---- inputs: soft filled fields ---- */
S .el-input__inner,S .el-textarea__inner,S .form-control{font-family:var(--fxo-font)!important;font-size:14px!important;color:var(--fxo-ink)!important;border:1px solid var(--fxo-border)!important;border-radius:12px!important;background:var(--fxo-surface-2)!important;box-shadow:none!important;transition:background .15s,border-color .15s,box-shadow .15s}
S .el-input:not(.el-input--small):not(.el-input--mini) .el-input__inner{height:40px!important;line-height:40px!important}
S .el-input--small .el-input__inner{height:34px!important;line-height:34px!important}
S .el-input__inner:hover,S .el-textarea__inner:hover{border-color:#C9D3E3!important}
S .el-input__inner:focus,S .el-textarea__inner:focus,S .form-control:focus{background:var(--fxo-surface)!important}
S .el-input.is-disabled .el-input__inner{background:var(--fxo-divider)!important;color:var(--fxo-ink-3)!important}
S .el-input-group__append,S .el-input-group__prepend{background:var(--fxo-surface)!important;border-color:var(--fxo-border)!important;color:var(--fxo-ink-2)!important}
S .el-input-group__append{border-radius:0!important;border-start-end-radius:12px!important;border-end-end-radius:12px!important}
S .el-input-group__prepend{border-radius:0!important;border-start-start-radius:12px!important;border-end-start-radius:12px!important}
S .el-input-group--append .el-input__inner{border-radius:0!important;border-start-start-radius:12px!important;border-end-start-radius:12px!important}
S .el-input-group--prepend .el-input__inner{border-radius:0!important;border-start-end-radius:12px!important;border-end-end-radius:12px!important}
/* search field + button pairs: see sqJob / FIX_CSS (any markup, both directions) */

/* ---- forms ---- */
S .el-form-item{margin-bottom:20px!important}
S .el-form-item__label{font-size:13px!important;font-weight:700!important;color:var(--fxo-ink-2)!important;line-height:20px!important;padding-bottom:6px!important}
S .el-form-item__error{color:var(--fxo-danger)!important}
S .el-form-item__content:has(> .el-button--primary):has(> .el-button--danger.pull-right){display:flex!important;align-items:center;gap:8px;max-width:720px}
S .el-form-item__content:has(> .el-button--primary):has(> .el-button--danger.pull-right)>.el-button--danger.pull-right{float:none!important;order:-1;margin:0!important;margin-inline-end:auto!important}
S .el-form-item__content:has(> .el-button--primary):has(> .el-button--danger.pull-right)>.el-button--primary{order:2;margin:0!important}

/* ---- checks, switches, segmented radio groups ---- */
S .el-checkbox__inner{border-radius:6px!important;border-color:#C9D3E3!important}
S .el-checkbox__label,S .el-radio__label{font-size:14px!important}
S .el-radio-group:has(.el-radio-button){background:var(--fxo-surface);border-radius:999px;padding:4px;display:inline-flex;gap:2px;box-shadow:var(--fxo-e0)}
S .el-radio-button__inner{font-weight:700!important;border:0!important;border-radius:999px!important;background:transparent!important;color:var(--fxo-ink-4)!important;box-shadow:none!important;transition:background .15s,color .15s}
S .el-radio-button__orig-radio:checked+.el-radio-button__inner{background:var(--fxo-nav)!important;color:#FFFFFF!important}

/* ---- tabs: underline tabs keep the product bar; menu tabs become segmented pills ---- */
S .el-tabs__nav-wrap::after{height:1px!important;background:var(--fxo-border)!important}
S .el-tabs__item{font-size:14px!important;font-weight:700!important;color:var(--fxo-ink-3)!important;height:44px!important;line-height:44px!important}
S .el-tabs__item:hover,S .el-tabs__item.is-active{color:var(--fxo-ink)!important}
S ul.el-menu--horizontal.el-menu{display:inline-flex!important;flex-wrap:wrap;gap:2px;background:var(--fxo-surface)!important;border:0!important;border-radius:999px!important;padding:4px!important;box-shadow:var(--fxo-e0);margin-bottom:16px}
S ul.el-menu--horizontal.el-menu::before,S ul.el-menu--horizontal.el-menu::after{display:none!important}
S ul.el-menu--horizontal.el-menu>li.el-menu-item{float:none!important;height:38px!important;line-height:38px!important;padding:0 16px!important;font-size:14px!important;font-weight:700!important;color:var(--fxo-ink-4)!important;border:0!important;border-radius:999px!important;background:transparent!important;transition:background .15s,color .15s}
S ul.el-menu--horizontal.el-menu>li.el-menu-item i{color:inherit!important}
S ul.el-menu--horizontal.el-menu>li.el-menu-item:hover{color:var(--fxo-ink)!important;background:var(--fxo-hover)!important}
S ul.el-menu--horizontal.el-menu>li.el-menu-item.is-active{color:#FFFFFF!important;background:var(--fxo-nav)!important}
S ul.el-menu--horizontal.el-menu>li.el-menu-item{display:inline-flex!important;align-items:center!important;gap:6px}
S ul.el-menu--horizontal.el-menu>li.el-menu-item>*:not(.el-tooltip){display:inline-flex!important;align-items:center!important;gap:6px}
S ul.el-menu--horizontal.el-menu>li:is(.el-menu-item,.el-submenu) i{margin:0!important;vertical-align:middle!important;font-size:14px!important;line-height:1!important}
S ul.el-menu--horizontal.el-menu>li.el-submenu{float:none!important;height:38px!important;border:0!important;background:transparent!important;display:inline-flex!important;align-items:center}
S ul.el-menu--horizontal.el-menu>li.el-submenu>.el-submenu__title{display:inline-flex!important;align-items:center!important;gap:6px;height:38px!important;line-height:38px!important;padding:0 16px!important;border:0!important;border-radius:999px!important;font-size:14px!important;font-weight:700!important;color:var(--fxo-ink-4)!important;background:transparent!important}
S ul.el-menu--horizontal.el-menu>li.el-submenu>.el-submenu__title:hover{background:var(--fxo-hover)!important;color:var(--fxo-ink)!important}
S ul.el-menu--horizontal.el-menu>li.el-submenu.is-active>.el-submenu__title{background:var(--fxo-nav)!important;color:#FFFFFF!important}
S ul.el-menu--horizontal.el-menu>li.el-submenu .el-submenu__icon-arrow{position:static!important;margin:0!important;transform:none}
S ul.el-menu--horizontal.el-menu>li.el-menu-item>:is(span,a,div){background:transparent!important;color:inherit!important;box-shadow:none!important}

/* ---- tables: rows become floating row cards (tables with fixed columns stay one card) ---- */
S .el-table{font-size:14px!important;color:var(--fxo-ink-2)!important}
S .el-table:not(:has(.el-table__fixed,.el-table__fixed-right)){background:transparent!important;border:0!important;overflow:visible}
S .el-table:not(:has(.el-table__fixed,.el-table__fixed-right)) tr,S .el-table:not(:has(.el-table__fixed,.el-table__fixed-right)) .el-table__header-wrapper,S .el-table:not(:has(.el-table__fixed,.el-table__fixed-right)) .el-table__body-wrapper{background:transparent!important}
S .el-table:not(:has(.el-table__fixed,.el-table__fixed-right)) .el-table__body{border-collapse:separate!important;border-spacing:0 8px!important}
S .el-table:not(:has(.el-table__fixed,.el-table__fixed-right)) td{background:var(--fxo-surface)!important;border:0!important;border-radius:0!important;box-shadow:none!important;background-clip:padding-box!important;padding:14px 0!important;transition:background .15s}
S .el-table:not(:has(.el-table__fixed,.el-table__fixed-right)) td:first-child{border-radius:0!important;border-start-start-radius:16px!important;border-end-start-radius:16px!important}
S .el-table:not(:has(.el-table__fixed,.el-table__fixed-right)) td:last-child{border-radius:0!important;border-start-end-radius:16px!important;border-end-end-radius:16px!important}
S .el-table:not(:has(.el-table__fixed,.el-table__fixed-right)) .el-table__body tr:hover>td{background:var(--fxo-hover)!important}
S .el-table:not(:has(.el-table__fixed,.el-table__fixed-right)) .el-table__empty-block{background:var(--fxo-surface);border-radius:16px}
S .el-table:has(.el-table__fixed,.el-table__fixed-right){border:0!important;border-radius:22px!important;overflow:hidden;box-shadow:var(--fxo-e0)}
S .el-table:has(.el-table__fixed,.el-table__fixed-right) td{border-bottom:1px solid var(--fxo-divider)!important;padding:12px 0!important}
S .el-table::before,S .el-table::after,S .el-table--border::after,S .el-table--group::after{display:none!important}
S .el-table th,S .el-table th.el-table__cell,S .el-table thead th{background:transparent!important;color:var(--fxo-ink-3)!important;font-size:12px!important;font-weight:700!important;text-transform:none!important;letter-spacing:0!important;border:0!important;padding:6px 0!important}
S .el-table:has(.el-table__fixed,.el-table__fixed-right) th{background:var(--fxo-surface-2)!important}
S .el-table th .cell{white-space:normal!important;line-height:18px!important;word-break:normal!important;overflow-wrap:normal!important}
S .el-table .cell{line-height:20px!important;word-break:normal!important;overflow-wrap:normal!important}
S .el-table .cell .el-tag,S .el-table .cell .el-button{white-space:nowrap}
S .el-table__empty-text{color:var(--fxo-ink-3)!important;font-size:14px!important}
S .el-table__fixed,S .el-table__fixed-right{box-shadow:none!important}
S table.table th{font-size:12px!important;font-weight:700!important;color:var(--fxo-ink-3)!important;text-transform:none!important}
S table.table tbody td{font-size:14px;border-radius:0!important;box-shadow:none!important;background-clip:padding-box!important}
S table.table tbody td:first-child{border-start-start-radius:16px!important;border-end-start-radius:16px!important}
S table.table tbody td:last-child{border-start-end-radius:16px!important;border-end-end-radius:16px!important}

/* ---- tags, badges: pills ---- */
S .el-tag{height:24px!important;line-height:22px!important;padding:0 10px!important;border-radius:999px!important;font-size:12px!important;font-weight:700!important}
S .badge{border-radius:999px!important;font-size:12px!important;font-weight:700!important}

/* ---- pagination ---- */
S .el-pagination .el-pager li,S .el-pagination button{min-width:34px!important;height:34px!important;line-height:34px!important;border-radius:999px!important;font-size:14px!important;background:transparent!important;color:var(--fxo-ink-2)!important}
S .el-pagination__total{font-size:14px!important;color:var(--fxo-ink-3)!important}

/* ---- alerts ---- */
S .alert,S .el-alert{border-radius:16px!important;border:0!important;font-size:14px!important;line-height:20px!important}

/* ---- dialogs: frame only, position untouched (Persona stays centred) ---- */
S .el-dialog{border-radius:24px!important;box-shadow:var(--fxo-e2)!important;overflow:hidden}
S .el-dialog.is-fullscreen{border-radius:0!important;box-shadow:none!important}
S .el-dialog__header{padding:22px 26px!important;border-bottom:1px solid var(--fxo-divider)!important}
S .el-dialog__title{font-size:20px!important;font-weight:800!important;color:var(--fxo-ink)!important}
S .el-dialog__body{padding:24px 26px!important;color:var(--fxo-ink-2)!important;font-size:14px}
S .el-dialog__footer{padding:16px 26px!important;border-top:1px solid var(--fxo-divider)!important}
S .modal-content{border-radius:24px!important;border:0!important;box-shadow:var(--fxo-e2)!important}
S .dropdown-menu{border:0!important;border-radius:16px!important;box-shadow:var(--fxo-e1)!important;padding:6px!important;font-size:14px}
S .dropdown-menu .dropdown-item{border-radius:10px;color:var(--fxo-ink-2)!important}
S .dropdown-menu .dropdown-item:hover{background:var(--fxo-hover)!important;color:var(--fxo-ink)!important}

/* ---- hidden-content fixes (tenant rules that hide real content; decisions of 4 Oct 2026) ---- */
S ul.el-menu--horizontal.el-menu>li.el-menu-item:nth-child(7){display:inline-flex!important;visibility:visible!important}
S .badge.badge-primary,S .pro-badge .badge{background:#A684FF!important;color:#FFFFFF!important}
S .el-table td:last-child .el-tooltip,S .el-table .cell:has(> .el-switch)>.el-tooltip{display:inline-flex!important}
S .el-button--text{min-height:0;padding:0 2px!important;border:0!important;background:transparent!important}

/* ---- scrolling / clipping ---- */
S .el-scrollbar__bar.is-horizontal{height:8px!important}
S .el-scrollbar__thumb{background:#C9D3E3!important}
S .kanban-column{border-radius:22px!important}
S .el-scrollbar:has(.kanban-column)>.el-scrollbar__bar.is-horizontal{opacity:1!important}
S .fx-page{box-sizing:border-box!important;max-width:100%!important}
S .el-dialog.is-fullscreen{overflow-y:auto!important;overscroll-behavior-y:contain}
`;

/* ---- route templates ---- */
var TEMPLATES=function(){
  var C=function(p,r){return sel(p,r)};
  var HERO='channel,oauth';
  var hc='#team-main .p-3>div:not(.fxo-detail)>.content-card:first-child';
  var LC='#team-main .p-3>div>.content-card';
  return [
  /* hero / not-connected channel + OAuth integration pages: icon tile, display title, one CTA */
  C(HERO,hc)+'{text-align:center;padding:12px 0}',
  C(HERO,hc+' .el-card__header')+','+C(HERO,hc+' .card-header')+'{border:0!important;padding:40px 24px 8px!important;font-size:36px!important;line-height:42px!important;font-weight:900!important;letter-spacing:-.02em;color:var(--fxo-ink)!important}',
  C(HERO,hc+' i.svg-icon:not(button *):not(.el-button *)')+'{display:inline-block!important;width:64px!important;height:64px!important;background-color:transparent!important;border-radius:0;box-shadow:none!important;background-size:contain!important;background-repeat:no-repeat!important;background-position:center!important;vertical-align:middle;margin:0!important}',
  C(HERO,hc+' :is(.el-card__header,.card-header)')+','+C(HERO,hc+' :is(.el-card__header,.card-header)>div:only-child')+'{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:14px!important;text-align:center!important}',
  C(HERO,hc+' .el-card__body')+'{padding:8px 24px 40px!important;font-size:16px;line-height:26px;color:var(--fxo-ink-4)}',
  C(HERO,hc+' .card-body>div')+'{display:flex!important;flex-direction:column;align-items:center;gap:18px}',
  C(HERO,hc+' .card-body>div>*')+'{margin:0!important}',
  C(HERO,hc+' :is(button,.el-button) i.svg-icon')+'{background-color:transparent!important;box-shadow:none!important;border-radius:0!important}',   /* CTA icons (e.g. Team Group "Open Chat") stay bare, no white tile */
  C(HERO,hc+' .el-button--primary')+'{min-height:46px;padding:0 26px!important;font-size:15px!important;border-radius:999px!important}',
  /* OmniAI 360 launcher (v12): compact hero with the CTA on the right, a channel summary line,
     connected channels first, explicit status chips, even tiles with a footer action row */
  /* v16.1 · hero in the Design Book shape: flat white page heading with the purple crown; the actions sit in normal flow
     under the description (one or several, each with its own help line), so nothing overlaps or spills out of the card */
  C('launcher',LC+':nth-child(1)')+'{display:block!important;position:relative!important;text-align:start;background:#FFFFFF!important;color:#1B2137!important;margin-bottom:24px!important;padding:19px 20px 16px!important;border:0!important;border-radius:4px!important;box-shadow:inset 0 3px 0 #A684FF,0 12px 36px -28px rgba(27,33,55,.18)!important;min-height:0;height:auto!important;max-height:none!important;overflow:visible!important}',
  C('launcher',LC+':nth-child(1) .el-card__header')+'{border:0!important;padding:0!important;font-size:20px!important;line-height:26px!important;font-weight:700!important;letter-spacing:0;color:#1B2137!important;background:transparent!important}',
  C('launcher',LC+':nth-child(1) .el-card__header>div')+'{display:flex;align-items:center;gap:10px}',
  C('launcher',LC+':nth-child(1) .el-card__header i.svg-icon')+'{display:inline-block!important;flex:none;width:28px!important;height:28px!important;background-color:transparent!important;border-radius:0;box-shadow:none!important;background-size:contain!important;background-position:center!important;background-repeat:no-repeat!important;margin:0!important}',
  C('launcher',LC+':nth-child(1) .el-card__body')+','+C('launcher',LC+':nth-child(1) .card-body')+'{padding:0!important;position:static!important;height:auto!important;overflow:visible!important}',
  C('launcher',LC+':nth-child(1) .card-body>div')+'{display:flex!important;flex-wrap:wrap!important;align-items:flex-start!important;gap:12px 24px!important;position:static!important;margin:4px 0 0!important;margin-inline-start:38px!important;padding:0!important;font-size:12px;line-height:18px;color:#5F73AB!important;max-width:none;height:auto!important}',
  C('launcher',LC+':nth-child(1) .card-body>div>*:not(:is(.el-button,button,:has(.el-button,button)))')+'{flex:1 0 100%!important;margin:0!important;color:#5F73AB!important;font-size:12px!important;line-height:18px!important}',
  C('launcher',LC+':nth-child(1) .card-body>div br')+'{display:none}',
  C('launcher',LC+':nth-child(1) .card-body>div>:has(.el-button,button):not(.el-button):not(button)')+'{position:static!important;transform:none!important;display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:6px!important;flex:0 1 340px!important;min-width:0!important;margin:0!important;padding:0!important}',
  C('launcher',LC+':nth-child(1) .card-body>div>:has(.el-button,button) *:not(.el-button):not(button):not(.el-button *):not(button *)')+'{margin:0!important;font-size:11px!important;line-height:16px!important;color:#5F73AB!important;white-space:normal!important;background:transparent!important}',
  C('launcher',LC+':nth-child(1) .card-body>div :is(.el-button,button)')+'{position:static!important;transform:none!important;margin:0!important;display:inline-flex!important;align-items:center;gap:6px;white-space:nowrap!important;min-height:0!important;height:auto!important;padding:8px 12px!important;font-size:12px!important;font-weight:600!important;line-height:18px!important;border-radius:4px!important;box-shadow:none!important;background:#A684FF!important;border:1px solid #A684FF!important;color:#FFFFFF!important;transition:background .15s,border-color .15s}',
  C('launcher',LC+':nth-child(1) .card-body>div :is(.el-button,button):hover')+'{background:#9370F5!important;border-color:#9370F5!important}',
  C('launcher',LC+':nth-child(1) .card-body>div :is(.el-button,button) *')+'{color:inherit!important}',
  /* one CTA per heading: every later action is a ghost button */
  C('launcher',LC+':nth-child(1) .card-body>div>:is(.el-button,button,:has(.el-button,button))~:is(.el-button,button)')+','+C('launcher',LC+':nth-child(1) .card-body>div>:is(.el-button,button,:has(.el-button,button))~:has(.el-button,button) :is(.el-button,button)')+'{background:#FFFFFF!important;border-color:#A684FF!important;color:#77008F!important}',
  C('launcher',LC+':nth-child(1) .card-body>div>:is(.el-button,button,:has(.el-button,button))~:is(.el-button,button):hover')+','+C('launcher',LC+':nth-child(1) .card-body>div>:is(.el-button,button,:has(.el-button,button))~:has(.el-button,button) :is(.el-button,button):hover')+'{background:rgba(166,132,255,.14)!important;border-color:#A684FF!important;color:#77008F!important}',
  C('launcher',LC+':nth-child(2)')+'{background:transparent!important;border:0!important;box-shadow:none!important;overflow:visible!important;animation:none!important}',
  C('launcher',LC+':nth-child(2) .el-card__header')+'{border:0!important;padding:0 0 12px!important}',
  C('launcher',LC+':nth-child(2) .el-card__body')+','+C('launcher',LC+':nth-child(2) .card-body')+'{padding:0 0 24px!important;overflow:visible!important}',
  C('launcher',LC+':nth-child(2) table')+'{display:block;width:100%;border:0!important;box-shadow:none!important;border-radius:0!important;background:transparent!important}',
  C('launcher',LC+':nth-child(2) table[data-fxo-sum]::before')+'{content:attr(data-fxo-sum);display:block;margin:0 2px 14px;font-size:13px;font-weight:600;color:#49545A;letter-spacing:.01em}',
  C('launcher',LC+':nth-child(2) thead')+'{display:none}',
  C('launcher',LC+':nth-child(2) tbody')+'{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}',
  C('launcher',LC+':nth-child(2) tbody tr')+'{display:flex;flex-direction:column;align-items:stretch;gap:16px;background:#FFFFFF!important;border:0;border-radius:20px;padding:18px 18px 16px;min-width:0;min-height:0;box-sizing:border-box;position:relative;box-shadow:0 1px 2px #E6ECF0,inset 0 0 0 1px #EEF1F6;transition:transform .18s ease,box-shadow .18s ease;animation:fxoIn .35s ease both}',
  C('launcher',LC+':nth-child(2) tbody tr[data-fxo-ch=on]')+'{order:-1;box-shadow:0 1px 2px #E6ECF0,inset 0 0 0 1px #BEF0E1}',
  C('launcher',LC+':nth-child(2) tbody tr:hover')+'{transform:translateY(-2px);box-shadow:var(--fxo-e1),inset 0 0 0 1px #E6EAF2}',
  C('launcher',LC+':nth-child(2) td')+'{display:block;padding:0!important;border:0!important;width:auto!important;text-align:start!important;min-width:0;background:transparent!important}',
  C('launcher',LC+':nth-child(2) td:nth-child(1)')+'{font-size:16px;font-weight:700;color:#0A0E1A}',
  C('launcher',LC+':nth-child(2) td:nth-child(1)')+'{min-height:40px;line-height:20px}',
  C('launcher',LC+':nth-child(2) td:nth-child(1) [data-fxo-head]')+','+C('launcher',LC+':nth-child(2) td:nth-child(1)[data-fxo-head]')+'{display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-start!important;gap:12px!important;flex-wrap:nowrap!important;min-width:0;margin:0!important;padding:0!important;position:static!important;text-align:start!important}',
  C('launcher',LC+':nth-child(2) td:nth-child(1) [data-fxo-head] *')+'{margin-inline-start:0!important;margin-top:0!important;margin-bottom:0!important;font-weight:inherit!important;font-size:inherit!important;line-height:20px!important;color:inherit!important}',
  C('launcher',LC+':nth-child(2) td:nth-child(1) [data-fxo-head]::after')+','+C('launcher',LC+':nth-child(2) td:nth-child(1) [data-fxo-head]::before')+'{content:none!important;display:none!important}',
  C('launcher',LC+':nth-child(2) td:nth-child(1) [data-fxo-icobox]')+'{display:block!important;position:relative!important;flex:0 0 40px!important;width:40px!important;height:40px!important;min-width:40px!important;margin:0!important;padding:0!important}',
  C('launcher',LC+':nth-child(2) td:nth-child(1) [data-fxo-ico]')+'{display:block!important;flex:0 0 40px!important;width:40px!important;height:40px!important;max-width:40px!important;min-width:40px!important;margin:0!important;padding:0!important;position:static!important;float:none!important;background-size:contain!important;background-position:center!important;background-repeat:no-repeat!important;object-fit:contain;border-radius:10px}',
  C('launcher',LC+':nth-child(2) td:nth-child(1) [data-fxo-icobox] :is(i.svg-icon,img,svg):not([data-fxo-ico])')+'{position:absolute!important;inset-inline-end:-4px;bottom:-4px;width:16px!important;height:16px!important;min-width:16px!important;max-width:16px!important;margin:0!important;border-radius:50%}',
  C('launcher',LC+':nth-child(2) tbody tr[data-fxo-ch=on] td:nth-child(1)')+'{padding-inline-end:104px!important}',
  C('launcher',LC+':nth-child(2) tbody tr[data-fxo-ch=on]::after')+'{content:var(--fxo-copy-connected);position:absolute;top:27px;inset-inline-end:18px;font-size:11px;font-weight:700;line-height:22px;padding:0 10px;border-radius:999px;background:#E9FCF8;color:#057A5E;pointer-events:none}',
  C('launcher',LC+':nth-child(2) td:nth-child(2)')+'{font-size:13px;line-height:18px;color:#7F848D;min-height:18px;margin:-10px 0 0;margin-inline-start:52px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
  C('launcher',LC+':nth-child(2) tbody tr[data-fxo-ch=on] td:nth-child(2)')+'{color:#49545A;font-weight:600}',
  C('launcher',LC+':nth-child(2) td:nth-child(3)')+'{margin-top:auto;padding-top:12px!important;border-top:1px solid #EEF1F6!important;position:relative;top:0}',
  C('launcher',LC+':nth-child(2) td:nth-child(3)')+'{margin-top:auto}',
  C('launcher',LC+':nth-child(2) td:nth-child(3)>div')+'{display:flex!important;flex-wrap:wrap;gap:8px;justify-content:flex-end}',
  C('launcher',LC+':nth-child(2) td:nth-child(3) .el-button')+'{margin:0!important;white-space:nowrap!important;height:36px!important;min-height:36px;max-width:100%!important;padding:0 16px!important;border-radius:10px!important;font-size:13px!important}',
  /* Connect Channels (platform classes) */
  P+' .connect-channels .connect-panel{background:transparent!important;border:0!important;box-shadow:none!important}',
  P+' .connect-channels .connect-panel>.el-card__body{padding:0!important}',
  P+' .connect-channels .connect-toolbar{margin-bottom:16px}',
  P+' .connect-channels .connect-card{background:var(--fxo-surface)!important;border:0!important;border-radius:22px!important;box-shadow:var(--fxo-e0)!important;padding:18px!important;min-height:80px;font-size:15px;font-weight:700;transition:transform .2s ease,box-shadow .2s ease}',
  P+' .connect-channels .connect-card:hover{transform:translateY(-4px);box-shadow:var(--fxo-e1)!important}',
  P+' .connect-channels .connect-card .svg-icon,'+P+' .connect-channels .connect-card img{display:inline-block!important;width:36px!important;height:36px!important;background-size:contain!important;background-position:center!important;background-repeat:no-repeat!important}',
  P+' .connect-channels .connect-filter{background:var(--fxo-surface);border-radius:999px;padding:4px;box-shadow:var(--fxo-e0)}',
  /* provider lists */
  C('providers','.content-card.text-center')+'{text-align:start!important}',
  C('providers','.content-card.text-center .card-body')+'{padding:16px 22px!important}',
  C('providers','.content-card.text-center+.content-card.text-center')+'{margin-top:10px}',
  /* credential forms */
  C('form','.p-3 .el-card .el-form')+'{max-width:760px}',
  /* settings pages */
  C('settings','main .overflow-hidden.p-4')+'{overflow:visible!important}',
  /* Inbox (workspace #/chat and bot #/livechat): floating panels on the canvas */
  C('inbox','aside.el-aside:not(#team-aside):not(#flowbuilder-aside):not(.bg-transparent)')+'{border:0!important;border-radius:22px!important;margin-block:10px!important;margin-inline:10px 0!important;height:calc(100% - 20px)!important;box-shadow:var(--fxo-e1)}',
  C('inbox','.card-window')+'{background:transparent!important;border:0!important}',
  C('inbox','.chat-container')+'{display:flex!important;gap:14px;padding:10px 14px 10px 14px;box-sizing:border-box;background:transparent!important;height:100%}',
  C('inbox','.rooms-container')+'{background:var(--fxo-surface)!important;border:0!important;border-radius:22px;overflow:hidden;box-shadow:var(--fxo-e0)}',
  C('inbox','.df-sidebar')+'{background:var(--fxo-surface-2)!important;border-inline-end:1px solid var(--fxo-divider)!important}',
  C('inbox','.col-messages')+'{background:var(--fxo-surface)!important;border-radius:22px;overflow:hidden;box-shadow:var(--fxo-e0)}',
  C('inbox','.room-item')+'{font-size:14px;border-radius:16px;margin:2px 8px!important;transition:background .15s}',
  C('inbox','.room-item:hover')+'{background:var(--fxo-hover)!important}',
  C('inbox','.room-item .room-name')+'{font-size:15px!important;font-weight:700!important;color:var(--fxo-ink)!important}',
  C('inbox','.room-item .text-last,.room-item .last-message')+'{font-size:14px!important;color:var(--fxo-ink-4)!important}',
  C('inbox','.filter-border-b')+'{border-bottom:1px solid var(--fxo-divider)!important}',
  C('inbox','[class*=border-primary]')+'{border-color:var(--fxo-border)!important}',
  ''].join('\n');
};

/* ---- Reports / Insights (live-verified per route, see 3f) ---- */
var REPORTS_CSS=("R{--k-bg:#EEF1F6;--k-fg:#28303D}\nR>div:first-child{max-width:none}\nR div.text-muted.font-small:first-child:not(.el-card *),R .alert:first-child:not(.el-card *){display:inline-flex!important;align-items:center;gap:6px;width:auto!important;margin:0 0 24px!important;padding:4px 12px!important;border-radius:999px!important;font-size:12px!important;line-height:18px!important;border:0!important}\nR div.text-muted.font-small:first-child:not(.el-card *){background:#FFFFFF!important;color:#49545A!important}\nR div.text-muted.font-small:first-child:not(.el-card *)::before{content:\"\";flex:none;width:12px;height:12px;background:currentColor;-webkit-mask:var(--fxo-clock) center/contain no-repeat;mask:var(--fxo-clock) center/contain no-repeat}\nR .el-page-header,R .flex.align-items-center.mb-2:not(.el-card *),R .mb-4.text-center:not(.el-row):not(.el-card):not(:has(.el-card)):not(.el-card *){display:flex!important;align-items:center!important;flex-wrap:wrap;gap:12px;background:var(--fxo-surface)!important;border:0!important;border-radius:999px!important;padding-block:8px!important;padding-inline:16px 10px!important;margin:0 0 20px!important;position:sticky;top:-12px;z-index:6;box-shadow:0 -14px 0 0 var(--fxo-bg),var(--fxo-e0);text-align:start!important;min-height:58px;box-sizing:border-box;font-size:14px}\nR .el-page-header .el-page-header__content{display:flex;align-items:center;gap:12px;font-size:15px!important;font-weight:600;color:var(--fxo-ink);width:100%}\nR .el-page-header .el-input__inner,R .flex.align-items-center.mb-2:not(.el-card *) .el-input__inner,R .mb-4.text-center:not(.el-card *) .el-input__inner{height:38px!important;line-height:38px!important;border-radius:999px!important}\nR .mb-4.text-center:not(.el-row):not(.el-card):not(:has(.el-card)):not(.el-card *)>.text-muted.font-small:first-child{font-size:15px!important;font-weight:600;color:var(--fxo-ink)!important;margin:0!important}\nR .mb-4.flex.align-items-center:empty{display:none!important}\nR .mb-4.flex.align-items-center:not(:empty):not(.el-card *){margin:-8px 0 16px!important;gap:8px;font-size:13px;font-weight:600;color:var(--fxo-ink-2)}\nR .mb-4.mx-auto[style*=\"max-width\"]{max-width:none!important}\nRC .el-row:not(:has(*))::after{content:var(--fxo-copy-no-data);display:block!important;width:100%;margin:0 10px;padding:48px 20px;text-align:center;font-size:14px;color:var(--fxo-ink-3);background:var(--fxo-surface);border:1px dashed #C9D3E3;border-radius:22px}\nR .el-empty{background:var(--fxo-surface);border:1px dashed #C9D3E3;border-radius:22px;padding:48px 24px!important;margin:8px 0!important}\nR .el-empty__description p{font-size:15px!important;color:var(--fxo-ink-2)!important}\nR .el-row{display:flex!important;flex-wrap:wrap!important}\nR .el-row::before,R .el-row::after{display:none!important}\nR .el-row>.el-col{float:none!important;display:flex!important;flex-direction:column;flex-grow:1;min-width:min(220px,100%)}\nR .el-row>.el-col>.el-card:last-child,R .el-row>.el-col>div:last-child>.el-card:only-child{flex:1 1 auto}\nR .el-row>.el-col>div:last-child:has(>.el-card:only-child){flex:1 1 auto;display:flex;flex-direction:column}\nR .el-card{background:var(--fxo-surface)!important;border:0!important;border-image:none!important;border-radius:22px!important;box-shadow:var(--fxo-e0)!important;outline:0!important;color:var(--fxo-ink)!important;margin-bottom:20px!important;overflow:hidden}\nR .el-card .el-card{border-radius:16px!important;margin-bottom:0!important}\nR .el-card>.el-card__body{padding:22px 24px!important}\nR .el-card>.el-card__body>.p-3:first-child{padding:0 0 10px!important;gap:6px}\nR .el-card>.el-card__body>.p-3:first-child .mr-auto,R .el-card>.el-card__body>.p-2:first-child,R .el-card>.el-card__body>h3:first-child{font-size:16px!important;font-weight:800!important;line-height:22px!important;color:var(--fxo-ink)!important;padding:0 0 8px!important;margin:0!important;text-align:start!important}\nR .el-card>.el-card__body>.p-3:first-child .mr-auto{margin-inline-end:auto!important}\nR .el-card>.el-card__body>.p-3:first-child .el-button{width:32px;height:32px;min-height:32px;padding:0!important;border:0!important;border-radius:8px!important;background:transparent!important;color:var(--fxo-ink-3)!important}\nR .el-card>.el-card__body>.p-3:first-child .el-button:hover{background:var(--fxo-hover)!important;color:var(--fxo-ink)!important}\nR .el-card>.el-card__body>.text-muted.font-small.my-2:first-child{margin:0!important;font-size:12px!important;font-weight:500;color:var(--fxo-ink-3)!important;text-align:start}\nR .el-card>.el-card__body>.text-muted.font-small.my-2:first-child+.my-2{margin:2px 0 8px!important;font-size:16px!important;font-weight:600!important;color:var(--fxo-ink)!important;text-align:start}\nR .el-card>.el-card__body>.flex>.px-3{padding:0!important;padding-inline-end:28px!important}\nR .el-card>.el-card__body>.flex>.px-3 .text-secondary{font-size:13px!important;font-weight:600;color:var(--fxo-ink-3)!important}\nR .el-card>.el-card__body>.flex>.px-3 .fa-2x{font-size:34px!important;font-weight:900;color:var(--fxo-ink)!important;font-variant-numeric:tabular-nums}\nR .el-card .badge{border-radius:999px!important;padding:3px 8px!important;font-size:12px!important;font-weight:600!important;vertical-align:middle}\nR .el-card>.el-card__body>.mx-auto{padding:4px 0 0!important}\nR .el-card ul.el-menu{border:0!important;background:transparent!important}\nR .el-card ul.el-menu>.el-menu-item{height:44px!important;line-height:44px!important;padding:0 4px!important;border-bottom:1px solid var(--fxo-divider);font-size:14px!important;color:var(--fxo-ink-2)!important;background:transparent!important}\nR .el-card ul.el-menu>.el-menu-item:last-child{border-bottom:0}\nR .el-card ul.el-menu>.el-menu-item .float-right{font-weight:700;color:var(--fxo-ink);font-variant-numeric:tabular-nums}\nR .el-row.text-center .el-card,R .mb-3.text-center>.el-card{text-align:start}\nR .el-row.text-center .el-card .apexcharts-canvas,R .el-row.text-center .el-card .mx-auto{margin-inline-start:auto;margin-inline-end:auto}\nR :is(.stats-summary-card,.el-card:has(.fa-2x.font-weight-bold):not(:has(.apexcharts-canvas,table,img,.el-table))){text-align:start!important}\nR :is(.stats-summary-card,.el-card:has(.fa-2x.font-weight-bold):not(:has(.apexcharts-canvas,table,img,.el-table)))>.el-card__body>.flex{flex-direction:row-reverse!important;align-items:flex-start!important;justify-content:space-between!important;gap:16px}\nR :is(.stats-summary-card,.el-card:has(.fa-2x.font-weight-bold):not(:has(.apexcharts-canvas,table,img,.el-table)))>.el-card__body>.flex>:is(i,.svg-icon){flex:none;font-size:18px!important;width:44px!important;height:44px!important;line-height:44px!important;border-radius:14px;display:inline-flex!important;align-items:center;justify-content:center;background-color:transparent!important;color:var(--k-fg)!important;margin:0!important;box-sizing:border-box;padding:9px;background-origin:content-box;background-size:contain!important;background-repeat:no-repeat!important;background-position:center!important}\nR :is(.stats-summary-card,.el-card:has(.fa-2x.font-weight-bold):not(:has(.apexcharts-canvas,table,img,.el-table)))>.el-card__body>.flex:has(>.fa-2x){align-items:center!important}\nR :is(.stats-summary-card,.el-card:has(.fa-2x.font-weight-bold):not(:has(.apexcharts-canvas,table,img,.el-table)))>.el-card__body>.text-muted.font-small:first-child{font-size:13px!important;font-weight:600!important;color:var(--fxo-ink-2)!important;margin:0 0 6px!important}\nR :is(.stats-summary-card,.el-card:has(.fa-2x.font-weight-bold):not(:has(.apexcharts-canvas,table,img,.el-table)))>.el-card__body>.flex>div{flex:1;min-width:0;text-align:start!important}\nR :is(.stats-summary-card,.el-card:has(.fa-2x.font-weight-bold):not(:has(.apexcharts-canvas,table,img,.el-table))) .mb-2.font-small{font-size:13px!important;font-weight:600;color:var(--fxo-ink-2)!important;margin:0 0 6px!important}\nR :is(.stats-summary-card,.el-card:has(.fa-2x.font-weight-bold):not(:has(.apexcharts-canvas,table,img,.el-table))) .fa-2x{font-size:40px!important;line-height:44px!important;font-weight:900!important;color:var(--fxo-ink)!important;font-variant-numeric:tabular-nums;letter-spacing:-.01em}\nR :is(.stats-summary-card,.el-card:has(.fa-2x.font-weight-bold):not(:has(.apexcharts-canvas,table,img,.el-table))) .flex.align-items-center.justify-content-center{justify-content:flex-start!important;gap:8px}\nR :is(.stats-summary-card,.el-card:has(.fa-2x.font-weight-bold):not(:has(.apexcharts-canvas,table,img,.el-table))) .fa-2x.mr-2{margin:0!important}\nR :is(.stats-summary-card,.el-card:has(.fa-2x.font-weight-bold):not(:has(.apexcharts-canvas,table,img,.el-table))) .font-smaller{font-size:12px!important;color:var(--fxo-ink-3)!important;margin-top:4px}\nR .el-card.text-success{--k-bg:#E9FCF8;--k-fg:#057A5E}\nR .el-card.text-primary{--k-bg:#F6F2FF;--k-fg:#6D4AE0}\nR .el-card.text-info{--k-bg:#EDF5FF;--k-fg:#2F6FD1}\nR .el-card.text-warning{--k-bg:#FEF3ED;--k-fg:#C2570C}\nR .el-card.text-danger{--k-bg:#FFECEC;--k-fg:#D63A3D}\nR .el-card.bg-dark,R .el-card.bg-light{--k-bg:#EEF1F6;--k-fg:#28303D}\nR .el-card.bg-success,R .el-card.bg-light-success{--k-bg:#E9FCF8;--k-fg:#057A5E}\nR .el-card.bg-primary,R .el-card.bg-light-primary{--k-bg:#F6F2FF;--k-fg:#6D4AE0}\nR .el-card.bg-light-warning,R .el-card.bg-light-orange{--k-bg:#FEF3ED;--k-fg:#C2570C}\nR .el-card.bg-light-purple{--k-bg:#F6F2FF;--k-fg:#6D4AE0}\nR .el-card.bg-light-info,R .el-card.bg-info{--k-bg:#EDF5FF;--k-fg:#2F6FD1}\nR .el-card.bg-danger,R .el-card.bg-light-danger{--k-bg:#FFECEC;--k-fg:#D63A3D}\nR .stats-summary-card:has(+.mb-4>.el-card:first-child){margin-bottom:0!important;border-bottom-left-radius:0!important;border-bottom-right-radius:0!important;border-bottom-color:var(--fxo-divider)!important}\nR .stats-summary-card+.mb-4>.el-card:first-child{border-top:0!important;border-top-left-radius:0!important;border-top-right-radius:0!important}\nR .el-card .el-table{border:0!important;border-radius:0!important}\nR .el-table th .cell{word-break:normal!important;overflow-wrap:normal!important;white-space:normal!important;line-height:18px!important}\nR .el-card table.table th{font-size:13px!important;font-weight:600!important;color:var(--fxo-ink-2)!important;background:var(--fxo-surface-2)!important;border-top:0!important}\nR .el-card table.table td{font-size:14px!important;border-color:var(--fxo-divider)!important}\nR .apexcharts-canvas .apexcharts-text,R .apexcharts-canvas .apexcharts-legend-text{font-family:var(--fxo-font)!important}\nR .apexcharts-canvas .apexcharts-xaxis-label,R .apexcharts-canvas .apexcharts-yaxis-label{fill:#7F848D}\nR .apexcharts-canvas .apexcharts-gridline{stroke:#EEF1F6}\nR .apexcharts-canvas .apexcharts-menu-icon{opacity:.55}\nR .apexcharts-canvas:hover .apexcharts-menu-icon{opacity:1}\nR .el-card>.el-card__body>.text-muted.font-small:first-child{margin:0!important;font-size:12px!important;font-weight:500;color:var(--fxo-ink-3)!important;text-align:start}\nR .el-card>.el-card__body>.text-muted.font-small:first-child+.fa-lg,R .el-card>.el-card__body>.text-muted.font-small:first-child+.my-2{margin:2px 0 10px!important;font-size:16px!important;line-height:22px!important;font-weight:600!important;color:var(--fxo-ink)!important;text-align:start}\nR .el-card>.el-card__body>.mx-2.mt-3.flex.align-items-center{margin:0!important;padding:10px 2px!important;border-top:1px solid var(--fxo-divider);font-size:14px;color:var(--fxo-ink-2)}\nR .el-card>.el-card__body>.mx-2.mt-3.flex.align-items-center .svg-icon{width:20px!important;height:20px!important;vertical-align:-5px;margin-inline-end:10px!important}\nR .el-card>.el-card__body>.mx-2.mt-3.flex.align-items-center .font-bigger{font-size:15px!important;font-weight:700;color:var(--fxo-ink);font-variant-numeric:tabular-nums}\nR .el-card.text-purple{--k-bg:#F6F2FF;--k-fg:#6D4AE0}\nR .el-page-header .el-page-header__content{width:100%}\nR .el-page-header .el-select.float-right{float:none!important;margin-inline-start:auto!important}\nR .el-row>.el-col>.card:last-child{flex:1 1 auto}\nR .card.card-congratulations{margin-bottom:20px!important;border:0!important;border-radius:22px!important;overflow:hidden;background:#2C334C!important;color:#fff!important;box-shadow:none!important}\nR .card.card-congratulations .card-body{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:28px!important}\nR .card.card-congratulations h2,R .card.card-congratulations .card-text{color:#fff!important}\nR .card.card-congratulations h2{font-size:24px!important;font-weight:700!important;margin:14px 0 6px!important}\nR .card.card-congratulations .card-text{font-size:14px;opacity:.85}\nR .card.card-congratulations .el-avatar{box-shadow:0 0 0 4px #49545A}\nR .fxo-dup .mr-auto{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0 0 0 0)!important}\nR .fxo-dup{padding:0!important;min-height:0}").replace(/(^|,|\n)RC(?=[ ])/g,'$1html.fxo[data-fxo-page=insights][data-fxo-route$="closing_notes"] body #spark-app#spark-app main.el-main.p-3').replace(/(^|,|\n)R(?=[ >{:.\[])/g,'$1html.fxo[data-fxo-page=insights] body #spark-app#spark-app main.el-main.p-3');

/* ---- overlays drawn outside #spark-app (workspace dropdowns) ---- */
var POP=`
html.fxo body .el-select-dropdown,html.fxo body .el-dropdown-menu,html.fxo body .el-popover,html.fxo body .el-picker-panel,html.fxo body .el-cascader__dropdown,html.fxo body .el-autocomplete-suggestion{border:1px solid var(--fxo-border)!important;border-radius:var(--fxo-r-lg)!important;box-shadow:var(--fxo-e1)!important;font-family:var(--fxo-font)!important;background:var(--fxo-surface)!important}
html.fxo body .el-select-dropdown__item,html.fxo body .el-dropdown-menu__item{font-size:14px!important;color:var(--fxo-ink-2)!important;border-radius:var(--fxo-r-md);margin:0 6px}
html.fxo body .el-select-dropdown__item.hover,html.fxo body .el-select-dropdown__item:hover,html.fxo body .el-dropdown-menu__item:not(.is-disabled):hover{background:var(--fxo-hover)!important;color:var(--fxo-ink)!important}
html.fxo body .el-select-dropdown__item.selected{color:var(--fxo-primary-ink)!important;font-weight:600!important}
html.fxo body .el-tooltip__popper.is-dark{background:var(--fxo-nav)!important;border-radius:var(--fxo-r-md)!important;font-size:13px!important}
html.fxo body .el-date-table td.current:not(.disabled) span,html.fxo body .el-date-table td.start-date span,html.fxo body .el-date-table td.end-date span{background:var(--fxo-primary)!important;color:#fff!important}
html.fxo body>.el-dialog__wrapper .el-dialog{border-radius:var(--fxo-r-xl)!important;box-shadow:var(--fxo-e2)!important}
html.fxo body>.el-dialog__wrapper .el-dialog.is-fullscreen{border-radius:0!important;overflow-y:auto!important;overscroll-behavior-y:contain}
html.fxo body>.el-message-box__wrapper .el-message-box{border-radius:var(--fxo-r-xl)!important;border:0!important;box-shadow:var(--fxo-e2)!important}
`;

/* ---- other Element components (body-level toasts, message boxes; uploads, progress, steps …) ---- */
var MISC=`
html.fxo body .el-message{border-radius:var(--fxo-r-lg)!important;border:1px solid var(--fxo-border)!important;box-shadow:var(--fxo-e1)!important;background:var(--fxo-surface)!important;font-family:var(--fxo-font)!important}
html.fxo body .el-notification{border-radius:var(--fxo-r-xl)!important;border:1px solid var(--fxo-border)!important;box-shadow:var(--fxo-e2)!important;font-family:var(--fxo-font)!important}
html.fxo body .el-notification__title{font-weight:600!important;color:var(--fxo-ink)!important}
html.fxo body .el-message-box__header{border-bottom:1px solid var(--fxo-divider)!important}
html.fxo body .el-message-box__title{font-weight:600!important;color:var(--fxo-ink)!important}
html.fxo body .el-message-box__btns .el-button{border-radius:12px!important;min-height:38px;padding:8px 18px!important;font-weight:700!important;outline:0!important}
html.fxo body .el-message-box__btns .el-button.el-button--primary,html.fxo body .el-message-box__btns .el-button.el-button--primary:focus{background:#A684FF!important;border-color:#A684FF!important;color:#FFFFFF!important}
html.fxo body .el-message-box__btns .el-button.el-button--primary:hover{background:#8F66F2!important;border-color:#8F66F2!important;color:#FFFFFF!important}
html.fxo body .el-message-box__btns .el-button.el-button--danger,html.fxo body .el-message-box__btns .el-button.el-button--danger:focus,html.fxo body .el-message-box__btns .el-button.el-button--danger:hover{background:#FE4E51!important;border-color:#FE4E51!important;color:#FFFFFF!important}
html.fxo body .el-message-box__btns .el-button.el-button--success,html.fxo body .el-message-box__btns .el-button.el-button--success:focus{background:#24E4BB!important;border-color:#24E4BB!important;color:#04241D!important}
html.fxo body .el-message-box__btns .el-button.el-button--success:hover{background:#1DD3AB!important;border-color:#1DD3AB!important;color:#04241D!important}
html.fxo body .el-message-box__btns .el-button:focus-visible{box-shadow:0 0 0 3px rgba(36,228,187,.2)!important}
html.fxo body .el-message-box__btns .el-button span{color:inherit!important}
html.fxo body .el-loading-mask{background:rgba(255,255,255,.72)!important}
html.fxo body .el-loading-spinner .path{stroke:var(--fxo-primary)!important}
html.fxo body .el-upload-dragger{border:1.5px dashed #C9D3E3!important;border-radius:var(--fxo-r-lg)!important;background:var(--fxo-surface-2)!important}
html.fxo body .el-upload-dragger:hover{border-color:var(--fxo-primary)!important;background:var(--fxo-primary-soft)!important}
html.fxo body .el-progress-bar__inner{background:var(--fxo-primary)!important}
html.fxo body .el-slider__bar{background:var(--fxo-primary)!important}
html.fxo body .el-slider__button{border-color:var(--fxo-primary)!important}
html.fxo body .el-step__head.is-process,html.fxo body .el-step__head.is-finish{color:var(--fxo-primary-ink)!important;border-color:var(--fxo-primary)!important}
html.fxo body .el-step__line-inner{border-color:var(--fxo-primary)!important}
html.fxo body .el-breadcrumb__inner,html.fxo body .el-breadcrumb__inner a{color:var(--fxo-ink-3)!important;font-weight:500!important}
html.fxo body .el-breadcrumb__item:last-child .el-breadcrumb__inner{color:var(--fxo-ink)!important;font-weight:600!important}
html.fxo body .el-tree-node__content:hover{background:var(--fxo-surface-2)!important}
html.fxo body .el-tree-node.is-current>.el-tree-node__content{background:var(--fxo-primary-soft)!important}
html.fxo body .el-collapse-item__header{font-weight:600!important;color:var(--fxo-ink)!important}
html.fxo body .el-collapse-item__header.is-active{color:var(--fxo-primary-ink)!important}
html.fxo body .el-timeline-item__node--normal{background:var(--fxo-primary)!important}
html.fxo body .el-transfer-panel{border-radius:var(--fxo-r-lg)!important;border-color:var(--fxo-border)!important}
html.fxo body .el-transfer-panel__header{background:var(--fxo-surface-2)!important}
`;

/* ---- PRODUCT COLOURS (unchanged): the exact button / status / selection colours production shows today.
   Copied from the old fx-flow.js core layer (primary #A684FF, success #24E4BB, danger #FE4E51, status tints),
   which is what users currently see; same pages as before (not on the flow canvas or Sub Flows). ---- */
var PRODUCT_CSS=rewrite(".el-button--default:not(.el-button--primary):not(.el-button--success):not(.el-button--danger):not(.el-button--warning):not(.el-button--info){background:#fff!important;border-color:#E6EAF2!important;color:#0A0E1A!important}\n.el-button--default:not(.el-button--primary):not(.el-button--success):not(.el-button--danger):not(.el-button--warning):not(.el-button--info):hover,.el-button--default:not(.el-button--primary):not(.el-button--success):not(.el-button--danger):not(.el-button--warning):not(.el-button--info):focus{background:#F6F2FF!important;border-color:#A684FF!important;color:#6D4AE0!important}\n.el-button--primary{background:#A684FF!important;border-color:#A684FF!important;color:#fff!important}\n.el-button--success{background:#24E4BB!important;border-color:#24E4BB!important;color:#04241D!important}\n.el-button--primary:hover,.el-button--primary:focus{background:#8F66F2!important;border-color:#8F66F2!important}\n.el-button--success:hover{background:#1DD3AB!important;border-color:#1DD3AB!important}\n.el-button--danger{background:#FE4E51!important;border-color:#FE4E51!important;color:#fff!important}\n.el-input__inner:focus,.el-textarea__inner:focus,.el-select .el-input.is-focus .el-input__inner{border-color:#24E4BB!important;box-shadow:0 0 0 3px rgba(36,228,187,.2)!important}\n.alert-warning{background:#FFF7E6!important;color:#8A5A00!important}\n.alert-info{background:#EDF5FF!important;color:#2F6FD1!important}\n.alert-success{background:#E9FCF8!important;color:#057A5E!important}\n.alert-danger{background:#FFECEC!important;color:#D63A3D!important}\n.badge-secondary{background:#EEF1F6!important;color:#7F848D!important}\n.badge-info{background:#EDF5FF!important;color:#2F6FD1!important}\n.badge-success{background:#E9FCF8!important;color:#057A5E!important}\n.badge-warning{background:#FEF3ED!important;color:#C2570C!important}\n.badge-danger{background:#FFECEC!important;color:#D63A3D!important}\n.el-tabs__active-bar{background:linear-gradient(90deg,#24E4BB,#A684FF)!important}\n.el-pagination.is-background .el-pager li:not(.disabled).active{background:#A684FF!important;color:#fff!important}\n.el-switch__core{background:#D7DEEA!important;border-color:transparent!important}\n.el-switch.is-checked .el-switch__core{background:#24E4BB!important;border-color:#24E4BB!important}\n.el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox__input.is-indeterminate .el-checkbox__inner{background:#24E4BB!important;border-color:#24E4BB!important}\n.el-checkbox__input.is-checked .el-checkbox__inner::after{border-color:#04241D!important}\n.el-radio__input.is-checked .el-radio__inner{background:#24E4BB!important;border-color:#24E4BB!important}\n.el-radio__input.is-checked .el-radio__inner::after{background:#04241D!important}\n.el-tag{background:#F6F2FF!important;color:#6D4AE0!important}\n.el-tag--success{background:#E9FCF8!important;color:#057A5E!important}\n.el-tag--info{background:#EDF5FF!important;color:#2F6FD1!important}\n.el-tag--warning{background:#FEF3ED!important;color:#C2570C!important}\n.el-tag--danger{background:#FFECEC!important;color:#D63A3D!important}\n.el-loading-spinner .path{stroke:#24E4BB!important}\n.el-picker-panel__icon-btn:hover,.el-date-table td.available:hover,.el-date-table td.today span{color:#057A5E!important}\n.el-date-table td.current:not(.disabled) span,.el-date-table td.selected span,.el-year-table td.current .cell,.el-month-table td.current .cell{background:#24E4BB!important;color:#04241D!important}\n.el-time-panel,.el-time-spinner__item.active:not(.disabled){color:#057A5E!important}\n.el-message{background:#fff!important}\n.el-message--success{background:#E7FBF6!important;border-color:#BEF0E1!important;color:#057A5E!important}\n.el-message--error{background:#FFECEC!important;border-color:#FCC!important;color:#D63A3D!important}\n.el-message--warning{background:#FEF3ED!important;border-color:#FBD8B8!important;color:#C2570C!important}\n.el-upload-dragger:hover{border-color:#24E4BB!important;background:#F1FDFA!important}\n.el-progress-bar__inner{background:#24E4BB!important}\n.el-progress__text,.el-progress.is-success .el-progress__text{color:#057A5E!important}\n.el-slider__bar{background:#24E4BB!important}\n.el-slider__button{border-color:#24E4BB!important}\n.el-rate__icon.is-selected,.el-rate__icon.is-active{color:#24E4BB!important}\n.el-steps--simple{background:#F7FAFF!important}\n.el-step__head.is-process,.el-step__head.is-finish{color:#057A5E!important;border-color:#24E4BB!important}\n.el-step__icon.is-text{border-color:inherit!important}\n.el-step__line-inner{border-color:#24E4BB!important}\n.el-collapse-item__header.is-active{color:#057A5E!important}\n.el-timeline-item__node--normal{background:#24E4BB!important}\n.el-carousel__indicator.is-active button{background:#24E4BB!important}",function(s){
  var C='html.fxo:not([data-fxo-page=canvas]):not([data-fxo-page=subflows]) body';
  return C+' #spark-app#spark-app '+s+','+C+' '+s;
});

var scopeS=function(t){return t.replace(/(^|\n|,)S(?=[ {])/g,'$1'+P)};

/* ===================================================================================== */
/* 3. EARLIER MODULES (kept, re-scoped, one engine)                                       */
/* ===================================================================================== */

/* re-scoping of the earlier flow-builder / Sub Flows rules (they leaked to every bot page via body:has(.main-flow-builder)) */
var CANVAS_SCOPE='html.fxo[data-fxo-page=canvas] body #spark-app#spark-app';
var canvasCss=function(css){
  return rewrite(css,function(s){
    if(s==='body:has(.main-flow-builder)')return null;                         /* old mint variables: tokens now come from html.fxo */
    if(s.indexOf('body:has(.main-flow-builder)')===0)return CANVAS_SCOPE+s.slice('body:has(.main-flow-builder)'.length);
    return P+' '+s;                                                             /* .flowbuilder-diagram, .view-panel-right, .node-viewer */
  },function(b){return recolor(b).replace(/border-radius:20px/g,'border-radius:16px')});
};
var subCss=function(css){
  return rewrite(css,function(s){s=s.replace(/^html body /,'');if(s==='.fx-flat')s='.fx-labels .fx-flat';return P+' '+s},recolor);   /* .fx-flat is also a class the old Insights module left on report wrappers */
};

/* 3a. Channel detail pages (connected state, WhatsApp details) — from fx-channels.js, now route-scoped */
var CHANNEL_DETAIL_CSS="html.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .el-card__header{padding:20px 24px!important;border-bottom:1px solid #F0F3F8!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .el-card__header>div{display:flex!important;align-items:center!important;flex-wrap:nowrap!important;gap:10px!important;text-align:start!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .el-card__header>div>.pull-right{order:1!important;margin:4px 0 0!important;margin-inline-start:auto!important;flex:0 0 auto!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .el-button--danger.is-plain{border-radius:8px!important;font-weight:600!important;padding:8px 16px!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .card-body{padding:24px!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .card-body .el-row.el-row--flex{display:flex!important;flex-wrap:wrap!important;margin:0!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .card-body .el-col-10{width:auto!important;max-width:100%!important;flex:0 0 auto!important;padding:0!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .card-body .text-muted.font-smaller{margin:0 0 2px!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .card-body .text-muted.font-smaller.mt-2{margin-top:16px!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .card-body .blur-text{font-size:14px!important;font-weight:600!important;color:#0A0E1A!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .card-body .mt-2:last-child{display:flex!important;flex-wrap:nowrap!important;gap:10px!important;margin-top:20px!important;white-space:nowrap!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .card-body .mt-2:last-child .el-button{margin-inline-end:0!important;white-space:nowrap!important;border-radius:8px!important;font-weight:600!important;padding:9px 18px!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card table{display:table!important;width:100%!important;border-collapse:separate!important;border-spacing:0 10px!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card thead{display:table-header-group!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card thead tr{display:table-row!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card thead th{display:table-cell!important;width:auto!important;padding:0 14px 8px!important;font-size:13px!important;font-weight:600!important;letter-spacing:0;text-transform:none;color:#8B93A1!important;text-align:center!important;border:0!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card tbody{display:table-row-group!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card tbody tr{display:table-row!important;animation:none!important;background:#F9FAFC!important;box-shadow:0 0 0 1px #EEF1F6!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card tbody tr:hover{background:#F3FBF8!important;transform:none!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card tbody td{display:table-cell!important;width:auto!important;text-align:center!important;padding:14px!important;vertical-align:middle!important;border:0!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card tbody td:first-child{border-radius:0!important;border-start-start-radius:14px!important;border-end-start-radius:14px!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card tbody td:last-child{border-radius:0!important;border-start-end-radius:14px!important;border-end-end-radius:14px!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card tbody td>div{text-align:center!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card tbody td .text-muted.font-small{text-align:center!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card .svg-icon{width:16px!important;height:16px!important;border-radius:0!important;background-color:transparent!important;box-shadow:none!important;transform:none!important;display:inline-block!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .el-button--success{background:#E7FBF6!important;border-color:#BEEFE0!important;color:#057A5E!important;border-radius:8px!important;font-weight:700!important;font-size:12px!important;box-shadow:none!important;padding:6px 14px!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .badge-success{background:#E7FBF6!important;color:#057A5E!important;border:1px solid #BEEFE0!important;border-radius:8px!important;padding:4px 10px!important;font-weight:700!important;font-size:12px!important;display:inline-block!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card table .el-button--default:not(.el-tooltip){border-radius:8px!important;width:auto!important;height:auto!important;min-width:auto!important;padding:7px 16px!important;border-color:#E6EAF2!important;background:#F7F9FB!important;color:#5B6472!important;font-weight:600!important;font-size:12px!important;box-shadow:none!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card table .el-button--default:not(.el-tooltip):hover{background:#EEF2F6!important;border-color:#D7DEEA!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .el-button--primary.is-plain{border-radius:8px!important;padding:7px 16px!important;font-weight:600!important;font-size:12px!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .font-smaller.mt-2{color:#5B6472!important;font-size:12px!important;margin-top:6px!important;display:block!important;text-align:center!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card table .el-button--default.el-tooltip,\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card table .el-dropdown-selfdefine{border-radius:8px!important;width:32px!important;height:32px!important;min-width:32px!important;padding:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;border-color:#E6EAF2!important;background:#fff!important;box-shadow:none!important;vertical-align:middle!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card table .el-button--default.el-tooltip span,\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card table .el-dropdown-selfdefine span{display:inline-flex!important;align-items:center!important;justify-content:center!important;line-height:1!important}\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card table .el-button--default.el-tooltip i,\nhtml.fxo body #spark-app#spark-app #team-main .p-3>div.fxo-detail .content-card table .el-dropdown-selfdefine i{color:#5B6472!important;font-size:14px!important;line-height:1!important;font-family:\"FontAwesome\",\"Font Awesome 5 Free\",\"Font Awesome 6 Free\",sans-serif!important;font-weight:900!important;font-style:normal!important;display:inline-block!important;opacity:1!important;visibility:visible!important}";

/* 3b. Choose Sub Flow dialog cards — from fx-flow.js (not on the AI Agent editor) */
var CHOOSE_SUBFLOW_CSS="html.fxo:not(.fxo-ai-agent) body #spark-app#spark-app .el-dialog:has(.next-step-row) .el-dialog__body,html.fxo:not(.fxo-ai-agent) body>.el-dialog__wrapper .el-dialog:has(.next-step-row) .el-dialog__body{overflow:visible!important;max-height:none!important;height:auto!important}\nhtml.fxo:not(.fxo-ai-agent) body #spark-app#spark-app .el-dialog:has(.next-step-row) .el-form-item__content,html.fxo:not(.fxo-ai-agent) body>.el-dialog__wrapper .el-dialog:has(.next-step-row) .el-form-item__content{display:flex!important;flex-direction:column!important;max-height:70vh!important;}\nhtml.fxo:not(.fxo-ai-agent) body #spark-app#spark-app .el-dialog:has(.next-step-row) .el-form-item__content > .mb-3.el-row.is-justify-space-between,html.fxo:not(.fxo-ai-agent) body>.el-dialog__wrapper .el-dialog:has(.next-step-row) .el-form-item__content > .mb-3.el-row.is-justify-space-between{flex:0 0 auto!important;}\nhtml.fxo:not(.fxo-ai-agent) body #spark-app#spark-app .el-dialog:has(.next-step-row) .el-form-item__content > .el-row:not(.el-row--flex),html.fxo:not(.fxo-ai-agent) body>.el-dialog__wrapper .el-dialog:has(.next-step-row) .el-form-item__content > .el-row:not(.el-row--flex){flex:1 1 auto!important;overflow-y:auto!important;min-height:0!important;}\nhtml.fxo:not(.fxo-ai-agent) body #spark-app#spark-app .el-dialog:has(.next-step-row) .el-form-item__content > .mb-3.el-row--flex,html.fxo:not(.fxo-ai-agent) body>.el-dialog__wrapper .el-dialog:has(.next-step-row) .el-form-item__content > .mb-3.el-row--flex{flex:0 0 auto!important;}\nhtml.fxo:not(.fxo-ai-agent) body #spark-app#spark-app .el-dialog:has(.next-step-row) .my-2.el-col.el-col-24.el-col-xs-24.el-col-sm-12.el-col-md-8.el-col-lg-6,html.fxo:not(.fxo-ai-agent) body>.el-dialog__wrapper .el-dialog:has(.next-step-row) .my-2.el-col.el-col-24.el-col-xs-24.el-col-sm-12.el-col-md-8.el-col-lg-6{flex:0 0 50%!important;max-width:50%!important;width:50%!important;}\nhtml.fxo:not(.fxo-ai-agent) body #spark-app#spark-app .el-dialog:has(.next-step-row) .next-step-icon,html.fxo:not(.fxo-ai-agent) body>.el-dialog__wrapper .el-dialog:has(.next-step-row) .next-step-icon{display:none!important}\nhtml.fxo:not(.fxo-ai-agent) body #spark-app#spark-app .el-dialog:has(.next-step-row) .next-step-row,html.fxo:not(.fxo-ai-agent) body>.el-dialog__wrapper .el-dialog:has(.next-step-row) .next-step-row{padding:12px 16px!important;align-items:center!important;min-height:auto!important;height:auto!important}\nhtml.fxo:not(.fxo-ai-agent) body #spark-app#spark-app .el-dialog:has(.next-step-row) .next-step-node,html.fxo:not(.fxo-ai-agent) body>.el-dialog__wrapper .el-dialog:has(.next-step-row) .next-step-node{width:100%!important}\nhtml.fxo:not(.fxo-ai-agent) body #spark-app#spark-app .el-dialog:has(.next-step-row) .text-ellipsis.font-weight-bold,html.fxo:not(.fxo-ai-agent) body>.el-dialog__wrapper .el-dialog:has(.next-step-row) .text-ellipsis.font-weight-bold{white-space:normal!important;overflow:visible!important;text-overflow:unset!important;display:-webkit-box!important;-webkit-line-clamp:2!important;-webkit-box-orient:vertical!important;line-height:1.3!important;font-size:13px!important;}";

/* 3c. Icon pack — from fx-flow.js core (one line-icon set for Element / FontAwesome icons) */
var ICONS=(function(){
var ICON_DEF=[
   ['plus',"<path d='M12 5v14M5 12h14'/>",'plus,circle-plus,circle-plus-outline','plus,plus-circle,plus-square'],
   ['minus',"<path d='M5 12h14'/>",'minus,remove,remove-outline','minus,minus-circle'],
   ['x',"<path d='M6 6l12 12M18 6L6 18'/>",'close,circle-close,circle-close-outline','times,close,xmark,times-circle,window-close'],
   ['check',"<path d='M5 12.5l4.5 4.5L19 7'/>",'check,circle-check,circle-check-outline,success','check,check-circle,check-square'],
   ['chev-d',"<path d='M6 9l6 6 6-6'/>",'arrow-down,caret-bottom','chevron-down,angle-down,caret-down,angle-double-down'],
   ['chev-u',"<path d='M6 15l6-6 6 6'/>",'arrow-up,caret-top','chevron-up,angle-up,caret-up'],
   ['chev-l',"<path d='M15 6l-6 6 6 6'/>",'arrow-left,caret-left,d-arrow-left','chevron-left,angle-left,caret-left,angle-double-left'],
   ['chev-r',"<path d='M9 6l6 6-6 6'/>",'arrow-right,caret-right,d-arrow-right','chevron-right,angle-right,caret-right,angle-double-right'],
   ['arrow-l',"<path d='M19 12H5M11 6l-6 6 6 6'/>",'back','arrow-left,long-arrow-left'],
   ['arrow-r',"<path d='M5 12h14M13 6l6 6-6 6'/>",'right','arrow-right,long-arrow-right'],
   ['search',"<circle cx='11' cy='11' r='6.5'/><path d='M16 16l4.5 4.5'/>",'search','search,magnifying-glass'],
   ['edit',"<path d='M4 20l4.5-1L19 8.5a2.1 2.1 0 0 0-3-3L5.5 16 4 20z'/><path d='M14.5 7l3 3'/>",'edit,edit-outline','pencil,pencil-alt,edit,pen,pen-to-square,pencil-square-o'],
   ['trash',"<path d='M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6'/>",'delete,delete-solid','trash,trash-o,trash-alt'],
   ['dots-v',"<circle cx='12' cy='5' r='1.6'/><circle cx='12' cy='12' r='1.6'/><circle cx='12' cy='19' r='1.6'/>",'','ellipsis-v,ellipsis-vertical',1],
   ['dots-h',"<circle cx='5' cy='12' r='1.6'/><circle cx='12' cy='12' r='1.6'/><circle cx='19' cy='12' r='1.6'/>",'more,more-outline','ellipsis-h,ellipsis',1],
   ['sliders',"<path d='M4 7h9M17 7h3M4 17h3M11 17h9'/><circle cx='15' cy='7' r='2'/><circle cx='9' cy='17' r='2'/>",'setting,s-tools','cog,cogs,gear,gears,sliders,wrench'],
   ['refresh',"<path d='M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7'/>",'refresh,refresh-right','refresh,sync,sync-alt,redo,rotate-right'],
   ['undo',"<path d='M4 10a8 8 0 1 1 1.5 6M4 4v6h6'/>",'refresh-left','undo,history,rotate-left'],
   ['copy',"<rect x='9' y='9' width='11' height='11' rx='2'/><path d='M5 15V6a2 2 0 0 1 2-2h9'/>",'document-copy,copy-document','copy,files-o,clone'],
   ['download',"<path d='M12 4v11M7 11l5 5 5-5M5 20h14'/>",'download','download'],
   ['upload',"<path d='M12 16V5M7 9l5-5 5 5M5 20h14'/>",'upload,upload2','upload'],
   ['link',"<path d='M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1'/><path d='M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1'/>",'link,connection','link,chain'],
   ['eye',"<path d='M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z'/><circle cx='12' cy='12' r='3'/>",'view','eye'],
   ['eye-off',"<path d='M3 3l18 18'/><path d='M10.5 6a10 10 0 0 1 1.5-.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3 3.6M6.4 7.4A16 16 0 0 0 2.5 12S6 18.5 12 18.5c1.4 0 2.6-.3 3.7-.8'/>",'','eye-slash'],
   ['lock',"<rect x='5' y='11' width='14' height='9' rx='2'/><path d='M8 11V8a4 4 0 0 1 8 0v3'/>",'lock','lock'],
   ['unlock',"<rect x='5' y='11' width='14' height='9' rx='2'/><path d='M8 11V8a4 4 0 0 1 7.5-2'/>",'unlock','unlock'],
   ['user',"<circle cx='12' cy='8' r='4'/><path d='M4.5 20a7.5 7.5 0 0 1 15 0'/>",'user,user-solid,s-custom','user,user-circle,user-o'],
   ['users',"<circle cx='9' cy='8' r='3.5'/><path d='M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5'/>",'','users,user-friends,group'],
   ['user-plus',"<circle cx='10' cy='8' r='4'/><path d='M3 20a7 7 0 0 1 14 0M19 8v6M16 11h6'/>",'','user-plus'],
   ['chat',"<path d='M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 21 12z'/>",'chat-dot-round,chat-round,chat-line-round,chat-square,chat-dot-square,s-comment','comment,comments,comment-alt,commenting,comment-o,comments-o'],
   ['mail',"<rect x='3' y='5' width='18' height='14' rx='2'/><path d='M3.5 7l8.5 6 8.5-6'/>",'message,message-solid','envelope,envelope-o'],
   ['phone',"<path d='M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z'/>",'phone,phone-outline','phone,phone-alt'],
   ['calendar',"<rect x='3.5' y='5' width='17' height='15' rx='2'/><path d='M3.5 10h17M8 3v4M16 3v4'/>",'date','calendar,calendar-alt,calendar-o'],
   ['clock',"<circle cx='12' cy='12' r='9'/><path d='M12 7v5l3 2'/>",'time,alarm-clock','clock,clock-o'],
   ['bell',"<path d='M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16zM10 21h4'/>",'bell','bell,bell-o'],
   ['star',"<path d='M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9L12 3.5z'/>",'star-off,star-on','star,star-o'],
   ['info',"<circle cx='12' cy='12' r='9'/><path d='M12 11v5M12 8h.01'/>",'info','info,info-circle'],
   ['alert',"<path d='M12 4l9 16H3L12 4z'/><path d='M12 10v4M12 17h.01'/>",'warning,warning-outline','exclamation-triangle,warning,exclamation,exclamation-circle'],
   ['help',"<circle cx='12' cy='12' r='9'/><path d='M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6M12 17h.01'/>",'question,help','question,question-circle'],
   ['folder',"<path d='M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/>",'folder,folder-opened','folder,folder-o,folder-open'],
   ['folder-plus',"<path d='M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/><path d='M12 11v5M9.5 13.5h5'/>",'folder-add','folder-plus'],
   ['file',"<path d='M6 3h8l4 4v14H6z'/><path d='M14 3v4h4M9 12h6M9 16h6'/>",'document,tickets,notebook-2','file,file-o,file-text,file-text-o,file-alt'],
   ['image',"<rect x='3.5' y='4.5' width='17' height='15' rx='2'/><circle cx='9' cy='10' r='1.6'/><path d='M4 18l5-5 4 4 3-3 4 4'/>",'picture,picture-outline','image,picture-o,file-image-o'],
   ['filter',"<path d='M4 5h16l-6 8v6l-4-2v-4L4 5z'/>",'','filter'],
   ['sort',"<path d='M8 5v14M5 16l3 3 3-3M16 19V5M13 8l3-3 3 3'/>",'sort','sort'],
   ['menu',"<path d='M4 7h16M4 12h16M4 17h16'/>",'menu','bars,navicon'],
   ['home',"<path d='M4 11l8-7 8 7v9H4z'/><path d='M10 20v-6h4v6'/>",'s-home,house','home,house'],
   ['grid',"<rect x='4' y='4' width='6.5' height='6.5' rx='1.5'/><rect x='13.5' y='4' width='6.5' height='6.5' rx='1.5'/><rect x='4' y='13.5' width='6.5' height='6.5' rx='1.5'/><rect x='13.5' y='13.5' width='6.5' height='6.5' rx='1.5'/>",'s-grid','th,th-large,border-all'],
   ['list',"<path d='M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01'/>",'s-order','list,list-ul,list-alt'],
   ['external',"<path d='M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5'/>",'','external-link,external-link-alt,arrow-up-right-from-square'],
   ['send',"<path d='M21 3L3 10.5l7 3 3 7L21 3zM10 13.5L21 3'/>",'position','paper-plane,send,paper-plane-o'],
   ['zap',"<path d='M13 2L4 14h7l-1 8 9-12h-7l1-8z'/>",'lightning','bolt,flash'],
   ['bot',"<rect x='4' y='8' width='16' height='11' rx='3'/><path d='M12 8V5M9 13.5h.01M15 13.5h.01M9.5 16.5h5'/><circle cx='12' cy='4' r='1'/>",'cpu','robot'],
   ['sparkles',"<path d='M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z'/><path d='M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z'/>",'magic-stick','magic,wand-magic-sparkles'],
   ['tag',"<path d='M3 12V4h8l10 10-8 8L3 12z'/><path d='M7.5 8h.01'/>",'price-tag','tag,tags'],
   ['cart',"<path d='M3 4h2l2.2 11h9.6L19 8H6.5'/><path d='M10 20h.01M17 20h.01'/>",'shopping-cart-1,shopping-cart-2,goods','shopping-cart,cart-plus'],
   ['globe',"<circle cx='12' cy='12' r='9'/><path d='M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18'/>",'','globe,globe-americas'],
   ['code',"<path d='M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14'/>",'','code'],
   ['logout',"<path d='M9 4H5v16h4M16 8l4 4-4 4M20 12H9'/>",'switch-button','sign-out,sign-out-alt'],
   ['maximize',"<path d='M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5'/>",'full-screen','expand,arrows-alt,expand-arrows-alt'],
   ['grip',"<circle cx='9' cy='6' r='1.4'/><circle cx='15' cy='6' r='1.4'/><circle cx='9' cy='12' r='1.4'/><circle cx='15' cy='12' r='1.4'/><circle cx='9' cy='18' r='1.4'/><circle cx='15' cy='18' r='1.4'/>",'','grip-vertical',1],
   ['play',"<path d='M7 4.5v15l12-7.5-12-7.5z'/>",'video-play','play,play-circle'],
   ['pause',"<path d='M8 5v14M16 5v14'/>",'video-pause','pause'],
   ['database',"<ellipse cx='12' cy='6' rx='7.5' ry='3'/><path d='M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3'/>",'coin','database'],
   ['shield',"<path d='M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3z'/>",'','shield,shield-alt'],
   ['bars',"<path d='M5 20V10M12 20V4M19 20v-7'/>",'s-data,data-analysis,data-board','bar-chart,chart-bar'],
   ['trend',"<path d='M3 17l6-6 4 4 8-8'/><path d='M15 7h6v6'/>",'data-line','line-chart,chart-line'],
   ['mic',"<rect x='9' y='3' width='6' height='11' rx='3'/><path d='M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21'/>",'microphone','microphone'],
   ['hash',"<path d='M9 4L7 20M17 4l-2 16M4 9h16M3.5 15h16'/>",'','hashtag']
  ];
  var MAPPED={};
  var svgUri=function(body,fill){
    var a=fill?"fill='black'":"fill='none' stroke='black' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'";
    return 'url("data:image/svg+xml,'+("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' "+a+'>'+body+'</svg>').replace(/</g,'%3C').replace(/>/g,'%3E')+'")';
  };
  var ICON_CSS=(function(){
    var out='',IP='html.fxo.fxo-icons body ';
    ICON_DEF.forEach(function(d){
      var sels=[];
      (d[2]||'').split(',').filter(Boolean).forEach(function(n){MAPPED['el-icon-'+n]=1;sels.push(IP+'[class~="el-icon-'+n+'"]::before')});
      (d[3]||'').split(',').filter(Boolean).forEach(function(n){MAPPED['fa-'+n]=1;sels.push(IP+'[class~="fa-'+n+'"]::before')});
      if(!sels.length)return;
      var u=svgUri(d[1],d[4]);
      out+=sels.join(',')+'{content:""!important;display:inline-block!important;width:1em!important;height:1em!important;vertical-align:-.14em!important;line-height:1!important;font-size:inherit!important;background-color:currentColor!important;-webkit-mask:'+u+' center/contain no-repeat!important;mask:'+u+' center/contain no-repeat!important}\n';
    });
    return out;
  })();
  return ICON_CSS;
})();

/* 3d. Flow builder canvas (GoJS) — from fx-flow.js; runs only on the canvas route */
var CANVAS=(function(){
  var TEXT='#1E293B',RADIUS=10,STRIPE=3.5,LINK_W=3.6,DOT=14;   /* LINK_W = line thickness (2.4 thin, 3.6 medium, 4.5 bold) | DOT = travelling dot size */
  var GAP=Math.round(LINK_W*2.5*10)/10, RING=Math.max(2,LINK_W*.7);   /* dot spacing + end rings follow the thickness */
  var PORT=14;               /* size of the visible connection circles (ports) */
  var PORT_RINGS=true;       /* true = visible ring ports on nodes (drag from them to connect) | false = hidden ports */
  var DEBUG=false;           /* true = print 'fx diag' / structure info to the console (for troubleshooting) */
  var log=function(){if(DEBUG)console.log.apply(console,arguments)};
  var ICON_TILE=true;        /* small tinted icon tile next to the title */
  var ANIMATE=true;          /* travelling dot on every link */
  var PINGPONG=true;         /* true = goes and comes back | false = one direction */
  var PERIOD=3600;           /* ms for one full cycle */

  var css=`
/* Canvas controls retained. Dialog styles added in v7.3; node-panel tiles/text boxes added in v7.4. */
body:has(.main-flow-builder){--fx-mint:#24E4BB;--fx-mint-hover:#1DD3AB;--fx-mint-ink:#04241D;--fx-mint-soft:#E7FBF6;--fx-ink:#0A0E1A;--fx-label:#7F848D;--fx-line:#E6EAF2;--fx-divider:#F1F4F9;--fx-chip:#EEF2F9;--fx-off:#D7DEEA;--fx-green:#057A5E;--fx-font:'Inter','IBM Plex Sans Arabic','Segoe UI',system-ui,sans-serif}

/* ---- canvas + top controls (Flexito product look: pale canvas, dotted grid, mint primary) ---- */
.flowbuilder-diagram{background:radial-gradient(circle,#D3DCE8 1.1px,transparent 1.3px) 0 0/24px 24px,#F5FAFE!important}
body:has(.main-flow-builder) .flowbuilder-tip{background:#fff!important;color:var(--fx-label)!important;font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;border-radius:0 0 12px 12px;box-shadow:0 8px 20px -12px rgba(10,14,26,.3)}
body:has(.main-flow-builder) .flowbuilder-actions{background:transparent!important}
body:has(.main-flow-builder) .flowbuilder-actions .el-button{border-radius:12px!important;font-weight:600!important;border:1px solid var(--fx-line)!important;background:#fff!important;color:var(--fx-ink)!important;box-shadow:0 6px 16px -10px rgba(10,14,26,.3)!important}
body:has(.main-flow-builder) .flowbuilder-actions [data-tour-id="flow-btn-publish"]{background:var(--fx-mint)!important;border-color:var(--fx-mint)!important;color:var(--fx-mint-ink)!important}
body:has(.main-flow-builder) .flowbuilder-control-bar>div{border-radius:14px!important;border:1px solid var(--fx-line)!important;box-shadow:0 10px 24px -14px rgba(10,14,26,.3)!important}
body:has(.main-flow-builder) .flowbuilder-control-bar .el-button{border-radius:10px!important}
body:has(.main-flow-builder) .flowbuilder-control-bar .el-button:hover{background:var(--fx-chip)!important}
body:has(.main-flow-builder) #myOverviewDiv{background:#fff!important;border-radius:14px;overflow:hidden;border:1px solid var(--fx-line);box-shadow:0 10px 24px -14px rgba(10,14,26,.3)}


/* Approved compact Add New Step and dropdown rows. */
.view-panel-right > .el-popover:has(.next-step-row){width:280px!important;max-width:calc(100vw - 24px)!important;box-sizing:border-box!important;padding:16px!important;background:#fff!important;border:1px solid #E6EAF2!important;border-radius:20px!important;box-shadow:0 20px 60px -18px rgba(15,35,45,.25)!important;}
.view-panel-right > .el-popover:has(.next-step-row) > .mb-1{position:relative;margin:0 0 10px!important;padding:4px 0 14px!important;border-bottom:1px solid #EEF2F6;gap:8px;color:#0A0E1A!important;font-size:14px!important;font-weight:700!important;}
.view-panel-right > .el-popover:has(.next-step-row) > .mb-1::after{content:"";position:absolute;bottom:-1px;inset-inline-start:0;width:32px;height:3px;border-radius:3px;background:#24E4BB;}
.view-panel-right > .el-popover:has(.next-step-row) > .mb-1 .el-button{padding:7px 10px!important;border:0!important;border-radius:8px!important;background:#F3F5F8!important;color:#667085!important;font-size:11px!important;}
.view-panel-right > .el-popover:has(.next-step-row) .el-scrollbar__wrap{max-height:min(65vh,420px)!important;margin:0!important;overflow:auto!important;scrollbar-width:thin;scrollbar-color:#D7DEEA transparent;}
.view-panel-right > .el-popover:has(.next-step-row) .el-scrollbar__bar{display:none!important;}
.view-panel-right > .el-popover:has(.next-step-row) .el-scrollbar__view{display:block!important;padding:2px!important;}
.view-panel-right > .el-popover:has(.next-step-row) .el-scrollbar__view > .my-1{margin:3px 0!important;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-row{--step-color:#057A5E;--step-bg:#E6F8F2;position:relative!important;display:flex!important;flex-direction:row!important;align-items:center!important;gap:12px!important;width:100%!important;height:52px!important;box-sizing:border-box!important;margin:0!important;padding:8px 12px!important;border:0!important;border-radius:12px!important;background:transparent!important;box-shadow:none!important;cursor:pointer;transition:background .15s;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-row:hover{background:#E7FBF6!important;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-row::after{content:"›";margin-inline-start:auto;color:#057A5E;font:22px/1 sans-serif;opacity:0;transition:opacity .15s;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-row:hover::after{opacity:1;}
.view-panel-right > .el-popover:has(.next-step-row) .message{--step-color:#526477;--step-bg:#EDF1F6;}
.view-panel-right > .el-popover:has(.next-step-row) .question{--step-color:#2784D9;--step-bg:#EAF4FF;}
.view-panel-right > .el-popover:has(.next-step-row) .action{--step-color:#B87B09;--step-bg:#FFF5DD;}
.view-panel-right > .el-popover:has(.next-step-row) .condition{--step-color:#07876D;--step-bg:#E4F8F0;}
.view-panel-right > .el-popover:has(.next-step-row) .randomizer{--step-color:#8651B5;--step-bg:#F3ECFA;}
.view-panel-right > .el-popover:has(.next-step-row) .email{--step-color:#4971BB;--step-bg:#EDF2FC;}
.view-panel-right > .el-popover:has(.next-step-row) .goto{--step-color:#BF489E;--step-bg:#FCECF7;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-icon{display:flex!important;align-items:center!important;justify-content:center!important;width:34px!important;height:34px!important;min-width:34px!important;flex:0 0 34px!important;padding:0!important;margin:0!important;border:0!important;border-radius:10px!important;background:transparent!important;color:var(--step-color)!important;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-icon i{color:var(--step-color)!important;font-size:19px!important;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-node{position:relative!important;flex:1!important;min-width:0!important;width:auto!important;height:auto!important;padding:0!important;margin:0!important;border:0!important;background:transparent!important;color:#243244!important;text-align:start!important;line-height:1.4!important;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-node .text-ellipsis{font-size:12px!important;font-weight:600!important;white-space:normal!important;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-node.pro{padding-inline-end:28px!important;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-node.pro::after{top:50%!important;inset-inline-end:0!important;transform:translateY(-50%);font-size:8px!important;border-radius:4px!important;}
.view-panel-right > .el-popover:has(.next-step-row) .popper__arrow{display:none!important;}
body:has(.main-flow-builder) :is(.el-dropdown-menu,.el-select-dropdown){background:#FFFFFF!important;border:1px solid #E4EBE8!important;border-radius:18px!important;box-shadow:0 24px 60px -20px rgba(16,42,35,.28),0 4px 12px rgba(16,42,35,.04)!important;}
body:has(.main-flow-builder) :is(.el-dropdown-menu,.el-select-dropdown) :is(.el-dropdown-menu__item,.el-select-dropdown__item){box-sizing:border-box!important;margin:4px 8px!important;padding:9px 12px!important;height:auto!important;min-height:38px!important;line-height:20px!important;border-radius:10px!important;font-size:12px!important;background:#F7F9FA!important;}
body:has(.main-flow-builder) :is(.el-dropdown-menu,.el-select-dropdown) :is(.el-dropdown-menu__item,.el-select-dropdown__item):not(.is-disabled):not(.text-danger){color:#253A35!important;}
body:has(.main-flow-builder) :is(.el-dropdown-menu,.el-select-dropdown) :is(.el-dropdown-menu__item,.el-select-dropdown__item):not(.is-disabled):hover,body:has(.main-flow-builder) :is(.el-dropdown-menu,.el-select-dropdown) :is(.el-dropdown-menu__item,.el-select-dropdown__item):not(.is-disabled):focus,body:has(.main-flow-builder) :is(.el-dropdown-menu,.el-select-dropdown) .el-select-dropdown__item.hover:not(.is-disabled){background:#E5FAF2!important;box-shadow:inset 3px 0 0 #24E4BB!important;}
body:has(.main-flow-builder) :is(.el-dropdown-menu,.el-select-dropdown) .el-select-dropdown__item.selected{background:#E5FAF2!important;color:#057A5E!important;}
body:has(.main-flow-builder) :is(.el-dropdown-menu,.el-select-dropdown) :is(.el-dropdown-menu__item,.el-select-dropdown__item).is-disabled{background:transparent!important;color:#A8AFB7!important;}
body:has(.main-flow-builder) :is(.el-dropdown-menu,.el-select-dropdown) .el-scrollbar__thumb{background:#C7D8D1!important;border-radius:20px!important;}

/* ---- Dialogs (previewed locally, now permanent): rounded card, mint accent bar, soft inputs, mint primary button ---- */
body:has(.main-flow-builder) .el-dialog:not(.is-fullscreen){border-radius:20px!important;box-shadow:0 24px 70px -20px rgba(10,30,40,.3)!important;background:#fff!important}
body:has(.main-flow-builder) .el-dialog .el-dialog__header{padding:24px 28px 18px!important;background:#fff!important;border-bottom:1px solid #EDF1F5!important;border-radius:20px 20px 0 0!important}
body:has(.main-flow-builder) .el-dialog .el-dialog__header::before{content:"";display:block;width:36px;height:4px;margin-bottom:12px;border-radius:4px;background:#24E4BB}
body:has(.main-flow-builder) .el-dialog .el-dialog__title{color:#0A0E1A!important;font-size:18px!important;font-weight:700!important}
body:has(.main-flow-builder) .el-dialog .el-dialog__headerbtn{width:32px;height:32px;top:20px!important;inset-inline-end:20px!important;border-radius:50%;background:#F0F3F7!important}
body:has(.main-flow-builder) .el-dialog .el-dialog__body{padding:24px 28px!important}
body:has(.main-flow-builder) .el-dialog .el-input__inner{height:44px!important;border:1px solid #E0E7EF!important;border-radius:11px!important;background:#fff!important;color:#243244!important;box-shadow:none!important}
body:has(.main-flow-builder) .el-dialog .el-textarea__inner{border:1px solid #E0E7EF!important;border-radius:11px!important;background:#fff!important;color:#243244!important}
body:has(.main-flow-builder) .el-dialog .el-input__inner:focus,
body:has(.main-flow-builder) .el-dialog .el-textarea__inner:focus{border-color:#24E4BB!important;box-shadow:0 0 0 3px rgba(36,228,187,.14)!important}
body:has(.main-flow-builder) .el-dialog input::placeholder,
body:has(.main-flow-builder) .el-dialog textarea::placeholder{font-style:normal!important;color:#98A2AF!important}
body:has(.main-flow-builder) .el-dialog .el-button{border-radius:10px!important}
body:has(.main-flow-builder) .el-dialog .el-button--primary{background:#24E4BB!important;border-color:#24E4BB!important;color:#04241D!important}
body:has(.main-flow-builder) .el-dialog .el-button--primary:not(.is-disabled):hover{background:#1DD3AB!important;border-color:#1DD3AB!important}
body:has(.main-flow-builder) .el-dialog .el-dialog__footer{padding:16px 28px 22px!important;border-top:1px solid #EDF1F5}
/* ---- Node panel (v7.4): rounded mint option tiles, PRO badge, Next-step card, filled rounded text boxes ---- */
.node-viewer .addbtn{border:0!important;border-radius:24px!important;background:#EAFBF6!important;color:#04241D!important;font-weight:700!important;box-shadow:none!important;transition:background .15s,transform .15s}
.node-viewer .addbtn:hover,.node-viewer .addbtn:focus{background:#24E4BB!important;color:#04241D!important;transform:translateY(-1px)}
.node-viewer .addbtn svg,.node-viewer .addbtn i{color:#057A5E!important}
.node-viewer .addbtn:hover svg,.node-viewer .addbtn:hover i{color:#04241D!important}
.node-viewer .addbtn::after{border-radius:999px!important;font-size:8px!important}
.node-viewer .el-card.is-none-shadow{border:1px solid #E6EAF2!important;border-radius:24px!important;background:#fff!important;box-shadow:none!important}
.node-viewer .el-card.is-none-shadow .d-flex.align-items-center[class*="next-"]{border-radius:16px!important;overflow:hidden!important}

/* text boxes: filled soft surface, no grey border, 16px radius, mint focus ring (header title + note box excluded below) */
.node-viewer .card-body .el-input__inner,.node-viewer .card-body .el-textarea__inner{background:#F3F6F9!important;border:1.5px solid transparent!important;border-radius:16px!important;color:#0A0E1A!important;box-shadow:none!important;transition:background .15s,border-color .15s,box-shadow .15s}
.node-viewer .card-body .el-input__inner{height:46px!important;padding:0 16px!important}
.node-viewer .card-body .el-textarea__inner{padding:12px 16px!important}
.node-viewer .card-body .el-input__inner:hover,.node-viewer .card-body .el-textarea__inner:hover{background:#EDF2F6!important}
.node-viewer .card-body .el-input__inner:focus,.node-viewer .card-body .el-textarea__inner:focus{background:#fff!important;border-color:#24E4BB!important;box-shadow:0 0 0 4px rgba(36,228,187,.16)!important}
.node-viewer .card-body input::placeholder,.node-viewer .card-body textarea::placeholder{font-style:normal!important;color:#98A2AF!important}
.node-viewer .card-body .el-input.is-disabled .el-input__inner{background:#EDF1F5!important;color:#98A2AF!important}
.node-viewer .card-body .el-select .el-input .el-select__caret{color:#98A2AF!important}
/* the </> tab attached to a text box */
.node-viewer .card-body .el-input-group__prepend{background:#E6EBF1!important;border:0!important;border-radius:0!important;border-start-start-radius:16px!important;border-end-start-radius:16px!important;color:#667085!important;padding:0 14px!important}
.node-viewer .card-body .el-input-group--prepend .el-input__inner{border-radius:0!important;border-start-end-radius:16px!important;border-end-end-radius:16px!important}
/* note box stays a soft yellow pill-box */
.node-viewer .alert.alert-warning{border:0!important;border-radius:16px!important}
.node-viewer .card-body .alert .el-textarea__inner{background:transparent!important;border:0!important;box-shadow:none!important;color:#8a6d3b!important;padding:6px 10px!important}

`;
  /* style: injected once by the unified engine (canvasCss) */

  var P={
    start:'<polygon points="5 3 19 12 5 21 5 3"/>',
    message:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    action:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    condition:'<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
    randomizer:'<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>',
    question:'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    email:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    goto:'<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>',
    comment:'<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    output:'<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>'
  };
  var uri=function(b,col){return 'data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+col+'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'+b+'</svg>')};
  var tint=function(c,a){var m=/^#?([0-9a-f]{6})$/i.exec(c);if(!m)return c;var v=parseInt(m[1],16);return 'rgba('+(v>>16)+','+((v>>8)&255)+','+(v&255)+','+a+')'};

  var get=function(){
    if(typeof go==='undefined')return null;
    var el=document.querySelector('.flowbuilder-diagram');
    return el?go.Diagram.fromDiv(el):null;
  };
  var kids=function(p){var a=[];p.elements.each(function(e){a.push(e)});return a};
  var isP=function(e){return e instanceof go.Panel};

  var accent=function(n){
    if(n.__acc)return n.__acc;
    var a=null,ci=null;
    var f=function(o){
      if(!a&&o instanceof go.Shape&&o.figure==='Circle'&&typeof o.fill==='string'&&o.fill[0]==='#'){a=o.fill;ci=o}
      if(!a&&o instanceof go.Panel)o.elements.each(f);
    };
    f(n);n.__circ=ci;return(n.__acc=a||'#6366f1');
  };
  var isWhiteRR=function(o){return o instanceof go.Shape&&o.figure==='RoundedRectangle'&&(String(o.fill).toLowerCase()==='#ffffff'||o.__k)};
  var findCard=function(n){
    if(n.__csDone)return n.__cs;
    var A=kids(n).filter(isP)[0],cd=A&&kids(A).filter(isP)[1],s=cd&&kids(cd).filter(function(e){return e instanceof go.Shape})[0];
    if(!isWhiteRR(s)){                 /* not the card: look for the white rounded rectangle anywhere in the node */
      s=null;
      var f=function(o){if(s)return;if(o instanceof go.Shape&&o.name!=='SHAPE'&&isWhiteRR(o)){s=o;return}if(o instanceof go.Panel)o.elements.each(f)};f(n);
    }
    n.__try=(n.__try||0)+1;
    if(s||n.__try>5){n.__cs=s||null;n.__csDone=1}
    return s;
  };
  var card=function(cs,c){
    var W=cs.actualBounds.width,H=cs.actualBounds.height;
    if(!(isFinite(W)&&isFinite(H)&&W>=30&&H>=24)){cs.parameter1=RADIUS;return}   /* not measured yet: never build a gradient on it */
    if(window.__fxNoBrush){cs.fill='#ffffff';cs.stroke=c;cs.strokeWidth=1.5;cs.parameter1=RADIUS;cs.shadowVisible=true;return}
    var key=Math.round(H)+'|'+c;
    if(cs.__k!==key){
      var s=Math.min(.12,STRIPE/H);
      var br=new go.Brush(go.Brush.Linear);br.start=go.Spot.Top;br.end=go.Spot.Bottom;
      br.addColorStop(0,c);br.addColorStop(s,c);br.addColorStop(s+.001,'#fff');br.addColorStop(1,'#fff');
      cs.fill=br;cs.__k=key;
    }
    cs.parameter1=RADIUS;cs.stroke='rgba(15,23,42,.06)';cs.strokeWidth=1;cs.shadowVisible=true;
  };

  /* safety net: if the canvas ever throws a gradient error, switch every card to a solid fill and stop using gradients */
  window.addEventListener('error',function(e){
    if(!e||!/createLinearGradient|non-finite/i.test(String(e.message)))return;
    if(window.__fxNoBrush)return;window.__fxNoBrush=1;
    console.warn('fx: gradient paint error -> falling back to solid cards');
    var d=get();if(d)d.nodes.each(function(n){var cs=n.__cs;if(cs&&cs.__k){cs.fill='#ffffff';cs.__k=null}});
  });

  var ports=function(n,c){             /* input port = the top circle: hide the big icon, keep a small visible ring */
    if(n.__hp)return;var ci=n.__circ;if(!ci||!ci.panel)return;n.__hp=1;
    ci.panel.elements.each(function(g){if(g instanceof go.Shape&&g!==ci)g.visible=false});
    if(!PORT_RINGS||String(n.category||'').toLowerCase()==='start'){   /* start has no input: keep it invisible */
      ci.fill='transparent';ci.stroke=null;ci.strokeWidth=0;ci.desiredSize=new go.Size(1,1);
      ci.panel.desiredSize=new go.Size(1,1);ci.panel.margin=new go.Margin(0);return;
    }
    ci.figure='Circle';ci.fill='#fff';ci.stroke=c;ci.strokeWidth=3;ci.desiredSize=new go.Size(PORT,PORT);
    ci.panel.desiredSize=new go.Size(NaN,NaN);ci.panel.margin=new go.Margin(0,0,-3,0);
  };
  var tile=function(n,c){              /* small tinted square with a line icon */
    var b=P[String(n.category||'').toLowerCase()];if(!b)return null;
    var t=new go.Panel(go.Panel.Auto);t.name='FXTILE';t.margin=new go.Margin(0,8,0,0);t.alignment=go.Spot.Center;
    var bg=new go.Shape();bg.figure='RoundedRectangle';bg.parameter1=7;bg.fill='rgba(0,0,0,0)';bg.strokeWidth=0;bg.desiredSize=new go.Size(24,24);
    var pic=new go.Picture();pic.source=uri(b,c);pic.desiredSize=new go.Size(14,14);
    t.add(bg);t.add(pic);return t;
  };
  var title=function(n){               /* move the name into the card as its first row (with the icon tile) */
    if(n.__moved)return;n.__moved=1;
    var A=kids(n).filter(isP)[0];if(!A){log('fx: no inner panel in node type',JSON.stringify(n.category||''));return}
    var ab=kids(A).filter(isP),hd=ab[0],cd=ab[1];
    if(!hd||!cd){log('fx: header/card not found in node type',JSON.stringify(n.category||''));return}
    var content=kids(cd).filter(isP)[0];if(!content){log('fx: no content panel in node type',JSON.stringify(n.category||''));return}
    var txt=null;var f=function(o){if(!txt&&o instanceof go.TextBlock)txt=o;if(o instanceof go.Panel)o.elements.each(f)};f(hd);
    if(!txt||!txt.panel||!txt.panel.panel){log('fx: name panel not found in node type',JSON.stringify(n.category||''));return}
    var tp=txt.panel;tp.panel.remove(tp);content.insertAt(0,tp);
    tp.alignment=go.Spot.Left;tp.margin=new go.Margin(10,12,6,12);
    txt.textAlign='left';txt.margin=new go.Margin(0);
    var fam=(txt.font||'').replace(/^.*?px\s*/,'')||'sans-serif';txt.font='bold 12px '+fam;
    txt.__lbl=true;
    if(ICON_TILE){var t=tile(n,accent(n));if(t){tp.type=go.Panel.Horizontal;tp.insertAt(0,t);txt.alignment=go.Spot.Center}else txt.alignment=go.Spot.Left}
    else txt.alignment=go.Spot.Left;
  };

  var styleNode=function(n){
    var c=accent(n),cs=findCard(n);
    var sel=n.findObject('SHAPE');if(sel){sel.parameter1=RADIUS+4;sel.shadowVisible=false}
    var walk=function(o){
      if(o instanceof go.TextBlock){
        o.shadowVisible=false;
        if(o.__lbl||String(o.stroke).toLowerCase()==='#ffffff'){o.__lbl=true;o.stroke=TEXT}
      }else if(o instanceof go.Picture){o.shadowVisible=false}
      else if(o instanceof go.Shape){
        if(o===cs||o===sel)return;
        o.shadowVisible=false;
        var f=String(o.fill).toLowerCase();
        if(o.figure==='RoundedRectangle'){
          if(o.name==='FXTILE'||(o.panel&&o.panel.name==='FXTILE'))return;
          o.parameter1=(o.name==='ButtonBorder')?12:8;
          if(f==='#f1f0f0')o.fill='#F1F5F9';
          else if(f==='#8492a6'){o.fill=c;o.stroke=c;o.opacity=.35}
        }else if(o.figure==='Circle'&&f==='#8492a6'){
          if(PORT_RINGS){o.fill='#fff';o.stroke=c;o.strokeWidth=3;o.desiredSize=new go.Size(PORT,PORT)}
          else{o.fill=c;o.stroke=c}
        }
      }
      if(o instanceof go.Panel)o.elements.each(walk);
    };
    walk(n);
    if(cs)card(cs,c);
    n.isShadowed=true;n.shadowColor='rgba(15,23,42,.10)';n.shadowBlur=18;n.shadowOffset=new go.Point(0,6);
    ports(n,c);title(n);
  };

  var styleLink=function(l,tmp,src){
    var sn=src||l.fromNode,c=sn?accent(sn):'#94a3b8';
    l.elements.each(function(o){
      if(!(o instanceof go.Shape)||o.name==='FXFROM'||o.name==='FXMID')return;
      if(o===l.path){o.stroke=c;o.strokeWidth=LINK_W;o.strokeCap='round';o.strokeDashArray=[.1,GAP];o.opacity=.95}
      else if(PORT_RINGS){o.visible=false}
      else{o.toArrow='Circle';o.fill='#fff';o.stroke=c;o.strokeWidth=RING;o.strokeDashArray=null;o.scale=1}
    });
    var fr=l.findObject('FXFROM'),md=l.findObject('FXMID');
    try{
      if(PORT_RINGS){if(fr)fr.visible=false}
      else{
        if(!fr){fr=new go.Shape();fr.name='FXFROM';fr.fromArrow='Circle';fr.fill='#fff';l.add(fr)}
        fr.stroke=c;fr.strokeWidth=RING;fr.scale=1;
      }
      if(!tmp){
        if(!md){md=new go.Shape();md.name='FXMID';md.figure='Circle';md.segmentIndex=NaN;md.segmentFraction=.5;l.add(md)}
        md.desiredSize=new go.Size(DOT,DOT);md.fill=c;md.stroke='#fff';md.strokeWidth=Math.max(2,DOT/5);
      }
    }catch(e){}
  };

  var overview=function(){             /* minimap viewport box: dark thin outline instead of the platform's magenta */
    if(window.__fxOv)return;
    try{
      var el=document.getElementById('myOverviewDiv'),ov=el&&go.Diagram.fromDiv(el);
      if(!ov||!ov.box)return;
      var s=ov.box.findObject('BOXSHAPE')||ov.box.elt(0);if(!s)return;
      s.stroke='#334155';s.strokeWidth=2;s.fill='rgba(51,65,85,.06)';window.__fxOv=1;
    }catch(e){}
  };

  var tick=function(){
    var d=get();if(!d)return;
    var prev=d.skipsUndoManager;d.skipsUndoManager=true;
    d.nodes.each(function(n){try{styleNode(n)}catch(e){n.__fails=(n.__fails||0)+1;if(n.__fails===1)console.warn('fx node failed:',n.category,e.message)}});
    d.links.each(function(l){try{styleLink(l)}catch(e){}});
    d.skipsUndoManager=prev;
    overview();
  };
  /* started and stopped by the engine (canvas route only) */

  /* every frame: style brand-new nodes/links at once, and the link being dragged, so the platform's look never flashes */
  var fast=function(){
    var d=get();if(!d)return;
    var prev=d.skipsUndoManager;d.skipsUndoManager=true;
    d.nodes.each(function(n){if((n.__f||0)>8)return;n.__f=(n.__f||0)+1;try{styleNode(n)}catch(e){}});
    d.links.each(function(l){if((l.__f||0)>8)return;l.__f=(l.__f||0)+1;try{styleLink(l)}catch(e){}});
    var tm=d.toolManager;
    ['linkingTool','relinkingTool'].forEach(function(k){
      var t=tm&&tm[k];
      if(t&&t.isActive&&t.temporaryLink){try{styleLink(t.temporaryLink,true,t.originalFromNode||t.originalToNode)}catch(e){}}
    });
    d.skipsUndoManager=prev;
  };

  /* travelling dot: ~30fps, only links in view, paused while the user drags/links or the tab is hidden */
  var last=0;
  var loop=function(ts){
    try{fast()}catch(e){}
    try{
      if(ANIMATE&&!document.hidden&&ts-last>=33){
        last=ts;
        var d=get();
        if(d&&!(d.currentTool&&d.currentTool.isActive)){
          var vb=d.viewportBounds,i=0,prev=d.skipsUndoManager;
          d.skipsUndoManager=true;
          d.links.each(function(l){
            var md=l.findObject('FXMID');if(!md)return;
            i++;
            if(!vb.intersectsRect(l.actualBounds))return;
            var p=((ts/PERIOD)+i*.137)%1;
            var fr=PINGPONG?(.5-.5*Math.cos(p*2*Math.PI)):p;
            md.segmentFraction=fr;
          });
          d.skipsUndoManager=prev;
        }
      }
    }catch(e){}
    if(running)raf=requestAnimationFrame(loop);
  };


  var running=false,raf=0,iv=0;
  return {css:canvasCss(css),
    start:function(){if(running)return;running=true;iv=setInterval(tick,800);try{tick()}catch(e){}raf=requestAnimationFrame(loop)},
    stop:function(){if(!running)return;running=false;clearInterval(iv);cancelAnimationFrame(raf)},
    running:function(){return running}};
})();

/* 3e. Sub Flows + Library folder layouts — from fx-flow.js; tagging runs from the one engine */
var SUBFLOWS=(function(){
  var NAME='Build with AI';   /* label of the AI button (top of the folders rail) */
  var DEBUG=false;            /* true = print what the module found (troubleshooting) */
  var svg=function(p,a){return 'url("data:image/svg+xml,'+encodeURIComponent('<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' '+a+'>'+p+'</svg>')+'")'};
  var G="fill='none' stroke='#057A5E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'";
  var K="fill='none' stroke='#000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'";
  var FD="<path d='M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/>";
  var chat=svg("<path d='M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 21 12z'/>",G);
  var branch=svg("<circle cx='6' cy='5' r='2'/><circle cx='6' cy='19' r='2'/><circle cx='18' cy='8' r='2'/><path d='M6 7v10M18 10c0 4-4 5-10 8'/>",G);
  var braces=svg("<path d='M9 4C6 4 6 6 6 8v2c0 1.5-1 2-2 2 1 0 2 .5 2 2v2c0 2 0 4 3 4M15 4c3 0 3 2 3 4v2c0 1.5 1 2 2 2-1 0-2 .5-2 2v2c0 2 0 4-3 4'/>",G);
  var folder=svg(FD,G);
  var foldPlus=svg(FD+"<path d='M12 11v5M9.5 13.5h5'/>",K);
  var spark=svg("<path d='M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z'/><path d='M19 3l.8 2.2L22 6l-2.2.8L19 9l-.8-2.2L16 6l2.2-.8z'/>","fill='#000'");

  var css=`
.fx-page{--m:#24E4BB;--d:#0A0E1A;--ln:#E6EAF2;--soft:#E7FBF6;--g:#057A5E;--lb:#7F848D;--nav:#1B2137;--omni:#A684FF;position:relative;display:grid!important;grid-template-columns:248px minmax(0,1fr);grid-auto-rows:min-content;margin:12px;padding:0!important;border:1px solid var(--ln);border-radius:22px;overflow:hidden;background:#F5FAFE!important;min-height:calc(100vh - 260px)}
.fx-page>*{grid-column:2;min-width:0}
.fx-page .el-button,.fx-page .el-input__inner,.fx-page .el-select{font-family:inherit!important}
/* rail: folders */
.fx-page>.fx-folders{position:relative!important;grid-column:1;grid-row:1/span 6;align-self:stretch;margin:0!important;padding:84px 12px 22px!important;border:0!important;border-inline-end:1px solid var(--ln)!important;border-radius:0!important;background:#fff!important}
.fx-folders::before{content:var(--fxo-copy-folders);display:block;padding:0 10px 6px;font-size:10px;font-weight:700;letter-spacing:.16em;line-height:30px;color:var(--lb)}
.fx-folders>div,.fx-folders>div>div,.fx-folders .el-row,.fx-folders .el-col{position:static!important}
.fx-folders .el-row{display:flex!important;flex-direction:column;gap:2px;margin:0!important}
.fx-folders .el-row::before,.fx-folders .el-row::after{display:none!important}
.fx-folders .el-col{width:100%!important;max-width:100%!important;padding:0!important;float:none!important}
.fx-folders .flow-card{height:46px!important;margin:0!important;border:0!important;border-radius:10px!important;background:transparent!important;box-shadow:none!important;transform:none!important}
.fx-folders .flow-card-title{background:transparent!important;border:0!important;height:100%;color:var(--d)!important;font-size:15px!important;font-weight:500}
.fx-folders .flow-card-title .font-weight-bold{font-size:15px!important;font-weight:500!important}
.fx-folders .flow-card:hover{background:var(--soft)!important}
.fx-folders .flow-card:hover .flow-card-title{color:var(--g)!important}
.fx-folders .pro-badge .badge{background:var(--soft)!important;color:var(--g)!important;border-radius:999px;font-size:11px;font-weight:700;padding:3px 8px}
.fx-folders .flow-card-title .el-button{border:0!important;background:transparent!important;box-shadow:none!important;opacity:0;transition:opacity .15s;padding:6px!important}
.fx-folders .flow-card:hover .el-button{opacity:1}
/* create folder: icon only, label on hover */
.fx-page .fx-folders .el-button.addbtn{position:absolute!important;top:86px;inset-inline-end:14px;z-index:5;width:26px;height:26px;min-height:26px!important;max-height:26px!important;margin:0!important;padding:0 5px!important;display:flex!important;align-items:center;justify-content:flex-start;overflow:hidden;white-space:nowrap;border:0!important;border-radius:8px!important;background:var(--omni)!important;color:#fff!important;font-size:11px!important;font-weight:700;transition:width .22s ease}
.fx-folders .addbtn i{display:none!important}
.fx-folders .addbtn::before{content:'';flex:none;width:14px;height:14px;background:currentColor;-webkit-mask:${foldPlus} center/contain no-repeat;mask:${foldPlus} center/contain no-repeat}
.fx-folders .addbtn>span{font-size:0;opacity:0;margin-inline-start:0;transition:opacity .15s .05s,margin .2s}
.fx-page .fx-folders .el-button.addbtn:hover{width:118px}
.fx-folders .addbtn:hover>span{font-size:11px;opacity:1;margin-inline-start:6px}
/* header */
.fx-head,.fx-head .text-right{position:static!important}
.fx-head{padding:26px 28px 10px!important;margin:0!important}
.fx-head .mr-auto{font-size:26px!important;line-height:1.15;font-weight:800;letter-spacing:-.02em;color:var(--d)!important}
.fx-head .mr-auto::after{content:'';display:block;width:36px;height:4px;border-radius:4px;background:var(--m);margin-top:8px}
.fx-head .el-button{height:40px;border-radius:999px!important;padding:0 18px!important;font-size:13px!important;font-weight:600!important;box-shadow:none!important}
/* AI button: top of the rail, same navy as the side menu */
.fx-page .fx-head .el-button.fx-ai{position:absolute!important;top:22px;inset-inline-start:14px;width:220px;height:46px!important;z-index:8;display:flex!important;align-items:center;justify-content:center;gap:8px;padding:0 16px!important;border:0!important;border-radius:14px!important;background:var(--nav)!important;color:#fff!important;font-size:0!important;box-shadow:0 10px 24px -14px rgba(27,33,55,.7)!important;transition:background .15s,color .15s,transform .15s}
.fx-head .el-button.fx-ai>*{display:none!important}
.fx-head .el-button.fx-ai::before{content:'';flex:none;width:16px;height:16px;background:var(--omni);-webkit-mask:${spark} center/contain no-repeat;mask:${spark} center/contain no-repeat}
.fx-head .el-button.fx-ai::after{content:var(--fxo-copy-build-ai);font-size:14px;font-weight:600;line-height:1}
.fx-page .fx-head .el-button.fx-ai:hover{background:var(--omni)!important;color:#fff!important;transform:translateY(-1px)}
.fx-head .el-button.fx-ai:hover::before{background:#04241D}
/* toolbar */
.fx-tools{display:flex!important;align-items:center;gap:10px;padding:8px 28px 18px!important;margin:0!important}
.fx-tools .el-input__inner{height:40px;border-radius:999px!important;border:1px solid var(--ln)!important;background:#fff!important;padding-inline-start:16px;color:var(--d)!important}
.fx-tools .el-input__inner:focus{border-color:var(--m)!important;box-shadow:0 0 0 3px rgba(36,228,187,.22)!important}
.fx-tools .el-button{border-radius:999px!important;border:1px solid var(--ln)!important;background:#fff!important;color:var(--d)!important}
/* flow rows: no images, one per row */
.fx-list{display:grid!important;grid-template-columns:1fr!important;gap:8px!important;align-content:start;padding:0 28px 28px!important;margin:0!important}
.fx-list::before,.fx-list::after{display:none!important}
.fx-list>.el-col{width:auto!important;max-width:none!important;padding:0!important;float:none!important}
.fx-list .flow-card{display:grid!important;grid-template-columns:minmax(0,1fr)!important;grid-template-rows:auto auto!important;height:auto!important;min-height:68px!important;align-content:center;margin:0!important;padding:12px 0!important;background:#fff!important;border:1px solid var(--ln)!important;border-radius:16px!important;overflow:hidden;box-shadow:none!important;transition:transform .18s,box-shadow .18s,border-color .18s}
.fx-list .flow-card:hover{transform:translateY(-2px);border-color:var(--m)!important;box-shadow:0 14px 30px -18px rgba(10,14,26,.3)!important}
.fx-list .flow-card::before{content:'';position:absolute;inset-inline-start:0;top:0;bottom:0;width:4px;background:var(--m);opacity:0;transition:opacity .18s;z-index:7}
.fx-list .flow-card:hover::before{opacity:1}
.fx-list .flow-card>:not(.flow-card-title):not(.absolute){display:none!important}
.fx-list .flow-card-title{grid-column:1!important;grid-row:1!important;align-self:center!important;height:auto!important;padding-block:0!important;padding-inline:20px 14px!important;background:transparent!important;border:0!important;color:var(--d)!important;line-height:1.35}
.fx-list .flow-card-title .font-weight-bold{font-size:15px!important;font-weight:600!important}
.fx-list .flow-card>.absolute{position:static!important;grid-column:1!important;grid-row:2!important;align-self:start;width:auto!important;background:transparent!important;color:var(--lb)!important;font-size:12px!important;font-weight:500;text-align:start!important;padding:2px 20px 0!important}
.fx-list .flow-card>.absolute .px-3{padding:0!important;width:auto!important;font-size:12px!important}
.fx-list .flow-card>.absolute .px-3::before{content:'';display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--m);margin-inline-end:7px}
.fx-list .flow-card-title .el-button{border:1px solid var(--ln)!important;border-radius:10px!important;background:#fff!important;color:var(--d)!important;box-shadow:none!important}
.fx-list .flow-card-title .el-button:hover{background:var(--soft)!important;border-color:var(--m)!important;color:var(--g)!important}
.fx-page .el-switch__core{background:#D7DEEA!important;border-color:transparent!important}
.fx-page .el-switch.is-checked .el-switch__core{background:var(--m)!important;border-color:var(--m)!important}
/* labels: slim horizontal strip on top */
.fx-wrap{flex-direction:column!important}
.fx-wrap>.fx-main{width:100%!important;flex:1 1 auto!important;min-width:0!important}
.fx-labels{display:flex!important;flex-direction:row!important;flex-wrap:wrap;align-items:center;gap:8px 14px;flex:none!important;width:auto!important;max-width:none!important;min-width:0!important;height:auto!important;max-height:none!important;overflow:visible!important;margin:12px 12px 0!important;padding:8px 16px!important;background:#fff!important;border:1px solid #E6EAF2!important;border-radius:16px}
.fx-flat{display:contents!important}
.fx-atom{width:auto!important;max-width:none!important;min-width:0;margin:0!important;flex:none!important}
.fx-atom.fx-row{position:relative;display:flex!important;align-items:center;gap:6px;padding:0!important}
.fx-labels .fx-edit{position:absolute!important;top:-14px;inset-inline-end:-12px;width:26px!important;height:26px!important;min-width:0!important;padding:0!important;z-index:5;border-radius:8px!important}
.fx-lb-title,.fx-lb-txt{font-size:16px!important;font-weight:700!important;color:#0A0E1A!important;letter-spacing:0!important;text-transform:none!important;white-space:nowrap}
.fx-lb-txt>*{font-size:14px;font-weight:400}
.fx-labels .fx-add{order:99;margin-inline-start:auto!important;flex:none!important;width:28px!important;height:28px!important;min-width:0!important;min-height:0!important;padding:0!important;border:0!important;border-radius:8px!important;background:var(--omni,#A684FF)!important;color:#fff!important;display:inline-flex!important;align-items:center;justify-content:center;position:static!important;opacity:1!important;visibility:visible!important;box-shadow:none!important}
.fx-labels .fx-add:hover{background:#946FF5!important}
.fx-labels .fx-add,.fx-labels .fx-add *{color:#fff!important;font-size:14px!important}
/* flow / folder icons */
html body .fx-page .flow-card i.svg-icon.svg-icon.svg-icon{position:relative!important;display:inline-block!important;width:32px!important;height:32px!important;min-width:32px;border-radius:10px!important;background:transparent!important;-webkit-mask:none!important;mask:none!important;content:normal!important;filter:none!important;font-size:0!important;line-height:0!important;vertical-align:middle;overflow:hidden}
html body .fx-page .flow-card i.svg-icon.svg-icon.svg-icon::after{display:none!important}
html body .fx-page .flow-card i.svg-icon.svg-icon.svg-icon::before{content:''!important;position:absolute!important;inset:0!important;display:block!important;width:auto!important;height:auto!important;-webkit-mask:none!important;mask:none!important;background:var(--fxi) center/18px no-repeat!important}
html body .fx-page .flow-card i.svg-web-flow{--fxi:${chat}}
html body .fx-page .flow-card i.svg-workflow-flow{--fxi:${branch}}
html body .fx-page .flow-card i.svg-function-flow{--fxi:${braces}}
html body .fx-page .flow-card i.el-icon-folder.el-icon-folder{display:inline-block!important;width:20px!important;height:20px!important;font-size:0!important;background:${folder} center/18px no-repeat!important}
html body .fx-page .flow-card i.el-icon-folder.el-icon-folder::before{content:none!important}
`;

  /* Library-style pages (folders + table): same approved rail layout as Sub Flows, derived from its own rules */
  css+='\n'+css.split('\n').filter(function(l){return /^\.fx-page(>\*|>\.fx-folders|\{| \.fx-folders \.el-button\.addbtn)/.test(l)}).map(function(l){return l.replace(/\.fx-page/g,'.fx-lib').replace('padding:84px 12px 22px','padding:22px 12px 22px').replace('top:86px','top:24px')}).join('\n')+'\n.fx-lib-body{padding:0 28px 20px!important}\n.fx-lib>.fx-tools{padding:14px 28px!important}\n';
  var HAS='input[type=checkbox],.el-checkbox',BTN='button,.el-button,[role=button]',PLUS='[class*=plus]',EDIT='[class*=edit],[class*=pencil]';
  var logged=false;
  /* the platform gives these containers no stable classes, so we tag them */
  var tag=function(){
    var t=document.querySelector('.mb-4 > .mr-auto');
    if(!t||!document.querySelector('.flow-card'))return;
    var H=t.parentElement,P=H.parentElement;
    var up=function(e){while(e&&e.parentElement!==P)e=e.parentElement;return e||null};
    var F=up([].slice.call(P.querySelectorAll('.mt-2.py-2.px-3.border.rounded')).filter(function(e){return e.querySelector('.folder-card')})[0]);
    var S=up(P.querySelector('.el-select'));
    var c=P.querySelector('.flow-card:not(.folder-card)');
    var L=c&&c.closest('.el-row');
    P.classList.add('fx-page');H.classList.add('fx-head');
    if(F)F.classList.add('fx-folders');
    if(S)S.classList.add('fx-tools');
    if(L)L.classList.add('fx-list');
    /* v16.7: each card's content row is tagged so groups wrap as a whole on narrow screens (FIX_CSS) */
    if(L)[].forEach.call(L.querySelectorAll('.flow-card-title'),function(t){
      var r=t;while(r.children.length===1&&r.firstElementChild)r=r.firstElementChild;
      if(r.children.length<2)return;
      if(!r.hasAttribute('data-fxo-frow'))r.setAttribute('data-fxo-frow','');
      var nm=[].filter.call(r.children,function(c){return (c.textContent||'').trim()&&!c.querySelector('.el-switch,button,.el-button,.el-dropdown')})[0];
      if(nm&&!nm.hasAttribute('data-fxo-fname'))nm.setAttribute('data-fxo-fname','');
    });
    var hb=[].slice.call(H.querySelectorAll('.el-button'));
    var ai=hb.filter(function(b){return /generate/i.test(b.textContent)})[0]||hb.filter(function(b){return !b.classList.contains('el-button--primary')})[0];
    if(ai)ai.classList.add('fx-ai');
    /* labels strip */
    var R=P.closest('.flex-1');if(!R)return;
    var W=R.parentElement;W.classList.add('fx-wrap');R.classList.add('fx-main');
    var Lb=[].slice.call(W.children).filter(function(x){return x!==R&&x.querySelector(HAS)})[0];
    if(!Lb)return;
    Lb.classList.add('fx-labels');
    var cur=Lb.querySelector(HAS),rows=[];
    while(cur&&cur.parentElement){
      var p=cur.parentElement;
      var kids=[].slice.call(p.children).filter(function(ch){return ch.matches(HAS)||ch.querySelector(HAS)});
      if(kids.length>=2){rows=kids;break}
      if(p===Lb)break;
      cur=p;
    }
    var btns=[].slice.call(Lb.querySelectorAll(BTN));
    var isEdit=function(b){return b.matches(EDIT)||!!b.querySelector(EDIT)};
    var inRows=function(b){return rows.some(function(r){return r.contains(b)})};
    var add=btns.filter(function(b){return !isEdit(b)&&(b.matches(PLUS)||!!b.querySelector(PLUS)||b.textContent.trim()==='+')})[0]
      ||btns.filter(function(b){return !isEdit(b)&&!/\p{L}/u.test(b.textContent)&&!inRows(b)})[0];
    btns.forEach(function(b){if(b!==add&&isEdit(b))b.classList.add('fx-edit')});
    var all=[].slice.call(Lb.querySelectorAll('*'));
    var title=all.filter(function(e){return !e.children.length&&/^\s*(labels|التصنيفات|التسميات|תוויות|תגיות)\s*$/i.test(e.textContent)})[0];
    var dd=all.filter(function(e){var x=e.textContent.trim();return /(selected|محدد|مختار|تم التحديد|נבחר|נבחרו)/i.test(x)&&x.length<40&&!e.querySelector(HAS)&&!(add&&e.contains(add))})[0];
    var tw=null;
    if(!title){var w=document.createTreeWalker(Lb,NodeFilter.SHOW_TEXT),n;while((n=w.nextNode())){if(/^\s*(labels|التصنيفات|التسميات|תוויות|תגיות)\s*$/i.test(n.nodeValue)){tw=n.parentElement;break}}}
    var atoms=rows.slice();
    if(add)atoms.push(add);
    if(dd)atoms.push(dd);
    if(title)atoms.push(title);
    var flat=function(el){var q=el&&el.parentElement;while(q&&q!==Lb){if(atoms.indexOf(q)<0)q.classList.add('fx-flat');q=q.parentElement}};
    atoms.forEach(function(a){a.classList.add('fx-atom');flat(a)});
    rows.forEach(function(r){r.classList.add('fx-row')});
    if(add)add.classList.add('fx-add');
    if(title)title.classList.add('fx-lb-title');
    else if(tw&&tw!==Lb){tw.classList.add('fx-lb-txt','fx-flat');flat(tw)}
    if(DEBUG&&!logged){logged=true;console.log('fx flows',{folders:!!F,list:!!L,tools:!!S,ai:!!ai,labels:!!Lb,labelRows:rows.length,add:add?add.outerHTML.slice(0,120):null,dropdown:!!dd})}
  };

  /* pages that have folder tiles but are not the Sub Flows page: folders -> left rail, toolbar + table -> right column */
  var tagLib=function(){
    if(document.querySelector('.fx-page'))return;
    var fc=document.querySelector('.folder-card');if(!fc)return;
    var F=null,P=null;
    for(var e=fc;e&&e.parentElement&&e!==document.body;e=e.parentElement){
      var par=e.parentElement,t=par.querySelector('.el-table,table,.el-pagination');
      if(t&&!e.contains(t)){F=e;P=par;break}
    }
    if(!F||!P)return;
    if(P.classList.contains('fx-lib')&&F.classList.contains('fx-folders'))return;
    P.classList.add('fx-lib');F.classList.add('fx-folders');
    var seenTools=false;
    [].forEach.call(P.children,function(ch){
      if(ch===F)return;
      if(!seenTools&&ch.querySelector('input')&&!ch.querySelector('.el-table,table')){ch.classList.add('fx-tools');seenTools=true;return}
      ch.classList.add('fx-lib-body');
    });
    if(DEBUG)console.log('fx lib',{page:P.className,folders:F.className});
  };
  return {css:subCss(css),run:function(){try{tag()}catch(e){log('subflows tag',e)}try{tagLib()}catch(e){log('library tag',e)}}};
})();

/* 3f. Reports / Insights (every workspace and bot #/analytics route).
   v10.1: the earlier "flatten everything into one 12-column grid" layout is gone. It ignored each route's own
   el-row/el-col composition and produced the offset KPI tiles and half-empty chart rows. The reports now keep the
   product's own columns per route (checked live on all 24 routes) and REPORTS_CSS redesigns what is inside them.
   Chart series colours are the product's own; nothing is recoloured. */
var INSIGHTS=(function(){
  var last='',timers=[];
  var refit=function(){dispatchEvent(new Event('resize'))};   /* ApexCharts measures on render: re-measure after the new card widths apply */
  var dup=function(){
    [].forEach.call(D.querySelectorAll('#spark-app main.el-main.p-3 .stats-summary-card+.mb-4>.el-card:first-child>.el-card__body>.p-3:first-child'),function(h){
      var k=h.closest('.mb-4').previousElementSibling,lab=k&&k.querySelector('.mb-2.font-small'),t=h.querySelector('.mr-auto');
      var same=!!(lab&&t&&(lab.textContent||'').trim()===(t.textContent||'').trim());
      if(h.classList.contains('fxo-dup')!==same)h.classList.toggle('fxo-dup',same);
    });
  };
  var run=function(){
    dup();
    var key=location.hash.split('?')[0];
    if(key!==last){last=key;timers.forEach(clearTimeout);timers=[150,900,2500].map(function(t){return setTimeout(refit,t)})}
  };
  var undo=function(){timers.forEach(clearTimeout);timers=[];last='';[].forEach.call(D.querySelectorAll('.fxo-dup'),function(e){e.classList.remove('fxo-dup')});setTimeout(refit,60)};
  return {run:run,undo:undo};
})();

/* 3g. Inbox panes (workspace #/chat, bot #/livechat) — from fx-flow.js v8.0, detection throttled by the engine */
var INBOX=(function(){
  var R=[
  '.fx-ib-root{display:flex!important;align-items:stretch!important;gap:14px!important;padding:10px 14px!important;box-sizing:border-box!important;background:var(--fxo-bg)!important}',
  '.fx-ib-pane{background:var(--fxo-surface)!important;border:0!important;border-radius:22px!important;overflow:hidden!important;height:auto!important;min-height:0!important;align-self:stretch!important;box-shadow:var(--fxo-e0)!important}',
  '.fx-ib-filters,.fx-ib-list{flex:0 0 auto!important}',
  '.fx-ib-chat{flex:1 1 auto!important;min-width:0!important}',
  '.fx-ib-h{font-size:12px!important;font-weight:600!important;letter-spacing:0!important;text-transform:none!important;color:var(--fxo-ink-3)!important}',
  '.fx-ib-list input{height:36px!important;border-radius:var(--fxo-r-md)!important;background:var(--fxo-surface-2)!important;border:1px solid var(--fxo-border)!important}',
  '.fx-ib-list input:focus{background:var(--fxo-surface)!important;border-color:var(--fxo-primary)!important;box-shadow:var(--fxo-focus)!important}',
  '.fx-ib-btn{min-height:36px!important;border-radius:var(--fxo-r-md)!important;border:1px solid var(--fxo-border)!important;background:var(--fxo-surface)!important}',
  '.fx-ib-btn:hover{background:var(--fxo-hover)!important}',
  '.fx-ib-row{margin:2px 8px!important;padding:12px!important;border:0!important;border-radius:var(--fxo-r-md)!important;transition:background .15s}',
  '.fx-ib-row:hover{background:var(--fxo-surface-2)!important}',
  '.fx-ib-name{font-size:15px!important;font-weight:600!important;color:var(--fxo-ink)!important}',
  '.fx-ib-time{font-size:12px!important;font-weight:500!important;color:var(--fxo-ink-3)!important}',
  '.fx-ib-prev{font-size:14px!important;color:var(--fxo-ink-2)!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}',
  'img.fx-ib-av{width:40px!important;height:40px!important;border-radius:50%!important;object-fit:cover!important}',
  '.fx-ib-tag{border-radius:var(--fxo-r-sm)!important}',
  '.df-sidebar .el-dropdown-menu__item{border-radius:12px!important;margin:1px 6px!important}',
  '.df-sidebar .el-dropdown-menu__item.is-active,.df-sidebar .el-dropdown-menu__item.is-active *{color:#339DFF!important}',
  '.df-sidebar .el-dropdown-menu__item.is-active{background:#E6F3FF!important}'].join('\n');
  var css=rewrite(R,function(s){return sel('inbox',s)});
  var CL=['fx-ib-root','fx-ib-pane','fx-ib-filters','fx-ib-list','fx-ib-chat','fx-ib-h','fx-ib-btn','fx-ib-row','fx-ib-name','fx-ib-time','fx-ib-prev','fx-ib-av','fx-ib-tag'];
  var txt=function(e){return (e.textContent||'').replace(/\s+/g,' ').trim()};
  var rc=function(e){return e.getBoundingClientRect()};
  var vis=function(e){var r=rc(e);return r.width>4&&r.height>4};
  var leaves=function(e){return [].slice.call(e.querySelectorAll('*')).filter(function(x){return !x.children.length&&txt(x)})};
  var TIME=/(\d{1,2}:\d{2}\s?(AM|PM)?)|(\d{1,2}[\/.-]\d{1,2}(?:[\/.-]\d{2,4})?)|(\d{1,2}\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))|yesterday|today|أمس|اليوم|אתמול|היום/i;
  var info={found:false};
  var rows=function(lp){
    var tl=leaves(lp).filter(function(l){return TIME.test(txt(l))&&txt(l).length<24});
    if(!tl.length){info.rows=0;return}
    var rowEl=null;
    for(var e=tl[0];e&&e!==lp;e=e.parentElement){
      var sib=e.parentElement?[].slice.call(e.parentElement.children).filter(function(c){return tl.some(function(t){return c.contains(t)})}):[];
      if(sib.length>=2||(e.parentElement===lp)){rowEl=e;break}
    }
    if(!rowEl){info.rows=0;return}
    var list=[].slice.call(rowEl.parentElement.children).filter(function(c){return tl.some(function(t){return c.contains(t)})});
    list.forEach(function(r){
      if(r.classList.contains('fx-ib-row')&&r.__fxoTxt===r.textContent)return;   /* unchanged row: skip */
      r.__fxoTxt=r.textContent;
      r.classList.add('fx-ib-row');
      var ls=leaves(r),time=null,prev=null,name=null;
      ls.forEach(function(l){var t=txt(l);
        if(!time&&TIME.test(t)&&t.length<24){time=l;return}
        if(!prev&&/^(bot|agent|you|customer|بوت|الوكيل|أنت|العميل|בוט|סוכן|אתה|את|לקוח)\s*:/i.test(t)){prev=l;return}
      });
      ls.forEach(function(l){if(l!==time&&l!==prev&&!name&&txt(l).length<40)name=l});
      if(!prev){prev=ls.filter(function(l){return l!==time&&l!==name}).sort(function(a,b){return txt(b).length-txt(a).length})[0]}
      if(name)name.classList.add('fx-ib-name');if(time)time.classList.add('fx-ib-time');if(prev)prev.classList.add('fx-ib-prev');
      var im=r.querySelector('img');if(im)im.classList.add('fx-ib-av');
      [].forEach.call(r.querySelectorAll('*'),function(x){var b=rc(x);if(!x.children.length&&b.width>=8&&b.width<=22&&b.height>=8&&b.height<=22&&getComputedStyle(x).backgroundColor!=='rgba(0, 0, 0, 0)'&&!txt(x))x.classList.add('fx-ib-tag')});
    });
    info.rows=list.length;
  };
  var run=function(){
    var root0=D.querySelector('#spark-app main.el-main');if(!root0)return;
    var room=root0.querySelector('.rooms-container');
    var inputs=[].filter.call(root0.querySelectorAll('input'),function(x){return vis(x)});
    var inp=(room&&room.querySelector('input'))||
      inputs.filter(function(x){var p=x.parentElement;return x.type==='search'||/search/i.test(x.className||'')||!!(p&&p.querySelector('i.el-icon-search,[class*=search]'))})[0]||
      inputs[0];
    var una=[].slice.call(root0.querySelectorAll('*')).filter(function(e){return !e.children.length&&/^(unassigned|assigned to me|غير معين|معين لي|לא משויך|משויך אליי)$/i.test(txt(e))})[0];
    var rail=(room&&room.querySelector('.df-sidebar'))||root0.querySelector('.df-sidebar');
    if(!inp||(!una&&!rail)){info={found:false,reason:!inp?'no search input':'no filter rail'};return}
    var up=function(e){var a=[];for(;e&&e!==D.body;e=e.parentElement)a.push(e);return a};
    var A=up(inp),B=up(una||rail);
    var row=room||A.filter(function(x){return B.indexOf(x)>-1})[0];
    for(var i=0;i<5&&row;i++){
      var wide=[].slice.call(row.children).some(function(c){return !c.contains(inp)&&!c.contains(una)&&rc(c).width>380});
      if(wide)break;row=row.parentElement;
    }
    if(!row||row===D.body){info={found:false,reason:'no pane row'};return}
    var kids=[].slice.call(row.children).filter(vis);
    var fp=kids.filter(function(k){return (una&&k.contains(una))||(rail&&k.contains(rail))})[0],
        lp=kids.filter(function(k){return k.contains(inp)&&k!==fp})[0];
    if(!lp)lp=kids.filter(function(k){return k!==fp&&!!k.querySelector('input')})[0];
    var cp=kids.filter(function(k){return k!==fp&&k!==lp}).sort(function(a,b){return rc(b).width-rc(a).width})[0];
    var want=function(e,c){if(e&&!e.classList.contains(c))e.classList.add(c)};
    [].forEach.call(D.querySelectorAll('.fx-ib-root,.fx-ib-pane'),function(e){if(e!==row&&e!==fp&&e!==lp&&e!==cp)e.classList.remove('fx-ib-root','fx-ib-pane','fx-ib-filters','fx-ib-list','fx-ib-chat')});
    want(row,'fx-ib-root');
    if(fp&&fp!==lp){want(fp,'fx-ib-pane');want(fp,'fx-ib-filters')}
    if(lp){want(lp,'fx-ib-pane');want(lp,'fx-ib-list')}
    if(cp){want(cp,'fx-ib-pane');want(cp,'fx-ib-chat')}
    info={found:true,panes:[fp&&fp!==lp?'filters':null,lp?'list':null,cp?'chat':null].filter(Boolean)};
    if(fp){leaves(fp).forEach(function(l){if(UI_RX.heads.test(txt(l)))want(l,'fx-ib-h')})}
    if(lp){
      var hd=inp.parentElement;for(var k=0;k<4&&hd&&!hd.querySelector('button,.el-button');k++)hd=hd.parentElement;
      if(hd)[].forEach.call(hd.querySelectorAll('button,.el-button'),function(b){want(b,'fx-ib-btn')});
      rows(lp);
    }
  };
  var undo=function(){CL.forEach(function(c){[].forEach.call(D.querySelectorAll('.'+c),function(e){e.classList.remove(c)})})};
  return {css:css,run:run,undo:undo,info:function(){return info}};
})();

/* ===================================================================================== */
/* 4. ENGINE                                                                              */
/* ===================================================================================== */
var ROUTES=[
  [/^#\/omni(?:[/?]|$)/,'launcher'],
  [/^#\/connect-channels/,'channels'],
  [/^#\/(whatsapp|sms|voice)(?:[/?]|$)/,'providers'],
  [/^#\/integration\/?$|^#\/integration\/phone/,'providers'],
  [/^#\/(facebook|instagram|tiktok|telegram|whatsapp-cloud|waapi|agent-chat|rcs|line|viber|wechat|vk|jivochat|chatwoot|intercom|slack)(?:[/?]|$)/,'channel'],
  [/^#\/integration\/(dialogflow|facebook-business|stripe|calendly|mailchimp|ghl|crm|crm-v1|intercom|drift|slack|facebook-ads|make|pabbly|zapier|gmail|google_business)(?:[/?]|$)/,'oauth'],
  [/^#\/integration\//,'form'],
  [/^#\/analytics/,'insights'],
  [/^#\/(chat|livechat)/,'inbox'],
  [/^#\/boards/,'kanban'],
  [/^#\/subflow/,'subflows'],
  [/^#\/webchat/,'editor'],
  [/^#\/(onboarding|dashboard)/,'dash'],
  [/^#\/(setting|ai_hub\/ai_settings|ai_hub\/ai_call_config)/,'settings'],
  [/^#\/flows/,'bots']
];
/* Login / register / password-reset pages (they live outside the app shell). The design language is for the app, not for these:
   on them the script keeps out and removes its html.fxo switch, so every rule goes quiet and the product's own login shows. */
var authPage=function(){
  var shell=D.querySelector('#team-main,main.el-main,main#flowbuilder-main,.main-flow-builder,.el-aside-wrapper,.df-sidebar');
  if(shell)return false;
  if(/^\/(?:login|register|password|forgot|reset|two-factor|auth)(?:[/?#.]|$)/i.test(location.pathname))return true;
  return !!D.querySelector('input[type=password]');
};
var pageOf=function(){
  var h=location.hash||'';
  if(/^\/flow\//.test(location.pathname)&&(!h||h==='#'||h==='#/'||/^#\/flow(?:[/?]|$)/.test(h)))return 'canvas';
  /* the bot app can show the canvas while the hash still names another route (first load): trust what is on screen */
  if(/^\/flow\//.test(location.pathname)){var fb=D.querySelector('.main-flow-builder');if(fb&&getComputedStyle(fb).display!=='none'&&fb.getBoundingClientRect().width>0)return 'canvas'}
  for(var i=0;i<ROUTES.length;i++)if(ROUTES[i][0].test(h))return ROUTES[i][1];
  return 'table';
};

/* legacy (old fx-flow.js / fx-channels.js already running in this page during a Console preview) */
var LEG={sheets:[],coreWasOn:false,oldStop:null,oldStart:null,present:false,quieted:false};
var legacyOff=function(){
  LEG.sheets=[];
  ['fx-flow-ui','fx-flows-ui','fx-core-ui','fx-insights-ui','fx-inbox-ui','fx-cards-final4','fx-fullscreen-scroll','fx-channels-style','fx-ui-style','fx-insights9-ui'].forEach(function(id){
    [].forEach.call(D.querySelectorAll('style#'+id),function(s){LEG.sheets.push({el:s,media:s.getAttribute('media')});s.setAttribute('media','not all')});   /* media, not .disabled: old hash handlers re-enable .disabled */
  });
  LEG.present=!!(W.__fxSoft6||W.__fxChan1||W.__fxCore||W.__fxInsights);
  legacyQuiet();
};
/* stops the old loops and removes what they wrote; also re-run from apply() because their already-queued timers can fire once after a stop */
var legacyQuiet=function(){
  if(!LEG.quieted){LEG.coreWasOn=!!W.__fxCoreStop&&H.classList.contains('fx-app');LEG.oldStop=W.__fxStop;LEG.oldStart=W.__fxStart;LEG.quieted=true}
  try{W.__fxCoreStop&&W.__fxCoreStop()}catch(e){}
  try{LEG.oldStop&&LEG.oldStop()}catch(e){}
  try{W.__fxUIStop&&W.__fxUIStop()}catch(e){}
  try{W.__fxMidnight&&W.__fxMidnight.undo&&W.__fxMidnight.undo()}catch(e){}
  H.classList.remove('fx-app','fx-icons','fx-inbox','fx-insights','fx-ui');
  /* tags the old Insights layout left on report pages (its stylesheet is off, but .fx-flat is also a Sub Flows class) */
  [].forEach.call(D.querySelectorAll('.fx-grid,.fx-item,.fx-kpi,.fx-chart,.fx-table,.fx-other,.fx-flat,.fx-k-val,.fx-k-lbl,.fx-k-prev,.fx-k-delta,.fx-k-icon,.fx-c-val,.fx-c-delta,.fx-tz,.fx-daterow'),function(e){
    if(e.closest('.fx-labels'))return;
    e.classList.remove('fx-grid','fx-item','fx-kpi','fx-chart','fx-table','fx-other','fx-t0','fx-t1','fx-t2','fx-t3','fx-flat','fx-k-val','fx-k-lbl','fx-k-prev','fx-k-delta','fx-k-icon','fx-c-val','fx-c-delta','fx-tz','fx-daterow','fx-up','fx-down','fx-zero');
    ['--fx-l','--fx-m','--fx-s','--fx-c'].forEach(function(v){e.style.removeProperty(v)});
  });
  H.classList.remove('fx-insights','fx-lay','fx-safe','fx-ready');
  /* inline !important styles the old core / Insights modules wrote on cards and buttons */
  [].forEach.call(D.querySelectorAll('[style]'),function(e){var st=e.style;
    if(st.getPropertyPriority('border-radius')==='important'&&/^(18px|20px)$/.test(st.getPropertyValue('border-radius')))['background-color','border','border-image','outline','border-radius','box-shadow','overflow'].forEach(function(k){st.removeProperty(k)});
    if(/var\(--fx-pbg/.test(st.getPropertyValue('background-color')))['background-color','border-color','color'].forEach(function(k){st.removeProperty(k)});
  });
};
var legacyOn=function(){
  LEG.quieted=false;
  LEG.sheets.forEach(function(x){if(x.media==null)x.el.removeAttribute('media');else x.el.setAttribute('media',x.media)});
  try{if(LEG.coreWasOn&&W.__fxCoreStart)W.__fxCoreStart()}catch(e){}
  try{if(LEG.oldStart)LEG.oldStart()}catch(e){}
  var n=D.createComment('fx');D.body.appendChild(n);n.remove();
};

var S={on:false,style:null,mo:null,q:0,t:0,last:0,page:'',hash:null,bot:false,ib:0};

/* per-mutation jobs (all cheap, all idempotent) */
var titleJob=function(){   /* page titles removed (v11.9): the shell / 360 header already names the page; only clean up old marks */
  var t=D.querySelectorAll('[data-fxo-title]');for(var i=0;i<t.length;i++)t[i].removeAttribute('data-fxo-title');
};
var channelJob=function(){
  /* connected channel pages: a Disconnect button or the WhatsApp number/provider table marks the detail layout */
  [].forEach.call(D.querySelectorAll('#team-main .p-3 > div'),function(pg){
    var wa=/whatsapp/i.test(location.hash||'')&&!!pg.querySelector('table');
    /* a danger action (Disconnect / remove) marks a connected channel; the OmniAI 360 launcher also has danger Unlink buttons but is not a detail page */
    var det=S.page!=='launcher'&&(!!pg.querySelector('.el-button--danger')||wa);
    if(pg.classList.contains('fxo-detail')!==det)pg.classList.toggle('fxo-detail',det);
    if(pg.classList.contains('fxo-wa')!==wa)pg.classList.toggle('fxo-wa',wa);
  });
  /* duplicate "Connect a channel" heading: hidden only inside 360 (its header already shows the title), visible in direct view */
  var framed=H.classList.contains('in-iframe');
  [].forEach.call(D.querySelectorAll('#spark-app h1,#spark-app h2,#spark-app h3,#spark-app h4,#spark-app h5,#spark-app h6'),function(h){
    var mine=h.hasAttribute('data-fxo-hid');   /* only this heading, and only ever un-hide what this file hid */
    if(!mine&&!UI_RX.connect.test((h.textContent||'').trim()))return;
    if(framed&&!mine){h.style.setProperty('display','none','important');h.setAttribute('data-fxo-hid','1')}
    else if(!framed&&mine){h.style.removeProperty('display');h.removeAttribute('data-fxo-hid')}
  });
};
var botListJob=function(){   /* the approved All Bots list view: same behaviour as the earlier helper (once per route, then the toggle is hidden) */
  if(S.bot||W.__fxBotDirectoryList)return;
  var b=D.querySelector('#team-main button.el-button.mr-2.is-plain:has(i.fa-list)');
  if(!b||!b.getClientRects().length)return;
  S.bot=true;b.click();b.style.setProperty('display','none','important');b.setAttribute('data-fxo-bottoggle','1');
};

var TAGRX=/^(PRO|BETA|NEW|احترافي|بيتا|جديد|מקצועי|בטא|חדש)$/i;
var NEWRX=/^(NEW|جديد|חדש)$/i;
var proState={t:0,q:0};
var PRO_SEEN=typeof WeakSet!=='undefined'?new WeakSet():{has:function(){return false},add:function(){}};
var proJob=function(){   /* hide every "PRO", "BETA" and "NEW" sign (badges, tags, pills, corner ribbons) everywhere; the product's own plan limits are unchanged */
  if(Date.now()-proState.t<250){clearTimeout(proState.q);proState.q=setTimeout(function(){if(S.on)proJob()},270);return}
  proState.t=Date.now();
  var mark=function(e){if(e&&e!==D.body&&!e.hasAttribute('data-fxo-pro')){e.setAttribute('data-fxo-pro',e.style.getPropertyValue('display')+'|'+e.style.getPropertyPriority('display'));e.style.setProperty('display','none','important')}};   /* inline: no theme rule can show it again */
  /* 1. any element whose only text is the sign (any tag: span, div, i, label, sup, ...) */
  var w=D.createTreeWalker(D.body,NodeFilter.SHOW_TEXT,{acceptNode:function(n){return TAGRX.test((n.nodeValue||'').trim())?1:3}}),n;
  while((n=w.nextNode())){
    var e=n.parentElement;if(!e||e.closest('[data-fxo-pro],script,style,textarea,[contenteditable]'))continue;
    var t=(e.textContent||'').trim();if(!TAGRX.test(t))continue;   /* the sign is the whole element */
    if(NEWRX.test(t)&&!(e.closest('.badge,.el-tag,sup,[class*=badge],[class*=tag],[class*=pill],[class*=ribbon],[class*=label]')))continue;   /* plain "New" (e.g. a ticket status) is data, not a sign */
    var host=e.closest('button,.el-button,a,[role=tab],.el-menu-item,.el-tabs__item,.el-radio-button');
    if(host&&(host.textContent||'').trim()===t)continue;   /* a lone "New" that IS a button / tab / link label is kept */
    for(var k=0,p=e.parentElement;k<3&&p&&p!==D.body&&!p.matches('button,.el-button,a,[role=tab],.el-menu-item,.el-tabs__item,.el-radio-button')&&(p.textContent||'').trim().replace(/\s+/g,'')===t&&p.children.length===1;k++,p=p.parentElement)e=p;   /* hide the pill wrapper too, not just its text */
    mark(e);
  }
  /* 2. signs drawn with CSS (::before / ::after content) on badge-like elements */
  [].forEach.call(D.querySelectorAll('[class*=pro]:not([data-fxo-pro-pseudo]),[class*=Pro]:not([data-fxo-pro-pseudo]),[class*=beta]:not([data-fxo-pro-pseudo]),[class*=badge]:not([data-fxo-pro-pseudo]),[class*=new]:not([data-fxo-pro-pseudo])'),function(e){
    if(PRO_SEEN.has(e))return;PRO_SEEN.add(e);   /* each element is read once */
    ['::before','::after'].forEach(function(ps){var c=getComputedStyle(e,ps).content||'';if(/^["'](PRO|BETA|NEW)["']$/i.test(c.trim()))e.setAttribute('data-fxo-pro-pseudo',(e.getAttribute('data-fxo-pro-pseudo')||'')+ps.replace(/:/g,''))});
  });
};

var NOTERX=UI_RX.noteField;
/* Inbox note composer. Colours are set inline (with !important) so no theme or component stylesheet can win,
   and the search also looks inside open shadow roots and same-origin frames. Originals are restored on Reply and on off(). */
var NOTE={box:'background:#FFF7E6;border-radius:16px;box-shadow:inset 0 0 0 1px #FFB020',
  field:'background:#FFF7E6;background-color:#FFF7E6;border-color:#FFB020;color:#8A5A00',
  tab:'color:#8A5A00;font-weight:800;background:#FEF3ED;border-radius:999px;padding:2px 10px'};
var noteRoots=function(){
  var out=[D],seen=0;
  for(var r=0;r<out.length&&r<40;r++){
    var all=out[r].querySelectorAll('*');
    for(var i=0;i<all.length;i++){var e=all[i];
      if(e.shadowRoot&&out.indexOf(e.shadowRoot)<0)out.push(e.shadowRoot);
      if(e.tagName==='IFRAME'){try{var d=e.contentDocument;if(d&&d.body&&out.indexOf(d)<0)out.push(d)}catch(x){}}
    }
  }
  return out;
};
var isNoteField=function(t){
  var ph=(t.getAttribute('placeholder')||t.getAttribute('data-placeholder')||t.placeholder||t.getAttribute('aria-placeholder')||'');
  return NOTERX.test(ph);
};
var paint=function(e,css,kind){
  if(e.getAttribute('data-fxo-note')===kind)return;
  if(!e.hasAttribute('data-fxo-note-css'))e.setAttribute('data-fxo-note-css',e.getAttribute('style')||'');
  css.split(';').forEach(function(d){var k=d.split(':');if(k[1])e.style.setProperty(k[0].trim(),k.slice(1).join(':').trim(),'important')});
  e.setAttribute('data-fxo-note',kind);
};
var unpaint=function(e){
  var o=e.getAttribute('data-fxo-note-css');
  if(o)e.setAttribute('style',o);else e.removeAttribute('style');
  e.removeAttribute('data-fxo-note-css');e.removeAttribute('data-fxo-note');
};
var noteState={fields:0,painted:0};
var noteJob=function(){
  if(Date.now()-(noteState.t||0)<300){clearTimeout(noteState.q);noteState.q=setTimeout(function(){if(S.on)noteJob()},320);return}   /* the deep search runs at most ~3 times a second */
  noteState.t=Date.now();
  var roots=noteRoots(),fields=[];
  roots.forEach(function(r){[].forEach.call(r.querySelectorAll('textarea,input,[contenteditable="true"],[contenteditable=""]'),function(t){if(isNoteField(t))fields.push(t)})});
  var keep=[];
  fields.forEach(function(t){
    var box=t.parentElement,k=0;   /* the composer: first ancestor that also holds the Send button */
    for(var b=t.parentElement;b&&k<8;k++,b=b.parentElement){if(b.querySelector&&[].some.call(b.querySelectorAll('button,.el-button'),function(x){return UI_RX.send.test((x.textContent||'').trim())})){box=b;break}}
    paint(t,NOTE.field,'field');keep.push(t);
    var inner=t.closest('.el-textarea,.el-input');if(inner&&inner!==box&&box.contains(inner)){paint(inner,'background:#FFF7E6;border-color:#FFB020','field');keep.push(inner)}
    if(box&&box!==D.body){paint(box,NOTE.box,'box');keep.push(box);
      [].forEach.call(box.querySelectorAll('*'),function(e){if(!e.childElementCount&&UI_RX.note.test((e.textContent||'').trim())){paint(e,NOTE.tab,'tab');keep.push(e)}});
    }
  });
  roots.forEach(function(r){[].forEach.call(r.querySelectorAll('[data-fxo-note]'),function(e){if(keep.indexOf(e)<0)unpaint(e)})});
  noteState.fields=fields.length;noteState.painted=keep.length;
};
var noteUndo=function(){noteRoots().forEach(function(r){[].forEach.call(r.querySelectorAll('[data-fxo-note]'),unpaint)})};

var wsTabsJob=function(){   /* 360 embed only: hide the duplicate workspace-settings tabs without depending on their translated labels */
  var emb=H.classList.contains('in-iframe');
  [].forEach.call(D.querySelectorAll('ul.el-menu--horizontal.el-menu'),function(u){
    var txt=(u.textContent||'').replace(/\s+/g,' ').trim();
    var items=[].filter.call(u.children,function(x){return x.classList&&x.classList.contains('el-menu-item')});
    var iconItems=[].filter.call(items,function(x){return !!x.querySelector('i,.svg-icon,svg,img')});
    var textFallback=(/Business Hours/i.test(txt)&&/Agent Groups/i.test(txt)&&/Store Locations/i.test(txt))||
      (/שעות פעילות/.test(txt)&&/קבוצות סוכנים/.test(txt)&&/מיקומי חנויות/.test(txt))||
      (/ساعات العمل/.test(txt)&&/مجموعات الوكلاء/.test(txt)&&/مواقع المتاجر/.test(txt));
    var structural=items.length>=7&&items.length<=10&&iconItems.length>=Math.ceil(items.length*.5);
    var ws=textFallback||(S.page==='settings'&&structural);
    var hid=u.hasAttribute('data-fxo-wstabs');
    if(ws&&emb&&!hid){u.setAttribute('data-fxo-wstabs',u.style.getPropertyValue('display'));u.style.setProperty('display','none','important')}
    else if(hid&&(!ws||!emb)){var o=u.getAttribute('data-fxo-wstabs');if(o)u.style.setProperty('display',o);else u.style.removeProperty('display');u.removeAttribute('data-fxo-wstabs')}
  });
};

var launchJob=function(){   /* 360 launcher: mark connected channels and write the summary line (attributes only; no nodes are added to Vue lists) */
  if(S.page!=='launcher')return;
  var cards=D.querySelectorAll('#team-main .p-3>div>.content-card');var c=cards[1];if(!c)return;
  var tb=c.querySelector('table');if(!tb)return;
  var rows=tb.querySelectorAll('tbody tr'),on=0;
  for(var i=0;i<rows.length;i++){var r=rows[i],td=r.children[1];
    var live=!!r.querySelector('.el-button--danger')||!!(td&&(td.textContent||'').trim());
    if(live)on++;var v=live?'on':'off';if(r.getAttribute('data-fxo-ch')!==v)r.setAttribute('data-fxo-ch',v)}
  for(var q=0;q<rows.length;q++){var td1=rows[q].children[0];if(!td1)continue;
    var ico=td1.querySelector('i.svg-icon,img,svg');if(!ico||ico.closest('button'))continue;
    if(!ico.hasAttribute('data-fxo-ico'))ico.setAttribute('data-fxo-ico','');
    var box=null;for(var a=ico.parentElement;a&&a!==td1&&!(a.textContent||'').trim();a=a.parentElement)box=a;   /* wrapper(s) that hold only icons */
    if(box&&!box.hasAttribute('data-fxo-icobox'))box.setAttribute('data-fxo-icobox','');
    var head=(box||ico).parentElement;   /* the row that holds icon + name (may be the cell itself) */
    if(head&&!head.hasAttribute('data-fxo-head'))head.setAttribute('data-fxo-head','');
  }
  var lc=localeOf(),labels=lc==='he'?['מחוברים','זמינים']:lc==='ar'?['متصل','متاح']:['connected','available'];
  var sum=rows.length?(on+' '+labels[0]+'  \u00B7  '+(rows.length-on)+' '+labels[1]):'';
  if(tb.getAttribute('data-fxo-sum')!==sum)tb.setAttribute('data-fxo-sum',sum);
};

var HIDE_ITEMS=/^(change theme|(delete|remove|export|download)( selected| all)? (users?|contacts?|subscribers?|leads?)( to (csv|excel|xlsx?))?|تغيير (السمة|القالب)|(حذف|إزالة|تصدير|تنزيل) (المستخدمين|جهات الاتصال|المشتركين|العملاء المحتملين)|(שינוי ערכת נושא)|(מחיקה|הסרה|ייצוא|הורדה) (משתמשים|אנשי קשר|מנויים|לידים))$/i;   /* also: no delete / export of contacts anywhere */   /* menu entries removed from the product's menus (FlexiBuilder menu: "Change Theme") */
var hideItemsJob=function(){
  var c=D.querySelectorAll('.el-dropdown-menu__item:not([data-fxo-hideitem]),.el-menu-item:not([data-fxo-hideitem]),.el-submenu__title:not([data-fxo-hideitem]),[role=menuitem]:not([data-fxo-hideitem]),.dropdown-item:not([data-fxo-hideitem]),button:not([data-fxo-hideitem]),.el-button:not([data-fxo-hideitem]),.el-popover li:not([data-fxo-hideitem]),.el-popover a:not([data-fxo-hideitem])');
  for(var i=0;i<c.length;i++){var e=c[i];if(!HIDE_ITEMS.test((e.textContent||'').replace(/\s+/g,' ').trim()))continue;
    var t=e.closest('.el-submenu')&&e.classList.contains('el-submenu__title')?e.closest('.el-submenu'):e;
    t.setAttribute('data-fxo-hideitem',t.style.getPropertyValue('display')+'|'+t.style.getPropertyPriority('display'));t.style.setProperty('display','none','important');
    if(t!==e)e.setAttribute('data-fxo-hideitem','|');
  }
};

/* Contacts list: hide the icon-only Export (download) and Delete (trash) toolbar buttons. The page is recognised by its own
   controls (Create New User / Bulk Action / "Last user interaction"), so delete buttons on other pages are untouched. */
var contactsToolsJob=function(){
  if(Date.now()-(contactsToolsJob.t||0)<300){clearTimeout(contactsToolsJob.q);contactsToolsJob.q=setTimeout(function(){if(S.on)contactsToolsJob()},320);return}
  contactsToolsJob.t=Date.now();
  var panes=D.querySelectorAll('main.el-main');
  for(var i=0;i<panes.length;i++){var m=panes[i];
    var t=(m.textContent||'');
    var routeContact=/#\/(users?|contacts?|subscribers?|leads?)(?:[/?]|$)/i.test(location.hash||'');
    var textContact=/Create New User|Bulk Action|Last user interaction|إنشاء مستخدم|إجراء جماعي|آخر تفاعل|יצירת משתמש|פעולה קבוצתית|אינטראקציה אחרונה/i.test(t);
    var table=m.querySelector('.el-table,table'),hasSelect=!!(table&&table.querySelector('.el-checkbox,input[type=checkbox]'));
    var hasUserAdd=!!m.querySelector('i.fa-user-plus,[class*=user-plus],[class*=add-user],[class*=create-user]');
    if(!(routeContact||textContact||(table&&hasSelect&&hasUserAdd)))continue;
    var bs=m.querySelectorAll('button:not([data-fxo-hideitem]),.el-button:not([data-fxo-hideitem])');
    for(var k=0;k<bs.length;k++){var b=bs[k];if((b.textContent||'').trim())continue;   /* icon-only buttons */
      if(b.closest('table,.el-table,.el-table__body,tbody'))continue;                   /* not row actions inside the list */
      var sig=(b.innerHTML||'')+' '+(b.getAttribute('title')||'')+' '+(b.getAttribute('aria-label')||'');
      [b,b.parentElement].forEach(function(x){var id=x&&x.getAttribute&&x.getAttribute('aria-describedby');var tip=id&&D.getElementById(id);if(tip)sig+=' '+tip.textContent;if(x&&x.getAttribute)sig+=' '+(x.getAttribute('title')||'')+' '+(x.getAttribute('data-original-title')||'')+' '+(x.getAttribute('content')||'')});   /* tooltip text: "Export" / "Delete" */
      if(/download|export|trash|delete|remove|bin\b|el-icon-delete|fa-trash|fa-download|cloud-download|file-export/i.test(sig)){
        b.setAttribute('data-fxo-hideitem',b.style.getPropertyValue('display')+'|'+b.style.getPropertyPriority('display'));b.style.setProperty('display','none','important');
      }
    }
  }
};

/* ===== v13 · Conversation workspace (Inbox + Search Contacts) =====
   Both screens share the same filter rail, list and detail structure, so they are treated as one system.
   Everything is keyed on the product's own DOM and text (never on a route), so the bot Inbox, the workspace Inbox
   and Search Contacts all get the same treatment. Only attributes are added; no nodes enter Vue-managed lists. */
var WS_HEADS=UI_RX.heads;
var WS_STATUS=/^(all|open|pending|spam|invalid|done|snoozed|unread|unreplied|unsubscribed|closed|resolved|الكل|مفتوح|معلق|قيد الانتظار|مزعج|غير صالح|مكتمل|مؤجل|غير مقروء|بدون رد|غير مشترك|مغلق|تم الحل|הכל|פתוח|ממתין|בהמתנה|ספאם|לא תקין|הושלם|מושהה|לא נקרא|ללא מענה|בוטל מנוי|סגור|נפתר)\b/i;
var wsState={t:0,q:0};
var wsTag=function(e,k,v){if(e&&e.getAttribute(k)!==v)e.setAttribute(k,v)};
var wsJob=function(){
  if(Date.now()-wsState.t<250){clearTimeout(wsState.q);wsState.q=setTimeout(function(){if(S.on)wsJob()},270);return}
  wsState.t=Date.now();
  var leaf=function(root,re){return [].filter.call(root.querySelectorAll('*'),function(x){return !x.childElementCount&&re.test((x.textContent||'').trim())})};
  /* 1. filter rails: the product's .df-sidebar, or any column that holds both "Starred" and a "Status" heading */
  /* only conversation filter rails qualify (docked in the Inbox, or carrying "Starred" / a Status group); other .df-sidebar
     columns such as the Flows "Labels" panel keep the product's own look, and lose any tags an earlier pass gave them */
  var WS_KEYS=['data-fxo-rail','data-fxo-fhead','data-fxo-fitem','data-fxo-ffirst','data-fxo-count','data-fxo-ftop','data-fxo-fwrap','data-fxo-st'];
  var rails=[].filter.call(D.querySelectorAll('.df-sidebar'),function(r){
    var tableNear=!!D.querySelector('main.el-main .el-table,main.el-main table');
    var structured=r.querySelectorAll('.el-dropdown-menu__item,.el-collapse-item').length>=2;
    var ok=!!r.closest('.rooms-container')||leaf(r,UI_RX.starred).length>0||leaf(r,/^(status|الحالة|סטטוס|מצב)$/i).length>0||(tableNear&&structured);
    if(!ok&&r.hasAttribute('data-fxo-rail'))[r].concat([].slice.call(r.querySelectorAll('*'))).forEach(function(e){WS_KEYS.forEach(function(k){if(e.hasAttribute(k))e.removeAttribute(k)})});
    return ok;
  });
  rails.forEach(function(r){
    wsTag(r,'data-fxo-rail',r.closest('.rooms-container')?'docked':'card');
    var head=null,items=r.querySelectorAll('.el-dropdown-menu__item');
    leaf(r,WS_HEADS).forEach(function(h){
      var L=function(x){return (x.textContent||'').replace(/[^A-Za-z\u0590-\u05FF\u0600-\u06FF]+/g,'').toLowerCase()},want=L(h);   /* ignore chevron glyphs and spacing */
      var row=h;for(var k=0;k<4&&row.parentElement&&row.parentElement!==r&&L(row.parentElement)===want;k++)row=row.parentElement;
      if(row.closest('.el-dropdown-menu__item'))return;
      var wrap=row.parentElement;if(wrap&&wrap!==r&&wrap.firstElementChild===row&&!wrap.classList.contains('el-scrollbar__view'))wsTag(wrap,'data-fxo-fwrap','1');
      wsTag(row,'data-fxo-fhead',/^(status|الحالة|סטטוס|מצב)$/i.test(h.textContent.trim())?'status':'more');
      if(/^(status|الحالة|סטטוס|מצב)$/i.test(h.textContent.trim()))head=row;
    });
    var first=true,sec=0;
    [].forEach.call(items,function(it){
      var grp=it.querySelector('.el-avatar,img,[class*=avatar]')?'agent':(head&&(head.compareDocumentPosition(it)&Node.DOCUMENT_POSITION_FOLLOWING)?'status':'view');
      wsTag(it,'data-fxo-fitem',grp);
      if(grp==='view'&&first){wsTag(it,'data-fxo-ffirst','1');first=false}else if(it.hasAttribute('data-fxo-ffirst'))it.removeAttribute('data-fxo-ffirst');
      var act=it.classList.contains('is-active');if(act)wsTag(it,'aria-current','true');else if(it.getAttribute('aria-current')==='true')it.removeAttribute('aria-current');
      [].forEach.call(it.querySelectorAll('*'),function(x){if(!x.childElementCount&&/^\d[\d,.]*k?$/i.test((x.textContent||'').trim()))wsTag(x,'data-fxo-count','1')});
    });
    [].forEach.call(r.querySelectorAll('.el-avatar,img'),function(av){
      if(av.closest('[data-fxo-fitem],[data-fxo-ftop],[data-fxo-fhead],button'))return;
      for(var row=av.parentElement,k=0;row&&row!==r&&k<4;k++,row=row.parentElement){if((row.textContent||'').trim()){if(row.querySelectorAll('.el-avatar,img').length===1)wsTag(row,'data-fxo-fitem','agent');break}}
    });
    var top=leaf(r,UI_RX.starred)[0];
    if(top){var row=top;for(var k=0;k<4&&row.parentElement&&row.parentElement!==r&&!row.parentElement.querySelector('.el-dropdown-menu__item');k++)row=row.parentElement;wsTag(row,'data-fxo-ftop','1')}
  });
  var sig=rails.length>0;if(H.classList.contains('fxo-signal')!==sig)H.classList.toggle('fxo-signal',sig);
  if(sig)signalFont();
  rails.forEach(function(r){[].forEach.call(r.querySelectorAll('[data-fxo-fitem=status]'),function(it){
    wsTag(it,'data-fxo-st',statusKey(it.textContent||''));
  })});
  if(sig)[].forEach.call(D.querySelectorAll('.rooms-container *,main table td,main table td *,main .el-table td *'),function(x){
    if(!x.childElementCount&&/^\+?[\d][\d\s-]{7,}$/.test((x.textContent||'').trim())){var c=x.closest('td');wsTag(x,'data-fxo-mono',c&&(c.textContent||'').trim()!==(x.textContent||'').trim()?'sub':'1')}
  });
  /* 2. empty states: list ("No chats" / "No Data") and the conversation placeholder */
  leaf(D.body,UI_RX.empty).forEach(function(e){
    if(e.closest('.el-select-dropdown,.el-popper,.el-dialog'))return;
    wsTag(e,'data-fxo-empty',e.closest('.el-table,table')?((/#\/(users?|contacts?|subscribers?|leads?)(?:[/?]|$)/i.test(location.hash)||!!e.closest('.el-table,table').querySelector('th[data-fxo-quiet]'))?'table':'none'):'list');var ew=rc(e.closest('.el-table__empty-block')||e).width;wsTag(e,'data-fxo-empty-size',ew&&ew<380?'s':'m');
  });
  leaf(D.body,UI_RX.welcome).forEach(function(e){
    for(var box=e.parentElement,k=0;box&&k<5;k++,box=box.parentElement){if(box.querySelector('img')){wsTag(box,'data-fxo-welcome','1');wsTag(e,'data-fxo-welcome-text','1');break}}
  });
  /* 3b. contacts tables: the name cell (name · phone/ID · status chip) becomes one tidy block: name and status on one line,
     the ID under it. Only attributes; the product's own nodes stay where they are. */
  if(sig)[].forEach.call(D.querySelectorAll('main td'),function(td){
    if(td.hasAttribute('data-fxo-ucell'))return;
    if(td.querySelector('button,.el-button,input,.el-switch,.el-dropdown'))return;   /* action / form cells are not name cells */
    var st=[].filter.call(td.querySelectorAll('*'),function(x){return !x.childElementCount&&statusKey((x.textContent||'').trim())!=='other'})[0];
    if(!st)return;
    var sb=st;while(sb.parentElement&&sb.parentElement!==td&&sb.parentElement.children.length===1)sb=sb.parentElement;
    var box=sb.parentElement;if(!box||box===td.parentElement)return;
    var kids=[].filter.call(box.children,function(k){return k!==sb&&(k.textContent||'').trim()});if(!kids.length)return;
    wsTag(td,'data-fxo-ucell','1');wsTag(box,'data-fxo-ubox','1');
    var sk=statusKey(st.textContent||'');
    wsTag(sb,'data-fxo-ustat',sk==='open'?'open':(sk==='pending'||sk==='snoozed')?'warn':sk==='done'?'ok':'no');
    kids.forEach(function(k,i){wsTag(k,i===0?'data-fxo-uname':'data-fxo-usub','1')});
  });
  /* 3. contacts tables: the "Avatar" column header carries no information */
  [].forEach.call(D.querySelectorAll('th'),function(th){if(UI_RX.avatar.test((th.textContent||'').trim()))wsTag(th,'data-fxo-quiet','1')});
};
var wsUndo=function(){H.classList.remove('fxo-signal');var fl=D.getElementById('fxo-signal-font');if(fl)fl.remove();[].forEach.call(D.querySelectorAll('[data-fxo-rail],[data-fxo-fhead],[data-fxo-fitem],[data-fxo-ffirst],[data-fxo-count],[data-fxo-ftop],[data-fxo-empty],[data-fxo-welcome],[data-fxo-welcome-text],[data-fxo-quiet],[data-fxo-fwrap],[data-fxo-st],[data-fxo-mono],[data-fxo-ucell],[data-fxo-ubox],[data-fxo-ustat],[data-fxo-uname],[data-fxo-usub]'),function(e){
  ['data-fxo-rail','data-fxo-fhead','data-fxo-fitem','data-fxo-ffirst','data-fxo-count','data-fxo-ftop','data-fxo-empty','data-fxo-welcome','data-fxo-welcome-text','data-fxo-quiet','data-fxo-fwrap','data-fxo-st','data-fxo-mono','data-fxo-ucell','data-fxo-ubox','data-fxo-ustat','data-fxo-uname','data-fxo-usub'].forEach(function(k){e.removeAttribute(k)});
  if(e.getAttribute('aria-current')==='true')e.removeAttribute('aria-current')})};
var signalFont=function(){   /* Signal type: Plus Jakarta Sans (UI), Bricolage Grotesque (titles), JetBrains Mono (IDs). Falls back to system fonts if blocked. */
  if(D.getElementById('fxo-signal-font'))return;
  var l=D.createElement('link');l.id='fxo-signal-font';l.rel='stylesheet';
  l.href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';   /* Inter, as the 360 shell uses */
  (D.head||H).appendChild(l);
};
var WS_ICON={
  chatg:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230A8F6E' stroke-width='1.6' stroke-linejoin='round'%3E%3Cpath d='M4 5h16v11H9l-5 4z'/%3E%3Cpath d='M8 9.5h8M8 12.5h5' stroke-linecap='round'/%3E%3C/svg%3E\")",
  searchg:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230A8F6E' stroke-width='1.6' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='6.5'/%3E%3Cpath d='M20 20l-4.2-4.2'/%3E%3C/svg%3E\")",
  chatv:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23A684FF' stroke-width='1.6' stroke-linejoin='round'%3E%3Cpath d='M4 5h16v11H9l-5 4z'/%3E%3Cpath d='M8 9.5h8M8 12.5h5' stroke-linecap='round'/%3E%3C/svg%3E\")",
  searchv:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23A684FF' stroke-width='1.6' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='6.5'/%3E%3Cpath d='M20 20l-4.2-4.2'/%3E%3C/svg%3E\")",
  inbox:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 13l2.5-7h11L20 13'/%3E%3Cpath d='M4 13v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5h-5l-1.5 2.5h-3L9 13z'/%3E%3C/svg%3E\")",
  search:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='1.6' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='6.5'/%3E%3Cpath d='M20 20l-4.2-4.2'/%3E%3C/svg%3E\")",
  chat:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='1.6' stroke-linejoin='round'%3E%3Cpath d='M4 5h16v11H9l-5 4z'/%3E%3Cpath d='M8 9.5h8M8 12.5h5' stroke-linecap='round'/%3E%3C/svg%3E\")"
};
var WS_CSS=[
  /* -- filter rail: one component for Inbox and Search Contacts -- */
  '[data-fxo-rail]{background:#FFFFFF!important;border-inline-end:1px solid #EEF1F6!important;font-size:14px}',
  '[data-fxo-rail=card]{border:0!important;border-radius:22px!important;box-shadow:0 1px 2px #E6ECF0,inset 0 0 0 1px #EEF1F6!important;margin-inline-end:14px!important;overflow:hidden!important;align-self:flex-start;max-height:calc(100vh - 140px)}',
  '[data-fxo-ftop]{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:8px;min-height:52px;box-sizing:border-box;padding:8px 10px!important;margin:0 0 6px!important;border-bottom:1px solid #EEF1F6!important}',
  '[data-fxo-ftop] :is(button,.el-button,.btn){height:32px!important;min-height:32px!important;border-radius:10px!important;border:1px solid #E6EAF2!important;background:#FFFFFF!important;box-shadow:none!important;padding:0 10px!important;font-size:13px!important;font-weight:600!important;color:#28303D!important}',
  '[data-fxo-ftop] :is(button,.el-button,.btn):hover{background:#F7FAFF!important;border-color:#C9D3E3!important}',
  /* section labels */
  '[data-fxo-fhead]{display:flex!important;align-items:center!important;justify-content:space-between!important;min-height:36px;box-sizing:border-box;padding-block:0!important;padding-inline:14px 12px!important;margin:10px 0 2px!important;border:0!important;border-top:1px solid #EEF1F6!important;font-size:11px!important;font-weight:700!important;letter-spacing:.06em!important;text-transform:uppercase!important;color:#7F848D!important;cursor:pointer;background:transparent!important}',
  '[data-fxo-fhead]{width:100%!important;box-sizing:border-box!important}',
  '[data-fxo-fwrap]{padding:0!important;margin:0!important;border:0!important}',
  '[data-fxo-fwrap] [data-fxo-fhead]~*{margin-top:2px!important;margin-bottom:6px!important;padding-inline-start:0!important;padding-inline-end:0!important}',
  '[data-fxo-fhead]>:is(i,svg,.el-icon-arrow-right,.el-icon-arrow-down,[class*=chevron],[class*=arrow]):last-child{margin-inline-start:auto!important;font-size:12px!important}',
  '[data-fxo-rail] .el-scrollbar__view *:not([data-fxo-fhead]):not([data-fxo-ftop]):not(hr):not(input):not(textarea):not(.el-input__inner):not(button):not(.el-button):not(.el-select *){border-top-width:0!important;border-bottom-width:0!important}',
  '[data-fxo-fhead] *{border:0!important;box-shadow:none!important;font:inherit!important;letter-spacing:inherit!important;text-transform:inherit!important;color:inherit!important}',
  '[data-fxo-fhead]:hover{color:#28303D!important}',
  /* filter items: one row height, one icon size, clear selected state */
  '[data-fxo-fitem]{position:relative;display:flex!important;align-items:center!important;gap:10px!important;box-sizing:border-box!important;min-height:36px!important;height:auto!important;line-height:20px!important;padding-block:8px!important;padding-inline:12px 10px!important;margin:1px 8px!important;border-radius:10px!important;font-size:14px!important;font-weight:500!important;color:#28303D!important;background:transparent!important;transition:background .12s,color .12s}',
  '[data-fxo-fitem] :is(i,svg,img,.svg-icon){flex:0 0 16px!important;width:16px!important;height:16px!important;font-size:16px!important;margin:0!important;line-height:16px!important;background-size:contain!important;background-position:center!important;background-repeat:no-repeat!important}',
  '[data-fxo-fitem] *:not([data-fxo-count]){font-size:14px!important;line-height:20px!important;font-style:normal!important}',
  '[data-fxo-fitem]:hover{background:#F7FAFF!important;color:#0A0E1A!important}',
  '[data-fxo-fitem=agent] :is(.el-avatar,img){flex:0 0 22px!important;width:22px!important;height:22px!important;line-height:22px!important;font-size:9px!important;border-radius:50%!important}',
  '[data-fxo-fitem]:focus-visible{outline:0!important;box-shadow:0 0 0 3px rgba(36,228,187,.2)!important}',
  '[data-fxo-fitem].is-active,[data-fxo-fitem].is-active *{color:#339DFF!important;font-weight:600!important}',
  '[data-fxo-fitem].is-active{background:#E6F3FF!important}',
  '[data-fxo-fitem].is-active::before{content:"";position:absolute;inset-inline-start:-8px;top:8px;bottom:8px;width:3px;border-radius:0;border-start-end-radius:3px;border-end-end-radius:3px;background:#339DFF}',
  '[data-fxo-ffirst]{margin-top:26px!important}',
  '[data-fxo-ffirst]::after{content:var(--fxo-copy-view);position:absolute;inset-inline-start:6px;top:-20px;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#7F848D;pointer-events:none}',
  '[data-fxo-rail] hr{border:0!important;border-top:1px solid #EEF1F6!important;height:0!important;margin:8px 14px!important;background:none!important}',
  '[data-fxo-fitem]>:not(i):not(svg):not(img):not(.svg-icon):not([data-fxo-count]){min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
  '[data-fxo-count]{flex:none!important;white-space:nowrap!important;margin-inline-start:auto!important;min-width:22px;height:20px;padding:0 7px!important;box-sizing:border-box;border-radius:999px;background:#EEF1F6!important;color:#49545A!important;font-size:12px!important;font-weight:600!important;line-height:20px!important;text-align:center;font-variant-numeric:tabular-nums}',
  '[data-fxo-fitem].is-active [data-fxo-count]{background:#FFFFFF!important;color:#339DFF!important}',
  '[data-fxo-rail=card]{width:236px!important;min-width:236px!important;flex:0 0 236px!important;margin-inline-start:12px!important}',
  '[data-fxo-rail] .el-select{display:block!important;flex:1 1 auto!important;min-width:0!important;width:auto!important;margin:0!important;box-sizing:border-box}','[data-fxo-rail] .el-select .el-input{width:100%!important}',
  '[data-fxo-rail] .el-select+:is(button,.el-button){flex:0 0 36px!important;width:36px!important;height:36px!important;min-height:36px!important;padding:0!important;margin:0!important;border-radius:10px!important}',
  '[data-fxo-rail] :has(>.el-select){gap:6px!important;padding:8px 10px!important}',
  '[data-fxo-rail] .el-select .el-input__inner{height:36px!important;border-radius:10px!important}',
  /* -- empty states that explain what to do next -- */
  '[data-fxo-empty]{display:block!important;text-align:center!important;font-size:0!important;line-height:0!important;font-style:normal!important;color:transparent!important;padding:96px 24px 40px!important;min-height:0!important;background-repeat:no-repeat!important;background-position:center 40px!important;background-size:36px 36px!important}',
  '[data-fxo-empty=list]{background-image:'+WS_ICON.chatv+'!important}',
  '[data-fxo-empty=table]{background-image:'+WS_ICON.searchv+'!important}',
  '[data-fxo-empty]::before{display:block;font-size:15px;line-height:22px;font-weight:700;color:#0A0E1A}',
  '[data-fxo-empty]::after{display:block;max-width:300px;margin:6px auto 0;font-size:13px;line-height:19px;font-weight:400;color:#7F848D}',
  '[data-fxo-empty=list]::before{content:var(--fxo-copy-empty-list)}',
  '[data-fxo-empty=list]::after{content:var(--fxo-copy-empty-list-help)}',
  '[data-fxo-empty=table]::before{content:var(--fxo-copy-empty-table)}',
  '[data-fxo-empty=table]::after{content:var(--fxo-copy-empty-table-help)}',
  '[data-fxo-empty=none]{background-image:'+WS_ICON.searchv+'!important}',
  '[data-fxo-empty=none]::before{content:var(--fxo-copy-empty-none)}',
  '[data-fxo-empty=none]::after{content:var(--fxo-copy-empty-none-help)}',
  '[data-fxo-welcome]{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;text-align:center!important}',
  '[data-fxo-welcome] img{width:170px!important;max-width:170px!important;height:auto!important;max-height:200px!important;object-fit:contain}',
  '[data-fxo-welcome]::after{content:var(--fxo-copy-no-conversation);display:block;order:5;margin-top:18px;font-size:17px;line-height:24px;font-weight:700;color:#0A0E1A}',
  '[data-fxo-welcome-text]{order:7;margin-top:6px!important;font-size:12px!important;color:#7F848D!important}',
  '[data-fxo-welcome-text]::before{content:var(--fxo-copy-no-conversation);display:block;margin:0 auto 14px;max-width:320px;font-size:14px;line-height:21px;color:#49545A}',
  '.rooms-container .df-sidebar{width:208px!important;min-width:208px!important;flex:0 0 208px!important}',
  '.rooms-container{width:auto!important;max-width:none!important;flex:0 0 auto!important}',
  '.rooms-container>.w-100{width:330px!important;flex:0 0 330px!important}',
  '[data-fxo-fhead]+[data-fxo-fhead]{margin-top:0!important}',
  /* -- list header lines up with the rail header (one 52px header band across the panes) -- */
  '.rooms-container .filter-border-b{min-height:52px!important;box-sizing:border-box!important;display:flex!important;align-items:center!important;border-bottom:1px solid #EEF1F6!important}',
  /* -- contacts table header -- */
  'th[data-fxo-quiet] .cell,th[data-fxo-quiet]{color:transparent!important}'
].map(function(r){var i=r.indexOf('{'),sel=r.slice(0,i),P='html.fxo body #spark-app#spark-app#spark-app ';return sel.split(/,(?![^(]*\))/).map(function(x){return P+x.trim()+',html.fxo body '+x.trim()}).join(',')+r.slice(i)}).join('\n');   /* three IDs: wins over the page-scoped inbox rules */


/* ===== v14 · "Signal" visual identity — applied where the conversation workspace is on screen (Inbox, Search Contacts) =====
   Ink #0E1320 · paper #FFFFFF · canvas #F3F5F7 · line #DCE1E8 / #E8ECF1 · action green #0A8F6E (hover #087A5F, tint #DFF7EF / #075E49)
   · AI violet #7553F2 (tint #EFEAFF / #5A3BD6) · note #FFF4DC / #8A5300 · danger #D93A2B (tint #FFE8E6 / #B42318) · info #2559D6 / #E4EEFF */
var SIGNAL_CSS=[
  /* ===== v16 · The Design Book of OmniAI =====
     Accent #A684FF (hover #9370F5, tint 14% rgba(166,132,255,.14), 7% rgba(166,132,255,.07)); readable purple #77008F;
     canvas #F7F6FB; hairline #E6E3F1; row rule #EAF2FF; ink #1B2137; muted #5F73AB; faint #BCC5DC; inner tint #F7FAFF;
     fields #C9CED8 (focus #4E9BFF); status ok #006952 · no #D92D20 · info #155DFC · warn #C2410C.
     Radii 4 (controls, page card) / 6 (cards). No shadows on cards. */
  '.rooms-container,.col-messages,[data-fxo-rail],main.el-main{font-family:Inter,"Inter Fallback",system-ui,-apple-system,"Segoe UI",sans-serif!important;color:#1B2137}',
  '.rooms-container *:not(i):not([class*=icon]):not([class*=fa-]),.col-messages *:not(i):not([class*=icon]):not([class*=fa-]),[data-fxo-rail] *:not(i):not([class*=icon]):not([class*=fa-]),main.el-main .el-table *:not(i):not([class*=icon]){font-family:inherit!important}',
  '[data-fxo-mono]{color:#5F73AB!important;font-size:12px!important}',
  /* canvas + cards */
  '#team-main,main.el-main{background:#F7F6FB!important}',
  '.rooms-container,.col-messages,[data-fxo-rail=card]{background:#FFFFFF!important;border:1px solid #E6E3F1!important;border-radius:6px!important;box-shadow:none!important;overflow:hidden!important}',
  '.rooms-container .df-sidebar{background:#FFFFFF!important;border-inline-end:1px solid #E6E3F1!important}',
  '.rooms-container .df-sidebar~*{background:#FFFFFF!important}',
  /* rail rows */
  '[data-fxo-ffirst]::after{content:none!important;display:none!important}',
  '[data-fxo-fitem]{border-radius:0!important;min-height:32px!important;padding-block:6px!important;padding-inline:14px 16px!important;margin:0!important;font-size:14px!important;color:#1B2137!important;background:transparent!important;box-shadow:none!important;border-inline-start:2px solid transparent!important;transition:background .15s,color .15s}',
  '[data-fxo-fitem] *:not([data-fxo-count]){font-size:14px!important;font-weight:400!important;color:inherit!important;line-height:20px!important}',
  '[data-fxo-fitem] :is(i,svg,.svg-icon){color:#5F73AB!important}',
  '[data-fxo-fitem]:hover:not(.is-active){background:#F7FAFF!important}',
  '[data-fxo-fitem].is-active{background:rgba(166,132,255,.14)!important;color:#77008F!important;border-inline-start-color:#A684FF!important}',
  '[data-fxo-fitem].is-active *{background:transparent!important;color:#77008F!important;font-weight:700!important}',
  '[data-fxo-fitem].is-active :is(i,svg,.svg-icon){color:#77008F!important}',
  '[data-fxo-fitem].is-active::before{content:none!important;display:none!important}',
  '[data-fxo-count]{background:transparent!important;color:#5F73AB!important;font-size:12px!important;font-weight:400!important;height:auto!important;line-height:20px!important;min-width:0!important;padding:0!important;border-radius:0!important;font-variant-numeric:tabular-nums}',
  '[data-fxo-fitem].is-active [data-fxo-count]{color:#77008F!important;font-weight:700!important}',
  '[data-fxo-fitem=status] :is(i,svg,img,.svg-icon){display:none!important}',
  '[data-fxo-fitem=status]::after{content:"";order:-1;flex:0 0 8px;width:8px;height:8px;border-radius:50%;background:#BCC5DC}',
  '[data-fxo-st=open]::after{background:#155DFC}',
  '[data-fxo-st=pending]::after{background:#C2410C}',
  '[data-fxo-st=snoozed]::after{background:#C2410C}',
  '[data-fxo-st=done]::after{background:#006952}',
  '[data-fxo-st=spam]::after{background:#D92D20}',
  '[data-fxo-st=unsub]::after{background:transparent;box-shadow:inset 0 0 0 1.5px #5F73AB}',
  '[data-fxo-st=all]::after{background:#A684FF}',
  '[data-fxo-fitem=agent] :is(.el-avatar,img,[class*=avatar]){display:inline-flex!important;flex:0 0 22px!important;width:22px!important;height:22px!important;border-radius:50%!important;font-size:9px!important;line-height:22px!important;align-items:center;justify-content:center}',
  /* section headings: fold titles (14/700, 2px purple rule), chevron in readable purple */
  '[data-fxo-fhead],[data-fxo-fhead] *{font-size:14px!important;font-weight:700!important;letter-spacing:0!important;text-transform:none!important;color:#1B2137!important}',
  '[data-fxo-fhead]{border-top:1px solid #EAF2FF!important;padding-inline-start:14px!important}',
  '[data-fxo-fhead]>:first-child:not(i):not(svg){border-inline-start:2px solid #A684FF!important;padding-inline-start:10px!important}',
  '[data-fxo-rail] .el-collapse,[data-fxo-rail] .el-collapse-item__wrap{border:0!important;background:transparent!important}',
  '[data-fxo-rail] .el-collapse-item__wrap{margin:0!important}',
  '[data-fxo-rail] .el-collapse-item__content{padding:0 0 8px!important}',
  '[data-fxo-rail] .el-collapse-item__header{flex:1 1 auto!important;width:100%!important;height:40px!important;line-height:40px!important;border:0!important;background:transparent!important;display:flex!important;align-items:center!important;transition:background .15s}',
  '[data-fxo-rail] .el-collapse-item__header:hover{background:rgba(166,132,255,.07)!important}',
  '[data-fxo-rail] .el-collapse-item__arrow{margin:0!important;margin-inline:auto 12px!important;font-size:14px!important;color:#77008F!important;transition:transform .2s}',
  '[data-fxo-rail] [data-fxo-fhead]{margin:4px 0 2px!important}',
  '[data-fxo-ftop]{border-bottom:1px solid #E6E3F1!important;background:rgba(166,132,255,.07)!important}',
  '[data-fxo-rail=card]{width:236px!important;min-width:236px!important;flex:0 0 236px!important;margin-inline-start:12px!important}',
  '[data-fxo-rail] .el-select{display:block!important;flex:1 1 auto!important;min-width:0!important;width:auto!important;margin:0!important}',
  '[data-fxo-rail] .el-select+:is(button,.el-button){flex:0 0 34px!important;width:34px!important;height:34px!important;min-height:34px!important;padding:0!important;margin:0!important}',
  '[data-fxo-rail] :has(>.el-select){gap:8px!important;padding:12px 16px!important}',
  /* buttons: ghost (default) and CTA (primary) */
  ':is(.rooms-container,.col-messages,main.el-main) .el-button{border-radius:4px!important;font-size:12px!important;font-weight:600!important;min-height:34px!important;transition:background .15s,border-color .15s,color .15s}',
  ':is(.rooms-container,.col-messages,main.el-main,[data-fxo-rail]) .el-button--default:not(.el-button--primary):not(.el-button--danger):not(.el-button--success){background:#FFFFFF!important;border:1px solid #A684FF!important;color:#77008F!important}',
  ':is(.rooms-container,.col-messages,main.el-main,[data-fxo-rail]) .el-button--default:not(.el-button--primary):not(.el-button--danger):not(.el-button--success):hover{background:rgba(166,132,255,.14)!important;border-color:#A684FF!important;color:#77008F!important}',
  ':is(.rooms-container,.col-messages,main.el-main) .el-button--primary:not(.is-plain):not(.is-text){background:#A684FF!important;border-color:#A684FF!important;color:#FFFFFF!important}',
  ':is(.rooms-container,.col-messages,main.el-main) .el-button--primary:not(.is-plain):not(.is-text):hover{background:#9370F5!important;border-color:#9370F5!important}',
  ':is(.rooms-container,.col-messages,main.el-main) .el-button--danger:not(.is-plain){background:#D92D20!important;border-color:#D92D20!important;color:#FFFFFF!important}',
  ':is(.rooms-container,.col-messages,main.el-main) .el-button.is-disabled{opacity:.5!important;cursor:not-allowed!important}',
  /* fields: white, grey edge, blue focus, no ring */
  ':is(.rooms-container,.col-messages,main.el-main) :is(input.el-input__inner,.el-input__inner,input[type=text],input:not([type])):not(.el-select__input):not(.el-select__tags *){height:34px!important;border-radius:4px!important;background:#FFFFFF!important;border:1px solid #C9CED8!important;font-size:14px!important;color:#1B2137!important;box-shadow:none!important}',
  ':is(.rooms-container,.col-messages,main.el-main) :is(.el-input__inner,input):focus{background:#FFFFFF!important;border-color:#4E9BFF!important;box-shadow:none!important}',
  ':is(.rooms-container,.col-messages,main.el-main) .el-select .el-input.is-focus .el-input__inner{border-color:#A684FF!important}',
  ':is(.rooms-container,.col-messages,main.el-main) :is(.el-input__inner,input)::placeholder{color:#BCC5DC!important;opacity:1!important}',
  ':is(.rooms-container,.col-messages,main.el-main) :is(.el-input__icon,.el-select__caret){color:#BCC5DC!important}',
  ':is(.rooms-container,main.el-main,[data-fxo-rail]) .el-checkbox__input.is-checked .el-checkbox__inner,:is(.rooms-container,main.el-main,[data-fxo-rail]) .el-checkbox__input.is-indeterminate .el-checkbox__inner{background:#26315A!important;border-color:#26315A!important}',
  ':is(.rooms-container,main.el-main,[data-fxo-rail]) .el-checkbox__inner{border:1.5px solid #5F73AB!important;border-radius:4px!important}',
  ':is(.rooms-container,main.el-main) .el-checkbox__input.is-checked+.el-checkbox__label{color:#1B2137!important}',
  '.rooms-container .filter-border-b{background:#FFFFFF!important;border-bottom:1px solid #E6E3F1!important}',
  'main.el-main .el-select__input{background:transparent!important;border:0!important;box-shadow:none!important;height:auto!important}',
  'main.el-main .el-input-group__append,main.el-main .el-input-group__prepend{background:#FFFFFF!important;border:1px solid #C9CED8!important;padding:0!important}',
  'main.el-main .el-input-group__append{border-inline-start:0!important;border-radius:0!important;border-start-end-radius:4px!important;border-end-end-radius:4px!important}',
  'main.el-main .el-input-group__prepend{border-inline-end:0!important;border-radius:0!important;border-start-start-radius:4px!important;border-end-start-radius:4px!important}',
  'main.el-main .el-input-group__append .el-button{border:0!important;background:transparent!important;min-height:32px!important;height:32px!important;color:#5F73AB!important}',
  'main.el-main .el-input-group--append>.el-input__inner{border-radius:0!important;border-start-start-radius:4px!important;border-end-start-radius:4px!important}',
  'main.el-main .el-input-group--prepend>.el-input__inner{border-radius:0!important;border-start-end-radius:4px!important;border-end-end-radius:4px!important}',
  'main.el-main .el-input-group--append.el-input-group--prepend>.el-input__inner{border-radius:0!important}',
  /* conversation list rows */
  '.room-item{margin:0!important;padding-block:12px!important;padding-inline:14px 16px!important;border-radius:0!important;border-bottom:1px solid #EAF2FF!important;border-inline-start:2px solid transparent!important;background:#FFFFFF!important;box-shadow:none!important;transition:background .15s}',
  '.room-item:hover{background:#F7FAFF!important}',
  '.room-item:is(.active,.selected,.is-active,.room-selected,[class*=active],[class*=selected]){background:rgba(166,132,255,.07)!important;border-inline-start-color:#A684FF!important;box-shadow:none!important}',
  '.room-item .room-name,.room-item b,.room-item strong{font-size:14px!important;font-weight:600!important;color:#1B2137!important}',
  '.room-item .text-last,.room-item .last-message,.room-item [class*=last]{font-size:13px!important;color:#5F73AB!important}',
  '.room-item [class*=time],.room-item [class*=date],.room-item small{font-size:11px!important;color:#5F73AB!important}',
  /* composer */
  '.col-messages textarea,.col-messages .el-textarea__inner{border-radius:4px!important;border:1px solid #C9CED8!important;font-size:14px!important;color:#1B2137!important;background:#FFFFFF!important;box-shadow:none!important}',
  '.col-messages textarea:focus,.col-messages .el-textarea__inner:focus{border-color:#4E9BFF!important;box-shadow:none!important}',
  /* empty conversation pane: one plain line */
  '[data-fxo-welcome]::after{content:none!important;display:none!important}',
  '[data-fxo-welcome] img{display:block!important;width:220px!important;max-width:60%!important;height:auto!important;max-height:260px!important;object-fit:contain!important;margin:0 auto!important}',
  '[data-fxo-welcome-text]{display:block!important;margin:0!important;padding:32px 16px!important;font-size:0!important;line-height:0!important;color:transparent!important;text-align:center!important}',
  '[data-fxo-welcome-text]::before{content:var(--fxo-copy-no-conversation)!important;display:block;font-size:12px!important;line-height:18px!important;color:#5F73AB!important}',
  '[data-fxo-empty]::before{color:#1B2137!important}',
  '[data-fxo-empty]::after{color:#5F73AB!important}',
  /* Search Contacts table: deep purple heading row */
  'main.el-main .el-table{background:#FFFFFF!important;border:0!important;border-radius:4px!important;box-shadow:none!important;overflow:hidden!important}',
  'main.el-main .el-table::before,main.el-main .el-table::after{background:transparent!important}',
  'main.el-main :is(table,.el-table){border-collapse:collapse!important;border-spacing:0!important}',
  'main.el-main :is(.el-table__header-wrapper,.el-table__fixed-header-wrapper,.el-table__header) {background:#77008F!important}',
  'main.el-main :is(table,.el-table) th{height:34px!important;background:#77008F!important;border:0!important;color:#FFFFFF!important;font-size:10px!important;font-weight:700!important;letter-spacing:.09em!important;text-transform:uppercase!important;white-space:nowrap!important}',
  'main.el-main :is(table,.el-table) th:not([data-fxo-quiet]) *:not(.el-checkbox__inner):not(.el-checkbox__inner *){color:#FFFFFF!important}',
  'main.el-main :is(table,.el-table) th .el-checkbox__inner{border-color:#FFFFFF!important;background:transparent!important}',
  'main.el-main .el-table th .sort-caret.ascending{border-bottom-color:rgba(255,255,255,.55)!important}',
  'main.el-main .el-table th .sort-caret.descending{border-top-color:rgba(255,255,255,.55)!important}',
  'main.el-main .el-table th.ascending .sort-caret.ascending{border-bottom-color:#FFFFFF!important}',
  'main.el-main .el-table th.descending .sort-caret.descending{border-top-color:#FFFFFF!important}',
  'main.el-main :is(table,.el-table) td{height:48px!important;background:#FFFFFF!important;border:0!important;border-bottom:1px solid #EAF2FF!important;border-radius:0!important;box-shadow:none!important;font-size:14px!important;color:#1B2137!important}',
  'main.el-main :is(table,.el-table) tbody tr{box-shadow:none!important;background:transparent!important}',
  'main.el-main :is(table,.el-table) tr:hover>td{background:#FFFFFF!important}',
  'main.el-main .el-table :is(td,th){padding:0!important}',
  'main.el-main .el-table .cell{padding:0 16px!important;line-height:20px!important;overflow:hidden!important;text-overflow:ellipsis!important}',
  'main.el-main .el-table th .cell{white-space:nowrap!important}',
  'main.el-main :is(table,.el-table) th[data-fxo-quiet],main.el-main :is(table,.el-table) th[data-fxo-quiet] *{color:transparent!important}',
  'main.el-main .el-table__empty-block{background:#FFFFFF!important}',
  'main.el-main .el-table__empty-text{font-size:12px!important;color:#5F73AB!important}',
  /* rows: everything centred on one line, 60px rows, the checkbox and avatar columns tight */
  'main.el-main :is(table,.el-table) :is(td,th){vertical-align:middle!important}',
  'main.el-main :is(table,.el-table) td{height:60px!important}',
  'main.el-main .el-table :is(td,th) .cell:has(>.el-checkbox:only-child),main.el-main .el-table :is(td,th).el-table-column--selection .cell{display:flex!important;align-items:center!important;justify-content:center!important;padding:0 8px!important}',
  'main.el-main :is(table,.el-table) td :is(.el-checkbox,input[type=checkbox]){margin:0!important;vertical-align:middle!important}',
  'main.el-main :is(table,.el-table) td .el-avatar{width:36px!important;height:36px!important;line-height:36px!important}',
  'main.el-main :is(table,.el-table) td [data-fxo-mono]:not([data-fxo-usub]):not([data-fxo-usub] *){color:#1B2137!important;font-size:14px!important;font-variant-numeric:tabular-nums}',
  'main.el-main :is(table,.el-table) td [data-fxo-mono=sub]:not([data-fxo-usub]):not([data-fxo-usub] *){color:#5F73AB!important;font-size:12px!important;line-height:16px!important}',
  'main.el-main .el-table td .cell:empty::after{content:"\\2014";color:#5F73AB}',
  /* the name cell: name + status chip on one line, ID underneath */
  '[data-fxo-ubox]{display:flex!important;flex-wrap:wrap!important;align-items:center!important;column-gap:8px!important;row-gap:2px!important;margin:0!important;padding:0!important}',
  '[data-fxo-ubox]>*{margin:0!important}',
  '[data-fxo-uname],[data-fxo-uname] *{order:1;font-size:14px!important;font-weight:600!important;line-height:20px!important;color:#1B2137!important;text-transform:none!important}',
  '[data-fxo-ustat]{order:2;display:inline-flex!important;align-items:center;flex:none;padding:0!important;background:transparent!important}',
  '[data-fxo-ustat],[data-fxo-ustat] *{font-size:10px!important;font-weight:700!important;letter-spacing:.08em!important;text-transform:uppercase!important;line-height:16px!important;border:0!important}',
  '[data-fxo-ustat] :not(:has(*)),[data-fxo-ustat]:not(:has(*)){padding:2px 8px!important;border-radius:4px!important}',
  '[data-fxo-ustat=open] :not(:has(*)),[data-fxo-ustat=open]:not(:has(*)){background:rgba(21,93,252,.12)!important;color:#155DFC!important}',
  '[data-fxo-ustat=warn] :not(:has(*)),[data-fxo-ustat=warn]:not(:has(*)){background:rgba(234,88,12,.12)!important;color:#C2410C!important}',
  '[data-fxo-ustat=ok] :not(:has(*)),[data-fxo-ustat=ok]:not(:has(*)){background:rgba(0,105,82,.12)!important;color:#006952!important}',
  '[data-fxo-ustat=no] :not(:has(*)),[data-fxo-ustat=no]:not(:has(*)){background:rgba(217,45,32,.12)!important;color:#D92D20!important}',
  '[data-fxo-usub],[data-fxo-usub] *{order:3;flex:1 0 100%!important;font-size:12px!important;font-weight:400!important;line-height:16px!important;color:#5F73AB!important;font-variant-numeric:tabular-nums}',
  'main.el-main .el-tag{border:0!important;border-radius:4px!important;background:rgba(166,132,255,.14)!important;color:#77008F!important;font-size:10px!important;font-weight:700!important;letter-spacing:.08em!important;text-transform:uppercase!important;height:20px!important;line-height:20px!important;padding:0 8px!important}',
  'main.el-main .el-tag .el-tag__close{color:#77008F!important}',
  'main.el-main .el-pagination{border-top:1px solid #E6E3F1!important;padding-top:8px!important;text-align:end!important;color:#5F73AB!important}',
  'main.el-main .el-pagination.is-background .el-pager li,main.el-main .el-pagination.is-background :is(.btn-prev,.btn-next){border-radius:4px!important;background:#FFFFFF!important;border:1px solid #E6E3F1!important;color:#1B2137!important;font-weight:500!important}',
  'main.el-main .el-pagination.is-background .el-pager li:not(.disabled).active{background:#A684FF!important;border-color:#A684FF!important;color:#FFFFFF!important;font-weight:700!important}',
  'main.el-main a:not(.el-button){color:#77008F}'

].map(function(r){var i=r.indexOf('{'),sel=r.slice(0,i),P='html.fxo.fxo-signal body #spark-app#spark-app#spark-app#spark-app ';return sel.split(/,(?![^(]*\))/).map(function(x){x=x.trim();return x.indexOf('.el-message-box')===0?'html.fxo.fxo-signal body '+x:P+x+',html.fxo.fxo-signal body '+x}).join(',')+r.slice(i)}).join('\n');

/* ===================================================================================== */
/* 5. v16.7 GENERIC FIXES — one rule per pattern, applied on every page that has it        */
/* ===================================================================================== */
/* five IDs: outranks every earlier layer (DESIGN 2, WS 3, SIGNAL 4) without touching it */
var XP='html.fxo body #spark-app#spark-app#spark-app#spark-app#spark-app';
var XRP='html.fxo.fxo-rtl body #spark-app#spark-app#spark-app#spark-app#spark-app';
var AI_SPARK='url("data:image/svg+xml,'+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#000'><path d='M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z'/><path d='M19 3l.8 2.2L22 6l-2.2.8L19 9l-.8-2.2L16 6l2.2-.8z'/></svg>")+'")';
var FIX_CSS=(`
html.fxo.fxo-signal body :is(.rooms-container,.col-messages,main.el-main){--fxo-gr:4px}

/* ---- buttons next to each other: spacing on the reading side (Element puts 10px on the physical left) ---- */
X .el-button+.el-button{margin-left:0!important;margin-inline-start:10px!important}

/* ---- text buttons that do not fit their words (tagged by fitJob): size to the text, one line, never clipped ---- */
X [data-fxo-fitbtn]{width:auto!important;min-width:max-content!important;max-width:none!important;height:auto!important;min-height:32px!important;padding-block:6px!important;padding-inline:12px!important;white-space:nowrap!important;overflow:visible!important;line-height:18px!important;flex-shrink:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;text-overflow:clip!important}
X [data-fxo-fitbtn] *{white-space:nowrap!important;overflow:visible!important;text-overflow:clip!important}
X [data-fxo-fitbtn]>span{display:inline-flex!important;align-items:center!important;gap:6px!important}

/* ---- title + status chip in a card (tagged by chipJob): one centred block, clear of the card's button ---- */
X [data-fxo-chipbox]{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;text-align:center!important;gap:4px!important;margin-inline:14px!important;min-width:0!important}
X [data-fxo-chipbox]>*{margin:0!important;position:static!important;transform:none!important;float:none!important;text-align:center!important}

/* ---- empty states: only our copy shows (the product text stays hidden even where a stronger rule sizes it),
   and a compact layout in narrow places such as the contact side panel ---- */
X [data-fxo-empty]{font-size:0!important;line-height:0!important;color:transparent!important}
X [data-fxo-empty-size=s]{padding:56px 12px 20px!important;background-position:center 18px!important;background-size:28px 28px!important}
X [data-fxo-empty-size=s]::before{font-size:14px!important;line-height:20px!important}
X [data-fxo-empty-size=s]::after{font-size:12px!important;line-height:17px!important;max-width:220px!important}

/* ---- page content that a fixed max-width keeps narrower than the page (tagged by fillJob, reports) ---- */
X [data-fxo-full]{max-width:none!important;width:auto!important;margin-inline:0!important}

/* ---- more Element UI pieces that are physically placed (RTL) ---- */
XR .el-button [class*="el-icon-"]+span{margin-left:0!important;margin-right:5px!important}
XR .el-icon--right{margin-left:0!important;margin-right:5px!important}
XR .el-icon--left{margin-right:0!important;margin-left:5px!important}
XR .el-submenu__title .el-submenu__icon-arrow{right:auto!important;left:20px!important}
html.fxo.fxo-rtl body .el-dialog__footer,html.fxo.fxo-rtl body .el-message-box__btns{text-align:left!important}

/* ---- AI generate buttons ("Try Generate Sub Flow by AI" and the like, tagged by aiBtnJob): the navy "Build with AI" look ---- */
X [data-fxo-aibtn]{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;height:40px!important;min-height:40px!important;padding:0 18px!important;border:0!important;border-radius:14px!important;background:#1B2137!important;color:#FFFFFF!important;font-size:0!important;box-shadow:0 10px 24px -14px rgba(27,33,55,.7)!important;transition:background .15s,transform .15s!important}
X [data-fxo-aibtn]>*{display:none!important}
X [data-fxo-aibtn]::before{content:'';flex:none;width:16px;height:16px;background:#A684FF;-webkit-mask:${AI_SPARK} center/contain no-repeat;mask:${AI_SPARK} center/contain no-repeat}
X [data-fxo-aibtn]::after{content:var(--fxo-copy-build-ai);font-size:14px;font-weight:600;line-height:1;color:#FFFFFF;white-space:nowrap}
X [data-fxo-aibtn]:hover{background:#A684FF!important;transform:translateY(-1px)}
X [data-fxo-aibtn]:hover::before{background:#04241D}

/* ---- split buttons (Open ▾ · Move to Done ▾ · Send ▾): one control, never wrapped apart ---- */
X .el-button-group{display:inline-flex!important;flex-wrap:nowrap!important;align-items:stretch!important;vertical-align:middle!important;white-space:nowrap!important;max-width:none!important}
X .el-button-group::before,X .el-button-group::after{display:none!important}
X .el-button-group>.el-button{float:none!important;flex:none!important;margin:0!important}
X .el-button-group>.el-button:not(:first-child):not(:last-child){border-radius:0!important}
X .el-button-group>.el-button:first-child:not(:last-child){border-radius:0!important;border-start-start-radius:var(--fxo-gr)!important;border-end-start-radius:var(--fxo-gr)!important}
X .el-button-group>.el-button:last-child:not(:first-child){border-radius:0!important;border-start-end-radius:var(--fxo-gr)!important;border-end-end-radius:var(--fxo-gr)!important}
X .el-dropdown:has(>.el-button-group){display:inline-flex!important;flex:none!important;vertical-align:middle!important;white-space:nowrap!important}
X .el-dropdown__caret-button{min-width:32px!important;padding-inline:8px!important}

/* ---- search field + search button pairs (tagged by sqJob): one joined control, both directions ---- */
X [data-fxo-sqm]{margin-inline-start:var(--fxo-sqm)!important}
X [data-fxo-sqb]{height:var(--fxo-sqh)!important;min-height:var(--fxo-sqh)!important;max-height:var(--fxo-sqh)!important;padding-top:0!important;padding-bottom:0!important;box-sizing:border-box!important}
X [data-fxo-sqb=s],X [data-fxo-sqi=s]{border-radius:0!important;border-start-start-radius:var(--fxo-gr)!important;border-end-start-radius:var(--fxo-gr)!important}
X [data-fxo-sqb=e],X [data-fxo-sqi=e]{border-radius:0!important;border-start-end-radius:var(--fxo-gr)!important;border-end-end-radius:var(--fxo-gr)!important}

/* ---- inputs with an icon inside: the icon never sits on the text ---- */
X .el-input--prefix .el-input__inner{padding-inline-start:34px!important}
X .el-input--suffix .el-input__inner{padding-inline-end:30px!important}
XR .el-input__prefix{left:auto!important;right:5px!important}
XR .el-input__suffix{right:auto!important;left:5px!important}
XR .el-input--suffix:not(.el-input--prefix) .el-input__inner{padding-right:15px!important}
XR .el-input--prefix:not(.el-input--suffix) .el-input__inner{padding-left:15px!important}

/* ---- Element UI pieces that are physically placed (RTL) ---- */
XR :is(.el-checkbox__label,.el-radio__label){padding-left:0!important;padding-right:10px!important}
XR :is(.el-checkbox,.el-radio){margin-right:0!important;margin-left:30px!important}
XR :is(.el-checkbox,.el-radio):last-of-type{margin-left:0!important}
XR .el-table :is(th,td):not(.is-center):not(.is-right):not(.is-left):not([data-fxo-actrow]):not([data-fxo-ltr]){text-align:right!important}
html.fxo.fxo-rtl body .el-dialog__headerbtn,html.fxo.fxo-rtl body #spark-app#spark-app .el-dialog__headerbtn{right:auto!important;left:20px!important}
html.fxo.fxo-rtl body .el-message-box__headerbtn{right:auto!important;left:15px!important}

/* ---- dates / numbers inside RTL tables keep their reading order (tagged by bidiJob) ---- */
X [data-fxo-ltr]{direction:ltr!important;unicode-bidi:isolate!important}
X [data-fxo-ltr=r]{text-align:right!important}
X [data-fxo-ltr=l]{text-align:left!important}
X [data-fxo-ltr=c]{text-align:center!important}

/* ---- action cells (tagged by actJob): every button / icon side by side, centred, one size ---- */
X td[data-fxo-acts]{vertical-align:middle!important}
X [data-fxo-actrow="1"]{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;align-items:center!important;justify-content:center!important;gap:6px!important;width:auto!important;max-width:none!important;overflow:visible!important;text-overflow:clip!important;white-space:nowrap!important}
X td[data-fxo-actrow=td]{text-align:center!important;white-space:nowrap!important}
X td[data-fxo-actrow=td]>[data-fxo-actitem]{display:inline-flex!important;align-items:center!important;vertical-align:middle!important;margin:0 3px!important}
X [data-fxo-actrow="1"]>[data-fxo-actitem]{display:inline-flex!important;flex-direction:row!important;flex-wrap:nowrap!important;align-items:center!important;justify-content:center!important;gap:6px!important;flex:none!important;width:auto!important;max-width:none!important;margin:0!important;padding:0!important;float:none!important}
X [data-fxo-acts] :is(button,.el-button,[role=button],.el-dropdown){margin:0!important;float:none!important;vertical-align:middle!important}
X [data-fxo-iconbtn]{width:32px!important;min-width:32px!important;max-width:32px!important;height:32px!important;min-height:32px!important;padding:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;line-height:1!important;flex:none!important}
X [data-fxo-iconbtn]>span{display:inline-flex!important;align-items:center!important;justify-content:center!important;margin:0!important}
X [data-fxo-actitem]>:is(i,svg,.svg-icon),X [data-fxo-actrow]>:is(i,svg,.svg-icon){margin:0!important}
X [data-fxo-actrow] .el-button:not([data-fxo-iconbtn]){height:32px!important;min-height:32px!important;padding-block:0!important;padding-inline:12px!important;width:auto!important;min-width:max-content!important;max-width:none!important;white-space:nowrap!important;line-height:1!important}
X [data-fxo-actrow] .el-button:not([data-fxo-iconbtn]) *{white-space:nowrap!important}
X .el-table td[data-fxo-acts]>.cell{overflow:visible!important;text-overflow:clip!important;white-space:nowrap!important}

/* ---- channel number tables: rows are separate cards, so the table itself has no frame ---- */
X #team-main .p-3>div.fxo-detail .content-card table{border:0!important;outline:0!important;box-shadow:none!important}

/* ---- status chips in tables are never cut ("PENDING_DELETE") ---- */
X :is(.el-table,table) td :is(.el-tag,.badge){letter-spacing:.02em!important;max-width:none!important;overflow:visible!important;text-overflow:clip!important;white-space:nowrap!important}
X .el-table td .cell:has(.el-tag,.badge){overflow:visible!important;text-overflow:clip!important}

/* ---- Sub Flows rows (tagged in SUBFLOWS): groups wrap as a whole, nothing breaks mid-word ---- */
X .fx-list [data-fxo-frow]{display:flex!important;flex-wrap:wrap!important;align-items:center!important;gap:8px 18px!important;width:100%!important;min-width:0!important;float:none!important}
X .fx-list [data-fxo-frow]>*{flex:none!important;min-width:0!important;max-width:100%!important;margin-top:0!important;margin-bottom:0!important;float:none!important}
X .fx-list [data-fxo-frow]>[data-fxo-fname]{flex:1 1 220px!important}
X .fx-list [data-fxo-fname] .font-weight-bold{display:block;min-width:0;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}
X .fx-list [data-fxo-frow]>:not([data-fxo-fname]),X .fx-list [data-fxo-frow]>:not([data-fxo-fname]) *{white-space:nowrap!important}
X .fx-list [data-fxo-frow]>:last-child{margin-inline-start:auto!important}

/* ---- conversation: side panel gets its own column, the header stays on one line (tagged by convJob) ---- */
X .col-messages{flex:1 1 0%!important;min-width:0}
/* the left panes keep their width while there is room; when the chat column runs short they shrink first,
   and if the chat column is still under 300px the filter rail steps aside (data-fxo-tight, set by convJob) */
X .rooms-container{flex-shrink:1!important;min-width:auto!important}
X .rooms-container .df-sidebar{flex:0 1 208px!important;min-width:168px!important}
X .rooms-container>.w-100{flex:0 1 330px!important;min-width:250px!important}
X .rooms-container[data-fxo-tight] .df-sidebar{display:none!important}
X [data-fxo-crow="1"]{display:flex!important;flex-wrap:nowrap!important;min-width:0!important}
X [data-fxo-crow="1"]>[data-fxo-cmain]{flex:1 1 auto!important;min-width:var(--fxo-cmin,320px)!important;width:auto!important;max-width:none!important}
X [data-fxo-crow="1"]>[data-fxo-cside]{flex:0 1 360px!important;width:360px!important;min-width:260px!important;max-width:46%!important;overflow-x:hidden!important;overflow-y:auto!important;box-sizing:border-box!important}
X [data-fxo-crow^="ov"]{box-sizing:border-box!important}
X [data-fxo-crow="ov-e"]{padding-inline-end:var(--fxo-csw)!important}
X [data-fxo-crow="ov-s"]{padding-inline-start:var(--fxo-csw)!important}
X [data-fxo-chead]{display:flex!important;flex-wrap:nowrap!important;align-items:center!important;gap:8px!important;min-width:0!important;overflow:hidden!important}
X [data-fxo-chead]>*{flex:none!important;min-width:0!important;margin-top:0!important;margin-bottom:0!important;position:static!important;transform:none!important}
X [data-fxo-chead]>[data-fxo-cname]{flex:1 1 auto!important;overflow:hidden!important}
X [data-fxo-cname],X [data-fxo-cname] *:not(i):not(svg):not(img):not(.el-avatar):not(.svg-icon){white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;min-width:0!important}
X [data-fxo-chead]>:not([data-fxo-cname]):not(button):not(.el-button):not(.el-avatar):not(img):not(i):not(svg):not(.el-dropdown){display:flex!important;flex-wrap:nowrap!important;align-items:center!important;gap:6px!important}
X [data-fxo-chead] :is(.el-button,button){white-space:nowrap!important}
`).replace(/(^|\n|,)XR(?= )/g,'$1'+XRP).replace(/(^|\n|,)X(?= )/g,'$1'+XP);

var FX_ATTRS=['data-fxo-empty-size','data-fxo-fitbtn','data-fxo-chipbox','data-fxo-full','data-fxo-tight','data-fxo-aibtn','data-fxo-acts','data-fxo-actrow','data-fxo-actitem','data-fxo-iconbtn','data-fxo-sqb','data-fxo-sqi','data-fxo-sqm','data-fxo-ltr','data-fxo-frow','data-fxo-fname','data-fxo-crow','data-fxo-cmain','data-fxo-cside','data-fxo-chead','data-fxo-cname'];
var NEWSET=function(){return typeof WeakSet!=='undefined'?new WeakSet():{has:function(){return false},add:function(){}}};
var SQ_SEEN=NEWSET();
/* one throttle for the jobs below: at most one run per `ms`, plus a trailing run */
var throttle=function(st,ms,fn){if(Date.now()-st.t<ms){clearTimeout(st.q);st.q=setTimeout(function(){if(S.on)fn()},ms+20);return true}st.t=Date.now();return false};

/* 5-. AI generate buttons: same navy look as "Build with AI" wherever they appear (route-independent) */
var AI_RX=/(generate\b.*\bai\b|\bby ai\b|build with ai|with ai\b|بالذكاء الاصطناعي|عن طريق الذكاء|באמצעות AI|עם AI)/i;
var aiState={t:0,q:0};
var aiBtnJob=function(){
  if(throttle(aiState,400,aiBtnJob))return;
  [].forEach.call(D.querySelectorAll('#spark-app .el-button:not([data-fxo-aibtn]):not(.fx-ai),#spark-app button:not([data-fxo-aibtn]):not(.fx-ai)'),function(b){
    var t=(b.textContent||'').replace(/\s+/g,' ').trim();
    if(t&&t.length<60&&AI_RX.test(t)&&!b.closest('.el-dialog,[data-fxo-acts],.node-viewer'))b.setAttribute('data-fxo-aibtn','');
  });
};

/* 5a. Action cells: a table cell whose only content is buttons / icons → one centred row */
var ACT_SEL='button,.el-button,[role=button],.el-dropdown,a.btn';
var ICO_SEL='i[class*="el-icon"],i[class*="fa-"],i.fa,i.svg-icon,span.svg-icon,svg';
var ACT_NOT='input,textarea,select,.el-switch,.el-checkbox,.el-select,img,.el-avatar,.el-progress,.el-input';
var actState={t:0,q:0};
var actClear=function(td){
  ['data-fxo-acts','data-fxo-actrow'].forEach(function(k){td.removeAttribute(k)});
  [].forEach.call(td.querySelectorAll('[data-fxo-actrow],[data-fxo-actitem],[data-fxo-iconbtn]'),function(e){['data-fxo-actrow','data-fxo-actitem','data-fxo-iconbtn'].forEach(function(k){e.removeAttribute(k)})});
};
var actJob=function(){
  if(throttle(actState,300,actJob))return;
  if(S.page==='launcher'||S.page==='canvas')return;
  var tds=D.querySelectorAll('#spark-app td');
  for(var i=0;i<tds.length;i++){var td=tds[i];
    var sig=td.childElementCount+'|'+(td.textContent||'').length+'|'+td.getElementsByTagName('*').length;
    if(td.__fxoAct===sig)continue;
    if(td.closest('.el-date-table,.el-year-table,.el-month-table,.el-calendar,.el-picker-panel,.el-time-panel'))continue;
    if(!shown(td))continue;                 /* not laid out yet: look again later */
    td.__fxoAct=sig;
    actClear(td);
    if(td.querySelector(ACT_NOT))continue;
    var items=[].filter.call(td.querySelectorAll(ACT_SEL+','+ICO_SEL),function(e){
      for(var p=e.parentElement;p&&p!==td;p=p.parentElement){if(p.matches(ACT_SEL)||p.matches(ICO_SEL))return false}
      return shown(e);
    });
    if(items.length<2)continue;
    /* any visible text outside the buttons means this is a data cell, not an action cell */
    var w=D.createTreeWalker(td,NodeFilter.SHOW_TEXT),n,bad=false;
    while((n=w.nextNode())){if(!(n.nodeValue||'').trim())continue;var pe=n.parentElement;if(!items.some(function(it){return it.contains(pe)})){bad=true;break}}
    if(bad)continue;
    var lca=items[0].parentElement;
    while(lca&&lca!==td&&!items.every(function(it){return lca.contains(it)}))lca=lca.parentElement;
    if(!lca)continue;
    td.setAttribute('data-fxo-acts','1');
    lca.setAttribute('data-fxo-actrow',lca===td?'td':'1');
    [].forEach.call(lca.children,function(c){if(items.some(function(it){return c.contains(it)}))c.setAttribute('data-fxo-actitem','1')});
    items.forEach(function(it){if(it.matches('button,.el-button')&&!(it.textContent||'').trim())it.setAttribute('data-fxo-iconbtn','1')});
  }
};

/* 5b. Search pairs: an icon-only search button next to a text field, whatever the markup, becomes one control.
   The visual gap is measured once and closed with a negative margin, so flex gaps, el-col gutters and
   inline whitespace are all handled the same way, in both directions. */
var sqState={t:0,q:0};
var sqHas=function(x){
  if(!x||!shown(x))return null;
  if(x.matches('input'))return x;
  var inp=x.querySelector('input:not([type=checkbox]):not([type=radio]):not([type=hidden])');
  return inp&&shown(inp)&&!x.querySelector('button,.el-button')?inp:null;
};
var sqJob=function(){
  if(throttle(sqState,400,sqJob))return;
  if(S.page==='canvas')return;
  var bs=D.querySelectorAll('#spark-app button:not([data-fxo-sqb]),#spark-app .el-button:not([data-fxo-sqb])');
  for(var i=0;i<bs.length;i++){var b=bs[i];
    if(SQ_SEEN.has(b))continue;
    if((b.textContent||'').trim()||!/search|magnif/i.test(b.innerHTML||''))continue;
    if(b.closest('.el-input-group__append,.el-input-group__prepend,.el-dialog__headerbtn,.el-input,[data-fxo-chead]'))continue;
    var rb=rc(b);if(rb.width<4||rb.height<4)continue;
    SQ_SEEN.add(b);
    var n=b,pair=null,first=false;
    for(var k=0;k<3&&n&&n.parentElement;k++){
      var ip=sqHas(n.previousElementSibling);if(ip){pair={hold:n.previousElementSibling,inp:ip};first=false;break}
      ip=sqHas(n.nextElementSibling);if(ip){pair={hold:n.nextElementSibling,inp:ip};first=true;break}
      n=n.parentElement;
      if(n.querySelectorAll('button,.el-button').length>1)break;   /* never climb into a toolbar of several buttons */
    }
    if(!pair)continue;
    var ri=rc(pair.inp);if(ri.width<4)continue;
    var vo=Math.min(ri.bottom,rb.bottom)-Math.max(ri.top,rb.top);if(vo<Math.min(ri.height,rb.height)*.5)continue;
    var gap=Math.max(ri.left,rb.left)-Math.min(ri.right,rb.right);if(gap<-2||gap>32)continue;
    var later=first?pair.hold:n,cs=getComputedStyle(later);
    var ms=parseFloat(H.classList.contains('fxo-rtl')?cs.marginRight:cs.marginLeft)||0;
    later.style.setProperty('--fxo-sqm',(ms-gap-1)+'px');later.setAttribute('data-fxo-sqm','');
    b.style.setProperty('--fxo-sqh',Math.round(ri.height)+'px');b.setAttribute('data-fxo-sqb',first?'s':'e');
    pair.inp.setAttribute('data-fxo-sqi',first?'e':'s');
  }
};

/* 5c. Conversation pane: the contact panel next to the composer column gets its own column (or, when the product
   draws it as an overlay, the space it covers is reserved); the header stays on one line. */
var convState={t:0,q:0};
var convClear=function(){
  [].forEach.call(D.querySelectorAll('[data-fxo-crow],[data-fxo-cmain],[data-fxo-cside]'),function(e){
    ['data-fxo-crow','data-fxo-cmain','data-fxo-cside'].forEach(function(k){e.removeAttribute(k)});e.style.removeProperty('--fxo-csw');e.style.removeProperty('--fxo-cmin');
  });
};
var convJob=function(){
  if(throttle(convState,300,convJob))return;
  var side=D.querySelector('[data-fxo-cside]');
  if(side&&(!shown(side)||!D.querySelector('[data-fxo-crow]')))convClear();
  var col=D.querySelector('#spark-app .col-messages');
  if(!col)return;
  var ta=col.querySelector('textarea');
  if(ta&&shown(ta)&&!D.querySelector('[data-fxo-cside]')){
    var stop=col.closest('main.el-main,#team-main')||D.body;   /* the panel can sit beside the whole chat area, not only beside the chat column */
    for(var a=ta;a&&a.parentElement&&a!==stop;a=a.parentElement){
      var p=a.parentElement,ra=rc(a);
      var b=[].filter.call(p.children,function(c){
        if(c===a||!shown(c)||c.contains(ta))return false;
        if(c.matches('aside,nav,#team-aside,#flowbuilder-aside,.rooms-container,.df-sidebar')||c.querySelector('.rooms-container,.room-item,.df-sidebar'))return false;
        var r=rc(c);if(r.width<220||r.height<ra.height*.5)return false;
        if(r.top>=ra.bottom||r.bottom<=ra.top)return false;            /* above / below: header or message list */
        return Math.abs((r.left+r.right)/2-(ra.left+ra.right)/2)>100;    /* beside the composer column */
      })[0];
      if(b){
        var rb=rc(b),pos=getComputedStyle(b).position,rtl=H.classList.contains('fxo-rtl');
        var endSide=rtl?((rb.left+rb.right)<(ra.left+ra.right)):((rb.left+rb.right)>(ra.left+ra.right));
        if(pos==='absolute'||pos==='fixed'){
          var host=b.offsetParent||p;
          host.style.setProperty('--fxo-csw',Math.round(rb.width)+'px');host.setAttribute('data-fxo-crow',endSide?'ov-e':'ov-s');b.setAttribute('data-fxo-cside','ov');
        }else{
          p.setAttribute('data-fxo-crow','1');b.setAttribute('data-fxo-cside','1');
          /* the chat column inside the main column must keep >= 320px: reserve what sits beside it there
             (conversation list etc., counted at its own minimum width when it can shrink) */
          if(a!==col&&a.contains(col)){
            var rooms=a.querySelector('.rooms-container'),others=rc(a).width-rc(col).width;
            if(rooms&&a.contains(rooms))others-=Math.max(0,rc(rooms).width-430);
            a.style.setProperty('--fxo-cmin',Math.round(Math.max(300,others+300))+'px');
          }
        }
        a.setAttribute('data-fxo-cmain','1');
        break;
      }
      if(p===stop)break;
    }
  }
  /* chat column too narrow (side panel open, small screen): hide the filter rail until there is room again */
  var rooms=D.querySelector('#spark-app .rooms-container');
  if(rooms){
    var cw=rc(col).width,tight=rooms.hasAttribute('data-fxo-tight');
    if(!tight&&cw>0&&cw<290)rooms.setAttribute('data-fxo-tight','1');
    else if(tight&&cw>=480)rooms.removeAttribute('data-fxo-tight');
  }
  /* header: the row at the top of the chat column that holds its buttons */
  if(!D.querySelector('[data-fxo-chead]')){
    var cr=rc(col);
    var g=[].filter.call(col.querySelectorAll('.el-button-group,.el-dropdown,.el-button,button'),function(e){return !e.closest('[data-fxo-cside]')&&shown(e)&&rc(e).top-cr.top<80})[0];
    if(g){
      var cm=D.querySelector('[data-fxo-cmain]'),base=cm&&cm.contains(g)?cm:col,br=rc(base);
      var h=g.parentElement;while(h&&h!==base&&rc(h).width<br.width*.85)h=h.parentElement;
      if(h&&h!==base&&rc(h).height<160&&!h.querySelector('textarea')){
        h.setAttribute('data-fxo-chead','1');
        var nm=[].filter.call(h.children,function(c){return !c.matches('button,.el-button,.el-dropdown,i,svg,img,.el-avatar')&&!c.querySelector('button,.el-button,.el-dropdown,input,textarea')&&(c.textContent||'').trim()})[0];
        if(nm)nm.setAttribute('data-fxo-cname','1');
      }
    }
  }
};

/* 5d. RTL tables: dates, times, phone numbers and IDs keep their left-to-right order without moving the cell's alignment */
var bidiState={t:0,q:0};
var BIDI_RX=/^[\d\s:\/.,\-+()]*(?:AM|PM|am|pm)?[\d\s:\/.,\-+()]*(?:AM|PM|am|pm)?$/;
var bidiJob=function(){
  if(!H.classList.contains('fxo-rtl')){
    if(D.querySelector('[data-fxo-ltr]'))[].forEach.call(D.querySelectorAll('[data-fxo-ltr]'),function(e){e.removeAttribute('data-fxo-ltr')});
    return;
  }
  if(throttle(bidiState,600,bidiJob))return;
  [].forEach.call(D.querySelectorAll('#spark-app td'),function(td){
    [td].concat([].slice.call(td.querySelectorAll('*'))).forEach(function(e){
      if(e.childElementCount)return;
      var t=(e.textContent||'').trim(),ok=t.length>=6&&(t.match(/\d/g)||[]).length>=4&&BIDI_RX.test(t);
      var has=e.hasAttribute('data-fxo-ltr');
      if(ok&&!has){
        var cs=getComputedStyle(e),v;
        if(/^inline/.test(cs.display))v='i';
        else v=cs.textAlign==='center'?'c':(cs.textAlign==='left'||cs.textAlign==='end')?'l':'r';
        e.setAttribute('data-fxo-ltr',v);
      }else if(!ok&&has)e.removeAttribute('data-fxo-ltr');
    });
  });
};

/* 5e. Guard: any text button whose words do not fit (clipped, wrapped, or touching the edges) is resized to its text */
var fitState={t:0,q:0};
var fitJob=function(){
  if(throttle(fitState,500,fitJob))return;
  if(S.page==='canvas')return;
  var bs=D.querySelectorAll('#spark-app .el-button:not([data-fxo-fitbtn]):not([data-fxo-iconbtn]):not([data-fxo-aibtn]):not([data-fxo-sqb]):not(.fx-ai):not(.addbtn):not(.el-button--text)');
  for(var i=0;i<bs.length;i++){var b=bs[i];
    var t=(b.textContent||'').trim();if(!t)continue;
    if(b.closest('.el-input,.el-pagination,.el-dialog__headerbtn,.el-dropdown-menu,[data-fxo-chead]'))continue;
    var rb=rc(b);if(rb.width<4||rb.height<4)continue;
    var key=t+'|'+Math.round(rb.width)+'|'+Math.round(rb.height);if(b.__fxoFit===key)continue;b.__fxoFit=key;
    var tight=b.scrollWidth>b.clientWidth+1||b.scrollHeight>b.clientHeight+2;
    var s=[].filter.call(b.children,function(c){return (c.textContent||'').trim()})[0];
    if(s&&!tight){
      var rs=rc(s),fs=parseFloat(getComputedStyle(b).fontSize)||14;
      if(rs.height>fs*1.9||rs.width>rb.width-10||rs.height>rb.height-2)tight=true;
    }
    if(tight)b.setAttribute('data-fxo-fitbtn','');
  }
};

/* 5f. Title + status chip inside a card: centred under each other, away from the card's action button */
var CHIP_SEL='.el-tag,.badge,[class*="tag"],[class*="badge"],[class*="chip"],[class*="status"],[class*="pill"]';
var chipState={t:0,q:0};
var chipJob=function(){
  if(throttle(chipState,500,chipJob))return;
  if(S.page==='canvas')return;
  [].forEach.call(D.querySelectorAll('#spark-app :is('+CHIP_SEL+')'),function(el){
    if(el.closest('[data-fxo-chipbox],.el-table,.el-select,.el-dialog,.room-item,[data-fxo-rail],[data-fxo-ubox],[data-fxo-chead],.el-menu,.el-tabs,button,.el-button'))return;
    var tb=el.closest('table');if(tb&&tb.querySelector('thead')&&shown(tb.querySelector('thead')))return;
    var t=(el.textContent||'').trim();if(!t||t.length>24||!shown(el)||el.querySelector('button,.el-button,input'))return;
    if(/^[\d\s,.+%]+$/.test(t))return;   /* a count badge ("0", "12") belongs to a header row, not a status chip */
    var p=el;for(var k=0;k<3&&p.parentElement&&p.parentElement.children.length===1;k++)p=p.parentElement;
    var box=p.parentElement;if(!box||box===D.body)return;
    var kids=[].filter.call(box.children,function(c){return shown(c)&&(c.textContent||'').trim()});
    if(kids.length!==2||kids[1]!==p)return;
    if([].filter.call(box.children,shown).length!==2)return;   /* anything else in the row (a chevron, an icon) means it is not a plain title + chip block */
    var title=(kids[0].textContent||'').trim();
    if(!title||title.length>60||box.querySelector('button,.el-button,input,textarea'))return;
    var card=box.parentElement,near=false;
    for(var j=0;j<3&&card;j++,card=card.parentElement){if(card.querySelector('button,.el-button')){near=true;break}}
    if(near)box.setAttribute('data-fxo-chipbox','');
  });
};

/* 5g. Reports fill the page: any wrapper whose max-width keeps the report narrower than the page is released,
   and charts re-measure whenever the content area changes size (window, zoom, side menu) */
var fillState={t:0,q:0};
var fillJob=function(){
  if(throttle(fillState,600,fillJob))return;
  var m=D.querySelector('#spark-app main.el-main');if(!m)return;
  if(!S.ro&&W.ResizeObserver){
    var tmo=0,lastW=0;
    S.ro=new ResizeObserver(function(en){var w=Math.round(en[0].contentRect.width);if(w===lastW)return;lastW=w;clearTimeout(tmo);tmo=setTimeout(function(){if(D.querySelector('.apexcharts-canvas'))W.dispatchEvent(new Event('resize'))},150)});
  }
  if(S.ro&&S.roEl!==m){try{S.ro.disconnect()}catch(e){}S.ro.observe(m);S.roEl=m}
  if(S.page!=='insights')return;
  var mw=rc(m).width,row=m.querySelector('.el-row');if(!row)return;
  for(var e=row.parentElement;e&&e!==m;e=e.parentElement){
    if(e.hasAttribute('data-fxo-full'))continue;
    if(getComputedStyle(e).maxWidth!=='none'&&rc(e).width<mw-80)e.setAttribute('data-fxo-full','');
  }
};

var fixUndo=function(){
  var q='['+FX_ATTRS.join('],[')+']';
  [].forEach.call(D.querySelectorAll(q),function(e){
    FX_ATTRS.forEach(function(k){e.removeAttribute(k)});
    ['--fxo-sqm','--fxo-sqh','--fxo-csw','--fxo-cmin'].forEach(function(v){e.style.removeProperty(v)});
  });
  [].forEach.call(D.querySelectorAll('td'),function(td){td.__fxoAct=null});
  [].forEach.call(D.querySelectorAll('.el-button'),function(b){b.__fxoFit=null});
  if(S.ro){try{S.ro.disconnect()}catch(e){}S.ro=null;S.roEl=null}
  SQ_SEEN=NEWSET();PRO_SEEN=NEWSET();
};

/* Dialog title "Ticket API" -> "Mini-CRM". The dialog is re-created on every open; the engine's one observer re-runs this,
   so no second observer is needed. Only the text node is edited (Vue keeps its reference); off() restores it. */
var RENAME_FROM='Ticket API',RENAME_TO='Mini-CRM';
var renameJob=function(){
  [].forEach.call(D.querySelectorAll('.el-dialog__header div'),function(el){
    if(el.childElementCount||(el.textContent||'').trim()!==RENAME_FROM)return;
    var n=el.firstChild;
    if(!n||n.nodeType!==3)return;
    el.setAttribute('data-fxo-renamed',n.nodeValue);
    n.nodeValue=RENAME_TO;
  });
};

/* Second-level menu panel is navy. Groups inside it can carry the product's own (different) dark shade, which made the panel look patchy.
   Every dark background on the way from an item up to the panel is cleared so all groups sit on the same navy; off() restores it. */
var lumOf=function(c){
  var m=/^rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)(?:[ ,/]+([\d.]+%?))?\s*\)$/.exec(c||'');
  if(!m)return null;
  var a=m[4]==null?1:(/%$/.test(m[4])?parseFloat(m[4])/100:parseFloat(m[4]));
  if(a<0.1)return null;
  var f=function(v){v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};
  return 0.2126*f(+m[1])+0.7152*f(+m[2])+0.0722*f(+m[3]);
};
var panelBgJob=function(){
  [].forEach.call(D.querySelectorAll('aside.el-aside.bg-transparent.border-light'),function(aside){
    var seen=new Set();
    [].forEach.call(aside.querySelectorAll('.el-menu-item,.el-submenu__title'),function(it){
      for(var e=it;e&&e!==aside;e=e.parentElement){
        if(seen.has(e))break;
        seen.add(e);
        if(e.hasAttribute('data-fxo-lightbg'))continue;
        var l=lumOf(getComputedStyle(e).backgroundColor);
        if(l!==null&&l<0.2){
          e.setAttribute('data-fxo-lightbg',e.style.getPropertyValue('background-color')+'|'+e.style.getPropertyPriority('background-color'));
          e.style.setProperty('background-color','transparent','important');
        }
      }
    });
  });
};

var apply=function(){
  S.t=0;S.last=Date.now();
  if(!S.on)return;
  if(urlOff()){off();return}
  if(authPage()){
    if(H.classList.contains('fxo')){H.classList.remove('fxo','fxo-icons','fxo-ai-agent','fxo-rtl');H.removeAttribute('data-fxo-page');H.removeAttribute('data-fxo-route');H.removeAttribute('data-fxo-locale');S.page=''}
    return;
  }
  if(!H.classList.contains('fxo'))H.classList.add('fxo');
  var rtl=rtlOf(),loc=localeOf();
  if(H.classList.contains('fxo-rtl')!==rtl)H.classList.toggle('fxo-rtl',rtl);
  if(H.getAttribute('data-fxo-locale')!==loc)H.setAttribute('data-fxo-locale',loc);
  if(LEG.present&&(H.classList.contains('fx-app')||H.classList.contains('fx-insights')||H.classList.contains('fx-inbox')))legacyQuiet();
  if(location.hash!==S.hash){S.hash=location.hash;S.bot=false}
  var p=pageOf();
  if(p!==S.page){S.page=p;H.setAttribute('data-fxo-page',p)}
  var rt=(location.hash||'').replace(/^#\/?/,'').split('?')[0];
  if(H.getAttribute('data-fxo-route')!==rt)H.setAttribute('data-fxo-route',rt);
  var icons=p!=='canvas'&&p!=='subflows';
  if(H.classList.contains('fxo-icons')!==icons)H.classList.toggle('fxo-icons',icons);
  var agent=/^#\/ai_hub\/ai_agent(?:[/?#]|$)/.test(location.hash);
  if(H.classList.contains('fxo-ai-agent')!==agent)H.classList.toggle('fxo-ai-agent',agent);
  if(!D.body)return;
  try{titleJob()}catch(e){log('title',e)}
  try{channelJob()}catch(e){log('channel',e)}
  try{botListJob()}catch(e){log('bots',e)}
  try{proJob()}catch(e){log('pro',e)}
  try{wsJob()}catch(e){log('ws',e)}
  try{hideItemsJob()}catch(e){log('hideitems',e)}
  try{renameJob()}catch(e){log('rename',e)}
  try{panelBgJob()}catch(e){log('panelbg',e)}
  try{contactsToolsJob()}catch(e){log('contacts',e)}
  try{launchJob()}catch(e){log('launch',e)}
  try{wsTabsJob()}catch(e){log('wstabs',e)}
  try{noteJob()}catch(e){log('note',e)}
  try{aiBtnJob()}catch(e){log('ai',e)}
  try{fitJob()}catch(e){log('fit',e)}
  try{chipJob()}catch(e){log('chip',e)}
  try{fillJob()}catch(e){log('fill',e)}
  try{actJob()}catch(e){log('acts',e)}
  try{sqJob()}catch(e){log('search',e)}
  try{convJob()}catch(e){log('conv',e)}
  try{bidiJob()}catch(e){log('bidi',e)}
  try{if(!W.__fxFlowsPage)SUBFLOWS.run()}catch(e){log('subflows',e)}
  try{if(p==='insights')INSIGHTS.run()}catch(e){log('insights',e)}
  try{if(p==='inbox'&&D.querySelector('#team-main .rooms-container')&&Date.now()-S.ib>500){S.ib=Date.now();INBOX.run()}else if(D.querySelector('.fx-ib-root,.fx-ib-pane')&&!D.querySelector('#team-main .rooms-container'))INBOX.undo()}catch(e){log('inbox',e)}   /* the workspace-inbox pane finder misreads the bot inbox layout; there the Signal rules style the product classes directly */
  try{if(p==='canvas'&&!W.__fxSoft6)CANVAS.start();else CANVAS.stop()}catch(e){log('canvas',e)}
};
/* one observer, one queue: at most one pass per frame and about ten per second, plus a trailing pass */
var schedule=function(){
  if(S.t||S.q)return;
  var wait=Math.max(0,100-(Date.now()-S.last));
  S.t=setTimeout(function(){S.t=0;S.q=requestAnimationFrame(function(){S.q=0;apply()})},wait);
};
var onHash=function(){clearTimeout(S.t);S.t=0;cancelAnimationFrame(S.q);S.q=0;apply()};

var buildCSS=function(){
  return 'html.fxo body [data-fxo-pro][data-fxo-pro],html.fxo body #spark-app#spark-app [data-fxo-pro][data-fxo-pro]{display:none!important}\nhtml.fxo [data-fxo-pro-pseudo*=before]::before,html.fxo [data-fxo-pro-pseudo*=after]::after{display:none!important;content:none!important}\nhtml.fxo [data-fxo-note=field]::placeholder{color:#C2570C!important;opacity:.85!important}\n'+TOKENS+'\n'+scopeS(DESIGN)+'\n'+TEMPLATES()+'\n'+REPORTS_CSS+'\n'+CHANNEL_DETAIL_CSS+'\n'+CHOOSE_SUBFLOW_CSS+'\n'+ICONS+'\n'+CANVAS.css+'\n'+SUBFLOWS.css+'\n'+INBOX.css+'\n'+POP+'\n'+MISC+'\n'+PRODUCT_CSS+'\n'+WS_CSS+'\n'+SIGNAL_CSS+'\n'+I18N_CSS+'\n'+FIX_CSS+'\n'+'@media (max-width:1280px){html.fxo body #spark-app#spark-app#spark-app#spark-app .rooms-container .df-sidebar{width:184px!important;min-width:184px!important;flex:0 0 184px!important}html.fxo body #spark-app#spark-app#spark-app#spark-app .rooms-container>.w-100{width:290px!important;flex:0 0 290px!important}}';
};

var on=function(){
  if(S.on)return 'already on';
  if(urlOff())return 'off (url)';
  legacyOff();
  if(!S.style){S.style=D.createElement('style');S.style.id='fx-omniai-unified';S.style.textContent=buildCSS()}
  (D.head||H).appendChild(S.style);
  S.on=true;S.page='';S.hash=null;
  S.mo=new MutationObserver(schedule);
  S.mo.observe(D.body,{childList:true,subtree:true,attributes:true,attributeFilter:['placeholder','data-placeholder']});
  S.mo.observe(H,{attributes:true,attributeFilter:['lang','dir']});   /* placeholder: Reply/Note switch in the Inbox composer */   /* body, not #spark-app: survives Vue replacing the mount element */
  W.addEventListener('hashchange',onHash);W.addEventListener('resize',schedule);
  apply();
  return 'on';
};
var off=function(){
  if(!S.on)return 'already off';
  S.on=false;
  try{S.mo&&S.mo.disconnect()}catch(e){}
  W.removeEventListener('hashchange',onHash);W.removeEventListener('resize',schedule);
  clearTimeout(S.t);cancelAnimationFrame(S.q);S.t=S.q=0;
  try{CANVAS.stop()}catch(e){}
  try{INSIGHTS.undo()}catch(e){}
  try{INBOX.undo()}catch(e){}
  [].forEach.call(D.querySelectorAll('[data-fxo-hid]'),function(h){h.style.removeProperty('display');h.removeAttribute('data-fxo-hid')});
  [].forEach.call(D.querySelectorAll('[data-fxo-shown]'),function(h){h.removeAttribute('data-fxo-shown')});
  [].forEach.call(D.querySelectorAll('[data-fxo-pro]'),function(h){var o=(h.getAttribute('data-fxo-pro')||'|').split('|');if(o[0])h.style.setProperty('display',o[0],o[1]);else h.style.removeProperty('display');h.removeAttribute('data-fxo-pro')});
  [].forEach.call(D.querySelectorAll('[data-fxo-pro-pseudo]'),function(h){h.removeAttribute('data-fxo-pro-pseudo')});
  try{noteUndo()}catch(e){}
  try{wsUndo()}catch(e){}
  [].forEach.call(D.querySelectorAll('[data-fxo-hideitem]'),function(h){var o=(h.getAttribute('data-fxo-hideitem')||'|').split('|');if(o[0])h.style.setProperty('display',o[0],o[1]);else h.style.removeProperty('display');h.removeAttribute('data-fxo-hideitem')});
  [].forEach.call(D.querySelectorAll('[data-fxo-lightbg]'),function(e){var o=(e.getAttribute('data-fxo-lightbg')||'|').split('|');if(o[0])e.style.setProperty('background-color',o[0],o[1]);else e.style.removeProperty('background-color');e.removeAttribute('data-fxo-lightbg')});
  [].forEach.call(D.querySelectorAll('[data-fxo-renamed]'),function(el){var n=el.firstChild;if(n&&n.nodeType===3&&n.nodeValue===RENAME_TO)n.nodeValue=el.getAttribute('data-fxo-renamed');el.removeAttribute('data-fxo-renamed')});
  [].forEach.call(D.querySelectorAll('[data-fxo-ch],[data-fxo-sum],[data-fxo-ico],[data-fxo-icobox],[data-fxo-head]'),function(e){['data-fxo-ch','data-fxo-sum','data-fxo-ico','data-fxo-icobox','data-fxo-head'].forEach(function(k){e.removeAttribute(k)})});
  [].forEach.call(D.querySelectorAll('[data-fxo-wstabs]'),function(u){var o=u.getAttribute('data-fxo-wstabs');if(o)u.style.setProperty('display',o);else u.style.removeProperty('display');u.removeAttribute('data-fxo-wstabs')});
  [].forEach.call(D.querySelectorAll('[data-fxo-bottoggle]'),function(b){b.style.removeProperty('display');b.removeAttribute('data-fxo-bottoggle')});S.bot=false;
  try{fixUndo()}catch(e){}
  if(S.style&&S.style.parentNode)S.style.parentNode.removeChild(S.style);
  H.classList.remove('fxo','fxo-icons','fxo-ai-agent','fxo-rtl');H.removeAttribute('data-fxo-page');H.removeAttribute('data-fxo-route');H.removeAttribute('data-fxo-locale');
  [].forEach.call(D.querySelectorAll('[data-fxo-title]'),function(e){e.removeAttribute('data-fxo-title')});
  [].forEach.call(D.querySelectorAll('.fxo-detail,.fxo-wa'),function(e){e.classList.remove('fxo-detail','fxo-wa')});
  legacyOn();
  return 'off';
};

/* self-test for the current page */
var check=function(){
  var r={version:VERSION,page:S.page,on:S.on,embedded:H.classList.contains('in-iframe'),locale:localeOf(),direction:rtlOf()?'rtl':'ltr',scope:!!D.getElementById('spark-app'),styleRules:S.style&&S.style.sheet?S.style.sheet.cssRules.length:0,problems:[]};
  if(H.classList.contains('fxo-rtl')!==rtlOf())r.problems.push('direction state mismatch');
  var vis=function(e){var b=e.getBoundingClientRect();return b.width>0&&b.height>0};
  var main=D.querySelector('#team-main')||D.querySelector('main#flowbuilder-main')||D.body;
  var hiddenIcons=[].filter.call(main.querySelectorAll('i.svg-icon,img'),function(e){return getComputedStyle(e).display==='none'&&!e.closest('[style*="display: none"],.el-dialog__wrapper,.el-popper,.card-congratulations,[data-fxo-fitem],[data-fxo-pro],[data-fxo-hideitem]')});   /* agent-spotlight decorations are hidden by the tenant theme, not by this file */
  if(hiddenIcons.length)r.problems.push('hidden icons: '+hiddenIcons.length);
  var vw=innerWidth;var off=[].filter.call(main.querySelectorAll('button,.el-card,.connect-card,td'),function(e){var b=e.getBoundingClientRect();return b.width&&b.width<vw&&b.right>vw+1&&!e.closest('.el-scrollbar__wrap,.el-table__body-wrapper,[class*=kanban]')});
  if(off.length)r.problems.push('outside the right edge: '+off.length);
  var btns=[].filter.call(main.querySelectorAll('.el-button'),vis);
  var over=0;btns.forEach(function(b){var p=b.parentElement&&b.closest('td,.connect-card,.el-card__body');if(!p)return;var a=b.getBoundingClientRect(),c=p.getBoundingClientRect();if(a.right>c.right+1||a.left<c.left-1)over++});
  if(over)r.problems.push('buttons outside their container: '+over);
  var badges=[].filter.call(main.querySelectorAll('.badge.badge-primary'),function(e){return vis(e)&&getComputedStyle(e).color==='rgba(0, 0, 0, 0)'});
  if(badges.length)r.problems.push('transparent badges: '+badges.length);
  var clipped=btns.filter(function(b){return (b.textContent||'').trim()&&(b.scrollWidth>b.clientWidth+1||b.scrollHeight>b.clientHeight+2)});
  if(clipped.length)r.problems.push('clipped button text: '+clipped.length);
  if(H.classList.contains('in-iframe')&&S.page==='settings')[].forEach.call(D.querySelectorAll('ul.el-menu--horizontal.el-menu'),function(u){
    var items=u.querySelectorAll(':scope>li.el-menu-item');
    if(items.length>=7&&items.length<=10&&getComputedStyle(u).display!=='none')r.problems.push('duplicate workspace tabs visible');
  });
  r.ok=!r.problems.length;
  return r;
};

W.fxOmni={version:VERSION,on:on,off:off,check:check,
  info:function(){return {version:VERSION,on:S.on,auth:authPage(),page:S.page,hash:location.hash,embedded:H.classList.contains('in-iframe'),locale:localeOf(),direction:rtlOf()?'rtl':'ltr',legacyNeutralised:LEG.present,canvasLoop:CANVAS.running(),inbox:INBOX.info(),noteFields:noteState.fields,notePainted:noteState.painted}},
  preview:function(){return on()}};

if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',on,{once:true});else on();
})();
