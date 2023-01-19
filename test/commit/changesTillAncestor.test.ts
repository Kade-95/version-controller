import * as chai from "chai";
import { Repository } from "../../src/repository/repository.class";
import { Sample } from "../sample";
import { Commit } from "../../src/commit/commit.class";

const expect = chai.expect;
let repository: Repository<Sample>;
let commit: Commit;
const data: Sample = { name: 'Name', age: 20 };

describe('Changes till ancestor', () => {
    beforeEach(async () => {
        repository = await Repository.create<Sample>('Sample', {...data});
        repository.board = { ...data, name: 'Ken' };
        await repository.add();
        await repository.stage();
        commit = await Commit.create(repository, 'a commit', repository.head.commit as '') as Commit;
    });

    afterEach(() => repository.delete());

    it('should get all changes till ancestor', async () => { 
        repository.board = { ...data, name: 'Toch', age: 5 };
        await repository.add();
        await repository.stage();
        const _commit = await Commit.create(repository, 'another commit', commit._id as '') as Commit;       
        const list = await _commit.changesTillAncestor(commit);   

        expect(list.length).to.equal(3);
    });

    it('should get empty list when commits are not related', async () => { 
        repository.board = { ...data, name: 'Toch' };
        await repository.add();
        await repository.stage();
        const _commit = await Commit.create(repository, 'another commit', '') as Commit;       
        const list = await _commit.changesTillAncestor(commit);   

        expect(list.length).to.equal(0);
    });
});