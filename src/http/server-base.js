import axios from "axios";
export const baseUrl = "https://loyalityapi.friensys.com/api/";
export const imgUrl = "https://loyalityapi.friensys.com/contents/"
import { store } from "../Store/Store"

const getAccessToken = () => {
  return store.getState().user.AuthInfo.accessToken
}

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export const api1 = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "multipart/form-data" },
});



export const baseFunc = (endURL) => {
  return (method, options) => {
    const getHeader = (token) => {
      if (token)
        return {
        
          Authorization: `Bearer ${getAccessToken()}`
        };
      else
        return {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
    }
    const params = options?.params ? "/" + options.params : "";
    let url = `/${endURL}${params}`;
    let token = options?.token ? true : false
    if (options?.postfix) {
      url += options.postfix;
    }
    let header = getHeader(token)

    if (method === "get") {
      console.log(url)
      return api.get(url, { headers: header });
    } else if (method === "post") {
      if (options.formdata) return api1.post(url, options?.data, { headers: header });
      else return api.post(url, options?.data, { headers: header });
    } else if (method === "put") {
      return api.put(url, options?.data, { headers: header });
    } else if (method === "delete") {
      return api.delete(url, {
        headers: header,
        data: JSON.stringify({ deleted: 1 }),
      });
    }
  };
};
