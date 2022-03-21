## 重绘和回流 以及如何进行优化  

<img src="@/../../../public/image/reflow.png">

1. 浏览器渲染机制
   - 浏览器采用流式布局模型 `Flow Based Layout`
   - 浏览器会把`HTML`模型解析成`DOM`,`CSS`解析成`CSSOM`,DOM和CSSOM合并就产生了渲染树`Render Tree`
   - 渲染树 -> 知道 -> 所有节点样式 -> 计算在页面上的大小和位置 -> 把节点绘制在页面上
   - 由于流式布局的存在，对渲染树的计算通常只需要遍历一次就可完成，但是 **`table`及其内部元素除外，它们可能需要多次计算，通常需要花费3倍的时间，这也是尽量不使用table布局的原因之一。**
2. 重绘（Painting）
   - 节点的`几何属性`、`样式` 发生改变，不 `影响布局`，称为重绘。比如`outline, visibility, color,background-color`等，重绘代价高昂。主要原因就是浏览器需要验证DOM树上其他节点元素的可见性。
3. 回流 (Layout)
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
   