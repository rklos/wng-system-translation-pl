function log(message) {
  console.log(`[WNG-System-Translation-PL] ${message}`);
}

function reorderSkills() {
  const OriginalSkillsModel = SkillsModel;
  class SkillsModelPL extends OriginalSkillsModel {
    static defineSchema() {
        const {
          athletics,
          awareness,
          ballisticSkill,
          cunning,
          deception,
          insight,
          intimidation,
          investigation,
          leadership,
          medicae,
          persuasion,
          pilot,
          psychicMastery,
          scholar,
          stealth,
          survival,
          tech,
          weaponSkill,
          // In case of additional skills
          ...rest
        } = super.defineSchema();
        return {
            // Left
            investigation,
            athletics,
            awareness,
            leadership,
            insight,
            tech,
            medicae,
            psychicMastery,
            deception,
            // Right
            persuasion,
            pilot,
            cunning,
            survival,
            stealth,
            ballisticSkill,
            weaponSkill,
            scholar,
            intimidation,
            ...rest,
        }
    }
  }
  // Redeclare W&G's SkillsModel
  SkillsModel = SkillsModelPL;

  const OriginalAgentSkillsModel = AgentSkillsModel;
  class AgentSkillsModelPL extends OriginalAgentSkillsModel {
    static defineSchema() {
      return SkillsModelPL.defineSchema();
    }
  }
  // Redeclare W&G's AgentSkillsModel
  AgentSkillsModel = AgentSkillsModelPL;
}

function overrideTemplates() {
  // TODO: If we implement build process, we should load all templates automatically
  const templatePaths = [
    'apps/item-traits.hbs',

    'chat/roll/ability/ability-use.hbs',
    'chat/roll/base/base-buttons.hbs',
    'chat/roll/base/dice-container.hbs',
    'chat/roll/common/common-buttons.hbs',
    'chat/roll/corruption/corruption-buttons.hbs',
    'chat/roll/damage/damage-roll.hbs',
    'chat/roll/mutation/mutation-buttons.hbs',
    'chat/roll/mutation/mutation-roll.hbs',
    'chat/roll/power/power-buttons.hbs',
    'chat/roll/weapon/weapon-buttons.hbs',

    'dialog/attack-roll.hbs',
  ];

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

Hooks.on('init', async () => {
  await new Promise(resolve => setTimeout(resolve, 250));
  reorderSkills();
  overrideTemplates();
});
