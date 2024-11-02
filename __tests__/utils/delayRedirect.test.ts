import { delayRedirect } from "@/utils/delayRedirect.utils";


describe('delayRedirect', () => {
    let originalLocation: Location;

    beforeAll(() => {
        originalLocation = window.location;
        delete (window as any).location;
        window.location = {
            ...originalLocation,
            href: '',
            origin: 'https://example.com',
        } as Location;
    });

    afterAll(() => {
        window.location = originalLocation;
    });

    beforeEach(() => {
        jest.useFakeTimers();
        window.location.href = '';
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should redirect after default 3 seconds', () => {
        const routeUrl = '/test-route';
        delayRedirect(routeUrl);

        expect(window.location.href).toBe('');

        jest.advanceTimersByTime(2999);
        expect(window.location.href).toBe('');

        jest.advanceTimersByTime(1);
        expect(window.location.href).toBe('https://example.com/test-route');
    });

    it('should redirect after specified interval', () => {
        const routeUrl = '/custom-route';
        const customInterval = 5000;
        delayRedirect(routeUrl, customInterval);

        expect(window.location.href).toBe('');

        jest.advanceTimersByTime(4999);
        expect(window.location.href).toBe('');

        jest.advanceTimersByTime(1);
        expect(window.location.href).toBe('https://example.com/custom-route');
    });

    it('should clear timeout when returned function is called', () => {
        const routeUrl = '/cancelled-route';
        const clearRedirect = delayRedirect(routeUrl);

        jest.advanceTimersByTime(1500);
        clearRedirect();
        jest.advanceTimersByTime(1500);

        expect(window.location.href).toBe('');
    });
});