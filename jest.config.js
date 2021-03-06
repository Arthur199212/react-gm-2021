module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!**/node_modules/**',
    '!**/src/index.tsx',
    '!**/src/assets/**',
    '!**/src/config/**',
    '!**/src/pages/_document.tsx',
    '!**/src/server/**',
    '!**/src/tests/**',
    '!**/src/validation/**'
  ],
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mocks/files.js',
    '\\.((c|sa|sc)ss)$': 'identity-obj-proxy',
    '^@app(.*)$': ['<rootDir>/src$1']
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  resetMocks: true,
  setupFilesAfterEnv: [`<rootDir>/src/tests/jest-setup.ts`],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$'
}
