// Flexito flow builder v8.7: v8.6 + every button (primary buttons, pagination active state, Sub Flows Create-Folder / Generate-by-AI buttons) recoloured purple #A684FF instead of mint; success buttons and switches/toggles stay mint as a status accent
// Full replacement file. Do not load alongside an earlier fx-flow.js. The Sub Flows module (bottom of file) is inert on every other page.
// Menu previews verified by user; combined bundle requires platform smoke test.
/* ---- staging gate: the NEW look (Sub Flows page, core layer, Insights, Inbox) only applies to the bot ids listed here.
       Add more ids to widen it; set the list to [] to apply everywhere. window.__fxAllow can override it from the console. ---- */
try{!function(){
  var ALLOW=window.__fxAllow||[];   /* [] = the new look applies to every bot/workspace on the platform */
  window.__fxGate=function(){return !ALLOW.length||ALLOW.some(function(id){return location.href.indexOf(id)>-1})};
  /* visible proof that THIS file is the one running: <html data-fx="8.7"> + a console line */
  try{document.documentElement.setAttribute('data-fx','8.7');console.info('[fx] fx-flow v8.7 loaded | new look allowed for this bot:',window.__fxGate(),'|',location.href.split('#')[0].slice(-40))}catch(e){}
}()}catch(e){console.error('[fx] module error',e&&e.stack||e)}
try{!function(){
  if(window.__fxSoft6){console.warn('fx: an fx-flow script is already running on this page (older version still in the HTML Script field?). Remove that line, save, reload, then run this one.');return}window.__fxSoft6=1;
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
.view-panel-right > .el-popover:has(.next-step-row) > .mb-1::after{content:"";position:absolute;bottom:-1px;left:0;width:32px;height:3px;border-radius:3px;background:#24E4BB;}
.view-panel-right > .el-popover:has(.next-step-row) > .mb-1 .el-button{padding:7px 10px!important;border:0!important;border-radius:8px!important;background:#F3F5F8!important;color:#667085!important;font-size:11px!important;}
.view-panel-right > .el-popover:has(.next-step-row) .el-scrollbar__wrap{max-height:min(65vh,420px)!important;margin:0!important;overflow:auto!important;scrollbar-width:thin;scrollbar-color:#D7DEEA transparent;}
.view-panel-right > .el-popover:has(.next-step-row) .el-scrollbar__bar{display:none!important;}
.view-panel-right > .el-popover:has(.next-step-row) .el-scrollbar__view{display:block!important;padding:2px!important;}
.view-panel-right > .el-popover:has(.next-step-row) .el-scrollbar__view > .my-1{margin:3px 0!important;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-row{--step-color:#057A5E;--step-bg:#E6F8F2;position:relative!important;display:flex!important;flex-direction:row!important;align-items:center!important;gap:12px!important;width:100%!important;height:52px!important;box-sizing:border-box!important;margin:0!important;padding:8px 12px!important;border:0!important;border-radius:12px!important;background:transparent!important;box-shadow:none!important;cursor:pointer;transition:background .15s;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-row:hover{background:#E7FBF6!important;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-row::after{content:"›";margin-left:auto;color:#057A5E;font:22px/1 sans-serif;opacity:0;transition:opacity .15s;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-row:hover::after{opacity:1;}
.view-panel-right > .el-popover:has(.next-step-row) .message{--step-color:#526477;--step-bg:#EDF1F6;}
.view-panel-right > .el-popover:has(.next-step-row) .question{--step-color:#2784D9;--step-bg:#EAF4FF;}
.view-panel-right > .el-popover:has(.next-step-row) .action{--step-color:#B87B09;--step-bg:#FFF5DD;}
.view-panel-right > .el-popover:has(.next-step-row) .condition{--step-color:#07876D;--step-bg:#E4F8F0;}
.view-panel-right > .el-popover:has(.next-step-row) .randomizer{--step-color:#8651B5;--step-bg:#F3ECFA;}
.view-panel-right > .el-popover:has(.next-step-row) .email{--step-color:#4971BB;--step-bg:#EDF2FC;}
.view-panel-right > .el-popover:has(.next-step-row) .goto{--step-color:#BF489E;--step-bg:#FCECF7;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-icon{display:flex!important;align-items:center!important;justify-content:center!important;width:34px!important;height:34px!important;min-width:34px!important;flex:0 0 34px!important;padding:0!important;margin:0!important;border:0!important;border-radius:10px!important;background:var(--step-bg)!important;color:var(--step-color)!important;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-icon i{color:var(--step-color)!important;font-size:19px!important;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-node{position:relative!important;flex:1!important;min-width:0!important;width:auto!important;height:auto!important;padding:0!important;margin:0!important;border:0!important;background:transparent!important;color:#243244!important;text-align:start!important;line-height:1.4!important;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-node .text-ellipsis{font-size:12px!important;font-weight:600!important;white-space:normal!important;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-node.pro{padding-right:28px!important;}
.view-panel-right > .el-popover:has(.next-step-row) .next-step-node.pro::after{top:50%!important;right:0!important;transform:translateY(-50%);font-size:8px!important;border-radius:4px!important;}
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
body:has(.main-flow-builder) .el-dialog .el-dialog__headerbtn{width:32px;height:32px;top:20px!important;right:20px!important;border-radius:50%;background:#F0F3F7!important}
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
.node-viewer .card-body .el-input-group__prepend{background:#E6EBF1!important;border:0!important;border-radius:16px 0 0 16px!important;color:#667085!important;padding:0 14px!important}
.node-viewer .card-body .el-input-group--prepend .el-input__inner{border-radius:0 16px 16px 0!important}
/* note box stays a soft yellow pill-box */
.node-viewer .alert.alert-warning{border:0!important;border-radius:16px!important}
.node-viewer .card-body .alert .el-textarea__inner{background:transparent!important;border:0!important;box-shadow:none!important;color:#8a6d3b!important;padding:6px 10px!important}

`;
  var st=document.createElement('style');st.id='fx-flow-ui';st.textContent=css;
  (document.head||document.documentElement).appendChild(st);

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
    var bg=new go.Shape();bg.figure='RoundedRectangle';bg.parameter1=7;bg.fill=tint(c,.14);bg.strokeWidth=0;bg.desiredSize=new go.Size(24,24);
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
  setInterval(tick,800);tick();

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
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  setTimeout(function(){if(!DEBUG)return;var d=get();if(!d)return;var vis=0;d.links.each(function(l){if(l.actualBounds.width>2||l.actualBounds.height>2)vis++});
    var cats={};d.nodes.each(function(n){var k=n.category||'(default)';cats[k]=(cats[k]||0)+1});
    log('fx diag: nodes',d.nodes.count,'| links',d.links.count,'| links with size',vis,'| types',JSON.stringify(cats))},3000);
}()}catch(e){console.error('[fx] module error',e&&e.stack||e)}

/* ====================================================================================
   v7.5 module: Sub Flows page (folders rail, one-row flows, icons, labels strip, AI button)
   Self-contained: does nothing on pages that are not the Sub Flows list.
   ==================================================================================== */
try{!function(){
  if(window.__fxFlowsPage)return;window.__fxFlowsPage=1;
  if(window.__fxGate&&!window.__fxGate())return;
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
.fx-page>.fx-folders{position:relative!important;grid-column:1;grid-row:1/span 6;align-self:stretch;margin:0!important;padding:84px 12px 22px!important;border:0!important;border-right:1px solid var(--ln)!important;border-radius:0!important;background:#fff!important}
.fx-folders::before{content:'FOLDERS';display:block;padding:0 10px 6px;font-size:10px;font-weight:700;letter-spacing:.16em;line-height:30px;color:var(--lb)}
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
.fx-page .fx-folders .el-button.addbtn{position:absolute!important;top:83px;right:14px;z-index:5;width:32px;height:32px;margin:0!important;padding:0 8px!important;display:flex!important;align-items:center;justify-content:flex-start;overflow:hidden;white-space:nowrap;border:0!important;border-radius:10px!important;background:var(--omni)!important;color:#fff!important;font-size:12px!important;font-weight:700;transition:width .22s ease}
.fx-folders .addbtn i{display:none!important}
.fx-folders .addbtn::before{content:'';flex:none;width:16px;height:16px;background:currentColor;-webkit-mask:${foldPlus} center/contain no-repeat;mask:${foldPlus} center/contain no-repeat}
.fx-folders .addbtn>span{font-size:0;opacity:0;margin-left:0;transition:opacity .15s .05s,margin .2s}
.fx-page .fx-folders .el-button.addbtn:hover{width:142px}
.fx-folders .addbtn:hover>span{font-size:12px;opacity:1;margin-left:8px}
/* header */
.fx-head,.fx-head .text-right{position:static!important}
.fx-head{padding:26px 28px 10px!important;margin:0!important}
.fx-head .mr-auto{font-size:26px!important;line-height:1.15;font-weight:800;letter-spacing:-.02em;color:var(--d)!important}
.fx-head .mr-auto::after{content:'';display:block;width:36px;height:4px;border-radius:4px;background:var(--m);margin-top:8px}
.fx-head .el-button{height:40px;border-radius:999px!important;padding:0 18px!important;font-size:13px!important;font-weight:600!important;box-shadow:none!important}
/* AI button: top of the rail, same navy as the side menu */
.fx-page .fx-head .el-button.fx-ai{position:absolute!important;top:22px;left:14px;width:220px;height:46px!important;z-index:8;display:flex!important;align-items:center;justify-content:center;gap:8px;padding:0 16px!important;border:0!important;border-radius:14px!important;background:var(--nav)!important;color:#fff!important;font-size:0!important;box-shadow:0 10px 24px -14px rgba(27,33,55,.7)!important;transition:background .15s,color .15s,transform .15s}
.fx-head .el-button.fx-ai>*{display:none!important}
.fx-head .el-button.fx-ai::before{content:'';flex:none;width:16px;height:16px;background:var(--omni);-webkit-mask:${spark} center/contain no-repeat;mask:${spark} center/contain no-repeat}
.fx-head .el-button.fx-ai::after{content:'${NAME}';font-size:14px;font-weight:600;line-height:1}
.fx-page .fx-head .el-button.fx-ai:hover{background:var(--omni)!important;color:#fff!important;transform:translateY(-1px)}
.fx-head .el-button.fx-ai:hover::before{background:#04241D}
/* toolbar */
.fx-tools{display:flex!important;align-items:center;gap:10px;padding:8px 28px 18px!important;margin:0!important}
.fx-tools .el-input__inner{height:40px;border-radius:999px!important;border:1px solid var(--ln)!important;background:#fff!important;padding-left:16px;color:var(--d)!important}
.fx-tools .el-input__inner:focus{border-color:var(--m)!important;box-shadow:0 0 0 3px rgba(36,228,187,.22)!important}
.fx-tools .el-button{border-radius:999px!important;border:1px solid var(--ln)!important;background:#fff!important;color:var(--d)!important}
/* flow rows: no images, one per row */
.fx-list{display:grid!important;grid-template-columns:1fr!important;gap:8px!important;align-content:start;padding:0 28px 28px!important;margin:0!important}
.fx-list::before,.fx-list::after{display:none!important}
.fx-list>.el-col{width:auto!important;max-width:none!important;padding:0!important;float:none!important}
.fx-list .flow-card{display:grid!important;grid-template-columns:minmax(0,1fr)!important;grid-template-rows:auto auto!important;height:auto!important;min-height:68px!important;align-content:center;margin:0!important;padding:12px 0!important;background:#fff!important;border:1px solid var(--ln)!important;border-radius:16px!important;overflow:hidden;box-shadow:none!important;transition:transform .18s,box-shadow .18s,border-color .18s}
.fx-list .flow-card:hover{transform:translateY(-2px);border-color:var(--m)!important;box-shadow:0 14px 30px -18px rgba(10,14,26,.3)!important}
.fx-list .flow-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--m);opacity:0;transition:opacity .18s;z-index:7}
.fx-list .flow-card:hover::before{opacity:1}
.fx-list .flow-card>:not(.flow-card-title):not(.absolute){display:none!important}
.fx-list .flow-card-title{grid-column:1!important;grid-row:1!important;align-self:center!important;height:auto!important;padding:0 14px 0 20px!important;background:transparent!important;border:0!important;color:var(--d)!important;line-height:1.35}
.fx-list .flow-card-title .font-weight-bold{font-size:15px!important;font-weight:600!important}
.fx-list .flow-card>.absolute{position:static!important;grid-column:1!important;grid-row:2!important;align-self:start;width:auto!important;background:transparent!important;color:var(--lb)!important;font-size:12px!important;font-weight:500;text-align:left!important;padding:2px 20px 0!important}
.fx-list .flow-card>.absolute .px-3{padding:0!important;width:auto!important;font-size:12px!important}
.fx-list .flow-card>.absolute .px-3::before{content:'';display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--m);margin-right:7px}
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
.fx-labels .fx-edit{position:absolute!important;top:-14px;right:-12px;width:26px!important;height:26px!important;min-width:0!important;padding:0!important;z-index:5;border-radius:8px!important}
.fx-lb-title,.fx-lb-txt{font-size:16px!important;font-weight:700!important;color:#0A0E1A!important;letter-spacing:0!important;text-transform:none!important;white-space:nowrap}
.fx-lb-txt>*{font-size:14px;font-weight:400}
.fx-labels .fx-add{order:99;margin-left:auto!important;flex:none!important;width:28px!important;height:28px!important;min-width:0!important;min-height:0!important;padding:0!important;border:0!important;border-radius:8px!important;background:var(--omni,#A684FF)!important;color:#fff!important;display:inline-flex!important;align-items:center;justify-content:center;position:static!important;opacity:1!important;visibility:visible!important;box-shadow:none!important}
.fx-labels .fx-add:hover{background:#946FF5!important}
.fx-labels .fx-add,.fx-labels .fx-add *{color:#fff!important;font-size:14px!important}
/* flow / folder icons */
html body .fx-page .flow-card i.svg-icon.svg-icon.svg-icon{position:relative!important;display:inline-block!important;width:32px!important;height:32px!important;min-width:32px;border-radius:10px!important;background:#E7FBF6!important;-webkit-mask:none!important;mask:none!important;content:normal!important;filter:none!important;font-size:0!important;line-height:0!important;vertical-align:middle;overflow:hidden}
html body .fx-page .flow-card i.svg-icon.svg-icon.svg-icon::after{display:none!important}
html body .fx-page .flow-card i.svg-icon.svg-icon.svg-icon::before{content:''!important;position:absolute!important;inset:0!important;display:block!important;width:auto!important;height:auto!important;-webkit-mask:none!important;mask:none!important;background:var(--fxi) center/18px no-repeat!important}
html body .fx-page .flow-card i.svg-web-flow{--fxi:${chat}}
html body .fx-page .flow-card i.svg-workflow-flow{--fxi:${branch}}
html body .fx-page .flow-card i.svg-function-flow{--fxi:${braces}}
html body .fx-page .flow-card i.el-icon-folder.el-icon-folder{display:inline-block!important;width:20px!important;height:20px!important;font-size:0!important;background:${folder} center/18px no-repeat!important}
html body .fx-page .flow-card i.el-icon-folder.el-icon-folder::before{content:none!important}
`;

  /* Library-style pages (folders + table): same approved rail layout as Sub Flows, derived from its own rules */
  css+='\n'+css.split('\n').filter(function(l){return /^\.fx-page(>\*|>\.fx-folders|\{| \.fx-folders \.el-button\.addbtn)/.test(l)}).map(function(l){return l.replace(/\.fx-page/g,'.fx-lib').replace('padding:84px 12px 22px','padding:22px 12px 22px').replace('top:83px','top:21px')}).join('\n')+'\n.fx-lib-body{padding:0 28px 20px!important}\n.fx-lib>.fx-tools{padding:14px 28px!important}\n';
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
    var title=all.filter(function(e){return !e.children.length&&/^\s*labels\s*$/i.test(e.textContent)})[0];
    var dd=all.filter(function(e){var x=e.textContent.trim();return /selected/i.test(x)&&x.length<40&&!e.querySelector(HAS)&&!(add&&e.contains(add))})[0];
    var tw=null;
    if(!title){var w=document.createTreeWalker(Lb,NodeFilter.SHOW_TEXT),n;while((n=w.nextNode())){if(/^\s*labels\s*$/i.test(n.nodeValue)){tw=n.parentElement;break}}}
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
  var start=function(){
    var st=document.createElement('style');st.id='fx-flows-ui';st.textContent=css;
    (document.head||document.documentElement).appendChild(st);
    var q=0;
    var run=function(){cancelAnimationFrame(q);q=requestAnimationFrame(function(){try{tag()}catch(e){if(DEBUG)console.warn('fx flows tag failed',e)}try{tagLib()}catch(e){if(DEBUG)console.warn('fx lib tag failed',e)}})};
    new MutationObserver(run).observe(document.body,{childList:true,subtree:true});
    run();
  };
  if(document.body)start();else document.addEventListener('DOMContentLoaded',start);
}()}catch(e){console.error('[fx] module error',e&&e.stack||e)}

/* ====================================================================================
   v7.7 module: core design layer for ALL app pages (reference look)
   - Element UI components: buttons, inputs, selects/menus, cards, tables, tabs, pagination, tags,
     switches, checkboxes, dialogs
   - structure: forms (label above field, 2 columns), dialogs that contain a form open as a side sheet
   - skipped automatically on: the flow-builder canvas, the Sub Flows page (their approved looks),
     any dark / night page (never touched)
   - kill switch: add  fx=off  to the URL or the hash, or set  window.__fxOff=true
   ==================================================================================== */
try{!function(){
  if(window.__fxCore)return;window.__fxCore=1;
  var FORMS=true;      /* label above the field + 2 columns when there is room */
  var SHEETS=true;     /* dialogs that contain a form open as a right-hand side sheet */
  var R=`
main.el-main,main.el-main.relative.p-0,section.el-container.modalContainer{background:#F7FAFF!important}
.el-card.el-card.el-card{background:#fff!important;border:1px solid #F0F3F8!important;border-image:none!important;outline:0!important;border-radius:18px!important;box-shadow:none!important}
.el-card.el-card.el-card::before,.el-card.el-card.el-card::after{display:none!important;content:none!important}
.el-card__header{border-bottom:1px solid #F1F4F9!important;font-weight:700}
.el-button{border-radius:12px!important;font-weight:600!important;transition:background .15s,border-color .15s,color .15s}
.el-button.is-circle{border-radius:50%!important}
.el-button--default{background:#fff!important;border-color:#E6EAF2!important;color:#0A0E1A!important}
.el-button--default:hover,.el-button--default:focus{background:#F6F2FF!important;border-color:#A684FF!important;color:#6D4AE0!important}
.el-button--primary{background:#A684FF!important;border-color:#A684FF!important;color:#fff!important}
.el-button--success{background:#24E4BB!important;border-color:#24E4BB!important;color:#04241D!important}
.el-button--primary:hover,.el-button--primary:focus{background:#8F66F2!important;border-color:#8F66F2!important}
.el-button--success:hover{background:#1DD3AB!important;border-color:#1DD3AB!important}
.el-button--danger{background:#FE4E51!important;border-color:#FE4E51!important;color:#fff!important}
.el-input__inner,.el-textarea__inner{border-radius:12px!important;border-color:#E6EAF2!important;color:#0A0E1A!important}
.el-input:not(.el-input--small):not(.el-input--mini) .el-input__inner{height:42px!important;line-height:42px!important}
.el-input__inner:hover,.el-textarea__inner:hover{border-color:#C9D3E3!important}
.el-input__inner:focus,.el-textarea__inner:focus,.el-select .el-input.is-focus .el-input__inner{border-color:#24E4BB!important;box-shadow:0 0 0 3px rgba(36,228,187,.2)!important}
.el-select-dropdown,.el-dropdown-menu,.el-popover,.el-picker-panel{border-radius:14px!important;border:1px solid #E6EAF2!important;box-shadow:0 18px 44px -22px rgba(10,14,26,.35)!important}
.el-select-dropdown__item.selected{color:#057A5E!important;font-weight:700!important}
.el-select-dropdown__item:hover,.el-select-dropdown__item.hover,.el-dropdown-menu__item:hover,.el-dropdown-menu__item:focus{background:#E9FCF8!important;color:#057A5E!important}
.el-table{border:1px solid #F0F3F8!important;border-radius:14px!important;overflow:hidden}
.el-input-group__prepend,.el-input-group__append{background:#F7FAFF!important;border-color:#E6EAF2!important;color:#7F848D!important}
.el-input-group__prepend{border-radius:12px 0 0 12px!important}
.el-input-group__append{border-radius:0 12px 12px 0!important}
.el-input-group--prepend .el-input__inner{border-radius:0 12px 12px 0!important}
.el-input-group--append .el-input__inner{border-radius:12px 0 0 12px!important}
.alert{border:0!important;border-radius:14px!important}
.alert-warning{background:#FFF7E6!important;color:#8A5A00!important}
.alert-info{background:#EDF5FF!important;color:#2F6FD1!important}
.alert-success{background:#E9FCF8!important;color:#057A5E!important}
.alert-danger{background:#FFECEC!important;color:#D63A3D!important}
.badge-secondary{background:#EEF1F6!important;color:#7F848D!important}
.badge-info{background:#EDF5FF!important;color:#2F6FD1!important}
.badge-success{background:#E9FCF8!important;color:#057A5E!important}
.badge-warning{background:#FEF3ED!important;color:#C2570C!important}
.badge-danger{background:#FFECEC!important;color:#D63A3D!important}
.modal.docked .modal-content,.modal.docked-right .modal-content{border-radius:24px 0 0 24px!important;border:0!important}
.el-table::before{display:none!important}
.el-table thead th{background:#F7FAFF!important;color:#7F848D!important;font-size:12px!important;font-weight:700!important;letter-spacing:.04em;text-transform:uppercase;border-bottom:1px solid #EEF1F6!important}
.el-table th,.el-table td{padding:14px 0!important}
.el-table .cell{word-break:normal!important;overflow-wrap:anywhere!important}
.el-button.is-disabled{opacity:.5!important;cursor:not-allowed!important}
.el-button--primary:hover,.el-button--primary:focus{--fx-pbg:#8F66F2}
*{scrollbar-width:thin!important;scrollbar-color:#D7DEEA transparent!important}
.el-table td{border-bottom:1px solid #F1F4F9!important}
.el-table--enable-row-hover .el-table__body tr:hover>td{background:#F4FCFA!important}
.el-tabs__item{font-weight:600!important}
.el-tabs__item.is-active{color:#0A0E1A!important}
.el-tabs__active-bar{background:linear-gradient(90deg,#24E4BB,#A684FF)!important;height:3px!important;border-radius:3px}
.el-tabs__nav-wrap::after{background:#EEF1F6!important}
.el-pagination.is-background .el-pager li,.el-pagination.is-background .btn-prev,.el-pagination.is-background .btn-next{border-radius:10px!important}
.el-pagination.is-background .el-pager li:not(.disabled).active{background:#A684FF!important;color:#fff!important}
.el-switch__core{background:#D7DEEA!important;border-color:transparent!important}
.el-switch.is-checked .el-switch__core{background:#24E4BB!important;border-color:#24E4BB!important}
.el-checkbox__inner{border-radius:6px!important}
.el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox__input.is-indeterminate .el-checkbox__inner{background:#24E4BB!important;border-color:#24E4BB!important}
.el-checkbox__input.is-checked .el-checkbox__inner::after{border-color:#04241D!important}
.el-radio__input.is-checked .el-radio__inner{background:#24E4BB!important;border-color:#24E4BB!important}
.el-radio__input.is-checked .el-radio__inner::after{background:#04241D!important}
.el-tag{border:0!important;border-radius:999px!important;font-weight:600!important;background:#F6F2FF!important;color:#6D4AE0!important}
.el-tag--success{background:#E9FCF8!important;color:#057A5E!important}
.el-tag--info{background:#EDF5FF!important;color:#2F6FD1!important}
.el-tag--warning{background:#FEF3ED!important;color:#C2570C!important}
.el-tag--danger{background:#FFECEC!important;color:#D63A3D!important}
.badge{border-radius:999px!important;font-weight:600!important}
.el-dialog{border-radius:20px!important;overflow:hidden}
.el-dialog__header{border-bottom:1px solid #EDF1F5!important}
.el-dialog__title{font-weight:700!important;color:#0A0E1A!important}
.el-loading-spinner .path{stroke:#24E4BB!important}
/* popper-based menus (select / dropdown / date / cascader / autocomplete / color) - rendered as body children, not inside .el-main */
.el-select-dropdown,.el-dropdown-menu,.el-picker-panel,.el-date-picker,.el-date-range-picker,.el-time-panel,.el-cascader__dropdown,.el-cascader-panel,.el-autocomplete-suggestion,.el-color-dropdown,.el-popover{border:1px solid #F0F3F8!important;border-radius:14px!important;box-shadow:0 12px 32px rgba(10,14,26,.12)!important;overflow:hidden}
.el-select-dropdown__item.selected,.el-dropdown-menu__item:not(.is-disabled):hover,.el-cascader-node:not(.is-disabled):hover,.el-autocomplete-suggestion li:hover{background:#E7FBF6!important;color:#057A5E!important}
.el-select-dropdown__item.hover,.el-select-dropdown__item:hover{background:#F7FAFF!important}
.el-picker-panel__icon-btn:hover,.el-date-table td.available:hover,.el-date-table td.today span{color:#057A5E!important}
.el-date-table td.current:not(.disabled) span,.el-date-table td.selected span,.el-year-table td.current .cell,.el-month-table td.current .cell{background:#24E4BB!important;color:#04241D!important;border-radius:8px!important}
.el-time-panel,.el-time-spinner__item.active:not(.disabled){color:#057A5E!important}
.el-color-dropdown__link-btn{color:#057A5E!important}
/* tooltip: dark pill, no arrow border mismatch */
.el-tooltip__popper{background:#0A0E1A!important;color:#fff!important;border-radius:10px!important;border:0!important;font-weight:500!important;box-shadow:0 8px 20px rgba(10,14,26,.18)!important}
.el-tooltip__popper .popper__arrow,.el-tooltip__popper .popper__arrow::after{border-top-color:#0A0E1A!important;border-bottom-color:#0A0E1A!important}
/* toasts / message box / notification */
.el-message{border-radius:12px!important;border:1px solid #F0F3F8!important;box-shadow:0 8px 24px rgba(10,14,26,.1)!important;background:#fff!important}
.el-message--success{background:#E7FBF6!important;border-color:#BEF0E1!important;color:#057A5E!important}
.el-message--error{background:#FFECEC!important;border-color:#FCC!important;color:#D63A3D!important}
.el-message--warning{background:#FEF3ED!important;border-color:#FBD8B8!important;color:#C2570C!important}
.el-notification{border-radius:16px!important;border:1px solid #F0F3F8!important;box-shadow:0 12px 32px rgba(10,14,26,.14)!important}
.el-notification__title{font-weight:700!important;color:#0A0E1A!important}
.el-message-box{border-radius:20px!important;overflow:hidden}
.el-message-box__header{border-bottom:1px solid #EDF1F5!important}
/* loading / empty */
.el-loading-mask{background:rgba(255,255,255,.72)!important;backdrop-filter:blur(2px)}
.el-empty__description{color:#9AA3B2!important}
/* upload */
.el-upload-dragger{border:1.5px dashed #D7DEEA!important;border-radius:16px!important;background:#F7FAFF!important}
.el-upload-dragger:hover{border-color:#24E4BB!important;background:#F1FDFA!important}
.el-upload-list__item{border-radius:10px!important}
.el-upload-list__item:hover{background:#F7FAFF!important}
/* progress / slider / rate / steps */
.el-progress-bar__inner{background:#24E4BB!important}
.el-progress__text,.el-progress.is-success .el-progress__text{color:#057A5E!important}
.el-slider__bar{background:#24E4BB!important}
.el-slider__button{border-color:#24E4BB!important}
.el-rate__icon.is-selected,.el-rate__icon.is-active{color:#24E4BB!important}
.el-steps--simple{border-radius:14px!important;background:#F7FAFF!important}
.el-step__head.is-process,.el-step__head.is-finish{color:#057A5E!important;border-color:#24E4BB!important}
.el-step__icon.is-text{border-color:inherit!important}
.el-step__line-inner{border-color:#24E4BB!important}
/* avatar / image / breadcrumb / badge dot / tree / collapse / timeline / carousel */
.el-avatar{border-radius:50%!important;font-weight:600!important}
.el-avatar--square{border-radius:12px!important}
.el-image__error,.el-image__placeholder{background:#F7FAFF!important}
.el-breadcrumb__inner,.el-breadcrumb__inner a{color:#7F848D!important;font-weight:500!important}
.el-breadcrumb__item:last-child .el-breadcrumb__inner{color:#0A0E1A!important;font-weight:700!important}
.el-badge__content{border:0!important;font-weight:700!important}
.el-badge__content.is-fixed{box-shadow:0 0 0 2px #fff}
.el-tree-node__content:hover{background:#F7FAFF!important}
.el-tree-node.is-current>.el-tree-node__content{background:#E7FBF6!important}
.el-collapse-item__header{font-weight:600!important;color:#0A0E1A!important}
.el-collapse-item__header.is-active{color:#057A5E!important}
.el-timeline-item__node--normal{background:#24E4BB!important}
.el-carousel__indicator.is-active button{background:#24E4BB!important}
.el-drawer{border-radius:0!important}
.el-transfer-panel{border-radius:14px!important;border-color:#F0F3F8!important}
.el-transfer-panel__header{background:#F7FAFF!important}
`;
  var FORMS_CSS=`
.el-form:not(.el-form--inline){display:grid!important;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:0 24px}
.el-form:not(.el-form--inline)>:not(.el-form-item){grid-column:1/-1}
.el-form:not(.el-form--inline)>.el-form-item:has(.el-textarea,.el-table,.el-upload,.el-radio-group,.el-checkbox-group){grid-column:1/-1}
.el-form:not(.el-form--inline) .el-form-item{margin-bottom:20px!important}
.el-form:not(.el-form--inline) .el-form-item__label{float:none!important;display:block!important;width:auto!important;text-align:start!important;padding:0 0 8px!important;line-height:1.3!important;font-weight:600!important;font-size:13px!important}
.el-form:not(.el-form--inline) .el-form-item__content{margin-left:0!important;line-height:normal!important}
`;
  var SH='.el-dialog__wrapper>.el-dialog:not(.is-fullscreen):has(.el-form)';
  var SHEETS_CSS=`
${SH}{position:fixed!important;top:0;right:0;bottom:0;left:auto;margin:0!important;width:min(560px,100vw)!important;height:100vh;display:flex;flex-direction:column;border-radius:24px 0 0 24px!important;animation:fx-sheet .24s ease!important}
${SH} .el-dialog__header{padding:24px 28px 8px!important;flex:none}
${SH} .el-dialog__body{flex:1;overflow:auto;padding:16px 28px!important}
${SH} .el-dialog__footer{flex:none;padding:16px 28px 24px!important;border-top:1px solid #EDF1F5}
`;

  /* ---------- Flexito icon pack: replaces the platform's own icons (Element UI / FontAwesome) with one consistent line-icon set ---------- */
  var ICONS=true;      /* false = keep the platform's icons */
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
    var out='',IP='html.fx-icons.fx-icons body ';
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
  /* lists every icon class on the current page that the pack does not cover yet: window.__fxIconScan() */
  var BRAND=/^fa-(facebook|facebook-f|facebook-square|whatsapp|instagram|twitter|x-twitter|telegram|telegram-plane|google|youtube|linkedin|linkedin-in|tiktok|apple|android|windows|github|slack|stripe|paypal|shopify|wordpress|woocommerce|snapchat|pinterest|viber|discord|skype|cc-[\w-]+)$/;
  var FASKIP=/^(fa|fas|far|fab|fal|fad)$|^fa-(fw|lg|xs|sm|1x|2x|3x|4x|5x|spin|pulse|solid|regular|brands|ul|li|stack|inverse|border|rotate-\d+|flip-\w+)$/;
  /* window.__fxAudit(): what still looks like the platform on this page (foreign colours, components that did not change, unmapped icons) */
  window.__fxAudit=function(quiet){
    var Hh=document.documentElement,out={route:location.hash,html:Hh.className,coreStyle:!!document.getElementById('fx-core-ui'),gate:window.__fxGate?window.__fxGate():true};
    var root=document.querySelector('main.el-main')||document.body;
    var cl=function(e){var c=e.getAttribute&&e.getAttribute('class');return c?'.'+c.trim().split(/\s+/).slice(0,3).join('.'):''};
    var pal=[[36,228,187],[29,211,171],[166,132,255],[77,155,255],[254,78,81],[15,157,110],[229,72,77],[5,122,94],[109,74,224],[122,90,248]];
    var near=function(c){return pal.some(function(p){return Math.abs(p[0]-c[0])+Math.abs(p[1]-c[1])+Math.abs(p[2]-c[2])<40})};
    var parse=function(x){var m=/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?/.exec(x||'');return m?[+m[1],+m[2],+m[3],m[4]===undefined?1:+m[4]]:null};
    var sat=function(c){return Math.max(c[0],c[1],c[2])-Math.min(c[0],c[1],c[2])};
    var res={},nodes=root.querySelectorAll('*'),n=Math.min(nodes.length,3500);
    for(var i=0;i<n;i++){
      var e=nodes[i],st=getComputedStyle(e),pr=[];
      if(parseFloat(st.borderTopWidth)>0||parseFloat(st.borderLeftWidth)>0||parseFloat(st.borderBottomWidth)>0||parseFloat(st.borderRightWidth)>0)pr.push(['border',/rgba\(0, 0, 0, 0\)/.test(st.borderTopColor)?st.borderLeftColor:st.borderTopColor]);
      pr.push(['bg',st.backgroundColor]);
      pr.forEach(function(p){var c=parse(p[1]);if(!c||c[3]<0.3||sat(c)<60||near(c))return;var k=p[0]+' '+e.tagName.toLowerCase()+cl(e)+' '+p[1].replace(/\s/g,'');res[k]=(res[k]||0)+1});
    }
    out.foreignColours=Object.keys(res).sort(function(a,b){return res[b]-res[a]}).slice(0,25).map(function(k){return k+' x'+res[k]});
    var chk=function(sel,ok){var l=root.querySelectorAll(sel),bad=0;for(var i=0;i<l.length;i++){if(!ok(l[i],getComputedStyle(l[i])))bad++}return l.length?bad+'/'+l.length+' unchanged':'-'};
    out.components={
      cards:chk('.el-card',function(e,c){return /^(18|20|22)px/.test(c.borderTopLeftRadius)}),
      primaryButtons:chk('.el-button--primary:not(.is-disabled)',function(e,c){var k=parse(c.backgroundColor);return k&&Math.abs(k[0]-36)<25&&Math.abs(k[1]-228)<25}),
      inputs:chk('.el-input__inner',function(e,c){return parseFloat(c.borderTopLeftRadius)>=12||/^0px/.test(c.borderTopLeftRadius)}),
      tables:chk('.el-table',function(e,c){var k=parse(c.borderTopColor);return !k||sat(k)<30}),
      switchesOn:chk('.el-switch.is-checked .el-switch__core',function(e,c){var k=parse(c.backgroundColor);return k&&Math.abs(k[0]-36)<25&&Math.abs(k[1]-228)<25})
    };
    out.unmappedIcons=window.__fxIconScan?Object.keys(window.__fxIconScan().unmapped).slice(0,40):null;
    if(!quiet)console.log('fx audit',out);
    return out;
  };
  window.__fxIconScan=function(){
    var un={},mp={},nodes=document.querySelectorAll('[class*="icon"],[class*="fa-"],i');
    for(var i=0;i<nodes.length;i++){
      var c=nodes[i].getAttribute&&nodes[i].getAttribute('class');if(!c)continue;
      c.split(/\s+/).forEach(function(n){
        if(!/^(el-icon-|fa-|svg-|icon-|iconfont|mdi-|bi-)/.test(n))return;
        if(n==='el-icon-loading'||n==='svg-icon'||FASKIP.test(n)||BRAND.test(n))return;
        var t=MAPPED[n]?mp:un;t[n]=(t[n]||0)+1;
      });
    }
    return{mapped:mp,unmapped:un};
  };

  var P='html.fx-app.fx-app body ';
  var scope=function(t){return t.replace(/(^|\})\s*([^{}]+)\{/g,function(m,a,sel){return a+sel.split(/,(?![^(]*\))/).map(function(x){return P+x.trim()}).join(',')+'{'})};
  var css=(ICONS?ICON_CSS:'')+scope(R)+(FORMS?scope(FORMS_CSS):'')+(SHEETS?scope(SHEETS_CSS)+'@keyframes fx-sheet{from{transform:translateX(48px);opacity:0}to{transform:none;opacity:1}}':'');

  var CARD={'background-color':'#fff','border':'1px solid #F0F3F8','border-image':'none','outline':'0','border-radius':'18px','box-shadow':'none'};
  var H=document.documentElement;
  var lum=function(c){var m=/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(c||'');return m?(0.2126*m[1]+0.7152*m[2]+0.0722*m[3])/255:1};
  var isDark=function(){
    var b=document.body;if(!b)return false;
    if(/(^|[\s-_])(dark|night)([\s-_]|$)/i.test((b.className||'')+' '+(H.className||'')))return true;
    var el=document.querySelector('main.el-main')||b,bg=getComputedStyle(el).backgroundColor;
    if(!bg||bg==='transparent'||/,\s*0\)$/.test(bg))bg=getComputedStyle(b).backgroundColor;
    return lum(bg)<0.35;
  };
  var off=function(){return window.__fxOff||/[?&#]fx=off/.test(location.href)};
  /* before the DOM exists we can only decide from the route: builder canvas (no hash) and Sub Flows keep their own looks */
  var earlyApp=function(){var h=location.hash;return !(!h||h==='#'||h==='#/'||/subflow/i.test(h))};
  var onBuilder=function(){   /* the platform keeps a hidden .main-flow-builder node on EVERY page (display:none) - only count it when it is actually shown.
                                 checked via computed display only: offsetParent is null for any position:fixed/absolute element too, which would misfire here */
    var el=document.querySelector('.main-flow-builder,.fx-page');
    return !!el&&getComputedStyle(el).display!=='none';
  };
  var wanted=function(){
    if(off())return false;
    if(!document.body)return earlyApp();
    if(onBuilder()||/subflow/i.test(location.hash))return false;   /* approved looks live elsewhere */
    return !isDark();
  };
  var cards=function(){
    if(H.classList.contains('fx-insights'))return;   /* the Insights module owns its cards */
    var list=document.querySelectorAll('main.el-main .el-card');
    for(var i=0;i<list.length;i++){var c=list[i];
      if(c.style.getPropertyValue('border-radius')==='18px'&&c.style.getPropertyPriority('border-radius')==='important')continue;
      for(var k in CARD)c.style.setProperty(k,CARD[k],'important')}
  };
  var BTN={'background-color':'var(--fx-pbg,#A684FF)','border-color':'var(--fx-pbg,#A684FF)','color':'#fff'};
  var buttons=function(){   /* inline !important pins our purple even where a CSS rule loses on specificity; hover colour comes from --fx-pbg */
    var list=document.querySelectorAll('.el-button--primary:not(.is-disabled)');
    for(var i=0;i<list.length;i++){var b=list[i];
      if(b.style.getPropertyValue('background-color')===BTN['background-color'])continue;
      for(var k in BTN)b.style.setProperty(k,BTN[k],'important')}
  };
  var ready=false;
  var tog=function(){
    var on=wanted();
    if(H.classList.contains('fx-app')!==on)H.classList.toggle('fx-app',on);
    var ic=ICONS&&on;   /* same scope as the layer: never on the flow builder canvas / Sub Flows page / dark pages */
    if(H.classList.contains('fx-icons')!==ic)H.classList.toggle('fx-icons',ic);
    if(on&&document.body){try{cards()}catch(e){}try{buttons()}catch(e){}}
    if(!ready&&document.body){ready=true;requestAnimationFrame(function(){requestAnimationFrame(function(){H.classList.add('fx-ready')})})}
  };
  if(window.__fxGate&&!window.__fxGate())return;   /* staging: not this bot */
  /* apply at once (before first paint when possible), then keep it calm */
  var st=document.createElement('style');st.id='fx-core-ui';st.textContent=css;
  (document.head||H).appendChild(st);
  tog();
  var t0=Date.now(),q=0;
  var run=function(){cancelAnimationFrame(q);q=requestAnimationFrame(function(){if(Date.now()-t0<4000)tog();else setTimeout(tog,400)})};
  var mo=new MutationObserver(run),iv=0;
  var go=function(){tog();window.addEventListener('hashchange',tog);iv=setInterval(tog,3000);mo.observe(H,{childList:true,subtree:true})};
  window.__fxCoreStop=function(){clearInterval(iv);mo.disconnect();window.removeEventListener('hashchange',tog);H.classList.remove('fx-app','fx-icons');console.log('fx core: stopped (platform look restored)')};
  window.__fxCoreStart=function(){window.__fxCoreStop();go();console.log('fx core: running')};
  setTimeout(function(){H.classList.add('fx-safe')},2500);
  go();
}()}catch(e){console.error('[fx] module error',e&&e.stack||e)}

/* ====================================================================================
   v7.6 module: Insights (analytics) pages
   - layout: cards are re-flowed into a 12-column grid (KPI tiles, 2-up charts, full-width tables)
   - KPI cards rebuilt as: icon tile / delta pill / big number / label / previous period
   - date + timezone as pills, tables / tabs / pagination / buttons restyled (reports pages)
   - Apex charts themed through their Vue component
   - census responder (answers the 360 shell with a snapshot of the page components)
   Everything is active only while the hash starts with #/analytics.
   ==================================================================================== */
try{!function(){
  if(window.__fxInsights)return;window.__fxInsights=1;
  var GRID=true;          /* false = keep the platform's own page layout (styling only) */
  var CHART_THEME=true;   /* false = leave the charts exactly as the platform draws them */
  var R=`
main.el-main.relative.p-0,section.el-container.modalContainer{background:#F7FAFF!important}
main.el-main.p-3{padding:24px 28px 0!important}
.el-card.el-card.el-card{background:#fff!important;border:1px solid #EEF1F6!important;border-image:none!important;outline:0!important;border-radius:20px!important;box-shadow:none!important;overflow:hidden}
.el-card.el-card.el-card::before,.el-card.el-card.el-card::after{display:none!important;content:none!important}
.el-card__header{padding:18px 24px!important;border-bottom:1px solid #F1F4F9!important;font-weight:700}
.el-card__body{padding:22px 24px!important}
.stats-summary-card:not(.fx-kpi){text-align:left!important}
.stats-summary-card:not(.fx-kpi) .el-card__body>div{justify-content:flex-start!important;gap:18px}
.stats-summary-card:not(.fx-kpi) .el-card__body>div>:first-child{flex:none;box-sizing:content-box;padding:12px;border-radius:14px;background:#E9FCF8;line-height:0;display:flex;align-items:center;justify-content:center}
.el-select .el-input__inner{height:40px;border-radius:999px!important;border:1px solid #E6EAF2!important;background:#fff!important}
.el-select .el-input__inner:focus{border-color:#24E4BB!important;box-shadow:0 0 0 3px rgba(36,228,187,.2)!important}
.apexcharts-toolbar{display:none!important}
.apexcharts-gridline{stroke:#EEF1F6!important}
/* ---- 12-column grid ---- */
.fx-grid{display:grid!important;grid-template-columns:repeat(12,minmax(0,1fr))!important;gap:14px!important;align-items:stretch;grid-auto-flow:row;container-type:inline-size;container-name:fxg;padding:0!important;margin:0!important}
.fx-flat{display:contents!important}
.fx-flat[style*="display: none"]{display:none!important}
.fx-grid .fx-item{grid-column:1/-1!important;min-width:0}
.fx-grid .fx-kpi,.fx-grid .fx-chart,.fx-grid .fx-table,.fx-grid .fx-other{grid-column:1/-1!important;width:auto!important;max-width:none!important;float:none!important;margin:0!important;min-width:0}
/* ---- KPI card (reference): icon tile + delta on one line, big number, grey label ---- */
.fx-kpi{text-align:left!important}
.fx-kpi .el-card__body{display:grid!important;grid-template-columns:auto auto 1fr!important;grid-template-areas:"ic dl ." "vl vl vl" "lb lb lb" "pv pv pv"!important;column-gap:10px;row-gap:2px;align-items:center;padding:18px 20px!important}
.fx-kpi .fx-k-icon{grid-area:ic;justify-self:start;margin:0 0 12px!important;width:36px!important;height:36px!important;padding:0!important;box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;line-height:1!important;background:linear-gradient(135deg,#E9FCF8 0%,#F3EEFF 100%)!important;border-radius:10px!important;color:#7A5AF8}
.fx-kpi svg.fx-k-icon,.fx-kpi img.fx-k-icon{display:block!important;padding:9px!important}
.fx-kpi i.fx-k-icon,.fx-kpi .fx-k-icon i{font-size:18px!important;line-height:1!important}
.fx-kpi .fx-k-icon svg,.fx-kpi .fx-k-icon img{width:18px!important;height:18px!important}
.fx-kpi.fx-t1 .fx-k-icon,.fx-kpi.fx-t3 .fx-k-icon{background:linear-gradient(135deg,#F3EEFF 0%,#E9FCF8 100%)!important;color:#057A5E}
.fx-kpi .fx-k-delta{grid-area:dl;justify-self:start;align-self:start;margin:9px 0 0!important;padding:0!important;border:0!important;background:none!important;font-size:12px!important;font-weight:700!important;line-height:1.3!important}
.fx-kpi .fx-k-delta.fx-up{color:#0F9D6E!important}
.fx-kpi .fx-k-delta.fx-down{color:#E5484D!important}
.fx-kpi .fx-k-delta.fx-zero{color:#7F848D!important}
.fx-kpi .fx-k-val{grid-area:vl;margin:0!important;font-size:26px!important;font-weight:800!important;line-height:1.15!important;letter-spacing:-.02em;color:#0A0E1A!important;text-align:left!important}
.fx-kpi .fx-k-lbl{grid-area:lb;margin:0!important;font-size:13px!important;font-weight:500!important;color:#7F848D!important;text-align:left!important}
.fx-kpi .fx-k-prev{grid-area:pv;margin:0!important;font-size:12px!important;color:#9AA3B2!important;text-align:left!important}
.fx-chart .el-card__body{padding:20px 24px!important}
/* ---- charts: navy tooltip + legend like the reference ---- */
.apexcharts-tooltip{background:#1B2137!important;color:#fff!important;border:0!important;border-radius:12px!important;box-shadow:0 12px 30px -12px rgba(10,14,26,.5)!important}
.apexcharts-tooltip-title{background:transparent!important;border:0!important;font-weight:700!important;color:#fff!important}
.apexcharts-tooltip *{color:#fff!important}
.apexcharts-legend-text{color:#0A0E1A!important;font-size:12px!important;font-weight:500!important}
.fx-chart .fx-c-val{font-size:26px!important;font-weight:800!important;line-height:1.15!important;letter-spacing:-.02em;color:#0A0E1A!important}
.fx-chart .fx-c-delta{display:inline-flex!important;align-items:center;margin-left:8px!important;padding:2px 8px!important;border:0!important;border-radius:999px!important;font-size:11px!important;font-weight:700!important;line-height:1.3!important;vertical-align:middle}
.fx-chart .fx-c-delta.fx-up{background:#E9FCF8!important;color:#057A5E!important}
.fx-chart .fx-c-delta.fx-down{background:#FFECEC!important;color:#D63A3D!important}
.fx-chart .fx-c-delta.fx-zero{background:#EEF1F6!important;color:#7F848D!important}
/* ---- date + timezone ---- */
.fx-tz{display:inline-flex!important;align-items:center;margin:0 12px 14px 0!important;padding:4px 12px!important;border-radius:999px;background:#EEF1F6;color:#5B6472!important;font-size:11px!important}
.fx-daterow{display:inline-flex!important;align-items:center;gap:10px;margin:0 0 20px!important;padding:6px 16px 6px 6px!important;background:#fff;border:1px solid #EEF1F6;border-radius:999px}
.fx-daterow .el-select .el-input__inner{border:0!important;background:#F7FAFF!important}
/* ---- reports: tables, tabs, pagination, buttons ---- */
.el-table{border-radius:14px!important;overflow:hidden}
.el-table::before{display:none!important}
.el-table thead th{background:#F7FAFF!important;color:#7F848D!important;font-size:12px!important;font-weight:700!important;letter-spacing:.04em;text-transform:uppercase;border-bottom:1px solid #EEF1F6!important}
.el-table th,.el-table td{padding:14px 0!important}
.el-table td{border-bottom:1px solid #F1F4F9!important}
.el-table--enable-row-hover .el-table__body tr:hover>td{background:#F4FCFA!important}
.el-pagination.is-background .el-pager li,.el-pagination.is-background .btn-prev,.el-pagination.is-background .btn-next{border-radius:10px!important}
.el-pagination.is-background .el-pager li:not(.disabled).active{background:#A684FF!important;color:#fff!important}
.el-tabs__item.is-active{color:#0A0E1A!important}
.el-tabs__active-bar{background:#24E4BB!important;height:3px!important;border-radius:3px}
.el-button--primary{background:#A684FF!important;border-color:#A684FF!important;color:#fff!important;border-radius:12px!important}
.el-input__inner,.el-textarea__inner{border-radius:12px!important}
`;
  var P='html.fx-insights.fx-insights body ';
  var scope=function(t){return t.replace(/(^|\})\s*([^{}]+)\{/g,function(m,a,sel){return a+sel.split(/,(?![^(]*\))/).map(function(x){return P+x.trim()}).join(',')+'{'})};
  var CQ=function(min,body){return '@container fxg (min-width:'+min+'px){'+scope(body)+'}'};
  var css=scope(R)+'html.fx-insights:not(.fx-lay):not(.fx-safe) main.el-main.p-3:has(.el-card){visibility:hidden!important}'+CQ(560,'.fx-grid .fx-kpi{grid-column:span var(--fx-s,6)!important}')+CQ(900,'.fx-grid .fx-kpi{grid-column:span var(--fx-m,4)!important}.fx-grid .fx-chart{grid-column:span var(--fx-c,6)!important}')+CQ(1240,'.fx-grid .fx-kpi{grid-column:span var(--fx-l,3)!important}');

  var PAL=['#24E4BB','#A684FF','#4D9BFF','#FE4E51','#FFB020'];
  var CARD={'background-color':'#fff','border':'1px solid #EEF1F6','border-image':'none','outline':'0','border-radius':'20px','box-shadow':'none'};
  var NUM=/^[+\-]?[$€£]?[\d][\d.,]*\s?[%KMBkmb]?$/;
  var isGray=function(c){var m=/^#?([0-9a-f]{6})$/i.exec(c||'');if(!m)return false;var v=parseInt(m[1],16),r=v>>16,g=(v>>8)&255,b=v&255;return Math.max(r,g,b)-Math.min(r,g,b)<24};
  var txt=function(e){return (e.textContent||'').replace(/\s+/g,' ').trim()};
  var leaves=function(e){return [].slice.call(e.querySelectorAll('*')).filter(function(x){return !x.children.length&&txt(x)})};

  /* inline !important beats any stylesheet rule (the platform's Color Theme CSS included) */
  var cards=function(){
    var list=document.querySelectorAll('main.el-main.p-3 .el-card');
    for(var i=0;i<list.length;i++){var c=list[i];
      if(c.style.getPropertyValue('border-radius')==='20px'&&c.style.getPropertyPriority('border-radius')==='important')continue;
      for(var k in CARD)c.style.setProperty(k,CARD[k],'important')}
  };

  /* ---- KPI card: tag icon / delta / value / label / previous, flatten the wrappers between them ---- */
  var kpiParts=function(c){
    var body=c.querySelector('.el-card__body')||c;
    var ls=leaves(body),val=null,vfs=0,lbl=null,prev=null,delta=null;
    ls.forEach(function(x){
      var t=txt(x);
      if(/previous/i.test(t)){if(!prev)prev=x;return}
      if(/^[+\-]?\s*\d[\d.,]*\s?%$/.test(t)){if(!delta)delta=x;return}
      if(NUM.test(t)){var fs=parseFloat(getComputedStyle(x).fontSize)||0;if(!val||fs>vfs){val=x;vfs=fs}return}
      if(!lbl)lbl=x;
    });
    if(!val)return false;
    var atoms=[val];if(lbl)atoms.push(lbl);if(prev)atoms.push(prev);if(delta)atoms.push(delta);
    var holds=function(e){return atoms.some(function(a){return e.contains(a)})};
    var ic=body.querySelector('svg,img,i');
    if(ic&&!ic.contains(val)){while(ic.parentElement&&ic.parentElement!==body&&!holds(ic.parentElement))ic=ic.parentElement;atoms.push(ic)}else ic=null;
    [].forEach.call(body.querySelectorAll('.fx-flat,.fx-k-val,.fx-k-lbl,.fx-k-prev,.fx-k-delta,.fx-k-icon'),function(e){e.classList.remove('fx-flat','fx-k-val','fx-k-lbl','fx-k-prev','fx-k-delta','fx-k-icon','fx-up','fx-down','fx-zero')});
    atoms.forEach(function(a){for(var p=a.parentElement;p&&p!==body;p=p.parentElement){if(atoms.indexOf(p)<0)p.classList.add('fx-flat')}});
    val.classList.add('fx-k-val');if(lbl)lbl.classList.add('fx-k-lbl');if(prev)prev.classList.add('fx-k-prev');if(ic)ic.classList.add('fx-k-icon');
    if(delta){delta.classList.add('fx-k-delta');var n=parseFloat(txt(delta).replace(/[%\s]/g,''));delta.classList.add(n>0?'fx-up':n<0?'fx-down':'fx-zero')}
    return true;
  };
  var kindOf=function(c){
    if(c.classList.contains('stats-summary-card'))return 'kpi';
    if(c.querySelector('.apexcharts-canvas,.highcharts-container,[_echarts_instance_],canvas'))return 'chart';
    if(c.querySelector('.el-table,table'))return 'table';
    var h=c.getBoundingClientRect().height;return (h&&h<=170)?'kpi':'other';
  };
  var layout=function(){
    var root=document.querySelector('main.el-main.p-3');if(!root)return;
    /* date + timezone pills */
    var all=[].slice.call(root.querySelectorAll('div,span')).filter(function(e){return !e.children.length});
    var tz=all.filter(function(e){return /based on timezone/i.test(txt(e))})[0],cmp=all.filter(function(e){return /^compared to$/i.test(txt(e))})[0];
    if(tz){var ab=tz.closest&&tz.closest('.alert');(ab||tz).classList.add('fx-tz')}
    if(cmp){var dr=(cmp.closest&&cmp.closest('.flex'))||cmp.parentElement;if(dr&&dr!==root&&!dr.querySelector('.el-card'))dr.classList.add('fx-daterow')}
    if(!GRID)return;
    var cs=[].slice.call(root.querySelectorAll('.el-card'));
    var outer=cs.filter(function(c){for(var p=c.parentElement;p&&p!==root;p=p.parentElement){if(p.classList.contains('el-card'))return false}return true});
    if(!outer.length)return;
    var up=function(e){var a=[];for(;e;e=e.parentElement){a.push(e);if(e===root)break}return a};
    var lca=outer.map(up).reduce(function(a,b){return a.filter(function(x){return b.indexOf(x)>-1})})[0];
    if(outer.indexOf(lca)>-1)lca=lca.parentElement;
    /* nothing new on the page -> do not touch the DOM at all (keeps scrolling / lazy-loaded charts calm) */
    var done=lca.classList.contains('fx-grid')&&root.querySelectorAll('.fx-grid').length===1&&outer.every(function(c){return /(^|\s)fx-(kpi|chart|table|other)(\s|$)/.test(c.className)});
    if(done){document.documentElement.classList.add('fx-lay');return}
    if(window.__fxDebug)console.log('fx layout run',new Date().toISOString().slice(17,23),outer.length,'cards');
    /* reset, then tag */
    [].forEach.call(root.querySelectorAll('.fx-grid,.fx-item,.fx-kpi,.fx-chart,.fx-table,.fx-other'),function(e){e.classList.remove('fx-grid','fx-item','fx-kpi','fx-chart','fx-table','fx-other','fx-t0','fx-t1','fx-t2','fx-t3')});
    [].forEach.call(root.querySelectorAll('.fx-flat'),function(e){if(!e.closest('.fx-kpi'))e.classList.remove('fx-flat')});
    var flat=new Set();
    outer.forEach(function(c){for(var p=c.parentElement;p&&p!==lca;p=p.parentElement)flat.add(p)});
    flat.forEach(function(p){p.classList.add('fx-flat')});
    lca.classList.add('fx-grid');
    var mark=function(el){[].forEach.call(el.children,function(ch){if(ch.classList.contains('el-card'))return;if(flat.has(ch)){mark(ch);return}ch.classList.add('fx-item')})};
    mark(lca);
    var metric=function(c){
      var ls=leaves(c),val=null,vfs=0,delta=null;
      ls.forEach(function(x){
        if(x.closest&&x.closest('.apexcharts-canvas'))return;
        var tx=txt(x);
        if(/^[+\-]?\s*\d[\d.,]*\s?%$/.test(tx)){if(!delta)delta=x;return}
        if(NUM.test(tx)){var fs=parseFloat(getComputedStyle(x).fontSize)||0;if(fs>=20&&(!val||fs>vfs)){val=x;vfs=fs}}
      });
      if(val)val.classList.add('fx-c-val');
      if(delta){delta.classList.add('fx-c-delta');var n=parseFloat(txt(delta).replace(/[%\s]/g,''));delta.classList.remove('fx-up','fx-down','fx-zero');delta.classList.add(n>0?'fx-up':n<0?'fx-down':'fx-zero')}
    };
    var ki=0,kinds=[];
    outer.forEach(function(c){
      var k=kindOf(c);kinds.push(k);c.classList.add('fx-'+k);
      if(k==='kpi'){c.classList.add('fx-t'+(ki++%4));try{kpiParts(c)}catch(e){}}
      else if(k==='chart'){try{metric(c)}catch(e){}}
    });
    document.documentElement.classList.add('fx-lay');
    /* rows of KPI tiles fill the row evenly (like the 6-across reference); an odd last chart takes the full row */
    var g=0;
    while(g<outer.length){
      var kk=kinds[g],h=g;while(h<outer.length&&kinds[h]===kk)h++;var n=h-g,m;
      if(kk==='kpi'){
        var big=n>=6?[2,2,2,2,2,2]:n===5?[3,3,2,2,2]:null;
        for(m=g;m<h;m++){var l=big?big[(m-g)%big.length]:Math.floor(12/n),md=n>=3?4:Math.floor(12/n),sm=n===1?12:6;
          outer[m].style.setProperty('--fx-l',l);outer[m].style.setProperty('--fx-m',md);outer[m].style.setProperty('--fx-s',sm)}
      }else if(kk==='chart'){
        for(m=g;m<h;m++)outer[m].style.setProperty('--fx-c',(n%2===1&&m===h-1)?'12':'6');
      }
      g=h;
    }
  };

  /* ---- Apex charts: vue-apexcharts keeps its instance on the component that wraps .apexcharts-canvas ---- */
  var themeChart=function(ch){
    if(ch.__fx)return;
    var w=ch.w,type=w.config.chart.type,names=w.globals.seriesNames||[],cur=w.globals.colors||[];
    var colors=[],k=0,gray=[];
    names.forEach(function(n,i){var g=/previous|compar|prior|last period/i.test(String(n))||isGray(cur[i]);gray.push(g);colors.push(g?'#C9D3E3':PAL[k++%PAL.length])});
    var gradTo=colors.map(function(c,i){return gray[i]?c:'#A684FF'});
    var o={colors:colors.length?colors:PAL,chart:{toolbar:{show:false},fontFamily:'inherit',foreColor:'#7F848D'},grid:{borderColor:'#EEF1F6',strokeDashArray:0},
      legend:{position:'top',horizontalAlign:'right',markers:{width:9,height:9,radius:12},itemMargin:{horizontal:10}},tooltip:{theme:'dark'}};
    if(type==='line'||type==='area'){
      o.stroke={curve:'smooth',width:gray.length?gray.map(function(g){return g?2:3}):3};o.markers={size:0,hover:{size:5}};
      o.fill={type:'gradient',gradient:{type:'vertical',shadeIntensity:.4,gradientToColors:gradTo,opacityFrom:.3,opacityTo:.06,stops:[0,100]}};   /* mint fades into purple */
      if(type==='line')o.chart.type='area';
    }else if(type==='bar'){o.plotOptions={bar:{borderRadius:6,columnWidth:'46%'}};o.stroke={width:0};o.fill={type:'gradient',gradient:{type:'vertical',shade:'light',gradientToColors:gradTo,opacityFrom:1,opacityTo:1,stops:[0,100]}}}
    else if(type==='donut'||type==='pie'){o.stroke={width:0}}
    else if(type==='heatmap'){o.colors=[PAL[0]];o.plotOptions={heatmap:{radius:6,enableShades:true,shadeIntensity:.6}};o.stroke={width:0}}
    ch.updateOptions(o,true,false);ch.__fx=1;
  };
  var charts=function(){
    if(!CHART_THEME)return;
    var cv=document.querySelectorAll('main.el-main.p-3 .apexcharts-canvas');
    for(var i=0;i<cv.length;i++){var el=cv[i].parentElement,vm=null;
      for(var d=0;d<4&&el&&!vm;d++,el=el.parentElement){if(el.__vue__&&el.__vue__.chart&&el.__vue__.chart.updateOptions&&el.__vue__.chart.w)vm=el.__vue__}
      if(vm){try{themeChart(vm.chart)}catch(e){vm.chart.__fx=1;if(window.__fxDebug)console.warn('fx chart skipped',e.message)}}}
  };
  var H=document.documentElement;
  var tog=function(){
    var on=/^#\/analytics/.test(location.hash);
    if(H.classList.contains('fx-insights')!==on)H.classList.toggle('fx-insights',on);
    if(!document.body)return;
    if(on){try{cards()}catch(e){if(window.__fxDebug)console.warn('fx cards',e)}try{layout()}catch(e){if(window.__fxDebug)console.warn('fx layout',e)}try{charts()}catch(e){}}
  };
  var GATE=!window.__fxGate||window.__fxGate();
  if(GATE){
  var st=document.createElement('style');st.id='fx-insights-ui';st.textContent=css;
  (document.head||H).appendChild(st);
  tog();   /* the route decides the look immediately, before the page has painted */
  var t0=Date.now(),q=0,run=function(){cancelAnimationFrame(q);q=requestAnimationFrame(function(){if(Date.now()-t0<4000)tog();else setTimeout(tog,400)})};
  var mo=new MutationObserver(run),iv=0;
  var on=function(){tog();window.addEventListener('hashchange',tog);iv=setInterval(tog,3000);mo.observe(H,{childList:true,subtree:true})};
  /* console helpers: __fxStop() freezes the Insights script (keeps the current look); __fxStart() resumes */
  window.__fxStop=function(){clearInterval(iv);mo.disconnect();window.removeEventListener('hashchange',tog);H.classList.remove('fx-insights');console.log('fx insights: stopped')};
  window.__fxStart=function(){window.__fxStop();on();console.log('fx insights: running')};
  setTimeout(function(){H.classList.add('fx-safe')},2500);
  on();
  }

  /* ---------- census responder ---------- */
  var clean=function(t){return (t||'').replace(/\s+/g,' ').trim()};
  var cs2=function(e){return getComputedStyle(e)},rc=function(e){return e.getBoundingClientRect()};
  var cls=function(e){return e&&e.getAttribute?(e.getAttribute('class')||'').trim().split(/\s+/).filter(Boolean).slice(0,4).join('.'):''};
  var tree=function(e,d){return d>3?'':[].slice.call(e.children,0,6).map(function(c){return c.tagName.toLowerCase()+(cls(c)?'.'+cls(c):'')+(c.children.length&&d<3?'{'+tree(c,d+1)+'}':'')}).join(',')};
  var rootEl=function(){return document.querySelector('main.el-main.p-3')||document.querySelector('main.el-main,.el-main,main')||document.body};
  var snapshot=function(){
    var root=rootEl();
    var cand=[].slice.call(root.querySelectorAll('.el-card,div,section,article')).filter(function(e){var r=rc(e),c=cs2(e);
      return r.width>=140&&r.width<=1500&&r.height>=56&&r.height<=1100&&c.display!=='none'&&(e.classList.contains('el-card')||parseFloat(c.borderTopWidth)>0||parseFloat(c.borderLeftWidth)>0||c.boxShadow!=='none')});
    var set=new Set(cand);
    var outer=cand.filter(function(e){var p=e.parentElement;while(p&&p!==root){if(set.has(p))return false;p=p.parentElement}return true});
    var cardsOut=outer.slice(0,24).map(function(e){
      var r=rc(e),c=cs2(e),area=r.width*r.height;
      var bigs=[].slice.call(e.querySelectorAll('.apexcharts-canvas,.highcharts-container,[_echarts_instance_],canvas,svg')).filter(function(x){var a=rc(x);return a.width*a.height>area*.25});
      var tbl=!!e.querySelector('table,.el-table'),lt=leaves(e);
      var nums=lt.filter(function(x){return NUM.test(clean(x.textContent))&&parseFloat(cs2(x).fontSize)>=20});
      var kind=bigs.length?'chart':tbl?'table':(r.height<=180&&nums.length)?'kpi':'other';
      var o={kind:kind,sig:[e.tagName.toLowerCase(),cls(e),c.backgroundColor,c.borderTopWidth+' '+c.borderTopColor,c.borderRadius,c.boxShadow==='none'?'':'shadow'].join(' | '),w:Math.round(r.width),h:Math.round(r.height),ex:clean(lt[0]&&lt[0].textContent).slice(0,26),tree:tree(e,0).slice(0,520)};
      if(kind==='chart'){var b=bigs[0];o.lib=e.querySelector('.apexcharts-canvas')?'apex':e.querySelector('.highcharts-container')?'highcharts':e.querySelector('[_echarts_instance_]')?'echarts':e.querySelector('canvas')?'canvas':'svg';o.bigEl=b.tagName.toLowerCase()+'.'+cls(b)+' < '+cls(b.parentElement)}
      return o;
    });
    var n=function(s){return root.querySelectorAll(s).length};
    return{url:location.href,hash:location.hash,cards:cardsOut,
      icons:(window.__fxIconScan?window.__fxIconScan().unmapped:null),
      audit:(window.__fxAudit?(function(){var a=window.__fxAudit(true);return{gate:a.gate,foreign:a.foreignColours.slice(0,12),components:a.components}})():null),
      widgets:{tables:n('table,.el-table'),tabs:n('.el-tabs'),selects:n('.el-select'),dates:n('.el-date-editor'),buttons:n('.el-button'),pagination:n('.el-pagination'),apex:n('.apexcharts-canvas'),svg:n('svg'),canvas:n('canvas')}};
  };
  var reply=function(id){
    var t0=Date.now();
    (function poll(){
      var r=rootEl(),ready=r.querySelector('.el-card,.el-table,canvas,svg');
      if((ready&&Date.now()-t0>1500)||Date.now()-t0>6000){
        var data;try{data=snapshot()}catch(e){data={error:e.message,hash:location.hash,cards:[]}}
        try{window.parent.postMessage({fx:'census-res',id:id,hash:location.hash,data:data},'*')}catch(e){}
        return;
      }
      setTimeout(poll,400);
    })();
  };
  window.addEventListener('message',function(e){
    var d=e.data;
    if(d&&d.fx==='census-req'&&d.token==='fx-census'&&d.id)reply(d.id);
  });
}()}catch(e){console.error('[fx] module error',e&&e.stack||e)}

/* ====================================================================================
   v8.0 module: Inbox (#/livechat) - first pass
   Finds the three panes (filters | conversation list | chat) from text + geometry (no fixed class names),
   turns them into floating rounded cards on a light canvas, and restyles the list rows.
   Debug: window.__fxInboxInfo() prints what was detected. Kill switch: fx=off / window.__fxOff.
   ==================================================================================== */
try{!function(){
  if(window.__fxInbox)return;window.__fxInbox=1;
  var H=document.documentElement;
  if(window.__fxGate&&!window.__fxGate())return;
  var R=`
.fx-ib-root{display:flex!important;align-items:stretch!important;gap:12px!important;padding:12px!important;box-sizing:border-box!important;background:#F7FAFF!important}
.fx-ib-pane{background:#fff!important;border:1px solid #F0F3F8!important;border-radius:18px!important;overflow:hidden!important;height:auto!important;min-height:0!important;align-self:stretch!important;box-shadow:none!important}
.fx-ib-filters,.fx-ib-list{flex:0 0 auto!important}
.fx-ib-chat{flex:1 1 auto!important;min-width:0!important}
.fx-ib-h{font-size:11px!important;font-weight:700!important;letter-spacing:.08em!important;text-transform:uppercase!important;color:#9AA3B2!important}
.fx-ib-list input{height:40px!important;border-radius:999px!important;background:#F7FAFF!important;border:1px solid transparent!important;padding-left:38px!important}
.fx-ib-list input:focus{background:#fff!important;border-color:#24E4BB!important;box-shadow:0 0 0 3px rgba(36,228,187,.2)!important}
.fx-ib-btn{height:40px!important;border-radius:12px!important;border:1px solid #E6EAF2!important;background:#fff!important}
.fx-ib-btn:hover{background:#F6F2FF!important;border-color:#A684FF!important}
.fx-ib-row{margin:2px 8px!important;padding:12px!important;border:0!important;border-radius:14px!important;transition:background .15s}
.fx-ib-row:hover{background:#F4FCFA!important}
.fx-ib-name{font-size:14px!important;font-weight:700!important;color:#0A0E1A!important}
.fx-ib-time{font-size:11px!important;font-weight:500!important;color:#9AA3B2!important}
.fx-ib-prev{font-size:13px!important;color:#7F848D!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
img.fx-ib-av{width:44px!important;height:44px!important;border-radius:50%!important;object-fit:cover!important}
.fx-ib-tag{border-radius:6px!important}
`;
  var P='html.fx-inbox.fx-inbox body ';
  var css=R.replace(/(^|\})\s*([^{}]+)\{/g,function(m,a,sel){return a+sel.split(/,(?![^(]*\))/).map(function(x){return P+x.trim()}).join(',')+'{'});
  var st=document.createElement('style');st.id='fx-inbox-ui';st.textContent=css;(document.head||H).appendChild(st);

  var txt=function(e){return (e.textContent||'').replace(/\s+/g,' ').trim()};
  var rc=function(e){return e.getBoundingClientRect()};
  var vis=function(e){var r=rc(e);return r.width>4&&r.height>4};
  var leaves=function(e){return [].slice.call(e.querySelectorAll('*')).filter(function(x){return !x.children.length&&txt(x)})};
  var TIME=/(\d{1,2}:\d{2}\s?(AM|PM)?)|(\d{1,2}\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))|yesterday|today/i;
  var info={};
  window.__fxInboxInfo=function(){console.log('fx inbox',info);return info};

  var detect=function(){
    var root0=document.querySelector('main.el-main');if(!root0)return;
    var inp=root0.querySelector('input[placeholder^="Search" i]');
    var una=[].slice.call(root0.querySelectorAll('*')).filter(function(e){return !e.children.length&&/^(unassigned|assigned to me)$/i.test(txt(e))})[0];
    if(!inp||!una){info={found:false,reason:!inp?'no search input':'no filter labels'};return}
    var up=function(e){var a=[];for(;e&&e!==document.body;e=e.parentElement)a.push(e);return a};
    var A=up(inp),B=up(una);
    var row=A.filter(function(x){return B.indexOf(x)>-1})[0];
    /* climb until this container also holds the (wide) chat pane */
    for(var i=0;i<5&&row;i++){
      var wide=[].slice.call(row.children).some(function(c){return !c.contains(inp)&&!c.contains(una)&&rc(c).width>380});
      if(wide)break;row=row.parentElement;
    }
    if(!row||row===document.body){info={found:false,reason:'no pane row'};return}
    var kids=[].slice.call(row.children).filter(vis);
    var fp=kids.filter(function(k){return k.contains(una)})[0],lp=kids.filter(function(k){return k.contains(inp)})[0];
    var cp=kids.filter(function(k){return k!==fp&&k!==lp}).sort(function(a,b){return rc(b).width-rc(a).width})[0];
    [].forEach.call(document.querySelectorAll('.fx-ib-root,.fx-ib-pane,.fx-ib-filters,.fx-ib-list,.fx-ib-chat'),function(e){e.classList.remove('fx-ib-root','fx-ib-pane','fx-ib-filters','fx-ib-list','fx-ib-chat')});
    row.classList.add('fx-ib-root');
    if(fp&&fp!==lp){fp.classList.add('fx-ib-pane','fx-ib-filters')}
    if(lp)lp.classList.add('fx-ib-pane','fx-ib-list');
    if(cp)cp.classList.add('fx-ib-pane','fx-ib-chat');
    info={found:true,panes:[fp&&fp!==lp?'filters':null,lp?'list':null,cp?'chat':null].filter(Boolean),sameChildForFiltersAndList:fp===lp};
    /* group headings in the filters pane */
    if(fp){leaves(fp).forEach(function(l){if(/^(assigned agent|agent groups|status|channels|labels|tags|teams?)$/i.test(txt(l)))l.classList.add('fx-ib-h')})}
    /* list header controls: the buttons that sit next to the search box */
    if(lp){
      var hd=inp.parentElement;for(var k=0;k<4&&hd&&!hd.querySelector('button,.el-button');k++)hd=hd.parentElement;
      if(hd)[].forEach.call(hd.querySelectorAll('button,.el-button'),function(b){b.classList.add('fx-ib-btn')});
      rows(lp);
    }
  };
  /* conversation rows = the siblings that each contain a time stamp */
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
      r.classList.add('fx-ib-row');
      var ls=leaves(r),time=null,prev=null,name=null;
      ls.forEach(function(l){var t=txt(l);
        if(!time&&TIME.test(t)&&t.length<24){time=l;return}
        if(!prev&&/^(bot|agent|you|customer)\s*:/i.test(t)){prev=l;return}
      });
      ls.forEach(function(l){if(l!==time&&l!==prev&&!name&&txt(l).length<40)name=l});
      if(!prev){prev=ls.filter(function(l){return l!==time&&l!==name}).sort(function(a,b){return txt(b).length-txt(a).length})[0]}
      if(name)name.classList.add('fx-ib-name');if(time)time.classList.add('fx-ib-time');if(prev)prev.classList.add('fx-ib-prev');
      var im=r.querySelector('img');if(im)im.classList.add('fx-ib-av');
      [].forEach.call(r.querySelectorAll('*'),function(x){var b=rc(x);if(!x.children.length&&b.width>=8&&b.width<=22&&b.height>=8&&b.height<=22&&getComputedStyle(x).backgroundColor!=='rgba(0, 0, 0, 0)'&&!txt(x))x.classList.add('fx-ib-tag')});
    });
    info.rows=list.length;
  };

  var tog=function(){
    var on=/^#\/livechat/.test(location.hash)&&!window.__fxOff&&!/[?&#]fx=off/.test(location.href);
    if(H.classList.contains('fx-inbox')!==on)H.classList.toggle('fx-inbox',on);
    if(on&&document.body){try{detect()}catch(e){info={found:false,error:e.message}}}
  };
  tog();
  var t0=Date.now(),q=0,run=function(){cancelAnimationFrame(q);q=requestAnimationFrame(function(){if(Date.now()-t0<4000)tog();else setTimeout(tog,500)})};
  new MutationObserver(run).observe(H,{childList:true,subtree:true});
  window.addEventListener('hashchange',tog);setInterval(tog,3000);
}()}catch(e){console.error('[fx] module error',e&&e.stack||e)}


/* Choose Sub Flow cards: standalone styles, independent of the core page gate. */
(function(){
  ['fx-cards-final','fx-cards-final2','fx-cards-final3','fx-cards-final4'].forEach(function(id){var el=document.getElementById(id);if(el)el.remove()});
  var css = `
.el-dialog:has(.next-step-row) .el-dialog__body{overflow:visible!important;max-height:none!important;height:auto!important}
.el-dialog:has(.next-step-row) .el-form-item__content{display:flex!important;flex-direction:column!important;max-height:70vh!important;}
.el-dialog:has(.next-step-row) .el-form-item__content > .mb-3.el-row.is-justify-space-between{flex:0 0 auto!important;}
.el-dialog:has(.next-step-row) .el-form-item__content > .el-row:not(.el-row--flex){flex:1 1 auto!important;overflow-y:auto!important;min-height:0!important;}
.el-dialog:has(.next-step-row) .el-form-item__content > .mb-3.el-row--flex{flex:0 0 auto!important;}
.el-dialog:has(.next-step-row) .my-2.el-col.el-col-24.el-col-xs-24.el-col-sm-12.el-col-md-8.el-col-lg-6{flex:0 0 50%!important;max-width:50%!important;width:50%!important;}
.el-dialog:has(.next-step-row) .next-step-icon{display:none!important}
.el-dialog:has(.next-step-row) .next-step-row{padding:12px 16px!important;align-items:center!important;min-height:auto!important;height:auto!important}
.el-dialog:has(.next-step-row) .next-step-node{width:100%!important}
.el-dialog:has(.next-step-row) .text-ellipsis.font-weight-bold{white-space:normal!important;overflow:visible!important;text-overflow:unset!important;display:-webkit-box!important;-webkit-line-clamp:2!important;-webkit-box-orient:vertical!important;line-height:1.3!important;font-size:13px!important;}
  `;
  var tag = document.createElement('style');
  tag.id = 'fx-cards-final4';
  tag.textContent = css;
  document.head.appendChild(tag);
  console.log('✅ v4 injected — targeting the correct flex parent');
})();
