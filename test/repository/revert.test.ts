import * as chai from "chai";
import { ChangeEnum } from "../../src/models/change.enum";
import { Repository } from "../../src/repository/repository.class";
import { Sample } from "../sample";

const expect = chai.expect;
let repository: Repository<Sample>;
const data: Sample = { name: 'Name', age: 20 };

describe('revert Repository', () => {
    beforeEach(async () => {
        repository = await Repository.create<Sample>('Sample', {...data});
    });

    afterEach(() => repository.delete());

    it('should be able to revert changes in the repository data', async() => {   
        repository.board = { ...repository.board, age: 19 } as Sample;
        await repository.add(); 
        await repository.revert();   
        expect(repository.changes.length).equal(0);
    });

    it('should be able to unstage changes in the repository data within a specified path', async() => {   
        repository.board = { ...repository.board, age: 19, name: 'Ken' } as Sample;
        await repository.add(); 
        await repository.revert([['age']]);   

        expect(repository.changes[0]).to.deep.include({ path: ['name'], type: ChangeEnum.MUTATED, before: 'Name', after: 'Ken' });
        expect(repository.changes.length).to.equal(1);
        expect(repository.data).deep.include({ name: 'Ken', age: 20 });
    });
});