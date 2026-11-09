type ElementOptions = {
  className?: string;
  text?: string;
  id?: string;
  attributes?: Record<string, string>;
  children?: HTMLElement[];
};

export const createElement = (tagName: string, options: ElementOptions = {}): HTMLElement => {
  const element = document.createElement(tagName);

  if (options.className) {
    element.className = options.className;
  }

  if (options.id) {
    element.id = options.id;
  }

  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  if (options.text) {
    element.textContent = options.text;
  }

  if (options.children) {
    options.children.forEach((child) => {
      element.appendChild(child);
    });
  }

  return element;
};
