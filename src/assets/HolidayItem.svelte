<script>
    import {Link} from "svelte-routing";
    import {deleteHoliday} from "../lib/store/holidayStore.js";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    export let title;
    export let description;
    export let date_start;
    export let date_end;
    export let userNumber = 0;
    export let holidayId;

    async function onClick() {
        await deleteHoliday(holidayId);
        dispatch("delete");
    }
</script>
<Link class="card border-primary mb-3 m-2" to="/holiday/{holidayId}" style="max-width: 20rem;">
    <div class="card-body">
        <h4 class="card-title">{title}</h4>
        <div class="card-subtitle text-muted">{date_start} - {date_end} </div>
        <p class="card-text">{description.length > 50 ? description.substring(0, 50) + "..." : description}</p>
        <button class="btn btn-outline-danger" on:click|preventDefault={onClick}>Supprimer</button>
    </div>
</Link>