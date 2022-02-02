// cutting down to what's needed for the test
export const userDetailsPayload = {
  bio: 'Beep beep boop',
  twitter_username: null,
  public_repos: 41,
  public_gists: 1,
  followers: 11,
  following: 27,
  created_at: '2014-03-20T19:22:59Z',
  updated_at: '2022-01-29T15:07:30Z',
};

// truncating this payload to only what we need and a tiny bit of context info (id and name),
export const userDetailsReposPayload = [
  {
    id: 443429558,
    name: 'bedfellow',
  },
  {
    stargazers_count: 34,
  },
  {
    stargazers_count: 0,
  },
];
