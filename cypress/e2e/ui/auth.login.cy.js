const loginPage = require('../../pages/login.page');
const profilePage = require('../../pages/profile.page');
const { loadFixture } = require('../../utils/data.utils');

describe('E2E — Auth Login', () => {
  let invalidPassword;

  before(() => {
    return loadFixture('users/user.json').then((data) => {
      invalidPassword = data.invalidPassword;
    });
  });

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('TC-AUTH-01 — Login with valid credentials redirects to Profile', () => {
    loginPage.visit();
    loginPage.loginWithEnv();

    cy.url().should('include', '/profile');

    cy.env(['username']).then(({ username }) => {
      expect(username, 'env username').to.exist;
      profilePage.expectUsername(username);
    });
  });

  it('TC-AUTH-03 — Negative: login with invalid password shows error', () => {
    cy.env(['username']).then(({ username }) => {
      expect(username, 'env username').to.exist;
      expect(invalidPassword, 'invalidPassword fixture').to.exist;

      loginPage.visit();
      loginPage.login(username, invalidPassword);

      // Error visible
      loginPage.expectLoginError();

      // Not redirected
      cy.url().should('include', '/login');
      cy.url().should('not.include', '/profile');
    });
  });
});
