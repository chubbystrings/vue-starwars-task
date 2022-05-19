import axios from "axios";
import { BASE_URL } from '../api/base_url'

export default axios.create({
    baseURL: BASE_URL,
})