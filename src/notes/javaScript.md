##### 记录未解决问题
1. input中文防抖解决

#### 数组的方法
1. `push` 向数组末尾添加任意个数据 返回数组的最新长度
2. `unshift` 在数组开头添加任意多个值 返回新数组的长度
3. `splice` 传入三个参数，分别是开始位置, 要删除的元素数量， 插入的元素 返回空数组
4. `concat` 首先为创建一个当前数组的副本, 然后再把它的参数添加到副本末尾，最后返回这个新构建的数组，不会影响元素组

删除数组

1. `pop` 删除数组的最后一项 同时减少数组的length值 返回被删除的项
2. `shift` 删除数组的第一项  返回被删除的项
3. `splice` 传入两个参数，分别是开始位置, 删除元素的位置， 返回包含删除元素的数组
4. `slice` 用于创建一个包含原有数组中一个或多个元素的新数组  不会影响原始数组
   

#### 深拷贝与浅拷贝

1. 浅拷贝

    js中基础类型书储存在栈中，引用类型存储于堆中引用类型数据存放在内对内中，每个堆内存中有一个引用地址，该引用地址存放在栈中

    浅拷贝说起来其实就是只拷贝了一层数据的拷贝，如果数据中有引用类型的数据，拷贝的还是其引用地址。
    `Object.assign`

    `Array.prototype.slice()`, `Array.prototype.concat()`

    使用拓展运算符实现的复制

    ```
    let obj = {
        name: '复制',
        details: {
            record: '01',
            txt: '复制次数'
        },
    }

    let fzObj = Object.assign({}, obj)

    let arr = [1,2,3,4,{name: ''01}]
    let fzArr = arr.slice(0)
    let fzArr = arr.concat([1])
    let fzArr2 = [...arr]
    ```
2. 深拷贝

    深拷贝开辟一个新的栈，两个对象的属性完全相同，但是对应两个不同的地址，修改要给对象的属性，不会改变另一个对象的属性。

    循环递归
    ```
    const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)
    function cloneDeep (obj, hash = new WeakMap()) {
        if (obj.constructor === Date)  return new Date(obj)       // 日期对象直接返回一个新的日期对象
        if (obj.constructor === RegExp) return new RegExp(obj)     //正则对象直接返回一个新的正则对象
        // 对象的话就要进行深拷贝
        if (hash.has(obj)) return hash.get(obj); // 防止调用自身数据的出现
        // let allDesc = Object.getOwnPropertyDescriptors(obj)

        //遍历传入参数所有键的特性

        let cloneObj = new obj.constructor()
        // 找到的是所属类原型上的constructor, 而原型上的constructor指向的是当前类本身
        hash.set(obj, cloneObj);
        for (let key of Reflect.ownKeys(obj)) {
            // Reflect.ownKeys 返回对象的所有属性key包括不可枚举属性
            cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? cloneDeep(obj[key], hash) : obj[key]
        }

        return cloneObj;
    }
    ```

#### 继承

继承是面向对象然见技术当中的一个概念，如果一个类别B继承自A就把这个B称为A的子类，而把A称为B的父类，也可以称A是B的超类

**继承的优点**

    
继承可以使得子类具有父类的各种属性和方法，而不需要再次编写相同的代码。

在子类继承父类的同时，可以重新定义某些属性，并重写某些方法，即覆盖父类的原有属性和方法，使其获得与父类不同的功能

虽然JavaScript并不是真正的面向对象语言，但它天生的灵活性，使应用场景更加丰富

**实现方式**

