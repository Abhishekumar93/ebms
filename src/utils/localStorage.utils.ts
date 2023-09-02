// "use client";

export const addLocalStorageData = (key: string, data: string) => {
  localStorage.setItem(key, data);
};

export const getLocalStorageData = (key: string, subKey?: string) => {
  let data = localStorage.getItem(key);
  if (data && subKey) {
    let parsedData = JSON.parse(data);
    return parsedData[subKey];
  }
  return data;
};

export const removeLocalStorageData = (key: string) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
