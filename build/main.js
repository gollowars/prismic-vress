require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("prismic-javascript");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("clone");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prismic_javascript__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prismic_javascript___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prismic_javascript__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fs_extra__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fs_extra___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fs_extra__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_js_yaml__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_js_yaml___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_js_yaml__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_path__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_clone__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_clone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_clone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Request__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Util__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_url__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__default_config__ = __webpack_require__(12);











const debug = __webpack_require__(4)('prismic-vress');

function postParser(post) {
  return post;
}

class PrismicVress {
  constructor() {
    this.config = null;
  }

  async generate(config, parser = postParser) {

    this.config = Object.assign(__WEBPACK_IMPORTED_MODULE_8__default_config__["a" /* default */], config);

    if (!this.config.endpoint) {
      throw console.error('must specify endpoint');
    }
    let postCustomParser = parser;

    // cleanup
    const assetPath = __WEBPACK_IMPORTED_MODULE_3_path___default.a.join(this.config.dist, `/${this.config.assetsDirName}/`);
    const mediaPath = __WEBPACK_IMPORTED_MODULE_3_path___default.a.join(assetPath, '/images/');

    const contentsPath = __WEBPACK_IMPORTED_MODULE_3_path___default.a.join(this.config.dist, `/${this.config.contentsDirName}`);

    if (this.config.cleandir) {
      __WEBPACK_IMPORTED_MODULE_6__Util__["a" /* default */].cleanupDir(this.config.dist);
    }

    __WEBPACK_IMPORTED_MODULE_6__Util__["a" /* default */].mkdir(assetPath);
    __WEBPACK_IMPORTED_MODULE_6__Util__["a" /* default */].mkdir(contentsPath);
    let posts = await __WEBPACK_IMPORTED_MODULE_5__Request__["a" /* default */].getAll(this.config.endpoint, this.config.query);
    let newPostList = [];

    for (const post of posts) {
      let regExp = /([\-_\.\!\~\*\'\(\)a-z0-9\;\/\?\:@&=\+\$\,\%\#]+(jpg|jpeg|gif|png|bmp))/;
      let newPost = __WEBPACK_IMPORTED_MODULE_4_clone___default()(post);

      // media download
      if (this.config.mediaDownload) {
        const searchTreeList = __WEBPACK_IMPORTED_MODULE_6__Util__["a" /* default */].deepObjectSearch(post, 'url', regExp);
        const medialist = __WEBPACK_IMPORTED_MODULE_6__Util__["a" /* default */].makeMedialist(post, searchTreeList);
        newPost = __WEBPACK_IMPORTED_MODULE_6__Util__["a" /* default */].overrideCopyPost(searchTreeList, post, `${config.publishAssetsPath}`);
        __WEBPACK_IMPORTED_MODULE_6__Util__["a" /* default */].mkdir(mediaPath);
        for (let url of medialist) {
          await __WEBPACK_IMPORTED_MODULE_6__Util__["a" /* default */].downloadMedia(url, mediaPath);
        }
      }
      const id = post.uid;
      const iddir = id ? `/${id}` : '';
      const type = post.type;
      const filedir = `${contentsPath}/${post.type}`;
      debug('fileTypeIndex:', this.config.fileTypeIndex);

      const filename = this.config.fileTypeIndex ? `${filedir}${iddir}/index.md` : `${filedir}${iddir}.md`;
      const link = this.config.fileTypeIndex ? `/${post.type}${iddir}/` : `/${post.type}${iddir}.html`;
      newPost.link = link;

      if (type) {
        newPost.layout = type;
      }

      newPost = postCustomParser(newPost);

      newPostList.push(newPost);
      const yamlStr = __WEBPACK_IMPORTED_MODULE_2_js_yaml___default.a.safeDump(newPost);
      const dumpStr = `---\n${yamlStr}---`;
      let outputdir = filename.split('/');
      outputdir.length = outputdir.length - 1;
      __WEBPACK_IMPORTED_MODULE_6__Util__["a" /* default */].mkdir(String(outputdir.join('/')));
      debug('write md:', filename);
      __WEBPACK_IMPORTED_MODULE_1_fs_extra___default.a.writeFileSync(filename, dumpStr);
    }

    const allPostJson = { posts: newPostList };
    const allPostFilePath = __WEBPACK_IMPORTED_MODULE_3_path___default.a.join(assetPath, this.config.allPostsJsonName);
    debug('write json:', allPostFilePath);
    __WEBPACK_IMPORTED_MODULE_1_fs_extra___default.a.writeFileSync(allPostFilePath, JSON.stringify(allPostJson));
  }
}
process.on('unhandledRejection', console.dir);

/* harmony default export */ __webpack_exports__["default"] = (new PrismicVress());

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("js-yaml");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prismic_javascript__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prismic_javascript___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prismic_javascript__);


class Request {
  constructor() {

    this.__init();
  }

