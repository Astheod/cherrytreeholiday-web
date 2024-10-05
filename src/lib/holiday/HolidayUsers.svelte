<script>
    import UserManager from "../../assets/UserManager.svelte";
    import {loadHolidayUsers, switchOwner, users, invite} from "../store/holidayStore.js";

    export let holidayId;
    $: userList = "";
    export let isOwner;

    users.subscribe((value) => userList = value);

    function inviteUser(event){
        console.log("invite");
        invite(holidayId, {pseudo: event.detail.user}, () => {}, () => {});
    }

    function remove(event){

    }

    function promote(event){
        switchOwner(holidayId, {pseudo:event.detail.user}, () => {}, () => {});
    }

    loadHolidayUsers(holidayId);
</script>

{#if userList}
    <UserManager allowInvite=true  bind:users={userList} bind:isOwner={isOwner} on:invite={inviteUser} on:remove={remove} on:promote={promote} />
{/if}