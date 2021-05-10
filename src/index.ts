import { Repo } from "./repo.class";
import { Sample } from "./models/sample";
import { getChanges } from "./shared/changes";
import { update } from "./shared/update";
import { LocalDB } from "./local.storage";

const repo = new Repo<Sample>("Sample");
repo.onload(async (r) => {
    // await repo.branchAndCheckout("another");
    await repo.checkout("another")

    const a = { name: "Lone Napy", age: 26, data: [1, 3, 4], time: new Date() };
    const b = { name: "Lone Man", age: 89 };

    // repo.board = b;
    // repo.save();
    // repo.stage();
    // repo.commit("Second main Commit");
    // // console.log(r.details, r.board);    
    console.log(repo);
    
})


// // const c = changes(a, b);

// // const d = update(a, b, c);

// // console.log({c, d});