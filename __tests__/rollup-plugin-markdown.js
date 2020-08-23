const rollup = require('rollup');
const path = require('path');
const Module = require('module');
const markdownPlugin = require('../src/index');

function moduleFromString(code) {
  const opts = {};
  const filename = 'module_from_string.js';

  opts.appendPaths = opts.appendPaths || [];
  opts.prependPaths = opts.prependPaths || [];

  if (typeof code !== 'string') {
    throw new Error('code must be a string');
  }

  let paths = Module._nodeModulePaths(path.dirname(filename));

  let parent = module.parent;
  let m = new Module(filename, parent);
  m.filename = filename;
  m._compile(code, filename);

  let exports = m.exports;
  parent && parent.children && parent.children.splice(parent.children.indexOf(m), 1);

  return exports;
}

process.chdir(__dirname);

const bundleFile = async rollupConfig => {
  const bundle = await rollup.rollup(rollupConfig);

  const { output } = await bundle.generate({ exports: 'default', format: 'cjs' });

  const [{ code }] = output;
  return code;
};

it('returns a module for the markdown file', async () => {
  const code = await bundleFile({
    input: '../fixtures/test.md',
    plugins: [markdownPlugin()],
  });

  const requiredModule = moduleFromString(code);

  expect(requiredModule.html).toMatchSnapshot();
  expect(requiredModule.filename).toEqual('test.md');
  expect(requiredModule.path).toEqual(path.resolve(path.join(__dirname, '..', 'fixtures/test.md')));
});

it('can apply different themes', async () => {
  // test that nord is the default theme
  const originalCode = await bundleFile({
    input: '../fixtures/test.md',
    plugins: [markdownPlugin()],
  });

  // test that Monokai can be applied
  const modifiedCode = await bundleFile({
    input: '../fixtures/test.md',
    plugins: [markdownPlugin({ theme: 'monokai' })]
  });

  const originalModule = moduleFromString(originalCode);
  const modifiedModule = moduleFromString(modifiedCode);

  expect(originalModule.html).toContain('background-color: #2e3440');
  expect(modifiedModule.html).toContain('background-color: #272822');
});

it('can provide markdown-it with additional options', async () => {
  const parsed = await bundleFile({
    input: '../fixtures/test.md',
    plugins: [markdownPlugin({ markdown: { typographer: true } })],
  });

  const { html } = moduleFromString(parsed);

  const processedHtml = html.replace(/(©|®|™|§|±)/g, (val) => escape(val));

  expect(processedHtml).toContain('%A9');
  expect(processedHtml).toContain('%AE');
  expect(processedHtml).toContain('%u2122');
  expect(processedHtml).toContain('%A7');
  expect(processedHtml).toContain('%B1');

  expect(processedHtml).not.toContain('(c)');
  expect(processedHtml).not.toContain('(C)');
  expect(processedHtml).not.toContain('(r)');
  expect(processedHtml).not.toContain('(R)');
  expect(processedHtml).not.toContain('(tm)');
  expect(processedHtml).not.toContain('(TM)');
  expect(processedHtml).not.toContain('(p)');
  expect(processedHtml).not.toContain('(P)');
  expect(processedHtml).not.toContain('+-');
});
