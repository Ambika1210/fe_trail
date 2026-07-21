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

// Hotel APIs
export const createHotelApi = async (data) => {
    const token = localStorage.getItem("token");

    return await axios.post(
        `${baseUrl}/v1/hotels/create-hotel`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getAllHotelsApi = async () => {
    const token = localStorage.getItem("token");

    return await axios.get(
        `${baseUrl}/v1/hotels/get-all-hotels`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const deleteHotelApi = async (hotelId) => {
    const token = localStorage.getItem("token");

    return await axios.delete(
        `${baseUrl}/v1/hotels/${hotelId}/delete-hotel`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const switchHotelApi = async (hotelId) => {
    const token = localStorage.getItem("token");

    return await axios.post(
        `${baseUrl}/v1/hotels/${hotelId}/switch-hotel`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const switchBackSuperAdminApi = async () => {
    const token = localStorage.getItem("token");

    return await axios.post(
        `${baseUrl}/v1/hotels/switch-back-super-admin`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

// Room APIs
export const createRoomApi = async (data) => {
    const token = localStorage.getItem("token");

    return await axios.post(
        `${baseUrl}/v1/rooms/create-room`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getAllRoomsApi = async (hotelId = null) => {
    const token = localStorage.getItem("token");
    const url = hotelId
        ? `${baseUrl}/v1/rooms/get-all-rooms?hotelId=${hotelId}`
        : `${baseUrl}/v1/rooms/get-all-rooms`;

    return await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getRoomByIdApi = async (roomId) => {
    const token = localStorage.getItem("token");

    return await axios.get(
        `${baseUrl}/v1/rooms/${roomId}/get-room-by-id`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const updateRoomApi = async (roomId, data) => {
    const token = localStorage.getItem("token");

    return await axios.put(
        `${baseUrl}/v1/rooms/${roomId}/update-room`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const deleteRoomApi = async (roomId) => {
    const token = localStorage.getItem("token");

    return await axios.delete(
        `${baseUrl}/v1/rooms/${roomId}/delete-room`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};