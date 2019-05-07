import Chance from 'chance';
import { Range, Map } from 'immutable';
import { PersonRepositoryServiceMock } from '../../repositories/__mocks__';
import PersonService from '../PersonService';
import { BadArgumentError, UnknownError } from '../Errors';
import { UnknownError as RepositoryUnknownError } from '../../repositories';

const chance = new Chance();

describe('PersonService-search', () => {
  let personRepositoryService;
  let personService;

  beforeEach(() => {
    personRepositoryService = new PersonRepositoryServiceMock();
    personService = new PersonService({ personRepositoryService });
  });

  describe('parameters', () => {
    describe('id', () => {
      it('should throw exception if no id is provided', async () => {
        expect(personService.search()).rejects.toThrowError(new BadArgumentError('criteria is required!'));
      });

      it('should throw exception if provided id is null', async () => {
        expect(personService.search(null)).rejects.toThrowError(new BadArgumentError('criteria is required!'));
      });

      it('should throw exception if both age.lt and age.gte are provided', async () => {
        expect(personService.search({ age: { lt: chance.integer({ min: 0 }), gte: chance.integer({ min: 0 }) } })).rejects.toThrowError(
          new BadArgumentError('Only one of the age.lt and age.gte criteria can be provided'),
        );
      });
    });
  });

  describe('repository service call', () => {
    let criteria;

    beforeEach(() => {
      criteria = { gender: chance.string(), age: { lt: chance.integer({ min: 0 }) } };
    });

    it('should call personRepositoryService search method', async () => {
      await personService.search(criteria);
      expect(personRepositoryService.search.mock.calls).toHaveLength(1);
      expect(personRepositoryService.search.mock.calls[0][0]).toBe(criteria);
    });

    describe('result', () => {
      it('should return the result of call to personRepositoryService search method', async () => {
        const expectedResult = Range(0, chance.integer({ min: 10, max: 20 }))
          .map(() => Map({ name: chance.string(), age: chance.integer({ min: 0 }), gender: chance.string() }))
          .toJS();

        personRepositoryService.search.mockResolvedValue(expectedResult);

        const result = await personService.search(criteria);

        expect(result).toEqual(expectedResult);
      });
    });

    it('should return UnknowError error if personRepositoryService search method throws UnknowError', async () => {
      const expectedResult = new RepositoryUnknownError(chance.string());

      personRepositoryService.search.mockRejectedValue(expectedResult);

      expect(personService.search(criteria)).rejects.toThrowError(new UnknownError(expectedResult.message));
    });

    it('should return UnknowError error if personRepositoryService search method throws any other error than the ones it handles', async () => {
      const expectedResult = new Error(chance.string());

      personRepositoryService.search.mockRejectedValue(expectedResult);

      expect(personService.search(criteria)).rejects.toThrowError(new UnknownError(expectedResult.message));
    });
  });
});
