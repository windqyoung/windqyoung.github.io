---
title: Git rebase 命令 学习心得
---


命令: git rebase --onto newbase upstream branch

把[upstream..branch](/2016/07/07/git-rev-dot.html)的commit在newbase上重新应用一次.

可以理解为:
从upstream这次提交开始(不包含upstream), 到branch为止(包含branch), 所做的修改放到newbase上

Git手册说明,如果没有指定 --onto newbase, 则--onto 取值为upstream, 如果branch没指定, 则取HEAD
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



