// Only used where modules can't be imported, like electron's frontend.

interface TBA {
    TBA: string
}

interface searchQueryBody {
    title: string,
        desc: string
}

interface websiteObject {id: string, websiteInput: string, emailInput: string, usernameInput: string, passwordInput: string, additionalDataInput: string}

type arrayOfWebsites = websiteObject[]

