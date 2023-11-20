# O método TDD

Lembremos que o método TDD permite acelerar o desenvolvimento de um código. E no caso de um CRUD será preciso focar os testes unitários nas respostas emitidas por cada HANDLER, motivo pelo qual deve-se considerar:

* 405 - Method Not Allowed:        Teste para garantir que métodos não permitidos são tratados corretamente. Por exemplo, se um método DELETE é chamado em um endpoint que só aceita GET e POST, o código de status 405 deve ser retornado. Mais informações:  https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
        

* 404 - Not Found:        Teste para verificar se o código 404 é retornado quando um recurso não é encontrado. Isso é crucial para garantir que o sistema responda adequadamente quando um usuário tenta acessar algo que não existe.Mais informações:         https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404

* 400 - Bad Request:         Teste para validar se o código 400 é retornado quando há um problema nos dados fornecidos na requisição. Por exemplo, se um campo obrigatório estiver ausente ou se um formato de dados estiver incorreto.
Mais informações:     https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400

* 500 - Internal Server Error:        Teste para garantir que o código 500 seja retornado apenas em situações de erro interno do servidor. Isso pode incluir exceções não tratadas ou outros problemas que impeçam o servidor de processar a solicitação corretamente.Mais informações: 
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500        

* 200 - OK:        Teste para verificar se o código 200 é retornado quando uma operação é concluída com sucesso. Isso é especialmente importante para as operações de criação, leitura, atualização e exclusão.
Mais informações: 
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200

# A pirâmide de testes:

Os termos "testes end-to-end (E2E)" e "testes de integração" são frequentemente usados, mas podem ter diferentes interpretações dependendo do contexto. Aqui estão algumas distinções gerais entre esses dois tipos de testes:

* Testes End-to-End (E2E):        Escopo: Os testes E2E cobrem todo o fluxo de uma aplicação, desde o início até o fim, simulando a jornada completa do usuário.
        Ambiente: Eles normalmente são realizados em um ambiente semelhante ao de produção.
        Componentes: Testam a integração entre todos os componentes de uma aplicação e suas dependências, incluindo o frontend, backend, bancos de dados e outros serviços.
        Exemplos: Um teste E2E pode envolver a simulação de um usuário real interagindo com a interface do usuário, preenchendo formulários, clicando em botões e verificando se os dados são exibidos corretamente.

* Testes de Integração:         Escopo: Os testes de integração focam na interação entre diferentes partes de um sistema para garantir que elas funcionem bem juntas.
        Ambiente: Podem ser realizados em um ambiente mais controlado do que os testes E2E, muitas vezes envolvendo a simulação de serviços ou componentes específicos.
        Componentes: Testam a interação entre módulos, serviços, APIs ou camadas específicas de um aplicativo.
        Exemplos: Um teste de integração pode verificar se um serviço interage corretamente com um banco de dados, se as APIs estão se comunicando conforme o esperado, ou se os diferentes componentes de um sistema estão cooperando adequadamente.

Em resumo, os testes E2E são mais abrangentes, englobando todo o fluxo de uma aplicação, enquanto os testes de integração concentram-se em garantir que os diferentes componentes ou módulos de um sistema funcionem bem juntos. Ambos são cruciais para garantir a qualidade de um aplicativo, e a escolha entre eles dependerá dos objetivos específicos de teste e dos requisitos do projeto. Em alguns casos, ambos os tipos de testes podem ser complementares para fornecer uma cobertura mais completa.

### **Laboratório Avançado**: testes unitários e de integração:

Com ajuda do Dynamolocal (usando o **docker-compose up**) pode-se simular uma função AWS lambda usando o comando **sam local start-api** para posteriormente testar:

* sam local invoke getByIdFunction --event ./events/event-get-by-id.json

* sam local invoke deleteItemFunction --event ./events/event-deleteItemFunction

* sam local invoke putItemFunction --event ./events/event-post-item.json 

* sam local invoke getByIdFunction --event ./events/event-get-by-id.json

* sam local invoke getAllItemsFunction --event ./events/event-get-all-items.json

* sam local invoke putItemFunction --event ./events/event-post-item.json 

* sam local invoke getByIdFunction --event ./events/event-get-by-id.json

* sam local invoke getAllItemsFunction --event ./events/event-get-all-items.json

Observe o comportamento sem o  **"DynamoDB local"** , ou seja fazendo um **docker-compose down**, para ler e aprender sobre as mensagens de erros.

No caso dos testes unitários será preciso simular o evento em cada arquivo *test.ts* usando o JSON

```json
 { 
            httpMethod: 'GET',
            body: '',
            headers: {},
            isBase64Encoded: false,
            multiValueHeaders: {},
            multiValueQueryStringParameters: {},
            path: '/',
            pathParameters: {},
            queryStringParameters: {},
            requestContext: {
                accountId: '123456789012',
                apiId: '1234',
                authorizer: {},
                httpMethod: 'get',
                identity: {
                    accessKey: '',
                    accountId: '',
                    apiKey: '',
                    apiKeyId: '',
                    caller: '',
                    clientCert: {
                        clientCertPem: '',
                        issuerDN: '',
                        serialNumber: '',
                        subjectDN: '',
                        validity: { notAfter: '', notBefore: '' },
                    },
                    cognitoAuthenticationProvider: '',
                    cognitoAuthenticationType: '',
                    cognitoIdentityId: '',
                    cognitoIdentityPoolId: '',
                    principalOrgId: '',
                    sourceIp: '',
                    user: '',
                    userAgent: '',
                    userArn: '',
                },
                path: '/',
                protocol: 'HTTP/1.1',
                requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
                requestTimeEpoch: 1428582896000,
                resourceId: '123456',
                resourcePath: '/',
                stage: 'dev',
            },
            resource: '',
            stageVariables: {},
        }
```

Sobre este event pode-se ler: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format

Outra forma fazer estes testes de integração de forma manual pode-ser usando os comandos: 

```bash
curl -X PUT http://localhost:3000/ -H "Content-Type: application/json" -d '{"id": 33, "ExpressionAttributeValues": "set Ativo = :ativo", "UpdateExpression": "madrid"}'

curl -X PUT http://localhost:3000/ -H "Content-Type: application/json" -d '{"id": 1, "ExpressionAttributeValues": "set Ativo = :ativo", "UpdateExpression": {":ativo": true }}'

curl -X PUT http://localhost:3000/ -H "Content-Type: application/json" -d '{}'

curl -X POST http://localhost:3000/ -H "Content-Type: application/json" -d '{}'

curl -X POST http://localhost:3000/ -H "Content-Type: application/json" -d '{}'

curl -X POST http://localhost:3000/ -H "Content-Type: application/json" -d '{"id": 1, "NomeCompleto": "Timidim gatinho (dorme)", "DataNascimento": "1990-01-01", "Ativo": true, "Enderecos": [{"Rua": "Nome da Rua", "Numero": 123}], "Contatos": [{"Tipo": "Email", "Valor": "fulano@email.com", "Principal": true}, {"Tipo": "Telefone", "Valor": "123-456-7890", "Principal": false}]}'

curl -X DELETE http://localhost:3000/2

curl -X POST http://localhost:3000/ -H "Content-Type: application/json" -d '{"id": 11, "NomeCompleto": "Timidim gatinho (dorme)", "DataNascimento": "1990-01-01", "Ativo": true, "Enderecos": [{"Rua": "Nome da Rua", "Numero": 123}], "Contatos": [{"Tipo": "Email", "Valor": "fulano@email.com", "Principal": true}, {"Tipo": "Telefone", "Valor": "123-456-7890", "Principal": false}]}'
```