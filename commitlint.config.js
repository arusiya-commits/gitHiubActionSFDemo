module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'test', 'release', 'ci']
        ],
        'subject-case': [0],
        'header-max-length': [2, 'always', 100],
        'body-max-line-length': [0, 'always']
    }
};
