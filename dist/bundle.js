/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/local.storage.ts":
/*!******************************!*\
  !*** ./src/local.storage.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalDB": () => (/* binding */ LocalDB)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var LocalDB = /** @class */ (function () {
    function LocalDB(name) {
        this.name = name;
        if (!this.value)
            this.setValue([]);
    }
    Object.defineProperty(LocalDB.prototype, "rawValue", {
        get: function () {
            return localStorage.getItem(this.name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LocalDB.prototype, "value", {
        get: function () {
            var value = this.getValue();
            return value;
        },
        enumerable: false,
        configurable: true
    });
    LocalDB.prototype.setValue = function (value) {
        if (value === void 0) { value = this.value; }
        localStorage.setItem(this.name, JSON.stringify(value));
    };
    LocalDB.prototype.getValue = function () {
        var data = this.rawValue;
        var value = [];
        try {
            value = JSON.parse(data);
        }
        catch (error) {
            value = [];
        }
        return value;
    };
    LocalDB.prototype.find = function (doc) {
        return doc
            ? this.value.filter(function (v) {
                var flag = false;
                for (var k in v) {
                    if (doc[k]) {
                        flag = v[k] === doc[k];
                        if (!flag)
                            return;
                    }
                }
                return flag;
            })
            : this.value;
    };
    LocalDB.prototype.findOne = function (doc) {
        return doc
            ? this.value.find(function (v) {
                var flag = false;
                for (var k in v) {
                    if (doc[k]) {
                        flag = v[k] === doc[k];
                        if (!flag)
                            return;
                    }
                }
                return flag;
            })
            : this.value[0];
    };
    LocalDB.prototype.insert = function (docs) {
        var data = this.value;
        for (var _i = 0, docs_1 = docs; _i < docs_1.length; _i++) {
            var doc = docs_1[_i];
            data.push(__assign(__assign({}, doc), { _id: (0,uuid__WEBPACK_IMPORTED_MODULE_0__.default)() }));
        }
        this.setValue(data);
        return docs;
    };
    LocalDB.prototype.insertOne = function (doc) {
        var data = this.value;
        data.push(__assign({ _id: (0,uuid__WEBPACK_IMPORTED_MODULE_0__.default)() }, doc));
        this.setValue(data);
        return doc;
    };
    LocalDB.prototype.update = function (param, doc) {
        var found = this.find(param);
        var detail = { ok: false, n: 0 };
        if (found) {
            for (var i = 0; i < found.length; i++) {
                for (var j in doc) {
                    found[i][j] = doc[j];
                }
            }
            var value = this.value.map(function (v) {
                found.map(function (f) {
                    if (v._id == f._id) {
                        v = f;
                        detail = { ok: true, n: detail.n++ };
                    }
                    return v;
                });
                return v;
            });
            this.setValue(value);
            detail = { ok: true, n: 1 };
        }
        return detail;
    };
    LocalDB.prototype.updateOne = function (param, doc) {
        var found = this.findOne(param);
        var detail = { ok: false, n: 0 };
        if (found) {
            for (var i in doc) {
                found[i] = doc[i];
            }
            var value = this.value.map(function (v) {
                if (v._id == found._id) {
                    detail = { ok: true, n: detail.n++ };
                    v = found;
                }
                return v;
            });
            this.setValue(value);
        }
        return detail;
    };
    LocalDB.prototype.delete = function (param) {
        var found = this.find(param);
        var detail = { ok: false, n: 0 };
        if (found) {
            var value = this.value.filter(function (v) {
                var flag = true;
                found.map(function (f) {
                    if (v._id == f._id) {
                        detail.n++;
                        flag = false;
                    }
                });
                return flag;
            });
            this.setValue(value);
            detail = { ok: true, n: 1 };
        }
        return detail;
    };
    LocalDB.prototype.deleteOne = function (param) {
        var found = this.findOne(param);
        var detail = { ok: false, n: 0 };
        if (found) {
            detail.ok = true;
            var value = this.value.filter(function (v) {
                var flag = true;
                if (v._id == found._id) {
                    detail.n++;
                    flag = false;
                }
                return flag;
            });
            this.setValue(value);
        }
        return detail;
    };
    LocalDB.prototype.drop = function () {
        localStorage.setItem(this.name, 'null');
    };
    return LocalDB;
}());



/***/ }),

/***/ "./src/repo.class.ts":
/*!***************************!*\
  !*** ./src/repo.class.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Repo": () => (/* binding */ Repo)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _local_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./local.storage */ "./src/local.storage.ts");
/* harmony import */ var _shared_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/changes */ "./src/shared/changes.ts");
/* harmony import */ var _shared_retrieve__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/retrieve */ "./src/shared/retrieve.ts");
/* harmony import */ var _shared_update__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/update */ "./src/shared/update.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};





