---
title: 浏览器复制
---

<div id="copy-text" contenteditable="true">copy text example</div>
<button id="copy">copy</button>

<script>
    let copyEle = document.querySelector('#copy');
    copyEle.addEventListener('click', e => {
        let textEle = document.querySelector('#copy-text');
        let textarea = document.createElement('textarea');
        textarea.value = textEle.textContent;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
        } finally {
            document.body.removeChild(textarea);
        }
    });

</script>
