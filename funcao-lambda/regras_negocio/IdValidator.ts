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
     * Validate and extract the ID.
     * @returns The ID if it is valid, otherwise the response status code.
     */
    validateAndExtractId() {
        const idString = this.event?.pathParameters?.id;

        if (!idString || !Number.isInteger(Number(idString))) {
            const responseStatusCode = {
                statusCode: this.statusCode,
                body: JSON.stringify(`Não é um número inteiro válido: ${idString}`),
            };

            console.error(this.menssagensErro, responseStatusCode);
            return responseStatusCode;
        }

        const id = Number(idString);
        return id;
    }
}


