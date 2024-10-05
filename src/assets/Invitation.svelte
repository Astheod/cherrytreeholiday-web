<script>
    import {reactInvite} from "../lib/store/holidayStore.js";
    import {createEventDispatcher, onMount} from 'svelte';

    const dispatch = createEventDispatcher();

    export let holidayId;
    export let holidayName;

    function accept(){
        reactInvite(holidayId, {action: true}, () => {}, () => {});
    }

    function decline(){
        reactInvite(holidayId, {action: false}, () => {}, () => {});
    }

   onMount(() => {
       let width = 100;
       var elem = document.getElementById("myBar");

       function movePorgress(){
           if(width == 1) return;
           setTimeout(() => {
               width--;
               elem.style.width = width + "%";
               movePorgress();
           }, 300);
       }

       movePorgress();
   });

    setTimeout(() => {
        dispatch('expire', {});
    }, 30000);
</script>

<div>
    <p>Vous avez été inviter à rejoindre la vacance {holidayName} !</p>
    <button on:click={accept} class="btn-outline-primary btn">Accepter</button>
    <button on:click={decline} class="btn-outline-primary btn">Refuser</button>
    <slot></slot>
    <div id="myProgress">
        <div id="myBar"></div>
    </div>
</div>

<style>
    #myProgress {
        width: 100%;
        background-color: grey;
    }

    #myBar {
        width: 100%;
        height: 8px;
        background-color: green;
    }
</style>