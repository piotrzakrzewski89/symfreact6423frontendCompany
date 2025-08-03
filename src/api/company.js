import axios from './axios';

export const getCompany = async () => {
    try {
        const res = await axios.get('/api/list-company');
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const createCompany = async (companyData) => {
    try {
        const res = await axios.post('/api/new-company', companyData);
        return res.data; // zwróć wynik do komponentu
    } catch (err) {
        throw err; // przekaż błąd dalej do komponentu
    }
};