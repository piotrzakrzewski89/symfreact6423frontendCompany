import { axiosAuth } from './axios.js';

export const loginApi = async (data) => {
    try {
        const res = await axiosAuth.post('/login-cms', data);
        return res.data;
    } catch (err) {
        throw err;
    }
};
