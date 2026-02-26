# Test Cases — ABB QA Assignment (DemoQA Book Store)

## 1. Scope & References

This document defines functional test cases for:

- Books API: `GET /BookStore/v1/Books`
- UI Books Search: `https://demoqa.com/books`
- Authentication + Profile validation: `https://demoqa.com/login` and `https://demoqa.com/profile`

Notes:

- Backend search is not implemented; UI fetches all books and filters client-side.
- Current dataset is expected to return **8 books** and include **title** and **author** fields.

## 2. Test Data

- Base URL (UI): `https://demoqa.com`
- API base URL: `https://demoqa.com`
- Registered user (provided): `mhondar / Mhondar.2026@` (Do not delete account)
- Example search terms:
  - Existing: `Git`
  - Non-existing: `___no_results___`
  - Case variation: `gIt`
  - Special chars: `O'Reilly`, `978`

## 3. Conventions

- Priority: P0 (critical), P1 (high), P2 (medium)
- Type: API / UI / E2E
- IDs format: TC-API-xx, TC-UI-xx, TC-AUTH-xx

---

# 4. API — Books Endpoint

### TC-API-01 (P0) — Get all books returns 200

**Type:** API  
**Preconditions:** API available  
**Steps:**

1. Send `GET /BookStore/v1/Books`
   **Expected:**

- HTTP 200 OK

### TC-API-02 (P0) — Response contains expected number of books (dataset integrity)

**Type:** API  
**Steps:**

1. Send `GET /BookStore/v1/Books`
   **Expected:**

- Response body contains `books` array
- `books.length == 8`

### TC-API-03 (P0) — Contract validation: required fields exist

**Type:** API  
**Steps:**

1. Send `GET /BookStore/v1/Books`
   **Expected:**

- Each book contains non-empty:
  - `title` (string)
  - `author` (string)

### TC-API-04 (P1) — Contract validation: key fields are valid types

**Type:** API  
**Steps:**

1. Send `GET /BookStore/v1/Books`
   **Expected:**

- `isbn` is string and not empty
- `title` is string
- `author` is string
- (If present) `publish_date` is valid date format / parsable string
- No unexpected nulls for required fields

### TC-API-05 (P1) — Idempotency: repeated calls return consistent dataset

**Type:** API  
**Steps:**

1. Call `GET /BookStore/v1/Books` twice
   **Expected:**

- Both responses return a `books` array
- Count remains 8
- ISBN set remains consistent (order may differ)

### TC-API-06 (P1) — Negative: unsupported method returns proper error

**Type:** API  
**Steps:**

1. Send `POST /BookStore/v1/Books` (or PUT/DELETE if not supported)
   **Expected:**

- 4xx response (e.g., 405 Method Not Allowed) or documented error response

### TC-API-07 (P2) — Negative: invalid endpoint path returns 404

**Type:** API  
**Steps:**

1. Send `GET /BookStore/v1/BooksXYZ`
   **Expected:**

- HTTP 404

### TC-API-08 (P2) — Resilience: response time within acceptable threshold

**Type:** API  
**Steps:**

1. Send `GET /BookStore/v1/Books`
   **Expected:**

- Response time < X ms (define a threshold for this assignment, e.g., 2000ms)
- No timeouts

### TC-API-09 (P2) — Edge: response handles additional query params gracefully

**Type:** API  
**Steps:**

1. Send `GET /BookStore/v1/Books?foo=bar`
   **Expected:**

- Either ignores params and returns same dataset or returns documented error
- Must not return 500

---

# 5. UI — Books Search (`/books`)

### TC-UI-01 (P0) — Books page loads and renders list

**Type:** UI  
**Steps:**

1. Navigate to `/books`
   **Expected:**

- Books table/list is visible
- At least 1 book row is displayed

### TC-UI-02 (P0) — Search filters list by partial title (happy path)

**Type:** UI  
**Steps:**

1. Navigate to `/books`
2. Type `Git` in search input
   **Expected:**

- Displayed results refresh dynamically
- All visible book titles contain `Git` (case-insensitive)

### TC-UI-03 (P1) — Search is case-insensitive

**Type:** UI  
**Steps:**

1. Navigate to `/books`
2. Search `gIt`
   **Expected:**

