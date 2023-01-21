import * as chai from "chai";
import { modify } from "../../src/change/modify";
import { ChangeEnum } from "../../src/models/change.enum";
import { Sample } from "../sample";

const expect = chai.expect;
let data: Sample;

describe('Update ()', () => {
    beforeEach(() => {
        data = { name: 'Name', age: 20 };
    });

    it('should update the name attribute in the data', () => {
        const a = modify(data, [{ path: ['name'], type: ChangeEnum.MUTATED, after: 'Ken', before: data.name }], 'update');

        expect(a).to.deep.include({ ...data, name: 'Ken' });
    });

    it('should add time attribute to the data', () => {
        const time = new Date();
        const a = modify(data, [{ path: ['time'], type: ChangeEnum.ADDED, after: time, before: undefined }], 'update');
        
        expect(a).to.deep.include({ ...data, time });
    });

    it('should remove age attribute from the data', () => {
        const a = modify(data, [{ path: ['age'], type: ChangeEnum.REMOVED, after: undefined, before: data.age }], 'update');
        
        expect(a).to.deep.include({ name: data.name });
    });

    it('should add an object to data', () => {
        const a = modify(data, [{ path: ['data'], type: ChangeEnum.ADDED, after: { a: 1, b: 2 }, before: undefined }], 'update');
        
        expect(a).to.deep.include({ ...data, data: { a: 1, b: 2 } });
    });

    it('should mutate a nested attribute', () => {
        data = { ...data, data: { a: 1, b: 2 } };
        const a = modify(data, [{ path: ['data', 'a'], type: ChangeEnum.MUTATED, after: 4, before: 1 }], 'update');
        
        expect(a).to.deep.include({ ...data, data: { a: 4, b: 2 } });
    });

    it('should rollback the name attribute in the data', () => {
        const a = modify(data, [{ path: ['name'], type: ChangeEnum.MUTATED, after: 'Ken', before: data.name }], 'update');
        const b = modify(a, [{ path: ['name'], type: ChangeEnum.MUTATED, after: 'Ken', before: data.name }], 'rollback')        

        expect(b ).to.deep.include({ ...data });
    });

    it('should rollback time attribute added to the data', () => {
        const time = new Date();
        const a = modify(data, [{ path: ['time'], type: ChangeEnum.ADDED, after: time, before: undefined }], 'update');
        const b = modify(a, [{ path: ['time'], type: ChangeEnum.ADDED, after: time, before: undefined }], 'rollback');

        
        expect(b).to.deep.include({ ...data });
    });

    it('should rollback removal of age attribute from the data', () => {
        const a = modify(data, [{ path: ['age'], type: ChangeEnum.REMOVED, after: undefined, before: data.age }], 'update');
        const b = modify(a, [{ path: ['age'], type: ChangeEnum.REMOVED, after: undefined, before: data.age }], 'rollback');
        
        expect(b).to.deep.include({ ...data });
    });

    it('should rollback adding an object to data', () => {
        const a = modify(data, [{ path: ['data'], type: ChangeEnum.ADDED, after: { a: 1, b: 2 }, before: undefined }], 'update');
        const b = modify(a, [{ path: ['data'], type: ChangeEnum.ADDED, after: { a: 1, b: 2 }, before: undefined }], 'rollback');
        
        expect(b).to.deep.include({ ...data });
    });

    it('should rollback mutating a nested attribute', () => {
        data = { ...data, data: { a: 1, b: 2 } };
        const a = modify(data, [{ path: ['data', 'a'], type: ChangeEnum.MUTATED, after: 4, before: 1 }], 'update');
        const b = modify(a, [{ path: ['data', 'a'], type: ChangeEnum.MUTATED, after: 4, before: 1 }], 'rollback');
        
        expect(b).to.deep.include({ ...data, data: { a: 1, b: 2 } });
    });
});