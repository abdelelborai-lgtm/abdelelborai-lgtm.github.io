
(function(){
  // filters
  var btns=document.querySelectorAll('.filters button'), cases=document.querySelectorAll('#work .case');
  btns.forEach(function(b){b.addEventListener('click',function(){
    var f=b.dataset.f; btns.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
    cases.forEach(function(c){c.classList.toggle('hidden', f!=='all' && c.dataset.cat.split(' ').indexOf(f)<0)});
  })});
  // before / after
  document.querySelectorAll('[data-ba]').forEach(function(el){
    var r=el.querySelector('input'); var set=function(){el.style.setProperty('--pos',r.value+'%')};
    r.addEventListener('input',set); set();
  });
  // lightbox
  var figs=[].slice.call(document.querySelectorAll('.gal figure img,.variants figure img,.proof img,.cm-fig img,.hscroll img'));
  var lb=document.getElementById('lb'), im=lb.querySelector('img'), cap=lb.querySelector('.lbcap'), i=0, last=null;
  function show(n){i=(n+figs.length)%figs.length; im.src=figs[i].src; im.alt=figs[i].alt; cap.textContent=figs[i].alt}
  figs.forEach(function(f,n){f.parentNode.tabIndex=0; f.parentNode.setAttribute('role','button'); f.parentNode.setAttribute('aria-label','Enlarge: '+f.alt);
    var open=function(){last=f.parentNode; show(n); lb.classList.add('open'); lb.querySelector('.x').focus()};
    f.parentNode.addEventListener('click',open);
    f.parentNode.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
  });
  function close(){lb.classList.remove('open'); if(last) last.focus()}
  lb.querySelector('.x').onclick=close; lb.querySelector('.pv').onclick=function(){show(i-1)}; lb.querySelector('.nx').onclick=function(){show(i+1)};
  lb.addEventListener('click',function(e){if(e.target===lb)close()});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return; if(e.key==='Escape')close(); if(e.key==='ArrowLeft')show(i-1); if(e.key==='ArrowRight')show(i+1)});
  // copy
  document.querySelectorAll('[data-copy]').forEach(function(b){b.addEventListener('click',function(){
    var t=b.textContent; var done=function(){b.textContent='Copied'; setTimeout(function(){b.textContent=t},1600)};
    try{navigator.clipboard.writeText(b.dataset.copy).then(done,function(){b.textContent='Select & copy'})}catch(e){b.textContent='Select & copy'}
  })});
})();


