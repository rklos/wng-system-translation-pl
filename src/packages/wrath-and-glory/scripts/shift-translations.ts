export function translateShifts() {
  const OriginalWNGTest = WNGTest;
  // @ts-expect-error - WNGTest is a class
  WNGTest = class WNGTest extends OriginalWNGTest {
    public constructor(data = {}) {
      super(data);
      this.data.testData.shifted.damage.letter = 'O';
      this.data.testData.shifted.glory.letter = 'C';
      this.data.testData.shifted.potency.letter = 'M';
    }
  };
  // Set the prototype of constructor only (instances untouched)
  Object.setPrototypeOf(AbilityRoll, WNGTest);
  Object.setPrototypeOf(CorruptionTest, WNGTest);
  Object.setPrototypeOf(DeterminationRoll, WNGTest);
  Object.setPrototypeOf(InitiativeRoll, WNGTest);
  Object.setPrototypeOf(MutationTest, WNGTest);
  Object.setPrototypeOf(PowerTest, WNGTest);
  Object.setPrototypeOf(ResolveTest, WNGTest);
  Object.setPrototypeOf(StealthRoll, WNGTest);
  Object.setPrototypeOf(WeaponTest, WNGTest);
}
