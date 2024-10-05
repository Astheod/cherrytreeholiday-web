<script>
    import {webSocket} from "../lib/api/axiosAPI.js";
    import {getToken} from "../lib/store/userStore.js";
    import Message from "./Message.svelte";
    import {loadHolidayUsers, users} from "../lib/store/holidayStore.js";
    import {afterUpdate} from "svelte";

    export let holidayId;
    let messages = [];
    let participants = [];
    let online=[];
    let element;

    afterUpdate(() => {
        console.log("afterUpdate");
        if(messages) scrollToBottom(element);
    });

    users.subscribe((value) => participants = value.sort((a, b) => a.username.localeCompare(b.username)));

    let ws = webSocket('/holiday/'+holidayId+'/chat');

    ws.onopen = () => {
        console.log("connected");
        let token = getToken().split(/(\s+)/)[2];
        ws.send(JSON.stringify({token: token}));
    }

    ws.onmessage = (msg) => {
        let notif = JSON.parse(msg.data);
        if(notif.status != undefined){
            online[notif.author] = notif.status;
            participants = participants;
            return;
        }
        messages.push(notif);
        messages = messages;
        scrollToBottom(element);
    }

    ws.onerror = () => {

    }

    let writing;

    function send(){
        ws.send(JSON.stringify({content: writing}));
        writing = "";
    }

    const scrollToBottom = async (node) => {
        node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
    };

    loadHolidayUsers(holidayId, () => {}, () => {});
</script>

<main class="content">
    <div class="container p-0">
        <div class="card">
            <div class="row g-0">
                <div class="col-12 col-lg-5 col-xl-2 border">
                    <div class="px-4 d-none d-md-block">
                        <div class="d-flex align-items-center">
                            <div class="flex-grow-1">
                                <h3 class="h3 mb-3">Participants</h3>
                            </div>
                        </div>
                    </div>
                    {#each participants as user}
                        {#if online[user.username]}
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 ml-3 ps-2 text-success">
                                    {user.username}
                                </div>
                            </div>
                        {:else}
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1 ml-3 ps-2 text-danger">
                                    {user.username}
                                </div>
                            </div>
                        {/if}
                    {/each}

                    <hr class="d-block d-lg-none mt-1 mb-0">
                </div>
                <div class="col-12 col-lg-7 col-xl-9">
                    <div class="py-2 px-4 border-bottom d-none d-lg-block">
                        <div class="d-flex align-items-center py-1">
                            <div class="position-relative">
                                <h2 class="rounded-circle mr-1">Message</h2>
                            </div>
                        </div>
                    </div>
                    <div class="position-relative">
                        <div class="chat-messages p-4" bind:this={element}>
                            {#each messages as message}
                                <Message author={message.author} sent={message.origin} content={message.content} />
                            {/each}
                        </div>
                    </div>
                </div>
                <div class="flex-grow-0 py-3 px-4 border-top">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Type your message" bind:value={writing}>
                        <button class="btn btn-primary" on:click={send}>Send</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</main>

<style>
    .user_online{
        color: green;
    }
    .user_offline{
        color: red;
    }

    .chat-messages {
        display: flex;
        flex-direction: column;
        max-height: 600px;
        overflow-y: scroll
    }

    .py-3 {
        padding-top: 1rem!important;
        padding-bottom: 1rem!important;
    }
    .px-4 {
        padding-right: 1.5rem!important;
        padding-left: 1.5rem!important;
    }
    .flex-grow-0 {
        flex-grow: 0!important;
    }
    .border-top {
        border-top: 1px solid #dee2e6!important;
    }
</style>