# DOM

@[toc]
## 1. DOM

### 1.1 DOM简介
文档对象模型（Document Object Model，简称 DOM），是 W3C 组织推荐的处理可扩展标记语言（HTML或者XML）的标准编程接口。

W3C 已经定义了一系列的 DOM 接口，通过这些 DOM 接口可以改变网页的内容、结构和样式。

### 1.2 DOM树
![image](https://img-blog.csdnimg.cn/img_convert/980e07d984b50c65427e09ead7367430.gif)
- 文档：一个页面就是一个文档，DOM 中使用 document 表示
- 元素：页面中的所有标签都是元素，DOM 中使用 element 表示
- 节点：网页中的所有内容都是节点（标签、属性、文本、注释等），DOM 中使用 node 表示

**DOM 把以上内容都看做是对象**


## 2. 获取元素
### 2.1 经典
#### 2.1.1 getElementById

```javascript
document.getElementById('id');
```

#### 2.1.2 getElementsByTagName

```javascript
 document.getElementsByTagName('标签名');
```
- 因为得到的是一个对象的集合，所以我们想要操作里面的元素就需要遍历。
- 得到元素对象是动态的
- 如果获取不到元素,则返回为空的伪数组(因为获取不到对象)


### 2.2 HTML5新增
#### 2.2.1 getElementsByClassName

```javascript
document.getElementsByClassName(‘类名’); // 根据类名返回元素对象集合
```

#### 2.2.2 querySelector
```javascript
document.querySelector('选择器'); // 根据指定选择器返回第一个元素对象
```

#### 2.2.3 querySelectorAll
```javascript
document.querySelectorAll('选择器'); // 根据指定选择器返回
```

###  2.3 body&html
#### 2.3.1 document.body 

```javascript
document.body;  // 返回 body元素对象
```

#### 2.3.2 document.documentElement

```javascript
document.documentElement; // 返回 html元素对象
```


## 3. 事件基础

### 3.1 事件三要素
1. 事件源————事件被触发的对象
2. 事件类型————如何触发 什么事件（鼠标点击、经过、键盘按下）
3. 事件处理程序————通过函数赋值完成

### 3.2 执行事件步骤
1. 获取事件源
2. 注册事件（绑定事件）
3. 添加事件处理程序

```javascript
var btn = document.getElementById('btn');
btn.onclick = function() {
  alert('你好吗');  
};

```

### 3.3 常见鼠标事件

鼠标事件 | 触发条件
---|---
onclick|鼠标点击左键触发
onmouseover|鼠标经过触发
onmoouseout|鼠标离开触发
onfocus|获得鼠标焦点触发
onblur|失去鼠标焦点触发
onmousemove|鼠标移动触发
onmouseup|鼠标弹起触发
onmousedowm|鼠标按下触发

## 4. 操作元素
### 4.1 改变元素内容

1. 从起始到终止位置，但它去除html标签，同时空格和换行也去掉
```javascript
element.innerText
```

2. 从起始到终止位置，包括html标签，同时保留空格和换行
```javascript
element.innerHTML
```

### 4.2 改变元素属性
- innerText、innerHTML 改变元素内容
- src、href
- id、alt、title

### 4.3 表单元素的属性操作
- type、value、checked、selected、disabled

### 4.4 样式属性操作

#### 4.4.1 element.style 
```javascript
element.style  // 行内样式操作
```

#### 4.4.2 element.className
```javascript
element.className // 类名样式操作
```
- 注意
1. JS 里面的样式采取驼峰命名法 比如 fontSize、 backgroundColor
2. JS 修改 style 样式操作，产生的是行内样式，CSS 权重比较高
3. 如果样式修改较多，可以采取操作类名方式更改元素样式
4. class因为是个保留字，因此使用className来操作元素类名属性
5. className 会直接更改元素的类名，会覆盖原先的类名


### 4.5 自定义属性的操作

#### 4.5.1 获取属性值

```javascript
element.属性  获取属性值。
element.getAttribute('属性');
```

区别
- element.属性  获取内置属性值（元素本身自带的属性）
- element.getAttribute(‘属性’);  主要获得自定义的属性 （标准） 我们程序员自定义的属性

#### 4.5.2 设置属性值

```javascript
element.属性 = '值'  // 设置内置属性值
element.setAttribute('属性', '值'); 
```

区别
- element.属性  设置内置属性值
- element.setAttribute('属性');  主要设置自定义的属性 （标准）

#### 4.5.3 移除属性

```javascript
element.removeAttribute('属性');
```


### 4.6 H5自定义属性
自定义属性目的：是为了保存并使用数据。有些数据可以保存到页面中而不用保存到数据库中。

自定义属性获取是通过getAttribute(‘属性’) 获取。

但是有些自定义属性很容易引起歧义，不容易判断是元素的内置属性还是自定义属性。所以H5做了一些新的规定


#### 4.6.1 设置H5自定义属性
- H5规定自定义属性data-开头做为属性名并且赋值。

```javascript
<div data-index='1'></div>
```

```javascript
element.setAttribute('data-index', 2)
```


#### 4.6.2 获取H5自定义属性
##### 4.6.2.1 兼容性获取   

```javascript
element.getAttribute('data-index');
```

##### 4.6.2.2 H5新增 (IE11+ )

```javascript
element.dataset.index;  
element.dataset['index'];   // ie 11才开始支持
```
dataset 是一个集合，里面存放了所有以data开头的自定义属性

```html

<div getTime="20" data-index="2" data-list-name="andy"></div>

<script>
    var div = document.querySelector('div');
    // console.log(div.getTime); // undefined
    console.log(div.getAttribute('getTime'));
    div.setAttribute('data-time', 20);
    console.log(div.getAttribute('data-index'));
    console.log(div.getAttribute('data-list-name'));
    // h5新增的获取自定义属性的方法 它只能获取data-开头的
    // dataset 是一个集合里面存放了所有以data开头的自定义属性
    console.log(div.dataset);
    console.log(div.dataset.index);
    console.log(div.dataset['index']);
    // 如果自定义属性里面有多个-链接的单词，我们获取的时候采取 驼峰命名法
    console.log(div.dataset.listName);
    console.log(div.dataset['listName']);
</script>
```

## 5 节点操作

### 5.1 获取元素通常使用两种方式

#### 5.1.1 利用 DOM 提供的方法获取元素
- document.getElementById() 
- document.getElementsByTagName()
- document.querySelector  等
- 逻辑性不强、繁琐

#### 5.1.2 利用节点层级关系获取元素
- 利用父子兄节点关系获取元素
- 逻辑性强， 但是兼容性稍差

**这两种方式都可以获取元素节点，我们后面都会使用，但是节点操作更简单**


### 5.2 节点概述
- 网页中的所有内容都是节点（标签、属性、文本、注释等），在DOM 中，节点使用 node 来表示。
- HTML DOM 树中的所有节点均可通过 JavaScript 进行访问，所有 HTML 元素（节点）均可被修改，也可以创建或删除。

![image](https://img-blog.csdnimg.cn/img_convert/d376b637e076e430c1adc7664360e795.gif)

- 一般地，节点至少拥有nodeType（节点类型）、nodeName（节点名称）和nodeValue（节点值）这三个基本属性。
1. 元素节点  nodeType  为 1
2. 属性节点  nodeType  为 2
3. 文本节点  nodeType  为 3 （文本节点包含文字、空格、换行等）

- 我们在实际开发中，节点操作主要操作的是**元素节点**

### 5.3 节点层级
- 利用 DOM 树可以把节点划分为不同的层级关系，常见的是父子兄层级关系。

#### 5.3.1 父级节点 parentNode 
```
node.parentNode
```
- parentNode 属性可返回某节点的父节点，注意是**最近的**一个父节点
- 如果指定的节点没有父节点则返回 null 

#### 5.3.2 子节点 

##### childNodes
```javascript
 1. parentNode.childNodes（标准）   

```
- parentNode.childNodes 返回包含指定节点的子节点的集合，该集合为即时更新的集合。
- 注意：返回值里面包含了所有的子节点，包括元素节点，文本节点等。
- 如果只想要获得里面的元素节点，则需要专门处理。
- 所以我们一般**不提倡使用**childNodes

```
var ul = document. querySelector(‘ul’);
for(var i = 0; i < ul.childNodes.length;i++) {
if (ul.childNodes[i].nodeType == 1) {
    // ul.childNodes[i] 是元素节点
    console.log(ul.childNodes[i]);
    }
}

```javascript
##### children

```
parentNode.children（非标准）  

```
- parentNode.children 是一个只读属性，返回所有的子元素节点
- 它只返回子元素节点，其余节点不返回 （这个是我们重点掌握的）
- 虽然children 是一个非标准，但是得到了各个浏览器的支持，因此我们可以放心使用

##### firstChild  

```javascript
parentNode.firstChild  
```
- firstChild 返回第一个子节点，找不到则返回null
- 同样，也是包含所有的节点

##### lastChild

```javascript
parentNode.lastChild
```
- lastChild 返回最后一个子节点，找不到则返回null
- 同样，也是包含所有的节点。

##### firstElementChild   

```javascript
parentNode.firstElementChild
```

- firstElementChild  返回第一个子元素节点，找不到则返回null

##### lastElementChild

```javascript
parentNode.lastElementChild
```
   
- lastElementChild 返回最后一个子元素节点，找不到则返回null。  

注意：这两个方法有**兼容性问题**，IE9 以上才支持。

##### 实际开发
- 实际开发中，firstChild 和 lastChild 包含其他节点，操作不方便，而 firstElementChild 和 lastElementChild 又有兼容性问题，那么我们如何获取第一个子元素节点或最后一个子元素节点呢？


- 解决方案：
- 如果想要第一个子元素节点，可以使用 
```javascript
parentNode.chilren[0] 
```

- 如果想要最后一个子元素节点，可以使用

```javascript
parentNode.chilren[parentNode.chilren.length - 1]  
```

#### 5.3.3 兄弟节点 

##### nextSibling

```javascript
node.nextSibling  
```
- nextSibling 返回当前元素的下一个兄弟元素节点，找不到则返回null。
- 同样，也是包含所有的节点。

##### previousSibling

```javascript
node.previousSibling
```
- previousSibling 返回当前元素上一个兄弟元素节点，找不到则返回null。
- 同样，也是包含所有的节点。

##### nextElementSibling

```javascript
node.nextElementSibling
```
- nextElementSibling 返回当前元素下一个兄弟元素节点，找不到则返回null。 

##### previousElementSibling
```javascript
node.previousElementSibling
```
- previousElementSibling 返回当前元素上一个兄弟节点，找不到则返回null。 
- 注意：这两个方法有**兼容性问题**， IE9 以上才支持。

##### 解决兼容性问题
问：如何解决兼容性问题 ？
答：自己封装一个兼容性的函数  

```javascript
   function getNextElementSibling(element) {
      var el = element;
      while (el = el.nextSibling) {
        if (el.nodeType === 1) {
            return el;
        }
      }
      return null;
    }  

```

### 5.4 创建节点

```javascript
document.createElement('tagName')
```

- document.createElement() 方法创建由 tagName 指定的 HTML 元素
- 因为这些元素原先不存在，是根据我们的需求动态生成的，所以我们也称为**动态创建元素节点**


### 5.5 添加节点

#### appendChild

```javascript
node.appendChild(child)
```

- node.appendChild() 方法将一个节点添加到指定父节点的子节点列表末尾
- 类似于 CSS 里面的 after 伪元素
- 类似于数组的push

#### insertBefore

```javascript
node.insertBefore(child, 指定元素)
```

- node.insertBefore() 方法将一个节点添加到父节点的指定子节点前面
- 类似于 CSS 里面的 before 伪元素

### 5.5 删除节点 removeChild

```javascript
node.removeChild(child)
```
- node.removeChild() 方法从 DOM 中删除一个子节点，返回删除的节点。


### 5.6 复制节点(克隆节点) cloneNode
 
```javascript
node.cloneNode()
```

- node.cloneNode() 方法返回调用该方法的节点的一个副本。 
- 也称为克隆节点/拷贝节点

- 注意：
1. 如果括号参数为空或者为 false则是浅拷贝，即只克隆复制节点本身，不克隆里面的子节点。
2. 如果括号参数为 true ，则是深度拷贝，会复制节点本身以及里面所有的子节点。

### 5.7 三种动态创建元素区别

```javascript
document.write()
element.innerHTML
document.createElement()
```

1. document.write 是直接将内容写入页面的内容流，但是文档流执行完毕，则它会导致页面全部重绘
2. innerHTML 是将内容写入某个 DOM 节点，不会导致页面全部重绘
3. innerHTML 创建多个元素效率更高（不要拼接字符串，采取数组形式拼接），结构稍微复杂
4. createElement() 创建多个元素效率稍低一点点，但是结构更清晰
- 总结：不同浏览器下，innerHTML 效率要比 creatElement 高


## 6. 总结

- 文档对象模型（Document Object Model，简称 DOM），是 W3C 组织推荐的处理可扩展标记语言（HTML或者XML）的标准编程接口。
- W3C 已经定义了一系列的 DOM 接口，通过这些 DOM 接口可以改变网页的内容、结构和样式。

1. 对于JavaScript，为了能够使JavaScript操作HTML，JavaScript就有了一套自己的dom编程接口。
2. 对于HTML，dom使得html形成一棵dom树.  包含 文档、元素、节点

- 我们获取过来的DOM元素是一个对象（object），所以称为 文档对象模型

- 关于dom操作，我们主要针对于元素的操作。主要有创建、增、删、改、查、属性操作、事件操作。

### 6.1 创建
1. document.write
- 如果页面文档加载完毕，再调用它会导致页面重绘
2. innerHTML
3. createElement

### 6.2 增
1. appendChild
2. insertBefore

### 6.3 删
1. removeChild

### 6.4 改
- 主要修改dom的元素属性，dom元素的内容、属性, 表单的值等
- 修改元素属性： src、href、title等
- 修改普通元素内容： innerHTML 、innerText
- 修改表单元素： value、type、disabled等
- 修改元素样式： style、className

### 6.5 查
- 主要获取查询dom的元素

1. DOM提供的API方法  
- getElementById、
- getElementsByTagName  
- 古老用法 不太推荐 
2. H5提供的新方法 
- querySelector、
- querySelectorAll   
- 提倡
3. 利用节点操作获取元素 
- 父(parentNode)
- 子(children)
- 兄(previousElementSibling、nextElementSibling)
- 提倡

### 6.6 属性操作
- 主要针对于自定义属性。

1. setAttribute：设置dom的属性值
2. getAttribute：得到dom的属性值
3. removeAttribute移除属性

### 6.7 事件操作
给元素注册事件
