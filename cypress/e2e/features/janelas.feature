# language: pt
Funcionalidade: Janelas do navegador no DemoQA

  Cenário: Abrir uma nova janela e validar a mensagem
    Dado que acesso a página inicial do DemoQA
    Quando escolho Alerts, Frame & Windows e Browser Windows
    E clico em New Window
    Então uma nova janela abre na página de exemplo
    E a mensagem "This is a sample page" aparece
    E fecho a nova janela