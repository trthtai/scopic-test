module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/**'],
        extensions: ['.ios.js', '.android.js', '.js', '.json'],
        alias: {
          screens: './src/screens',
          res: './src/res',
          components: './src/components',
          services: './src/services',
        },
      },
    ],
  ],
  sourceMaps: true,
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
