<script lang="ts">
    import {useForm, Hint, validators, minLength, required, HintGroup, emailWithTld,} from "svelte-use-form";
    import {register} from "../store/userStore.js";
    import Button from "../../assets/ButtonValidator.svelte";
    import {navigate} from "svelte-routing";
    import LogerTab from "../../assets/LogerTab.svelte";

    const form = useForm();
    const requiredMessage = "Ce champ est requis !";

    let name = "Inscription";

    let lastname:String = "";
    let firstname:String = "";
    let login:String = "";
    let password:String = "";
    let confirmPassword:String = "";
    let userMail:String = "";

    function passwordMatch(value, form) {
        if (value !== form.values.password) {
            return { passwordMatch: true };
        }
    }

    function onClick(){
        register({pseudo: login, firstname: firstname, lastname:lastname, email: userMail, password: password}, () => navigate("/", {replace : true}), () => {});
    }
</script>

<div class="d-flex justify-content-center align-items-center mt-5">
    <div class="card border-primary m-3 w-25">
        <LogerTab bind:activeTab={name}/>
        <form class="col-md" use:form on:submit|preventDefault={onClick}>
            <fieldset>
                <div class="form-group d-flex justify-content-center">
                    <div class="col-md-10">
                        <input type="text" id="login" name="login" class="form-control mt-3" placeholder="Login" bind:value={login} use:validators={[required]} />
                        <HintGroup for="login">
                            <Hint on="required" class="hint-color">{requiredMessage}</Hint>
                        </HintGroup>
                    </div>
                </div>

                <div class="form-group d-flex justify-content-center">
                    <div class="col-md-10">
                        <input type="email" id="email" name="email" class="form-control mt-3" placeholder="Email" bind:value={userMail} use:validators={[required, emailWithTld]} />
                        <HintGroup for="email">
                            <Hint on="required" class="hint-color">{requiredMessage}</Hint>
                            <Hint on="emailWithTld" class="hint-color" hideWhenRequired>Vous devez entrer un email valide</Hint>
                        </HintGroup>
                    </div>
                </div>

                <div class="form-group d-flex justify-content-center">
                    <div class="col-md-10">
                        <input type="text" id="lastname" name="lastname" class="form-control mt-3" placeholder="Nom" bind:value={lastname} use:validators={[required]} />
                        <HintGroup for="lastname">
                            <Hint on="required" class="hint-color">{requiredMessage}</Hint>
                        </HintGroup>
                    </div>
                </div>
                <div class="form-group d-flex justify-content-center">
                    <div class="col-md-10 ">
                        <input type="text" id="firstname" name="firstname" class="form-control mt-3" placeholder="Prénom" bind:value={firstname} use:validators={[required]} />
                        <HintGroup for="firstname">
                            <Hint on="required" class="hint-color">{requiredMessage}</Hint>
                        </HintGroup>
                    </div>
                </div>

                <div class="form-group d-flex justify-content-center">
                    <div class="col-md-10">
                        <input type="password" name="password" class="form-control mt-3" placeholder="Mot de passe" bind:value={password} use:validators={[required, minLength(7)]} />
                        <HintGroup for="password">
                            <Hint on="required"  class="hint-color">{requiredMessage}</Hint>
                            <Hint on="minLength" class="hint-color" hideWhenRequired let:value>This field must have at least {value} characters.</Hint>
                        </HintGroup>
                    </div>
                </div>
                <div class="form-group d-flex justify-content-center">
                    <div class="col-md-10">
                        <input type="password" name="confirm" class="form-control mt-3" placeholder="Confirmation" bind:value={confirmPassword} use:validators={[required, passwordMatch]} />
                        <HintGroup for="confirm">
                            <Hint on="required"  class="hint-color">{requiredMessage}</Hint>
                            <Hint on="passwordMatch" class="hint-color" hideWhenRequired let:value>This field must be the same as password.</Hint>
                        </HintGroup>
                    </div>
                </div>

                <div class="d-flex justify-content-center mt-3">
                    <Button bind:text={name} bind:form={$form}></Button>
                </div>
            </fieldset>
        </form>
    </div>
</div>

<style>
    :global(input.touched:invalid){
        border-color: red;
        outline-color: red;
    }

    :global(div.hint-color) {
        color: red;
    }
</style>
