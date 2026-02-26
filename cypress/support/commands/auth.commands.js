const loginPage = require('../../pages/login.page');

Cypress.Commands.add('login', (username, password) => {
  loginPage.visit();
  loginPage.login(username, password);
  cy.url().should('include', '/profile');
});

Cypress.Commands.add('loginWithEnv', () => {
  return cy.env(['username', 'password']).then(({ username, password }) => {
    if (!username || !password) {
      throw new Error(
        'Missing env vars: username/password. Check .env or CI secrets (CYPRESS_USERNAME / CYPRESS_PASSWORD).',
      );
    }
    cy.login(username, password);
  });
});

/**
 * Caches an authenticated session so we don't login on every test.
 * Works great for smoke/regression suites.
 */
Cypress.Commands.add('loginWithSession', () => {
  return cy.env(['username', 'password']).then(({ username, password }) => {
    if (!username || !password) {
      throw new Error(
        'Missing env vars: username/password. Check .env or CI secrets (CYPRESS_USERNAME / CYPRESS_PASSWORD).',
      );
    }

    cy.session([username], () => {
      cy.login(username, password);
    });

    // Optional: ensure we are logged in
    cy.visit('/profile');
    cy.url().should('include', '/profile');
  });
});
