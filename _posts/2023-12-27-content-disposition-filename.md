---
title: HTTP文件下载名如何编码
---

本文说明了HTTP头如何编码的问题. [编码说明文档](https://datatracker.ietf.org/doc/html/rfc5987#section-3.2.1)


以HTTP文件下载头 Content-Disposition 为例

Content-Disposition的格式为
```
Content-Disposition: attachment; filename="filename.jpg"
或者
Content-Disposition: attachment; filename*=UTF-8''pct-encode

pct-encode是用百分号编码的16进制说明.
```

官方文档说明
```
In order to include character set and language information, this
specification modifies the RFC 2616 grammar to be:

    parameter     = reg-parameter / ext-parameter

    reg-parameter = parmname LWSP "=" LWSP value

    ext-parameter = parmname "*" LWSP "=" LWSP ext-value

    parmname      = 1*attr-char

    ext-value     = charset  "'" [ language ] "'" value-chars
                ; like RFC 2231's <extended-initial-value>
                ; (see [RFC2231], Section 7)

    charset       = "UTF-8" / "ISO-8859-1" / mime-charset

    mime-charset  = 1*mime-charsetc
    mime-charsetc = ALPHA / DIGIT
                / "!" / "#" / "$" / "%" / "&"
                / "+" / "-" / "^" / "_" / "`"
                / "{" / "}" / "~"
                ; as <mime-charset> in Section 2.3 of [RFC2978]
                ; except that the single quote is not included
                ; SHOULD be registered in the IANA charset registry

    language      = <Language-Tag, defined in [RFC5646], Section 2.1>

    value-chars   = *( pct-encoded / attr-char )

    pct-encoded   = "%" HEXDIG HEXDIG
                ; see [RFC3986], Section 2.1

    attr-char     = ALPHA / DIGIT
                / "!" / "#" / "$" / "&" / "+" / "-" / "."
                / "^" / "_" / "`" / "|" / "~"
                ; token except ( "*" / "'" / "%" )
```