const booksPage = require('../../pages/books.page');
const { loadFixture } = require('../../utils/data.utils');

describe('UI - Books Search (/books)', () => {
  let data;

  before(() => {
    // Carga una sola vez para todo el spec
    return loadFixture('books/search.json').then((fixture) => {
      data = fixture;
    });
  });

  beforeEach(() => {
    booksPage.visit();
    // Baseline: asegurar que empezamos sin filtro
    booksPage.clearSearch();
  });

  it('TC-UI-01 — Books page loads and renders list', () => {
    booksPage.getRowsCount().then((count) => {
      expect(count, 'book rows count').to.be.greaterThan(0);
    });
  });

  it('TC-UI-02 — Search filters list dynamically by partial title', () => {
    booksPage.getRowsCount().then((initialCount) => {
      expect(initialCount).to.be.greaterThan(0);

      booksPage.search(data.validSearchTerm);

      // Verifica que el listado cambió dinámicamente
      booksPage.getRowsCount().should('be.lessThan', initialCount);

      // Verifica que el contenido coincide
      booksPage.expectAllTitlesContain(data.validSearchTerm);
    });
  });

  it('TC-UI-03 — Search is case-insensitive', () => {
    // 1) Search with canonical term
    booksPage.search(data.validSearchTerm);

    booksPage.getRowsCount().then((countGit) => {
      booksPage.getVisibleTitles().then((titlesGit) => {
        // Normalizamos para comparación
        const normalizedGit = titlesGit.map((t) => t.toLowerCase()).sort();

        // 2) Search with mixed-case term
        booksPage.search(data.caseInsensitiveTerm);

        booksPage.getRowsCount().then((countMixed) => {
          booksPage.getVisibleTitles().then((titlesMixed) => {
            const normalizedMixed = titlesMixed.map((t) => t.toLowerCase()).sort();

            // 3) Compare results
            expect(countMixed, 'row count should match for different casing').to.eq(countGit);
            expect(normalizedMixed, 'titles should match ignoring casing').to.deep.equal(
              normalizedGit,
            );
          });
        });
      });
    });
  });

  const assertBaseline = (expected) => booksPage.getRowsCount().should('equal', expected);

  it('TC-UI-05 — Empty search restores full dataset', () => {
    booksPage.getRowsCount().then((baseline) => {
      expect(baseline).to.be.greaterThan(0);

      booksPage.search(data.narrowSearchTerm);
      booksPage.getRowsCount().should('be.lessThan', baseline);

      booksPage.clearSearch();
      assertBaseline(baseline);
    });
  });

  it('TC-UI-06 (P1) — Edge: whitespace-only input behaves like empty OR returns no results', () => {
    booksPage.getRowsCount().then((initialCount) => {
      expect(initialCount, 'initial row count').to.be.greaterThan(0);
      expect(data.whitespaceSearchTerm, 'whitespaceSearchTerm in fixture').to.exist;

      booksPage.search(data.whitespaceSearchTerm);

      // retryable: espera a que se estabilice en 0 o baseline
      booksPage.getRowsCount().should('be.oneOf', [0, initialCount]);

      booksPage.clearSearch();
      booksPage.getRowsCount().should('equal', initialCount);
    });
  });
});
