import cuid from 'cuid';
import Datastore from 'nedb';
import tmp from 'tmp';
import fs from 'fs';
import PersonRepositoryService from '../PersonRepositoryService';
import { LoggerMock } from '../../__mocks__';

describe('PersonRepositoryService', () => {
  let databaseFileName;
  let personDataStore;
  let logger;
  let sessionId;

  beforeEach(() => {
    databaseFileName = tmp.fileSync().name;
    personDataStore = new Datastore(databaseFileName);

    personDataStore.loadDatabase();

    logger = new LoggerMock();
    sessionId = cuid();
  });

  afterEach(done => {
    fs.unlink(databaseFileName, () => {
      done();
    });
  });

  it('should throw exception if personDataStore is undefined', () => {
    expect(() => new PersonRepositoryService({ logger, sessionId })).toThrowError(new Error('dataStore is required!'));
  });

  it('should throw exception if null personDataStore is provided', () => {
    expect(() => new PersonRepositoryService({ personDataStore: null, logger, sessionId })).toThrowError(new Error('dataStore is required!'));
  });

  it('should throw exception if logger is undefined', () => {
    expect(() => new PersonRepositoryService({ personDataStore, sessionId })).toThrowError(new Error('logger is required!'));
  });

  it('should throw exception if null logger is provided', () => {
    expect(() => new PersonRepositoryService({ personDataStore, logger: null, sessionId })).toThrowError(new Error('logger is required!'));
  });

  it('should throw exception if sessionId is undefined', () => {
    expect(() => new PersonRepositoryService({ personDataStore, logger })).toThrowError(new Error('sessionId is required!'));
  });

  it('should throw exception if null sessionId is provided', () => {
    expect(() => new PersonRepositoryService({ personDataStore, logger, sessionId: null })).toThrowError(new Error('sessionId is required!'));
  });

  it('should not throw exception if all required services are provided', () => {
    new PersonRepositoryService({ personDataStore, logger, sessionId });
  });
});
