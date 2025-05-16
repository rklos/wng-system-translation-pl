import { log } from './utils/log.js';

export function overrideTemplates() {
  const templatePaths = __templates__;

  templatePaths.forEach(async (path) => {
    const originalPath = `systems/wrath-and-glory/template/${path}`;

    // Hack to unregister original W&G system's templates
    Handlebars.unregisterPartial(originalPath);
    await loadTemplates({
      [originalPath]: `modules/wng-system-translation-pl/template/${path}`
    });
    log(`Overridden template: ${originalPath}`);
  });
}
