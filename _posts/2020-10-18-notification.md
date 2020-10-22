---
title: 你好, 消息
---

<label>消息: <input id="msg" value="helo" ></label>
<label>延迟: <input id="timeout" value="1000"></label>
<button id="send">发送消息</button>

<script>

if (location.protocol !== 'https:') {
    location.protocol = 'https:';
    
}
let msgEle = document.querySelector('#msg');
let sendEle = document.querySelector('#send');
let timeoutEle = document.querySelector('#timeout');
let n = 0;
sendEle.addEventListener('click', e => {
    Notification.requestPermission().then(perm => {
        if (perm !== 'granted') {
            alert('用户拒绝');
            return;
        }
        let text = msgEle.value;
        let timeout = +timeoutEle.value;

        if (timeout) {
            setTimeout(() => {
                sendNoti('提示' + n++, {body: text});
            }, timeout);
        } else {
            sendNoti('提示' + n++, {body: text});
        }

    });
});
function sendNoti(title, options) {
    return new Notification(title, options);
}
</script>

