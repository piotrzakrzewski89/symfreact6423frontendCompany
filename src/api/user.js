import { axiosUser, axiosCompany } from './axios.js';

export const getActiveCompanies = async () => {
    try {
        const res = await axiosCompany.get('/company-list-form');
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const createUser = async (user) => {
    try {
        const res = await axiosUser.post('/new', user);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const updateUser = async (id, userData) => {
    try {
        const res = await axiosUser.post(`/edit/${id}`, userData);
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const getActiveUsers = async () => {
    try {
        const res = await axiosUser.get('/active');
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const getDeletedUsers = async () => {
    try {
        const res = await axiosUser.get('/deleted');
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const reviewUser = async (id) => {
    try {
        const res = await axiosUser.get(`/review/${id}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const deleteUser = async (id) => {
    try {
        const res = await axiosUser.post(`/delete/${id}`);
        return res.data;
    } catch (err) {
        throw err;
    }
}
export const toggleUserActive = async (id) => {
    try {
        const res = await axiosUser.post(`/toggle-active/${id}`);
        return res.data;
    } catch (err) {
        throw err;
    }
}
