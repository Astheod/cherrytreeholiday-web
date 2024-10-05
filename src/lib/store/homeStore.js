import { writable } from 'svelte/store';
import { axiosAPI } from '../api/axiosAPI';

export let errorMessage = writable("");
export let numberOfUser = writable(0);
export let graphUsers = writable([]);

export async function getNumberOfUser(success, error){
    await axiosAPI.get('/statistics/users').then((response) => numberOfUser.set(JSON.parse(response.data.number))).then(success()).catch(error());
}

export async function askGraph(date, success, error){
    await axiosAPI.get('/statistics/country/'+date+'/').then((response) => graphUsers.set(response.data)).then(success()).then(error());
}


export async function sendContactForm(reply, content) {
    await axiosAPI
        .post('/contact', {
            reply: reply,
            content: content
        })
        .catch((error) => {
            errorMessage.set(error.response);
        });
}