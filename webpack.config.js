const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ZipWebpackPlugin = require("zip-webpack-plugin");
const packageJson = require("./package.json");
const {
  scriptOutputName,
  version
} = packageJson;

module.exports = {
  target: "node",
  mode: "production",
  devtool: false,
  entry: {
    main: "@/main.ts",
  },
  output: {
    libraryTarget: "commonjs2",
    libraryExport: "default",
    path: path.resolve(__dirname, `./dist/${scriptOutputName}`),
    filename: `index.js`,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, "src/settings.json"),
        to: path.resolve(__dirname, `dist/${scriptOutputName}/settings.json`),
      }],
    }),
    new ZipWebpackPlugin({
      path: path.resolve(__dirname, `./dist`),
      pathPrefix: scriptOutputName,
      filename: `${scriptOutputName}-v${version}.zip`,
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@shared": path.resolve(__dirname, "./src/shared"),
    },
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loader: "ts-loader",
    }, ],
  },
  optimization: {
    minimize: false,

    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: /main/,
          mangle: false,
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};