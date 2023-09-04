export function getLocalStorage() {
  if ("localStorage" in window) return window.localStorage;
}

export function setLocalStorageItem(k: string, v: string) {
  getLocalStorage()?.setItem(k, v);
}

export function getLocalStorageItem(k: string): string | null | void {
  return getLocalStorage()?.getItem(k);
}
