// webpack.config.js

module.exports = {
  rules: [
    {
      test: /\.sass$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            prependData: "@import '@/styles/app.scss'"
          }
        }
      ]
    }
  ]
}
