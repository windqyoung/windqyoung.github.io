---
title: 在php和js之间使用thrift通信示例
---



t1.thrift
```thrift
namespace php P1
namespace js J1

const i32 ST_PAY = 1
const i32 ST_PAIED = 2

const i32 ST_FEMAIL = 1
const i32 ST_MAIL = 2

struct Person {
    1: i32 age
    2: string name
}

service UserService {
    string getName()
    Person getPerson()
}

```

生成php, js代码
```shell
thrift -gen php:server t1.thrift
thrift -gen js t1.thrift
```

t1.php
```php
<?php

use P1\UserServiceIf;
use P1\UserServiceProcessor;
use Thrift\Protocol\TJSONProtocol;
use Thrift\Transport\TMemoryBuffer;
use Thrift\Transport\TPhpStream;

require 'vendor/autoload.php';


class MyUserService implements UserServiceIf
{

    /**
     * @inheritDoc
     */
    public function getName()
    {
        return "My name is Lucy";
    }

    /**
     * @inheritDoc
     */
    public function getPerson()
    {
        return new \P1\Person(['age' => 12, 'name' => 'Lucy']);
    }
}

$inputTran = new TPhpStream(TPhpStream::MODE_R);
$inputTran->open();
$inputPro = new TJSONProtocol($inputTran);


$outputTrans = new TMemoryBuffer();
$outputTrans->open();
$outputPro = new TJSONProtocol($outputTrans);


$hd = new MyUserService();
$p = new UserServiceProcessor($hd);

$p->process($inputPro, $outputPro);

$outputTrans->close();
$inputTran->close();

echo $outputTrans->getBuffer();
```


t1.html
```html
<!DOCTYPE html>
<html>
<head>
    <title>thrift php and js demo</title>
    <script src="vendor/apache/thrift/lib/js/src/thrift.js"></script>

    <script src="gen-js/t1_types.js"></script>
    <script src="gen-js/UserService.js"></script>
</head>
<body>
<script>
    (function() {
        var transport = new Thrift.TXHRTransport("/thrift/t1.php");
        var protocol  = new Thrift.TJSONProtocol(transport);
        var client    = new J1.UserServiceClient(protocol);

        client.getName(function (x)  {
            console.log('x:' + x)
        })
        console.log(client.getPerson())

        console.log(J1.ST_FEMAIL)
    })();
</script>
</body>
</html>


```