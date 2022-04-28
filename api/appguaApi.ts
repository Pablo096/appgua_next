import axios  from "axios";

const appguaApi = axios.create({
    baseURL: 'https://us-central1-appgua-usuario-dev.cloudfunctions.net/restAdmin/rest/'
    
})

export default appguaApi;