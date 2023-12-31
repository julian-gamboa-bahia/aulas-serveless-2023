
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ReturnValue } from "@aws-sdk/client-dynamodb";

import { HttpMethodValidator } from '../regras_negocio/HttpMethodValidator';
import { Body_IdValidator } from '../regras_negocio/Body_IdValidator';

const client = process.env.AWS_SAM_LOCAL ? new DynamoDBClient({
  endpoint: "http://172.17.0.1:8000",
}) : new DynamoDBClient({});

const ddbDocClient = DynamoDBDocumentClient.from(client);

export const updateByIdHandler = async (
  event: any): Promise<any> => {

  // Verifique com o GERENTE se for precioso colocar o console.info
  //console.info('Event received: (getByIdHandler) ', event);

  // Cria uma instância do validador de método HTTP
  const httpMethodValidator = new HttpMethodValidator(
    event,
    405, // Código de status a ser retornado se o método HTTP for inválido
    'PUT', // Método HTTP esperado
    'updateByIdHandler---Erro ao processar solicitação: Método HTTP inválido' // Mensagem de erro para o log
  );


  // Coletando os Elementos do Body, e aplicando as "REGRAS de negocio"
  try {
    // Verifique se o corpo do evento está presente
    if (!event.body) {
      throw new Error('Corpo não encontrado no evento.');
    }

    const body = JSON.parse(event.body);

    //"REGRA de negocio": deve ter todos os elementos para fazer o UPDATE (do CRUD)  
    // Verificar a presença dos campos obrigatórios
    var { id, ExpressionAttributeValues, UpdateExpression } = body;

    if (!id || !ExpressionAttributeValues || !UpdateExpression) {

      if (!id) {
        console.log("id está undefined");
        throw new Error('O corpo não contém :  id ');
      }
      if (!ExpressionAttributeValues) {
        console.log("ExpressionAttributeValues está undefined");
      }
      if (!UpdateExpression) {
        console.log("UpdateExpression está undefined");
      }

      console.log("O corpo não contém todos os elementos necessários para realizar a operação de UPDATE. (putItemHandler)", "id  " + id, "ExpressionAttributeValues " + ExpressionAttributeValues, "UpdateExpression " + UpdateExpression);

      throw new Error('O corpo não contém : todos os elementos necessários para realizar a operação de UPDATE.');
    }
    else {
      id = body.id;
      // Verifica se o parameter body.id é um número inteiro
      const body_IdValidator = new
        Body_IdValidator(
          id, // número inteiro ??????
          400, // statusCode
          'Error (updateByIdHandler) Body_IdValidator ')
        ;

      const idValidationResult = body_IdValidator.validateId();

      if (idValidationResult) {
        // Se a validação do ID falhar, retorne o objeto de resposta diretamente

        return idValidationResult;
      }

      ExpressionAttributeValues = body.ExpressionAttributeValues;
      UpdateExpression = body.UpdateExpression;
    }
  }
  catch (err) {
    const response_StatusCode_400 = {
      headers: { 'Content-Type': 'application/json' },
      statusCode: 400,
      body: JSON.stringify(err)
    };
    // Verifique com o GERENTE se for precioso colocar o console
    //console.log("Error (updateByIdHandler)", err);
    return response_StatusCode_400
  }




  // Creates a new item, or replaces an old item with a new item
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
  var params = {
    TableName: "CadastroClientes",
    Key: {
      id: id,
    },
    UpdateExpression: "set Ativo = :ativo",
    ExpressionAttributeValues: {
      ":ativo": true,
    },
    ReturnValues: "ALL_NEW" as ReturnValue,
  };

  try {


    var data, items;

    if (process.env.TESTE_UNITARIO === undefined) {
      data = await ddbDocClient.send(new UpdateCommand(params));
    }
    else {
      data = "TESTE_UNITARIO";
    }

    const response_StatusCode_200 = {
      statusCode: 200,
      body: JSON.stringify(data)
    };
    console.log("ALTERADO (updateByIdHandler)", response_StatusCode_200);
    return response_StatusCode_200
  }
  catch (err) {
    const response_StatusCode_500 = {
      statusCode: 500,
      body: JSON.stringify(err)
    };
    console.log("statusCode: 500 (updateByIdHandler)", response_StatusCode_500);
    return response_StatusCode_500
  }



};