import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { putItemHandler } from '../../../handlers/put-item';

import { expect, describe, it, beforeEach } from '@jest/globals';


const event: APIGatewayProxyEvent = {
    httpMethod: 'POST', //Regra de negocio. 
    //Regra de negocio.
    body: '',
    headers: {},
    isBase64Encoded: false,
    multiValueHeaders: {},
    multiValueQueryStringParameters: {},
    path: '/',


    pathParameters: { id: '1' },//Regra de negocio.

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

        path: '/{id}',

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

describe(' (putItemHandler) deve retornar 400 com o body VAZIO ', function () {
    //Para desacoplar a lógica de negocios do DynamoDB
    beforeEach(() => {
        process.env.TESTE_UNITARIO = "true";
    });


    it('verifies response status Code 400, com  BODY VAZIO', async () => {
        // Configurar o evento com um ID que não é um número inteiro

        const result: APIGatewayProxyResult = await putItemHandler(event);

        expect(result.statusCode).toEqual(400);
    });


});

// Testes para verificar a resposta com um corpo não completo

//Falha o id no corpo
describe('(putItemHandler) deve retornar 400 com o body SEM -----  id', () => {
    // Antes de cada teste, configure a variável de ambiente TESTE_UNITARIO para "true"
    beforeEach(() => {
        process.env.TESTE_UNITARIO = "true";
    });

    // Falta o id no corpo

    it('deve retornar 400 com o body SEM id', async () => {
        // Configurar o evento com um corpo não completo
        event.body = JSON.stringify({
            //"id": 1,
            "NomeCompleto": "Timidim gatinho (dorme)",
            "DataNascimento": "1990-01-01",
            "Ativo": true,
            "Enderecos": [{ "Rua": "Nome da Rua", "Numero": 123 }],
            "Contatos": [{ "Tipo": "Email", "Valor": "fulano@email.com", "Principal": true }, { "Tipo": "Telefone", "Valor": "123-456-7890", "Principal": false }]
        });

        // Chamar a função que você está testando e armazenar o resultado
        const result: APIGatewayProxyResult = await putItemHandler(event);

        // Verificar se o código de status é 400
        expect(result.statusCode).toEqual(400);
    });

    // Falta o NomeCompleto no corpo

    it('deve retornar 400 com o body SEM  -----  NomeCompleto   ', async () => {
        // Configurar o evento com um corpo não completo
        event.body = JSON.stringify({
            "id": 1,
            //"NomeCompleto": "Timidim gatinho (dorme)",
            "DataNascimento": "1990-01-01",
            "Ativo": true,
            "Enderecos": [{ "Rua": "Nome da Rua", "Numero": 123 }],
            "Contatos": [{ "Tipo": "Email", "Valor": "fulano@email.com", "Principal": true }, { "Tipo": "Telefone", "Valor": "123-456-7890", "Principal": false }]
        });

        // Chamar a função que você está testando e armazenar o resultado
        const result: APIGatewayProxyResult = await putItemHandler(event);

        // Verificar se o código de status é 400
        expect(result.statusCode).toEqual(400);
    });

    // Falta o DataNascimento no corpo


    it('deve retornar 400 com o body SEM ----- DataNascimento', async () => {
        // Configurar o evento com um corpo não completo
        event.body = JSON.stringify({
            "id": 1,
            "NomeCompleto": "Timidim gatinho (dorme)",
            //"DataNascimento": "1990-01-01",
            "Ativo": true,
            "Enderecos": [{ "Rua": "Nome da Rua", "Numero": 123 }],
            "Contatos": [{ "Tipo": "Email", "Valor": "fulano@email.com", "Principal": true }, { "Tipo": "Telefone", "Valor": "123-456-7890", "Principal": false }]
        });

        // Chamar a função que você está testando e armazenar o resultado
        const result: APIGatewayProxyResult = await putItemHandler(event);

        // Verificar se o código de status é 400
        expect(result.statusCode).toEqual(400);
    });
    //Falta o Ativo no corpo
    it('deve retornar 400 com o body SEM ----- Ativo', async () => {
        // Configurar o evento com um corpo não completo
        event.body = JSON.stringify({
            "id": 1,
            "NomeCompleto": "Timidim gatinho (dorme)",
            "DataNascimento": "1990-01-01",
            //"Ativo": true,
            "Enderecos": [{ "Rua": "Nome da Rua", "Numero": 123 }],
            "Contatos": [{ "Tipo": "Email", "Valor": "fulano@email.com", "Principal": true }, { "Tipo": "Telefone", "Valor": "123-456-7890", "Principal": false }]
        });

        // Chamar a função que você está testando e armazenar o resultado
        const result: APIGatewayProxyResult = await putItemHandler(event);

        // Verificar se o código de status é 400
        expect(result.statusCode).toEqual(400);
    });

    //Falta o Enderecos no corpo
    it('deve retornar 400 com o body SEM ----- Enderecos', async () => {
        // Configurar o evento com um corpo não completo
        event.body = JSON.stringify({
            "id": 1,
            "NomeCompleto": "Timidim gatinho (dorme)",
            "DataNascimento": "1990-01-01",
            "Ativo": true,
            //"Enderecos": [{"Rua": "Nome da Rua", "Numero": 123}],            
            "Contatos": [{ "Tipo": "Email", "Valor": "fulano@email.com", "Principal": true }, { "Tipo": "Telefone", "Valor": "123-456-7890", "Principal": false }]
        });

        // Chamar a função que você está testando e armazenar o resultado
        const result: APIGatewayProxyResult = await putItemHandler(event);

        // Verificar se o código de status é 400
        expect(result.statusCode).toEqual(400);
    });
    //Falta o Contatos no corpo
    it('deve retornar 400 com o body SEM ------ Contatos ', async () => {
        // Configurar o evento com um corpo não completo
        event.body = JSON.stringify({
            "id": 1,
            "NomeCompleto": "Timidim gatinho (dorme)",
            "DataNascimento": "1990-01-01",
            "Ativo": true,
            "Enderecos": [{ "Rua": "Nome da Rua", "Numero": 123 }],
            //"Contatos":[{"Tipo":"Email","Valor":"fulano@email.com","Principal":true},{"Tipo":"Telefone","Valor":"123-456-7890","Principal":false}]
        });

        // Chamar a função que você está testando e armazenar o resultado
        const result: APIGatewayProxyResult = await putItemHandler(event);

        // Verificar se o código de status é 400
        expect(result.statusCode).toEqual(400);
    });


});
