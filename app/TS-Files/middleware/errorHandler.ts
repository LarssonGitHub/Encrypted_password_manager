// TODO annotate the types better than unknown once the structure of the responses have been finalized
// https://www.youtube.com/watch?v=UdekNaCXt6w&ab_channel=DevInfluence

// Middleware ErrorHandler to minimize use of try / catch
const showSuccess = (response: unknown): void => {
    console.log("The action finished. Message: ", response === undefined ? "No message given" : response)
}

const showError = (error: unknown): void => {
    console.log("An error occurred: Error", error);
}

const errorHandler = async (func: Function, args: unknown) => {
       try {
        const functionResponse = await func(args);
        showSuccess(functionResponse)
    } catch (error) {
        showError(error)
    }
}

// TODO debug if this is better than the one above.
// const errorHandler = (func: Function, args: unknown) => {
//     const asyncFunction = async (func: Function) =>  {
//         try {
//             // Do not remove await, in case the error wrapper's function 
//             // passed as parameter is a promise
//             const functionResponse: unknown = await func(args);
//              console.log("The action finished. Message: ", functionResponse === undefined ? "No message given" : functionResponse)
//         } catch (error) {
//              console.log("An error occurred, writing to custom middleware: Error", error);
//         }
 
//     }
//     // Used to catch the final promise by errorHandler in case promise needs to be caught
//     asyncFunction(func).then(message => console.log("parent promise", message)).catch(error => console.log("Failure parent promise", error))
// }
