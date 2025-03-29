// Increase timeout for tests
jest.setTimeout(30000);

// Global setup
beforeAll(() => {
  // Any global setup needed before running tests
  console.log('Starting test suite...');
});

// Global teardown
afterAll(() => {
  // Any global cleanup after all tests have run
  console.log('Test suite completed.');
});
