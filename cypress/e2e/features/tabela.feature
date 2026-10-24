# language: pt
Funcionalidade: Tabela web do DemoQA

  Cenário: Criar, editar e deletar um registro
    Dado que acesso a página inicial do DemoQA
    Quando escolho Elements e Web Tables
    E crio um novo registro
    Então o novo registro aparece na tabela
    Quando edito o novo registro criado
    Então o registro editado aparece na tabela
    Quando deleto o novo registro criado
    Então o registro não aparece na tabela

  Cenário: Criar 12 registros e deletar todos
    Dado que acesso a página inicial do DemoQA
    Quando escolho Elements e Web Tables
    E crio os registros da lista
      | nome   | sobrenome | email                      | idade | salario | departamento |
      | Ana    | Souza     | ana.souza@teste.com        | 21    | 3000    | QA           |
      | Bruno  | Lima      | bruno.lima@teste.com       | 22    | 3100    | QA           |
      | Carla  | Dias      | carla.dias@teste.com       | 23    | 3200    | QA           |
      | Diego  | Melo      | diego.melo@teste.com       | 24    | 3300    | QA           |
      | Elena  | Nunes     | elena.nunes@teste.com      | 25    | 3400    | QA           |
      | Fabio  | Pinto     | fabio.pinto@teste.com      | 26    | 3500    | QA           |
      | Gina   | Rocha     | gina.rocha@teste.com       | 27    | 3600    | QA           |
      | Heitor | Cruz      | heitor.cruz@teste.com      | 28    | 3700    | QA           |
      | Iris   | Alves     | iris.alves@teste.com       | 29    | 3800    | QA           |
      | Joao   | Martins   | joao.martins@teste.com     | 30    | 3900    | QA           |
      | Karina | Teixeira  | karina.teixeira@teste.com  | 31    | 4000    | QA           |
      | Leo    | Barbosa   | leo.barbosa@teste.com      | 32    | 4100    | QA           |
    Então os registros da lista aparecem na tabela
    Quando deleto todos os registros da lista
    Então os registros da lista não aparecem na tabela