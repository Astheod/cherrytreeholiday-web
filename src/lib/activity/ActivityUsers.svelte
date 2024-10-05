<script>
    import UserManager from "../../assets/UserManager.svelte";
    import {loadActivityUsers, users, switchOwner} from "../store/activityStore.js";

    export let activityId;
    let userList;
    export let isOwner;

    users.subscribe((value) => userList = value);

    function remove(event){

    }

    function promote(event){
        switchOwner(activityId, {pseudo:event.detail.user}, () => {}, () => {});
    }

    loadActivityUsers(activityId, () => {}, () => {});
</script>

{#if userList}
    <UserManager allowInvite=false  bind:users={userList} bind:isOwner={isOwner} on:remove={remove} on:promote={promote} />
{/if}