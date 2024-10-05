<script>
    import {webSocket} from "../lib/api/axiosAPI.js";
    import {getToken} from "../lib/store/userStore.js";
    import Invitation from "./Invitation.svelte";

    let ws = webSocket('/holiday/invites');

    ws.onopen = () => {
        console.log("connected");
        let token = getToken().split(/(\s+)/)[2];
        ws.send(JSON.stringify({token: token}));
    }

    let invitations = [];

    ws.onmessage = (msg) => {
        let notif = JSON.parse(msg.data);
        invitations.push(notif);
        invitations = invitations;
    }

    ws.onerror = () => {

    }

    function autoremove(id){
        invitations = invitations.filter((i) => i.id != id);
    }
</script>

<div class="notif">
    {#each invitations as invite}
        <div style="background-color: white">
            <Invitation holidayId={invite.id} holidayName={invite.name} on:expire={autoremove(invite.id)}>
            <button on:click={() => { invitations = invitations.filter((e) => e.id != invite.id); }}>X</button>
            </Invitation>
        </div>
    {/each}
</div>

<style>
    .notif{
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1000;
    }
</style>