import {
    editFeedback
} from "../renderer.js"
import {
    backendResponse,
    errorResponse,
    eventResponse
} from "../../../@types/@type-module";

export const createResponse = (): eventResponse => {
    return {
        success: true,
    }
}

const logError = (error: Error): void => {
    const message = error.message === undefined ? "Error occurred; no message was given. Check the logs for more details." : error.message;
    editFeedback(message, true)
    console.error(message)
}

const logUnknownError = (error: unknown): void => {
    const message = "An error outside the error instance occurred; check the logs for more details.";
    editFeedback(message, true)
    console.error(message, error)
}

export const sanitizeError = (error: unknown): void => {
    if (error instanceof Error) return logError(error)
    logUnknownError(error)
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
export const eventErrorListener = async (func: Function): Promise < errorResponse | eventResponse > => {
    try {
        await func();
        return createResponse()
    } catch (error: unknown) {
        return createErrorResponse(error)
    }
}