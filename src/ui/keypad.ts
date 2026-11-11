import { createElement } from './createElement';
import { DIGITS } from '../core/constants';
import backspaceIconUrl from '../assets/icons/backspace.svg';

type Keypad = {
  element: HTMLDivElement;
  digitButtons: HTMLButtonElement[];
};

type Actions = {
  element: HTMLDivElement;
  deleteButton: HTMLButtonElement;
  checkButton: HTMLButtonElement;
};

export const createKeypad = (base: number): Keypad => {
  const digitButtons = [...DIGITS.slice(0, base)].map((digit) =>
    createElement('button', {
      className: 'keypad__key',
      text: digit,
      attributes: { type: 'button', 'data-digit': digit },
    }),
  );

  const element = createElement('div', {
    className: `keypad keypad--base-${base}`,
    children: digitButtons,
  });

  return { element, digitButtons };
};

export const createActions = (): Actions => {
  const deleteIcon = createElement('img', {
    className: 'actions__icon',
    attributes: { src: backspaceIconUrl, alt: '' },
  });

  const deleteButton = createElement('button', {
    className: 'actions__delete',
    attributes: { type: 'button', title: 'Delete digit', 'aria-label': 'Delete digit' },
    children: [deleteIcon],
  });

  const checkButton = createElement('button', {
    className: 'actions__check',
    text: 'Check',
    attributes: { type: 'button' },
  });

  const element = createElement('div', {
    className: 'actions',
    children: [deleteButton, checkButton],
  });

  return { element, deleteButton, checkButton };
};
