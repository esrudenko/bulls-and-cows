import { createElement } from './createElement';
import { pluralize } from '../game/formatResult';
import { formatTime } from '../game/formatTime';
import type { GameRecord } from '../game/gameTypes';

type RecordsDialog = {
  element: HTMLDialogElement;
  show: (records: readonly GameRecord[], settingsLabel: string) => void;
};

const createRecordRow = (record: GameRecord, index: number): HTMLLIElement => {
  const place = createElement('span', { className: 'records__place', text: `#${index + 1}` });
  const attempts = createElement('span', {
    className: 'records__attempts',
    text: pluralize(record.attempts, 'attempt'),
  });
  const time = createElement('span', { className: 'records__time', text: formatTime(record.time) });

  return createElement('li', { className: 'records__row', children: [place, attempts, time] });
};

export const createRecordsDialog = (): RecordsDialog => {
  const title = createElement('h2', { className: 'dialog__title', text: 'Records' });
  const subtitle = createElement('p', { className: 'dialog__stats' });
  const list = createElement('ol', { className: 'records' });

  const closeButton = createElement('button', {
    className: 'dialog__primary',
    text: 'Close',
    attributes: { type: 'button', autofocus: '' },
  });

  const element = createElement('dialog', {
    className: 'dialog',
    attributes: { 'aria-labelledby': 'records-title' },
    children: [title, subtitle, list, closeButton],
  });
  title.id = 'records-title';

  closeButton.addEventListener('click', () => element.close());

  const show = (records: readonly GameRecord[], settingsLabel: string): void => {
    const empty = createElement('li', {
      className: 'records__empty',
      text: 'No records yet. Win a round to get here!',
    });

    subtitle.textContent = settingsLabel;
    list.replaceChildren(...(records.length > 0 ? records.map(createRecordRow) : [empty]));
    element.showModal();
  };

  return { element, show };
};
