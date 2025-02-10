---
title: 通过http接口调用deepseek本地知识库
---

```python
"""
deepseek自建知识库

步骤:
1. 解析知识库的为文档列表
2. 调用ollama的embeddings接口获取文档的向量数据
3. 把文档向量添加到 chromadb中
4. 获取prompt的向量数据, 查询chromadb相关文档
5. 请求ollama接口时, 添加role=system的消息, 把上下文添加到这条消息中
6. 处理ollama的响应

# 启动ollama
ollama serve

# 启动向量库
chroma run
"""

import json
import requests
from pprint import pprint

from chromadb import HttpClient
from chromadb.utils.embedding_functions.ollama_embedding_function import OllamaEmbeddingFunction

"""
实例化向量数据库客户端

向量数据库的目的是
1. 保存 知识库 的向量数据
2. 根据prompt的向量查询相关知识
"""
client = HttpClient(port=8000)
print(client.list_collections())

collection_ds = client.get_collection(
    name='ds1',

    # 使用由ollama提供的embedding接口提供向量数据
    embedding_function=OllamaEmbeddingFunction(
        url="http://localhost:11434/api/embeddings",
        # model_name="nomic-embed-text:latest"
        model_name="bge-m3"
    ))

# 可以提前把文档解析好, 添加到 向量库中
# collection_ds.add(documents=["文档1", "文档2"], ids=["id1", "id2"])

# 查看全部文档
# docs_all = colds.get()
# print(docs_all)

prompt_text = "请问比奇是谁?"

# 查询问题的向量相关文档
query_rs = collection_ds.query(
    query_texts=[prompt_text]
)

pprint(query_rs)

# 构建一个LLM的system消息
doc_context = "\n".join([f"[CONTEXT]\n{"".join(doc_list)}\n[END CONTEXT]" for doc_list in query_rs['documents']])
system_content = "请根据上下文回答用户的问题\n" + doc_context

resp = requests.post(
    "http://localhost:11434/api/chat",
    json={
        "model": "deepseek-r1:7b",
        "messages": [
            {
                "role": "system",
                "content": system_content,
            },
            {
                "role": "user",
                "content": prompt_text,
            }
        ],
        "stream": True,
    },
    stream=True)

for line in resp.iter_lines():
    print(line)
    print(json.loads(line))
```