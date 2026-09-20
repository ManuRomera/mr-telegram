export const MausritterAdapter = {
  id: "mausritter",
  matches: () => String(game.system?.id ?? "").toLowerCase().includes("mausritter"),
  stats: {
    strength:{label:"STR",paths:["system.stats.strength.value","system.stats.str.value","system.strength.value","system.str.value"]},
    dexterity:{label:"DEX",paths:["system.stats.dexterity.value","system.stats.dex.value","system.dexterity.value","system.dex.value"]},
    will:{label:"WIL",paths:["system.stats.will.value","system.stats.wil.value","system.will.value","system.wil.value"]}
  },
  actorForUser(user) {
    const c=user?.character; if (c?.documentName==="Actor") return c;
    const id=typeof c==="string"?c:(user?._source?.character ?? user?.characterId); if(id && game.actors.get(id)) return game.actors.get(id);
    const owner=CONST.DOCUMENT_OWNERSHIP_LEVELS?.OWNER ?? 3;
    return game.actors.find(a => a.testUserPermission?.(user, owner)) ?? null;
  },
  statValue(actor,key) {
    for (const p of this.stats[key]?.paths ?? []) { const n=Number(foundry.utils.getProperty(actor,p)); if(Number.isFinite(n)) return n; }
    return null;
  }
};
