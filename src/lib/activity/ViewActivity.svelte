<script>
    import { activities, loadActivity, deleteActivity} from "../store/activityStore.js";
    import {Link, navigate} from "svelte-routing";

    export let holidayId;
    export let activityId;


    let activity;
    activities.subscribe((activities) => {
        if(!activities) return;
        activity = activities[0];
    });

    function destroy() {
        deleteActivity(activityId, () => { navigate("/holiday/" + holidayId)}, () => {});
    }


    loadActivity(activityId, () => {}, () => {});
</script>

{#if activity}
    <body class="text-lg-center">
    <div class="container-fluid">
        <h1 class="mb-1">{activity.name}</h1>
        <h4 class="mt-2">{activity.dateStart} - {activity.dateEnd}</h4>
        <div>
            <h4 class="mt-2">Description :</h4>
            <div class="my-4">{activity.description}</div>
        </div>
        <div>
            <h4 class="mt-2">Adresse :</h4>
            <div>{activity.address.country} {activity.address.city} Rue de {activity.address.street} {activity.address.number}</div>
        </div>

        <Link to="/activity/{holidayId}/edit/{activityId}" class="btn-outline-primary btn mx-2">Editer</Link>
        {#if activity.owner === true}
            <button class="btn-outline-danger btn mx-2" on:click={destroy} >Supprimer</button>
        {/if}
    </div>
    </body>
{/if}
