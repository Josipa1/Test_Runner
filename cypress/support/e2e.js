
import './commands'



function loginViaAAD(username, password) {
    cy.visit('https://oa-bw.conet.de/dev/pb/#/')
  
    // Login to your AAD tenant.
    cy.origin(
      'login.microsoftonline.com',
      {
        args: {
          username,
        },
      },
      ({ username }) => {
        cy.get('input[type="email"]').type(username, {
          log: false,
        })
        cy.get('input[type="submit"]').click()
      }
    )
    cy.origin(
      'login.microsoftonline.com',
      {
        args: {
          password,
        },
      },
      ({ password }) => {
        cy.get('input[type="password"]').type(password, {
          log: false,
        })
        cy.get('input[type="submit"]').click()
        cy.get('#idSIButton9').click()
      }
    ).wait(5000)

    // Ensure Microsoft has redirected us back to the sample app with our logged in user.
    //cy.url().should('equal', 'https://oa-bw.conet.de/dev/pb/#/')
  }
  Cypress.Commands.add('loginToAAD', (username, password) => {
    cy.session(
      `aad-${username}`,
      () => {
        const log = Cypress.log({
          displayName: 'Azure Active Directory Login',
          message: [`🔐 Authenticating | ${username}`],
          // @ts-ignore
          autoEnd: false,
        })
  
        log.snapshot('before')
        loginViaAAD(username, password)
        log.snapshot('after')
        log.end()
      },
      {
      }
    )
  })
  