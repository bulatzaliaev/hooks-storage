import typescript from '@rollup/plugin-typescript';
import { uglify } from "rollup-plugin-uglify";
import pkg from './package.json'

export default {
  external: [
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  input: 'src/main.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [typescript(), uglify(),],
};