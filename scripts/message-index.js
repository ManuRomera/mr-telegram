import { MODULE_ID, FLAG_KEY, DATA_VERSION } from "./constants.js";

export class MessageIndex {
  constructor() { this.byId = new Map(); this.byChannel = new Map(); }
  flag(message) { try { return message.getFlag(MODULE_ID, FLAG_KEY); } catch { return null; } }
  isOurs(message) { return this.flag(message)?.version === DATA_VERSION; }
  build() {
    this.byId.clear(); this.byChannel.clear();
    for (const m of game.messages.contents) if (this.isOurs(m)) this.add(m, false);
    for (const list of this.byChannel.values()) list.sort((a,b) => this.time(this.byId.get(a)) - this.time(this.byId.get(b)));
  }
  time(m) { return Number(m?.timestamp ?? m?._source?.timestamp ?? 0) || 0; }
  add(message, sort=true) {
    const f = this.flag(message); if (!f?.channelId) return;
    this.byId.set(message.id, message);
    const list = this.byChannel.get(f.channelId) ?? [];
    if (!list.includes(message.id)) list.push(message.id);
    if (sort) list.sort((a,b) => this.time(this.byId.get(a)) - this.time(this.byId.get(b)));
    this.byChannel.set(f.channelId, list);
  }
  update(message) { this.remove(message.id); this.add(message); }
  remove(id) {
    const old = this.byId.get(id); const f = old ? this.flag(old) : null;
    this.byId.delete(id);
    if (f?.channelId) this.byChannel.set(f.channelId, (this.byChannel.get(f.channelId) ?? []).filter(x => x !== id));
  }
  messages(channelId, {visibleOnly=true}={}) {
    const hidden = new Set(["roll-config","roll-trigger","save-config","save-trigger","system-config","gm-note"]);
    return (this.byChannel.get(channelId) ?? []).map(id => this.byId.get(id)).filter(Boolean).filter(m => !visibleOnly || !hidden.has(this.flag(m)?.kind));
  }
  all() { return [...this.byId.values()].sort((a,b) => this.time(a)-this.time(b)); }
}
