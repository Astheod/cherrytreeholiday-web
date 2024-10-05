<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let users;
    export let isOwner;
    export let allowInvite;
    let invitePseudo = '';
    let searchInput = '';

    let showUsers = [...users].sort((a, b) => a.username.localeCompare(b.username));

    function search(){
        console.log(searchInput);
        showUsers = [...users].filter((v) => v.username.includes(searchInput));
    }

    function invite(){
        dispatch('invite', {user:invitePseudo});
    }

    function remove(user){
        dispatch('remove', {user:user});
    }

    function promote(user){
        dispatch('promote', {user:user});
    }

</script>

<div class=" col-3 border rounded border-primary m-2">
    <div class="d-flex">
    {#if allowInvite}
        <form class="d-flex p-1" on:submit|preventDefault={invite}>
            <input placeholder="Pseudo" class="form-control me-sm-2" bind:value={invitePseudo}/>
            <button class="btn-outline-primary btn my-2 my-sm-0">Inviter</button>
        </form>

        {/if}
        <form class="d-flex p-1" on:submit|preventDefault={search}>
            <input placeholder="Rechercher"  class="form-control me-sm-2" bind:value={searchInput}/>
            <button class="btn btn-outline-primary my-2 my-sm-0">&#x1F50D</button>
        </form>
    </div>
    <div class="row-cols-3 table-responsive">
    <table class="table table-hover ">
        <thead>
        <tr class="table-light">
            <th scope="col">Participant</th>
            {#if isOwner}
                <th scope="col">Actions</th>
            {/if}
        </tr>
        </thead>
        {#each showUsers as user, index (user.username)}
            <tbody>
            <tr>
                <th scope="row">{user.username}</th>
                {#if isOwner && (!user.owner)}
                    <button on:click={remove(user.username)} class="btn btn-outline-primary m-1">Enlever</button>
                    <button on:click={promote(user.username)} class="btn btn-outline-primary m-1">Promouvoir owner</button>
                {/if}
            </tr>
            </tbody>
        {/each}
        {#if showUsers.length === 0}
            <tr>
                <td colspan="4" class="text-center">Aucun participant</td>
            </tr>
        {/if}
    </table>
    </div>
</div>