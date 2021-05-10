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
        var historys = [];
        var history = commit.history;
        if (history.length) {
            var parentCommit = this.commits.reverse().find(function (c) {
                return history.includes(c._id);
            });
            if (parentCommit)
                historys = __spreadArray([parentCommit], this.commitAncestory(parentCommit));
        }
        return historys;
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
        changes.push.apply(changes, ancestory.slice(0, ancestory.length - 1)
            .reduce(function (acc, commit) {
            return __spreadArray(__spreadArray([], acc), commit.changes);
        }, []));
        return changes;
    };
    Repo.prototype.isCommitAncestory = function (parent, child) {
        var childHistorys = this.commitAncestory(child);
        return !!childHistorys.find(function (a) { return a._id == parent._id; });
    };
    Repo.prototype.commitsLastCommonAncestor = function (first, second) {
        var firstHistorys = this.commitAncestory(first);
        var secondHistorys = this.commitAncestory(second);
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
                        if (!this.isCommitAncestory(currentCommit, incomingCommit)) return [3 /*break*/, 2];
                        this.head.commit = incomingCommit._id;
                        if (currentBranch)
                            currentBranch.commit = this.head.commit;
                        return [4 /*yield*/, this.database.update({ _id: this._id }, { head: this.head, branches: this.branches })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        if (this.isCommitAncestory(incomingCommit, currentCommit)) {
                            throw new Error("Branch is behind");
                        }
                        else if (!this.commitsLastCommonAncestor(currentCommit, incomingCommit)) {
                            throw new Error("Branch is not related");
                        }
                        else {
                            (0,_shared_update__WEBPACK_IMPORTED_MODULE_4__.update)(this.board, incomingCommit.changes);
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
                if (c.type == _changes__WEBPACK_IMPORTED_MODULE_0__.ChangeTypes.ADDED) {
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
    var a, b;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // await repo.branchAndCheckout("another");
            return [4 /*yield*/, repo.checkout("another")];
            case 1:
                // await repo.branchAndCheckout("another");
                _a.sent();
                a = { name: "Lone Napy", age: 26, data: [1, 3, 4], time: new Date() };
                b = { name: "Lone Man", age: 89 };
                // repo.board = b;
                // repo.save();
                // repo.stage();
                // repo.commit("Second main Commit");
                // // console.log(r.details, r.board);    
                console.log(repo);
                return [2 /*return*/];
        }
    });
}); });
// // const c = changes(a, b);
// // const d = update(a, b, c);
// // console.log({c, d});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC8uL3NyYy9sb2NhbC5zdG9yYWdlLnRzIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0Ly4vc3JjL3JlcG8uY2xhc3MudHMiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9zcmMvcmVwby5kYXRhYmFzZS50cyIsIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC8uL3NyYy9zaGFyZWQvY2hhbmdlcy50cyIsIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC8uL3NyYy9zaGFyZWQvcmV0cmlldmUudHMiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9zcmMvc2hhcmVkL3JvbGxiYWNrLnRzIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0Ly4vc3JjL3NoYXJlZC91cGRhdGUudHMiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJfdHlwZXNjcmlwdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYl90eXBlc2NyaXB0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2ViX3R5cGVzY3JpcHQvLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDb0M7QUFFcEM7SUEyQkksaUJBQW1CLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztZQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQTdCRCxzQkFBWSw2QkFBUTthQUFwQjtZQUNJLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwwQkFBSzthQUFUO1lBQ0ksSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzlCLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7OztPQUFBO0lBRU8sMEJBQVEsR0FBaEIsVUFBaUIsS0FBa0I7UUFBbEIsZ0NBQVEsSUFBSSxDQUFDLEtBQUs7UUFDL0IsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRU8sMEJBQVEsR0FBaEI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLElBQUksS0FBSyxHQUF1QixFQUFFLENBQUM7UUFFbkMsSUFBSTtZQUNBLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQWMsQ0FBTyxDQUFDO1NBQzVDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDWixLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ2Q7UUFFRCxPQUFPLEtBQUssQ0FBQztJ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SSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBRXhDLGtCQUFrQjtnQkFDbEIsZUFBZTtnQkFDZixnQkFBZ0I7Z0JBQ2hCLHFDQUFxQztnQkFDckMsMENBQTBDO2dCQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7O0tBRXJCLENBQUM7QUFHRiw4QkFBOEI7QUFFOUIsZ0NBQWdDO0FBRWhDLDBCQUEwQiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhbERvY3VtZW50IH0gZnJvbSBcIi4vbW9kZWxzL3F1ZXJ5Lm1vZGVsXCI7XHJcbmltcG9ydCB7IHY0IGFzIHV1aWRWNCB9IGZyb20gXCJ1dWlkXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTG9jYWxEQjxUPntcclxuICAgIHByaXZhdGUgZ2V0IHJhd1ZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2YWx1ZSgpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRWYWx1ZSh2YWx1ZSA9IHRoaXMudmFsdWUpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLm5hbWUsIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRWYWx1ZSgpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMucmF3VmFsdWU7XHJcbiAgICAgICAgbGV0IHZhbHVlOiBMb2NhbERvY3VtZW50PFQ+W10gPSBbXTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKGRhdGEgYXMgc3RyaW5nKSBhcyBbXTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMudmFsdWUpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoW10pO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmQoZG9jPzogUGFydGlhbDxMb2NhbERvY3VtZW50PFQ+Pikge1xyXG4gICAgICAgIHJldHVybiBkb2NcclxuICAgICAgICAgICAgPyB0aGlzLnZhbHVlLmZpbHRlcih2ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBmbGFnOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayBpbiB2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChkb2MgYXMgYW55KVtrXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnID0gKHYgYXMgYW55KVtrXSA9PT0gKGRvYyBhcyBhbnkpW2tdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmbGFnKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZsYWc7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIDogdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kT25lKGRvYz86IFBhcnRpYWw8TG9jYWxEb2N1bWVudDxUPj4pIHtcclxuICAgICAgICByZXR1cm4gZG9jXHJcbiAgICAgICAgICAgID8gdGhpcy52YWx1ZS5maW5kKHYgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZsYWc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrIGluIHYpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGRvYyBhcyBhbnkpW2tdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgPSAodiBhcyBhbnkpW2tdID09PSAoZG9jIGFzIGFueSlba107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZsYWcpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmxhZztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgOiB0aGlzLnZhbHVlWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIGluc2VydChkb2NzOiBUW10pIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy52YWx1ZTtcclxuICAgICAgICBmb3IgKGxldCBkb2Mgb2YgZG9jcylcclxuICAgICAgICAgICAgZGF0YS5wdXNoKHsgLi4uZG9jLCBfaWQ6IHV1aWRWNCgpIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNldFZhbHVlKGRhdGEpO1xyXG5cclxuICAgICAgICByZXR1cm4gZG9jcyBhcyBMb2NhbERvY3VtZW50PFQ+W107XHJcbiAgICB9XHJcblxyXG4gICAgaW5zZXJ0T25lKGRvYzogVCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIGRhdGEucHVzaCh7IF9pZDogdXVpZFY0KCksIC4uLmRvYyB9KTtcclxuICAgICAgICB0aGlzLnNldFZhbHVlKGRhdGEpO1xyXG5cclxuICAgICAgICByZXR1cm4gZG9jIGFzIExvY2FsRG9jdW1lbnQ8VD47XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHBhcmFtOiBQYXJ0aWFsPExvY2FsRG9jdW1lbnQ8VD4+LCBkb2M6IFBhcnRpYWw8VD5bXSkge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5maW5kKHBhcmFtKSBhcyBMb2NhbERvY3VtZW50PFQ+W107XHJcbiAgICAgICAgbGV0IGRldGFpbCA9IHsgb2s6IGZhbHNlLCBuOiAwIH07XHJcbiAgICAgICAgaWYgKGZvdW5kKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm91bmQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogaW4gZG9jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKGZvdW5kW2ldIGFzIGFueSlbal0gPSAoZG9jIGFzIGFueSlbal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWUubWFwKHYgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm91bmQubWFwKGYgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2Ll9pZCA9PSBmLl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsID0geyBvazogdHJ1ZSwgbjogZGV0YWlsLm4rKyB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICBkZXRhaWwgPSB7IG9rOiB0cnVlLCBuOiAxIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGV0YWlsO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZU9uZShwYXJhbTogUGFydGlhbDxMb2NhbERvY3VtZW50PFQ+PiwgZG9jOiBQYXJ0aWFsPFQ+KSB7ICAgICAgICBcclxuICAgICAgICBjb25zdCBmb3VuZCA9IHRoaXMuZmluZE9uZShwYXJhbSk7ICAgICAgICBcclxuICAgICAgICBsZXQgZGV0YWlsID0geyBvazogZmFsc2UsIG46IDAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgaWYgKGZvdW5kKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gZG9jKSB7XHJcbiAgICAgICAgICAgICAgICAoZm91bmQgYXMgYW55KVtpXSA9IChkb2MgYXMgYW55KVtpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZS5tYXAodiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodi5faWQgPT0gZm91bmQuX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsID0geyBvazogdHJ1ZSwgbjogZGV0YWlsLm4rKyB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHYgPSBmb3VuZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgICAgICB9KTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGV0YWlsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZShwYXJhbTogUGFydGlhbDxMb2NhbERvY3VtZW50PFQ+Pikge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5maW5kKHBhcmFtKSBhcyBMb2NhbERvY3VtZW50PFQ+W107XHJcbiAgICAgICAgbGV0IGRldGFpbCA9IHsgb2s6IGZhbHNlLCBuOiAwIH07XHJcblxyXG4gICAgICAgIGlmIChmb3VuZCkge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlLmZpbHRlcih2ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBmbGFnOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZvdW5kLm1hcChmID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodi5faWQgPT0gZi5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsLm4rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmbGFnO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICBkZXRhaWwgPSB7IG9rOiB0cnVlLCBuOiAxIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGV0YWlsO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZU9uZShwYXJhbTogUGFydGlhbDxMb2NhbERvY3VtZW50PFQ+Pikge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kID0gdGhpcy5maW5kT25lKHBhcmFtKTtcclxuICAgICAgICBsZXQgZGV0YWlsID0geyBvazogZmFsc2UsIG46IDAgfTtcclxuXHJcbiAgICAgICAgaWYgKGZvdW5kKSB7XHJcbiAgICAgICAgICAgIGRldGFpbC5vayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlLmZpbHRlcih2ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBmbGFnOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh2Ll9pZCA9PSBmb3VuZC5faWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaWwubisrO1xyXG4gICAgICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmbGFnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGV0YWlsO1xyXG4gICAgfVxyXG5cclxuICAgIGRyb3AoKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5uYW1lLCAnbnVsbCcpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdjQgYXMgdXVpZFY0IH0gZnJvbSBcInV1aWRcIjtcclxuXHJcbmltcG9ydCB7IExvY2FsREIgfSBmcm9tIFwiLi9sb2NhbC5zdG9yYWdlXCI7XHJcbmltcG9ydCB7IEJyYW5jaCB9IGZyb20gXCIuL21vZGVscy9icmFuY2guaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IENvbW1pdCwgQ29tbWl0Q2hhbmdlIH0gZnJvbSBcIi4vbW9kZWxzL2NvbW1pdC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBpbnNlcnRGdW5jdGlvbiwgcmVhZEZ1bmN0aW9uLCBSZXBvRGF0YWJhc2UsIHVwZGF0ZUZ1bmN0aW9uIH0gZnJvbSBcIi4vcmVwby5kYXRhYmFzZVwiO1xyXG5pbXBvcnQgeyBDaGFuZ2UsIENoYW5nZVR5cGVzLCBnZXRDaGFuZ2VzIH0gZnJvbSBcIi4vc2hhcmVkL2NoYW5nZXNcIjtcclxuaW1wb3J0IHsgcmV0cmlldmUgfSBmcm9tIFwiLi9zaGFyZWQvcmV0cmlldmVcIjtcclxuaW1wb3J0IHsgcm9sbGJhY2sgfSBmcm9tIFwiLi9zaGFyZWQvcm9sbGJhY2tcIjtcclxuaW1wb3J0IHsgdXBkYXRlIH0gZnJvbSBcIi4vc2hhcmVkL3VwZGF0ZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXBvSGVhZCB7XHJcbiAgICBjb21taXQ6IHN0cmluZztcclxuICAgIGJyYW5jaD86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVwbzxUID0gYW55PiB7XHJcbiAgICByZWFkb25seSBfaWQ6IHN0cmluZztcclxuICAgIHJlYWRvbmx5IGRhdGE6IFQ7XHJcbiAgICByZWFkb25seSBoZWFkOiBSZXBvSGVhZDtcclxuICAgIHJlYWRvbmx5IGJyYW5jaGVzOiBCcmFuY2hbXTtcclxuICAgIHJlYWRvbmx5IGNoYW5nZXM6IENoYW5nZVtdO1xyXG4gICAgcmVhZG9ubHkgc3RhZ2VkOiBDaGFuZ2VbXTtcclxuICAgIHJlYWRvbmx5IGNvbW1pdHM6IENvbW1pdFtdO1xyXG4gICAgcmVhZG9ubHkgbWVyZ2VkOiBzdHJpbmdbXTtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHJlYWRvbmx5IHRpbWU6IERhdGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXBvPFQ+IGltcGxlbWVudHMgSVJlcG88VD4ge1xyXG4gICAgcHJpdmF0ZSBjb250ZW50OiBJUmVwbzxUPjtcclxuXHJcbiAgICBjaGFuZ2VzOiBDaGFuZ2VbXSA9IFtdO1xyXG4gICAgY29tbWl0czogQ29tbWl0W10gPSBbXTtcclxuICAgIG1lcmdlZDogc3RyaW5nW10gPSBbXTtcclxuICAgIHN0YWdlZDogQ2hhbmdlW10gPSBbXTtcclxuICAgIGhlYWQ6IFJlcG9IZWFkID0geyBjb21taXQ6IHVuZGVmaW5lZCB9O1xyXG4gICAgYnJhbmNoZXM6IEJyYW5jaFtdID0gW107XHJcbiAgICB0aW1lOiBEYXRlID0gbmV3IERhdGUoKTtcclxuICAgIF9pZDogc3RyaW5nO1xyXG5cclxuICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xyXG4gICAgYm9hcmQ6IFQ7XHJcblxyXG4gICAgZ2V0IGRldGFpbHMoKSB7XHJcbiAgICAgICAgY29uc3QgYnJhbmNoID0gdGhpcy5icmFuY2hlcy5maW5kKGIgPT4gYi5faWQgPT0gdGhpcy5oZWFkLmJyYW5jaCk/Lm5hbWU7XHJcbiAgICAgICAgY29uc3QgbkJyYW5jaCA9IHRoaXMuYnJhbmNoZXMubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IG5DaGFuZ2VzID0gdGhpcy5jaGFuZ2VzLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBuU3RhZ2VkID0gdGhpcy5zdGFnZWQubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IGNvbW1pdCA9IHRoaXMuY29tbWl0cy5maW5kKGMgPT4gYy5faWQgPT0gdGhpcy5oZWFkLmNvbW1pdCk7XHJcbiAgICAgICAgY29uc3QgbkNvbW1pdHMgPSB0aGlzLmNvbW1pdEFuY2VzdG9yeShjb21taXQpLmxlbmd0aCArIDE7XHJcbiAgICAgICAgY29uc3QgaGVhZCA9IHRoaXMuaGVhZDtcclxuICAgICAgICByZXR1cm4geyBicmFuY2gsIG5CcmFuY2gsIG5DaGFuZ2VzLCBuU3RhZ2VkLCBjb21taXQsIG5Db21taXRzLCBoZWFkIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZyxcclxuICAgICAgICByZWFkb25seSBkYXRhOiBUID0gbnVsbCxcclxuICAgICAgICBwcml2YXRlIGRhdGFiYXNlOiBSZXBvRGF0YWJhc2U8VD4gPSB7IGluc2VydDogaW5zZXJ0RnVuY3Rpb24sIHJlYWQ6IHJlYWRGdW5jdGlvbiwgdXBkYXRlOiB1cGRhdGVGdW5jdGlvbiB9XHJcbiAgICApIHsgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICAvL0luaXRpYWxpemUgcmVwbyB3aXRoIGZpcnN0IGNvbW1pdCwgYnJhbmNoIGFuZCB0aGUgaGVhZCwgdGhlbiBjaGVja291dCB0aGUgYnJhbmNoIGFuZCBjb21taXRcclxuICAgICAgICB0aGlzLmNvbW1pdChcIkluaXRpYWwgQ29tbWl0XCIsIFtdKTtcclxuICAgICAgICBjb25zdCBicmFuY2ggPSBhd2FpdCB0aGlzLmNyZWF0ZUJyYW5jaChcIm1haW5cIik7XHJcbiAgICAgICAgdGhpcy5oZWFkLmJyYW5jaCA9IGJyYW5jaC5faWQ7XHJcblxyXG4gICAgICAgICAgICAvL1NldCB0aGUgaW5pdGlhbCBjb250ZW50XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IHtcclxuICAgICAgICAgICAgICAgIF9pZDogdXVpZFY0KCksXHJcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VzOiB0aGlzLmNoYW5nZXMsXHJcbiAgICAgICAgICAgICAgICBjb21taXRzOiB0aGlzLmNvbW1pdHMsXHJcbiAgICAgICAgICAgICAgICBicmFuY2hlczogdGhpcy5icmFuY2hlcyxcclxuICAgICAgICAgICAgICAgIHN0YWdlZDogdGhpcy5zdGFnZWQsXHJcbiAgICAgICAgICAgICAgICBoZWFkOiB0aGlzLmhlYWQsXHJcbiAgICAgICAgICAgICAgICB0aW1lOiB0aGlzLnRpbWUsXHJcbiAgICAgICAgICAgICAgICBtZXJnZWQ6IFtdLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5kYXRhXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vQ3JlYXRlIHRoZSByZXBvXHJcbiAgICAgICAgYXdhaXQgdGhpcy5pbnNlcnQoKTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGluc2VydCgpIHtcclxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5kYXRhYmFzZS5pbnNlcnQodGhpcy5jb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlYWQoKSB7XHJcbiAgICAgICAgLy8gUmVhZCB0aGUgc3RvcmVkIGNvbnRlbnRcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSBhd2FpdCB0aGlzLmRhdGFiYXNlLnJlYWQoeyBuYW1lOiB0aGlzLm5hbWUgfSk7XHJcblxyXG4gICAgICAgIC8vIFNldCByZXBvIHdpdGggdGhlIHN0b3JlZCBjb250ZW50XHJcbiAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmNvbnRlbnQpLm1hcChrID0+IHtcclxuICAgICAgICAgICAgICAgICh0aGlzIGFzIGFueSlba10gPSAodGhpcy5jb250ZW50IGFzIGFueSlba107XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29tbWl0QW5jZXN0b3J5KGNvbW1pdDogQ29tbWl0KSB7XHJcbiAgICAgICAgbGV0IGhpc3RvcnlzOiBDb21taXRbXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHsgaGlzdG9yeSB9ID0gY29tbWl0O1xyXG5cclxuICAgICAgICBpZiAoaGlzdG9yeS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50Q29tbWl0ID0gdGhpcy5jb21taXRzLnJldmVyc2UoKS5maW5kKGMgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhpc3RvcnkuaW5jbHVkZXMoYy5faWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwYXJlbnRDb21taXQpIGhpc3RvcnlzID0gW3BhcmVudENvbW1pdCwgLi4udGhpcy5jb21taXRBbmNlc3RvcnkocGFyZW50Q29tbWl0KV1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBoaXN0b3J5cztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVxdWFsQ29tbWl0cyhmaXJzdDogQ29tbWl0LCBzZWNvbmQ6IENvbW1pdCkge1xyXG4gICAgICAgIHJldHVybiBmaXJzdC5faWQgPT0gc2Vjb25kLl9pZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbW1pdFRvQW5jZXN0b3IoY2hpbGQ6IENvbW1pdCwgYW5jZXN0b3I6IENvbW1pdCkge1xyXG4gICAgICAgIGNvbnN0IGNvbW1pdHM6IENvbW1pdFtdID0gW107XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc0NvbW1pdEFuY2VzdG9yeShhbmNlc3RvciwgY2hpbGQpICYmICF0aGlzLmVxdWFsQ29tbWl0cyhjaGlsZCwgYW5jZXN0b3IpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29tbWl0cy5wdXNoKGNoaWxkKTtcclxuXHJcbiAgICAgICAgY29uc3QgYW5jZXN0b3JzID0gdGhpcy5jb21taXRBbmNlc3RvcnkoY2hpbGQpO1xyXG4gICAgICAgIGNvbnN0IGFuY2VzdG9ySW5kZXggPSBhbmNlc3RvcnMuZmluZEluZGV4KGEgPT4gYS5faWQgPT0gYW5jZXN0b3IuX2lkKTtcclxuICAgICAgICBjb25zdCB0aWxsQW5jZXN0b3IgPSBhbmNlc3RvcnMuc2xpY2UoMCwgYW5jZXN0b3JJbmRleCArIDEpO1xyXG5cclxuICAgICAgICBjb21taXRzLnB1c2goLi4udGlsbEFuY2VzdG9yKTtcclxuICAgICAgICByZXR1cm4gY29tbWl0cztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbW1pdEhpc3RvcnlUaWxsQW5jZXN0b3IoY2hpbGQ6IENvbW1pdCwgYW5jZXN0b3I6IENvbW1pdCkge1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZXM6IENvbW1pdENoYW5nZVtdID0gW107XHJcblxyXG4gICAgICAgIGNvbnN0IGFuY2VzdG9yeSA9IHRoaXMuY29tbWl0VG9BbmNlc3RvcihjaGlsZCwgYW5jZXN0b3IpO1xyXG4gICAgICAgIGNoYW5nZXMucHVzaChcclxuICAgICAgICAgICAgLi4uYW5jZXN0b3J5LnNsaWNlKDAsIGFuY2VzdG9yeS5sZW5ndGggLSAxKVxyXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYWNjOiBDb21taXRDaGFuZ2VbXSwgY29tbWl0OiBDb21taXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWy4uLmFjYywgLi4uY29tbWl0LmNoYW5nZXNdO1xyXG4gICAgICAgICAgICAgICAgfSwgW10pXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNoYW5nZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc0NvbW1pdEFuY2VzdG9yeShwYXJlbnQ6IENvbW1pdCwgY2hpbGQ6IENvbW1pdCkge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkSGlzdG9yeXMgPSB0aGlzLmNvbW1pdEFuY2VzdG9yeShjaGlsZCk7XHJcbiAgICAgICAgcmV0dXJuICEhY2hpbGRIaXN0b3J5cy5maW5kKGEgPT4gYS5faWQgPT0gcGFyZW50Ll9pZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb21taXRzTGFzdENvbW1vbkFuY2VzdG9yKGZpcnN0OiBDb21taXQsIHNlY29uZDogQ29tbWl0KSB7XHJcbiAgICAgICAgY29uc3QgZmlyc3RIaXN0b3J5cyA9IHRoaXMuY29tbWl0QW5jZXN0b3J5KGZpcnN0KTtcclxuICAgICAgICBjb25zdCBzZWNvbmRIaXN0b3J5cyA9IHRoaXMuY29tbWl0QW5jZXN0b3J5KHNlY29uZCk7XHJcblxyXG4gICAgICAgIGxldCBsYXN0OiBDb21taXQ7XHJcbiAgICAgICAgaWYgKGZpcnN0Ll9pZCA9PSBzZWNvbmQuX2lkKSBsYXN0ID0gZmlyc3Q7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc0NvbW1pdEFuY2VzdG9yeShmaXJzdCwgc2Vjb25kKSkgbGFzdCA9IGZpcnN0O1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNDb21taXRBbmNlc3Rvcnkoc2Vjb25kLCBmaXJzdCkpIGxhc3QgPSBzZWNvbmQ7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgYSBpbiBmaXJzdEhpc3RvcnlzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGIgaW4gc2Vjb25kSGlzdG9yeXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3RIaXN0b3J5c1thXSA9PT0gc2Vjb25kSGlzdG9yeXNbYl0pIGxhc3QgPSBmaXJzdEhpc3RvcnlzW2FdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0KSBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsYXN0KSBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGxhc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgb25sb2FkKGNhbGxiYWNrID0gKHJlcG86IFJlcG88VD4pID0+IHsgfSkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMucmVhZCgpO1xyXG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkgYXdhaXQgdGhpcy5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgdGhpcy5ib2FyZCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhIHx8IG51bGwpKTtcclxuXHJcbiAgICAgICAgY2FsbGJhY2sodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgc2F2ZSgpIHtcclxuICAgICAgICBjb25zdCBjaGFuZ2VzID0gZ2V0Q2hhbmdlcyh0aGlzLmRhdGEsIHRoaXMuYm9hcmQsIHsgYmk6IHRydWUgfSk7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgaSBpbiBjaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlcyA9IHRoaXMuY2hhbmdlcy5maWx0ZXIoYyA9PiBKU09OLnN0cmluZ2lmeShjLnBhdGgpICE9IEpTT04uc3RyaW5naWZ5KGNoYW5nZXNbaV0ucGF0aCkpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZXMucHVzaChjaGFuZ2VzW2ldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMuZGF0YWJhc2UudXBkYXRlKHsgX2lkOiB0aGlzLl9pZCB9LCB7IGNoYW5nZXM6IHRoaXMuY2hhbmdlcywgZGF0YTogdGhpcy5ib2FyZCB9KTtcclxuICAgICAgICBhd2FpdCB0aGlzLnJlYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBjcmVhdGVCcmFuY2gobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgZm91bmQgPSB0aGlzLmJyYW5jaGVzLmZpbmQoYiA9PiBiLm5hbWUgPT0gbmFtZSk7XHJcbiAgICAgICAgaWYgKGZvdW5kKSB0aHJvdyBuZXcgRXJyb3IoYEJyYW5jaCB3aXRoIG5hbWUgJyR7bmFtZX0nIGFscmVhZHkgZXhpc3RzIGluIHRoaXMgcmVwb2ApO1xyXG5cclxuICAgICAgICBjb25zdCBicmFuY2g6IEJyYW5jaCA9IHsgbmFtZSwgdGltZTogbmV3IERhdGUoKSwgY29tbWl0OiB0aGlzLmhlYWQuY29tbWl0LCBfaWQ6IHV1aWRWNCgpIH07XHJcbiAgICAgICAgdGhpcy5icmFuY2hlcy5wdXNoKGJyYW5jaCk7XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMuZGF0YWJhc2UudXBkYXRlKHsgX2lkOiB0aGlzLl9pZCB9LCB7IGJyYW5jaGVzOiB0aGlzLmJyYW5jaGVzIH0pO1xyXG4gICAgICAgIHJldHVybiBicmFuY2g7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZGVsZXRlQnJhbmNoKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChuYW1lID09ICdtYWluJykgdGhyb3cgbmV3IEVycm9yKFwiWW91IGNhbiBub3QgcmVtb3ZlIHRoZSBNYWluIGJyYW5jaFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5icmFuY2hlcyA9IHRoaXMuYnJhbmNoZXMuZmlsdGVyKGIgPT4gYi5uYW1lICE9IG5hbWUpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZGF0YWJhc2UudXBkYXRlKHsgX2lkOiB0aGlzLl9pZCB9LCB7IGJyYW5jaGVzOiB0aGlzLmJyYW5jaGVzIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGJyYW5jaEFuZENoZWNrb3V0KG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlQnJhbmNoKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tvdXQobmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgY2hlY2tvdXQobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgdGhlcmUgYXJlIHN0YWdlZCBvciBjb21taXRlZCBjaGFuZ2VzXHJcbiAgICAgICAgaWYgKHRoaXMuZGV0YWlscy5uQ2hhbmdlcykgdGhyb3cgbmV3IEVycm9yKFwiVW5zdGFnZWQgQ2hhbmdlc1wiKTtcclxuICAgICAgICBpZiAodGhpcy5kZXRhaWxzLm5TdGFnZWQpIHRocm93IG5ldyBFcnJvcihcIlVuY29tbWl0ZWQgQ2hhbmdlc1wiKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IGN1cnJlbnQgYW5kIGluY29taW5nIGJyYW5jaGVzXHJcbiAgICAgICAgY29uc3QgY3VycmVudEJyYW5jaCA9IHRoaXMuYnJhbmNoZXMuZmluZChiID0+IGIuX2lkID09IHRoaXMuaGVhZC5icmFuY2gpO1xyXG4gICAgICAgIGNvbnN0IGluY29taW5nQnJhbmNoID0gdGhpcy5icmFuY2hlcy5maW5kKGIgPT4gYi5uYW1lID09IG5hbWUpO1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiBpbmNvbWluZyBicmFuY2ggaXMgZXhpc3RpbmdcclxuICAgICAgICBpZiAoIWluY29taW5nQnJhbmNoKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGJyYW5jaFwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgQ2hlY2tvdXQgZnJvbSAke2N1cnJlbnRCcmFuY2gubmFtZX0gdG8gJHtpbmNvbWluZ0JyYW5jaC5uYW1lfWApO1xyXG5cclxuICAgICAgICAvL2dldCBjdXJyZW50IGNvbW1pdCBhbmQgaW5jb21pbmcgY29tbWl0c1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb21taXQgPSB0aGlzLmNvbW1pdHMuZmluZChjID0+IGMuX2lkID09IGN1cnJlbnRCcmFuY2guY29tbWl0KTtcclxuICAgICAgICBjb25zdCBpbmNvbWluZ0NvbW1pdCA9IHRoaXMuY29tbWl0cy5maW5kKGMgPT4gYy5faWQgPT0gaW5jb21pbmdCcmFuY2guY29tbWl0KTsgICAgICAgIFxyXG5cclxuICAgICAgICAvLyBnZXQgbGFzdCBjb21taXRzIGFuY2VzdG9yXHJcbiAgICAgICAgY29uc3QgbGFzdENvbW1pdEFuY2VzdG9yID0gdGhpcy5jb21taXRzTGFzdENvbW1vbkFuY2VzdG9yKGN1cnJlbnRDb21taXQsIGluY29taW5nQ29tbWl0KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBnZXQgdGhlIGNoYW5nZXMgdG8gcmV2ZXJ0IGFuZCB0byB3cml0ZVxyXG4gICAgICAgIGNvbnN0IHJldmVydHMgPSB0aGlzLmNvbW1pdEhpc3RvcnlUaWxsQW5jZXN0b3IoY3VycmVudENvbW1pdCwgbGFzdENvbW1pdEFuY2VzdG9yKTtcclxuICAgICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5jb21taXRIaXN0b3J5VGlsbEFuY2VzdG9yKGluY29taW5nQ29tbWl0LCBsYXN0Q29tbWl0QW5jZXN0b3IpLnJldmVyc2UoKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coYFJvbGxpbmcgYmFjayAke3JldmVydHMubGVuZ3RofSBjaGFuZ2VzYCk7XHJcbiAgICAgICAgY29uc3QgcmV2ZXJ0ZWQgPSByb2xsYmFjayh0aGlzLmRhdGEsIHJldmVydHMpOyAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKGBXcml0aW5nICR7Y2hhbmdlcy5sZW5ndGh9IGNoYW5nZXNgKTtcclxuICAgICAgICBjb25zdCB1cGRhdGVkID0gdXBkYXRlKHJldmVydGVkLCBjaGFuZ2VzKTtcclxuXHJcbiAgICAgICAgdGhpcy5oZWFkLmJyYW5jaCA9IGluY29taW5nQnJhbmNoLl9pZDtcclxuICAgICAgICB0aGlzLmhlYWQuY29tbWl0ID0gaW5jb21pbmdCcmFuY2guY29tbWl0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGF3YWl0IHRoaXMuZGF0YWJhc2UudXBkYXRlKHsgX2lkOiB0aGlzLl9pZCB9LCB7IGhlYWQ6IHRoaXMuaGVhZCwgZGF0YTogdXBkYXRlZCB9KTtcclxuICAgICAgICBhd2FpdCB0aGlzLnJlYWQoKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDaGVja291dCBpcyBzdWNjZXNzZnVsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHN0YWdlKHBhdGhzPzogc3RyaW5nW11bXSkge1xyXG4gICAgICAgIC8vIEVhY2ggZGlyIGlzIGEgc3RyaW5nXHJcbiAgICAgICAgLy8gRWFjaCBwYXRoIGlzIGEgbGlzdCBvZiBzdHJpbmcgb3IgYSBzaW5nbGUgc3RyaW5nKGRpcilcclxuICAgICAgICAvLyBUaGVyZSBmb3IgcGF0aHMgaXMgYSBsaXN0IG9mIHN0cmluZ3Mgb3IgYSBsaXN0IG9mIGxpc3Qgb2Ygc3RyaW5nc1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuY2hhbmdlcy5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHBhdGhzKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgcGF0aCBvZiBwYXRocykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hhbmdlID0gdGhpcy5jaGFuZ2VzLmZpbmQoYyA9PiBKU09OLnN0cmluZ2lmeShjLnBhdGgpID09IEpTT04uc3RyaW5naWZ5KHBhdGgpKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZXMgPSB0aGlzLmNoYW5nZXMuZmlsdGVyKGMgPT4gSlNPTi5zdHJpbmdpZnkoYy5wYXRoKSAhPSBKU09OLnN0cmluZ2lmeShjaGFuZ2UucGF0aCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2VkID0gdGhpcy5zdGFnZWQuZmlsdGVyKGMgPT4gSlNPTi5zdHJpbmdpZnkoYy5wYXRoKSAhPSBKU09OLnN0cmluZ2lmeShjaGFuZ2UucGF0aCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2VkLnB1c2goY2hhbmdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBjaGFuZ2Ugb2YgdGhpcy5jaGFuZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZXMgPSB0aGlzLmNoYW5nZXMuZmlsdGVyKGMgPT4gSlNPTi5zdHJpbmdpZnkoYy5wYXRoKSAhPSBKU09OLnN0cmluZ2lmeShjaGFuZ2UucGF0aCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZWQgPSB0aGlzLnN0YWdlZC5maWx0ZXIoYyA9PiBKU09OLnN0cmluZ2lmeShjLnBhdGgpICE9IEpTT04uc3RyaW5naWZ5KGNoYW5nZS5wYXRoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlZC5wdXNoKGNoYW5nZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IHRoaXMuZGF0YWJhc2UudXBkYXRlKHsgX2lkOiB0aGlzLl9pZCB9LCB7IHN0YWdlZDogdGhpcy5zdGFnZWQsIGNoYW5nZXM6IHRoaXMuY2hhbmdlcyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBjb21taXQobWVzc2FnZTogc3RyaW5nLCBoaXN0b3J5OiBzdHJpbmdbXSA9IFt0aGlzLmhlYWQuY29tbWl0XSkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGFnZWQubGVuZ3RoICYmIHRoaXMuaW5pdGlhbGl6ZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZXM6IENvbW1pdENoYW5nZVtdID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc3RhZ2VkKSB7XHJcbiAgICAgICAgICAgIGNoYW5nZXMucHVzaCh7IC4uLnMsIHZhbHVlOiByZXRyaWV2ZSh0aGlzLmJvYXJkLCBzLnBhdGgpIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjb21taXQ6IENvbW1pdCA9IHtcclxuICAgICAgICAgICAgX2lkOiB1dWlkVjQoKSwgbWVzc2FnZSwgY2hhbmdlcywgaGlzdG9yeSwgdGltZTogbmV3IERhdGUoKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY29tbWl0cy5wdXNoKGNvbW1pdCk7XHJcbiAgICAgICAgdGhpcy5oZWFkLmNvbW1pdCA9IGNvbW1pdC5faWQ7XHJcbiAgICAgICAgdGhpcy5zdGFnZWQgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5icmFuY2hlcyA9IHRoaXMuYnJhbmNoZXMubWFwKGIgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYi5faWQgPT0gdGhpcy5oZWFkLmJyYW5jaCkge1xyXG4gICAgICAgICAgICAgICAgYi5jb21taXQgPSB0aGlzLmhlYWQuY29tbWl0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYjtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5kYXRhYmFzZS51cGRhdGUoeyBfaWQ6IHRoaXMuX2lkIH0sIHsgY29tbWl0czogdGhpcy5jb21taXRzLCBzdGFnZWQ6IHRoaXMuc3RhZ2VkLCBoZWFkOiB0aGlzLmhlYWQsIGJyYW5jaGVzOiB0aGlzLmJyYW5jaGVzIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIG1lcmdlKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRCcmFuY2ggPSB0aGlzLmJyYW5jaGVzLmZpbmQoYiA9PiBiLl9pZCA9PSB0aGlzLmhlYWQuYnJhbmNoKTtcclxuICAgICAgICBjb25zdCBpbmNvbWluZ0JyYW5jaCA9IHRoaXMuYnJhbmNoZXMuZmluZChiID0+IGIubmFtZSA9PSBuYW1lKTtcclxuICAgICAgICBpZiAoIWluY29taW5nQnJhbmNoKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGJyYW5jaFwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgY3VycmVudENvbW1pdCA9IHRoaXMuY29tbWl0cy5maW5kKGMgPT4gYy5faWQgPT0gdGhpcy5oZWFkLmNvbW1pdCk7XHJcbiAgICAgICAgY29uc3QgaW5jb21pbmdDb21taXQgPSB0aGlzLmNvbW1pdHMuZmluZChjID0+IGMuX2lkID09IGluY29taW5nQnJhbmNoLmNvbW1pdCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNoYW5nZXMgPSBnZXRDaGFuZ2VzKGN1cnJlbnRDb21taXQuY2hhbmdlcywgaW5jb21pbmdDb21taXQuY2hhbmdlcywgeyBiaTogdHJ1ZSB9KTtcclxuICAgICAgICBpZiAoIWNoYW5nZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gZGlmZmVyZW5jZSBmb3VuZFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNDb21taXRBbmNlc3RvcnkoY3VycmVudENvbW1pdCwgaW5jb21pbmdDb21taXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZC5jb21taXQgPSBpbmNvbWluZ0NvbW1pdC5faWQ7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50QnJhbmNoKSBjdXJyZW50QnJhbmNoLmNvbW1pdCA9IHRoaXMuaGVhZC5jb21taXQ7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZGF0YWJhc2UudXBkYXRlKHsgX2lkOiB0aGlzLl9pZCB9LCB7IGhlYWQ6IHRoaXMuaGVhZCwgYnJhbmNoZXM6IHRoaXMuYnJhbmNoZXMgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNDb21taXRBbmNlc3RvcnkoaW5jb21pbmdDb21taXQsIGN1cnJlbnRDb21taXQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJyYW5jaCBpcyBiZWhpbmRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCF0aGlzLmNvbW1pdHNMYXN0Q29tbW9uQW5jZXN0b3IoY3VycmVudENvbW1pdCwgaW5jb21pbmdDb21taXQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJyYW5jaCBpcyBub3QgcmVsYXRlZFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZSh0aGlzLmJvYXJkLCBpbmNvbWluZ0NvbW1pdC5jaGFuZ2VzKTtcclxuICAgICAgICAgICAgdGhpcy5zYXZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhZ2UoKTtcclxuICAgICAgICAgICAgdGhpcy5jb21taXQoXCJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRpZmYoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1c2godG86IHN0cmluZywgb3JpZ2luOiBzdHJpbmcsIGJyYW5jaDogc3RyaW5nKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1bGwoZnJvbTogc3RyaW5nKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXR1cygpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbG9nKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjbG9uZSgpIHtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBMb2NhbERCIH0gZnJvbSBcIi4vbG9jYWwuc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBMb2NhbERvY3VtZW50IH0gZnJvbSBcIi4vbW9kZWxzL3F1ZXJ5Lm1vZGVsXCI7XHJcbmltcG9ydCB7IElSZXBvIH0gZnJvbSBcIi4vcmVwby5jbGFzc1wiO1xyXG5cclxuY29uc3Qgc3RvcmFnZSA9IG5ldyBMb2NhbERCPElSZXBvPihcIlJlcG9zXCIpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlYWRGdW5jdGlvbiA9IGFzeW5jIChkYXRhOiBQYXJ0aWFsPExvY2FsRG9jdW1lbnQ8SVJlcG8+PikgPT4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IHN0b3JhZ2UuZmluZE9uZShkYXRhKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGluc2VydEZ1bmN0aW9uID0gYXN5bmMgKGRhdGE6IElSZXBvKSA9PiB7XHJcbiAgICByZXR1cm4gYXdhaXQgc3RvcmFnZS5pbnNlcnRPbmUoZGF0YSk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVGdW5jdGlvbiA9IGFzeW5jIChwYXJhbXM6IFBhcnRpYWw8TG9jYWxEb2N1bWVudDxJUmVwbz4+LCBkYXRhOiBQYXJ0aWFsPElSZXBvPikgPT4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IHN0b3JhZ2UudXBkYXRlT25lKHBhcmFtcywgZGF0YSk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVwb0RhdGFiYXNlPFQ+IHtcclxuICAgIGluc2VydDogKGRhdGE6IElSZXBvPFQ+KSA9PiBQcm9taXNlPExvY2FsRG9jdW1lbnQ8SVJlcG88VD4+PixcclxuICAgIHJlYWQ6IChkYXRhOiBQYXJ0aWFsPExvY2FsRG9jdW1lbnQ8SVJlcG8+PikgPT4gUHJvbWlzZTxJUmVwbzxUPj4sXHJcbiAgICB1cGRhdGU6IChwYXJhbXM6IFBhcnRpYWw8TG9jYWxEb2N1bWVudDxJUmVwbz4+LCBkYXRhOiBQYXJ0aWFsPElSZXBvPikgPT4gUHJvbWlzZTxhbnk+XHJcbn0iLCJleHBvcnQgZW51bSBDaGFuZ2VUeXBlcyB7XHJcbiAgICBSRU1PVkVEID0gXCJSZW1vdmVkXCIsXHJcbiAgICBDSEFOR0VEID0gXCJDaGFuZ2VkXCIsXHJcbiAgICBBRERFRCA9IFwiQWRkZWRcIlxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZSB7XHJcbiAgICBwYXRoOiBhbnlbXTtcclxuICAgIHR5cGU6IENoYW5nZVR5cGVzO1xyXG4gICAgYmVmb3JlOiBhbnk7XHJcbiAgICBhZnRlcjogYW55O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhbmdlcyhmcm9tOiBhbnksIGxvb2s6IGFueSwgb3B0aW9ucz86IHsgcGF0aD86IHN0cmluZ1tdLCBiaT86IGJvb2xlYW4sIGhhbHBoZWQ/OiBib29sZWFuIH0pIHtcclxuICAgIGNvbnN0IGxDaGFuZ2VzOiBDaGFuZ2VbXSA9IFtdO1xyXG4gICAgY29uc3QgcGF0aCA9IG9wdGlvbnM/LnBhdGggfHwgW107XHJcblxyXG4gICAgZnJvbSA9IGZyb20gfHwge307XHJcbiAgICBsb29rID0gbG9vayB8fCB7fTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGkgaW4gZnJvbSkge1xyXG4gICAgICAgIGNvbnN0IGFmdGVyID0gKG9wdGlvbnM/LmhhbHBoZWQpID8gZnJvbVtpXSA6IGxvb2tbaV07XHJcbiAgICAgICAgY29uc3QgYmVmb3JlID0gKG9wdGlvbnM/LmhhbHBoZWQpID8gbG9va1tpXSA6IGZyb21baV07XHJcblxyXG4gICAgICAgIGlmICghbG9vaz8uaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgICAgICAgbENoYW5nZXMucHVzaCh7IHBhdGg6IFsuLi5wYXRoLCBpXSwgdHlwZTogKG9wdGlvbnM/LmhhbHBoZWQpID8gQ2hhbmdlVHlwZXMuUkVNT1ZFRCA6IENoYW5nZVR5cGVzLkFEREVELCBiZWZvcmUsIGFmdGVyIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgZnJvbVtpXSA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIGxDaGFuZ2VzLnB1c2goLi4uZ2V0Q2hhbmdlcyhmcm9tW2ldLCBsb29rW2ldLCB7IHBhdGg6IFsuLi5wYXRoLCBpXSB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGZyb21baV0gIT09IGxvb2tbaV0pIHtcclxuICAgICAgICAgICAgbENoYW5nZXMucHVzaCh7IHBhdGg6IFsuLi5wYXRoLCBpXSwgdHlwZTogQ2hhbmdlVHlwZXMuQ0hBTkdFRCwgYmVmb3JlLCBhZnRlciB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnM/LmJpKSB7XHJcbiAgICAgICAgY29uc3QgckNoYW5nZXMgPSBnZXRDaGFuZ2VzKGxvb2ssIGZyb20sIHsgaGFscGhlZDogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCByQyBvZiByQ2hhbmdlcykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGVja2VkID0gbENoYW5nZXMuZmluZChjID0+IEpTT04uc3RyaW5naWZ5KGMucGF0aCkgPT0gSlNPTi5zdHJpbmdpZnkockMucGF0aCkpO1xyXG4gICAgICAgICAgICBpZiAoIWNoZWNrZWQpIGxDaGFuZ2VzLnB1c2gockMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBsQ2hhbmdlcztcclxufSIsImV4cG9ydCBmdW5jdGlvbiByZXRyaWV2ZShjb2xsZWN0aW9uOiBhbnksIHBhdGg6IHN0cmluZ1tdKSB7XHJcbiAgICAvL3JldHJpZXZlIGRhdGEgZnJvbSBhbiBvYmplY3RcclxuICAgIGNvbnN0IGRhdGEgPSAoYmxvY2s6IGFueSwgYXQ6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBibG9ja1thdF07XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHZhbHVlO1xyXG5cclxuICAgIGZvciAobGV0IGkgaW4gcGF0aCkge1xyXG4gICAgICAgIGlmIChpID09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgIC8vc2V0IHRoZSB2YWx1ZSBvbiBmaXJzdCBkaXJcclxuICAgICAgICAgICAgdmFsdWUgPSBkYXRhKGNvbGxlY3Rpb24sIHBhdGhbaV0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGRhdGEodmFsdWUsIHBhdGhbaV0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2YWx1ZTtcclxufSIsImltcG9ydCB7IENoYW5nZSwgQ2hhbmdlVHlwZXMgfSBmcm9tIFwiLi9jaGFuZ2VzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcm9sbGJhY2soY3VycmVudDogYW55LCBjaGFuZ2VzOiBDaGFuZ2VbXSkge1xyXG4gICAgY29uc3QgdGVtcCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY3VycmVudCkpO1xyXG5cclxuICAgIGNvbnN0IGRhdGEgPSAoYmxvY2s6IGFueSwgYXQ6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBibG9ja1thdF07XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgYyBvZiBjaGFuZ2VzKSB7XHJcbiAgICAgICAgbGV0IGF0dHIgPSB0ZW1wO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGMucGF0aC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA9PSBjLnBhdGgubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGMudHlwZSA9PSBDaGFuZ2VUeXBlcy5BRERFRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhdHRyW2MucGF0aFtpXV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJbYy5wYXRoW2ldXSA9IGMuYmVmb3JlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXR0ciA9IGRhdGEoYXR0ciwgYy5wYXRoW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGVtcDtcclxufSIsImltcG9ydCB7IENoYW5nZSwgQ2hhbmdlVHlwZXMgfSBmcm9tIFwiLi9jaGFuZ2VzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlKGN1cnJlbnQ6IGFueSwgY2hhbmdlczogQ2hhbmdlW10pIHtcclxuICAgIGNvbnN0IHRlbXAgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGN1cnJlbnQpKTtcclxuXHJcbiAgICBjb25zdCBkYXRhID0gKGJsb2NrOiBhbnksIGF0OiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4gYmxvY2tbYXRdO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGMgb2YgY2hhbmdlcykge1xyXG4gICAgICAgIGxldCBhdHRyID0gdGVtcDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjLnBhdGgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgPT0gYy5wYXRoLmxlbmd0aCAtIDEpIHsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoYy50eXBlID09IENoYW5nZVR5cGVzLkFEREVEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGF0dHJbYy5wYXRoW2ldXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBhdHRyW2MucGF0aFtpXV0gPSBjLmFmdGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXR0ciA9IGRhdGEoYXR0ciwgYy5wYXRoW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGVtcDtcclxufSIsImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbnZhciBnZXRSYW5kb21WYWx1ZXM7XG52YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi4gQWxzbyxcbiAgICAvLyBmaW5kIHRoZSBjb21wbGV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBjcnlwdG8gKG1zQ3J5cHRvKSBvbiBJRTExLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0bykgfHwgdHlwZW9mIG1zQ3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09PSAnZnVuY3Rpb24nICYmIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKG1zQ3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbnZhciBieXRlVG9IZXggPSBbXTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFycikge1xuICB2YXIgb2Zmc2V0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgdmFyIHV1aWQgPSAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBSZXBvIH0gZnJvbSBcIi4vcmVwby5jbGFzc1wiO1xyXG5pbXBvcnQgeyBTYW1wbGUgfSBmcm9tIFwiLi9tb2RlbHMvc2FtcGxlXCI7XHJcbmltcG9ydCB7IGdldENoYW5nZXMgfSBmcm9tIFwiLi9zaGFyZWQvY2hhbmdlc1wiO1xyXG5pbXBvcnQgeyB1cGRhdGUgfSBmcm9tIFwiLi9zaGFyZWQvdXBkYXRlXCI7XHJcbmltcG9ydCB7IExvY2FsREIgfSBmcm9tIFwiLi9sb2NhbC5zdG9yYWdlXCI7XHJcblxyXG5jb25zdCByZXBvID0gbmV3IFJlcG88U2FtcGxlPihcIlNhbXBsZVwiKTtcclxucmVwby5vbmxvYWQoYXN5bmMgKHIpID0+IHtcclxuICAgIC8vIGF3YWl0IHJlcG8uYnJhbmNoQW5kQ2hlY2tvdXQoXCJhbm90aGVyXCIpO1xyXG4gICAgYXdhaXQgcmVwby5jaGVja291dChcImFub3RoZXJcIilcclxuXHJcbiAgICBjb25zdCBhID0geyBuYW1lOiBcIkxvbmUgTmFweVwiLCBhZ2U6IDI2LCBkYXRhOiBbMSwgMywgNF0sIHRpbWU6IG5ldyBEYXRlKCkgfTtcclxuICAgIGNvbnN0IGIgPSB7IG5hbWU6IFwiTG9uZSBNYW5cIiwgYWdlOiA4OSB9O1xyXG5cclxuICAgIC8vIHJlcG8uYm9hcmQgPSBiO1xyXG4gICAgLy8gcmVwby5zYXZlKCk7XHJcbiAgICAvLyByZXBvLnN0YWdlKCk7XHJcbiAgICAvLyByZXBvLmNvbW1pdChcIlNlY29uZCBtYWluIENvbW1pdFwiKTtcclxuICAgIC8vIC8vIGNvbnNvbGUubG9nKHIuZGV0YWlscywgci5ib2FyZCk7ICAgIFxyXG4gICAgY29uc29sZS5sb2cocmVwbyk7XHJcbiAgICBcclxufSlcclxuXHJcblxyXG4vLyAvLyBjb25zdCBjID0gY2hhbmdlcyhhLCBiKTtcclxuXHJcbi8vIC8vIGNvbnN0IGQgPSB1cGRhdGUoYSwgYiwgYyk7XHJcblxyXG4vLyAvLyBjb25zb2xlLmxvZyh7YywgZH0pOyJdLCJzb3VyY2VSb290IjoiIn0=