<script>
    export let itemLabel;
    export let highlighted;
</script>

<li class="dropdown-item" class:autocomplete-active={highlighted} on:click>{@html itemLabel}</li>