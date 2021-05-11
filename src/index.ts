import { Repo } from "./repo.class";
import { Sample } from "./models/sample";

const repo = new Repo<Sample>("Sample");
repo.onload(async (r) => {
    // await repo.branchAndCheckout("another");
    // await repo.checkout("main")

    // const a = { name: "Lorem ipsum what ever it says", age: 678899 };
    // const b = { name: "Lone Man", age: 89 };

    // repo.board = a;
    // repo.save();
    // repo.stage();
    // repo.commit("Third main Commit");
    // console.log(r.details, r.board);    
    // console.log(repo);

})
