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

## TC-AUTH-02 — Deep linking to `/profile` loses authenticated session

- Route: `GET /profile`
- Preconditions: User has successfully logged in via `/login`
- Expected: Authenticated session persists and `/profile` displays the logged-in user data.
- Observed: Direct navigation to `/profile` after login results in loss of authenticated state (user appears unauthenticated or redirected).
- Impact:
  - Deep linking to protected routes does not reliably preserve session state.
  - Breaks expected SPA behavior where authenticated routes should remain accessible via direct URL access.
  - Can cause inconsistent user experience and automation instability if direct navigation is used in tests.
