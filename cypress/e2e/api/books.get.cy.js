describe('API - GET /BookStore/v1/Books', () => {
  // Issue: Validate response status and schema
  it('TC-API-01 — Get all books returns 200', () => {
    cy.getBooks().then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('books');
      expect(res.body.books).to.be.an('array');
      expect(res.body.books.length).to.be.greaterThan(0);
    });
  });

  // Issue: Validate dataset integrity (8 books expected)
  it('TC-API-02 — Response contains expected number of books (dataset integrity)', () => {
    cy.fixture('books/expectations.json').then(({ expectedBooksCount }) => {
      cy.getBooks().then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('books');
        expect(res.body.books).to.have.length(expectedBooksCount);
      });
    });
  });

  // Issue: Validate required fields (title, author)
  it('TC-API-03 — Contract validation: required fields exist', () => {
    cy.getBooks().then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.books).to.be.an('array').and.not.be.empty;

      res.body.books.forEach((book) => {
        expect(book).to.have.property('title');
        expect(book.title).to.be.a('string').and.not.be.empty;

        expect(book).to.have.property('author');
        expect(book.author).to.be.a('string').and.not.be.empty;
      });
    });
  });

  // Issue: Validate response status and schema
  it('TC-API-04 — Contract validation: key fields are valid types', () => {
    cy.getBooks().then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.books).to.be.an('array').and.not.be.empty;

      res.body.books.forEach((book) => {
        // key fields
        expect(book).to.have.property('isbn');
        expect(book.isbn).to.be.a('string').and.not.be.empty;

        expect(book).to.have.property('title');
        expect(book.title).to.be.a('string').and.not.be.empty;

        expect(book).to.have.property('author');
        expect(book.author).to.be.a('string').and.not.be.empty;

        // optional: publish_date parseable (if present)
        if (book.publish_date != null) {
          expect(book.publish_date).to.be.a('string').and.not.be.empty;
          expect(Date.parse(book.publish_date), 'publish_date should be parseable').to.not.be.NaN;
        }

        // no unexpected nulls for required fields
        expect(book.title).to.not.equal(null);
        expect(book.author).to.not.equal(null);
        expect(book.isbn).to.not.equal(null);
      });
    });
  });
});
