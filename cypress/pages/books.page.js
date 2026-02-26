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
    return cy.get(selectors.books.bookRows).its('length');
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
}

module.exports = new BooksPage();
