//进行远程调用
import axios from 'axios'
//包装param参数
import qs from 'qs'
// 声明基础访问地址
axios.defaults.baseURL ='http://x238742m66.wicp.vip'

//声明一个调用方法
export const requestLogin = params => {return axios.post('/login',qs.stringify(params)).then(res => res.data)}
export const userList = params => {return axios.get('/Admin/getUsers',qs.stringify(params)).then(res => res.data)}
export const addUser = params => {return axios.get('/Admin/addUser',qs.stringify(params)).then(res => res.data)}
