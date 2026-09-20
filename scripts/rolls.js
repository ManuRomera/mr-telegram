import { MODULE_ID, FLAG_KEY } from "./constants.js";
import { MausritterAdapter } from "./adapters/mausritter.js";

const flag = m => { try { return m.getFlag(MODULE_ID, FLAG_KEY); } catch { return null; } };

export class RollService {
  constructor(index, messages) { this.index=index; this.messages=messages; this.processing=new Set(); }
  find(kind, requestId) { return this.index.all().find(m => { const f=flag(m); return f?.kind===kind && f?.requestId===requestId; }); }
  async trigger(requestMessage) {
    const f=flag(requestMessage); if (!f || game.user.isGM || f.playerId!==game.user.id || f.status!=="pending") return;
    if (this.find("roll-trigger", f.requestId)) return;
    await this.messages.create({playerId:game.user.id,kind:"roll-trigger",data:{senderId:game.user.id,requestId:f.requestId}});
  }
  processingGM() {
    return game.users.filter(u=>u.isGM && u.active).sort((a,b)=>String(a.id).localeCompare(String(b.id)))[0] ?? game.users.filter(u=>u.isGM).sort((a,b)=>String(a.id).localeCompare(String(b.id)))[0] ?? null;
  }
  async processTrigger(triggerMessage) {
    if (!game.user.isGM || this.processingGM()?.id !== game.user.id) return;
    const tf=flag(triggerMessage); if (!tf || tf.kind!=="roll-trigger" || this.processing.has(tf.requestId)) return;
    const configMessage=this.find("roll-config",tf.requestId); const request=this.find("roll-request",tf.requestId);
    const config=flag(configMessage); if (!configMessage || !request || config?.status!=="pending" || this.find("roll-result",tf.requestId)) return;
    this.processing.add(tf.requestId);
    try {
      await configMessage.setFlag(MODULE_ID, FLAG_KEY, {...config,status:"processing"});
      let formula=config.formula || "1d20";
      let compare=config.compare;
      let target=Number(config.target);
      let label=config.label;
      if (config.adapter === "mausritter" && MausritterAdapter.matches()) {
        const player=game.users.get(config.playerId);
        const actor=MausritterAdapter.actorForUser(player);
        const current=MausritterAdapter.statValue(actor, config.statKey);
        if (!actor || !Number.isFinite(current)) throw new Error("mausritter-stat");
        formula=config.mode === "advantage" ? "2d20kl" : config.mode === "disadvantage" ? "2d20kh" : "1d20";
        compare="lte"; target=current; label=config.label || `${MausritterAdapter.stats[config.statKey]?.label ?? config.statKey} Save`;
      }
      const roll=await new Roll(formula).evaluate();
      if (game.dice3d?.showForRoll) await game.dice3d.showForRoll(roll, game.user, false, [game.user.id], false);
      const total=Number(roll.total); let success=null;
      if (compare==="lte" && Number.isFinite(target)) success=total<=target;
      if (compare==="gte" && Number.isFinite(target)) success=total>=target;
      const result=await this.messages.create({playerId:config.playerId,kind:"roll-result",gmOnly:true,data:{senderId:game.user.id,requestId:config.requestId,label,formula,compare,target,total,success,status:"hidden",adapter:config.adapter,statKey:config.statKey,mode:config.mode}});
      await configMessage.setFlag(MODULE_ID,FLAG_KEY,{...config,status:"rolled",resultMessageId:result.id});
      await request.setFlag(MODULE_ID,FLAG_KEY,{...flag(request),status:"rolled",resultMessageId:result.id});
    } catch(e) {
      console.error(`${MODULE_ID} | roll`, e);
      try { await configMessage.setFlag(MODULE_ID,FLAG_KEY,{...config,status:"pending"}); } catch {}
      ui.notifications.error(game.i18n.localize("MRTelegram.Errors.Roll"));
    } finally { this.processing.delete(tf.requestId); }
  }
  async reveal(resultMessage, mode="full") {
    if (!game.user.isGM) return;
    const f=flag(resultMessage); if (!f || f.kind!=="roll-result") return;
    await this.messages.create({playerId:f.playerId,kind:"roll-reveal",data:{senderId:game.user.id,requestId:f.requestId,label:f.label,total:mode==="full"?f.total:null,target:mode==="full"?f.target:null,success:f.success,revealMode:mode}});
    await resultMessage.setFlag(MODULE_ID,FLAG_KEY,{...f,status:"revealed",revealMode:mode});
    const req=this.find("roll-request",f.requestId); if(req) await req.setFlag(MODULE_ID,FLAG_KEY,{...flag(req),status:"revealed"});
  }
  async processPending() { if (!game.user.isGM) return; for (const m of this.index.all()) if (flag(m)?.kind==="roll-trigger") await this.processTrigger(m); }
}
