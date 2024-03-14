module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    ["@babel/preset-react", { targets: { node: "current" } }],
  ], // These babel config is required for unit test. Converts es6 to es5
};
