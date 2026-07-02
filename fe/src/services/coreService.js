import axios from "axios";

const baseUrl = "http://localhost:3000";

export const getAllUsersApi = async () => {
    return await axios.get(
        `${baseUrl}/v1/users/get-all-users`
    );
};

export const createUserApi = async (data) => {
    return await axios.post(
        `${baseUrl}/v1/users/create-user`,
        data
    );
};

export const getUserByIdApi = async (userId) => {
    return await axios.get(
        `${baseUrl}/v1/users/${userId}/get-user-by-id`
    );
};

export const updateUserApi = async (userId, data) => {
    return await axios.put(
        `${baseUrl}/v1/users/${userId}/update-user`,
        data
    );
};

export const deleteUserApi = async (userId) => {
    return await axios.delete(
        `${baseUrl}/v1/users/${userId}/delete-user`
    );
};