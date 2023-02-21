import axios from 'axios'
import { BASE_URL } from './consts'

const pref = localStorage.getItem('user') 
const user = pref  && JSON.parse(pref)

export const makeRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization:`Bearer ${user?.token}`,
    },
})