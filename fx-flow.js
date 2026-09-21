// 11: flow builder look (canvas / nodes / links)
!function(){
  if(window.__fxFlow)return;window.__fxFlow=1;
  var ICON_SQUARES=true; /* false = keep the original round icons */

  var st=document.createElement('style');st.id='fx-flow';
  st.textContent='.flowbuilder-diagram{background:radial-gradient(rgba(15,23,42,.10) 1.4px,transparent 1.4px) 0 0/26px 26px,linear-gradient(160deg,#F4FBF8,#F7F9FF)!important}';
  (document.head||document.documentElement).appendChild(st);

  var get=function(){
    if(typeof go==='undefined')return null;
    var el=document.querySelector('.flowbuilder-diagram');
    return el?go.Diagram.fromDiv(el):null;
  };
  var tint=function(c,a){
    var m=/^#?([0-9a-f]{6})$/i.exec(c);if(!m)return c;
    var n=parseInt(m[1],16);
    return 'rgba('+(n>>16)+','+((n>>8)&255)+','+(n&255)+','+a+')';
  };
  var accent=function(n){
    if(n.__acc)return n.__acc;
    var a=null,ci=null;
    var f=function(o){
      if(!a&&o instanceof go.Shape&&o.figure==='Circle'&&typeof o.fill==='string'&&o.fill[0]==='#'){a=o.fill;ci=o}
      if(!a&&o instanceof go.Panel)o.elements.each(f);
    };
    f(n);n.__circ=ci;return(n.__acc=a||'#6366f1');
  };
  var card=function(o,c){
    var h=Math.max(o.actualBounds.height,40);
    if(o.__h!==h||o.__c!==c){
      var b=new go.Brush(go.Brush.Linear);b.start=go.Spot.Top;b.end=go.Spot.Bottom;
      var s=Math.min(.12,4/h);
      [[0,c],[s,c],[s+.001,'#fff'],[1,'#fff']].forEach(function(x){b.addColorStop(x[0],x[1])});
      o.fill=b;o.__h=h;o.__c=c;
    }
    o.parameter1=16;o.stroke='rgba(15,23,42,.06)';if(!o.strokeWidth)o.strokeWidth=1;
  };
  var styleNode=function(n){
    var c=accent(n);
    var sel=n.findObject('SHAPE');if(sel)sel.parameter1=20;
    var walk=function(o){
      if(o instanceof go.TextBlock){
        o.shadowVisible=false;
        if(o.__lbl||String(o.stroke).toLowerCase()==='#ffffff'){o.__lbl=true;o.stroke='#1E293B'}
      }
      if(o instanceof go.Shape&&o.figure==='RoundedRectangle'&&(o.__card||String(o.fill).toLowerCase()==='#ffffff')){o.__card=true;card(o,c)}
      if(o instanceof go.Panel)o.elements.each(walk);
    };
    walk(n);
    n.isShadowed=true;n.shadowColor='rgba(15,23,42,.14)';n.shadowBlur=24;n.shadowOffset=new go.Point(0,10);
    var ic=n.__circ;
    if(ICON_SQUARES&&ic){
      ic.figure='RoundedRectangle';ic.parameter1=Math.max(10,ic.actualBounds.width*.3);
      ic.fill=tint(c,.16);ic.stroke=tint(c,.35);if(!ic.strokeWidth)ic.strokeWidth=1.5;
      ic.panel.elements.each(function(g){if(g instanceof go.Shape&&g!==ic&&g.figure==='None')g.fill=c});
    }
  };
  var styleLink=function(l){
    var c=l.fromNode?accent(l.fromNode):'#94a3b8';
    l.elements.each(function(o){
      if(!(o instanceof go.Shape))return;
      if(o===l.path){o.stroke=c;o.strokeWidth=2.5;o.strokeDashArray=[7,6]}
      else{o.toArrow='Circle';o.fill='#fff';o.stroke=c;o.strokeWidth=2;o.strokeDashArray=null}
    });
  };
  var tick=function(){
    var d=get();if(!d)return;
    d.skipsUndoManager=true;
    d.nodes.each(styleNode);
    d.links.each(styleLink);
    d.skipsUndoManager=false;
  };
  setInterval(tick,800);tick();
}();
