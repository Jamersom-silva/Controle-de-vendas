import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
});

export const fetchData = async () => {
  try {
    const response = await api.get('/data');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
};

export default api;
