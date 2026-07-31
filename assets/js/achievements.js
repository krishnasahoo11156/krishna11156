/**
 * Krishna Sahoo Portfolio - Achievements v4.0
 * Editorial Three-Column Vertical Infinite Gallery
 *
 * 1.  DATA LAYER          - ACHIEVEMENTS_DATA (14 entries)
 * 2.  GALLERY STATE       - GS singleton
 * 3.  GALLERY RENDERER    - createCardHtml / renderGallery (DOM cloning)
 * 4.  GALLERY ENGINE      - measureAndStart / galleryLoop (RAF)
 * 5.  INTERACTION MGR     - hover, magnetic mouse, ambient light
 * 6.  RADIAL SELECTOR     - RADIAL_CATEGORIES / initRadialSelector
 * 7.  FILTER MGR          - applyFilter
 * 8.  COUNTER ANIMATIONS  - initCounters / animateCounter (easeOutQuart)
 * 9.  PORTAL CONTROLLER   - setupPortalZoom / openPortalFlip (FLIP)
 * 10. RECENTLY EARNED     - initRecentlyEarned
 * 11. GALLERY REVEAL      - IntersectionObserver
 * 12. SCROLL VELOCITY     - scroll boost with decay
 * 13. VISIBILITY API      - pause RAF when tab hidden
 * 14. RESIZE HANDLER
 * 15. BOOTSTRAP
 */

/* ============================================================
   1. DATA LAYER
   col 1 (up):   aws-devops, cn-hackaithon, gcp-pubsub, gcp-compute, gcp-genai-studio
   col 2 (down): unimerge(H), syrus(H), gcp-partner, vibe2ship(H+recent), gcp-prompt
   col 3 (up):   gcp-networking, gemini-streamlit, gcp-monitoring, gcp-data
   Heights: S=230 M=290 L=375 H=410
   ============================================================ */
