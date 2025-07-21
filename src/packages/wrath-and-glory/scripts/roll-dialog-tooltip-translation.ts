/* eslint-disable max-classes-per-file */
export function translateRollDialogTooltip() {
  const OriginalRollDialog = RollDialog;
  class RollDialogPL extends OriginalRollDialog {
    public get tooltipConfig() {
      const config = super.tooltipConfig;

      config.pool.label = 'Pula kości';
      config.difficulty.label = 'Stopień trudności';
      config.wrath.label = 'Furia';

      return config;
    }
  }
  // @ts-expect-error - RollDialog is a class
  RollDialog = RollDialogPL;
  // Set the prototype of all instances
  Object.setPrototypeOf(CommonDialog.prototype, RollDialog.prototype);

  const OriginalAttackDialog = AttackDialog;
  class AttackDialogPL extends OriginalAttackDialog {
    public get tooltipConfig() {
      const config = super.tooltipConfig;

      config.ed.label = 'DK';
      config.ap.label = 'PP';
      config.damage.label = 'Obrażenia';
      config.ones.label = 'Wartość jedynek';
      config.twos.label = 'Wartość dwójek';
      config.threes.label = 'Wartość trójek';
      config.fours.label = 'Wartość czwórek';
      config.fives.label = 'Wartość piątek';
      config.sixes.label = 'Wartość szóstek';

      return config;
    }
  }
  // @ts-expect-error - RollDialog is a class
  AttackDialog = AttackDialogPL;
  // Set the prototype of all instances
  Object.setPrototypeOf(PowerDialog.prototype, AttackDialog.prototype);
  Object.setPrototypeOf(WeaponDialog.prototype, AttackDialog.prototype);
}
