import module from '~/module.json';
import { applyPatches } from '~/utils/apply-patches';
import { reorderSkills } from './scripts/reorder-skills';
import { translateConfig } from './scripts/config-translations';
import { translateEffects } from './scripts/effects-translations';
import { translateShifts } from './scripts/shift-translations';

export const PACKAGE = 'wrath-and-glory';
export const REPO = 'moo-man/WrathAndGlory-FoundryVTT';
export const SUPPORTED_VERSION = module.relationships.systems[0].compatibility.verified;

export function init() {
  reorderSkills();
  translateConfig();
  translateEffects();
  translateShifts();
  applyPatches(PACKAGE);
}
