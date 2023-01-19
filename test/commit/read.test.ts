import * as chai from "chai";
import { Repository } from "../../src/repository/repository.class";
import { Sample } from "../sample";
import { Commit } from "../../src/commit/commit.class";

const expect = chai.expect;
let repository: Repository<Sample>;
let commit: Commit;
const data: Sample = { name: 'Name', age: 20 };

describe('Read Commit', () => {
    beforeEach(async () => {
        repository = await Repository.create<Sample>('Sample', {...data});
        repository.board = { ...data, name: 'Ken' };
        await repository.add();
        await repository.stage();
        commit = await Commit.create(repository, 'a commit', '') as Commit;
    });

    afterEach(() => repository.delete());

    it('should be able to create new branch instance', async () => {        
        const data = await commit.read();
        expect(data).deep.include({ _id: commit._id, ancestor: commit.ancestor, message: 'a commit' });
    });
});