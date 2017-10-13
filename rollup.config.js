import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'

export default {
  input: 'main.js',
  preferBuiltins: true,
  sourcemap: true,
  output: {
    file: 'main.stage1.js',
    format: 'cjs'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json()
  ]
}
