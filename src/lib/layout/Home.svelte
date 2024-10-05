<script>
    import {askGraph, getNumberOfUser, graphUsers, numberOfUser} from "../store/homeStore.js";
    import Chart from 'chart.js/auto';
    import {onMount} from "svelte";
    import {DateInput} from "date-picker-svelte";

    let number = 0;
    let graphData = {};

    let target_date = new Date();
    let chart;

    numberOfUser.subscribe(value => {
        number = value;
    });

    graphUsers.subscribe((value) => {
        graphData = value;
        if(chart){
            let keys = Object.keys(graphData);
            let values = [];
            keys.forEach((key) => values.push(graphData[key]));
            chart.data = {
                labels: keys,
                datasets: [{
                    label: '# of country',
                    data: values,
                    borderWidth: 1
                }]
            };
            chart.update();
        }
    });

    onMount(() => {
        let keys = Object.keys(graphData);
        let values = [];
        keys.forEach((key) => values.push(graphData[key]));

        chart = new Chart(document.getElementById("countries"), {
            type: 'bar',
            data: {
                labels: keys,
                datasets: [{
                    label: '# of country',
                    data: values,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });

    function selectDate(e){
        let date = e.detail;
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();

        if(month < 10) month = "0"+month;
        if(day < 10) day = "0"+day;

        askGraph(year+'-'+month+'-'+day,  () => {}, () => {});
    }

    getNumberOfUser( () => {}, () => {});
    selectDate({detail: new Date()});
</script>

<body class="text-center">
<div class="container">
    <h4 class="m-4">
        Bienvenu, sur Cherry Tree Holiday !
        <small class="text-body-secondary">N'hésitez pas à rejoindre notre communauté de {$numberOfUser} personnes
            !</small>

        <DateInput bind:value={target_date}  format="yyyy-MM-dd" placeholder="Date" on:select={selectDate} />
        <canvas id="countries"></canvas>
    </h4>
</div>
</body>
