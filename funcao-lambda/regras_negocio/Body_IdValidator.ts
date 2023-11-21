
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


