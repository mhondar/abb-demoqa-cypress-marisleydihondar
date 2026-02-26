// cypress/pages/login.page.js
const selectors = require('../utils/selectors');

class LoginPage {
  visit() {
    cy.visit('/login');
  }

  fillUsername(username) {
    cy.get(selectors.login.usernameInput).should('be.visible');
    cy.get(selectors.login.usernameInput).clear();
    cy.get(selectors.login.usernameInput).type(username);
  }

  fillPassword(password) {
    cy.get(selectors.login.passwordInput).should('be.visible');
    cy.get(selectors.login.passwordInput).clear();
    cy.get(selectors.login.passwordInput).type(password, { log: false });
  }

  submit() {
    cy.get(selectors.login.loginButton).should('be.enabled');
    cy.get(selectors.login.loginButton).click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }

  loginWithEnv() {
    return cy.env(['username', 'password']).then(({ username, password }) => {
      if (!username || !password) {
        throw new Error(
          'Missing env vars: username/password. Check .env or CI secrets (CYPRESS_USERNAME / CYPRESS_PASSWORD).',
        );
      }
      this.login(username, password);
    });
  }

  expectLoginError() {
    cy.get(selectors.login.errorMessage).should('be.visible');
    cy.get(selectors.login.errorMessage).should('not.be.empty');
  }
}

module.exports = new LoginPage();
