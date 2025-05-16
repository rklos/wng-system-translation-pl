import fs from 'fs';

const langFiles = {
  'system': 'https://raw.githubusercontent.com/moo-man/WrathAndGlory-FoundryVTT/refs/heads/master/static/lang/en.json',
  'warhammer-library': 'https://raw.githubusercontent.com/moo-man/WarhammerLibrary-FVTT/refs/heads/master/static/lang/en.json',
};

async function processTranslations(shouldApply = false) {
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

      // Apply changes if requested
      if (shouldApply && missingKeys.length > 0) {
        console.log('\nApplying missing translations:');
        
        // Create new object maintaining original order
        const newJson = {};
        let addedKeys = new Set();
        
        // First add all existing local keys in their original order
        for (const key of Object.keys(localJson)) {
          newJson[key] = localJson[key];
          
          if (key.startsWith('//')) continue;
          
          // Find and add any missing keys that should come after this key
          const nextKey = Object.keys(remoteJson).find(k => 
            !addedKeys.has(k) && 
            Object.keys(remoteJson).indexOf(k) > Object.keys(remoteJson).indexOf(key)
          );
          
          if (nextKey && missingKeys.includes(nextKey)) {
            newJson[nextKey] = remoteJson[nextKey];
            addedKeys.add(nextKey);
            console.log(`+ ${nextKey}`);
          }
        }
        
        // Add any remaining missing keys at the end
        for (const key of missingKeys) {
          if (!addedKeys.has(key)) {
            newJson[key] = remoteJson[key];
            console.log(`+ ${key}`);
          }
        }
        
        // Write updated JSON back to file
        fs.writeFileSync(`src/lang/${localFile}.json`, JSON.stringify(newJson, null, 2));
        console.log(`\nUpdated ${localFile}.json with new translations`);
        
        // Read the file again to get line numbers
        const fileContent = fs.readFileSync(`src/lang/${localFile}.json`, 'utf8').split('\n');
        console.log('\nChanged lines:');
        missingKeys.forEach(key => {
          const lineNumber = fileContent.findIndex(line => line.includes(`"${key}"`)) + 1;
          console.log(`Line ${lineNumber}: "${key}": "${remoteJson[key]}"`);
        });
      } else {
        console.log('\nNo changes to apply');
      }
    } catch (error) {
      console.error(`Error processing ${localFile}:`, error);
    }
  }
}

// Check for --apply flag
const shouldApply = process.argv.includes('--apply');
processTranslations(shouldApply).catch(console.error);