var Repo = /** @class */ (function () {
    function Repo(name, data) {
        if (data === void 0) { data = undefined; }
        this.name = name;
        this.data = data;
        this.changes = [];
        this.commits = [];
        this.merged = [];
        this.staged = [];
        this.branches = [];
        this.time = new Date();
        this.store = new _local_storage__WEBPACK_IMPORTED_MODULE_0__.LocalDB("Repos");
        this.read();
        if (!this.initialized)
            this.initialize();
        var temp = JSON.parse(JSON.stringify(this.data));
        this.board = (0,_shared_update__WEBPACK_IMPORTED_MODULE_3__.update)(this.data, this.changes);
        this.data = temp;
    }
    Repo.prototype.initialize = function () {
        this.initialized = true;
        this.commit("Base Commit");
        this.createBranch("main");
        this.content = {
            _id: (0,uuid__WEBPACK_IMPORTED_MODULE_4__.default)(),
            name: this.name,
            changes: this.changes,
            commits: this.commits,
            branches: this.branches,
            staged: this.staged,
            head: this.head,
            time: this.time,
            merged: [],
            data: this.data
        };
        this.write();
    };
    Repo.prototype.write = function () {
        this.store.insertOne(this.content);
    };
    Repo.prototype.read = function () {
        var _this = this;
        this.content = this.store.findOne({ name: this.name });
        if (this.content) {
            Object.keys(this.content).map(function (k) {
                _this[k] = _this.content[k];
            });
        }
        this.initialized = !!this.content;
    };
    Repo.prototype.save = function (data) {
        this.board = data;
        this.changes = (0,_shared_changes__WEBPACK_IMPORTED_MODULE_1__.changes)(this.data, this.board, { bi: true });
        this.store.updateOne({ _id: this._id }, { changes: this.changes });
    };
    Repo.prototype.createBranch = function (name) {
        var branch = { name: name, time: new Date(), commit: this.head, _id: (0,uuid__WEBPACK_IMPORTED_MODULE_4__.default)() };
        this.branches.push(branch);
        return branch;
    };
    Repo.prototype.deleteBranch = function (_id) {
    };
    Repo.prototype.stage = function (paths) {
        // Each dir is a string
        // Each path is a list of string or a single string(dir)
        // There for paths is a list of strings or a list of list of strings
        if (!this.changes.length)
            return;
        if (paths) {
            var _loop_1 = function (path) {
                var isChanged = this_1.changes.find(function (c) { return JSON.stringify(c.path) == JSON.stringify(path); });
                if (isChanged) {
                    this_1.staged = Array.from(new Set(__spreadArray(__spreadArray([], this_1.staged), [isChanged])));
                    this_1.changes = this_1.changes.filter(function (c) { return JSON.stringify(c.path) != JSON.stringify(path); });
                }
            };
            var this_1 = this;
            for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
                var path = paths_1[_i];
                _loop_1(path);
            }
        }
        else {
            this.staged = Array.from(new Set(__spreadArray(__spreadArray([], this.staged), this.changes)));
            this.changes = [];
        }
        this.store.updateOne({ _id: this._id }, { staged: this.staged, changes: this.changes });
    };
    Repo.prototype.commit = function (message, origin) {
        if (origin === void 0) { origin = this.head; }
        if (!this.staged.length)
            return;
        var changes = [];
        for (var _i = 0, _a = this.staged; _i < _a.length; _i++) {
            var s = _a[_i];
            changes.push(__assign(__assign({}, s), { value: (0,_shared_retrieve__WEBPACK_IMPORTED_MODULE_2__.retrieve)(this.data, s.path) }));
        }
        var commit = {
            _id: (0,uuid__WEBPACK_IMPORTED_MODULE_4__.default)(),
            message: message, changes: changes, origin: origin,
            time: new Date()
        };
        this.commits.push(commit);
        this.head = commit._id;
        this.staged = [];
        this.store.updateOne({ _id: this._id }, { commits: this.commits, staged: this.staged });
    };
    Repo.prototype.push = function () {
    };
    Repo.prototype.pull = function () {
    };
    Repo.prototype.status = function () {
    };
    Repo.prototype.log = function () {
    };
    Repo.prototype.clone = function () {
    };
    Repo.prototype.diff = function () {
    };
    Repo.prototype.merge = function () {
    };
    return Repo;
}());



/***/ }),

/***/ "./src/shared/changes.ts":
/*!*******************************!*\
  !*** ./src/shared/changes.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChangeTypes": () => (/* binding */ ChangeTypes),
