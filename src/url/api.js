import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.openweathermap.org'
})

api.interceptors.request.use( (config) => {
    config.params = {
        'appid': import.meta.env.VITE_APIKEY,
        'units': 'metric',
        'lang': 'es'
    }
    return config;
})

export default api