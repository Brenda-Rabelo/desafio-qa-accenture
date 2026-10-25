import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import janelasPage from '../../pages/JanelasPage'

When('escolho Alerts, Frame & Windows e Browser Windows', () => {
  janelasPage.abrir()
})

When('clico em New Window', () => {
  janelasPage.clicarNovaJanela()
})

Then('uma nova janela abre na página de exemplo', () => {
  janelasPage.conferirNovaJanela()
})

Then('a mensagem "This is a sample page" aparece', () => {
  janelasPage.conferirMensagem()
})

Then('fecho a nova janela', () => {
  janelasPage.fecharNovaJanela()
})