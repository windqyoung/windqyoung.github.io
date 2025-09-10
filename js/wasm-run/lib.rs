
use sha2::{Digest, Sha512};
use wasm_bindgen::prelude::*;
use web_sys::{Node};

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, wasm-run!");
}

#[wasm_bindgen]
pub fn sha512(data: &str) -> String {
    let mut hasher = Sha512::new();
    hasher.update(data.as_bytes());
    let result = hasher.finalize();

    format!("{:x}", result)
}

#[wasm_bindgen]
pub fn append_element(text: &str) {
    let window = web_sys::window().expect("no global `window` exists");
    let doc = window.document().expect("should have a document on window");
    let ele = doc.create_element("div").expect("创建div失败");
    ele.set_inner_html(text);
    let body: &Node = &doc.body().expect("获取body");
    body.append_child(&ele).expect("插入错误");
}

#[wasm_bindgen(start)]
fn start() {
    set_panic_hook();
}

pub fn set_panic_hook() {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function at least once during initialization, and then
    // we will get better error messages if our code ever panics.
    //
    // For more details see
    // https://github.com/rustwasm/console_error_panic_hook#readme
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}
