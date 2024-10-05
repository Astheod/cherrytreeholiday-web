<script>
    import {logout} from "../store/userStore";
    import {navigate} from "svelte-routing";

    function Logout() {
        logout();
        navigate("/~e201098/FrameworkWeb/public/#", {replace: true});
    }
</script>

<body class="text-center">
<div class="container">
    <h3>Vous allez vous déconnecter !</h3>
    <button on:click={() => Logout()} class="btn-primary btn">Se déconnecter</button>
</div>
</body>