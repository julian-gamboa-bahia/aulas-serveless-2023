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
 * Como é o arquivo **template.yml** gerado com o comando: sam init ?
 * Vantagens de usar typescript (ao invés de JavaScript) para fazer um CRUD ?
 * O que é o **AWS SDK** para JS ?
 * Como faz o **AWS SDK** v3 para poupar espaço ? 
 * Como é o arquivo **samconfig.toml** gerado com o comando: sam deploy ?
 * O que faz o comando **sam local invoke** ?


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
* Como definir permissões (IAM aws service) num template de Cloudformation ?
* Qual será a saída do comando: **sam list endpoints --output json** ?

### **Laboratório Avançado**: construindo uma Aplicação Serverless com AWS Lambda

Será preciso aplicar o métodod TDD (Desenvolvimento focado em testes) para que este **Laboratório Avançado** seja feito num tempo sumário. Por isso deve: 
*  Estudar o arquivo **jest.config.ts** neste repositório.
*  Colocar todos os arquivos *test.ts na pasta para o "método TDD"
*  Aplicar a sequencia de desenvolvimento e semaforos conforme o método TDD.
*  Ao finalizar o desenvolvimento deve esvaziar a **pasta para o "método TDD"**
*  Estudar sobre **testes unitários**, **jest (https://www.npmjs.com/package/jest)**, **Testes de integração**, pirámide de testes.
  

Neste laborátorio avançado deve estudar cada arquivo contido na **pasta events/** dado que serão feitos **testes de integração** com ajuda do sam cli com os comandos:

* sam local invoke getByIdFunction --event ./events/event-get-by-id.json

* sam local invoke deleteItemFunction --event ./events/event-deleteItemFunction

* sam local invoke putItemFunction --event ./events/event-post-item.json 

* sam local invoke getByIdFunction --event ./events/event-get-by-id.json

* sam local invoke getAllItemsFunction --event ./events/event-get-all-items.json

* sam local invoke putItemFunction --event ./events/event-post-item.json 

* sam local invoke getByIdFunction --event ./events/event-get-by-id.json

* sam local invoke getAllItemsFunction --event ./events/event-get-all-items.json

Se lembre de ativar o **"DynamoDB local"** (com o comando: java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb ou com os arquivods na pasta docker) para poder garatir o sucesso do testes de integração.

## Dicas 

Para seu  **dever de casa (estudo detalhado destes laborátorios)**, lembremos que o desenho de uma API-RESTFUL deve ser útil para seu projeto, **ao invés de ser uma réplica de um artigo da Wikipẽdia**.  Por isso vou lhe pedir que considere uma piada:

- "Se diz que o cientista da computação (fez uma tese Doutoral sobre API RESTFUL) inventor dos conceitos de CRUD brincou com o uso do verbo http **PATCH** argumentando numa palestra: Eu inventei o uso de  **PATCH** para o CRUD dado que o **PUT** e o **POST** eram algo enrolados."

**Moral daquela piada:** sua API tem que funcionar para seu projeto, sem **se apegar cegamente** aos modelos cientificos já conhecidos (RESTFUL, etc..). 

Por gentileza veja os arquivos: [aulaTESTES.md](https://github.com/julian-gamboa-bahia/aulas-serveless-2023/blob/main/aulaTESTES.md)

e [samCLI_README.md](https://github.com/julian-gamboa-bahia/aulas-serveless-2023/blob/main/samCLI_README.md) para aprender mais um pouco. 


