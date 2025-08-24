module.exports = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  // setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleDirectories: ['node_modules'],
  modulePaths: ['<rootDir>src'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
  rootDir: './', // Корневая директория - текущая папка проекта
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest', // Используем babel-jest для ts/tsx/js/jsx
  },
  testMatch: [
    '<rootDir>/tests/**/*.test.(ts|tsx|js|jsx)', // Ищем только в tests/
    '<rootDir>/src/**/*.test.(ts|tsx|js|jsx)', // И в src/
  ],
  transformIgnorePatterns: ['node_modules/(?!axios)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],
};
