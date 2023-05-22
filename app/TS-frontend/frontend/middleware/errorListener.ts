import {
    editDocumentFeedback
} from "../renderer.js"
import {
    customResponse,
    userCredentialsArray
} from "../../../@types/@type-module";
import {
    sanitizeResponse
} from "../utilities.js";

const logError = (error: Error): void => {
    console.error(error)
    const message = error.message === undefined ? "Error occurred, no message was given" : error.message;
    editDocumentFeedback(message, true)
}

const logUnknownError = (): void => {
    console.error("An error outside the Error instance occurred")
}

const sanitizeError = (error: unknown): void => {
    if (error instanceof Error) return logError(error)
    logUnknownError()
}

export const errorListener = async (func: Function): Promise < userCredentialsArray | void > => {
    try {
        const response: customResponse = await func();
        return sanitizeResponse(response);
    } catch (error: unknown) {
        sanitizeError(error)
    }
}