describe('API - Negative Scenarios: BookStore Books', () => {
  it('TC-API-06 — Negative: unsupported method returns proper error', { tags: ['defect'] }, () => {
    cy.env(['apiBaseUrl']).then(({ apiBaseUrl }) => {
      const base = apiBaseUrl || 'https://demoqa.com';

      cy.request({
        method: 'POST',
        url: `${base}/BookStore/v1/Books`,
        failOnStatusCode: false,
        body: {},
      }).then((res) => {
        // Expected: 4xx (e.g., 405 Method Not Allowed)
        // Observed: 500 -> API defect (server error for unsupported method)
        expect(res.status, 'BUG: POST /Books should not return 5xx').to.not.be.within(500, 599);
        expect(res.status, 'POST /Books should not succeed').to.not.be.within(200, 299);
      });
    });
  });

  it('TC-API-07 — Negative: invalid endpoint path returns 404', { tags: ['defect'] }, () => {
    cy.env(['apiBaseUrl']).then(({ apiBaseUrl }) => {
      const base = apiBaseUrl || 'https://demoqa.com';

      cy.request({
        method: 'GET',
        url: `${base}/BookStore/v1/BooksXYZ`,
        failOnStatusCode: false,
      }).then((res) => {
        // Expected: 404 Not Found
        // Observed: 200 -> API defect (invalid routes should not succeed)
        expect(res.status, 'BUG: invalid endpoint must not return 2xx').to.not.be.within(200, 299);
      });
    });
  });

  it('TC-API-09 — Edge: response handles additional query params gracefully', () => {
    cy.env(['apiBaseUrl']).then(({ apiBaseUrl }) => {
      const base = apiBaseUrl || 'https://demoqa.com';

      cy.request({
        method: 'GET',
        url: `${base}/BookStore/v1/Books?foo=bar`,
        failOnStatusCode: false,
      }).then((res) => {
        // Either returns same dataset (200) or a 4xx, but must not be 500
        expect(res.status).to.not.be.within(500, 599);

        if (res.status === 200) {
          expect(res.body).to.have.property('books');
          expect(res.body.books).to.be.an('array');
        }
      });
    });
  });
});
