import { setToken, getToken } from './token';
import { baseUrl } from './config';

/*const autorize = (mail, pasword) => {
    return fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: mail, password: pasword }),
    });
});
*/
const GetInfo = async () => {
    const response = await fetch(`${baseUrl}/users/me`, {
        headers: {
            //'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Authorization': `${getToken()}`,
        },
    });
    const data = await response.json();
    return data;
};
const signup = async (userData) => {
    const response = await fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (response.status === 400) {
        return { error: 'Invalid email or password' };
    }
    return response.json();
};

const signin = async (userData) => {
    const response = await fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (response.status === 400) {
        return { error: 'Invalid email or password' };
    }
    const data = await response.json();
    setToken(data.token);
    //localStorage.setItem('token', data.token); // Guarda el token en el almacenamiento local
    return data;
};


const fetchData = async (endpoint) => {
    const token = getToken();
    const response = await fetch(`${baseUrl}${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
};


export { signup, signin, fetchData, GetInfo };