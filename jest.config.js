/** @type {import('jest').Config} */
module.exports = {
    preset: '@lwc/jest-preset',
    modulePathIgnorePatterns: ['<rootDir>/.localdevserver'],
    coverageThreshold: {
        global: {
            lines: 75
        }
    }
};
