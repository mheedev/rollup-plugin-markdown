const { createFilter } = require('@rollup/pluginutils');
const path = require('path');
const frontmatter = require('front-matter');
const markdown = require('markdown-it');
const shiki = require('shiki');

const markdownPlugin = (options = { theme: 'nord' }) => {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'rollup-plugin-markdown',
    async transform(code, id) {
      const highlighter = await shiki.getHighlighter({
        theme: options.theme,
      });

      if (!filter(id) === -1) return;

      const extension = path.extname(id);

      if (extension !== '.md') return;

      const frontmatterOutput = frontmatter(code);

      const md = markdown({
        html: true,
        highlight: (code, lang) => {
          return highlighter.codeToHtml(code, lang);
        }
      });

      const html = md.render(frontmatterOutput.body);

      const exportFromModule = JSON.stringify({
        html,
        metadata: frontmatterOutput.attributes,
        filename: path.basename(id),
        path: id,
      });

      return {
        code: `export default ${exportFromModule}`,
        map: { mappings: '' },
      };
    },
  };
};

module.exports = markdownPlugin;
