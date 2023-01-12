import * as chai from "chai";
import { Repository } from "../../src/repository/repository.class";
import { Sample } from "../sample";

const expect = chai.expect;
let repository: Repository<Sample>;
const data: Sample = { name: 'Name', age: 20 };

describe('Create Repository', () => {
    before(() => {
        repository = new Repository('Sample', {...data});
    });

    afterEach(() => {
        // repository.;
    });

    after(() => {
        // database.drop();
    });

    it('should be able to create a new Database', () => {
        expect(repository).to.deep.include({ name: 'Sample' })
    });
});