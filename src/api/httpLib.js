import axios from 'axios';


const httpLib = axios.create({
     baseURL: process.env.REACT_APP_API_BASE_URL
})

export default httpLib;