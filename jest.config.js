/** @type {import('jest').Config} */
module.exports = {
    preset: '@lwc/jest-preset',
    modulePathIgnorePatterns: ['<rootDir>/.localdevserver'],
    moduleNameMapper: {
        '^c/(.+)$': '<rootDir>/force-app/main/default/lwc/$1/$1.js',
        '^lightning/card$': '<rootDir>/force-app/test/jest-mocks/lightning/card.js',
        '^lightning/datatable$': '<rootDir>/force-app/test/jest-mocks/lightning/datatable.js',
        '^lightning/spinner$': '<rootDir>/force-app/test/jest-mocks/lightning/spinner.js',
        '^lightning/(.+)$': '<rootDir>/force-app/test/jest-mocks/lightningMock.js',
        '^@salesforce/apex/(.+)$': '<rootDir>/force-app/test/jest-mocks/apex/$1.js',
        '^@salesforce/schema/(.+)$': '<rootDir>/force-app/test/jest-mocks/schema.js'
    },
    coverageThreshold: {
        global: {
            lines: 75
        }
    }
};
