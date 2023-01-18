import * as chai from "chai";
import { Branch } from "../../src/branch/branch.class";
import { Repository } from "../../src/repository/repository.class";
import { Sample } from "../sample";
import { strict as assert } from "assert";

const expect = chai.expect;
let repository: Repository<Sample>;
let branch: Branch;
const data: Sample = { name: 'Name', age: 20 };

describe('Delete Branch', () => {
    beforeEach(async () => {
        repository = await Repository.create<Sample>('Sample', {...data});
        branch = await Branch.create(repository, 'sample');
    });

    afterEach(() => repository.delete());

    it('should be able to delete a branch', async () => {        
        await branch.delete();
        const b = await branch.read();
        expect(b).to.equal(undefined);
    });

    it('should fail when branch is the active branch', async () => {        
        const b = await Branch.from(repository, 'main');
        await assert.rejects(b.delete(), { name: 'Error', message: 'You can not remove the active branch'});
    });

    it('should fail when branch is the default branch', async () => {  
        await branch.checkout();      
        const b = await Branch.from(repository, 'main');
        await assert.rejects(b.delete(), { name: 'Error', message: 'You can not remove the default branch'});
    });
});