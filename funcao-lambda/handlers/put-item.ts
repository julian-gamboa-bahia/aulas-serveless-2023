
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

import { HttpMethodValidator } from '../regras_negocio/HttpMethodValidator';
import { IdValidator } from '../regras_negocio/IdValidator';

const client = process.env.AWS_SAM_LOCAL ? new DynamoDBClient({
  endpoint: "http://172.17.0.1:8000",
}) : new DynamoDBClient({});

const ddbDocClient = DynamoDBDocumentClient.from(client);

export const putItemHandler = async (
  event: any): Promise<any> => {


  // Verifique com o GERENTE se for precioso colocar o console.info
  //console.info('received:', event);

    // Cria uma instância do validador de método HTTP
    const httpMethodValidator = new HttpMethodValidator(
      event,
      405, // Código de status a ser retornado se o método HTTP for inválido
      'POST', // Método HTTP esperado
      'deleteItemHandler---Erro ao processar solicitação: Método HTTP inválido' // Mensagem de erro para o log
    );

  // Valida o método HTTP
  const httpMethodValidationResult = httpMethodValidator.validateHttpMethod();

  // Se a validação do método HTTP falhar, retorne o objeto de resposta diretamente
  if (httpMethodValidationResult) {
    return httpMethodValidationResult;
  }

  // Coletando os Elementos do Body, e aplicando as "REGRAS de negocio"
  try {
    // Verifique se o corpo do evento está presente
    if (!event.body) {
      throw new Error('Corpo não encontrado no evento.');      
    }
    
    const body = JSON.parse(event.body);  

    //"REGRA de negocio": deve ter todos os elementos para fazer o CREATE (do CRUD)  
    // Verificar a presença dos campos obrigatórios
    var { id, Ativo, Enderecos, Contatos, DataNascimento, NomeCompleto } = body;

    // "REGRA de negocio": deve ter todos os elementos para fazer o CREATE (do CRUD)
    if (!id || !Ativo || !Enderecos || !Contatos || !DataNascimento || !NomeCompleto) {
      
      if (!id) {
        console.log("id está undefined");
      }
      if (!Ativo) {
        console.log("Ativo está undefined");
      }
      if (!Enderecos) {
        console.log("Enderecos está undefined");
      }
      if (!Contatos) {
        console.log("Contatos está undefined");
      }
      if (!DataNascimento) {
        console.log("DataNascimento está undefined");
      }
      if (!NomeCompleto) {
        console.log("NomeCompleto está undefined");
      }

      console.log("O corpo não contém todos os elementos necessários para realizar a operação de CREATE. (putItemHandler)", id, Ativo, Enderecos, Contatos, DataNascimento, NomeCompleto);
      
      throw new Error('O corpo não contém todos os elementos necessários para realizar a operação de CREATE.');
    }
    else {
      id = body.id;
      Ativo = body.Ativo;
      Enderecos = body.Enderecos;
      Contatos = body.Contatos;
      DataNascimento = body.DataNascimento;
      NomeCompleto = body.NomeCompleto;
    }
  }
  catch (err) {
    const response_StatusCode_400 = {
      headers: {        'Content-Type': 'application/json'},
      statusCode: 400,
      body: JSON.stringify(err)
    };
    // Verifique com o GERENTE se for precioso colocar o console
    //console.log("Error (putItemHandler)", err);
    return response_StatusCode_400
  }




  // Creates a new item, or replaces an old item with a new item
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
  var params = {
    TableName: "CadastroClientes",
    Item: {
      id: id,
      Ativo: Ativo,
      Enderecos: Enderecos,
      Contatos: Contatos,
      DataNascimento: DataNascimento,
      NomeCompleto: NomeCompleto
    }
  };

  try {


    var data, items;

    if (process.env.TESTE_UNITARIO === undefined) {
      data = await ddbDocClient.send(new PutCommand(params));
    }
    else {
      data = "TESTE_UNITARIO";
    }

    const response_StatusCode_200 = {
      statusCode: 200,
      body: JSON.stringify(data)
    };
    console.log("INSERIDO (putItemHandler)", response_StatusCode_200);
    return response_StatusCode_200
  }
  catch (err) {
    const response_StatusCode_500 = {
      statusCode: 500,
      body: JSON.stringify(err)
    };
    console.log("statusCode: 500 (putItemHandler)", response_StatusCode_500);
    return response_StatusCode_500
  }



};
