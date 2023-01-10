describe('Testing the Testrunner', () => {
    beforeEach(()=>{
        cy.wait(100)
        const site = 'https://oa-bw.conet.de/dev/tr/'
        cy.visit(site)
    })
    it('Neutral choice', ()=> {
       // const site = 'https://oa-bw.conet.de/dev/tr/'
       // cy.visit(site)
        cy.get('button').should('contain', 'Start Test').click()
        cy.wait(250)
        cy.get('button[type="submit"]').should('contain', 'weiter').click()
        cy.wait(250)
        cy.get('oa-singlechoice').shadow().find('div label input').wait(75)
        .then((singleChoice) => {
            return Cypress._.sampleSize(singleChoice.toArray(),1)
        })
        .should('have.length', 1)
        .click()
        .invoke('val').as('singleChoice')
        .then((valueSC)=>{
            cy.wrap(valueSC)
        })
        cy.wait(125)
        cy.get('button').contains('Weiter', {matchCase:false}).click()
        cy.wait(250)
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
        cy.wait(125)
        cy.get('button').contains('weiter').click()
        cy.get('oa-multiplechoice').shadow().find('label')
    .wait(100)  
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
    cy.wait(125)
    cy.get('button[type="submit"]').should('contain', 'weiter',{matchCase:false}).click()
    cy.get('oa-likert-scale').shadow().find('.likertScale .likertResponse .likertText').contains('Neutral')
    .wait(100)
    .click().invoke('text').then(LikertVal =>{
        cy.log(LikertVal)
    })
    cy.wait(125)
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    const randomNumber = Math.floor(Math.random() * 100)
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
    cy.get('oa-slider').find('input[type=range]', {includeShadowDom:true})
    .wait(100)
    .then((slider_range)=> {
        const range =slider_range[0]
        nativeInputValueSetter.call(range,randomNumber)
        range.dispatchEvent(new Event('change', { value: randomNumber, bubbles: false }))
    }).invoke('val').as('Slider')
    .then(sliderVal =>{
        cy.log(sliderVal)
    })
    cy.wait(125)
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    cy.wait(250)
    cy.get('button').contains('Zurück', {matchCase:false}).click()
    cy.wait(125)
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
    cy.wait(125)
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    const daysVar = require("dayjs");
    const nowTime = daysVar().format("DD.MM.YYYY HH:mm:ss");
    cy.log(nowTime);
    cy.get('oa-matrix').find('.matrix-container div img', {includeShadowDom:true})
    .wait(100)
    .then((pickOne) => {
        return Cypress._.sampleSize(pickOne.toArray(),1)
    })
    .should('have.length',1)
    .click()
    .invoke('attr', 'alt').as('matrix')
    .then((matrixVal) =>{
        cy.wrap(matrixVal)
    })
    cy.wait(125)
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    cy.wait(200)
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
    cy.wait(125)
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    
    cy.get('h1').should('contain', 'End').wait(75).then(()=>{
        cy.screenshot('database_data_Neutral '+ nowTime)})
    
    cy.get('div a').should('contain','back to Start').click()
    })

    it('Agree choice', ()=> {
        //const site = 'https://oa-bw.conet.de/dev/tr/'
        //cy.visit(site)
        cy.get('button').should('contain', 'Start Test').click()
        cy.wait(250)
        cy.get('button[type="submit"]').should('contain', 'weiter').click()
        cy.wait(250)
        cy.get('oa-singlechoice').shadow().find('div label input').wait(75)
        .then((singleChoice) => {
            return Cypress._.sampleSize(singleChoice.toArray(),1)
        })
        .should('have.length', 1)
        .click()
        .invoke('val').as('singleChoice')
        .then((valueSC)=>{
            cy.wrap(valueSC)
        })
        cy.wait(125)
        cy.get('button').contains('Weiter', {matchCase:false}).click()
        cy.wait(250)
        cy.get('button').contains('Zurück', {matchCase:false}).click()
        cy.wait(250)
        cy.get('@singleChoice').then(SCvalue =>{
            cy.log(SCvalue)
            cy.get('oa-singlechoice').wait(75).shadow().find('div label input').each(oldValueSC =>{           
                if (oldValueSC.is(':checked')){
                    cy.wrap(oldValueSC.val()).as('oldValue')
                    cy.log(SCvalue==oldValueSC.val())
                }
            }) 
        })
        cy.wait(125)
        cy.get('button').contains('weiter').click()
        cy.get('oa-multiplechoice').shadow().find('label')
    .wait(100)  
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
    cy.wait(125)
    cy.get('button[type="submit"]').should('contain', 'weiter',{matchCase:false}).click()
    cy.get('oa-likert-scale').shadow().find('.likertScale .likertResponse .likertText').contains('Agree')
    .wait(100)
    .click().invoke('text').then(LikertVal =>{
        cy.log(LikertVal)
    })
    cy.wait(125)
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    const randomNumber = Math.floor(Math.random() * 100)
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
    cy.get('oa-slider').find('input[type=range]', {includeShadowDom:true})
    .wait(100)
    .then((slider_range)=> {
        const range =slider_range[0]
        nativeInputValueSetter.call(range,randomNumber)
        range.dispatchEvent(new Event('change', { value: randomNumber, bubbles: false }))
    }).invoke('val').as('Slider')
    .then(sliderVal =>{
        cy.log(sliderVal)
    })
    cy.wait(125)
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    cy.wait(250)
    cy.get('button').contains('Zurück', {matchCase:false}).click()
    cy.wait(125)
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
    cy.wait(125)
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    const daysVar = require("dayjs");
    const nowTime = daysVar().format("DD.MM.YYYY HH:mm:ss");
    cy.log(nowTime);
    cy.get('oa-matrix').find('.matrix-container div img', {includeShadowDom:true})
    .wait(100)
    .then((pickOne) => {
        return Cypress._.sampleSize(pickOne.toArray(),1)
    })
    .should('have.length',1)
    .click()
    .invoke('attr', 'alt').as('matrix')
    .then((matrixVal) =>{
        cy.wrap(matrixVal)
    })
    cy.wait(125)
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    cy.wait(200)
    cy.get('button').contains('Zurück', {matchCase:false}).click()
    cy.wait(125)
    cy.get('@matrix').then(valMatrix => {
        cy.log(valMatrix)
        cy.get('oa-matrix').find('.selected img', {includeShadowDom:true}).invoke('attr', 'alt')
        .then(oldValueMatrix=>{
            cy.wrap(oldValueMatrix)
                cy.log(oldValueMatrix==valMatrix)
            }
        )
    })
    cy.wait(125)
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    cy.get('h1').should('contain', 'End').wait(75).then(()=>{
        cy.screenshot('database_data_Agree '+ nowTime)})
    cy.get('div a').should('contain','back to Start').click() 
    })

    it('Disagree choice', ()=> {
        //const site = 'https://oa-bw.conet.de/dev/tr/'
        //cy.visit(site)
        cy.get('button').should('contain', 'Start Test').click()
        cy.wait(250)
        cy.get('button[type="submit"]').should('contain', 'weiter').click()
        cy.wait(250)
        cy.get('oa-singlechoice').shadow().find('div label input').wait(75)
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
        cy.wait(250)
        cy.get('button').contains('Zurück', {matchCase:false}).click()
        cy.wait(1000)
        cy.get('@singleChoice').then(SCvalue =>{
            cy.log(SCvalue)
            cy.get('oa-singlechoice').shadow().find('div label input').wait(75).each(oldValueSC =>{           
                if (oldValueSC.is(':checked')){
                    cy.wrap(oldValueSC.val()).as('oldValue')
                    cy.log(SCvalue==oldValueSC.val())
                }
            }) 
        })
        cy.get('button').contains('weiter').click()
        cy.get('oa-multiplechoice').shadow().find('label')
    .wait(100)  
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
    .wait(100)
    .click().invoke('text').then(LikertVal =>{
        cy.log(LikertVal)
    })
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    const randomNumber = Math.floor(Math.random() * 100)
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
    cy.get('oa-slider').find('input[type=range]', {includeShadowDom:true})
    .wait(100)
    .then((slider_range)=> {
        const range =slider_range[0]
        nativeInputValueSetter.call(range,randomNumber)
        range.dispatchEvent(new Event('change', { value: randomNumber, bubbles: false }))
    }).invoke('val').as('Slider')
    .then(sliderVal =>{
        cy.log(sliderVal)
    }).wait(100)
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    cy.wait(250)
    cy.get('button').contains('Zurück', {matchCase:false}).click()
    cy.wait(1000)
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
    .wait(100)
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
    cy.wait(200)
    cy.get('button').contains('Zurück', {matchCase:false}).click()
    cy.wait(1000)
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
    cy.get('h1').should('contain', 'End').wait(75).then(()=>{
        cy.screenshot('database_data_Disagree '+ nowTime)})
    cy.get('div a').should('contain','back to Start').click()
    })

    it('Multiple choice(select all)-false', ()=> {
        //const site = 'https://oa-bw.conet.de/dev/tr/'
        //cy.visit(site)
        cy.get('button').should('contain', 'Start Test').click()
        cy.wait(250)
        cy.get('button[type="submit"]').should('contain', 'weiter').click()
        cy.wait(250)
        cy.get('oa-singlechoice').shadow().find('div label input').wait(75)
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
        cy.wait(250)
        cy.get('button').contains('Zurück', {matchCase:false}).click()
        cy.wait(1000)
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
    .wait(100)
    //.first()
    //.last()
    .check()

    cy.get('button[type="submit"]').should('contain', 'weiter',{matchCase:false}).click()
    cy.get('oa-likert-scale').shadow().find('.likertScale .likertResponse .likertText').contains('Disagree')
    .wait(100)
    .click().invoke('text').then(LikertVal =>{
        cy.log(LikertVal)
    })
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    const randomNumber = Math.floor(Math.random() * 100)
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
    cy.get('oa-slider').find('input[type=range]', {includeShadowDom:true})
    .wait(100)
    .then((slider_range)=> {
        const range =slider_range[0]
        nativeInputValueSetter.call(range,randomNumber)
        range.dispatchEvent(new Event('change', { value: randomNumber, bubbles: false }))
    }).invoke('val').as('Slider')
    .then(sliderVal =>{
        cy.log(sliderVal)
    }).wait(100)
    cy.get('button[type="submit"]').should('contain', 'weiter').click()
    cy.wait(250)
    cy.get('button').contains('Zurück', {matchCase:false}).click()
    cy.wait(1000)
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
    .wait(100)
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
    cy.wait(200)
    cy.get('button').contains('Zurück', {matchCase:false}).click()
    cy.wait(1000)
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
    cy.get('h1').should('contain', 'End').wait(75).then(()=>{
        cy.screenshot('database_data_Disagree '+ nowTime)})
    })
    })