/// <reference types="vite/client" />

declare global {
  interface Window {
    signinModal: () => void;
  }
}
