import * as chai from "chai";
import { getChanges } from "../../src/change/getChanges";
import { ChangeEnum } from "../../src/models/change.enum";
import { Sample } from "../sample";

const expect = chai.expect;
let data: Sample;

describe('Get Changes ()', () => {
    beforeEach(() => {
        data = { name: 'Name', age: 20 };
    });

    it('should the changes in the data', () => {
        const a = getChanges(data, { ...data, name: 'Ken' });
        expect(a).to.deep.include({ path: [ 'name' ], type: ChangeEnum.MUTATED, before: 'Name', after: 'Ken' });
    });

    it('should the changes in the data within the provided path', () => {
        data = { ...data, data: { a: 1 }};
        const a = getChanges(
            data, 
            { ...data, data: { a: 5 } }, 
            { path: ['data']}
        );
        
        expect(a).to.deep.include({ path: [ 'data', 'a' ], type: ChangeEnum.MUTATED, before: 1, after: 5 });
    });

    it('should the changes in the data bi-directionally', () => {
        const a = getChanges(
            data, 
            { ...data, data: { a: 5 } }, 
            { path: ['data'], bi: true }
        );
        
        expect(a).to.deep.include({ path: [ 'data' ], type: ChangeEnum.ADDED, before: undefined, after: { a: 5 } });
    });

    it('should the changes in the data halphed is set as true', () => {
        const a = getChanges(
            data, 
            { ...data, name: 'Ken' }, 
            { halphed: true }
        );
        
        expect(a).to.deep.include({ path: [ 'name' ], type: ChangeEnum.MUTATED, before: 'Ken', after: 'Name' });
    });
});
