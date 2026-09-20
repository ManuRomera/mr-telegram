import { MODULE_ID } from "./constants.js";

export async function resolveDraggedDocument(event) {
  const editors=[foundry?.applications?.ux?.TextEditor?.implementation,foundry?.applications?.ux?.TextEditor,globalThis.TextEditor];
  let data=null; for (const ed of editors) { if(typeof ed?.getDragEventData!=="function") continue; try { data=ed.getDragEventData(event); if(data) break; } catch {} }
  if(!data) return null;
  let uuid=data.uuid || (data.pack&&data.id?`Compendium.${data.pack}.${data.id}`:null) || (data.type&&data.id?`${data.type}.${data.id}`:null);
  if(!uuid) return null; try { return await fromUuid(uuid); } catch { return null; }
}

function sanitizeItem(item) {
  const d=foundry.utils.deepClone(item.toObject()); for(const k of ["_id","folder","ownership","sort","_stats"]) delete d[k]; return d;
}

export async function imageToData(file, maxSide=1000, quality=.72, maxChars=420000) {
  const url=URL.createObjectURL(file);
  try {
    const image=await new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=url;});
    const scale=Math.min(1,maxSide/Math.max(image.naturalWidth,image.naturalHeight));
    const canvas=document.createElement("canvas"); canvas.width=Math.max(1,Math.round(image.naturalWidth*scale)); canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
    canvas.getContext("2d").drawImage(image,0,0,canvas.width,canvas.height);
    const src=canvas.toDataURL("image/webp",quality);
    if(src.length>maxChars) throw new Error("too-large");
    return {src,width:canvas.width,height:canvas.height};
  } finally { URL.revokeObjectURL(url); }
}

export async function attachmentFromDrop(event) {
  const files=[...(event.dataTransfer?.files ?? [])];
  if(files.length) {
    const f=files[0]; if(!f.type?.startsWith("image/")) throw new Error("image-only");
    const img=await imageToData(f); return {id:foundry.utils.randomID(),kind:"image",name:f.name,...img};
  }
  const doc=await resolveDraggedDocument(event);
  if(doc) {
    const type=doc.documentName ?? doc.constructor?.metadata?.name ?? "Document";
    const a={id:foundry.utils.randomID(),kind:"document",documentType:type,uuid:doc.uuid,name:doc.name ?? type,img:doc.img||doc.thumbnail||doc.background?.src||""};
    if(type==="Item") a.itemData=sanitizeItem(doc); return a;
  }
  const raw=event.dataTransfer?.getData("text/uri-list")||event.dataTransfer?.getData("text/plain")||""; const value=raw.trim().split(/\r?\n/)[0];
  if(/^https?:\/\//i.test(value)) return {id:foundry.utils.randomID(),kind:/\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(value)?"image":"link",name:value,src:value,url:value};
  throw new Error("unknown-drop");
}

export async function claimItem(message, flag) {
  const a=flag?.attachment; if(game.user.isGM || !a?.itemData || a.documentType!=="Item") return;
  const actor=game.user.character ?? game.actors.find(x=>x.testUserPermission?.(game.user,CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER));
  if(!actor) throw new Error("no-actor");
  const d=foundry.utils.deepClone(a.itemData); delete d._id; await actor.createEmbeddedDocuments("Item",[d]); return actor;
}

export async function openDocument(uuid) { const doc=await fromUuid(uuid); if(doc?.sheet?.render) return doc.sheet.render(true); throw new Error("no-document"); }
