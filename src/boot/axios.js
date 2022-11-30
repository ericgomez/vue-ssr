import axios from 'axios';

export default ({ Vue }) => {
  const axiosInstance = axios.create({
    baseURL: process.env.AXIOS_URL
  });

  Vue.prototype.$axios = axiosInstance;
};
