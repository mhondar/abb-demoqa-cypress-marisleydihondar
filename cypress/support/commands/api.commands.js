Cypress.Commands.add('getBooks', () => {
  return cy.request({
    method: 'GET',
    url: '/BookStore/v1/Books',
    failOnStatusCode: false,
  });
});
