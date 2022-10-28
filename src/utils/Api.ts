import axios from 'axios'
import * as config from './config'

const instance = axios.create({
    baseURL:config.BASE_URL.toString(),
    timeout:8000,
    timeoutErrorMessage:"timeout"
})

instance.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>{
        if (error.response) {

            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
    }
)

const Api = async () => {
    return instance
}

export default Api