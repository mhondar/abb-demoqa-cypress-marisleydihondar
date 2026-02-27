const loginPage = require('../../pages/login.page');

describe('UI — Auth Negative Login (Validation)', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('TC-AUTH-04.1 — Negative: empty username and password blocks login', () => {
    // Ambos vacíos (no tipeamos nada)
    loginPage.submit();

    // No redirect
    cy.url().should('include', '/login');
    cy.url().should('not.include', '/profile');

    // Form sigue visible/usable
    cy.get('#userName').should('be.visible');
    cy.get('#password').should('be.visible');

    // Opcional: si la app muestra error, lo validamos sin hacerlo obligatorio
    cy.get('body').then(($body) => {
      if ($body.find('#name').length) {
        cy.get('#name').should('be.visible').and('not.be.empty');
      }
    });
  });

  it('TC-AUTH-04.2 — Negative: empty password blocks login', () => {
    cy.env(['username']).then(({ username }) => {
      expect(username, 'env username').to.exist;

      loginPage.fillUsername(username);
      // password vacío
      loginPage.submit();

      cy.url().should('include', '/login');
      cy.url().should('not.include', '/profile');
      cy.get('#password').should('be.visible');
    });
  });

  it('TC-AUTH-04.3 — Negative: empty username blocks login', () => {
    // username vacío
    loginPage.fillPassword('somePassword'); // no importa si es válido; debería bloquear por username vacío
    loginPage.submit();

    cy.url().should('include', '/login');
    cy.url().should('not.include', '/profile');
    cy.get('#userName').should('be.visible');
  });
});