const ACHIEVEMENTS_DATA = [
  {id:'aws-devops-cert',col:1,filterKey:'cloud',category:'Cloud & Infrastructure',title:'Fundamentals of DevOps on AWS',issuer:'Amazon Web Services (AWS)',date:'May 2026',desc:'Verified expertise in configuring cloud architectures, automating deployments via AWS pipelines, designing CI/CD environments, and security configurations.',tech:['AWS EC2','AWS CodePipeline','IAM Policies','CloudWatch'],image:'sources/certificates/fundamentals of devops on aws.png',verifyUrl:'https://aws.amazon.com/',accent:'#f1c40f',hero:false,rotation:0,cardHeight:245},
  {id:'cn-hackaithon',col:1,filterKey:'hackathon',category:'National Hackathon Win',title:'Coding Ninjas Hackaithon (ForeSee)',issuer:'Coding Ninjas & Google for Developers',date:'June 2026',desc:'Built ForeSee, a predictive calendar tool using Monte Carlo task simulations and event-driven agents over Pub/Sub, competing against 3,000+ developers.',tech:['Next.js 14','Google Cloud Pub/Sub','Monte Carlo Simulator','Docker'],image:'sources/certificates/hackaithoncertificate.png',verifyUrl:'https://github.com/krishnasahoo11156/foresee-app-2026',accent:'#00f2fe',hero:false,rotation:0,cardHeight:318},
  {id:'gcp-pubsub',col:1,filterKey:'cloud',category:'Google Cloud Badge',title:'Get Started with Pub/Sub',issuer:'Google Cloud Skills Boost',date:'July 2026',desc:'Validated operational competence in configuring Google Cloud Pub/Sub message topics, subscriptions, push/pull configurations, and event orchestration.',tech:['Google Cloud Pub/Sub','Cloud Functions','Event Architecture'],image:'sources/certificates/get-started-with-pub-sub-skill-badge.png',verifyUrl:'https://www.cloudskillsboost.google/',accent:'#0984e3',hero:false,rotation:0,cardHeight:195},
  {id:'gcp-compute',col:1,filterKey:'cloud',category:'Google Cloud Badge',title:'The Basics of Google Cloud Compute',issuer:'Google Cloud Skills Boost',date:'July 2026',desc:'Certified in creating virtual machines, configuring GKE deployments, managing persistent disks, and auto-scaling server configurations.',tech:['Google Compute Engine','GKE','Docker Containers'],image:'sources/certificates/the-basics-of-google-cloud-compute-skill-badge.png',verifyUrl:'https://www.cloudskillsboost.google/',accent:'#3498db',hero:false,rotation:0,cardHeight:245},
  {id:'gcp-genai-studio',col:1,filterKey:'cloud',category:'Google Cloud Badge',title:'Intro to Generative AI Studio',issuer:'Google Cloud Skills Boost',date:'July 2026',desc:'Verified foundational prompt design, image generation parameters, speech synthesis, and playground iterations inside Google Cloud Generative AI Studio.',tech:['Generative AI Studio','Imagen','Speech-to-Text','Model Tuning'],image:'sources/certificates/introduction to generative ai studio.png',verifyUrl:'https://www.cloudskillsboost.google/',accent:'#fd79a8',hero:false,rotation:0,cardHeight:245},
  {id:'unimerge-win',col:2,filterKey:'hackathon',category:'Hackathon Winner',title:'Winner - UniMerge 1.0 (StudySync)',issuer:'parth.builds Developer Community',date:'April 2026',desc:'1st place at UniMerge 1.0 for StudySync, an academic dashboard with a dynamic Web Audio synthesis system generating native environmental soundscapes.',tech:['React.js','Tailwind CSS','Web Audio API','Firebase'],image:'sources/certificates/unimergecertificate.png',verifyUrl:'https://github.com/krishnasahoo11156/StudySync',accent:'#2ecc71',hero:true,rotation:0,cardHeight:348},
  {id:'syrus-hackathon',col:2,filterKey:'hackathon',category:'Hackathon Runner-Up',title:"Codecell's Syrus 2026 Hackathon",issuer:'Codecell · VESIT Mumbai',date:'June 2026',desc:'AI-powered employee onboarding platform with local Node.js system monitors to automate developer environment verification.',tech:['Next.js App Router','TypeScript','Tailwind CSS 4','Gemini AI'],image:"sources/certificates/codecell's-syrus-hackathon.png",verifyUrl:'https://github.com/krishnasahoo11156/crisissync',accent:'#a55eea',hero:true,rotation:0,cardHeight:348},
  {id:'gcp-partner',col:2,filterKey:'cloud',category:'Google Cloud Badge',title:'Google Cloud Partner Training',issuer:'Google Cloud',date:'July 2026',desc:'Verified foundational cloud business knowledge, enterprise integration strategies, and core GCP infrastructure capabilities.',tech:['GCP Infrastructure','Enterprise Cloud','Partner Systems'],image:'sources/certificates/image.png',verifyUrl:'https://www.cloudskillsboost.google/',accent:'#6c5ce7',hero:false,rotation:0,cardHeight:245},
  {id:'vibe2ship-hackathon',col:2,filterKey:'hackathon',category:'Vibe Coding Hackathon',title:"Vibe2Ship - Coding Ninjas x Google",issuer:'Coding Ninjas x Google for Developers',date:'July 2026',desc:"Participated in India's Biggest Vibe Coding Hackathon, building innovative AI-powered solutions in collaboration with Google for Developers.",tech:['AI Solutions','LLMs','Vibe Coding','Google Cloud'],image:'sources/certificates/image copy.png',verifyUrl:'https://drive.google.com/file/d/1aP7bKCEksmjPV_9y7-BzYxbuoq4SHZhs/view',accent:'#ff6b4a',hero:true,isRecent:true,rotation:0,cardHeight:348},
  {id:'gcp-prompt',col:2,filterKey:'cloud',category:'AI Engineering',title:'Prompt Design in Vertex AI',issuer:'Google Cloud Skills Boost',date:'July 2026',desc:'Certified in building and evaluating prompts on Vertex AI, parameter tuning, and multimodal inference structures.',tech:['Vertex AI','Prompt Engineering','Multimodal LLMs','Inference Controls'],image:'sources/certificates/prompt-design-in-vertex-ai-skill-badge.png',verifyUrl:'https://www.cloudskillsboost.google/',accent:'#e74c3c',hero:false,rotation:0,cardHeight:245},
  {id:'gcp-networking',col:3,filterKey:'cloud',category:'Google Cloud Badge',title:'Set Up a Google Cloud Network',issuer:'Google Cloud Skills Boost',date:'July 2026',desc:'Earned skill badge verifying VPC architectures, subnetting, firewall configurations, and external load balancing policies.',tech:['VPC Networks','Firewall Rules','GCP Load Balancers'],image:'sources/certificates/set-up-a-google-cloud-network-skill-badge.png',verifyUrl:'https://www.cloudskillsboost.google/',accent:'#1abc9c',hero:false,rotation:0,cardHeight:195},
  {id:'gemini-streamlit',col:3,filterKey:'cloud',category:'Generative AI Systems',title:'Develop GenAI Apps with Gemini',issuer:'Google Cloud Skills Boost',date:'July 2026',desc:'Skill badge validating prompt contexts, Streamlit frontend design, and connecting generative LLM APIs on Google Cloud.',tech:['Gemini Pro API','Streamlit','Python','GCP Console'],image:'sources/certificates/develop-genai-apps-with-gemini-and-streamlit-skill-.png',verifyUrl:'https://www.cloudskillsboost.google/',accent:'#8e75b2',hero:false,rotation:0,cardHeight:245},
  {id:'gcp-monitoring',col:3,filterKey:'cloud',category:'Google Cloud Badge',title:'Monitoring in Google Cloud',issuer:'Google Cloud Skills Boost',date:'July 2026',desc:'Skill badge validating resource monitoring setups, dashboard construction, alert routing, and system health evaluation.',tech:['Cloud Monitoring','Cloud Logging','Error Reporting','Alerting'],image:'sources/certificates/monitoring-in-google-cloud-skill-badge.png',verifyUrl:'https://www.cloudskillsboost.google/',accent:'#e67e22',hero:false,rotation:0,cardHeight:318},
  {id:'gcp-data',col:3,filterKey:'cloud',category:'Google Cloud Badge',title:'Store, Process & Manage Data on GCP',issuer:'Google Cloud Skills Boost',date:'July 2026',desc:'Certified in data processing architectures, loading datasets, managing BigQuery pipelines, and Cloud Storage schemas.',tech:['BigQuery','Cloud Storage','Cloud SQL','Dataproc'],image:'sources/certificates/store-process-and-manage-data-on-google-cloud-conso.png',verifyUrl:'https://www.cloudskillsboost.google/',accent:'#2c3e50',hero:false,rotation:0,cardHeight:245},
];

