/* eslint-disable max-classes-per-file,@typescript-eslint/explicit-member-accessibility */

declare global {
  class SkillsModel {
    static defineSchema: () => Record<string, unknown>;
  }

  class AgentSkillsModel {
    static defineSchema: () => Record<string, unknown>;
  }

  const WNG: {
    vehicleTraits: Record<string, string>;
  };
}

export {};
