import './styles/main.css';
import { createElement } from './ui/createElement';
import { createHeader } from './ui/header';
import { createSettings } from './ui/settings';

const header = createHeader();
const settings = createSettings();
const main = createElement('main', { className: 'card', children: [settings.element] });
const app = createElement('div', { className: 'app', children: [header.element, main] });

document.body.append(app);