/* ============================================================
   2. GALLERY STATE
   ============================================================ */
const GS = {
  isPortalOpen:false, pausedCols:new Set(), scrollVelocity:0,
  lastScrollY:typeof window!=='undefined'?window.scrollY:0,
  offsets:[0,0,0], singleSetHeights:[0,0,0],
  activeFilter:'all', countersAnimated:false, revealDone:false, rafId:null,
  reducedMotion:typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches,
};
const COL_SPEEDS=[0.52,0.42,0.58];
const COL_DIRS=['up','down','up'];
const COL_STAGGER=[24,0,40];
const MAX_SCROLL_MULT=1.6;
const SCROLL_DECAY=0.92;

/* ============================================================
   3. GALLERY RENDERER
   ============================================================ */
function createCardHtml(ach){
  const hc=ach.hero?' ach-card--hero':'';
  const rc=ach.isRecent?' ach-card--recent':'';
  const rr=ach.isRecent?'<div class="ach-card-recent-ribbon">Recent</div>':'';
  const title=ach.title.replace(/"/g,'&quot;');
  return `<div class="ach-card${hc}${rc}" data-id="${ach.id}" data-filter="${ach.filterKey}" style="height:${ach.cardHeight}px;--rotation:${ach.rotation}deg;--accent:${ach.accent}" role="button" tabindex="0" aria-label="Open details for ${title}">${rr}<div class="ach-card-meta"><span class="ach-card-category">${ach.category}</span></div><div class="ach-card-title">${ach.title}</div><div class="ach-card-visual"><img src="${ach.image}" alt="${title}" class="ach-card-img" loading="lazy"></div><div class="ach-card-footer"><span class="ach-card-issuer">${ach.issuer}</span><span class="ach-card-date">${ach.date}</span></div><div class="ach-card-inspect">View</div></div>`;
}
function renderGallery(){
  [1,2,3].forEach(colNum=>{
    const data=ACHIEVEMENTS_DATA.filter(a=>a.col===colNum);
    const track=document.getElementById(`ach-col-${colNum}-track`);
    if(!track)return;
    track.innerHTML=data.map(createCardHtml).join('');
    const orig=[...track.children];
    for(let c=0;c<2;c++){
      orig.forEach(card=>{
        const clone=card.cloneNode(true);
        clone.setAttribute('aria-hidden','true');
        clone.tabIndex=-1;
        track.appendChild(clone);
      });
    }
  });
}

/* ============================================================
   4. GALLERY ENGINE (RAF)
   ============================================================ */
function measureAndStart(){
  [1,2,3].forEach((colNum,idx)=>{
    const track=document.getElementById(`ach-col-${colNum}-track`);
    if(!track)return;
    GS.singleSetHeights[idx]=track.scrollHeight/3;
    if(COL_DIRS[idx]==='down'){
      GS.offsets[idx]=-GS.singleSetHeights[idx]+COL_STAGGER[idx];
    }else{
      GS.offsets[idx]=COL_STAGGER[idx];
    }
  });
  if(!GS.reducedMotion){
    GS.rafId=requestAnimationFrame(galleryLoop);
  }else{
    [1,2,3].forEach((_,idx)=>{
      const t=document.getElementById(`ach-col-${idx+1}-track`);
      if(t)t.style.transform=`translate3d(0,${GS.offsets[idx]}px,0)`;
    });
  }
}
function galleryLoop(){
  if(!GS.isPortalOpen){
    GS.scrollVelocity*=SCROLL_DECAY;
    if(Math.abs(GS.scrollVelocity)<0.01)GS.scrollVelocity=0;
    for(let idx=0;idx<3;idx++){
      if(GS.pausedCols.has(idx))continue;
      const h=GS.singleSetHeights[idx];
      if(h===0)continue;
      const base=COL_SPEEDS[idx];
      const boost=Math.min(Math.abs(GS.scrollVelocity)*0.05,base*(MAX_SCROLL_MULT-1));
      const speed=base+boost;
      if(COL_DIRS[idx]==='up'){
        GS.offsets[idx]-=speed;
        if(GS.offsets[idx]<=-h)GS.offsets[idx]+=h;
      }else{
        GS.offsets[idx]+=speed;
        if(GS.offsets[idx]>=0)GS.offsets[idx]-=h;
      }
      const track=document.getElementById(`ach-col-${idx+1}-track`);
      if(track)track.style.transform=`translate3d(0,${GS.offsets[idx]}px,0)`;
    }
  }
  GS.rafId=requestAnimationFrame(galleryLoop);
}

/* ============================================================
   5. INTERACTION MANAGER
   ============================================================ */
function setupInteractions(){
  [1,2,3].forEach((colNum,idx)=>{
    const col=document.getElementById(`ach-col-${colNum}`);
    if(!col)return;
    col.addEventListener('mousemove',e=>{
      const r=col.getBoundingClientRect();
      col.style.setProperty('--col-mx',((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
      col.style.setProperty('--col-my',((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
      const hc=col.querySelector('.ach-card--hovered');
      if(hc){
        const cr=hc.getBoundingClientRect();
        const mx=(e.clientX-cr.left-cr.width/2)/cr.width*12;
        const my=(e.clientY-cr.top-cr.height/2)/cr.height*12;
        hc.style.setProperty('--mx',Math.max(-6,Math.min(6,mx))+'px');
        hc.style.setProperty('--my',Math.max(-6,Math.min(6,my))+'px');
      }
    },{passive:true});
    col.addEventListener('mouseover',e=>{
      const card=e.target.closest('.ach-card');
      if(!card)return;
      const prev=col.querySelector('.ach-card--hovered');
      if(prev&&prev!==card){prev.classList.remove('ach-card--hovered');prev.style.removeProperty('--mx');prev.style.removeProperty('--my');}
      if(!card.classList.contains('ach-card--hovered')){
        GS.pausedCols.add(idx);
        col.classList.add('col-hovering','col-hovered');
        card.classList.add('ach-card--hovered');
      }
    });
    col.addEventListener('mouseleave',()=>{
      const hc=col.querySelector('.ach-card--hovered');
      if(hc){hc.classList.remove('ach-card--hovered');hc.style.removeProperty('--mx');hc.style.removeProperty('--my');}
      GS.pausedCols.delete(idx);
      col.classList.remove('col-hovering','col-hovered');
    });
  });
}

/* ============================================================
   6. CATEGORY FILTER PILLS
   ============================================================ */
function applyFilter(filter){
  GS.activeFilter=filter;
  document.querySelectorAll('.ach-pill').forEach(btn=>{
    const a=btn.dataset.filter===filter;
    btn.classList.toggle('active',a);
    btn.setAttribute('aria-pressed',a?'true':'false');
  });
  document.querySelectorAll('.ach-card').forEach(card=>{
    card.classList.toggle('ach-card--filtered',filter!=='all'&&card.dataset.filter!==filter);
  });
}

function initFilterPills(){
  const container=document.getElementById('ach-filter-pills');
  if(!container)return;
  container.addEventListener('click',e=>{
    const btn=e.target.closest('.ach-pill');
    if(!btn)return;
    applyFilter(btn.dataset.filter);
  });
}

/* ============================================================
   9. PORTAL CONTROLLER (FLIP transition)
   ============================================================ */
function populatePortal(ach){
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  set('portal-category-badge',ach.category);
  set('portal-title',ach.title);
  set('portal-issuer',ach.issuer);
  set('portal-date',ach.date);
  set('portal-desc',ach.desc);
  const img=document.getElementById('portal-cert-img');
  if(img){img.src=ach.image;img.alt=ach.title;}
  const vb=document.getElementById('btn-portal-verify');
  if(vb)vb.href=ach.verifyUrl;
  const tr=document.getElementById('portal-tech-row');
  if(tr)tr.innerHTML=ach.tech.map(t=>`<span class="portal-tech-pill">${t}</span>`).join('');
}
function openPortalFlip(ach,cardEl){
  populatePortal(ach);
  const overlay=document.getElementById('portal-zoom-overlay');
  const wrapper=overlay?overlay.querySelector('.portal-content-wrapper'):null;
  if(!overlay||!wrapper)return;
  if(GS.reducedMotion){overlay.classList.add('active');document.body.style.overflow='hidden';GS.isPortalOpen=true;return;}
  const cr=cardEl.getBoundingClientRect();
  const vw=window.innerWidth,vh=window.innerHeight;
  overlay.style.visibility='hidden';overlay.classList.add('active');
  const tw=wrapper.offsetWidth||Math.min(980,vw*0.9);
  const th=wrapper.offsetHeight||550;
  overlay.classList.remove('active');overlay.style.visibility='';
  const sx=cr.width/tw,sy=cr.height/th;
  const dx=cr.left+cr.width/2-vw/2,dy=cr.top+cr.height/2-vh/2;
  wrapper.style.transition='none';
  wrapper.style.transform=`translate(${dx}px,${dy}px) scale(${sx},${sy})`;
  wrapper.style.opacity='0.2';
  wrapper.style.borderRadius='16px';
  overlay.classList.add('active');
  document.body.style.overflow='hidden';
  GS.isPortalOpen=true;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    wrapper.style.transition='transform 0.52s cubic-bezier(0.16,1,0.3,1),opacity 0.3s ease,border-radius 0.4s ease';
    wrapper.style.transform='translate(0,0) scale(1,1)';
    wrapper.style.opacity='1';
    wrapper.style.borderRadius='26px';
  }));
}
function closePortal(){
  const overlay=document.getElementById('portal-zoom-overlay');
  const wrapper=overlay?overlay.querySelector('.portal-content-wrapper'):null;
  if(!GS.reducedMotion&&wrapper){
    wrapper.style.transition='transform 0.3s cubic-bezier(0.4,0,1,1),opacity 0.22s ease';
    wrapper.style.transform='scale(0.93)';
    wrapper.style.opacity='0';
  }
  if(overlay)overlay.classList.remove('active');
  document.body.style.overflow='';
  setTimeout(()=>{
    GS.isPortalOpen=false;
    if(wrapper){wrapper.style.transition='';wrapper.style.transform='';wrapper.style.opacity='';wrapper.style.borderRadius='';}
  },400);
}
function setupPortalZoom(){
  const overlay=document.getElementById('portal-zoom-overlay');
  const closeBtn=document.getElementById('portal-close-btn');
  const lightbox=document.getElementById('portal-lightbox');
  const lbImg=document.getElementById('portal-lightbox-img');
  const certImg=document.getElementById('portal-cert-img');
  const gallery=document.getElementById('ach-gallery');
  if(!overlay||!gallery)return;
  gallery.addEventListener('click',e=>{
    const card=e.target.closest('.ach-card');
    if(!card)return;
    const ach=ACHIEVEMENTS_DATA.find(a=>a.id===card.dataset.id);
    if(ach)openPortalFlip(ach,card);
  });
  gallery.addEventListener('keydown',e=>{
    if(e.key!=='Enter'&&e.key!==' ')return;
    const card=e.target.closest('.ach-card');
    if(!card)return;
    e.preventDefault();
    const ach=ACHIEVEMENTS_DATA.find(a=>a.id===card.dataset.id);
    if(ach)openPortalFlip(ach,card);
  });
  if(closeBtn)closeBtn.addEventListener('click',closePortal);
  overlay.addEventListener('click',e=>{if(e.target===overlay)closePortal();});
  if(certImg&&lightbox&&lbImg){
    certImg.addEventListener('click',()=>{lbImg.src=certImg.src;lbImg.alt=certImg.alt;lightbox.classList.add('active');});
  }
  if(lightbox)lightbox.addEventListener('click',()=>lightbox.classList.remove('active'));
  window.addEventListener('keydown',e=>{
    if(e.key!=='Escape')return;
    if(lightbox&&lightbox.classList.contains('active'))lightbox.classList.remove('active');
    else if(overlay.classList.contains('active'))closePortal();
  });
}

/* ============================================================
   10. GALLERY REVEAL & SCROLL ENGINE UTILS
   ============================================================ */
function setupGalleryReveal(){
  const gallery=document.getElementById('ach-gallery');
  if(!gallery)return;
  if(GS.reducedMotion){gallery.classList.add('revealed');return;}
  const obs=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting&&!GS.revealDone){
      GS.revealDone=true;gallery.classList.add('revealed');obs.disconnect();
    }
  },{threshold:0.08});
  obs.observe(gallery);
}

function setupScrollVelocity(){
  window.addEventListener('scroll',()=>{
    const y=window.scrollY;
    const d=y-GS.lastScrollY;GS.lastScrollY=y;
    GS.scrollVelocity=Math.max(-12,Math.min(12,GS.scrollVelocity+d*0.09));
  },{passive:true});
}

document.addEventListener('visibilitychange',()=>{
  if(document.hidden){cancelAnimationFrame(GS.rafId);GS.rafId=null;}
  else if(!GS.reducedMotion&&GS.rafId===null){GS.rafId=requestAnimationFrame(galleryLoop);}
});

let _rt=null;
window.addEventListener('resize',()=>{
  clearTimeout(_rt);
  _rt=setTimeout(()=>{
    [1,2,3].forEach((c,i)=>{const t=document.getElementById(`ach-col-${c}-track`);if(t)GS.singleSetHeights[i]=t.scrollHeight/3;});
  },250);
},{passive:true});

/* ============================================================
   11. BOOTSTRAP
   ============================================================ */
document.addEventListener('DOMContentLoaded',()=>{
  renderGallery();
  initFilterPills();
  setupInteractions();
  setupScrollVelocity();
  setupGalleryReveal();
  setupPortalZoom();
  requestAnimationFrame(()=>requestAnimationFrame(()=>measureAndStart()));
});
