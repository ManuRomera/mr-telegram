export const MODULE_ID = "mr-telegram";
export const FLAG_KEY = "message";
export const DATA_VERSION = 1;
export const SOCKET = `module.${MODULE_ID}`;
export const DEFAULT_PAGE_SIZE = 120;
export const MAX_PAGE_SIZE = 500;
export const DRAFT_LIMIT = 10000;

export const THEMES = {
  modern: {
    label: "MRTelegram.Theme.Modern",
    vars: {
      "--mrt-bg": "#0b141a", "--mrt-panel": "#111b21", "--mrt-panel-2": "#202c33",
      "--mrt-text": "#e9edef", "--mrt-muted": "#8696a0", "--mrt-accent": "#00a884",
      "--mrt-incoming": "#202c33", "--mrt-outgoing": "#005c4b", "--mrt-border": "#2a3942",
      "--mrt-font": "Inter, Arial, sans-serif", "--mrt-radius": "12px", "--mrt-pattern": "none"
    }
  },
  telegram1920: {
    label: "MRTelegram.Theme.Telegram1920",
    vars: {
      "--mrt-bg": "#1b120c", "--mrt-panel": "#25170f", "--mrt-panel-2": "#3a2517",
      "--mrt-text": "#f0dfbf", "--mrt-muted": "#b79c76", "--mrt-accent": "#c98a3c",
      "--mrt-incoming": "#ead9b4", "--mrt-outgoing": "#6b2b18", "--mrt-border": "#7b5633",
      "--mrt-font": "Georgia, serif", "--mrt-radius": "5px",
      "--mrt-pattern": "repeating-linear-gradient(45deg,transparent 0 24px,rgba(201,138,60,.04) 24px 25px)"
    }
  },
  letter: {
    label: "MRTelegram.Theme.Letter",
    vars: {
      "--mrt-bg": "#8b7556", "--mrt-panel": "#e7d7b5", "--mrt-panel-2": "#d7c39a",
      "--mrt-text": "#2b2115", "--mrt-muted": "#6f5a3f", "--mrt-accent": "#7f2f26",
      "--mrt-incoming": "#f4ead2", "--mrt-outgoing": "#d7c39a", "--mrt-border": "#927b58",
      "--mrt-font": "Georgia, 'Times New Roman', serif", "--mrt-radius": "2px",
      "--mrt-pattern": "linear-gradient(rgba(90,60,30,.03) 1px,transparent 1px)"
    }
  },
  phosphor: {
    label: "MRTelegram.Theme.Phosphor",
    vars: {
      "--mrt-bg": "#020603", "--mrt-panel": "#031006", "--mrt-panel-2": "#071b0b",
      "--mrt-text": "#7cff8b", "--mrt-muted": "#3fae50", "--mrt-accent": "#a7ffb0",
      "--mrt-incoming": "#071b0b", "--mrt-outgoing": "#0c2b12", "--mrt-border": "#2f7f3e",
      "--mrt-font": "'Courier New', monospace", "--mrt-radius": "0px",
      "--mrt-pattern": "repeating-linear-gradient(0deg,rgba(124,255,139,.025) 0 1px,transparent 1px 3px)"
    }
  },
  amber: {
    label: "MRTelegram.Theme.Amber",
    vars: {
      "--mrt-bg": "#080500", "--mrt-panel": "#130d02", "--mrt-panel-2": "#211704",
      "--mrt-text": "#ffbd55", "--mrt-muted": "#c0782c", "--mrt-accent": "#ffd27a",
      "--mrt-incoming": "#241705", "--mrt-outgoing": "#3a2507", "--mrt-border": "#8d5c1e",
      "--mrt-font": "'Courier New', monospace", "--mrt-radius": "0px",
      "--mrt-pattern": "repeating-linear-gradient(0deg,rgba(255,189,85,.02) 0 1px,transparent 1px 3px)"
    }
  },
  noir: {
    label: "MRTelegram.Theme.Noir",
    vars: {
      "--mrt-bg": "#070707", "--mrt-panel": "#101010", "--mrt-panel-2": "#191919",
      "--mrt-text": "#ededed", "--mrt-muted": "#9b9b9b", "--mrt-accent": "#d7b15b",
      "--mrt-incoming": "#e8e8e8", "--mrt-outgoing": "#242424", "--mrt-border": "#4a4a4a",
      "--mrt-font": "Georgia, serif", "--mrt-radius": "3px",
      "--mrt-pattern": "radial-gradient(circle at 20% 10%,rgba(255,255,255,.035),transparent 34%)"
    }
  },
  clean: {
    label: "MRTelegram.Theme.Clean",
    vars: {
      "--mrt-bg": "#eef1f4", "--mrt-panel": "#ffffff", "--mrt-panel-2": "#f5f7f9",
      "--mrt-text": "#20252b", "--mrt-muted": "#68717b", "--mrt-accent": "#406bd8",
      "--mrt-incoming": "#ffffff", "--mrt-outgoing": "#dfe8ff", "--mrt-border": "#ccd3da",
      "--mrt-font": "Inter, Arial, sans-serif", "--mrt-radius": "10px", "--mrt-pattern": "none"
    }
  }
};
