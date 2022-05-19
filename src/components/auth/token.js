import { saveToStorage } from "./storage.js";
import { retrieveFromStorage } from "./storage.js";

const tokenKey = "token";

export function saveToken(token) {
    saveToStorage(tokenKey, token);
}

export function retrieveToken() {
    return retrieveFromStorage(tokenKey);
}