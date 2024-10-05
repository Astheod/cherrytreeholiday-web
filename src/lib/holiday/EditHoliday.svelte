<script>
    import {editHoliday, holidays, loadHoliday} from "../store/holidayStore.js";
    import EncodingForm from "../../assets/EncodingForm.svelte";

    export let id;
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


    function send(){
        if(id){
            editHoliday(id, {
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
                }
            }, () => {}, () => {});
        }
    }

    holidays.subscribe((list) => {
        let holiday = list[0];
        if(!holiday) return;
        console.log(holiday);
        name = holiday.name;
        date_start = new Date(parseInt(holiday.dateStart.substring(0, 4)), parseInt(holiday.dateStart.substring(5, 7)) - 1, parseInt(holiday.dateStart.substring(8, 10)));
        date_end = new Date(parseInt(holiday.dateEnd.substring(0, 4)), parseInt(holiday.dateEnd.substring(5, 7)) - 1, parseInt(holiday.dateEnd.substring(8, 10)));
        description = holiday.description;
        addr = holiday.address;
    });

    loadHoliday(id, () => {}, () => {});
</script>

{#if addr}
    <EncodingForm
            title="Editer votre vacance"
            bind:name={name}
            bind:description={description}
            bind:date_start={date_start}
            bind:date_end={date_end}
            bind:addr={addr}
            on:send={send}/>
{/if}