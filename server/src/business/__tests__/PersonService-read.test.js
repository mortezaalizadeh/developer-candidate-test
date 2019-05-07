import Chance from 'chance';
import { PersonRepositoryServiceMock } from '../../repositories/__mocks__';
import PersonService from '../PersonService';
import { BadArgumentError, NotFoundError, UnknownError } from '../Errors';
import { NotFoundError as RepositoryNotFoundError, UnknownError as RepositoryUnknownError } from '../../repositories';

const chance = new Chance();

describe('PersonService-read', () => {
  let personRepositoryService;
  let personService;

  beforeEach(() => {
    personRepositoryService = new PersonRepositoryServiceMock();
    personService = new PersonService({ personRepositoryService });
  });

  describe('parameters', () => {
    describe('id', () => {
      it('should throw exception if no id is provided', async () => {
        expect(personService.read()).rejects.toThrowError(new BadArgumentError('id is required!'));
      });

      it('should throw exception if provided id is null', async () => {
        expect(personService.read(null)).rejects.toThrowError(new BadArgumentError('id is required!'));
      });

      it('should throw exception if provided id id empty', async () => {
        expect(personService.read('')).rejects.toThrowError(new BadArgumentError('id is required!'));
      });
    });
  });

  describe('repository service call', () => {
    let id;

    beforeEach(() => {
      id = chance.string();
    });

    it('should call personRepositoryService read method', async () => {
      await personService.read(id);
      expect(personRepositoryService.read.mock.calls).toHaveLength(1);
      expect(personRepositoryService.read.mock.calls[0][0]).toBe(id);
    });

    describe('result', () => {
      let info;

      beforeEach(() => {
        info = { name: chance.string(), age: chance.integer({ min: 0 }), gender: chance.string() };
      });

      it('should return the result of call to personRepositoryService read method', async () => {
        const expectedResult = Object.assign(info, { _id: chance.string() });

        personRepositoryService.read.mockResolvedValue(expectedResult);

        const result = await personService.read(info);

        expect(result).toEqual(expectedResult);
      });
    });

    it('should return NotFoundError error if personRepositoryService read method throws NotFoundError', async () => {
      const expectedResult = new RepositoryNotFoundError();

      personRepositoryService.read.mockRejectedValue(expectedResult);

      expect(personService.read(id)).rejects.toThrowError(new NotFoundError());
    });

    it('should return UnknowError error if personRepositoryService read method throws UnknowError', async () => {
      const expectedResult = new RepositoryUnknownError(chance.string());

      personRepositoryService.read.mockRejectedValue(expectedResult);

      expect(personService.read(id)).rejects.toThrowError(new UnknownError(expectedResult.message));
    });

    it('should return UnknowError error if personRepositoryService read method throws any other error than the ones it handles', async () => {
      const expectedResult = new Error(chance.string());

      personRepositoryService.read.mockRejectedValue(expectedResult);

      expect(personService.read(id)).rejects.toThrowError(new UnknownError(expectedResult.message));
    });
  });
});
