# Aplicando SOLID

Um crud arquitetado na forma de handlers (arquitetura triangular), pode ser colocado na forma mais estrita de SOLID, usando as classes:

### Para validar o verbo HTTP usado em cada handler

```typescript
/**
 * Represents a validator for HTTP methods.
 */
export class HttpMethodValidator {
  private event: any;
  private statusCode: number;
  private httpMethod: string;
  private menssagensErro: string;

  /**
   * Create an instance of HttpMethodValidator.
   * @param event - The event object.
   * @param statusCode - The status code to be returned if the HTTP method is invalid.
   * @param httpMethod - The expected HTTP method.
   * @param menssagensErro - The error messages to be logged if the HTTP method is invalid.
   */
  constructor(event: any, statusCode: number, httpMethod: string, menssagensErro: string) {
    this.event = event;
    this.statusCode = statusCode;
    this.httpMethod = httpMethod;
    this.menssagensErro = menssagensErro;
  }

  /**
   * Validate the HTTP method.
   * @returns The response status code if the HTTP method is invalid, otherwise null.
   */
  validateHttpMethod() {
    if (this.event.httpMethod !== this.httpMethod) {
      const response_StatusCode = {
        statusCode: this.statusCode,
      };
      console.log(this.menssagensErro, response_StatusCode);
      return response_StatusCode;
    }

    return false; // Returns null if the HTTP method is valid (httpMethod parameter)
  }
}  
```

### Para validar o id no body do handler que faz o UPDATE do CRUD

```typescript

export class Body_IdValidator {

    private id: any;
    private statusCode: number;
    private menssagensErro: string;

    constructor(id: any, statusCode: number, menssagensErro: string) {
        this.id = id
        this.statusCode = statusCode;
        this.menssagensErro = menssagensErro;
    }

    validateId() {
        const idString = this.id

        if (!idString || !Number.isInteger(Number(idString))) {
            const responseStatusCode = {
                statusCode: this.statusCode,
                body: JSON.stringify(`Não é um número inteiro válido: ${idString}`),
            };

            console.error(this.menssagensErro, responseStatusCode);
            return responseStatusCode;
        }

        return null;
    }


}

```
### Para validar o id dos: 
1)  handler que faz o **Read** (por {id}) do CRUD, 
2)  handler que faz o **DELETE** (por {id}) do CRUD

```typescript
/**
 * Class representing an ID validator.
 */
export class IdValidator {

    private event: any;
    private statusCode: number;
    private menssagensErro: string;

    /**
     * Create an instance of IdValidator.
     * @param event - The event object.
     * @param statusCode - The status code.
     * @param menssagensErro - The error messages.
     */
    constructor(event: any, statusCode: number, menssagensErro: string) {
        this.event = event;
        this.statusCode = statusCode;
        this.menssagensErro = menssagensErro;
    }

    /**
     * Validate the ID.
     * @returns The response status code if the ID is invalid, otherwise true.
     */
    validateId() {
        const idString = this.event?.pathParameters?.id;

        if (!idString || !Number.isInteger(Number(idString))) {
            const responseStatusCode = {
                statusCode: this.statusCode,
                body: JSON.stringify(`Não é um número inteiro válido: ${idString}`),
            };

            console.error(this.menssagensErro, responseStatusCode);
            return responseStatusCode;
        }

        return null;
    }

    /**
     * Extracts the ID from the event's path parameters.
     * @returns The extracted ID as a number.
     */
    extractId() {        
    
        return Number(this.event?.pathParameters?.id);
    }
    

}

```

Estes refinamentos **permitem aplicar os princios de orientação a Objetos (POO) neste TypeScript** o que permite simplificar a leitura do código além de **re-usar instruções de uso comum por cada handler**, tais como: 
+ verificar um verbo http
+ verificar um parametro ({id}) contido no url do endpoint