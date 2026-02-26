Cypress.Commands.add('getBooks', () => {
  return cy.env(['apiBaseUrl']).then(({ apiBaseUrl }) => {
    const base = apiBaseUrl || 'https://demoqa.com';
    return cy.request({
      method: 'GET',
      url: `${base}/BookStore/v1/Books`,
      failOnStatusCode: false,
    });
  });
});
