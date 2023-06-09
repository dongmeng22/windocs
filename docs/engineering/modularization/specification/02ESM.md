##  大一统的模块化规范——ES6模块化

之前那些社区提出的标准化，存在一定的差异性与局限性，并不是浏览器与服务器通用的模块化标准

在ES6语法规范中，在**语言层面**上定义了ES6模块化规范，是浏览器端与服务器端通用的模块化开发规范

- 每个js文件都是一个独立的模块
- 导入模块成员 使用 `import` 关键字
- 暴露模块成员 使用 `export` 关键字

# 4. ES6模块化基本使用
## 4.1 export 模块暴露数据

> 导出的是一个值的引用，不是复制的值。

### 4.1.1 分别暴露 (按需暴露)
m1.js
```javascript
export let school = 'YKyk';
export function teach() {
	console.log('teach');
}
```
### 4.1.2 统一暴露

m2.js
```javascript
let school = 'YKyk';
function find() {
	console.log('find');
}
export {school, teach}
```
### 4.1.3 默认暴露

m3.js
```javascript
export default {
	school: 'YKyk',
	change: function(){
		console.log('change');
	}
}
```

## 4.2 import引入模块

> 导入的成员是只读的
### 4.2.1 通用的引入
```javascript
import * as m1 from "./src/js/m1.js"
m1.teach();

import * as m3 from "./src/js/m3.js"
m3.default.change();
```
### 4.2.2 解构赋值形式（按需引入）

```javascript
import { school, teach } from "./src/js/m1.js"
teach();

import { school as yk, find } from "./src/js/m2.js" // 起别名
console.log(yk);

import { default as m3 } from "./src/js/m3.js"
m3.change();
```
### 4.2.3 针对默认暴露的简便导入形式

```javascript
import m3 from "./src/js/m3.js"
m3.change();
```
名字其实可以随便起

## 4.3 直接导入并执行模块代码

m4.js

```javascript
for(let i = 0; i<3; i++) {
	console.log(i);
}
```

```javascript
import {} from './m4.js' // 直接导入并执行模块代码
import './m4.js' // 简写
```

## 4.4 浏览器使用

```html
<script type="module">
	// 写引入import代码
</script>
```
还可以专门写一个js文件引入模块

```html
<script src=".src/js/app.js" type="module"></script>
```

项目中一般不会这样用，而是用`babel`


- 自动采用严格模式，忽略`'use strict'`
- 每个ESM模块都是单独的私有作用域
- ESM是通过CORS去请求外部JS模块
- ESM的script标签会延迟执行脚本`defer`

### polyfill

```html
<script nomodule src="https://unpkg.com/promise-polyfill@8.1.3/dist/polyfill.min.js"></script>

<script nomodule src="https://unpkg.com/browser-es-module-loader@0.4.1/dist/babel-browser-build.js"></script>

<script nomodule src="https://unpkg.com/browser-es-module-loader@0.4.1/dist/browser-es-module-loader.js"></script>
```

# 动态导入
```js
import('./module.js').then((module) => {
  console.log(module)
})
```


# 5. 项目中使用babel

1. 安装工具  

①babel-cli ②babel-preset-env ③browserify(或者webpack)

```powershell
npm i babel-cli babel-preset-env browserify -D
```

2. 运行

局部安装前面加上npx

```powershell
npx babel src/js -d dist/js --preset=babel-preset-env
```

3. 打包

```powershell
npx browserify dist/js/app.js -o dist/bundle.js
```

打包的文件就可以引入到浏览器中使用


# Node中使用ESM


10版本的node 通过将js文件后缀名改为mjs即可

12版本的node 直接在package.json中添加字段{"type": "module",}即可，此时如果再想使用commonjs就需要把文件名改为.cjs才可以

## 与CommonJS模块交互





## 6. ES6模块化引入npm包

1. 装包

```powershell
npm i jquery
```

2. 入口文件引入

```javascript
import $ from 'jquery' // const $ = require("jquery")
```

## 7. Node.js中通过babel体验ES6模块化

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95aa7ef9c07e4e79946b96de07b866e8~tplv-k3u1fbpfcp-watermark.image?)

```powershell
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node 
```

```powershell
npm install --save @babel/polyfill
```

项目根目录中创建配置文件babel.config.js

```javascript
const persets = [
	["@babel/env", {
		targets: {
			edge: "17",
			firefox: "60",
			chrome: "67",
			safari: "11.1"
		}
	}]
];
module.exports = { presets };
```

执行js代码
```powershell
npx babel-node index.js
```


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd0b3469b6d84ac5b5893ce00820e6f2~tplv-k3u1fbpfcp-watermark.image?)