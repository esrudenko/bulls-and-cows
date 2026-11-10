import { createElement } from './createElement';
import { pluralize } from '../game/formatResult';
import { formatTime } from '../game/formatTime';

type WinDetails = {
  secret: string;
  attempts: number;
  time: number;
  place: number | null;
};

type WinDialog = {
  element: HTMLDialogElement;
  newGameButton: HTMLButtonElement;
  show: (details: WinDetails) => void;
};

export const createWinDialog = (): WinDialog => {
  const title = createElement('h2', { className: 'dialog__title', text: 'You guessed it!' });
  const secret = createElement('p', { className: 'dialog__secret' });
  const stats = createElement('p', { className: 'dialog__stats' });
  const place = createElement('p', { className: 'dialog__place' });

  const newGameButton = createElement('button', {
    className: 'dialog__primary',
    text: 'New game',
    attributes: { type: 'button', autofocus: '' },
  });

  const closeButton = createElement('button', {
    className: 'dialog__secondary',
    text: 'Close',
    attributes: { type: 'button' },
  });

  const buttons = createElement('div', {
    className: 'dialog__buttons',
    children: [closeButton, newGameButton],
  });

  const element = createElement('dialog', {
    className: 'dialog',
    attributes: { 'aria-labelledby': 'win-title' },
    children: [title, secret, stats, place, buttons],
  });
  title.id = 'win-title';

  closeButton.addEventListener('click', () => element.close());
  newGameButton.addEventListener('click', () => element.close());

  const show = (details: WinDetails): void => {
    secret.textContent = details.secret;
    stats.textContent = `${pluralize(details.attempts, 'attempt')} · ${formatTime(details.time)}`;
    place.textContent = details.place === null ? '' : `🏆 Place #${details.place} in the records`;
    element.showModal();
  };

  return { element, newGameButton, show };
};
