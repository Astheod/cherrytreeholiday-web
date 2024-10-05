import { writable } from 'svelte/store';
import { axiosAPI } from '../api/axiosAPI';

export let activities = writable([]);
export let users = writable([]);

export async function loadActivities(holidayId, success, error){
    await axiosAPI.get('/holiday/'+holidayId+'/activities').then((response) => activities.set(response.data)).then(success()).catch(error());
}

export async function loadActivity(activityId, success, error){
    await axiosAPI.get('/activity/'+activityId + "/").then((response) => activities.set([response.data])).then(success()).catch(error());
}

export async function loadActivityUsers(activityId, success, error){
    await axiosAPI.get("/activity/"+activityId+"/users").then((response) => users.set(response.data)).then(success()).catch(error());
}

export async function switchOwner(activityId, data, success, error){
    await axiosAPI.put("/activity/"+activityId+"/owner",data).then((response) => users.set(response.data)).then(success()).catch(error());
}

export async function createActivity(activity, success, error){
    await axiosAPI.post("/activity/", activity).then(success()).catch(error());
}

export async function editActivity(activityId, activity, success, error){
    await axiosAPI.put("/activity/"+activityId+"/", activity).then(success()).catch(error());
}

export async function deleteActivity(activityId, success, error){
    await axiosAPI.delete("/activity/"+activityId+"/").then(success()).catch(error());
}

/*export async function loadActivityUsers(activityId, data, success, error){
    await axiosAPI.post("/activity/"+activityId+"/users",data).then((response) => users.set(response.data)).then(success()).catch(error());
}*/