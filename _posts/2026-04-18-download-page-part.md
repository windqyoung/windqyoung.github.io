---
title: 保存页面的部分为html
---

<style>
    .c1 {
        color: red;
    }
</style>

<div id="app">
    <div class="c1">这儿是要保存的内容</div>
    <button onclick="save_html()">保存</button>
</div>



<script id="download_template" type="template">
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"></meta>
  <title>${title}</title>
  <style>
      ${style}
  </style>
</head>
<body>
<div id="app" data-desc="TODO">
  ${body}
</div>
</body>
</html>
</script>



<script>

const save_html = () => {
  const inner = document.querySelector('#app').innerHTML;

  const html = build_web_page(inner, '详情')

  download_web_page(html, '详情.html')

}



function build_web_page(body, title) {
  const style = get_style_content();
  return download_template.replace("${style}", style).replace("${body}", body).replace("${title}", title || '')
}


function get_style_content()
{
  const style_list = [];

  const styleSheets = document.styleSheets;
  for (let i_ss = 0; i_ss < styleSheets.length; i_ss++ ) {
    const style = styleSheets[i_ss];
    for (let i_css_rule = 0; i_css_rule < style.cssRules.length; i_css_rule++) {
      const rule = style.cssRules[i_css_rule];
      style_list.push(rule.cssText);
    }
  }

  return style_list.join("\n\n");
}


function download_web_page(content, filename) {
  const blob = new Blob([content], { type: 'text/html;charset=utf-8' });

  const a = document.createElement('a');
  a.style = "display:none";
  a.href = URL.createObjectURL(blob);
  a.download = filename
  document.body.appendChild(a);
  a.click();
}

</script>
