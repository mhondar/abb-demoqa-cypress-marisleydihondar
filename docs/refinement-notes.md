# Refinement Notes – QA Analysis

## 1. API – GET /BookStore/v1/Books

- The assignment specifies that 8 books should be returned.  
  → Question: Is this dataset fixed, or can it change in future environments?

- No explicit API contract/schema provided.  
  → Recommendation: Provide OpenAPI/Swagger specification for stronger validation.

- No error response examples documented.  
  → Question: What is the expected structure for 4xx/5xx responses?

---

## 2. UI – Books Search

- Search behavior appears to be client-side filtering.  
  → Confirm: Is filtering always client-side, or will it be server-driven in future?

- Case-insensitivity is not explicitly defined.  
  → Confirm expected behavior.

- Behavior for whitespace-only input is not documented.  
  → Should whitespace be trimmed automatically?

---

## 3. Authentication & Profile

- No password policy is documented.  
  → What are validation rules?

- Expected behavior for accessing `/profile` without authentication is not formally described.  
  → Should it redirect or display an error message?

- Session expiration time is not specified.  
  → How long should a session remain valid?

---

## 4. Non-Functional Considerations

- No performance requirements provided.
- No security requirements documented (rate limiting, brute force protection, etc.).
- No accessibility expectations mentioned.

---

## Summary

Several behaviors are assumed but not explicitly defined.  
Clarifying these points would reduce ambiguity and improve test coverage accuracy.
