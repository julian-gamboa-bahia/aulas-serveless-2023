import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';


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

  if (event.httpMethod !== 'GET') {
    const response_StatusCode_405 = {
      statusCode: 405,
    };
    console.log("Error (getByIdHandler)", response_StatusCode_405);
    return response_StatusCode_405;
  }

  // Verifique com o GERENTE se for precioso colocar o console.info
  //  console.info('received:', event);

  // Verifica se o parameter {id} é um número inteiro
  if(
     !Number.isInteger(Number(event.pathParameters.id))
    )
  {
    const response_StatusCode_406 = {
      statusCode: 406,
      body: JSON.stringify("Não número INTEIRO  "+event.pathParameters.id)
    };
    console.log("Error (getByIdHandler)", response_StatusCode_406);
    return response_StatusCode_406;
  }
  const id = Number(event.pathParameters.id);


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
    console.log("Error (getByIdHandler)", err);
    // Verifique com o GERENTE se for precioso colocar o console.info
    //console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    const response_StatusCode_500 = {
      statusCode: 500,
      body: JSON.stringify(items)
    }
    return response_StatusCode_500;
  }
}
