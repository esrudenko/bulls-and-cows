import './styles/main.css';
import { createElement } from './ui/createElement';
import { createHeader } from './ui/header';
import { createSettings, readSettings, setSettingsLocked } from './ui/settings';
import { createGuessCells } from './ui/guess';
import { createActions, createKeypad } from './ui/keypad';
import { createHistory, renderHistory } from './ui/history';
import { createWinDialog } from './ui/winDialog';
import { createRecordsDialog } from './ui/recordsDialog';
import { appendDigit, removeLastDigit } from './game/guessInput';
import { createInitialState, startGame, submitGuess } from './game/gameState';
import { formatTime } from './game/formatTime';
import { pluralize } from './game/formatResult';
import { addRecord } from './game/records';
import { loadRecords, saveRecords } from './storage/recordsStorage';
import type { GameRecord } from './game/gameTypes';

const header = createHeader();
const settings = createSettings();
const actions = createActions();
const history = createHistory();
const winDialog = createWinDialog();
const recordsDialog = createRecordsDialog();

const START_HINT = 'Press ▶ to start';
const RECORDS_LIMIT = 10;

const hint = createElement('p', { className: 'play__hint' });
const guessSlot = createElement('div');
const keypadSlot = createElement('div');
const play = createElement('div', {
  className: 'play',
  children: [hint, guessSlot, keypadSlot, actions.element],
});

const getLength = (): number => Number(settings.lengthSelect.value);
const getBase = (): number => Number(settings.baseSelect.value);

let game = createInitialState();
let input = '';
let guessCells = createGuessCells(getLength());
let keypad = createKeypad(getBase());
let timerId: number | undefined;

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
  play.classList.toggle('play--idle', game.status === 'idle');
};

const showHistory = (): void => {
  const isIdle = game.status === 'idle';

  renderHistory(history, game.attempts, isIdle ? START_HINT : undefined);
  history.element.classList.toggle('history--idle', isIdle);
};

const setInput = (nextInput: string): void => {
  input = nextInput;
  hint.textContent = '';
  updateInputView();
};

const updateTimer = (): void => {
  const startedAt = game.startedAt ?? Date.now();
  const endedAt = game.finishedAt ?? Date.now();
  settings.timeValue.textContent = formatTime(endedAt - startedAt);
};

const stopTimer = (): void => {
  window.clearInterval(timerId);
  updateTimer();
};

const getRoundTime = (): number => (game.finishedAt ?? 0) - (game.startedAt ?? 0);

const isRecordFor =
  (base: number, length: number) =>
  (record: GameRecord): boolean =>
    record.base === base && record.length === length;

const saveResult = (): number | null => {
  const record: GameRecord = {
    attempts: game.attempts.length,
    time: getRoundTime(),
    base: game.base,
    length: game.length,
  };
  const isSameTable = isRecordFor(game.base, game.length);
  const allRecords = loadRecords();
  const otherTables = allRecords.filter((saved) => !isSameTable(saved));
  const table = addRecord(allRecords.filter(isSameTable), record, RECORDS_LIMIT);
  const index = table.indexOf(record);

  saveRecords([...otherTables, ...table]);

  return index === -1 ? null : index + 1;
};

const startRound = (): void => {
  game = startGame(game, Math.random, Date.now(), readSettings(settings));
  setSettingsLocked(settings, true);
  showHistory();
  setInput('');
  updateTimer();
  timerId = window.setInterval(updateTimer, 250);
};

const showRecords = (): void => {
  const { base, length } = readSettings(settings);
  const table = loadRecords().filter(isRecordFor(base, length));

  recordsDialog.show(table, `${pluralize(length, 'digit')} · base ${base}`);
};

const newGame = (): void => {
  window.clearInterval(timerId);
  game = createInitialState();
  setSettingsLocked(settings, false);
  settings.timeValue.textContent = formatTime(0);
  showHistory();
  setInput('');
};

const addDigit = (digit: string): void => {
  setInput(appendDigit(input, digit, getLength(), getBase()));
};

const deleteDigit = (): void => {
  setInput(removeLastDigit(input));
};

const checkGuess = (): void => {
  if (!isPlaying() || input.length < getLength()) {
    return;
  }

  const nextGame = submitGuess(game, input, Date.now());

  if (nextGame === game) {
    hint.textContent = `You already tried ${input}`;
    return;
  }

  game = nextGame;
  showHistory();
  setInput('');

  if (game.status === 'won') {
    stopTimer();
    winDialog.show({
      secret: game.secret,
      attempts: game.attempts.length,
      time: getRoundTime(),
      place: saveResult(),
    });
  }
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
actions.checkButton.addEventListener('click', checkGuess);
settings.startButton.addEventListener('click', startRound);
header.newGameButton.addEventListener('click', newGame);
header.recordsButton.addEventListener('click', showRecords);
winDialog.newGameButton.addEventListener('click', newGame);

document.addEventListener('keydown', (event) => {
  const isTypingInSelect = event.target instanceof HTMLSelectElement;
  const hasModifier = event.ctrlKey || event.metaKey || event.altKey;

  if (!isPlaying() || isTypingInSelect || hasModifier) {
    return;
  }

  if (event.key === 'Backspace') {
    event.preventDefault();
    deleteDigit();
  } else if (event.key === 'Enter') {
    event.preventDefault();
    checkGuess();
  } else if (event.key.length === 1) {
    addDigit(event.key);
  }
});

guessSlot.replaceChildren(guessCells.element);
keypadSlot.replaceChildren(keypad.element);
showHistory();
setInput('');

const main = createElement('main', {
  className: 'card',
  children: [settings.element, history.element, play],
});
const app = createElement('div', { className: 'app', children: [header.element, main] });

document.body.append(app, winDialog.element, recordsDialog.element);
