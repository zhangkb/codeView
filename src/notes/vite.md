#### Glob 导入
Vite 支持使用特殊的 `import.meta.glob` 函数从文件系统导入多个模块：
```
const modules = import.meta.glob('./dir/*.js')
```
以上将会被转译为下面的样子：
```
// vite 生成的代码
const modules = {
  './dir/foo.js': () => import('./dir/foo.js'),
  './dir/bar.js': () => import('./dir/bar.js')
}
```
你可以遍历 modules 对象的 key 值来访问相应的模块：
```
for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(path, mod)
  })
}
```
匹配到的文件默认是懒加载的，通过动态导入实现，并会在构建时分离为独立的 chunk。如果你倾向于直接引入所有的模块（例如依赖于这些模块中的副作用首先被应用），你可以使用 `import.meta.globEager` 代替：


请注意：

- 这只是一个 `Vite` 独有的功能而不是一个 `Web` 或 `ES` 标准
- 该 `Glob` 模式会被当成导入标识符：必须是相对路径（以 ./ 开头）或绝对路径（以 / 开头，相对于项目根目录解析）。
- `Glob` 匹配是使用 `fast-glob` 来实现的 —— 阅读它的文档来查阅 支持的 `Glob` 模式。
- 你还需注意，`glob` 的导入不接受变量，你应直接传递字符串模式。