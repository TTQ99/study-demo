
      (function (graph) {
        console.log(graph);
        function require(module) {
          function localRequire(relativePath) {
            console.log(graph[module].dependecies[relativePath])
            return require(graph[module].dependecies[relativePath])
          }
          var exports = {};
          (function (require, exports, code) {
            eval(code);
            console.log(exports)
          })(localRequire, exports, graph[module].code);
          return exports;
        }
        require('./src/index.js')
      })({"./src/index.js":{"dependecies":{"./utils.js":"./src/utils.js"},"code":"\"use strict\";\n\nvar _utils = require(\"./utils.js\");\n\nvar a = 123;\n\nfunction fn() {\n  console.log(a);\n}\n\n(0, _utils.utils)();\nfn();"},"./src/utils.js":{"dependecies":{"./a.js":"./src/a.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.utils = void 0;\n\nvar _a = require(\"./a.js\");\n\nvar utils = function utils() {\n  console.log('holle ' + _a.ttx);\n  console.log(_a.ttq);\n};\n\nexports.utils = utils;"},"./src/a.js":{"dependecies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.ttx = exports.ttq = void 0;\nvar ttq = 'ttq';\nexports.ttq = ttq;\nvar ttx = 'ttx';\nexports.ttx = ttx;"}})
    