import './styles/main.css';
import { createElement } from './ui/createElement';
import logoUrl from './assets/images/logo.svg';
import refreshIconUrl from './assets/icons/refresh.svg';
import trophyIconUrl from './assets/icons/trophy.svg';

//HEADER
const createIconButton = (iconUrl: string, label: string): HTMLElement => {
  const icon = createElement('img', {
    className: 'header__icon',
    attributes: { src: iconUrl, alt: '' },
  });

  return createElement('button', {
    className: 'header__button',
    attributes: { type: 'button', title: label, 'aria-label': label },
    children: [icon],
  });
};

const newGameButton = createIconButton(refreshIconUrl, 'New game');
const recordsButton = createIconButton(trophyIconUrl, 'Records');

const headerActions = createElement('div', {
  className: 'header__actions',
  children: [recordsButton, newGameButton],
});

const logo = createElement('img', {
  className: 'header__logo',
  attributes: { src: logoUrl, alt: 'Bulls and Cows logo' },
});

const title = createElement('h1', { className: 'header__title', text: 'Bulls\nand Cows' });

const header = createElement('header', {
  className: 'header',
  children: [headerActions, logo, title],
});

//MAIN
const main = createElement('main', { className: 'card', children: [] });

//APP
const app = createElement('div', { className: 'app', children: [header, main] });

document.body.append(app);
