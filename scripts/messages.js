import { MODULE_ID, FLAG_KEY, DATA_VERSION } from "./constants.js";

export class MessageService {
  constructor(index) { this.index = index; this.queue = Promise.resolve(); }
  gmIds() { return game.users.filter(u => u.isGM).map(u => u.id); }
  channelId(playerId) { return `player:${playerId}`; }
  recipients(playerId, gmOnly=false) { return gmOnly ? this.gmIds() : [...new Set([...this.gmIds(), playerId])]; }
  currentPlayerId(selectedPlayerId) { return game.user.isGM ? selectedPlayerId : game.user.id; }
  enqueue(fn) { const run = this.queue.then(fn, fn); this.queue = run.catch(() => {}); return run; }
  async create({playerId, kind="text", data={}, content="", gmOnly=false}) {
    if (!playerId) throw new Error("Missing playerId");
    if (!game.user.isGM && playerId !== game.user.id) throw new Error("M.R.- Telegram: players may only write to their own GM channel.");
    if (!game.user.isGM && gmOnly) throw new Error("M.R.- Telegram: GM-only messages require a GM user.");
    const channelId = this.channelId(playerId);
    return ChatMessage.create({
      content: content || `<div>🔒 M.R.- Telegram</div>`,
      whisper: this.recipients(playerId, gmOnly),
      flags: { [MODULE_ID]: { [FLAG_KEY]: { version:DATA_VERSION, channelId, playerId, kind, created:Date.now(), ...data } } }
    });
  }
  sendText(playerId, text, replyTo=null) {
    text = String(text ?? "").trim(); if (!text) return Promise.resolve(null);
    return this.enqueue(() => this.create({ playerId, kind:"text", data:{senderId:game.user.id,text,replyTo}, content:`<div><strong>🔒 ${foundry.utils.escapeHTML(game.user.name)}</strong><br>${foundry.utils.escapeHTML(text)}</div>` }));
  }
  async sendBulk(playerIds, text) {
    if (!game.user.isGM) throw new Error("M.R.- Telegram: bulk send is GM-only.");
    text = String(text ?? "").trim(); if (!text) return;
    const bulkId = foundry.utils.randomID();
    for (const playerId of [...new Set(playerIds)]) await this.create({playerId, kind:"text", data:{senderId:game.user.id,text,bulk:true,bulkId}});
  }
  async addNote(playerId, note) { if(!game.user.isGM) throw new Error("M.R.- Telegram: notes are GM-only."); return this.create({playerId, kind:"gm-note", gmOnly:true, data:{senderId:game.user.id,note}}); }
  async sendAttachment(playerId, attachment) { return this.create({playerId, kind:"attachment", data:{senderId:game.user.id,attachment}}); }
  async requestRoll(playerId, config) {
    if(!game.user.isGM) throw new Error("M.R.- Telegram: roll requests are GM-only.");
    const requestId = foundry.utils.randomID();
    await this.create({playerId,kind:"roll-config",gmOnly:true,data:{senderId:game.user.id,requestId,status:"pending",...config}});
    return this.create({playerId,kind:"roll-request",data:{senderId:game.user.id,requestId,status:"pending",label:config.label,description:config.description,showTarget:config.showTarget,target:config.showTarget?config.target:null,compare:config.showTarget?config.compare:null}});
  }
}