  __init() {}

  getAll(endpoint, query = '') {
    return new Promise((resolve, reject) => {
      __WEBPACK_IMPORTED_MODULE_0_prismic_javascript___default.a.api(endpoint).then(function (api) {
        return api.query(query); // An empty query will return all the documents
      }).then(function (response) {
        // console.log("Documents: ", response.results);
        resolve(response.results);
      }, function (err) {
        reject(err);
        // console.log("Something went wrong: ", err);
      });
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (new Request());

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs_extra__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs_extra___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fs_extra__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_clone__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_clone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_clone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);




const debug = __webpack_require__(4)('prismic-vress');

function makeKeyFromTree(searchTreeList) {
  return searchTreeList.map((obj, index) => {
    let treekeyStr = '';
    obj.place.split('/').forEach(key => {
      treekeyStr = treekeyStr + `['${key}']`;
    });
    return treekeyStr;
  });
}

class Util {
  static async cleanupDir(dir) {
    __WEBPACK_IMPORTED_MODULE_0_fs_extra___default.a.removeSync(dir);
    const exist = __WEBPACK_IMPORTED_MODULE_0_fs_extra___default.a.pathExistsSync(dir);
    if (!exist) {
      __WEBPACK_IMPORTED_MODULE_0_fs_extra___default.a.mkdirsSync(dir);
    }
  }

  static async mkdir(dir) {
    const exist = __WEBPACK_IMPORTED_MODULE_0_fs_extra___default.a.pathExistsSync(dir);
    if (!exist) {
      __WEBPACK_IMPORTED_MODULE_0_fs_extra___default.a.mkdirsSync(dir);
    }
  }

  static deepObjectSearch(object, searchKey, valRegExp) {
    let treeList = [];

    objectSearch(object, searchKey, treeList, '');
    function objectSearch(object, searchKey, treeList, tree) {
      Object.keys(object).forEach((key, index) => {
        const value = object[key];
        const place = String(tree + key);
        if (typeof value === 'object') {
          if (!value) return;

          objectSearch(value, searchKey, treeList, place + '/');
        } else {
          if (key === searchKey && value.match(valRegExp)) {
            treeList.push({
              place: place,
              value: value
            });
          }
        }
      });
      return treeList;
    }

    return treeList;
  }

  static makeMedialist(post, searchTreeList) {
    return makeKeyFromTree(searchTreeList).map((key, index) => {
      return eval(`post${key}`);
    });
  }

  static overrideCopyPost(searchTreeList, object, publishPath) {
    let copy = __WEBPACK_IMPORTED_MODULE_1_clone___default()(object);
    makeKeyFromTree(searchTreeList).forEach((key, index) => {
      const value = eval(`object${key}`);
      const dirs = value.split('/');
      const filename = dirs[dirs.length - 1];
      const newvalue = publishPath + filename;
      eval(`copy${key} = '${newvalue}'`);
    });
    return copy;
  }

  static async downloadMedia(url, publishpath) {
    return new Promise(async (resolve, reject) => {
      try {
        debug('downloading...: ', url);
        const res = await __WEBPACK_IMPORTED_MODULE_2_axios___default.a.get(url, {
          responseType: 'arraybuffer'
        });
        const dirs = url.split('/');
        const filename = dirs[dirs.length - 1];
        const output = `${publishpath}/${filename}`;
        __WEBPACK_IMPORTED_MODULE_0_fs_extra___default.a.writeFileSync(output, new Buffer(res.data), 'binary');
        resolve();
      } catch (e) {
        debug('error url:', url);
        reject(e);
      }
    });
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Util;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);


/* harmony default export */ __webpack_exports__["a"] = ({
  dist: __WEBPACK_IMPORTED_MODULE_0_path___default.a.join(__dirname, 'dist'),
  assetsDirName: `assets`,
  contentsDirName: 'contents',
  mediaDownload: true,
  publishAssetsPath: '/assets/images/',
  fileTypeIndex: true,
  cleandir: false,
  allPostsJsonName: 'all.json',
  query: ''
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "src"))

/***/ })
/******/ ]);
//# sourceMappingURL=main.map