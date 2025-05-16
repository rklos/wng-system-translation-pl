import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import replace from '@rollup/plugin-replace';
import listTemplates from './.rollup/list-templates.js';

export default {
  input: 'src/scripts/main.js',
  output: {
    dir: 'dist',
  },
  plugins: [
    del({ targets: 'dist' }),
    copy({
      targets: [
        { src: 'src/module.json', dest: 'dist/' },
        { src: 'src/template/*', dest: 'dist/template' },
      ]
    }),
    replace({
      '__templates__': JSON.stringify(listTemplates()),
      preventAssignment: false,
    }),
  ]
}
