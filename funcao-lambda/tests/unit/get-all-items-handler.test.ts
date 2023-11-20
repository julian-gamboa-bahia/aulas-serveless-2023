import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { getAllItemsHandler } from '../../handlers/get-all-items';

import { expect, describe, it, beforeEach } from '@jest/globals';


const event: APIGatewayProxyEvent = { 
    httpMethod: 'GET', //Regra de negocio. 
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

describe(' (getAllItemsHandler) deve retornar "STATUS CODE" 200 (apenas GET) e 405 caso contrario ', function () {

    //Para desacoplar a lógica de negocios do DynamoDB
    beforeEach(() => {
        process.env.TESTE_UNITARIO="true";
    });
  

    it('verifies response status Code 200', async () => {
 
        //Evento Mokado, mas considere fazer o teste de integracao (sam local invoke)        
        const result: APIGatewayProxyResult = await getAllItemsHandler(event);

        expect(result.statusCode).toEqual(200);        

    });
});


describe(' (getAllItemsHandler) deve retornar 405 ao receber uma solicitação com verbo diferente de GET ', function () {

    //Para desacoplar a lógica de negocios do DynamoDB
    beforeEach(() => {
        process.env.TESTE_UNITARIO="true";
        event.httpMethod="POST";
    });
  

    it('verifies response status Code 405', async () => {
 
        //Evento Mokado, mas considere fazer o teste de integracao (sam local invoke)        
        const result: APIGatewayProxyResult = await getAllItemsHandler(event);

        expect(result.statusCode).toEqual(405);        

    });
});


  