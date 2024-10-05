<script>
    import {holidays, loadHolidays} from "../store/holidayStore.js";
    import {Link} from "svelte-routing";
    import HolidayItem from "../../assets/HolidayItem.svelte";
    import {onMount} from "svelte";

    $ : holidayServant = [];

    holidays.subscribe(value => {
        holidayServant = value;
    });

    function reload() {
        loadHolidays(() => {}, () => {});

    }

    onMount(() => {
        setTimeout(() => {
            loadHolidays(() => {}, () => {});
        }, 100);
    });

</script>

<body class="text-center">
<div class="d-flex justify-content-center">
    <h1 class="h3 m-2 font-weight-normal">Mes vacances</h1>
    <Link class="btn-outline-success btn m-2" to="/holiday/create">+</Link>
</div>

<div class="container">

{#if (holidayServant.length > 0)}
    <div class="d-flex flex-row m-2">
    {#each holidayServant as holiday}
        <HolidayItem
                bind:holidayId={holiday.id}
                bind:title={holiday.name}
                bind:description={holiday.description}
                bind:date_start={holiday.dateStart}
                bind:date_end={holiday.dateEnd}
                on:delete={reload}/>
    {/each}
    </div>
{:else }
    <p>Vous ne participez à aucune vacances</p>
{/if}
</div>
</body>