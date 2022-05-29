export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function retrieveFromStorage(key) {
    const value = localStorage.getItem(key);

    if (!value) {
        return null;
    }

    return JSON.parse(value);
}