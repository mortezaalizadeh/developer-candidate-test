import cuid from 'cuid';
import { LoggerMock } from '../../__mocks__';
import { PersonServiceMock } from '../../business/__mocks__';
import PersonAPIs from '../PersonAPIs';

describe('PersonAPIs-constructor', () => {
  let personService;
  let logger;
  let sessionId;

  beforeEach(() => {
    personService = new PersonServiceMock();
    logger = new LoggerMock();
    sessionId = cuid();
  });

  it('should throw exception if personService is undefined', () => {
    expect(() => new PersonAPIs({ logger, sessionId })).toThrowError(new Error('personService is required!'));
  });

  it('should throw exception if null personService is provided', () => {
    expect(() => new PersonAPIs({ personService: null, logger, sessionId })).toThrowError(new Error('personService is required!'));
  });

  it('should throw exception if logger is undefined', () => {
    expect(() => new PersonAPIs({ personService, sessionId })).toThrowError(new Error('logger is required!'));
  });

  it('should throw exception if null logger is provided', () => {
    expect(() => new PersonAPIs({ personService, logger: null, sessionId })).toThrowError(new Error('logger is required!'));
  });

  it('should throw exception if sessionId is undefined', () => {
    expect(() => new PersonAPIs({ personService, logger })).toThrowError(new Error('sessionId is required!'));
  });

  it('should throw exception if null sessionId is provided', () => {
    expect(() => new PersonAPIs({ personService, logger, sessionId: null })).toThrowError(new Error('sessionId is required!'));
  });
  it('should not throw exception if all required services are provided', () => {
    new PersonAPIs({ personService, logger, sessionId });
  });
});
