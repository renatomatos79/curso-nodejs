import { HttpStatusCode } from "../enums/HttpStatusCode.enum";

class ErrorCode {
    code: HttpStatusCode;
    message: string;

    constructor(code: HttpStatusCode, message: string) {
        this.code = code;
        this.message = message;
    }
}

export { ErrorCode }