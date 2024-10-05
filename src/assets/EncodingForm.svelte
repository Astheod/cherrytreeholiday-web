<script>
    import AddressForm from "./AddressForm.svelte";
    import {DateInput} from "date-picker-svelte";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let name;
    export let description;
    export let date_start;
    export let date_end;
    export let addr;

    export let title = "Yes";

    function send() {
        dispatch("send");
    }
</script>

<body class="text-center">
<div class="container">
    <h3>{title} :</h3>
    <form class="d-flex flex-column">
        <input class="form-control m-1" bind:value={name} placeholder="Titre"/>
        <input class="form-control m-1" bind:value={description} placeholder="description"/>
        <div class="d-flex justify-content-center ">
            <DateInput bind:value={date_start} class="form-control-lg m-1" format="yyyy-MM-dd" placeholder="Date de départ" />
            <DateInput bind:value={date_end} class="form-control-lg m-1" format="yyyy-MM-dd" dynamicPositioning=true placeholder="Date de fin" />
        </div>
        <AddressForm bind:country={addr.country} bind:city={addr.city} bind:code_postal={addr.code_postal} bind:street={addr.street} bind:number={addr.number}/>
        <button on:click={send} class="btn btn-outline-primary align-self-center m-3">Envoyer</button>
    </form>
</div>
</body>