import { writable, derived } from "svelte/store";
import { axiosAPI, setApiToken } from "../api/axiosAPI";

export let isAuthenticated = writable(false);

export const usersData = writable([]);
let token = null;
export const usersArray = derived(usersData, ($usersData) => {
    if (Array.isArray($usersData)) {
        return $usersData;
    } else {
        return [];
    }
});

export function getToken(){
    return token;
}

export async function alreadyConnected(){
    if (localStorage.getItem("TOKEN_KEY") != null){
        token = localStorage.getItem("TOKEN_KEY");
        let stampTime = JSON.parse(atob(token.split(".")[1]))["exp"];
        if (stampTime * 1000 < Date.now()){
            setToken(null);
            return;
        }
        setToken(token);
    }
}

export async function login(data, success, error){
    await axiosAPI.post('/login', data).then((response) => setToken(response.headers.authorization)).then(success()).catch(error());
}

export async function register(data, success, error){
    await axiosAPI.post('/register', data).then((response) => setToken(response.headers.authorization)).then(success()).catch(error());
}

export async function external(data, success, error){
    await axiosAPI.post('/externalLogin/'+data.type, data.payload).then((response) => setToken(response.headers.authorization)).then(success()).catch(error());
}


export async function logout(){
    setToken(null);
}


function setToken(value) {
    if (value != null) {
        localStorage.setItem("TOKEN_KEY", value);
        token = value;
        isAuthenticated.set(true);
    }else{
        localStorage.removeItem("TOKEN_KEY");
        token = null;
        isAuthenticated.set(false);
    }
    setApiToken(value);
}