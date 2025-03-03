module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest', // Add support for ESM
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'mjs'], // Include mjs
  transformIgnorePatterns: [
    '/node_modules/(?!@babel)', // Allow Babel packages to be transformed
  ],
};
