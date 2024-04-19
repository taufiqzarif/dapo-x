module.exports = {
  files: ["**/*.js"], // Adjust as necessary for your file types
  ignores: [
    "node_modules",
    // Add any other paths you want to ignore
  ],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "warn",
    // Add other rules as needed
  }
};