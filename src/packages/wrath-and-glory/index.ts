import module from '~/module.json';
import { applyPatches } from '~/utils/apply-patches';
import { reorderSkills } from './scripts/reorder-skills';
import { translateConfig } from './scripts/config-translations';
import { translateEffects } from './scripts/effects-translations';
import { translateShifts } from './scripts/shift-translations';
import { translateItemTabs } from './scripts/item-tabs-translation';
import { translateRollDialogTooltip } from './scripts/roll-dialog-tooltip-translation';

export const PACKAGE = 'wrath-and-glory';
export const REPO = 'moo-man/WrathAndGlory-FoundryVTT';
export const SUPPORTED_VERSION = module.relationships.systems[0].compatibility.verified;

export function init() {
  reorderSkills();
  translateConfig();
  translateEffects();
  translateShifts();
  translateItemTabs();
  translateRollDialogTooltip();
  applyPatches(PACKAGE);
}
