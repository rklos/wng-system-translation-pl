import { log } from './utils/log.js';

export const TEMPLATES_PATCHES = {
  'apps/item-traits': {
    'ITEM TRAITS': 'CECHY PRZEDMIOTU',
    'Custom Traits': 'Dodatkowe Cechy',
    'FORMAT - Trait 1: Trait 1 Description | Trait 2: Trait 2 Description | etc.': 'FORMAT - Cecha 1: Opis Cechy 1. | Cecha 2: Opis Cechy 2. | itd.',
  },
  'chat/roll/ability/ability-use': {
    'Roll Damage': 'Rzuć na Obrażenia',
  },
  'chat/roll/base/base-buttons': {
    'Roll Damage': 'Rzuć na Obrażenia',
  },
  'chat/roll/base/dice-container': {
    Shifted: 'Przeniesione',
  },
  'chat/roll/common/common-buttons': {
    'Roll Complication': 'Rzuć na Komplikację',
  },
  'chat/roll/corruption/corruption-buttons': {
    'Roll Complication': 'Rzuć na Komplikację',
  },
  'chat/roll/damage/damage-roll': {
    '{{context.title}} - Damage': '{{context.title}} - Obrażenia',
    'Applied Damage': 'Zadane Obrażenia',
    'Apply Damage': 'Zadaj Obrażenia',
  },
  'chat/roll/mutation/mutation-buttons': {
    'Roll Complication': 'Rzuć na Komplikację',
  },
  'chat/roll/mutation/mutation-roll': {
    'Roll Mutation': 'Rzuć na Mutację',
  },
  'chat/roll/power/power-buttons': {
    Potency: 'Moc',
    Spent: 'Użyto',
    'Perils of the Warp': 'Groza Osnowy',
  },
  'chat/roll/weapon/weapon-buttons': {
    'Roll Complication': 'Rzuć na Komplikację',
    'Roll Critical Hit': 'Rzuć na Trafienie Krytyczne',
  },
  'dialog/attack-roll': {
    '<label style="visibility: hidden">ED</label>': '<label style="visibility: hidden">DK</label>',
    '<div>Value</div>': '<div>Wartość</div>',
    '<div>Dice</div>': '<div>Kość</div>',
  },
};

export function patchTemplates() {
  Object.keys(TEMPLATES_PATCHES).forEach(async (path) => {
    const originalPath = `systems/wrath-and-glory/templates/${path}.hbs`;

    let htmlString = await new Promise((resolve, reject) => {
      game.socket.emit('template', originalPath, (resp) => {
        if (resp.error) return reject(new Error(resp.error));
        return resolve(resp.html);
      });
    });

    if (path in TEMPLATES_PATCHES) {
      const patches = TEMPLATES_PATCHES[path];
      Object.entries(patches).forEach(([ english, polish ]) => {
        htmlString = htmlString.replaceAll(english, polish);
      });
    }

    const compiled = Handlebars.compile(htmlString);
    Handlebars.registerPartial(originalPath, compiled);

    log(`Overridden template: ${originalPath}`);
  });
}
