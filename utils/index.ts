export const imageResourceName = (url: string) => {
  return url.split(".")[url.split(".").length - 2].split("/").pop();
};

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function setLocalStorageData<T>(key: string, data: T | null) {
  if (import.meta.client) {
    if (data) {
      window.localStorage.setItem(key, JSON.stringify(data));
    } else {
      window.localStorage.removeItem(key);
    }
  }
}

export function getLocalStorageData<T>(key: string) {
  if (import.meta.client) {
    const data = window.localStorage.getItem(key);
    if (data) {
      return JSON.parse(data) as T;
    }
    return null as T;
  }
  return null as T;
}
