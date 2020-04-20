#### webpack v4 study 
#### git常用操作记录


```
1. 如何将本地的一个项目与远程仓库关联，并上传项目到远程仓库

- 远程仓库地址如：git@github.com:likengkeng/webpackv4-study.git
- 本地项目执行 git init (创建本地仓库)
- 本地库的master分支和远程库的master分支建立联系
  git remote add origin git@github.com:likengkeng/webpackv4-study.git
  
- git remote -v查询

- 接下来就是git常规操作了
  git add .
  git commit -m "提交信息"
  git push --set-upstream origin master(第一次管理分支，后面直接git push)


2. 补充： git修改远程仓库地址
- 先删后加
git remote rm origin
git remote add origin [url]
  
```

启动学习项目
```
- 利用npm或者yarn安装依赖包
npm install / yarn

- 开发环境运行
yarn dev

- 生产环境
yarn build

```
