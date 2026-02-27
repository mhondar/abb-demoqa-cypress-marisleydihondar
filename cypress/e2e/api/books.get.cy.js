describe('API - GET /BookStore/v1/Books', () => {
  it('TC-API-01 Get all books returns 200 and a valid books payload', () => {
    cy.getBooks().then((res) => {
      // Status
      expect(res.status).to.eq(200);

      // Basic shape
      expect(res.body).to.have.property('books');
      expect(res.body.books).to.be.an('array');

      // Minimum integrity: not empty
      expect(res.body.books.length).to.be.greaterThan(0);

      // Required fields contract for each book
      res.body.books.forEach((book) => {
        expect(book).to.have.property('title');
        expect(book.title).to.be.a('string').and.not.be.empty;

        expect(book).to.have.property('author');
        expect(book.author).to.be.a('string').and.not.be.empty;
      });
    });
  });

  it('TC-API-02 Response contains expected number of books (8 books) from centralized test data', () => {
    cy.fixture('books/expectations.json').then(({ expectedBooksCount }) => {
      cy.getBooks().then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.books).to.have.length(expectedBooksCount);
      });
    });
  });
});
