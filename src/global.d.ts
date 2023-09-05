declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

interface Window {
  App: {
    productName: string;
    version: string;
    store: {
      getValue: (key: string) => Promise<unknown>;
      setValue: (key: string, value: string) => Promise<void>;
    };
  };
}
