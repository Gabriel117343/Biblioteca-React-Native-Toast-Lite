module.exports = function (api) {
  api.cache(true);
  const presets = [
    'module:metro-react-native-babel-preset', // Preset de React Native
    '@babel/preset-typescript', // Preset para TypeScript
  ];

  const plugins = [
    'react-native-reanimated/plugin', // Plugin para Reanimated que debe ir al final
  ];

  const esmConfig = {
    presets,
    plugins,
    env: {
      production: {
        plugins: ['transform-remove-console'],
      },
    },
  };

  return {
    presets,
    plugins,
    env: {
      es: esmConfig,
      esm: esmConfig,
    },
  };
};
