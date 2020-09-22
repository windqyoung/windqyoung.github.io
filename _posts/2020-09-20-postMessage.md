---
title: 测试postMessage
---

<button id="open-frame">Open</button>
<div>
<iframe id="iframe1" style="width: 80%; height: 50vh;" src="/html/post-message-iframe.html"></iframe>
</div>

<script>
{
    let started = false;
    let frameBtn = document.querySelector('#open-frame');
    frameBtn.addEventListener('click', function (e) {
        if (started) {
            console.log('repeat start click');
            return;
        }
        started = true;

        let frame = document.querySelector('#iframe1');
        let target = frame.contentWindow;

        target.postMessage('start post message at ' + Date(), '*');

        setInterval(function () {
            let msg = {msg: '<helo>', date: Date()};
            target.postMessage(msg, '*');
        }, 5000);
    });
}
</script>