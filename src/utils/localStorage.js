// thao tác với localStorage
//
export const getLocalStorage = (key) => {
  if (localStorage.getItem(key) || localStorage.getItem(key) === "") {
    console.log("local: ", localStorage.getItem(key));
    return JSON.parse(localStorage.getItem(key));
  }
  return null;
};

export const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key) => {
  return localStorage.removeItem(key);
};
//
