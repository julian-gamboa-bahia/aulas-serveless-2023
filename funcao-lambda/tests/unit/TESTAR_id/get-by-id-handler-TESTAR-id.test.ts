import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { getByIdHandler } from '../../../handlers/get-by-id';

import { expect, describe, it, beforeEach } from '@jest/globals';


const event: APIGatewayProxyEvent = {
    httpMethod: 'GET', //Regra de negocio. 
    body: '',
    headers: {},
    isBase64Encoded: false,
    multiValueHeaders: {},
    multiValueQueryStringParameters: {},
    path: '/',

    pathParameters: {},//Regra de negocio.

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


describe(' (getByIdHandler) deve retornar 400 ao receber  {id} com valor 1.1 (Não Inteiro)', function () {

    //Para desacoplar a lógica de negocios do DynamoDB
    beforeEach(() => {
        process.env.TESTETESTE_UNITARIO_GET = "true";
    });


    it('verifies response status Code 400, com {id} como 1.1 (Não Inteiro)', async () => {


        // Configurar o evento com um ID que não é um número inteiro
        event.pathParameters = { id: '1.1' };
        const result: APIGatewayProxyResult = await getByIdHandler(event);

        expect(result.statusCode).toEqual(400);

    });
});

describe(' (getByIdHandler) deve retornar 400 ao receber  {id} do tipo STRING (Não Inteiro) ', function () {

    //Para desacoplar a lógica de negocios do DynamoDB
    beforeEach(() => {
        process.env.TESTE_UNITARIO = "true";
        event.pathParameters = { id: 'julian gamboa' };    
    });


    it('verifies response status Code 400, com {id} do tipo STRING (Não Inteiro)', async () => {

        
        //console.log(" pathParameters ", event.pathParameters);
        const result: APIGatewayProxyResult = await getByIdHandler(event);

        expect(result.statusCode).toEqual(400);

    });
});




