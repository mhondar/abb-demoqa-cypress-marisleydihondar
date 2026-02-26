describe('Smoke', () => {
  it('loads DemoQA Books page', () => {
    cy.visit('/books');
    cy.contains('Book Store').should('be.visible');
  });
});