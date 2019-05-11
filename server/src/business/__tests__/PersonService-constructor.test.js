import cuid from 'cuid';
import { LoggerMock } from '../../__mocks__';
import { PersonRepositoryServiceMock } from '../../repositories/__mocks__';
import PersonService from '../PersonService';

describe('PersonService-constructor', () => {
  let personRepositoryService;
  let logger;
  let sessionId;

  beforeEach(() => {
    personRepositoryService = new PersonRepositoryServiceMock();
    logger = new LoggerMock();
    sessionId = cuid();
  });

  it('should throw exception if personRepositoryService is undefined', () => {
    expect(() => new PersonService({ logger, sessionId })).toThrowError(new Error('personRepositoryService is required!'));
  });

  it('should throw exception if null personRepositoryService is provided', () => {
    expect(() => new PersonService({ personRepositoryService: null, logger, sessionId })).toThrowError(
      new Error('personRepositoryService is required!'),
    );
  });

  it('should throw exception if logger is undefined', () => {
    expect(() => new PersonService({ personRepositoryService, sessionId })).toThrowError(new Error('logger is required!'));
  });

  it('should throw exception if null logger is provided', () => {
    expect(() => new PersonService({ personRepositoryService, logger: null, sessionId })).toThrowError(new Error('logger is required!'));
  });

  it('should throw exception if sessionId is undefined', () => {
    expect(() => new PersonService({ personRepositoryService, logger })).toThrowError(new Error('sessionId is required!'));
  });

  it('should throw exception if null sessionId is provided', () => {
    expect(() => new PersonService({ personRepositoryService, logger, sessionId: null })).toThrowError(new Error('sessionId is required!'));
  });

  it('should not throw exception if all required services are provided', () => {
    new PersonService({ personRepositoryService, logger, sessionId });
  });
});
