<!--
 * @Author: your name
 * @Date: 2022-02-18 15:58:53
 * @LastEditTime   : 2022-03-17 09:18:44
 * @LastEditors    : zhangKangbo
 * @FilePath       : \lemon\src\components\typeof.vue
-->
<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);

const addCount = () => {
  count.value++;
};

let promise = function (resolve) {
  let statusArr = ["pending", "fuilled", "reject"];
  if (!resolve || !(resolve instanceof Function)) {
    throw "resolve is not a function";
  }
  this.status = "pending";
  resolve();

  this.then = function (cb) {
    cb();
  };
  this.catch = function (cb) {
    cb();
  };
};

const PENDING = "PENDING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"
class PromiseTest {
  constructor (executor) {
    // 设置默认状态为 pending
    this.status = PENDING
    // 存放成功状态的值 默认为undefined
    this.value = undefined
    // 保存失败状态的值 默认为undefine
    this.reason = undefined
    // 用以保存成功的回调函数，处理异步数据
    // 实际上处理异步数据的时候就是发布订阅模式 收集依赖 -> 触发通知 -> 取出依赖执行
    this.onSaveResolveCallbacks = []
    this.onSaveRejectCallbacks = []
    // 成功的执行方法
    let resolve = (value) => {
      // 防止多次执行resolve方法 只有在状态是pending的状态下才执行
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onSaveResolveCallbacks.forEach(fn => fn ())
      }
    }

    // 失败的执行方法
    let reject = (value) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.value = value
        this.onSaveRejectCallbacks.forEach(fn => fn ())
      }
    }

    try {
      // 立即执行 将resolve 和 reject传给使用者
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  // 包含一个then方法 并接收两个参数 onFulFilled、onRejected
  then (onFulFilled, onRejected) {
    // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
    if (this.status === PENDING) {
      this.onSaveResolveCallbacks.push(()=>{
        onFulFilled(this.value)
      })
      this.onSaveRejectCallbacks.push(()=>{
        onRejected(this.reason)
      })
    } else if (this.status === FULFILLED) {
      onFulFilled(this.value)
    } else if (this.status === REJECTED) {
      onRejected(this.reason)
    }

    
  }

  
}
</script>

<template>
  <el-divider content-position="left"
    >Object.prototype.toString.call() 、 instanceof 以及
    Array.isArray()判断数组优劣</el-divider
  >
  <div class="question-details">
    <h1>1、Object.prototype.toString.call()</h1>
    <p>
      每一个继承 Object 的对象都有 toString 方法，如果 toString
      方法没有重写的话，会返回 [Object type]，其中 type 为对象的类型。但当除了
      Object 类型的对象外，其他类型直接使用 toString
      方法时，会直接返回都是内容的字符串，所以我们需要使用call或者apply方法来改变toString方法的执行上下文。
    </p>
  </div>
</template>

<style lang="scss" scoped>
.question-details {
  display: flex;
  flex-direction: column;
  text-align: left;
}
</style>
