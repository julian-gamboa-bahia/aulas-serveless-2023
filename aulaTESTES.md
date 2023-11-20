https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405

Os termos "testes end-to-end (E2E)" e "testes de integração" são frequentemente usados, mas podem ter diferentes interpretações dependendo do contexto. Aqui estão algumas distinções gerais entre esses dois tipos de testes:

    Testes End-to-End (E2E):
        Escopo: Os testes E2E cobrem todo o fluxo de uma aplicação, desde o início até o fim, simulando a jornada completa do usuário.
        Ambiente: Eles normalmente são realizados em um ambiente semelhante ao de produção.
        Componentes: Testam a integração entre todos os componentes de uma aplicação e suas dependências, incluindo o frontend, backend, bancos de dados e outros serviços.
        Exemplos: Um teste E2E pode envolver a simulação de um usuário real interagindo com a interface do usuário, preenchendo formulários, clicando em botões e verificando se os dados são exibidos corretamente.

    Testes de Integração:
        Escopo: Os testes de integração focam na interação entre diferentes partes de um sistema para garantir que elas funcionem bem juntas.
        Ambiente: Podem ser realizados em um ambiente mais controlado do que os testes E2E, muitas vezes envolvendo a simulação de serviços ou componentes específicos.
        Componentes: Testam a interação entre módulos, serviços, APIs ou camadas específicas de um aplicativo.
        Exemplos: Um teste de integração pode verificar se um serviço interage corretamente com um banco de dados, se as APIs estão se comunicando conforme o esperado, ou se os diferentes componentes de um sistema estão cooperando adequadamente.

Em resumo, os testes E2E são mais abrangentes, englobando todo o fluxo de uma aplicação, enquanto os testes de integração concentram-se em garantir que os diferentes componentes ou módulos de um sistema funcionem bem juntos. Ambos são cruciais para garantir a qualidade de um aplicativo, e a escolha entre eles dependerá dos objetivos específicos de teste e dos requisitos do projeto. Em alguns casos, ambos os tipos de testes podem ser complementares para fornecer uma cobertura mais completa.


https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format

const event: APIGatewayProxyEvent = { 
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
        };