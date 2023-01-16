import * as chai from "chai";
import { update } from "../../src/change/update";
import { ChangeEnum } from "../../src/models/change.enum";
import { Sample } from "../sample";

const expect = chai.expect;
let data: Sample;

describe('Update ()', () => {
    beforeEach(() => {
        data = { name: 'Name', age: 20 };
    });

    it('should update the name attribute in the data', () => {
        const a = update(data, [{ path: ['name'], type: ChangeEnum.MUTATED, after: 'Ken', before: data.name }]);

        expect(a).to.deep.include({ ...data, name: 'Ken' });
    });

    it('should add time attribute to the data', () => {
        const time = new Date();
        const a = update(data, [{ path: ['time'], type: ChangeEnum.ADDED, after: time, before: undefined }]);
        
        expect(a).to.deep.include({ ...data, time });
    });

    it('should remove age attribute from the data', () => {
        const a = update(data, [{ path: ['age'], type: ChangeEnum.REMOVED, after: undefined, before: data.age }]);
        
        expect(a).to.deep.include({ name: data.name });
    });

    it('should add an object to data', () => {
        const a = update(data, [{ path: ['data'], type: ChangeEnum.ADDED, after: { a: 1, b: 2 }, before: undefined }]);
        
        expect(a).to.deep.include({ ...data, data: { a: 1, b: 2 } });
    });

    it('should mutate a nested attribute', () => {
        data = { ...data, data: { a: 1, b: 2 } };
        const a = update(data, [{ path: ['data', 'a'], type: ChangeEnum.MUTATED, after: 4, before: 1 }]);
        
        expect(a).to.deep.include({ ...data, data: { a: 4, b: 2 } });
    });
});