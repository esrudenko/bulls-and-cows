import './styles/main.css';
import { createElement } from './ui/createElement';
import { createHeader } from './ui/header';
import { createSettings } from './ui/settings';
import { createGuessCells } from './ui/guess';
import { createActions, createKeypad } from './ui/keypad';

const header = createHeader();
const settings = createSettings();
const actions = createActions();

const guessSlot = createElement('div');
const keypadSlot = createElement('div');

const renderGuessCells = (): void => {
  guessSlot.replaceChildren(createGuessCells(Number(settings.lengthSelect.value)).element);
};

const renderKeypad = (): void => {
  keypadSlot.replaceChildren(createKeypad(Number(settings.baseSelect.value)).element);
};

settings.lengthSelect.addEventListener('change', renderGuessCells);
settings.baseSelect.addEventListener('change', () => {
  renderKeypad();
  renderGuessCells();
});

renderGuessCells();
renderKeypad();

const play = createElement('div', {
  className: 'play',
  children: [guessSlot, keypadSlot, actions.element],
});

const main = createElement('main', { className: 'card', children: [settings.element, play] });
const app = createElement('div', { className: 'app', children: [header.element, main] });

document.body.append(app);
