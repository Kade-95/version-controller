import * as chai from "chai";
import { retrieve } from "../../src/change/retrieve";
import { Sample } from "../sample";

const expect = chai.expect;
let data: Sample;

describe('Retrieve ()', () => {
    beforeEach(() => {
        data = { name: 'Name', age: 20 };
    });

    it('should retrieve the value of the path supllied', () => {
        const a = retrieve(data, ['name']);
        expect(a).to.equal('Name');
    });

    it('should retrieve the value of the path supllied in a nested data', () => {
        const a = retrieve({ ...data, data: {a: [1, 2, 3]}}, ['data', 'a', '1']);
        expect(a).to.equal(2);
    });
});
