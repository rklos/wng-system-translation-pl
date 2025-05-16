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
      
      // Read local translated version or create empty object if file doesn't exist
      let localJson;
      try {
        localJson = JSON.parse(fs.readFileSync(`src/lang/${localFile}.json`, 'utf8'));
      } catch (error) {
        if (error.code === 'ENOENT') {
          localJson = {};
        } else {
          throw error;
        }
      }
      
      // Track differences
      const missingKeys = [];
      const extraKeys = [];
      
      // Function to recursively find differences
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
        
        // Check for extra keys in local
        for (const key in localObj) {
          if (key.startsWith('//')) continue;
          
          const currentPath = path ? `${path}.${key}` : key;
          if (!remoteObj[key]) {
            extraKeys.push(currentPath);
          }
        }
      }
      
      // Find all differences
      findDifferences(localJson, remoteJson);
      
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
        
        // Function to recursively add missing translations
        function addMissingTranslations(localObj, remoteObj, path = '') {
          for (const key in remoteObj) {
            const currentPath = path ? `${path}.${key}` : key;
            
            if (typeof remoteObj[key] === 'object' && remoteObj[key] !== null) {
              if (!localObj[key]) {
                localObj[key] = {};
              }
              addMissingTranslations(localObj[key], remoteObj[key], currentPath);
            } else if (!localObj[key]) {
              localObj[key] = remoteObj[key];
              console.log(`+ ${currentPath}`);
            }
          }
        }
        
        // Add missing translations
        addMissingTranslations(localJson, remoteJson);
        
        // Write updated JSON back to file
        fs.writeFileSync(`src/lang/${localFile}.json`, JSON.stringify(localJson, null, 2));
        console.log(`\nUpdated ${localFile}.json with new translations`);
      } else if (shouldApply) {
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

