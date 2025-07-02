import chalk from 'chalk';
import { checkTemplates, checkTranslations } from './checks/index.js';
import { getLatestChanges } from './get-latest-changes.js';
import { sendNotification, reportError } from '../utils/discord.js';
import * as packages from '../../src/packages/index.js';

const PACKAGES_TO_CHECK = [ packages.system, packages.warhammerLibrary ];

async function checkChanges() {
  for (const pkg of PACKAGES_TO_CHECK) {
    try {
      console.log(chalk.blue(`\n=== Checking ${pkg.PACKAGE} ===`));
      const changes = await getLatestChanges(pkg.REPO, pkg.SUPPORTED_VERSION);

      let hasChanges = false;
      hasChanges = await checkTemplates(pkg, changes) || hasChanges;
      hasChanges = await checkTranslations(pkg, changes) || hasChanges;

      if (hasChanges) await sendNotification('Changes Check', `Changes found in ${pkg.PACKAGE}`);
    } catch (error) {
      console.error(chalk.red(`Error processing ${module.lang}:`), error);
      await reportError('Changes Check', error.message);
    }
  }
}

checkChanges().catch(console.error);
