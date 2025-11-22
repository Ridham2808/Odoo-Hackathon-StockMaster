import axios from 'axios';

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

// Request queue to prevent rate limiting
let requestQueue = [];
let isProcessing = false;
const REQUEST_DELAY = 100; // ms between requests

const processQueue = async () => {
  if (isProcessing || requestQueue.length === 0) return;
  
  isProcessing = true;
  const request = requestQueue.shift();
  
  try {
    await request();
  } finally {
    isProcessing = false;
    setTimeout(processQueue, REQUEST_DELAY);
  }
};

const queueRequest = (fn) => {
  return new Promise((resolve, reject) => {
    requestQueue.push(async () => {
      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
    processQueue();
  });
};

const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
axiosInstance.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Token added to request:', token.substring(0, 20) + '...');
  } else {
    console.warn('No auth token found in localStorage');
  }
  return config;
});

// Handle response errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Backend returns { ok: true, data: {...} }
    // Return the full response object so we can access response.data
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    const payload = error.response?.data || { 
      ok: false, 
      error: { 
        code: error.response?.status || 500,
        message: error.message || 'Request failed' 
      } 
    };
    throw {
      status: error.response?.status,
      payload,
    };
  }
);

export const api = {
  get: (path, params) => queueRequest(() => axiosInstance.get(path, { params })),
  post: (path, body) => queueRequest(() => axiosInstance.post(path, body)),
  put: (path, body) => queueRequest(() => axiosInstance.put(path, body)),
  patch: (path, body) => queueRequest(() => axiosInstance.patch(path, body)),
  delete: (path) => queueRequest(() => axiosInstance.delete(path)),
  del: (path) => queueRequest(() => axiosInstance.delete(path)),
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('authToken');
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};
