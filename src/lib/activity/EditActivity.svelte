<script>
    import EncodingForm from "../../assets/EncodingForm.svelte";
    import {activities, loadActivity} from "../store/activityStore.js";
    import {editActivity} from "../store/activityStore.js";
    import {navigate} from "svelte-routing";

    export let activityId;
    export let holidayId;
    let name;
    let description;
    let date_start;
    let date_end;
    let addr = {
        country: "",
        city: "",
        code_postal: "",
        street: "",
        number: ""
    };

    async function send(){
        if(activityId){
            await editActivity(
                activityId,
                {
                    name: name,
                    description: description,
                    date_start: date_start.toISOString().substring(0,10),
                    date_end: date_end.toISOString().substring(0,10),
                    address: {
                        country: addr.country,
                        city: addr.city,
                        code_postal: addr.code_postal,
                        street: addr.street,
                        number: addr.number
                    },
                    holidayId: holidayId
                },
                () => {},
                () => {}
            );
            navigate("/activity/" + activityId);
        }
    }

    activities.subscribe((list) => {
        let activity = list[0];
        if(!activity) return;
        name = activity.name;
        description = activity.description;
        date_start = new Date(parseInt(activity.dateStart.substring(0, 4)), parseInt(activity.dateStart.substring(5, 7)) - 1, parseInt(activity.dateStart.substring(8, 10)));
        date_end = new Date(parseInt(activity.dateEnd.substring(0, 4)), parseInt(activity.dateEnd.substring(5, 7)) - 1, parseInt(activity.dateEnd.substring(8, 10)));
        addr = activity.address;
    });

    loadActivity(activityId, () => {}, () => {});
</script>

{#if addr}
    <EncodingForm
            title="Editer votre activité"
            bind:name={name}
            bind:description={description}
            bind:date_start={date_start}
            bind:date_end={date_end}
            bind:addr={addr}
            on:send={send}/>
{/if}