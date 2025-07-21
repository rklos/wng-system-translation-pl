/* eslint-disable max-classes-per-file,@typescript-eslint/explicit-member-accessibility */
interface EffectSystem {
  system: {
    transferData: Record<string, string>;
    scriptData?: ScriptData[];
  };
}

interface ShiftedValue {
  label: string;
  dice: number[];
  letter: string;
}

declare global {
  function mergeObject(a: Record<string, unknown>, b: Record<string, unknown>): Record<string, unknown>;

  const defaultWarhammerConfig: Record<string, unknown>;

  class SkillsModel {
    static defineSchema: () => Record<string, unknown>;
  }

  class AgentSkillsModel {
    static defineSchema: () => Record<string, unknown>;
  }

  class WnGItemSheet {
    static TABS: Record<string, { id: string; group: string; label: string }>;
  }

  class WNGTest {
    public data: {
      testData: {
        shifted: {
          damage: ShiftedValue;
          glory: ShiftedValue;
          other: ShiftedValue;
          potency: ShiftedValue;
        };
      };
    };

    constructor(data: Record<string, unknown>);
  }

  class AbilityRoll {}
  class CorruptionTest {}
  class DeterminationRoll {}
  class InitiativeRoll {}
  class MutationTest {}
  class PowerTest {}
  class ResolveTest {}
  class StealthRoll {}
  class WeaponTest {}

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
