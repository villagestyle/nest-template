import type { Config } from 'jest';

const config: Config = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: './coverage', // 执行单元生成文件所在的文件夹
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'], // 需要写单元测试文件，一般是src下面所有代码
  coverageReporters: ['lcov', 'text-summary'],
  reporters: [
    'default',
    [
      'jest-sonar',
      {
        outputDirectory: './coverage', // 在这个文件夹下面
        outputName: 'test-reporter.xml', // 最后生成文件名字
        reportedFilePath: 'relative', // 相对路径
      },
    ],
  ],
};

export default config;
