# Aplicando SOLID

Um crud arquitetado na forma de handlers (arquitetura triangular), pode ser colocado na forma mais estrita de SOLID, usando as classes:

```typescript
export class HttpMethodValidator {
  constructor(event) {
    this.event = event;
  }

  validateHttpMethod() {
    if (this.event.httpMethod !== "GET") {
      const response_StatusCode_405 = {
        statusCode: 405,
      };
      console.log("Error (getByIdHandler)", response_StatusCode_405);
      return response_StatusCode_405;
    }

    return null; // Retorna null se o método HTTP for válido (GET)
  }
}
```

e

```typescript

```

```typescript

```