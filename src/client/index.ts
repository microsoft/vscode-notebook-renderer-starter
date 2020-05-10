/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import { viewType, renderCallback } from '../common/constants';
import { render } from './render';
import errorOverlay from 'vscode-notebook-error-overlay';

// Fucntion to render your contents in a single tag, calls the `render()`
// function from render.ts. Also catches and displays any thrown errors.
const renderTag = (tag: HTMLScriptElement) =>
  errorOverlay.wrap(tag.parentElement, () => {
    let container: HTMLElement;

    // Create an element to render in, or reuse a previous element.
    if (tag.nextElementSibling instanceof HTMLElement) {
      container = tag.nextElementSibling;
      container.innerHTML = '';
    } else {
      container = document.createElement('div');
      tag.parentNode?.insertBefore(container, tag.nextSibling);
    }

    const mimeType = tag.dataset.mimeType as string;
    render(container, mimeType, JSON.parse(tag.innerHTML));
  });

const renderAllTags = () => {
  const nodeList = document.querySelectorAll(`script[type="renderer/${viewType}"]`);
  for (let i = 0; i < nodeList.length; i++) {
    renderTag(nodeList[i] as HTMLScriptElement);
  }
};

Object.assign(window, { [renderCallback]: renderTag });
renderAllTags();

// When the module is hot-reloaded, rerender all tags. Webpack will update
// update the `render` function we imported, so we just need to call it again.
if (module.hot) {
  // note: using `module.hot?.accept` breaks HMR in Webpack 4--they parese
  // for specific syntax in the module.
  module.hot.accept(['./render'], renderAllTags);
}
