"use client";
import CmsLive from "./cms-live";
import {useEffect,useRef,useState} from "react";
import {ArrowUpRight,ArrowRight,ShieldCheck,Landmark,ChartNoAxesCombined,Gem,House,CircleCheck,Menu,X,Mail,Phone,Check} from "lucide-react";

const services=[{title:"Cassa malati e assicurazioni",short:"Proteggere ciò che conta.",text:"Orientati tra coperture, franchigie e assicurazioni complementari. Partiamo dalle tue esigenze per leggere e confrontare le soluzioni con chiarezza.",items:["Analisi delle coperture esistenti","Confronto di costi e condizioni","Protezione della persona e della famiglia"],icon:ShieldCheck,tag:"PROTEZIONE",cta:"protezione"},{title:"Secondo e terzo pilastro",short:"Il futuro si costruisce oggi.",text:"Metti in relazione previdenza professionale, risparmio individuale e obiettivi di vita. Una visione coordinata per preparare le tue scelte pensionistiche.",items:["Lettura della situazione previdenziale","Valutazione di esigenze e possibili lacune","Pianificazione del percorso pensionistico"],icon:Landmark,tag:"PREVIDENZA",cta:"previdenza"},{title:"Finanza e Wealth Management",short:"Una direzione per il patrimonio.",text:"Dai un ordine a obiettivi, orizzonte temporale e propensione al rischio. Un confronto per comprendere investimenti, liquidità e priorità patrimoniali.",items:["Analisi degli obiettivi patrimoniali","Lettura di rischi, costi e diversificazione","Coordinamento delle esigenze familiari"],icon:ChartNoAxesCombined,tag:"PATRIMONIO",cta:"patrimonio"},{title:"Luxury & Gold Advisory",short:"Oltre il valore apparente.",text:"Oro e beni di pregio richiedono attenzione a provenienza, autenticità e liquidabilità. Ti aiutiamo a strutturare le verifiche prima di una decisione.",items:["Orientamento su oro e beni di pregio","Analisi di costi, custodia e rivendibilità","Supporto nel confronto con specialisti"],icon:Gem,tag:"BENI REALI",cta:"beni di valore"},{title:"Real Estate & Mortgage",short:"Spazio ai tuoi progetti.",text:"Acquisto, valorizzazione immobiliare e finanziamento: valutiamo insieme il progetto e le alternative, con attenzione alla sostenibilità nel tempo.",items:["Analisi del progetto immobiliare","Confronto delle soluzioni ipotecarie","Supporto al percorso di acquisizione"],icon:House,tag:"IMMOBILI",cta:"immobili"}];
const overview='Una visione d’insieme';
const faqs=[['Da quale servizio dovrei iniziare?','Se hai un’esigenza precisa, seleziona l’area corrispondente. Se previdenza, investimenti e immobili si intrecciano, scegli “Una visione d’insieme”: il primo colloquio serve a definire le priorità.'],['Come si svolge il primo colloquio?','In videochiamata o al telefono, secondo la tua preferenza. Condividi i tuoi obiettivi generali; l’ambito dell’incarico, gli eventuali costi e i soggetti coinvolti saranno chiariti prima di procedere.'],['Che ruolo ha l’intelligenza artificiale?','L’AI supporta l’organizzazione delle informazioni, il confronto di scenari e la preparazione delle analisi. Le valutazioni richiedono verifica umana: non deleghiamo a un algoritmo le decisioni sul tuo patrimonio.'],['Devo caricare documenti per chiedere un appuntamento?','No. Per il primo contatto bastano i tuoi recapiti e l’argomento di interesse. Non inserire nel modulo dati sanitari, numeri di conto o documenti finanziari.'],['L’appuntamento è confermato subito?','Il modulo registra una richiesta. Giorno, orario e modalità del colloquio devono essere confermati successivamente: non si tratta di una prenotazione automatica.']];
const steps=[['01','Ascoltare prima di proporre','Obiettivi, esigenze e vincoli personali sono il punto di partenza.'],['02','Dare ordine alle informazioni','Strumenti AI a supporto della lettura dei dati e del confronto tra scenari, con verifica del consulente.'],['03','Scegliere con consapevolezza','Alternative, costi e rischi spiegati in modo comprensibile. Le decisioni restano tue.']];
// Marquee words keep the original ribbon strings so saved CMS overrides still apply.
const ribbon=['PROTEZIONE ',' PREVIDENZA ',' PATRIMONIO ',' BENI REALI ',' IMMOBILI'];

