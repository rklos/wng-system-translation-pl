import fs from 'fs';
import chalk from 'chalk';
import { getLatestChanges } from './get-latest-changes.js';

const repos = {
  'system': 'moo-man/WrathAndGlory-FoundryVTT',
  'warhammer-library': 'moo-man/WarhammerLibrary-FVTT',
};

async function checkTemplates(changes, name) {
  // In the future we will need the name to differentiate between system's and library's templates
  // but for now we have only system's templates

  const templateChanges = changes.changedFiles.filter(file => {
    return file.filename.endsWith('.hbs') && 
           fs.existsSync(`template/${file.filename}`);
  });

  if (templateChanges.length > 0) {
    console.log(chalk.blue('\nModified templates:'));
    templateChanges.forEach(file => {
      console.log(chalk.yellow(`${file.status === 'modified' ? 'M' : 'D'} ${file.filename}`));
    });
  } else {
    console.log(chalk.green('No template changes found'));
  }
  
  return templateChanges.length > 0;
}

async function checkTranslations(changes, name, repo) {
  const translationChanges = changes.changedFiles.filter(file => {
    return file.filename.startsWith('lang/') && file.filename.endsWith('.json');
  });

  if (translationChanges.length > 0) {
    console.log(chalk.blue('\nModified translation files:'));
    translationChanges.forEach(file => {
      console.log(chalk.yellow(`${file.status === 'modified' ? 'M' : 'D'} ${file.filename}`));
    });
  }

  // Always check translations, even if no changes were detected
  const response = await fetch(
    `https://raw.githubusercontent.com/${repo}/refs/tags/${changes.tagName}/static/lang/en.json`
  );
  const remoteJson = await response.json();
  
  // Read local translation file
  let localJson;
  try {
    localJson = JSON.parse(fs.readFileSync(`src/lang/${name}.json`, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') {
      localJson = {};
    } else {
      throw error;
    }
  }

  // Compare translations
  const missingKeys = [];
  const extraKeys = [];

  function findDifferences(localObj, remoteObj, path = '') {
    for (const key in remoteObj) {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof remoteObj[key] === 'object' && remoteObj[key] !== null) {
        if (!localObj[key]) {
          missingKeys.push(currentPath);
        } else {
          findDifferences(localObj[key], remoteObj[key], currentPath);
        }
      } else if (!localObj[key]) {
        missingKeys.push(currentPath);
      }
    }
    
    for (const key in localObj) {
      if (key.startsWith('//')) continue;
      
      const currentPath = path ? `${path}.${key}` : key;
      if (!remoteObj[key]) {
        extraKeys.push(currentPath);
      }
    }
  }

  findDifferences(localJson, remoteJson);

  if (missingKeys.length > 0) {
    console.log(chalk.red('\nMissing translations:'));
    missingKeys.forEach(key => console.log(chalk.red(`- ${key}`)));
  }
  if (extraKeys.length > 0) {
    console.log(chalk.yellow('\nExtra translations:'));
    extraKeys.forEach(key => console.log(chalk.yellow(`+ ${key}`)));
  }
  if (missingKeys.length === 0 && extraKeys.length === 0) {
    console.log(chalk.green('\nNo translation differences found'));
  }
}

async function checkChanges() {
  for (const [name, repo] of Object.entries(repos)) {
    try {
      console.log(chalk.blue(`\n=== Checking ${name} ===`));
      
      // Get latest changes
      const changes = await getLatestChanges(repo);

      await checkTemplates(changes, name);
      await checkTranslations(changes, name, repo);

    } catch (error) {
      console.error(chalk.red(`Error processing ${name}:`), error);
    }
  }
}

checkChanges().catch(console.error);
