## 重绘和回流 以及如何进行优化  

<img src="@/../../../public/image/reflow.png">

1. 浏览器渲染机制
   - 浏览器采用流式布局模型 `Flow Based Layout`
   - 浏览器会把`HTML`模型解析成`DOM`,`CSS`解析成`CSSOM`,DOM和CSSOM合并就产生了渲染树`Render Tree`
   - 渲染树 -> 知道 -> 所有节点样式 -> 计算在页面上的大小和位置 -> 把节点绘制在页面上
   - 由于流式布局的存在，对渲染树的计算通常只需要遍历一次就可完成，但是 **`table`及其内部元素除外，它们可能需要多次计算，通常需要花费3倍的时间，这也是尽量不使用table布局的原因之一。**
2. 重绘（repaint）
   - 节点的`几何属性`、`样式` 发生改变，不 `影响布局`，称为重绘。比如`outline, visibility, color,background-color`等，重绘代价高昂。主要原因就是浏览器需要验证DOM树上其他节点元素的可见性。
3. 回流 (reflow)
   - 回流是 `布局、几何属性 `改变，影响页面布局。回流是影响浏览器性能的关键因素。一个元素回流可能会导致所有子元素以及DOM中紧随其后的节点、祖先节点元素的随后的回流。（可以理解为雪崩）

   <br />

   > 回流必发生重绘，重绘不一定会引发回流。

4. 浏览器优化
   - 现代浏览器 队列机制 批量更新布局。浏览器会把修改操作放在队列中，至少一个浏览器刷新(即16.6ms)才会清空队列。但是当你 **获取布局信息的时候,队列中可能有会影响这些属性或方法返回值的操作即是没有,浏览器也会强制清空队列,出发回流与重绘来确保返回正确的值.**
   - 主要包括以下属性或方法.
     ```
     offsetTop、offsetLeft, offsetWidth, offsetHiehgt, 
     scrollTop, scrollLeft, scrollWidth, scrollHeight,
     clientTop, clientLeft, clientWidth, clientHeight,
     width, height,
     getComputerStyle()
     getBoundingClientRect()
     ```
   
      所以我们应该避免频繁的使用上诉的属性，他们都会强制渲染刷新队列。
      
      <!-- 根据理解，实际就是只要我们在js 中获取了页面dom的布局信息，那么就会导致浏览器回流与重绘的出现 -->

5. 减少重绘与回流。
   - CSS: 使用`transform`替代`top`、
       - 使用`visibility` 替换`display: none;`、
       - 避免使用 `table` 布局、
       - 尽可能在DOM树的最末端改变class、
       - 避免设置多层内联样式 **CSS选择符从右往左查找** 避免节点层级过多、
       - CSS3硬件加速，可以让transform、opacity、filters这些动画不会引起回流重绘 。
       - 将动画效果应用到position属性为absolute或fixed的元素上
   - javaScript
     - 避免频繁操作样式，最好一次性重写style属性，或者使用class一次性更改。
     - 避免频繁操作DOM
     - 避免频繁读取会引发回流/重绘的属性，如果确实需要，那用变量保存
     - 对具有复杂动画的元素使用绝对定位，使他脱离文档流，否则会引起父元素及后续元素频繁回流


## 谈谈你对盒模型的理解

   盒模型是什么？

   在对文档进行布局的时候，浏览器的渲染引擎会根据CSS基础框盒模型`CSS basic box model` 将所有元素表示为一个个矩形的盒子。

   一个盒子有四部分组成：`content padding border margin`

   对于标准盒模型，在计算盒模型的总宽度的时候是
   
   `boxWidth = margin + border + padding + content`

   IE怪异盒子模型中 `padding border` 是包含在 `width height` 中的

   css 中的`box-sizing`属性定义了引擎应该如何计算一个元素的总宽度和总高度。

   ```
   box-sizing: content-box|border-box|inheirt;

   // content-box 默认值，与标准盒模型计算方式一致
   // border-box 与IE怪异盒模型计算方式一致
   // inherit 继承父元素值

   ```
   

