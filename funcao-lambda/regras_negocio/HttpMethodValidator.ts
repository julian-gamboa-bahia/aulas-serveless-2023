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
  