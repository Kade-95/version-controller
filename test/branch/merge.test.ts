import { Branch } from "../../src/branch/branch.class";
import { Repository } from "../../src/repository/repository.class";
import { Sample } from "../sample";
import { strict as assert } from "assert";
import { expect } from "chai";

let repository: Repository<Sample>;
let branch: Branch;
const data: Sample = { name: 'Name', age: 20 };

describe('Merge Branch', () => {
    beforeEach(async () => {
        repository = await Repository.create<Sample>('Sample', {...data});
        branch = await Branch.create(repository, 'sample');
    });

    afterEach(() => repository.delete());

    it('should fail when branch does not exist', async () => {                
        await assert.rejects(branch.merge('branch'), { name: 'Error', message: 'Branch does not exist'})
    });

    it('should fail when incoming branch is behind', async () => {         
        await branch.checkout();
        repository.board = { ...data, name: 'Ken' };
        await repository.add();
        await repository.stage();
        await branch.commit('A commit');

        await assert.rejects(branch.merge(repository.defaultBranch), { name: 'Error', message: 'Branch is behind in history'});
    });    

    it('should do nothing when both branches have the same commit', async () => {      
        const commit = branch.commit_id;   
        await branch.checkout();
        await branch.merge(repository.defaultBranch);
        expect(commit).to.equal(branch.commit_id);
    });

    it('should merge when incoming branch is ahead', async () => {     
        await branch.checkout(); 
        const newBranch = await Branch.create(repository, 'new');
        await newBranch.checkout();
        repository.board = { ...data, name: 'Ken' };
        await repository.add();
        await repository.stage();
        await newBranch.commit('A commit');

        const commit = branch.commit_id; 
        await branch.merge(newBranch.name);

        expect(commit).to.not.equal(branch.commit_id);
        expect(newBranch.commit_id).to.equal(branch.commit_id);
    });

    it('should merge when incoming branch is ahead', async () => {      
        const newBranch = await Branch.create(repository, 'new');
        await newBranch.checkout();
        repository.board = { ...data, age: 4 };
        await repository.add();
        await repository.stage();
        await newBranch.commit('A commit');

        await branch.checkout();
        repository.board = { ...data, name: 'Toc' };
        await repository.add();
        await repository.stage();
        await branch.commit('Another commit');

        await branch.merge(newBranch.name);
        expect(repository.data).to.deep.include({ name: 'Toc', age: 4 });        
    });
});
