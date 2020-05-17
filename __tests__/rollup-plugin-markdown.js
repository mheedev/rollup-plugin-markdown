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

  const { output } = await bundle.generate({ format: 'cjs' });

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
  expect(requiredModule.path).toEqual(path.resolve(path.join(__dirname, 'fixtures/test.md')));
});