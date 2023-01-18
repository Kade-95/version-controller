import * as chai from "chai";
import { Branch } from "../../src/branch/branch.class";
import { Repository } from "../../src/repository/repository.class";
import { Sample } from "../sample";

const expect = chai.expect;
let repository: Repository<Sample>;
let branch: Branch;
const data: Sample = { name: 'Name', age: 20 };

describe('Read Branch', () => {
    beforeEach(async () => {
        repository = await Repository.create<Sample>('Sample', {...data});
        branch = await Branch.create(repository, 'sample');
    });

    afterEach(() => repository.delete());

    it('should be able to read a branch', async () => {        
        const b = await branch.read();
        expect(b).to.deep.include({ name: 'sample', _id: branch._id });
    });

    it('should fail when branch is deleted', async () => {        
        const b = await branch.delete();
        expect(b).to.equal(undefined);
    });
});