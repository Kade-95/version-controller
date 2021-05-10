import { Repo } from "./repo.class";
import { Sample } from "./models/sample";
import { getChanges } from "./shared/changes";
import { update } from "./shared/update";
import { LocalDB } from "./local.storage";

const repo = new Repo<Sample>("Sample");
repo.onload(async (r) => {
    await r.checkout('main')
    // await r.branchAndCheckout("Another");

    // repo.board = { name: "Kennedy", age: 4433212, data: { name: "What" } };
    // repo.save();


    // repo.stage()
    // await repo.commit("New Commit")
    // repo.merge("Another");

    console.log(r.details);

})



// const a = { name: "Lone Kendo", age: 26, data: [1, 3, 4], time: new Date() };
// const b = { name: "Lone Man", data: [1,3,7], time: a.time };

// const c = changes(a, b);

// const d = update(a, b, c);

// console.log({c, d});