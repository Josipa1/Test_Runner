/// <reference types="Cypress" />

import { slowCypressDown } from "cypress-slow-down"

slowCypressDown()

describe ('New test', ()=> {
    
    beforeEach(()=>{
        const site = 'https://oa-bw.conet.de/dev/tr/'
        cy.visit(site)
    })

    afterEach(()=>{
        const daysVar = require("dayjs");
        const nowTime = daysVar().format("DD.MM.YYYY HH:mm:ss")
        cy.screenshot(`database_data_  ${Cypress.currentTest.title}${nowTime}`)
    })


    it('Example run', ()=> {
        // const site = 'https://oa-bw.conet.de/dev/tr/'
       // cy.visit(site)
       cy.viewport(1024, 768)
       cy.get('button').should('contain', 'Start Test').click()
       
       cy.get('span').contains('weiter',  {matchCase:false}).click()
       //cy.get('section .control-buttons').find('button span').eq(1).click()
       
       cy.get('.grid-container').find('div label input')
       .then((singleChoice) => {
           return Cypress._.sampleSize(singleChoice.toArray(),1)
       })
       .should('have.length', 1)
       .click()
       .invoke('val').as('singleChoice')
       .then((valueSC)=>{
           cy.wrap(valueSC)
       })
       
       cy.get('button').contains('Weiter', {matchCase:false}).click()
       
       cy.get('button').contains('Zurück', {matchCase:false}).click()
       
       cy.get('@singleChoice').then(SCvalue =>{
           cy.log(SCvalue)
           cy.get('.grid-container').find('div label input').each(oldValueSC =>{           
               if (oldValueSC.is(':checked')){
                   cy.wrap(oldValueSC.val()).as('oldValue')
                   cy.log(SCvalue==oldValueSC.val())
               }
           }) 
       })
       
       cy.get('button').contains('weiter').click()

       //MC - All correct
       cy.get('.grid-container').find('label')
   .then((multipleChoices) => {
       return Cypress._.sampleSize(multipleChoices.toArray(),3)
   })
   .should('have.length',3)
   .click({multiple:true})
   .invoke('text')
   .then((valueMC) =>{
       cy.log(valueMC)
       cy.get('.grid-container').find('label > [type="checkbox"]').each((MCvalue) => {
           if(MCvalue.is(':checked')){
               cy.wrap(MCvalue.text())
           }
       })
   })

   cy.get('button').contains('Weiter', {matchCase:false}).click()

   //MC - contains correct
   cy.get('.grid-container').find('label')
   .then((multipleChoices) => {
       return Cypress._.sampleSize(multipleChoices.toArray(),3)
   })
   .should('have.length',3)
   .click({multiple:true})
   .invoke('text')
   .then((valueMC) =>{
       cy.log(valueMC)
       cy.get('.grid-container').find('label > [type="checkbox"]').each((MCvalue) => {
           if(MCvalue.is(':checked')){
               cy.wrap(MCvalue.text())
           }
       })
   })

   cy.get('button').contains('Weiter', {matchCase:false}).click()

   //MC - more correct than wrong
   cy.get('.grid-container').find('label')
   .then((multipleChoices) => {
       return Cypress._.sampleSize(multipleChoices.toArray(),3)
   })
   .should('have.length',3)
   .click({multiple:true})
   .invoke('text')
   .then((valueMC) =>{
       cy.log(valueMC)
       cy.get('.grid-container').find('label > [type="checkbox"]').each((MCvalue) => {
           if(MCvalue.is(':checked')){
               cy.wrap(MCvalue.text())
           }
       })
   })
   cy.get('button').contains('Weiter', {matchCase:false}).click()

   cy.get('.likertScale').find('.likertResponse .likertText').contains('Neutral')
   .click() /////////////////////////////////////////////////////////////////////////////////////////////////////////
   .invoke('text').then(LikertVal =>{
       cy.log(LikertVal)
   })
   
   cy.get('button').contains('Weiter', {matchCase:false}).click()

   const randomNumber = Math.floor(Math.random() * 100)
   const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
   cy.get('section .test-controls').find('input[type=range]')
   .then((slider_range)=> {
       const range =slider_range[0]
       nativeInputValueSetter.call(range,randomNumber)
       range.dispatchEvent(new Event('change', { value: randomNumber, bubbles: false }))
   })
   .invoke('val').as('Slider')
   .then(sliderVal =>{
       cy.log(sliderVal)
   })
   cy.get('button').contains('Weiter', {matchCase:false}).click()
   
   cy.get('button').contains('Zurück', {matchCase:false}).click()
   
   cy.get('@Slider').then(valSlider =>{
       cy.log(valSlider)
       cy.get('section .test-controls').find('input[type=range]').then(oldValueSlider=>{
           cy.wrap(oldValueSlider.val())
           if(oldValueSlider.val()==valSlider){
               cy.log('True')
           }
           else {
               cy.log('False')
           }
       })
   })
   
   cy.get('button').contains('Weiter', {matchCase:false}).click()
   const daysVar = require("dayjs");
   const nowTime = daysVar().format("DD.MM.YYYY HH:mm:ss");
   cy.log(nowTime);
   cy.get('div .matrix-container').find('div img')
   .then((pickOne) => {
       return Cypress._.sampleSize(pickOne.toArray(),1)
   })
   .should('have.length',1)
   .click()
   .invoke('attr', 'alt').as('matrix')
   .then((matrixVal) =>{
       cy.wrap(matrixVal)
   })
   
   cy.get('button').contains('Weiter', {matchCase:false}).click()
  
   cy.get('button').contains('Zurück', {matchCase:false}).click()
   
   cy.get('@matrix').then(valMatrix => {
       cy.log(valMatrix)
       cy.get('div .matrix-container').find('div img').invoke('attr', 'alt')
       .then(oldValueMatrix=>{
           cy.wrap(oldValueMatrix)
               cy.log(oldValueMatrix==valMatrix)
           }
       )
   })
   
   cy.get('button').contains('Weiter', {matchCase:false}).click()
   cy.wait(50)
   
   //cy.get('div a').should('contain','back to Start').click().wait(100)
        })
    })




