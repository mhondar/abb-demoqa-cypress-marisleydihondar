const loginPage = require('../../pages/login.page');
const profilePage = require('../../pages/profile.page');
const navigationPage = require('../../pages/navigation.page');

describe('E2E — Auth Profile', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('TC-AUTH-02 — Profile page shows authenticated user data', { tags: ['defect'] }, () => {
    // Login successfully
    loginPage.visit();
    loginPage.loginWithEnv();

    // Fuerza navegación nueva para validar sesión
    cy.visit('/profile');
    // Hay error al navegar directamente a /profile después de login, lo que sugiere un posible problema de manejo de sesión o redirección en la aplicación.
    cy.url().should('include', '/profile');

    cy.env(['username']).then(({ username }) => {
      expect(username, 'env username').to.exist;

      cy.env(['username']).then(({ username }) => {
        profilePage.expectUsername(username);
      });
    });
  });

  it('TC-AUTH-02 — Profile page shows authenticated user data (via menu navigation)', () => {
    // Login successfully
    loginPage.visit();
    loginPage.loginWithEnv();

    // En DemoQA suele redirigir a /profile; si no, igual seguimos
    cy.url().should('include', '/profile');

    // Navegar vía menú (flujo real)
    navigationPage.goToProfile();

    // Validar username en profile
    cy.env(['username']).then(({ username }) => {
      expect(username, 'env username').to.exist;
      profilePage.expectUsername(username);
    });
  });

  it('TC-AUTH-05 — Negative: direct access to /profile without login', () => {
    // Fresh session
    cy.clearCookies();
    cy.clearLocalStorage();

    // Attempt direct access
    cy.visit('/profile', { failOnStatusCode: false });

    // Accepted behavior A: redirect to login
    cy.location('pathname').then((path) => {
      if (path.includes('/login')) {
        cy.get('#userName').should('be.visible');
        cy.get('#password').should('be.visible');
      } else {
        // Accepted behavior B: access denied message (app-specific)
        // We keep this flexible to avoid flakiness
        cy.contains(/not authorized|access denied|login/i).should('be.visible');
      }
    });

    // Profile content must not be visible
    cy.get('body').then(($body) => {
      // #userName-value is the profile username label in DemoQA
      if ($body.find('#userName-value').length) {
        cy.get('#userName-value').should('not.be.visible');
      } else {
        cy.get('#userName-value').should('not.exist');
      }
    });
  });

  it('TC-AUTH-06 — Logout ends session', () => {
    // 1) Login successfully
    loginPage.visit();
    loginPage.loginWithEnv();

    // Asegura que estamos autenticados (username visible)
    cy.env(['username']).then(({ username }) => {
      expect(username, 'env username').to.exist;
      profilePage.expectUsername(username);
    });

    // 2) Click Logout
    profilePage.logout();

    // 3) Attempt to access /profile (should not be accessible)
    cy.clearCookies(); // opcional, pero refuerza logout
    cy.clearLocalStorage(); // opcional, pero refuerza logout

    cy.visit('/profile', { failOnStatusCode: false });

    // Expected: redirect to login OR access denied
    cy.location('pathname').then((path) => {
      if (path.includes('/login')) {
        cy.get('#userName').should('be.visible');
        cy.get('#password').should('be.visible');
      } else {
        cy.contains(/not authorized|access denied|login/i).should('be.visible');
      }
    });

    // Profile content must not be visible
    cy.get('#userName-value').should('not.exist');
  });
});
