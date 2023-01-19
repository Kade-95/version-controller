import * as chai from "chai";
import { Repository } from "../../src/repository/repository.class";
import { Sample } from "../sample";
import { Commit } from "../../src/commit/commit.class";

const expect = chai.expect;
let repository: Repository<Sample>;
let commit: Commit;
const data: Sample = { name: 'Name', age: 20 };

describe('List commit till ancestor', () => {
    beforeEach(async () => {
        repository = await Repository.create<Sample>('Sample', {...data});
        repository.board = { ...data, name: 'Ken' };
        await repository.save();
        await repository.stage();
        commit = await Commit.create(repository, 'a commit', repository.head.commit as '') as Commit;
    });

    afterEach(() => repository.delete());

    it('should get all commits till ancestor', async () => { 
        repository.board = { ...data, name: 'Toch' };
        await repository.save();
        await repository.stage();
        const _commit = await Commit.create(repository, 'another commit', commit._id as '') as Commit;       
        const list = await _commit.listCommitsTillAncestor(commit);   

        expect(list.length).to.equal(2);
    });

    it('should get empty list when commits are not related', async () => { 
        repository.board = { ...data, name: 'Toch' };
        await repository.save();
        await repository.stage();
        const _commit = await Commit.create(repository, 'another commit', '') as Commit;       
        const list = await _commit.listCommitsTillAncestor(commit);   

        expect(list.length).to.equal(0);
    });
});