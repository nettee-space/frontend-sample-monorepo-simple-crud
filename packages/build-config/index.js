/* eslint-disable no-undef */
import { build } from 'tsup';

const getEntryPoints = (exports) => {
  const entryPoints = {};

  const extractPath = (obj, prefix = '.') => {
    for (const [key, value] of Object.entries(obj)) {
      if (key === 'types' && typeof value === 'string') {
        const srcPath = value
          .replace('./dist/', 'src/')
          .replace('.d.ts', '.ts');

        if (prefix === '.') {
          entryPoints['index'] = srcPath;
        } else {
          const outPath = `${prefix.slice(2)}/index`;
          entryPoints[outPath] = srcPath;
        }
      } else if (typeof value === 'object' && value !== null) {
        extractPath(value, key);
      }
    }
  };

  extractPath(exports);

  return entryPoints;
};

export const run = async ({ pkg, config = {} }) => {
  const dev = process.argv.includes('--dev');
  const watch = process.argv.includes('--watch');
  const external = Object.keys({
    ...pkg.dependencies,
    ...pkg.peerDependencies,
  });

  const entryPoints = pkg.exports
    ? getEntryPoints(pkg.exports)
    : ['src/index.ts'];

  const baseConfig = {
    entry: entryPoints,
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    minify: !dev,
    sourcemap: true,
    target: 'es2019',
    treeshake: true,
    splitting: false,
    preserveModules: true,
    watch,
    external,
    ...config,
  };

  try {
    await build(baseConfig);
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
};
