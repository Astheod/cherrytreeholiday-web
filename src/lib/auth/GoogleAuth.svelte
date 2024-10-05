<script>
    import { GoogleOAuthProvider } from 'google-oauth-gsi';
    import {external} from "../store/userStore.js";
    import {navigate} from "svelte-routing";

    export const googleProvider = new GoogleOAuthProvider({
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        onScriptLoadError: () => console.log('onScriptLoadError'),
        onScriptLoadSuccess: () => console.log('onScriptLoadSuccess'),
    });
    const login = googleProvider.useGoogleLogin({
        flow: 'implicit',
        onSuccess: (response) => {
            external({
                type: 'google',
                payload: {token: response.access_token}
            },
            () => navigate("/", {replace : true}));
        },
        onError: (err) => console.error('Failed to login with google', err),
    });
</script>

<button class="btn-primary btn m-1" on:click={() => login()}>
    Authentication Google
</button>