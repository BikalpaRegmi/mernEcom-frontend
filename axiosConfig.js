import axios from "axios";

axios.defaults.withCredentials = true;

const instance = axios.create({
    baseURL: 'https://ecommerceappmern.onrender.com' || 'http://localhost:3333',
});
   
  export default instance