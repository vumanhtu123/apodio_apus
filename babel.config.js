module.exports = function(api) {
  api.cache(true);
  return{
    presets: ['module:@react-native/babel-preset'],
    env: {
      production: {},
    },
    plugins: ['react-native-reanimated/plugin']
  }
};
