// MOUSE GLOW
const glow=document.getElementById('mouse-glow');
document.addEventListener('mousemove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';});

// PROGRESS + NAV
window.addEventListener('scroll',()=>{
  const pct=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight))*100;
  document.getElementById('progress').style.width=pct+'%';
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>50);
});

// REVEAL
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      e.target.querySelectorAll('.counter').forEach(animCounter);
    }
  });
},{threshold:0.08});
document.querySelectorAll('.reveal,.reveal-l').forEach(el=>obs.observe(el));

// COUNTER
function animCounter(el){
  if(el.dataset.done)return;el.dataset.done=true;
  const t=parseInt(el.dataset.target);let c=0;
  const iv=setInterval(()=>{c+=t/50;if(c>=t){c=t;clearInterval(iv);}el.textContent=Math.floor(c)+(el.dataset.suffix||'');},20);
}
// Trigger hero counters on load
setTimeout(()=>document.querySelectorAll('.counter').forEach(animCounter),1200);

// TYPEWRITER
const roles=["Data Analyst","BI Engineer","Dashboard Specialist","Analytics Expert","Data Storyteller"];
let ri=0,ci=0,deleting=false;
function type(){
  const tw=document.getElementById('typewriter');
  const role=roles[ri];
  if(!deleting){tw.textContent=role.slice(0,ci+1);ci++;if(ci===role.length){setTimeout(()=>{deleting=true;setTimeout(type,80);},1800);return;}}
  else{tw.textContent=role.slice(0,ci-1);ci--;if(ci===0){deleting=false;ri=(ri+1)%roles.length;}}
  setTimeout(type,deleting?50:80);
}
setTimeout(type,1400);

// 3D TILT
document.querySelectorAll('.tilt').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5;
    const y=(e.clientY-r.top)/r.height-0.5;
    card.style.transform=`perspective(600px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave',()=>{card.style.transform='';});
});

// FORM
async function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const ok = document.getElementById('fOK');
  const err = document.getElementById('fErr');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  ok.style.display = 'none';
  err.style.display = 'none';
  try {
    const res = await fetch('https://formspree.io/f/xojrzekg', {
      method: 'POST',
      body: new FormData(e.target),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      ok.style.display = 'block';
      e.target.reset();
      btn.textContent = 'Send Message ✦';
      btn.disabled = false;
    } else { throw new Error('Failed'); }
  } catch {
    err.style.display = 'block';
    btn.textContent = 'Send Message ✦';
    btn.disabled = false;
  }
}
