import { MODULE_ID, FLAG_KEY, DATA_VERSION } from "./constants.js";

export async function importLegacyR8() {
  if (!game.user.isGM || game.settings.get(MODULE_ID,"legacyImportDone")) return {imported:0};
  const legacy=[];
  for (const m of game.messages.contents) {
    let f=null; try { f=m.getFlag("world","r8SecretCommsV3"); } catch {}
    if(f?.version===3 && f.playerId) legacy.push({m,f});
  }
  let imported=0;
  for (const {m,f} of legacy) {
    const current=m.getFlag(MODULE_ID,FLAG_KEY); if(current) continue;
    await m.setFlag(MODULE_ID,FLAG_KEY,{...foundry.utils.deepClone(f),version:DATA_VERSION,channelId:`player:${f.playerId}`,legacy:true}); imported++;
  }
  await game.settings.set(MODULE_ID,"legacyImportDone",true);
  return {imported};
}
