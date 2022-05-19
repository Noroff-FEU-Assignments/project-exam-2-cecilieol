import { saveToStorage } from "./storage.js";
import { retrieveFromStorage } from "./storage.js";

const userKey = "user";

export function rememberUser(user) {
    saveToStorage(userKey, user);
}

export function retrieveUser() {
    const user = retrieveFromStorage(userKey);

    if (user) {
        return user.username;
    }

    return null;
}