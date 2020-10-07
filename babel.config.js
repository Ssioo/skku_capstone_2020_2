module.exports = {
  // NOTE(viz.ko): typescript is also directly processed by babel
  // so if any extra syntax feature is needed, plugin should be added below
  // https://github.com/facebook/metro/blob/master/packages/metro-react-native-babel-preset/src/configs/main.js#L180
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['src'],
        extensions: ['.js', 'jsx', '.ts', '.tsx', '.json'],
      },
    ],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
  ],
}
