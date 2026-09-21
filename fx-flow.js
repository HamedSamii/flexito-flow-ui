// Flexito flow builder v7.5: v7.4 (canvas, step menu, dropdowns, dialogs, node panel) + Sub Flows page module
// Full replacement file. Do not load alongside an earlier fx-flow.js. The Sub Flows module (bottom of file) is inert on every other page.
// Menu previews verified by user; combined bundle requires platform smoke test.
!function(){
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
}();

/* ====================================================================================
   v7.5 module: Sub Flows page (folders rail, one-row flows, icons, labels strip, AI button)
   Self-contained: does nothing on pages that are not the Sub Flows list.
   ==================================================================================== */
!function(){
  if(window.__fxFlowsPage)return;window.__fxFlowsPage=1;
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
.fx-page .fx-folders .el-button.addbtn{position:absolute!important;top:83px;right:14px;z-index:5;width:32px;height:32px;margin:0!important;padding:0 8px!important;display:flex!important;align-items:center;justify-content:flex-start;overflow:hidden;white-space:nowrap;border:0!important;border-radius:10px!important;background:var(--m)!important;color:#04241D!important;font-size:12px!important;font-weight:700;transition:width .22s ease}
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
.fx-head .el-button.fx-ai::before{content:'';flex:none;width:16px;height:16px;background:var(--m);-webkit-mask:${spark} center/contain no-repeat;mask:${spark} center/contain no-repeat}
.fx-head .el-button.fx-ai::after{content:'${NAME}';font-size:14px;font-weight:600;line-height:1}
.fx-page .fx-head .el-button.fx-ai:hover{background:var(--m)!important;color:#04241D!important;transform:translateY(-1px)}
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

  var start=function(){
    var st=document.createElement('style');st.id='fx-flows-ui';st.textContent=css;
    (document.head||document.documentElement).appendChild(st);
    var q=0;
    var run=function(){cancelAnimationFrame(q);q=requestAnimationFrame(function(){try{tag()}catch(e){if(DEBUG)console.warn('fx flows tag failed',e)}})};
    new MutationObserver(run).observe(document.body,{childList:true,subtree:true});
    run();
  };
  if(document.body)start();else document.addEventListener('DOMContentLoaded',start);
}();
