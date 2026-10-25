class ProgressoPage {
    removerAnuncios() {
        cy.get('body').then(($body) => {
            $body.find('iframe').remove()
        })
    }

    abrir() {
        cy.contains('Widgets').click()
        this.removerAnuncios()
        cy.contains('Progress Bar').click()
    }

    pararAntesDe25() {
        cy.get('#startStopButton').click()
        cy.get('[role="progressbar"]').should(($barra) => {
            const valor = Number($barra.attr('aria-valuenow'))
            expect(valor).to.be.greaterThan(0).and.lessThan(25)
        })
        cy.get('#startStopButton').click()
    }

    conferirAte25() {
        cy.get('[role="progressbar"]').should(($barra) => {
            const valor = Number($barra.attr('aria-valuenow'))
            expect(valor).to.be.at.most(25)
        })
    }

    irAte100() {
        cy.get('#startStopButton').click()
        cy.get('[role="progressbar"]', { timeout: 20000 }).should('have.attr', 'aria-valuenow', '100')
    }

    resetar() {
        cy.wait(300)
        cy.get('#resetButton').click()
    }

    conferirZero() {
        cy.get('[role="progressbar"]').should('have.attr', 'aria-valuenow', '0')
    }
}

export default new ProgressoPage()