import './styles/main.css';
import { createElement } from './ui/createElement';
import { createHeader } from './ui/header';

const header = createHeader();
const main = createElement('main', { className: 'card', children: [] });
const app = createElement('div', { className: 'app', children: [header.element, main] });

document.body.append(app);
