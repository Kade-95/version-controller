import { Repo } from "./repo.class";
import { Sample } from "./models/sample";

const repo = new Repo<Sample>("Sample");
// console.log(repo);

Repo.delete({name: "Another"})
// Repo.cloneLocal("Sample", "Another").then(console.log)

// repo.onload(async (r) => {
//     // await repo.revertLastCommit();
//     // await repo.branchAndCheckout("crater");
//     // await repo.deleteBranch("another")

//     const a = { name: "Lorem ipsum what ever it says", age: 678899, data: "How are you" };
//     // const b = { name: "Lone Man", age: 89 };

//     // repo.board = a;
//     // repo.save();
//     // repo.stage();
//     // repo.commit("Main Commit");
//     // console.log(r.details, r.board);    
//     console.log(repo);

// })
