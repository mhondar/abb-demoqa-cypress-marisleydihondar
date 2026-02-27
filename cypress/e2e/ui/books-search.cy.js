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

  it('TC-UI-02 — Partial title filtering', () => {
    booksPage.validateSearchBehavior({
      term: data.validSearchTerm,
      validateTitles: true,
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

  it('TC-UI-04 — Search by author filters results', () => {
    booksPage.validateSearchBehavior({
      term: data.authorSearchTerm,
      validateAuthors: true,
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

  it('TC-UI-06 — Edge: whitespace-only input behaves like empty OR returns no results', () => {
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

  it('TC-UI-07 — Negative: non-matching term shows no results', () => {
    booksPage.search(data.noResultsSearchTerm);
    booksPage.getRowsCount().should('equal', 0);
    // opcional: limpiar y volver a baseline (>0)
    booksPage.clearSearch();
    booksPage.getRowsCount().should('be.greaterThan', 0);
  });

  it('TC-UI-08.1 — Special characters: apostrophe search', () => {
    booksPage.validateSearchBehavior({
      term: data.specialCharTerm,
      validateTitles: false, // 👈 importante
    });
  });

  it('TC-UI-08.2 — Special characters: numeric search', () => {
    booksPage.validateSearchBehavior({
      term: data.numericTerm,
      validateTitles: true,
    });
  });

  it('TC-UI-09 — Search resets after page reload and full dataset is shown', () => {
    booksPage.getRowsCount().then((baseline) => {
      expect(baseline, 'baseline row count').to.be.greaterThan(0);

      // Apply search and ensure it filters
      booksPage.search(data.validSearchTerm);
      booksPage.getRowsCount().should('be.lessThan', baseline);

      // Reload
      cy.reload();

      // Input should be cleared after reload
      booksPage.getSearchValue().then((val) => {
        expect(String(val || '').trim(), 'search input should be empty after reload').to.eq('');
      });

      // Full dataset should be shown again
      booksPage.getRowsCount().should('equal', baseline);
    });
  });

  it('TC-UI-10 — UI aligns with API dataset (count + content consistency)', () => {
    // 1) API dataset
    cy.getBooks().then((apiRes) => {
      expect(apiRes.status).to.eq(200);
      expect(apiRes.body).to.have.property('books');

      const apiBooks = apiRes.body.books;
      expect(apiBooks.length, 'API books count').to.be.greaterThan(0);

      // index API by title (fallback) and by isbn if present
      const apiByIsbn = new Map(apiBooks.map((b) => [String(b.isbn), b]));
      const apiTitlesSet = new Set(apiBooks.map((b) => String(b.title).trim().toLowerCase()));

      // 2) UI baseline
      booksPage.visit();
      booksPage.clearSearch();

      // 3) Count check (strict)
      booksPage.getRowsCount().should('equal', apiBooks.length);

      // 4) Content checks
      booksPage.getVisibleRowsData().then((uiRows) => {
        expect(uiRows.length, 'UI visible rows').to.eq(apiBooks.length);

        // A) Every UI title should exist in API titles
        uiRows.forEach((row) => {
          expect(row.title, 'UI title should not be empty').to.not.equal('');
          expect(
            apiTitlesSet.has(row.title.toLowerCase()),
            `UI title "${row.title}" should exist in API`,
          ).to.eq(true);
        });

        // B) If we can infer ISBN from href, validate fields match API (stronger)
        const rowsWithIsbn = uiRows.filter((r) => r.isbnFromHref);
        if (rowsWithIsbn.length > 0) {
          rowsWithIsbn.forEach((row) => {
            const apiBook = apiByIsbn.get(String(row.isbnFromHref));
            expect(apiBook, `API book for ISBN ${row.isbnFromHref} should exist`).to.exist;

            expect(row.title, 'title match').to.eq(apiBook.title);
            expect(row.author, 'author match').to.eq(apiBook.author);

            // publisher: solo si UI lo muestra y API lo provee
            if (row.publisher && apiBook.publisher) {
              expect(row.publisher, 'publisher match').to.eq(apiBook.publisher);
            }
          });
        }
      });
    });
  });
});
