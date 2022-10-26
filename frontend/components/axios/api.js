import axios from 'axios';

export default axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://meusite.com/api'
})