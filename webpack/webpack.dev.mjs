import { merge } from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer' // webpack bundle analyze
import common from './webpack.common.mjs'

const dev_config = merge(common, {
  mode: 'development',
  plugins: [
    // new BundleAnalyzerPlugin()
    new HtmlWebpackPlugin({
      title: "Application name",
      template: './src/entry/index.html'
  })
  ],
  devServer: {
    host: 'localhost',
    port: 2333,
    open: true,
    historyApiFallback: true
  }
})

export default(dev_config)
