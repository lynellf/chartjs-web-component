# Chart.js Web Component

Just drop it in and play. Chart data can be supplied either within a script tag or via the element's config attribute.

The charts will re-render whenever a new configuration is supplied to the component.

[Docs for Chart.JS](https://www.chartjs.org/docs/latest/)

```
<body>
    <chart width="300" height="100">
        <script id="chartData" type="application/json">
            {
                "type": "bar",
                "data": {
                    "labels": [ "Red", "Blue", "Yellow", "Green", "Purple", "Orange" ],
                    "datasets": [
                        {
                            "label": "# of Votes",
                            "data": [ 12, 19, 3, 5, 2, 3 ],
                            "backgroundColor": [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 206, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(255, 159, 64, 0.2)"
                            ],
                            "borderColor": [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)"
                            ],
                            "borderWidth": 1
                        }
                    ]
                },
                "options": { "scales": { "yAxes": [ { "ticks": { "beginAtZero": true } } ] } }
            }
            
        </script>
    </chart>
    <chart
        width="300" 
        height="100" 
        config='{"type":"bar","data":{"labels":["1900","1950","1999","2050"],"datasets":[{"label":"Europe","type":"line","borderColor":"#8e5ea2","data":[408,547,675,734],"fill":false},{"label":"Africa","type":"line","borderColor":"#3e95cd","data":[133,221,783,2478],"fill":false},{"label":"Europe","type":"bar","backgroundColor":"rgba(0,0,0,0.2)","data":[408,547,675,734]},{"label":"Africa","type":"bar","backgroundColor":"rgba(0,0,0,0.2)","backgroundColorHover":"#3e95cd","data":[133,221,783,2478]}]},"options":{"title":{"display":true,"text":"Population growth (millions): Europe & Africa"},"legend":{"display":false}}}' />
    <chart 
        width="300" 
        height="100" 
        config='{"type":"bar","data":{"labels":["Red","Blue","Yellow","Green","Purple","Orange"],"datasets":[{"label":"# of Votes","data":[12,19,3,5,2,3],"backgroundColor":["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],"borderColor":["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],"borderWidth":1}]},"options":{"scales":{"yAxes":[{"ticks":{"beginAtZero":true}}]}}}' />
    <script src="../public/bundle.js"></script>
</body>
```

## Attributes
```
config, height, width
```

## Config Notes

The configuration supplied must be in JSON format.