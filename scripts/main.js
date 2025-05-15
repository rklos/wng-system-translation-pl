function reorderSkills() {
  /**
   * Default Skills used by common actors
   */
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

Hooks.on('init', async () => {
  await new Promise(resolve => setTimeout(resolve, 250));
  reorderSkills();
});
