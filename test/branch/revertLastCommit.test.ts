import * as chai from "chai";
import { Branch } from "../../src/branch/branch.class";
import { Repository } from "../../src/repository/repository.class";
import { Sample } from "../sample";
import { strict as assert } from "assert";

const expect = chai.expect;
let repository: Repository<Sample>;
let branch: Branch;
const data: Sample = { name: 'Name', age: 20 };

describe('Revert last commit', () => {
    beforeEach(async () => {
        repository = await Repository.create<Sample>('Sample', {...data});
        branch = await Branch.create(repository, 'sample');
    });

    afterEach(() => repository.delete());

    it('should fail when no previous commit exists ', async () => {                
        await assert.rejects(branch.revertLastCommit(), { name: 'Error', message: 'No previous commit found'})
    });

    it('should revert to the previous commit', async () => {         
        await branch.checkout();
        repository.board = { ...data, name: 'Ken' };
        await repository.add();
        await repository.stage();
        
        const commit = await branch.commit('A commit');
        expect(commit._id).equal(branch.commit_id);

        await branch.revertLastCommit();      
        expect(commit.ancestor).equal(branch.commit_id); 
    });    
});
