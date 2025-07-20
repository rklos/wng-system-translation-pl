/* eslint-disable max-classes-per-file,@typescript-eslint/explicit-member-accessibility */

declare global {
  class SkillsModel {
    static defineSchema: () => Record<string, unknown>;
  }

  class AgentSkillsModel {
    static defineSchema: () => Record<string, unknown>;
  }

  interface ScriptData {
    trigger: string;
    script: string;
    label: string;
    options?: Record<string, string>;
  }

  interface Effect {
    name: string;
    system?: {
      scriptData?: ScriptData[];
    };
  }

  interface SystemEffect extends Effect {
    id: string;
    statuses: string[];
    img: string;
    changes?: { key: string; mode: number; value: number }[];
  }

  interface TraitEffect extends Effect {
    system: {
      transferData: Record<string, string>;
      scriptData?: ScriptData[];
    };
  }

  const WNG: {
    vehicleTraits: Record<string, string>;
    testTypes: Record<string, string>;
    resolveTests: Record<string, string>;
    systemEffects: Record<string, SystemEffect>;
    traitEffects: Record<string, TraitEffect>;
    statusEffects: Record<string, SystemEffect>;
  };
}

export {};
