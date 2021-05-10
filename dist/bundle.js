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
/* harmony import */ var _repo_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./repo.database */ "./src/repo.database.ts");
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
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};





var Repo = /** @class */ (function () {
    function Repo(name, data, database) {
        if (data === void 0) { data = null; }
        if (database === void 0) { database = { insert: _repo_database__WEBPACK_IMPORTED_MODULE_0__.insertFunction, read: _repo_database__WEBPACK_IMPORTED_MODULE_0__.readFunction, update: _repo_database__WEBPACK_IMPORTED_MODULE_0__.updateFunction }; }
        this.name = name;
        this.data = data;
        this.database = database;
        this.changes = [];
        this.commits = [];
        this.merged = [];
        this.staged = [];
        this.head = { commit: undefined };
        this.branches = [];
        this.time = new Date();
    }
    Object.defineProperty(Repo.prototype, "details", {
        get: function () {
            var _this = this;
            var _a;
            var branch = (_a = this.branches.find(function (b) { return b._id == _this.head.branch; })) === null || _a === void 0 ? void 0 : _a.name;
            var nBranch = this.branches.length;
            var nChanges = this.changes.length;
            var nStaged = this.staged.length;
            var commit = this.commits.find(function (c) { return c._id == _this.head.commit; });
            var nCommits = this.commitAncestors(commit).length + 1;
            return { branch: branch, nBranch: nBranch, nChanges: nChanges, nStaged: nStaged, commit: commit, nCommits: nCommits };
        },
        enumerable: false,
        configurable: true
    });
    Repo.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //Initialize repo with first commit, branch and the head, then checkout the branch and commit
                        this.commit("Initial Commit");
                        this.createBranch("main");
                        this.checkout("main");
                        //Set the initial content
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
                        //Create the repo
                        return [4 /*yield*/, this.insert()];
                    case 1:
                        //Create the repo
                        _a.sent();
                        this.initialized = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    Repo.prototype.insert = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.database.insert(this.content)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Repo.prototype.read = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Read the stored content
                        _a = this;
                        return [4 /*yield*/, this.database.read({ name: this.name })];
                    case 1:
                        // Read the stored content
                        _a.content = _b.sent();
                        // Set repo with the stored content
                        if (this.content) {
                            Object.keys(this.content).map(function (k) {
                                _this[k] = _this.content[k];
                            });
                            this.initialized = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Repo.prototype.commitAncestors = function (commit) {
        var ancestors = [];
        var parents = commit.parents;
        if (parents) {
            var parentCommit = this.commits.reverse().find(function (c) {
                return c._id == parents.ancestor || c._id == parents.merged;
            });
            if (parentCommit)
                ancestors = __spreadArray([parentCommit], this.commitAncestors(parentCommit));
        }
        return ancestors;
    };
    Repo.prototype.isAncestorCommit = function (ancestor, child) {
        var childAncestors = this.commitAncestors(child);
        return childAncestors.find(function (a) { return a._id == ancestor._id; });
    };
    Repo.prototype.commitsLastCommonAncestor = function (first, second) {
        var firstAncestors = this.commitAncestors(first);
        var secondAncestors = this.commitAncestors(second);
        var ancestor;
        if (this.isAncestorCommit(first, second))
            ancestor = first;
        else if (this.isAncestorCommit(second, first))
            ancestor = second;
        else {
            for (var a in firstAncestors) {
                for (var b in secondAncestors) {
                    if (firstAncestors[a] === secondAncestors[b])
                        ancestor = firstAncestors[a];
                    if (ancestor)
                        break;
                }
                if (ancestor)
                    break;
            }
        }
        return ancestor;
    };
    Repo.prototype.onload = function (callback) {
        if (callback === void 0) { callback = function (repo) { }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.read()];
                    case 1:
                        _a.sent();
                        if (!!this.initialized) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.initialize()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.board = JSON.parse(JSON.stringify(this.data || null));
                        callback(this);
                        return [2 /*return*/];
                }
            });
        });
    };
    Repo.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var changes, _loop_1, this_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        changes = (0,_shared_changes__WEBPACK_IMPORTED_MODULE_1__.getChanges)(this.data, this.board, { bi: true });
                        _loop_1 = function (i) {
                            this_1.changes = this_1.changes.filter(function (c) { return JSON.stringify(c.path) != JSON.stringify(changes[i].path); });
                            this_1.changes.push(changes[i]);
                        };
                        this_1 = this;
                        for (i in changes) {
                            _loop_1(i);
                        }
                        return [4 /*yield*/, this.database.update({ _id: this._id }, { changes: this.changes, data: this.board })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Repo.prototype.createBranch = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var found, branch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        found = this.branches.find(function (b) { return b.name == name; });
                        if (found)
                            throw new Error("Branch with name '" + name + "' already exists in this repo");
                        branch = { name: name, time: new Date(), commit: this.head.commit, _id: (0,uuid__WEBPACK_IMPORTED_MODULE_4__.default)() };
                        this.branches.push(branch);
                        return [4 /*yield*/, this.database.update({ _id: this._id }, { branches: this.branches })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Repo.prototype.deleteBranch = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (name == 'main')
                            throw new Error("You can not remove the Main branch");
                        this.branches = this.branches.filter(function (b) { return b.name != name; });
                        return [4 /*yield*/, this.database.update({ _id: this._id }, { branches: this.branches })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Repo.prototype.branchAndCheckout = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createBranch(name)];
                    case 1:
                        _a.sent();
                        this.checkout(name);
                        return [2 /*return*/];
                }
            });
        });
    };
    Repo.prototype.checkout = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var branch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.details.nChanges)
                            throw new Error("Unstaged Changes");
                        if (this.details.nStaged)
                            throw new Error("Uncommited Changes");
                        branch = this.branches.find(function (b) { return b.name == name; });
                        if (!branch)
                            throw new Error("Unknown branch");
                        this.head.branch = branch._id;
                        return [4 /*yield*/, this.database.update({ _id: this._id }, { head: this.head })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Repo.prototype.stage = function (paths) {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_2, this_2, _i, paths_1, path, _loop_3, this_3, _a, _b, change;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        // Each dir is a string
                        // Each path is a list of string or a single string(dir)
                        // There for paths is a list of strings or a list of list of strings
                        if (!this.changes.length)
                            return [2 /*return*/];
                        if (paths) {
                            _loop_2 = function (path) {
                                var change = this_2.changes.find(function (c) { return JSON.stringify(c.path) == JSON.stringify(path); });
                                if (change) {
                                    this_2.changes = this_2.changes.filter(function (c) { return JSON.stringify(c.path) != JSON.stringify(change.path); });
                                    this_2.staged = this_2.staged.filter(function (c) { return JSON.stringify(c.path) != JSON.stringify(change.path); });
                                    this_2.staged.push(change);
                                }
                            };
                            this_2 = this;
                            for (_i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
                                path = paths_1[_i];
                                _loop_2(path);
                            }
                        }
                        else {
                            _loop_3 = function (change) {
                                this_3.changes = this_3.changes.filter(function (c) { return JSON.stringify(c.path) != JSON.stringify(change.path); });
                                this_3.staged = this_3.staged.filter(function (c) { return JSON.stringify(c.path) != JSON.stringify(change.path); });
                                this_3.staged.push(change);
                            };
                            this_3 = this;
                            for (_a = 0, _b = this.changes; _a < _b.length; _a++) {
                                change = _b[_a];
                                _loop_3(change);
                            }
                        }
                        return [4 /*yield*/, this.database.update({ _id: this._id }, { staged: this.staged, changes: this.changes })];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Repo.prototype.commit = function (message, ancestor) {
        if (ancestor === void 0) { ancestor = this.head.commit; }
        return __awaiter(this, void 0, void 0, function () {
            var changes, _i, _a, s, commit;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.staged.length && this.initialized)
                            return [2 /*return*/];
                        changes = [];
                        for (_i = 0, _a = this.staged; _i < _a.length; _i++) {
                            s = _a[_i];
                            changes.push(__assign(__assign({}, s), { value: (0,_shared_retrieve__WEBPACK_IMPORTED_MODULE_2__.retrieve)(this.board, s.path) }));
                        }
                        commit = {
                            _id: (0,uuid__WEBPACK_IMPORTED_MODULE_4__.default)(),
                            message: message, changes: changes, parents: { ancestor: ancestor },
                            time: new Date()
                        };
                        this.commits.push(commit);
                        this.head.commit = commit._id;
                        this.staged = [];
                        return [4 /*yield*/, this.database.update({ _id: this._id }, { commits: this.commits, staged: this.staged, head: this.head })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Repo.prototype.merge = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var currentBranch, incomingBranch, currentCommit, incomingCommit, changes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentBranch = this.branches.find(function (b) { return b._id == _this.head.branch; });
                        incomingBranch = this.branches.find(function (b) { return b.name == name; });
                        if (!incomingBranch)
                            throw new Error("Unknown branch");
                        currentCommit = this.commits.find(function (c) { return c._id == _this.head.commit; });
                        incomingCommit = this.commits.find(function (c) { return c._id == incomingBranch.commit; });
                        changes = (0,_shared_changes__WEBPACK_IMPORTED_MODULE_1__.getChanges)(currentCommit.changes, incomingCommit.changes, { bi: true });
                        if (!changes.length) {
                            console.log("No difference found");
                            return [2 /*return*/];
                        }
                        if (!this.isAncestorCommit(currentCommit, incomingCommit)) return [3 /*break*/, 2];
                        this.head.commit = incomingCommit._id;
                        if (currentBranch)
                            currentBranch.commit = this.head.commit;
                        return [4 /*yield*/, this.database.update({ _id: this._id }, { head: this.head, branches: this.branches })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        if (this.isAncestorCommit(incomingCommit, currentCommit)) {
                            throw new Error("Branch is behind");
                        }
                        else if (!this.commitsLastCommonAncestor(currentCommit, incomingCommit)) {
                            throw new Error("Branch is not related");
                        }
                        else {
                            (0,_shared_update__WEBPACK_IMPORTED_MODULE_3__.update)(this.board, incomingCommit.changes);
                            this.save();
                            this.stage();
                            this.commit("");
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Repo.prototype.diff = function () {
    };
    Repo.prototype.push = function (to, origin, branch) {
    };
    Repo.prototype.pull = function (from) {
    };
    Repo.prototype.status = function () {
    };
    Repo.prototype.log = function () {
    };
    Repo.prototype.clone = function () {
    };
    return Repo;
}());



/***/ }),

/***/ "./src/repo.database.ts":
/*!******************************!*\
  !*** ./src/repo.database.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "readFunction": () => (/* binding */ readFunction),
/* harmony export */   "insertFunction": () => (/* binding */ insertFunction),
/* harmony export */   "updateFunction": () => (/* binding */ updateFunction)
/* harmony export */ });
/* harmony import */ var _local_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./local.storage */ "./src/local.storage.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var storage = new _local_storage__WEBPACK_IMPORTED_MODULE_0__.LocalDB("Repos");
var readFunction = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, storage.findOne(data)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var insertFunction = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, storage.insertOne(data)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var updateFunction = function (params, data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, storage.updateOne(params, data)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };


