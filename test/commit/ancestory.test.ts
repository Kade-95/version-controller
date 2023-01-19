import * as chai from "chai";
import { Repository } from "../../src/repository/repository.class";
import { Sample } from "../sample";
import { Commit } from "../../src/commit/commit.class";

const expect = chai.expect;
let repository: Repository<Sample>;
let commit: Commit;
const data: Sample = { name: 'Name', age: 20 };

describe('Commit Ancestory', () => {
    beforeEach(async () => {
        repository = await Repository.create<Sample>('Sample', {...data});
        repository.board = { ...data, name: 'Ken' };
        await repository.save();
        await repository.stage();
        commit = await Commit.create(repository, 'a commit', repository.head.commit as '') as Commit;
    });

    afterEach(() => repository.delete());

    it('should be able to commit ancestory', async () => {        
        const list = await commit.ancestory();        
        expect(list[0]._id).to.equal(commit.ancestor);
    });

    it('should all commit ancestory', async () => { 
        repository.board = { ...data, name: 'Toch' };
        await repository.save();
        await repository.stage();
        const _commit = await Commit.create(repository, 'another commit', commit._id as '') as Commit;       
        const list = await _commit.ancestory();        
        expect(list.length).to.equal(2);
        expect(list[1]._id).to.equal(commit.ancestor);
    });
});