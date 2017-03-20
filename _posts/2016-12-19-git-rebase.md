---
title: Git rebase 命令 学习心得
---

命令
---
<pre>
用法1: git rebase --onto  &lt;newbase&gt;  &lt;since&gt;      &lt;till&gt;
用法2: git rebase --onto  &lt;newbase&gt;  &lt;since&gt;
用法3: git rebase         &lt;newbase&gt;               &lt;till&gt;
用法4: git rebase         &lt;newbase&gt;
用法5: git rebase -i ...
用法6: git rebase --continue
用法7: git rebase --skip
用法8: git rebase --abort
</pre>
添加上可选项的命令
---
<pre>
用法1: git rebase  --onto  &lt;newbase&gt;  &lt;since&gt;      &lt;till&gt;
用法2: git rebase  --onto  &lt;newbase&gt;  &lt;since&gt;      [HEAD]
用法3: git rebase [--onto] &lt;newbase&gt;  [&lt;newbase&gt;]  &lt;till&gt;
用法4: git rebase [--onto] &lt;newbase&gt;  [&lt;newbase&gt;]  [HEAD]
</pre>

变基操作的过程：
---
1. 首先会执行git checkout切换到&lt;till&gt;。

    因为会切换到&lt;till&gt;，因此如果&lt;till&gt;指向的不是一个分支（如master），则变基操作是在detached HEAD（分离头指针）状态进行的，当变基结束后，还要像在“时间旅行一”中那样，对master分支执行重置以实现把变基结果记录在分支中。
2. 将&lt;since&gt;..&lt;till&gt;所标识的提交范围写到一个临时文件中。

    &lt;since&gt;..&lt;till&gt;是指包括&lt;till&gt;的所有历史提交排除&lt;since&gt;以及&lt;since&gt;的历史提交后形成的版本范围。
3. 当前分支强制重置（git reset –hard）到&lt;newbase&gt;。

    相当于执行：git reset –hard &lt;newbase&gt;。
4. 从保存在临时文件中的提交列表中，一个一个将提交按照顺序重新提交到重置之后的分支上。
5. 如果遇到提交已经在分支中包含，跳过该提交。
6. 如果在提交过程遇到冲突，变基过程暂停。用户解决冲突后，执行git rebase –continue继续变基操作。或者执行git rebase –skip跳过此提交。或者执行git rebase –abort就此终止变基操作切换到变基前的分支上。

把[since..till](/2016/07/07/git-rev-dot.html)的commit在newbase上重新应用一次.

可以理解为:
从since这次提交开始(不包含since), 到till为止(包含till), 所做的修改放到newbase上

Git手册说明,如果没有指定 --onto newbase, 则--onto 取值为since, 如果till没指定, 则取HEAD
<hr>
以下资料来自[git rebase手册](https://git-scm.com/docs/git-rebase)

<pre>
      A---B---C topic
     /
D---E---F---G master

# master..topic => A B C
git rebase master
git rebase master topic

              A'--B'--C' topic
             /
D---E---F---G master
</pre>

<pre>
                         H---I---J topicB
                        /
              E---F---G  topicA
             /
A---B---C---D  master

# topicA..topicB => H I J
git rebase --onto master topicA topicB

              H'--I'--J'  topicB
             /
            | E---F---G  topicA
            |/
A---B---C---D  master

</pre>

<hr >
以下展示一个去除某一提交的功能
<pre>
E---F---G---H---I---J  topicA

# topicA~5 => E
# topicA~3 => G
# topicA~3..topicA => G..J => H I J
git rebase --onto topicA~5 topicA~3 topicA

E---H'---I'---J'  topicA
</pre>



