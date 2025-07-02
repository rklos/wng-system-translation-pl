import { reorderSkills } from './scripts/reorder-skills.js';
import { patchTemplates } from './scripts/patch-templates.js';
import module from '../../module.json';
import './styles/main.scss';

export const PACKAGE = 'wrath-and-glory';
export const SUPPORTED_VERSION = module.relationships.systems[0].compatibility.verified;
export const REPO = 'moo-man/WrathAndGlory-FoundryVTT';

export function init() {
  reorderSkills();
  patchTemplates();
}
