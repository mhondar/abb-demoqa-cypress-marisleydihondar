/**
 * Centralized test data access.
 * - Non-sensitive data comes from fixtures
 * - Sensitive data comes from env via cy.env(...)
 */

function loadFixture(path) {
  return cy.fixture(path);
}

function getCredentialsFromEnv() {
  return cy.env(['username', 'password', 'userId']).then(({ username, password, userId }) => {
    if (!username || !password) {
      throw new Error(
        'Missing env vars: username/password. Check .env or CI secrets (CYPRESS_USERNAME / CYPRESS_PASSWORD).',
      );
    }
    return { username, password, userId };
  });
}

module.exports = {
  loadFixture,
  getCredentialsFromEnv,
};
