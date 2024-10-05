<script>
    import {useForm, Hint, HintGroup, minLength, required, validators} from "svelte-use-form";
    import {login} from "../store/userStore.js";
    import Button from "../../assets/ButtonValidator.svelte";
    import GoogleAuth from './GoogleAuth.svelte';
    import {Link, navigate} from "svelte-routing";
    import LogerTab from "../../assets/LogerTab.svelte";

    const form = useForm();

    const requiredMessage = "Ce champ est requis !";
    let name = "Connexion";

    let username = "";
    let password = "";

    function onClick(){
        login({pseudo: username, password: password}, () => navigate("/", {replace : true}),() => {});
    }
</script>

<div class="d-flex justify-content-center align-items-center mt-5">
    <div class="card border-primary m-3 w-25">
        <LogerTab bind:activeTab={name}/>
        <form class="col-md" use:form on:submit|preventDefault={onClick}>
            <fieldset>
                <div class="form-group d-flex justify-content-center">
                    <div class="col-md-10">
                        <input type="text" id="login" name="login" class="form-control mt-3" placeholder="Login"
                               bind:value={username} use:validators={[required]}/>
                        <HintGroup for="login">
                            <Hint on="required" class="hint-color">{requiredMessage}</Hint>
                        </HintGroup>
                    </div>
                </div>

                <div class="form-group d-flex justify-content-center">
                    <div class="col-md-10">
                        <input type="password" name="password" id="password" class="form-control mt-3" placeholder="Mot de passe"
                               bind:value={password} use:validators={[required, minLength(7)]}/>
                        <HintGroup for="password">
                            <Hint on="required" class="hint-color">{requiredMessage}</Hint>
                            <Hint on="minLength" class="hint-color" hideWhenRequired let:value>This field must have at
                                least {value} characters.
                            </Hint>
                        </HintGroup>
                    </div>
                </div>
                <div class="d-flex justify-content-center mt-3">
                    <Button id="con" bind:form={$form} bind:text={name}/>
                    <GoogleAuth/>
                </div>
            </fieldset>
        </form>
    </div>
</div>

<style>
    :global(.touched:invalid){
        border-color: red;
        outline-color: red;
    }

    :global(div.hint-color) {
        color: red;
    }
</style>