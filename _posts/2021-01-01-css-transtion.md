---
title: css transition 
---


<div class="trans" style="border: 1px solid; transition: all 3s;">
</div>

<script>

setInterval(() => {
    var $e = $('.trans');
    var c = 'rgb('  +
            (Math.random() * 255) + ', ' +
            (Math.random() * 255) + ', ' +
            (Math.random() * 255) + ') ' 
    $e.css('background-color', c);
    $e.width(Math.max(100, $e.width() * (Math.random() + 0.5)))
    $e.height(Math.max(100, $e.height() * (Math.random() + 0.5)))
}, 3000);

</script>