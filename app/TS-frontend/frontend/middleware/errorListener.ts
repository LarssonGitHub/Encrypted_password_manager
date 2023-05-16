import {
    customResponse,
    arrayOfWebsites,
    websiteObject
} from "../../../@types/@type-module";

// TODO further develop error handler
export class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'customError';
    }
}

const logCustomError = (message: string): void => {
    console.error("The request failed. ", message === undefined ? "" : ` Message: ${message}`)
}

const logError = (error: unknown): void => {
    console.error("Full Error: ", error)
}

const sanitizeError = (error: unknown): void => {
    if (error instanceof CustomError) logCustomError(error.message)
    logError(error)
}

export const errorListener = async (func: Function, args ? : unknown): Promise < void  > => {
    try {
        await func(args);
    } catch (error: unknown) {
        sanitizeError(error)
    }
}