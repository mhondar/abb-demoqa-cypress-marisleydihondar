## Observed API Issues (Negative Scenarios)

- TC-API-06: `POST /BookStore/v1/Books` returns **500**.
  - Expected: 4xx (e.g., 405 Method Not Allowed)
  - Impact: API exposes server error for unsupported method.

- TC-API-07: `GET /BookStore/v1/BooksXYZ` returns **200**.
  - Expected: 404 Not Found
  - Impact: Invalid routes are not handled correctly (possible fallback routing issue).
