import axios from 'axios'

export const  NodeURL='http://localhost:8000'

export const apiRequest=axios.create({
    baseURL:NodeURL,
});

apiRequest.defaults.responseType='json'

apiRequest.interceptors.request.use(function(config){
    const authToken=localStorage.getItem("myapptoken")
    if(authToken){
        config.headers['Authorization']=authToken
    }
    return config;
})
const request=(Options)=>{
    const onsuccess=(response)=>{
        if(response?.data?.status==='00'){
        localStorage.removeItem('myapptolen')
        window.location('/')
    }
    return response.data
    }
    const onerror=(error)=>{
        if(error.response){

        }
        else{

        }
        return Promise.reject(error.response||error.message)
    }
    return apiRequest(Options).then(onsuccess).catch(onerror)
   
       
    
}
export default request;