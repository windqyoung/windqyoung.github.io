---
title: Ansible 简单总结
---


1. 使用 `debug.msg`, `debug.var` 来输出变量

2. 使用 `debugger: always` 调度来查看可用的变量

    调试中, 可用 `p locals()` 查看变量

3. [yaml可用关键字](https://docs.ansible.org.cn/ansible/latest/reference_appendices/playbooks_keywords.html)

4. 环境变量 `ANSIBLE_KEEP_REMOTE_FILES=` 来保留远程主机上的文件

5. 可在 `playbook目录/library/` 中放自定义模块, 模块文件旁边放个同名的 `.yaml` 文件, 可以当文档文件

6. `ansible-inventory` 查看清单列表

7. `ansible-vault` 可以加密文件或变量

8. `--vault-id dev@password-client` 可以转换成 `password-client --vault-id=dev` 来获取相应的密码

9. [在模板中可以使用的变量](https://docs.ansible.org.cn/ansible/latest/reference_appendices/special_variables.html)

10. [ansible版本支持](https://docs.ansible.org.cn/ansible/latest/reference_appendices/release_and_maintenance.html#ansible-core-support-matrix)