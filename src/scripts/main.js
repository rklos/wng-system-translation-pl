import { wait } from './utils/wait.js';
import { reorderSkills } from './reorder-skills.js';
import { patchTemplates } from './patch-templates.js';

Hooks.on('init', async () => {
  await wait(250);
  reorderSkills();
  patchTemplates();
});
