import getAuthorizationHeaders from './authorizationUtil';

describe('getAuthorizationHeaders Test Suite', () => {
  // Quick way to mock process.env variables for this test.
  // Otherwise I'd eject the app and leverage a setupsTests
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('getAuthorizationHeaders returns expected header', () => {
    process.env.REACT_APP_GITHUB_API_BASE_URL = 'https://localhost';
    process.env.REACT_APP_GITHUB_CLIENT_ID = 'clientId';
    process.env.REACT_APP_GITHUB_CLIENT_SECRET = 'clientSecret';
    const expectedHeadersResult = {
      headers: {
        Authorization: 'Basic Y2xpZW50SWQ6Y2xpZW50U2VjcmV0',
      },
    };
    expect(getAuthorizationHeaders()).toEqual(expectedHeadersResult);
  });
});
