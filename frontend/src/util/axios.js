import axios from 'axios';

const instance = axios.create({
    baseURL: '/api/v1',
});

// Add a response interceptor
instance.interceptors.response.use(null, function (response) {
    if (response.response.status === 401) {
        window.location.href = '/api/v1/auth/oauth/google';
    }
});


export default instance;
