<script>
    import {sendContactForm} from "../store/homeStore.js";
    import {navigate} from "svelte-routing";
    import {useForm, Hint, validators, required, HintGroup, emailWithTld,} from "svelte-use-form";
    import Button from "../../assets/ButtonValidator.svelte";

    const form = useForm();

    function onClick() {
        sendContactForm(reply, content)
        navigate("/")
    }

    export let reply;
    export let content;
</script>
<body class="text-center">
    <div class="d-flex justify-content-center align-items-center mt-5 flex-column">
        <h3>Formulaire de contact</h3>
        <form class="col-md-3" use:form on:submit|preventDefault={onClick}>
        <div class="form-group d-flex justify-content-center">
            <div class="col-md-12">
                <input type="email" id="email" name="email" class="form-control mt-3" placeholder="Email" bind:value={reply} use:validators={[required, emailWithTld]} />
                <HintGroup for="email">
                    <Hint on="required" class="hint-color">{requiredMessage}</Hint>
                    <Hint on="emailWithTld" class="hint-color" hideWhenRequired>Vous devez entrer un email valide</Hint>
                </HintGroup>
            </div>
        </div>
            <div class="form-group d-flex justify-content-center">
                <div class="col-md-12">
                    <textarea name="text" class="form-control mt-3" rows="4" bind:value={content} placeholder="Message" use:validators={[required]}></textarea>
                </div>
            </div>

            <Button text="Envoyer" bind:form={$form}></Button>
        </form>
    </div>
</body>