const { withNativeFederation, /* share, */ shareAll } = require('@softarc/native-federation/build');

const opts = {
  singleton: true,
  strictVersion: true,
  requiredVersion: 'auto',
  // includeSecondaries: false,
}

module.exports = withNativeFederation({
  name: 'host',
  shared: { ...shareAll(opts) },
  // shared: share({
  //   vue: { ...opts },
  //   '@vue/composition-api': { ...opts }
  // }),
});