1. 原型链继承

    原型链继承是比较常见的继承方式之一，其中涉及的构造函数、原型和实例，三者之间存在着一定的关系，即每一个构造函数都有一个原型对象，原型对象又包含一个指向构造函数的指针，而实例则包含一个原型对象的指针。

    原型链继承会出现一个问题就是类似浅拷贝一样，继承的父类的原型链属性依然是个堆链接，子类修改的时候会同时修改父类数据
    ```
    // 定义父类
    function Parent(name) {
        this.name = name;
    }

    Parent.prototype.getName = function() {
        return this.name;
    };

    // 定义子类
    function Children() {
        this.age = 24;
    }

    // 通过Children的prototype属性和Parent进行关联继承

    Children.prototype = new Parent('陈先生');

    // Children.prototype.constructor === Parent.prototype.constructor = Parent

    var test = new Children();

    // test.constructor === Children.prototype.constructor === Parent

    test.age // 24
    test.getName(); // 陈先生

    // 我们可以发现，整个继承过程，都是通过原型链之间的指向进行委托关联，直到最后形成了”由构造函数所构造“的结局。

2. 构造函数继承（借助`call`）

    ```
     // 定义父类
    function Parent(value) {
        this.language = ['javascript', 'react', 'node.js'];
        this.value = value;
    }
    
    // 定义子类
    function Children() {
    	Parent.apply(this, arguments);
    }

    const test = new Children(666);

    test.language // ['javascript', 'react', 'node.js']
    test.value // 666

    // 构造继承关键在于，通过在子类的内部调用父类，即通过使用apply()或call()方法可以在将来新创建的对象上获取父类的成员和方法。
3. 组合继承
4. 原型式继承
5. 寄生式继承
6. 寄生组合式继承
7. ES6继承

    ```
    // 定义父类
    class Father {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        show() {
            console.log(`我叫:${this.name}， 今年${this.age}岁`);
        }
    };

    // 通过extends关键字实现继承
    class Son extends Father {};

    let son = new Son('陈先生', 3000);
    
    son.show(); // 我叫陈先生 今年3000岁
    ```
    ES6中新增了class关键字来定义类，通过保留的关键字extends实现了继承。实际上这些关键字只是一些语法糖，底层实现还是通过原型链之间的委托关联关系实现继承。

    区别于ES5的继承，ES6的继承实现在于使用super关键字调用父类，反观ES5是通过call或者apply回调方法调用父类。


#### 判断数组的方法

1. `Object.prototype.toString.call()`

    每一个继承Object的对象都有`toString`方法，如果`toString`方法没有重写的话默认返回的就是`[Object, type]`, 其中type为对象的类型，但是当除了Object类型外其他类型直接使用toString方法会直接返回内部的字符串所以我们需要call或者apply方法改变toString方法的执行上下文。
    ```
    const an = ['Hello', 'An']
    an.toString(); // Hello, An
    Object.prototype.toString.call(an) // [Object Array]
    ```
    这种方法对于所有基本的数据类型都能进行判断，即便是`null`和`undefined`

2. `instanceof` 

    `instanceof`的内部机制是通过判断对象的原型链中是不是能找到类型的`prototype`

    使用 `instanceof` 判断一个对象是否为数组，会判断这个对象的原型链上是否会找到对应的 `Array` 原型，找到返回 `true`

    ```
    [] instanceof Array // true
    ```
    但是 `instanceof` 只能用来判断对象类型，原始类型不可以，并且所有对象类型的 `instanceof Object` 都是 `true`
    ```
    [] instanceof Object // true
    ```

3. `Array.isArray()`

    用来判断对象是否为数组

    当检测`Array`实例时，`Array.isArray` 优于 `instanceof`,因为`Array.isArray`可以检测出`iframes`

    ```
    var iframe = document.createElement('iframe')

    var iframe = document.createElement('iframe');

    document.body.appendChild(iframe);

    xArray = window.frames[window.frames.length-1].Array;

    var arr = new xArray(1,2,3); // [1,2,3]

    var iframe = document.createElement('iframe');

    document.body.appendChild(iframe);

    xArray = window.frames[window.frames.length-1].Array;

    var arr = new xArray(1,2,3); // [1,2,3]
    ```
    Array.isArray() 与 Object.prototype.toString.call()

    Array.isArray()是ES5新增的方法，当不存在 Array.isArray() ，可以用 Object.prototype.toString.call() 实现。

    ```
    if (!Array.isArray) {
        Array.isArray = function(arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }
    ```
