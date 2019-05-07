import { PersonRepositoryServiceMock } from '../../repositories/__mocks__';
import PersonService from '../PersonService';

describe('PersonService-constructor', () => {
  let personRepositoryService;

  beforeEach(() => {
    personRepositoryService = new PersonRepositoryServiceMock();
  });

  it('should throw exception if personRepositoryService is undefined', () => {
    expect(() => new PersonService({})).toThrowError(new Error('personRepositoryService is required!'));
  });

  it('should throw exception if null personRepositoryService is provided', () => {
    expect(() => new PersonService({ personRepositoryService: null })).toThrowError(new Error('personRepositoryService is required!'));
  });

  it('should not throw exception if all required services are provided', () => {
    new PersonService({ personRepositoryService });
  });
});
