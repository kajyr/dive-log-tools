import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';

const packageJson = require('./package.json');
const external = Object.keys(packageJson.dependencies || {});

export default {
  input: './src/index.ts',
  external,
  output: [
    {
      file: 'build/index.js',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [typescript({ tsconfig: 'tsconfig.json' }), commonjs()],
};
