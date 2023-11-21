import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { updateByIdHandler } from '../../../handlers/update-by-id';

import { expect, describe, it, beforeEach } from '@jest/globals';


const event: APIGatewayProxyEvent = {
    httpMethod: 'PUT', //Regra de negocio. 
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

/**
 * Lembrar que no caso deste body (com forma: {id: "julian", ExpressionAttributeValues: "", UpdateExpression: ""})
 * pode-se ter 8 casos de testes (combinando os 3 elementos do body na condição de elemento NÂO vazio ou "elemento VAZIO")
 */

//BODY  imcompleto VAZIO  000
// (com forma: {id: VAZIO, ExpressionAttributeValues: VAZIO, UpdateExpression: VAZIO})

describe(' (updateByIdHandler)  Com verbo PUT, mas com o body VAZIO ', function () {

    //Para desacoplar a lógica de negocios do DynamoDB
    beforeEach(() => {
        process.env.TESTE_UNITARIO = "true";
    });


    it('000  verifies response status Code 400, com verbo PUT, BODY  VAZIO', async () => {
        
        const result: APIGatewayProxyResult = await updateByIdHandler(event);

        expect(result.statusCode).toEqual(400);

    });
});


// com BODY imcompleto  001
// (com forma: {id: "VAZIO", ExpressionAttributeValues: VAZIO, UpdateExpression: "NÂO VAZIO"})

describe('   (updateByIdHandler)  Com verbo PUT, mas com BODY imcompleto ', function () {

    //Para desacoplar a lógica de negocios do DynamoDB
    beforeEach(() => {
        process.env.TESTE_UNITARIO = "true";
    });


    it('001 verifies response status Code 400, com verbo PUT,   com BODY imcompleto', async () => {
        event.body = JSON.stringify({
            "id": "",
            "ExpressionAttributeValues": "",
            "UpdateExpression": "NÂO VAZIO"
        });

        const result: APIGatewayProxyResult = await updateByIdHandler(event);

        expect(result.statusCode).toEqual(400);

    });
});


// com BODY imcompleto 010
// (com forma: {id: "VAZIO", ExpressionAttributeValues: NÂO VAZIO, UpdateExpression: VAZIO})

describe(' (updateByIdHandler)  Com verbo PUT, mas com BODY imcompleto ', function () {

    //Para desacoplar a lógica de negocios do DynamoDB
    beforeEach(() => {
        process.env.TESTE_UNITARIO = "true";
    });


    it('010 verifies response status Code 400, com verbo PUT,   com BODY imcompleto', async () => {
        event.body = JSON.stringify({
            "id": "",
            "ExpressionAttributeValues": "NÂO VAZIO",
            "UpdateExpression": ""
        });

        const result: APIGatewayProxyResult = await updateByIdHandler(event);

        expect(result.statusCode).toEqual(400);

    });
});

// com BODY imcompleto 011
// (com forma: {id: "VAZIO", ExpressionAttributeValues: NÂO VAZIO, UpdateExpression: NAO VAZIO})

describe(' (updateByIdHandler)  Com verbo PUT, mas com BODY imcompleto ', function () {

    //Para desacoplar a lógica de negocios do DynamoDB
    beforeEach(() => {
        process.env.TESTE_UNITARIO = "true";
    });


    it('011 verifies response status Code 400, com verbo PUT,   com BODY imcompleto', async () => {
        event.body = JSON.stringify({
            "id": "",
            "ExpressionAttributeValues": "NÂO VAZIO",
            "UpdateExpression": "NÂO VAZIO"
        });

        const result: APIGatewayProxyResult = await updateByIdHandler(event);

        expect(result.statusCode).toEqual(400);

    });
});

// com BODY imcompleto 100
// (com forma: {id: NÂO VAZIO, ExpressionAttributeValues: VAZIO, UpdateExpression: VAZIO})

describe('(updateByIdHandler) Com verbo PUT, mas com BODY imcompleto', function () {
    beforeEach(() => {
        process.env.TESTE_UNITARIO = "true";
    });

    it('100 verifies response status Code 400, com verbo PUT, com BODY imcompleto', async () => {
        event.body = JSON.stringify({
            "id": "NÂO VAZIO",
            "ExpressionAttributeValues": "",
            "UpdateExpression": ""
        });

        const result: APIGatewayProxyResult = await updateByIdHandler(event);

        expect(result.statusCode).toEqual(400);
    });
});

// com BODY imcompleto 101
// (com forma: {id: NÂO VAZIO, ExpressionAttributeValues: VAZIO, UpdateExpression: NÂO VAZIO})

describe('(updateByIdHandler) Com verbo PUT, mas com BODY imcompleto', function () {
    beforeEach(() => {
        process.env.TESTE_UNITARIO = "true";
    });

    it('101 verifies response status Code 400, com verbo PUT, com BODY imcompleto', async () => {
        event.body = JSON.stringify({
            "id": "NÂO VAZIO",
            "ExpressionAttributeValues": "",
            "UpdateExpression": "NÂO VAZIO"
        });

        const result: APIGatewayProxyResult = await updateByIdHandler(event);

        expect(result.statusCode).toEqual(400);
    });
});

// com BODY imcompleto 110 
// (com forma: {id: NÂO VAZIO, ExpressionAttributeValues: NÂO VAZIO, UpdateExpression: VAZIO})

describe('(updateByIdHandler) Com verbo PUT, mas com BODY imcompleto', function () {
    beforeEach(() => {
        process.env.TESTE_UNITARIO = "true";
    });

    it('110 verifies response status Code 400, com verbo PUT, com BODY imcompleto', async () => {
        event.body = JSON.stringify({
            "id": "NÂO VAZIO",
            "ExpressionAttributeValues": "NÂO VAZIO",
            "UpdateExpression": ""
        });

        const result: APIGatewayProxyResult = await updateByIdHandler(event);

        expect(result.statusCode).toEqual(400);
    });
});

//Com BODY com id ERRADO
// com BODY completo 111
// (com forma: {id: NÂO VAZIO, ExpressionAttributeValues: NÂO VAZIO, UpdateExpression: NÂO VAZIO})

describe('(updateByIdHandler) Com verbo PUT, mas com BODY imcompleto', function () {
    beforeEach(() => {
        process.env.TESTE_UNITARIO = "true";
    });

    it('111 verifies response status Code 400, com verbo PUT, com BODY completo, ID errado', async () => {
        event.body = JSON.stringify({
            "id": "NÂO VAZIO",
            "ExpressionAttributeValues": "NÂO VAZIO",
            "UpdateExpression": "NÂO VAZIO"
        });

        const result: APIGatewayProxyResult = await updateByIdHandler(event);

        expect(result.statusCode).toEqual(400);
    });
});

//Com BODY com id CERTO (id=1)
// com BODY completo 111
// (com forma: {id: NÂO VAZIO, ExpressionAttributeValues: NÂO VAZIO, UpdateExpression: NÂO VAZIO})

describe('(updateByIdHandler) Com verbo PUT, mas com BODY imcompleto', function () {
    beforeEach(() => {
        process.env.TESTE_UNITARIO = "true";
    });

    it('111 verifies response status Code 400, com verbo PUT, com BODY completo, id CERTO', async () => {
        event.body = JSON.stringify({
            "id": "1",
            "ExpressionAttributeValues": "NÂO VAZIO",
            "UpdateExpression": "NÂO VAZIO"
        });

        const result: APIGatewayProxyResult = await updateByIdHandler(event);

        expect(result.statusCode).toEqual(200);
    });
});
