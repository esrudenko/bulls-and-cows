import { createElement } from './createElement';
import { DIGITS } from '../core/constants';
import { isValidSettings } from '../game/isValidSettings';
import type { GameBase, GameLength } from '../game/gameTypes';
import playIconUrl from '../assets/icons/play.svg';

export type Settings = {
  element: HTMLElement;
  lengthSelect: HTMLSelectElement;
  baseSelect: HTMLSelectElement;
  timerBox: HTMLDivElement;
  timeValue: HTMLSpanElement;
  startButton: HTMLButtonElement;
};

const LENGTHS: readonly GameLength[] = [2, 3, 4, 5, 6];
const BASES: readonly GameBase[] = [2, 8, 10, 16];
const DEFAULT_LENGTH: GameLength = 4;
const DEFAULT_BASE: GameBase = 10;

export const readSettings = (settings: Settings): { base: GameBase; length: GameLength } => ({
  base: BASES.find((base) => base === Number(settings.baseSelect.value)) ?? DEFAULT_BASE,
  length:
    LENGTHS.find((length) => length === Number(settings.lengthSelect.value)) ?? DEFAULT_LENGTH,
});

export const setSettingsLocked = (settings: Settings, isLocked: boolean): void => {
  settings.lengthSelect.disabled = isLocked;
  settings.baseSelect.disabled = isLocked;
  settings.startButton.disabled = isLocked;
  settings.timerBox.classList.toggle('settings__timer--active', isLocked);
};

const createOption = (value: number, text: string, isSelected: boolean): HTMLOptionElement => {
  const attributes: Record<string, string> = { value: String(value) };

  if (isSelected) {
    attributes.selected = '';
  }

  return createElement('option', { text, attributes });
};

const formatBaseLabel = (base: GameBase): string => `${base} (0–${DIGITS[base - 1]})`;

const updateLengthOptions = (lengthSelect: HTMLSelectElement, base: number): void => {
  const options = [...lengthSelect.options];

  options.forEach((option) => {
    option.disabled = !isValidSettings(base, Number(option.value));
  });

  const firstAllowedOption = options.find((option) => !option.disabled);

  if (lengthSelect.selectedOptions[0]?.disabled && firstAllowedOption) {
    lengthSelect.value = firstAllowedOption.value;
  }
};

const createSelectField = (labelText: string, select: HTMLElement): HTMLElement => {
  const label = createElement('span', { className: 'settings__label', text: labelText });

  return createElement('label', { className: 'settings__field', children: [label, select] });
};

export const createSettings = (): Settings => {
  const lengthSelect = createElement('select', {
    className: 'settings__control settings__select',
    children: LENGTHS.map((length) =>
      createOption(length, String(length), length === DEFAULT_LENGTH),
    ),
  });

  const baseSelect = createElement('select', {
    className: 'settings__control settings__select',
    children: BASES.map((base) => createOption(base, formatBaseLabel(base), base === DEFAULT_BASE)),
  });

  baseSelect.addEventListener('change', () => {
    updateLengthOptions(lengthSelect, Number(baseSelect.value));
  });

  const timeLabel = createElement('span', { className: 'settings__label', text: 'Time' });
  const timeValue = createElement('span', { className: 'settings__time-value', text: '00:00' });

  const playIcon = createElement('img', {
    className: 'settings__start-icon',
    attributes: { src: playIconUrl, alt: '' },
  });

  const startButton = createElement('button', {
    className: 'settings__start',
    attributes: { type: 'button', title: 'Start game', 'aria-label': 'Start game' },
    children: [playIcon],
  });

  const timerBox = createElement('div', {
    className: 'settings__control settings__timer',
    children: [timeValue, startButton],
  });

  const timer = createElement('div', {
    className: 'settings__field settings__field--timer',
    children: [timeLabel, timerBox],
  });

  const element = createElement('section', {
    className: 'settings',
    children: [
      createSelectField('Length', lengthSelect),
      createSelectField('Base', baseSelect),
      timer,
    ],
  });

  return { element, lengthSelect, baseSelect, timerBox, timeValue, startButton };
};
