const booksPage = require('../../pages/books.page');

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
