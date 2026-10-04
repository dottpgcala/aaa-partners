import {getDb} from "../../../db";
import {leads} from "../../../db/schema";
const services=["Cassa malati e assicurazioni","Secondo e terzo pilastro","Finanza e Wealth Management","Luxury & Gold Advisory","Real Estate & Mortgage","Una visione d’insieme"];
export async function POST(request:Request){
 if(request.headers.get("origin")!==new URL(request.url).origin) return Response.json({error:"Richiesta non consentita."},{status:403});
 if(Number(request.headers.get("content-length")||0)>10000)return Response.json({error:"Richiesta troppo lunga."},{status:413});
 let d:any;try{const raw=await request.text();if(raw.length>10000)throw Error();d=JSON.parse(raw)}catch{return Response.json({error:"Richiesta non valida."},{status:400})}
 if(d.website)return Response.json({error:"Richiesta non valida."},{status:400});
 if(typeof d.name!=="string"||d.name.trim().length<2||d.name.length>120||typeof d.email!=="string"||!/^\S+@\S+\.\S+$/.test(d.email)||d.email.length>254||!services.includes(d.service)||d.consent!==true||!["Videochiamata","Telefono"].includes(d.mode)||!["Mattina","Pomeriggio","Indifferente"].includes(d.period)||typeof d.message!=="string"||d.message.length>1500||typeof d.phone!=="string"||d.phone.length>40||typeof d.preferredDate!=="string"||d.preferredDate.length>10||(d.preferredDate&&(!/^\d{4}-\d{2}-\d{2}$/.test(d.preferredDate)||d.preferredDate<new Date().toISOString().slice(0,10)))||(d.mode==="Telefono"&&d.phone.trim().length<6))return Response.json({error:"Controlla i campi e il consenso prima di inviare."},{status:400});
 try{const id=crypto.randomUUID();await getDb().insert(leads).values({id,name:d.name.trim(),email:d.email.trim().toLowerCase(),phone:d.phone.trim(),service:d.service,mode:d.mode,preferredDate:d.preferredDate,period:d.period,message:d.message.trim(),createdAt:new Date().toISOString(),consentVersion:"contact-v1-2026-10-03",status:"new"});return Response.json({ok:true,reference:id.slice(0,8)},{status:201,headers:{"Cache-Control":"no-store"}})}catch{return Response.json({error:"Invio non riuscito. Riprova tra poco: la richiesta non è stata confermata."},{status:503})}
}
