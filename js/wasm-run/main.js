import { sha512, append_element, default as init } from "./wasm_run.js";
init();
document.getElementById("sha512").onclick = () => {
    const input = document.getElementById("input").value;
    const result = sha512(input);
    document.getElementById("result").textContent = result;
};

let id = 0;
document.getElementById("add-ele").onclick = () => {
    append_element("元素: " + id++)
};

