import Datastore from 'nedb';
import tmp from 'tmp';
import fs from 'fs';
import BaseRepositoryService from '../BaseRepositoryService';

describe('BaseRepositoryService', () => {
  it('should throw exception if dataStore is undefined', () => {
    expect(() => new BaseRepositoryService()).toThrowError(new Error('dataStore is required!'));
  });

  it('should throw exception if null dataStore is provided', () => {
    expect(() => new BaseRepositoryService(null)).toThrowError(new Error('dataStore is required!'));
  });

  it('should not throw exception if all required services are provided', done => {
    const databaseFileName = tmp.fileSync().name;
    const dataStore = new Datastore(databaseFileName);

    dataStore.loadDatabase();

    new BaseRepositoryService(dataStore);

    fs.unlink(databaseFileName, () => {
      done();
    });
  });
});
