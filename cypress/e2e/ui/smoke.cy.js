const loginPage = require('../../pages/login.page');
const profilePage = require('../../pages/profile.page');

describe('Smoke - Core Application Flow', () => {
  it('should login successfully and display user profile', () => {
    // 1️⃣ Visit login page
    loginPage.visit();

    // 2️⃣ Login using environment credentials
    loginPage.loginWithEnv();

    // 3️⃣ Validate redirect to profile
    cy.url().should('include', '/profile');

    // 4️⃣ Validate username is displayed correctly
    profilePage.expectUsernameFromEnv();
  });
});
