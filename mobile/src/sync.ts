import { BACKEND_URL } from './config';
export async function pushSync(payload:any){ try{ const r = await fetch(`${BACKEND_URL}/sync/push`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) }); return await r.json(); } catch(e){ console.log('sync failed', e); return { ok:false }; } }
