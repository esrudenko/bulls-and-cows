import './styles/main.css';
import { createElement } from './ui/createElement';

const header = createElement('header', { className: 'header' });
const main = createElement('main', { className: 'main' });
const footer = createElement('footer', { className: 'footer' });

document.body.append(header, main, footer);
