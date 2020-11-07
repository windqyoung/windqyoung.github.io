---
title: python的查找器,加载器,导入器示例
---



```python


import sys
from importlib.machinery import ModuleSpec
import inspect


def trace(*args, **kwargs):
    t = inspect.stack()[1];
    print(f'\t{t.lineno}:{t.function:16} {args}, {kwargs}')


class MyFinder:
    @classmethod
    def find_spec(self, fullname, path=None, target=None): # line 17
        # 先找到模块，要返回相应的loader, loader也可以是本类
        trace(fullname, path, target)
        return ModuleSpec(fullname, MyLoader())


class MyLoader:

    def create_module(self, spec):
        trace(spec)
        module = type(sys)(spec.name)
        # 一定要加到sys.modules, 否则子模块无法查找
        sys.modules[spec.name] = module
        # 如果要一个模块，按python规范，要添加__path__属性
        module.__path__ = 'path for ' + spec.name

        return module

    def exec_module(self, module):
        trace(module)
        # 可以给 模块中添加变量
        module.__dict__['@self'] = module
        module.__dict__['name'] = module.__name__


# 注册自动加载钩子
mp = sys.meta_path
mp.append(MyFinder)

# 执行导入
# 先调用 finder.find_spec()
# 再调用 spec.create_module(), spec.exec_module()
import fac.ef

print(fac.__dict__)
print(fac.ef.__dict__)
print(fac.name)
print(fac.ef.name)


```


```output
	17:find_spec        ('fac', None, None), {}
	24:create_module    (ModuleSpec(name='fac', loader=<__main__.MyLoader object at 0x00000161F7B09B50>),), {}
	34:exec_module      (<module 'fac' (<__main__.MyLoader object at 0x00000161F7B09B50>)>,), {}
	17:find_spec        ('fac.ef', 'path for fac', None), {}
	24:create_module    (ModuleSpec(name='fac.ef', loader=<__main__.MyLoader object at 0x00000161F7A869A0>),), {}
	34:exec_module      (<module 'fac.ef' (<__main__.MyLoader object at 0x00000161F7A869A0>)>,), {}
{'__name__': 'fac', '__doc__': None, '__package__': '', '__loader__': <__main__.MyLoader object at 0x00000161F7B09B50>, '__spec__': ModuleSpec(name='fac', loader=<__main__.MyLoader object at 0x00000161F7B09B50>), '__path__': 'path for fac', '@self': <module 'fac' (<__main__.MyLoader object at 0x00000161F7B09B50>)>, 'name': 'fac', 'ef': <module 'fac.ef' (<__main__.MyLoader object at 0x00000161F7A869A0>)>}
{'__name__': 'fac.ef', '__doc__': None, '__package__': 'fac', '__loader__': <__main__.MyLoader object at 0x00000161F7A869A0>, '__spec__': ModuleSpec(name='fac.ef', loader=<__main__.MyLoader object at 0x00000161F7A869A0>), '__path__': 'path for fac.ef', '@self': <module 'fac.ef' (<__main__.MyLoader object at 0x00000161F7A869A0>)>, 'name': 'fac.ef'}
fac
fac.ef

```