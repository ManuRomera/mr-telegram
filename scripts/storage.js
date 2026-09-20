import { MODULE_ID, DRAFT_LIMIT } from "./constants.js";

function prefix() { return `${MODULE_ID}:${game.world?.id ?? "world"}:${game.user?.id ?? "user"}`; }
function key(name) { return `${prefix()}:${name}`; }

export const LocalStore = {
  getJSON(name, fallback={}) {
    try { const raw = localStorage.getItem(key(name)); return raw ? JSON.parse(raw) : fallback; }
    catch { return fallback; }
  },
  setJSON(name, value) {
    try { localStorage.setItem(key(name), JSON.stringify(value)); } catch (e) { console.warn(`${MODULE_ID} | localStorage`, e); }
  },
  getDraft(channelId) {
    const drafts = this.getJSON("drafts", {});
    return String(drafts[channelId] ?? "");
  },
  setDraft(channelId, value) {
    if (!channelId) return;
    const drafts = this.getJSON("drafts", {});
    drafts[channelId] = String(value ?? "").slice(0, DRAFT_LIMIT);
    this.setJSON("drafts", drafts);
  },
  clearDraft(channelId) {
    const drafts = this.getJSON("drafts", {}); delete drafts[channelId]; this.setJSON("drafts", drafts);
  },
  getWindow() { return this.getJSON("window", null); },
  setWindow(value) { this.setJSON("window", value); },
  getReply(channelId) { return this.getJSON("replies", {})[channelId] ?? null; },
  setReply(channelId, reply) {
    const data = this.getJSON("replies", {}); if (reply) data[channelId] = reply; else delete data[channelId]; this.setJSON("replies", data);
  }
};
