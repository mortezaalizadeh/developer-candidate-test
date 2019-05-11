import Datastore from 'nedb';
import cuid from 'cuid';
import tmp from 'tmp';
import fs from 'fs';
import BaseRepositoryService from '../BaseRepositoryService';
import { LoggerMock } from '../../__mocks__';

describe('BaseRepositoryService', () => {
  let databaseFileName;
  let dataStore;
  let logger;
  let sessionId;

  beforeEach(() => {
    databaseFileName = tmp.fileSync().name;
    dataStore = new Datastore(databaseFileName);

    dataStore.loadDatabase();

    logger = new LoggerMock();
    sessionId = cuid();
  });

  afterEach(done => {
    fs.unlink(databaseFileName, () => {
      done();
    });
  });

  it('should throw exception if dataStore is undefined', () => {
    expect(() => new BaseRepositoryService(undefined, logger, sessionId)).toThrowError(new Error('dataStore is required!'));
  });

  it('should throw exception if null dataStore is provided', () => {
    expect(() => new BaseRepositoryService(null, logger, sessionId)).toThrowError(new Error('dataStore is required!'));
  });

  it('should throw exception if logger is undefined', () => {
    expect(() => new BaseRepositoryService(dataStore, undefined, sessionId)).toThrowError(new Error('logger is required!'));
  });

  it('should throw exception if null logger is provided', () => {
    expect(() => new BaseRepositoryService(dataStore, null, sessionId)).toThrowError(new Error('logger is required!'));
  });

  it('should throw exception if sessionId is undefined', () => {
    expect(() => new BaseRepositoryService(dataStore, logger, undefined)).toThrowError(new Error('sessionId is required!'));
  });

  it('should throw exception if null sessionId is provided', () => {
    expect(() => new BaseRepositoryService(dataStore, logger, null)).toThrowError(new Error('sessionId is required!'));
  });

  it('should not throw exception if all required services are provided', () => {
    new BaseRepositoryService(dataStore, logger, sessionId);
  });
});
