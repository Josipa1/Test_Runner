/// <reference types="Cypress" />

import { slowCypressDown } from "cypress-slow-down"

slowCypressDown()

describe('Azure Active Directory Authentication', () => {
    beforeEach(() => {
      // log into Azure Active Directory through our sample SPA using our custom command
      cy.loginToAAD(Cypress.env('aad_username'), Cypress.env('aad_password'))
      cy.visit('https://oa-bw.conet.de/dev/pb/')
    })
  
    it('Open new Item', () => {

    cy.get('div').find('h2').invoke('text')
    .then((logging) =>{
    cy.log(logging)
    })

    cy.get('select').select(1,{force:true})
    })
  
  })