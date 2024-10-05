<script>
    import {createHoliday} from "../store/holidayStore.js";
    import {navigate} from "svelte-routing";
    import EncodingForm from "../../assets/EncodingForm.svelte";

    async function send() {
        await createHoliday({
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
            }
        }, () => {
            navigate("/", {replace: true});

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
        title="Créer votre vacance"
        bind:name={name}
        bind:description={description}
        bind:date_start={date_start}
        bind:date_end={date_end}
        bind:addr={addr}
        on:send={send}/>