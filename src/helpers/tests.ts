const localStorageMock = (function () {
    let store: Record<string, string> = {};
    return {
        getItem(key: string) {
            return store[key] || null;
        },
        setItem(key: string, value: string) {
            store[key] = value.toString();
        },
        clear() {
            store = {};
        },
    };
})();

const matchMediaMock = jest.fn().mockImplementation((query) => ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
}));

export const mockContext = () => {
    beforeAll(() => {
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn().mockImplementation((key: string) => {
                    return localStorageMock.getItem(key);
                }),
                setItem: jest
                    .fn()
                    .mockImplementation((key: string, value: string) => {
                        localStorageMock.setItem(key, value);
                    }),
                clear: localStorageMock.clear,
            },
            writable: true,
        });

        window.matchMedia = matchMediaMock;
    });

    beforeEach(() => {
        (window.localStorage.getItem as jest.Mock).mockClear();
        (window.localStorage.setItem as jest.Mock).mockClear();
        matchMediaMock.mockClear();
    });
};

export const setupFakeDate = () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2024-01-01'));
    });

    afterEach(() => {
        jest.useRealTimers();
    });
};

export const mockScrollTo = () => {
    beforeEach(() => {
        Element.prototype.scrollTo = jest.fn();
    });

    afterEach(() => {
        (Element.prototype.scrollTo as jest.Mock).mockRestore();
    });
};
