// "use client";

export const addLocalStorageData = (key: string, data: string) => {
  localStorage.setItem(key, data);
};

export const getLocalStorageData = (key: string) => {
  return localStorage.getItem(key);
};

export const removeLocalStorageData = (key: string) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
