
      (function (graph) {
        // 声明require 函数，用来加载 通过babel 转换过的代码
        function require(module) {
          // 当前模块依赖，调用require函数，eval执行，拿到exports
          function localRequire(relativePath) {
            console.log(graph[module].dependecies[relativePath])
            return require(graph[module].dependecies[relativePath])
          }
          // 定义exports ，收集模块的依赖
          var exports = {};

          // 通过一个个闭包，讲exports 不断向外暴露，最后得到entry的所有依赖

          (function (require, exports, code) {

            // 执行babel转化过的代码

            eval(code);
          })(localRequire, exports, graph[module].code);

          // 将export 的依赖暴露到外层
          return exports;
        }

        // 从入口开始执行
        require('./src/index.js')
      })({"./src/index.js":{"dependecies":{"./utils.js":"./src\\utils.js"},"code":"\"use strict\";\n\nvar _utils = require(\"./utils.js\");\n\nvar a = 123;\n\nfunction fn() {\n  console.log(a);\n}\n\n(0, _utils.utils)();\nfn();"},"./src\\utils.js":{"dependecies":{"./a.js":"./src\\a.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.utils = void 0;\n\nvar _a = require(\"./a.js\");\n\nvar utils = function utils() {\n  console.log('holle ' + _a.ttx);\n  console.log(_a.ttq);\n};\n\nexports.utils = utils;"},"./src\\a.js":{"dependecies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.ttx = exports.ttq = void 0;\nvar ttq = 'ttq';\nexports.ttq = ttq;\nvar ttx = 'ttx';\nexports.ttx = ttx;"}})
    