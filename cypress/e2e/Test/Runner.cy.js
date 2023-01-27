/// <reference types="Cypress" />

import { slowCypressDown } from "cypress-slow-down"

slowCypressDown()

describe('Testing the Testrunner', () => {
    beforeEach(()=>{
        const site = 'https://oa-bw.conet.de/dev/tr/'
        cy.visit(site)
    })

    afterEach(()=>{
        const daysVar = require("dayjs");
        const nowTime = daysVar().format("DD.MM.YYYY HH:mm:ss")
        cy.screenshot(`database_data_ ${Cypress.currentTest.title}${nowTime}`)
    })

    it('Neutral choice', ()=> {
       // const site = 'https://oa-bw.conet.de/dev/tr/'
       // cy.visit(site)
       cy.viewport(1024, 768)
        cy.get('button').should('contain', 'Start Test').click()
        
        cy.get('button[type="submit"]').should('contain', 'weiter').click()
        
        cy.get('oa-singlechoice').shadow().find('div label input')
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
            cy.get('oa-singlechoice').shadow().find('div label input').each(oldValueSC =>{           
                if (oldValueSC.is(':checked')){
                    cy.wrap(oldValueSC.val()).as('oldValue')
                    cy.log(SCvalue==oldValueSC.val())
                }
            }) 
        })
        
        cy.get('button').contains('weiter').click()
        cy.get('oa-multiplechoice').shadow().find('label')
    .then((multipleChoices) => {
        return Cypress._.sampleSize(multipleChoices.toArray(),3)
    })
    .should('have.length',3)
    
    .click({multiple:true})
    .invoke('text')
    .then((valueMC) =>{
        cy.log(valueMC)
        cy.get('oa-multiplechoice').shadow().find('label>[type="checkbox"]').each((MCvalue) => {
            if(MCvalue.is(':checked')){
                cy.wrap(MCvalue.text())
            }
        })
    })
    
    cy.get('button[type="submit"]').should('contain', 'weiter',{matchCase:false}).click()
    cy.get('oa-likert-scale').shadow().find('.likertScale .likertResponse .likertText').contains('Neutral')
    .click() /////////////////////////////////////////////////////////////////////////////////////////////////////////
    .invoke('text').then(LikertVal =>{
        cy.log(LikertVal)
    })
    
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    const randomNumber = Math.floor(Math.random() * 100)
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
    cy.get('oa-slider').find('input[type=range]', {includeShadowDom:true})
    .then((slider_range)=> {
        const range =slider_range[0]
        nativeInputValueSetter.call(range,randomNumber)
        range.dispatchEvent(new Event('change', { value: randomNumber, bubbles: false }))
    })
    .invoke('val').as('Slider')
    .then(sliderVal =>{
        cy.log(sliderVal)
    })
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    
    cy.get('button').contains('Zurück', {matchCase:false}).click()
    
    cy.get('@Slider').then(valSlider =>{
        cy.log(valSlider)
        cy.get('oa-slider').find('input[type=range]', {includeShadowDom:true}).then(oldValueSlider=>{
            cy.wrap(oldValueSlider.val())
            if(oldValueSlider.val()==valSlider){
                cy.log('True')
            }
            else {
                cy.log('False')
            }
        })
    })
    
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    const daysVar = require("dayjs");
    const nowTime = daysVar().format("DD.MM.YYYY HH:mm:ss");
    cy.log(nowTime);
    cy.get('oa-matrix').find('.matrix-container div img', {includeShadowDom:true})
    .then((pickOne) => {
        return Cypress._.sampleSize(pickOne.toArray(),1)
    })
    .should('have.length',1)
    .click()
    .invoke('attr', 'alt').as('matrix')
    .then((matrixVal) =>{
        cy.wrap(matrixVal)
    })
    
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
   
    cy.get('button').contains('Zurück', {matchCase:false}).click()
    
    cy.get('@matrix').then(valMatrix => {
        cy.log(valMatrix)
        cy.get('oa-matrix').find('.selected img', {includeShadowDom:true}).invoke('attr', 'alt')
        .then(oldValueMatrix=>{
            cy.wrap(oldValueMatrix)
                cy.log(oldValueMatrix==valMatrix)
            }
        )
    })
    
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    cy.wait(50)
    
    /*cy.get('h1').should('contain', 'End').then(()=>{
        cy.screenshot('database_data_Neutral '+ nowTime)})*/
    
    //cy.get('div a').should('contain','back to Start').scrollIntoView().trigger('click')
    })

    it('Agree choice', ()=> {
        //const site = 'https://oa-bw.conet.de/dev/tr/'
        //cy.visit(site)
        cy.get('button').should('contain', 'Start Test').click()
        
        cy.get('button[type="submit"]').should('contain', 'weiter').click()
        
        cy.get('oa-singlechoice').shadow().find('div label input')
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
            cy.get('oa-singlechoice').shadow().find('div label input').each(oldValueSC =>{           
                if (oldValueSC.is(':checked')){
                    cy.wrap(oldValueSC.val()).as('oldValue')
                    cy.log(SCvalue==oldValueSC.val())
                }
            }) 
        })
        
        cy.get('button').contains('weiter').click()
        cy.get('oa-multiplechoice').shadow().find('label')
    
    .then((multipleChoices) => {
        return Cypress._.sampleSize(multipleChoices.toArray(),3)
    })
    .should('have.length',3)
    .click({multiple:true})
    .invoke('text')
    .then((valueMC) =>{
        cy.log(valueMC)
        cy.get('oa-multiplechoice').shadow().find('label>[type="checkbox"]').each((MCvalue) => {
            if(MCvalue.is(':checked')){
                cy.wrap(MCvalue.text())
            }
        })
    })
    
    cy.get('button[type="submit"]').should('contain', 'weiter',{matchCase:false}).click()
    cy.get('oa-likert-scale').shadow().find('.likertScale .likertResponse .likertText').contains('Agree')
    
    .click().invoke('text').then(LikertVal =>{
        cy.log(LikertVal)
    })
    
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    const randomNumber = Math.floor(Math.random() * 100)
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
    cy.get('oa-slider').find('input[type=range]', {includeShadowDom:true})
    
    .then((slider_range)=> {
        const range =slider_range[0]
        nativeInputValueSetter.call(range,randomNumber)
        range.dispatchEvent(new Event('change', { value: randomNumber, bubbles: false }))
    }).invoke('val').as('Slider')
    .then(sliderVal =>{
        cy.log(sliderVal)
    })
    
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    
    cy.get('button').contains('Zurück', {matchCase:false}).click()
    
    cy.get('@Slider').then(valSlider =>{
        cy.log(valSlider)
        cy.get('oa-slider').find('input[type=range]', {includeShadowDom:true}).then(oldValueSlider=>{
            cy.wrap(oldValueSlider.val())
            if(oldValueSlider.val()==valSlider){
                cy.log('True')
            }
            else {
                cy.log('False')
            }
        })
    })
    
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    const daysVar = require("dayjs");
    const nowTime = daysVar().format("DD.MM.YYYY HH:mm:ss");
    cy.log(nowTime);
    cy.get('oa-matrix').find('.matrix-container div img', {includeShadowDom:true})
    
    .then((pickOne) => {
        return Cypress._.sampleSize(pickOne.toArray(),1)
    })
    .should('have.length',1)
    .click()
    .invoke('attr', 'alt').as('matrix')
    .then((matrixVal) =>{
        cy.wrap(matrixVal)
    })
    
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    cy.get('button').contains('Zurück', {matchCase:false}).click()
    
    cy.get('@matrix').then(valMatrix => {
        cy.log(valMatrix)
        cy.get('oa-matrix').find('.selected img', {includeShadowDom:true}).invoke('attr', 'alt')
        .then(oldValueMatrix=>{
            cy.wrap(oldValueMatrix)
                cy.log(oldValueMatrix==valMatrix)
            }
        )
    })
    
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    cy.wait(50)
    
    /*cy.get('h1').should('contain', 'End').then(()=>{
        cy.screenshot('database_data_Agree '+ nowTime)})*/
   // cy.get('div a').should('contain','back to Start').click() 
    })

    it('Disagree choice', ()=> {
        //const site = 'https://oa-bw.conet.de/dev/tr/'
        //cy.visit(site)
        cy.get('button').should('contain', 'Start Test').click()
        
        cy.get('button[type="submit"]').should('contain', 'weiter').click()
        
        cy.get('oa-singlechoice').shadow().find('div label input')
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
            cy.get('oa-singlechoice').shadow().find('div label input').each(oldValueSC =>{           
                if (oldValueSC.is(':checked')){
                    cy.wrap(oldValueSC.val()).as('oldValue')
                    cy.log(SCvalue==oldValueSC.val())
                }
            }) 
        })
        cy.get('button').contains('weiter').click()
        cy.get('oa-multiplechoice').shadow().find('label')
    
    .then((multipleChoices) => {
        return Cypress._.sampleSize(multipleChoices.toArray(),3)
    })
    .should('have.length',3)
    .click({multiple:true})
    .invoke('text')
    .then((valueMC) =>{
        cy.log(valueMC)
        cy.get('oa-multiplechoice').shadow().find('label>[type="checkbox"]').each((MCvalue) => {
            if(MCvalue.is(':checked')){
                cy.wrap(MCvalue.text())
            }
        })
    })
    cy.get('button[type="submit"]').should('contain', 'weiter',{matchCase:false}).click()
    cy.get('oa-likert-scale').shadow().find('.likertScale .likertResponse .likertText').contains('Disagree')
    
    .click().invoke('text').then(LikertVal =>{
        cy.log(LikertVal)
    })
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    const randomNumber = Math.floor(Math.random() * 100)
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
    cy.get('oa-slider').find('input[type=range]', {includeShadowDom:true})
    
    .then((slider_range)=> {
        const range =slider_range[0]
        nativeInputValueSetter.call(range,randomNumber)
        range.dispatchEvent(new Event('change', { value: randomNumber, bubbles: false }))
    }).invoke('val').as('Slider')
    .then(sliderVal =>{
        cy.log(sliderVal)
    })
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    
    cy.get('button').contains('Zurück', {matchCase:false}).click()
    
    cy.get('@Slider').then(valSlider =>{
        cy.log(valSlider)
        cy.get('oa-slider').find('input[type=range]', {includeShadowDom:true}).then(oldValueSlider=>{
            cy.wrap(oldValueSlider.val())
            if(oldValueSlider.val()==valSlider){
                cy.log('True')
            }
            else {
                cy.log('False')
            }
        })
    })
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    const daysVar = require("dayjs");
    const nowTime = daysVar().format("DD.MM.YYYY HH:mm:ss");
    cy.log(nowTime);
    cy.get('oa-matrix').find('.matrix-container div img', {includeShadowDom:true})
    
    .then((pickOne) => {
        return Cypress._.sampleSize(pickOne.toArray(),1)
    })
    .should('have.length',1)
    .click()
    .invoke('attr', 'alt').as('matrix')
    .then((matrixVal) =>{
        cy.wrap(matrixVal)
    })
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
   
    cy.get('button').contains('Zurück', {matchCase:false}).click()
    
    cy.get('@matrix').then(valMatrix => {
        cy.log(valMatrix)
        cy.get('oa-matrix').find('.selected img', {includeShadowDom:true}).invoke('attr', 'alt')
        .then(oldValueMatrix=>{
            cy.wrap(oldValueMatrix)
                cy.log(oldValueMatrix==valMatrix)
            }
        )
    })
    
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    cy.wait(50)

    /*cy.get('h1').should('contain', 'End').then(()=>{
        cy.screenshot('database_data_Disagree '+ nowTime)})*/
   // cy.get('div a').should('contain','back to Start').click()
    })

    it('Multiple choice(select all)-false', ()=> {
        //const site = 'https://oa-bw.conet.de/dev/tr/'
        //cy.visit(site)
        cy.get('button').should('contain', 'Start Test').click()
        
        cy.get('button[type="submit"]').should('contain', 'weiter').click()
        
        cy.get('oa-singlechoice').shadow().find('div label input')
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
            cy.get('oa-singlechoice').shadow().find('div label input').each(oldValueSC =>{           
                if (oldValueSC.is(':checked')){
                    cy.wrap(oldValueSC.val()).as('oldValue')
                    cy.log(SCvalue==oldValueSC.val())
                }
            }) 
        })
        cy.get('button').contains('weiter').click()
        cy.get('oa-multiplechoice').shadow().find('input[type="checkbox"]:enabled')
    
    //.first()
    //.last()
    .check()

    cy.get('button[type="submit"]').should('contain', 'weiter',{matchCase:false}).click()
    cy.get('oa-likert-scale').shadow().find('.likertScale .likertResponse .likertText').contains('Disagree')
    
    .click().invoke('text').then(LikertVal =>{
        cy.log(LikertVal)
    })
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    const randomNumber = Math.floor(Math.random() * 100)
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
    cy.get('oa-slider').find('input[type=range]', {includeShadowDom:true})
    
    .then((slider_range)=> {
        const range =slider_range[0]
        nativeInputValueSetter.call(range,randomNumber)
        range.dispatchEvent(new Event('change', { value: randomNumber, bubbles: false }))
    }).invoke('val').as('Slider')
    .then(sliderVal =>{
        cy.log(sliderVal)
    })
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    
    cy.get('button').contains('Zurück', {matchCase:false}).click()
    
    cy.get('@Slider').then(valSlider =>{
        cy.log(valSlider)
        cy.get('oa-slider').find('input[type=range]', {includeShadowDom:true}).then(oldValueSlider=>{
            cy.wrap(oldValueSlider.val())
            if(oldValueSlider.val()==valSlider){
                cy.log('True')
            }
            else {
                cy.log('False')
            }
        })
    })
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    const daysVar = require("dayjs");
    const nowTime = daysVar().format("DD.MM.YYYY HH:mm:ss");
    cy.log(nowTime);
    cy.get('oa-matrix').find('.matrix-container div img', {includeShadowDom:true})
    
    .then((pickOne) => {
        return Cypress._.sampleSize(pickOne.toArray(),1)
    })
    .should('have.length',1)
    .click()
    .invoke('attr', 'alt').as('matrix')
    .then((matrixVal) =>{
        cy.wrap(matrixVal)
    })
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
   
    cy.get('button').contains('Zurück', {matchCase:false}).click()
    
    cy.get('@matrix').then(valMatrix => {
        cy.log(valMatrix)
        cy.get('oa-matrix').find('.selected img', {includeShadowDom:true}).invoke('attr', 'alt')
        .then(oldValueMatrix=>{
            cy.wrap(oldValueMatrix)
                cy.log(oldValueMatrix==valMatrix)
            }
        )
    })
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    cy.wait(50)

    /*cy.get('h1').should('contain', 'End').then(()=>{
        cy.screenshot('database_data_Disagree '+ nowTime)})*/

    //cy.get('div a').should('contain','back to Start').click({force:true})
    })

    it('Single choice-true', ()=> {
        // const site = 'https://oa-bw.conet.de/dev/tr/'
       // cy.visit(site)
       cy.viewport(1024, 768)
       cy.get('button').should('contain', 'Start Test').click()
       
       cy.get('button[type="submit"]').should('contain', 'weiter').click()
       
       cy.get('oa-singlechoice').shadow().find('input[type="radio"]')
       .check("2")
       .invoke('val').as('singleChoice')
       .then((valueSC)=>{
           cy.wrap(valueSC)
       })
       
       cy.get('button').contains('Weiter', {matchCase:false}).click()
       
       cy.get('button').contains('Zurück', {matchCase:false}).click()
       
       cy.get('@singleChoice').then(SCvalue =>{
           cy.log(SCvalue)
           cy.get('oa-singlechoice').shadow().find('div label input').each(oldValueSC =>{           
               if (oldValueSC.is(':checked')){
                   cy.wrap(oldValueSC.val()).as('oldValue')
                   cy.log(SCvalue==oldValueSC.val())
               }
           }) 
       })
       
       cy.get('button').contains('weiter').click()
       cy.get('oa-multiplechoice').shadow().find('label')
   .then((multipleChoices) => {
       return Cypress._.sampleSize(multipleChoices.toArray(),3)
   })
   .should('have.length',3)
   
   .click({multiple:true})
   .invoke('text')
   .then((valueMC) =>{
       cy.log(valueMC)
       cy.get('oa-multiplechoice').shadow().find('label>[type="checkbox"]').each((MCvalue) => {
           if(MCvalue.is(':checked')){
               cy.wrap(MCvalue.text())
           }
       })
   })
   
   cy.get('button[type="submit"]').should('contain', 'weiter',{matchCase:false}).click()
   cy.get('oa-likert-scale').shadow().find('.likertScale .likertResponse .likertText').contains('Neutral')
   .click() /////////////////////////////////////////////////////////////////////////////////////////////////////////
   .invoke('text').then(LikertVal =>{
       cy.log(LikertVal)
   })
   
   cy.get('button[type="submit"]').should('contain', 'weiter').click()
   const randomNumber = Math.floor(Math.random() * 100)
   const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
   cy.get('oa-slider').find('input[type=range]', {includeShadowDom:true})
   .then((slider_range)=> {
       const range =slider_range[0]
       nativeInputValueSetter.call(range,randomNumber)
       range.dispatchEvent(new Event('change', { value: randomNumber, bubbles: false }))
   })
   .invoke('val').as('Slider')
   .then(sliderVal =>{
       cy.log(sliderVal)
   })
   cy.get('button[type="submit"]').should('contain', 'weiter').click()
   
   cy.get('button').contains('Zurück', {matchCase:false}).click()
   
   cy.get('@Slider').then(valSlider =>{
       cy.log(valSlider)
       cy.get('oa-slider').find('input[type=range]', {includeShadowDom:true}).then(oldValueSlider=>{
           cy.wrap(oldValueSlider.val())
           if(oldValueSlider.val()==valSlider){
               cy.log('True')
           }
           else {
               cy.log('False')
           }
       })
   })
   
   cy.get('button[type="submit"]').should('contain', 'weiter').click()
   const daysVar = require("dayjs");
   const nowTime = daysVar().format("DD.MM.YYYY HH:mm:ss");
   cy.log(nowTime);
   cy.get('oa-matrix').find('.matrix-container div img', {includeShadowDom:true})
   .then((pickOne) => {
       return Cypress._.sampleSize(pickOne.toArray(),1)
   })
   .should('have.length',1)
   .click()
   .invoke('attr', 'alt').as('matrix')
   .then((matrixVal) =>{
       cy.wrap(matrixVal)
   })
   
   cy.get('button[type="submit"]').should('contain', 'weiter').click()
  
   cy.get('button').contains('Zurück', {matchCase:false}).click()
   
   cy.get('@matrix').then(valMatrix => {
       cy.log(valMatrix)
       cy.get('oa-matrix').find('.selected img', {includeShadowDom:true}).invoke('attr', 'alt')
       .then(oldValueMatrix=>{
           cy.wrap(oldValueMatrix)
               cy.log(oldValueMatrix==valMatrix)
           }
       )
   })
   
   cy.get('button[type="submit"]').should('contain', 'weiter').click()
   cy.wait(50)
   
   /*cy.get('h1').should('contain', 'End').then(()=>{
       cy.screenshot('database_data_Neutral '+ nowTime)})*/
   
   //cy.get('div a').should('contain','back to Start').scrollIntoView().trigger('click')




    })
    })
