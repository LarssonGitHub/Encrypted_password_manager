const logError = (error: Error): void => {
    console.error(error.message === undefined ? "No error message was given" : error.message)
    // TODO, develop a way give feedback to user. 
    // createErrorPopUp()
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