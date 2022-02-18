import path from 'path'
import {fileURLToPath} from 'url'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// style-loader css-loader less-loader
const styleLoader = process.env.NODE_ENV === 'production' ? 'style-loader' : MiniCssExtractPlugin.loader // process.env.NODE_ENV === 'development'下使用 MiniCssExtractPlugin 会影响开发环境热更新
const cssLoader = [ styleLoader, 'css-loader' ]
const lessLoader = [
  styleLoader,
  'css-loader',
  {
    loader: 'less-loader',
    options: { javascriptEnabled: true }
  }
]
const moduleLessLoader = [
  styleLoader,
  {
    loader: 'css-loader',
    options: { module: true }
  },
  {
    loader: 'less-loader',
    options: { javascriptEnabled: true }
  }
]

export default {
  entry: {
    bundle: path.resolve(__dirname, '../src/entry/index.tsx')
  },
  output: {
    assetModuleFilename: 'assets/[hash:6].[ext]', // Rule.generator.filename 与 output.assetModuleFilename 相同，并且仅适用于 asset 和 asset/resource 模块类型
  },
  module: {
    rules: [
      {
        test: /\.(j|tsx?)$/,
          exclude: /mode_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              }
            },
        ],
      },
      {
        test: /\.css$/,
        use: cssLoader,
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: lessLoader,
      },
      {
        test: /\.module\.less$/,
        use: moduleLessLoader,
      },
      {
        test: /\.(gif|jpg|jpeg|png|bmp|eot|woff|woff2|ttf|svg)/,
        type: 'asset',
        generator: {
          filename: 'assets/[hash:6].[ext]' // Rule.generator.filename 与 output.assetModuleFilename 相同，并且仅适用于 asset 和 asset/resource 模块类型
        },
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.less', '.module.less', '.png', '.svg'],
    alias: {
      '@': path.resolve(__dirname, '../'),
      '@src': path.resolve(__dirname, '../src')
    },
    fallback: {
      fs: false
    }
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
}

