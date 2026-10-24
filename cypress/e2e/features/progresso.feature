# language: pt
Funcionalidade: Barra de progresso do DemoQA

  Cenário: Parar antes de 25% e resetar em 100%
    Dado que acesso a página inicial do DemoQA
    Quando escolho Widgets e Progress Bar
    E inicio a barra e paro antes de 25%
    Então o valor da barra é menor ou igual a 25%
    Quando inicio a barra novamente até 100%
    E reseto a barra de progresso
    Então a barra volta para 0%