import { Repo } from "./repo.class";
import { Sample } from "./models/sample";
import { changes } from "./shared/changes";
import { update } from "./shared/update";

const repo = new Repo<Sample>("Sample");
// repo.save({ name: "Lone Ken", age: undefined, data: {a: 1, b: 24, c: 433}})

repo.stage([["name"]])

repo.commit("Initial Commit")
console.log({ changes: repo.changes, staging: repo.staged, commits: repo.commits });


// const a = { name: "Lone Kendo", age: 26, data: [1, 3, 4], time: new Date() };
// const b = { name: "Lone Man", data: [1,3,7], time: a.time };

// const c = changes(a, b);

// const d = update(a, b, c);

// console.log({c, d});
