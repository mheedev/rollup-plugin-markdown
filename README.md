# rollup-plugin-markdown

![Node.js CI](https://github.com/mheedev/rollup-plugin-markdown/workflows/Node.js%20CI/badge.svg)

Complete Markdown parser specifically built for modern staticly exported websites. It does not require any dependencies to be included in your build, all styles are inlined into the output HTML.

## Dependenices

This plugin uses the following dependencies:
| plugin | purpose |
| ------ | ------- |
| [front-matter](https://github.com/jxson/front-matter) | Parsing of Markdown file attributes |
| [markdown-it](https://github.com/markdown-it/markdown-it) | Render Markdown as HTML |
| [shiki](https://github.com/octref/shiki) | Inline extendable syntax highlighting |

## Usage

```bash
npm i --save-dev @mheedev/rollup-plugin-markdown
# yarn add -D @mheedev/rollup-plugin-markdown
```

```js
// rollup.config.js

import markdownPlugin from '@mheedev/rollup-plugin-markdown';

export default {
  plugins: [
    markdownPlugin(),
    // ...
  ],
  /// ...
}
```

The plugin will parse any `.md` files that you include into your project, parse any frontmatter and apply any inline syntax highlighting that you need using the standard code block syntax for Markdown parsers:

````md
---
title: 'Hello world'
author: 'dev'
---

# Hello world

```js
console.log('My first code block!');
```

````

## Theming

You can choose one of the [themes supported by Shiki](https://github.com/octref/shiki/tree/master/packages/themes). The default theme is [nord](https://github.com/arcticicestudio/nord-visual-studio-code).

To set a theme, you can pass it into the theme options like so:

```js
// rollup.config.js

import markdownPlugin from '@mheedev/rollup-plugin-markdown';

export default {
  plugins: [
    markdownPlugin({ theme: 'monokai' }),
    // ...
  ],
  /// ...
}
```

## Enable features of markdown-it

This package uses markdown-it internally to process your Markdown input.

Therefore it is possible to pass any configuration options to it using the `markdown` key:

```js
// rollup.config.js

import markdownPlugin from '@mheedev/rollup-plugin-markdown';

export default {
  plugins: [
    markdownPlugin({
      theme: 'monokai',
      markdown: {
        typographer: true,
        // ... pass any additional options to markdown-it here.
      }
    }),
    // ...
  ],
  /// ...
}
```

To see a full list of options that can be provided to markdown-it, please refer to their [documentation](https://github.com/markdown-it/markdown-it)

## Changelog

### 0.0.5

- Pass additional options to markdown-it

### 0.0.1

- Initial release

### 0.0.4

- Added [theme selection](https://github.com/mheedev/rollup-plugin-markdown/tree/master#Theming) to the plugin options

## Credits

- Inspired to include Shiki based on a [post by swyx](https://www.swyx.io/writing/svelte-static/)

- This project was heavily inspired by Jack Franklin's [rollup-plugin-markdown](https://github.com/jackfranklin/rollup-plugin-markdown)

## License

MIT &copy; [Ricardo van Hoepen](https://github.com/mheedev)
