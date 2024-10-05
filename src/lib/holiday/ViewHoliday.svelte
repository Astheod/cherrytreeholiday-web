<script>
    import {holidays, loadHoliday, weather, weatherData} from "../store/holidayStore.js";
    import HolidayUsers from "./HolidayUsers.svelte";
    import {Link, navigate} from "svelte-routing";
    import ListActivities from "../../assets/ListActivities.svelte";

    export let holidayId;

    let holiday;
    $: weatherValue = {
        main: {
            temp : 0
        },
        weather: [
            {
                description: "NaN",
                icon: ""
            }]
    };
    holidays.subscribe((holidays) => {
        if(!holidays) return;
        holiday = holidays[0];
    });

    weatherData.subscribe((weatherData) => {
        if(!weatherData) return;
        weatherValue = weatherData;
    });


    function exportSchedule(){
        fetch("http://localhost:4000/holiday/"+holidayId+"/schedule")
            .then(resp => resp.status === 200 ? resp.blob() : Promise.reject('something went wrong'))
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = holidayId+'.ics';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(() => alert('oh no!'));
    }

    function edit() {
        navigate("/holiday/"+holidayId+"/edit");
    }

    loadHoliday(holidayId, () => {}, () => {});
    weather(holidayId, () => {}, () => {});
</script>

{#if holiday}
    <body class="text-lg-center">
    <div class="container-fluid">
        <h1 class="mb-1">{holiday.name}</h1>
        <h4 class="mt-2">{holiday.dateStart} - {holiday.dateEnd}</h4>
        <div class="my-4">
            <button on:click={edit} class="btn-primary btn mx-2">Editer</button>
            <Link to="/holiday/{holidayId}/chat" class="btn-primary btn mx-2">Chatter</Link>
            <button on:click={exportSchedule} class="btn-primary btn mx-2">Exporter</button>
        </div>
        <div>
            <h4 class="mt-2" >Météo à {holiday.address.city}:</h4>
            <div class="my-4">
                {#if weatherValue.weather[0].description === "NaN"}
                    Pas de données météo pour cette ville.
                {:else}
                    {weatherValue.main.temp}°C, le temps est {weatherValue.weather[0].description}.
                    <img src="https://openweathermap.org/img/wn/{weatherValue.weather[0].icon}@2x.png" alt="icon">
                {/if}

            </div>

        </div>
        <div>
            <h4 class="mt-2">Description :</h4>
            <div class="my-4">{holiday.description}</div>
        </div>
        <div>
            <h4 class="mt-2">Adresse :</h4>
            <div> Rue de {holiday.address.street} {holiday.address.number}, {holiday.address.code_postal} {holiday.address.city} {holiday.address.country}</div>
        </div>

        <div class="row">
            <HolidayUsers
                    bind:holidayId={holidayId}
                    bind:isOwner={holiday.owner}/>
            <ListActivities
                    bind:holidayId={holidayId}
            />
        </div>
    </div>
    </body>
{/if}

