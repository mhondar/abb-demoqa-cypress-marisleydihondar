# Refinement Notes – QA Analysis & Technical Improvements

## 1. API – GET /BookStore/v1/Books

- The assignment specifies that 8 books should be returned.  
  **Question:** Is this dataset fixed, or can it change in future environments?

- No explicit API contract/schema provided.  
  **Recommendation:** Provide OpenAPI/Swagger specification for stronger validation and contract-based testing.

- No error response examples documented.  
  **Question:** What is the expected structure for 4xx/5xx responses?

- No validation of response time defined.  
  **Suggestion:** Define acceptable response time thresholds (e.g., < 500ms).

- No negative boundary cases defined (invalid query params, malformed headers, etc.).

---

## 2. UI – Books Search

- Search behavior appears to be client-side filtering.  
  **Confirm:** Is filtering always client-side, or will it be server-driven in future?

- Case-insensitivity is not explicitly defined.  
  **Confirm expected behavior.**

- Behavior for whitespace-only input is not documented.  
  **Should whitespace be trimmed automatically?**

- No requirement defined for:
  - Partial matches vs full matches
  - Special characters handling
  - "No results" state UX behavior

- No debounce behavior documented (important if search becomes server-driven).

---

## 3. Authentication & Profile

- No password policy formally documented.  
  The validation message appears briefly and is difficult to inspect.  
  **Recommendation:** Provide clear password rules documentation.

- Expected behavior for accessing `/profile` without authentication is not formally described.  
  **Should it redirect to login or display an error message?**

- Session expiration time is not specified.  
  **How long should a session remain valid?**

- No documentation about:
  - Account lockout policy
  - Brute force protection
  - Rate limiting
  - Token expiration mechanism

---

## 4. Non-Functional Considerations

- No performance requirements provided.
- No security requirements documented.
- No accessibility expectations mentioned.
- No browser support matrix defined.
- No mobile responsiveness validation criteria.

---

# 5. Test Automation Improvements

## 5.1 Retry Strategy for Flaky Tests

Current configuration:

```js
retries: {
  runMode: 2,
  openMode: 0,
}
```
