import { v4 } from 'uuid';
import * as axios from 'axios';
import { LoneDB } from '@black-ink/lonedb';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

var storage = new LoneDB("Repos");
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
var deleteFunction = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, storage.deleteOne(params)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };

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

var ChangeTypes;
(function (ChangeTypes) {
    ChangeTypes["REMOVED"] = "Removed";
    ChangeTypes["MUTATED"] = "Mutated";
    ChangeTypes["ADDED"] = "Added";
})(ChangeTypes || (ChangeTypes = {}));

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
                if (c.type == ChangeTypes.ADDED) {
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
                if (c.type == ChangeTypes.REMOVED) {
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

function getChanges(from, look, options) {
    var lChanges = [];
    var path = (options === null || options === void 0 ? void 0 : options.path) || [];
    from = from || {};
    look = look || {};
    for (var i in from) {
        var after = (options === null || options === void 0 ? void 0 : options.halphed) ? from[i] : look[i];
        var before = (options === null || options === void 0 ? void 0 : options.halphed) ? look[i] : from[i];
        if (!(look === null || look === void 0 ? void 0 : look.hasOwnProperty(i))) {
            lChanges.push({ path: __spreadArray(__spreadArray([], path, true), [i]), type: (options === null || options === void 0 ? void 0 : options.halphed) ? ChangeTypes.ADDED : ChangeTypes.REMOVED, before: before, after: after });
        }
        else if (typeof from[i] == "object") {
            lChanges.push.apply(lChanges, getChanges(from[i], look[i], { path: __spreadArray(__spreadArray([], path, true), [i]) }));
        }
        else if (from[i] !== look[i]) {
            lChanges.push({ path: __spreadArray(__spreadArray([], path, true), [i]), type: ChangeTypes.MUTATED, before: before, after: after });
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

var Repository = /** @class */ (function () {
    function Repository(name, data, callback) {
        var _this = this;
        if (data === void 0) { data = null; }
        if (callback === void 0) { callback = function (repo) { }; }
        this.name = name;
        this.data = data;
        this.changes = [];
        this.commits = [];
        this.merged = [];
        this.staged = [];
        this.head = { commit: undefined };
        this.branches = [];
        this.time = new Date();
        this.read().then(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.initialized) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initialize()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.board = JSON.parse(JSON.stringify(this.data || null));
                        callback(this);
                        return [2 /*return*/];
                }
            });
        }); });
    }
    Object.defineProperty(Repository.prototype, "details", {
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
            return { branch: branch, nBranch: nBranch, nChanges: nChanges, nStaged: nStaged, commit: commit, head: head, nCommits: nCommits };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Repository, "database", {
        set: function (database) {
            Repository.update = database.update;
            Repository.read = database.read;
            Repository.insert = database.insert;
        },
        enumerable: false,
        configurable: true
    });
    Repository.prototype.isSafe = function () {
        // Check there are staged or commited changes
        if (this.details.nChanges)
            throw new Error("Unstaged Changes");
        if (this.details.nStaged)
            throw new Error("Uncommited Changes");
    };
    Repository.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var branch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //Initialize repo with first commit, branch and the head, then checkout the branch and commit
                        this.commit("Initial Commit");
                        return [4 /*yield*/, this.createBranch("main")];
                    case 1:
                        branch = _a.sent();
                        this.head.branch = branch._id;
                        //Set the initial content
                        this.content = {
                            _id: v4(),
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
    Repository.prototype.insert = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Repository.insert(this.content)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Repository.prototype.read = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Read the stored content
                        _a = this;
                        return [4 /*yield*/, Repository.read({ name: this.name })];
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
    Repository.prototype.commitAncestory = function (commit) {
        var _this = this;
        var ancestors = [];
        var history = [];
        commit.ancestor && history.push(commit.ancestor);
        commit.merged && history.push(commit.merged);
        if (history.length) {
            var historyCommit = history.map(function (h) { return _this.commits.find(function (c) { return c._id == h; }); });
            ancestors.push.apply(ancestors, __spreadArray(__spreadArray([], historyCommit, false), historyCommit.reduce(function (acc, commit) {
                return __spreadArray(__spreadArray([], acc, true), _this.commitAncestory(commit), true);
            }, [])));
        }
        return ancestors;
    };
    Repository.prototype.equalCommits = function (first, second) {
        return first._id == second._id;
    };
    Repository.prototype.commitToAncestor = function (child, ancestor) {
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
    Repository.prototype.commitHistoryTillAncestor = function (child, ancestor) {
        var changes = [];
        var ancestory = this.commitToAncestor(child, ancestor);
        changes.push.apply(changes, ancestory.slice(0, ancestory.length)
            .reduce(function (acc, commit) {
            return __spreadArray(__spreadArray([], acc, true), commit.changes);
        }, []));
        return changes;
    };
    Repository.prototype.isCommitAncestory = function (parent, child) {
        var childAncestory = this.commitAncestory(child);
        return !!childAncestory.find(function (a) { return a._id == parent._id; });
    };
    Repository.prototype.commitsLastCommonAncestor = function (first, second) {
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
    Repository.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var changes, _loop_1, this_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        changes = getChanges(this.data, this.board, { bi: true });
                        _loop_1 = function (i) {
                            this_1.changes = this_1.changes.filter(function (c) { return JSON.stringify(c.path) != JSON.stringify(changes[i].path); });
                            this_1.changes.push(changes[i]);
                        };
                        this_1 = this;
                        for (i in changes) {
                            _loop_1(i);
                        }
                        return [4 /*yield*/, Repository.update({ _id: this._id }, { changes: this.changes, data: this.board })];
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
    Repository.prototype.createBranch = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var found, branch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        found = this.branches.find(function (b) { return b.name == name; });
                        if (found)
                            throw new Error("Branch with name '".concat(name, "' already exists in this repo"));
                        branch = { name: name, time: new Date(), commit: this.head.commit, _id: v4() };
                        this.branches.push(branch);
                        return [4 /*yield*/, Repository.update({ _id: this._id }, { branches: this.branches })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, branch];
                }
            });
        });
    };
    Repository.prototype.deleteBranch = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (name == this.details.branch)
                            throw new Error("You can not remove the active branch");
                        if (name == 'main')
                            throw new Error("You can not remove the Main branch");
                        this.isSafe();
                        this.branches = this.branches.filter(function (b) { return b.name != name; });
                        return [4 /*yield*/, Repository.update({ _id: this._id }, { branches: this.branches })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Repository.prototype.branchAndCheckout = function (name) {
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
    Repository.prototype.checkout = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var currentBranch, incomingBranch, currentCommit, incomingCommit, lastCommitAncestor, reverts, changes, reverted, updated;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isSafe();
                        currentBranch = this.branches.find(function (b) { return b._id == _this.head.branch; });
                        incomingBranch = this.branches.find(function (b) { return b.name == name; });
                        // check if incoming branch is existing
                        if (!incomingBranch)
                            throw new Error("Unknown branch");
                        console.log("Checkout from ".concat(currentBranch.name, " to ").concat(incomingBranch.name));
                        currentCommit = this.commits.find(function (c) { return c._id == currentBranch.commit; });
                        incomingCommit = this.commits.find(function (c) { return c._id == incomingBranch.commit; });
                        lastCommitAncestor = this.commitsLastCommonAncestor(currentCommit, incomingCommit);
                        reverts = this.commitHistoryTillAncestor(currentCommit, lastCommitAncestor);
                        changes = this.commitHistoryTillAncestor(incomingCommit, lastCommitAncestor).reverse();
                        console.log({ reverts: reverts, changes: changes });
                        console.log("Rolling back ".concat(reverts.length, " changes"));
                        reverted = rollback(this.data, reverts);
                        console.log("Writing ".concat(changes.length, " changes"));
                        updated = update(reverted, changes);
                        this.head.branch = incomingBranch._id;
                        this.head.commit = incomingBranch.commit;
                        return [4 /*yield*/, Repository.update({ _id: this._id }, { head: this.head, data: updated })];
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
    Repository.prototype.stage = function (paths) {
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
                        return [4 /*yield*/, Repository.update({ _id: this._id }, { staged: this.staged, changes: this.changes })];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Repository.prototype.commit = function (message, ancestor, merged) {
        if (ancestor === void 0) { ancestor = this.head.commit; }
        if (merged === void 0) { merged = undefined; }
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
                            changes.push(__assign(__assign({}, s), { value: retrieve(this.board, s.path) }));
                        }
                        commit = {
                            _id: v4(),
                            message: message,
                            changes: changes,
                            ancestor: ancestor,
                            merged: merged,
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
                        return [4 /*yield*/, Repository.update({ _id: this._id }, { commits: this.commits, staged: this.staged, head: this.head, branches: this.branches })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Repository.prototype.revertLastCommit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var commit, changes, ancestor, branch;
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        commit = this.details.commit;
                        changes = commit.changes, ancestor = commit.ancestor;
                        if (!ancestor)
                            throw new Error("No previous commit found");
                        branch = this.branches.find(function (b) { return b._id == _this.head.branch; });
                        branch.commit = ancestor;
                        this.head.commit = ancestor;
                        (_a = this.changes).push.apply(_a, changes.filter(function (c) { return !_this.changes.find(function (a) { return (JSON.stringify(a.path) == JSON.stringify(c.path)); }); }));
                        return [4 /*yield*/, Repository.update({ _id: this._id }, { branches: this.branches, head: this.head, changes: this.changes })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Repository.prototype.merge = function (name) {
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
                        return [4 /*yield*/, Repository.update({ _id: this._id }, { head: this.head, branches: this.branches })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 5:
                        changes = this.commitHistoryTillAncestor(incomingCommit, lastCommitAncestor).reverse();
                        console.log("Writing ".concat(changes.length, " changes"));
                        this.board = update(this.data, changes);
                        return [4 /*yield*/, this.save()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.stage()];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.commit("".concat(currentCommit.message, " & ").concat(incomingCommit.message), currentCommit._id, incomingCommit._id)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Repository.cloneUrl = function (url, as) {
        return __awaiter(this, void 0, void 0, function () {
            var repo, found;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, axios.default.get(url)];
                    case 1:
                        repo = (_a.sent()).data;
                        repo.name = as ? as : repo.name;
                        repo._id = v4();
                        return [4 /*yield*/, Repository.read({ name: as })];
                    case 2:
                        found = _a.sent();
                        if (found)
                            throw new Error("Repo with name \"".concat(as, "\" already exists"));
                        return [4 /*yield*/, Repository.insert(repo)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _a.sent();
                        throw new Error("Error fetching Repo");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Repository.cloneLocal = function (name, as) {
        return __awaiter(this, void 0, void 0, function () {
            var repo, found;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Repository.read({ name: name })];
                    case 1:
                        repo = _a.sent();
                        if (!repo)
                            throw new Error("Repo doesn't exist locally");
                        return [4 /*yield*/, Repository.read({ name: as })];
                    case 2:
                        found = _a.sent();
                        if (found)
                            throw new Error("Repo with name \"".concat(as, "\" already exists"));
                        repo.name = as;
                        repo._id = v4();
                        return [4 /*yield*/, Repository.insert(repo)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, repo];
                }
            });
        });
    };
    Repository.isRepo = function (repo) {
    };
    Repository.insert = insertFunction;
    Repository.read = readFunction;
    Repository.update = updateFunction;
    Repository.delete = deleteFunction;
    return Repository;
}());

new Repository("Sample", null, function (repo) {
    console.log(repo);
});
