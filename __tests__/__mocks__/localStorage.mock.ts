export class LocalStorageMock {
    private store: { [key: string]: string } = {}

    setItem(key: string, value: string) {
        return this.store[key] = String(value)
    }

    getItem(key: string) {
        return this.store[key] || null
    }

    removeItem(key: string) {
        delete this.store[key]
    }

    clear() {
        this.store = {}
    }
}

Object.defineProperty(window, 'localStorage', {
    value: new LocalStorageMock()
})