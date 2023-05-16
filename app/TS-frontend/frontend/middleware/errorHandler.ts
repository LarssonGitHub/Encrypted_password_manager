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

const logMessage = (message: string | undefined): void => {
    console.log("The request finished. ", message === undefined ? "" : ` Message: ${message}`)
}

const sanitizeResponse = (response: customResponse): arrayOfWebsites | websiteObject | void => {
    // As of now, response.success will always be reported as true from the backend.
    // The error handler will catch any unsuccessful requests, remove this or change as needed.
    if (!response.success) throw new Error("Undefined error, response couldn't be completed")
    logMessage(response.message);
    if (!response.data || typeof response.data !== 'object') return
    return response.data
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

export const errorHandler = async (func: Function, args ? : unknown): Promise < void | arrayOfWebsites | websiteObject > => {
    try {
        const response: customResponse = await func(args);
        const data: arrayOfWebsites | websiteObject | void = sanitizeResponse(response)
        return data
    } catch (error: unknown) {
        sanitizeError(error)
    }
}