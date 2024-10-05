import { writable } from 'svelte/store';
import { axiosAPI } from '../api/axiosAPI';

export let holidays = writable([]);
export let weatherData = writable([]);
export let users = writable([]);
export let invites = writable([]);

export async function loadHolidays(success, error){
    await axiosAPI.get('/holiday/').then((response) => holidays.set(response.data)).then(success()).catch(error());
}

export async function loadHoliday(holidayId, success, error){
    await axiosAPI.get('/holiday/'+holidayId).then((response) => holidays.set([response.data])).then(success()).catch(error());
}

export async function loadHolidayUsers(holidayId, success, error){
    await axiosAPI.get("/holiday/"+holidayId+"/users").then((response) => users.set(response.data)).then(success()).catch(error());
}

export async function createHoliday(holiday, success, error){
    await axiosAPI.post("/holiday/", holiday).then(success()).catch(error());
}

export async function editHoliday(id, holiday, success, error){
    await axiosAPI.put("/holiday/"+id+"/", holiday).then(success()).catch(error());
}

export async function deleteHoliday(holiday, success, error){
    await axiosAPI.delete("/holiday/"+holiday+"/").then(success()).catch(error());
}

export async function switchOwner(holiday, data, success, error){
    await axiosAPI.put("/holiday/"+holiday+"/owner",data).then(success()).catch(error());
}

export async function loadInvites(success, error){
    await axiosAPI.get("/holiday/invite/").then((response) =>invites.set(response.data)).then(success()).catch(error());
}

export async function invite(holidayId, data, success,error){
    await axiosAPI.post("/holiday/"+holidayId+"/users",data).then(success()).catch(error());
}

export async function reactInvite(holidayId, data, succcess, error){
    await axiosAPI.put("/holiday/"+holidayId+"/invite",data).then(success()).then(error());
}

export async function weather(holidayId, success, error){
    await axiosAPI.get("/holiday/" + holidayId + "/weather/").then((response) => weatherData.set(response.data)).then(success()).catch(error());
}