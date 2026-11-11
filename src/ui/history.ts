import { createElement } from './createElement';
import { formatResult } from '../game/formatResult';
import type { Guess } from '../game/gameTypes';

type History = {
  element: HTMLElement;
  list: HTMLOListElement;
};

const createHistoryRow = (attempt: Guess, number: number, isLatest: boolean): HTMLLIElement => {
  const attemptNumber = createElement('span', { className: 'history__number', text: `${number}.` });
  const guess = createElement('span', { className: 'history__guess', text: attempt.value });
  const result = createElement('span', {
    className: 'history__result',
    text: formatResult(attempt.bulls, attempt.cows),
  });

  return createElement('li', {
    className: isLatest ? 'history__row history__row--latest' : 'history__row',
    children: [attemptNumber, guess, result],
  });
};

export const createHistory = (): History => {
  const list = createElement('ol', { className: 'history__list' });

  const element = createElement('section', {
    className: 'history',
    attributes: { 'aria-label': 'Guess history', 'aria-live': 'polite' },
    children: [list],
  });

  return { element, list };
};

export const renderHistory = (
  history: History,
  attempts: readonly Guess[],
  emptyText = 'Your guesses will appear here',
): void => {
  const rows = attempts.map((attempt, index) =>
    createHistoryRow(attempt, index + 1, index === attempts.length - 1),
  );
  const placeholder = createElement('li', { className: 'history__placeholder', text: emptyText });

  history.list.replaceChildren(...(rows.length > 0 ? rows : [placeholder]));
  history.element.scrollTop = history.element.scrollHeight;
};