/* TEAM — compilare quando i dati sono disponibili.
   photo: file in /public/team (es. "/team/armando.jpg"), formato verticale 3:4. */
type Member={title:string;name:string;surname:string;role:string;note:string;bio:string;photo:string;email:string;phone:string;linkedin:string};
const team:Member[]=[
  {title:"",name:"Armando",surname:"Cucci",role:"Co-Founder & Luxury/Real Estate Advisor",note:"",bio:"",photo:"",email:"armando.cucci@aaapartners.it",phone:"+41 79 932 18 28",linkedin:""},
  {title:"",name:"Salvatore",surname:"Pilo",role:"Co-Founder & Financial Advisor",note:"FINMA: F01492567",bio:"",photo:"",email:"salvatore.pilo@aaapartners.it",phone:"+41 78 211 22 26",linkedin:""},
  {title:"Dott.",name:"Piergiorgio",surname:"Calá",role:"Co-Founder & Wealth Manager",note:"",bio:"",photo:"",email:"piergiorgio.cala@aaapartners.it",phone:"+41 79 512 55 24",linkedin:""},
];

const Arrow=()=><ArrowUpRight size={17} strokeWidth={1.8}/>;

function useSiteMotion(){useEffect(()=>{
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $$=<T extends Element>(s:string)=>Array.from(document.querySelectorAll<T>(s));
  const cleanups:(()=>void)[]=[];
  const on=(t:EventTarget,e:string,f:EventListener,o?:AddEventListenerOptions)=>{t.addEventListener(e,f,o);cleanups.push(()=>t.removeEventListener(e,f))};
  const raf=requestAnimationFrame(()=>setTimeout(()=>document.body.classList.add('ready'),60));

  const header=document.querySelector('header')!,prog=document.getElementById('progress')!,bg=document.querySelector<HTMLElement>('.heroimage'),stepsEl=document.getElementById('steps')!;
  const stepEls=$$<HTMLElement>('#steps .step');let ticking=false;
  const onScroll=()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;header.classList.toggle('scrolled',y>40);prog.style.transform=`scaleX(${h>0?y/h:0})`;if(bg&&!reduce&&y<innerHeight)bg.style.translate=`0 ${y*.25}px`;const r=stepsEl.getBoundingClientRect();const p=Math.min(1,Math.max(0,(innerHeight*.65-r.top)/r.height));stepsEl.style.setProperty('--p',p.toFixed(3));stepEls.forEach((s,i)=>s.classList.toggle('on',p>=(i+.2)/stepEls.length));ticking=false};
  on(window,'scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();

  const navLinks=$$<HTMLAnchorElement>('nav.main a');
  const secObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
  ['servizi','metodo','appuntamento','domande','team'].forEach(id=>{const el=document.getElementById(id);if(el)secObs.observe(el)});

  const rev=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target as HTMLElement;const sib=Array.from(el.parentElement!.children).filter(c=>c.classList.contains('reveal'));el.style.transitionDelay=(Math.max(0,sib.indexOf(el))%6)*90+'ms';el.classList.add('in');rev.unobserve(el)}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  $$('.reveal').forEach(el=>rev.observe(el));

  const cObs=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target as HTMLElement,to=+el.dataset.count!,t0=performance.now();cObs.unobserve(el);if(reduce){el.textContent=String(to);return}const tick=(t:number)=>{const k=Math.min(1,(t-t0)/1400);el.textContent=String(Math.round(to*(1-Math.pow(1-k,3))));if(k<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)}),{threshold:.6});
  $$('[data-count]').forEach(el=>cObs.observe(el));

  if(matchMedia('(hover:hover)').matches&&!reduce){
    $$<HTMLElement>('.card').forEach(c=>{on(c,'pointermove',(ev)=>{const e=ev as PointerEvent,r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;c.style.setProperty('--mx',x+'px');c.style.setProperty('--my',y+'px');c.style.transform=`perspective(1000px) rotateX(${(y/r.height-.5)*-4}deg) rotateY(${(x/r.width-.5)*4}deg) translateY(-4px)`});on(c,'pointerleave',()=>{c.style.transform=''})});
    $$<HTMLElement>('.magnet').forEach(b=>{on(b,'pointermove',(ev)=>{const e=ev as PointerEvent,r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.3}px)`});on(b,'pointerleave',()=>{b.style.transform=''})});
  }

  /* hero gold dust */
  const cv=document.getElementById('dust') as HTMLCanvasElement|null,ctx=cv?.getContext('2d');let run=!reduce,frame=0;
  if(cv&&ctx&&!reduce){
    let W=0,H=0,pts:{x:number;y:number;vx:number;vy:number;r:number;a:number}[]=[];const mouse={x:-999,y:-999};const DPR=Math.min(devicePixelRatio||1,1.75);
    const size=()=>{W=cv.clientWidth;H=cv.clientHeight;cv.width=W*DPR;cv.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);const n=Math.round(Math.min(70,W*H/22000));pts=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.18,vy:-Math.random()*.22-.04,r:Math.random()*1.4+.4,a:Math.random()*.5+.25}))};
    const draw=()=>{if(!run)return;ctx.clearRect(0,0,W,H);for(let i=0;i<pts.length;i++){const p=pts[i];p.x+=p.vx;p.y+=p.vy;const dx=p.x-mouse.x,dy=p.y-mouse.y;if(dx*dx+dy*dy<14000){p.x+=dx*.012;p.y+=dy*.012}if(p.y<-10){p.y=H+10;p.x=Math.random()*W}if(p.x<-10)p.x=W+10;else if(p.x>W+10)p.x=-10;for(let j=i+1;j<pts.length;j++){const q=pts[j],ex=p.x-q.x,ey=p.y-q.y,e2=ex*ex+ey*ey;if(e2<11000){ctx.strokeStyle=`rgba(226,201,149,${(1-e2/11000)*.14})`;ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}ctx.fillStyle=`rgba(232,208,158,${p.a})`;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);ctx.fill()}frame=requestAnimationFrame(draw)};
    const resume=()=>{cancelAnimationFrame(frame);if(run)frame=requestAnimationFrame(draw)};
    size();on(window,'resize',size,{passive:true});
    const hero=document.querySelector('.hero');if(hero)on(hero,'pointermove',(ev)=>{const e=ev as PointerEvent,r=cv.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top});
    const vis=new IntersectionObserver(([e])=>{run=e.isIntersecting&&!document.hidden;resume()});vis.observe(cv);cleanups.push(()=>vis.disconnect());
    on(document,'visibilitychange',()=>{run=!document.hidden;resume()});
  }
  return()=>{cancelAnimationFrame(raf);run=false;cancelAnimationFrame(frame);secObs.disconnect();rev.disconnect();cObs.disconnect();cleanups.forEach(f=>f())};
},[])}

export default function Page(){const[menu,setMenu]=useState(false);const[service,setService]=useState(overview);const[mode,setMode]=useState('Videochiamata');const[status,setStatus]=useState('');const[busy,setBusy]=useState(false);const[done,setDone]=useState(false);const[privacy,setPrivacy]=useState(false);const[faq,setFaq]=useState(0);const formRef=useRef<HTMLDivElement>(null);
useSiteMotion();
function choose(s:string){setService(s);formRef.current?.scrollIntoView({behavior:'smooth',block:'center'});setMenu(false)}
async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();const f=new FormData(e.currentTarget);f.delete('topic');f.delete('modeChoice');setBusy(true);setStatus('');try{const r=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...Object.fromEntries(f),service,mode,consent:f.get('consent')==='on'})});const data=await r.json() as {error?:string;reference?:string};if(!r.ok)throw Error(data.error);setDone(true);setStatus('Richiesta registrata · Riferimento '+data.reference)}catch(e){setStatus(e instanceof Error&&e.message?e.message:'Invio non riuscito. Riprova.')}finally{setBusy(false)}}
const close=()=>setMenu(false);
return <><CmsLive/><div className="progress" id="progress"/>
<header className={menu?'open':''}><div className="wrap">
  <a href="#" className="brand" aria-label="AAA Partners home"><span className="logocrop"><img src="/aaa-partners.png" alt="" width={105} height={70}/></span><span>AAA PARTNERS<small>ADJUDICA ASSET ALLIANCE</small></span></a>
  <nav className="main"><a href="#servizi" onClick={close}>Le nostre competenze</a><a href="#metodo" onClick={close}>Il nostro approccio</a><a href="#domande" onClick={close}>Domande frequenti</a><a href="#team" onClick={close}>Il team</a></nav>
  <a className="btn btn-line navcta" href="#appuntamento">Parliamone <Arrow/></a>
  <button className="burger" aria-label="Apri menu" aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
</div></header>

<main>
<section className="hero"><div className="heroimage"/><canvas id="dust" aria-hidden="true"/>
  <div className="wrap">
    <div className="eyebrow fade d1"><span/> CONSULENZA IN SVIZZERA · VISIONE INTEGRATA</div>
    <h1><span className="line"><span>Le tue scelte.</span></span><span className="line"><span>Una visione</span></span><span className="line"><em className="shimmer">d’insieme.</em></span></h1>
    <p className="hero-sub fade d2"><strong>Protezione, previdenza e patrimonio.</strong>Diamo forma alle tue priorità, con il valore della relazione umana e il supporto dell’intelligenza artificiale.</p>
    <div className="hero-ctas fade d3"><a className="btn btn-gold magnet" href="#appuntamento">Richiedi un primo colloquio <Arrow/></a><a className="btn btn-ghost" href="#servizi">Esplora i servizi <ArrowRight size={17}/></a></div>
    <div className="hero-foot fade d4"><span>METODO. CHIAREZZA. RELAZIONE.</span><span className="hide-s">01 — IL TUO PROSSIMO PASSO</span><a href="#servizi" className="scrollcue">Scorri <i/></a></div>
  </div>
</section>

<div className="marquee" aria-label="Un interlocutore, più prospettive."><div className="track">{[0,1].map(k=><div className="group" key={k} aria-hidden={k===1}>{ribbon.map(w=><span key={w}>{w}</span>)}<span className="it">Un interlocutore, più prospettive.</span></div>)}</div></div>

<section className="pad" id="servizi"><div className="wrap">
  <div className="stats reveal" data-cms-ignore="true"><div className="stat"><b data-count="5">0</b><span>aree di competenza coordinate</span></div><div className="stat"><b data-count="1">0</b><span>interlocutore, più prospettive</span></div><div className="stat"><b data-count="3">0</b><span>partner al tuo fianco</span></div></div>
  <div className="sec-head"><div className="reveal"><div className="eyebrow">01 / LE NOSTRE COMPETENZE</div><h2>Ogni progetto merita<br/>la giusta <em>attenzione.</em></h2></div><p className="lead reveal">Le scelte importanti sono collegate.<br/>Partiamo da ciò che conta per te, per costruire un percorso coerente tra le diverse aree della tua vita.</p></div>
  <div className="grid">
    {services.map((s,i)=><article className="card reveal" key={s.title}><div className="card-top"><span className="ico"><s.icon size={22} strokeWidth={1.4}/></span><span className="num">0{i+1}</span></div><span className="kicker">{s.tag}</span><h3>{s.title}</h3><p className="tag">{s.short}</p><p>{s.text}</p><ul>{s.items.map(t=><li key={t}>{t}</li>)}</ul><button className="go" onClick={()=>choose(s.title)}>Parliamo di {s.cta} <ArrowUpRight size={16}/></button></article>)}
    <article className="card cta reveal"><div><span className="kicker">LA TUA VISIONE D’INSIEME</span><h3>Da dove<br/><em>cominciamo?</em></h3></div><p>Non serve avere già tutte le risposte. Un primo confronto ci aiuta a mettere a fuoco le domande giuste.</p><button className="btn btn-gold" onClick={()=>choose(overview)}>Troviamo il punto di partenza <Arrow/></button></article>
  </div>
</div></section>

<section className="method pad dark" id="metodo"><div className="wrap method-grid">
  <div className="orbit reveal" aria-hidden="true" data-cms-ignore="true"><svg viewBox="0 0 520 520"><defs><radialGradient id="core" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#e2c995" stopOpacity=".35"/><stop offset="1" stopColor="#e2c995" stopOpacity="0"/></radialGradient></defs>
    <circle cx="260" cy="260" r="120" fill="url(#core)"/><circle className="ring pulse" cx="260" cy="260" r="70"/><circle className="ring" cx="260" cy="260" r="110"/><circle className="ring dash" cx="260" cy="260" r="170"/><circle className="ring faint" cx="260" cy="260" r="235"/>
    <g className="spin"><circle className="node" cx="260" cy="150" r="7"/><circle className="node" cx="355" cy="315" r="7"/><circle className="node" cx="165" cy="315" r="7"/></g>
    <g className="spin rev">{[[260,90,3],[410,200,2.5],[398,352,3],[300,426,2],[150,400,3],[96,300,2.5],[112,180,2],[190,105,2.5]].map(([x,y,r])=><circle key={x+'-'+y} className="dotai" cx={x} cy={y} r={r}/>)}<circle cx="260" cy="25" r="4" fill="#c9a96e"/><circle cx="495" cy="260" r="3" fill="#c9a96e" opacity=".6"/><circle cx="25" cy="260" r="3" fill="#c9a96e" opacity=".6"/></g>
    <text x="260" y="268" textAnchor="middle" className="ocenter">Tu</text><text x="260" y="58" textAnchor="middle" className="olabel">DATI · AI</text><text x="260" y="482" textAnchor="middle" className="olabel">CONSULENTE</text></svg></div>
  <div>
    <div className="eyebrow reveal">02 / IL NOSTRO APPROCCIO</div>
    <h2 className="reveal">Intelligenza artificiale.<br/><em>Responsabilità umana.</em></h2>
    <p className="lead reveal">La tecnologia amplia la capacità di analisi. L’ascolto dà senso ai dati. Il nostro approccio li mette in relazione, mantenendo il consulente al centro delle valutazioni.</p>
    <span className="badge reveal"><i/> AI a supporto. Persone al tuo fianco.</span>
    <div className="steps" id="steps"><span className="bar"/>{steps.map(([n,t,d])=><div className="step reveal" key={n}><small>{n}</small><h3>{t}</h3><p>{d}</p></div>)}</div>
  </div>
</div></section>

<section className="pad" id="appuntamento"><div className="wrap contact-grid">
  <div>
    <div className="eyebrow reveal">03 / INIZIAMO DA UNA CONVERSAZIONE</div>
    <h2 className="reveal">Il prossimo passo<br/>è <em>parlarne.</em></h2>
    <p className="lead reveal">Raccontaci di cosa hai bisogno e indica quando preferisci essere contattato. Partiamo da qui.</p>
    <ul className="checks reveal">{['Un confronto sulle tue priorità','In videochiamata o al telefono','Nessun documento da caricare'].map(t=><li key={t}><CircleCheck strokeWidth={1.5}/> {t}</li>)}</ul>
    <p className="fine reveal">L’invio non comporta la sottoscrizione di prodotti o servizi. Ambito, condizioni ed eventuali costi saranno concordati prima di ogni incarico.</p>
  </div>
  <div className="formbox reveal" ref={formRef}>{done?<div className="ok" role="status"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="32" cy="32" r="30" opacity=".3"/><path d="m20 33 8 8 16-18" strokeLinecap="round"/></svg><div className="eyebrow">IL PRIMO PASSO È FATTO</div><h3>Grazie per la fiducia.</h3><p>{status}</p><p>La tua preferenza è stata salvata. L’appuntamento sarà effettivo solo dopo una conferma diretta.</p><button className="btn btn-navy" onClick={()=>{setDone(false);setStatus('')}}>Invia un’altra richiesta</button></div>:
  <form onSubmit={submit}>
    <h3>Richiedi un colloquio</h3><p className="formsub">Bastano pochi dettagli per iniziare.</p>
    <span className="lbl">Di cosa vorresti parlare?</span>
    <div className="chips" role="radiogroup">{[...services.map(s=>s.title),overview].map(s=><label className="chip" key={s}><input type="radio" name="topic" checked={service===s} onChange={()=>setService(s)}/><span>{s}</span></label>)}</div>
    <div className="row"><div className="field"><input id="f-name" name="name" required minLength={2} maxLength={120} autoComplete="name" placeholder=" "/><label htmlFor="f-name">Nome e cognome *</label></div><div className="field"><input id="f-mail" name="email" required type="email" maxLength={254} autoComplete="email" placeholder=" "/><label htmlFor="f-mail">Email *</label></div></div>
    <span className="lbl">Modalità</span>
    <div className="seg">{['Videochiamata','Telefono'].map(m=><label key={m}><input type="radio" name="modeChoice" checked={mode===m} onChange={()=>setMode(m)}/><span>{m}</span></label>)}</div>
    <div className="row"><div className="field"><input id="f-tel" name="phone" type="tel" required={mode==='Telefono'} minLength={mode==='Telefono'?6:undefined} maxLength={40} autoComplete="tel" placeholder=" "/><label htmlFor="f-tel">Telefono {mode==='Telefono'?'*':'(facoltativo)'}</label></div><div className="field"><input id="f-day" name="preferredDate" type="date" min={new Date().toISOString().slice(0,10)} placeholder=" "/><label htmlFor="f-day">Giorno preferito (facoltativo)</label></div></div>
    <div className="field"><select id="f-slot" name="period"><option>Indifferente</option><option>Mattina</option><option>Pomeriggio</option></select><label htmlFor="f-slot">Fascia oraria · ora svizzera</label></div>
    <div className="field"><textarea id="f-note" name="message" rows={3} maxLength={1500} placeholder=" "/><label htmlFor="f-note">Una breve nota (facoltativa)</label></div>
    <p className="warn">Non inserire dati sanitari, numeri di conto o informazioni finanziarie riservate.</p>
    <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
    <label className="consent"><input type="checkbox" name="consent" required/><span>Ho letto l’<button type="button" onClick={()=>setPrivacy(true)}>informativa sui dati</button> e acconsento a essere ricontattato per questa richiesta. *</span></label>
    <button className="btn btn-navy submit" disabled={busy}>{busy?'Invio in corso…':'Invia la richiesta'} <Arrow/></button>
    <p className="note">Giorno e orario saranno concordati e confermati successivamente.</p>
    {status&&<p className="error" role="alert">{status}</p>}
  </form>}</div>
</div></section>

<section className="faq pad" id="domande"><div className="wrap faq-grid">
  <div><div className="eyebrow reveal">04 / QUALCHE RISPOSTA, PRIMA DI INIZIARE</div><h2 className="reveal">Facciamo<br/><em>chiarezza.</em></h2></div>
  <div className="reveal">{faqs.map(([q,a],i)=><div className={'qa'+(faq===i?' open':'')} key={q}><button aria-expanded={faq===i} onClick={()=>setFaq(faq===i?-1:i)}>{q}<span className="pm"/></button><div className="ans"><div><p>{a}</p></div></div></div>)}</div>
</div></section>

<section className="team pad" id="team"><div className="wrap">
  <div className="sec-head"><div className="reveal"><div className="eyebrow">05 / LE PERSONE</div><h2>Il nostro <em>team.</em></h2></div><p className="lead reveal">Tre professionisti, un’unica alleanza. Competenze complementari al servizio di una visione d’insieme.</p></div>
  <div className="team-grid">{team.map(m=>{const full=[m.name,m.surname].filter(Boolean).join(' ');const initials=(m.name[0]+(m.surname[0]||'')).toUpperCase();return <article className={'member reveal'+(m.photo?' has-photo':'')} tabIndex={0} key={m.name}>
    <div className="photo" style={m.photo?{backgroundImage:`url("${m.photo}")`}:undefined}/>
    {!m.photo&&<div className="mono" aria-hidden="true" data-cms-ignore="true"><svg viewBox="0 0 100 100"><circle className="r1" cx="50" cy="50" r="49"/><circle className="r2" cx="50" cy="50" r="40"/><text x="50" y="52">{initials}</text></svg></div>}
    {!(m.bio||m.photo)&&<span className="pending">Biografia in arrivo</span>}
    <div className="body"><span className="role">{m.role}</span>{m.title&&<span className="mtitle">{m.title}</span>}<h3>{full}</h3><div className="more"><div>{m.bio&&<p>{m.bio}</p>}{m.note&&<p className="mnote">{m.note}</p>}<div className="contacts">{m.email&&<a href={'mailto:'+m.email}><Mail size={15}/>{m.email}</a>}{m.phone&&<a href={'tel:'+m.phone.replace(/\s/g,'')}><Phone size={15}/>{m.phone}</a>}</div>{m.linkedin&&<div className="links"><a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={'LinkedIn '+full}><ArrowUpRight size={16}/></a></div>}</div></div></div>
  </article>})}</div>
</div>
<svg width="0" height="0" style={{position:'absolute'}} aria-hidden="true"><defs><linearGradient id="goldg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f1dcae"/><stop offset=".5" stopColor="#c9a96e"/><stop offset="1" stopColor="#9c7f48"/></linearGradient></defs></svg>
</section>
</main>

<footer className="dark"><img className="foot-logo" src="/aaa-partners.png" alt="" loading="lazy"/><div className="wrap">
  <div className="foot-top"><div><a href="#" className="brand"><span className="logocrop"><img src="/aaa-partners.png" alt="" loading="lazy"/></span><span>AAA PARTNERS<small>ADJUDICA ASSET ALLIANCE</small></span></a><p className="big">Una visione d’insieme.<br/><em>Un passo alla volta.</em></p></div>
  <div className="right"><span className="eyebrow">IL TUO PROSSIMO PASSO</span><a href="#appuntamento" className="btn btn-gold magnet">Parliamone. <Arrow/></a></div></div>
  <p className="disc">I contenuti del sito hanno carattere informativo e non costituiscono una raccomandazione personalizzata, un’offerta di investimento o una garanzia di risultato. Per ogni incarico sono da definire soggetto erogatore, ambito operativo, condizioni e autorizzazioni eventualmente necessarie. L’AI supporta l’analisi e non sostituisce la valutazione professionale.</p>
  <div className="foot-bot"><span>© {new Date().getFullYear()} AAA Partners</span><nav><a href="/editor" data-cms-ignore="true">Area riservata</a><button onClick={()=>setPrivacy(true)}>Informativa sui dati</button><a href="#">Torna all’inizio ↑</a></nav></div>
</div></footer>

{privacy&&<div className="modalback" onClick={()=>setPrivacy(false)}><section className="modal" role="dialog" aria-modal="true" aria-label="Informativa sui dati" onClick={e=>e.stopPropagation()}><button autoFocus className="close" onClick={()=>setPrivacy(false)} aria-label="Chiudi informativa"><X/></button><div className="eyebrow">RICHIESTA DI CONTATTO</div><h2>I tuoi dati.</h2><p>Il modulo raccoglie nome, email, eventuale telefono, area di interesse, preferenze di appuntamento e messaggio. I dati vengono salvati nell’archivio del sito per gestire la richiesta e il successivo contatto, insieme alla data e alla versione del consenso.</p><p>Il consenso riguarda esclusivamente il contatto richiesto, non l’invio di newsletter o comunicazioni promozionali. Non inserire informazioni sanitarie o finanziarie riservate.</p><p>Questa versione del sito è riservata alla revisione. Prima dell’apertura al pubblico, l’informativa deve essere completata con identità e recapiti del titolare, tempi di conservazione, destinatari, eventuali trasferimenti e modalità di esercizio dei diritti.</p><button className="btn btn-navy" onClick={()=>setPrivacy(false)}>Ho capito <Check size={16}/></button></section></div>}
</>}
