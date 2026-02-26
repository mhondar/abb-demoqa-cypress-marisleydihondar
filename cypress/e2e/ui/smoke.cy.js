const profilePage = require('../../pages/profile.page');
const { getCredentialsFromEnv } = require('../../utils/data.utils');

describe('Smoke', () => {
  it('logs in and validates profile', () => {
    getCredentialsFromEnv().then(({ username, password }) => {
      cy.login(username, password);
      profilePage.expectUsername(username);
    });
  });
});
