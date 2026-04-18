---
title: 在Echarts地图坐标系中设置底图
---

<meta charset="utf8">

<div>
    <div class="main-echarts"></div>
</div>


<script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/6.0.0/echarts.min.js"
    integrity="sha512-4/g9GAdOdTpUP2mKClpKsEzaK7FQNgMjq+No0rX8XZlfrCGtbi4r+T/p5fnacsEC3zIAmHKLJUL7sh3/yVA4OQ=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script>
    const dom_ref = { value: document.querySelector('.main-echarts') };


    const image_url = '/images/echarts-bg.jpg';
    const geo_json_url = 'https://geojson.cn/api/china/1.6.3/china.json';


    function render_chart() {

        var chartDom = dom_ref.value;
        var myChart = echarts.init(chartDom);
        let option;



        function createChart() {
            option = {
                title: {
                    text: '地图底图测试',
                },
                geo: {
                    map: 'ch',
                    roam: true,
                    // nameProperty: 'name_en', // If using en name.
                    label: {
                        show: true,
                    }
                },
                tooltip: {},
                series: [
                    {
                        z: -1,
                        type: "custom",
                        coordinateSystem: 'geo',
                        geoIndex: 0,
                        tooltip: {
                            show: false,
                        },
                        renderItem: (params, api) => {
                            console.log("有调用么?", params, api);
                            // 获取当前坐标系的范围（经过缩放后）
                            var cod = params.coordSys;
                            var x = cod.x;
                            var width = cod.width;
                            var y = cod.y;
                            var height = cod.height;
                            // 实际的点的信息.
                            const pt = api.coord([x, y])
                            const pt_size = api.size([width, height])
                            console.log(pt, pt_size)

                            return {
                                type: 'image',
                                style: {
                                    x: pt[0],
                                    y: pt[1],
                                    width: pt_size[0],
                                    height: -pt_size[1], // 坐标系和笛卡尔不一样.
                                    image: image_url,
                                    opacity: 0.5,
                                },
                            }
                        },
                        data: [''],
                    },
                    {
                        z: 10,
                        type: 'map',
                        map: 'ch',
                        coordinateSystem: 'geo',
                        geoIndex: 0,
                        itemStyle: {
                            // opacity: 0,
                        },
                        data: [
                            { name: '广东', value: 7.667821250000001 },
                            { name: '广西', value: 46.516308805996054 },
                        ],

                    }
                ]
            };
            myChart.setOption(option);
        }

        function fetchGeoJSON() {
            myChart.showLoading();
            fetch(geo_json_url).then(resp => {
                return resp.json()
            }).then(function (geoJSON) {
                echarts.registerMap('ch', geoJSON);
                myChart.hideLoading();
                createChart();
            });
        }

        fetchGeoJSON();


    }

    addEventListener('load', () => {
        render_chart();
    })
</script>



<style>
    .main-echarts {
        width: 800px;
        height: 600px;
        border: 1px solid #ccc;
    }
</style>