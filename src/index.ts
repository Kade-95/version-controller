import { Repo } from "..";
import { Sample } from "./models/sample";
import { Repository } from "./repo.class";

new Repository<Sample>("Sample", null, (repo: Repo<Sample>) => {
    console.log(repo);
});

