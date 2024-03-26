import { StatusCodes } from 'http-status-codes'

export class AppError extends Error {
    public readonly name: string;
    public readonly httpCode: StatusCodes;

    constructor(name: string, httpCode: StatusCodes) {
        super(name);

        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;

        Error.captureStackTrace(this);
    }
}

export const handleError = (err: AppError | any, res: any) => {
    let { httpCode, message } = err;

    if (err.name === 'MongoServerError' && err.code === 11000) {
        httpCode = StatusCodes.BAD_REQUEST;
    }

    if (err.name === 'ValidationError') {
        httpCode = StatusCodes.BAD_REQUEST;
        message = Object.values(err.errors).map((val: any) => val.message);
    }

    if (!httpCode) {
        httpCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }

    return res.status(httpCode).json({ message });
}