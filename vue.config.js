module.exports = {
  devServer: {
    port: 8080,
    hot: true,
    open: false,
    proxy: "http://localhost:5055",
  },
  transpileDependencies: ["vuetify"],
  productionSourceMap: false,
};
