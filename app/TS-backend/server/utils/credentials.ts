// If needed to secure it further: Encrypt the password string inside the in-memory storage encapsulation,
// and then decrypt the string when needed, using an environment variable.

import { credentialsHandlers } from "../../../@types/@type-module"

 const createCredentialStorage = (): credentialsHandlers => {
    const storage = new Map()
    const setKey = (key:string): void => {
        storage.set("key", key)
    }
    const getKey = (): string => {
        const key: string = storage.get("key")
        if (!key) throw new Error("<customThrownError::>No key has been created")
        return key
    }
    return {
        setKey,
        getKey
    }
}

export const credentials = createCredentialStorage()

