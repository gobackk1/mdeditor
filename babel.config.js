module.exports = {
  presets: [
    [
      "@babel/preset-env", {
        "targets": {
          "chrome": "58",
          "ie": "11"
        },
      }
    ]
  ],
  plugins: ["transform-object-rest-spread","transform-regenerator"]
};
