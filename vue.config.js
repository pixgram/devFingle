const path = require('path');
/*const PrerenderSpaPlugin = require('prerender-spa-plugin');
const JSDOMRenderer = require('@prerenderer/renderer-jsdom');
const productionPlugins = new PrerenderSpaPlugin({
  staticDir: path.join(__dirname, 'dist'),
  routes: ['/coach/'],
  renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
    //renderer: new JSDOMRenderer({
    renderAfterElementExists: '#app',
    //renderAfterDocumentEvent: 'render-event',
  }),
});*/
module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      scss: {
        prependData: `
            @import "@/assets/scss/_variables.scss";
            @import "@/assets/scss/_mixins.scss";
            @import "@/assets/scss/_extend.scss";
        `,
      },
    },
  },
  configureWebpack: {
    entry: ['babel-polyfill', './src/main.js'],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },
    //plugins: [productionPlugins],
  },
  devServer: {
    port: 8080,
    overlay: false,
    disableHostCheck: true,
    // host: 'localhost',
    proxy: {
      '/b2c/api': {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
      },

      // todo : test proxy 삭제 필요
      '/b2c': {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
      },
    },
  },
};
