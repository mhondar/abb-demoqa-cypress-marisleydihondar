module.exports = {
  books: {
    searchInput: '#searchBox',

    // Book title links inside the table (stable by href pattern)
    bookTitleLinks: 'table tbody a[href^="/books?search="]',

    // Table rows (useful for counting results)
    tableBody: 'table tbody',
    bookRows: 'table tbody tr',
    bookTitleLinks: 'table tbody tr td a',
    bookAuthorCells: 'table tbody tr td:nth-child(3)',
  },

  login: {
    usernameInput: '#userName',
    passwordInput: '#password',
    loginButton: '#login',
    errorMessage: '#name',
  },

  profile: {
    usernameLabel: '#userName-value',
    logoutButton: '#submit',
    bookRows: 'table tbody tr',
  },
};
