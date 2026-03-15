import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';

import MagicString from 'magic-string';

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
  {
    input: {
      'index.min.js': 'src/index.ts'
    },
    output: {
      dir: 'dist',
      entryFileNames: '[name]'
    },
    plugins: [typescript({
      declarationDir: 'dist/dec',
      sourceMap: false,
    }), terser(), header()]
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [typescript({
      declarationDir: 'dist/dec'
    })]
  },
  {
    input: 'dist/dec/index.d.ts',
    output: [{
      file: 'dist/index.d.ts',
      format: 'es'
    }],
    plugins: [dts()]
  }
];

function header() {

    return {

        renderChunk( code ) {

            code = new MagicString( code );

            code.prepend( `/*
 * BufferedNetworkRequest
 * MIT License
 */\n` );

            return {
                code: code.toString(),
                map: code.generateMap()
            };

        }

    };

}
