import { wait } from './utils/wait.js';
import { reorderSkills } from './reorder-skills.js';
import { overrideTemplates } from './override-templates.js';

Hooks.on('init', async () => {
  await wait(250);
  reorderSkills();
  overrideTemplates();
});
