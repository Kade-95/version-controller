import * as chai from "chai";
import { Repository } from "../../src/repository/repository.class";
import { Sample } from "../sample";
import { strict as assert } from "assert";
import { Commit } from "../../src/commit/commit.class";

const expect = chai.expect;
let repository: Repository<Sample>;
let commit: Commit;
const data: Sample = { name: 'Name', age: 20 };

describe('Create Commit', () => {
    beforeEach(async () => {
        repository = await Repository.create<Sample>('Sample', {...data});
        repository.board = { ...data, name: 'Ken' };
        await repository.add();
        await repository.stage();
        commit = await Commit.create(repository, 'a commit', '') as Commit;
    });

    afterEach(() => repository.delete());

    it('should be able to create new branch instance', () => {        
        expect(commit instanceof Commit).to.equal(true);
    });

    it('should instanciate from an existing branch', async () => {   
        const b = await Commit.from(repository, commit._id);
        expect(b).to.deep.include({ _id: commit._id });
    });

    it('should fail when commit with id does not exist', async () => {   
        await assert.rejects(Commit.from(repository, 'main'), { name: 'Error', message: 'Commit does not exist'});        
    });
});