---
title: css 动画 星球圆周运动
---


<script src="https://cdn.staticfile.org/jquery/3.4.1/jquery.js"></script>
<style>

@keyframes anim1 {
    from { transform: rotate(0) }
    to { transform: rotate(360deg) }
}

@keyframes anim2 {
    from { transform: scale(1, 1) }
    50% { transform: scale(1.1, 1.1) }
    to { transform: scale(0.9, 0.9) }
}


.container {
    width: 400px;
    height: 400px;

    animation: anim2 5s infinite alternate;
}

.container1 {
    position: absolute;
    width: 100%;
    height: 100%;

    animation: anim1 20s infinite;
}

.container2 {
    width: 50%;
    height: 50%;
    position: absolute;
    top: 0%;
    left: 50%;
    animation: anim1 10s infinite ;
}
.container3 {
    width: 50%;
    height: 50%;
    position: absolute;
    top: 0%;
    left: 50%;
    animation: anim1 5s infinite ;
}

.center {
    width: 10px;
    height: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -5px;
    margin-left: -5px;
}
.c1 {
    background: red;
}
.c2 {
    background: green;
}
.c3 {
    background: blue;
}

.moon {
    background: pink;
    width: 10px;
    height: 10px;
    position: absolute;
    right: 20%;
    top: 20%;
}
.border {
    border: 1px solid gray;
}


</style>


<div class="container">
<div class="container1">
    <div class="center c1"></div>
    <div class="container2">
        <div class="center c2"></div>
        <div class="container3">
            <div class="center c3"></div>
            <div class="moon"></div>
        </div>
    </div>
</div>
</div>

<script>
$('.container').on('dblclick', function () {
    $('.container').toggleClass('border')
        .find('*').toggleClass('border');
});

</script>
