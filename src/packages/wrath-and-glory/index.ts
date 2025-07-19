import module from '~/module.json';
import { applyPatches } from '~/utils/apply-patches';
import { reorderSkills } from './scripts/reorder-skills';
import { translateVehicleTraits } from './scripts/vehicle-traits';

export const PACKAGE = 'wrath-and-glory';
export const REPO = 'moo-man/WrathAndGlory-FoundryVTT';
export const SUPPORTED_VERSION = module.relationships.systems[0].compatibility.verified;

export function init() {
  reorderSkills();
  translateVehicleTraits();
  applyPatches(PACKAGE);
}
