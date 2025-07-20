/* eslint-disable max-classes-per-file,@typescript-eslint/explicit-member-accessibility */
interface EffectSystem {
  system: {
    transferData: Record<string, string>;
    scriptData?: ScriptData[];
  };
}

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

  interface CONFIG {
    statusEffects: (CONFIG.StatusEffect & EffectSystem)[];
  }

  namespace WNG {
    let vehicleTraits: Record<string, string>;
    let testTypes: Record<string, string>;
    let resolveTests: Record<string, string>;
    const systemEffects: Record<string, CONFIG.StatusEffect & EffectSystem>;
    const traitEffects: Record<string, CONFIG.StatusEffect & EffectSystem>;
  }
}

export {};
