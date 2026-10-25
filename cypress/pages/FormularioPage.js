class FormularioPage {
    removerAnuncios() {
        cy.get('body').then(($body) => {
            $body.find('iframe').remove()
        })
    }

    abrir() {
        cy.contains('Forms').click()
        this.removerAnuncios()
        cy.contains('Practice Form').click()
    }

    preencherDadosDaAluna() {
        cy.get('#firstName').type('Brenda')
        cy.get('#lastName').type('Rabelo')
        cy.get('#userEmail').type('brendarabelotester@gmail.com')
        cy.contains('Female').click()
        cy.get('#userNumber').type('8598765432')
        cy.get('#dateOfBirthInput').click()
        cy.get('.react-datepicker__year-select').select('1996')
        cy.get('.react-datepicker__month-select').select('February')
        cy.get('.react-datepicker__day--016').not('.react-datepicker__day--outside-month').click()
        cy.get('#subjectsInput').type('English')
        cy.contains('.subjects-auto-complete__option', 'English').click()
        cy.contains('Sports').click()
        cy.contains('Reading').click()
        cy.contains('Music').click()
        cy.get('#uploadPicture').selectFile('cypress/fixtures/arquivo.txt')
        cy.get('#currentAddress').type('Rua Armando Monteiro, 540')
        cy.get('#state').click()
        cy.get('div[id*="option"]').contains('NCR').click()
        cy.get('#city').click()
        cy.get('div[id*="option"]').contains('Delhi').click()
    }

    submeter() {
        cy.get('footer').invoke('hide')
        cy.get('#submit').click({ force: true })
    }

    conferirPopup() {
        cy.contains('Thanks for submitting the form').should('be.visible')
        cy.contains('Brenda Rabelo').should('be.visible')
        cy.contains('arquivo.txt').should('be.visible')
    }

    fecharPopup() {
        cy.get('body').type('{esc}')
        cy.contains('Thanks for submitting the form').should('not.exist')
    }

    visitarDireto() {
        cy.visit('https://demoqa.com/automation-practice-form')
    }

    conferirPopupAusente() {
        cy.contains('Thanks for submitting the form').should('not.exist')
    }

    conferirObrigatoriosInvalidos() {
        cy.get('#firstName').should('match', ':invalid')
        cy.get('#lastName').should('match', ':invalid')
        cy.get('#userNumber').should('match', ':invalid')
    }

    preencherEmailInvalido() {
        cy.get('#firstName').type('Brenda')
        cy.get('#lastName').type('Rabelo')
        cy.contains('Female').click()
        cy.get('#userNumber').type('8598765432')
        cy.get('#userEmail').type('brenda.email')
    }

    conferirEmailInvalido() {
        cy.get('#userEmail').should('match', ':invalid')
    }
}

export default new FormularioPage()