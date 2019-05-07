import { PersonServiceMock } from '../../business/__mocks__';
import PersonAPIs from '../PersonAPIs';

describe('PersonAPIs-constructor', () => {
  let personService;

  beforeEach(() => {
    personService = new PersonServiceMock();
  });

  it('should throw exception if personService is undefined', () => {
    expect(() => new PersonAPIs({})).toThrowError(new Error('personService is required!'));
  });

  it('should throw exception if null personService is provided', () => {
    expect(() => new PersonAPIs({ personService: null })).toThrowError(new Error('personService is required!'));
  });

  it('should not throw exception if all required services are provided', () => {
    new PersonAPIs({ personService });
  });
});