- Results match those for `Git`

### TC-UI-04 (P1) — Search by author filters results

**Type:** UI  
**Steps:**

1. Navigate to `/books`
2. Enter an author substring (e.g., `Silverman`)
   **Expected:**

- Results refresh
- All visible rows match author substring in author column (case-insensitive)

### TC-UI-05 (P1) — Edge: empty search shows full dataset

**Type:** UI  
**Steps:**

1. Navigate to `/books`
2. Ensure search box is empty (clear it)
   **Expected:**

- Full dataset is displayed (expected 8 rows, if UI mirrors API dataset)

### TC-UI-06 (P1) — Edge: whitespace-only input behaves like empty

**Type:** UI  
**Steps:**

1. Navigate to `/books`
2. Type spaces `"   "` in search input
   **Expected:**

- Either treated as empty (shows full list) OR treated as literal (shows no results)
- Must not break UI or throw console errors

### TC-UI-07 (P1) — Negative: non-matching term shows no results

**Type:** UI  
**Steps:**

1. Navigate to `/books`
2. Search `___no_results___`
   **Expected:**

- No matching rows displayed (0 rows)

### TC-UI-08 (P2) — Edge: special characters in search do not break filtering

**Type:** UI  
**Steps:**

1. Navigate to `/books`
2. Search `O'Reilly` or `978`
   **Expected:**

- UI handles special characters without errors
- Results are filtered appropriately

### TC-UI-09 (P2) — Refresh behavior: search state after page reload

**Type:** UI  
**Steps:**

1. Navigate to `/books`
2. Enter `Git`
3. Refresh the page
   **Expected:**

- Define expected behavior:
  - Either search resets (most common) OR persists (less common)
- No broken UI state

### TC-UI-10 (P2) — UI aligns with API dataset size (consistency check)

**Type:** UI + API (cross-check)  
**Steps:**

1. Call `GET /BookStore/v1/Books` and capture count
2. Navigate to `/books` with empty search
   **Expected:**

- UI list count matches API dataset count (8)

---

# 6. AUTH / Profile (`/login`, `/profile`)

### TC-AUTH-01 (P0) — Login with valid credentials redirects to Profile

**Type:** E2E  
**Preconditions:** User exists  
**Steps:**

1. Navigate to `/login`
2. Enter valid username/password
3. Click Login
   **Expected:**

- Redirect to `/profile`
- Username is displayed on profile

### TC-AUTH-02 (P0) — Profile page shows authenticated user data

**Type:** E2E  
**Steps:**

1. Login successfully
2. Navigate to `/profile`
   **Expected:**

- Username label matches logged in user

### TC-AUTH-03 (P1) — Negative: login with invalid password shows error

**Type:** UI  
**Steps:**

1. Navigate to `/login`
2. Enter valid username + invalid password
3. Click Login
   **Expected:**

- Error message displayed
- User is not redirected to `/profile`

### TC-AUTH-04 (P1) — Negative: login with empty username/password blocks login

**Type:** UI  
**Steps:**

1. Navigate to `/login`
2. Leave username empty and/or password empty
3. Click Login
   **Expected:**

- Validation error OR no redirect
- User remains on login page

### TC-AUTH-05 (P1) — Negative: direct access to `/profile` without login

**Type:** UI  
**Steps:**

1. Open `/profile` in a fresh session (no cookies/local storage)
   **Expected:**

- Redirect to `/login` or access denied message
- Profile content not visible

### TC-AUTH-06 (P2) — Logout ends session

**Type:** E2E  
**Steps:**

1. Login successfully
2. Click Logout
3. Attempt to access `/profile`
   **Expected:**

- User is logged out
- `/profile` is not accessible (redirects to login or denied)

### TC-AUTH-07 (P2) — Session resilience: refresh profile keeps authenticated state

**Type:** UI  
**Steps:**

1. Login successfully
2. Refresh `/profile`
   **Expected:**

- User remains authenticated (if app persists session)
- Username still visible

---

# 7. Notes / Assumptions

- Exact UI behavior for empty/whitespace search may vary; validate expected behavior and document final observed result.
- Dataset count expectation (8) is based on assignment statement and current environment; if it changes, update expected value and note the change.
- Performance thresholds (API response time) are guidance-level for this assignment.
