module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [
        require.resolve('./build/InlineFilesTransformer'),
        require.resolve('./build/StripStylesTransformer')
      ]
    }
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest'
  },
  testMatch: ['<rootDir>/**/*.spec.ts'],
  testEnvironment: 'jest-environment-jsdom-thirteen',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  coveragePathIgnorePatterns: ['/node_modules/', '/modules/*.*/'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^environments/(.*)$': '<rootDir>/src/environments/$1'
  },
  transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