/* harmony export */   "changes": () => (/* binding */ changes)
/* harmony export */ });
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var ChangeTypes;
(function (ChangeTypes) {
    ChangeTypes["NOT_FOUND"] = "Not found";
    ChangeTypes["NOT_TYPE"] = "Not type";
    ChangeTypes["NOT_EQUAL"] = "Not equal";
})(ChangeTypes || (ChangeTypes = {}));
function changes(from, look, options) {
    if (look === void 0) { look = {}; }
    var lChanges = [];
    var path = (options === null || options === void 0 ? void 0 : options.path) || [];
    for (var i in from) {
        if (!look.hasOwnProperty(i)) {
            lChanges.push({ path: __spreadArray(__spreadArray([], path), [i]), type: ChangeTypes.NOT_FOUND, value: from[i] });
        }
        else if (typeof from[i] !== typeof look[i]) {
            lChanges.push({ path: __spreadArray(__spreadArray([], path), [i]), type: ChangeTypes.NOT_TYPE, value: look[i] });
        }
        else if (typeof from[i] == "object") {
            lChanges.push.apply(lChanges, changes(from[i], look[i], { path: __spreadArray(__spreadArray([], path), [i]) }));
        }
        else if (from[i] !== look[i]) {
            lChanges.push({ path: __spreadArray(__spreadArray([], path), [i]), type: ChangeTypes.NOT_EQUAL, value: look[i] });
        }
    }
    if (options === null || options === void 0 ? void 0 : options.bi) {
        var rChanges = changes(look, from, { bi: false });
        var _loop_1 = function (rC) {
            var checked = lChanges.find(function (c) { return JSON.stringify(c.path) == JSON.stringify(rC.path); });
            if (!checked)
                lChanges.push(rC);
        };
        for (var _i = 0, rChanges_1 = rChanges; _i < rChanges_1.length; _i++) {
            var rC = rChanges_1[_i];
            _loop_1(rC);
        }
    }
    return lChanges;
}


/***/ }),

/***/ "./src/shared/retrieve.ts":
/*!********************************!*\
  !*** ./src/shared/retrieve.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "retrieve": () => (/* binding */ retrieve)
/* harmony export */ });
function retrieve(collection, path) {
    //retrieve data from an object
    var data = function (block, at) {
        return block[at];
    };
    var value;
    for (var i in path) {
        if (i == "0") {
            //set the value on first dir
            value = data(collection, path[i]);
        }
        else {
            value = data(value, path[i]);
        }
    }
    return value;
}


/***/ }),

/***/ "./src/shared/update.ts":
/*!******************************!*\
  !*** ./src/shared/update.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "update": () => (/* binding */ update)
/* harmony export */ });
/* harmony import */ var _changes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./changes */ "./src/shared/changes.ts");

function update(current, changes) {
    var data = function (block, at) {
        return block[at];
    };
    for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
        var c = changes_1[_i];
        var attr = current;
        for (var i = 0; i < c.path.length; i++) {
            if (i == c.path.length - 1) {
                if (c.type == _changes__WEBPACK_IMPORTED_MODULE_0__.ChangeTypes.NOT_FOUND && c.value == undefined) {
                    delete attr[c.path[i]];
                }
                else {
                    attr[c.path[i]] = c.value;
                }
            }
            else {
                attr = data(attr, c.path[i]);
            }
        }
    }
    return current;
}


/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__.default)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__.default.test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _repo_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./repo.class */ "./src/repo.class.ts");

