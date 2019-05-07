import Datastore from 'nedb';
import tmp from 'tmp';
import fs from 'fs';
import PersonRepositoryService from '../PersonRepositoryService';

describe('PersonRepositoryService', () => {
  it('should throw exception if personDataStore is undefined', () => {
    expect(() => new PersonRepositoryService({})).toThrowError(new Error('dataStore is required!'));
  });

  it('should throw exception if null personDataStore is provided', () => {
    expect(() => new PersonRepositoryService({ personDataStore: null })).toThrowError(new Error('dataStore is required!'));
  });

  it('should not throw exception if all required services are provided', done => {
    const databaseFileName = tmp.fileSync().name;
    const personDataStore = new Datastore(databaseFileName);

    personDataStore.loadDatabase();

    new PersonRepositoryService({ personDataStore });

    fs.unlink(databaseFileName, () => {
      done();
    });
  });
});
