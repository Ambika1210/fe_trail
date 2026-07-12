import axios from "axios";

const baseUrl = "http://localhost:3000";

export const getAllUsersApi = async () => {
    const token = localStorage.getItem("token");

    return await axios.get(
        `${baseUrl}/v1/users/get-all-users`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const createUserApi = async (data) => {
    const token = localStorage.getItem("token");

    return await axios.post(
        `${baseUrl}/v1/users/create-user`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getUserByIdApi = async (userId) => {
    const token = localStorage.getItem("token");

    return await axios.get(
        `${baseUrl}/v1/users/${userId}/get-user-by-id`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const updateUserApi = async (userId, data) => {
    const token = localStorage.getItem("token");

    return await axios.put(
        `${baseUrl}/v1/users/${userId}/update-user`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const deleteUserApi = async (userId) => {
    const token = localStorage.getItem("token");

    return await axios.delete(
        `${baseUrl}/v1/users/${userId}/delete-user`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const loginUserApi = async (data) => {
    const token = localStorage.getItem("token");

    return await axios.post(
        `${baseUrl}/v1/users/login-user`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};