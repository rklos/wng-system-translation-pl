import * as diff from 'diff';
import * as fs from 'fs';
import { join } from 'path';
import type { Package } from '~/packages';
import { getConstsOfPackage } from '../../../utils/consts';

async function getPatchFiles(pkg: Package): Promise<string[]> {
  const { PATCHES_DIR } = getConstsOfPackage(pkg);
  const patchFiles: string[] = [];

  if (!fs.existsSync(PATCHES_DIR)) {
    console.log(`No patches directory found for package ${pkg.PACKAGE}`);
    return patchFiles;
  }

  function scanDirectory(dirPath: string, basePath: string = ''): string[] {
    const files: string[] = [];
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = join(dirPath, item);
      const relativePath = join(basePath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...scanDirectory(fullPath, relativePath));
      } else if (item.endsWith('.diff')) {
        files.push(relativePath);
      }
    }

    return files;
  }

  return scanDirectory(PATCHES_DIR);
}

async function applyPatchForFile(pkg: Package, patchPath: string): Promise<void> {
  const { PATCHES_DIR, TEMP_PATCHES_PL_DIR } = getConstsOfPackage(pkg);
  const FULL_PATCH_PATH = join(PATCHES_DIR, patchPath);

  try {
    // Read patch content
    const patchContent = fs.readFileSync(FULL_PATCH_PATH, 'utf8');

    // Parse the patch to get the target file path
    const patches = diff.parsePatch(patchContent);

    if (!patches || patches.length === 0) {
      console.warn(`Could not parse patch for ${patchPath}`);
      return;
    }

    const targetFilePath = patches[0].index!;
    const targetFullPath = join(TEMP_PATCHES_PL_DIR, targetFilePath);

    // Check if target file exists
    if (!fs.existsSync(targetFullPath)) {
      console.error(`Target file does not exist: ${targetFilePath}`);
      process.exit(1);
    }

    // Read the original file content
    const originalContent = fs.readFileSync(targetFullPath, 'utf8');

    // Apply the patch
    const patchedContent = diff.applyPatch(originalContent, patchContent);

    if (patchedContent === false) {
      console.error(`Failed to apply patch: ${patchPath}`);
      process.exit(1);
    }

    // Write the patched content back to the file
    fs.writeFileSync(targetFullPath, patchedContent);

    console.log(`Applied patch: ${patchPath}`);
  } catch (error) {
    console.error(`Error applying patch ${patchPath}:`, error);
  }
}

export default async function apply(pkg: Package): Promise<void> {
  console.log(`Applying patches for package: ${pkg.PACKAGE}`);

  // Get the list of patch files
  const patchFiles = await getPatchFiles(pkg);

  if (patchFiles.length === 0) {
    console.log('No patch files found');
    return;
  }

  console.log(`Found ${patchFiles.length} patch files`);

  // Apply each patch
  for (const patchPath of patchFiles) {
    await applyPatchForFile(pkg, patchPath);
  }

  console.log('Patch application completed');
}
