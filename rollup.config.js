import commonjs from 'rollup-plugin-commonjs'
// import nodeResolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
// import amd from 'rollup-plugin-amd';
import cleanup from 'rollup-plugin-cleanup'
import prettier from 'rollup-plugin-prettier'
import butternut from 'rollup-plugin-butternut'
import babel from 'rollup-plugin-babel'

export default {
  input: 'original/main.js',
  preferBuiltins: false,
  // sourcemap: true,
  external: [
    'jquery',
    'franc',
    '@knod/unfluff',
    '@knod/sbd',
    '@knod/nouislider'
  ],
  output: {
    file: 'main.js',
    format: 'cjs'
  },
  plugins: [
    // amd(),
    commonjs(),
    // nodeResolve(),
    json(),
    babel({
      babelrc: false,
      presets: [
        [
          'env',
          {
            modules: false
          }
        ]
      ],
      plugins: ['external-helpers']
    }),
    cleanup(),
    // butternut(),
    // prettier({
    //   // sourceMap: true,
    //   singleQuote: true,
    //   semi: false
    // })
  ]
}
