import { MODULE_ID, FLAG_KEY } from "./constants.js";
import { registerSettings } from "./settings.js";
import { MessageIndex } from "./message-index.js";
import { MessageService } from "./messages.js";
import { RollService } from "./rolls.js";
import { TelegramApp } from "./app.js";
import { importLegacyR8 } from "./legacy.js";

let index, messages, rolls, app;
const isOurs=m=>{try{return !!m.getFlag(MODULE_ID,FLAG_KEY);}catch{return false;}};

Hooks.once("init",()=>{
  registerSettings();
  game.keybindings.register(MODULE_ID,"open",{name:"MRTelegram.Keybinding.Open",hint:"MRTelegram.Keybinding.OpenHint",editable:[{key:"KeyM",modifiers:["CONTROL","SHIFT"]}],onDown:()=>{app?.open();return true;},restricted:false});
});

Hooks.once("ready",async()=>{
  index=new MessageIndex(); index.build(); messages=new MessageService(index); rolls=new RollService(index,messages); app=new TelegramApp(index,messages,rolls); await app.loadReadState(); app.ensureLauncher();
  game.socket.on(`module.${MODULE_ID}`,payload=>{if(payload?.type==="read")app.onRead(payload);});
  globalThis.MRTelegram={open:()=>app.open(),close:()=>app.close(),app,index,messages,rolls,version:"1.1.1"};
  if(game.user.isGM){const r=await importLegacyR8();if(r.imported){index.build();ui.notifications.info(game.i18n.format("MRTelegram.LegacyImported",{count:r.imported}));}await rolls.processPending();}
  if(game.settings.get(MODULE_ID,"autoOpen")) app.open();
});

Hooks.on("createChatMessage",async m=>{if(!isOurs(m))return;index.add(m);const f=m.getFlag(MODULE_ID,FLAG_KEY);if(game.user.isGM&&f?.kind==="roll-trigger")await rolls.processTrigger(m);app.onMessageCreate(m);});
Hooks.on("updateChatMessage",m=>{if(!isOurs(m))return;index.update(m);app.onMessageUpdate(m);});
Hooks.on("deleteChatMessage",m=>{if(!isOurs(m))return;index.remove(m.id);app.onMessageDelete(m);});

function hideCore(message,html){if(!isOurs(message))return;const el=html?.[0]??html;if(el instanceof HTMLElement)el.style.display="none";}
Hooks.on("renderChatMessageHTML",hideCore);
Hooks.on("renderChatMessage",hideCore);

Hooks.on("updateUser", user=>{ if(!app) return; if(app.root && app.root.style.display!=="none"){ app.renderSidebar(); app.renderHeader(); } app.updateLauncher(); });
