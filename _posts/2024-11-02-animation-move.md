---
title: css动画, 控制元素移动速度
---


<div><label for="length">长度: </label><input id="length" value="50" type="number">
    <label>速度: <input id="speed" type="number" value="300">px/s</label>
    <button id="start">开始动画</button>
</div>

<div class="content-context">
    <div class="move-context">
        移动开始
        <span id="move-text"></span>
        结束
    </div>
</div>

<script>
    document.addEventListener('animationend', function (event) {
        if (event.animationName === 'move-animation') {
            event.target.classList.remove('move-animation');
            setTimeout(function () {
                event.target.classList.add('move-animation');
            });

        }
    })


    let btn_ele = document.querySelector('#start');
    let length_ele = document.querySelector('#length');
    let context_ele = document.querySelector('.content-context');
    let move_context_ele = document.querySelector('.move-context');
    let move_text_ele = document.querySelector('#move-text');
    let speed_ele = document.querySelector('#speed');

    const num_str = '一二三四五六七八九十'

    btn_ele.addEventListener('click', function () {

        let value = +length_ele.value;
        let str = '';
        for (let i = 0; i < value; i++) {
            str += num_str[i % 10]
        }
        move_text_ele.innerHTML = str;
        console.log('宽度比较', context_ele.clientWidth, move_context_ele.scrollWidth)

        let speed = move_context_ele.scrollWidth / speed_ele.value; // 每x秒移动象素
        move_context_ele.style.animationDuration = speed + 's';
        move_context_ele.classList.add('move-animation');

    })



</script>

<style>
    .content-context {
        width: 400px;
        word-break: break-all;
        white-space: nowrap;
        border: 1px solid #ccc;
        overflow: hidden;

        margin-left: 10em;
        margin-top: 1em;
    }

    .move-context {
        display: inline-block;
        animation-timing-function: linear;
        animation-delay: 1s;
    }

    .move-context:hover {
        animation-play-state: paused;
    }

    .move-animation {
        animation-name: move-animation;
    }

    @keyframes move-animation {
        to {
            transform: translateX(-100%);
        }
    }
</style>