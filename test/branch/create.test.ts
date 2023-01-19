import * as chai from "chai";
import { Branch } from "../../src/branch/branch.class";
import { Repository } from "../../src/repository/repository.class";
import { Sample } from "../sample";
import { strict as assert } from "assert";

const expect = chai.expect;
let repository: Repository<Sample>;
let branch: Branch;
const data: Sample = { name: 'Name', age: 20 };

describe('Create Branch', () => {
    beforeEach(async () => {
        repository = await Repository.create<Sample>('Sample', {...data});
        branch = await Branch.create(repository, 'sample');
    });

    afterEach(() => repository.delete());

    it('should be able to create new branch instance', () => {        
        expect(branch instanceof Branch).to.equal(true);
    });

    it('should fail when the branch with name already exists', async () => {   
        await assert.rejects(Branch.create(repository, 'main'), { name: 'Error', message: 'Branch already exists'});        
    });

    it('should instanciate from an existing branch', async () => {   
        const b = await Branch.from(repository, 'sample');
        expect(b).to.deep.include({ name: 'sample', _id: branch._id });
    });

    it('should fail when branch with name does not exist', async () => {   
        await assert.rejects(Branch.from(repository, 'another'), { name: 'Error', message: 'Branch does not exist'});        
    });
});