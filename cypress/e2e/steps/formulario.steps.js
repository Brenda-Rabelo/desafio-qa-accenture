import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import formularioPage from '../../pages/FormularioPage'

Given('que acesso a página inicial do DemoQA', () => {
  cy.visit('https://demoqa.com/')
})

When('escolho Forms e Practice Form', () => {
  formularioPage.abrir()
})

When('preencho o formulário com os dados da aluna', () => {
  formularioPage.preencherDadosDaAluna()
})

When('submeto o formulário', () => {
  formularioPage.submeter()
})

Then('o popup de confirmação aparece com os dados enviados', () => {
  formularioPage.conferirPopup()
})

Then('fecho o popup', () => {
  formularioPage.fecharPopup()
})

Given('que acesso o Practice Form diretamente', () => {
  formularioPage.visitarDireto()
})

Then('o popup de confirmação não aparece', () => {
  formularioPage.conferirPopupAusente()
})

Then('os campos obrigatórios ficam inválidos', () => {
  formularioPage.conferirObrigatoriosInvalidos()
})

When('preencho os obrigatórios com um e-mail inválido', () => {
  formularioPage.preencherEmailInvalido()
})

Then('o campo de e-mail fica inválido', () => {
  formularioPage.conferirEmailInvalido()
})