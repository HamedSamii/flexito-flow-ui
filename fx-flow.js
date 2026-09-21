// Flexito flow builder v6.5: compact cards, icon tile + title, dotted links with a travelling dot
!function(){
  if(window.__fxSoft6)return;window.__fxSoft6=1;
  var TEXT='#1E293B',RADIUS=10,STRIPE=3.5,LINK_W=3.6,DOT=14;   /* LINK_W = line thickness (2.4 thin, 3.6 medium, 4.5 bold) | DOT = travelling dot size */
  var GAP=Math.round(LINK_W*2.5*10)/10, RING=Math.max(2,LINK_W*.7);   /* dot spacing + end rings follow the thickness */
  var PORT=14;               /* size of the visible connection circles (ports) */
  var PORT_RINGS=true;       /* true = visible ring ports on nodes (drag from them to connect) | false = hidden ports */
  var ICON_TILE=true;        /* small tinted icon tile next to the title */
  var ANIMATE=true;          /* travelling dot on every link */
  var PINGPONG=true;         /* true = goes and comes back | false = one direction */
  var PERIOD=3600;           /* ms for one full cycle */

  var css=
   '.flowbuilder-diagram{background:radial-gradient(900px 520px at 0% 0%,#E6FAF2,transparent 65%),radial-gradient(800px 480px at 100% 100%,#EAF0FF,transparent 65%),#F8FBFD!important}'+
   '.main-flow-builder .flowbuilder-tip{background:#fff!important;color:#64748B!important;font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;border-radius:0 0 14px 14px;box-shadow:0 8px 20px -10px rgba(15,23,42,.30)}'+
   '.main-flow-builder .flowbuilder-actions{background:transparent!important}'+
   '.main-flow-builder .flowbuilder-actions .el-button{border-radius:999px!important;font-weight:600;box-shadow:0 8px 18px -8px rgba(15,23,42,.35)}'+
   '.main-flow-builder .flowbuilder-control-bar>div{border-radius:18px!important;border:1px solid rgba(15,23,42,.06);box-shadow:0 12px 30px -12px rgba(15,23,42,.28)}'+
   '.main-flow-builder .flowbuilder-control-bar .el-button{border-radius:12px!important}'+
   '.main-flow-builder .flowbuilder-control-bar .el-button:hover{background:rgba(128,128,128,.14)!important}'+
   '.main-flow-builder #myOverviewDiv{background:#fff!important;border-radius:18px;overflow:hidden;border:1px solid rgba(15,23,42,.06);box-shadow:0 12px 30px -12px rgba(15,23,42,.28)}'+
   '.main-flow-builder .el-popover.el-popper{border:0!important;border-radius:20px!important;box-shadow:0 22px 50px -18px rgba(15,23,42,.38)!important}'+
   '.main-flow-builder .node-viewer{border-radius:24px 0 0 24px;overflow:hidden;box-shadow:-14px 0 40px -20px rgba(15,23,42,.30)}'+
   '.main-flow-builder .node-viewer .el-card{border-radius:16px!important;border:1px solid rgba(15,23,42,.06)!important;box-shadow:none!important}'+
   '.main-flow-builder .node-viewer .el-input__inner,.main-flow-builder .node-viewer .el-textarea__inner{border-radius:12px!important}'+
   '.main-flow-builder .node-viewer .el-button{border-radius:999px!important;font-weight:600}'+
   '.main-flow-builder .el-dialog:not(.is-fullscreen){border-radius:24px!important;overflow:hidden}'+
   '.main-flow-builder .el-dialog .el-button{border-radius:999px!important}';
  var st=document.createElement('style');st.id='fx-soft6';st.textContent=css;
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
    var A=kids(n).filter(isP)[0];if(!A){console.log('fx: no inner panel in node type',JSON.stringify(n.category||''));return}
    var ab=kids(A).filter(isP),hd=ab[0],cd=ab[1];
    if(!hd||!cd){console.log('fx: header/card not found in node type',JSON.stringify(n.category||''));return}
    var content=kids(cd).filter(isP)[0];if(!content){console.log('fx: no content panel in node type',JSON.stringify(n.category||''));return}
    var txt=null;var f=function(o){if(!txt&&o instanceof go.TextBlock)txt=o;if(o instanceof go.Panel)o.elements.each(f)};f(hd);
    if(!txt||!txt.panel||!txt.panel.panel){console.log('fx: name panel not found in node type',JSON.stringify(n.category||''));return}
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

  setTimeout(function(){var d=get();if(!d)return;var vis=0;d.links.each(function(l){if(l.actualBounds.width>2||l.actualBounds.height>2)vis++});
    var cats={};d.nodes.each(function(n){var k=n.category||'(default)';cats[k]=(cats[k]||0)+1});
    console.log('fx diag: nodes',d.nodes.count,'| links',d.links.count,'| links with size',vis,'| types',JSON.stringify(cats))},3000);
}();
