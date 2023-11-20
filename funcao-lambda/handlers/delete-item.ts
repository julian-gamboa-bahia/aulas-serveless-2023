// Path: funcao-lambda/delete-by-id.mjs
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';


const client = process.env.AWS_SAM_LOCAL ? new DynamoDBClient({
  endpoint: "http://172.17.0.1:8000",
}) : new DynamoDBClient({});

const ddbDocClient = DynamoDBDocumentClient.from(client);




export const deleteItemHandler = async (
  event: any): Promise<any> => {

  if (event.httpMethod !== 'DELETE') {
    const response_StatusCode_405 = {
      statusCode: 405,
    };
    console.log("Error (deleteItemHandler)", response_StatusCode_405);
    return response_StatusCode_405;
  }

  // Verifique com o GERENTE se for precioso colocar o console.info
  //console.info('received:', event);

  // Get id from pathParameters from APIGateway because of `/{id}` at template.yaml

  // Verifica se o parameter {id} é um número inteiro
  if (
    !Number.isInteger(Number(event.pathParameters.id))
  ) {
    const response_StatusCode_406 = {
      statusCode: 406,
      body: JSON.stringify("Não número INTEIRO  " + event.pathParameters.id)
    };
    console.log("Error (deleteItemHandler)", response_StatusCode_406);
    return response_StatusCode_406;
  }
  const id = Number(event.pathParameters.id);

  // Get the item from the table
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property
  var params = {
    TableName: "CadastroClientes",
    Key: { id: id },
  };

  try {

    var data;

    if (process.env.TESTE_UNITARIO === undefined) {
      data = await ddbDocClient.send(new DeleteCommand(params));
      console.log(" (deleteItemHandler) Success - item deleted", data);
    }
    else {
      data = "TESTE_UNITARIO";
      console.log(" (deleteItemHandler) TESTANDO   ", data);
    }


    const response_StatusCode_200 = {
      statusCode: 200,
      body: JSON.stringify({ message: data })
    };

    return response_StatusCode_200;

  } catch (err) {
    console.log("Error (getAllItemsHandler)", err);
    // Verifique com o GERENTE se for precioso colocar o console.info
    //console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    const response_StatusCode_500 = {
      statusCode: 500,
    };

    return response_StatusCode_500;
  }


};


