import * as chai from "chai";
import { rollback } from "../../src/change/rollback";
import { update } from "../../src/change/update";
import { ChangeEnum } from "../../src/models/change.enum";
import { Sample } from "../sample";

const expect = chai.expect;
let data: Sample;

describe('Rollback ()', () => {
    beforeEach(() => {
        data = { name: 'Name', age: 20 };
    });

    it('should rollback the name attribute in the data', () => {
        const a = update(data, [{ path: ['name'], type: ChangeEnum.MUTATED, after: 'Ken', before: data.name }]);
        const b = rollback(a, [{ path: ['name'], type: ChangeEnum.MUTATED, after: 'Ken', before: data.name }])        

        expect(b ).to.deep.include({ ...data });
    });

    it('should rollback time attribute added to the data', () => {
        const time = new Date();
        const a = update(data, [{ path: ['time'], type: ChangeEnum.ADDED, after: time, before: undefined }]);
        const b = rollback(a, [{ path: ['time'], type: ChangeEnum.ADDED, after: time, before: undefined }]);

        
        expect(b).to.deep.include({ ...data });
    });

    it('should rollback removal of age attribute from the data', () => {
        const a = update(data, [{ path: ['age'], type: ChangeEnum.REMOVED, after: undefined, before: data.age }]);
        const b = rollback(a, [{ path: ['age'], type: ChangeEnum.REMOVED, after: undefined, before: data.age }]);
        
        expect(b).to.deep.include({ ...data });
    });

    it('should rollback adding an object to data', () => {
        const a = update(data, [{ path: ['data'], type: ChangeEnum.ADDED, after: { a: 1, b: 2 }, before: undefined }]);
        const b = update(a, [{ path: ['data'], type: ChangeEnum.ADDED, after: { a: 1, b: 2 }, before: undefined }]);
        
        expect(b).to.deep.include({ ...data });
    });

    it('should rollback mutating a nested attribute', () => {
        data = { ...data, data: { a: 1, b: 2 } };
        const a = update(data, [{ path: ['data', 'a'], type: ChangeEnum.MUTATED, after: 4, before: 1 }]);
        const b = rollback(a, [{ path: ['data', 'a'], type: ChangeEnum.MUTATED, after: 4, before: 1 }]);
        
        expect(b).to.deep.include({ ...data, data: { a: 1, b: 2 } });
    });
});
