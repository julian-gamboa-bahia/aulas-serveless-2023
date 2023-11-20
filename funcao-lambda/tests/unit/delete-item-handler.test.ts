import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { deleteItemHandler } from '../../handlers/delete-item';

import { expect, describe, it, beforeEach } from '@jest/globals';


const event: APIGatewayProxyEvent = {
    httpMethod: 'DELETE', //Regra de negocio. 
    body: '',
    headers: {},
    isBase64Encoded: false,
    multiValueHeaders: {},
    multiValueQueryStringParameters: {},
    path: '/',
    
    
    pathParameters: {id: '1'},//Regra de negocio.

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


describe(' (deleteItemHandler) deve retornar 200 apenas com verbo http DELETE ', function () {

    //Para desacoplar a lógica de negocios do DynamoDB
    beforeEach(() => {
        process.env.TESTE_UNITARIO = "true";
    });


    it('verifies response status Code 200, com verbo DELETE', async () => {


        // Configurar o evento com um ID que não é um número inteiro
        event.httpMethod = 'DELETE';
        const result: APIGatewayProxyResult = await deleteItemHandler(event);

        expect(result.statusCode).toEqual(200);

    });
});


describe(' (deleteItemHandler) deve retornar 405 se o verbo http não for PUT ', function () {

    //Para desacoplar a lógica de negocios do DynamoDB
    beforeEach(() => {
        process.env.TESTE_UNITARIO = "true";
    });


    it('verifies response status Code 405, com verbo DELETE', async () => {


        event.httpMethod = 'PUT';
        const result: APIGatewayProxyResult = await deleteItemHandler(event);

        expect(result.statusCode).toEqual(405);

    });
});

