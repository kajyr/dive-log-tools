import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'build/index.js',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [typescript({ tsconfig: 'tsconfig.json' }), commonjs()],
};
