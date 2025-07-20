// TODO: remove when PR is merged: https://github.com/moo-man/WrathAndGlory-FoundryVTT/pull/361
function translateVehicleTraits() {
  WNG.vehicleTraits = {
    allTerrain: 'Wszechstronny',
    amphibious: 'Amfibia',
    bike: 'Ścigacz',
    flyer: 'Latający',
    gunPorts: 'Porty strzelnicze',
    gyroStabilised: 'Stabilizacja żyroskopowa',
    hover: 'Unoszący się',
    openTopped: 'Bezdachowy',
    reliable: 'Niezawodny',
    sealed: 'Zamknięty',
    turboBoost: 'Turbo Dopalacz',
    walker: 'Kroczący',
  };
}

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
  translateVehicleTraits();
  translateTestTypes();
  translateResolveTests();
}
