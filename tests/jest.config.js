module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './reports',
      outputName: 'junit.xml',
      classNameTemplate: '{classname}',
      titleTemplate: '{title}',
      ancestorSeparator: ' › ',
      usePathForSuiteName: true
    }],
    ['jest-html-reporters', {
      publicPath: './reports/html-report',
      filename: 'report.html',
      expand: true,
      openReport: false,
      pageTitle: 'XBorg Backend Test Dashboard',
      logoImgPath: './reports/html-report/assets/xborg-logo.jpg',
      customInfos: [
        {title: 'Project', value: 'XBorg Backend Challenge'},
        {title: 'Branch', value: 'main'},
        {title: 'Date', value: new Date().toISOString().split('T')[0]}
      ],
      customStylesheet: './reports/custom-reporter.css'
    }]
  ]
};
