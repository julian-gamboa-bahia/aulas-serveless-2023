/**
 * Represents a validator for the ID in the request body.
 */
export class Body_IdValidator {

    private event: any;
    private statusCode: number;
    private menssagensErro: string;

    /**
     * Creates a new instance of Body_IdValidator.
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
     * Validate the ID in the request body.
     * @returns The response status code if the ID is invalid, otherwise null.
     */
    validateId() {
        // Verifique se o corpo do evento é um JSON válido
        try {
            const parsedBody = JSON.parse(this.event?.body);

            if (!parsedBody || typeof parsedBody.id !== 'number') {
                throw new Error('O corpo não contém um ID válido.');
            }

            return null; // Retorna null se o corpo for válido
        }
        catch (err) {
            const responseStatusCode = {
                statusCode: this.statusCode,
                body: JSON.stringify(err),
            };

            console.error(this.menssagensErro, responseStatusCode);
            return responseStatusCode;
        }
    }

    /**
     * Extracts the ID from the event's path parameters.
     * @returns The extracted ID as a number.
     */
    extractId() {

        return Number(this.event?.pathParameters?.id);
    }


}


