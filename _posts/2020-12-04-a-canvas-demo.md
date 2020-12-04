---
title: canvas demo
---



<div>半径：<input id='r' /></div>
<div><canvas width="500" height="500" id="c" style="border: solid;"></canvas></div>

<script>
cEle = document.querySelector('#c');
eW = cEle.width
eH = cEle.height
ctx = cEle.getContext('2d');
radius = 5;
endArc = Math.PI * 2
startArc = 0;

function drawPix() {
    ctx.fillStyle = s = 'rgba(0, 0, 0, 0.05)';
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

document.querySelector('#r').addEventListener('blur', function (e) {
    var v = +this.value
    console.log(v);
    if (v > 0) {
        radius = v;
    }
});

</script>