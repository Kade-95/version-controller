import * as chai from "chai";
import { ChangeEnum } from "../../src/models/change.enum";
import { Repository } from "../../src/repository/repository.class";
import { Sample } from "../sample";

const expect = chai.expect;
let repository: Repository<Sample>;
const data: Sample = { name: 'Name', age: 20 };

describe('Stage Repository', () => {
    beforeEach(async () => {
        repository = await Repository.create<Sample>('Sample', {...data});
    });

    afterEach(() => repository.delete());

    it('should stage nothing when no changes where made', async() => {   
        await repository.save(); 
        await repository.stage();      
        expect(repository.staged.length).to.equal(0);
    });

    it('should be able to stage changes in the repository data', async() => {   
        repository.board = { ...repository.board, age: 19 } as Sample;
        await repository.save(); 
        await repository.stage();      
        expect(repository.staged[0]).to.deep.include({ path: ['age'], type: ChangeEnum.MUTATED, before: 20, after: 19 });
    });

    it('should be able to stage changes in the repository data within a specified path', async() => {   
        repository.board = { ...repository.board, age: 19, name: 'Ken' } as Sample;
        await repository.save(); 
        await repository.stage([['name']]);      
        expect(repository.staged[0]).to.deep.include({ path: ['name'], type: ChangeEnum.MUTATED, before: 'Name', after: 'Ken' });
        expect(repository.staged.length).to.equal(1);
    });
});