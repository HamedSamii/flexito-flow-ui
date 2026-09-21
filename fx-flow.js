// Flexito flow builder v7.3: existing nodes/links + approved compact step menu, dropdowns and dialogs
// Full replacement file. Do not load alongside an earlier fx-flow.js.
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
/* Canvas controls retained; experimental node-panel styles excluded. Dialog styles added in v7.3. */
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
