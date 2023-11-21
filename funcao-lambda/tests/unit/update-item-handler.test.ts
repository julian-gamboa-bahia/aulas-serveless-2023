import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { updateByIdHandler } from '../../handlers/update-by-id';

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

//Com verbo PUT, e BODY completo

describe(' (updateByIdHandler) deve retornar 200 apenas com verbo http PUT dado que BODY completo', function () {

    //Para desacoplar a lógica de negocios do DynamoDB
    beforeEach(() => {
        process.env.TESTE_UNITARIO = "true";
    });


    it('verifies response status Code 200, com verbo PUT, BODY completo', async () => {


        // Configurar o evento com um corpo completo: ExpressionAttributeValues e UpdateExpression
        event.body = JSON.stringify({
            "id": 1,
            "ExpressionAttributeValues": "set Ativo = :ativo",
            "UpdateExpression": { ":ativo": true, }
        });
        const result: APIGatewayProxyResult = await updateByIdHandler(event);

        expect(result.statusCode).toEqual(200);

    });
});


//Com verbo DELETE, e BODY completo

describe(' (updateByIdHandler) deve retornar 200 apenas com verbo http PUT dado que BODY completo', function () {

    //Para desacoplar a lógica de negocios do DynamoDB
    beforeEach(() => {
        process.env.TESTE_UNITARIO = "true";
    });


    it('verifies response status Code 200, com verbo PUT, BODY completo', async () => {


        // Configurar o evento com um corpo completo: ExpressionAttributeValues e UpdateExpression
        event.body = JSON.stringify({
            "id": 1,
            "ExpressionAttributeValues": "set Ativo = :ativo",
            "UpdateExpression": { ":ativo": true, }
        });
        event.httpMethod = 'DELETE';
        const result: APIGatewayProxyResult = await updateByIdHandler(event);

        expect(result.statusCode).toEqual(200);

    });
});
