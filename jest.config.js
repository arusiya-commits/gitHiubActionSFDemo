const { jestConfig } = require('@lwc/jest-preset');

module.exports = {
    ...jestConfig,
    modulePathIgnorePatterns: ['<rootDir>/.localdevserver'],
    setupFiles: ['<rootDir>/jest.setup.js'],
    coverageThreshold: {
        global: {
            lines: 75
        }
    }
};
