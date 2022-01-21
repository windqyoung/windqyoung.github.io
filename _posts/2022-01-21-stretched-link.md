---
title: 链接延伸
---

<style>
.click-region {
    position: relative;
    border: 1px solid;
}

.stretched-link::after {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    content: "";
}
</style>


<div class="click-region">
    <p>这是一个可点击区域, position设为relative</p>
    <p>把a标签的::after设为position: absolute, 覆盖整个父元素</p>
    <p><a href="#link" class="stretched-link">点方框相当于点我</a></p>
</div>

