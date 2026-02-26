const booksPage = require('../../pages/books.page');
const { loadFixture } = require('../../utils/data.utils');

describe('Books - Search', () => {
  it('filters results using centralized test data', () => {
    booksPage.visit();

    loadFixture('books/search.json').then((data) => {
      booksPage.search(data.validSearchTerm);
      booksPage.expectAllTitlesContain(data.validSearchTerm);
    });
  });
});

describe('Books - Search functionality', () => {
  beforeEach(() => {
    booksPage.visit();
  });

  it('should filter results based on search input', () => {
    // 1️⃣ Guardar cantidad inicial de libros
    booksPage.getRowsCount().then((initialCount) => {
      expect(initialCount).to.be.greaterThan(0);

      // 2️⃣ Buscar término
      booksPage.search('Git');

      // 3️⃣ Validar que los resultados se filtran
      booksPage.expectAllTitlesContain('Git');

      // 4️⃣ Validar que la cantidad cambió
      booksPage.getRowsCount().then((filteredCount) => {
        expect(filteredCount).to.be.lessThan(initialCount);
      });

      // 5️⃣ Limpiar búsqueda
      booksPage.clearSearch();

      // 6️⃣ Validar que vuelve el listado completo
      booksPage.getRowsCount().should('equal', initialCount);
    });
  });
});
