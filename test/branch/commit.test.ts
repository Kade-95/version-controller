import * as chai from "chai";
import { Branch } from "../../src/branch/branch.class";
import { Repository } from "../../src/repository/repository.class";
import { Sample } from "../sample";

const expect = chai.expect;
let repository: Repository<Sample>;
let branch: Branch;
const data: Sample = { name: 'Name', age: 20 };

describe('Commit branch', () => {
    beforeEach(async () => {
        repository = await Repository.create<Sample>('Sample', {...data});
        branch = await Branch.create(repository, 'sample');
    });

    afterEach(() => repository.delete());

    it('should commit changes to branch', async () => {         
        await branch.checkout();
        repository.board = { ...data, name: 'Ken' };
        await repository.add();
        await repository.stage();
        
        const commit = await branch.commit('A commit');
        expect(commit._id).equal(branch.commit_id);
    });    
});
