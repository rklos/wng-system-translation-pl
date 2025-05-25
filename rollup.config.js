import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';

export default {
  input: 'src/scripts/main.js',
  output: {
    dir: 'dist/scripts',
  },
  plugins: [
    del({ targets: 'dist' }),
    copy({
      targets: [
        { src: 'src/module.json', dest: 'dist/' },
      ]
    }),
  ]
}
