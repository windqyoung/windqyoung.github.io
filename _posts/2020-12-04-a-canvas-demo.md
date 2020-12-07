---
title: canvas demo
---



<div>半径：<input id='r' /></div>
<div><canvas width="500" height="500" id="c" style="border: solid;"></canvas></div>

<script>
var cEle = document.querySelector('#c');
var eW = cEle.width
var eH = cEle.height
var ctx = cEle.getContext('2d');
var radius = 5;
var endArc = Math.PI * 2
var startArc = 0;
var opacityStyle = 'rgba(0, 0, 0, 0.05)';

function drawPix() {
    ctx.fillStyle = s = opacityStyle;
    ctx.fillRect(0, 0, eW, eH)
    ctx.fillStyle = s = 'rgba(' + 
            Math.random() * 255 + ',' + 
            Math.random() * 255 + ',' + 
            Math.random() * 255 + ')';
    
    let x = Math.random() * eW;
    let y = Math.random() * eH;
    ctx.beginPath();
    ctx.arc(x, y, radius, startArc, endArc, false);
    ctx.fill();
    
    requestAnimationFrame(drawPix)
}
requestAnimationFrame(drawPix)

var rinp = document.querySelector('#r');
rinp.value = radius;
rinp.addEventListener('blur', function (e) {
    var v = +this.value
    console.log(v);
    if (v > 0) {
        radius = v;
    }
});

</script>