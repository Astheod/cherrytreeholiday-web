<script>
    import {loadActivities} from "../lib/store/activityStore.js";
    import {activities} from "../lib/store/activityStore.js";
    import {Link, navigate} from "svelte-routing";

    export let holidayId;
    export let isOwner;
    let showActivities = [];

    activities.subscribe((value) => showActivities = value);

    loadActivities(holidayId, () => {}, () => {});
    function viewActivity(activityId) {
        navigate(`/activity/` + holidayId + "/" + activityId);
    }

    let sortBy = {col: "id", ascending: true};

    $: sort = (column) => {

        if (sortBy.col == column) {
            sortBy.ascending = !sortBy.ascending
        } else {
            sortBy.col = column
            sortBy.ascending = true
        }

        // Modifier to sorting function for ascending or descending
        let sortModifier = (sortBy.ascending) ? 1 : -1;

        let sort = (a, b) =>
            (a[column] < b[column])
                ? -1 * sortModifier
                : (a[column] > b[column])
                    ? 1 * sortModifier
                    : 0;

        showActivities = showActivities.sort(sort);
    }

</script>

<div class=" col-8 border rounded border-primary m-2 p-0">
    <div class="row-cols-8 table-responsive">
        <table class="table table-hover">
            <thead>
            <tr class="table-light">
                <th scope="col" class="th-sm">#</th>
                <th scope="col" on:click={sort("name")}>Titre</th>
                <th scope="col" on:click={sort("dateStart")}>Date de début</th>
                <th scope="col" on:click={sort("dateEnd")}>Date de fin</th>
                <th scope="col">Lieu</th>
                {#if isOwner}
                    <th scope="col">Actions</th>
                {/if}
            </tr>
            </thead>
            <tbody>
            {#each showActivities as activity, index (activity.name)}
                <tr on:click={viewActivity(activity.id)}>
                    <th scope="row">{index + 1}</th>
                    <td>{activity.name}</td>
                    <td>{activity.dateStart}</td>
                    <td>{activity.dateEnd}</td>
                    <td>{activity.address.street} {activity.address.number}, {activity.address.code_postal} {activity.address.city} {activity.address.country}. </td>
                </tr>
            {/each}
            {#if showActivities.length === 0}
                <tr>
                    <td colspan="5" class="text-center">Aucune activité</td>
                </tr>
            {/if}
                <tr>
                    <td colspan="5" class="text-center">
                        <Link to="/activity/{holidayId}/create" class="btn btn-outline-primary">
                            Ajouter une activité
                        </Link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>