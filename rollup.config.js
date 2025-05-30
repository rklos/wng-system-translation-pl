import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import scss from 'rollup-plugin-scss';

export default {
  input: 'src/scripts/main.js',
  output: {
    dir: 'dist',
    entryFileNames: 'scripts/main.js',
    assetFileNames: (asset) => {
      if (asset.name.endsWith('.css')) return `styles/${asset.name}`;
      return `assets/${asset.name}`;
    },
  },
  plugins: [
    del({ targets: 'dist' }),
    scss({
      name: 'main.css',
      silenceDeprecations: ['legacy-js-api'],
    }),
    copy({
      targets: [
        { src: 'src/module.json', dest: 'dist/' },
      ]
    }),
  ]
}
