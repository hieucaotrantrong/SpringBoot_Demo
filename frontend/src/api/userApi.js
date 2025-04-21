import axios from 'axios';

export const createUser = (data, token) =>
    axios.post('/api/users/create', data, {
        headers: { Authorization: `Bearer ${token}` }
    });
