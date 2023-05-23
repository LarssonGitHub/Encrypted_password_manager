import {
    editDocumentFeedback
} from "../renderer.js"
import {
    customResponse,
    errorResponse
} from "../../../@types/@type-module";

const logError = (error: Error): void => {
    console.error(error)
    const message = error.message === undefined ? "Error occurred, no message was given" : error.message;
    editDocumentFeedback(message, true)
}

const logUnknownError = (): void => {
    console.error("An error outside the Error instance occurred")
}

export const sanitizeError = (error: unknown): void => {
    if (error instanceof Error) return logError(error)
    logUnknownError()
}

const createErrorResponse = (error: unknown): errorResponse => {
    return {
        ok: false,
        error: error
    }
}

export const errorListener = async (func: Function): Promise < errorResponse | customResponse > => {
    try {
        return await func();
    } catch (error: unknown) {
        return createErrorResponse(error)
    }
}