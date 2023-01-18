import * as chai from "chai";
import { Repository } from "../../src/repository/repository.class";
import { Sample } from "../sample";

const expect = chai.expect;
let repository: Repository<Sample>;
const data: Sample = { name: 'Name', age: 20 };

describe('Read Repository', () => {
    beforeEach(async () => {
        repository = await Repository.create<Sample>('Sample', {...data});
    });

    afterEach(() => repository.delete());

    it('should be able to get the stored repository', async() => {   
        const repo = await repository.read();             
        expect(repo).to.deep.include({
            name: 'Sample',
            data
        });
    });

    it.skip('should fail when repository is deleted', async() => {   
        repository.delete();
        const a = await repository.read();
        expect(a).to.equal(undefined);
    });
});