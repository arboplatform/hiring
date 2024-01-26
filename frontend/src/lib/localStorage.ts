const KEY_TOKEN = "@token";

export const setToken = (value: string) => {
  localStorage.setItem(KEY_TOKEN, value);
};

export const getToken = () => {
  return localStorage.getItem(KEY_TOKEN);
};

export const clearToken = () => {
  localStorage.removeItem(KEY_TOKEN);
};
