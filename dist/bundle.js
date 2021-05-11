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
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _repo_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./repo.database */ "./src/repo.database.ts");
/* harmony import */ var _shared_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/changes */ "./src/shared/changes.ts");
/* harmony import */ var _shared_retrieve__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/retrieve */ "./src/shared/retrieve.ts");
/* harmony import */ var _shared_rollback__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/rollback */ "./src/shared/rollback.ts");
/* harmony import */ var _shared_update__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/update */ "./src/shared/update.ts");
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
            var nCommits = this.commitAncestory(commit).length + 1;
            var head = this.head;
            return { branch: branch, nBranch: nBranch, nChanges: nChanges, nStaged: nStaged, commit: commit, nCommits: nCommits, head: head };
        },
        enumerable: false,
        configurable: true
    });
    Repo.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var branch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //Initialize repo with first commit, branch and the head, then checkout the branch and commit
                        this.commit("Initial Commit", []);
                        return [4 /*yield*/, this.createBranch("main")];
                    case 1:
                        branch = _a.sent();
                        this.head.branch = branch._id;
                        //Set the initial content
                        this.content = {
                            _id: (0,uuid__WEBPACK_IMPORTED_MODULE_5__.default)(),
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
                    case 2:
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
    Repo.prototype.commitAncestory = function (commit) {
        var _this = this;
        var ancestors = [];
        var history = commit.history;
        if (history.length) {
            var historyCommit = history.map(function (h) { return _this.commits.find(function (c) { return c._id == h; }); });
            historyCommit.map(function (h) { return _this.commitAncestory(h); });
            ancestors.push.apply(ancestors, __spreadArray(__spreadArray([], historyCommit), historyCommit.reduce(function (acc, commit) {
                return __spreadArray(__spreadArray([], acc), _this.commitAncestory(commit));
            }, [])));
        }
        return ancestors;
    };
    Repo.prototype.equalCommits = function (first, second) {
        return first._id == second._id;
    };
    Repo.prototype.commitToAncestor = function (child, ancestor) {
        var commits = [];
        if (!this.isCommitAncestory(ancestor, child) && !this.equalCommits(child, ancestor)) {
            return [];
        }
        commits.push(child);
        var ancestors = this.commitAncestory(child);
        var ancestorIndex = ancestors.findIndex(function (a) { return a._id == ancestor._id; });
        var tillAncestor = ancestors.slice(0, ancestorIndex + 1);
        commits.push.apply(commits, tillAncestor);
        return commits;
    };
    Repo.prototype.commitHistoryTillAncestor = function (child, ancestor) {
        var changes = [];
        var ancestory = this.commitToAncestor(child, ancestor);
        changes.push.apply(changes, ancestory.slice(0, ancestory.length)
            .reduce(function (acc, commit) {
            return __spreadArray(__spreadArray([], acc), commit.changes);
        }, []));
        return changes;
    };
    Repo.prototype.isCommitAncestory = function (parent, child) {
        var childAncestory = this.commitAncestory(child);
        return !!childAncestory.find(function (a) { return a._id == parent._id; });
    };
    Repo.prototype.commitsLastCommonAncestor = function (first, second) {
        var firstHistorys = this.commitAncestory(first).reverse();
        var secondHistorys = this.commitAncestory(second).reverse();
        var last;
        if (first._id == second._id)
            last = first;
        else if (this.isCommitAncestory(first, second))
            last = first;
        else if (this.isCommitAncestory(second, first))
            last = second;
        else {
            for (var a in firstHistorys) {
                for (var b in secondHistorys) {
                    if (firstHistorys[a] === secondHistorys[b])
                        last = firstHistorys[a];
                    if (last)
                        break;
                }
                if (last)
                    break;
            }
        }
        return last;
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
                        return [4 /*yield*/, this.read()];
                    case 2:
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
                        branch = { name: name, time: new Date(), commit: this.head.commit, _id: (0,uuid__WEBPACK_IMPORTED_MODULE_5__.default)() };
                        this.branches.push(branch);
                        return [4 /*yield*/, this.database.update({ _id: this._id }, { branches: this.branches })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, branch];
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
            var currentBranch, incomingBranch, currentCommit, incomingCommit, lastCommitAncestor, reverts, changes, reverted, updated;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Check there are staged or commited changes
                        if (this.details.nChanges)
                            throw new Error("Unstaged Changes");
                        if (this.details.nStaged)
                            throw new Error("Uncommited Changes");
                        currentBranch = this.branches.find(function (b) { return b._id == _this.head.branch; });
                        incomingBranch = this.branches.find(function (b) { return b.name == name; });
                        // check if incoming branch is existing
                        if (!incomingBranch)
                            throw new Error("Unknown branch");
                        console.log("Checkout from " + currentBranch.name + " to " + incomingBranch.name);
                        currentCommit = this.commits.find(function (c) { return c._id == currentBranch.commit; });
                        incomingCommit = this.commits.find(function (c) { return c._id == incomingBranch.commit; });
                        lastCommitAncestor = this.commitsLastCommonAncestor(currentCommit, incomingCommit);
                        reverts = this.commitHistoryTillAncestor(currentCommit, lastCommitAncestor);
                        changes = this.commitHistoryTillAncestor(incomingCommit, lastCommitAncestor).reverse();
                        console.log({ reverts: reverts, changes: changes });
                        console.log("Rolling back " + reverts.length + " changes");
                        reverted = (0,_shared_rollback__WEBPACK_IMPORTED_MODULE_3__.rollback)(this.data, reverts);
                        console.log("Writing " + changes.length + " changes");
                        updated = (0,_shared_update__WEBPACK_IMPORTED_MODULE_4__.update)(reverted, changes);
                        this.head.branch = incomingBranch._id;
                        this.head.commit = incomingBranch.commit;
                        return [4 /*yield*/, this.database.update({ _id: this._id }, { head: this.head, data: updated })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.read()];
                    case 2:
                        _a.sent();
                        console.log("Checkout is successful");
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
    Repo.prototype.commit = function (message, history) {
        if (history === void 0) { history = [this.head.commit]; }
        return __awaiter(this, void 0, void 0, function () {
            var changes, _i, _a, s, commit;
            var _this = this;
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
                            _id: (0,uuid__WEBPACK_IMPORTED_MODULE_5__.default)(),
                            message: message, changes: changes, history: history,
                            time: new Date()
                        };
                        this.commits.push(commit);
                        this.head.commit = commit._id;
                        this.staged = [];
                        this.branches = this.branches.map(function (b) {
                            if (b._id == _this.head.branch) {
                                b.commit = _this.head.commit;
                            }
                            return b;
                        });
                        return [4 /*yield*/, this.database.update({ _id: this._id }, { commits: this.commits, staged: this.staged, head: this.head, branches: this.branches })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Repo.prototype.merge = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var currentBranch, incomingBranch, currentCommit, incomingCommit, lastCommitAncestor, changes;
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
                        lastCommitAncestor = this.commitsLastCommonAncestor(currentCommit, incomingCommit);
                        if (!!lastCommitAncestor) return [3 /*break*/, 1];
                        throw new Error("Branch is not related");
                    case 1:
                        if (!this.isCommitAncestory(incomingCommit, currentCommit)) return [3 /*break*/, 2];
                        throw new Error("Branch is behind in history");
                    case 2:
                        if (!this.equalCommits(incomingCommit, currentCommit)) return [3 /*break*/, 3];
                        console.log("Branch upto date, no merge done");
                        return [2 /*return*/];
                    case 3:
                        if (!this.isCommitAncestory(currentCommit, incomingCommit)) return [3 /*break*/, 5];
                        this.head.commit = incomingCommit._id;
                        if (currentBranch)
                            currentBranch.commit = this.head.commit;
                        return [4 /*yield*/, this.database.update({ _id: this._id }, { head: this.head, branches: this.branches })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 5:
                        changes = this.commitHistoryTillAncestor(incomingCommit, lastCommitAncestor).reverse();
                        console.log("Writing " + changes.length + " changes");
                        this.board = (0,_shared_update__WEBPACK_IMPORTED_MODULE_4__.update)(this.data, changes);
                        return [4 /*yield*/, this.save()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.stage()];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.commit(currentCommit.message + " & " + incomingCommit.message, [currentCommit._id, incomingCommit._id])];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [2 /*return*/];
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
    Repo.clone = function (repo, as) {
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
    ChangeTypes["MUTATED"] = "Mutated";
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
            lChanges.push({ path: __spreadArray(__spreadArray([], path), [i]), type: (options === null || options === void 0 ? void 0 : options.halphed) ? ChangeTypes.ADDED : ChangeTypes.REMOVED, before: before, after: after });
        }
        else if (typeof from[i] == "object") {
            lChanges.push.apply(lChanges, getChanges(from[i], look[i], { path: __spreadArray(__spreadArray([], path), [i]) }));
        }
        else if (from[i] !== look[i]) {
            lChanges.push({ path: __spreadArray(__spreadArray([], path), [i]), type: ChangeTypes.MUTATED, before: before, after: after });
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

/***/ "./src/shared/rollback.ts":
/*!********************************!*\
  !*** ./src/shared/rollback.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rollback": () => (/* binding */ rollback)
/* harmony export */ });
/* harmony import */ var _changes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./changes */ "./src/shared/changes.ts");

function rollback(current, changes) {
    var temp = JSON.parse(JSON.stringify(current));
    var data = function (block, at) {
        return block[at];
    };
    for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
        var c = changes_1[_i];
        var attr = temp;
        for (var i = 0; i < c.path.length; i++) {
            if (i == c.path.length - 1) {
                if (c.type == _changes__WEBPACK_IMPORTED_MODULE_0__.ChangeTypes.ADDED) {
                    delete attr[c.path[i]];
                }
                else {
                    attr[c.path[i]] = c.before;
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
        return [2 /*return*/];
    });
}); });

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC8uL3NyYy9sb2NhbC5zdG9yYWdlLnRzIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0Ly4vc3JjL3JlcG8uY2xhc3MudHMiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9zcmMvcmVwby5kYXRhYmFzZS50cyIsIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC8uL3NyYy9zaGFyZWQvY2hhbmdlcy50cyIsIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC8uL3NyYy9zaGFyZWQvcmV0cmlldmUudHMiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9zcmMvc2hhcmVkL3JvbGxiYWNrLnRzIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0Ly4vc3JjL3NoYXJlZC91cGRhdGUudHMiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDb0M7QUFFcEM7SUEyQkksaUJBQW1CLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztZQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQTdCRCxzQkFBWSw2QkFBUTthQUFwQjtZQUNJLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwwQkFBSzthQUFUO1lBQ0ksSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzlCLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7OztPQUFBO0lBRU8sMEJBQVEsR0FBaEIsVUFBaUIsS0FBa0I7UUFBbEIsZ0NBQVEsSUFBSSxDQUFDLEtBQUs7UUFDL0IsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRU8sMEJBQVEsR0FBaEI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLElBQUksS0FBSyxHQUF1QixFQUFFLENBQUM7UUFFbkMsSUFBSTtZQUNBLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQWMsQ0FBTyxDQUFDO1NBQzVDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDWixLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ2Q7UUFFRCxPQUFPLEtBQUssQ0FBQztJ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O1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05vQztBQUdwQyxJQUFNLElBQUksR0FBRyxJQUFJLDZDQUFJLENBQVMsUUFBUSxDQUFDLENBQUM7QUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFPLENBQUM7Ozs7S0FjbkIsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhbERvY3VtZW50IH0gZnJvbSBcIi4vbW9kZWxzL3F1ZXJ5Lm1vZGVsXCI7XHJcbmltcG9ydCB7IHY0IGFzIHV1aWRWNCB9IGZyb20gXCJ1dWlkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTG9jYWxEQjxUPntcclxuICAgIHByaXZhdGUgZ2V0IHJhd1ZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2YWx1ZSgpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRWYWx1ZSh2YWx1ZSA9IHRoaXMudmFsdWUpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLm5hbWUsIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRWYWx1ZSgpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMucmF3VmFsdWU7XHJcbiAgICAgICAgbGV0IHZhbHVlOiBMb2NhbERvY3VtZW50PFQ+W10gPSBbXTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKGRhdGEgYXMgc3RyaW5nKSBhcyBbXTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMudmFsdWUpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoW10pO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmQoZG9jPzogUGFydGlhbDxMb2NhbERvY3VtZW50PFQ+Pikge1xyXG4gICAgICAgIHJldHVybiBkb2NcclxuICAgICAgICAgICAgPyB0aGlzLnZhbHVlLmZpbHRlcih2ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBmbGFnOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayBpbiB2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChkb2MgYXMgYW55KVtrXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnID0gKHYgYXMgYW55KVtrXSA9PT0gKGRvYyBhcyBhbnkpW2tdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmbGFnKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZsYWc7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIDogdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kT25lKGRvYz86IFBhcnRpYWw8TG9jYWxEb2N1bWVudDxUPj4pIHtcclxuICAgICAgICByZXR1cm4gZG9jXHJcbiAgICAgICAgICAgID8gdGhpcy52YWx1ZS5maW5kKHYgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZsYWc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrIGluIHYpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGRvYyBhcyBhbnkpW2tdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgPSAodiBhcyBhbnkpW2tdID09PSAoZG9jIGFzIGFueSlba107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZsYWcpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmxhZztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgOiB0aGlzLnZhbHVlWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIGluc2VydChkb2NzOiBUW10pIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy52YWx1ZTtcclxuICAgICAgICBmb3IgKGxldCBkb2Mgb2YgZG9jcylcclxuICAgICAgICAgICAgZGF0YS5wdXNoKHsgLi4uZG9jLCBfaWQ6IHV1aWRWNCgpIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNldFZhbHVlKGRhdGEpO1xyXG5cclxuICAgICAgICByZXR1cm4gZG9jcyBhcyBMb2NhbERvY3VtZW50PFQ+W107XHJcbiAgICB9XHJcblxyXG4gICAgaW5zZXJ0T25lKGRvYzogVCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIGRhdGEucHVzaCh7IF9pZDogdXVpZFY0KCksIC4uLmRvYyB9KTtcclxuICAgICAgICB0aGlzLnNldFZhbHVlKGRhdGEpO1xyXG5cclxuICAgICAgICByZXR1cm4gZG9jIGFzIExvY2FsRG9jdW1lbnQ8VD47XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHBhcmFtOiBQYXJ0aWFsPExvY2FsRG9jdW1lbnQ8VD4+LCBkb2M6IFBhcnRpYWw8VD5bXSkge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5maW5kKHBhcmFtKSBhcyBMb2NhbERvY3VtZW50PFQ+W107XHJcbiAgICAgICAgbGV0IGRldGFpbCA9IHsgb2s6IGZhbHNlLCBuOiAwIH07XHJcbiAgICAgICAgaWYgKGZvdW5kKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm91bmQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogaW4gZG9jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKGZvdW5kW2ldIGFzIGFueSlbal0gPSAoZG9jIGFzIGFueSlbal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWUubWFwKHYgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm91bmQubWFwKGYgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2Ll9pZCA9PSBmLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsID0geyBvazogdHJ1ZSwgbjogZGV0YWlsLm4rKyB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICBkZXRhaWwgPSB7IG9rOiB0cnVlLCBuOiAxIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGV0YWlsO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZU9uZShwYXJhbTogUGFydGlhbDxMb2NhbERvY3VtZW50PFQ+PiwgZG9jOiBQYXJ0aWFsPFQ+KSB7ICAgICAgICBcclxuICAgICAgICBjb25zdCBmb3VuZCA9IHRoaXMuZmluZE9uZShwYXJhbSk7ICAgICAgICBcclxuICAgICAgICBsZXQgZGV0YWlsID0geyBvazogZmFsc2UsIG46IDAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgaWYgKGZvdW5kKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gZG9jKSB7XHJcbiAgICAgICAgICAgICAgICAoZm91bmQgYXMgYW55KVtpXSA9IChkb2MgYXMgYW55KVtpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZS5tYXAodiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodi5faWQgPT0gZm91bmQuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsID0geyBvazogdHJ1ZSwgbjogZGV0YWlsLm4rKyB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHYgPSBmb3VuZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgICAgICB9KTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGV0YWlsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZShwYXJhbTogUGFydGlhbDxMb2NhbERvY3VtZW50PFQ+Pikge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5maW5kKHBhcmFtKSBhcyBMb2NhbERvY3VtZW50PFQ+W107XHJcbiAgICAgICAgbGV0IGRldGFpbCA9IHsgb2s6IGZhbHNlLCBuOiAwIH07XHJcblxyXG4gICAgICAgIGlmIChmb3VuZCkge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlLmZpbHRlcih2ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBmbGFnOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZvdW5kLm1hcChmID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodi5faWQgPT0gZi5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsLm4rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmbGFnO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICBkZXRhaWwgPSB7IG9rOiB0cnVlLCBuOiAxIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGV0YWlsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZU9uZShwYXJhbTogUGFydGlhbDxMb2NhbERvY3VtZW50PFQ+Pikge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5maW5kT25lKHBhcmFtKTtcclxuICAgICAgICBsZXQgZGV0YWlsID0geyBvazogZmFsc2UsIG46IDAgfTtcclxuXHJcbiAgICAgICAgaWYgKGZvdW5kKSB7XHJcbiAgICAgICAgICAgIGRldGFpbC5vayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlLmZpbHRlcih2ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBmbGFnOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh2Ll9pZCA9PSBmb3VuZC5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWwubisrO1xyXG4gICAgICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmbGFnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGV0YWlsO1xyXG4gICAgfVxyXG5cclxuICAgIGRyb3AoKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5uYW1lLCAnbnVsbCcpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdjQgYXMgdXVpZFY0IH0gZnJvbSBcInV1aWRcIjtcclxuXHJcbmltcG9ydCB7IExvY2FsREIgfSBmcm9tIFwiLi9sb2NhbC5zdG9yYWdlXCI7XHJcbmltcG9ydCB7IEJyYW5jaCB9IGZyb20gXCIuL21vZGVscy9icmFuY2guaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENvbW1pdCwgQ29tbWl0Q2hhbmdlIH0gZnJvbSBcIi4vbW9kZWxzL2NvbW1pdC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBpbnNlcnRGdW5jdGlvbiwgcmVhZEZ1bmN0aW9uLCBSZXBvRGF0YWJhc2UsIHVwZGF0ZUZ1bmN0aW9uIH0gZnJvbSBcIi4vcmVwby5kYXRhYmFzZVwiO1xyXG5pbXBvcnQgeyBDaGFuZ2UsIENoYW5nZVR5cGVzLCBnZXRDaGFuZ2VzIH0gZnJvbSBcIi4vc2hhcmVkL2NoYW5nZXNcIjtcclxuaW1wb3J0IHsgcmV0cmlldmUgfSBmcm9tIFwiLi9zaGFyZWQvcmV0cmlldmVcIjtcclxuaW1wb3J0IHsgcm9sbGJhY2sgfSBmcm9tIFwiLi9zaGFyZWQvcm9sbGJhY2tcIjtcclxuaW1wb3J0IHsgdXBkYXRlIH0gZnJvbSBcIi4vc2hhcmVkL3VwZGF0ZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXBvSGVhZCB7XHJcbiAgICBjb21taXQ6IHN0cmluZztcclxuICAgIGJyYW5jaD86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVwbzxUID0gYW55PiB7XHJcbiAgICByZWFkb25seSBfaWQ6IHN0cmluZztcclxuICAgIHJlYWRvbmx5IGRhdGE6IFQ7XHJcbiAgICByZWFkb25seSBoZWFkOiBSZXBvSGVhZDtcclxuICAgIHJlYWRvbmx5IGJyYW5jaGVzOiBCcmFuY2hbXTtcclxuICAgIHJlYWRvbmx5IGNoYW5nZXM6IENoYW5nZVtdO1xyXG4gICAgcmVhZG9ubHkgc3RhZ2VkOiBDaGFuZ2VbXTtcclxuICAgIHJlYWRvbmx5IGNvbW1pdHM6IENvbW1pdFtdO1xyXG4gICAgcmVhZG9ubHkgbWVyZ2VkOiBzdHJpbmdbXTtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHJlYWRvbmx5IHRpbWU6IERhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXBvPFQ+IGltcGxlbWVudHMgSVJlcG88VD4ge1xyXG4gICAgcHJpdmF0ZSBjb250ZW50OiBJUmVwbzxUPjtcclxuXHJcbiAgICBjaGFuZ2VzOiBDaGFuZ2VbXSA9IFtdO1xyXG4gICAgY29tbWl0czogQ29tbWl0W10gPSBbXTtcclxuICAgIG1lcmdlZDogc3RyaW5nW10gPSBbXTtcclxuICAgIHN0YWdlZDogQ2hhbmdlW10gPSBbXTtcclxuICAgIGhlYWQ6IFJlcG9IZWFkID0geyBjb21taXQ6IHVuZGVmaW5lZCB9O1xyXG4gICAgYnJhbmNoZXM6IEJyYW5jaFtdID0gW107XHJcbiAgICB0aW1lOiBEYXRlID0gbmV3IERhdGUoKTtcclxuICAgIF9pZDogc3RyaW5nO1xyXG5cclxuICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xyXG4gICAgYm9hcmQ6IFQ7XHJcblxyXG4gICAgZ2V0IGRldGFpbHMoKSB7XHJcbiAgICAgICAgY29uc3QgYnJhbmNoID0gdGhpcy5icmFuY2hlcy5maW5kKGIgPT4gYi5faWQgPT0gdGhpcy5oZWFkLmJyYW5jaCk/Lm5hbWU7XHJcbiAgICAgICAgY29uc3QgbkJyYW5jaCA9IHRoaXMuYnJhbmNoZXMubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IG5DaGFuZ2VzID0gdGhpcy5jaGFuZ2VzLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBuU3RhZ2VkID0gdGhpcy5zdGFnZWQubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IGNvbW1pdCA9IHRoaXMuY29tbWl0cy5maW5kKGMgPT4gYy5faWQgPT0gdGhpcy5oZWFkLmNvbW1pdCk7XHJcbiAgICAgICAgY29uc3QgbkNvbW1pdHMgPSB0aGlzLmNvbW1pdEFuY2VzdG9yeShjb21taXQpLmxlbmd0aCArIDE7XHJcbiAgICAgICAgY29uc3QgaGVhZCA9IHRoaXMuaGVhZDtcclxuICAgICAgICByZXR1cm4geyBicmFuY2gsIG5CcmFuY2gsIG5DaGFuZ2VzLCBuU3RhZ2VkLCBjb21taXQsIG5Db21taXRzLCBoZWFkIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZyxcclxuICAgICAgICByZWFkb25seSBkYXRhOiBUID0gbnVsbCxcclxuICAgICAgICBwcml2YXRlIGRhdGFiYXNlOiBSZXBvRGF0YWJhc2U8VD4gPSB7IGluc2VydDogaW5zZXJ0RnVuY3Rpb24sIHJlYWQ6IHJlYWRGdW5jdGlvbiwgdXBkYXRlOiB1cGRhdGVGdW5jdGlvbiB9XHJcbiAgICApIHsgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICAvL0luaXRpYWxpemUgcmVwbyB3aXRoIGZpcnN0IGNvbW1pdCwgYnJhbmNoIGFuZCB0aGUgaGVhZCwgdGhlbiBjaGVja291dCB0aGUgYnJhbmNoIGFuZCBjb21taXRcclxuICAgICAgICB0aGlzLmNvbW1pdChcIkluaXRpYWwgQ29tbWl0XCIsIFtdKTtcclxuICAgICAgICBjb25zdCBicmFuY2ggPSBhd2FpdCB0aGlzLmNyZWF0ZUJyYW5jaChcIm1haW5cIik7XHJcbiAgICAgICAgdGhpcy5oZWFkLmJyYW5jaCA9IGJyYW5jaC5faWQ7XHJcblxyXG4gICAgICAgIC8vU2V0IHRoZSBpbml0aWFsIGNvbnRlbnRcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSB7XHJcbiAgICAgICAgICAgIF9pZDogdXVpZFY0KCksXHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgICAgY2hhbmdlczogdGhpcy5jaGFuZ2VzLFxyXG4gICAgICAgICAgICBjb21taXRzOiB0aGlzLmNvbW1pdHMsXHJcbiAgICAgICAgICAgIGJyYW5jaGVzOiB0aGlzLmJyYW5jaGVzLFxyXG4gICAgICAgICAgICBzdGFnZWQ6IHRoaXMuc3RhZ2VkLFxyXG4gICAgICAgICAgICBoZWFkOiB0aGlzLmhlYWQsXHJcbiAgICAgICAgICAgIHRpbWU6IHRoaXMudGltZSxcclxuICAgICAgICAgICAgbWVyZ2VkOiBbXSxcclxuICAgICAgICAgICAgZGF0YTogdGhpcy5kYXRhXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9DcmVhdGUgdGhlIHJlcG9cclxuICAgICAgICBhd2FpdCB0aGlzLmluc2VydCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgaW5zZXJ0KCkge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmRhdGFiYXNlLmluc2VydCh0aGlzLmNvbnRlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgcmVhZCgpIHtcclxuICAgICAgICAvLyBSZWFkIHRoZSBzdG9yZWQgY29udGVudFxyXG4gICAgICAgIHRoaXMuY29udGVudCA9IGF3YWl0IHRoaXMuZGF0YWJhc2UucmVhZCh7IG5hbWU6IHRoaXMubmFtZSB9KTtcclxuXHJcbiAgICAgICAgLy8gU2V0IHJlcG8gd2l0aCB0aGUgc3RvcmVkIGNvbnRlbnRcclxuICAgICAgICBpZiAodGhpcy5jb250ZW50KSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuY29udGVudCkubWFwKGsgPT4ge1xyXG4gICAgICAgICAgICAgICAgKHRoaXMgYXMgYW55KVtrXSA9ICh0aGlzLmNvbnRlbnQgYXMgYW55KVtrXTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb21taXRBbmNlc3RvcnkoY29tbWl0OiBDb21taXQpIHtcclxuICAgICAgICBsZXQgYW5jZXN0b3JzOiBDb21taXRbXSA9IFtdO1xyXG5cclxuICAgICAgICBjb25zdCBoaXN0b3J5ID0gY29tbWl0Lmhpc3Rvcnk7XHJcbiAgICAgICAgaWYgKGhpc3RvcnkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhpc3RvcnlDb21taXQgPSBoaXN0b3J5Lm1hcChoID0+IHRoaXMuY29tbWl0cy5maW5kKGMgPT4gYy5faWQgPT0gaCkpO1xyXG4gICAgICAgICAgICBoaXN0b3J5Q29tbWl0Lm1hcChoID0+IHRoaXMuY29tbWl0QW5jZXN0b3J5KGgpKVxyXG5cclxuICAgICAgICAgICAgYW5jZXN0b3JzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAuLi5oaXN0b3J5Q29tbWl0LFxyXG4gICAgICAgICAgICAgICAgLi4uaGlzdG9yeUNvbW1pdC5yZWR1Y2UoKGFjYzogQ29tbWl0W10sIGNvbW1pdDogQ29tbWl0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5hY2MsIC4uLnRoaXMuY29tbWl0QW5jZXN0b3J5KGNvbW1pdCldO1xyXG4gICAgICAgICAgICAgICAgfSwgW10pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbmNlc3RvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlcXVhbENvbW1pdHMoZmlyc3Q6IENvbW1pdCwgc2Vjb25kOiBDb21taXQpIHtcclxuICAgICAgICByZXR1cm4gZmlyc3QuX2lkID09IHNlY29uZC5faWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb21taXRUb0FuY2VzdG9yKGNoaWxkOiBDb21taXQsIGFuY2VzdG9yOiBDb21taXQpIHtcclxuICAgICAgICBjb25zdCBjb21taXRzOiBDb21taXRbXSA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNDb21taXRBbmNlc3RvcnkoYW5jZXN0b3IsIGNoaWxkKSAmJiAhdGhpcy5lcXVhbENvbW1pdHMoY2hpbGQsIGFuY2VzdG9yKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbW1pdHMucHVzaChjaGlsZCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGFuY2VzdG9ycyA9IHRoaXMuY29tbWl0QW5jZXN0b3J5KGNoaWxkKTtcclxuICAgICAgICBjb25zdCBhbmNlc3RvckluZGV4ID0gYW5jZXN0b3JzLmZpbmRJbmRleChhID0+IGEuX2lkID09IGFuY2VzdG9yLl9pZCk7XHJcbiAgICAgICAgY29uc3QgdGlsbEFuY2VzdG9yID0gYW5jZXN0b3JzLnNsaWNlKDAsIGFuY2VzdG9ySW5kZXggKyAxKTtcclxuXHJcbiAgICAgICAgY29tbWl0cy5wdXNoKC4uLnRpbGxBbmNlc3Rvcik7XHJcbiAgICAgICAgcmV0dXJuIGNvbW1pdHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb21taXRIaXN0b3J5VGlsbEFuY2VzdG9yKGNoaWxkOiBDb21taXQsIGFuY2VzdG9yOiBDb21taXQpIHtcclxuICAgICAgICBjb25zdCBjaGFuZ2VzOiBDb21taXRDaGFuZ2VbXSA9IFtdO1xyXG5cclxuICAgICAgICBjb25zdCBhbmNlc3RvcnkgPSB0aGlzLmNvbW1pdFRvQW5jZXN0b3IoY2hpbGQsIGFuY2VzdG9yKTtcclxuICAgICAgICBjaGFuZ2VzLnB1c2goXHJcbiAgICAgICAgICAgIC4uLmFuY2VzdG9yeS5zbGljZSgwLCBhbmNlc3RvcnkubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYWNjOiBDb21taXRDaGFuZ2VbXSwgY29tbWl0OiBDb21taXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWy4uLmFjYywgLi4uY29tbWl0LmNoYW5nZXNdO1xyXG4gICAgICAgICAgICAgICAgfSwgW10pXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNoYW5nZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0NvbW1pdEFuY2VzdG9yeShwYXJlbnQ6IENvbW1pdCwgY2hpbGQ6IENvbW1pdCkge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkQW5jZXN0b3J5ID0gdGhpcy5jb21taXRBbmNlc3RvcnkoY2hpbGQpO1xyXG4gICAgICAgIHJldHVybiAhIWNoaWxkQW5jZXN0b3J5LmZpbmQoYSA9PiBhLl9pZCA9PSBwYXJlbnQuX2lkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbW1pdHNMYXN0Q29tbW9uQW5jZXN0b3IoZmlyc3Q6IENvbW1pdCwgc2Vjb25kOiBDb21taXQpIHtcclxuICAgICAgICBjb25zdCBmaXJzdEhpc3RvcnlzID0gdGhpcy5jb21taXRBbmNlc3RvcnkoZmlyc3QpLnJldmVyc2UoKTtcclxuICAgICAgICBjb25zdCBzZWNvbmRIaXN0b3J5cyA9IHRoaXMuY29tbWl0QW5jZXN0b3J5KHNlY29uZCkucmV2ZXJzZSgpO1xyXG5cclxuICAgICAgICBsZXQgbGFzdDogQ29tbWl0O1xyXG4gICAgICAgIGlmIChmaXJzdC5faWQgPT0gc2Vjb25kLl9pZCkgbGFzdCA9IGZpcnN0O1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNDb21taXRBbmNlc3RvcnkoZmlyc3QsIHNlY29uZCkpIGxhc3QgPSBmaXJzdDtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzQ29tbWl0QW5jZXN0b3J5KHNlY29uZCwgZmlyc3QpKSBsYXN0ID0gc2Vjb25kO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGEgaW4gZmlyc3RIaXN0b3J5cykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBiIGluIHNlY29uZEhpc3RvcnlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0SGlzdG9yeXNbYV0gPT09IHNlY29uZEhpc3RvcnlzW2JdKSBsYXN0ID0gZmlyc3RIaXN0b3J5c1thXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdCkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdCkgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBsYXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG9ubG9hZChjYWxsYmFjayA9IChyZXBvOiBSZXBvPFQ+KSA9PiB7IH0pIHtcclxuICAgICAgICBhd2FpdCB0aGlzLnJlYWQoKTtcclxuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIHRoaXMuYm9hcmQgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSB8fCBudWxsKSk7XHJcblxyXG4gICAgICAgIGNhbGxiYWNrKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHNhdmUoKSB7XHJcbiAgICAgICAgY29uc3QgY2hhbmdlcyA9IGdldENoYW5nZXModGhpcy5kYXRhLCB0aGlzLmJvYXJkLCB7IGJpOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gY2hhbmdlcykge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZXMgPSB0aGlzLmNoYW5nZXMuZmlsdGVyKGMgPT4gSlNPTi5zdHJpbmdpZnkoYy5wYXRoKSAhPSBKU09OLnN0cmluZ2lmeShjaGFuZ2VzW2ldLnBhdGgpKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VzLnB1c2goY2hhbmdlc1tpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLmRhdGFiYXNlLnVwZGF0ZSh7IF9pZDogdGhpcy5faWQgfSwgeyBjaGFuZ2VzOiB0aGlzLmNoYW5nZXMsIGRhdGE6IHRoaXMuYm9hcmQgfSk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5yZWFkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY3JlYXRlQnJhbmNoKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5icmFuY2hlcy5maW5kKGIgPT4gYi5uYW1lID09IG5hbWUpO1xyXG4gICAgICAgIGlmIChmb3VuZCkgdGhyb3cgbmV3IEVycm9yKGBCcmFuY2ggd2l0aCBuYW1lICcke25hbWV9JyBhbHJlYWR5IGV4aXN0cyBpbiB0aGlzIHJlcG9gKTtcclxuXHJcbiAgICAgICAgY29uc3QgYnJhbmNoOiBCcmFuY2ggPSB7IG5hbWUsIHRpbWU6IG5ldyBEYXRlKCksIGNvbW1pdDogdGhpcy5oZWFkLmNvbW1pdCwgX2lkOiB1dWlkVjQoKSB9O1xyXG4gICAgICAgIHRoaXMuYnJhbmNoZXMucHVzaChicmFuY2gpO1xyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLmRhdGFiYXNlLnVwZGF0ZSh7IF9pZDogdGhpcy5faWQgfSwgeyBicmFuY2hlczogdGhpcy5icmFuY2hlcyB9KTtcclxuICAgICAgICByZXR1cm4gYnJhbmNoO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGRlbGV0ZUJyYW5jaChuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAobmFtZSA9PSAnbWFpbicpIHRocm93IG5ldyBFcnJvcihcIllvdSBjYW4gbm90IHJlbW92ZSB0aGUgTWFpbiBicmFuY2hcIik7XHJcblxyXG4gICAgICAgIHRoaXMuYnJhbmNoZXMgPSB0aGlzLmJyYW5jaGVzLmZpbHRlcihiID0+IGIubmFtZSAhPSBuYW1lKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmRhdGFiYXNlLnVwZGF0ZSh7IF9pZDogdGhpcy5faWQgfSwgeyBicmFuY2hlczogdGhpcy5icmFuY2hlcyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBicmFuY2hBbmRDaGVja291dChuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZUJyYW5jaChuYW1lKTtcclxuICAgICAgICB0aGlzLmNoZWNrb3V0KG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGNoZWNrb3V0KG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIC8vIENoZWNrIHRoZXJlIGFyZSBzdGFnZWQgb3IgY29tbWl0ZWQgY2hhbmdlc1xyXG4gICAgICAgIGlmICh0aGlzLmRldGFpbHMubkNoYW5nZXMpIHRocm93IG5ldyBFcnJvcihcIlVuc3RhZ2VkIENoYW5nZXNcIik7XHJcbiAgICAgICAgaWYgKHRoaXMuZGV0YWlscy5uU3RhZ2VkKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmNvbW1pdGVkIENoYW5nZXNcIik7XHJcblxyXG4gICAgICAgIC8vIGdldCBjdXJyZW50IGFuZCBpbmNvbWluZyBicmFuY2hlc1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRCcmFuY2ggPSB0aGlzLmJyYW5jaGVzLmZpbmQoYiA9PiBiLl9pZCA9PSB0aGlzLmhlYWQuYnJhbmNoKTtcclxuICAgICAgICBjb25zdCBpbmNvbWluZ0JyYW5jaCA9IHRoaXMuYnJhbmNoZXMuZmluZChiID0+IGIubmFtZSA9PSBuYW1lKTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgaW5jb21pbmcgYnJhbmNoIGlzIGV4aXN0aW5nXHJcbiAgICAgICAgaWYgKCFpbmNvbWluZ0JyYW5jaCkgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBicmFuY2hcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coYENoZWNrb3V0IGZyb20gJHtjdXJyZW50QnJhbmNoLm5hbWV9IHRvICR7aW5jb21pbmdCcmFuY2gubmFtZX1gKTtcclxuXHJcbiAgICAgICAgLy9nZXQgY3VycmVudCBjb21taXQgYW5kIGluY29taW5nIGNvbW1pdHNcclxuICAgICAgICBjb25zdCBjdXJyZW50Q29tbWl0ID0gdGhpcy5jb21taXRzLmZpbmQoYyA9PiBjLl9pZCA9PSBjdXJyZW50QnJhbmNoLmNvbW1pdCk7XHJcbiAgICAgICAgY29uc3QgaW5jb21pbmdDb21taXQgPSB0aGlzLmNvbW1pdHMuZmluZChjID0+IGMuX2lkID09IGluY29taW5nQnJhbmNoLmNvbW1pdCk7XHJcblxyXG4gICAgICAgIC8vIGdldCBsYXN0IGNvbW1pdHMgYW5jZXN0b3JcclxuICAgICAgICBjb25zdCBsYXN0Q29tbWl0QW5jZXN0b3IgPSB0aGlzLmNvbW1pdHNMYXN0Q29tbW9uQW5jZXN0b3IoY3VycmVudENvbW1pdCwgaW5jb21pbmdDb21taXQpO1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh7Y3VycmVudENvbW1pdCwgaW5jb21pbmdDb21taXQsIGxhc3RDb21taXRBbmNlc3Rvcn0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGdldCB0aGUgY2hhbmdlcyB0byByZXZlcnQgYW5kIHRvIHdyaXRlXHJcbiAgICAgICAgY29uc3QgcmV2ZXJ0cyA9IHRoaXMuY29tbWl0SGlzdG9yeVRpbGxBbmNlc3RvcihjdXJyZW50Q29tbWl0LCBsYXN0Q29tbWl0QW5jZXN0b3IpO1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLmNvbW1pdEhpc3RvcnlUaWxsQW5jZXN0b3IoaW5jb21pbmdDb21taXQsIGxhc3RDb21taXRBbmNlc3RvcikucmV2ZXJzZSgpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh7cmV2ZXJ0cywgY2hhbmdlc30pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKGBSb2xsaW5nIGJhY2sgJHtyZXZlcnRzLmxlbmd0aH0gY2hhbmdlc2ApO1xyXG4gICAgICAgIGNvbnN0IHJldmVydGVkID0gcm9sbGJhY2sodGhpcy5kYXRhLCByZXZlcnRzKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coYFdyaXRpbmcgJHtjaGFuZ2VzLmxlbmd0aH0gY2hhbmdlc2ApO1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB1cGRhdGUocmV2ZXJ0ZWQsIGNoYW5nZXMpO1xyXG5cclxuICAgICAgICB0aGlzLmhlYWQuYnJhbmNoID0gaW5jb21pbmdCcmFuY2guX2lkO1xyXG4gICAgICAgIHRoaXMuaGVhZC5jb21taXQgPSBpbmNvbWluZ0JyYW5jaC5jb21taXQ7XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMuZGF0YWJhc2UudXBkYXRlKHsgX2lkOiB0aGlzLl9pZCB9LCB7IGhlYWQ6IHRoaXMuaGVhZCwgZGF0YTogdXBkYXRlZCB9KTtcclxuICAgICAgICBhd2FpdCB0aGlzLnJlYWQoKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDaGVja291dCBpcyBzdWNjZXNzZnVsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHN0YWdlKHBhdGhzPzogc3RyaW5nW11bXSkge1xyXG4gICAgICAgIC8vIEVhY2ggZGlyIGlzIGEgc3RyaW5nXHJcbiAgICAgICAgLy8gRWFjaCBwYXRoIGlzIGEgbGlzdCBvZiBzdHJpbmcgb3IgYSBzaW5nbGUgc3RyaW5nKGRpcilcclxuICAgICAgICAvLyBUaGVyZSBmb3IgcGF0aHMgaXMgYSBsaXN0IG9mIHN0cmluZ3Mgb3IgYSBsaXN0IG9mIGxpc3Qgb2Ygc3RyaW5nc1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuY2hhbmdlcy5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHBhdGhzKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgcGF0aCBvZiBwYXRocykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hhbmdlID0gdGhpcy5jaGFuZ2VzLmZpbmQoYyA9PiBKU09OLnN0cmluZ2lmeShjLnBhdGgpID09IEpTT04uc3RyaW5naWZ5KHBhdGgpKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZXMgPSB0aGlzLmNoYW5nZXMuZmlsdGVyKGMgPT4gSlNPTi5zdHJpbmdpZnkoYy5wYXRoKSAhPSBKU09OLnN0cmluZ2lmeShjaGFuZ2UucGF0aCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2VkID0gdGhpcy5zdGFnZWQuZmlsdGVyKGMgPT4gSlNPTi5zdHJpbmdpZnkoYy5wYXRoKSAhPSBKU09OLnN0cmluZ2lmeShjaGFuZ2UucGF0aCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2VkLnB1c2goY2hhbmdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgdGhpcy5jaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZXMgPSB0aGlzLmNoYW5nZXMuZmlsdGVyKGMgPT4gSlNPTi5zdHJpbmdpZnkoYy5wYXRoKSAhPSBKU09OLnN0cmluZ2lmeShjaGFuZ2UucGF0aCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZWQgPSB0aGlzLnN0YWdlZC5maWx0ZXIoYyA9PiBKU09OLnN0cmluZ2lmeShjLnBhdGgpICE9IEpTT04uc3RyaW5naWZ5KGNoYW5nZS5wYXRoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlZC5wdXNoKGNoYW5nZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMuZGF0YWJhc2UudXBkYXRlKHsgX2lkOiB0aGlzLl9pZCB9LCB7IHN0YWdlZDogdGhpcy5zdGFnZWQsIGNoYW5nZXM6IHRoaXMuY2hhbmdlcyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBjb21taXQobWVzc2FnZTogc3RyaW5nLCBoaXN0b3J5OiBzdHJpbmdbXSA9IFt0aGlzLmhlYWQuY29tbWl0XSkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGFnZWQubGVuZ3RoICYmIHRoaXMuaW5pdGlhbGl6ZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZXM6IENvbW1pdENoYW5nZVtdID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc3RhZ2VkKSB7XHJcbiAgICAgICAgICAgIGNoYW5nZXMucHVzaCh7IC4uLnMsIHZhbHVlOiByZXRyaWV2ZSh0aGlzLmJvYXJkLCBzLnBhdGgpIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjb21taXQ6IENvbW1pdCA9IHtcclxuICAgICAgICAgICAgX2lkOiB1dWlkVjQoKSwgbWVzc2FnZSwgY2hhbmdlcywgaGlzdG9yeSwgdGltZTogbmV3IERhdGUoKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY29tbWl0cy5wdXNoKGNvbW1pdCk7XHJcbiAgICAgICAgdGhpcy5oZWFkLmNvbW1pdCA9IGNvbW1pdC5faWQ7XHJcbiAgICAgICAgdGhpcy5zdGFnZWQgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5icmFuY2hlcyA9IHRoaXMuYnJhbmNoZXMubWFwKGIgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYi5faWQgPT0gdGhpcy5oZWFkLmJyYW5jaCkge1xyXG4gICAgICAgICAgICAgICAgYi5jb21taXQgPSB0aGlzLmhlYWQuY29tbWl0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYjtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5kYXRhYmFzZS51cGRhdGUoeyBfaWQ6IHRoaXMuX2lkIH0sIHsgY29tbWl0czogdGhpcy5jb21taXRzLCBzdGFnZWQ6IHRoaXMuc3RhZ2VkLCBoZWFkOiB0aGlzLmhlYWQsIGJyYW5jaGVzOiB0aGlzLmJyYW5jaGVzIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG1lcmdlKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRCcmFuY2ggPSB0aGlzLmJyYW5jaGVzLmZpbmQoYiA9PiBiLl9pZCA9PSB0aGlzLmhlYWQuYnJhbmNoKTtcclxuICAgICAgICBjb25zdCBpbmNvbWluZ0JyYW5jaCA9IHRoaXMuYnJhbmNoZXMuZmluZChiID0+IGIubmFtZSA9PSBuYW1lKTtcclxuICAgICAgICBpZiAoIWluY29taW5nQnJhbmNoKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGJyYW5jaFwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgY3VycmVudENvbW1pdCA9IHRoaXMuY29tbWl0cy5maW5kKGMgPT4gYy5faWQgPT0gdGhpcy5oZWFkLmNvbW1pdCk7XHJcbiAgICAgICAgY29uc3QgaW5jb21pbmdDb21taXQgPSB0aGlzLmNvbW1pdHMuZmluZChjID0+IGMuX2lkID09IGluY29taW5nQnJhbmNoLmNvbW1pdCk7XHJcbiAgICAgICAgY29uc3QgbGFzdENvbW1pdEFuY2VzdG9yID0gdGhpcy5jb21taXRzTGFzdENvbW1vbkFuY2VzdG9yKGN1cnJlbnRDb21taXQsIGluY29taW5nQ29tbWl0KVxyXG5cclxuICAgICAgICBpZiAoIWxhc3RDb21taXRBbmNlc3Rvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCcmFuY2ggaXMgbm90IHJlbGF0ZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNDb21taXRBbmNlc3RvcnkoaW5jb21pbmdDb21taXQsIGN1cnJlbnRDb21taXQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJyYW5jaCBpcyBiZWhpbmQgaW4gaGlzdG9yeVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5lcXVhbENvbW1pdHMoaW5jb21pbmdDb21taXQsIGN1cnJlbnRDb21taXQpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQnJhbmNoIHVwdG8gZGF0ZSwgbm8gbWVyZ2UgZG9uZVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzQ29tbWl0QW5jZXN0b3J5KGN1cnJlbnRDb21taXQsIGluY29taW5nQ29tbWl0KSkge1xyXG4gICAgICAgICAgICB0aGlzLmhlYWQuY29tbWl0ID0gaW5jb21pbmdDb21taXQuX2lkO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudEJyYW5jaCkgY3VycmVudEJyYW5jaC5jb21taXQgPSB0aGlzLmhlYWQuY29tbWl0O1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRhdGFiYXNlLnVwZGF0ZSh7IF9pZDogdGhpcy5faWQgfSwgeyBoZWFkOiB0aGlzLmhlYWQsIGJyYW5jaGVzOiB0aGlzLmJyYW5jaGVzIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBjaGFuZ2VzIHRvIHdyaXRlXHJcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLmNvbW1pdEhpc3RvcnlUaWxsQW5jZXN0b3IoaW5jb21pbmdDb21taXQsIGxhc3RDb21taXRBbmNlc3RvcikucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgV3JpdGluZyAke2NoYW5nZXMubGVuZ3RofSBjaGFuZ2VzYCk7XHJcbiAgICAgICAgICAgIHRoaXMuYm9hcmQgPSB1cGRhdGUodGhpcy5kYXRhLCBjaGFuZ2VzKTtcclxuXHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2F2ZSgpO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnN0YWdlKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY29tbWl0KGAke2N1cnJlbnRDb21taXQubWVzc2FnZX0gJiAke2luY29taW5nQ29tbWl0Lm1lc3NhZ2V9YCwgW2N1cnJlbnRDb21taXQuX2lkLCBpbmNvbWluZ0NvbW1pdC5faWRdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGlmZigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVzaCh0bzogc3RyaW5nLCBvcmlnaW46IHN0cmluZywgYnJhbmNoOiBzdHJpbmcpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVsbChmcm9tOiBzdHJpbmcpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdHVzKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBsb2coKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjbG9uZShyZXBvOiBSZXBvPGFueT4sIGFzOiBzdHJpbmcpIHtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBMb2NhbERCIH0gZnJvbSBcIi4vbG9jYWwuc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBMb2NhbERvY3VtZW50IH0gZnJvbSBcIi4vbW9kZWxzL3F1ZXJ5Lm1vZGVsXCI7XHJcbmltcG9ydCB7IElSZXBvIH0gZnJvbSBcIi4vcmVwby5jbGFzc1wiO1xyXG5cclxuY29uc3Qgc3RvcmFnZSA9IG5ldyBMb2NhbERCPElSZXBvPihcIlJlcG9zXCIpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlYWRGdW5jdGlvbiA9IGFzeW5jIChkYXRhOiBQYXJ0aWFsPExvY2FsRG9jdW1lbnQ8SVJlcG8+PikgPT4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IHN0b3JhZ2UuZmluZE9uZShkYXRhKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGluc2VydEZ1bmN0aW9uID0gYXN5bmMgKGRhdGE6IElSZXBvKSA9PiB7XHJcbiAgICByZXR1cm4gYXdhaXQgc3RvcmFnZS5pbnNlcnRPbmUoZGF0YSk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVGdW5jdGlvbiA9IGFzeW5jIChwYXJhbXM6IFBhcnRpYWw8TG9jYWxEb2N1bWVudDxJUmVwbz4+LCBkYXRhOiBQYXJ0aWFsPElSZXBvPikgPT4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IHN0b3JhZ2UudXBkYXRlT25lKHBhcmFtcywgZGF0YSk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVwb0RhdGFiYXNlPFQ+IHtcclxuICAgIGluc2VydDogKGRhdGE6IElSZXBvPFQ+KSA9PiBQcm9taXNlPExvY2FsRG9jdW1lbnQ8SVJlcG88VD4+PixcclxuICAgIHJlYWQ6IChkYXRhOiBQYXJ0aWFsPExvY2FsRG9jdW1lbnQ8SVJlcG8+PikgPT4gUHJvbWlzZTxJUmVwbzxUPj4sXHJcbiAgICB1cGRhdGU6IChwYXJhbXM6IFBhcnRpYWw8TG9jYWxEb2N1bWVudDxJUmVwbz4+LCBkYXRhOiBQYXJ0aWFsPElSZXBvPikgPT4gUHJvbWlzZTxhbnk+XHJcbn0iLCJleHBvcnQgZW51bSBDaGFuZ2VUeXBlcyB7XHJcbiAgICBSRU1PVkVEID0gXCJSZW1vdmVkXCIsXHJcbiAgICBNVVRBVEVEID0gXCJNdXRhdGVkXCIsXHJcbiAgICBBRERFRCA9IFwiQWRkZWRcIlxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZSB7XHJcbiAgICBwYXRoOiBhbnlbXTtcclxuICAgIHR5cGU6IENoYW5nZVR5cGVzO1xyXG4gICAgYmVmb3JlOiBhbnk7XHJcbiAgICBhZnRlcjogYW55O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhbmdlcyhmcm9tOiBhbnksIGxvb2s6IGFueSwgb3B0aW9ucz86IHsgcGF0aD86IHN0cmluZ1tdLCBiaT86IGJvb2xlYW4sIGhhbHBoZWQ/OiBib29sZWFuIH0pIHtcclxuICAgIGNvbnN0IGxDaGFuZ2VzOiBDaGFuZ2VbXSA9IFtdO1xyXG4gICAgY29uc3QgcGF0aCA9IG9wdGlvbnM/LnBhdGggfHwgW107XHJcblxyXG4gICAgZnJvbSA9IGZyb20gfHwge307XHJcbiAgICBsb29rID0gbG9vayB8fCB7fTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGkgaW4gZnJvbSkge1xyXG4gICAgICAgIGNvbnN0IGFmdGVyID0gKG9wdGlvbnM/LmhhbHBoZWQpID8gZnJvbVtpXSA6IGxvb2tbaV07XHJcbiAgICAgICAgY29uc3QgYmVmb3JlID0gKG9wdGlvbnM/LmhhbHBoZWQpID8gbG9va1tpXSA6IGZyb21baV07XHJcblxyXG4gICAgICAgIGlmICghbG9vaz8uaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgICAgICAgbENoYW5nZXMucHVzaCh7IHBhdGg6IFsuLi5wYXRoLCBpXSwgdHlwZTogKG9wdGlvbnM/LmhhbHBoZWQpID8gQ2hhbmdlVHlwZXMuQURERUQgOiBDaGFuZ2VUeXBlcy5SRU1PVkVELCBiZWZvcmUsIGFmdGVyIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgZnJvbVtpXSA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIGxDaGFuZ2VzLnB1c2goLi4uZ2V0Q2hhbmdlcyhmcm9tW2ldLCBsb29rW2ldLCB7IHBhdGg6IFsuLi5wYXRoLCBpXSB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGZyb21baV0gIT09IGxvb2tbaV0pIHtcclxuICAgICAgICAgICAgbENoYW5nZXMucHVzaCh7IHBhdGg6IFsuLi5wYXRoLCBpXSwgdHlwZTogQ2hhbmdlVHlwZXMuTVVUQVRFRCwgYmVmb3JlLCBhZnRlciB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnM/LmJpKSB7XHJcbiAgICAgICAgY29uc3QgckNoYW5nZXMgPSBnZXRDaGFuZ2VzKGxvb2ssIGZyb20sIHsgaGFscGhlZDogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCByQyBvZiByQ2hhbmdlcykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja2VkID0gbENoYW5nZXMuZmluZChjID0+IEpTT04uc3RyaW5naWZ5KGMucGF0aCkgPT0gSlNPTi5zdHJpbmdpZnkockMucGF0aCkpO1xyXG4gICAgICAgICAgICBpZiAoIWNoZWNrZWQpIGxDaGFuZ2VzLnB1c2gockMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBsQ2hhbmdlcztcclxufSIsImV4cG9ydCBmdW5jdGlvbiByZXRyaWV2ZShjb2xsZWN0aW9uOiBhbnksIHBhdGg6IHN0cmluZ1tdKSB7XHJcbiAgICAvL3JldHJpZXZlIGRhdGEgZnJvbSBhbiBvYmplY3RcclxuICAgIGNvbnN0IGRhdGEgPSAoYmxvY2s6IGFueSwgYXQ6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBibG9ja1thdF07XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHZhbHVlO1xyXG5cclxuICAgIGZvciAobGV0IGkgaW4gcGF0aCkge1xyXG4gICAgICAgIGlmIChpID09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgIC8vc2V0IHRoZSB2YWx1ZSBvbiBmaXJzdCBkaXJcclxuICAgICAgICAgICAgdmFsdWUgPSBkYXRhKGNvbGxlY3Rpb24sIHBhdGhbaV0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGRhdGEodmFsdWUsIHBhdGhbaV0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2YWx1ZTtcclxufSIsImltcG9ydCB7IENoYW5nZSwgQ2hhbmdlVHlwZXMgfSBmcm9tIFwiLi9jaGFuZ2VzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcm9sbGJhY2soY3VycmVudDogYW55LCBjaGFuZ2VzOiBDaGFuZ2VbXSkge1xyXG4gICAgY29uc3QgdGVtcCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY3VycmVudCkpO1xyXG5cclxuICAgIGNvbnN0IGRhdGEgPSAoYmxvY2s6IGFueSwgYXQ6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBibG9ja1thdF07XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgYyBvZiBjaGFuZ2VzKSB7XHJcbiAgICAgICAgbGV0IGF0dHIgPSB0ZW1wO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGMucGF0aC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA9PSBjLnBhdGgubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGMudHlwZSA9PSBDaGFuZ2VUeXBlcy5BRERFRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhdHRyW2MucGF0aFtpXV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJbYy5wYXRoW2ldXSA9IGMuYmVmb3JlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXR0ciA9IGRhdGEoYXR0ciwgYy5wYXRoW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGVtcDtcclxufSIsImltcG9ydCB7IENoYW5nZSwgQ2hhbmdlVHlwZXMgfSBmcm9tIFwiLi9jaGFuZ2VzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlKGN1cnJlbnQ6IGFueSwgY2hhbmdlczogQ2hhbmdlW10pIHtcclxuICAgIGNvbnN0IHRlbXAgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGN1cnJlbnQpKTtcclxuXHJcbiAgICBjb25zdCBkYXRhID0gKGJsb2NrOiBhbnksIGF0OiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4gYmxvY2tbYXRdO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGMgb2YgY2hhbmdlcykge1xyXG4gICAgICAgIGxldCBhdHRyID0gdGVtcDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjLnBhdGgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgPT0gYy5wYXRoLmxlbmd0aCAtIDEpIHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoYy50eXBlID09IENoYW5nZVR5cGVzLlJFTU9WRUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXR0cltjLnBhdGhbaV1dXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJbYy5wYXRoW2ldXSA9IGMuYWZ0ZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhdHRyID0gZGF0YShhdHRyLCBjLnBhdGhbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0ZW1wO1xyXG59IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxudmFyIGdldFJhbmRvbVZhbHVlcztcbnZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLiBBbHNvLFxuICAgIC8vIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byAobXNDcnlwdG8pIG9uIElFMTEuXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSB8fCB0eXBlb2YgbXNDcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxudmFyIGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSkpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyKSB7XG4gIHZhciBvZmZzZXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICB2YXIgdXVpZCA9IChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJpbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCBzdHJpbmdpZnkgZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gc3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFJlcG8gfSBmcm9tIFwiLi9yZXBvLmNsYXNzXCI7XHJcbmltcG9ydCB7IFNhbXBsZSB9IGZyb20gXCIuL21vZGVscy9zYW1wbGVcIjtcclxuXHJcbmNvbnN0IHJlcG8gPSBuZXcgUmVwbzxTYW1wbGU+KFwiU2FtcGxlXCIpO1xyXG5yZXBvLm9ubG9hZChhc3luYyAocikgPT4ge1xyXG4gICAgLy8gYXdhaXQgcmVwby5icmFuY2hBbmRDaGVja291dChcImFub3RoZXJcIik7XHJcbiAgICAvLyBhd2FpdCByZXBvLmNoZWNrb3V0KFwibWFpblwiKVxyXG5cclxuICAgIC8vIGNvbnN0IGEgPSB7IG5hbWU6IFwiTG9yZW0gaXBzdW0gd2hhdCBldmVyIGl0IHNheXNcIiwgYWdlOiA2Nzg4OTkgfTtcclxuICAgIC8vIGNvbnN0IGIgPSB7IG5hbWU6IFwiTG9uZSBNYW5cIiwgYWdlOiA4OSB9O1xyXG5cclxuICAgIC8vIHJlcG8uYm9hcmQgPSBhO1xyXG4gICAgLy8gcmVwby5zYXZlKCk7XHJcbiAgICAvLyByZXBvLnN0YWdlKCk7XHJcbiAgICAvLyByZXBvLmNvbW1pdChcIlRoaXJkIG1haW4gQ29tbWl0XCIpO1xyXG4gICAgLy8gY29uc29sZS5sb2coci5kZXRhaWxzLCByLmJvYXJkKTsgICAgXHJcbiAgICAvLyBjb25zb2xlLmxvZyhyZXBvKTtcclxuXHJcbn0pXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=