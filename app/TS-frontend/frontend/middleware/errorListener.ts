import {
    editFeedback
} from "../renderer.js"
import {
    backendResponse,
    errorResponse, 
    eventResponse
} from "../../../@types/@type-module";
import {
    createResponse
} from "../utilities.js"

const logError = (error: Error): void => {
    console.error(error)
    const message = error.message === undefined ? "Error occurred, no message was given" : error.message;
    editFeedback(message, true)
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
        success: false,
        error: error
    }
}

// Only used for backend requests. 
export const backendErrorListener = async (func: Function): Promise < errorResponse | backendResponse > => {
    try {
        return await func();
    } catch (error: unknown) {
        return createErrorResponse(error)
    }
}

// Only used in frontend for called events
export const eventErrorListener = async (func: Function): Promise <  errorResponse | eventResponse  > => {
    try {
        await func();
        return createResponse()
    } catch (error: unknown) {
        return createErrorResponse(error)
    }
}