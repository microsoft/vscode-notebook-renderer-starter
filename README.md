# Use the VS Code yeoman generators instead

This repo is no longer updated. Instead, generator your own project via:

1. `npm install -g generator-code`
1. `yo code --insiders` and choosing Notebook Renderer

# vscode-notebook-renderer-starter

⚠️ Work-in-progress starter code for custom notebook renderers in VS Code. Expect this to change as notebooks matures. ⚠️

This starter includes:

 - 🖥️ TypeScript code to create a simple `NotebookOutputRenderer`
 - 📦 A Webpack build for renderer client code
 - ⚡ Support for hot module reloading and safe boilerplate
 - 🎨 CSS modules support

### Getting this Sample

 1. `git clone https://github.com/microsoft/vscode-notebook-renderer-starter.git`: clone it
 2. `cd vscode-notebook-renderer-starter && npm install`: install dependencies
 3. `code-insiders .`: Open the folder in VS Code Insiders
 4. Hit `F5` to build+debug

### Structure

A Notebook Renderer consists of code that runs in the VS Code Extension Host (Node.js), which registers the renderer and passes data into the UI code running inside a WebView (Browser/DOM).

This uses TypeScript project references. There are three projects in the `src` directory:

 - `extension` contains the code running in Node.js extension host. It's compiled with `tsc`.
 - `client` is the UI code, built by Webpack, with access to the DOM.
 - `common` contains code shared between the extension and client.

When you run `watch`, `compile`, or `dev`, we invoke both `tsc` and `webpack` to compile the extension and the client portion of the code.

### Todo

 - [ ] Toggle between loading from the webpack dev server and disk [#95988](https://github.com/microsoft/vscode/issues/95988)
 - [ ] Localization?
