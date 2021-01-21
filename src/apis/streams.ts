import axios from 'axios';

interface axios {
    baseURL: string;
}
const config:axios =  {
    baseURL: "http://localhost:3001"
}

export default axios.create(config)
   