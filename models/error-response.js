export class ErrorResponse {
    constructor({ message, statusCode = 500, details = null }) {
        this.status = 'error';
        this.statusCode = statusCode;
        this.message = message;
        if (details) {
            this.details = details;
        }
    }
}