var repo = new _repo_class__WEBPACK_IMPORTED_MODULE_0__.Repo("Sample");
// repo.save({ name: "Lone Ken", age: undefined, data: {a: 1, b: 24, c: 433}})
repo.stage([["name"]]);
repo.commit("Initial Commit");
console.log({ changes: repo.changes, staging: repo.staged, commits: repo.commits });
// const a = { name: "Lone Kendo", age: 26, data: [1, 3, 4], time: new Date() };
// const b = { name: "Lone Man", data: [1,3,7], time: a.time };
// const c = changes(a, b);
// const d = update(a, b, c);
// console.log({c, d});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC8uL3NyYy9sb2NhbC5zdG9yYWdlLnRzIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0Ly4vc3JjL3JlcG8uY2xhc3MudHMiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9zcmMvc2hhcmVkL2NoYW5nZXMudHMiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9zcmMvc2hhcmVkL3JldHJpZXZlLnRzIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0Ly4vc3JjL3NoYXJlZC91cGRhdGUudHMiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2Vi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Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7QUNOb0M7QUFLcEMsSUFBTSxJQUFJLEdBQUcsSUFBSSw2Q0FBSSxDQUFTLFFBQVEsQ0FBQyxDQUFDO0FBQ3hDLDhFQUE4RTtBQUU5RSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBRXRCLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7QUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUdwRixnRkFBZ0Y7QUFDaEYsK0RBQStEO0FBRS9ELDJCQUEyQjtBQUUzQiw2QkFBNkI7QUFFN0IsdUJBQXVCIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvY2FsRG9jdW1lbnQgfSBmcm9tIFwiLi9tb2RlbHMvcXVlcnkubW9kZWxcIjtcclxuaW1wb3J0IHsgdjQgYXMgdXVpZFY0IH0gZnJvbSBcInV1aWRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2NhbERCPFQ+e1xyXG4gICAgcHJpdmF0ZSBnZXQgcmF3VmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFZhbHVlKHZhbHVlID0gdGhpcy52YWx1ZSkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMubmFtZSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFZhbHVlKCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5yYXdWYWx1ZTtcclxuICAgICAgICBsZXQgdmFsdWU6IExvY2FsRG9jdW1lbnQ8VD5bXSA9IFtdO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UoZGF0YSBhcyBzdHJpbmcpIGFzIFtdO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghdGhpcy52YWx1ZSlcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZShbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZChkb2M/OiBQYXJ0aWFsPExvY2FsRG9jdW1lbnQ8VD4+KSB7XHJcbiAgICAgICAgcmV0dXJuIGRvY1xyXG4gICAgICAgICAgICA/IHRoaXMudmFsdWUuZmlsdGVyKHYgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZsYWc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrIGluIHYpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGRvYyBhcyBhbnkpW2tdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgPSAodiBhcyBhbnkpW2tdID09PSAoZG9jIGFzIGFueSlba107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZsYWcpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmxhZztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgOiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRPbmUoZG9jPzogUGFydGlhbDxMb2NhbERvY3VtZW50PFQ+Pikge1xyXG4gICAgICAgIHJldHVybiBkb2NcclxuICAgICAgICAgICAgPyB0aGlzLnZhbHVlLmZpbmQodiA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmxhZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgaW4gdikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoZG9jIGFzIGFueSlba10pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyA9ICh2IGFzIGFueSlba10gPT09IChkb2MgYXMgYW55KVtrXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmxhZykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmbGFnO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA6IHRoaXMudmFsdWVbMF07XHJcbiAgICB9XHJcblxyXG4gICAgaW5zZXJ0KGRvY3M6IFRbXSkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIGZvciAobGV0IGRvYyBvZiBkb2NzKVxyXG4gICAgICAgICAgICBkYXRhLnB1c2goeyAuLi5kb2MsIF9pZDogdXVpZFY0KCkgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VmFsdWUoZGF0YSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkb2NzIGFzIExvY2FsRG9jdW1lbnQ8VD5bXTtcclxuICAgIH1cclxuXHJcbiAgICBpbnNlcnRPbmUoZG9jOiBUKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgZGF0YS5wdXNoKHsgX2lkOiB1dWlkVjQoKSwgLi4uZG9jIH0pO1xyXG4gICAgICAgIHRoaXMuc2V0VmFsdWUoZGF0YSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkb2MgYXMgTG9jYWxEb2N1bWVudDxUPjtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUocGFyYW06IFBhcnRpYWw8TG9jYWxEb2N1bWVudDxUPj4sIGRvYzogUGFydGlhbDxUPltdKSB7XHJcbiAgICAgICAgY29uc3QgZm91bmQgPSB0aGlzLmZpbmQocGFyYW0pIGFzIExvY2FsRG9jdW1lbnQ8VD5bXTtcclxuICAgICAgICBsZXQgZGV0YWlsID0geyBvazogZmFsc2UsIG46IDAgfTtcclxuICAgICAgICBpZiAoZm91bmQpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3VuZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiBpbiBkb2MpIHtcclxuICAgICAgICAgICAgICAgICAgICAoZm91bmRbaV0gYXMgYW55KVtqXSA9IChkb2MgYXMgYW55KVtqXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZS5tYXAodiA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3VuZC5tYXAoZiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHYuX2lkID09IGYuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHYgPSBmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWwgPSB7IG9rOiB0cnVlLCBuOiBkZXRhaWwubisrIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGRldGFpbCA9IHsgb2s6IHRydWUsIG46IDEgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkZXRhaWw7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlT25lKHBhcmFtOiBQYXJ0aWFsPExvY2FsRG9jdW1lbnQ8VD4+LCBkb2M6IFBhcnRpYWw8VD4pIHsgICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5maW5kT25lKHBhcmFtKTtcclxuICAgICAgICBsZXQgZGV0YWlsID0geyBvazogZmFsc2UsIG46IDAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgaWYgKGZvdW5kKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gZG9jKSB7XHJcbiAgICAgICAgICAgICAgICAoZm91bmQgYXMgYW55KVtpXSA9IChkb2MgYXMgYW55KVtpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZS5tYXAodiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodi5faWQgPT0gZm91bmQuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsID0geyBvazogdHJ1ZSwgbjogZGV0YWlsLm4rKyB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHYgPSBmb3VuZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgICAgICB9KTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGV0YWlsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZShwYXJhbTogUGFydGlhbDxMb2NhbERvY3VtZW50PFQ+Pikge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5maW5kKHBhcmFtKSBhcyBMb2NhbERvY3VtZW50PFQ+W107XHJcbiAgICAgICAgbGV0IGRldGFpbCA9IHsgb2s6IGZhbHNlLCBuOiAwIH07XHJcblxyXG4gICAgICAgIGlmIChmb3VuZCkge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlLmZpbHRlcih2ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBmbGFnOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZvdW5kLm1hcChmID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodi5faWQgPT0gZi5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsLm4rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmbGFnO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICBkZXRhaWwgPSB7IG9rOiB0cnVlLCBuOiAxIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGV0YWlsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZU9uZShwYXJhbTogUGFydGlhbDxMb2NhbERvY3VtZW50PFQ+Pikge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5maW5kT25lKHBhcmFtKTtcclxuICAgICAgICBsZXQgZGV0YWlsID0geyBvazogZmFsc2UsIG46IDAgfTtcclxuXHJcbiAgICAgICAgaWYgKGZvdW5kKSB7XHJcbiAgICAgICAgICAgIGRldGFpbC5vayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlLmZpbHRlcih2ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBmbGFnOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh2Ll9pZCA9PSBmb3VuZC5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWwubisrO1xyXG4gICAgICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmbGFnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGV0YWlsO1xyXG4gICAgfVxyXG5cclxuICAgIGRyb3AoKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5uYW1lLCAnbnVsbCcpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdjQgYXMgdXVpZFY0IH0gZnJvbSBcInV1aWRcIjtcclxuXHJcbmltcG9ydCB7IExvY2FsREIgfSBmcm9tIFwiLi9sb2NhbC5zdG9yYWdlXCI7XHJcbmltcG9ydCB7IEJyYW5jaCB9IGZyb20gXCIuL21vZGVscy9icmFuY2guaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENvbW1pdCwgQ29tbWl0Q2hhbmdlIH0gZnJvbSBcIi4vbW9kZWxzL2NvbW1pdC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBDaGFuZ2UsIGNoYW5nZXMgfSBmcm9tIFwiLi9zaGFyZWQvY2hhbmdlc1wiO1xyXG5pbXBvcnQgeyByZXRyaWV2ZSB9IGZyb20gXCIuL3NoYXJlZC9yZXRyaWV2ZVwiO1xyXG5pbXBvcnQgeyB1cGRhdGUgfSBmcm9tIFwiLi9zaGFyZWQvdXBkYXRlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSZXBvPFQ+IHtcclxuICAgIHJlYWRvbmx5IF9pZDogc3RyaW5nO1xyXG4gICAgcmVhZG9ubHkgZGF0YTogVDtcclxuICAgIHJlYWRvbmx5IGhlYWQ6IHN0cmluZztcclxuICAgIHJlYWRvbmx5IGJyYW5jaGVzOiBCcmFuY2hbXTtcclxuICAgIHJlYWRvbmx5IGNoYW5nZXM6IENoYW5nZVtdO1xyXG4gICAgcmVhZG9ubHkgc3RhZ2VkOiBDaGFuZ2VbXTtcclxuICAgIHJlYWRvbmx5IGNvbW1pdHM6IENvbW1pdFtdO1xyXG4gICAgcmVhZG9ubHkgbWVyZ2VkOiBzdHJpbmdbXTtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHJlYWRvbmx5IHRpbWU6IERhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXBvPFQ+IGltcGxlbWVudHMgSVJlcG88VD4ge1xyXG4gICAgcHJpdmF0ZSBjb250ZW50OiBJUmVwbzxUPjtcclxuICAgIHByaXZhdGUgc3RvcmU6IExvY2FsREI8SVJlcG88VD4+O1xyXG4gICAgcHJpdmF0ZSBib2FyZDogVDtcclxuXHJcbiAgICBjaGFuZ2VzOiBDaGFuZ2VbXSA9IFtdO1xyXG4gICAgY29tbWl0czogQ29tbWl0W10gPSBbXTtcclxuICAgIG1lcmdlZDogc3RyaW5nW10gPSBbXTtcclxuICAgIHN0YWdlZDogQ2hhbmdlW10gPSBbXTtcclxuICAgIGhlYWQ6IHN0cmluZztcclxuICAgIGJyYW5jaGVzOiBCcmFuY2hbXSA9IFtdO1xyXG4gICAgdGltZTogRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICBfaWQ6IHN0cmluZztcclxuXHJcbiAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCByZWFkb25seSBkYXRhOiBUID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yZSA9IG5ldyBMb2NhbERCPElSZXBvPFQ+PihcIlJlcG9zXCIpO1xyXG4gICAgICAgIHRoaXMucmVhZCgpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgICAgICBjb25zdCB0ZW1wID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpKTtcclxuICAgICAgICB0aGlzLmJvYXJkID0gdXBkYXRlKHRoaXMuZGF0YSwgdGhpcy5jaGFuZ2VzKTtcclxuICAgICAgICB0aGlzLmRhdGEgPSB0ZW1wO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbW1pdChcIkJhc2UgQ29tbWl0XCIpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQnJhbmNoKFwibWFpblwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0ge1xyXG4gICAgICAgICAgICBfaWQ6IHV1aWRWNCgpLFxyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgIGNoYW5nZXM6IHRoaXMuY2hhbmdlcyxcclxuICAgICAgICAgICAgY29tbWl0czogdGhpcy5jb21taXRzLFxyXG4gICAgICAgICAgICBicmFuY2hlczogdGhpcy5icmFuY2hlcyxcclxuICAgICAgICAgICAgc3RhZ2VkOiB0aGlzLnN0YWdlZCxcclxuICAgICAgICAgICAgaGVhZDogdGhpcy5oZWFkLFxyXG4gICAgICAgICAgICB0aW1lOiB0aGlzLnRpbWUsXHJcbiAgICAgICAgICAgIG1lcmdlZDogW10sXHJcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMud3JpdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHdyaXRlKCkge1xyXG4gICAgICAgIHRoaXMuc3RvcmUuaW5zZXJ0T25lKHRoaXMuY29udGVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkKCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMuc3RvcmUuZmluZE9uZSh7IG5hbWU6IHRoaXMubmFtZSB9KTtcclxuICAgICAgICBpZiAodGhpcy5jb250ZW50KSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuY29udGVudCkubWFwKGsgPT4ge1xyXG4gICAgICAgICAgICAgICAgKHRoaXMgYXMgYW55KVtrXSA9ICh0aGlzLmNvbnRlbnQgYXMgYW55KVtrXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gISF0aGlzLmNvbnRlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZShkYXRhOiBUKSB7XHJcbiAgICAgICAgdGhpcy5ib2FyZCA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VzID0gY2hhbmdlcyh0aGlzLmRhdGEsIHRoaXMuYm9hcmQsIHsgYmk6IHRydWUgfSk7XHJcbiAgICAgICAgdGhpcy5zdG9yZS51cGRhdGVPbmUoeyBfaWQ6IHRoaXMuX2lkIH0sIHsgY2hhbmdlczogdGhpcy5jaGFuZ2VzIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUJyYW5jaChuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBicmFuY2g6IEJyYW5jaCA9IHsgbmFtZSwgdGltZTogbmV3IERhdGUoKSwgY29tbWl0OiB0aGlzLmhlYWQsIF9pZDogdXVpZFY0KCkgfTtcclxuICAgICAgICB0aGlzLmJyYW5jaGVzLnB1c2goYnJhbmNoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJyYW5jaDtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVCcmFuY2goX2lkOiBzdHJpbmcpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhZ2UocGF0aHM/OiBzdHJpbmdbXVtdKSB7XHJcbiAgICAgICAgLy8gRWFjaCBkaXIgaXMgYSBzdHJpbmdcclxuICAgICAgICAvLyBFYWNoIHBhdGggaXMgYSBsaXN0IG9mIHN0cmluZyBvciBhIHNpbmdsZSBzdHJpbmcoZGlyKVxyXG4gICAgICAgIC8vIFRoZXJlIGZvciBwYXRocyBpcyBhIGxpc3Qgb2Ygc3RyaW5ncyBvciBhIGxpc3Qgb2YgbGlzdCBvZiBzdHJpbmdzXHJcblxyXG4gICAgICAgIGlmICghdGhpcy5jaGFuZ2VzLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAocGF0aHMpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBwYXRoIG9mIHBhdGhzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc0NoYW5nZWQgPSB0aGlzLmNoYW5nZXMuZmluZChjID0+IEpTT04uc3RyaW5naWZ5KGMucGF0aCkgPT0gSlNPTi5zdHJpbmdpZnkocGF0aCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2VkID0gQXJyYXkuZnJvbShuZXcgU2V0KFsuLi50aGlzLnN0YWdlZCwgaXNDaGFuZ2VkXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlcyA9IHRoaXMuY2hhbmdlcy5maWx0ZXIoYyA9PiBKU09OLnN0cmluZ2lmeShjLnBhdGgpICE9IEpTT04uc3RyaW5naWZ5KHBhdGgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZWQgPSBBcnJheS5mcm9tKG5ldyBTZXQoWy4uLnRoaXMuc3RhZ2VkLCAuLi50aGlzLmNoYW5nZXNdKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlcyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zdG9yZS51cGRhdGVPbmUoeyBfaWQ6IHRoaXMuX2lkIH0sIHsgc3RhZ2VkOiB0aGlzLnN0YWdlZCwgY2hhbmdlczogdGhpcy5jaGFuZ2VzIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbW1pdChtZXNzYWdlOiBzdHJpbmcsIG9yaWdpbjogc3RyaW5nID0gdGhpcy5oZWFkKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YWdlZC5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZXM6IENvbW1pdENoYW5nZVtdID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc3RhZ2VkKSB7XHJcbiAgICAgICAgICAgIGNoYW5nZXMucHVzaCh7IC4uLnMsIHZhbHVlOiByZXRyaWV2ZSh0aGlzLmRhdGEsIHMucGF0aCkgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbW1pdDogQ29tbWl0ID0ge1xyXG4gICAgICAgICAgICBfaWQ6IHV1aWRWNCgpLCBtZXNzYWdlLCBjaGFuZ2VzLCBvcmlnaW4sIHRpbWU6IG5ldyBEYXRlKClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmNvbW1pdHMucHVzaChjb21taXQpO1xyXG4gICAgICAgIHRoaXMuaGVhZCA9IGNvbW1pdC5faWQ7XHJcbiAgICAgICAgdGhpcy5zdGFnZWQgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5zdG9yZS51cGRhdGVPbmUoeyBfaWQ6IHRoaXMuX2lkIH0sIHsgY29tbWl0czogdGhpcy5jb21taXRzLCBzdGFnZWQ6IHRoaXMuc3RhZ2VkIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2goKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1bGwoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXR1cygpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbG9nKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjbG9uZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGlmZigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbWVyZ2UoKSB7XHJcblxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGVudW0gQ2hhbmdlVHlwZXMge1xyXG4gICAgTk9UX0ZPVU5EID0gXCJOb3QgZm91bmRcIixcclxuICAgIE5PVF9UWVBFID0gXCJOb3QgdHlwZVwiLFxyXG4gICAgTk9UX0VRVUFMID0gXCJOb3QgZXF1YWxcIlxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZSB7XHJcbiAgICBwYXRoOiBhbnlbXTtcclxuICAgIHR5cGU6IENoYW5nZVR5cGVzO1xyXG4gICAgdmFsdWU6IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZXMoZnJvbTogYW55LCBsb29rOiBhbnkgPSB7fSwgb3B0aW9ucz86IHsgcGF0aD86IHN0cmluZ1tdLCBiaT86IGJvb2xlYW4gfSkge1xyXG4gICAgY29uc3QgbENoYW5nZXM6IENoYW5nZVtdID0gW107XHJcbiAgICBjb25zdCBwYXRoID0gb3B0aW9ucz8ucGF0aCB8fCBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGkgaW4gZnJvbSkge1xyXG4gICAgICAgIGlmICghbG9vay5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgICAgICAgICBsQ2hhbmdlcy5wdXNoKHsgcGF0aDogWy4uLnBhdGgsIGldLCB0eXBlOiBDaGFuZ2VUeXBlcy5OT1RfRk9VTkQsIHZhbHVlOiBmcm9tW2ldIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgZnJvbVtpXSAhPT0gdHlwZW9mIGxvb2tbaV0pIHtcclxuICAgICAgICAgICAgbENoYW5nZXMucHVzaCh7IHBhdGg6IFsuLi5wYXRoLCBpXSwgdHlwZTogQ2hhbmdlVHlwZXMuTk9UX1RZUEUsIHZhbHVlOiBsb29rW2ldIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgZnJvbVtpXSA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIGxDaGFuZ2VzLnB1c2goLi4uY2hhbmdlcyhmcm9tW2ldLCBsb29rW2ldLCB7IHBhdGg6IFsuLi5wYXRoLCBpXSB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGZyb21baV0gIT09IGxvb2tbaV0pIHtcclxuICAgICAgICAgICAgbENoYW5nZXMucHVzaCh7IHBhdGg6IFsuLi5wYXRoLCBpXSwgdHlwZTogQ2hhbmdlVHlwZXMuTk9UX0VRVUFMLCB2YWx1ZTogbG9va1tpXSB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnM/LmJpKSB7XHJcbiAgICAgICAgY29uc3QgckNoYW5nZXMgPSBjaGFuZ2VzKGxvb2ssIGZyb20sIHsgYmk6IGZhbHNlIH0pO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHJDIG9mIHJDaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrZWQgPSBsQ2hhbmdlcy5maW5kKGMgPT4gSlNPTi5zdHJpbmdpZnkoYy5wYXRoKSA9PSBKU09OLnN0cmluZ2lmeShyQy5wYXRoKSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKCFjaGVja2VkKSBsQ2hhbmdlcy5wdXNoKHJDKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxDaGFuZ2VzO1xyXG59IiwiZXhwb3J0IGZ1bmN0aW9uIHJldHJpZXZlKGNvbGxlY3Rpb246IGFueSwgcGF0aDogc3RyaW5nW10pIHtcclxuICAgIC8vcmV0cmlldmUgZGF0YSBmcm9tIGFuIG9iamVjdFxyXG4gICAgY29uc3QgZGF0YSA9IChibG9jazogYW55LCBhdDogYW55KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGJsb2NrW2F0XTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdmFsdWU7XHJcblxyXG4gICAgZm9yIChsZXQgaSBpbiBwYXRoKSB7XHJcbiAgICAgICAgaWYgKGkgPT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgLy9zZXQgdGhlIHZhbHVlIG9uIGZpcnN0IGRpclxyXG4gICAgICAgICAgICB2YWx1ZSA9IGRhdGEoY29sbGVjdGlvbiwgcGF0aFtpXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gZGF0YSh2YWx1ZSwgcGF0aFtpXSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59IiwiaW1wb3J0IHsgQ2hhbmdlLCBDaGFuZ2VUeXBlcyB9IGZyb20gXCIuL2NoYW5nZXNcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUoY3VycmVudDogYW55LCBjaGFuZ2VzOiBDaGFuZ2VbXSkge1xyXG4gICAgY29uc3QgZGF0YSA9IChibG9jazogYW55LCBhdDogYW55KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGJsb2NrW2F0XTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBjIG9mIGNoYW5nZXMpIHtcclxuICAgICAgICBsZXQgYXR0ciA9IGN1cnJlbnQ7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYy5wYXRoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpID09IGMucGF0aC5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYy50eXBlID09IENoYW5nZVR5cGVzLk5PVF9GT1VORCAmJiBjLnZhbHVlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhdHRyW2MucGF0aFtpXV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJbYy5wYXRoW2ldXSA9IGMudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhdHRyID0gZGF0YShhdHRyLCBjLnBhdGhbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjdXJyZW50O1xyXG59IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxudmFyIGdldFJhbmRvbVZhbHVlcztcbnZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLiBBbHNvLFxuICAgIC8vIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byAobXNDcnlwdG8pIG9uIElFMTEuXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSB8fCB0eXBlb2YgbXNDcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxudmFyIGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSkpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyKSB7XG4gIHZhciBvZmZzZXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICB2YXIgdXVpZCA9IChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJpbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCBzdHJpbmdpZnkgZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gc3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFJlcG8gfSBmcm9tIFwiLi9yZXBvLmNsYXNzXCI7XHJcbmltcG9ydCB7IFNhbXBsZSB9IGZyb20gXCIuL21vZGVscy9zYW1wbGVcIjtcclxuaW1wb3J0IHsgY2hhbmdlcyB9IGZyb20gXCIuL3NoYXJlZC9jaGFuZ2VzXCI7XHJcbmltcG9ydCB7IHVwZGF0ZSB9IGZyb20gXCIuL3NoYXJlZC91cGRhdGVcIjtcclxuXHJcbmNvbnN0IHJlcG8gPSBuZXcgUmVwbzxTYW1wbGU+KFwiU2FtcGxlXCIpO1xyXG4vLyByZXBvLnNhdmUoeyBuYW1lOiBcIkxvbmUgS2VuXCIsIGFnZTogdW5kZWZpbmVkLCBkYXRhOiB7YTogMSwgYjogMjQsIGM6IDQzM319KVxyXG5cclxucmVwby5zdGFnZShbW1wibmFtZVwiXV0pXHJcblxyXG5yZXBvLmNvbW1pdChcIkluaXRpYWwgQ29tbWl0XCIpXHJcbmNvbnNvbGUubG9nKHsgY2hhbmdlczogcmVwby5jaGFuZ2VzLCBzdGFnaW5nOiByZXBvLnN0YWdlZCwgY29tbWl0czogcmVwby5jb21taXRzIH0pO1xyXG5cclxuXHJcbi8vIGNvbnN0IGEgPSB7IG5hbWU6IFwiTG9uZSBLZW5kb1wiLCBhZ2U6IDI2LCBkYXRhOiBbMSwgMywgNF0sIHRpbWU6IG5ldyBEYXRlKCkgfTtcclxuLy8gY29uc3QgYiA9IHsgbmFtZTogXCJMb25lIE1hblwiLCBkYXRhOiBbMSwzLDddLCB0aW1lOiBhLnRpbWUgfTtcclxuXHJcbi8vIGNvbnN0IGMgPSBjaGFuZ2VzKGEsIGIpO1xyXG5cclxuLy8gY29uc3QgZCA9IHVwZGF0ZShhLCBiLCBjKTtcclxuXHJcbi8vIGNvbnNvbGUubG9nKHtjLCBkfSk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=