import axios from "axios";
import { baseUrl, headers } from "./constants/Constance";

const instance = axios.create({
    headers: headers,  
    baseURL: baseUrl,
    withCredentials: true,
});

export default instance;