import * as chai from "chai";
import { Repository } from "../../src/repository/repository.class";
import { Sample } from "../sample";
import { Commit } from "../../src/commit/commit.class";

const expect = chai.expect;
let repository: Repository<Sample>;
let commit: Commit;
const data: Sample = { name: 'Name', age: 20 };

describe('IsAncestor (commit)', () => {
    beforeEach(async () => {
        repository = await Repository.create<Sample>('Sample', {...data});
        repository.board = { ...data, name: 'Ken' };
        await repository.save();
        await repository.stage();
        commit = await Commit.create(repository, 'a commit', repository.head.commit as '') as Commit;
    });

    afterEach(() => repository.delete());

    it('should succeed when commit is ancestor to another commit', async () => { 
        repository.board = { ...data, name: 'Toch' };
        await repository.save();
        await repository.stage();
        const _commit = await Commit.create(repository, 'another commit', commit._id as '') as Commit;       
        const flag = await commit.isAncestor(_commit);        
        expect(flag).to.equal(true);
    });

    it('should fail when commit is not ancestor to another commit', async () => { 
        repository.board = { ...data, name: 'Toch' };
        await repository.save();
        await repository.stage();
        const _commit = await Commit.create(repository, 'another commit', commit._id as '') as Commit;       
        const flag = await _commit.isAncestor(commit);        
        expect(flag).to.equal(false);
    });
});