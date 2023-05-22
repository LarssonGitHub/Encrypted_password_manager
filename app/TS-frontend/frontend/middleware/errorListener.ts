import { editDocumentFeedback } from "../renderer.js"

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

export const errorListener = async (func: Function, args ? : unknown): Promise < void  > => {
    try {
        await func(args);
    } catch (error: unknown) {
        sanitizeError(error)
    }
}