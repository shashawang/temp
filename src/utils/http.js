import axios from "axios";
// var qs = require('qs');

// window.SERVICE_CONTEXT_PATH = 'http://139.159.198.238:8356/imapcloud'
// window.SERVICE_CONTEXT_PATH = 'http://192.168.10.50:8356/imapcloud'
window.PRODUCTION_CONTEXT_PATH = 'http://139.159.198.238:8356/imapcloud'
window.SERVICE_CONTEXT_PATH = import.meta.env.MODE == 'development' ? 'http://192.168.10.120:8356/imapcloud' : window.PRODUCTION_CONTEXT_PATH
// window.SERVICE_CONTEXT_PATH = window.PRODUCTION_CONTEXT_PATH
window.PREVIEW_PATH = import.meta.env.MODE == 'development' ? 'http://localhost:13000/app' : 'https://geoai.com/app'
// window.PREVIEW_PATH = import.meta.env.MODE == 'development' ? 'http://192.168.10.173:13000/app/' : 'https://geoai.com/app'
// window.PREVIEW_PATH = 'https://geoai.com/app'
//token拦截
//测试dev_zkyt分支
window.axiosCancel = []  // 全局定义一个存放取消请求的标识
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//响应拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (axios.isCancel(error)) {
      console.log('repeated request: ' + error.message)
      return
    }
    return Promise.reject(error)
  }
)
axios.defaults.baseURL = window.SERVICE_CONTEXT_PATH;
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  axios.defaults.baseURL = window.SERVICE_CONTEXT_PATH;
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        //  防止取消请求之后的报错
        if(!response){
          return
        }
        if (response.data) {
          resolve(response.data);
        } else {
          console.log("get 请求数据返回 - ", response);
          reject(new Error("数据解析失败"));
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

// export function post(url, data = {}) {
//   axios.defaults.baseURL = window.SERVICE_CONTEXT_PATH;new Promise((resolve, reject) => {
//     axios.post(url, data).then(
//       response => {
//         //  防止取消请求之后的报错
//         if(!response){
//           return
//         }
//         if (response.data) {
//           console.log('response: ', response);
//           resolve(response.data);
//         } else {
//           console.log("post 请求数据返回 - ", response);
//           reject(new Error("数据解析失败"));
//         }
//       },
//       err => {
//         reject(err);
//       }
//     );
//   });
// }
export function post(url, data = {}, config){
  return new Promise((resolve, reject) => {
    axios.post(url, data, config).then(
      response => {
        console.log('response: ', response);
          resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

export default {get, post}

