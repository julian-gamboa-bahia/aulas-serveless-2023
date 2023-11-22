
/**
 * Represents a validator for validating an ID.
 */
export class Body_IdValidator {

    private id: any;
    private statusCode: number;
    private menssagensErro: string;

    /**
     * Creates an instance of Body_IdValidator.
     * @param id - The ID to be validated.
     * @param statusCode - The status code to be returned in case of validation failure.
     * @param menssagensErro - The error messages to be logged in case of validation failure.
     */
    constructor(id: any, statusCode: number, menssagensErro: string) {
        this.id = id
        this.statusCode = statusCode;
        this.menssagensErro = menssagensErro;
    }

    /**
     * Validates the ID.
     * @returns The response status code if the ID is invalid, otherwise null.
     */
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


