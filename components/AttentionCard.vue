<template>
    <div id="chart">
        <client-only>
            <apexchart type="heatmap" width="500" :series="series" :options="options"></apexchart>
        </client-only>
    </div>
</template>
  
<script>
export default {
    name: 'test',
    components: {
        [process.browser && 'apexchart']: () => import('vue-apexcharts'),
    },
    data: () => ({
        series: [
            {
                name: "Series 1",
                data: [{
                    x: 'W1',
                    y: 22
                }, {
                    x: 'W2',
                    y: 29
                }, {
                    x: 'W3',
                    y: 13
                }, {
                    x: 'W4',
                    y: 32
                }]
            },
            {
                name: "Series 2",
                data: [{
                    x: 'W1',
                    y: 43
                }, {
                    x: 'W2',
                    y: 43
                }, {
                    x: 'W3',
                    y: 43
                }, {
                    x: 'W4',
                    y: 43
                }]
            }
        ],
        options: {

        },
    })
}
</script>