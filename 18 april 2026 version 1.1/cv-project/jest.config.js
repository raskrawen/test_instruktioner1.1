module.exports = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'js/**/*.js',
    '!node_modules/**'
  ],
  testMatch: [
    '**/tests/unit.test.js'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};
