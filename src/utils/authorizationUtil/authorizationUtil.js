const getAuthorizationHeaders = () => ({
  headers: {
    Authorization: `Basic ${btoa(`${process.env.REACT_APP_GITHUB_CLIENT_ID}:${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`, 'base64')}`,
  },
});

export default getAuthorizationHeaders;
