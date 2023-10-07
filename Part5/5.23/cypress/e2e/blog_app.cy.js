describe('Blog app', function () {
  beforeEach(function () {
    localStorage.clear()
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'Test User',
      passwordHash: 'test@123'
    }
    cy.request('POST', 'http://localhost:3001/api/auth/register', user)
    const user2 = {
      name: 'Test User2',
      username: 'Test User2',
      passwordHash: 'test@1232'
    }
    cy.request('POST', 'http://localhost:3001/api/auth/register', user2)
    cy.visit('http://localhost:3000')
  })


  describe('Login', function () {
    it('Login form is shown', function () {
      cy.get('#login-form')
        .then(() => {
          cy.contains('Login')
          cy.contains('Username')
          cy.contains('Password')
          cy.get('#login-btn').contains('Signin')
        })
    })

    it('succeeds with correct credentials', function () {
      cy.get('#login-form')
        .then(() => {
          cy.contains('Login')
          cy.get('#username').type('Test User')
          cy.get('#password').type('test@123')
          cy.get('#login-btn').click()

          cy.contains('Test User Logged in')
        })
    })

    it('fails with wrong credentials', function () {
      cy.contains('Login')
      cy.get('#username').type('Invalid User')
      cy.get('#password').type('test@123')
      cy.get('#login-btn').click()

      cy.get('.notification-banner').get('.error').contains('invalid username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Test User2', password: 'test@1232' })
      .then((response) => {
        const token = response.localStorage.token
        const blog = {
          "title": "Test Init Blog2",
          "url": "http://localhost:3000",
          "likes": 20
        }

        cy.createBlog({ blog, token })
      })
      cy.get('#logout-btn').click().wait(600)
      cy.login({ username: 'Test User', password: 'test@123' })
        .then((response) => {
          const token = response.localStorage.token
          const blog = {
            "title": "Test Blog",
            "url": "http://localhost:3000",
            "likes": 0
          }

          cy.createBlog({ blog, token })
        })
        cy.wait(2000)
        cy.get('#logout-btn').click().wait(600)
        cy.login({ username: 'Test User', password: 'test@123' })
    })

    it('A blog can be created', function () {
      cy.get('#create-blog-toggle').click()
      cy.get('#title').type('Test Blog')
      cy.get('#url').type('http://localhost:3000')
      cy.get('#create-blog-btn').click()
      cy.get('#blog-list').contains('Test Blog')
    })

    it('A blog can be liked', function () {
      cy.get('#blog-list')
      cy.get('#view-btn').click()
      cy.get('#likes-count').contains('0')
      cy.get('#like-btn').click()
      cy.get('#likes-count').contains('1')
    })

    it('User who created a blog can delete it', function () {
      cy.get('#blog-list').contains(/^Test User$/).parent().find('button').contains('view').click()
      cy.contains('Delete').click()
      cy.get('.notification-banner').get('.success').contains('deleted successfully')
    })

    it('User who created can see delete', function () {
      cy.get('#blog-list').contains(/^Test User$/).parent().find('button').contains('view').click()
      cy.contains('Delete')
    })

    it('ordered according to likes', function () {
      cy.get('.blog').eq(0).should('contain', 'Test Init Blog2')
      cy.get('.blog').eq(1).should('contain', 'Test Blog')
    })
  })
})