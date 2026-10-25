import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import progressoPage from '../../pages/ProgressoPage'

When('escolho Widgets e Progress Bar', () => {
    progressoPage.abrir()
})

When('inicio a barra e paro antes de 25%', () => {
    progressoPage.pararAntesDe25()
})

Then('o valor da barra é menor ou igual a 25%', () => {
    progressoPage.conferirAte25()
})

When('inicio a barra novamente até 100%', () => {
    progressoPage.irAte100()
})

When('reseto a barra de progresso', () => {
    progressoPage.resetar()
})

Then('a barra volta para 0%', () => {
    progressoPage.conferirZero()
})