const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@shared": path.resolve(__dirname, "../shared"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
    },
  },
};
