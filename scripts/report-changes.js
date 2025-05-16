import fs from 'fs';

const langFiles = {
  'system': 'https://raw.githubusercontent.com/moo-man/WrathAndGlory-FoundryVTT/refs/heads/master/static/lang/en.json',
  'warhammer-library': 'https://raw.githubusercontent.com/moo-man/WarhammerLibrary-FVTT/refs/heads/master/static/lang/en.json',
};

async function fetchAndCompareTranslations() {
  for (const [localFile, remoteUrl] of Object.entries(langFiles)) {
    try {
      // Fetch remote English version
      const response = await fetch(remoteUrl);
      const remoteJson = await response.json();
      
      // Read local translated version
      const localJson = JSON.parse(fs.readFileSync(`src/lang/${localFile}.json`, 'utf8'));
      
      // Get all keys from both files, filtering out comment keys from local
      const remoteKeys = new Set(Object.keys(remoteJson));
      const localKeys = new Set(Object.keys(localJson).filter(key => !key.startsWith('//')));
      
      // Find missing and extra keys
      const missingKeys = [...remoteKeys].filter(key => !localKeys.has(key));
      const extraKeys = [...localKeys].filter(key => !remoteKeys.has(key));
      
      // Report differences
      console.log(`\n=== ${localFile} ===`);
      if (missingKeys.length > 0) {
        console.log('\nMissing translations:');
        missingKeys.forEach(key => console.log(`- ${key}`));
      }
      if (extraKeys.length > 0) {
        console.log('\nExtra translations:');
        extraKeys.forEach(key => console.log(`+ ${key}`));
      }
      if (missingKeys.length === 0 && extraKeys.length === 0) {
        console.log('No differences found');
      }
    } catch (error) {
      console.error(`Error processing ${localFile}:`, error);
    }
  }
}

fetchAndCompareTranslations().catch(console.error);

