import { reorderSkills } from './reorder-skills.js';
import { patchTemplates } from './patch-templates.js';
import '../styles/main.scss';

Hooks.on('init', async () => {
  // Without waiting at the beginning because we need to be faster than the system's init
  reorderSkills();
  patchTemplates();

  // If something needs to wait, we can do it here
  // await wait(250);
});
