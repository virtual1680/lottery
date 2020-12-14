/**
 *
 *mac
 *2020/12/2
 *495301515@qq.com
 */
import axios from 'axios'
import {Message,Loading} from "element-ui";
/** 路由*/
// import qs from 'qs'
// import md5 from 'js-md5'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
const http = axios.create({
    // baseURL:"http://lottery.qycwang.com",
    baseURL:"/api",
    timeout:1000 * 15
});
let loadingInstance = null;
http.interceptors.request.use((config)=>{
    loadingInstance = Loading.service({text:'加载中...'});
    config.headers['Token'] = window.localStorage.getItem('Token');
    return config
},(error)=>{
    return Promise.reject(error)
});

http.interceptors.response.use((response)=>{
    let {data,status} = response;
    if (status === 200) {
        loadingInstance.close();
        if (data.code === "200") {
            return Promise.resolve(data.result)
        } if (data.code === "403") {
            window.localStorage.setItem("Token",'');
            window.location.reload()
        } else {
            Message.error(data.message);
            throw data.message
        }
    } else {
        loadingInstance.close();
        throw data.message
    }
},(error)=>{
    loadingInstance.close();
    return Promise.reject(error)
});

export default http
