import fs from 'fs';

export default function listTemplates() {
  const getFilesRecursively = (dir) => {
    const files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const path = `${dir}/${item.name}`;
      if (item.isDirectory()) {
        files.push(...getFilesRecursively(path));
      } else {
        files.push(path.replace('src/template/', ''));
      }
    }
    
    return files;
  };
  
  return getFilesRecursively('src/template');
}
