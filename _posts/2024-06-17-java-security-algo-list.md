---
title: 列出java支持的加密,散列,签名算法 
---


以`Cipher`开头的, 可以用`Cipher.getInstance(name)`获取
别的类型类推


```java
import java.security.Security;
import java.util.HashSet;

public class AlgoListMain {
    public static void main(String[] args) {

        var set = new HashSet<>();
        var pds = Security.getProviders();
        for (var p: pds) {
            System.out.println("提供者类" + p.getClass());
            for (var entry : p.entrySet() ) {
                var key = entry.getKey().toString();
                var pos = key.indexOf('.');
                if (pos >= 0) {
                    var type = key.substring(0, pos);
                    set.add(type);
                }

                var value = entry.getValue();
                System.out.println("===================");
                System.out.println("key = " + key);
                System.out.println("value = " + value);
            }
        }
        System.out.println("算法分类 = " + set);
    }
}
```