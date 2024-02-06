import axios from "axios";

const BASE_URL = 'http://localhost:8002';
const USERS_ENDPOINT = '/users';


const headers = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const fetchAllUsers = async (token) => {

    try {
        const response = await axios.get(
            `${BASE_URL}${USERS_ENDPOINT}/all/`,
            headers(token)
            );
        return response.data;
    } catch (error) {
        console.error("Error fetching all Users", error);
        throw (error);
    }
}

export async function deleteUser(token, userId) {

    try {
        await axios.delete(
            `${BASE_URL}${USERS_ENDPOINT}/${userId}/`,
            headers(token)
            );
    } catch (error) {
        console.error("Error deleting user", error);
        throw (error);
    }
}


export const login = async (name, password) => {

    try {
        const response = await axios.post(
            `${BASE_URL}${USERS_ENDPOINT}/login/`,
            {
                name: name,
                password: password,
            });
        return response.data;
    } catch (error) {
        console.error("Error with login", error);
        throw error
    }
}

export async function registerUser(name, password, role) {

    try {
        await axios.post(
            `${BASE_URL}${USERS_ENDPOINT}/register/`,
            {
                name: name,
                password: password,
                role: role
            }
        );
    } catch (error) {
        console.error("Error with registration", error);
        throw error;
    }
}
