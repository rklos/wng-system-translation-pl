import { translateEffects } from './effects';
import { translateConfig } from './config';
import { translateShifts } from './shift';
import { translateItemTabs } from './item-tabs';
import { translateRollDialogTooltip } from './roll-dialog-tooltip';

export function translate() {
  translateConfig();
  translateEffects();
  translateShifts();
  translateItemTabs();
  translateRollDialogTooltip();
}
