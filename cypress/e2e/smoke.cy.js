describe('Smoke', () => {
  it('loads DemoQA Books page', () => {
    cy.visit('/books');
    cy.contains('Book Store').should('be.visible');
  });

  it('env smoke', () => {
    cy.env(['username']).then(({ username }) => {
      cy.log(`username loaded: ${Boolean(username)}`);
    });
  });
});
