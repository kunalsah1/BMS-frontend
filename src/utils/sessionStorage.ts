export const setItemInSessionStorage = (key: string, value: any) =>
  sessionStorage.setItem(key, JSON.stringify(value));

export const getItemInSessionStorage = (key: string) =>
  JSON.parse(sessionStorage.getItem(key)!);
