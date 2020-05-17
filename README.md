# rollup-plugin-markdown

Complete Markdown parser for modern static websites

## Dependenices

This plugin uses the following dependencies:
| plugin | purpose |
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

import markdownPlugin from '@mheedev/rollup-plugin/markdown';

export default {
  plugins: [
    markdownPlugin(),
    // ...
  ],
  /// ...
}
```

The plugin will parse any `.md` files that you include into your project parse any frontmatter and apply any inline syntax highlighting that you need using the standard code block syntax for Markdown parsers:

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

## Credits

---

- Inspired to include Shiki based on a [post by swyx](https://www.swyx.io/writing/svelte-static/)

- This project was heavily inspired by Jack Franklin's [rollup-plugin-markdown](https://github.com/jackfranklin/rollup-plugin-markdown)

## License

---

MIT &copy; [Ricardo van Hoepen](https://github.com/mheedev)
