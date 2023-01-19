import * as chai from "chai";
import { ChangeEnum } from "../../src/models/change.enum";
import { Repository } from "../../src/repository/repository.class";
import { Sample } from "../sample";

const expect = chai.expect;
let repository: Repository<Sample>;
const data: Sample = { name: 'Name', age: 20 };

describe('unStage Repository', () => {
    beforeEach(async () => {
        repository = await Repository.create<Sample>('Sample', {...data});
    });

    afterEach(() => repository.delete());

    it('should be able to unstage changes in the repository data', async() => {   
        repository.board = { ...repository.board, age: 19 } as Sample;
        await repository.add(); 
        await repository.stage();   
        await repository.unstage();
        expect(repository.staged.length).equal(0);
    });

    it('should be able to unstage changes in the repository data within a specified path', async() => {   
        repository.board = { ...repository.board, age: 19, name: 'Ken' } as Sample;
        await repository.add(); 
        await repository.stage();   
        await repository.unstage([['age']]);   

        expect(repository.staged[0]).to.deep.include({ path: ['name'], type: ChangeEnum.MUTATED, before: 'Name', after: 'Ken' });
        expect(repository.changes[0]).to.deep.include({ path: ['age'], type: ChangeEnum.MUTATED, before: 20, after: 19 });

        expect(repository.staged.length).to.equal(1);
        expect(repository.changes.length).to.equal(1);
    });

    it('should skip staging changes that has already been modified', async() => {   
        repository.board = { ...repository.board, age: 19, name: 'Ken' } as Sample;
        await repository.add(); 
        await repository.stage();   

        repository.board = { ...repository.board, age: 10 } as Sample;
        await repository.add(); 
        await repository.stage();   
        await repository.unstage([['age']]);           

        expect(repository.changes[0]).to.deep.include({ path: ['age'], type: ChangeEnum.MUTATED, before: 19, after: 10 });
        expect(repository.changes.length).to.equal(1);
    });
});