---
title: 随机数生成正态分布样式
---

<script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.5.0/echarts.min.js"></script>

<div>公式为: 
    <math>
        <mi>Z</mi><mo>=</mo>
        <munderover>
            <mo>Σ</mo>
            <mrow>
                <mi>i</mi><mo>=</mo><mn>1</mn>
            </mrow>
            <mn>12</mn>
        </munderover>
        <msub><mi>X</mi><mi>i</mi></msub>
        <mo>-</mo>
        <mn>6</mn>

        <mspace width="1em"></mspace>
        <mrow>
            <ms>其中</ms>
            <msub><mi>X</mi><mi>i</mi></msub>
            <mo>~</mo><mi>U</mi>
            <mo>(</mo>
            <mn>0</mn>
            <mo>,</mo>
            <mn>1</mn>
            <mo>)</mo>
        </mrow>
    </math>

</div>
<!-- 为 ECharts 准备一个定义了宽高的 DOM -->
<div id="main" style="width: 600px;height:400px;"></div>
<script type="text/javascript">
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    var rand_data = {};
    for (var i = 0; i < 100000; i++) {
        let number = 0;
        for (var nf = 0; nf < 12; nf++) {
            number += Math.random();
        }
        number -= 6;
        let key = number.toFixed(2);
        rand_data[key] = (rand_data[key] || 0) + 1;
    }
    console.log(rand_data)
    // 指定图表的配置项和数据
    var option = {
        xAxis: {},
        yAxis: {},
        series: [
            {
                symbolSize: 1,
                data: Object.entries(rand_data),
                type: 'scatter'
            }
        ]
    };;

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
</script>