(function(){
  var RM=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE=window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var nav=document.querySelector('.nav');
  // mobile menu
  var mb=document.querySelector('.menu-btn');
  if(mb){mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
    nav.querySelectorAll('ul a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');mb.setAttribute('aria-expanded','false')})});}
  // progress + back to top
  var bar=document.querySelector('.progress'), top=document.querySelector('.totop');
  function onScroll(){var h=document.documentElement;var p=h.scrollTop/(h.scrollHeight-h.clientHeight||1);bar&&bar.style.setProperty('--p',p.toFixed(4));top&&top.classList.toggle('show',h.scrollTop>900)}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  top&&top.addEventListener('click',function(){window.scrollTo({top:0,behavior:RM?'auto':'smooth'})});
  // scrollspy
  var links=[].slice.call(document.querySelectorAll('.nav ul a[href^="#"]'));
  var map={};links.forEach(function(a){var s=document.querySelector(a.getAttribute('href'));if(s)map[s.id]=a});
  if('IntersectionObserver' in window){
    var spy=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.remove('active')});map[e.target.id]&&map[e.target.id].classList.add('active')}})},{rootMargin:'-45% 0px -50% 0px'});
    Object.keys(map).forEach(function(id){spy.observe(document.getElementById(id))});
  }
  if(RM) return;
  // headline words
  var h1=document.querySelector('.hero h1');
  if(h1){var i=0;[].slice.call(h1.childNodes).forEach(function(n){
    if(n.nodeType===3){var f=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(function(t){if(!t)return;if(/^\s+$/.test(t)){f.appendChild(document.createTextNode(t));return}var s=document.createElement('span');s.className='w';s.style.setProperty('--i',i++);s.textContent=t;f.appendChild(s)});h1.replaceChild(f,n)}
    else if(n.nodeType===1){var w=n.textContent.split(/\s+/);n.textContent='';w.forEach(function(t,k){var s=document.createElement('span');s.className='w';s.style.setProperty('--i',i++);s.textContent=t;n.appendChild(s);if(k<w.length-1)n.appendChild(document.createTextNode(' '))})}
  })}
  // hero spotlight + parallax
  var hero=document.querySelector('.hero'),sa=document.querySelector('.shot-a'),sb=document.querySelector('.shot-b');
  if(hero&&FINE){hero.addEventListener('mousemove',function(e){var r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    hero.style.setProperty('--mx',(x*100)+'%');hero.style.setProperty('--my',(y*100)+'%');
    if(sa)sa.style.transform='rotate(3deg) translate('+((x-.5)*-22)+'px,'+((y-.5)*-16)+'px)';
    if(sb)sb.style.transform='rotate(-5deg) translate('+((x-.5)*26)+'px,'+((y-.5)*18)+'px)';})}
  // reveal
  var sel='.xcard,.pcard,.lstep,.wins li,.ba-home,.phero-kpis .mini-stat,.auto,.band-grid>div,.cm-fig,.dojo-card,.logo-row,.hs-head,.stat,.disc>div,.case,.ba-case,.build,.mb-row,.mini-stat,.deliv>div,.cycle>div,.mgmt>div,.flow>div,.tgroup,.job,.edu>div,.reel,.org .node,.engine .src,.engine .hub,.engine .out>div,.bench>div,.quote,.serp,.ai-cite,.c-row,.c-img,.tw-top>div:first-child,.label,.note,.stage';
  var els=[].slice.call(document.querySelectorAll(sel));
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});
  var groups=new Map();
  els.forEach(function(el){if(el.getBoundingClientRect().top<window.innerHeight*0.92)return;
    var p=el.parentElement,k=groups.get(p)||0;groups.set(p,k+1);el.style.setProperty('--d',Math.min(k,6)*80+'ms');el.classList.add('rv');io.observe(el)});
  // count up
  function countUp(el){var raw=el.textContent;var m=raw.match(/-?\d[\d,]*\.?\d*/);if(!m||el.dataset.done)return;el.dataset.done=1;
    var str=m[0],val=parseFloat(str.replace(/,/g,'')),dec=(str.split('.')[1]||'').length,pre=raw.slice(0,m.index),suf=raw.slice(m.index+str.length),t0=null,dur=1400;
    function fmt(v){var s=v.toFixed(dec);if(str.indexOf(',')>-1)s=Number(s).toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec});return pre+s+suf}
    function step(ts){if(!t0)t0=ts;var k=Math.min((ts-t0)/dur,1),e=1-Math.pow(1-k,3);el.textContent=fmt(val*e);if(k<1)requestAnimationFrame(step);else el.textContent=raw}
    requestAnimationFrame(step)}
  var co=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){countUp(e.target);co.unobserve(e.target)}})},{threshold:.6});
  document.querySelectorAll('.stat .n,.kpi b,.mini-stat .big,.result .big,.band .bn,.dojo-txt .big').forEach(function(el){co.observe(el)});
  // spotlight + tilt cards
  var cards=[].slice.call(document.querySelectorAll('.lstep,.pcard,.auto,.build,.mini-stat,.tgroup,.stage,.deliv>div,.cycle>div,.disc>div,.card,.ai-cite,.board,.kpi'));
  cards.forEach(function(c){c.classList.add('glow')});
  if(FINE){
    document.addEventListener('mousemove',function(e){var c=e.target.closest&&e.target.closest('.glow');if(!c)return;var r=c.getBoundingClientRect();c.style.setProperty('--x',(e.clientX-r.left)+'px');c.style.setProperty('--y',(e.clientY-r.top)+'px')},{passive:true});
    document.querySelectorAll('.auto,.build,.mini-stat,.board,.reel,.dojo-card').forEach(function(c){
      var amp=c.classList.contains('board')?4:6;
      c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(900px) rotateX('+(-y*amp)+'deg) rotateY('+(x*amp)+'deg) translateY(-3px)'});
      c.addEventListener('mouseleave',function(){c.style.transform=''})});
    // magnetic buttons
    document.querySelectorAll('.btn').forEach(function(b){b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.18)+'px,'+((e.clientY-r.top-r.height/2)*.28)+'px)'});b.addEventListener('mouseleave',function(){b.style.transform=''})});
    // cursor
    var cur=document.querySelector('.cur'),cx=0,cy=0,tx=0,ty=0;
    document.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;cur.classList.add('on');
      var t=e.target;cur.className='cur on';cur.textContent='';
      if(t.closest('.ba')){cur.classList.add('big');cur.textContent='Drag'}
      else if(t.closest('.hscroll')){cur.classList.add('big');cur.textContent='Drag'}
      else if(t.closest('.gal figure,.variants figure,.proof,.cm-fig')){cur.classList.add('big');cur.textContent='View'}
      else if(t.closest('.xcard,.pcard,.pcap')){cur.classList.add('big');cur.textContent='Open'}
      else if(t.closest('.reel')){cur.classList.add('big');cur.textContent='Play'}
      else if(t.closest('a,button,input,label')){cur.classList.add('link')}},{passive:true});
    document.addEventListener('mouseleave',function(){cur.classList.remove('on')});
    (function loop(){cx+=(tx-cx)*.2;cy+=(ty-cy)*.2;cur.style.transform='translate('+cx+'px,'+cy+'px)';requestAnimationFrame(loop)})();
  }
  // before/after peek
  var po=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;po.unobserve(e.target);var ba=e.target,r=ba.querySelector('input'),touched=false;
    r.addEventListener('pointerdown',function(){touched=true},{once:true});
    var keys=[[0,50],[500,24],[1100,76],[1600,50]],t0=null;
    function f(ts){if(touched)return;if(!t0)t0=ts;var t=ts-t0,v=50;for(var i=1;i<keys.length;i++){if(t<=keys[i][0]){var a=keys[i-1],b=keys[i],k=(t-a[0])/(b[0]-a[0]);k=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;v=a[1]+(b[1]-a[1])*k;break}v=keys[keys.length-1][1]}
      r.value=v;ba.style.setProperty('--pos',v+'%');if(t<1600)requestAnimationFrame(f)}
    setTimeout(function(){requestAnimationFrame(f)},300)})},{threshold:.55});
  document.querySelectorAll('[data-ba]').forEach(function(b){po.observe(b)});
  // filter fade
  document.querySelectorAll('.filters button').forEach(function(b){b.addEventListener('click',function(){document.querySelectorAll('#work .case:not(.hidden)').forEach(function(c){c.classList.add('fading');c.classList.remove('rv');setTimeout(function(){c.classList.remove('fading')},30)})})});
})();


(function(){
  var hs=document.querySelector('.hscroll'); if(!hs) return;
  function step(d){var f=hs.querySelector('figure');var w=f?f.getBoundingClientRect().width+12:300;hs.scrollBy({left:d*w*2,behavior:'smooth'})}
  var p=document.querySelector('.hs-prev'),n=document.querySelector('.hs-next');
  p&&p.addEventListener('click',function(){step(-1)}); n&&n.addEventListener('click',function(){step(1)});
  var down=false,sx=0,sl=0,moved=0;
  hs.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=0;sx=e.clientX;sl=hs.scrollLeft;hs.classList.add('drag')});
  window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;moved=Math.max(moved,Math.abs(dx));hs.scrollLeft=sl-dx});
  window.addEventListener('pointerup',function(){if(!down)return;down=false;hs.classList.remove('drag')});
  hs.addEventListener('click',function(e){if(moved>6){e.stopPropagation();e.preventDefault()}},true);
  hs.addEventListener('keydown',function(e){if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1)});
})();
