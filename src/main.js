import { log } from './utils/log.js';
import * as packages from './packages/index.js';

Hooks.on('init', async () => {
  // Without waiting at the beginning because we need to be faster than the system's init
  packages.forEach((pkg) => {
    pkg.init();
    log(`${pkg.PACKAGE} package initialized`);
  });

  // If something needs to wait, we can do it here
  // await wait(250);
});
