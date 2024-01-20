export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
      "^.+\\.tsx?$": "ts-jest" 
  // process `*.tsx` files with `ts-jest`
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  }
  // moduleNameMapper: {
  //     '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
  // },
}