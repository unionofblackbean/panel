module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.transformAssetUrls = {
          background: "src",
        };
        return options;
      });
  },
};
