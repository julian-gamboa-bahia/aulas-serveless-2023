// Create clients and set shared const values outside of the handler.
// Create a DocumentClient that represents the query to add an item
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { HttpMethodValidator } from '../regras_negocio/HttpMethodValidator';


const client = process.env.AWS_SAM_LOCAL ? new DynamoDBClient({
  endpoint: "http://172.17.0.1:8000",
}) : new DynamoDBClient({});

const ddbDocClient = DynamoDBDocumentClient.from(client);

export const getAllItemsHandler = async (
  event: any
): Promise<any> => {

  // Verifique com o GERENTE se for precioso colocar o console.info
  //console.info('received:', event);

  // Cria uma instância do validador de método HTTP
  const httpMethodValidator = new HttpMethodValidator(
    event,
    405, // Código de status a ser retornado se o método HTTP for inválido
    'GET', // Método HTTP esperado
    'getAllItemsHandler---Erro ao processar solicitação: Método HTTP inválido' // Mensagem de erro para o log
  );

  // Valida o método HTTP
  const httpMethodValidationResult = httpMethodValidator.validateHttpMethod();

  // Se a validação do método HTTP falhar, retorne o objeto de resposta diretamente
  if (httpMethodValidationResult) {
    return httpMethodValidationResult;
  }

  var params = {
    TableName: "CadastroClientes",
  };



  try {

    var data, items;

    if (process.env.TESTE_UNITARIO === undefined) {
      data = await ddbDocClient.send(new ScanCommand(params));
      items = data.Items;
    }
    else {
      items = ["item1", "item2"];
    }

    const response_StatusCode_200 = {
      statusCode: 200,
      body: JSON.stringify(items)
    };

    return response_StatusCode_200;

  } catch (err) {
    console.log("Error (getAllItemsHandler)", err);
    // Verifique com o GERENTE se for precioso colocar o console.info
    //console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    const response_StatusCode_500 = {
      statusCode: 500,
      body: JSON.stringify(items)
    };

    return response_StatusCode_500;
  }

}