import { createElement } from './createElement';

type GuessCells = {
  element: HTMLDivElement;
  cells: HTMLDivElement[];
};

export const createGuessCells = (length: number): GuessCells => {
  const cells = Array.from({ length }, () => createElement('div', { className: 'guess__cell' }));

  const element = createElement('div', {
    className: 'guess',
    attributes: { 'aria-label': 'Your guess' },
    children: cells,
  });

  return { element, cells };
};
