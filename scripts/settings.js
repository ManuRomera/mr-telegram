import { MODULE_ID, THEMES, NOTIFICATION_SOUNDS } from "./constants.js";

export function registerSettings() {
  game.settings.register(MODULE_ID, "worldTheme", {
    name: "MRTelegram.Settings.WorldTheme.Name",
    hint: "MRTelegram.Settings.WorldTheme.Hint",
    scope: "world", config: true, type: String, default: "modern",
    choices: Object.fromEntries(Object.entries(THEMES).map(([k,v]) => [k, game.i18n.localize(v.label)])),
    restricted: true
  });
  game.settings.register(MODULE_ID, "theme", {
    name: "MRTelegram.Settings.Theme.Name",
    hint: "MRTelegram.Settings.Theme.Hint",
    scope: "client", config: true, type: String, default: "world",
    choices: { world: game.i18n.localize("MRTelegram.Theme.World"), ...Object.fromEntries(Object.entries(THEMES).map(([k,v]) => [k, game.i18n.localize(v.label)])), custom: game.i18n.localize("MRTelegram.Theme.Custom") }
  });
  game.settings.register(MODULE_ID, "autoOpen", {
    name: "MRTelegram.Settings.AutoOpen.Name", hint: "MRTelegram.Settings.AutoOpen.Hint",
    scope: "client", config: true, type: Boolean, default: false
  });
  game.settings.register(MODULE_ID, "sound", {
    name: "MRTelegram.Settings.Sound.Name", hint: "MRTelegram.Settings.Sound.Hint",
    scope: "client", config: true, type: Boolean, default: true
  });
  game.settings.register(MODULE_ID, "notificationSound", {
    name: "MRTelegram.Settings.NotificationSound.Name", hint: "MRTelegram.Settings.NotificationSound.Hint",
    scope: "client", config: true, type: String, default: "auto",
    choices: {
      auto: game.i18n.localize("MRTelegram.Sound.Auto"),
      ...Object.fromEntries(Object.entries(NOTIFICATION_SOUNDS).map(([key, value]) => [key, game.i18n.localize(value.label)]))
    }
  });
  game.settings.register(MODULE_ID, "textScale", {
    name: "MRTelegram.Settings.TextScale.Name", hint: "MRTelegram.Settings.TextScale.Hint",
    scope: "client", config: true, type: String, default: "normal",
    choices: { normal: "A", large: "A+", xl: "A++" }
  });
  for (const [key, def] of Object.entries({ highContrast:false, readingMode:false, reduceMotion:false })) {
    game.settings.register(MODULE_ID, key, {
      name: `MRTelegram.Settings.${key}.Name`, hint: `MRTelegram.Settings.${key}.Hint`,
      scope: "client", config: true, type: Boolean, default: def
    });
  }
  game.settings.register(MODULE_ID, "pageSize", {
    name: "MRTelegram.Settings.PageSize.Name", hint: "MRTelegram.Settings.PageSize.Hint",
    scope: "client", config: true, type: Number, default: 120, range: { min: 50, max: 500, step: 10 }
  });
  game.settings.register(MODULE_ID, "customTheme", { scope:"client", config:false, type:String, default:"{}" });
  game.settings.register(MODULE_ID, "templates", { scope:"client", config:false, type:String, default:"[]" });
  game.settings.register(MODULE_ID, "legacyImportDone", { scope:"world", config:false, type:Boolean, default:false, restricted:true });
}

export function getThemeName() {
  const theme = game.settings.get(MODULE_ID, "theme");
  return theme === "world" ? game.settings.get(MODULE_ID, "worldTheme") : theme;
}

export function getCustomTheme() {
  try { return JSON.parse(game.settings.get(MODULE_ID, "customTheme") || "{}"); }
  catch { return {}; }
}

export function getNotificationSound() {
  const selected = game.settings.get(MODULE_ID, "notificationSound");
  const themeName = getThemeName();
  const automatic = themeName === "custom" ? "modern" : THEMES[themeName]?.sound ?? "modern";
  return NOTIFICATION_SOUNDS[selected === "auto" ? automatic : selected] ?? NOTIFICATION_SOUNDS.modern;
}
