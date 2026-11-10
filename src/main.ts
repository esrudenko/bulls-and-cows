import './styles/main.css';
import { createElement } from './ui/createElement';
import { createHeader } from './ui/header';
import { createSettings, readSettings, setSettingsLocked } from './ui/settings';
import { createGuessCells } from './ui/guess';
import { createActions, createKeypad } from './ui/keypad';
import { appendDigit, removeLastDigit } from './game/guessInput';
import { createInitialState, startGame } from './game/gameState';
import { formatTime } from './game/formatTime';

const header = createHeader();
const settings = createSettings();
const actions = createActions();

const guessSlot = createElement('div');
const keypadSlot = createElement('div');

const getLength = (): number => Number(settings.lengthSelect.value);
const getBase = (): number => Number(settings.baseSelect.value);

let game = createInitialState();
let input = '';
let guessCells = createGuessCells(getLength());
let keypad = createKeypad(getBase());

const isPlaying = (): boolean => game.status === 'playing';

const updateInputView = (): void => {
  guessCells.cells.forEach((cell, index) => {
    cell.textContent = input[index] ?? '';
    cell.classList.toggle('guess__cell--active', isPlaying() && index === input.length);
  });

  keypad.digitButtons.forEach((button) => {
    button.disabled = !isPlaying() || input.includes(button.dataset.digit ?? '');
  });

  actions.deleteButton.disabled = !isPlaying() || input === '';
  actions.checkButton.disabled = !isPlaying() || input.length < getLength();
};

const updateTimer = (): void => {
  const startedAt = game.startedAt ?? Date.now();
  settings.timeValue.textContent = formatTime(Date.now() - startedAt);
};

const startRound = (): void => {
  game = startGame(game, Math.random, Date.now(), readSettings(settings));
  setSettingsLocked(settings, true);
  setInput('');
  updateTimer();
  window.setInterval(updateTimer, 250);
};

const setInput = (nextInput: string): void => {
  input = nextInput;
  updateInputView();
};

const addDigit = (digit: string): void => {
  setInput(appendDigit(input, digit, getLength(), getBase()));
};

const deleteDigit = (): void => {
  setInput(removeLastDigit(input));
};

const renderGuessCells = (): void => {
  guessCells = createGuessCells(getLength());
  guessSlot.replaceChildren(guessCells.element);
};

const renderKeypad = (): void => {
  keypad = createKeypad(getBase());
  keypadSlot.replaceChildren(keypad.element);
};

settings.lengthSelect.addEventListener('change', () => {
  renderGuessCells();
  setInput('');
});

settings.baseSelect.addEventListener('change', () => {
  renderKeypad();
  renderGuessCells();
  setInput('');
});

keypadSlot.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const digit = event.target.closest<HTMLButtonElement>('[data-digit]')?.dataset.digit;

  if (digit) {
    addDigit(digit);
  }
});

actions.deleteButton.addEventListener('click', deleteDigit);
settings.startButton.addEventListener('click', startRound);

document.addEventListener('keydown', (event) => {
  const isTypingInSelect = event.target instanceof HTMLSelectElement;
  const hasModifier = event.ctrlKey || event.metaKey || event.altKey;

  if (!isPlaying() || isTypingInSelect || hasModifier) {
    return;
  }

  if (event.key === 'Backspace') {
    event.preventDefault();
    deleteDigit();
  } else if (event.key.length === 1) {
    addDigit(event.key);
  }
});

guessSlot.replaceChildren(guessCells.element);
keypadSlot.replaceChildren(keypad.element);
updateInputView();

const play = createElement('div', {
  className: 'play',
  children: [guessSlot, keypadSlot, actions.element],
});

const main = createElement('main', { className: 'card', children: [settings.element, play] });
const app = createElement('div', { className: 'app', children: [header.element, main] });

document.body.append(app);
