import Chance from 'chance';
import { PersonRepositoryServiceMock } from '../../repositories/__mocks__';
import PersonService from '../PersonService';
import { BadArgumentError, AlreadyExistsError, UnknownError } from '../Errors';
import { AlreadyExistsError as RepositoryAlreadyExistsError, UnknownError as RepositoryUnknownError } from '../../repositories';

const chance = new Chance();

describe('PersonService-create', () => {
  let personRepositoryService;
  let personService;
  let info;

  beforeEach(() => {
    personRepositoryService = new PersonRepositoryServiceMock();
    personService = new PersonService({ personRepositoryService });
    info = { name: chance.string(), age: chance.integer({ min: 0 }), gender: chance.string() };
  });

  describe('parameters', () => {
    it('should throw exception if provided info is undefined', async () => {
      await expect(personService.create()).rejects.toThrowError(new BadArgumentError('info is required!'));
    });

    describe('name', () => {
      it('should throw exception if provided info contains no name', async () => {
        delete info['name'];

        expect(personService.create(info)).rejects.toThrowError(new BadArgumentError('name is required!'));
      });

      it('should throw exception if provided info contains null name', async () => {
        info.name = null;

        expect(personService.create(info)).rejects.toThrowError(new BadArgumentError('name is required!'));
      });

      it('should throw exception if provided info contains empty name', async () => {
        info.name = '';

        expect(personService.create(info)).rejects.toThrowError(new BadArgumentError('name is required!'));
      });

      it('should throw exception if provided info contains name that only contains whitespaces', async () => {
        info.name = '    ';

        expect(personService.create(info)).rejects.toThrowError(new BadArgumentError('name is required!'));
      });
    });

    describe('age', () => {
      it('should throw exception if provided info contains no age', async () => {
        delete info['age'];

        expect(personService.create(info)).rejects.toThrowError(new BadArgumentError('age is required!'));
      });

      it('should throw exception if provided info contains null age', async () => {
        info.age = null;

        expect(personService.create(info)).rejects.toThrowError(new BadArgumentError('age is required!'));
      });

      it('should throw exception if provided info contains negative age', async () => {
        info.age = chance.integer({ max: -1 });

        expect(personService.create(info)).rejects.toThrowError(new BadArgumentError('age cannot be less than zero!'));
      });
    });

    describe('gender', () => {
      it('should throw exception if provided info contains no gender', async () => {
        delete info['gender'];

        expect(personService.create(info)).rejects.toThrowError(new BadArgumentError('gender is required!'));
      });

      it('should throw exception if provided info contains null gender', async () => {
        info.gender = null;

        expect(personService.create(info)).rejects.toThrowError(new BadArgumentError('gender is required!'));
      });

      it('should throw exception if provided info contains empty gender', async () => {
        info.gender = '';

        expect(personService.create(info)).rejects.toThrowError(new BadArgumentError('gender is required!'));
      });

      it('should throw exception if provided info contains gender that only contains whitespaces', async () => {
        info.gender = '    ';

        expect(personService.create(info)).rejects.toThrowError(new BadArgumentError('gender is required!'));
      });
    });
  });

  describe('repository service call', () => {
    it('should call personRepositoryService create method', async () => {
      await personService.create(info);
      expect(personRepositoryService.create.mock.calls).toHaveLength(1);
      expect(personRepositoryService.create.mock.calls[0][0]).toBe(info);
    });

    it('should trim name before calling personRepositoryService create method', async () => {
      info.name = '        ' + chance.string() + '      ';
      const expected = info.name.trim();

      await personService.create(info);
      expect(personRepositoryService.create.mock.calls[0][0].name).toEqual(expected);
    });

    it('should trim gender before calling personRepositoryService create method', async () => {
      info.gender = '        ' + chance.string() + '      ';
      const expected = info.gender.trim();

      await personService.create(info);
      expect(personRepositoryService.create.mock.calls[0][0].gender).toEqual(expected);
    });

    it('should return the result of call to personRepositoryService create method', async () => {
      const expectedResult = Object.assign(info, { _id: chance.string() });

      personRepositoryService.create.mockResolvedValue(expectedResult);

      const result = await personService.create(info);

      expect(result).toEqual(expectedResult);
    });
    it('should throw AlreadyExistsError error if personRepositoryService create method throws AlreadyExistsError', async () => {
      const expectedResult = new RepositoryAlreadyExistsError();

      personRepositoryService.create.mockRejectedValue(expectedResult);

      expect(personService.create(info)).rejects.toThrowError(new AlreadyExistsError());
    });

    it('should throw UnknowError error if personRepositoryService create method throws UnknowError', async () => {
      const expectedResult = new RepositoryUnknownError(chance.string());

      personRepositoryService.create.mockRejectedValue(expectedResult);

      expect(personService.create(info)).rejects.toThrowError(new UnknownError(expectedResult.message));
    });

    it('should throw UnknowError error if personRepositoryService create method throws any other error than the ones it handles', async () => {
      const expectedResult = new Error(chance.string());

      personRepositoryService.create.mockRejectedValue(expectedResult);

      expect(personService.create(info)).rejects.toThrowError(new UnknownError(expectedResult.message));
    });
  });
});
