import module from '~/module.json';
import { reorderSkills } from './scripts/reorder-skills';
import { patchTemplates } from './scripts/patch-templates';

export const PACKAGE = 'wrath-and-glory';
export const REPO = 'moo-man/WrathAndGlory-FoundryVTT';
export const SUPPORTED_VERSION = module.relationships.systems[0].compatibility.verified;

export function init() {
  reorderSkills();
  patchTemplates();
}
