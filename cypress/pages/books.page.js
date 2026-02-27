// cypress/pages/books.page.js
const selectors = require('../utils/selectors');

class BooksPage {
  visit() {
    cy.visit('/books');
  }

  search(text) {
    cy.get(selectors.books.searchInput).should('be.visible');
    cy.get(selectors.books.searchInput).clear();
    cy.get(selectors.books.searchInput).type(text);
  }

  clearSearch() {
    cy.get(selectors.books.searchInput).should('be.visible');
    cy.get(selectors.books.searchInput).clear();
  }

  getRowsCount() {
    return cy.get('body').then(($body) => {
      const rows = $body.find(selectors.books.bookRows);
      return rows.length; // 0, 1, 2...
    });
  }

  getVisibleTitles() {
    return cy
      .get(selectors.books.bookTitleLinks)
      .then(($links) => [...$links].map((el) => el.innerText.trim()).filter(Boolean));
  }

  expectAllTitlesContain(text) {
    const q = String(text).toLowerCase();
    this.getVisibleTitles().then((titles) => {
      expect(titles.length, 'at least one result').to.be.greaterThan(0);
      titles.forEach((t) => expect(t.toLowerCase()).to.include(q));
    });
  }

  getVisibleAuthors() {
    return cy
      .get(selectors.books.bookAuthorCells)
      .then(($cells) => [...$cells].map((el) => el.innerText.trim()).filter(Boolean));
  }

  expectAllAuthorsContain(text) {
    const q = String(text).toLowerCase();
    this.getVisibleAuthors().then((authors) => {
      expect(authors.length, 'at least one author result').to.be.greaterThan(0);
      authors.forEach((a) => expect(a.toLowerCase()).to.include(q));
    });
  }

  validateSearchBehavior({ term, validateTitles = false, validateAuthors = false }) {
    const q = String(term).toLowerCase();

    this.getRowsCount().then((baseline) => {
      expect(baseline, 'baseline row count').to.be.greaterThan(0);

      this.search(term);

      // Validar que no aumenta (refresh dinámico)
      this.getRowsCount().should('be.at.most', baseline);

      this.getRowsCount().then((countAfter) => {
        if (countAfter > 0) {
          if (validateTitles) {
            this.getVisibleTitles().then((titles) => {
              titles.forEach((t) => {
                expect(t.toLowerCase()).to.include(q);
              });
            });
          }

          if (validateAuthors) {
            this.getVisibleAuthors().then((authors) => {
              authors.forEach((a) => {
                expect(a.toLowerCase()).to.include(q);
              });
            });
          }
        }
      });

      // Restaurar baseline
      this.clearSearch();
      this.getRowsCount().should('equal', baseline);
    });
  }

  getSearchValue() {
    return cy.get(selectors.books.searchInput).should('be.visible').invoke('val');
  }

  getVisibleRowsData() {
    // Ajusta índices si tu tabla difiere:
    // 0: Image | 1: Title | 2: Author | 3: Publisher
    return cy.get('body').then(($body) => {
      const rows = $body.find('table tbody tr');
      if (!rows.length) return [];

      return cy.get('table tbody tr').then(($rows) => {
        return [...$rows].map((row) => {
          const cells = row.querySelectorAll('td');
          const titleLink = cells[1]?.querySelector('a');
          const title = titleLink ? titleLink.innerText.trim() : (cells[1]?.innerText || '').trim();
          const author = (cells[2]?.innerText || '').trim();
          const publisher = (cells[3]?.innerText || '').trim();

          // si el link lleva a /books?book=ISBN o /book?ISBN etc.
          const href = titleLink?.getAttribute('href') || '';
          const isbnFromHref = href.match(/([0-9X]{10,13})/i)?.[1] || null;

          return {
            title,
            author,
            publisher,
            href,
            isbnFromHref,
          };
        });
      });
    });
  }
}

module.exports = new BooksPage();
