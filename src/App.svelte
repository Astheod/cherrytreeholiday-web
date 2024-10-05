<script lang="ts">
    import LoginForm from "./lib/auth/LoginForm.svelte";
    import {Router, Link, Route } from "svelte-routing";
    import RegisterForm from "./lib/auth/RegisterForm.svelte";
    import {alreadyConnected, isAuthenticated} from "./lib/store/userStore";
    import Home from "./lib/layout/Home.svelte";
    import About from "./lib/layout/About.svelte";
    import Contact from "./lib/layout/Contact.svelte";
    import Logout from "./lib/auth/Logout.svelte";
    import HomeConnected from "./lib/layout/HomeConnected.svelte";
    import EditHoliday from "./lib/holiday/EditHoliday.svelte";
    import CreateHoliday from "./lib/holiday/CreateHoliday.svelte";
    import Conversation from "./assets/Conversation.svelte";
    import ViewHoliday from "./lib/holiday/ViewHoliday.svelte";
    import HolidayInvitations from "./lib/holiday/HolidayInvitations.svelte";
    import InvitationNotifier from "./assets/InvitationNotifier.svelte";
    import CreateActivity from "./lib/activity/CreateActivity.svelte";
    import ViewActivity from "./lib/activity/ViewActivity.svelte";
    import EditActivity from "./lib/activity/EditActivity.svelte";

    let isConnected = false;

    isAuthenticated.subscribe((value) => {
        isConnected = value;
    });

    alreadyConnected();

    export let url = "";

    let now = new Date();
</script>

<Router {url}>
    {#if isConnected}
        <InvitationNotifier />
    {/if}
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <Link class="navbar-brand" to="/">Cherry Tree Holiday</Link>
        <ul class="navbar-nav me-auto">
            <li class="nav-item">
                <Link class="nav-link" to="/">Home</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="/aboutus">About Us</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="/contact">Contact</Link>
            </li>
            {#if isConnected}
                <li class="nav-item">
                    <Link class="nav-link" to="/holiday/invite">Invitations</Link>
                </li>
            {/if}
        </ul>
        <div class="d-flex">
            {#if isConnected}
                <Link to="/logout" class="btn btn-outline-secondary my-2 my-sm-0">Déconnexion</Link>
            {:else }
                <Link to="/login" class="btn btn-outline-secondary my-2 my-sm-0">Authentification</Link>
            {/if}
        </div>
    </nav>

    <Route path="*">
        {#if !isConnected}
            <Home/>
        {:else }
            <HomeConnected/>
        {/if}
    </Route>

    {#if !isConnected}
        <Route path="/login">
            <LoginForm/>
        </Route>
        <Route path="/register">
            <RegisterForm/>
        </Route>
    {:else}
        <Route path="/holiday/create">
            <CreateHoliday/>
        </Route>
        <Route path="/logout">
            <Logout/>
        </Route>

        <Route path="/holiday/">
            <EditHoliday date_start={now} date_end={now} />
        </Route>

        <Route path="/holiday/invite">
            <HolidayInvitations />
        </Route>

        <Route path="/holiday/:holidayId" let:params>
            <ViewHoliday holidayId={params.holidayId} />
        </Route>

        <Route path="/holiday/:holidayId/edit" let:params>
            <EditHoliday id={params.holidayId} />
        </Route>

        <Route path="/holiday/:holidayId/chat" let:params>
            <Conversation holidayId={params.holidayId} />
        </Route>
        <Route path="/activity/:holidayId/create" let:params>
            <CreateActivity holidayId={params.holidayId}/>
        </Route>
        <Route path="/activity/:holidayId/edit/:activityId" let:params>
            <EditActivity activityId={params.activityId} holidayId={params.holidayId} />
        </Route>
        <Route path="/activity/:holidayId/:activityId" let:params>
            <ViewActivity activityId={params.activityId} holidayId={params.holidayId} />
        </Route>
    {/if}

    <Route path="/aboutus">
        <About/>
    </Route>
    <Route path="/contact">
        <Contact/>
    </Route>

</Router>