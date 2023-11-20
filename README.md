# Aula básica Lambda (serviço da AWS para construir backend)

É possível construir um backend completo usado o serviço lambda da AWS, claro será preciso usar outros serviços para apriomar detalhes de segurança dentre outros, e neste curso vamos aprender um método para construir um backend de forma simples usando as mais modernas tecnologias cloud da AWS.

## Conceitos básicos:

Recomendo considerar os conceitos aprendidos no treinamento para obter a cartificação de "cloud practitioner AWS" dado que em qualquer momento posso lhes consultar sobre:
 * O que é o **AWS Lambda** ?
 * O que são as permissões **AWS IAM** ?
 * Como Configurar o gatilho (trigger) para acionar a função (por exemplo, uma API Gateway, um evento do S3, etc.) ?
 * Como Configurar "permissões IAM" para uma **função AWS lambda**?
 * Como iniciar o DynamoDb no docker ?
 * Quais verbos HTTP são usados no CRUD ?
 * O que é uma API RESTFUL ?
 * O que é o SAM-CLI (ferramenta de AWS para acelerar o desenvolvimento de funções Serveless) ?
 * Vantagens de usar typescript (ao invés de JavaScript) para fazer um CRUD ?


## Os dois (02) laboratórios:

Sem dúvida que são muitos conceitos que devem ser cuidadosamente artículados, por isso será preciso dividir está aula em dois (02) laboratórios:

 + **Laboratório Básico**: Configurando uma Função Lambda Simples. Neste laboratório, você aprenderá a configurar uma função Lambda básica que responde a eventos de gatilho. Você usará o AWS Management Console para criar uma função Lambda que **responda os verbos HTTP do CRUD**.

+ **Laboratório Avançado**: Construindo uma Aplicação Serverless com AWS Lambda, Amazon API Gateway e Amazon DynamoDB (testada previamente com **Docker local** usando o **sam cli**) , você construirá uma aplicação serverless completa. Você usará o AWS Lambda e o Amazon API Gateway para criar uma API RESTful, e o Amazon DynamoDB para armazenar dados.


### **Laboratório Básico**: Configurando uma Função Lambda Simples

Usando o **sam-cli** pode-se criar uma função serveless usando o template especifico para fazer "Hello World" em **typescript**. 


Neste laboratório pode-se aprofundar sobre o serviço da AWS "Cloudformation" dado que o **sam-cli** usa este serviço de forma muito simplificada. 

Para garantir o sucesso deste laboratório tente estudar sobre o **AWS  Cloudformation** focado em:

* Como definir uma tabela DynamoDB ?
* Como definir um APIGateway e os caminhos para cada recurso atendido por uma API RestFUL ?
* Como criar diversos end-point num mesmo TEMPLATE.yaml ?
* 


https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html

https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html




sam list endpoints --output json









### **Laboratório Avançado**: construindo uma Aplicação Serverless com AWS Lambda

## Dicas de **estudo detalhado**:

Lembremos que o desenho de uma API-RESTFUL deve ser útil para seu projeto, **ao invés de ser uma réplica de um artigo da Wikipẽdia**.  Por isso vou lhe pedir que considere uma piada:

- "Se diz que o cientista da computação (fez uma tese Doutoral sobre API RESTFUL) inventor dos conceitos de CRUD brincou com o uso do verbo http **PATCH** argumentando numa palestra: Eu inventei o uso de  **PATCH** para o CRUD dado que o **PUT** e o **POST** eram algo enrolados."

**Moral daquela piada:** sua API tem que funcionar para seu projeto, sem **se apegar cegamente** aos modelos cientificos já conhecidos (RESTFUL, etc..). 







# More info about Globals: https://github.com/awslabs/serverless-application-model/blob/master/docs/globals.rst




https://www.npmjs.com/package/dynamodb-admin

describe(' (putItemHandler) deve retornar 200 apenas com verbo http POST ', function () {

    //Para desacoplar a lógica de negocios do DynamoDB
    beforeEach(() => {
        process.env.TESTE_UNITARIO = "true";
    });


    it('verifies response status Code 200, com verbo POST', async () => {


        // Configurar o evento com um ID que não é um número inteiro
        //event.httpMethod = 'POST';
        const result: APIGatewayProxyResult = await putItemHandler(event);

        expect(result.statusCode).toEqual(200);

    });
});





