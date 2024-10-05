<script>
    import {Link} from "svelte-routing";

    export let activeTab;
</script>


{#if (activeTab === "Connexion")}
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
            <Link class="nav-link active" to="/login">Connexion</Link>
        </li>
        <li class="nav-item" role="presentation">
            <Link class="nav-link" to="/register">Inscription</Link>
        </li>
    </ul>
{:else if (activeTab === "Inscription")}
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
            <Link class="nav-link" to="/login">Connexion</Link>
        </li>
        <li class="nav-item" role="presentation">
            <Link class="nav-link active" to="/register">Inscription</Link>
        </li>
    </ul>
{:else}
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation">
            <Link class="nav-link" to="/login">Connexion</Link>
        </li>
        <li class="nav-item" role="presentation">
            <Link class="nav-link" to="/register">Inscription</Link>
        </li>
    </ul>
{/if}
