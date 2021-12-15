module.exports = () => [
  {
    test: /\.(js|jsx|ts|tsx)$/,
      exclude: /mode_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }
    ]
  }
]
