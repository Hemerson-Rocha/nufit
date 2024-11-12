import axios from "axios";


export const api = axios.create({
    baseURL: 'https://nufitpro-nes-js.onrender.com/',
})