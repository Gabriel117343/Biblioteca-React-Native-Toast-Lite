module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'module:metro-react-native-babel-preset', // Preset de React Native
      '@babel/preset-typescript', // Preset para TypeScript
    ],
    plugins: [
      'react-native-reanimated/plugin', // Plugin para Reanimated que debe ir al final
    ],
  };
};
