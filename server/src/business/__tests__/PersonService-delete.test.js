import cuid from 'cuid';
import Chance from 'chance';
import { LoggerMock } from '../../__mocks__';
import { PersonRepositoryServiceMock } from '../../repositories/__mocks__';
import PersonService from '../PersonService';
import { BadArgumentError, NotFoundError, UnknownError } from '../Errors';
import { NotFoundError as RepositoryNotFoundError, UnknownError as RepositoryUnknownError } from '../../repositories';

const chance = new Chance();

describe('PersonService-delete', () => {
  let personRepositoryService;
  let logger;
  let sessionId;
  let personService;

  beforeEach(() => {
    personRepositoryService = new PersonRepositoryServiceMock();
    logger = new LoggerMock();
    sessionId = cuid();
    personService = new PersonService({ personRepositoryService, logger, sessionId });
  });

  describe('parameters', () => {
    describe('id', () => {
      it('should throw exception if no id is provided', async () => {
        expect(personService.delete()).rejects.toThrowError(new BadArgumentError('id is required!'));
      });

      it('should throw exception if provided id is null', async () => {
        expect(personService.delete(null)).rejects.toThrowError(new BadArgumentError('id is required!'));
      });

      it('should throw exception if provided id id empty', async () => {
        expect(personService.delete('')).rejects.toThrowError(new BadArgumentError('id is required!'));
      });
    });
  });

  describe('repository service call', () => {
    let id;

    beforeEach(() => {
      id = chance.string();
    });

    it('should call personRepositoryService delete method', async () => {
      await personService.delete(id);
      expect(personRepositoryService.delete.mock.calls).toHaveLength(1);
      expect(personRepositoryService.delete.mock.calls[0][0]).toBe(id);
    });

    it('should return NotFoundError error if personRepositoryService delete method throws NotFoundError', async () => {
      const expectedResult = new RepositoryNotFoundError();

      personRepositoryService.delete.mockRejectedValue(expectedResult);

      expect(personService.delete(id)).rejects.toThrowError(new NotFoundError());
    });

    it('should return UnknowError error if personRepositoryService delete method throws UnknowError', async () => {
      const expectedResult = new RepositoryUnknownError(chance.string());

      personRepositoryService.delete.mockRejectedValue(expectedResult);

      expect(personService.delete(id)).rejects.toThrowError(new UnknownError(expectedResult.message));
    });

    it('should return UnknowError error if personRepositoryService delete method throws any other error than the ones it handles', async () => {
      const expectedResult = new Error(chance.string());

      personRepositoryService.delete.mockRejectedValue(expectedResult);

      expect(personService.delete(id)).rejects.toThrowError(new UnknownError(expectedResult.message));
    });
  });
});
