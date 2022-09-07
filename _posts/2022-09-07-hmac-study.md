---
title: Hmac算法练习
---

```
<?php

/**
 * @param string $key
 * @param string $text
 * @param callable $hash_func callable(string, bool)
 * @param bool $raw
 * @return string
 *
 * HMAC用公式表示：
 * H(K XOR opad, H(K XOR ipad, text))
 * 其中
 *      H：hash算法，比如（MD5，SHA-1，SHA-256）
 *      B：块字节的长度，块是hash操作的基本单位。这里B=64。
 *      L：hash算法计算出来的字节长度。(L=16 for MD5, L=20 for SHA-1)。
 *      K：共享密钥，K的长度可以是任意的，但是为了安全考虑，还是推荐K的长度>B。
 *          当K长度大于B时候，会先在K上面执行hash算法，将得到的L长度结果作为新的共享密钥。
 *          如果K的长度<B, 那么会在K后面填充0x00一直到等于长度B。
 *      text： 要加密的内容
 *      opad：外部填充常量，是 0x5C 重复B次。
 *      ipad： 内部填充常量，是0x36 重复B次。
 *      XOR： 异或运算。
 * 计算步骤如下：
 * 1. 将0x00填充到K的后面，直到其长度等于B。
 * 2. 将步骤1的结果跟 ipad做异或。
 * 3. 将要加密的信息附在步骤2的结果后面。
 * 4. 调用H方法。
 * 5. 将步骤1的结果跟opad做异或。
 * 6. 将步骤4的结果附在步骤5的结果后面。
 * 7. 调用H方法。
 */
function my_hmac($key, $text, $hash_func, $raw = false)
{
    $b = 64;
    $o_pad = str_repeat("\x5c", $b);
    $i_pad = str_repeat("\x36", $b);

    if (strlen($key) > $b) {
        $key = $hash_func($key, true);
    }
    if (strlen($key) < $b) {
        $pad = str_repeat("\x00", $b - strlen($key));
        $key .= $pad;
    }

    $i_key_pad = $key ^ $i_pad;
    $o_key_pad = $key ^ $o_pad;

    $i_text = $i_key_pad . $text;
    $i_hash = $hash_func($i_text, true);

    $o_text = $o_key_pad . $i_hash;
    $o_hash = $hash_func($o_text, $raw);

    return $o_hash;
}
$key = str_repeat('key1', 2);
$data = 'data1';

foreach (['sha1', 'md5', 'sha256', "ripemd128", "ripemd256"] as $algo) {
    echo $algo . "\n";

    $myhash = my_hmac($key, $data, function ($data, $raw = false) use ($algo) {
        return hash($algo, $data, $raw);
    });
    $syshash = hash_hmac($algo, $data, $key);
    echo "\t" . $myhash  . "\n";
    echo "\t" . $syshash . "\n";
    if ($myhash != $syshash) {
        echo "错误\n";
    }
}

```
