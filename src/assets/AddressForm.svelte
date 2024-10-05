<script>
    import {countries} from './countryData.js';
    import Country from './Country.svelte';


    /* FILTERING countres DATA BASED ON INPUT */
    let filteredCountries = [];

    const filterCountries = () => {
        let storageArr = []
        if (country) {
            countries.forEach(utile => {
                if (utile.toLowerCase().startsWith(country.toLowerCase())) {
                    storageArr = [...storageArr, makeMatchBold(utile)];
                }
            });
        }
        filteredCountries = storageArr;
    }

    /* HANDLING THE INPUT */
    let searchInput; // use with bind:this to focus element

    $: if (!country) {
        filteredCountries = [];
        hiLiteIndex = null;
    }

    const setInputVal = (countryName) => {
        country = removeBold(countryName);
        filteredCountries = [];
        hiLiteIndex = null;
        document.querySelector('#country-input').focus();
    }

    const makeMatchBold = (str) => {
        let matched = str.substring(0, country.length);
        let makeBold = `<strong>${matched}</strong>`;
        return str.replace(matched, makeBold);
    }

    const removeBold = (str) => {
        return str.replace(/<(.)*?>/g, "");
    }


    /* NAVIGATING OVER THE LIST OF COUNTRIES W HIGHLIGHTING */
    let hiLiteIndex = null;
    $: hiLitedCountry = filteredCountries[hiLiteIndex];

    const navigateList = (e) => {
        if (e.key === "ArrowDown" && hiLiteIndex <= filteredCountries.length-1) {
            hiLiteIndex === null ? hiLiteIndex = 0 : hiLiteIndex += 1
        } else if (e.key === "ArrowUp" && hiLiteIndex !== null) {
            hiLiteIndex === 0 ? hiLiteIndex = filteredCountries.length-1 : hiLiteIndex -= 1
        } else if (e.key === "Enter") {
            setInputVal(filteredCountries[hiLiteIndex]);
        }
    }

    export let country;
    export let city;
    export let code_postal;
    export let street;
    export let number;
</script>
<svelte:window on:keydown={navigateList} />
<div class="d-flex justify-content-center flex-column m-1">
    <h4>Adresse :</h4>
    <div class="autocomplete">
        <input id="country-input"
               class="form-control m-1"
               type="text"
               placeholder="Pays"
               autocomplete="off"
               bind:this={searchInput}
               bind:value={country}
               on:input={filterCountries}>
    </div>
    {#if filteredCountries.length > 0}
        <ul class="dropdown-menu show">
            {#each filteredCountries as country, i}
                <Country itemLabel={country} highlighted={i === hiLiteIndex} on:click={() => setInputVal(country)} />
            {/each}
        </ul>
    {/if}

    <div class="d-flex">
        <input class="form-control m-1" bind:value={city} placeholder="Ville"/>
        <input class="form-control m-1" bind:value={code_postal} placeholder="Code postal"/>
    </div>
    <div class="d-flex">
        <input class="form-control m-1" bind:value={street} placeholder="Rue"/>
        <input class="form-control m-1" bind:value={number} placeholder="Numéro"/>
    </div>
</div>