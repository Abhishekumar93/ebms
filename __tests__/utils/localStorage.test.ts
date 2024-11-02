import { addLocalStorageData, clearLocalStorage, getLocalStorageData, removeLocalStorageData } from "@/utils/localStorage.utils"
import { LocalStorageMock } from "../__mocks__/localStorage.mock"

// let localStorage: LocalStorageMock = new LocalStorageMock()

describe('Local storage', () => {
    let localStorage: LocalStorageMock;

    beforeEach(() => {
        localStorage = new LocalStorageMock();
        Object.defineProperty(window, 'localStorage', {
            value: localStorage,
        });
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('Should store item in local storage', () => {
        addLocalStorageData('test', 'value')
        expect(localStorage.getItem('test')).toBe('value')
    })

    it('Should store array in local storage', () => {
        const valueToStore = [{ id: 1, name: 'Abhishek' }, { id: 2, name: 'Prem' }]
        addLocalStorageData('test', JSON.stringify(valueToStore))
        const storedValue = localStorage.getItem('test')
        expect(storedValue).not.toBe(null)
        if (storedValue) {
            expect(JSON.parse(storedValue)).toStrictEqual(valueToStore)
        }
    })

    it('Get item from local storage', () => {
        localStorage.setItem('test', 'value')
        expect(getLocalStorageData('test')).toBe('value')
    })

    it('Remove item from local storage', () => {
        localStorage.setItem('test', 'value')
        expect(getLocalStorageData('test')).toBe('value')
        expect(removeLocalStorageData('test')).toBe(undefined)
    })

    it('Clear item from local storage', () => {
        localStorage.setItem('test', 'value')
        expect(getLocalStorageData('test')).toBe('value')
        clearLocalStorage()
        expect(removeLocalStorageData('test')).toBe(undefined)
    })
})