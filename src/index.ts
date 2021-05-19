import { Repo } from "./repo.class";
import { Sample } from "./models/sample";

new Repo<Sample>("Sample", null, (repo: Repo<Sample>) => {
    console.log(repo);
});

