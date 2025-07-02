import fs from 'fs';
import chalk from 'chalk';

export async function checkTranslations(pkg, changes) {
  const translationChanges = changes.changedFiles.filter((file) => file.filename.startsWith('lang/') && file.filename.endsWith('.json'));

  if (translationChanges.length > 0) {
    console.log(chalk.blue('\nModified translation files:'));
    translationChanges.forEach((file) => console.log(chalk.yellow(`${file.status === 'modified' ? 'M' : 'D'} ${file.filename}`)));
  }

  const response = await fetch(
    `https://raw.githubusercontent.com/${pkg.REPO}/refs/tags/${changes.tagName}/static/lang/en.json`,
  );
  const remoteJson = await response.json();

  let localJson = {};
  try {
    localJson = JSON.parse(fs.readFileSync(`src/packages/${pkg.PACKAGE}/lang.json`, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  const missingKeys = [];
  const extraKeys = [];

  function findDifferences(localObj, remoteObj, path = '') {
    for (const key in remoteObj) {
      const currentPath = path ? `${path}.${key}` : key;

      if (typeof remoteObj[key] === 'object' && remoteObj[key] != null) {
        if (localObj[key] == null) {
          missingKeys.push(currentPath);
        } else {
          findDifferences(localObj[key], remoteObj[key], currentPath);
        }
      } else if (localObj[key] == null) {
        missingKeys.push(currentPath);
      }
    }

    for (const key in localObj) {
      if (key.startsWith('//')) continue;
      const currentPath = path ? `${path}.${key}` : key;
      if (remoteObj[key] == null) extraKeys.push(currentPath);
    }
  }

  findDifferences(localJson, remoteJson);

  if (missingKeys.length > 0) {
    console.log(chalk.red('\nMissing translations:'));
    missingKeys.forEach((key) => console.log(chalk.red(`- ${key}`)));
  }
  if (extraKeys.length > 0) {
    console.log(chalk.yellow('\nExtra translations:'));
    extraKeys.forEach((key) => console.log(chalk.yellow(`+ ${key}`)));
  }
  if (missingKeys.length === 0 && extraKeys.length === 0) {
    console.log(chalk.green('\nNo translation differences found'));
  }

  return missingKeys.length > 0 || extraKeys.length > 0;
}