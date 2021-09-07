## 介绍

gm-printer-label是分拣标签和预分拣标签的组件库

```js
export * from './editor_label'//分拣标签
export * from './editor_presorting' // 预分拣标签
```

## 启动

1. yarn，安装依赖
2. yarn start 启动项目

## 使用

新老架构和工位屏都有使用

## 与 erp 进行连接测试

1. 在 gm-printer-label 中，使用`yarn link`
2. 在 gm-static-stationv2 中使用`yarn link 'gm-printer-label'`,这样就连接上了 gm-printer-label 组件库，改动组件库的时候，就可以在 gm-static-stationv2 看到效果
3. 断开连接，先在 gm-printer-label 中使用`yarn unlink`,在 gm-static-stationv2 中运行`yarn unlink 'gm-printer-label'`,重新 yarn 和 yarn start 一下
4. 可能断开连接不太好用，不好用的时候，删除 node_modeles，关闭 gm-x-printer，重新 yarn
5. yarn link 不太稳定

## 版本命名规则

1. GNU 风格的版本号命名格式：主版本号 . 子版本号 [. 修正版本号 [. 编译版本号 ]]，示例 : 1.2.1 （正式版本）, 1.2.1-beta.0(测试版本)
2. 版本号管理策略:
   1. 项目最初版本为 1.0.0
   2. 当项目在进行了局部修改或 bug 修正时，主版本号和子版本号都不变，修正版本号加 1；示例：1.0.1
   3. 当项目在原有的基础上增加了部分功能时，主版本号不变，子版本号加 1，修正版本号复位为 0。示例：1.1.0
   4. 当项目在进行了重大修改或局部修正累积较多，而导致项目整体发生全局变化时，主版本号加 1.示例：2.1.0

## 版本发布

首先先切换到 npm 的环境

1. 没有登陆过，使用`npm login`登陆，一次登陆永久使用，登陆的时候会输入密码，用户名，邮箱（公司有）

2. beta 版本包的版本发布(用来测试该版本，解决该版本的 bug)

   1. 将`pageage.json`中的`version`修改为`X.X.X-beta.0`，或者运行 `npm version X.X.X-beta.0`来更新`package.json`，同时创建一个 git 标签 (请参考 https://docs.npmjs.com/cli/version)。

      在你的版本末尾添加 `beta.0` 非常重要。`.0` 表示它是哪个版本。当我们对 `beta` 版进行修补发布新的 `beta` 版本时，我们会将 `.0` 递增到 `.1`，以此类推。

   2. ⚠️ 将该版本的包 push 到远程仓库

   3. 使用`npm publish --tag beta`发布测试版本

   4. 对版本进行修补时，只需要将`beta.0`递增到`beta.1`进行版本发布即可，以此类推

3. 正式版本的发布

   1. 遵循上面的版本命名规则，修改`pageage.json`中的`version`版本号，或者运行 `npm version X.X.X`来更新`package.json`，同时创建一个 git 标签
   2. ⚠️ 将正式版本 push 到远程仓库
   3. 使用`npm publish`发布正式版本
   4. 在自己的分支上进行发布版本即可，发完后，将分支合并到 master 上！！！

## 依赖
react react-dom
classnames
lodash
mobx mobx-react
big.js
moment

## edit 额外依赖
clipboard

