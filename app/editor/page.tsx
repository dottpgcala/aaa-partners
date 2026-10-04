import {requireChatGPTUser} from '../chatgpt-auth';
import Editor from './studio';
export const dynamic='force-dynamic';
export default async function EditorPage(){const user=await requireChatGPTUser('/editor');if(user.email.toLowerCase()!=='dott.pgcala@gmail.com')return <main style={{padding:60}}><h1 style={{fontSize:36}}>Area riservata</h1><p>Questo account non è abilitato alla modifica del sito.</p><a href="/">Torna al sito</a></main>;return <Editor/>}
