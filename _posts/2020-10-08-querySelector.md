---
title: querySelector 说明
---

不管从哪里开始执行querySelector(选择器), 都是先从整个文档中把满足选择器要求的元素匹配出来, 然后再把这些元素一个一个的比较, 是不是baseElement的子元素.


<div>
    <h5>原始内容</h5>
    <p id="p">
        原始p内容(span之前)
        <span>此元素不满足 `div span` 选择器, 但最终选择上了.</span>
        原始p内容(span之后)
    </p>
</div>
<div>
    <h5>结果</h5>
    <div id="output"></div>
</div>

<script>
    var baseElement = document.querySelector("#p");
    document.getElementById("output").innerHTML =
        (baseElement.querySelector("div span").innerHTML);
</script>