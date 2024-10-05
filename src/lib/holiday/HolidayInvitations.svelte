<script>
    import {invites, loadInvites} from "../store/holidayStore.js";
    import Invitation from "../../assets/Invitation.svelte";

    let list;

    invites.subscribe((value) => {
        list = value;
    });

    loadInvites( () => {}, () => {});
</script>

<div>
    {#if list && list.length > 0}
        {#each list as invite}
            <Invitation holidayId={invite.id} holidayName={invite.name} />
        {/each}
    {:else}
        <h2>Aucune invitation en attente !</h2>
    {/if}
</div>
