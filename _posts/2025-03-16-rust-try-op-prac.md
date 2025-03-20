---
title: rust try 操作符练习
---

```rust
#![feature(try_trait_v2)]

use std::fmt::Debug;
use std::ops::{ControlFlow, FromResidual, Try};

fn main()
{
    let rr1 = run1();
    println!("run1结果: {:?}", rr1);
}

fn run1() -> MyResult
{
    let ok = MyResult::MyOk(1123)?;
    println!("ok输出为: {:?}", ok);
    let err = MyResult::MyErr("错误".into())?;
    println!("err输出为: {:?}", err);
    
    MyResult::MyOk(9912)
}

#[derive(Debug)]
enum  MyResult
{
    MyOk(i32),
    MyErr(String),
}

impl FromResidual for MyResult {
    fn from_residual(residual: <Self as Try>::Residual) -> Self {
        println!("from_residual参数: {:?}", residual);
        MyResult::MyErr(residual)
    }
}

impl Try for MyResult {
    type Output = Result<i32, String>;
    type Residual = String;
    fn from_output(output: Self::Output) -> Self {
        println!("from_output, output:{output:?}");
        match output {
            Ok(ok) => {
                println!("from_output<UNK>: {:?}", ok);
                MyResult::MyOk(ok)
            }
            Err(err) => {
                println!("from_output<Err>: {:?}", err);
                MyResult::MyErr(err)
            }
        }
    }

    fn branch(self) -> ControlFlow<Self::Residual, Self::Output> {
        println!("分支执行 branch: {:?}", self);
        match self { 
            MyResult::MyOk(output) => {
                println!("MyResult::MyOk({:?})", output);
                ControlFlow::Continue(Ok(output))
            },
            MyResult::MyErr(e) => {
                println!("MyResult::MyErr({e:?})");
                ControlFlow::Break(e)
            },
        }
    }
}

/*
OUTPUT:
分支执行 branch: MyOk(1123)
MyResult::MyOk(1123)
ok输出为: Ok(1123)
分支执行 branch: MyErr("错误")
MyResult::MyErr("错误")
from_residual参数: "错误"
run1结果: MyErr("错误")
 */
 
 ```
