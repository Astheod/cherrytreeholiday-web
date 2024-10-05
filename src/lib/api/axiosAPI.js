import axios from "axios";

const secure = true;
const baseURL = "192.168.128.12:5006/e200033";

export const axiosAPI = axios.create({
    baseURL: "http"+(secure ? "s":"")+"://"+baseURL,
    headers: {},
});

axiosAPI.interceptors.response.use(
    (success) => {
        if(success.status == 200) return success;
        return Promise.reject(new Error("response code "+success.status));
    },
    (error) => Promise.reject(error));

export const setApiToken = (token) => {
    axiosAPI.defaults.headers["Authorization"] = token;
};

export const webSocket = (route) => {
    return new WebSocket("ws"+(secure ? "s":"")+"://"+baseURL+route);
}