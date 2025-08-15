import axios from './axios';

export const getActiveCompanies = async () => {
    try {
        const res = await axios.get('/active');
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const getDeletedCompanies = async () => {
    try {
        const res = await axios.get('/deleted');
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const createCompany = async (companyData) => {
    try {
        const res = await axios.post('/new', companyData);
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const updateCompany = async (id, companyData) => {
    try {
        const res = await axios.post(`/edit/${id}`, companyData);
        return res.data;
    } catch (err) {
        throw err;
    }
};

// nowa funkcja: usuń firmę
export const deleteCompany = async (id) => {
    try {
        const res = await axios.post(`/delete/${id}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

// nowa funkcja: włącz/wyłącz aktywność firmy
export const toggleCompanyActive = async (id) => {
    try {
        const res = await axios.post(`/toggle-active/${id}`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const reviewCompany = async (id) => {
    try {
        const res = await axios.get(`/review/${id}`);
        return res.data;
    } catch (err) {
        throw err;
    }
}
