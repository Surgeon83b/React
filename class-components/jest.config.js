module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: true, // Разрешает использование глобальных переменных
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Путь к setupTests
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy' // Для стилей
  }
};