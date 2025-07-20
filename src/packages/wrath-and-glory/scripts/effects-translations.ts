import { log } from '~/utils/log';

const SYSTEM_EFFECTS_TRANSLATIONS = {
  wounded: '+1 ST do wszystkich Testów',
  'full-defence': 'Rzut na Inicjatywę',
  'all-out-attack': '+2 dodatkowych kości dla Ataków wręcz',
  unbound: 'Wyzwolona',
  transcendent: 'Transcendentna',
};

const TRAIT_EFFECTS_TRANSLATIONS = {
  // TODO: check if this works
  agonising: 'TRAIT.Agonising',
  arc: 'Atakowanie Pojazdu',
  assult: 'Atakowanie w czasie Sprintu',
  // TODO: check if this works
  brutal: 'TRAIT.Brutal',
  force: {
    0: 'Broń Psioniczna',
    1: 'Broń Psioniczna (nie Psionik)',
  },
  // TODO: check if this works
  flamer: 'CONDITION.OnFire',
  // TODO: check if this works
  heavy: 'TRAIT.Heavy',
  inflict: 'Wywolaj Stan',
  kustom: 'Wybierz Cechę',
  melta: {
    0: 'Termiczna - Krótki zasięg',
    1: 'Termiczna - Krótki zasięg (Pojazd)',
  },
  // TODO: check if this works
  parry: 'TRAIT.Parry',
  // TODO: check if this works
  rad: 'TRAIT.Rad',
  rapidFire: 'Maszynowa - Krótki zasięg',
  sniper: 'Celna - Celowanie',
  spread: 'Rozrzutowa - Horda',
  // TODO: check if this works
  unwieldy: 'TRAIT.Unwieldy',
  // TODO: check if this works
  'waaagh!': 'TRAIT.Waaagh',
  // TODO: check if this works
  warpWeapon: 'TRAIT.WarpWeapon',
  bulk: 'Zmniejsz Prędkość',
  powered: 'Zwiększ Siłę',
  // Commented in the original file
  // shield: 'Dodaj bonusy Tarczy',
  // TODO: check if this works
  powerField: 'TRAIT.PowerField',
};

const STATUS_EFFECTS_TRANSLATIONS = {
  blinded: 'Związane ze wzrokiem',
  fear: '+2 ST do wszystkich Testów',
  hindered: {
    0: '+ST do wszystkich Testów',
    1: 'Wartość',
  },
  pinned: '+2 ST do testów Umiejętności strzeleckich',
  poisoned: '+2 ST do wszystkich Testów',
  terror: '+2 ST do wszystkich Testów',
  vulnerable: {
    0: 'Wartość',
    1: 'Obrona',
  },
  dying: 'Dodatkowa Kość Furii',
};

function executeTranslation(type: 'systemEffects' | 'traitEffects' | 'statusEffects', translations: Record<string, string | Record<number, string>>) {
  Object.entries(translations).forEach(([ key, values ]) => {
    try {
      if (typeof values === 'object') {
        Object.entries<string>(values).forEach(([ index, value ]) => {
          WNG[type][key].system!.scriptData![index as unknown as number].label = value;
        });
      } else {
        WNG[type][key].system!.scriptData![0].label = values;
      }
    } catch (error) {
      log(`Error translating ${type} ${key}: ${error}`);
    }
  });
}

export function translateEffects() {
  executeTranslation('systemEffects', SYSTEM_EFFECTS_TRANSLATIONS);
  executeTranslation('traitEffects', TRAIT_EFFECTS_TRANSLATIONS);
  executeTranslation('statusEffects', STATUS_EFFECTS_TRANSLATIONS);
}
