import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

import { HttpMethodValidator } from '../regras_negocio/HttpMethodValidator';
import { IdValidator } from '../regras_negocio/IdValidator';

const client = process.env.AWS_SAM_LOCAL ? new DynamoDBClient({
  endpoint: "http://172.17.0.1:8000",
}) : new DynamoDBClient({});


const ddbDocClient = DynamoDBDocumentClient.from(client);

/**
 * A simple example includes a HTTP get method to get one item by id from a DynamoDB table.
 */
export const getByIdHandler = async (
  event: any
): Promise<any> => {

  // Verifique com o GERENTE se for precioso colocar o console.info
  console.info('Event received: (getByIdHandler) ', event);

  // Cria uma instância do validador de método HTTP
  const httpMethodValidator = new HttpMethodValidator(
    event,
    405, // Código de status a ser retornado se o método HTTP for inválido
    'GET', // Método HTTP esperado
    'getByIdHandler---Erro ao processar solicitação: Método HTTP inválido' // Mensagem de erro para o log
  );

  // Valida o método HTTP
  const httpMethodValidationResult = httpMethodValidator.validateHttpMethod();

  // Se a validação do método HTTP falhar, retorne o objeto de resposta diretamente
  if (httpMethodValidationResult) {
    return httpMethodValidationResult;
  }
  
  

  // Verifica se o parameter {id} é um número inteiro
  const idValidator = new IdValidator(event, 406, 'Error (getByIdHandler) idValidator ');
  
  const idValidationResult = idValidator.validateId();

  if (idValidationResult) {
    // Se a validação do ID falhar, retorne o objeto de resposta diretamente
    
    return idValidationResult;
  }

  const id = idValidator.validateAndExtractId();
  

  var params = {
    TableName: "CadastroClientes",
    Key: { id: id },
  };

  try {
    var data, items;

    if (process.env.TESTE_UNITARIO === undefined) {
      data = await ddbDocClient.send(new GetCommand(params));
      items = data.Item;
    }
    else {
      items = ["item1", "getByIdHandler"];
    }

    const response_StatusCode_200 = {
      statusCode: 200,
      body: JSON.stringify(items)
    };

    return response_StatusCode_200;

  } catch (err) {
    console.log("Error (getByIdHandler) response_StatusCode_500", err);
    // Verifique com o GERENTE se for precioso colocar o console.info
    //console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    const response_StatusCode_500 = {
      statusCode: 500,
      body: JSON.stringify(items)
    }
    return response_StatusCode_500;
  }
}