/***/ }),

/***/ "./src/shared/changes.ts":
/*!*******************************!*\
  !*** ./src/shared/changes.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChangeTypes": () => (/* binding */ ChangeTypes),
/* harmony export */   "getChanges": () => (/* binding */ getChanges)
/* harmony export */ });
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var ChangeTypes;
(function (ChangeTypes) {
    ChangeTypes["REMOVED"] = "Removed";
    ChangeTypes["CHANGED"] = "Changed";
    ChangeTypes["ADDED"] = "Added";
})(ChangeTypes || (ChangeTypes = {}));
function getChanges(from, look, options) {
    var lChanges = [];
    var path = (options === null || options === void 0 ? void 0 : options.path) || [];
    from = from || {};
    look = look || {};
    for (var i in from) {
        var after = (options === null || options === void 0 ? void 0 : options.halphed) ? from[i] : look[i];
        var before = (options === null || options === void 0 ? void 0 : options.halphed) ? look[i] : from[i];
        if (!(look === null || look === void 0 ? void 0 : look.hasOwnProperty(i))) {
            lChanges.push({ path: __spreadArray(__spreadArray([], path), [i]), type: (options === null || options === void 0 ? void 0 : options.halphed) ? ChangeTypes.REMOVED : ChangeTypes.ADDED, before: before, after: after });
        }
        else if (typeof from[i] == "object") {
            lChanges.push.apply(lChanges, getChanges(from[i], look[i], { path: __spreadArray(__spreadArray([], path), [i]) }));
        }
        else if (from[i] !== look[i]) {
            lChanges.push({ path: __spreadArray(__spreadArray([], path), [i]), type: ChangeTypes.CHANGED, before: before, after: after });
        }
    }
    if (options === null || options === void 0 ? void 0 : options.bi) {
        var rChanges = getChanges(look, from, { halphed: true });
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
    var temp = JSON.parse(JSON.stringify(current));
    var data = function (block, at) {
        return block[at];
    };
    for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
        var c = changes_1[_i];
        var attr = temp;
        for (var i = 0; i < c.path.length; i++) {
            if (i == c.path.length - 1) {
                if (c.type == _changes__WEBPACK_IMPORTED_MODULE_0__.ChangeTypes.REMOVED) {
                    delete attr[c.path[i]];
                }
                else {
                    attr[c.path[i]] = c.after;
                }
            }
            else {
                attr = data(attr, c.path[i]);
            }
        }
    }
    return temp;
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
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var repo = new _repo_class__WEBPACK_IMPORTED_MODULE_0__.Repo("Sample");
repo.onload(function (r) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, r.checkout('main')
                // await r.branchAndCheckout("Another");
                // repo.board = { name: "Kennedy", age: 4433212, data: { name: "What" } };
                // repo.save();
                // repo.stage()
                // await repo.commit("New Commit")
                // repo.merge("Another");
            ];
            case 1:
                _a.sent();
                // await r.branchAndCheckout("Another");
                // repo.board = { name: "Kennedy", age: 4433212, data: { name: "What" } };
                // repo.save();
                // repo.stage()
                // await repo.commit("New Commit")
                // repo.merge("Another");
                console.log(r.details);
                return [2 /*return*/];
        }
    });
}); });
// const a = { name: "Lone Kendo", age: 26, data: [1, 3, 4], time: new Date() };
// const b = { name: "Lone Man", data: [1,3,7], time: a.time };
// const c = changes(a, b);
// const d = update(a, b, c);
// console.log({c, d});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC8uL3NyYy9sb2NhbC5zdG9yYWdlLnRzIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0Ly4vc3JjL3JlcG8uY2xhc3MudHMiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9zcmMvcmVwby5kYXRhYmFzZS50cyIsIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC8uL3NyYy9zaGFyZWQvY2hhbmdlcy50cyIsIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC8uL3NyYy9zaGFyZWQvcmV0cmlldmUudHMiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9zcmMvc2hhcmVkL3VwZGF0ZS50cyIsIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNvQztBQUVwQztJQTJCSSxpQkFBbUIsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBN0JELHNCQUFZLDZCQUFRO2FBQXBCO1lBQ0ksT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDBCQUFLO2FBQVQ7WUFDSSxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDOUIsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQzs7O09BQUE7SUFFTywwQkFBUSxHQUFoQixVQUFpQixLQUFrQjtRQUFsQixnQ0FBUSxJQUFJLENBQUMsS0FBSztRQUMvQixZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTywwQkFBUSxHQUFoQjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsSUFBSSxLQUFLLEdBQXVCLEVBQUUsQ0FBQztRQUVuQyxJQUFJO1lBQ0EsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBYyxDQUFPLENBQUM7U0FDNUM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDZDtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFPRCxzQkFBSSxHQUFKLFVBQUssR0FBK0I7UUFDaEMsT0FBTyxHQUFH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LFNBQXdCO2dCQUN4Qix3Q0FBd0M7Z0JBRXhDLDBFQUEwRTtnQkFDMUUsZUFBZTtnQkFHZixlQUFlO2dCQUNmLGtDQUFrQztnQkFDbEMseUJBQXlCO2dCQUV6QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7OztLQUUxQixDQUFDO0FBSUYsZ0ZBQWdGO0FBQ2hGLCtEQUErRDtBQUUvRCwyQkFBMkI7QUFFM0IsNkJBQTZCO0FBRTdCLHVCQUF1QiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhbERvY3VtZW50IH0gZnJvbSBcIi4vbW9kZWxzL3F1ZXJ5Lm1vZGVsXCI7XHJcbmltcG9ydCB7IHY0IGFzIHV1aWRWNCB9IGZyb20gXCJ1dWlkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTG9jYWxEQjxUPntcclxuICAgIHByaXZhdGUgZ2V0IHJhd1ZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2YWx1ZSgpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRWYWx1ZSh2YWx1ZSA9IHRoaXMudmFsdWUpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLm5hbWUsIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRWYWx1ZSgpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMucmF3VmFsdWU7XHJcbiAgICAgICAgbGV0IHZhbHVlOiBMb2NhbERvY3VtZW50PFQ+W10gPSBbXTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKGRhdGEgYXMgc3RyaW5nKSBhcyBbXTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMudmFsdWUpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoW10pO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmQoZG9jPzogUGFydGlhbDxMb2NhbERvY3VtZW50PFQ+Pikge1xyXG4gICAgICAgIHJldHVybiBkb2NcclxuICAgICAgICAgICAgPyB0aGlzLnZhbHVlLmZpbHRlcih2ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBmbGFnOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayBpbiB2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChkb2MgYXMgYW55KVtrXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnID0gKHYgYXMgYW55KVtrXSA9PT0gKGRvYyBhcyBhbnkpW2tdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmbGFnKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZsYWc7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIDogdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kT25lKGRvYz86IFBhcnRpYWw8TG9jYWxEb2N1bWVudDxUPj4pIHtcclxuICAgICAgICByZXR1cm4gZG9jXHJcbiAgICAgICAgICAgID8gdGhpcy52YWx1ZS5maW5kKHYgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZsYWc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrIGluIHYpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGRvYyBhcyBhbnkpW2tdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgPSAodiBhcyBhbnkpW2tdID09PSAoZG9jIGFzIGFueSlba107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZsYWcpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmxhZztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgOiB0aGlzLnZhbHVlWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIGluc2VydChkb2NzOiBUW10pIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy52YWx1ZTtcclxuICAgICAgICBmb3IgKGxldCBkb2Mgb2YgZG9jcylcclxuICAgICAgICAgICAgZGF0YS5wdXNoKHsgLi4uZG9jLCBfaWQ6IHV1aWRWNCgpIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNldFZhbHVlKGRhdGEpO1xyXG5cclxuICAgICAgICByZXR1cm4gZG9jcyBhcyBMb2NhbERvY3VtZW50PFQ+W107XHJcbiAgICB9XHJcblxyXG4gICAgaW5zZXJ0T25lKGRvYzogVCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIGRhdGEucHVzaCh7IF9pZDogdXVpZFY0KCksIC4uLmRvYyB9KTtcclxuICAgICAgICB0aGlzLnNldFZhbHVlKGRhdGEpO1xyXG5cclxuICAgICAgICByZXR1cm4gZG9jIGFzIExvY2FsRG9jdW1lbnQ8VD47XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHBhcmFtOiBQYXJ0aWFsPExvY2FsRG9jdW1lbnQ8VD4+LCBkb2M6IFBhcnRpYWw8VD5bXSkge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5maW5kKHBhcmFtKSBhcyBMb2NhbERvY3VtZW50PFQ+W107XHJcbiAgICAgICAgbGV0IGRldGFpbCA9IHsgb2s6IGZhbHNlLCBuOiAwIH07XHJcbiAgICAgICAgaWYgKGZvdW5kKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm91bmQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogaW4gZG9jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKGZvdW5kW2ldIGFzIGFueSlbal0gPSAoZG9jIGFzIGFueSlbal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWUubWFwKHYgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm91bmQubWFwKGYgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2Ll9pZCA9PSBmLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsID0geyBvazogdHJ1ZSwgbjogZGV0YWlsLm4rKyB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICBkZXRhaWwgPSB7IG9rOiB0cnVlLCBuOiAxIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGV0YWlsO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZU9uZShwYXJhbTogUGFydGlhbDxMb2NhbERvY3VtZW50PFQ+PiwgZG9jOiBQYXJ0aWFsPFQ+KSB7ICAgICAgICBcclxuICAgICAgICBjb25zdCBmb3VuZCA9IHRoaXMuZmluZE9uZShwYXJhbSk7ICAgICAgICBcclxuICAgICAgICBsZXQgZGV0YWlsID0geyBvazogZmFsc2UsIG46IDAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgaWYgKGZvdW5kKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gZG9jKSB7XHJcbiAgICAgICAgICAgICAgICAoZm91bmQgYXMgYW55KVtpXSA9IChkb2MgYXMgYW55KVtpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZS5tYXAodiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodi5faWQgPT0gZm91bmQuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsID0geyBvazogdHJ1ZSwgbjogZGV0YWlsLm4rKyB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHYgPSBmb3VuZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgICAgICB9KTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGV0YWlsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZShwYXJhbTogUGFydGlhbDxMb2NhbERvY3VtZW50PFQ+Pikge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5maW5kKHBhcmFtKSBhcyBMb2NhbERvY3VtZW50PFQ+W107XHJcbiAgICAgICAgbGV0IGRldGFpbCA9IHsgb2s6IGZhbHNlLCBuOiAwIH07XHJcblxyXG4gICAgICAgIGlmIChmb3VuZCkge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlLmZpbHRlcih2ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBmbGFnOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZvdW5kLm1hcChmID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodi5faWQgPT0gZi5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsLm4rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmbGFnO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICBkZXRhaWwgPSB7IG9rOiB0cnVlLCBuOiAxIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGV0YWlsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZU9uZShwYXJhbTogUGFydGlhbDxMb2NhbERvY3VtZW50PFQ+Pikge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5maW5kT25lKHBhcmFtKTtcclxuICAgICAgICBsZXQgZGV0YWlsID0geyBvazogZmFsc2UsIG46IDAgfTtcclxuXHJcbiAgICAgICAgaWYgKGZvdW5kKSB7XHJcbiAgICAgICAgICAgIGRldGFpbC5vayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlLmZpbHRlcih2ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBmbGFnOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh2Ll9pZCA9PSBmb3VuZC5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWwubisrO1xyXG4gICAgICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmbGFnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGV0YWlsO1xyXG4gICAgfVxyXG5cclxuICAgIGRyb3AoKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5uYW1lLCAnbnVsbCcpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdjQgYXMgdXVpZFY0IH0gZnJvbSBcInV1aWRcIjtcclxuXHJcbmltcG9ydCB7IExvY2FsREIgfSBmcm9tIFwiLi9sb2NhbC5zdG9yYWdlXCI7XHJcbmltcG9ydCB7IEJyYW5jaCB9IGZyb20gXCIuL21vZGVscy9icmFuY2guaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENvbW1pdCwgQ29tbWl0Q2hhbmdlIH0gZnJvbSBcIi4vbW9kZWxzL2NvbW1pdC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBpbnNlcnRGdW5jdGlvbiwgcmVhZEZ1bmN0aW9uLCBSZXBvRGF0YWJhc2UsIHVwZGF0ZUZ1bmN0aW9uIH0gZnJvbSBcIi4vcmVwby5kYXRhYmFzZVwiO1xyXG5pbXBvcnQgeyBDaGFuZ2UsIENoYW5nZVR5cGVzLCBnZXRDaGFuZ2VzIH0gZnJvbSBcIi4vc2hhcmVkL2NoYW5nZXNcIjtcclxuaW1wb3J0IHsgcmV0cmlldmUgfSBmcm9tIFwiLi9zaGFyZWQvcmV0cmlldmVcIjtcclxuaW1wb3J0IHsgdXBkYXRlIH0gZnJvbSBcIi4vc2hhcmVkL3VwZGF0ZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXBvSGVhZCB7XHJcbiAgICBjb21taXQ6IHN0cmluZztcclxuICAgIGJyYW5jaD86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVwbzxUID0gYW55PiB7XHJcbiAgICByZWFkb25seSBfaWQ6IHN0cmluZztcclxuICAgIHJlYWRvbmx5IGRhdGE6IFQ7XHJcbiAgICByZWFkb25seSBoZWFkOiBSZXBvSGVhZDtcclxuICAgIHJlYWRvbmx5IGJyYW5jaGVzOiBCcmFuY2hbXTtcclxuICAgIHJlYWRvbmx5IGNoYW5nZXM6IENoYW5nZVtdO1xyXG4gICAgcmVhZG9ubHkgc3RhZ2VkOiBDaGFuZ2VbXTtcclxuICAgIHJlYWRvbmx5IGNvbW1pdHM6IENvbW1pdFtdO1xyXG4gICAgcmVhZG9ubHkgbWVyZ2VkOiBzdHJpbmdbXTtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHJlYWRvbmx5IHRpbWU6IERhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXBvPFQ+IGltcGxlbWVudHMgSVJlcG88VD4ge1xyXG4gICAgcHJpdmF0ZSBjb250ZW50OiBJUmVwbzxUPjtcclxuXHJcbiAgICBjaGFuZ2VzOiBDaGFuZ2VbXSA9IFtdO1xyXG4gICAgY29tbWl0czogQ29tbWl0W10gPSBbXTtcclxuICAgIG1lcmdlZDogc3RyaW5nW10gPSBbXTtcclxuICAgIHN0YWdlZDogQ2hhbmdlW10gPSBbXTtcclxuICAgIGhlYWQ6IFJlcG9IZWFkID0geyBjb21taXQ6IHVuZGVmaW5lZCB9O1xyXG4gICAgYnJhbmNoZXM6IEJyYW5jaFtdID0gW107XHJcbiAgICB0aW1lOiBEYXRlID0gbmV3IERhdGUoKTtcclxuICAgIF9pZDogc3RyaW5nO1xyXG5cclxuICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xyXG4gICAgYm9hcmQ6IFQ7XHJcblxyXG4gICAgZ2V0IGRldGFpbHMoKSB7XHJcbiAgICAgICAgY29uc3QgYnJhbmNoID0gdGhpcy5icmFuY2hlcy5maW5kKGIgPT4gYi5faWQgPT0gdGhpcy5oZWFkLmJyYW5jaCk/Lm5hbWU7XHJcbiAgICAgICAgY29uc3QgbkJyYW5jaCA9IHRoaXMuYnJhbmNoZXMubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IG5DaGFuZ2VzID0gdGhpcy5jaGFuZ2VzLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBuU3RhZ2VkID0gdGhpcy5zdGFnZWQubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IGNvbW1pdCA9IHRoaXMuY29tbWl0cy5maW5kKGMgPT4gYy5faWQgPT0gdGhpcy5oZWFkLmNvbW1pdCk7XHJcbiAgICAgICAgY29uc3QgbkNvbW1pdHMgPSB0aGlzLmNvbW1pdEFuY2VzdG9ycyhjb21taXQpLmxlbmd0aCArIDE7XHJcbiAgICAgICAgcmV0dXJuIHsgYnJhbmNoLCBuQnJhbmNoLCBuQ2hhbmdlcywgblN0YWdlZCwgY29tbWl0LCBuQ29tbWl0cyB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgcmVhZG9ubHkgZGF0YTogVCA9IG51bGwsXHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhYmFzZTogUmVwb0RhdGFiYXNlPFQ+ID0geyBpbnNlcnQ6IGluc2VydEZ1bmN0aW9uLCByZWFkOiByZWFkRnVuY3Rpb24sIHVwZGF0ZTogdXBkYXRlRnVuY3Rpb24gfVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgLy9Jbml0aWFsaXplIHJlcG8gd2l0aCBmaXJzdCBjb21taXQsIGJyYW5jaCBhbmQgdGhlIGhlYWQsIHRoZW4gY2hlY2tvdXQgdGhlIGJyYW5jaCBhbmQgY29tbWl0XHJcbiAgICAgICAgdGhpcy5jb21taXQoXCJJbml0aWFsIENvbW1pdFwiKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUJyYW5jaChcIm1haW5cIik7XHJcbiAgICAgICAgdGhpcy5jaGVja291dChcIm1haW5cIik7XHJcblxyXG4gICAgICAgIC8vU2V0IHRoZSBpbml0aWFsIGNvbnRlbnRcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSB7XHJcbiAgICAgICAgICAgIF9pZDogdXVpZFY0KCksXHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgICAgY2hhbmdlczogdGhpcy5jaGFuZ2VzLFxyXG4gICAgICAgICAgICBjb21taXRzOiB0aGlzLmNvbW1pdHMsXHJcbiAgICAgICAgICAgIGJyYW5jaGVzOiB0aGlzLmJyYW5jaGVzLFxyXG4gICAgICAgICAgICBzdGFnZWQ6IHRoaXMuc3RhZ2VkLFxyXG4gICAgICAgICAgICBoZWFkOiB0aGlzLmhlYWQsXHJcbiAgICAgICAgICAgIHRpbWU6IHRoaXMudGltZSxcclxuICAgICAgICAgICAgbWVyZ2VkOiBbXSxcclxuICAgICAgICAgICAgZGF0YTogdGhpcy5kYXRhXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9DcmVhdGUgdGhlIHJlcG9cclxuICAgICAgICBhd2FpdCB0aGlzLmluc2VydCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgaW5zZXJ0KCkge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmRhdGFiYXNlLmluc2VydCh0aGlzLmNvbnRlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgcmVhZCgpIHtcclxuICAgICAgICAvLyBSZWFkIHRoZSBzdG9yZWQgY29udGVudFxyXG4gICAgICAgIHRoaXMuY29udGVudCA9IGF3YWl0IHRoaXMuZGF0YWJhc2UucmVhZCh7IG5hbWU6IHRoaXMubmFtZSB9KTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHJlcG8gd2l0aCB0aGUgc3RvcmVkIGNvbnRlbnRcclxuICAgICAgICBpZiAodGhpcy5jb250ZW50KSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuY29udGVudCkubWFwKGsgPT4ge1xyXG4gICAgICAgICAgICAgICAgKHRoaXMgYXMgYW55KVtrXSA9ICh0aGlzLmNvbnRlbnQgYXMgYW55KVtrXTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb21taXRBbmNlc3RvcnMoY29tbWl0OiBDb21taXQpIHtcclxuICAgICAgICBsZXQgYW5jZXN0b3JzOiBDb21taXRbXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHsgcGFyZW50cyB9ID0gY29tbWl0O1xyXG5cclxuICAgICAgICBpZiAocGFyZW50cykge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcGFyZW50Q29tbWl0ID0gdGhpcy5jb21taXRzLnJldmVyc2UoKS5maW5kKGMgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGMuX2lkID09IHBhcmVudHMuYW5jZXN0b3IgfHwgYy5faWQgPT0gcGFyZW50cy5tZXJnZWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhcmVudENvbW1pdCkgYW5jZXN0b3JzID0gW3BhcmVudENvbW1pdCwgLi4udGhpcy5jb21taXRBbmNlc3RvcnMocGFyZW50Q29tbWl0KV1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhbmNlc3RvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0FuY2VzdG9yQ29tbWl0KGFuY2VzdG9yOiBDb21taXQsIGNoaWxkOiBDb21taXQpIHtcclxuICAgICAgICBjb25zdCBjaGlsZEFuY2VzdG9ycyA9IHRoaXMuY29tbWl0QW5jZXN0b3JzKGNoaWxkKTtcclxuICAgICAgICByZXR1cm4gY2hpbGRBbmNlc3RvcnMuZmluZChhID0+IGEuX2lkID09IGFuY2VzdG9yLl9pZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb21taXRzTGFzdENvbW1vbkFuY2VzdG9yKGZpcnN0OiBDb21taXQsIHNlY29uZDogQ29tbWl0KSB7XHJcbiAgICAgICAgY29uc3QgZmlyc3RBbmNlc3RvcnMgPSB0aGlzLmNvbW1pdEFuY2VzdG9ycyhmaXJzdCk7XHJcbiAgICAgICAgY29uc3Qgc2Vjb25kQW5jZXN0b3JzID0gdGhpcy5jb21taXRBbmNlc3RvcnMoc2Vjb25kKTtcclxuXHJcbiAgICAgICAgbGV0IGFuY2VzdG9yOiBDb21taXQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzQW5jZXN0b3JDb21taXQoZmlyc3QsIHNlY29uZCkpIGFuY2VzdG9yID0gZmlyc3Q7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc0FuY2VzdG9yQ29tbWl0KHNlY29uZCwgZmlyc3QpKSBhbmNlc3RvciA9IHNlY29uZDtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBhIGluIGZpcnN0QW5jZXN0b3JzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGIgaW4gc2Vjb25kQW5jZXN0b3JzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0QW5jZXN0b3JzW2FdID09PSBzZWNvbmRBbmNlc3RvcnNbYl0pIGFuY2VzdG9yID0gZmlyc3RBbmNlc3RvcnNbYV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuY2VzdG9yKSBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhbmNlc3RvcikgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhbmNlc3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvbmxvYWQoY2FsbGJhY2sgPSAocmVwbzogUmVwbzxUPikgPT4geyB9KSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5yZWFkKCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSBhd2FpdCB0aGlzLmluaXRpYWxpemUoKTtcclxuICAgICAgICB0aGlzLmJvYXJkID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEgfHwgbnVsbCkpO1xyXG5cclxuICAgICAgICBjYWxsYmFjayh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBzYXZlKCkge1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZXMgPSBnZXRDaGFuZ2VzKHRoaXMuZGF0YSwgdGhpcy5ib2FyZCwgeyBiaTogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBpIGluIGNoYW5nZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VzID0gdGhpcy5jaGFuZ2VzLmZpbHRlcihjID0+IEpTT04uc3RyaW5naWZ5KGMucGF0aCkgIT0gSlNPTi5zdHJpbmdpZnkoY2hhbmdlc1tpXS5wYXRoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlcy5wdXNoKGNoYW5nZXNbaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5kYXRhYmFzZS51cGRhdGUoeyBfaWQ6IHRoaXMuX2lkIH0sIHsgY2hhbmdlczogdGhpcy5jaGFuZ2VzLCBkYXRhOiB0aGlzLmJvYXJkIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGNyZWF0ZUJyYW5jaChuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBmb3VuZCA9IHRoaXMuYnJhbmNoZXMuZmluZChiID0+IGIubmFtZSA9PSBuYW1lKTtcclxuICAgICAgICBpZiAoZm91bmQpIHRocm93IG5ldyBFcnJvcihgQnJhbmNoIHdpdGggbmFtZSAnJHtuYW1lfScgYWxyZWFkeSBleGlzdHMgaW4gdGhpcyByZXBvYCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJyYW5jaDogQnJhbmNoID0geyBuYW1lLCB0aW1lOiBuZXcgRGF0ZSgpLCBjb21taXQ6IHRoaXMuaGVhZC5jb21taXQsIF9pZDogdXVpZFY0KCkgfTtcclxuICAgICAgICB0aGlzLmJyYW5jaGVzLnB1c2goYnJhbmNoKTtcclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5kYXRhYmFzZS51cGRhdGUoeyBfaWQ6IHRoaXMuX2lkIH0sIHsgYnJhbmNoZXM6IHRoaXMuYnJhbmNoZXMgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZGVsZXRlQnJhbmNoKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChuYW1lID09ICdtYWluJykgdGhyb3cgbmV3IEVycm9yKFwiWW91IGNhbiBub3QgcmVtb3ZlIHRoZSBNYWluIGJyYW5jaFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5icmFuY2hlcyA9IHRoaXMuYnJhbmNoZXMuZmlsdGVyKGIgPT4gYi5uYW1lICE9IG5hbWUpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZGF0YWJhc2UudXBkYXRlKHsgX2lkOiB0aGlzLl9pZCB9LCB7IGJyYW5jaGVzOiB0aGlzLmJyYW5jaGVzIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGJyYW5jaEFuZENoZWNrb3V0KG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlQnJhbmNoKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tvdXQobmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY2hlY2tvdXQobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGV0YWlscy5uQ2hhbmdlcykgdGhyb3cgbmV3IEVycm9yKFwiVW5zdGFnZWQgQ2hhbmdlc1wiKTtcclxuICAgICAgICBpZiAodGhpcy5kZXRhaWxzLm5TdGFnZWQpIHRocm93IG5ldyBFcnJvcihcIlVuY29tbWl0ZWQgQ2hhbmdlc1wiKTtcclxuXHJcbiAgICAgICAgY29uc3QgYnJhbmNoID0gdGhpcy5icmFuY2hlcy5maW5kKGIgPT4gYi5uYW1lID09IG5hbWUpO1xyXG4gICAgICAgIGlmICghYnJhbmNoKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGJyYW5jaFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5oZWFkLmJyYW5jaCA9IGJyYW5jaC5faWQ7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5kYXRhYmFzZS51cGRhdGUoeyBfaWQ6IHRoaXMuX2lkIH0sIHsgaGVhZDogdGhpcy5oZWFkIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHN0YWdlKHBhdGhzPzogc3RyaW5nW11bXSkge1xyXG4gICAgICAgIC8vIEVhY2ggZGlyIGlzIGEgc3RyaW5nXHJcbiAgICAgICAgLy8gRWFjaCBwYXRoIGlzIGEgbGlzdCBvZiBzdHJpbmcgb3IgYSBzaW5nbGUgc3RyaW5nKGRpcilcclxuICAgICAgICAvLyBUaGVyZSBmb3IgcGF0aHMgaXMgYSBsaXN0IG9mIHN0cmluZ3Mgb3IgYSBsaXN0IG9mIGxpc3Qgb2Ygc3RyaW5nc1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuY2hhbmdlcy5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHBhdGhzKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgcGF0aCBvZiBwYXRocykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hhbmdlID0gdGhpcy5jaGFuZ2VzLmZpbmQoYyA9PiBKU09OLnN0cmluZ2lmeShjLnBhdGgpID09IEpTT04uc3RyaW5naWZ5KHBhdGgpKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZXMgPSB0aGlzLmNoYW5nZXMuZmlsdGVyKGMgPT4gSlNPTi5zdHJpbmdpZnkoYy5wYXRoKSAhPSBKU09OLnN0cmluZ2lmeShjaGFuZ2UucGF0aCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2VkID0gdGhpcy5zdGFnZWQuZmlsdGVyKGMgPT4gSlNPTi5zdHJpbmdpZnkoYy5wYXRoKSAhPSBKU09OLnN0cmluZ2lmeShjaGFuZ2UucGF0aCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2VkLnB1c2goY2hhbmdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgdGhpcy5jaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZXMgPSB0aGlzLmNoYW5nZXMuZmlsdGVyKGMgPT4gSlNPTi5zdHJpbmdpZnkoYy5wYXRoKSAhPSBKU09OLnN0cmluZ2lmeShjaGFuZ2UucGF0aCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZWQgPSB0aGlzLnN0YWdlZC5maWx0ZXIoYyA9PiBKU09OLnN0cmluZ2lmeShjLnBhdGgpICE9IEpTT04uc3RyaW5naWZ5KGNoYW5nZS5wYXRoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlZC5wdXNoKGNoYW5nZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMuZGF0YWJhc2UudXBkYXRlKHsgX2lkOiB0aGlzLl9pZCB9LCB7IHN0YWdlZDogdGhpcy5zdGFnZWQsIGNoYW5nZXM6IHRoaXMuY2hhbmdlcyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBjb21taXQobWVzc2FnZTogc3RyaW5nLCBhbmNlc3Rvcjogc3RyaW5nID0gdGhpcy5oZWFkLmNvbW1pdCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGFnZWQubGVuZ3RoICYmIHRoaXMuaW5pdGlhbGl6ZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZXM6IENvbW1pdENoYW5nZVtdID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc3RhZ2VkKSB7XHJcbiAgICAgICAgICAgIGNoYW5nZXMucHVzaCh7IC4uLnMsIHZhbHVlOiByZXRyaWV2ZSh0aGlzLmJvYXJkLCBzLnBhdGgpIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjb21taXQ6IENvbW1pdCA9IHtcclxuICAgICAgICAgICAgX2lkOiB1dWlkVjQoKSwgbWVzc2FnZSwgY2hhbmdlcywgcGFyZW50czogeyBhbmNlc3RvciB9LCB0aW1lOiBuZXcgRGF0ZSgpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5jb21taXRzLnB1c2goY29tbWl0KTtcclxuICAgICAgICB0aGlzLmhlYWQuY29tbWl0ID0gY29tbWl0Ll9pZDtcclxuICAgICAgICB0aGlzLnN0YWdlZCA9IFtdO1xyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLmRhdGFiYXNlLnVwZGF0ZSh7IF9pZDogdGhpcy5faWQgfSwgeyBjb21taXRzOiB0aGlzLmNvbW1pdHMsIHN0YWdlZDogdGhpcy5zdGFnZWQsIGhlYWQ6IHRoaXMuaGVhZCB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBtZXJnZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50QnJhbmNoID0gdGhpcy5icmFuY2hlcy5maW5kKGIgPT4gYi5faWQgPT0gdGhpcy5oZWFkLmJyYW5jaCk7XHJcbiAgICAgICAgY29uc3QgaW5jb21pbmdCcmFuY2ggPSB0aGlzLmJyYW5jaGVzLmZpbmQoYiA9PiBiLm5hbWUgPT0gbmFtZSk7XHJcbiAgICAgICAgaWYgKCFpbmNvbWluZ0JyYW5jaCkgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBicmFuY2hcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb21taXQgPSB0aGlzLmNvbW1pdHMuZmluZChjID0+IGMuX2lkID09IHRoaXMuaGVhZC5jb21taXQpO1xyXG4gICAgICAgIGNvbnN0IGluY29taW5nQ29tbWl0ID0gdGhpcy5jb21taXRzLmZpbmQoYyA9PiBjLl9pZCA9PSBpbmNvbWluZ0JyYW5jaC5jb21taXQpO1xyXG5cclxuICAgICAgICBjb25zdCBjaGFuZ2VzID0gZ2V0Q2hhbmdlcyhjdXJyZW50Q29tbWl0LmNoYW5nZXMsIGluY29taW5nQ29tbWl0LmNoYW5nZXMsIHsgYmk6IHRydWUgfSk7XHJcbiAgICAgICAgaWYgKCFjaGFuZ2VzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIGRpZmZlcmVuY2UgZm91bmRcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzQW5jZXN0b3JDb21taXQoY3VycmVudENvbW1pdCwgaW5jb21pbmdDb21taXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZC5jb21taXQgPSBpbmNvbWluZ0NvbW1pdC5faWQ7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50QnJhbmNoKSBjdXJyZW50QnJhbmNoLmNvbW1pdCA9IHRoaXMuaGVhZC5jb21taXQ7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZGF0YWJhc2UudXBkYXRlKHsgX2lkOiB0aGlzLl9pZCB9LCB7IGhlYWQ6IHRoaXMuaGVhZCwgYnJhbmNoZXM6IHRoaXMuYnJhbmNoZXMgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNBbmNlc3RvckNvbW1pdChpbmNvbWluZ0NvbW1pdCwgY3VycmVudENvbW1pdCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQnJhbmNoIGlzIGJlaGluZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoIXRoaXMuY29tbWl0c0xhc3RDb21tb25BbmNlc3RvcihjdXJyZW50Q29tbWl0LCBpbmNvbWluZ0NvbW1pdCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQnJhbmNoIGlzIG5vdCByZWxhdGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdXBkYXRlKHRoaXMuYm9hcmQsIGluY29taW5nQ29tbWl0LmNoYW5nZXMpO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1pdChcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGlmZigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVzaCh0bzogc3RyaW5nLCBvcmlnaW46IHN0cmluZywgYnJhbmNoOiBzdHJpbmcpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVsbChmcm9tOiBzdHJpbmcpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdHVzKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBsb2coKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNsb25lKCkge1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IExvY2FsREIgfSBmcm9tIFwiLi9sb2NhbC5zdG9yYWdlXCI7XHJcbmltcG9ydCB7IExvY2FsRG9jdW1lbnQgfSBmcm9tIFwiLi9tb2RlbHMvcXVlcnkubW9kZWxcIjtcclxuaW1wb3J0IHsgSVJlcG8gfSBmcm9tIFwiLi9yZXBvLmNsYXNzXCI7XHJcblxyXG5jb25zdCBzdG9yYWdlID0gbmV3IExvY2FsREI8SVJlcG8+KFwiUmVwb3NcIik7XHJcblxyXG5leHBvcnQgY29uc3QgcmVhZEZ1bmN0aW9uID0gYXN5bmMgKGRhdGE6IFBhcnRpYWw8TG9jYWxEb2N1bWVudDxJUmVwbz4+KSA9PiB7XHJcbiAgICByZXR1cm4gYXdhaXQgc3RvcmFnZS5maW5kT25lKGRhdGEpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaW5zZXJ0RnVuY3Rpb24gPSBhc3luYyAoZGF0YTogSVJlcG8pID0+IHtcclxuICAgIHJldHVybiBhd2FpdCBzdG9yYWdlLmluc2VydE9uZShkYXRhKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUZ1bmN0aW9uID0gYXN5bmMgKHBhcmFtczogUGFydGlhbDxMb2NhbERvY3VtZW50PElSZXBvPj4sIGRhdGE6IFBhcnRpYWw8SVJlcG8+KSA9PiB7XHJcbiAgICByZXR1cm4gYXdhaXQgc3RvcmFnZS51cGRhdGVPbmUocGFyYW1zLCBkYXRhKTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXBvRGF0YWJhc2U8VD4ge1xyXG4gICAgaW5zZXJ0OiAoZGF0YTogSVJlcG88VD4pID0+IFByb21pc2U8TG9jYWxEb2N1bWVudDxJUmVwbzxUPj4+LFxyXG4gICAgcmVhZDogKGRhdGE6IFBhcnRpYWw8TG9jYWxEb2N1bWVudDxJUmVwbz4+KSA9PiBQcm9taXNlPElSZXBvPFQ+PixcclxuICAgIHVwZGF0ZTogKHBhcmFtczogUGFydGlhbDxMb2NhbERvY3VtZW50PElSZXBvPj4sIGRhdGE6IFBhcnRpYWw8SVJlcG8+KSA9PiBQcm9taXNlPGFueT5cclxufSIsImV4cG9ydCBlbnVtIENoYW5nZVR5cGVzIHtcclxuICAgIFJFTU9WRUQgPSBcIlJlbW92ZWRcIixcclxuICAgIENIQU5HRUQgPSBcIkNoYW5nZWRcIixcclxuICAgIEFEREVEID0gXCJBZGRlZFwiXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2hhbmdlIHtcclxuICAgIHBhdGg6IGFueVtdO1xyXG4gICAgdHlwZTogQ2hhbmdlVHlwZXM7XHJcbiAgICBiZWZvcmU6IGFueTtcclxuICAgIGFmdGVyOiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGFuZ2VzKGZyb206IGFueSwgbG9vazogYW55LCBvcHRpb25zPzogeyBwYXRoPzogc3RyaW5nW10sIGJpPzogYm9vbGVhbiwgaGFscGhlZD86IGJvb2xlYW4gfSkge1xyXG4gICAgY29uc3QgbENoYW5nZXM6IENoYW5nZVtdID0gW107XHJcbiAgICBjb25zdCBwYXRoID0gb3B0aW9ucz8ucGF0aCB8fCBbXTtcclxuXHJcbiAgICBmcm9tID0gZnJvbSB8fCB7fTtcclxuICAgIGxvb2sgPSBsb29rIHx8IHt9O1xyXG5cclxuICAgIGZvciAoY29uc3QgaSBpbiBmcm9tKSB7XHJcbiAgICAgICAgY29uc3QgYWZ0ZXIgPSAob3B0aW9ucz8uaGFscGhlZCkgPyBmcm9tW2ldIDogbG9va1tpXTtcclxuICAgICAgICBjb25zdCBiZWZvcmUgPSAob3B0aW9ucz8uaGFscGhlZCkgPyBsb29rW2ldIDogZnJvbVtpXTtcclxuXHJcbiAgICAgICAgaWYgKCFsb29rPy5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgICAgICAgICBsQ2hhbmdlcy5wdXNoKHsgcGF0aDogWy4uLnBhdGgsIGldLCB0eXBlOiAob3B0aW9ucz8uaGFscGhlZCkgPyBDaGFuZ2VUeXBlcy5SRU1PVkVEIDogQ2hhbmdlVHlwZXMuQURERUQsIGJlZm9yZSwgYWZ0ZXIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBmcm9tW2ldID09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgbENoYW5nZXMucHVzaCguLi5nZXRDaGFuZ2VzKGZyb21baV0sIGxvb2tbaV0sIHsgcGF0aDogWy4uLnBhdGgsIGldIH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZnJvbVtpXSAhPT0gbG9va1tpXSkge1xyXG4gICAgICAgICAgICBsQ2hhbmdlcy5wdXNoKHsgcGF0aDogWy4uLnBhdGgsIGldLCB0eXBlOiBDaGFuZ2VUeXBlcy5DSEFOR0VELCBiZWZvcmUsIGFmdGVyIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucz8uYmkpIHtcclxuICAgICAgICBjb25zdCByQ2hhbmdlcyA9IGdldENoYW5nZXMobG9vaywgZnJvbSwgeyBoYWxwaGVkOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHJDIG9mIHJDaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrZWQgPSBsQ2hhbmdlcy5maW5kKGMgPT4gSlNPTi5zdHJpbmdpZnkoYy5wYXRoKSA9PSBKU09OLnN0cmluZ2lmeShyQy5wYXRoKSk7XHJcbiAgICAgICAgICAgIGlmICghY2hlY2tlZCkgbENoYW5nZXMucHVzaChyQyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxDaGFuZ2VzO1xyXG59IiwiZXhwb3J0IGZ1bmN0aW9uIHJldHJpZXZlKGNvbGxlY3Rpb246IGFueSwgcGF0aDogc3RyaW5nW10pIHtcclxuICAgIC8vcmV0cmlldmUgZGF0YSBmcm9tIGFuIG9iamVjdFxyXG4gICAgY29uc3QgZGF0YSA9IChibG9jazogYW55LCBhdDogYW55KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGJsb2NrW2F0XTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdmFsdWU7XHJcblxyXG4gICAgZm9yIChsZXQgaSBpbiBwYXRoKSB7XHJcbiAgICAgICAgaWYgKGkgPT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgLy9zZXQgdGhlIHZhbHVlIG9uIGZpcnN0IGRpclxyXG4gICAgICAgICAgICB2YWx1ZSA9IGRhdGEoY29sbGVjdGlvbiwgcGF0aFtpXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gZGF0YSh2YWx1ZSwgcGF0aFtpXSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59IiwiaW1wb3J0IHsgQ2hhbmdlLCBDaGFuZ2VUeXBlcyB9IGZyb20gXCIuL2NoYW5nZXNcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUoY3VycmVudDogYW55LCBjaGFuZ2VzOiBDaGFuZ2VbXSkge1xyXG4gICAgY29uc3QgdGVtcCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY3VycmVudCkpO1xyXG5cclxuICAgIGNvbnN0IGRhdGEgPSAoYmxvY2s6IGFueSwgYXQ6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBibG9ja1thdF07XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgYyBvZiBjaGFuZ2VzKSB7XHJcbiAgICAgICAgbGV0IGF0dHIgPSB0ZW1wO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGMucGF0aC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA9PSBjLnBhdGgubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGMudHlwZSA9PSBDaGFuZ2VUeXBlcy5SRU1PVkVEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGF0dHJbYy5wYXRoW2ldXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cltjLnBhdGhbaV1dID0gYy5hZnRlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGF0dHIgPSBkYXRhKGF0dHIsIGMucGF0aFtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRlbXA7XHJcbn0iLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG52YXIgZ2V0UmFuZG9tVmFsdWVzO1xudmFyIHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uIEFsc28sXG4gICAgLy8gZmluZCB0aGUgY29tcGxldGUgaW1wbGVtZW50YXRpb24gb2YgY3J5cHRvIChtc0NyeXB0bykgb24gSUUxMS5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pIHx8IHR5cGVvZiBtc0NyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PT0gJ2Z1bmN0aW9uJyAmJiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChtc0NyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xuXG52YXIgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKSk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIpIHtcbiAgdmFyIG9mZnNldCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcbiAgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG4gIHZhciB1dWlkID0gKGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgM11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDVdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA3XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDhdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxM11dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNV1dKS50b0xvd2VyQ2FzZSgpOyAvLyBDb25zaXN0ZW5jeSBjaGVjayBmb3IgdmFsaWQgVVVJRC4gIElmIHRoaXMgdGhyb3dzLCBpdCdzIGxpa2VseSBkdWUgdG8gb25lXG4gIC8vIG9mIHRoZSBmb2xsb3dpbmc6XG4gIC8vIC0gT25lIG9yIG1vcmUgaW5wdXQgYXJyYXkgdmFsdWVzIGRvbid0IG1hcCB0byBhIGhleCBvY3RldCAobGVhZGluZyB0b1xuICAvLyBcInVuZGVmaW5lZFwiIGluIHRoZSB1dWlkKVxuICAvLyAtIEludmFsaWQgaW5wdXQgdmFsdWVzIGZvciB0aGUgUkZDIGB2ZXJzaW9uYCBvciBgdmFyaWFudGAgZmllbGRzXG5cbiAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaW5naWZ5OyIsImltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHN0cmluZ2lmeSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiBzdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsImltcG9ydCBSRUdFWCBmcm9tICcuL3JlZ2V4LmpzJztcblxuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnICYmIFJFR0VYLnRlc3QodXVpZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgUmVwbyB9IGZyb20gXCIuL3JlcG8uY2xhc3NcIjtcclxuaW1wb3J0IHsgU2FtcGxlIH0gZnJvbSBcIi4vbW9kZWxzL3NhbXBsZVwiO1xyXG5pbXBvcnQgeyBnZXRDaGFuZ2VzIH0gZnJvbSBcIi4vc2hhcmVkL2NoYW5nZXNcIjtcclxuaW1wb3J0IHsgdXBkYXRlIH0gZnJvbSBcIi4vc2hhcmVkL3VwZGF0ZVwiO1xyXG5pbXBvcnQgeyBMb2NhbERCIH0gZnJvbSBcIi4vbG9jYWwuc3RvcmFnZVwiO1xyXG5cclxuY29uc3QgcmVwbyA9IG5ldyBSZXBvPFNhbXBsZT4oXCJTYW1wbGVcIik7XHJcbnJlcG8ub25sb2FkKGFzeW5jIChyKSA9PiB7XHJcbiAgICBhd2FpdCByLmNoZWNrb3V0KCdtYWluJylcclxuICAgIC8vIGF3YWl0IHIuYnJhbmNoQW5kQ2hlY2tvdXQoXCJBbm90aGVyXCIpO1xyXG5cclxuICAgIC8vIHJlcG8uYm9hcmQgPSB7IG5hbWU6IFwiS2VubmVkeVwiLCBhZ2U6IDQ0MzMyMTIsIGRhdGE6IHsgbmFtZTogXCJXaGF0XCIgfSB9O1xyXG4gICAgLy8gcmVwby5zYXZlKCk7XHJcblxyXG5cclxuICAgIC8vIHJlcG8uc3RhZ2UoKVxyXG4gICAgLy8gYXdhaXQgcmVwby5jb21taXQoXCJOZXcgQ29tbWl0XCIpXHJcbiAgICAvLyByZXBvLm1lcmdlKFwiQW5vdGhlclwiKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhyLmRldGFpbHMpO1xyXG5cclxufSlcclxuXHJcblxyXG5cclxuLy8gY29uc3QgYSA9IHsgbmFtZTogXCJMb25lIEtlbmRvXCIsIGFnZTogMjYsIGRhdGE6IFsxLCAzLCA0XSwgdGltZTogbmV3IERhdGUoKSB9O1xyXG4vLyBjb25zdCBiID0geyBuYW1lOiBcIkxvbmUgTWFuXCIsIGRhdGE6IFsxLDMsN10sIHRpbWU6IGEudGltZSB9O1xyXG5cclxuLy8gY29uc3QgYyA9IGNoYW5nZXMoYSwgYik7XHJcblxyXG4vLyBjb25zdCBkID0gdXBkYXRlKGEsIGIsIGMpO1xyXG5cclxuLy8gY29uc29sZS5sb2coe2MsIGR9KTsiXSwic291cmNlUm9vdCI6IiJ9