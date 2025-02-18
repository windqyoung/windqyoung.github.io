---
title: Next.js sse实现例子
---


页面代码

```tsx
// sse/page.tsx

"use client"

import {useEffect, useState} from "react";

export default function ()
{
    const [message, set_message] = useState<string[]>([])

    useEffect(() => {
        let sse = new EventSource("./sse/api")

        sse.addEventListener("message", (event) => {
            console.log("接到响应", event, event.data)
            set_message((prev) => {
                return [...prev, event.data]
            })
        })

        return () => {
            sse.close();
        }
    }, []);

    return <div>
        <div>消息列表</div>
        {
            message.map((msg) =>{
                return <div>消息: {msg}</div>
            })
        }
    </div>

}


```


接口sse代码

```ts
// sse/api/route.ts

import {NextResponse} from "next/server";


export function GET()
{
    let stream = new ReadableStream({
        start(ctrl) {

            let tid = 10;

            function run() {
                tid -= 1;
                console.log("运行", tid)

                if (tid < 0) {
                    ctrl.close();
                    return;
                }

                ctrl.enqueue("data: sse事件" + tid + "\r\n\r\n");

                setTimeout(run, 1000)
            }

            run()
        },
        pull(ctrl) {
            console.log("PULL")
        },
        cancel() {
            console.log("退出")
        }
    })

    return new NextResponse(stream, {
        headers: [
            ["content-type", "text/event-stream"]
        ]
    })
}


```