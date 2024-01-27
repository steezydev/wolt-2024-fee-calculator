import ThemeSwitch from './ThemeSwitch';
import {
  themeSwitchEventTests,
  themeSwitchRenderTests,
} from './ThemeSwitch.tests';

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
  addListener: jest.fn(), // Deprecated but included for completeness
  removeListener: jest.fn(), // Deprecated but included for completeness
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn().mockImplementation((key: string) => {
        return localStorageMock.getItem(key);
      }),
      setItem: jest.fn().mockImplementation((key: string, value: string) => {
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

themeSwitchRenderTests('ThemeSwitch', ThemeSwitch);
themeSwitchEventTests('ThemeSwitch', ThemeSwitch);
