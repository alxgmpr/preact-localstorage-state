import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/index.iife.js',
      format: 'iife',
      name: 'PreactComponents',
      globals: {
        preact: 'preact',
      },
    },
  ],
  external: ['preact'],
  plugins: [peerDepsExternal(), typescript(), resolve(), commonjs(), terser()],
}
