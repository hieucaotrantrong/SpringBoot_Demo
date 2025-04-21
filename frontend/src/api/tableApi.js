import axios from 'axios';

export const createTable = (data, token) =>
    axios.post('/api/tables/create', data, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const getAllTables = () => axios.get('/api/tables/all');