## 谈谈BFC

   #### 1. 是什么？
   Block Fmormatting Context 块级格式化上下文，实际上就是一个页面中的一块渲染区域，有自己的渲染规则，我的理解就是Block规则
   1. 内部的盒子会在垂直方向上一个接一个的放置。
   2. 对于同一个BFC的两个相邻的盒子的`margin`会发生重叠，与方向无关。
   3. 每个元素的左外边距与包含块的左边界相接触(从左到右)，即使浮动元素依然如此。
   4. BFC的区域不会与`Float`元素重叠
   5. 计算BFC的高度时，浮动子元素也参与计算。
   6. BFC就是页面上的一个隔离的独立容器，容器里的子元素不会影响到外面的元素，反之亦然。
   
   `BFC` 目的which形成一个相对外界独立的空间，让内部的子元素不会影响到外界元素。

   #### 2. 触发条件
   1. 根元素即`HTML`元素
   2. 浮动元素：`float: left/right;`
   3. `overflow`的值不为`visible` 也即是 `overflow: auto/scroll/hidden;`
   4. `display: inline-block/inltable-cell/table-caption/table/inline-table/flex/inline-flex/grid/inline-grid;`
   5. `position: absolute/fixed;`

#### 3. 应用场景
1. 防止`margin`塌陷。
2. 清除浮动
3. 多栏布局



### 垂直居中方式
1. 利用定位 + `margin:auto`

   ```
      <style>
         // 父级设置相对定位
         .father{
            width:500px;
            height:300px;
            border:1px solid #0a3b98;
            position: relative;
         }
         // 子级绝对定位设置margin: auto 就会自动水平垂直居中，margin: 0 auto;就是水平居中
         .son{
            width:100px;
            height:40px;
            background: #f0a238;
            position: absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            margin:auto;
         }
      </style>
      <div class="father">
         <div class="son"></div>
      </div>
   ```
2. 利用定位 + `margin： 负值`
3. 利用定位 + `transform`
4. `flex`布局
5. `grid`布局
6. 总结：

   根据元素标签的性质基本可以分为：
   
   - 内联元素居中布局

      水平居中：行内元素可设置：`text-align: center`、flex父级 `display: flex; justify-content: center;`
      
      垂直居中：`line-height: height`

   - 块级元素居中布局

      水平居中：`margin: 0 auto`、绝对定位 + `left: 50%` + `margin: -self/2`

      垂直居中：`position: absolute设置left、top、margin-left、margin-top(定高)`、`display: table-cell`、`transform: translate(x, y)`、`flex`(不定高，不定宽)、`grid`(不定高，不定宽)，兼容性相对比较差



#### CSS 性能优化

1. 实现方式

      - 内联首屏关键CSS
      - 异步加载CSS

         在CSS文件请求、下载、解析完成之前,CSS会阻塞渲染，浏览器将不会渲染人和已处理的内容。

         前面加载内联代码后，后面外部引用CSS则没必要阻塞浏览器渲染，这时候就能采取异步加载的方法了

         使用js将link标签插入到head标签最后  
         ```
         // 创建link标签
         const myCSS = document.createElement( "link" );
         myCSS.rel = "stylesheet";
         myCSS.href = "mystyles.css";
         // 插入到header的最后位置
         document.head.insertBefore( myCSS, document.head.childNodes[ document.head.childNodes.length - 1 ].nextSibling );
         ```

         设置link标签media属性为noexis，浏览器会认为当前样式表不适用当前类型，会在不阻塞页面渲染的情况下再进行下载。加载完成后，将media的值设为screen或all，从而让浏览器开始解析CSS
         ```
         <link rel="stylesheet" href="mystyles.css" media="noexist" onload="this.media='all'">
         ```
         通过rel属性将link元素标记为alternate可选样式表，也能实现浏览器异步加载。同样别忘了加载完成之后，将rel设回stylesheet
         ```
         <link rel="alternate stylesheet" href="mystyles.css" onload="this.rel='stylesheet'">
         ```

      - 资源压缩

         利用webpack、gulp/grunt、rollup等模块化工具，将css代码进行压缩，使文件变小，大大降低了浏览器的加载时间



      - 合理使用选择器

         不要嵌套使用过多复杂选择器，最好不要三层以上

         使用id选择器就没必要再进行嵌套

         通配符和属性选择器效率最低，避免使用

      - 减少使用昂贵的属性

         在页面发生重绘的时候，昂贵属性如box-shadow/border-radius/filter/透明度/:nth-child等，会降低浏览器的渲染性能
         
      - 不要使用@import