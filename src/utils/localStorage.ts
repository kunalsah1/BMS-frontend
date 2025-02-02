export const setItemInLocalStorage = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getItemInLocalStorage = (key: string) =>
  JSON.parse(localStorage.getItem(key)!);
