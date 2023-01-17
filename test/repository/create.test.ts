import * as chai from "chai";
import { Repository } from "../../src/repository/repository.class";
import { Sample } from "../sample";

const expect = chai.expect;
let repository: Repository<Sample>;
const data: Sample = { name: 'Name', age: 20 };

describe('Create Repository', () => {
    beforeEach(async () => {
        repository = await Repository.create<Sample>('Sample', {...data});
    });

    afterEach(async () => {
        await repository.delete();
    });

    it('should be able to create new repository instance', () => {        
        expect(repository instanceof Repository).to.equal(true);
    });

    it('should create an new repository', () => {                
        expect(repository).to.deep.include({
            name: 'Sample',
            data,
            staged: [],
            changes: []
        });
    });

    it('should be instantiate repository when it already exists', async () => {    
        const repo = await Repository.from('Sample');            
        expect(repo.data).to.deep.include(data);
    });
});