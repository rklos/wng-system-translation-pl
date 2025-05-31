export function reorderSkills() {
  const originalDefineSchema = SkillsModel.defineSchema;
  SkillsModel.defineSchema = () => {
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
    } = originalDefineSchema();
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
    };
  };

  AgentSkillsModel.defineSchema = () => SkillsModel.defineSchema();
}
