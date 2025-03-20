---
title: rust 通过unsafe修改不可变变量
---


```rust




fn main() {

    let x = 42; // 不可变变量
    let ptr = &x as *const i32 as *mut i32;
    println!("原始 x = {}", x);
    unsafe { println!("原始指针值 *ptr = {}", *ptr); }

    unsafe {
        // 关键点, 需要把原ptr消耗掉
        let ptr = ptr.wrapping_add(0);
        *ptr = 666; // 强制修改内存
        println!("修改后 x = {}", *ptr); // 输出 666
        println!("原始 x = {}", x);      // 输出 666
    }

    unsafe {
        let ptr = ptr as usize;
        // 关键点, 需要把原ptr消耗掉
        let ptr = ptr + 0;
        let ptr = ptr as *mut i32;
        *ptr += 1; // 强制修改内存
        println!("修改后 x = {}", *ptr); // 输出 666
        println!("原始 x = {}", x);      // 输出 666
    }


}


```