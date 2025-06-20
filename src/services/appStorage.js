export const appStorage = {
    getLocalStorage(key) {
        return localStorage.getItem(key);
    },
    getLocalStorageJSON(key,default_value=[]) {
        return this.getLocalStorage(key) != null ? JSON.parse(this.getLocalStorage(key)) : default_value;
    },
    setLocalStorage(key, value) {
        localStorage.setItem(key, value);
    },
    setLocalStorageJSON(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}