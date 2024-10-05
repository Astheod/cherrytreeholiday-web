<script>
    export let form;
    export let text;
    export let id="seks";

</script>


<button id={id} class="btn-primary btn m-1" disabled={!form.valid} >{text} </button>

<style>
    button:disabled {
        cursor: not-allowed;
    }
</style>