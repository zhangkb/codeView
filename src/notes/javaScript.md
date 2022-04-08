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