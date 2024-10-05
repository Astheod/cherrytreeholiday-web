<script>
    import {navigate} from "svelte-routing";
    import {createActivity} from "../store/activityStore.js";
    import EncodingForm from "../../assets/EncodingForm.svelte";

    export let holidayId;

    function send() {
        console.log(name)
        console.log(description)
        console.log(date_start)
        console.log(date_end)
        console.log(addr)
        createActivity({
            name: name,
            description: description,
            date_start: date_start.toISOString().substring(0, 10),
            date_end: date_end.toISOString().substring(0, 10),
            address: {
                country: addr.country,
                city: addr.city,
                code_postal: addr.code_postal,
                street: addr.street,
                number: addr.number
            },
            holidayId: holidayId

        }, () => {
            navigate("/holiday/" + holidayId, {replace : true});
        });
    }
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
</script>
<EncodingForm
        title="Créer votre activité"
        bind:name={name}
        bind:description={description}
        bind:date_start={date_start}
        bind:date_end={date_end}
        bind:addr={addr}
        on:send={send}/>