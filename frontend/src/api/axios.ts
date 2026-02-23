import axios from 'axios'

const api = axios.create({
    // თუ VITE_API_URL არ არსებობს (მაგალითად, ლოკალურად), მაშინ გამოიყენებს localhost-ს.
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
});

export default api;