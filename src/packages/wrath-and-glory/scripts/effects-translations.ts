import { log } from '~/utils/log';

const SYSTEM_EFFECTS_TRANSLATIONS = {
  wounded: '+1 ST do wszystkich Testów',
  'full-defence': 'Rzut na Inicjatywę',
  'all-out-attack': '+2 dodatkowych kości dla Ataków wręcz',
  unbound: 'Wyzwolona',
  transcendent: 'Transcendentna',
};

const TRAIT_EFFECTS_TRANSLATIONS = {
  agonising: 'TRAIT.Agonising',
  arc: 'Atakowanie Pojazdu',
  assault: 'Atakowanie w czasie Sprintu',
  brutal: 'TRAIT.Brutal',
  force: {
    0: 'Broń Psioniczna',
    1: 'Broń Psioniczna (nie Psionik)',
  },
  flamer: 'CONDITION.OnFire',
  heavy: 'TRAIT.Heavy',
  inflict: 'Wywolaj Stan',
  kustom: 'Wybierz Cechę',
  melta: {
    0: 'Termiczna - Krótki zasięg',
    1: 'Termiczna - Krótki zasięg (Pojazd)',
  },
  parry: 'TRAIT.Parry',
  rad: 'TRAIT.Rad',
  rapidFire: 'Maszynowa - Krótki zasięg',
  sniper: 'Celna - Celowanie',
  spread: 'Rozrzutowa - Horda',
  unwieldy: 'TRAIT.Unwieldy',
  'waaagh!': 'TRAIT.Waaagh',
  warpWeapons: 'TRAIT.WarpWeapon',
  bulk: 'Zmniejsz Prędkość',
  powered: 'Zwiększ Siłę',
  // Commented in the original file
  // shield: 'Dodaj bonusy Tarczy',
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
  const config = type === 'statusEffects'
    ? CONFIG.statusEffects
    : WNG[type];

  const findEffect = (key: string) => {
    if (Array.isArray(config)) {
      return config.find((effect) => effect.id === key);
    }

    return config[key];
  };

  Object.entries(translations).forEach(([ key, values ]) => {
    try {
      if (typeof values !== 'object') {
        findEffect(key)!.system!.scriptData![0].label = values;
        return;
      }

      Object.entries<string>(values).forEach(([ index, value ]) => {
        findEffect(key)!.system!.scriptData![index as unknown as number].label = value;
      });
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
