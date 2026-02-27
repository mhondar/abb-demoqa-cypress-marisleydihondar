# Known Issues (Observed during API Negative Testing)

## TC-API-06 — Unsupported method returns 500

- Endpoint: `POST /BookStore/v1/Books`
- Expected: 4xx (e.g., 405 Method Not Allowed)
- Observed: 500 Internal Server Error
- Impact: The API exposes a server error for an unsupported method instead of a client error.

## TC-API-07 — Invalid endpoint returns 200

- Endpoint: `GET /BookStore/v1/BooksXYZ`
- Expected: 404 Not Found
- Observed: 200 OK
- Impact: Invalid routes unexpectedly succeed, which can hide client integration issues and break routing assumptions.
