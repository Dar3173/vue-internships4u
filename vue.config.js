const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions:{
      sass:{
        additionalData: `
        @import"@/scss/VariablesProyecto.scss";
        `
      }
    }
  },
  publicPath: process.env.PUBLIC_HTML || "/"
})
