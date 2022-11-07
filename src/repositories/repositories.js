import axios from "axios";

const baseURL = import.meta.env.KIDDIHUB_DM_API_URL

export default axios.create({
    baseURL,
    header: {
        'content-type': 'application/json'
    }
});