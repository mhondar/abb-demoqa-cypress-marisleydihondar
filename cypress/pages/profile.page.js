// cypress/pages/profile.page.js
const selectors = require('../utils/selectors');

class ProfilePage {
  visit() {
    cy.visit('/profile');
  }

  expectUsername(expectedUsername) {
    cy.get(selectors.profile.usernameLabel).should('be.visible').and('have.text', expectedUsername);
  }

  // ✅ Cypress 15 friendly + compatible with allowCypressEnv: false
  expectUsernameFromEnv() {
    return cy.env(['username']).then(({ username }) => {
      if (!username) {
        throw new Error('Missing env var: username. Check .env or CI secrets (CYPRESS_USERNAME).');
      }

      cy.get(selectors.profile.usernameLabel).should('be.visible').and('have.text', username);
    });
  }

  getBooksCount() {
    return cy.get(selectors.profile.bookRows).its('length');
  }

  logout() {
    cy.get(selectors.profile.logoutButton).should('be.visible').click();
  }
}

module.exports = new ProfilePage();
