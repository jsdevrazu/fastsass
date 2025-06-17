module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always', 
      [
        'feature', // For new features
        'fix',     // For bug fixes in production code
        'hotfix',  // For critical production bug fixes
        'bugs',    // Alternative for 'fix', if you prefer
        'release', // For release commits (e.g., version bumps)
        'docs',    // For documentation changes
        'style',   // For code style changes (formatting, etc.)
        'refactor',// For code changes that neither fix a bug nor add a feature
        'test',    // For adding or correcting tests
        'chore',   // For build process or auxiliary tool changes
      ],
    ],
    'subject-case': [2, 'always', 'sentence-case'],
  },
};