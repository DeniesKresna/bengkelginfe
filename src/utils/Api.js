import axios from "axios";
import _ from "lodash";
// import { useToast } from "vue-toastification";
import { useLayoutStore } from "../pages/layout/store";

const apiAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const isDev = import.meta.env.VITE_APP_ENV == "dev";

const serializeUrlQuery = function (obj) {
  if (_.isEmpty(obj)) return "";
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return "?" + str.join("&");
};

// // const toast = useToast();
// let msg = "kesalahan tidak diketahui";
// if(response.data.message != ""){
//   msg = response.data.message
// }
// // toast.success(msg, {
// //   timeout: 2000,
// // });

apiAxios.defaults.timeout = 10000;
apiAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    
    const layoutStore = useLayoutStore();
    layoutStore.requestIncrease();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
apiAxios.interceptors.response.use(
  (response) => {
    const layoutStore = useLayoutStore();
    layoutStore.requestDecrease();
    if (response.status == 200) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject(error.response.data);
  }
);

export const api = {
  get: function (url = "", payload = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await apiAxios.get(url, serializeUrlQuery(payload));
        resolve(res);
      } catch (error) {
        if (isDev) {
          console.log("ERROR GET API: " + url + ", error:", error);
        }
        reject(false);
      }
    });
  },
  post: function (url = "", payload = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await apiAxios.post(url, payload);
        resolve(res);
      } catch (error) {
        if (isDev) {
          console.log("ERROR POST API: " + url + ", error:", error);
        }
        reject(false);
      }
    });
  },
  put: function (url = "", payload = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = apiAxios.put(url, payload);
        resolve(res);
      } catch (error) {
        if (isDev) {
          console.log("ERROR PUT API: " + url + ", error:", error);
        }
        reject(false);
      }
    });
  },
  delete: function (url = "") {
    return new Promise(async (resolve, reject) => {
      try {
        let res = apiAxios.delete(url);
        resolve(res);
      } catch (error) {
        if (isDev) {
          console.log("ERROR DELETE API: " + url + ", error:", error);
        }
        reject(false);
      }
    });
  },
};

export default api;
