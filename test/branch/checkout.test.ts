import * as chai from "chai";
import { Branch } from "../../src/branch/branch.class";
import { Repository } from "../../src/repository/repository.class";
import { Sample } from "../sample";
import { strict as assert } from "assert";

const expect = chai.expect;
let repository: Repository<Sample>;
let branch: Branch;
const data: Sample = { name: 'Name', age: 20 };

describe('Checkout Branch', () => {
    beforeEach(async () => {
        repository = await Repository.create<Sample>('Sample', {...data});
        branch = await Branch.create(repository, 'sample');
    });

    afterEach(() => repository.delete());

    it('should be able to checkout a branch', async () => {        
        await branch.checkout();
        const activeBranch = await repository.branch as Branch;
        expect(activeBranch.name).to.equal(branch.name);
    });

    it('should fail when there are changes in the repository', async () => {        
        repository.board = { ...data, name: 'Ken' };
        await repository.add();
        await assert.rejects(branch.checkout(), { name: 'Error', message: 'Branch unsafe, active changes'})
    });

    it('should fail when there are staged changes in the repository', async () => {        
        repository.board = { ...data, name: 'Ken' };
        await repository.add();
        await repository.stage();
        await assert.rejects(branch.checkout(), { name: 'Error', message: 'Branch unsafe, active staged changes'})
    });
});