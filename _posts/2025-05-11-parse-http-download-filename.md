---
title: 识别 http 下载头中的文件名
---

```js

// 文件名必须用 %xx 编码
const str = `attachment; filename-="download-file1%E4%B8%AD%E6%96%87.json"; filename*=UTF-8''download-file2%E4%B8%AD%E6%96%87.json`;


function guessFilename(contentDisposition)
{
    if (! contentDisposition) {
        return;
    }
    
    const pat = /(filename\*?)=([^;]+)/

    const rs = pat.exec(contentDisposition);

    if (rs?.[1] === 'filename*') {
        const value_part = rs[2];
        const pos = value_part.lastIndexOf("'");
        return value_part.substring(pos + 1);
    }
    if (rs[1] === 'filename') {
        let filename = rs[2];
        if (filename.startsWith('"')){
            filename = filename.substring(1);
        }
        if (filename.endsWith('"')) {
            filename = filename.substring(0, filename.length - 1);
        }
        return filename       
    }
}
const filename = guessFilename(str);
console.log(filename);
```