const TOKEN_KEY = 'jwt';

export const getToken = () => {
    console.log(localStorage.getItem(TOKEN_KEY))
    return localStorage.getItem(TOKEN_KEY);

};

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

// porque no esta funcionando el get token 
