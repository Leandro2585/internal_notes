[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)
## Internal Notes

Para testar as features da aplicação você pode utilizar o arquivos já preparados no diretório ```http``` com a estrutura das requests já prontas, para melhor experiência é recomendado que instale também em seu VS Code a extensão 'REST Client' para executar as requisições de uma forma dinâmica

## Autoanálise
- A aplicação é estável, poderá resolver o problema para o qual foi proposto, no entando, se houver um crescimento relevante na quantidade de requisições que precisa atender pode acabar tendo gargalos e quedas de performance, um dos módulos que apresentaria maior latência no cenário sugerido seria a requisição que retorna os posts particionados de 10 em 10, uma vez que, para o banco trazer esses dados deve ser feito uma filtragem em toda a base para encontrar os que correspondem as características solicitadas (os filtros ```initial_date```, ```final_date``` e ```user_id```) gerando um gargalo caso essa base cresça significativamente em pouco tempo
- Para preparar essa aplicação para atender a esse hipotético aumento na demanda, algumas ações poderiam ser tomadas como a implementação de um sistema de cache dos dados, reduzindo assim o fluxo na base de dados principal, para isso poderia ser utilizada uma tecnologia como o Redis por exemplo, outra possibilidade também seria a utilização de um orquestrador de containers e balanceadores de carga como KUBERNETES e NGINX 

## Container
- Para subir a base de dados pode utilizar o script ```docker-compose up -d``` com o docker já instalado em sua máquina

## Tests
- Para rodar os testes automatizados você pode utilizar o comando ```npm run test:watch``` para verificar as atualizações de seus scripts de teste em live-reload ou ```npm run test:coverage``` para coletar os seus relatórios de testes

## Migrations e Seeds
- Para criar suas migrations e seeds há alguns scripts já preparados no package.json, são os seguintes ```yarn typeorm migration:run``` e ```yarn typeorm:seeds```

## Rodar o projeto
- Para enfim rodar o projeto pode-se utilizar ```yarn dev``` ou ```yarn start```