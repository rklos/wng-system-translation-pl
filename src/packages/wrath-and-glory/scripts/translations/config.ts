function translateTestTypes() {
  WNG.testTypes = {
    // TODO: use key from lang.json???
    attribute: 'Atrybut',
    skill: 'Umiejętność',
    resolve: 'ROLL.RESOLVE',
    conviction: 'ROLL.CONVICTION',
  };
}

function translateResolveTests() {
  WNG.resolveTests = {
    fear: 'ROLL.FEAR',
    terror: 'ROLL.TERROR',
  };
}

export function translateConfig() {
  translateTestTypes();
  translateResolveTests();

  (game as any).wng.config = foundry.utils.mergeObject(defaultWarhammerConfig, WNG);
}
